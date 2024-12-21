"use client"

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";


const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Thú cưng" />

      <div className="flex flex-col gap-10">
        <TableOne />
      </div>
    </>
  );
};

export default TablesPage;
