import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const audio = formData.get("audio");

    if (!(audio instanceof File)) {
      return NextResponse.json(
        {
          error: "Aucun fichier audio reçu.",
        },
        { status: 400 },
      );
    }

    if (audio.size === 0) {
      return NextResponse.json(
        {
          error: "Le fichier audio est vide.",
        },
        { status: 400 },
      );
    }

    if (audio.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: "Le fichier audio est trop volumineux.",
        },
        { status: 413 },
      );
    }

    console.log("🎤 Audio reçu :", {
      name: audio.name,
      type: audio.type,
      size: audio.size,
    });

    const transcription =
      await openai.audio.transcriptions.create({
        file: audio,
        model: "gpt-transcribe",
      });

    console.log(
      "🤖 Transcription GPT :",
      transcription.text,
    );

    return NextResponse.json({
      text: transcription.text,
    });
  } catch (error) {
    console.error(
      "❌ Speech transcription error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Impossible de transcrire l'audio.",
      },
      { status: 500 },
    );
  }
}