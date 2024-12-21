import { CartItemType } from "@/types/cart-item";
import { get, post, update } from "../axios";
import { toSnakeCase } from "@/utils/to-snake-case";
import { toCamelCase } from "@/utils/to-camel-case";
import { cartItemData } from "@/app/cart/_components/list-item";
import { CouponType } from "@/types/coupon";
import { PurchaseDataType } from "@/types/purchase-data-type";

export async function AddToCart({
  data: cartData,
}: {
  data: PurchaseDataType;
}) {
  const data = toSnakeCase(cartData);
  return await post({
    url: "/cartItem/add",
    data,
  });
}

export async function getCartItems(url: string) {
  const rawData = await get<CartItemType[]>({
    url: url,
  });
  const data = toCamelCase<CartItemType[]>(rawData);
  return data;
}

export async function updateCart({
  data: cartItemData,
}: {
  data: cartItemData[];
}) {
  const data = toSnakeCase(cartItemData);
  return await update({
    url: "/cartItems/update",
    data,
  });
}

export async function deleteCartItem(id: string) {
  const data = {
    id_item: id,
  };
  return await update({
    url: "/cartItems/delete",
    data,
  });
}

export async function applyCoupon(code: string) {
  const rawData = await get<CouponType>({
    url: `/voucher/apply/` + code,
  });

  const data = toCamelCase<CouponType>(rawData);
  return data;
}

export async function verifyCart() {
  return await get({
    url: "/cartItems/verify",
  });
}
