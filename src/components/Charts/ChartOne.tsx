"use client";

import { ApexOptions } from "apexcharts";
import React from "react";
import dynamic from "next/dynamic";
import useRevenue from "@/hooks/dashboard/use-revenue";
import { DayType } from "@/types/day";
import RevenueChartSkeleton from "./revenue-chart-skeleton";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type props = {
  startDate: DayType;
  endDate: DayType;
};

const ChartOne = ({ startDate, endDate }: props) => {
  const { revenueData, isLoading, isError } = useRevenue({
    startDate,
    endDate,
    option: "month",
  });

  if (isError) window.location.href = "/error";

  if (isLoading) {
    return <RevenueChartSkeleton />;
  }

  let categories;
  let data: number[] = [];

  if (revenueData && revenueData.details) {
    categories = revenueData.details.map((item) => {
      const month = item.date.split("/")[0]; // Lấy tháng từ chuỗi "MM/YYYY"
      return `Tháng ${month}`;
    });

    data = revenueData.details.map((item) => item.totalIncome);
  }

  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#3C50E0"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 335,
      type: "area",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.5,
      },
      
      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: "straight",
    },

    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: "#fff",
      strokeColors: ["#3056D3"],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: "category",
      categories: categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
      min: 0,
      max: 100000000,
    },
  };

  const series = [
    {
      name: "Doanh thu",
      data: data,
    },
  ];

  if (revenueData)
    return (
      <div className="col-span-12 rounded-sm border border-strokedark bg-boxdark px-5 pb-5 pt-7.5 shadow-default sm:px-7.5 xl:col-span-8">
        <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
          <div className="flex w-full flex-wrap gap-3 sm:gap-5">
            <div className="flex min-w-47.5">
              <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
                <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
              </span>
              <div className="w-full">
                <p className="font-semibold text-primary">Tổng doanh thu</p>
                <p className="text-sm font-medium">
                  {revenueData.details[0].date} -
                  {revenueData.details[revenueData.details.length - 1].date}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div id="chartOne" className="-ml-5">
            <ReactApexChart
              options={options}
              series={series}
              type="area"
              height={350}
              width={"100%"}
            />
          </div>
        </div>
      </div>
    );
};

export default ChartOne;
