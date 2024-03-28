import type { MetaFunction } from "@remix-run/cloudflare";
import { css } from "styled-system/css";
import { Container } from "~/components/container";
import { H1 } from "~/components/h1";
import { Link } from "~/components/link";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <Container>
      <H1 className={css({ fontSize: "4xl", fontWeight: "extrabold" })}>
        Welcome to Remix
      </H1>
      <p>
        The website is exploring various approaches to styling a code snippet
        gallery using a masonry layout.
      </p>
      <ul
        className={css({
          listStyle: "inside",
          paddingLeft: "1rem",
        })}
      >
        <li>
          <Link href="/grid-template-areas">
            Styling with grid-template-areas
          </Link>
        </li>
        <li>
          <Link href="/2-layer-flexbox">Styling with 2 layer flexbox</Link>
        </li>
      </ul>
    </Container>
  );
}
