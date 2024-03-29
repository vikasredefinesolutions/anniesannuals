import { SendAsync } from '@/shared/utils/axios';

interface IReturnItemQuantities {
  shoppingCartItemID: number;
  quantity: number;
}

export interface IRefundSummary {
  refundSubTotal: number;
  shippingCharges: number;
  shippingTax: number;
  nonMemberCharges: number;
}

export interface IReturnItemsProps {
  id: number;
  productID: number;
  shoppingCartID: number;
  shoppingCartItemID: number;
  customFields: { label: string; value: string }[];
  name: string;
  image: string;
  seName: string;
  imageAltTag: string;
  status: null;
  productReviewRatingViewModel: null;
  qty: number;
  price: number;
  estimateShippingDate: null;
  estimateDeliveryDate: string;
  trackingNumber: null;
  isReturnable: boolean;
  returnItemMessage: string | null;
  itemDeliveredMethod: null;
  returnDeliveryMethod: null;
  returmDeliveryPrice: null;
}

export interface IReturnItemsRes {
  id: number;
  orderNumber: number;
  returnMessageLists: { id: number; message: string }[];
  returnItems: IReturnItemsProps[] | [];
  returnAddress: {
    email: string;
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    suite: string;
    city: string;
    state: string;
    statecode: string;
    zipcode: string;
    country: string;
    countrycode: string;
    phone: string;
  };
  pickUpAddress: {
    email: string;
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    suite: string;
    city: string;
    state: string;
    statecode: string;
    zipcode: string;
    country: string;
    countrycode: string;
    phone: string;
  };
  refundSummery: IRefundSummary;
  returnBy: string;
}

export const getConfirmReturnDetails = async (
  orderNumber: number,
  shoppingCartId: number,
  returnItemQuantities: IReturnItemQuantities[],
) => {
  const url = `/Order/getconfirmreturndetails.json`;

  let payload = {
    orderReturnModel: {
      orderNumber: orderNumber,
      shoppingCartID: shoppingCartId,
      isPhoneReturn: true,
      requestByID: 0,
      returnItemQuantities: returnItemQuantities,
    },
  };

  const res = await SendAsync<IReturnItemsRes>({
    url: url,
    method: 'POST',
    data: payload,
  });
  return res;
};
