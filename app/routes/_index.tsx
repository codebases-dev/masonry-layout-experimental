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

function getGridAreaName(item: Item) {
  return `item${item.id}`;
}

function divideElementsIntoColumns(items: Item[], columnCount: number) {
  const columns = Array.from({ length: columnCount }, (): Item[] => []);

  items.forEach((item, index) => {
    const columnIndex = index % columnCount;
    columns[columnIndex].push(item);
  });

  return columns;
}

function calculateCodeLineCount(code: string) {
  return code.endsWith("\n")
    ? code.split("\n").length - 1
    : code.split("\n").length;
}

function generateGridTemplateAreas(items: Item[], columnCount: number) {
  const dividedColumns = divideElementsIntoColumns(items, columnCount);

  const gridTemplateAreaBlocks = dividedColumns.map((columnItems) => {
    return columnItems.reduce((acc, item) => {
      const rowCount = calculateCodeLineCount(item.code) + 2;
      const rows = Array.from({ length: rowCount }, () =>
        getGridAreaName(item)
      );
      return acc.concat(rows);
    }, [] as string[]);
  });

  const maxRows = Math.max(
    ...gridTemplateAreaBlocks.map((block) => block.length)
  );

  const gridTemplateAreas = Array.from(
    { length: maxRows },
    (_, rowIndex) =>
      `"${gridTemplateAreaBlocks.reduce(
        (acc, block) =>
          acc === ""
            ? `${block[rowIndex] || "."}`
            : `${acc} ${block[rowIndex] || "."}`,
        ""
      )}"`
  ).join(" ");

  return gridTemplateAreas;
}

export const loader = async () => {
  const items = codes.map((code, index) => ({
    id: index,
    code,
  }));

  const gridTemplateAreas = generateGridTemplateAreas(items, COLUMN_COUNT);

  const html = [
    `<div style='display: grid; grid-template-areas: ${gridTemplateAreas}; grid-template-columns: repeat(${COLUMN_COUNT}, 24rem);'>`,
    ...items.map((item) => {
      const gridAreaName = getGridAreaName(item);
      const codeHTML = hljs.highlight("javascript", item.code).value;
      return `<div style='padding: 1rem; grid-area: ${gridAreaName};'><pre style='margin: 0;'><code class='hljs' style='border-radius: 0.5rem; overflow: hidden; box-sizing: border-box; padding: 1rem 1.25rem;'>${codeHTML}</code></pre></div>`;
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "1rem",
          lineHeight: "2",
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
