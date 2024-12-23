import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProfileUpdate from "./components/profile-update";
import PasswordUpdate from "./components/password-update";
import AvatarUpdate from "./components/avatar-update";

export const metadata: Metadata = {
  title: "Next.js Settings | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Settings page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const Settings = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        <Breadcrumb pageName="Cài đặt thông tin" />

        <div className="grid grid-cols-12 gap-8">
          <ProfileUpdate />
          <AvatarUpdate />
          <PasswordUpdate />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Settings;
