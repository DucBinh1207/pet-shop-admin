import { toCamelCase } from "@/utils/to-camel-case";
import { get, postFormData, update, updateFormData } from "../axios";
import { ListPetResponse, PetType } from "@/types/pet";
import { toSnakeCase } from "@/utils/to-snake-case";
import { ProductToDeleteType } from "@/app/product/shared/type/productToDelete";
import { FoodType, ListFoodResponse } from "@/types/food";
import { ListSupplyResponse, SupplyType } from "@/types/supply";
import { ResponseProductVariant } from "@/types/product";

export async function getPets(url: string) {
  const rawData = await get<ListPetResponse>({
    url: url,
  });
  const data = toCamelCase<ListPetResponse>(rawData);
  return data;
}

export async function getFoods(url: string) {
  const rawData = await get<ListFoodResponse>({
    url: url,
  });
  const data = toCamelCase<ListFoodResponse>(rawData);
  return data;
}

export async function getSupplies(url: string) {
  const rawData = await get<ListSupplyResponse>({
    url: url,
  });
  const data = toCamelCase<ListSupplyResponse>(rawData);
  return data;
}

export async function getPetDetail(url: string) {
  const rawData = await get<PetType>({
    url: url,
  });
  const data = toCamelCase<PetType>(rawData);
  return data;
}

export async function getFoodDetail(url: string) {
  const rawData = await get<FoodType>({
    url: url,
  });
  const data = toCamelCase<FoodType>(rawData);
  return data;
}

export async function getSupplyDetail(url: string) {
  const rawData = await get<SupplyType>({
    url: url,
  });
  const data = toCamelCase<SupplyType>(rawData);
  return data;
}

export async function updatePet({ data }: { data: FormData }) {
  return await updateFormData({
    url: "/admin/products/update",
    data,
  });
}

export async function updateFood({ data }: { data: FormData }) {
  return await updateFormData({
    url: "/admin/products/update",
    data,
  });
}

export async function updateSupply({ data }: { data: FormData }) {
  return await updateFormData({
    url: "/admin/products/update",
    data,
  });
}

export async function updateProductImage({ data }: { data: FormData }) {
  return await updateFormData({
    url: "/admin/products/image",
    data,
  });
}

export async function createProduct({ data }: { data: FormData }) {
  return await postFormData({
    url: "/admin/products/create",
    data,
  });
}

export async function searchProduct(url: string) {
  const rawData = await get<ResponseProductVariant>({
    url: url,
  });
  const data = toCamelCase<ResponseProductVariant>(rawData);
  return data;
}

export async function deleteProduct({
  data: productData,
}: {
  data: ProductToDeleteType;
}) {
  const data = toSnakeCase(productData);

  return await update({
    url: "/admin/products/delete",
    data,
  });
}

export async function unDeleteProduct({
  data: productData,
}: {
  data: ProductToDeleteType;
}) {
  const data = toSnakeCase(productData);

  return await update({
    url: "/admin/products/unDelete",
    data,
  });
}
