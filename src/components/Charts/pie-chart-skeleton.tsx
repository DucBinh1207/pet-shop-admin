export default function PieChartSkeleton() {
  return (
    <div className="col-span-12 animate-pulse rounded-sm border border-stroke bg-white p-7.5 shadow-default xl:col-span-4 dark:border-strokedark dark:bg-boxdark">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <div className="h-6 w-48 rounded bg-gray-300 dark:bg-gray-600"></div>
        </div>
      </div>
      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <div className="min-h-[320px]">
            <div className="h-80 w-80 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
