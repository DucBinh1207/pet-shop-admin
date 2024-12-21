import { RefObject, useEffect } from "react";

type Props = {
  ref: RefObject<HTMLDivElement>;
  enabled: boolean;
  callback: () => void;
};

export default function useClickOutside({ ref, enabled, callback }: Props) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    if (enabled) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, enabled, callback]);
}
