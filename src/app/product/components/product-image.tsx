import useMutation from "@/hooks/use-mutation";
import { updateProductImage } from "@/services/api/products-api";
import useRole from "@/store/useRole";
import CheckRole from "@/utils/checkRole";
import cn from "@/utils/style/cn";
import { toastError, toastSuccess } from "@/utils/toast";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { useShallow } from "zustand/shallow";

type props = {
  id: string;
  category: "pets" | "foods" | "supplies";
  productImage: string;
  refreshDetail: () => void;
};

export default function ProductImage({
  id,
  category,
  productImage,
  refreshDetail,
}: props) {
  const [image, setImage] = useState(productImage);
  const productImageRef = useRef<HTMLInputElement>(null);

  const { idRole } = useRole(
    useShallow((state) => ({
      idRole: state.idRole,
    })),
  );

  const isDisabled = !CheckRole(idRole);

  const { mutate } = useMutation({
    fetcher: updateProductImage,
    options: {
      onSuccess: async () => {
        toastSuccess("Đã cập nhật ảnh");
        refreshDetail();
      },
      onError: (error) => {
        toastError(error.message);
      },
      onFinally: () => {},
    },
  });

  function onChangeImage() {
    if (productImageRef && productImageRef.current) {
      productImageRef.current.click();
    }
  }

  function handleChangeImage(e: ChangeEvent<HTMLInputElement>) {
    try {
      const file = e.target.files?.[0];
      if (file) {
        if (!file.type.startsWith("image/")) {
          toastError("Vui lòng chọn một tệp hình ảnh.");
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result as string);
        };
        reader.readAsDataURL(file);

        const data = new FormData();
        data.append("image", file);
        data.append("category", category);
        data.append("id_product", id);

        mutate({ data });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form action="#">
      <div
        id="FileUpload"
        className={cn(
          "relative mb-5.5 block h-full w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray dark:bg-meta-4",
        )}
      >
        <div
          className="relative flex h-full w-full flex-col items-center justify-center"
          onClick={onChangeImage}
          style={{ width: "100%", height: "100%" }}
        >
          <Image
            src={image === "" ? "/images/product/border-colie.png" : image}
            width={0}
            height={0}
            sizes="100%"
            alt="Food"
            className="h-full w-full object-cover"
          />
          <input
            disabled={isDisabled}
            type="file"
            accept="image/*"
            ref={productImageRef}
            style={{ display: "none" }}
            multiple={false}
            onChange={handleChangeImage}
          />
        </div>
      </div>
    </form>
  );
}
