"use client";

import useSoldProducts from "@/hooks/dashboard/use-sold-products";
import { DayType } from "@/types/day";
import { ApexOptions } from "apexcharts";
import React from "react";
import PieChartSkeleton from "./pie-chart-skeleton";
import dynamic from "next/dynamic";
import { priceRender } from "@/utils/priceRender";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "donut",
  },
  colors: ["#3C50E0", "#6577F3", "#8FD0EF"],
  labels: ["Thú cưng", "Thức ăn", "Vật dụng"],
  legend: {
    show: false,
    position: "bottom",
  },

  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

type props = {
  startDate: DayType;
  endDate: DayType;
};

const ChartThree = ({ startDate, endDate }: props) => {
  const { soldProductsData, isLoading, isError } = useSoldProducts({
    startDate,
    endDate,
  });

  if (isError) window.location.href = "/error";

  if (isLoading) {
    return <PieChartSkeleton />;
  }

  let series;
  let seriesMap: { key: string; value: number }[];

  if (soldProductsData) {
    const total = soldProductsData.income.reduce(
      (total, item) => total + item.income,
      0,
    );

    const petsIncome =
      soldProductsData.income.find((item) => item.category === "pets")
        ?.income || 0;
    const foodsIncome =
      soldProductsData.income.find((item) => item.category === "foods")
        ?.income || 0;

    const incomeByPets = Math.floor((petsIncome / total) * 100);
    const incomeByFoods = Math.floor((foodsIncome / total) * 100);

    series = [incomeByPets, incomeByFoods, 100 - incomeByPets - incomeByFoods];
    seriesMap = [
      { key: "pets", value: incomeByPets },
      { key: "foods", value: incomeByFoods },
      { key: "supplies", value: 100 - incomeByPets - incomeByFoods },
    ];
  }

  if (soldProductsData && series)
    return (
      <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default xl:col-span-4 dark:border-strokedark dark:bg-boxdark">
        <div className="mb-3 justify-between gap-4 sm:flex">
          <div>
            <h5 className="text-xl font-semibold text-black dark:text-white">
              Doanh thu theo sản phẩm
            </h5>
          </div>
        </div>

        <div className="mb-2">
          <div id="chartThree" className="mx-auto flex justify-center">
            <ReactApexChart options={options} series={series} type="donut" />
          </div>
        </div>

        <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
          {soldProductsData.income.map((item) => {
            const colorMap = {
              pets: "bg-primary",
              foods: "bg-[#6577F3]",
              supplies: "bg-[#8FD0EF]",
            };
            const colorClass = colorMap[item.category] || "bg-gray-300";

            // Tìm giá trị phần trăm từ seriesMap dựa trên key
            const percentage =
              seriesMap.find((seriesItem) => seriesItem.key === item.category)
                ?.value || 0;

            return (
              <div key={item.category} className="w-full px-8">
                <div className="flex w-full items-center">
                  <span
                    className={`mr-2 block h-3 w-full max-w-3 rounded-full ${colorClass}`}
                  ></span>
                  <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                    <span>
                      {item.category === "pets"
                        ? "Thú cưng"
                        : item.category === "foods"
                          ? "Thức ăn"
                          : "Vật dụng"}
                    </span>
                    <span> {priceRender(item.income)}đ </span>
                    <span> {percentage}% </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
};

export default ChartThree;
