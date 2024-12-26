import TableSkeleton from "@/components/Tables/table-skeleton";
import useBlockScroll from "@/hooks/use-block-scroll";
import { SupplyResponseType } from "@/types/supply";
import useSupplyDetail from "@/hooks/products/useSupplyDetail";
import SupplyForm from "./supply-form";
import ProductImage from "./product-image";

type props = {
  supply: SupplyResponseType;
  handleCloseSupplyDetail: () => void;
  refresh: () => void;
};

const SupplyDetail = ({
  supply: supplyData,
  handleCloseSupplyDetail,
  refresh,
}: props) => {
  const {
    supply,
    isLoading,
    isError,
    refresh: refreshDetail,
  } = useSupplyDetail({ id: supplyData.id });

  useBlockScroll(supply !== null);

  if (isError) window.location.href = "/error";

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (supply && supplyData)
    return (
      <div className="small-screen:h-0 small-screen:pb-[56.25%] fixed left-[50%] top-[50%] z-[110] h-[90vh] w-[90vw] translate-x-[-50%] translate-y-[-50%] p-[50px]">
        <div className="grid h-full grid-cols-5 gap-8 overflow-hidden">
          <div className="xl:col-span-13 h-ful col-span-4 overflow-y-scroll">
            <SupplyForm
              supply={supply}
              handleCloseSupplyDetail={handleCloseSupplyDetail}
              refresh={refresh}
              refreshDetail={refreshDetail}
            />
          </div>

          <div className="col-span-5 xl:col-span-1">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Ảnh đồ dùng
                </h3>
              </div>
              <div className="p-7">
                <ProductImage
                  id={supply.id}
                  category="supplies"
                  productImage={supply.image}
                  refreshDetail={refreshDetail}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default SupplyDetail;
