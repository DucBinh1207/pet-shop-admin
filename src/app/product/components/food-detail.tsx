import TableSkeleton from "@/components/Tables/table-skeleton";
import useBlockScroll from "@/hooks/use-block-scroll";
import useFoodDetail from "@/hooks/products/useFoodDetail";
import { FoodResponseType } from "@/types/food";
import FoodForm from "./food-form";
import ProductImage from "./product-image";

type props = {
  food: FoodResponseType;
  handleCloseFoodDetail: () => void;
  refresh: () => void;
};

const FoodDetail = ({
  food: foodData,
  handleCloseFoodDetail,
  refresh,
}: props) => {
  const {
    food,
    isLoading,
    isError,
    refresh: refreshDetail,
  } = useFoodDetail({ id: foodData.id });

  useBlockScroll(foodData !== null);

  if (isError) window.location.href = "/error";

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (food && foodData)
    return (
      <div className="small-screen:h-0 small-screen:pb-[56.25%] fixed left-[50%] top-[50%] z-[110] h-[90vh] w-[90vw] translate-x-[-50%] translate-y-[-50%] p-[50px]">
        <div className="grid h-full grid-cols-5 gap-8 overflow-hidden">
          <div className="xl:col-span-13 h-ful col-span-4 overflow-y-scroll">
            <FoodForm
              food={food}
              handleCloseFoodDetail={handleCloseFoodDetail}
              refresh={refresh}
              refreshDetail={refreshDetail}
            />
          </div>

          <div className="col-span-5 xl:col-span-1">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Avatar
                </h3>
              </div>
              <div className="p-7">
                
                <ProductImage
                  id={food.id}
                  category="foods"
                  productImage={food.image}
                  refreshDetail={refreshDetail}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default FoodDetail;
