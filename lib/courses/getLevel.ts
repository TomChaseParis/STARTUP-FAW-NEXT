import fs from "fs/promises";
import path from "path";

export async function getLevel(level: string) {
  const filePath = path.join(process.cwd(), "data", "courses", "levels.json");

  const json = await fs.readFile(filePath, "utf8");
  const levels = JSON.parse(json);

  return levels.find((l: any) => l.slug === level) || null;
}
