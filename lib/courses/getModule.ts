import fs from "fs/promises";
import path from "path";

export async function getModule(
  level: string,
  moduleSlug: string
) {
  const filePath = path.join(
    process.cwd(),
    "data",
    "courses",
    level,
    `${moduleSlug}.json`
  );

  const json = await fs.readFile(filePath, "utf8");

  return JSON.parse(json);
}