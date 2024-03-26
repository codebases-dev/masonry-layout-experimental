import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const items = Array.from({ length: 10 }, (_, idx) => ({
    idx,
    height: Math.floor(Math.random() * 400) + 100,
  }));

  await new Promise((resolve) => setTimeout(resolve, 100));

  return { items };
};

export default function Index() {
  const { items } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>

      <div
        style={{
          display: "grid",
          alignItems: "start",
          columnGap: "16px",
          gridTemplateColumns: "repeat(3, minmax(0px, 1fr))",
        }}
      >
        {Array.from({ length: 3 }, (_, idx) => idx).map((columnIndex) => (
          <div
            key={columnIndex}
            style={{
              display: "grid",
              rowGap: "16px",
              gridTemplateColumns: "minmax(0px, 1fr)",
            }}
          >
            {items
              .filter((_, idx) => idx % 3 === columnIndex)
              .map(({ idx, height }) => (
                <div
                  key={idx}
                  style={{
                    background: "rgba(0, 0, 0, 0.1)",
                    width: "100%",
                    height,
                    borderRadius: "0.5rem",
                    color: "black",
                  }}
                >
                  <div style={{ padding: "0.75rem 1rem" }}>{idx + 1}</div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
