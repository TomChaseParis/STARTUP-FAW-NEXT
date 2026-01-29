// -----------------------------------------------------------
// 🧩 EXTRACTION DU PRÉNOM
// -----------------------------------------------------------

export function extractName(text: string): string | null {
  const patterns = [
    /je m'appelle ([a-zàâçéèêëîïôûùüÿñ'-]+)/i,
    /je suis ([a-zàâçéèêëîïôûùüÿñ'-]+)/i,
    /mon prénom c'?est ([a-zàâçéèêëîïôûùüÿñ'-]+)/i,
    /appelle-moi ([a-zàâçéèêëîïôûùüÿñ'-]+)/i,
  ];

  for (const p of patterns) {
    const m = text.match(p);
    if (m) {
      const raw = m[1].trim();
      return raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
    }
  }

  return null;
}

// -----------------------------------------------------------
// 🧩 EXTRACTION DU GENRE
// -----------------------------------------------------------

export function extractGender(text: string): "male" | "female" | "unknown" {
  if (/je suis une femme|je suis femme|je suis fille|je suis une fille/i.test(text)) {
    return "female";
  }

  if (/je suis un homme|je suis homme|je suis garçon|je suis un garçon/i.test(text)) {
    return "male";
  }

  return "unknown";
}

// -----------------------------------------------------------
// 🧩 Détection très simple de l'anglais
// -----------------------------------------------------------
export function isEnglish(text: string): boolean {
  // Détection très basique mais fiable pour du A0
  return /[a-z]/i.test(text) && /\b(the|and|you|I|my|is|are|can|help|please)\b/i.test(text);
}

// -----------------------------------------------------------
// 🧠 EXTRACTION NIVEAU / OBJECTIFS / DIFFICULTÉS
// -----------------------------------------------------------


export function extractUserInfo(text: string) {
  const info: any = {};

  // Niveau
  if (/débutant|a1/i.test(text)) info.level = "A1";
  if (/intermédiaire|b1/i.test(text)) info.level = "B1";
  if (/avancé|c1/i.test(text)) info.level = "C1";

  // Objectifs
  const goals = [];
  if (/parler/i.test(text)) goals.push("expression orale");
  if (/prononciation/i.test(text)) goals.push("prononciation");
  if (/grammaire/i.test(text)) goals.push("grammaire");
  if (/vocabulaire/i.test(text)) goals.push("vocabulaire");
  if (goals.length) info.goals = goals;

  // Difficultés
  const issues = [];
  if (/difficil/i.test(text)) issues.push("difficultés générales");
  if (/comprendre/i.test(text)) issues.push("compréhension orale");
  if (/conjugaison/i.test(text)) issues.push("conjugaison");
  if (issues.length) info.issues = issues;

  return info;
}