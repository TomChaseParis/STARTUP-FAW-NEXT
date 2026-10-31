
import { useCallback, useMemo, useState } from "react";

import type {
  TransformationAnswer,
  TransformationCard,
  TransformationCardResult,
  TransformationCardsData,
  TransformationCardsResult,
  TransformationInputPart,
} from "@/types/transformationCardsTypes";

type UseTransformationCardsOptions = {
  data: TransformationCardsData;
  onComplete?: (result: TransformationCardsResult) => void;
};

type CardValidationResult = {
  cardResult: TransformationCardResult;
  answers: TransformationAnswer[];
};

/**
 * Normalise une réponse pour éviter les différences purement typographiques.
 *
 * - Uniformise les apostrophes.
 * - Supprime les espaces en début et fin.
 * - Remplace les espaces multiples par un espace simple.
 * - Ignore la casse si caseSensitive est désactivé.
 */
const normalizeAnswer = (
  value: string,
  caseSensitive: boolean,
): string => {
  const normalized = value
    .trim()
    .replace(/[\u2018\u2019\u02BC\u0060]/g, "'")
    .replace(/\s+/g, " ");

  return caseSensitive
    ? normalized
    : normalized.toLocaleLowerCase("fr");
};

const isAnswerCorrect = (
  userAnswer: string,
  expectedAnswers: string[],
  caseSensitive: boolean,
): boolean => {
  const normalizedUserAnswer = normalizeAnswer(
    userAnswer,
    caseSensitive,
  );

  if (!normalizedUserAnswer) {
    return false;
  }

  return expectedAnswers.some(
    (expectedAnswer) =>
      normalizeAnswer(expectedAnswer, caseSensitive) ===
      normalizedUserAnswer,
  );
};

const getCardInputs = (
  card: TransformationCard,
): TransformationInputPart[] =>
  card.target.filter(
    (part): part is TransformationInputPart =>
      part.type === "input",
  );

export function useTransformationCards({
  data,
  onComplete,
}: UseTransformationCardsOptions) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [validatedCards, setValidatedCards] = useState<string[]>([]);
  const [startedAt] = useState(() => new Date());
  const [finishedAt, setFinishedAt] = useState<Date | null>(null);

  const totalInputs = useMemo(
    () =>
      data.cards.reduce(
        (total, card) => total + getCardInputs(card).length,
        0,
      ),
    [data.cards],
  );

  const totalCards = data.cards.length;

  const completedCards = validatedCards.length;

  const currentCardIndex = useMemo(
    () =>
      data.cards.findIndex(
        (card) => !validatedCards.includes(card.id),
      ),
    [data.cards, validatedCards],
  );

  const currentCard =
    currentCardIndex >= 0
      ? data.cards[currentCardIndex]
      : null;

  const validatedAnswers = useMemo(() => {
    return data.cards.flatMap((card) => {
      if (!validatedCards.includes(card.id)) {
        return [];
      }

      return getCardInputs(card).map((input) => {
        const userAnswer = answers[input.id] ?? "";

        return {
          cardId: card.id,
          inputId: input.id,
          userAnswer,
          expectedAnswers: input.answers,
          isCorrect: isAnswerCorrect(
            userAnswer,
            input.answers,
            input.caseSensitive ?? false,
          ),
        };
      });
    });
  }, [answers, data.cards, validatedCards]);

  const correctAnswers = validatedAnswers.filter(
    (answer) => answer.isCorrect,
  ).length;

  const score =
    totalInputs > 0
      ? Math.round((correctAnswers / totalInputs) * 100)
      : 0;

  const isFinished =
    completedCards === totalCards && totalCards > 0;

  const setAnswer = useCallback(
    (inputId: string, value: string) => {
      setAnswers((previousAnswers) => ({
        ...previousAnswers,
        [inputId]: value,
      }));
    },
    [],
  );

  const getAnswer = useCallback(
    (inputId: string): string => answers[inputId] ?? "",
    [answers],
  );

  const validateCard = useCallback(
    (cardId: string): CardValidationResult | null => {
      const card = data.cards.find(
        (item) => item.id === cardId,
      );

      if (!card || validatedCards.includes(cardId)) {
        return null;
      }

      const inputs = getCardInputs(card);

      const cardAnswers: TransformationAnswer[] = inputs.map(
        (input) => {
          const userAnswer = answers[input.id] ?? "";

          return {
            cardId: card.id,
            inputId: input.id,
            userAnswer,
            expectedAnswers: input.answers,
            isCorrect: isAnswerCorrect(
              userAnswer,
              input.answers,
              input.caseSensitive ?? false,
            ),
          };
        },
      );

      const cardResult: TransformationCardResult = {
        cardId: card.id,
        answers: cardAnswers,
        isCorrect:
          cardAnswers.length > 0 &&
          cardAnswers.every((answer) => answer.isCorrect),
      };

      setValidatedCards((previousCards) => [
        ...previousCards,
        cardId,
      ]);

      return {
        cardResult,
        answers: cardAnswers,
      };
    },
    [answers, data.cards, validatedCards],
  );

  const validateAll = useCallback(() => {
    const remainingCards = data.cards.filter(
      (card) => !validatedCards.includes(card.id),
    );

    const newlyValidatedCards = remainingCards.map((card) => {
      const cardAnswers: TransformationAnswer[] =
        getCardInputs(card).map((input) => {
          const userAnswer = answers[input.id] ?? "";

          return {
            cardId: card.id,
            inputId: input.id,
            userAnswer,
            expectedAnswers: input.answers,
            isCorrect: isAnswerCorrect(
              userAnswer,
              input.answers,
              input.caseSensitive ?? false,
            ),
          };
        });

      return {
        cardId: card.id,
        answers: cardAnswers,
        isCorrect:
          cardAnswers.length > 0 &&
          cardAnswers.every((answer) => answer.isCorrect),
      };
    });

    const allValidatedCards = [
      ...validatedCards,
      ...remainingCards.map((card) => card.id),
    ];

    setValidatedCards(allValidatedCards);

    const allAnswers = data.cards.flatMap((card) => {
      const alreadyValidated = validatedCards.includes(card.id);

      if (alreadyValidated) {
        return validatedAnswers.filter(
          (answer) => answer.cardId === card.id,
        );
      }

      return (
        newlyValidatedCards.find(
          (result) => result.cardId === card.id,
        )?.answers ?? []
      );
    });

    const finalCorrectAnswers = allAnswers.filter(
      (answer) => answer.isCorrect,
    ).length;

    const finalScore =
      totalInputs > 0
        ? Math.round(
            (finalCorrectAnswers / totalInputs) * 100,
          )
        : 0;

    const completedAt = new Date();

    const result: TransformationCardsResult = {
      totalCards,
      completedCards: totalCards,
      totalInputs,
      correctAnswers: finalCorrectAnswers,
      score: finalScore,
      answers: allAnswers,
      cards: data.cards.map((card) => {
        const cardAnswers = allAnswers.filter(
          (answer) => answer.cardId === card.id,
        );

        return {
          cardId: card.id,
          answers: cardAnswers,
          isCorrect:
            cardAnswers.length > 0 &&
            cardAnswers.every((answer) => answer.isCorrect),
        };
      }),
      startedAt,
      finishedAt: completedAt,
    };

    setFinishedAt(completedAt);
    onComplete?.(result);

    return result;
  }, [
    answers,
    data.cards,
    onComplete,
    totalCards,
    totalInputs,
    validatedAnswers,
    validatedCards,
    startedAt,
  ]);

  const reset = useCallback(() => {
    setAnswers({});
    setValidatedCards([]);
    setFinishedAt(null);
  }, []);

  return {
    answers,
    setAnswer,
    getAnswer,
    validateCard,
    validateAll,
    reset,
    totalCards,
    totalInputs,
    completedCards,
    currentCardIndex,
    currentCard,
    correctAnswers,
    score,
    isFinished,
    startedAt,
    finishedAt,
    validatedCards,
    validatedAnswers,
  };
}
