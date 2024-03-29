import { ReactElement } from 'react';
import {
  Control,
  ControllerProps,
  FieldErrors,
  FieldPath,
  FieldValues,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormSetValue,
} from 'react-hook-form';
import { _options } from '../checkout/checkoutController/paymentController';
import { _State } from '@/shared/apis/checkout/fetchStateList';
import { _Country } from '@/shared/apis/checkout/fetchCountriesList';
import {
  CheckoutAddressFieldsType,
  _CreditCardFields,
} from '../checkout/checkoutController/config';
import { AddressTouchedFields } from '@/stores/annies/pages/paylater/components/PLCheckoutBillingAddress';
import {
  IOrderBillingDetails,
  IOrderProductDetails,
} from '@/shared/apis/checkout/orderDetails';

export interface _PayLaterReadyProps {
  maxLengthCalculator: (name: 'ccNumber' | 'cvc', value: string) => number;
  detectCardIssuer: (cardNumber: string) => string;
  monthOptions: _options[];
  yearOptions: _options[];
  customYearChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  customMonthChangehandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  showCVCInformation: boolean;
  states: _State[];
  countries: _Country[];
  postalCodeHandler: (
    e: React.FocusEvent<HTMLInputElement>,
    addressType: string,
  ) => void;
  countryHandler: (
    e: React.ChangeEvent<HTMLSelectElement>,
    addressType: string,
    previousCountry: string,
  ) => void;
  Controller: <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  >(
    props: ControllerProps<TFieldValues, TName>,
  ) => import('react').ReactElement<
    any,
    string | import('react').JSXElementConstructor<any>
  >;
  billingErrors: FieldErrors<CheckoutAddressFieldsType>;
  billingTouchedFields: Partial<Readonly<AddressTouchedFields>>;
  billingControl: Control<CheckoutAddressFieldsType>;
  billingValues: UseFormGetValues<CheckoutAddressFieldsType>;
  makePaymentHandler: () => void;
  handleReviewOrder: () => void;
  orderDetails: {
    billing: IOrderBillingDetails | null;
    product: IOrderProductDetails[] | null;
  } | null;
  creditCardControl: Control<_CreditCardFields>;
  credirCardFieldValues: UseFormGetValues<_CreditCardFields>;
  creditCardTouchedFields: Partial<
    Readonly<{
      ccNumber?: boolean | undefined;
      cvc?: boolean | undefined;
      name?: boolean | undefined;
      expiryMonth?: boolean | undefined;
      expiryYear?: boolean | undefined;
    }>
  >;
  creditCardFormValid: boolean;
  errors: FieldErrors<_CreditCardFields>;
  setCreditCardFieldValue: UseFormSetValue<_CreditCardFields>;
  showPlaceOrderScreen: boolean;
  billingSubmitHandle: UseFormHandleSubmit<
    CheckoutAddressFieldsType,
    undefined
  >;
  creditCardhandleSubmit: UseFormHandleSubmit<_CreditCardFields>;
  setSelectedPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  selectedPaymentMethod: string;
}

export interface _PayLaterProps {
  cases: {
    loading: () => ReactElement<any, any>;
    ready: (props: _PayLaterReadyProps) => ReactElement<any, any>;
  };
}
