import { LoaderFunction } from "@remix-run/node";
import { codes } from "~/mocks";

interface DataItem {
  id: number;
  content: string;
}

function getGridAreaName(item: DataItem) {
  return `item${item.id}`;
}

function divideElementsIntoColumns(items: DataItem[], columnCount: number) {
  const columns = Array.from({ length: columnCount }, (): DataItem[] => []);

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

function generateGridTemplateAreas(items: DataItem[], columnCount: number) {
  const dividedColumns = divideElementsIntoColumns(items, columnCount);

  const gridTemplateAreaBlocks = dividedColumns.map((columnItems) => {
    return columnItems.reduce((acc, item) => {
      const rowCount = calculateCodeLineCount(item.content) + 2;
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

export const loader: LoaderFunction = async () => {
  const data = codes.map((code, index) => ({
    id: index,
    content: code,
  }));

  const css = `
    .container {
      display: flex;
      justify-content: center;
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
  `;

  await new Promise((resolve) => setTimeout(resolve, 500));

  return new Response(css, {
    headers: {
      "Content-Type": "text/css",
    },
  });
};
