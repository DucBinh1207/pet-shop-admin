"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { getUserRoleFromInternalServer } from "@/services/api/internal-auth-api";
import useRole from "@/store/useRole";
import { useShallow } from "zustand/shallow";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { idRole, setIdRole } = useRole(
    useShallow((state) => ({
      idRole: state.idRole,
      setIdRole: state.setIdRole,
    })),
  );

  useEffect(() => {
    async function getRole() {
      const role = await getUserRoleFromInternalServer();
      if (role) {
        setIdRole(Number(role));
      }
    }
    getRole();
  }, []);

  return (
    <>
      {idRole !== 0 && (
        <div className="flex">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <div className="relative flex flex-1 flex-col lg:ml-72.5">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                {children}
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
}
