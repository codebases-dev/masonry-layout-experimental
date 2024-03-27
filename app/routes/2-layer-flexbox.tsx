import { MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { useCallback, useEffect, useState } from "react";
import { codes } from "~/mocks";

interface DataItem {
  id: number;
  content: string;
  contentHTML: string;
}

function divideElementsIntoColumns(items: DataItem[], columnCount: number) {
  const columns = Array.from({ length: columnCount }, (): DataItem[] => []);

  items.forEach((item, index) => {
    const columnIndex = index % columnCount;
    columns[columnIndex].push(item);
  });

  return columns;
}

export const meta: MetaFunction = () => {
  return [
    { title: "Styling with 2 layer flexbox" },
    { name: "description", content: "Styling with 2 layer flexbox" },
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

function useOnResizeWindow(callback: () => void) {
  useEffect(() => {
    window.addEventListener("resize", callback);
    return () => window.removeEventListener("resize", callback);
  }, [callback]);
}

export default function Index() {
  const { data } = useLoaderData<typeof loader>();
  const [dividedData, setDividedData] = useState<DataItem[][]>();

  const updateDividedData = useCallback(() => {
    if (window.matchMedia("(max-width: calc(24rem * 2 + 2rem))").matches) {
      setDividedData(divideElementsIntoColumns(data, 1));
    } else if (
      window.matchMedia("(max-width: calc(24rem * 3 + 2rem))").matches
    ) {
      setDividedData(divideElementsIntoColumns(data, 2));
    } else if (
      window.matchMedia("(max-width: calc(24rem * 4 + 2rem))").matches
    ) {
      setDividedData(divideElementsIntoColumns(data, 3));
    } else {
      setDividedData(divideElementsIntoColumns(data, 4));
    }
  }, [data]);

  useEffect(() => {
    updateDividedData();
  });

  useOnResizeWindow(() => {
    updateDividedData();
  });

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        lineHeight: "1.8",
      }}
    >
      <a href="/">Back to home</a>
      <h1>Styling with 2 layer flexbox</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "1rem",
          lineHeight: 2,
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          {dividedData?.map((columnData, columnIndex) => (
            <div
              key={columnIndex}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {columnData.map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: "1rem",
                    boxSizing: "border-box",
                    width: "24rem",
                  }}
                >
                  <pre style={{ margin: 0 }}>
                    <code
                      className="hljs"
                      style={{
                        borderRadius: "0.5rem",
                        overflow: "hidden",
                        boxSizing: "border-box",
                        padding: "1rem 1.25rem",
                      }}
                      dangerouslySetInnerHTML={{ __html: item.contentHTML }}
                    ></code>
                  </pre>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
