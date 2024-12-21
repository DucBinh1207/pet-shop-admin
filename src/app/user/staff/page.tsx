"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import StaffTable from "@/components/Tables/Staff";

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Nhân viên" />

      <div className="flex flex-col gap-10">
        <StaffTable />
      </div>
    </>
  );
};

export default TablesPage;
