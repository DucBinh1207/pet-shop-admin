import cn from "@/utils/style/cn";
import Paging from "./paging";

type Props = {
  paging: number;
  totalPages: number;
  handlePagingFilter: (paging: number) => void;
};

export default function Pagination({
  paging,
  totalPages,
  handlePagingFilter,
}: Props) {
  return (
    <ul className="text-text_color mb-[10px] flex flex-wrap items-center justify-center text-[18px] font-medium leading-[27px] tracking-[0.02em]">
      <li>
        <button
          className={cn(
            "rounded bg-boxdark px-4 py-2 text-white hover:bg-gray-700 focus:outline-none disabled:opacity-50",
            {
              "pointer-events-none cursor-default opacity-25": paging === 1,
              "cursor-pointer": paging !== 1,
            },
          )}
          onClick={() => {
            if (paging > 1) {
              handlePagingFilter(paging - 1);
            }
          }}
        >
          Trước
        </button>
      </li>

      {paging > 1 && (
        <Paging
          pageNum={1}
          pageCurrent={paging}
          handlePagingFilter={handlePagingFilter}
        />
      )}

      {paging > 3 && (
        <li>
          <span className="rounded bg-boxdark px-3 py-2 text-white hover:bg-gray-700 focus:outline-none">
            ...
          </span>
        </li>
      )}

      {paging > 2 && (
        <Paging
          pageNum={paging - 1}
          pageCurrent={paging}
          handlePagingFilter={handlePagingFilter}
        />
      )}

      <Paging
        pageNum={paging}
        pageCurrent={paging}
        handlePagingFilter={handlePagingFilter}
      />

      {paging < totalPages - 1 && (
        <Paging
          pageNum={paging + 1}
          pageCurrent={paging}
          handlePagingFilter={handlePagingFilter}
        />
      )}

      {paging < totalPages - 2 && (
        <li>
          <span className="rounded bg-boxdark px-3 py-2 text-white hover:bg-gray-700 focus:outline-none">
            ...
          </span>
        </li>
      )}

      {paging < totalPages && (
        <Paging
          pageNum={totalPages}
          pageCurrent={paging}
          handlePagingFilter={handlePagingFilter}
        />
      )}

      <li>
        <button
          className={cn(
            "rounded bg-boxdark px-4 py-2 text-white hover:bg-gray-700 focus:outline-none disabled:opacity-50",
            {
              "pointer-events-none cursor-default opacity-25":
                paging === totalPages,
              "cursor-pointer": paging !== totalPages,
            },
          )}
          onClick={() => {
            if (paging < totalPages) {
              handlePagingFilter(paging + 1);
            }
          }}
        >
          Sau
        </button>
      </li>
    </ul>
  );
}
