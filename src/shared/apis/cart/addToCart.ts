import { SendAsync } from "@/shared/utils/axios";

//Payload
export interface IAddToCartPayload {
  addToCartModel: AddToCartModel;
}

export interface AddToCartModel {
  customerId: number;
  productId: number;
  storeId: number;
  isempLogin: boolean;
  ipAddress: string;
  isForm: boolean;
  shoppingCartItemModel: ShoppingCartItemModel;
  shoppingCartItemsDetailModels: ShoppingCartItemsDetailModel[];
  cartLogoPersonModel: CartLogoPersonModel[];
}

export interface ShoppingCartItemModel {
  id: number;
  price: number;
  quantity: number;
  weight: number;
  productType: number;
  discountPrice: number;
  logoTitle: string;
  logogImagePath: string;
  perQuantity: number;
  appQuantity: number;
  status: number;
  discountPercentage: number;
  productCustomizationId: number;
  itemNotes: string;
  isEmployeeLoginPrice: boolean;
}

export interface ShoppingCartItemsDetailModel {
  attributeOptionName: string;
  attributeOptionValue: string;
  attributeOptionId: string | number;
}

export interface CartLogoPersonModel {
  id?: number;
  attributeOptionId: number | string;
  attributeOptionValue: string;
  code: string;
  price: number;
  quantity: number;
  estimateDate: Date;
  isEmployeeLoginPrice: number;
}

export interface CartLogoPersonDetailModel {
  id: number;
  logoPrice: number;
  logoQty: number;
  logoFile: string;
  logoLocation: string;
  logoTotal: number;
  colorImagePath: string;
  logoUniqueId: string;
  price: number;
  logoColors: string;
  logoNotes: string;
  logoDate: Date;
  logoNames: string;
  digitalPrice: number;
  logoPositionImage: string;
  oldFilePath: string;
  isSewOut: boolean;
  sewOutAmount: number;
  reUsableCustomerLogo: number;
  originalLogoFilePath: string;
}


//Api 
export const addToCart = async (payload: IAddToCartPayload) => {
  const url = `/Store/addtocart.json`;
  const res = await SendAsync<number>({
    url,
    data: payload,
    method: 'POST'
  })
  return res;
};
