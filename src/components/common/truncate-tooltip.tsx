import { useLayoutEffect, useRef, useState } from "react";
import ToolTip from "./tooltip";

type Props = {
  value: string;
  spanClass?: string;
};

export default function TruncateToolTip({ value, spanClass }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [enable, setEnable] = useState(true);

  useLayoutEffect(() => {
    if (ref.current) {
      setEnable(ref.current.clientHeight < ref.current.scrollHeight);
    }
  }, []);

  return (
    <ToolTip
      element={
        <span ref={ref} className={spanClass}>
          {value}
        </span>
      }
      value={value}
      enable={enable}
    />
  );
}
