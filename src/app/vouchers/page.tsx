"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import VoucherTable from "@/components/Tables/Vouchers";

const Page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Phiếu giảm giá" />

      <div className="flex flex-col gap-10">
        <VoucherTable />
      </div>
    </DefaultLayout>
  );
};

export default Page;
