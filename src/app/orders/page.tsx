"use client"

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import OrderTable from "@/components/Tables/OrderTable";


const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Đơn hàng" />

      <div className="flex flex-col gap-10">
        <OrderTable />
      </div>
    </DefaultLayout>
  ); 
};

export default TablesPage;
