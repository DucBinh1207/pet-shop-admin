"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import VoucherTable from "@/components/Tables/Vouchers";

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Phiếu giảm giá" />

      <div className="flex flex-col gap-10">
        <VoucherTable />
      </div>
    </>
  );
};

export default TablesPage;
