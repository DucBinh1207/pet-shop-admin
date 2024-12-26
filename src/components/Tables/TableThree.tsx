import cn from "@/utils/style/cn";
import Link from "next/link";
import { ChangeEvent, useMemo, useState } from "react";
import AngleDown from "../angle-down";
import { PriceSort, PriceSortType } from "@/constants/price-sort";
import { useDebounce } from "@/hooks/use-debounce";
import { ProductStatus, ProductStatusLabel } from "@/constants/product-status";
import TableSkeleton from "./table-skeleton";
import Pagination from "../pagination";
import useMutation from "@/hooks/use-mutation";
import { deleteProduct } from "@/services/api/products-api";
import { toastError, toastSuccess } from "@/utils/toast";
import { ProductToDeleteType } from "@/app/product/shared/type/productToDelete";
import useRole from "@/store/useRole";
import { useShallow } from "zustand/shallow";
import CheckRole from "@/utils/checkRole";
import { SupplyResponseType } from "@/types/supply";
import useSupplies from "@/hooks/products/useSupplies";
import SupplyDetail from "@/app/product/components/supply-detail";
import AddSupply from "@/app/product/components/add-supply";

const TableThree = () => {
  const [product, setProduct] = useState<SupplyResponseType | null>(null);
  const [isAddProduct, setIsAddProduct] = useState(false);
  const [priceSort, setPriceSort] = useState<PriceSortType>(PriceSort.NORMAL);
  const [search, setSearch] = useState("");
  const [paging, setPaging] = useState(1);
  const [status, setStatus] = useState<1 | 2 | 3 | 4>(1);
  const [totalPages, setTotalPages] = useState(1);
  const debouncedSearch = useDebounce(search);

  function handleSort() {
    if (priceSort === PriceSort.PRICE_DESC) {
      setPriceSort(PriceSort.PRICE);
    } else setPriceSort(PriceSort.PRICE_DESC);
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = parseInt(e.target.value, 10);
    if (
      newStatus === 1 ||
      newStatus === 2 ||
      newStatus === 3 ||
      newStatus === 4
    ) {
      setStatus(newStatus);
      setPaging(1);
    }
  };

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    setPaging(1);
  }

  function handlePagingFilter(pagingCurrent: number) {
    setPaging(pagingCurrent);
  }

  function handleCloseSupplyDetail() {
    setProduct(null);
  }

  function handleCloseAddSupply() {
    setIsAddProduct(false);
  }

  const { idRole } = useRole(
    useShallow((state) => ({
      idRole: state.idRole,
    })),
  );

  const isDisabled = !CheckRole(idRole) || status === 4;

  const { mutate } = useMutation({
    fetcher: deleteProduct,
    options: {
      onSuccess: async () => {
        toastSuccess("Đã xóa sản phẩm");
        refresh();
      },
      onError: (error) => {
        toastError(error.message);
      },
      onFinally: () => {},
    },
  });

  function handleDeleteProduct(id: string) {
    const data: ProductToDeleteType = {
      idProduct: id,
      category: "supplies",
    };
    if (CheckRole(idRole)) mutate({ data });
    else toastError("Bạn không được phép thực hiện chức năng này");
  }

  const {
    supplies,
    totalPages: total,
    isLoading,
    isError,
    refresh,
  } = useSupplies({
    search: debouncedSearch,
    paging,
    limit: 10,
    status,
    sort: priceSort,
  });

  useMemo(() => {
    if (total) {
      setTotalPages(total);
    }
  }, [total]);

  if (isError) window.location.href = "/error";

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (supplies)
    return (
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1 dark:border-strokedark dark:bg-boxdark">
        <div className="mb-[20px] flex items-center justify-between">
          <div className="hidden sm:block">
            <form action="https://formbold.com/s/unique_form_id" method="POST">
              <div className="relative">
                <button className="absolute left-0 top-1/2 -translate-y-1/2">
                  <svg
                    className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                      fill=""
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                      fill=""
                    />
                  </svg>
                </button>

                <input
                  type="text"
                  value={search}
                  placeholder="Tìm thú cưng . . . "
                  className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"
                  onChange={handleSearch}
                />
              </div>
            </form>
          </div>
          <div className="flex gap-[10px]">
            <div>
              <select
                className="block w-full rounded-sm bg-gray-200 p-2.5 text-black dark:bg-gray-700 dark:text-white"
                defaultValue={status}
                onChange={handleStatusChange}
              >
                {Object.entries(ProductStatus).map(([, statusValue]) => (
                  <option key={statusValue} value={statusValue}>
                    {ProductStatusLabel[statusValue]}
                  </option>
                ))}
              </select>
            </div>
            {CheckRole(idRole) && (
              <button
                className="flex justify-center rounded border border-stroke bg-green-700 px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                type="submit"
                onClick={() => {
                  setIsAddProduct(true);
                }}
              >
                Thêm đồ dùng
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 sm:grid-cols-6 dark:bg-meta-4">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Sản phẩm
              </h5>
            </div>

            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Mã
              </h5>
            </div>

            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Loại đồ dùng
              </h5>
            </div>

            <div className="p-2.5 text-center xl:p-5">
              <h5
                className="flex cursor-pointer items-center justify-center gap-[10px] text-sm font-medium uppercase xsm:text-base"
                onClick={handleSort}
              >
                Giá
                {priceSort === PriceSort.PRICE_DESC ? (
                  <AngleDown />
                ) : (
                  <span className="rotate-180">
                    <AngleDown />
                  </span>
                )}
              </h5>
            </div>

            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Đánh giá
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                hành động
              </h5>
            </div>
          </div>

          {supplies.map((supply, key) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-6 ${
                key === supplies.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={key}
            >
              <Link href="#" className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="hidden text-black sm:block dark:text-white">
                  {supply.name}
                </p>
              </Link>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{supply.id}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{supply.type}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{supply.price}đ</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-6">
                  {supply.rating === 0 ? "-" : supply.rating}
                </p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5">
                  <button
                    className="rounded bg-boxdark px-4 py-2 text-blue-700 hover:bg-gray-700 focus:outline-none"
                    onClick={() => {
                      setProduct(supply);
                    }}
                  >
                    Xem
                  </button>
                  {!isDisabled && (
                    <button
                      className="rounded bg-boxdark px-4 py-2 text-red-700 hover:bg-gray-700 focus:outline-none"
                      onClick={() => {
                        handleDeleteProduct(supply.id);
                      }}
                    >
                      Xóa
                    </button>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Pagination
          paging={paging}
          totalPages={totalPages}
          handlePagingFilter={handlePagingFilter}
        />

        {product && (
          <>
            <SupplyDetail
              supply={product}
              handleCloseSupplyDetail={handleCloseSupplyDetail}
              refresh={refresh}
            />
            <div
              className={cn(
                "fixed inset-0 z-[105] h-[100vh] w-[100vw] bg-overlay_color transition-opacity",
                {
                  "block opacity-100": product,
                  "hidden opacity-0": !product,
                },
              )}
            />
          </>
        )}

        {isAddProduct && (
          <>
            <AddSupply
              handleCloseAddSupply={handleCloseAddSupply}
              refresh={refresh}
            />
            <div
              className={cn(
                "fixed inset-0 z-[105] h-[100vh] w-[100vw] bg-overlay_color transition-opacity",
                {
                  "block opacity-100": isAddProduct,
                  "hidden opacity-0": !isAddProduct,
                },
              )}
            />
          </>
        )}
      </div>
    );
};

export default TableThree;
