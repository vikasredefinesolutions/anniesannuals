import { SendAsync } from '@/shared/utils/axios';

export interface updateCartQuantityReq {
  updateCartLinePersonModel: {
    attributeOptionId?: number;
    cartLogoPersonId?: number;
    quantity: number;
    shoopingCartItemsId: number;
  };
}

export const updateCartQuantity = async (
  req: updateCartQuantityReq,
): Promise<number> => {
  const url = `/Store/updatequantity.json`;
  const res = await SendAsync<number>({
    url: url,
    method: 'POST',
    data: req,
  });
  return res;
};
