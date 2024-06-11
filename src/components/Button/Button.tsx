import React from "react";
import style from "./Button.module.scss";

interface TitleProps {
  children?: React.ReactNode;
  before?: React.ReactNode;
  after?: React.ReactNode;
  className?: boolean;
  mode?: "primary" | "outline" | "secondary";
  appearance?: "accent" | "positive";
  stretched?: boolean;
  size?: "compact";
}

const Button = ({
  children,
  mode = "primary",
  appearance,
  stretched = false,
  before,
  after,
  className,
  size,
  ...props
}: TitleProps) => {
  const classes = [
    style.container,
    mode && style[mode],
    appearance && style[appearance],
    stretched && style.stretched,
    size === "compact" && style.compact,
  ].filter(Boolean);

  return (
    <button className={classes.join(" ")} {...props}>
      <div className={style.before}>{before}</div>
      <div className={style.text}>{children}</div>
      <div className={style.after}>{after}</div>
    </button>
  );
};

export default Button;