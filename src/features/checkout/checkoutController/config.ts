import { CreateUserAddress } from '@/shared/apis/checkout/createAddress';
import {
  AddressAPIRequest,
  UpdateUserAddress,
} from '@/shared/apis/checkout/updateAddress';
import { CustomerAddress } from '@/shared/types/user';
import * as Yup from 'yup';

export interface _CreditCardFields {
  name: string;
  ccNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
}

export enum PaymentMethod {
  STORECREDIT = 'STORECREDIT',
  CHARGELOGIC = 'CHARGELOGIC',
  CREDITCARD = 'CREDITCARD',
  PREPAYMENT = 'PREPAYMENT',
  PAYMENTPENDING = 'PAYMENTPENDING',
  AUTHORIZENET = 'authorizenet',
  PAYPAL = 'PAYPAL',
}

export const CreditCardFields: _CreditCardFields = {
  name: '',
  ccNumber: '',
  expiryMonth: '',
  expiryYear: '',
  cvc: '',
};

export const fillMonthValues = () => {
  let a = [];
  for (let i = 1; i <= 12; i++) {
    i < 10
      ? a.push({ name: `0${i}`, id: `0${i}` })
      : a.push({ name: `${i}`, id: `${i}` });
  }

  return a;
};

export const fillYearValues = () => {
  let year = new Date().getFullYear();

  let a = [];
  for (let i = 0; i < 20; i++) {
    a.push({ name: `${year + i}`, id: `${year + i}` });
  }
  return a;
};

export interface CheckoutAddressFieldsType {
  firstname: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  countryCode: string;
  countryName: string;
  email: string;
  phone: string;
}

export const __ValidationText = {
  phone: {
    required: 'Enter your phone Number.',
    valid:
      'Enter Valid Phone Number. Format xxx-xxx-xxxx, xxx xxx xxxx, xxx.xxx.xxxx, xxxxxxxxxx',
    valid2: 'Enter Valid Phone Number. Format xxxxxxxxxx',
    length: 10,
  },
};

export const CheckoutAddressFields: CheckoutAddressFieldsType = {
  firstname: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  postalCode: '',
  phone: '',
  countryName: '',
  email: '',
  countryCode: '',
};

export const phonePattern1 = /^\(?([0-9]{3})\)?[-]([0-9]{3})[-]([0-9]{4})$/; //Matches xxx-xxx-xxxx
export const phonePattern2 = /^\(?([0-9]{3})\)?[.]([0-9]{3})[.]([0-9]{4})$/; //Matches xxx.xxx.xxxx
export const phonePattern3 = /^\(?([0-9]{3})\)?[ ]([0-9]{3})[ ]([0-9]{4})$/; //Matches xxx xxx xxxx
export const phonePattern4 = /^[0-9]{10}$/; //Matches xxxxxxxxxx

export const CheckoutMessage = {
  firstName: {
    required: 'Please Enter First Name.',
    minLength: 2,
    minValidation: 'First Name must be at least 2 characters',
  },
  lastName: {
    required: 'Please Enter Last Name.',
    minLength: 2,
    minValidation: 'Last Name must be at least 2 characters',
  },
  companyName: { required: 'Please Enter Company Name.' },
  password: { required: 'Please Enter Password.' },
};
export const CheckoutAddressValidationSchema = Yup.object({
  firstname: Yup.string()
    .trim()
    .required('First name is required')
    .min(
      CheckoutMessage.firstName.minLength,
      CheckoutMessage.firstName.minValidation,
    ),
  lastName: Yup.string()
    .trim()
    .required('Last name is required')
    .min(
      CheckoutMessage.lastName.minLength,
      CheckoutMessage.lastName.minValidation,
    ),
  address1: Yup.string().trim().required('Address is required'),
  address2: Yup.string().optional(),
  city: Yup.string().trim().required('City is required'),
  postalCode: Yup.string().trim().required('Zipcode is required'),
  countryCode: Yup.string().trim().required('Country is required'),
  state: Yup.string().trim().required('Required field'),
  email: Yup.string()
    .required('Email is required')
    .test('custom-test', 'Invalid email address', (value) => {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))
        return false;
      return true;
    }),
  phone: Yup.string()
    .trim()
    .required(__ValidationText.phone.required)
    .test('phone-test', __ValidationText.phone.valid, (value) => {
      if (
        phonePattern1.test(value || '') ||
        phonePattern2.test(value || '') ||
        phonePattern3.test(value || '') ||
        phonePattern4.test(value || '')
      ) {
        return true;
      }
      return false;
    }),
  countryName: Yup.string().trim().required('Country is required'),
});
export const detectCardIssuer = (cardNumber: string) => {
  let re = new RegExp('^4');

  if (!cardNumber) return '';

  //
  if (cardNumber.match(re) != null) {
    return 'VISA';
  }

  if (
    /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
      cardNumber,
    )
  ) {
    return 'MASTERCARD';
  }

  re = new RegExp('^3[47]');
  if (cardNumber.match(re) != null) {
    return 'AMEX';
  }

  re = new RegExp(
    '^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)',
  );
  if (cardNumber.match(re) != null) {
    return 'DISCOVER';
  }

  return '';
};

interface _Discount {
  coupon: string;
  amount: number;
  discount: number;
}

export const couponFields = (
  discount: _Discount | null,
): {
  couponCode: string;
  couponDiscountAmount: number;
} => {
  return {
    couponCode: discount?.coupon || '',
    couponDiscountAmount: discount?.amount || 0,
  };
};

export const decideToAddOrUpdateTheAddress = async (
  payload: AddressAPIRequest,
  updateAddress: boolean,
) => {
  if (updateAddress) {
    return UpdateUserAddress(payload);
  }

  return CreateUserAddress(payload);
};

export interface _location {
  country_code: string;
  country: string;
  city: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  ip_address: string;
  region: string;
}

export const billingFields = (billing: CustomerAddress | null) => {
  return {
    //
    billingFirstName: billing!.firstname,
    billingLastName: billing!.lastName,
    billingAddress1: billing!.address1,
    billingAddress2: billing!.address2,
    billingCity: billing!.city,
    billingState: billing!.state,
    billingZip: billing!.postalCode,
    billingCountry: billing!.countryName,
    billingPhone: billing!.phone,
    //
    billingSuite: '',
    billingCompany: '',
  };
};

export const shippingFields = (
  address: CustomerAddress | null,
  useBillingAddressForShipping: boolean,
) => {
  return {
    billingEqualsShipping: useBillingAddressForShipping,
    shippingFirstName: address?.firstname || '',
    shippingLastName: address?.lastName || '',
    shippingAddress1: address?.address1 || '',
    shippingAddress2: address?.address2 || '',
    shippingCity: address?.city || '',
    shippingState: address?.state || '',
    shippingZip: address?.postalCode || '',
    shippingCountry: address?.countryName || '',
    shippingPhone: address?.phone || '',
    //
    shippingCompany: '',
    shippingSuite: '',
  };
};

export const paymentFields = (
  payment: {
    useCreditBalance: boolean;
    paymentRequired: boolean;
    creditCard: {
      nameOnCard: string;
      cardName: '' | 'VISA' | 'MASTERCARD' | 'AMEX' | 'DISCOVER';
      year: string;
      ccNumber: string;
      month: string;
      securityCode: string;
    };
    poNumber: string;
    method: 'PURCHASE_ORDER' | 'Credit Card' | 'Paypal';
  },
  OrderType: 'ORDERNOW' | 'PAYLATER' | 'PAYPAL',
  usedCreditAmount: number,
  total: number,
): {
  cardName: string;
  cardType: string;
  cardNumber: string;
  cardVarificationCode: string;
  cardExpirationMonth: string;
  cardExpirationYear: string;
  authorizationPNREF: string;
  paymentGateway: string;
  paymentMethod: string;
} => {
  return {
    authorizationPNREF: payment.poNumber || '',
    cardType: payment.creditCard.cardName,
    cardNumber: payment.creditCard.ccNumber,
    cardVarificationCode: payment.creditCard.securityCode,
    cardExpirationMonth: payment.creditCard.month,
    cardExpirationYear: payment.creditCard.year,
    cardName: payment.creditCard.nameOnCard,
    paymentMethod:
      usedCreditAmount === total
        ? PaymentMethod.STORECREDIT
        : getPaymentMethod(OrderType),
    paymentGateway:
      usedCreditAmount === total
        ? PaymentMethod.STORECREDIT
        : getPaymentgateway(OrderType),
  };
};

const getPaymentgateway = (orderType: OrderType) => {
  if (orderType === 'ORDERNOW') {
    return PaymentMethod.AUTHORIZENET;
  }
  if (orderType === 'PAYLATER') {
    return PaymentMethod.PAYMENTPENDING;
  }
  if (orderType === 'PAYPAL') {
    return PaymentMethod.PAYPAL;
  }
  return '';
};

const getPaymentMethod = (orderType: OrderType) => {
  if (orderType === 'ORDERNOW') {
    return PaymentMethod.CREDITCARD;
  }
  if (orderType === 'PAYLATER') {
    return PaymentMethod.PAYMENTPENDING;
  }
  if (orderType === 'PAYPAL') {
    return PaymentMethod.PAYPAL;
  }
  return '';
};

export enum UserAddressType {
  BILLINGADDRESS = 'B',
  SHIPPINGADDRESS = 'S',
  OTHERUSERADDRESS = 'F',
}

export type ModalScreens =
  | 'SHIPPING'
  | 'BILLING'
  | 'ADDSHIPPING'
  | 'ADDBILLING'
  | 'EDITSHIPPING'
  | 'EDITBILLING'
  | null;

export type AddressType = 'SHIPPING' | 'BILLING';

export type OrderType = 'ORDERNOW' | 'PAYPAL' | 'PAYLATER';

export type EditOrAdd = 'EDIT' | 'ADD' | null;
