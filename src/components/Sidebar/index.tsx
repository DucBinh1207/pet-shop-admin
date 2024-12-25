"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";
import useRole from "@/store/useRole";
import { useShallow } from "zustand/shallow";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  const { idRole } = useRole(
    useShallow((state) => ({
      idRole: state.idRole,
    })),
  );

  console.log("idRole in sidebar " + idRole);

  const menuGroups = [
    {
      name: "",
      menuItems: [
        {
          icon: (
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                fill=""
              />
              <path
                d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                fill=""
              />
              <path
                d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                fill=""
              />
              <path
                d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                fill=""
              />
            </svg>
          ),
          label: "Tổng quan",
          route: "/",
        },

        {
          icon: (
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.0002 7.79065C11.0814 7.79065 12.7689 6.1594 12.7689 4.1344C12.7689 2.1094 11.0814 0.478149 9.0002 0.478149C6.91895 0.478149 5.23145 2.1094 5.23145 4.1344C5.23145 6.1594 6.91895 7.79065 9.0002 7.79065ZM9.0002 1.7719C10.3783 1.7719 11.5033 2.84065 11.5033 4.16252C11.5033 5.4844 10.3783 6.55315 9.0002 6.55315C7.62207 6.55315 6.49707 5.4844 6.49707 4.16252C6.49707 2.84065 7.62207 1.7719 9.0002 1.7719Z"
                fill=""
              />
              <path
                d="M10.8283 9.05627H7.17207C4.16269 9.05627 1.71582 11.5313 1.71582 14.5406V16.875C1.71582 17.2125 1.99707 17.5219 2.3627 17.5219C2.72832 17.5219 3.00957 17.2407 3.00957 16.875V14.5406C3.00957 12.2344 4.89394 10.3219 7.22832 10.3219H10.8564C13.1627 10.3219 15.0752 12.2063 15.0752 14.5406V16.875C15.0752 17.2125 15.3564 17.5219 15.7221 17.5219C16.0877 17.5219 16.3689 17.2407 16.3689 16.875V14.5406C16.2846 11.5313 13.8377 9.05627 10.8283 9.05627Z"
                fill=""
              />
            </svg>
          ),
          label: "Người dùng",
          route: "/user/customer",
          children:
            idRole === 2
              ? [
                  { label: "Khách hàng", route: "/user/customer" },
                  { label: "Nhân viên", route: "/user/staff" },
                  { label: "Quản lý", route: "/user/admin" },
                ]
              : [{ label: "Khách hàng", route: "/user/customer" }],
        },
        {
          icon: (
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                <g transform="translate(-325.000000, -80.000000)">
                  <g transform="translate(325.000000, 80.000000)">
                    <polygon
                      fill="#FFFFFF"
                      fillOpacity="0.01"
                      fillRule="nonzero"
                      points="24 0 0 0 0 24 24 24"
                    />
                    <polygon
                      points="22 7 12 2 2 7 2 17 12 22 22 17"
                      stroke="#FFFFFF"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <line
                      stroke="#FFFFFF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      x1="2"
                      x2="12"
                      y1="7"
                      y2="12"
                    />
                    <line
                      stroke="#FFFFFF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      x1="12"
                      x2="12"
                      y1="22"
                      y2="12"
                    />
                    <line
                      stroke="#FFFFFF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      x1="22"
                      x2="12"
                      y1="7"
                      y2="12"
                    />
                    <line
                      stroke="#FFFFFF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      x1="17"
                      x2="7"
                      y1="4.5"
                      y2="9.5"
                    />
                  </g>
                </g>
              </g>
            </svg>
          ),
          label: "Sản phẩm",
          route: "/product/pets",
          children: [
            { label: "Thú cưng", route: "/product/pets" },
            { label: "Thức ăn", route: "/product/foods" },
            { label: "Đồ dùng khác", route: "/product/supplies" },
          ],
        },
        {
          icon: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.78571 5H18.2251C19.5903 5 20.5542 6.33739 20.1225 7.63246L18.4558 12.6325C18.1836 13.4491 17.4193 14 16.5585 14H6.07142M4.78571 5L4.74531 4.71716C4.60455 3.73186 3.76071 3 2.76541 3H2M4.78571 5L6.07142 14M6.07142 14L6.25469 15.2828C6.39545 16.2681 7.23929 17 8.23459 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM11 19C11 20.1046 10.1046 21 9 21C7.89543 21 7 20.1046 7 19C7 17.8954 7.89543 17 9 17C10.1046 17 11 17.8954 11 19Z"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
          label: "Đơn hàng",
          route: "/orders",
        },

        {
          icon: (
            <svg
              fill="#ffffff"
              height="18px"
              width="18px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <g>
                  <path
                    d="M495.432,111.165H384.267c-4.427,0-8.017,3.589-8.017,8.017v8.551c0,5.01-4.076,9.086-9.086,9.086
			c-5.01,0-9.086-4.076-9.086-9.086v-8.551c0-4.427-3.589-8.017-8.017-8.017H16.568C7.432,111.165,0,118.597,0,127.733v256.534
			c0,9.136,7.432,16.568,16.568,16.568h333.495c4.427,0,8.017-3.589,8.017-8.017v-8.551c0-5.01,4.076-9.086,9.086-9.086
			c5.01,0,9.086,4.076,9.086,9.086v8.551c0,4.427,3.589,8.017,8.017,8.017h111.165c9.136,0,16.568-7.432,16.568-16.568V127.733
			C512,118.597,504.568,111.165,495.432,111.165z M495.967,384.267c0,0.295-0.239,0.534-0.534,0.534H392.284v-0.534
			c0-11.048-7.172-20.446-17.102-23.8v-10.405c0-4.427-3.589-8.017-8.017-8.017c-4.427,0-8.017,3.589-8.017,8.017v10.405
			c-9.93,3.354-17.102,12.752-17.102,23.8v0.534H16.568c-0.295,0-0.534-0.239-0.534-0.534V127.733c0-0.295,0.239-0.534,0.534-0.534
			h325.478v0.534c0,11.048,7.172,20.446,17.102,23.8v10.405c0,4.427,3.589,8.017,8.017,8.017c4.427,0,8.017-3.589,8.017-8.017
			v-10.405c9.93-3.354,17.102-12.752,17.102-23.8v-0.534h103.148c0.295,0,0.534,0.239,0.534,0.534V384.267z"
                  />
                </g>
              </g>
              <g>
                <g>
                  <path
                    d="M367.165,188.125c-4.427,0-8.017,3.589-8.017,8.017v17.102c0,4.427,3.589,8.017,8.017,8.017
			c4.427,0,8.017-3.589,8.017-8.017v-17.102C375.182,191.715,371.592,188.125,367.165,188.125z"
                  />
                </g>
              </g>
              <g>
                <g>
                  <path
                    d="M367.165,239.432c-4.427,0-8.017,3.589-8.017,8.017v17.102c0,4.427,3.589,8.017,8.017,8.017
			c4.427,0,8.017-3.589,8.017-8.017v-17.102C375.182,243.021,371.592,239.432,367.165,239.432z"
                  />
                </g>
              </g>
              <g>
                <g>
                  <path
                    d="M367.165,290.739c-4.427,0-8.017,3.589-8.017,8.017v17.102c0,4.427,3.589,8.017,8.017,8.017
			c4.427,0,8.017-3.589,8.017-8.017v-17.102C375.182,294.328,371.592,290.739,367.165,290.739z"
                  />
                </g>
              </g>
              <g>
                <g>
                  <path
                    d="M261.668,173.371c-3.131-3.131-8.207-3.131-11.337,0L96.411,327.292c-3.131,3.131-3.131,8.207,0,11.337
			c1.565,1.566,3.617,2.348,5.668,2.348s4.103-0.782,5.668-2.348l153.921-153.921C264.799,181.578,264.799,176.501,261.668,173.371z
			"
                  />
                </g>
              </g>
              <g>
                <g>
                  <path
                    d="M127.733,162.472c-23.281,0-42.221,18.941-42.221,42.221s18.941,42.221,42.221,42.221s42.221-18.941,42.221-42.221
			S151.013,162.472,127.733,162.472z M127.733,230.881c-14.44,0-26.188-11.748-26.188-26.188s11.748-26.188,26.188-26.188
			s26.188,11.748,26.188,26.188S142.172,230.881,127.733,230.881z"
                  />
                </g>
              </g>
              <g>
                <g>
                  <path
                    d="M230.347,265.086c-23.281,0-42.221,18.941-42.221,42.221s18.941,42.221,42.221,42.221s42.221-18.941,42.221-42.221
			S253.627,265.086,230.347,265.086z M230.347,333.495c-14.44,0-26.188-11.748-26.188-26.188s11.748-26.188,26.188-26.188
			s26.188,11.748,26.188,26.188S244.786,333.495,230.347,333.495z"
                  />
                </g>
              </g>
            </svg>
          ),
          label: "Phiếu giảm giá",
          route: "/vouchers",
        },
        {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              width="20"
              height="20"
              fill="#ffffff"
            >
              <path d="M353.8 54.1L330.2 6.3c-3.9-8.3-16.1-8.6-20.4 0L286.2 54.1l-52.3 7.5c-9.3 1.4-13.3 12.9-6.4 19.8l38 37-9 52.1c-1.4 9.3 8.2 16.5 16.8 12.2l46.9-24.8 46.6 24.4c8.6 4.3 18.3-2.9 16.8-12.2l-9-52.1 38-36.6c6.8-6.8 2.9-18.3-6.4-19.8l-52.3-7.5zM256 256c-17.7 0-32 14.3-32 32l0 192c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-192c0-17.7-14.3-32-32-32l-128 0zM32 320c-17.7 0-32 14.3-32 32L0 480c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32L32 320zm416 96l0 64c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32l-128 0c-17.7 0-32 14.3-32 32z" />
            </svg>
          ),
          label: "Đánh giá",
          route: "/reviews",
        },
      ],
    },
  ];

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear lg:translate-x-0 dark:bg-boxdark ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
          <Link href="/" className="flex items-center gap-[10px] text-[28px]">
            <Image
              width={36}
              height={36}
              src={"/images/logo/logo.png"}
              alt="Logo"
              priority
            />
            WhiskersAdmin
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-1.5">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
