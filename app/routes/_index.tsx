import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

const ITEM_COUNT = 10;
const COLUMN_COUNT = 3;

interface Item {
  id: number;
  height: number;
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
  const items = Array.from({ length: ITEM_COUNT }, (_, index) => ({
    id: index,
    height: Math.floor(Math.random() * 400) + 100,
  }));

  const gridTemplateAreas = generateGridTemplateAreas(items);

  return {
    items,
    gridTemplateAreas,
  };
};

export default function Index() {
  const { items, gridTemplateAreas } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div
        style={{
          display: "grid",
          gridTemplateAreas,
          gap: "1rem",
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              background: "rgba(0, 0, 0, 0.1)",
              width: "100%",
              height: item.height,
              borderRadius: "0.5rem",
              color: "black",
              gridArea: itemToGridAreaName(item),
            }}
          >
            <div style={{ padding: "0.75rem 1rem" }}>{item.id + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
