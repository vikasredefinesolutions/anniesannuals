import { createSlice } from '@reduxjs/toolkit';

interface _POPaymentMethod {
  method: 'bulk_payment';
  poNumber: string;
}

type _update_CheckoutAddress_Actions =
  | 'CLEAN_ALL'
  | { type: 'UPDATE_NOTE'; value: string }
  | {
      type: 'EDITING...';
      address: CustomerAddress | 'CLEANUP';
    }
  | {
      type: 'BILLING_ADDRESS';
      address: CustomerAddress | 'CLEANUP';
    }
  | {
      type: 'USE_SHIPPING_ADDRESS_FOR_BILLING';
      value: boolean | 'CLEANUP';
    }
  | {
      type: 'SHIP_TO_SCHOOL';
      value: boolean | 'CLEANUP';
    }
  | {
      type: 'SHIPPING_ADDRESS';
      address: CustomerAddress | 'CLEANUP';
    }
  | {
      type: 'ZIP_CODE';
      value: string | 'CLEANUP';
    }
  | {
      type: 'SEND_SPECIAL_OFFER_EMAIL';
      value: boolean | 'CLEANUP';
    }
  | {
      type: 'CHECKOUT_ADDRESS_IS_SAVED';
      value: boolean;
    };

type _Update_CO_ShippinMethod =
  | 'CLEAN_ALL'
  | {
      type: 'destination';
      value: 'residential' | 'commercial';
    }
  | {
      type: 'method';
      value:
        | {
            name: string;
            price: number;
          }
        | 'CLEAN_UP';
    }
  | {
      type: 'SEND_AS_GIFT';
      value: boolean;
    }
  | {
      type: 'CHECKOUT_SHIPPING_SAVED';
      value: boolean;
    }
  | {
      type: 'SAVE_GIFT_MESSAGE';
      value: string;
    };

interface _CCPaymentMethod {
  method: 'individual_cards';
  data: {
    nameOnCard: string;
    cardName: '' | 'VISA' | 'MASTERCARD' | 'AMEX' | 'DISCOVER';
    year: string;
    ccNumber: string;
    month: string;
    securityCode: string;
  };
}

export interface CustomerAddress {
  id: number;
  customerId: number;
  firstname: string;
  lastName: string;
  email: string;
  address1: string;
  address2: string;
  suite: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  fax: string;
  countryName: string;
  countryCode: string;
  addressType: string;
  isDefault: boolean;
  recStatus: string;
  createdDate?: any;
  createdBy?: any;
  modifiedDate?: any;
  modifiedBy?: any;
  rowVersion: string;
  location?: any;
  ipAddress?: any;
  macAddress?: any;
  companyName?: string;
  CompanyName?: string;
}

export interface _Checkout_Initials {
  user: {
    email: string;
    creditBalance: {
      allow: boolean;
      amount: number;
    };
  };
  guestCheckout: {
    required: boolean;
    showPasswordScreen: boolean;
    showCreateAccountScreen: boolean;
  };
  address: {
    zipCode: string;
    billing: CustomerAddress | null;
    shipping: CustomerAddress | null;
    editing: CustomerAddress | null;
    useBillingAddressForShipping: boolean;
    shipToSchool: boolean;
    checkoutAddressSaved: boolean;
    sendOfferEmail: boolean;
  };
  payment: {
    useCreditBalance: boolean;
    paymentRequired: boolean;
    creditCard: _CCPaymentMethod['data'];
    poNumber: string;
    method: 'Credit Card' | 'PURCHASE_ORDER' | 'Paypal';
    checkoutPaymentSaved: boolean;
    isGiftCardAvailable: boolean;
    giftCardNumber: string;
    giftCardBalance: number;
    giftCardAmount: number;
    skipPaymentMethod: boolean;
    storeCredits: number;
    giftCardWalletBalance: number;
    useStoreCredit: boolean;
    totalGiftAmount: number;
    useGiftWalletBalance: boolean;
    usedStoreCredits: number;
    usedGiftCardWalletBalance: number;
  };
  charges: {
    salesTax: number;
  };
  shippingMethod: {
    destination: 'residential' | 'commercial';
    name: string;
    price: number;
    checkoutShippingSaved: boolean;
    sendAsGift: boolean;
    giftMessage: string;
  };
}

const initialState: _Checkout_Initials = {
  user: {
    email: '',
    creditBalance: {
      allow: false,
      amount: 0,
    },
  },
  guestCheckout: {
    required: false,
    showPasswordScreen: false,
    showCreateAccountScreen: false,
  },
  shippingMethod: {
    destination: 'residential',
    name: '',
    price: 0,
    sendAsGift: false,
    checkoutShippingSaved: false,
    giftMessage: '',
  },

  address: {
    zipCode: '',
    billing: null,
    shipping: null,
    editing: null,
    useBillingAddressForShipping: false,
    shipToSchool: false,
    checkoutAddressSaved: false,
    sendOfferEmail: false,
  },
  charges: {
    salesTax: 0,
  },
  payment: {
    useCreditBalance: false,
    paymentRequired: true,
    creditCard: {
      nameOnCard: '',
      cardName: '',
      year: '',
      ccNumber: '',
      month: '',
      securityCode: '',
    },
    poNumber: '',
    method: 'Credit Card',
    checkoutPaymentSaved: false,
    isGiftCardAvailable: false,
    skipPaymentMethod: false,
    giftCardNumber: '',
    giftCardBalance: 0,
    giftCardAmount: 0,
    totalGiftAmount: 0,
    storeCredits: 0,
    giftCardWalletBalance: 0,
    usedStoreCredits: 0,
    usedGiftCardWalletBalance: 0,
    useStoreCredit: false,
    useGiftWalletBalance: false,
  },
};

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    update_CheckoutUser: (
      state,
      {
        payload,
      }: {
        payload:
          | { email: string }
          | { creditBalanceAmount: number }
          | { allowCreditBalance: boolean };
      },
    ) => {
      if ('email' in payload) {
        state.user.email = payload.email;
        return;
      }

      if ('creditBalanceAmount' in payload) {
        state.user.creditBalance.amount = payload.creditBalanceAmount;
        return;
      }

      if ('allowCreditBalance' in payload) {
        state.user.creditBalance.allow = payload.allowCreditBalance;
        return;
      }
    },

    update_GuestUserInformation: (
      state,
      {
        payload,
      }: {
        payload:
          | { type: 'GuestUserCheckout'; value: boolean }
          | { type: 'GuestUserPasswordScreen'; value: boolean }
          | { type: 'GuestUserCreateAccountScreen'; value: boolean }
          | 'CLEAN_UP';
      },
    ) => {
      if (payload === 'CLEAN_UP') {
        state.guestCheckout.required = false;
        state.guestCheckout.showPasswordScreen = false;
        state.guestCheckout.showCreateAccountScreen = false;
        return;
      }
      if (payload.type === 'GuestUserCheckout') {
        console.log('GuestUserCheckout inside');
        state.guestCheckout.required = payload.value;
        return;
      }
      if (payload.type === 'GuestUserPasswordScreen') {
        console.log('inside the pass word screen', payload.value);
        state.guestCheckout.required = false;
        state.guestCheckout.showPasswordScreen = payload.value;
        return;
      }
      if (payload.type === 'GuestUserCreateAccountScreen') {
        console.log('GuestUserCreateAccountScreen inside');
        state.guestCheckout.required = false;
        state.guestCheckout.showCreateAccountScreen = payload.value;
        return;
      }
    },

    update_CheckoutCharges: (
      state,
      {
        payload,
      }: { payload: { type: 'SALES_TAX'; cost: number } | 'CLEAN_UP' },
    ) => {
      if (payload === 'CLEAN_UP') {
        state.charges.salesTax = 0;
        return;
      }

      if (payload.type === 'SALES_TAX') {
        state.charges.salesTax = payload.cost;
        return;
      }
    },

    update_CheckoutAddress: (
      state,
      {
        payload,
      }: {
        payload: _update_CheckoutAddress_Actions;
      },
    ) => {
      if (payload === 'CLEAN_ALL') {
        state.address.editing = null;
        state.address.shipping = null;
        state.address.billing = null;
        state.address.useBillingAddressForShipping = false;
        return;
      }

      if (payload.type === 'ZIP_CODE') {
        if (payload.value === 'CLEANUP') {
          state.address.zipCode = '';
          return;
        }

        state.address.zipCode = payload.value || '';
        return;
      }

      if (payload.type === 'EDITING...') {
        if (payload.address === 'CLEANUP') {
          state.address.editing = null;
          return;
        }

        state.address.editing = payload.address;
        return;
      }
      if (payload.type === 'SHIPPING_ADDRESS') {
        if (payload.address === 'CLEANUP') {
          state.address.shipping = null;
          return;
        }

        state.address.shipping = payload.address;
        return;
      }
      if (payload.type === 'BILLING_ADDRESS') {
        if (payload.address === 'CLEANUP') {
          state.address.billing = null;
          return;
        }

        state.address.billing = payload.address;
        return;
      }
      if (payload.type === 'USE_SHIPPING_ADDRESS_FOR_BILLING') {
        if (payload.value === 'CLEANUP') {
          state.address.useBillingAddressForShipping = false;
          return;
        }

        state.address.useBillingAddressForShipping = payload.value;
        return;
      }
      if (payload.type === 'SEND_SPECIAL_OFFER_EMAIL') {
        if (payload.value === 'CLEANUP') {
          state.address.sendOfferEmail = false;
          return;
        }

        state.address.sendOfferEmail = payload.value;
        return;
      }
      if (payload.type === 'CHECKOUT_ADDRESS_IS_SAVED') {
        if (payload.value === false) {
          state.address.checkoutAddressSaved = false;
          state.payment.checkoutPaymentSaved = false;
          state.shippingMethod.checkoutShippingSaved = false;
          return;
        }

        state.address.checkoutAddressSaved = payload.value;
        return;
      }
    },
    update_PaymentDetails: (
      state,
      action: {
        payload:
          | 'CLEANUP'
          | {
              type: 'PURCHASE_ORDER' | 'Credit Card' | 'Paypal';
              method: 'CHANGED';
            }
          | {
              value: boolean;
              method: 'USE_CREDIT_BALANCE';
            }
          | {
              value: boolean;
              method: 'PAYMENT_REQUIRED';
            }
          | _POPaymentMethod
          | _CCPaymentMethod
          | {
              value: boolean;
              method: 'UPDATE_GIFTCARD_OPTION';
            }
          | {
              method: 'CHECKOUT_PAYMENT_SAVED';
              value: boolean;
            }
          | {
              method: 'SKIP_PAYMENT_METHOD';
              value: boolean;
            }
          | {
              method: 'USE_STORE_CREDITS';
              value: {
                useStoreCredit: boolean;
                usedStoreCreditAmount: number;
                orderTotal: number;
              };
            }
          | {
              method: 'USE_GIFT_WALLET_BALANCE';
              value: {
                useGiftWallet: boolean;
                usedGiftAmount: number;
              };
            }
          | {
              method: 'SAVE_CREDITS';
              value: {
                storeCredits: number;
                giftCardWalletBalance: number;
              };
            }
          | {
              method: 'CHECKOUT_GIFT_CARD_DETAILS';
              value: {
                totalAmount: number;
                giftCardNumber: string;
                giftCardAmount: number;
                giftCardBalance: number;
              };
            }
          | {
              method: 'UPDATE_GIFT_CARD_BALANCE';
              value: {
                giftCardAmount: number;
                giftCardBalance: number;
              };
            }
          | {
              method: 'UPDATE_STORE_CREDIT_BALANCE';
              value: {
                usedStoreCredits: number;
              };
            };
      },
    ) => {
      if (action.payload === 'CLEANUP') {
        state.payment = JSON.parse(JSON.stringify(initialState.payment));
        return;
      }
      if (action.payload.method === 'USE_CREDIT_BALANCE') {
        state.payment.useCreditBalance = action.payload.value;
        return;
      }

      if (action.payload.method === 'UPDATE_GIFT_CARD_BALANCE') {
        state.payment.giftCardBalance = action.payload.value.giftCardBalance;
        state.payment.giftCardAmount = action.payload.value.giftCardAmount;
        return;
      }

      if (action.payload.method === 'UPDATE_STORE_CREDIT_BALANCE') {
        state.payment.usedStoreCredits = action.payload.value.usedStoreCredits;
      }

      if (action.payload.method === 'PAYMENT_REQUIRED') {
        state.payment.paymentRequired = action.payload.value;
        if (!action.payload.value) {
          state.payment.creditCard = JSON.parse(
            JSON.stringify(initialState.payment.creditCard),
          );
          state.payment.poNumber = '';
        }
        return;
      }

      if (action.payload.method === 'SAVE_CREDITS') {
        state.payment.storeCredits = action.payload.value.storeCredits;
        state.payment.giftCardWalletBalance =
          action.payload.value.giftCardWalletBalance;
        return;
      }
      if (action.payload.method === 'USE_GIFT_WALLET_BALANCE') {
        state.payment.useGiftWalletBalance = action.payload.value.useGiftWallet;
        state.payment.usedGiftCardWalletBalance =
          action.payload.value.usedGiftAmount;
        return;
      }
      if (action.payload.method === 'USE_STORE_CREDITS') {
        state.payment.useStoreCredit = action.payload.value.useStoreCredit;
        state.payment.usedStoreCredits =
          action.payload.value.usedStoreCreditAmount;
        if (
          action.payload.value.useStoreCredit &&
          state.payment.giftCardAmount
        ) {
          if (
            action.payload.value.orderTotal -
              action.payload.value.usedStoreCreditAmount >
            0
          ) {
            let remianingTotal =
              action.payload.value.orderTotal -
              action.payload.value.usedStoreCreditAmount;
            state.payment.giftCardAmount =
              action.payload.value.orderTotal -
                action.payload.value.usedStoreCreditAmount >
              state.payment.totalGiftAmount
                ? state.payment.totalGiftAmount
                : action.payload.value.orderTotal -
                  action.payload.value.usedStoreCreditAmount;
            state.payment.giftCardBalance =
              action.payload.value.orderTotal -
                action.payload.value.usedStoreCreditAmount >=
              state.payment.totalGiftAmount
                ? 0
                : state.payment.totalGiftAmount - remianingTotal;
          } else {
            state.payment.giftCardAmount = 0;
            state.payment.giftCardBalance =
              action.payload.value.orderTotal -
              action.payload.value.usedStoreCreditAmount -
              state.payment.totalGiftAmount;
          }
        } else if (
          !action.payload.value.useStoreCredit &&
          state.payment.giftCardAmount
        ) {
          state.payment.giftCardAmount =
            state.payment.totalGiftAmount > action.payload.value.orderTotal
              ? action.payload.value.orderTotal
              : state.payment.totalGiftAmount;
          state.payment.giftCardBalance =
            state.payment.totalGiftAmount - action.payload.value.orderTotal >= 0
              ? state.payment.totalGiftAmount - action.payload.value.orderTotal
              : 0;
        }

        return;
      }

      if (action.payload.method === 'CHANGED') {
        state.payment.method = action.payload.type;
        return;
      }

      if (action.payload.method === 'CHECKOUT_GIFT_CARD_DETAILS') {
        state.payment.giftCardAmount = action.payload.value.giftCardAmount;
        state.payment.giftCardNumber = action.payload.value.giftCardNumber;
        state.payment.giftCardBalance = action.payload.value.giftCardBalance;
        state.payment.totalGiftAmount = action.payload.value.totalAmount;
        return;
      }

      if (action.payload.method === 'bulk_payment') {
        state.payment.poNumber = action.payload.poNumber;
        state.payment.method = 'PURCHASE_ORDER';
        state.payment.creditCard = JSON.parse(
          JSON.stringify(initialState.payment.creditCard),
        );
        return;
      }

      if (action.payload.method === 'individual_cards') {
        state.payment.creditCard = { ...action.payload.data };
        state.payment.method = 'Credit Card';
        state.payment.poNumber = '';
        return;
      }

      if (action.payload.method === 'UPDATE_GIFTCARD_OPTION') {
        state.payment.isGiftCardAvailable = action.payload.value;
        return;
      }

      if (action.payload.method === 'SKIP_PAYMENT_METHOD') {
        state.payment.skipPaymentMethod = action.payload.value;
        return;
      }

      if (action.payload.method === 'CHECKOUT_PAYMENT_SAVED') {
        state.payment.checkoutPaymentSaved = action.payload.value;
        return;
      }
    },
    update_CheckoutShippingMethod: (
      state,
      { payload }: { payload: _Update_CO_ShippinMethod },
    ) => {
      if (payload === 'CLEAN_ALL') {
        state.shippingMethod = JSON.parse(
          JSON.stringify(initialState.shippingMethod),
        );
        return;
      }
      if (payload.type === 'destination') {
        state.shippingMethod.destination = payload.value;
        return;
      }

      if (payload.type === 'SEND_AS_GIFT') {
        if (!payload.value) {
          state.shippingMethod.giftMessage = '';
        }
        state.shippingMethod.sendAsGift = payload.value;
        return;
      }

      if (payload.type === 'SAVE_GIFT_MESSAGE') {
        state.shippingMethod.giftMessage = payload.value;
        return;
      }
      if (payload.type === 'CHECKOUT_SHIPPING_SAVED') {
        if (payload.value === false) {
          state.payment.checkoutPaymentSaved = payload.value;
        }
        state.shippingMethod.checkoutShippingSaved = payload.value;

        return;
      }
      if (payload.type === 'method') {
        if (payload.value === 'CLEAN_UP') {
          state.shippingMethod.name = '';
          state.shippingMethod.price = 0;
          return;
        }

        state.shippingMethod.name = payload.value.name;
        state.shippingMethod.price = payload.value.price;
        return;
      }
    },
    updateAppliedGiftCardAmount: (state, { payload }: { payload: number }) => {
      if (state.payment.giftCardBalance >= payload) {
        const remainingGiftBal = state.payment.giftCardBalance - payload;
        state.payment.giftCardBalance = remainingGiftBal;
        state.payment.giftCardAmount =
          state.payment.giftCardAmount + remainingGiftBal;
      } else if (
        state.payment.giftCardBalance < payload &&
        state.payment.giftCardBalance
      ) {
        state.payment.giftCardAmount =
          state.payment.giftCardAmount + state.payment.giftCardBalance;
        state.payment.giftCardBalance = 0;
      }
    },
    clear_Checkout: (state) => {
      state.user = JSON.parse(JSON.stringify(initialState.user));
      state.payment = JSON.parse(JSON.stringify(initialState.payment));
      state.address = JSON.parse(JSON.stringify(initialState.address));
      state.charges = JSON.parse(JSON.stringify(initialState.charges));
      state.shippingMethod = JSON.parse(
        JSON.stringify(initialState.shippingMethod),
      );
    },
  },
});

export const checkoutActions = checkoutSlice.actions;

export default checkoutSlice.reducer;
