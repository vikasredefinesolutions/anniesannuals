import { SendAsync } from '@/shared/utils/axios';
import { _CartItem } from '../cart/fetchCartProducts';

export interface ICheckCartModel {
  storeId: number;
  customerId: number;
  shipToState: string;
}

export const checkCartProducts = async (request: ICheckCartModel) => {
  const url = `/Store/GetRestrictShipStateProducts.json`;
  const res = await SendAsync<_CartItem[] | null>({
    url: url,
    method: 'POST',
    data: request,
  });

  return res;
};
