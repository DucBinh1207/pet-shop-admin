import { ComponentProps } from "react";
import classNameComp from "../../utils/style/cn";

type Size = "small" | "medium" | "large" | number;

const sizesMap = {
  small: 16,
  medium: 24,
  large: 32,
};

type SvgProps = ComponentProps<"svg"> & {
  size: Size;
};

function Svg({ size: sizeProp, className, ...rest }: SvgProps) {
  const size = typeof sizeProp === "string" ? sizesMap[sizeProp] : sizeProp;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classNameComp("select-none", className)}
      focusable="false"
      aria-hidden="true"
      width={size}
      height={size}
      {...rest}
    />
  );
}

export { Svg };
export type { SvgProps };
