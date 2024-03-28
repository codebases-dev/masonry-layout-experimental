import { css, cx } from "styled-system/css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cx(
        css({
          paddingX: "1rem",
          paddingY: "0.25rem",
          background: "black",
          borderRadius: "md",
          fontSize: "0.875rem",
          fontWeight: "semibold",
          cursor: "pointer",
          color: "white",
          opacity: { base: 1, _hover: 0.8 },
        }),
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
