type PagingProps = {
  pageNum: number;
  pageCurrent: number;
  handlePagingFilter: (paging: number) => void;
};

export default function Paging({
  pageNum,
  pageCurrent,
  handlePagingFilter,
}: PagingProps) {
  console.log(pageNum, pageCurrent);
  return (
    <li className="">
      <button
        className={`rounded px-3 py-2 text-white hover:bg-gray-700 focus:outline-none ${
          pageNum === pageCurrent ? "bg-gray-500" : "bg-boxdark"
        }`}
        onClick={() => handlePagingFilter(pageNum)}
        disabled={pageNum === pageCurrent}
      >
        {pageNum}
      </button>
    </li>
  );
}
