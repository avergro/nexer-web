export interface InstagramPost {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_product_type?: "REELS" | "FEED" | "STORY" | "AD";
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
}
