import { useEffect, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter, useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { _PayLaterProps } from './type';
import { _options } from '../checkout/checkoutController/paymentController';
import {
  CheckoutAddressValidationSchema,
  CreditCardFields,
  PaymentMethod,
  fillMonthValues,
  fillYearValues,
} from '../checkout/checkoutController/config';
import {
  FetchCountriesList,
  _Country,
} from '@/shared/apis/checkout/fetchCountriesList';
import { FetchStatesList, _State } from '@/shared/apis/checkout/fetchStateList';
import { getStoreId } from '@/shared/utils/cookie.helper';
import { paths } from '@/utils/paths.constant';
import { getLocationWithZipCode } from '@/shared/apis/checkout/getLocationWithZipCode';
import { setCookie } from 'cookies-next';
import {
  USER_DETAILS_COOKIE,
  USER_ID_COOKIE,
  getTempUserId,
} from '@/utils/cookie.helper';
import { getUserDetailsById } from '@/shared/apis/user/fetchUserDetails';
import { getDecryptPassword } from '@/shared/apis/user/decryptUserPassword';
import {
  FetchOrderDetails,
  IOrderBillingDetails,
  IOrderModelPayment,
  IOrderProductDetails,
  UpdatePaymentLater,
} from '@/shared/apis/checkout/orderDetails';
import * as Yup from 'yup';
import { showLoader } from '@/app/redux/slices/commonSlice';

const PayLaterController: React.FC<_PayLaterProps> = ({ cases }) => {
  const searchParams = useSearchParams();
  let OrderId = searchParams.get('OrderNumber');
  const [status, setStatus] = useState<'loading' | 'empty' | 'ready'>(
    'loading',
  );
  const [monthOptions, setMonthOptions] = useState<_options[]>(
    fillMonthValues(),
  );
  const tokenRef = useRef('');

  const [showCVCInformation, setShowCVCInformation] = useState<boolean>(false);
  const [yearOptions, setYearOptions] = useState<_options[]>(fillYearValues());
  const [countries, setCountries] = useState<_Country[]>([]);
  const [states, setStates] = useState<_State[]>([]);
  const [showPlaceOrderScreen, setShowPlaceOrderScreen] =
    useState<boolean>(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>('Credit Card');
  const [orderDetails, setOrderDetails] = useState<{
    billing: IOrderBillingDetails | null;
    product: IOrderProductDetails[] | null;
  } | null>(null);

  const router = useRouter();

  const storeId = getStoreId();

  const handleFinalRedirect = (
    reason: 'UNEXPECTED_ERROR' | 'PAYMENT_COMPLETE',
    orderId?: number,
  ) => {
    if (reason === 'PAYMENT_COMPLETE') {
      // alert(`Order placed succcessfully with ${orderId} `);
      const tempId = getTempUserId();
      router.push(
        paths.thankYou +
          `?orderNumber=${orderId}` +
          `&temp=${tempId}&emp=${orderDetails?.billing?.employeeID}`,
      );
      return;
    }

    if (reason === 'UNEXPECTED_ERROR') {
      router.push(paths.home);
      return;
    }

    router.push(paths.home);
  };

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

  const handleRedirect = (
    reason:
      | 'PAYMENT_ALREADY_DONE'
      | 'NO_ORDER_ID_FOUND'
      | 'UNEXPECTED_ERROR'
      | 'PAYMENT_COMPLETE'
      | 'ORDER_CANCELLED',
  ) => {
    if (reason === 'PAYMENT_ALREADY_DONE') {
      alert('Payment Already done');
      router.push(paths.home);
      return;
    }

    if (reason === 'NO_ORDER_ID_FOUND') {
      alert('NO Order Id Found');
      router.push(paths.home);
      return;
    }
    if (reason === 'ORDER_CANCELLED') {
      alert('Order Already cancelled');
      router.push(paths.home);
      return;
    }
    if (reason === 'UNEXPECTED_ERROR') {
      alert('Unexpected Error Occured');
      router.push(paths.home);
      return;
    }

    router.push(paths.home);
  };

  const handleReviewOrder = async () => {
    setShowPlaceOrderScreen(true);
  };

  const detectCardIssuer = (cardNumber: string) => {
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

  const maxLengthCalculator = (
    name: 'ccNumber' | 'cvc',
    value: string,
  ): number => {
    if (name === 'ccNumber')
      return detectCardIssuer(value) === 'AMEX' ? 15 : 16;
    if (name === 'cvc') return detectCardIssuer(value) === 'AMEX' ? 4 : 3;

    return 200;
  };

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

  // const cvcShowHandler = (value: boolean) => {
  //   setShowCVCInformation(value);
  // };

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

  const handlePlaceOrderFailed = (errorResponse: any) => {
    let error = {
      title: 'Error',
      message: 'Please, contact sales person!!!',
    };

    Object.keys(errorResponse).forEach((key, index) => {
      if (index === 0) {
        error.title = 'Error';
        error.message = errorResponse[key] || 'Please, contact sales person!!!';
      }
    });
    alert(error.message);
  };

  const {
    setValue: setBillingValue,
    handleSubmit: billingSubmitHandle,
    watch: billingWatch,
    reset: billingReset,
    control: billingControl,
    getValues: billingValues,
    formState: { errors: billingErrors, touchedFields: billingTouchedFields },
  } = useForm({
    resolver: yupResolver(CheckoutAddressValidationSchema),
  });

  const makePaymentHandler = async () => {
    const payload: IOrderModelPayment = {
      id: orderDetails?.billing!.id || 0,
      isCreditLimit: false,
      storeID: storeId,
      email: orderDetails?.billing?.email || '',
      paymentGateway:
        selectedPaymentMethod === 'Credit Card'
          ? PaymentMethod.AUTHORIZENET
          : PaymentMethod.PAYPAL,

      // BILLING
      billingEqualsShipping: false,
      billingEmail: orderDetails?.billing?.billingEmail || '',
      billingFirstName: billingValues().firstname || '',
      billingLastName: billingValues().lastName || '',
      billingCompany: '',
      billingAddress1: billingValues().address1 || '',
      billingAddress2: billingValues().address2 || '',
      billingSuite: '',
      billingCity: billingValues().city || '',
      billingState: billingValues().state || '',
      billingZip: billingValues().postalCode || '',
      billingCountry: billingValues().countryName || '',
      billingPhone: billingValues().phone || '',
      // PAYMENT
      paymentMethod:
        selectedPaymentMethod === 'Credit Card'
          ? PaymentMethod.CREDITCARD
          : PaymentMethod.PAYPAL,

      cardName: billingValues().firstname + ' ' + billingValues().lastName,
      cardType: detectCardIssuer(credirCardFieldValues().ccNumber),
      cardNumber: credirCardFieldValues().ccNumber,
      cardVarificationCode: credirCardFieldValues().cvc,
      cardExpirationMonth: credirCardFieldValues().expiryMonth,
      cardExpirationYear: credirCardFieldValues().expiryYear,
      poNumber: '',
      notes: '',
      stripeToken: tokenRef.current || '',
    };

    await UpdatePaymentLater({
      orderModelPayment: payload,
    })
      .then((response) => {
        if (!response) throw new Error('Something went wrong!!!');

        if ('id' in response) {
          handleFinalRedirect(
            'PAYMENT_COMPLETE',
            orderDetails?.billing?.id || 0,
          );
          return;
        }
      })
      .catch((error) => {
        handlePlaceOrderFailed(error);
      })
      .finally(() => {
        showLoader(false);
      });
  };

  const callStatesAPI = async (id: number, setDefault: boolean) => {
    await FetchStatesList(id).then((response) => {
      if (!response) return;

      setStates(response);

      if (setDefault) {
        setBillingValue('state', response[0].name);
      }
    });
  };
  const postalCodeHandler = (
    e: React.FocusEvent<HTMLInputElement>,
    addressType: string,
  ) => {
    const zipCode = e.target.value;

    let formik: any, watch: any;

    formik = setBillingValue;
    watch = billingWatch;

    // formik.handleBlur(e);
    if (zipCode.trim().length === 0) return;

    //
    showLoader(true);
    getLocationWithZipCode(zipCode)
      .then((res) => {
        if (!res) return;

        // City
        if (res.cityName) {
          formik('city', res.cityName);
        }

        // Country
        if (res.countryId && res.countryName) {
          formik('countryName', res.countryName);
          formik('countryCode', res.countryId);
          //   formik.setFieldTouched('countryCode', true);
        }

        // State
        if (res.stateName) {
          formik('state', res.stateName);
          //   formik.setFieldTouched('state', true);
        }
        if (res.countryName !== watch('countryName')) {
          callStatesAPI(res.countryId, false);
        }
      })
      .finally(() => showLoader(false));
  };

  const fetchCountriesNstatesForBilling = async () => {
    await FetchCountriesList().then((response) => {
      if (!response) return;
      const alreadyStateNCountryIsSelected = states.length > 0;
      if (alreadyStateNCountryIsSelected) {
        setCountries(response);
        const country = response.find(
          (country) => country.name === billingValues().countryName,
        );

        setBillingValue('countryName', country?.name || response[0].name);
        setBillingValue(
          'countryCode',
          country?.id.toString() || response[0].id.toString(),
        );
        setBillingValue('state', billingValues().state);

        callStatesAPI(country?.id || response[0].id, false);

        return;
      }

      // Country
      setCountries(response);
      setBillingValue('countryName', response[0].name);
      setBillingValue('countryCode', response[0].id.toString());

      // State
      callStatesAPI(response[0].id, true);
    });
  };

  const countryHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
    addressType: string,
    previousCountry: string,
  ) => {
    let country = countries.find((item) => item.name === e.target.value);
    let formik: any;

    formik = setBillingValue;

    if (country) {
      formik('countryName', country.name);
      formik('countryCode', country.id);

      if (country.name !== previousCountry) {
        callStatesAPI(country.id, true);
        formik('state', '');
        // formik.setFieldTouched('state', true);
      }
    } else {
      setStates([]);
      formik('countryName', '');
      formik('countryCode', '');
      formik('state', '');
    }
  };

  const handlePaymentPending = (details: {
    billing: IOrderBillingDetails;
    product: IOrderProductDetails[];
  }) => {
    setStatus('ready');
    setOrderDetails(details);
    billingReset({
      firstname: details.billing.billingFirstName,
      lastName: details.billing.billingLastName,
      city: details.billing.billingCity,
      state: details.billing.billingState,
      phone: details.billing.billingPhone,
      countryName: details.billing.billingCountry,
      postalCode: details.billing.billingZip,
      address1: details.billing.billingAddress1,
      address2: details.billing.billingAddress2,
      countryCode:
        countries.find((item) => item.name === details.billing.billingCountry)
          ?.countryCode || '1',
    });
  };

  const fetchOrderDetailsByDecrypting = async ({
    OrderId,
  }: {
    OrderId: string;
  }): Promise<{
    billing: IOrderBillingDetails;
    product: IOrderProductDetails[];
  } | null> => {
    const decrptedOrderId = await getDecryptPassword(OrderId);

    if (!decrptedOrderId) {
      return null;
    }

    return FetchOrderDetails({ orderNumber: +decrptedOrderId });
  };
  const getUserDetails = async (userId: string) => {
    const userDetails = await getUserDetailsById(+userId);

    if (userDetails) {
      const configuredUSerData = {
        firstName: userDetails.firstname,
        lastName: userDetails.lastName,
        email: userDetails.email,
        password: userDetails.password,
        isRegistered: userDetails.isRegistered,
      };
      setCookie(USER_DETAILS_COOKIE, JSON.stringify(configuredUSerData));
    }
  };

  useEffect(() => {
    fetchCountriesNstatesForBilling();
  }, []);

  useEffect(() => {
    setBillingValue(
      'countryCode',
      countries
        .find((item) => item.name === orderDetails?.billing?.billingCountry)
        ?.id.toString() || '1',
    );
  }, [countries]);

  useEffect(() => {
    if (OrderId) {
      fetchOrderDetailsByDecrypting({ OrderId })
        .then((res) => {
          if (!res) {
            handleRedirect('UNEXPECTED_ERROR');
            return;
          }
          if (res.billing.orderStatus === 'Cancelled') {
            handleRedirect('ORDER_CANCELLED');
            return;
          }
          setCookie(USER_ID_COOKIE, JSON.stringify(res.billing.customerID));
          getUserDetails(res.billing.customerID.toString());

          if (res.billing.paymentMethod === 'PAYMENTPENDING') {
            handlePaymentPending(res);
            return;
          }

          handleRedirect('PAYMENT_ALREADY_DONE');
        })
        .catch((error) => {
          handleRedirect('UNEXPECTED_ERROR');
        })
        .finally(() => {});
    }

    if (!OrderId) {
      handleRedirect('NO_ORDER_ID_FOUND');
    }
  }, []);

  if (status === 'loading') {
    return cases.loading();
  }

  if (status === 'ready') {
    return cases.ready({
      Controller,
      billingErrors,
      billingTouchedFields,
      billingControl,
      postalCodeHandler,
      countryHandler,
      billingValues,
      maxLengthCalculator,
      detectCardIssuer,
      monthOptions,
      yearOptions,
      customYearChangeHandler,
      customMonthChangehandler,
      showCVCInformation,
      creditCardControl,
      credirCardFieldValues,
      creditCardTouchedFields,
      creditCardFormValid,
      errors,
      states,
      countries,
      makePaymentHandler,
      handleReviewOrder,
      orderDetails,
      setCreditCardFieldValue,
      showPlaceOrderScreen,
      billingSubmitHandle,
      creditCardhandleSubmit,
      setSelectedPaymentMethod,
      selectedPaymentMethod,
    });
  }

  return null;
};

export default PayLaterController;
