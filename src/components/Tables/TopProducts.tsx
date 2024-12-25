"use client";

import useTopProducts from "@/hooks/dashboard/use-top-products";
import { DayType } from "@/types/day";
import Image from "next/image";
import Link from "next/link";
import TableSkeleton from "./table-skeleton";
import { renderProductType } from "@/utils/render-product-type";

type props = {
  startDate: DayType;
  endDate: DayType;
};

const TopProducts = ({ startDate, endDate }: props) => {
  const { topProductsData, isLoading, isError } = useTopProducts({
    startDate,
    endDate,
  });

  if (isError) window.location.href = "/error";

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (topProductsData)
    return (
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1 dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            10 Sản phẩm ưa chuộng nhất
          </h4>

          <div className="grid grid-cols-3 rounded-sm bg-gray-2 sm:grid-cols-5 dark:bg-meta-4">
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
                Loại sản phẩm
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Đánh giá
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Bán ra
              </h5>
            </div>
          </div>

          {topProductsData.topProducts.map((product, key) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-5 ${
                key === topProductsData.topProducts.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={key}
            >
              <Link href="#" className="flex items-center gap-3 p-2.5 xl:p-5">
                <div className="h-[48px] w-[48px] flex-shrink-0 overflow-hidden rounded-[50%]">
                  <Image
                    src={product.image}
                    alt="Brand"
                    width={48}
                    height={48}
                  />
                </div>
                <p className="hidden text-white sm:block">{product.name}</p>
              </Link>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-white">{product.id}K</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-white">
                  {renderProductType(product.category)}
                </p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-6">
                  {<>{product.rating === 0 ? "" : product.rating}</>}
                </p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5">{product.sold}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default TopProducts;
