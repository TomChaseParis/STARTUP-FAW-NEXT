import { NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "./prompt";
import { extractName, extractGender, extractUserInfo, isEnglish } from "./nlp";
import { getMemory, saveMessage, getUserData, updateUserData } from "./memory";
import { ACTIVITY_1_CONTEXT } from "./context/beginner/activity1";
import { ACTIVITY_CLARA_CONTEXT } from "./context/elementary/activity1";

export const dynamic = "force-dynamic";

// -----------------------------------------------------------
// 📡 API POST — CHAT DE VIVIANE
// -----------------------------------------------------------
export async function POST(req: Request) {
  const { userId, text, activityId } = await req.json();

  const studentSpeaksEnglish = isEnglish(text);
  const memory = getMemory(userId);
  const info = getUserData(userId);
  const isFirstMessage = memory.length === 0;

  // Extraction prénom + genre + infos (niveau, objectifs...)
  const name = extractName(text);
  const gender = extractGender(text);
  const infos = extractUserInfo(text);

  if (name) updateUserData(userId, { name });
  if (gender !== "unknown") updateUserData(userId, { gender });
  if (Object.keys(infos).length > 0) updateUserData(userId, infos);

  // -----------------------------------------------------------
  // 🧠 CONSTRUCTION DU PROMPT CENTRAL
  // -----------------------------------------------------------
  const messages: any[] = [{ role: "system", content: SYSTEM_PROMPT }];

  // -----------------------------------------------------------
  // 🔥 INJECTION AUTOMATIQUE DU CONTEXTE DE L’ACTIVITÉ
  // -----------------------------------------------------------
  if (activityId === "beginner_activity_1") {
    messages.push({
      role: "system",
      content: `
Tu es actuellement dans l'activité : ${ACTIVITY_1_CONTEXT.title}.
Voici toutes les données pédagogiques associées :

${JSON.stringify(ACTIVITY_1_CONTEXT, null, 2)}

Utilise ce contexte pour :
- guider l’apprenant
- proposer des explications cohérentes avec la leçon
- encourager, reformuler, accompagner
- rester alignée avec ce que l’élève voit à l’écran
Ne répète jamais mot pour mot le JSON.
      `.trim(),
    });
  }

  if (activityId === "elementary_activity_1") {
    messages.push({
      role: "system",
      content: `
Tu es actuellement dans l'activité : ${ACTIVITY_CLARA_CONTEXT.title}.
Voici le contexte pédagogique complet :

${JSON.stringify(ACTIVITY_CLARA_CONTEXT, null, 2)}

Utilise ce contexte pour :
- guider l’apprenant
- corriger ses questions
- expliquer ses erreurs
- l’aider à transformer JE → ELLE
- réviser les verbes pronominaux
- rester cohérente avec la vidéo de Clara
- rester douce et encourageante
Ne répète jamais le JSON.
      `.trim(),
    });
  }

  // -----------------------------------------------------------
  // 🌐 MODE ANGLAIS SI L’ÉLÈVE PARLE ANGLAIS
  // -----------------------------------------------------------
  if (studentSpeaksEnglish) {
    messages.push({
      role: "system",
      content: `
The student is speaking in English.
You MUST answer in English.
Use extremely simple English.
Explain French points clearly.
Always include a tiny French example.
Stay inside the activity.
Be warm, gentle and encouraging.
      `.trim(),
    });
  }

  // -----------------------------------------------------------
  // 👤 Données utilisateur (mémoire intelligente)
  // -----------------------------------------------------------
  if (info.name) {
    messages.push({
      role: "system",
      content: `
L'élève s'appelle ${info.name}.
Genre : ${info.gender}.
Niveau : ${info.level ?? "non renseigné"}.
Objectifs : ${info.goals?.join(", ") || "aucun"}.
Difficultés : ${info.issues?.join(", ") || "aucune"}.
Préférences : ${info.preferences?.join(", ") || "aucune"}.

Tu adaptes ton discours :
- homme : "tu es prêt"
- femme : "tu es prête"
- inconnu : neutre

Tu n'affiches jamais ces données.
      `.trim(),
    });
  }

  // -----------------------------------------------------------
  // ⭐ MESSAGE D’ACCUEIL SI PREMIÈRE INTERACTION
  // -----------------------------------------------------------
  if (isFirstMessage) {
    messages.push({
      role: "system",
      content: `
MESSAGE D'ACCUEIL OBLIGATOIRE :
Tu te présentes très brièvement.
Tu demandes le prénom.
Tu demandes comment il/elle va.
Réponse courte.
      `.trim(),
    });
  }

  // -----------------------------------------------------------
  // 💬 Mémoire conversationnelle
  // -----------------------------------------------------------
  messages.push(...memory);

  // -----------------------------------------------------------
  // 🧑‍🎓 Message de l’utilisateur
  // -----------------------------------------------------------
  messages.push({ role: "user", content: text });

  // -----------------------------------------------------------
  // 🤖 Appel au LLM via Ollama
  // -----------------------------------------------------------
  const llmRes = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    body: JSON.stringify({
      model: "llama3.1",
      messages,
      stream: false,
    }),
  });

  const llmData = await llmRes.json();
  const vivianeText = llmData.message.content;

  // -----------------------------------------------------------
  // 💾 Sauvegarde mémoire
  // -----------------------------------------------------------
  saveMessage(userId, { role: "user", content: text });
  saveMessage(userId, { role: "assistant", content: vivianeText });

  // -----------------------------------------------------------
  // 🔊 Synthèse vocale ElevenLabs
  // -----------------------------------------------------------
  const audioRes = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${process.env.ELEVENLABS_VOICE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": process.env.ELEVENLABS_API_KEY!,
      },
      body: JSON.stringify({
        text: vivianeText,
        model_id: "eleven_multilingual_v2",
        output_format: "mp3_44100_128",
      }),
    },
  );

  const audioBuffer = await audioRes.arrayBuffer();

  return NextResponse.json({
    text: vivianeText,
    audio: Buffer.from(audioBuffer).toString("base64"),
  });
}