"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useQuizEngine, Question } from "@/hooks/useQuizEngine";
import { computeScore, getScoreLevel } from "@/utils/quizScoring";

type Props = {
  questions: Question[];
  mode?: "training" | "exam";
};

const QuizEngine: React.FC<Props> = ({ questions }) => {
  const {
    currentIndex,
    currentQuestion,
    selectedChoiceId,
    selectChoice,
    nextQuestion,
    resetQuiz,
    history,
    totalQuestions,
    correctAnswers,
    isFinished,
    processSpeechAnswer,
  } = useQuizEngine(questions);

  const [showReport, setShowReport] = useState(false);

  /* ================= AUDIO CONTROL ================= */

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isTeacherTalking, setIsTeacherTalking] = useState(false);
  const [audioFinished, setAudioFinished] = useState(false);

  /* ================= VOICE CONTROL ================= */

  const recognitionRef = useRef<any>(null);
  const [isListening, setIsListening] = useState(false);

  /* ================= FINAL TEACHER ANNOUNCEMENT ================= */

  const [isTeacherAnnouncingScore, setIsTeacherAnnouncingScore] = useState(false);

  useEffect(() => {
    if (isFinished) {
      setTimeout(() => {
        setIsTeacherAnnouncingScore(true);
      }, 800);
    }
  }, [isFinished]);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "fr-FR";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      processSpeechAnswer(transcript);
      recognition.stop();
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [currentQuestion]);

  const startListening = () => {
    if (!recognitionRef.current) return;
    setIsListening(true);
    recognitionRef.current.start();
  };

  const progressPercent =
    totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  const score = computeScore(correctAnswers, totalQuestions);

  /* ================= AUDIO PROF ================= */

  useEffect(() => {
    if (!selectedChoiceId || !currentQuestion) return;

    const choice = currentQuestion.choices.find(
      (c) => c.id === selectedChoiceId,
    );

    if (!choice) return;

    let audioSrc: string | undefined;

    if (choice.isCorrect && choice.teacherAudioCorrect) {
      audioSrc = choice.teacherAudioCorrect;
    }

    if (!choice.isCorrect && choice.teacherAudioWrong) {
      audioSrc = choice.teacherAudioWrong;
    }

    if (!audioSrc) return;

    const audio = new Audio(audioSrc);
    audioRef.current = audio;

    setIsTeacherTalking(true);
    setAudioFinished(false);

    audio.play();

    audio.onended = () => {
      setIsTeacherTalking(false);
      setAudioFinished(true);

      const isLastQuestion = currentIndex === totalQuestions - 1;

      if (isLastQuestion) {
        setTimeout(() => {
          nextQuestion();
        }, 500);
      }
    };
  }, [selectedChoiceId, currentQuestion]);

  if (!currentQuestion) return null;

  /* ================= RESULT PAGE ================= */

  if (isFinished) {
    if (showReport) {
      return (
        <div className="bg-slate-50 py-20 text-slate-900">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="mb-10 text-center text-3xl font-bold">
              📊 Détail de tes réponses
            </h2>

            <div className="space-y-8">
              {history.map((item, index) => {
                const question = questions.find(
                  (q) => q.id === item.questionId,
                );

                const selectedChoice = question?.choices.find(
                  (c) => c.id === item.selectedChoiceId,
                );

                const correctChoice = question?.choices.find(
                  (c) => c.isCorrect,
                );

                return (
                  <div
                    key={item.questionId}
                    className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200"
                  >
                    <p className="mb-3 text-lg font-semibold">
                      Question {index + 1}
                    </p>

                    <p className="mb-4 text-slate-800">{question?.question}</p>

                    <p className="mb-2 text-slate-700">
                      Ta réponse :{" "}
                      <span
                        className={
                          item.isCorrect
                            ? "font-semibold text-green-600"
                            : "font-semibold text-red-600"
                        }
                      >
                        {selectedChoice?.label}
                      </span>
                    </p>

                    {!item.isCorrect && (
                      <p className="mb-2 font-semibold text-green-700">
                        Bonne réponse : {correctChoice?.label}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={resetQuiz}
                className="rounded-xl bg-amber-500 px-8 py-3 font-semibold text-black shadow-md transition hover:bg-amber-400"
              >
                Recommencer le quiz
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-slate-50 py-24 text-slate-900">
        <div className="mx-auto max-w-3xl px-6 text-center">

          {isTeacherAnnouncingScore && (
            <div className="mb-10 flex flex-col items-center">

              <div className="relative h-32 w-32 overflow-hidden rounded-full shadow-xl ring-4 ring-amber-400 animate-pulse">
                <Image
                  src={
                    currentQuestion?.teacherImage ||
                    "/images/teachers/default.png"
                  }
                  alt="Professeur"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>

              <div className="relative mt-6 max-w-md rounded-2xl bg-amber-100 px-6 py-4 text-black shadow-md">

                <p className="text-lg font-semibold">
                  Ton score est de {score} sur 100 !
                </p>

                <p className="mt-1 text-sm">
                  Tu as {correctAnswers} bonnes réponses sur {totalQuestions}.
                </p>

                <p className="mt-2 font-semibold text-amber-700">
                  Niveau : {getScoreLevel(score)}
                </p>

                <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-amber-100"></div>
              </div>
            </div>
          )}

          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-amber-500">
            Résultat final
          </p>

          <p className="text-7xl font-extrabold">
            {score}
            <span className="text-3xl text-slate-500"> / 100</span>
          </p>

          <p className="mt-4 text-lg text-slate-700">
            {correctAnswers} / {totalQuestions} bonnes réponses
          </p>

          <p className="mt-2 text-lg font-semibold text-amber-600">
            Niveau : {getScoreLevel(score)}
          </p>

          <div className="mt-12 flex justify-center gap-6">
            <button
              onClick={() => setShowReport(true)}
              className="rounded-xl bg-black px-8 py-3 text-white shadow-md transition hover:bg-black/90"
            >
              Voir mes résultats
            </button>

            <button
              onClick={resetQuiz}
              className="rounded-xl bg-amber-500 px-8 py-3 font-semibold text-black shadow-md transition hover:bg-amber-400"
            >
              Recommencer
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ================= QUESTION PAGE ================= */

  const correctChoice = currentQuestion.choices.find((c) => c.isCorrect);
  const selectedChoice = currentQuestion.choices.find(
    (c) => c.id === selectedChoiceId,
  );

  const playQuestionAudio = () => {
    if (!currentQuestion || !currentQuestion.teacherAudioQuestion) return;

    const audio = new Audio(currentQuestion.teacherAudioQuestion);

    audioRef.current = audio;

    setIsTeacherTalking(true);
    setAudioFinished(false);

    audio.play();

    audio.onended = () => {
      setIsTeacherTalking(false);
      setAudioFinished(true);
    };
  };

  return (
    <section className="mx-auto max-w-5xl py-16">

      <div className="mb-6 h-2 w-full rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-amber-500 transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="rounded-2xl bg-white p-10 shadow-xl ring-1 ring-black/5">

        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={playQuestionAudio}
            disabled={isTeacherTalking}
            className={`
              flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg transition-all
              ${
                isTeacherTalking
                  ? "animate-pulse cursor-not-allowed opacity-50"
                  : "hover:scale-105"
              }
            `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 10.868v2.264a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
              />
            </svg>
          </button>

          <h3 className="text-xl font-semibold text-black">
            Question {currentIndex + 1} / {totalQuestions}
          </h3>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row">

          <div className="flex-1">

            <p className="mb-8 text-lg text-black">
              {currentQuestion.question}
            </p>

            {isTeacherTalking && (
              <div className="mb-6 flex animate-pulse items-center gap-3">

                <div className="relative h-24 w-24 overflow-hidden rounded-full shadow ring-2 ring-amber-400">
                  <Image
                    src={
                      currentQuestion.teacherImage ||
                      "/images/teachers/default.png"
                    }
                    alt="Professeur"
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>

                <div className="rounded-lg bg-amber-100 px-4 py-2 text-sm font-medium text-black shadow">
                  Le professeur parle...
                </div>
              </div>
            )}

            <div className="space-y-3">
              {currentQuestion.choices.map((choice) => {
                const isSelected = selectedChoiceId === choice.id;
                const isCorrect = choice.isCorrect;

                return (
                  <button
                    key={choice.id}
                    onClick={() => selectChoice(choice.id)}
                    disabled={!!selectedChoiceId || isTeacherTalking}
                    className={`
                      w-full rounded-lg border px-4 py-3 text-left text-black transition
                      ${
                        !selectedChoiceId
                          ? "border-black/20 hover:bg-gray-50"
                          : isCorrect
                          ? "border-green-500 bg-green-100 text-green-800"
                          : isSelected
                          ? "border-red-500 bg-red-100 text-red-800"
                          : "border-black/10"
                      }
                    `}
                  >
                    {choice.label}
                  </button>
                );
              })}
            </div>

            {!selectedChoiceId && (
              <div className="mt-6 flex items-center gap-3">

                <button
                  onClick={startListening}
                  disabled={isListening}
                  className={`
                    relative flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all duration-200
                    ${
                      isListening
                        ? "scale-105 bg-amber-400 text-black"
                        : "bg-white text-amber-600 hover:scale-105 hover:bg-amber-100"
                    }
                  `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 18v3m0 0h3m-3 0H9m3-7a4 4 0 004-4V7a4 4 0 10-8 0v3a4 4 0 004 4z"
                    />
                  </svg>

                  {isListening && (
                    <div className="absolute -bottom-4 flex gap-1">
                      <div className="animate-wave1 h-3 w-1 rounded bg-amber-300"></div>
                      <div className="animate-wave2 h-4 w-1 rounded bg-amber-500"></div>
                      <div className="animate-wave3 h-3 w-1 rounded bg-amber-300"></div>
                    </div>
                  )}
                </button>

                {isListening && (
                  <div className="flex items-center gap-2 text-sm text-black">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-black"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-black delay-75"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-black delay-150"></div>
                    <span>Parle...</span>
                  </div>
                )}
              </div>
            )}

            {selectedChoiceId && (
              <div className="mt-6 rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5">

                {selectedChoice?.isCorrect ? (
                  <p className="font-semibold text-green-700">
                    ✔ Oui, c’est bien : {selectedChoice.label}
                  </p>
                ) : (
                  <p className="font-semibold text-red-700">
                    ❌ Non, c’était : {correctChoice?.label}
                  </p>
                )}

              </div>
            )}

          </div>

          {currentQuestion.image && (
            <div className="relative w-full lg:w-1/3">
              <div className="relative overflow-hidden rounded-xl shadow-md ring-1 ring-black/10">
                <Image
                  src={currentQuestion.image}
                  alt="Illustration"
                  width={600}
                  height={400}
                  className="h-64 w-full object-cover"
                />
              </div>
            </div>
          )}

        </div>

        {selectedChoiceId &&
          audioFinished &&
          currentIndex < totalQuestions - 1 && (
            <div className="mt-10 text-right">
              <button
                onClick={nextQuestion}
                className="rounded-xl bg-black px-6 py-3 text-white shadow-md hover:bg-black/90"
              >
                Question suivante →
              </button>
            </div>
          )}
      </div>
    </section>
  );
};

export default QuizEngine;