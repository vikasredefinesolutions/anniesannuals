import {
  IFetchProductsRecentlyViewedPayload,
  IProductColor,
  IProductDetails,
  IProductInventory,
  IProductInventoryTransfomed,
  IProductRatings,
  IProductReviewByUserId,
  IProductReviews,
  IProductReviewsByUserId,
  IProductsRecentlyViewed,
  IProductsRecentlyViewedPayload,
  IProductsRecentlyViewedResponse,
  IShopBGardenProductDetail,
  IShopBGardenProductDetailPayload,
} from '@/shared/types/product';
import { SendAsync } from '@/shared/utils/axios';

export interface IProductsAlike {
  id: number;
  name: string;
  msrp: number;
  seName: string;
  image: string;
  categoryId: number;
  isSpecialBrand: boolean;
  lowPrice: number;
  masterId: number;
  storeId: number;
  getProductImageOptionList: IProductImageOption[];
  splitproductList?: [];
  customFields: Array<{
    value: string;
    label: string;
  }>;
  productReviewsCount: number;
  productRatingAverage: string;
  productTagViewModel: Array<{
    productId: number;
    imagename: string;
    productTagName: string;
    tagPosition: string;
  }>;
}

export interface IProductImageOption {
  id: number;
  productId: number;
  imageName: string;
  colorName: string;
  displayorder: number;
  alttag: string;
}
export interface IAddReviewPayload {
  reviewModel: IReviewModel;
}
export interface IReviewModel {
  id: number;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
  productId: string | number;
  customerId: number;
  storeId: number;
  commentHeading: string;
  comment: string;
  rating: number;
  helpFullCount: number;
  notHelpFullCount: number;
  recStatus: string;
  images: IProductReviewMedia[];
}

export interface IProductReviewMedia {
  id: number;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
  reviewId: number;
  imageName: string;
  displayOrder: number;
  recStatus: string;
}

export interface IReviewCountPayload {
  storeProductReviewCount: {
    id: number;
    rowVersion: string;
    location: string;
    ipAddress: string;
    macAddress: string;
    reviewId: number;
    storeid: number;
    yes: number;
    no: number;
    recStatus: string;
  };
}
export interface _ProductDiscountTable {
  productDiscountTemplateID: number;
  minimumUnits: number;
  minimumUnitsTotalPrice: number;
  subRows: SubRow[];
}
export interface SubRow {
  discountPrice: string;
  displayQuantity: string;
}
export const getProductDetailsBySeName = async (
  seName: string,
  storeId: number,
  productId = 0,
): Promise<IProductDetails | null> => {
  try {
    const url = `/StoreProduct/getstoreproductbysename/${seName}/${storeId}/${productId}.json`;
    const res = await SendAsync<IProductDetails>({
      url,
      method: 'GET',
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const fetchProductColors = async (productId: number) => {
  try {
    const url = `/StoreProduct/getproductattributecolor/${productId}.json`;
    const res = await SendAsync<IProductColor[] | null>({
      url,
      method: 'POST',
    });
    return res;
  } catch (error) {
    return null;
  }
};
export const FetchInventoryById = async (payload: {
  productId: number;
  attributeOptionId: number[];
}): Promise<IProductInventoryTransfomed | null> => {
  const url = `StoreProduct/getproductattributesizes.json`;
  const response = await SendAsync<IProductInventory[]>({
    url,
    data: payload,
    method: 'POST',
  });
  if (response === null) {
    return null;
  }
  const sizes = payload.attributeOptionId.map((id) => {
    const repeatedSizes = response
      .map((int: any) => {
        if (int.colorAttributeOptionId === id) {
          return int;
        }
        return '';
      })
      .filter(Boolean);

    return {
      colorAttributeOptionId: id,
      sizeArr: repeatedSizes,
    };
  });

  const transformedData: IProductInventoryTransfomed = {
    inventory: response,
    sizes: sizes,
  };
  return transformedData;
};

export const fetchYouAlsoLikeProduct = async (
  productId: number,
  storeId: number,
) => {
  try {
    const url = `/StoreProduct/getyoumaylikeproducts/${productId}/${storeId}.json`;
    const youMayAlsoLikeRes = await SendAsync<IProductsAlike[] | null>({
      url,
      method: 'POST',
    });
    return youMayAlsoLikeRes;
  } catch (error) {
    return null;
  }
};

export const fetchProductRatings = async (productId: number) => {
  try {
    const url = `/StoreProduct/getproductreviews/${productId}.json`;
    const res = await SendAsync<IProductRatings>({
      url,
      method: 'GET',
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const fetchProductReviews = async (
  productId: number,
): Promise<IProductReviews[] | undefined> => {
  try {
    const url = `/StoreProduct/getproductreviewsdetail/${productId}.json`;
    const res = await SendAsync<IProductReviews[]>({
      url,
      method: 'GET',
    });
    return res;
  } catch (error: any) {
    console.log(error?.message || 'Product id is missing');
  }
};

export const fetchProductReviewsByUserId = async ({
  storeId,
  customerId,
  reviewId,
}: IProductReviewByUserId): Promise<IProductReviewsByUserId | undefined> => {
  try {
    const url = `/StoreProduct/getcustomerproductreviewbyreviewid/${storeId}/${customerId}/${reviewId}.json`;
    const res = await SendAsync<IProductReviewsByUserId>({
      url,
      method: 'GET',
    });
    return res;
  } catch (error: any) {
    console.log(error?.message || 'Product id is missing');
  }
};

export const postProductReview = async (payload: IAddReviewPayload) => {
  try {
    const url = `/StoreProduct/createproductreview.json`;
    const res = await SendAsync<any>({
      url,
      method: 'POST',
      data: payload,
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const postProductUpdateReview = async (payload: IAddReviewPayload) => {
  try {
    const url = `/StoreProduct/updateproductreview.json`;
    const res = await SendAsync<any>({
      url,
      method: 'POST',
      data: payload,
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const postReviewCount = async (payload: IReviewCountPayload) => {
  try {
    const url = `/StoreProduct/createstoreproductreviewcount.json`;
    const res = await SendAsync<any>({
      url: url,
      method: 'POST',
      data: payload,
    });
    return res;
  } catch (error) {
    return error;
  }
};
export const InsertProductRecentlyViewed = async (
  payload: IProductsRecentlyViewedPayload,
) => {
  const url = `StoreProductRecentlyViewed/insertproductrecentlyview.json`;
  try {
    const res = await SendAsync<IProductsRecentlyViewed>({
      url: url,
      method: 'POST',
      data: payload,
    });
    return res;
  } catch (error) {
    return null;
  }
};
export const FetchProductRecentlyViewed = async (
  payload: IFetchProductsRecentlyViewedPayload,
) => {
  const url = `StoreProductRecentlyViewed/getproductsrecentlyview.json`;

  const res = await SendAsync<IProductsRecentlyViewedResponse[]>({
    url: url,
    method: 'POST',
    data: payload,
  });
  return res;
};

export const FetchDiscountTablePrices = async (payload: {
  storeId: number;
  seName: string;
  customerId: number;
  attributeOptionId: number;
}): Promise<_ProductDiscountTable | null> => {
  const url = `StoreProduct/getproductquantitydiscounttabledetail.json`;

  const response = await SendAsync<_ProductDiscountTable>({
    url: url,
    method: 'POST',
    data: payload,
  });

  return response;
};

export const ShopbygardanProductDetails = async (
  payload: IShopBGardenProductDetailPayload,
) => {
  const url = `/StoreProduct/shopbygardanbundle/${payload.categoryId}/${payload.storeId}.json`;
  try {
    const res = await SendAsync<IShopBGardenProductDetail>({
      url,
      method: 'GET',
    });
    return res;
  } catch (error) {
    return null;
  }
};
export const FetchCustomerQuantityByProductId = async (payload: {
  ShoppingCartItemsId: number;
  ProductId: number;
  CustomerId: number;
}): Promise<number | null> => {
  const url = `Store/GetCustomerQuantityByProductId/${payload.ProductId}/${payload.CustomerId}/${payload.ShoppingCartItemsId}.json`;

  const response = await SendAsync<number>({
    url: url,
    method: 'GET',
  });

  return response;
};
