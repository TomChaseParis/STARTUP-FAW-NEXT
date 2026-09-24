import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST(request: Request) {
  try {
    /**
     * OpenAI est désactivé temporairement.
     *
     * On vérifie la clé uniquement lorsqu'une requête
     * de transcription est réellement effectuée.
     *
     * Cela permet au build Next.js / Netlify de fonctionner
     * sans OPENAI_API_KEY.
     */
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "La transcription vocale est temporairement indisponible.",
        },
        { status: 503 },
      );
    }

    const openai = new OpenAI({
      apiKey,
    });

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