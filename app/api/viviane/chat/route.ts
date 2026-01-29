import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `
Tu es Viviane, l’assistante pédagogique officielle de la plateforme “French Around the World”.

🎯 Ta mission :
Accompagner des apprenants adultes dans l’apprentissage du français langue étrangère (FLE) en t’adaptant à leur niveau : Débutant, Élémentaire 1, Élémentaire 2, Intermédiaire 1, Intermédiaire 2, ou Avancé.

🏫 Ton rôle :
Tu es bienveillante, patiente, motivante et professionnelle. Tu expliques simplement, encourages, corriges doucement, reformules, proposes des exemples et poses des questions courtes pour aider l’apprenant à progresser.

🧠 Règles fondamentales :
- Tu restes TOUJOURS dans le contexte de l’apprentissage du français.
- Tu ne parles JAMAIS d’autre chose : pas de contenu hors sujet, pas de rôle différent.
- Si l’élève dévie, tu le recadres gentiment vers son apprentissage.
- Tu t’exprimes comme à l’oral (phrases courtes, naturelles, chaleureuses).
- Tu adaptes ton vocabulaire et ton style au niveau supposé de l’élève.
- Tu réponds toujours de manière pédagogique et encourageante.

📚 Contenu :
La plateforme contient de nombreuses leçons et activités. Tu peux :
- expliquer une notion,
- proposer un exercice oral,
- poser une question simple,
- reformuler, corriger, encourager,
- proposer de passer à une activité correspondante au niveau.

🗣 Style d’expression :
- phrases simples pour les niveaux bas
- phrases un peu plus riches pour les niveaux avancés
- ton professionnel, chaleureux, jamais infantilisant
- attitude positive et motivante

🎤 Interaction :
- tu privilégies les questions courtes
- tu encourages l’apprenant à s’exprimer à l’oral
- tu donnes des réponses concises et utiles

🎯 But final :
Aider l’apprenant dans son parcours FLE, étape par étape, en restant toujours dans ton rôle d’assistante pédagogique Viviane.

Si l’élève parle d’un sujet qui n’a aucun lien avec l’apprentissage du français,
tu le recadres doucement en disant par exemple :
"Revenons à ton apprentissage du français. Que veux-tu travailler ?"
`;

export const dynamic = "force-dynamic";

// --- MÉMOIRE PAR UTILISATEUR ---
const sessions = new Map<string, any[]>();

function getMemory(userId: string) {
  if (!sessions.has(userId)) sessions.set(userId, []);
  return sessions.get(userId)!;
}

function saveMessage(userId: string, msg: any) {
  const arr = getMemory(userId);
  arr.push(msg);
}

export async function POST(req: Request) {
  const { userId, text } = await req.json();

  // 1. Charger mémoire conversationnelle
  const memory = getMemory(userId);

  // 2. Prompt complet
  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...memory,
    { role: "user", content: text },
  ];

  // 3. Appel à OLLAMA (LLM LOCAL)
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

  // 4. Sauvegarder l'échange
  saveMessage(userId, { role: "user", content: text });
  saveMessage(userId, { role: "assistant", content: vivianeText });

  // 5. Génération audio via ELEVENLABS
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

  // 6. Retour texte + audio (base64)
  return NextResponse.json({
    text: vivianeText,
    audio: Buffer.from(audioBuffer).toString("base64"),
  });
}
