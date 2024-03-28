import { css, cx } from "styled-system/css";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cx(
        css({
          fontFamily: "system-ui, sans-serif",
          lineHeight: "1.8",
          padding: "1rem",
        }),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
