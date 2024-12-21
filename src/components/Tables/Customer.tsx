import UserDetail from "@/app/user/components/user-detail";
import useBlockScroll from "@/hooks/use-block-scroll";
import { USER } from "@/types/user";
import { RenderUserStatus } from "@/utils/renderUserStatus";
import cn from "@/utils/style/cn";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AngleDown from "../angle-down";

const users: USER[] = [
  {
    _id: "0537c4ef-3eac-42ab-ab15-dc2a074b20fc",
    email: "t@gmail.com",
    password: "$2b$10$aWEKgQwQ9Cb9aS9HBsn8OeSvkyxbTqgzvrJpmSyguBADcXIFZGlYS",
    id_role: 1,
    token_created_at: "2024-10-21T15:16:50.336Z",
    status: 1,
    is_verified: true,
    image: "/images/user/client.png",
    name: "Daniel Tam1",
    nationality: "South Korea",
    telephone_number: "0905178951",
    district: "Cầu Giấy1",
    province: "Hà Nội",
    street: "23 Núi Thành1",
    ward: "Hòa Nam1",
  },
  {
    _id: "6a5d2f71-0b4d-4f6f-9b7d-bac8b83d44db",
    email: "user2@gmail.com",
    password: "$2b$10$AqfddJHaR1ngFhg29DdK7KmFqAho3lDhMkm2Soj7nph6DRXhNf3n2",
    id_role: 2,
    token_created_at: "2024-11-15T10:25:30.672Z",
    status: 1,
    is_verified: true,
    image: "/images/user/client.png",
    name: "John Doe",
    nationality: "USA",
    telephone_number: "0912345678",
    district: "District 1",
    province: "Ho Chi Minh City",
    street: "123 Le Lai",
    ward: "Ben Thanh",
  },
  {
    _id: "e4b32f3e-702f-4e1b-bb5e-9b63a89ab4bc",
    email: "user3@gmail.com",
    password: "$2b$10$MgEgsUBq1Uu9MzWtj93p9Tmch8gfS4E0IRBF7oHOnEJ7oh2O8tftq",
    id_role: 3,
    token_created_at: "2024-10-10T08:14:21.847Z",
    status: 1,
    is_verified: false,
    image: "/images/user/client.png",
    name: "Michael Jordan",
    nationality: "Canada",
    telephone_number: "0987654321",
    district: "Binh Thanh",
    province: "Ho Chi Minh City",
    street: "456 Vo Thi Sau",
    ward: "Phu Nhuan",
  },
  {
    _id: "c3e87f6d-84be-4e65-a6d6-2e5c1a5f8f7c",
    email: "user4@gmail.com",
    password: "$2b$10$DZXO5Zux8bNl.33KM5owuOMuYttZ03sTFZBl0gODwmBh6K33ACpCq",
    id_role: 1,
    token_created_at: "2024-09-05T18:55:43.453Z",
    status: 1,
    is_verified: true,
    image: "/images/user/client.png",
    name: "David Beckham",
    nationality: "England",
    telephone_number: "0934567890",
    district: "Tan Phu",
    province: "Ho Chi Minh City",
    street: "789 Cach Mang Thang Tam",
    ward: "An Phu Dong",
  },
  {
    _id: "11f94f0f-3541-4326-b91e-08a9b20d799a",
    email: "user5@gmail.com",
    password: "$2b$10$BhXfDxwnolWs8xBHKC8yBYcdzIh3GeTp5wMRpBtdJ.5RmHtBjfP6q",
    id_role: 2,
    token_created_at: "2024-08-18T12:30:20.219Z",
    status: 1,
    is_verified: false,
    image: "/images/user/client.png",
    name: "Emma Watson",
    nationality: "UK",
    telephone_number: "0978645309",
    district: "Phu Nhuan",
    province: "Ho Chi Minh City",
    street: "102 Nguyen Thi Minh Khai",
    ward: "Ward 6",
  },
  {
    _id: "a7d92b38-f44a-4e91-bccf-b6a9db736daf",
    email: "user6@gmail.com",
    password: "$2b$10$HHZb1AqPj7lZflb2wSKhZ1bbdQwfz9lxUxeHYTInQ3hbh8A4wJ7r2",
    id_role: 3,
    token_created_at: "2024-11-03T09:22:11.188Z",
    status: 1,
    is_verified: true,
    image: "/images/user/client.png",
    name: "Chris Evans",
    nationality: "USA",
    telephone_number: "0906765432",
    district: "Hanoi",
    province: "Hanoi",
    street: "100 Le Duan",
    ward: "Dong Da",
  },
  {
    _id: "4d725fd1-330f-4b99-9f38-fb3ffeb12f38",
    email: "user7@gmail.com",
    password: "$2b$10$sdgNAlHsiu.J1SK3rR7rXzVox0jfiYzMyX3sZ91Vztg.xX3l70XcK",
    id_role: 1,
    token_created_at: "2024-08-22T16:40:50.053Z",
    status: 1,
    is_verified: true,
    image: "/images/user/client.png",
    name: "Steve Rogers",
    nationality: "USA",
    telephone_number: "0912003004",
    district: "Hoan Kiem",
    province: "Hanoi",
    street: "32 Quang Trung",
    ward: "Old Quarter",
  },
  {
    _id: "d2a5498a-d8f3-478a-9c48-daa31c273542",
    email: "user8@gmail.com",
    password: "$2b$10$vn7sfOShjVqxdnA.ymk5P1BkI.tMnRkC7QO9HszI2U7J0oSPciAAS",
    id_role: 3,
    token_created_at: "2024-11-20T14:10:15.658Z",
    status: 1,
    is_verified: false,
    image: "/images/user/client.png",
    name: "Scarlett Johansson",
    nationality: "USA",
    telephone_number: "0982123456",
    district: "Thanh Xuan",
    province: "Hanoi",
    street: "55 Dai Loc",
    ward: "Ngoc Khanh",
  },
  {
    _id: "3c407b39-9c2d-4c24-b46a-16784b75f6f3",
    email: "user9@gmail.com",
    password: "$2b$10$Q2u.X0W6y8NhpShldbdlshgxZLWsIEK56poyVZHe9b0o.KjRlR9z.",
    id_role: 2,
    token_created_at: "2024-12-01T18:00:09.123Z",
    status: 0,
    is_verified: true,
    image: "/images/user/client.png",
    name: "Robert Downey Jr.",
    nationality: "USA",
    telephone_number: "0923456789",
    district: "Cau Giay",
    province: "Hanoi",
    street: "12 Trinh Cong Son",
    ward: "My Dinh",
  },
];

const CustomerTable = () => {
  const [user, setUser] = useState(false);

  useBlockScroll(user);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-[20px] flex items-center justify-between">
        <div className="hidden sm:block">
          <form action="https://formbold.com/s/unique_form_id" method="POST">
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
                placeholder="Tìm khách hàng . . . "
                className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
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
                <Image src={user.image} alt="user" width={48} height={48} />
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {user.name}
              </p>
            </Link>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{user.email}K</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">+{user.telephone_number}</p>
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
        <button className="rounded bg-boxdark px-3 py-2 text-white hover:bg-gray-700 focus:outline-none">
          2
        </button>
        <button className="rounded bg-boxdark px-3 py-2 text-white hover:bg-gray-700 focus:outline-none">
          3
        </button>
        <button className="rounded bg-boxdark px-3 py-2 text-white hover:bg-gray-700 focus:outline-none">
          ...
        </button>
        <button className="rounded bg-boxdark px-3 py-2 text-white hover:bg-gray-700 focus:outline-none">
          5
        </button>

        <button className="rounded bg-boxdark px-4 py-2 text-white hover:bg-gray-700 focus:outline-none">
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

export default CustomerTable;
