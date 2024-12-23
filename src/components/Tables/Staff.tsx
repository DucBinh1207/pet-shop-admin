import UserDetail from "@/app/user/components/user-detail";
import useBlockScroll from "@/hooks/use-block-scroll";
import { UserType } from "@/types/user";
import { RenderUserStatus } from "@/utils/renderUserStatus";
import cn from "@/utils/style/cn";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AngleDown from "../angle-down";

const users: UserType[] = [
  {
    id: "a1b2c3d4-e5f6-7890-ghij-klmnopqrstuv",
    email: "newuser1@gmail.com",
    id_role: 1,
    status: 1,
    is_verified: true,
    image: "/images/product/border-colie.png",
    name: "Tony Stark",
    nationality: "USA",
    telephoneNumber: "0911223344",
    district: "Hai Ba Trung",
    province: "Hanoi",
    street: "78 Nguyen Trai",
    ward: "Trung Hoa",
  },
  {
    id: "b1c2d3e4-f5g6-7890-hijk-lmnopqrstuvw",
    email: "newuser2@gmail.com",
    id_role: 2,
    status: 0,
    is_verified: false,
    image: "/images/product/border-colie.png",
    name: "Natasha Romanoff",
    nationality: "Russia",
    telephoneNumber: "0923344556",
    district: "Ba Dinh",
    province: "Hanoi",
    street: "90 Hoang Hoa Tham",
    ward: "Ngoc Ha",
  },
  {
    id: "c1d2e3f4-g5h6-7890-ijkl-mnopqrstvwxy",
    email: "newuser3@gmail.com",
    id_role: 3,
    status: 1,
    is_verified: true,
    image: "/images/product/border-colie.png",
    name: "Bruce Wayne",
    nationality: "USA",
    telephoneNumber: "0934455667",
    district: "Dong Da",
    province: "Hanoi",
    street: "15 Tran Quoc Toan",
    ward: "Cat Linh",
  },
  {
    id: "d1e2f3g4-h5i6-7890-jklm-nopqrstvwxyz",
    email: "newuser4@gmail.com",
    id_role: 1,
    status: 0,
    is_verified: false,
    image: "/images/product/border-colie.png",
    name: "Clark Kent",
    nationality: "USA",
    telephoneNumber: "0945566778",
    district: "Thanh Xuan",
    province: "Hanoi",
    street: "102 Khuat Duy Tien",
    ward: "Thanh Xuan Bac",
  },
  {
    id: "e1f2g3h4-i5j6-7890-klmn-opqrstvwxyz",
    email: "newuser5@gmail.com",
    id_role: 2,
    status: 1,
    is_verified: true,
    image: "/images/product/border-colie.png",
    name: "Diana Prince",
    nationality: "Greece",
    telephoneNumber: "0956677889",
    district: "Hoan Kiem",
    province: "Hanoi",
    street: "45 Hang Bai",
    ward: "Trang Tien",
  },
];

const StaffTable = () => {
  const [user, setUser] = useState(false);

  useBlockScroll(user);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1 dark:border-strokedark dark:bg-boxdark">
      <div className="mb-[20px] flex items-center justify-between">
        <div className="hidden sm:block">
          <form action="https://formbold.com/s/unique_formid" method="POST">
            <div className="relative">
              <button className="absolute left-0 top-1/2 -translate-y-1/2">
                <svg
                  className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                    fill=""
                  />
                </svg>
              </button>

              <input
                type="text"
                placeholder="Tìm nhân viên . . . "
                className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"
              />
            </div>
          </form>
        </div>
        <button
          className="flex justify-center rounded border border-stroke bg-green-700 px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
          type="submit"
        >
          Thêm nhân viên
        </button>
      </div>
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 sm:grid-cols-6 dark:bg-meta-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Tên</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Email
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Số điện thoại
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Quốc gia
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="flex items-center justify-center gap-[10px] text-sm font-medium uppercase xsm:text-base">
              Trạng thái <AngleDown />
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Hành động
            </h5>
          </div>
        </div>

        {users.map((user, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-6 ${key === users.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"}`}
            key={key}
          >
            <Link href="#" className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="h-[48px] w-[48px] flex-shrink-0 overflow-hidden rounded-[50%]">
                <Image
                  src={user.image ?? "#"}
                  alt="user"
                  width={48}
                  height={48}
                />
              </div>
              <p className="hidden text-black sm:block dark:text-white">
                {user.name}
              </p>
            </Link>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{user.email}K</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">+{user.telephoneNumber}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{user.nationality}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p
                className={cn(" ", {
                  "text-meta-1": user.status === 0,
                  "text-meta-3": user.status === 1,
                })}
              >
                {RenderUserStatus(user.status)}
              </p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">
                <button
                  className="rounded bg-boxdark px-4 py-2 text-blue-700 hover:bg-gray-700 focus:outline-none"
                  onClick={() => setUser(true)}
                >
                  Xem
                </button>
                {user.status === 1 && (
                  <button className="rounded bg-boxdark px-4 py-2 text-red-700 hover:bg-gray-700 focus:outline-none">
                    Khóa
                  </button>
                )}
              </p>
            </div>

            {/* Thêm cột Trạng thái */}
          </div>
        ))}
      </div>

      <div className="my-[10px] flex items-center justify-center space-x-2 text-[18px]">
        <button
          className="rounded bg-boxdark px-4 py-2 text-white hover:bg-gray-700 focus:outline-none disabled:opacity-50"
          disabled
        >
          Trước
        </button>

        <button className="rounded bg-gray-500 px-3 py-2 text-white hover:bg-gray-700 focus:outline-none">
          1
        </button>

        <button
          className="rounded bg-boxdark px-4 py-2 text-white hover:bg-gray-700 focus:outline-none disabled:opacity-50"
          disabled
        >
          Sau
        </button>
      </div>

      {user && (
        <>
          <UserDetail />
          <div
            className={cn(
              "fixed inset-0 z-[105] h-[100vh] w-[100vw] bg-overlay_color transition-opacity",
              {
                "block opacity-100": user,
                "hidden opacity-0": !user,
              },
            )}
          />
        </>
      )}
    </div>
  );
};

export default StaffTable;
