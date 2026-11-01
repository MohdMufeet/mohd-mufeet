import { ImageResponse } from "next/og";
import { getSiteConfig } from "@/lib/content";

export const alt = "Mohd Mufeet – Freelance Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const site = getSiteConfig();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#0c0c0d",
        color: "#ededea",
        fontFamily: "sans-serif",
        padding: "80px",
      }}
    >
      <span style={{ color: "#f5a524", fontSize: 28, marginBottom: 24 }}>FREELANCE FULL STACK DEVELOPER</span>
      <span style={{ fontSize: 76, fontWeight: 700 }}>{site.name}</span>
      <span style={{ color: "#a1a1a6", fontSize: 32, marginTop: 24 }}>{site.location.locality}, {site.location.country}</span>
    </div>,
    size,
  );
}
