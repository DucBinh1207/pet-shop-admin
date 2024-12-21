import cn from "@/utils/style/cn";
import { ReactNode } from "react";

type ToolTipProps = {
  value: string;
  element: ReactNode;
  enable?: boolean;
};

export default function ToolTip({
  value,
  element,
  enable = true,
}: ToolTipProps) {
  const tooltip = (
    <span
      className={cn(
        "tooltip_animate invisible absolute bottom-[calc((100%+10px))] right-[calc(50%-21px)] inline-flex max-w-[120px] translate-y-[7px] scale-[0.7] rounded-[15px] bg-primary px-[9px] py-[6px] text-center text-[10px] font-bold uppercase leading-[13px] tracking-[0.025em] text-white opacity-0 after:absolute after:bottom-[-10px] after:right-[15px] after:block after:border-[6px] after:border-solid after:border-transparent after:border-t-primary after:content-[''] group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100",
        { "text-wrap": value.length > 20, "text-nowrap": value.length < 20 },
      )}
    >
      {value}
    </span>
  );

  return (
    <div className="group relative inline-block">
      {enable && tooltip}
      {element}
    </div>
  );
}
