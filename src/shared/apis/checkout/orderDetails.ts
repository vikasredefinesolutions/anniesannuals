import { SendAsync } from '@/shared/utils/axios';

export interface IOrderBillingDetails {
  id: number;
  storeID: number;
  orderGUID: null;
  isNew: boolean;
  shoppingCartID: number;
  customerID: number;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  notes: string;
  giftPackNote: null;
  billingEqualsShipping: boolean;
  billingEmail: string;
  billingFirstName: string;
  billingLastName: string;
  billingCompany: string;
  billingAddress1: string;
  billingAddress2: string;
  billingSuite: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  billingCountry: string;
  billingPhone: string;
  shippingEmail: string;
  shippingFirstName: string;
  shippingLastName: string;
  shippingCompany: string;
  shippingAddress1: string;
  shippingAddress2: string;
  shippingSuite: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingCountry: string;
  shippingPhone: string;
  shippingMethod: string;
  okToEmail: boolean;
  cardName: string;
  cardType: string;
  cardNumber: string;
  cardVarificationCode: string;
  cardExpirationMonth: string;
  cardExpirationYear: string;
  couponCode: string;
  couponDiscountAmount: number;
  giftCertiSerialNumber: string;
  giftCertificateDiscountAmount: number;
  quantityDiscountAmount: number;
  levelDiscountPercent: number;
  levelDiscountAmount: number;
  customDiscount: number;
  orderSubtotal: number;
  orderTax: number;
  orderShippingCosts: number;
  orderTotal: number;
  authorizationCode: string;
  authorizationResult: string;
  authorizationPNREF: string;
  transactionCommand: string;
  lastIPAddress: string;
  paymentGateway: string;
  paymentMethod: string;
  shippingTrackingNumber: null;
  shippedVIA: null;
  orderStatus: string;
  transactionStatus: string;
  avsResult: string;
  cvc2Response: null;
  captureTxCommand: string;
  captureTXResult: string;
  voidTXCommand: null;
  voidTXResult: null;
  refundTXCommand: null;
  refundTXResult: null;
  refundReason: null;
  cartType: null;
  last4: null;
  authorizedOn: Date;
  capturedOn: Date;
  refundedOn: Date;
  voidedOn: Date;
  fraudedOn: Date;
  shippedOn: Date;
  orderDate: Date;
  deleted: boolean;
  referralLink: null;
  referrer: string;
  refundedAmount: number;
  chargeAmount: number;
  authorizedAmount: number;
  adjustmentAmount: number;
  adjustmentCapturedOn: Date;
  orderNotes: string;
  isGiftWrap: boolean;
  giftWrapAmt: number;
  salesRepName: null;
  inventoryWasReduced: boolean;
  refOrderID: string;
  isPrinted: boolean;
  isMobileOrder: boolean;
  isPhoneOrder: boolean;
  batchId: number;
  shippingLabelMethod: null;
  shippingLabelFileName: null;
  shippingLabelCost: number;
  shippingLabelWeight1: number;
  shippingLabelPackageHeight: number;
  shippingLabelPackageWidth: number;
  shippingLabelPackageLength: number;
  noOfLabels: number;
  cashReceived: number;
  cashChangedReturned: number;
  bankName: null;
  chequeNumber: null;
  chequeDate: Date;
  ccReceiptNo: null;
  salesAgentId: number;
  posOrderNumber: number;
  isPrintedSlip: boolean;
  isApproved: boolean;
  receiptNumber: null;
  dimensionValue: number;
  shippingDimension: null;
  giftWrapPrice: number;
  shipPromotionDiscount: number;
  serialNumber: null;
  isFullFillment: boolean;
  internalNotes: null;
  returnedStock: number;
  returnedFee: number;
  customerType: null;
  isAmazonuplaod: boolean;
  shippingLabelWeightNew: number;
  shippingLabelWeight: number;
  cvvResult: string;
  isMailSend: boolean;
  shippedByStamps: boolean;
  logoFinalTotal: number;
  lineFinalTotal: number;
  isExport: boolean;
  isFreight: boolean;
  inHandDate: Date;
  storeCredit: number;
  chargeHostedPaymentID: string;
  chargeConfirmationID: null;
  chargeToken: null;
  sewout: boolean;
  sewoutTotal: number;
  digitalTotal: number;
  brandStoreID: number;
  orderSubType: null;
  empSourceName: string;
  empSourceMedium: string;
  gclid: string;
  isPayLater: boolean;
  orderCheckoutNote: string;
  empSalesRap: string;
  employeeID: number;
  recStatus: null;
  createdDate: Date;
  createdBy: number;
  modifiedDate: Date;
  modifiedBy: number;
  rowVersion: string;
  location: null;
  ipAddress: null;
  macAddress: null;
  orderLogoSetupFee: number;
  orderSmallRunFee: number;
  isAllowPo: boolean;
}

export interface IOrderProductDetails {
  [x: string]: any;
  colorImage: string;
  productName: string;
  productId: 15325;
  msrp: number;
  isBrandPersonalization: null;
  sku: string;
  shoppingCartItemsId: number;
  totalQty: number;
  totalPrice: number;
  productTotal: number;
  txtcode: null;
  itemNote: string;
  seName: string;
  totalCustomFieldsCharges: number;
  discountPrice: number;
  logoTotalPrice: number;
  lineTotalPrice: number;
  sewOutTotal: number;
  brandPolicyViewModels: {
    name: null;
    policyWithCheckBox: boolean;
    policyMessage: null;
    isEndUserDisplay: boolean;
  };
}

export interface IOrderModelPayment {
  id: number;
  billingEqualsShipping: boolean;
  billingEmail: string;
  billingFirstName: string;
  billingLastName: string;
  billingCompany: string;
  billingAddress1: string;
  billingAddress2: string;
  billingSuite: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  billingCountry: string;
  billingPhone: string;
  paymentMethod: string;
  paymentGateway: string;
  isCreditLimit: boolean;
  cardName: string;
  cardType: string;
  cardNumber: string;
  cardVarificationCode: string;
  cardExpirationMonth: string;
  cardExpirationYear: string;
  poNumber: string;
  storeID: number;
  email: string;
  notes: string;
  stripeToken: string;
}

export const UpdatePaymentLater = async (payload: {
  orderModelPayment: IOrderModelPayment;
}) => {
  const url = `Order/updateorderpayment.json`;
  const response = await SendAsync<any>({
    url,
    method: 'POST',
    data: payload,
  });

  return response;
};

export const FetchOrderDetails = async ({
  orderNumber,
}: {
  orderNumber: number;
}): Promise<{
  billing: IOrderBillingDetails;
  product: IOrderProductDetails[];
} | null> => {
  let billingDetails: null | IOrderBillingDetails = null;
  let productDetails: null | IOrderProductDetails[] = null;

  await Promise.allSettled([
    OrderedBillingDetails(orderNumber),
    OrderedProductDetails(orderNumber),
  ]).then((values) => {
    billingDetails = values[0].status === 'fulfilled' ? values[0].value : null;
    productDetails = values[1].status === 'fulfilled' ? values[1].value : null;
  });

  if (!billingDetails || !productDetails) {
    return null;
  }

  return {
    product: productDetails,
    billing: billingDetails,
  };
};

export const OrderedBillingDetails = async (orderNumber: number) => {
  try {
    const url = `/Order/GetById/${orderNumber}.json`;
    const res = await SendAsync<IOrderBillingDetails>({
      url,
      method: 'GET',
    });

    return res;
  } catch (error) {
    return null;
  }
};

export const OrderedProductDetails = async (orderNumber: number) => {
  try {
    const url = `/Order/GetOrderedShoppingCartItemsDetail/${orderNumber}.json`;
    const res = await SendAsync<any>({
      url,
      method: 'GET',
    });

    return res;
  } catch (error) {
    return null;
  }
};
