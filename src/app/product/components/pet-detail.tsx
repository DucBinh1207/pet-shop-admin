import { PetResponseType } from "@/types/pet";
import usePetDetail from "@/hooks/products/usePetDetail";
import TableSkeleton from "@/components/Tables/table-skeleton";
import useBlockScroll from "@/hooks/use-block-scroll";
import PetForm from "./pet-form";
import ProductImage from "./product-image";

type props = {
  pet: PetResponseType;
  handleClosePetDetail: () => void;
  refresh: () => void;
};

const PetDetail = ({ pet: petData, handleClosePetDetail, refresh }: props) => {
  const {
    pet,
    isLoading,
    isError,
    refresh: refreshDetail,
  } = usePetDetail({ id: petData.id });

  useBlockScroll(petData !== null);

  if (isError) window.location.href = "/error";

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (pet && petData)
    return (
      <div className="small-screen:h-0 small-screen:pb-[56.25%] fixed left-[50%] top-[50%] z-[110] h-[90vh] w-[90vw] translate-x-[-50%] translate-y-[-50%] p-[50px]">
        <div className="grid h-full grid-cols-5 gap-8 overflow-hidden">
          <div className="xl:col-span-13 h-ful col-span-4 overflow-y-scroll">
            <PetForm
              pet={pet}
              handleClosePetDetail={handleClosePetDetail}
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
                  id={pet.id}
                  status={pet.status}
                  category="pets"
                  productImage={pet.image}
                  refreshDetail={refreshDetail}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default PetDetail;
