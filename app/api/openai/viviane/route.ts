import { NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "../../viviane/chat/prompt";
import {
  extractName,
  extractGender,
  extractUserInfo,
  isEnglish,
} from "../../viviane/chat/nlp";
import {
  getMemory,
  saveMessage,
  getUserData,
  updateUserData,
} from "../../viviane/chat/memory";
import { ACTIVITY_1_CONTEXT } from "../../viviane/chat/context/beginner/activity1";
import { ACTIVITY_CLARA_CONTEXT } from "../../viviane/chat/context/elementary/activity1";
import OpenAI from "openai";

export const dynamic = "force-dynamic";

// 🔥 Client OpenAI
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { userId, text, activityId } = await req.json();

  // Détection automatique du niveau d'anglais
  const studentSpeaksEnglish = isEnglish(text);

  // Mémoire & infos utilisateur
  const memory = getMemory(userId);
  const info = getUserData(userId);
  const isFirstMessage = memory.length === 0;

  // Extraction info utilisateur
  const name = extractName(text);
  const gender = extractGender(text);
  const infos = extractUserInfo(text);

  if (name) updateUserData(userId, { name });
  if (gender !== "unknown") updateUserData(userId, { gender });
  if (Object.keys(infos).length > 0) updateUserData(userId, infos);

  // SYSTEM PROMPT
  const messages: any[] = [{ role: "system", content: SYSTEM_PROMPT }];

  // 🔥 Si l’élève parle anglais : Viviane répond en anglais
  if (studentSpeaksEnglish) {
    messages.push({
      role: "system",
      content: `
The student is speaking in English.
You MUST answer in ENGLISH.
But you continue teaching FRENCH.
→ Explanations = in English
→ Examples = in French
→ Your personality stays identical: warm, feminine, friendly, professional.
`,
    });
  }

  // 🔥 CONTEXTE ACTIVITÉ BEGINNER
  if (activityId === "beginner_activity_1") {
    messages.push({
      role: "system",
      content: `
You are currently in the activity: ${ACTIVITY_1_CONTEXT.title}

Here is the pedagogical context (for your reasoning only):
${JSON.stringify(ACTIVITY_1_CONTEXT, null, 2)}

NEVER copy the JSON.
Use it to:
- guide the student,
- correct gently,
- propose structured help,
- keep coherence with the lesson.
`,
    });
  }

  // 🔥 CONTEXTE ACTIVITÉ CLARA (ÉLÉMENTAIRE)
  if (activityId === "elementary_activity_1") {
    messages.push({
      role: "system",
      content: `
You are currently in the activity: ${ACTIVITY_CLARA_CONTEXT.title}

Here is the pedagogical context the student is studying (for reasoning only):
${JSON.stringify(ACTIVITY_CLARA_CONTEXT, null, 2)}

Here is the FULL transcription of Clara’s video (DO NOT REPEAT it):
${ACTIVITY_CLARA_CONTEXT.transcription}

You use this ONLY to:
- help the student understand Clara’s day,
- help them formulate questions,
- correct their JE → ELLE transformation,
- explain verbs, pronouns, vocabulary,
- guide them step by step.

NEVER quote or repeat the entire original text.
NEVER output long chunks of the transcription.
`,
    });
  }

  // 🔵 MÉMOIRE DE LA CONVERSATION
  messages.push(...memory);

  // ⭐ MESSAGE D'ACCUEIL (juste au premier message)
  if (isFirstMessage) {
    messages.push({
      role: "system",
      content: `
Send a warm welcome message:
- short greeting
- ask the student’s name
- ask how they feel
- stay feminine, warm, natural
      `,
    });
  }

  // 🧑‍🎓 Message de l’utilisateur
  messages.push({ role: "user", content: text });

  // 🧠 APPEL OPENAI
  const completion = await client.chat.completions.create({
    model: "gpt-4.1",
    messages,
  });

  const vivianeText = completion.choices[0].message.content || "";

  // 💾 Sauvegarde mémoire
  saveMessage(userId, { role: "user", content: text });
  saveMessage(userId, { role: "assistant", content: vivianeText });

  // 🔥 RÉPONSE JSON
  return NextResponse.json({
    text: vivianeText,
  });
}
