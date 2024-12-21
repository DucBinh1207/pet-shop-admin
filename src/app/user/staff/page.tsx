"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import StaffTable from "@/components/Tables/Staff";

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Nhân viên" />

      <div className="flex flex-col gap-10">
        <StaffTable />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
