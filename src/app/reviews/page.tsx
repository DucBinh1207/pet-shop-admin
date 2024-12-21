"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AdminTable from "@/components/Tables/Admin";
import ReviewsTable from "@/components/Tables/Reviews";
import VoucherTable from "@/components/Tables/Vouchers";

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Đánh giá" />

      <div className="flex flex-col gap-10">
        <ReviewsTable />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
