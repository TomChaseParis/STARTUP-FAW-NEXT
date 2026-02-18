import fs from "fs/promises";
import path from "path";

export async function getLevels() {
  const filePath = path.join(process.cwd(), "data", "courses", "levels.json");

  const json = await fs.readFile(filePath, "utf8");
  return JSON.parse(json);
}
  