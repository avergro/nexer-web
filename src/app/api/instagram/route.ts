export const dynamic = "force-static";

import { NextResponse } from "next/server";
import type { InstagramPost } from "@/types/instagram";

export type { InstagramPost };

const IG_API = "https://graph.instagram.com/v20.0";
const FIELDS =
  "id,caption,media_type,media_product_type,media_url,thumbnail_url,permalink,timestamp";

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    return NextResponse.json(
      { posts: [], configured: false },
      { status: 200 }
    );
  }

  try {
    const res = await fetch(
      `${IG_API}/me/media?fields=${FIELDS}&limit=6&access_token=${token}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("[instagram] API error", err);
      return NextResponse.json(
        { posts: [], configured: true, error: "API request failed" },
        { status: 200 }
      );
    }

    const data = await res.json();
    const posts: InstagramPost[] = (data.data ?? []).filter(
      (p: InstagramPost) =>
        p.media_type === "IMAGE" ||
        p.media_type === "VIDEO" ||
        p.media_type === "CAROUSEL_ALBUM"
    );

    return NextResponse.json({ posts, configured: true });
  } catch (err) {
    console.error("[instagram] fetch error", err);
    return NextResponse.json(
      { posts: [], configured: true, error: "Network error" },
      { status: 200 }
    );
  }
}
