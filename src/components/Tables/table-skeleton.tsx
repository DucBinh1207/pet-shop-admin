export default function TableSkeleton() {
  return (
    <div className="col-span-12">
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1 dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            <div className="h-6 w-32 animate-pulse bg-gray-300"></div>
          </h4>
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 sm:grid-cols-5 dark:bg-meta-4">
            <div className="p-2.5 xl:p-5">
              <div className="h-4 w-24 animate-pulse bg-gray-300"></div>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <div className="h-4 w-24 animate-pulse bg-gray-300"></div>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <div className="h-4 w-24 animate-pulse bg-gray-300"></div>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <div className="h-4 w-24 animate-pulse bg-gray-300"></div>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <div className="h-4 w-24 animate-pulse bg-gray-300"></div>
            </div>
          </div>
          <div className="grid grid-cols-3 border-b border-stroke sm:grid-cols-5 dark:border-strokedark">
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="h-[48px] w-[48px] flex-shrink-0 animate-pulse overflow-hidden rounded-[50%] bg-gray-300"></div>
              <div className="h-4 w-24 animate-pulse bg-gray-300"></div>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <div className="h-4 w-24 animate-pulse bg-gray-300"></div>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <div className="h-4 w-24 animate-pulse bg-gray-300"></div>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <div className="h-4 w-24 animate-pulse bg-gray-300"></div>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <div className="h-4 w-24 animate-pulse bg-gray-300"></div>
            </div>
          </div>
          <div className="grid grid-cols-3 border-b border-stroke sm:grid-cols-5 dark:border-strokedark">
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="h-[48px] w-[48px] flex-shrink-0 animate-pulse overflow-hidden rounded-[50%] bg-gray-300"></div>
              <div className="h-4 w-24 animate-pulse bg-gray-300"></div>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <div className="h-4 w-24 animate-pulse bg-gray-300"></div>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <div className="h-4 w-24 animate-pulse bg-gray-300"></div>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <div className="h-4 w-24 animate-pulse bg-gray-300"></div>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <div className="h-4 w-24 animate-pulse bg-gray-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
