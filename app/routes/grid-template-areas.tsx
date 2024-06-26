import type { MetaFunction } from "@remix-run/cloudflare";
import { json, useLoaderData } from "@remix-run/react";
import "highlight.js/styles/github-dark.css";
import { useState } from "react";
import { Button } from "~/components/button";
import { Container } from "~/components/container";
import { H1 } from "~/components/h1";
import { Link } from "~/components/link";
import { fetchCodes } from "~/mocks";
import {
  type DataItem,
  generateGridTemplateAreas,
  transformData,
} from "~/utils";

function generateGridStyleHTML(data: DataItem[]) {
  return `
    <style title="grid-style">
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 1rem;
        line-height: 2;
        gap: 1rem;
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
    { title: "Styling with grid-template-areas" },
    {
      name: "description",
      content: "Styling with grid-template-areas",
    },
  ];
};

export const loader = async () => {
  const data = await fetchCodes();
  const transformedData = transformData(data);

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

    const newData = [...data, ...transformData(fetchedData, data.length)];
    setData(newData);

    const newStyleHTML = generateGridStyleHTML(newData);
    setStyleHTML(newStyleHTML);
  };

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: styleHTML }} />
      <Container>
        <Link href="/">Back to home</Link>
        <H1>Styling with grid-template-areas</H1>
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
          {data && <Button onClick={loadMoreData}>Load more</Button>}
          {<p>Data size: {data.length}</p>}
        </div>
      </Container>
    </>
  );
}
