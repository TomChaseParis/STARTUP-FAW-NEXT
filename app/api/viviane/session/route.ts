
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type LiveAvatarResponse = {
  data?: {
    session_id?: string;
    session_token?: string;
    livekit_url?: string | null;
    livekit_client_token?: string | null;
  };
  message?: string;
};

export async function POST() {
  const apiKey = process.env.LIVEAVATAR_API_KEY;
  const avatarId = process.env.LIVEAVATAR_AVATAR_ID;
  const isSandbox = process.env.LIVEAVATAR_IS_SANDBOX !== "false";

  if (!apiKey || !avatarId) {
    return NextResponse.json(
      {
        error:
          "Configuration manquante : LIVEAVATAR_API_KEY et LIVEAVATAR_AVATAR_ID sont nécessaires.",
      },
      { status: 500 }
    );
  }

  try {
    // 1. Créer une session LiveAvatar.
    const createResponse = await fetch(
      "https://api.liveavatar.com/v1/sessions/token",
      {
        method: "POST",
        headers: {
          "X-API-KEY": apiKey,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode: "LITE",
          avatar_id: avatarId,
          is_sandbox: isSandbox,
        }),
        cache: "no-store",
      }
    );

    const createData =
      (await createResponse.json()) as LiveAvatarResponse;

    if (!createResponse.ok) {
      console.error("LiveAvatar create session error:", createData);

      return NextResponse.json(
        {
          error:
            createData.message ??
            "LiveAvatar n'a pas pu créer la session.",
        },
        { status: createResponse.status }
      );
    }

    const sessionId = createData.data?.session_id;
    const sessionToken = createData.data?.session_token;

    if (!sessionId || !sessionToken) {
      return NextResponse.json(
        { error: "LiveAvatar n'a pas renvoyé le jeton de session attendu." },
        { status: 502 }
      );
    }

    // 2. Démarrer l'avatar et obtenir les informations LiveKit.
    const startResponse = await fetch(
      "https://api.liveavatar.com/v1/sessions/start",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: sessionId,
        }),
        cache: "no-store",
      }
    );

    const startData =
      (await startResponse.json()) as LiveAvatarResponse;

    if (!startResponse.ok) {
      console.error("LiveAvatar start session error:", startData);

      return NextResponse.json(
        {
          error:
            startData.message ??
            "LiveAvatar n'a pas pu démarrer la session.",
        },
        { status: startResponse.status }
      );
    }

    const livekitUrl = startData.data?.livekit_url;
    const livekitClientToken = startData.data?.livekit_client_token;

    if (!livekitUrl || !livekitClientToken) {
      return NextResponse.json(
        {
          error:
            "Les informations de connexion LiveKit sont absentes de la réponse.",
        },
        { status: 502 }
      );
    }

    // 3. Retourner exactement les champs attendus par Viviane.tsx.
    return NextResponse.json(
      {
        session_id: sessionId,
        session_token: sessionToken,
        livekit_url: livekitUrl,
        livekit_client_token: livekitClientToken,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Viviane session error:", error);

    return NextResponse.json(
      { error: "Impossible de contacter le service LiveAvatar." },
      { status: 502 }
    );
  }
}
