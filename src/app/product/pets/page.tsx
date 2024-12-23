"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const Page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Thú cưng" />

      <div className="flex flex-col gap-10">
        <TableOne />
      </div>
    </DefaultLayout>
  );
};

export default Page;
