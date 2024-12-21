"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AdminTable from "@/components/Tables/Admin";

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Quản lý" />

      <div className="flex flex-col gap-10">
        <AdminTable />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
