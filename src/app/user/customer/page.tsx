"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CustomerTable from "@/components/Tables/Customer";

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Khách hàng" />

      <div className="flex flex-col gap-10">
        <CustomerTable />
      </div>
    </>
  );
};

export default TablesPage;
