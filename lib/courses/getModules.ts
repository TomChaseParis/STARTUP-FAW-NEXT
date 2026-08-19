import fs from "fs/promises";
import path from "path";

export async function getModules(level: string) {
  const filePath = path.join(
    process.cwd(),
    "data",
    "courses",
    level,
    "modules.json"
  );

  try {
    const json = await fs.readFile(filePath, "utf8");
    return JSON.parse(json);
  } catch (error: any) {
    // Si le fichier n'existe pas encore,
    // on considère simplement que le niveau
    // ne possède aucun module.
    if (error.code === "ENOENT") {
      return [];
    }

    // Toute autre erreur est réelle
    // et doit continuer à être levée.
    throw error;
  }
}