import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { codes } from "~/mocks";

const COLUMN_COUNT = 3;

interface Item {
  id: number;
  code: string;
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

function itemToGridAreaName(item: Item) {
  return `item${item.id}`;
}

function generateGridTemplateAreas(items: Item[]) {
  const separatedItems: Item[][] = [];
  for (let i = 0; i < items.length; i += COLUMN_COUNT) {
    separatedItems.push(items.slice(i, i + COLUMN_COUNT));
  }

  const gridTemplateAreas = separatedItems.reduce(
    (acc: string, rowItems: Item[]) => {
      let rowTemplate = rowItems.reduce((rowAcc, item) => {
        return `${rowAcc} ${itemToGridAreaName(item)}`;
      }, "");

      if (rowItems.length < COLUMN_COUNT) {
        const remainingItems = COLUMN_COUNT - rowItems.length;
        for (let i = 0; i < remainingItems; i++) {
          rowTemplate = `${rowTemplate} .`;
        }
      }

      return `${acc} "${rowTemplate}"`;
    },
    ""
  );

  return gridTemplateAreas;
}

export const loader = async () => {
  const items = codes.map((code, index) => ({
    id: index,
    code,
  }));

  const gridTemplateAreas = generateGridTemplateAreas(items);

  const html = [
    `<div style='display: grid; grid-template-areas: ${gridTemplateAreas}; gap: 1rem;'>`,
    ...items.map((item) => {
      const gridAreaName = itemToGridAreaName(item);
      const codeHTML = hljs.highlight("javascript", item.code).value;
      return `<pre style='margin: 0; grid-area=${gridAreaName};'><code class='hljs' style='border-radius: 0.5rem; overflow: hidden; box-sizing: border-box;'>${codeHTML}</code></pre>`;
    }),
    "</div>",
  ].join("");

  return { html };
};

export default function Index() {
  const { html } = useLoaderData<typeof loader>();

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        lineHeight: "1.8",
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
