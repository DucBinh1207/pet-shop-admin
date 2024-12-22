"use client"

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import OrderTable from "@/components/Tables/OrderTable";


const Page = () => {
  return (
    <>
      <Breadcrumb pageName="Đơn hàng" />

      <div className="flex flex-col gap-10">
        <OrderTable />
      </div>
    </>
  ); 
};

export default Page;
