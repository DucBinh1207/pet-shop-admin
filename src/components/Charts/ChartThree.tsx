"use client";

import useSoldProducts from "@/hooks/dashboard/use-sold-products";
import { DayType } from "@/types/day";
import { ApexOptions } from "apexcharts";
import React from "react";
import PieChartSkeleton from "./pie-chart-skeleton";
import dynamic from "next/dynamic";

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

  if (soldProductsData) {
    const total = soldProductsData.income.reduce(
      (total, item) => total + item.income,
      0,
    );
    const incomeByPets = Math.floor(
      (soldProductsData.income[0].income / total) * 100,
    );
    const incomeByFoods = Math.floor(
      (soldProductsData.income[1].income / total) * 100,
    );

    series = [incomeByPets, incomeByFoods, 100 - incomeByPets - incomeByFoods];
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
          <div className="w-full px-8">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-primary"></span>
              <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <span> Thú cưng </span>
                <span> {soldProductsData.income[0].income}đ </span>
                <span> {series[0]}% </span>
              </p>
            </div>
          </div>
          <div className="w-full px-8">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#6577F3]"></span>
              <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <span> Thức ăn </span>
                <span> {soldProductsData.income[1].income}đ </span>
                <span> {series[1]}% </span>
              </p>
            </div>
          </div>
          <div className="w-full px-8">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#8FD0EF]"></span>
              <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <span> Vật dụng </span>
                <span> {soldProductsData.income[2].income}đ </span>
                <span> {series[2]}% </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ChartThree;
