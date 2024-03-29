// Define Payload

import { SendAsync } from '@/shared/utils/axios';

//Response
export interface _CartItem {
  attributeOptionId: null;
  attributeOptionValue: null;
  colorImage: string;
  isGiftcardProduct: boolean;
  productName: string;
  productId: number;
  msrp: number;
  sku: string;
  shoppingCartItemsId: number;
  price: number;
  productBundleAllProductViewModels?: productBundleAllProductViewModels[];
  itemNote: string;
  discountPrice: number;
  sewOutTotal: number;
  shoppingCartItemDetailsViewModel: ShoppingCartItemDetailsViewModel[];
  totalCustomFieldsCharges: number;
  totalQty: number;
  totalPrice: number;
  productRatingAverage?: string;
  productReviewsCount?: string;
  txtcode: string;
  seName: string;
  categoryName?: string; // dobutful
  brandName?: string; // dobutful
  refundQty?: number;
  refundedAmount?: number;
  logoTotalPrice: number;
  lineTotalPrice: number;
  productTotal: number;
  isBrandPersonalization: boolean;
  customFields: any;
  brandPolicyViewModels: BrandPolicyViewModel;
  shippingDate: string;
  estimateShippingDate: string | null;
  estimateDeliveryDate: string | null;
  futureInventoryShipDate: string;
  isPreOrder: boolean;
  futureInventoryDate: string;
  status?: string;
}

export interface ShoppingCartItemDetailsViewModel {
  id: number;
  attributeOptionId: number;
  attributeOptionValue: string;
  qty: number;
  price: number;
  unitPrice?: string | number;
  code: string;
}

export interface productBundleAllProductViewModels {
  attributeImagesViewModels: { imageUrl: string }[];
  name: string;
  quantity: number;
  salePrice: number;
}

export interface ShoppingCartLinePersonViewModel {
  id: number;
  cartLinePersonId: number;
  linePrice: number;
  lineqty: string;
  lineabovelogo: number;
  lineindividually: number;
  lineNumber: number;
  linetext: string;
  linetotal: number;
  linefont: string;
  linecolor: string;
  parentId: number;
  personalizeLocation: string;
}

export interface ShoppingCartLogoPersonViewModel {
  id: number;
  cartLogoPersonDetailId: number;
  logoImagePath: string;
  logoPrice: number;
  logoLocation: string;
  logoName: string;
  logoPositionImage: string;
  isSewOut: boolean;
  sewOutAmount: number;
  reUsableCustomerLogo: number;
  sku: string;
  size: string;
  name: string;
  qty: number;
}

export interface ShoppingCartItemsCustomFieldViewModel {
  id: number;
  cartItemsId: number;
  storeProductCustomFieldName: string;
  storeProductCustomFieldValue: string;
  customizationCharges: number;
  isRequired: boolean;
  isExclusive: boolean;
  isChargePerCharacter: boolean;
  quantity: number;
  subTotal: number;
  productId: number;
}

export interface DisplayLineAttributeOption {
  attributeOptionName: string;
  linePersonalizeDetails: linePersonalizeDetails[];
}

export interface linePersonalizeDetails {
  font: string;
  color: string;
  location: string;
  line1Text: string;
  line2Text: string;
}
export interface BrandPolicyViewModel {
  name: string;
  policyWithCheckBox: boolean;
  policyMessage: string;
  isEndUserDisplay: boolean;
}

// API
export const getCartDetails = async (
  customerId: number,
  isEmpLoggedIn: boolean,
): Promise<_CartItem[]> => {
  const employeeSessionData = localStorage.getItem('empData') || '';
  const decodedData = employeeSessionData
    ? JSON.parse(decodeURIComponent(employeeSessionData))
    : {};
  isEmpLoggedIn = decodedData ? !!decodedData?.id : isEmpLoggedIn;
  const url = `Store/GetShoppingCartItemsDetail/${customerId}/${isEmpLoggedIn}.json`;
  const response = await SendAsync<_CartItem[]>({
    url,
    method: 'GET',
  });
  return response;
};
