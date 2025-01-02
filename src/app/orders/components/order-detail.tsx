import { OrderResponseType } from "@/types/order";
import useOrderDetail from "@/hooks/order/userOrderDetail";
import TableSkeleton from "@/components/Tables/table-skeleton";
import OrderForm from "./order-form";
import useBlockScroll from "@/hooks/use-block-scroll";

type props = {
  order: OrderResponseType;
  handleCloseOrderDetail: () => void;
  refresh: () => void;
};

const OrderDetail = ({
  order: orderData,
  handleCloseOrderDetail,
  refresh,
}: props) => {
  const {
    order,
    isLoading,
    isError,
    refresh: refreshDetail,
  } = useOrderDetail({
    orderId: orderData.id,
  });

  useBlockScroll(true);

  if (isError) window.location.href = "/error";

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (order)
    return (
      <div className="small-screen:h-0 small-screen:pb-[56.25%] fixed left-[50%] top-[50%] z-[110] h-[90vh] w-[90vw] translate-x-[-50%] translate-y-[-50%] p-[50px]">
        <div className="grid h-full grid-cols-5 gap-8 overflow-hidden">
          <div className="xl:col-span-13 h-ful col-span-5 overflow-y-scroll">
            <OrderForm
              order={order}
              orderData={orderData}
              handleCloseOrderDetail={handleCloseOrderDetail}
              refresh={refresh}
              refreshDetail={refreshDetail}
            />
          </div>
        </div>
      </div>
    );
};

export default OrderDetail;
