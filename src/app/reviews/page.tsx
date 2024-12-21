"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ReviewsTable from "@/components/Tables/Reviews";

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Đánh giá" />

      <div className="flex flex-col gap-10">
        <ReviewsTable />
      </div>
    </>
  );
};

export default TablesPage;
