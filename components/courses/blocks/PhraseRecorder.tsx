"use client";

import { useSpeechPractice } from "../../../hooks/useSpeechPratice";

type Props = {
  text: string;
  tip?: string;
};

const PhraseRecorder: React.FC<Props> = ({
  text,
  tip,
}) => {
  const {
    start,
    stop,
    isRecording,
    transcript,
    score,
  } = useSpeechPractice(text);

  return (
    <div className="rounded-xl bg-amber-50 border-l-4 border-amber-400 p-4">

      <p className="text-lg font-medium text-black">
        {text}
      </p>

      {tip && (
        <p className="text-sm text-amber-700 mt-1">
          ⚠ {tip}
        </p>
      )}

      <div className="mt-3 flex gap-3">

        {!isRecording && (
          <button
            onClick={start}
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            🎤 Parler
          </button>
        )}

        {isRecording && (
          <button
            onClick={stop}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Stop
          </button>
        )}

      </div>

      {transcript && (
        <p className="mt-2 text-sm text-slate-700">
          Reconnu : {transcript}
        </p>
      )}

      {score !== null && (
        <p className="mt-1 font-semibold text-amber-600">
          Score : {score} / 100
        </p>
      )}

    </div>
  );
};

export default PhraseRecorder;