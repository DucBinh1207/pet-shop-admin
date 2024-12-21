import { ClassValue } from "class-variance-authority/types";
import clsx from "clsx";

export default function cn(...inputClassName: ClassValue[]) {
  return clsx(inputClassName);
}
