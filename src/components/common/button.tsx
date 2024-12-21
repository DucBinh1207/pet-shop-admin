"use client";

import { cva, VariantProps } from "class-variance-authority";
import React, { ComponentProps, forwardRef, ReactNode, useMemo } from "react";

interface ButtonProps
  extends Pick<
      ComponentProps<"button">,
      "children" | "className" | "disabled" | "type" | "form" | "onClick"
    >,
    VariantProps<typeof buttonVariants> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  isActive?: boolean;
  noBorder?: boolean;
}

const buttonVariants = cva("cursor-pointer border transition", {
  variants: {
    size: {

      sm: "",

      md: "p-4 rounded-lg w-full",

      lg: "",
    },
    variant: {
      primary: "border-primary bg-primary text-white hover:bg-opacity-90",

      secondary:
        "",

      tertiary:
        "",
    },
  },

  defaultVariants: {
    size: "md",
    variant: "primary",
  },
});

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size,
      variant,
      children,
      startIcon: startIconProp,
      endIcon: endIconProp,
      className: classProps,
      onClick: onClickProps,
      ...rest
    },
    ref,
  ) => {
    const classVariants = useMemo(() => {
      return buttonVariants({
        size,
        variant,
      });
    }, [size, variant]);

    let className = classVariants;

    // If classProps exists add it to className
    if (classProps) {
      className += " " + classProps;
    }

    const startIcon = startIconProp && <span> {startIconProp} </span>;
    const endIcon = endIconProp && <span> {endIconProp} </span>;
    const onClick = onClickProps && onClickProps;

    return (
      <button className={className} ref={ref} {...rest} onClick={onClick}>
        {startIcon}
        {children}
        {endIcon}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
