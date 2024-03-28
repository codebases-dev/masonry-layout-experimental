import type { MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { codes } from "~/mocks";
import { generateGridTemplateAreas } from "~/utils/masonry-layout";

export const meta: MetaFunction = () => {
  return [
    { title: "Styling with grid-template-areas" },
    { name: "description", content: "Styling with grid-template-areas" },
  ];
};

export const loader = async () => {
  const data = codes.map((code, index) => ({
    id: index,
    content: code,
    contentHTML: hljs.highlight("javascript", code).value,
  }));

  const styleHTML = `
    <style title="grid-style">
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 1rem;
        line-height: 2;
      }

      .item-container {
        display: grid;
        grid-template-areas: ${generateGridTemplateAreas(data, 4)};
        grid-template-columns: repeat(4, 24rem);
      }
      
      .item {
        padding: 1rem;
      }
      
      .code {
        border-radius: 0.5rem;
        overflow: hidden;
        box-sizing: border-box;
        padding: 1rem 1.25rem;
      }
      
      @media (max-width: calc(24rem * 4 + 2rem)) {
        .item-container {
          grid-template-areas: ${generateGridTemplateAreas(data, 3)};
          grid-template-columns: repeat(3, 24rem);
        }
      }
      
      @media (max-width: calc(24rem * 3 + 2rem)) {
        .item-container {
          grid-template-areas: ${generateGridTemplateAreas(data, 2)};
          grid-template-columns: repeat(2, 24rem);
        }
      }
      
      @media (max-width: calc(24rem * 2 + 2rem)) {
        .item-container {
          grid-template-areas: ${generateGridTemplateAreas(data, 1)};
          grid-template-columns: 24rem;
        }
      }
    </style>
  `;

  return json({
    data,
    styleHTML,
  });
};

export default function Index() {
  const { data, styleHTML } = useLoaderData<typeof loader>();

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        lineHeight: "1.8",
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: styleHTML }} />
      <a href="/">Back to home</a>
      <h1>Styling with grid-template-areas</h1>
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
