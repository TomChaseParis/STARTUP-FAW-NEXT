
import { NextRequest, NextResponse } from "next/server";

const LIVEAVATAR_API_URL = "https://api.liveavatar.com/v1/avatars/public";

export async function GET(request: NextRequest) {
  const apiKey = process.env.LIVEAVATAR_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "LIVEAVATAR_API_KEY est absente du fichier .env.local." },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const pageSize = Math.min(
    100,
    Math.max(1, Number(searchParams.get("page_size")) || 20)
  );

  try {
    const response = await fetch(
      `${LIVEAVATAR_API_URL}?page=${page}&page_size=${pageSize}`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": apiKey,
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Erreur lors de la récupération des avatars LiveAvatar.",
          details: data,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("[LiveAvatar] Erreur API :", error);

    return NextResponse.json(
      { error: "Impossible de contacter LiveAvatar." },
      { status: 500 }
    );
  }
}
