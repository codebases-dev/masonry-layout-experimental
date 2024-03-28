import { css, cx } from "styled-system/css";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export function Link({ className, children, ...props }: LinkProps) {
  return (
    <a
      className={cx(
        css({
          color: { base: "blue", _visited: "indigo" },
          textDecoration: "underline",
        }),
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}
