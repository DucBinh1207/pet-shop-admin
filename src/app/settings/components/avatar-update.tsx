import useMutation from "@/hooks/use-mutation";
import { updateAvatar } from "@/services/api/user-api";
import { UserType } from "@/types/user";
import cn from "@/utils/style/cn";
import { toastError, toastSuccess } from "@/utils/toast";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

export type updateAvatarResponse = {
  imageUrl: string;
};

type props = {
  userInfo: UserType;
};

export default function AvatarUpdate({ userInfo }: props) {
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState(userInfo.image);

  const { mutate } = useMutation({
    fetcher: updateAvatar,
    options: {
      onSuccess: async () => {
        toastSuccess("Đã cập nhật ảnh người dùng");
      },
      onError: (error) => {
        toastError(error.message);
      },
      onFinally: () => {},
    },
  });

  function onChangeAvatar() {
    if (avatarInputRef && avatarInputRef.current) {
      avatarInputRef.current.click();
    }
  }

  function handleChangeAvatar(e: ChangeEvent<HTMLInputElement>) {
    try {
      const file = e.target.files?.[0];
      if (file) {
        if (!file.type.startsWith("image/")) {
          toastError("Vui lòng chọn một tệp hình ảnh.");
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatar(reader.result as string);
        };
        reader.readAsDataURL(file);

        const data = new FormData();
        data.append("image", file);

        mutate({ data });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="col-span-3">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Avatar</h3>
          <span className="mt-[10px]">Nhấn để thay đổi avatar</span>
        </div>
        <div className="p-7">
          <form action="#">
            <div
              id="FileUpload"
              className={cn(
                "relative mb-5.5 block h-full w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray dark:bg-meta-4",
              )}
            >
              <div
                className="relative flex h-full w-full flex-col items-center justify-center"
                onClick={onChangeAvatar}
                style={{ width: "100%", height: "100%" }}
              >
                <Image
                  src={
                    avatar === undefined || avatar === null
                      ? "/images/user/avatar.svg"
                      : avatar
                  }
                  width={0} 
                  height={0}
                  sizes="100%" 
                  alt="User"
                  className="h-full w-full object-cover" 
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={avatarInputRef}
                  style={{ display: "none" }}
                  multiple={false}
                  onChange={handleChangeAvatar}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
