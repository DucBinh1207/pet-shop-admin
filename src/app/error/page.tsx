"use client";

import ArrowIcon from "@/components/common/icons/arrow-icon";
import TriangleError from "@/components/common/icons/triangle-error";


export default function Page() {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-[1000] flex items-center justify-center bg-background_color">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="relative inline-block">
          <TriangleError size={90} className="fill-current text-primary" />
        </div>
        <h1 className="mx-auto mt-[35px] max-w-[800px] text-center text-[27px] font-bold leading-[1.27] tracking-[-0.01em] text-primary">
          Lỗi máy chủ nội bộ
        </h1>
        <p className="mx-auto mt-[20px] text-text_color">
          Có gì đó không ổn ở phía chúng tôi. Chúng tôi đang làm việc để khắc
          phục sự cố. Vui lòng thử lại sau.
        </p>
        <p
          onClick={() => window.history.back()}
          className="mt-[10px] flex cursor-pointer items-center gap-[5px] border-b border-solid border-transparent text-primary hover:border-secondary hover:text-secondary"
        >
          <ArrowIcon size={15} className="fill-current" />
          Thử lại ?
        </p>
      </div>
    </div>
  );
}
