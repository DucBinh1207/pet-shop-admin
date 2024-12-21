"use client";

import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, forwardRef, useMemo } from "react";

interface InputProps
  extends Pick<
      ComponentProps<"input">,
      | "className"
      | "onChange"
      | "onBlur"
      | "type"
      | "placeholder"
      | "disabled"
      | "id"
      | "name"
      | "value"
      | "checked"
      | "onClick"
    >,
    VariantProps<typeof inputVariants> {
  trimOnBlur?: boolean;
}

const inputVariants = cva(" border", {
  variants: {
    inputSize: {
      small: "",
      medium: "px-4.5 py-3 rounded",
      large: "py-4 pl-6 pr-10 rounded-lg",
    },
    variant: {
      primary: "border-form-strokedark bg-form-input text-white outline-none",
      secondary: "",
      third: "",
    },
  },
  compoundVariants: [
    {
      variant: "primary",
      class:
        "focus:border-primary focus:border-primary focus-visible:shadow-none",
    },
    {
      variant: "secondary",
      class: "",
    },
    {
      variant: "third",
      class: "",
    },
  ],
  defaultVariants: {
    inputSize: "medium",
    variant: "primary",
  },
});

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ inputSize, variant, type, className: classProps, ...rest }, ref) => {
    const classVariants = useMemo(() => {
      return inputVariants({ inputSize, variant });
    }, [inputSize, variant]);

    let className = classVariants;

    // If classProps exists add it to className
    if (classProps) {
      className += " " + classProps;
    }

    return (
      <input
        ref={ref}
        type={type}
        autoComplete="off"
        className={className}
        {...rest}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
