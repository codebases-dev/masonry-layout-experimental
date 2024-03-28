import type { MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { useState } from "react";
import { fetchCodes } from "~/mocks";
import {
  type DataItem,
  generateGridTemplateAreas,
} from "~/utils/masonry-layout";

function generateGridStyleHTML(data: DataItem[]) {
  return `
    <style title="grid-style">
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 1rem;
        line-height: 2;
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
      
      .item-container {
        display: grid;
        grid-template-areas: ${generateGridTemplateAreas(data, 4)};
        grid-template-columns: repeat(4, 24rem);
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
}

export const meta: MetaFunction = () => {
  return [
    { title: "Styling with grid-template-areas with load more button" },
    {
      name: "description",
      content: "Styling with grid-template-areas with load more button",
    },
  ];
};

export const loader = async () => {
  const data = await fetchCodes();

  const transformedData = data.map((code, index) => ({
    id: index,
    content: code,
    contentHTML: hljs.highlight("javascript", code).value,
  }));

  return json({
    data: transformedData,
    styleHTML: generateGridStyleHTML(transformedData),
  });
};

export default function Index() {
  const { data: data_, styleHTML: styleHTML_ } = useLoaderData<typeof loader>();
  const [data, setData] = useState(data_);
  const [styleHTML, setStyleHTML] = useState(styleHTML_);

  const loadMoreData = async () => {
    const fetchedData = await fetchCodes();

    const transformedFetchedData = fetchedData.map((code, index) => ({
      id: data.length + index,
      content: code,
      contentHTML: hljs.highlight("javascript", code).value,
    }));

    const newData = [...data, ...transformedFetchedData];
    setData(newData);
    setStyleHTML(generateGridStyleHTML(newData));
  };

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
        {data && <button onClick={loadMoreData}>Load more</button>}
        {<p>Data size: {data.length}</p>}
      </div>
    </div>
  );
}
