import { NextResponse } from "next/server";
import { detectIntent, getVivianeResponse } from "@/lib/viviane/intents";
import { getMemory, setMemory } from "@/lib/viviane/memory";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { text } = await req.json();

  const intent = detectIntent(text);
  const memory = getMemory();

  let vivianeText = "";

  // 🧠 Gestion de la mémoire courte
  if (intent === "YES" && memory.lastIntent === "COMPREHENSION") {
    vivianeText =
      "D’accord. Voici la consigne : écoute la chanson et complète les verbes à l’imparfait.";
  } else if (intent === "NO" && memory.lastIntent === "COMPREHENSION") {
    vivianeText = "Très bien. Dis-moi ce que tu préfères faire à la place.";
  } else {
    vivianeText = getVivianeResponse(intent);
  }

  // 👉 mémoriser ce que Viviane vient de faire
  setMemory(intent, vivianeText);

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${process.env.ELEVENLABS_VOICE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": process.env.ELEVENLABS_API_KEY as string,
      },
      body: JSON.stringify({
        text: vivianeText,
        model_id: "eleven_multilingual_v2",
        output_format: "mp3_44100_128",
      }),
    },
  );

  if (!response.ok) {
    const error = await response.text();
    return new NextResponse(error, { status: 500 });
  }

  const audioBuffer = await response.arrayBuffer();

  return new NextResponse(audioBuffer, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Content-Length": audioBuffer.byteLength.toString(),
    },
  });
}