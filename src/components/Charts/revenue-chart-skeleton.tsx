export default function RevenueChartSkeleton() {
  return (
    <div className="col-span-12 rounded-sm border border-strokedark bg-boxdark px-5 pb-5 pt-7.5 shadow-default sm:px-7.5 xl:col-span-8">
      <div className="flex animate-pulse flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full bg-black opacity-85"></span>
            <div className="w-full">
              <p className="h-4 w-32 rounded bg-black opacity-85"></p>
              <p className="mt-1 h-3 w-24 rounded bg-black opacity-85"></p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div id="chartOne" className="-ml-5">
          <div className="h-96 rounded bg-black opacity-85"></div>
        </div>
      </div>
    </div>
  );
}
