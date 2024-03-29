import { extractSlugName } from '@/app/[...slug]/slug.helper';
import { IListingProduct, productListData } from '@/shared/types/product';
import { SendAsync } from '@/shared/utils/axios';
// // Define Payload

interface IProductListAtoZPayload {
  storeID: number;
  customerId: number;
  pageStartindex: number;
  pageEndindex: number;
  filterOptionforfaceteds: {
    name: string;
    value: string[];
  }[];
}

export const fetchProductListAtoZ = async (
  payload: IProductListAtoZPayload,
) => {
  try {
    const url = `/StoreProductFilter/GetFilterByAlphabet.json`;
    const ProductListingAtoZ = await SendAsync<productListData>({
      url,
      method: 'POST',
      data: payload,
    });
    return ProductListingAtoZ;
  } catch (error) {
    return null;
  }
};
