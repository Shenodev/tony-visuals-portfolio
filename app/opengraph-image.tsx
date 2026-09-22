import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

export const alt = `${SITE_NAME} — Photographer in Egypt`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 96px",
        background: "#081F26",
        color: "#FAFAFA",
        fontFamily: "Georgia, serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 22,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: "#7EFC9F",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <span>Live · Events · Portraiture</span>
        <span>Cairo, Egypt</span>
      </div>
      <div style={{ display: "flex", fontSize: 120, fontWeight: 600, marginTop: 40 }}>
        TONY
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 120,
          fontWeight: 600,
          fontStyle: "italic",
          marginTop: -8,
        }}
      >
        VISUALS
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 30,
          color: "#BCCABB",
          marginTop: 48,
          maxWidth: 820,
          fontFamily: "sans-serif",
        }}
      >
        {SITE_DESCRIPTION}
      </div>
    </div>,
    { ...size }
  );
}