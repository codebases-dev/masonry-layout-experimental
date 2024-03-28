import { css, cx } from "styled-system/css";

export interface H1Props extends React.HTMLAttributes<HTMLHeadingElement> {}

export function H1({ className, children, ...props }: H1Props) {
  return (
    <h1
      className={cx(
        css({
          fontSize: "4xl",
          fontWeight: "extrabold",
          marginBottom: "1rem",
        }),
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}
