import useBlockScroll from "@/hooks/use-block-scroll";
import Image from "next/image";
import cn from "@/utils/style/cn";
import FormInput from "@/components/form-input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useRef, useState } from "react";
import {
  PetsCategoryType,
  PetsCategoryTypes,
} from "@/constants/pets-category-type.ts";
import {
  BreedOrigin,
  BreedOriginLabel,
  BreedOriginType,
} from "../shared/constant/breed-origin";
import {
  PetGender,
  PetGenderLabel,
  PetGenderTypes,
} from "../shared/constant/pet-gender";
import { toastError, toastSuccess } from "@/utils/toast";
import useMutation from "@/hooks/use-mutation";
import { createProduct } from "@/services/api/products-api";

const schema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên"),
  description: z.string().min(1, "Vui lòng nhập mô tả"),
  price: z.string().min(1, "Vui lòng nhập giá "),
  health: z.string().min(1, "Vui lòng nhập sức khỏe"),
  father: z.string().min(1, "Vui lòng nhập bố"),
  mother: z.string().min(1, "Vui lòng nhập mẹ"),
  deworming: z.string().min(1, "Vui lòng nhập xổ giun"),
  vaccine: z.string().min(1, "Vui lòng nhập vaccine"),
  breed: z.string().min(1, "Vui lòng nhập giống"),
  trait: z.string().min(1, "Vui lòng nhập tính cách"),
  quantity: z.string().min(1, "Vui lòng nhập số lượng"),
});

type AddPetFormType = z.infer<typeof schema>;

type props = {
  handleCloseAddPet: () => void;
  refresh: () => void;
};

const AddPet = ({ handleCloseAddPet, refresh }: props) => {
  useBlockScroll(true);

  const [file, setFile] = useState<File | null>(null);
  const [productImage, setProductImage] = useState("/images/empty.png");

  const productImageInputRef = useRef<HTMLInputElement>(null);

  const [birthday, setBirthday] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const [category, setCategory] = useState<PetsCategoryTypes>(
    PetsCategoryType.DOG,
  );

  const [breedOrigin, setBreedOrigin] = useState<BreedOriginType>(
    BreedOrigin.PUREBRED,
  );

  const [petGender, setPetGender] = useState<PetGenderTypes>(PetGender.MALE);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddPetFormType>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      health: "",
      father: "",
      mother: "",
      deworming: "",
      vaccine: "",
      breed: "",
      trait: "",
      quantity: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  function handleChangeDateOfBirth(e: ChangeEvent<HTMLInputElement>) {
    const dateInput = e.target.value;
    const date = new Date(dateInput);
    setBirthday(dateInput);
    setDateOfBirth(date.toISOString().replace(".000", ""));
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value as PetsCategoryTypes);
  };

  const handleBreedOriginChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBreedOrigin(Number(e.target.value) as BreedOriginType);
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPetGender(Number(e.target.value) as PetGenderTypes);
  };

  function onChangeImage() {
    if (productImageInputRef && productImageInputRef.current) {
      productImageInputRef.current.click();
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
        setFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setProductImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const { mutate } = useMutation({
    fetcher: createProduct,
    options: {
      onSuccess: async () => {
        toastSuccess("Đã thêm sản phẩm ");
        refresh();
      },
      onError: (error) => {
        toastError(error.message);
      },
      onFinally: () => {},
    },
  });

  const onSubmit = handleSubmit((data: AddPetFormType) => {
    if (dateOfBirth) {
      const product = new FormData();
      product.append("nameTag", "pets");
      product.append("name", data.name);
      product.append("description", data.description);
      product.append("price", data.price);
      product.append("gender", petGender === PetGender.MALE ? "true" : "false");
      product.append("health", data.health);
      product.append("father", data.father);
      product.append("mother", data.mother);
      product.append("type", category);
      product.append("deworming", data.deworming);
      product.append("vaccine", data.vaccine);
      product.append(
        "breed_origin",
        breedOrigin === BreedOrigin.PUREBRED ? "true" : "false",
      );
      product.append("breed", data.breed);
      product.append("trait", data.trait);
      product.append("date_of_birth", dateOfBirth);
      product.append("quantity", data.quantity);
      product.append("image", file ?? "");

      mutate({ data: product });
    } else toastError("Nhập ngày sinh");
  });

  return (
    <div className="small-screen:h-0 small-screen:pb-[56.25%] fixed left-[50%] top-[50%] z-[110] h-[90vh] w-[90vw] translate-x-[-50%] translate-y-[-50%] p-[50px]">
      <form
        onSubmit={onSubmit}
        className="grid h-full grid-cols-5 gap-8 overflow-hidden"
      >
        <div className="xl:col-span-13 h-ful col-span-4 overflow-y-scroll">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-center justify-between border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Thêm thú cưng
              </h3>
              <div className="flex justify-end gap-4.5">
                <button
                  className="flex justify-center rounded border border-stroke bg-green-700 px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  type="submit"
                >
                  Thêm thú cưng
                </button>

                <button
                  className="flex justify-center rounded border border-stroke bg-blue-700 px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCloseAddPet();
                  }}
                >
                  Thoát
                </button>
              </div>
            </div>
            <div className="p-7">
              <div>
                <div className="mb-5.5">
                  <FormInput
                    label="Tên sản phẩm"
                    id="name"
                    type="text"
                    variant="secondary"
                    className="w-full"
                    placeholder="Nhập tên sản phẩm"
                    {...register("name")}
                    error={errors.name?.message}
                  />
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="Username"
                  >
                    Mô tả
                  </label>
                  <div className="relative">
                    <textarea
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-500 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      id="bio"
                      rows={6}
                      placeholder="Nhập mô tả"
                      {...register("description")}
                    ></textarea>
                    {errors.description?.message && (
                      <span className="ml-[5px] mt-[5px] text-[13px] leading-[18px] text-red-500">
                        {errors.description?.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="phoneNumber"
                    >
                      Loại thú cưng
                    </label>
                    <select
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-500 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      value={category}
                      onChange={handleCategoryChange}
                    >
                      {Object.entries(PetsCategoryType).map(
                        ([, categoryType]) => (
                          <option key={categoryType} value={categoryType}>
                            {categoryType}
                          </option>
                        ),
                      )}
                    </select>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <FormInput
                      label="Giống"
                      id="name"
                      type="text"
                      variant="secondary"
                      className="w-full"
                      placeholder="Nhập giống thú cưng"
                      {...register("breed")}
                      error={errors.breed?.message}
                    />
                  </div>
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
                      Ngày sinh
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4"></span>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="date"
                        name="fullName"
                        id="fullName"
                        value={birthday}
                        onChange={handleChangeDateOfBirth}
                      />
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <FormInput
                      label="Tính cách"
                      id="name"
                      type="text"
                      variant="secondary"
                      className="w-full"
                      placeholder="Nhập tính cách"
                      {...register("trait")}
                      error={errors.trait?.message}
                    />
                  </div>
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <FormInput
                      label="Tiêm phòng"
                      id="name"
                      type="text"
                      variant="secondary"
                      className="w-full"
                      placeholder="Nhập tiêm phòng"
                      {...register("vaccine")}
                      error={errors.vaccine?.message}
                    />
                  </div>

                  <div className="w-full sm:w-1/2">
                    <FormInput
                      label="Xổ giun"
                      id="name"
                      type="text"
                      variant="secondary"
                      className="w-full"
                      placeholder="Nhập xổ giun"
                      {...register("deworming")}
                      error={errors.deworming?.message}
                    />
                  </div>
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <FormInput
                      label="Bố"
                      id="name"
                      type="text"
                      variant="secondary"
                      className="w-full"
                      placeholder="Nhập bố"
                      {...register("father")}
                      error={errors.father?.message}
                    />
                  </div>

                  <div className="w-full sm:w-1/2">
                    <FormInput
                      label="Mẹ"
                      id="name"
                      type="text"
                      variant="secondary"
                      className="w-full"
                      placeholder="Nhập mẹ"
                      {...register("mother")}
                      error={errors.mother?.message}
                    />
                  </div>
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="phoneNumber"
                    >
                      Thuần chủng
                    </label>
                    <select
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-500 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      value={breedOrigin}
                      onChange={handleBreedOriginChange}
                    >
                      {Object.entries(BreedOrigin).map(([, origin]) => (
                        <option key={origin} value={origin}>
                          {BreedOriginLabel[origin]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="phoneNumber"
                    >
                      Giới tính
                    </label>
                    <select
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-500 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      value={petGender}
                      onChange={handleGenderChange}
                    >
                      {Object.entries(PetGender).map(([, gender]) => (
                        <option key={gender} value={gender}>
                          {PetGenderLabel[gender]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <FormInput
                      label="Sức khỏe"
                      id="name"
                      type="text"
                      variant="secondary"
                      className="w-full"
                      placeholder="Nhập sức khỏe"
                      {...register("health")}
                      error={errors.health?.message}
                    />
                  </div>

                  <div className="w-full sm:w-1/2">
                    <FormInput
                      label="Số lượng"
                      id="name"
                      type="text"
                      variant="secondary"
                      className="w-full"
                      placeholder="Nhập số lượng"
                      {...register("quantity")}
                      error={errors.quantity?.message}
                    />
                  </div>
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <FormInput
                      label="Giá"
                      id="name"
                      type="text"
                      variant="secondary"
                      className="w-full"
                      placeholder="Nhập giá"
                      {...register("price")}
                      error={errors.price?.message}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-5 xl:col-span-1">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Ảnh thú cưng
              </h3>
            </div>
            <div className="p-7">
              <div>
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
                      src={productImage}
                      width={0}
                      height={0}
                      sizes="100%"
                      alt="Pet"
                      className="h-full w-full object-cover"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      ref={productImageInputRef}
                      style={{ display: "none" }}
                      multiple={false}
                      onChange={handleChangeImage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPet;
