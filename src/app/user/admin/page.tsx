"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AdminTable from "@/components/Tables/Admin";

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Quản lý" />

      <div className="flex flex-col gap-10">
        <AdminTable />
      </div>
    </>
  );
};

export default TablesPage;
