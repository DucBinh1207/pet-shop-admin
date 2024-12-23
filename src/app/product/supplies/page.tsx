"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableThree from "@/components/Tables/TableThree";
import DefaultLayout from "@/components/Layouts/DefaultLayout";



const Page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Thức ăn" />
      <div className="flex flex-col gap-10">
        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default Page;
