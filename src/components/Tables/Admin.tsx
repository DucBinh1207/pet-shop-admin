import UserDetail from "@/app/user/components/user-detail";
import useBlockScroll from "@/hooks/use-block-scroll";
import { RenderUserStatus } from "@/utils/renderUserStatus";
import cn from "@/utils/style/cn";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useMemo, useState } from "react";
import useUser from "@/hooks/user/useUser";
import TableSkeleton from "./table-skeleton";
import Pagination from "../pagination";
import { UserStatus, UserStatusLabel } from "@/constants/user-status";
import { useDebounce } from "@/hooks/use-debounce";
import { UserType } from "@/types/user";
import useMutation from "@/hooks/use-mutation";
import { toastError, toastSuccess } from "@/utils/toast";
import useRole from "@/store/useRole";
import CheckRole from "@/utils/checkRole";
import { useShallow } from "zustand/shallow";
import { banUser } from "@/services/api/user-api";
import AddUser from "@/app/user/components/add-user";
import { useRouter } from "next/navigation";

const AdminTable = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAddUser, setIsAddUser] = useState(false);
  const router = useRouter();

  useBlockScroll(user !== null);
  const [search, setSearch] = useState("");
  const [paging, setPaging] = useState(1);
  const [status, setStatus] = useState<1 | 2>(1);
  const [totalPages, setTotalPages] = useState(1);
  const debouncedSearch = useDebounce(search);

  function handleCloseUserDetail() {
    setUser(null);
  }

  function handleCloseAddUser() {
    setIsAddUser(false);
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = parseInt(e.target.value, 10);
    if (newStatus === 1 || newStatus === 2) {
      setStatus(newStatus);
      setPaging(1);
    }
  };

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    setPaging(1);
  }

  const {
    users,
    totalPages: total,
    isLoading,
    isError,
    refresh,
  } = useUser({
    search: debouncedSearch,
    paging,
    limit: 10,
    idRole: 2,
    status,
  });

  const { mutate } = useMutation({
    fetcher: banUser,
    options: {
      onSuccess: async () => {
        toastSuccess("Đã khóa người dùng");
        refresh();
      },
      onError: (error) => {
        toastError(error.message);
      },
      onFinally: () => {},
    },
  });

  const { idRole } = useRole(
    useShallow((state) => ({
      idRole: state.idRole,
    })),
  );

  function handleBanUser(id: string) {
    const data = {
      userId: id,
    };
    if (CheckRole(idRole)) mutate({ data });
    else toastError("Bạn không được phép thực hiện chức năng này");
  }

  function handlePagingFilter(pagingCurrent: number) {
    setPaging(pagingCurrent);
  }

    useMemo(() => {
      if (total !== undefined) {
        if (total === 0) setTotalPages(1);
        else setTotalPages(total);
      }
    }, [total]);

  if (isError) window.location.href = "/error";

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (idRole !== 2) {
    router.push("/forbidden");
    return;
  }

  if (users)
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
                  value={search}
                  placeholder="Nhập email hoặc tên để tìm quản lý . . . "
                  className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"
                  onChange={handleSearch}
                />
              </div>
            </form>
          </div>

          <div className="flex gap-[10px]">
            <div>
              <select
                className="block w-full rounded-sm bg-gray-200 p-2.5 text-black dark:bg-gray-700 dark:text-white"
                defaultValue={status}
                onChange={handleStatusChange}
              >
                {Object.entries(UserStatus).map(([, statusValue]) => (
                  <option key={statusValue} value={statusValue}>
                    {UserStatusLabel[statusValue]}
                  </option>
                ))}
              </select>
            </div>
            {CheckRole(idRole) && (
              <button
                className="flex justify-center rounded border border-stroke bg-green-700 px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                onClick={(e) => {
                  e.preventDefault();
                  setIsAddUser(true);
                }}
              >
                Thêm người dùng
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 sm:grid-cols-6 dark:bg-meta-4">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Quản lý
              </h5>
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
                Trạng thái
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
                    src={user.image ?? ""}
                    alt="user"
                    width={48}
                    height={48}
                  />
                </div>
                <p className="hidden text-black sm:block dark:text-white">
                  {user.name ?? "-"}
                </p>
              </Link>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{user.email}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{user.telephoneNumber ?? "-"}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">
                  {user.nationality ?? "-"}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p
                  className={cn(" ", {
                    "text-meta-1": user.status === UserStatus.BANNED,
                    "text-meta-3": user.status === UserStatus.ACTIVE,
                  })}
                >
                  {RenderUserStatus(user.status)}
                </p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5">
                  <button
                    className="rounded bg-boxdark px-4 py-2 text-blue-700 hover:bg-gray-700 focus:outline-none"
                    onClick={() => setUser(user)}
                  >
                    Xem
                  </button>
                  {user.status === UserStatus.ACTIVE ||
                    (user.idRole === 2 && CheckRole(idRole) && (
                      <button
                        className="rounded bg-boxdark px-4 py-2 text-red-700 hover:bg-gray-700 focus:outline-none"
                        onClick={() => {
                          handleBanUser(user.id);
                        }}
                      >
                        Khóa
                      </button>
                    ))}
                </p>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          paging={paging}
          totalPages={totalPages}
          handlePagingFilter={handlePagingFilter}
        />
        {user && (
          <>
            <UserDetail
              user={user}
              handleCloseUserDetail={handleCloseUserDetail}
              refresh={refresh}
            />
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

        {isAddUser && (
          <>
            <AddUser
              handleCloseAddUser={handleCloseAddUser}
              refresh={refresh}
            />
            <div
              className={cn(
                "fixed inset-0 z-[105] h-[100vh] w-[100vw] bg-overlay_color transition-opacity",
                {
                  "block opacity-100": isAddUser,
                  "hidden opacity-0": !isAddUser,
                },
              )}
            />
          </>
        )}
      </div>
    );
};

export default AdminTable;
