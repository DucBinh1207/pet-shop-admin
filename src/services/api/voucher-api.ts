import { toCamelCase } from "@/utils/to-camel-case";
import { get, post, update } from "../axios";
import { ListVoucherResponseApi } from "@/types/voucher";
import { CreateVoucherType } from "@/app/vouchers/components/add-voucher";
import { UpdateVoucherFormType } from "@/app/vouchers/components/voucher-detail";

export async function getVouchers(url: string) {
  const rawData = await get<ListVoucherResponseApi>({
    url: url,
  });
  const data = toCamelCase<ListVoucherResponseApi>(rawData);
  return data;
}

export async function createVoucher({ data }: { data: CreateVoucherType }) {
  return await post({
    url: "/admin/vouchers/create",
    data,
  });
}

export async function updateVoucher({ data }: { data: UpdateVoucherFormType }) {
  return await update({
    url: "/admin/vouchers/update",
    data,
  });
}

export async function deleteVoucher({ data }: { data: { id: string } }) {
  return await update({
    url: "/admin/vouchers/delete",
    data,
  });   
}

export async function unDeleteVoucher({ data }: { data: { id: string } }) {
  return await update({
    url: "/admin/vouchers/unDelete",
    data,
  });
}

