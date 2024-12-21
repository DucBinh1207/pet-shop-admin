"use client";

import { useEffect } from "react";

export default function useBlockScroll(isActive: boolean) {
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isActive]);
}
