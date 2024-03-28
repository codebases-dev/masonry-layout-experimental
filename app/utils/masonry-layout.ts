export interface DataItem {
  id: number;
  content: string;
  contentHTML?: string;
}

export function divideItemsIntoColumns(
  items: DataItem[],
  columnCount: number
): DataItem[][] {
  const columns = Array.from({ length: columnCount }, (): DataItem[] => []);

  items.forEach((item, index) => {
    const columnIndex = index % columnCount;
    columns[columnIndex].push(item);
  });

  return columns;
}

function getGridAreaName(item: DataItem) {
  return `item${item.id}`;
}

function calculateCodeLineCount(code: string) {
  return code.endsWith("\n")
    ? code.split("\n").length - 1
    : code.split("\n").length;
}

export function generateGridTemplateAreas(
  items: DataItem[],
  columnCount: number
) {
  const dividedColumns = divideItemsIntoColumns(items, columnCount);

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
