import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET(
  request: Request,
  { params }: { params: { level: string } }
) {
  const { level } = params;

  try {
    const filePath = path.join(
      process.cwd(),
      "data",
      "courses",
      "lessons",
      `${level}.json`
    );

    const json = await fs.readFile(filePath, "utf8");
    const lessons = JSON.parse(json);

    return NextResponse.json(lessons);
  } catch (err) {
    return NextResponse.json([], { status: 200 });
  }
}