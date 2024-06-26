import { json, MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import "highlight.js/styles/github-dark.css";
import { useCallback, useEffect, useState } from "react";
import { Button } from "~/components/button";
import { Container } from "~/components/container";
import { H1 } from "~/components/h1";
import { Link } from "~/components/link";
import { useOnResizeWindow } from "~/hooks/use-on-resize-window";
import { fetchCodes } from "~/mocks";
import { type DataItem, divideItemsIntoColumns, transformData } from "~/utils";

export const meta: MetaFunction = () => {
  return [
    { title: "Styling with 2 layer flexbox" },
    {
      name: "description",
      content: "Styling with 2 layer flexbox",
    },
  ];
};

export const loader = async () => {
  const data = await fetchCodes();

  return json({
    data: transformData(data),
  });
};

export default function Index() {
  const { data: data_ } = useLoaderData<typeof loader>();
  const [data, setData] = useState<DataItem[]>(data_);
  const [dividedData, setDividedData] = useState<DataItem[][]>();

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
    const fetchedData = await fetchCodes();

    setData((prevData) => [
      ...prevData,
      ...transformData(fetchedData, prevData.length),
    ]);
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
    <Container>
      <Link href="/">Back to home</Link>
      <H1>Styling with 2 layer flexbox</H1>
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
        {dividedData && <Button onClick={loadMoreData}>Load more</Button>}
        {<p>Data size: {data.length}</p>}
      </div>
    </Container>
  );
}
