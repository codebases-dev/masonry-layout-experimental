import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { codes } from "~/mocks";

export const meta: MetaFunction = () => {
  return [
    { title: "Styling with Grid Template Areas" },
    { name: "description", content: "Styling with Grid Template Areas" },
  ];
};

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: "/css",
    },
  ];
};

export const loader = async () => {
  const data = codes.map((code, index) => ({
    id: index,
    content: code,
    contentHTML: hljs.highlight("javascript", code).value,
  }));

  return {
    data,
  };
};

export default function Index() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        lineHeight: "1.8",
      }}
    >
      <a href="/">Back to home</a>
      <h1>Styling with Grid Template Areas</h1>
      <div className="container">
        <div
          className="item-container"
          style={{
            display: "grid",
          }}
        >
          {data.map((item) => (
            <div
              className="item"
              key={item.id}
              style={{
                gridArea: `item${item.id}`,
              }}
            >
              <pre style={{ margin: 0 }}>
                <code
                  className="hljs code"
                  dangerouslySetInnerHTML={{ __html: item.contentHTML }}
                />
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
