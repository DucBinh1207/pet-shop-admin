"use client";

import React from "react";
import ChartOne from "../Charts/ChartOne";
import TopProducts from "../Tables/TopProducts";
import Summary from "./summary";
import ConvertDayType from "@/utils/convert-day-type";
import ChartThree from "../Charts/ChartThree";

const ECommerce: React.FC = () => {
  const dayStart = new Date();
  dayStart.setMonth(dayStart.getMonth() - 12);
  const startDate = ConvertDayType({ date: dayStart });
  const dayEnd = new Date();
  dayEnd.setDate(dayEnd.getDate() + 1);
  const endDate = ConvertDayType({ date: dayEnd });

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <Summary />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne startDate={startDate} endDate={endDate} />
        <ChartThree startDate={startDate} endDate={endDate} />

        <div className="col-span-12">
          <TopProducts startDate={startDate} endDate={endDate} />
        </div>
      </div>
    </>
  );
};

export default ECommerce;
