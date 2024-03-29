import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import {
  updateCartQuantity,
  updateCouponDetails,
  updateOrderTotal,
} from '@/app/redux/slices/cartSlice';
import { checkoutActions } from '@/app/redux/slices/checkoutSlice';
import { showLoader } from '@/app/redux/slices/commonSlice';
import { employeeActions } from '@/app/redux/slices/employeeSlice';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import { addPromoCode } from '@/shared/apis/cart/addPromoCode';
import { _CartItem } from '@/shared/apis/cart/fetchCartProducts';
import { FetchSalesTax } from '@/shared/apis/checkout/fetchSalesTax';
import { placeOrder } from '@/shared/apis/checkout/placeOrder';
import {
  EMP_EMAIL,
  EMP_ID,
  getEmployeeId,
  getTempUserId,
  getUserId,
} from '@/shared/utils/cookie.helper';
import storeDetails from '@/staticData/storeDetails.json';
import { getConcatinatedValue, sendErrorMessage } from '@/utils/helpers';
import { paths } from '@/utils/paths.constant';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import {
  OrderType,
  billingFields,
  couponFields,
  paymentFields,
  shippingFields,
} from './config';
export interface _CartSummaryProps {
  applyDiscountCouponHandler: (discountCoupon?: string) => void;
  removeCouponCodeHandler: () => void;
  couponChangeHandler: (couponName: string) => void;
  coupon: string;
  couponCode: string;
  showDiscountInput: boolean;
  setShowDiscountInput: React.Dispatch<React.SetStateAction<boolean>>;
  openBrandDescription: boolean;
  setOpenBrandDescription: React.Dispatch<React.SetStateAction<boolean>>;
  showPromotionalText: boolean;
  setShowPromotionalText: React.Dispatch<React.SetStateAction<boolean>>;
  handlePlaceOrder: (type: 'ORDERNOW' | 'PAYLATER') => void;
  paypalCreateOrder: (total: number) => Promise<string>;
  paypalCaptureOrder: (orderId: string) => void;
  storeOrderDetails: (orderType: OrderType, paypalResponse?: any) => void;
}
export interface _ReadyProps extends _CartSummaryProps {
  cartData: _CartItem[];
  //TODO: need to set proper type for buyItWithProductData value
  isEmployeeLoggedIn: boolean;
}

interface _Props {
  cases: {
    ready: (_ReadyProps: _ReadyProps) => ReactElement<any, any>;
  };
}

const CheckoutSummaryController: React.FC<_Props> = ({ cases }) => {
  const [couponCode, setCouponCode] = useState<string>('');
  const [showDiscountInput, setShowDiscountInput] = useState<boolean>(false);

  const { growingZone } = useAppSelector((state) => state.common);

  const [openBrandDescription, setOpenBrandDescription] =
    useState<boolean>(false);
  const [showPromotionalText, setShowPromotionalText] =
    useState<boolean>(false);
  const { coupon, amount, percentage } = useAppSelector(
    (state) => state.cart.couponDetails,
  );
  const { storeId } = storeDetails;

  const dispatch = useAppDispatch();

  const userId = getUserId();
  const tempId = getTempUserId();
  const { loggedIn: isEmployeeLoggedIn, empId } = useAppSelector(
    (state) => state.employee,
  );

  const { clear_Checkout, updateAppliedGiftCardAmount } = checkoutActions;

  const discount = {
    coupon: coupon,
    amount: +amount,
    discount: +percentage,
  };

  const { payment } = useAppSelector((state) => state.checkout);

  const { billing, shipping, useBillingAddressForShipping } = useAppSelector(
    (state) => state.checkout.address,
  );

  const { usedStoreCredits, usedGiftCardWalletBalance, } = useAppSelector(
    (state) => state.checkout.payment,
  );

  const { giftMessage, sendAsGift } = useAppSelector(
    (state) => state.checkout.shippingMethod,
  );

  const { selectedShipping, couponDetails, totalShippingCost, shippingList } = useAppSelector((state) => state.cart);
  const { orderSubTotal, orderTotal, tax, cartData } = useAppSelector(
    (state) => state.cart,
  );
  const { updateEmployee } = employeeActions;

  const router = useRouter();

  const employeeLogoutHandler = () => {
    deleteCookie(EMP_ID);
    deleteCookie(EMP_EMAIL);
    dispatch(updateEmployee('CLEAN_UP'));
  };

  const handlePlaceOrderSuccess = async (orderId: string) => {
    // await Klaviyo_PlaceOrder({
    //   orderNumber: orderId,
    // });

    // deleteCookie(__Cookie.userId);

    const employeeId = getEmployeeId();
    if (employeeId) {
      employeeLogoutHandler();
    }
    dispatch(
      openAlertModal({
        title: 'Success',
        description: `Order Placed Successfully with order id ${orderId}`,
        isAlertModalOpen: true,
      }),
    );

    router.push(`${paths.thankYou}?orderNumber=${orderId}&temp=${tempId}`);

    dispatch(clear_Checkout());
  };

  const handlePlaceOrderFailed = (errorResponse: any) => {
    let error = {
      title: '',
      message: '',
    };

    Object.keys(errorResponse).forEach((key, index) => {
      if (index === 0) {
        error.title = 'Failed' || 'Something went wrong!!';
        error.message = errorResponse[key] || 'Try again, later!!!';
      }
    });

    dispatch(
      openAlertModal({
        title: 'Error',
        description: error.message,
        isAlertModalOpen: true,
      }),
    );
  };

  const paypalCreateOrder = useCallback(
    async (total: number) => {
      dispatch(showLoader(true));
      try {
        let response = await fetch('/api/paypal/createOrder', {
          method: 'POST',
          body: JSON.stringify({
            user_id: userId,
            order_price: orderTotal,
          }),
        });

        const orderId = await response.json();

        dispatch(
          openAlertModal({
            title: 'Success',
            description: 'Success Created order id',
            isAlertModalOpen: true,
          }),
        );
        dispatch(showLoader(false));
        return orderId?.message;
      } catch (err) {
        dispatch(
          openAlertModal({
            title: 'Error',
            description: 'Something Went Wrong in Creating Order',
            isAlertModalOpen: true,
          }),
        );
        dispatch(showLoader(false));
      }
      return '';
    },
    [orderTotal],
  );

  const paypalCaptureOrder = async (orderID: string) => {
    dispatch(showLoader(true));
    try {
      let response = await fetch('/api/paypal/captureOrder', {
        method: 'POST',
        body: JSON.stringify({
          orderId: orderID,
        }),
      });

      if (response) {
        const transaction = await response.json();
        const paypalResponse = JSON.parse(transaction.message);
        storeOrderDetails('PAYPAL', paypalResponse);
        dispatch(showLoader(false));
      }
    } catch (err) {
      dispatch(
        openAlertModal({
          title: 'Error',
          description: 'Something Went Wrong in Placing Order',
          isAlertModalOpen: true,
        }),
      );
      dispatch(showLoader(false));
      // Order is not successful
      // Your custom code

      // Like showing an error toast
      // toast.error('Some Error Occured')
    }
  };

  const storeOrderDetails = async (
    orderType: OrderType,
    payPalResponse?: any,
  ) => {
    const calculatedOrderTotal = orderTotal -
      payment.giftCardAmount -
      usedStoreCredits -
      usedGiftCardWalletBalance + tax

    const payload = {
      id: 0,
      isNew: true,
      storeID: storeDetails.id,
      // User
      customerID: +userId || +tempId,
      firstName: billing?.firstname,
      lastName: billing?.lastName,
      email: billing?.email || '',

      // Shipping
      shippingEmail: shipping?.email || '',
      shippingMethod: getConcatinatedValue(shippingList?.map(item => item.name)),
      ...shippingFields(shipping, useBillingAddressForShipping),

      // Billing
      billingEmail: billing?.email || '',
      ...billingFields(billing),

      // Payment
      ...paymentFields(
        payment,
        orderType,
        usedStoreCredits,
        orderTotal - payment.giftCardAmount + tax,
      ),

      // Coupon
      ...couponFields(discount),

      // Prices
      orderSubtotal: +orderSubTotal.toFixed(2),
      orderShippingCosts: +totalShippingCost.toFixed(2),
      orderTax: +tax.toFixed(2),
      orderTotal: calculatedOrderTotal > 0 ? +calculatedOrderTotal.toFixed(2) : 0,

      // credit
      storeCredit: usedStoreCredits,
      isCreditLimit: usedStoreCredits > 0 ? true : false,

      // GiftCard
      giftCertiSerialNumber: payment.giftCardNumber || '',
      giftCertificateDiscountAmount: payment.giftCardAmount || 0,
      giftCardWalletAmount: usedGiftCardWalletBalance,

      //
      orderSmallRunFee: 0,
      quantityDiscountAmount: 0,
      levelDiscountPercent: 0,
      levelDiscountAmount: 0,
      customDiscount: 0,
      sewoutTotal: 0,
      digitalTotal: 0,
      logoFinalTotal: 0,
      lineFinalTotal: 0,
      giftWrapPrice: 0,
      orderLogoSetupFee: 0,
      shipPromotionDiscount: 0,
      giftWrapAmt: 0,
      refundedAmount: 0,
      chargeAmount: 0,
      authorizedAmount: 0,
      adjustmentAmount: 0,

      // personalization
      sewout: true,

      // Employee
      empSourceName: '',
      empSourceMedium: '',
      employeeID: empId || 0,
      isAllowPo: false,
      salesAgentId: 0,
      salesRepName: '',
      empSalesRap: '',

      // user tracking
      gclid: '',

      // Static
      orderStatus: 'New',
      endUserName: '',
      orderCheckoutNote: '',
      orderNotes: '',

      // Never touched
      notes: '',
      okToEmail: true,
      lastIPAddress: '',
      authorizationCode: '',
      authorizationResult: '',
      transactionCommand: payPalResponse
        ? payPalResponse?.purchase_units?.[0]?.payments?.captures?.[0]?.status ===
          'PENDING'
          ? payPalResponse?.links?.[0]?.href
          : payPalResponse?.links?.[0]?.href
        : '',
      transactionStatus:
        payPalResponse?.purchase_units[0]?.payments?.captures[0]?.status ?? '',
      avsResult: '',
      authorizationPNREF:
        payPalResponse?.purchase_units[0].payments?.captures[0]?.id ?? '',
      captureTxCommand: '',
      captureTXResult: '',
      deleted: true,
      referrer: '',
      isGiftWrap: sendAsGift || true,
      authorizedOn: new Date(),
      capturedOn: new Date(),
      orderDate: new Date(),
      inventoryWasReduced: true,
      refOrderID: '',
      isMobileOrder: true,
      batchId: 0,
      shippingLabelCost: 0,
      shippingLabelWeight1: 0,
      shippingLabelPackageHeight: 0,
      shippingLabelPackageWidth: 0,
      shippingLabelPackageLength: 0,
      noOfLabels: 0,
      isApproved: true,
      dimensionValue: 0,
      isFullFillment: true,
      isAmazonuplaod: true,
      cvvResult: '',
      isExport: true,
      chargeHostedPaymentID: '',
      isPayLater: isEmployeeLoggedIn && orderType === 'PAYLATER' ? true : false,
      isMailSend: true,
      shippedByStamps: true,
      formId: '',
      inHandDate: new Date(),
      decorationDate: new Date(),
      giftPackNote: giftMessage || '',
    };

    await placeOrder({
      orderModel: payload,
    }).then((response) => {
      if (!response) throw new Error('Something went wrong');

      if ('id' in response) {
        handlePlaceOrderSuccess(response.id);
        // handleSendmailPayment(response.id);
        return;
      }

      handlePlaceOrderFailed(response);
    });
  };

  const handlePlaceOrder = async (orderType: OrderType) => {
    dispatch(showLoader(true));

    try {
      await storeOrderDetails(orderType);
    } catch (error) {
      handlePlaceOrderFailed(error);
    }
    dispatch(showLoader(false));
  };

  const calculateSummary = async (item: _CartItem[]) => {
    try {
      let orderSubTotal = 0,
        length = 0,
        shippingCharge = totalShippingCost || 0;

      item.forEach((item) => {
        length = length + item.totalQty;
        orderSubTotal = orderSubTotal + item.totalPrice;
      });

      dispatch(updateCartQuantity({ quantity: length }));

      const tax = await FetchSalesTax({
        customerId: +userId || +tempId,
        zipCode: growingZone.zipCode || shipping?.postalCode || '0',
        logoTotal: 0,
        lineTotal: 0,
        logoSetupCharge: 0,
        shippingCharges: totalShippingCost ?? 0,
        smallRunFee: 0,
      });

      dispatch(
        updateOrderTotal({
          orderSubTotal: orderSubTotal,
          shippingCharge: shippingCharge,
          tax: tax || 0,
          orderTotal: shippingCharge + orderSubTotal,
        }),
      );
      const discountCoupon = localStorage.getItem('discountCoupon');
      if (discountCoupon) {
        applyDiscountCouponHandler(discountCoupon);
      }
    } catch (error) {
      dispatch(
        openAlertModal({
          title: 'Error',
          description: sendErrorMessage(error),
          isAlertModalOpen: true,
        }),
      );
    }
  };

  const applyDiscountCouponHandler = async (discountCoupon?: string) => {
    dispatch(showLoader(true));
    const couponObject = {
      promotionsModel: {
        customerId: +userId || +tempId,
        couponCode: discountCoupon || couponCode,
        storeId: storeId, // need to make it dynamic
        taxCost: 0,
        shippingCost: 0,
      },
    };

    await addPromoCode(couponObject)
      .then((res) => {
        if ('discountAmount' in res) {
          setCouponInLocalStorage(res.couponCode);

          handleIfCouponIsValid(res);
          return;
        }
        handleIfCouponIsNotValid(res);
      })
      .catch((errors) => handleIfCouponIsNotValid(errors))
      .finally(() => dispatch(showLoader(false)));
  };

  const handleIfCouponIsValid = (details: {
    couponCode: string;
    percentage: string;
    discountAmount: string;
    isFreeShipping: boolean;
    taxCost: string;
    shiipingCost: string;
  }) => {
    dispatch(
      openAlertModal({
        title: 'Success',
        description: 'PromoCode applied successfully',
        isAlertModalOpen: true,
      }),
    );
    dispatch(
      updateCouponDetails({
        coupon: details.couponCode,
        amount: details.discountAmount,
        percentage: details.percentage,
        todo: 'ADD',
      }),
    );
    setCouponCode('');
  };

  const handleIfCouponIsNotValid = (errors: { [key: string]: string }) => {
    if (errors) {
      const objToArr = Object?.values(errors);
      if (objToArr.length === 0) return;
      // cart_promoCode('REMOVE_PROMO_CODE');

      if ('promotionsModel.CustomerId' in errors) {
        setCouponCode(objToArr[0]);
        setTimeout(() => {
          setCouponCode('');
        }, 1500);
        return;
      }
      // if No errors matched
      setTimeout(() => {
        setCouponCode(objToArr[0]);
      }, 1500);
      setTimeout(() => {
        setCouponCode('');
      }, 2500);
    }
  };

  const removeCouponCodeHandler = () => {
    localStorage.removeItem('discountCoupon');
    dispatch(updateAppliedGiftCardAmount(+couponDetails?.amount))
    dispatch(
      updateCouponDetails({
        coupon: '',
        amount: '0',
        percentage: '0',
        todo: 'REMOVE',
      }),
    );
  };
  const setCouponInLocalStorage = (couponCode: string) => {
    localStorage.setItem('discountCoupon', couponCode);
  };

  const couponChangeHandler = (couponName: string) => {
    setCouponCode(couponName);
  };

  useEffect(() => {
    calculateSummary(cartData);
  }, [selectedShipping.price, totalShippingCost]);

  return cases.ready({
    cartData,
    isEmployeeLoggedIn,
    removeCouponCodeHandler,
    applyDiscountCouponHandler,
    couponChangeHandler,
    coupon,
    couponCode,
    setShowDiscountInput,
    showDiscountInput,
    setOpenBrandDescription,
    openBrandDescription,
    setShowPromotionalText,
    showPromotionalText,
    handlePlaceOrder,
    paypalCreateOrder,
    paypalCaptureOrder,
    storeOrderDetails,
  });
};

export default CheckoutSummaryController;
