import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export const dynamic = "force-dynamic"; // ✅ IMPORTANT

export async function GET(
  req: Request,
  { params }: { params: { level: string } }
) {
  const filePath = path.join(
    process.cwd(),
    "data",
    "courses",
    params.level,
    "activities.json"
  );

  try {
    const json = await fs.readFile(filePath, "utf8");
    return NextResponse.json(JSON.parse(json));
  } catch (e) {
    return NextResponse.json([], { status: 200 });
  }
}
