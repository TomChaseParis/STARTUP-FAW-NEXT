
import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

type RouteContext = {
  params: Promise<{
    level: string;
  }>;
};

export async function GET(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { level } = await params;

    const filePath = path.join(
      process.cwd(),
      "data",
      "courses",
      "activities",
      `${level}.json`
    );

    const json = await fs.readFile(filePath, "utf8");
    const parsedData = JSON.parse(json);

    const activities = Array.isArray(parsedData)
      ? parsedData
      : parsedData.activities ?? [];

    return NextResponse.json(activities);
  } catch (error) {
    console.error("ERREUR API ACTIVITIES :", error);

    return NextResponse.json(
      {
        error: "Impossible de charger les activités.",
        details:
          error instanceof Error
            ? error.message
            : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
