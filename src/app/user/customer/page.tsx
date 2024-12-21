"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomerTable from "@/components/Tables/Customer";

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Khách hàng" />

      <div className="flex flex-col gap-10">
        <CustomerTable />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
