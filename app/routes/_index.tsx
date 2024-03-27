import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        lineHeight: "1.8",
      }}
    >
      <h1>Welcome to Remix</h1>
      <p>
        The website is exploring various approaches to styling a code snippet
        gallery using a masonry layout.
      </p>
      <ul>
        <li>
          <a href="/grid-template-areas">Styling with grid-template-areas</a>
        </li>
      </ul>
    </div>
  );
}
