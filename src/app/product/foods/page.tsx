"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableTwo from "@/components/Tables/TableTwo";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const Page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Thức ăn" />
      <div className="flex flex-col gap-10">
        <TableTwo />
      </div>
    </DefaultLayout>
  );
};

export default Page;
