"use client";

import CircleXMark from "@/components/common/icons/circle-xmark";

export default function Page() {
  return (
    <div className="small-screen:w-[calc(100%-60px)] smallest-screen:w-full mx-auto flex h-full w-full items-center rounded-[4px]">
      <div className="flex w-full flex-col items-center justify-between px-[60px] py-[125px]">
        <div className="relative inline-block">
          <CircleXMark size={90} className="fill-current text-primary" />

          <div className="after:absolute after:bottom-[-15px] after:left-[50%] after:h-[8px] after:w-[80px] after:translate-x-[-50%] after:rounded-[5px] after:bg-primary after:content-['']" />
        </div>
        <h1 className="mx-auto mt-[35px] max-w-[800px] text-center text-[27px] font-bold leading-[1.27] tracking-[-0.01em] text-primary">
          Bạn không có quyền truy cập vào khu vực này
        </h1>
        <p className="text-text_color mx-auto mt-[20px]">
          403 : Trang bạn đang cố gắng truy cập không có sẵn
        </p>
      </div>
    </div>
  );
}
