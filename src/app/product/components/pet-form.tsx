import { z } from "zod";
import { ChangeEvent, useState } from "react";
import FormInput from "@/components/form-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PetType } from "@/types/pet";
import {
  PetsCategoryType,
  PetsCategoryTypes,
} from "@/constants/pets-category-type.ts";
import { deleteProduct, updatePet } from "@/services/api/products-api";
import useMutation from "@/hooks/use-mutation";
import { toastError, toastSuccess } from "@/utils/toast";
import {
  PetGender,
  PetGenderLabel,
  PetGenderTypes,
} from "../shared/constant/pet-gender";
import {
  BreedOrigin,
  BreedOriginLabel,
  BreedOriginType,
} from "../shared/constant/breed-origin";
import { useShallow } from "zustand/shallow";
import useRole from "@/store/useRole";
import CheckRole from "@/utils/checkRole";
import { ProductToDeleteType } from "../shared/type/productToDelete";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Province is required"),
  health: z.string().min(1, "District is required"),
  father: z.string().min(1, "District is required"),
  mother: z.string().min(1, "District is required"),
  deworming: z.string().min(1, "District is required"),
  vaccine: z.string().min(1, "District is required"),
  breed: z.string().min(1, "District is required"),
  trait: z.string().min(1, "District is required"),
  quantity: z.string().min(1, "District is required"),
});

type UpdatePetFormType = z.infer<typeof schema>;

export type UpdatePetType = UpdatePetFormType & {
  id: string;
  type: string;
  gender: boolean;
  dateOfBirth: boolean;
};

type props = {
  pet: PetType;
  handleClosePetDetail: () => void;
  refresh: () => void;
  refreshDetail: () => void;
};

export default function PetForm({
  pet,
  handleClosePetDetail,
  refresh,
  refreshDetail,
}: props) {
  const [birthday, setBirthday] = useState(
    pet
      ? new Date(pet.variationsPets[0].dateOfBirth).toISOString().split("T")[0]
      : "",
  );
  const [dateOfBirth, setDateOfBirth] = useState(pet.dateCreated);

  const [category, setCategory] = useState<PetsCategoryTypes>(
    pet.variationsPets[0].type as PetsCategoryTypes,
  );

  const [breedOrigin, setBreedOrigin] = useState<BreedOriginType>(
    pet.variationsPets[0].breedOrigin ? 1 : 2,
  );

  const [petGender, setPetGender] = useState<PetGenderTypes>(
    pet.variationsPets[0].gender ? 1 : 2,
  );

  const { idRole } = useRole(
    useShallow((state) => ({
      idRole: state.idRole,
    })),
  );

  const isDisabled = !CheckRole(idRole);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePetFormType>({
    defaultValues: {
      name: pet?.name,
      description: pet?.description,
      price: pet?.variationsPets[0].price.toString(),
      health: pet?.variationsPets[0].health,
      father: pet?.variationsPets[0].father,
      mother: pet?.variationsPets[0].mother,
      deworming: pet?.variationsPets[0].deworming,
      vaccine: pet?.variationsPets[0].vaccine.toString(),
      breed: pet?.variationsPets[0].breed,
      trait: pet?.variationsPets[0].trait,
      quantity: pet?.variationsPets[0].quantity.toString(),
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

  const { mutate } = useMutation({
    fetcher: updatePet,
    options: {
      onSuccess: async () => {
        toastSuccess("Đã cập nhật thú cưng");
        refresh();
        refreshDetail();
        handleClosePetDetail();
      },
      onError: (error) => {
        toastError(error.message);
      },
      onFinally: () => {},
    },
  });

  const onSubmit = handleSubmit(async (data: UpdatePetFormType) => {
    const updateData = new FormData();
    updateData.append("nameTag", "pets");
    updateData.append("_id", pet.id);
    updateData.append("name", data.name);
    updateData.append("description", data.description);
    updateData.append("price", data.price);
    updateData.append(
      "gender",
      petGender === PetGender.MALE ? "true" : "false",
    );
    updateData.append("health", data.health);
    updateData.append("father", data.father);
    updateData.append("mother", data.mother);
    updateData.append("type", category);
    updateData.append("deworming", data.deworming);
    updateData.append("vaccine", data.vaccine);
    updateData.append(
      "breed_origin",
      breedOrigin === BreedOrigin.PUREBRED ? "true" : "false",
    );
    updateData.append("breed", data.breed);
    updateData.append("trait", data.trait);
    updateData.append("date_of_birth", dateOfBirth);
    updateData.append("quantity", data.quantity);

    await mutate({ data: updateData });
  });

  const { mutate: mutateDelete } = useMutation({
    fetcher: deleteProduct,
    options: {
      onSuccess: async () => {
        toastSuccess("Đã xóa sản phẩm");
        refresh();
        handleClosePetDetail();
      },
      onError: (error) => {
        toastError(error.message);
      },
      onFinally: () => {},
    },
  });

  function handleDeleteProduct(id: string) {
    const data: ProductToDeleteType = {
      idProduct: id,
      category: "pets",
    };
    if (CheckRole(idRole)) mutateDelete({ data });
    else toastError("Bạn không được phép thực hiện chức năng này");
  }

  return (
    <form
      className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
      onSubmit={onSubmit}
    >
      <div className="flex items-center justify-between border-b border-stroke px-7 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Thông tin chi tiết
        </h3>
        <div className="flex justify-end gap-4.5">
          {!isDisabled && (
            <>
              <button
                className="flex justify-center rounded bg-red-500 px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteProduct(pet.id);
                }}
              >
                Xóa sản phẩm
              </button>

              <button className="flex justify-center rounded border border-stroke bg-green-700 px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white">
                Cập nhật
              </button>
            </>
          )}

          <button
            className="flex justify-center rounded border border-stroke bg-blue-700 px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
            onClick={(e) => {
              e.preventDefault();
              handleClosePetDetail();
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
              disabled
              label="Id"
              id="id"
              type="text"
              variant="secondary"
              className="w-full"
              value={pet.id}
            />
          </div>

          <div className="mb-5.5">
            <FormInput
              disabled={isDisabled}
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
                disabled={isDisabled}
                className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-500 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                id="bio"
                rows={6}
                placeholder="Nhập mô tả"
                {...register("description")}
              ></textarea>
              {errors.name?.message && (
                <span className="ml-[5px] mt-[5px] text-[13px] leading-[18px] text-red-500">
                  {errors.name?.message}
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
                disabled={isDisabled}
                className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-500 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                value={category}
                onChange={handleCategoryChange}
              >
                {Object.entries(PetsCategoryType).map(([, categoryType]) => (
                  <option key={categoryType} value={categoryType}>
                    {categoryType}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full sm:w-1/2">
              <FormInput
                disabled={isDisabled}
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
                  disabled={isDisabled}
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
                disabled={isDisabled}
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
                disabled={isDisabled}
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
                disabled={isDisabled}
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
                disabled={isDisabled}
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
                disabled={isDisabled}
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
                disabled={isDisabled}
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
                disabled={isDisabled}
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
                disabled={isDisabled}
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
                disabled={isDisabled}
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
                disabled={isDisabled}
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
    </form>
  );
}
