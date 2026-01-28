// lib/viviane/intents.ts

export type Intent =
  | "COMPREHENSION"
  | "GRAMMAR"
  | "PRONUNCIATION"
  | "YES"
  | "NO"
  | "UNKNOWN";

export function detectIntent(text: string): Intent {
  const t = text.toLowerCase();

  if (["oui", "d’accord", "ok", "vas-y"].some(w => t.includes(w))) return "YES";
  if (["non", "pas vraiment"].some(w => t.includes(w))) return "NO";

  if (t.includes("consigne") || t.includes("comprendre")) return "COMPREHENSION";
  if (t.includes("grammaire") || t.includes("imparfait")) return "GRAMMAR";
  if (t.includes("prononciation") || t.includes("répéter")) return "PRONUNCIATION";

  return "UNKNOWN";
}

export function getVivianeResponse(intent: Intent): string {
  switch (intent) {
    case "COMPREHENSION":
      return "Très bien. Veux-tu que je t’explique la consigne ?";
    case "GRAMMAR":
      return "D’accord. Quelle phrase te pose problème ?";
    case "PRONUNCIATION":
      return "Parfait. Répète après moi, je t’écoute.";
    default:
      return "Dis-moi ce que tu aimerais travailler.";
  }
}