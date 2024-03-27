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
