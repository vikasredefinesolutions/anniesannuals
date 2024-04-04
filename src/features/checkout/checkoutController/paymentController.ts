/* eslint-disable react-hooks/exhaustive-deps */

import { checkoutActions } from '@/app/redux/slices/checkoutSlice';

import { useAppSelector } from '@/app/redux/hooks';
import { showLoader } from '@/app/redux/slices/commonSlice';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import { applyGiftCard } from '@/shared/apis/checkout/applyGiftCard';
import { getTempUserId, getUserId } from '@/shared/utils/cookie.helper';
import { PixelTracker } from '@/shared/utils/facebookPixel';
import { GoogleAnalyticsTracker } from '@/shared/utils/googleAnalytics';
import storeDetails from '@/staticData/storeDetails.json';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { ReactElement, useEffect, useState } from 'react';
import {
  Control,
  Controller,
  ControllerProps,
  FieldErrors,
  FieldPath,
  FieldValues,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormSetValue,
  useForm,
} from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import {
  CreditCardFields,
  _CreditCardFields,
  detectCardIssuer,
  fillMonthValues,
  fillYearValues,
} from './config';

export interface _CustomEvent extends Event {
  inputType: 'deleteContentBackward';
}

export interface _options {
  name: string;
  id: string;
}

export interface _PaymentComponentReadyProps {
  maxLengthCalculator: (name: 'ccNumber' | 'cvc', value: string) => number;
  detectCardIssuer: (cardNumber: string) => string;
  monthOptions: _options[];
  yearOptions: _options[];
  customYearChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  customMonthChangehandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleShippingContinue: (checked: boolean) => void;
  handlePaymentContinue: () => void;
  setCreditCardFieldValue: UseFormSetValue<_CreditCardFields>;
  creditCardhandleSubmit: UseFormHandleSubmit<_CreditCardFields>;
  creditCardControl: Control<_CreditCardFields>;
  Controller: <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  >(
    props: ControllerProps<TFieldValues, TName>,
  ) => import('react').ReactElement<
    any,
    string | import('react').JSXElementConstructor<any>
  >;
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
  handleGiftCheckBoxClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSendAsGift: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editPaymenthandler: () => void;
  giftCardValue: string;
  balance: number;
  giftCouponNameChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  applyGiftCardDiscount: () => void;
  setAddCredit: (el: boolean) => void;
  addCredit: boolean;
  changeShippingMethod: (item: { name: string; price: number }) => void;
  handleSkipPaymentMethod: () => void;
  setGiftCardValue: React.Dispatch<React.SetStateAction<string>>;
  storeCreditBalanceHandler: (value: boolean) => void;
  giftWalletBalanceHandler: (value: boolean) => void;
}

interface _Props {
  cases: {
    ready: (props: _PaymentComponentReadyProps) => ReactElement<any, any>;
  };
}

const CheckoutPaymentController: React.FC<_Props> = ({ cases }) => {
  const [monthOptions, setMonthOptions] = useState<_options[]>(
    fillMonthValues(),
  );

  const { id: storeId } = storeDetails;

  const [giftCardValue, setGiftCardValue] = useState<string>('');
  const [balance, setBalance] = useState<number>(0);
  const [addCredit, setAddCredit] = useState<boolean>(false);
  const [yearOptions, setYearOptions] = useState<_options[]>(fillYearValues());
  const { update_PaymentDetails, update_CheckoutShippingMethod } =
    checkoutActions;

  const { orderTotal, cartData, selectedShipping, tax } = useAppSelector(
    (state) => state.cart,
  );

  const {
    giftCardWalletBalance,
    storeCredits,
    usedStoreCredits,
    giftCardAmount,
    giftCardBalance,
  } = useAppSelector((state) => state.checkout.payment);

  const userId = getUserId();
  const tempId = getTempUserId();

  //   const isEmployeeLoggedIn = useAppSelector((state) => state.employee.loggedIn);

  const dispatch = useDispatch();

  const CreditCardValidationSchema = Yup.object({
    name: Yup.string().min(3).required(),
    ccNumber: Yup.string()
      .trim()
      .required('Required field')
      .min(15)
      .max(16)
      .test('valid-ccLength', 'Some message', function (enteredCCnumber) {
        let cardType = '';
        const cardLength = enteredCCnumber?.length || 0;

        if (enteredCCnumber && cardLength > 0) {
          cardType = detectCardIssuer(enteredCCnumber);
        }

        if (cardType === 'AMEX') return cardLength === 15;

        if (
          cardType === 'MASTERCARD' ||
          cardType === 'DISCOVER' ||
          cardType === 'VISA'
        ) {
          return cardLength === 16;
        }
        //
        return cardLength === 16;
      }),
    expiryMonth: Yup.string()
      .trim()
      .length(2)
      .required()
      .test('valid-expiry-year', 'Some message', function (enteredMonth) {
        if (!enteredMonth) return false;
        const currentYear = new Date().getFullYear().toString().slice(-2);
        const currentMonth = new Date().getMonth() + 1;
        if (this.parent.expiredYear < currentYear) return false;

        if (this.parent.expiryYear === currentYear) {
          if (+enteredMonth >= currentMonth) return true;
          //
          return false;
        }
        //
        return true;
      }),
    expiryYear: Yup.string()
      .trim()
      .length(4)
      .required()
      .test('valid-expiry-year', 'Some message', function (enteredYear) {
        if (!enteredYear) return false;
        //
        const currentYear = new Date().getFullYear().toString().slice(-2);
        if (+enteredYear >= +currentYear) return true;
        //
        return false;
      }),
    cvc: Yup.string()
      .trim()
      .min(3)
      .max(4)
      .required('Required field')
      .test('valid-length', 'some message', function (enteredCVC) {
        const cardType = detectCardIssuer(this.parent.ccNumber);
        const cvcLength = enteredCVC?.length || 0;
        if (cardType === 'AMEX') {
          if (cvcLength === 4) {
            return true;
          }
          return false;
        }
        if (cvcLength === 3) return true;
        return false;
      }),
  });

  const {
    setValue: setCreditCardFieldValue,
    handleSubmit: creditCardhandleSubmit,
    control: creditCardControl,
    getValues: credirCardFieldValues,
    formState: {
      errors,
      touchedFields: creditCardTouchedFields,
      isValid: creditCardFormValid,
    },
  } = useForm({
    mode: 'onChange',
    defaultValues: CreditCardFields,
    resolver: yupResolver(CreditCardValidationSchema),
  });

  const handlePaymentContinue = () => {
    const discountCoupon = localStorage.getItem('discountCoupon');

    let filterProducts = cartData.reduce(
      (acc: any, curr: any) => {
        return {
          productIds: [...acc.productIds, curr.productId],
          productPrices: acc.productPrices + curr.totalPrice,
        };
      },
      { productIds: [], productPrices: 0 },
    );

    const eventPayload = {
      storeId: storeId,
      customerId: userId || 0,
      paymentType: 'credit card',
      value: '',
      coupon: discountCoupon || '',
      shoppingCartItemsModel: cartData?.map((item) => ({
        productId: item.productId,
        productName: item?.productName,
        colorVariants: item?.attributeOptionValue,
        price: item.totalPrice,
        quantity: item.totalQty,
      })),
    };
    const pixelPayload = {
      value: filterProducts.productPrices,
      currency: 'USD',
      content_category: 'snippets',
      content_ids: filterProducts.productIds,
    };
    PixelTracker('track', 'AddPaymentInfo', pixelPayload);
    GoogleAnalyticsTracker('GoogleAddPaymentInfoScript', eventPayload);
    dispatch(
      update_PaymentDetails({
        method: 'individual_cards',
        data: {
          cardName: detectCardIssuer(credirCardFieldValues().ccNumber),
          ccNumber: credirCardFieldValues().ccNumber,
          month: credirCardFieldValues().expiryMonth,
          year: credirCardFieldValues().expiryYear,
          nameOnCard: credirCardFieldValues().name,
          securityCode: credirCardFieldValues().cvc,
        },
      }),
    );
    dispatch(
      update_PaymentDetails({
        method: 'CHECKOUT_PAYMENT_SAVED',
        value: true,
      }),
    );
  };

  const maxLengthCalculator = (
    name: 'ccNumber' | 'cvc',
    value: string,
  ): number => {
    if (name === 'ccNumber')
      return detectCardIssuer(value) === 'AMEX' ? 15 : 16;
    if (name === 'cvc') return detectCardIssuer(value) === 'AMEX' ? 4 : 3;

    return 200;
  };

  const handleShippingContinue = (checked: boolean) => {
    if (checked) {
      const discountCoupon = localStorage.getItem('discountCoupon');

      const eventPayload = {
        storeId: storeId,
        customerId: userId || 0,
        shippingTier: '',
        value: orderTotal,
        coupon: discountCoupon || '',
        shoppingCartItemsModel: cartData?.map((item) => ({
          productId: item.productId,
          productName: item?.productName,
          colorVariants: item?.attributeOptionValue,
          price: item.totalPrice,
          quantity: item.totalQty,
        })),
      };
      GoogleAnalyticsTracker('GoogleAddShippingInfoScript', eventPayload);

      dispatch(
        update_CheckoutShippingMethod({
          type: 'CHECKOUT_SHIPPING_SAVED',
          value: true,
        }),
      );
      return;
    }
    dispatch(
      update_CheckoutShippingMethod({
        type: 'CHECKOUT_SHIPPING_SAVED',
        value: false,
      }),
    );
  };

  const customYearChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let year = new Date().getFullYear().toString();
    let month = new Date().getMonth();
    setCreditCardFieldValue('expiryYear', e.target.value);

    if (e.target.value === year) {
      let availableMonths = monthOptions.splice(month, 11);
      setMonthOptions(availableMonths);
      if (parseInt(credirCardFieldValues().expiryMonth) < month) {
        setCreditCardFieldValue('expiryMonth', '');
      }
      return;
    }
    if (monthOptions.length !== 12) {
      const a = credirCardFieldValues().expiryMonth;
      setMonthOptions(fillMonthValues());
      setCreditCardFieldValue('expiryMonth', a);
      return;
    }
  };

  const editPaymenthandler = () => {
    dispatch(
      update_PaymentDetails({
        method: 'SKIP_PAYMENT_METHOD',
        value: false,
      }),
    );
    dispatch(
      update_PaymentDetails({
        method: 'CHECKOUT_PAYMENT_SAVED',
        value: false,
      }),
    );
  };
  const handleGiftCheckBoxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(
        update_PaymentDetails({
          method: 'UPDATE_GIFTCARD_OPTION',
          value: true,
        }),
      );
      return;
    }
    dispatch(
      update_PaymentDetails({
        method: 'UPDATE_GIFTCARD_OPTION',
        value: false,
      }),
    );
  };
  const customMonthChangehandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    let month = new Date().getMonth();
    let year = new Date().getMonth().toString();

    setCreditCardFieldValue('expiryMonth', e.target.value);

    if (
      parseInt(e.target.value) < month &&
      (credirCardFieldValues().expiryYear === year ||
        credirCardFieldValues().expiryYear === '')
    ) {
      let availableyears = fillYearValues().splice(1, 19);
      setYearOptions(availableyears);
      if (year === credirCardFieldValues().expiryYear) {
        setCreditCardFieldValue('expiryYear', '');
      }
      return;
    }
    if (parseInt(e.target.value) >= month) {
      const expiredYear = credirCardFieldValues().expiryYear;
      setYearOptions(fillYearValues());
      setCreditCardFieldValue('expiryYear', expiredYear);
      return;
    }
  };

  const handleSendAsGift = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(
        update_CheckoutShippingMethod({
          type: 'SEND_AS_GIFT',
          value: true,
        }),
      );
      return;
    }
    dispatch(
      update_CheckoutShippingMethod({
        type: 'SEND_AS_GIFT',
        value: false,
      }),
    );
  };

  const giftWalletBalanceHandler = (value: boolean) => {
    if (value) {
      dispatch(
        update_PaymentDetails({
          method: 'USE_GIFT_WALLET_BALANCE',
          value: {
            usedGiftAmount:
              orderTotal - giftCardAmount - usedStoreCredits >
              giftCardWalletBalance
                ? giftCardWalletBalance
                : orderTotal - giftCardAmount - usedStoreCredits,
            useGiftWallet: value,
          },
        }),
      );
    } else {
      dispatch(
        update_PaymentDetails({
          method: 'USE_GIFT_WALLET_BALANCE',
          value: {
            usedGiftAmount: 0,
            useGiftWallet: value,
          },
        }),
      );
    }
  };

  const storeCreditBalanceHandler = (value: boolean) => {
    if (value) {
      dispatch(
        update_PaymentDetails({
          method: 'USE_STORE_CREDITS',
          value: {
            usedStoreCreditAmount:
              orderTotal + tax - giftCardAmount > storeCredits
                ? storeCredits
                : +(orderTotal + tax - giftCardAmount).toFixed(2),
            useStoreCredit: value,
            orderTotal: orderTotal + tax,
          },
        }),
      );
    } else {
      dispatch(
        update_PaymentDetails({
          method: 'USE_STORE_CREDITS',
          value: {
            usedStoreCreditAmount: 0,
            useStoreCredit: value,
            orderTotal: orderTotal + tax,
          },
        }),
      );
    }
  };

  const giftCouponNameChangeHandler = (
    name: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setGiftCardValue(name.target.value);
  };

  const handleSkipPaymentMethod = () => {
    dispatch(
      update_PaymentDetails({
        method: 'SKIP_PAYMENT_METHOD',
        value: true,
      }),
    );
    dispatch(
      update_PaymentDetails({
        method: 'CHECKOUT_PAYMENT_SAVED',
        value: true,
      }),
    );
  };

  useEffect(() => {
    setBalance(giftCardBalance);
  }, [giftCardBalance]);

  const applyGiftCardDiscount = async () => {
    dispatch(showLoader(true));
    try {
      const payload = {
        giftCardModel: {
          customerID: +userId || +tempId,
          storeId: storeId || 5,
          giftCardSerialNo: giftCardValue,
          amountToBeApply: orderTotal,
          emailId: '',
        },
      };

      const response = await applyGiftCard(payload);
      const subTotal = orderTotal - usedStoreCredits + tax;

      if (response.giftCardAmount > subTotal) {
        setBalance(response.giftCardAmount - subTotal);
      } else {
        setBalance(0);
      }

      dispatch(
        update_PaymentDetails({
          method: 'CHECKOUT_GIFT_CARD_DETAILS',
          value: {
            totalAmount: response.giftCardAmount,
            giftCardAmount:
              response.giftCardAmount > subTotal
                ? +subTotal.toFixed(2)
                : +response.giftCardAmount.toFixed(2),
            giftCardBalance:
              response.giftCardAmount > subTotal
                ? +(response.giftCardAmount - subTotal).toFixed(2)
                : 0,
            giftCardNumber: giftCardValue,
          },
        }),
      );
      dispatch(showLoader(false));
    } catch (error) {
      dispatch(showLoader(false));
      const errorMsg = error
        ? Object?.values(error)[0]
        : 'Something went wrong';
      dispatch(
        openAlertModal({
          title: 'Error',
          description: errorMsg,
          isAlertModalOpen: true,
        }),
      );
    }
  };

  const changeShippingMethod = (item: { name: string; price: number }) => {
    //Commenting for now may be it can be use later
    // dispatch(changeShippingMethodInStore(item));
  };
  /*-----------------------------------  Checkout Address Contorllers -------------------------------------------------------- */

  return cases.ready({
    changeShippingMethod,
    maxLengthCalculator,
    detectCardIssuer,
    monthOptions,
    yearOptions,
    customYearChangeHandler,
    customMonthChangehandler,
    handleShippingContinue,
    handlePaymentContinue,
    setCreditCardFieldValue,
    creditCardhandleSubmit,
    creditCardControl,
    Controller,
    credirCardFieldValues,
    creditCardTouchedFields,
    creditCardFormValid,
    errors,
    handleGiftCheckBoxClick,
    handleSendAsGift,
    editPaymenthandler,
    giftCardValue,
    balance,
    giftCouponNameChangeHandler,
    applyGiftCardDiscount,
    setAddCredit,
    addCredit,
    handleSkipPaymentMethod,
    setGiftCardValue,
    giftWalletBalanceHandler,
    storeCreditBalanceHandler,
  });
};

export default CheckoutPaymentController;
