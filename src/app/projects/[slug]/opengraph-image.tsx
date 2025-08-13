import { ImageResponse } from "next/og";
import { allProjects } from "contentlayer/generated";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image({ params }: { params: { slug: string } }) {
  const project = allProjects.find((p) => p.slug === params.slug);
  if (!project) {
    return new ImageResponse(
      <div style={{ fontSize: 64, padding: 128 }}>Not found</div>,
      { ...size }
    );
  }
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#fff",
          color: "#000",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700 }}>{project.title}</div>
        <div style={{ marginTop: 40, fontSize: 32 }}>
          {project.tags.map((t) => `#${t}`).join(" ")}
        </div>
      </div>
    ),
    size
  );
}
