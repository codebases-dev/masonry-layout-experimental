import { json, MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { useCallback, useEffect, useState } from "react";
import { useOnResizeWindow } from "~/hooks/use-on-resize-window";
import { fetchCodes } from "~/mocks";
import { type DataItem, divideItemsIntoColumns } from "~/utils/masonry-layout";

export const meta: MetaFunction = () => {
  return [
    { title: "Styling with 2 layer flexbox with load more button" },
    {
      name: "description",
      content: "Styling with 2 layer flexbox with load more button",
    },
  ];
};

export const loader = async () => {
  const data = await fetchCodes({
    limit: 10,
  });

  const transformedData = data.map((code, index) => ({
    id: index,
    content: code,
    contentHTML: hljs.highlight("javascript", code).value,
  }));

  return json({
    data: transformedData,
  });
};

export default function Index() {
  const { data: data_ } = useLoaderData<typeof loader>();
  const [data, setData] = useState<DataItem[]>(data_);
  const [dividedData, setDividedData] = useState<DataItem[][]>();
  const [loadedAll, setLoadedAll] = useState(false);

  const updateDividedData = useCallback((data: DataItem[]) => {
    if (window.matchMedia("(max-width: calc(24rem * 2 + 2rem))").matches) {
      setDividedData(divideItemsIntoColumns(data, 1));
    } else if (
      window.matchMedia("(max-width: calc(24rem * 3 + 2rem))").matches
    ) {
      setDividedData(divideItemsIntoColumns(data, 2));
    } else if (
      window.matchMedia("(max-width: calc(24rem * 4 + 2rem))").matches
    ) {
      setDividedData(divideItemsIntoColumns(data, 3));
    } else {
      setDividedData(divideItemsIntoColumns(data, 4));
    }
  }, []);

  const loadMoreData = async () => {
    const limit = 8;
    const newData = await fetchCodes({
      offset: data.length,
      limit,
    });

    if (newData.length < limit) {
      setLoadedAll(true);
    }

    if (newData.length === 0) {
      return;
    }

    const transformedData = newData.map((code, index) => ({
      id: data.length + index,
      content: code,
      contentHTML: hljs.highlight("javascript", code).value,
    }));

    setData((prevData) => [...prevData, ...transformedData]);
  };

  useEffect(() => {
    updateDividedData(data);
  }, [updateDividedData, data]);

  useOnResizeWindow(
    useCallback(() => {
      updateDividedData(data);
    }, [updateDividedData, data])
  );

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
          flexDirection: "column",
          alignItems: "center",
          fontSize: "1rem",
          lineHeight: 2,
          gap: "1rem",
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
                      dangerouslySetInnerHTML={{
                        __html: item.contentHTML ?? "",
                      }}
                    ></code>
                  </pre>
                </div>
              ))}
            </div>
          ))}
        </div>
        {dividedData && (
          <button onClick={loadMoreData} disabled={loadedAll}>
            {loadedAll ? "Loaded all" : "Load more"}
          </button>
        )}
      </div>
    </div>
  );
}
