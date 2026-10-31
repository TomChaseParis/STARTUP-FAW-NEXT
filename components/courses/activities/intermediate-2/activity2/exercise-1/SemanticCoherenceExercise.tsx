"use client";

import { useState } from "react";
import type { DragEvent } from "react";

import type {
  ExerciseHistoryItem,
  ExerciseSessionResult,
} from "@/components/courses/common/types/exerciseSessionTypes";

import {
  semanticCategories,
  semanticPhrases,
  type SemanticCategoryId,
  type SemanticPhrase,
} from "./data/semanticCoherenceData";

type SemanticCoherenceExerciseProps = {
  onCompleted: (result: ExerciseSessionResult) => void;
};

type Answers = Record<string, SemanticCategoryId>;

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];

  for (let index = shuffled.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

export default function SemanticCoherenceExercise({
  onCompleted,
}: SemanticCoherenceExerciseProps) {
  const [phrases] = useState<SemanticPhrase[]>(() =>
    shuffleArray(semanticPhrases),
  );

  const [startedAt] = useState<Date>(() => new Date());

  const [answers, setAnswers] = useState<Answers>({});

  const [selectedPhraseId, setSelectedPhraseId] = useState<string | null>(null);

  const [isChecked, setIsChecked] = useState(false);

  const [isCompleted, setIsCompleted] = useState(false);

  const availablePhrases = phrases.filter((phrase) => !answers[phrase.id]);

  const assignedCount = Object.keys(answers).length;

  const totalCount = phrases.length;

  const allPhrasesAssigned = assignedCount === totalCount;

  const correctCount = phrases.filter(
    (phrase) => answers[phrase.id] === phrase.categoryId,
  ).length;

  const score = Math.round((correctCount / totalCount) * 100);

  const getCategory = (categoryId: SemanticCategoryId) =>
    semanticCategories.find((category) => category.id === categoryId);

  const getCategoryPhrases = (categoryId: SemanticCategoryId) =>
    phrases.filter((phrase) => answers[phrase.id] === categoryId);

  const handleDragStart = (
    event: DragEvent<HTMLDivElement>,
    phraseId: string,
  ) => {
    if (isChecked) {
      event.preventDefault();
      return;
    }

    event.dataTransfer.setData("text/plain", phraseId);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (
    event: DragEvent<HTMLDivElement>,
    categoryId: SemanticCategoryId,
  ) => {
    event.preventDefault();

    if (isChecked) return;

    const phraseId = event.dataTransfer.getData("text/plain");

    if (!phraseId) return;

    const phrase = phrases.find((item) => item.id === phraseId);

    if (!phrase) return;

    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [phraseId]: categoryId,
    }));

    setSelectedPhraseId(null);
  };

  const handleSelectPhrase = (phraseId: string) => {
    if (isChecked) return;

    setSelectedPhraseId((current) => (current === phraseId ? null : phraseId));
  };

  const handleCategoryClick = (categoryId: SemanticCategoryId) => {
    if (!selectedPhraseId || isChecked) return;

    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [selectedPhraseId]: categoryId,
    }));

    setSelectedPhraseId(null);
  };

  const handleReturnToPool = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (isChecked) return;

    const phraseId = event.dataTransfer.getData("text/plain");

    if (!phraseId) return;

    setAnswers((previousAnswers) => {
      const updatedAnswers = { ...previousAnswers };

      delete updatedAnswers[phraseId];

      return updatedAnswers;
    });

    setSelectedPhraseId(null);
  };

  const handleCheckAnswers = () => {
    if (!allPhrasesAssigned || isChecked || isCompleted) return;

    const finishedAt = new Date();

    const duration = Math.max(
      0,
      Math.round((finishedAt.getTime() - startedAt.getTime()) / 1000),
    );

    const history: ExerciseHistoryItem[] = phrases.map((phrase, index) => {
      const selectedCategoryId = answers[phrase.id];

      const selectedCategory = getCategory(selectedCategoryId);

      const correctCategory = getCategory(phrase.categoryId);

      const isCorrect = selectedCategoryId === phrase.categoryId;

      return {
        questionId: index + 1,
        question: phrase.text,
        selectedAnswer: selectedCategory?.label ?? "Aucune réponse",
        correctAnswer: correctCategory?.label ?? "Réponse inconnue",
        isCorrect,
        explanation: isCorrect
          ? "Bonne association : cette phrase correspond bien à cette situation."
          : `Cette phrase correspond à la photo : ${correctCategory?.label ?? "inconnue"}.`,
      };
    });

    const finalCorrectCount = history.filter((item) => item.isCorrect).length;

    const finalScore = Math.round((finalCorrectCount / totalCount) * 100);

    const result: ExerciseSessionResult = {
      score: finalScore,
      correctAnswers: finalCorrectCount,
      totalQuestions: totalCount,
      history,
      startedAt,
      finishedAt,
      duration,
    };

    setIsChecked(true);
    setIsCompleted(true);

    onCompleted(result);
  };

  const getPhraseStatus = (phrase: SemanticPhrase) => {
    if (!isChecked) return null;

    return answers[phrase.id] === phrase.categoryId;
  };

  return (
    <section
      id="semantic-coherence-exercise"
      className="w-full min-w-0 space-y-8"
    >
      {/* PROGRESSION */}
      <div className="rounded-2xl border border-amber-200 bg-[#FFFDF7] p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm font-semibold text-gray-700">
            Progression
          </span>

          <span className="text-sm font-bold text-amber-700">
            {assignedCount} / {totalCount} phrases placées
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-amber-500 transition-all duration-300"
            style={{
              width: `${(assignedCount / totalCount) * 100}%`,
            }}
          />
        </div>

        {selectedPhraseId && (
          <p className="mt-3 text-sm font-medium text-amber-700">
            Phrase sélectionnée : clique maintenant sur la photo correspondante.
          </p>
        )}
      </div>

      {/* PHOTOS FIXES ET ZONES DE DÉPÔT */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {semanticCategories.map((category) => {
          const categoryPhrases = getCategoryPhrases(category.id);

          return (
            <div
              key={category.id}
              className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
              {/* IMAGE FIXE AGRANDIE */}
              <div className="relative flex h-72 w-full items-center justify-center overflow-hidden bg-[#FFFDF7] p-1 sm:h-80 lg:h-96">
                <img
                  src={category.image}
                  alt={category.imageAlt}
                  className="h-full w-full object-contain"
                />
              </div>

              {/* ZONE DE DÉPÔT */}
              <div
                role="button"
                tabIndex={0}
                aria-label={`Zone de dépôt ${category.label}`}
                onClick={() => handleCategoryClick(category.id)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => handleDrop(event, category.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleCategoryClick(category.id);
                  }
                }}
                className={`flex min-h-40 flex-1 flex-col gap-3 border-t-2 border-dashed p-3 transition-colors ${
                  selectedPhraseId
                    ? "border-amber-400 bg-amber-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                    {category.label}
                  </span>

                  <span className="rounded-full bg-white px-2 py-1 text-xs font-semibold text-gray-500">
                    {categoryPhrases.length}
                  </span>
                </div>

                {categoryPhrases.length === 0 && (
                  <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-gray-300 p-4 text-center text-sm text-gray-400">
                    Dépose les phrases ici
                  </div>
                )}

                {categoryPhrases.map((phrase) => {
                  const status = getPhraseStatus(phrase);

                  const correctCategory = getCategory(phrase.categoryId);

                  return (
                    <div
                      key={phrase.id}
                      draggable={!isChecked}
                      onDragStart={(event) => handleDragStart(event, phrase.id)}
                      onClick={(event) => {
                        event.stopPropagation();

                        if (!isChecked) {
                          handleSelectPhrase(phrase.id);
                        }
                      }}
                      className={`relative rounded-xl border p-3 pr-9 text-sm leading-relaxed shadow-sm transition-colors ${
                        status === true
                          ? "border-green-400 bg-green-50 text-green-900"
                          : status === false
                            ? "border-red-400 bg-red-50 text-red-900"
                            : "border-gray-200 bg-white text-gray-700 hover:border-amber-400"
                      } ${
                        selectedPhraseId === phrase.id
                          ? "ring-2 ring-amber-400"
                          : ""
                      }`}
                    >
                      {phrase.text}

                      {status === true && (
                        <span className="absolute bottom-2 right-2 font-bold text-green-600">
                          ✓
                        </span>
                      )}

                      {status === false && (
                        <div className="mt-3 border-t border-red-200 pt-2">
                          <p className="text-xs font-semibold text-red-700">
                            Mauvaise association
                          </p>

                          <p className="mt-1 text-xs text-red-800">
                            Bonne photo : {correctCategory?.label}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* PHRASES À CLASSER */}
      <div
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleReturnToPool}
        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              Les phrases à associer
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Fais glisser chaque phrase vers la photo correspondante.
            </p>
          </div>

          <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800">
            {availablePhrases.length} restante
            {availablePhrases.length > 1 ? "s" : ""}
          </span>
        </div>

        {availablePhrases.length === 0 ? (
          <div className="rounded-xl border border-dashed border-green-300 bg-green-50 p-5 text-center text-sm font-medium text-green-700">
            Toutes les phrases ont été placées ! Tu peux maintenant vérifier tes
            réponses.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {availablePhrases.map((phrase) => (
              <div
                key={phrase.id}
                draggable={!isChecked}
                onDragStart={(event) => handleDragStart(event, phrase.id)}
                onClick={() => handleSelectPhrase(phrase.id)}
                className={`flex cursor-grab items-center gap-3 rounded-xl border p-4 text-sm leading-relaxed transition-colors ${
                  selectedPhraseId === phrase.id
                    ? "border-amber-500 bg-amber-50 ring-2 ring-amber-200"
                    : "border-gray-200 bg-gray-50 hover:border-amber-400 hover:bg-amber-50"
                }`}
              >
                <span className="shrink-0 text-gray-400">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      d="M8 5h.01M8 12h.01M8 19h.01M16 5h.01M16 12h.01M16 19h.01"
                      strokeLinecap="round"
                      strokeWidth="3"
                    />
                  </svg>
                </span>

                <span className="text-gray-700">{phrase.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RÉSULTAT FINAL */}
      {isChecked && (
        <div
          className={`rounded-2xl border p-5 ${
            correctCount === totalCount
              ? "border-green-200 bg-green-50"
              : "border-amber-200 bg-amber-50"
          }`}
        >
          <h3 className="text-lg font-bold text-gray-800">
            {correctCount === totalCount
              ? "Excellent ! Toutes les réponses sont correctes."
              : "Voici le résultat de ton exercice"}
          </h3>

          <p className="mt-2 text-sm text-gray-700">
            Tu as trouvé {correctCount} bonne
            {correctCount > 1 ? "s" : ""} réponse
            {correctCount > 1 ? "s" : ""} sur {totalCount}.
          </p>

          <p className="mt-1 text-2xl font-bold text-gray-900">{score} %</p>

          {correctCount < totalCount && (
            <p className="mt-2 text-sm text-amber-800">
              Les réponses incorrectes sont indiquées en rouge sous les photos.
              La bonne photo est précisée pour chacune.
            </p>
          )}
        </div>
      )}

      {/* VALIDATION */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleCheckAnswers}
          disabled={!allPhrasesAssigned || isChecked}
          className="rounded-xl bg-amber-500 px-8 py-3 font-bold text-white shadow-md transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
        >
          {isChecked ? "Exercice terminé" : "Vérifier mes réponses"}
        </button>
      </div>
    </section>
  );
}
