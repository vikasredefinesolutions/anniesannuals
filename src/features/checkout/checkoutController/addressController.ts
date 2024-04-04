'use client';
import { useAppSelector } from '@/app/redux/hooks';
import { addShippingChargeList } from '@/app/redux/slices/cartSlice';
import { checkoutActions } from '@/app/redux/slices/checkoutSlice';
import { showLoader } from '@/app/redux/slices/commonSlice';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import { _CartItem } from '@/shared/apis/cart/fetchCartProducts';
import { deleteCartItem } from '@/shared/apis/cart/removeCartProduct';
import { checkCartProducts } from '@/shared/apis/checkout/cartProductAvailability';
import { CreateUserAddress } from '@/shared/apis/checkout/createAddress';
import {
  FetchCountriesList,
  _Country,
} from '@/shared/apis/checkout/fetchCountriesList';
import { FetchStatesList, _State } from '@/shared/apis/checkout/fetchStateList';
import { getLocationWithZipCode } from '@/shared/apis/checkout/getLocationWithZipCode';
import { GetShippingmethod } from '@/shared/apis/checkout/getShippingMethod';
import {
  AddressAPIRequest,
  UpdateUserAddress,
} from '@/shared/apis/checkout/updateAddress';
import { getUserDetailsById } from '@/shared/apis/user/fetchUserDetails';
import { CustomerAddress } from '@/shared/types/user';
import {
  getShippingType,
  getStoreId,
  getTempUserId,
  getUserId,
} from '@/shared/utils/cookie.helper';
import { getLocation, updatedKeyName } from '@/utils/helpers';
import { paths } from '@/utils/paths.constant';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import {
  Control,
  Controller,
  ControllerProps,
  FieldErrors,
  FieldPath,
  FieldValues,
  UseFormGetValues,
  UseFormHandleSubmit,
  useForm,
} from 'react-hook-form';

import { useDispatch } from 'react-redux';
import {
  CheckoutAddressFieldsType,
  CheckoutAddressValidationSchema,
  ModalScreens,
  UserAddressType,
  _location,
  decideToAddOrUpdateTheAddress,
} from './config';

interface TouchedFields {
  firstname?: boolean | undefined;
  lastName?: boolean | undefined;
  address1?: boolean | undefined;
  address2?: boolean | undefined;
  city?: boolean | undefined;
  state?: boolean | undefined;
  postalCode?: boolean | undefined;
  countryCode?: boolean | undefined;
  countryName?: boolean | undefined;
  email?: boolean | undefined;
  phone?: boolean | undefined;
}
interface _CheckoutAddressReadyProps extends _AddAddressType {
  handleShippingAsBilling: (e: React.ChangeEvent<HTMLInputElement>) => void;
  billingAddress: CustomerAddress[];
  shippingAddress: CustomerAddress[];
  states: _State[];
  countries: _Country[];
  postalCodeHandler: (
    e: React.FocusEvent<HTMLInputElement>,
    addressType: string,
  ) => void;
  countryHandler: (
    e: React.ChangeEvent<HTMLSelectElement>,
    addressType: string,
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
  sendSpecialOffersHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  billingErrors: FieldErrors<CheckoutAddressFieldsType>;
  shippingErrors: FieldErrors<CheckoutAddressFieldsType>;
  billingTouchedFields: Partial<Readonly<TouchedFields>>;
  shippingTouchedFields: Partial<Readonly<TouchedFields>>;
  billingControl: Control<CheckoutAddressFieldsType>;
  shippingControl: Control<CheckoutAddressFieldsType>;
  addressOnSubmit: () => void;
  shippingSubmitHandle: UseFormHandleSubmit<
    CheckoutAddressFieldsType,
    undefined
  >;
  billingSubmitHandle: UseFormHandleSubmit<
    CheckoutAddressFieldsType,
    undefined
  >;
  billingValues: UseFormGetValues<CheckoutAddressFieldsType>;
  shippingValues: UseFormGetValues<CheckoutAddressFieldsType>;
  editAddress: () => void;
  onChangeHandler: (
    name: ModalScreens | null,
    editAddress?: CustomerAddress,
  ) => void;
  modal: ModalScreens | null;
  addressClickHandler: (
    item: CustomerAddress,
    name: 'SHIPPING' | 'BILLING',
  ) => void;
  showRemoveModal: boolean;
  removeItems: () => void;
  removeMessage: string;
  errorMessage: (errors: any, isShipping: boolean) => string;
}

export interface _AddAddressType {
  addAddressSubmitHandle: UseFormHandleSubmit<
    CheckoutAddressFieldsType,
    undefined
  >;
  addAddressControl: Control<CheckoutAddressFieldsType>;
  addAddressValues: UseFormGetValues<CheckoutAddressFieldsType>;
  addAddressErrors: FieldErrors<CheckoutAddressFieldsType>;
  addAddressTouchedFields: Partial<Readonly<TouchedFields>>;
  addAddressRequestHandler: (methodName: string) => void;
}

interface _Props {
  cases: {
    ready: (props: _CheckoutAddressReadyProps) => ReactElement<any, any>;
  };
}

const CheckoutAddressController: React.FC<_Props> = ({ cases }) => {
  const dispatch = useDispatch();
  const { address } = useAppSelector((state) => state.checkout);
  const { orderSubTotal, tax } = useAppSelector((state) => state.cart);
  const [shippingAddress, setShippingAddress] = useState<CustomerAddress[]>([]);
  const [billingAddress, setBillingAddress] = useState<CustomerAddress[]>([]);
  const [countries, setCountries] = useState<_Country[]>([]);
  const [states, setStates] = useState<_State[]>([]);
  const { update_CheckoutAddress } = checkoutActions;
  const [modal, setModal] = useState<ModalScreens>(null);
  const isShippingChargeFetched = useRef('');
  const { shipping: existingShippingAddress, billing: existingBillingAddress } =
    address;

  const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);
  const [removeCartProducts, setRemoveCartProducts] = useState<_CartItem[]>([]);
  const [removeMessage, setRemoveMessage] = useState<string>('');
  const [selectedAddress, setSelectedAddress] =
    useState<CustomerAddress | null>(null);

  const router = useRouter();
  const userId = getUserId();
  const tempId = getTempUserId();
  const storeId = getStoreId();
  const handleShippingAsBilling = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(
        update_CheckoutAddress({
          type: 'USE_SHIPPING_ADDRESS_FOR_BILLING',
          value: true,
        }),
      );
    }
    if (!e.target.checked) {
      dispatch(
        update_CheckoutAddress({
          type: 'USE_SHIPPING_ADDRESS_FOR_BILLING',
          value: false,
        }),
      );
    }
  };

  const sendSpecialOffersHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(
        update_CheckoutAddress({
          type: 'SEND_SPECIAL_OFFER_EMAIL',
          value: true,
        }),
      );
    }
    if (!e.target.checked) {
      dispatch(
        update_CheckoutAddress({
          type: 'SEND_SPECIAL_OFFER_EMAIL',
          value: false,
        }),
      );
    }
  };

  const convertIntoShippingInitials = () => {
    const shipAddress = shippingAddress.find((address) => {
      if (address.isDefault && address.addressType === 'S') {
        return true;
      }

      return false;
    });

    if (shipAddress) {
      dispatch(
        update_CheckoutAddress({
          type: 'SHIPPING_ADDRESS',
          address: shipAddress,
        }),
      );
    }

    shippingReset({
      firstname: shipAddress?.firstname || '',
      lastName: shipAddress?.lastName || '',
      address1: shipAddress?.address1 || '',
      address2: shipAddress?.address2 || '',
      city: shipAddress?.city || '',
      state: shipAddress?.state || '',
      postalCode: shipAddress?.postalCode || '',
      phone: shipAddress?.phone || '',
      email: shipAddress?.email || '',
      countryName: shipAddress?.countryName || '',
      countryCode: shipAddress?.countryCode || '',
    });
  };

  const convertIntoBillingInitials = () => {
    const billAddress = billingAddress.find((address) => {
      if (address.isDefault && address.addressType === 'B') {
        return true;
      }

      return false;
    });

    if (billAddress) {
      dispatch(
        update_CheckoutAddress({
          type: 'BILLING_ADDRESS',
          address: billAddress,
        }),
      );
    }

    billingReset({
      firstname: billAddress?.firstname || '',
      lastName: billAddress?.lastName || '',
      address1: billAddress?.address1 || '',
      address2: billAddress?.address2 || '',
      city: billAddress?.city || '',
      state: billAddress?.state || '',
      postalCode: billAddress?.postalCode || '',
      phone: billAddress?.phone || '',
      email: billAddress?.email || '',
      countryName: billAddress?.countryName || '',
      countryCode: billAddress?.countryCode || '',
    });
  };

  const {
    setValue: setShippingValue,
    handleSubmit: shippingSubmitHandle,
    watch: shippingWatch,
    control: shippingControl,
    getValues: shippingValues,
    reset: shippingReset,
    formState: { errors: shippingErrors, touchedFields: shippingTouchedFields },
  } = useForm<CheckoutAddressFieldsType>({
    resolver: yupResolver(CheckoutAddressValidationSchema),
  });
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

  const {
    setValue: setAddAddressValue,
    handleSubmit: addAddressSubmitHandle,
    watch: addAddressWatch,
    reset: addAddressReset,
    control: addAddressControl,
    getValues: addAddressValues,
    formState: {
      errors: addAddressErrors,
      touchedFields: addAddressTouchedFields,
    },
  } = useForm({
    resolver: yupResolver(CheckoutAddressValidationSchema),
  });

  const updateBothAddress = async (
    billingPayload: AddressAPIRequest,
    location: _location,
  ) => {
    const shippingValue = shippingValues();
    const shippingPayload: AddressAPIRequest = {
      storeCustomerAddressModel: {
        customerId: +userId || +tempId,
        email: shippingValue.email || '',
        //
        firstname: shippingValue?.firstname || '',
        lastName: shippingValue?.lastName || '',
        address1: shippingValue?.address1 || '',
        address2: shippingValue?.address2 || '',
        city: shippingValue?.city || '',
        state: shippingValue?.state || '',
        postalCode: shippingValue?.postalCode || '',
        phone: shippingValue?.phone || '',
        countryName: shippingValue?.countryName || '',
        countryCode: shippingValue?.countryCode || '',
        // previous
        id: existingShippingAddress?.id || 0,
        rowVersion: existingShippingAddress?.rowVersion || '',
        suite: existingShippingAddress?.suite || '',
        fax: existingShippingAddress?.fax || '',
        companyName: existingShippingAddress?.companyName || '',
        isDefault: existingShippingAddress?.isDefault || true,
        //
        location: `${location.city}, ${location.region}, ${location.country}, ${location.postal_code}`,
        ipAddress: location.ip_address,
        // Static
        recStatus: 'A',
        macAddress: '00-00-00-00-00-00',
        addressType: UserAddressType.SHIPPINGADDRESS,
      },
    };

    return await Promise.allSettled([
      decideToAddOrUpdateTheAddress(
        billingPayload,
        !!existingBillingAddress?.id,
      ),
      decideToAddOrUpdateTheAddress(
        shippingPayload,
        !!existingShippingAddress?.id,
      ),
    ]);
  };

  const updateShippingAddressAsBillingAddress = async (
    billingPayload: AddressAPIRequest,
  ) => {
    const shippingPayload: AddressAPIRequest = {
      storeCustomerAddressModel: {
        ...billingPayload.storeCustomerAddressModel,
        id: 0,
        recStatus: 'A',
        rowVersion: '',
        isDefault: Object.keys(existingShippingAddress || {})?.length
          ? false
          : true,
        addressType: UserAddressType.SHIPPINGADDRESS,
      },
    };

    return await Promise.allSettled([
      decideToAddOrUpdateTheAddress(
        billingPayload,
        !!existingBillingAddress?.id,
      ),
      CreateUserAddress(shippingPayload),
    ]);
  };

  const updateAddresses = async () => {
    const location = await getLocation();
    const billingAddress = billingValues();
    const billingPayload: AddressAPIRequest = {
      storeCustomerAddressModel: {
        customerId: +userId || +tempId,
        email: billingAddress.email || '',
        //
        firstname: billingAddress.firstname,
        lastName: billingAddress.lastName,
        address1: billingAddress.address1,
        address2: billingAddress.address2 || '',
        city: billingAddress.city,
        state: billingAddress.state,
        postalCode: billingAddress.postalCode,
        phone: billingAddress.phone,
        countryName: billingAddress.countryName || '',
        countryCode: billingAddress.countryCode,
        //
        location: `${location.city}, ${location.region}, ${location.country}, ${location.postal_code}`,
        ipAddress: location.ip_address,
        // previous data
        id: existingBillingAddress?.id || 0,
        fax: existingBillingAddress?.fax || '',
        suite: existingBillingAddress?.suite || '',
        rowVersion: existingBillingAddress?.rowVersion || '',
        companyName: existingBillingAddress?.companyName || '',
        isDefault: existingBillingAddress?.isDefault || true,
        // Static
        macAddress: '00-00-00-00-00-00',
        recStatus: 'A',
        addressType: UserAddressType.BILLINGADDRESS,
      },
    };

    if (address.useBillingAddressForShipping) {
      return await updateShippingAddressAsBillingAddress(billingPayload);
    }
    return await updateBothAddress(billingPayload, location);
  };

  const addressOnSubmit = async () => {
    try {
      const address = await updateAddresses();
      if (address[0].status === 'fulfilled') {
        dispatch(
          update_CheckoutAddress({
            type: 'BILLING_ADDRESS',
            address: { ...address[0].value, CompanyName: '' },
          }),
        );
      }
      if (address[1].status === 'fulfilled') {
        dispatch(
          update_CheckoutAddress({
            type: 'SHIPPING_ADDRESS',
            address: { ...address[1].value, CompanyName: '' },
          }),
        );
      }

      dispatch(
        update_CheckoutAddress({
          type: 'CHECKOUT_ADDRESS_IS_SAVED',
          value: true,
        }),
      );
    } catch (error) {
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

  const callStatesAPI = async (
    id: number,
    setDefault: boolean,
    formik: any,
  ) => {
    await FetchStatesList(id).then((response) => {
      if (!response) return;

      setStates(response);

      if (setDefault) {
        formik('state', response[0].name);
      }
    });
  };

  const fetchCountriesNstates = async (address: CustomerAddress[] | null) => {
    const billAddress = address?.find((addr) => {
      if (addr.isDefault && addr.addressType === 'B') {
        return true;
      }
      return false;
    });
    const shipAddress = address?.find((addr) => {
      if (addr.isDefault && addr.addressType === 'S') {
        return true;
      }

      return false;
    });
    await FetchCountriesList().then((response) => {
      if (!response) return;
      if (billAddress) {
        setCountries(response);
        const country = response.find(
          (country) => country.name === billAddress.countryName,
        );

        setBillingValue('countryName', country?.name || response[0].name);
        setBillingValue(
          'countryCode',
          country?.id.toString() || response[0].id.toString(),
        );
        setBillingValue('state', billAddress.state);

        callStatesAPI(country?.id || response[0].id, false, setBillingValue);
      } else {
        setBillingValue('countryName', response[0].name);
        setBillingValue('countryCode', response[0].id.toString());

        // State
        +callStatesAPI(response[0].id, true, setBillingValue);
      }

      if (shipAddress) {
        setCountries(response);
        const country = response.find(
          (country) => country.name === shipAddress.countryName,
        );

        setShippingValue('countryName', country?.name || response[0].name);
        setShippingValue(
          'countryCode',
          country?.id.toString() || response[0].id.toString(),
        );
        setShippingValue('state', shipAddress.state);

        callStatesAPI(country?.id || response[0].id, false, setShippingValue);
      } else {
        setShippingValue('countryName', response[0].name);
        setShippingValue('countryCode', response[0].id.toString());

        // State
        callStatesAPI(response[0].id, true, setShippingValue);
      }

      // Country
      setCountries(response);
    });
  };

  const seperateOutAddress = (address: CustomerAddress[]) => {
    let shippingAddress: CustomerAddress[] = [];
    let billingAddress: CustomerAddress[] = [];
    address.forEach((item, index) => {
      if (item.addressType === 'B') {
        billingAddress.push(item);
      }
      if (item.addressType === 'S') {
        shippingAddress.push(item);
      }
    });
    setShippingAddress(shippingAddress);
    setBillingAddress(billingAddress);
  };

  const editAddress = () => {
    setShowRemoveModal(false);
    dispatch(
      update_CheckoutAddress({
        type: 'CHECKOUT_ADDRESS_IS_SAVED',
        value: false,
      }),
    );
  };

  const postalCodeHandler = (
    e: React.FocusEvent<HTMLInputElement>,
    addressType: string,
  ) => {
    const zipCode = e.target.value;
    // console.log(zipCode, 'this is zip');
    let formik: any, watch: any;

    if (addressType === 'SHIP') {
      formik = setShippingValue;
      watch = shippingWatch;
    } else if (addressType === 'BILL') {
      formik = setBillingValue;
      watch = billingWatch;
    } else {
      formik = setAddAddressValue;
      watch = addAddressWatch;
    }

    // formik.handleBlur(e);
    if (zipCode.trim().length === 0) return;

    //
    dispatch(showLoader(true));
    getLocationWithZipCode(zipCode)
      .then((res) => {
        if (!res) return;

        // City
        if (res.cityName) {
          formik('city', res.cityName);
        }

        if (res.countryName !== watch('countryName')) {
          callStatesAPI(res.countryId, false, formik);
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
      })
      .finally(() => dispatch(showLoader(false)));
  };

  const onChangeHandler = (
    name: ModalScreens | null,
    editAddress?: CustomerAddress,
  ) => {
    setModal(name);
    if ((name === 'EDITBILLING' || name === 'EDITSHIPPING') && editAddress) {
      setSelectedAddress(editAddress);
      addAddressReset({
        firstname: editAddress?.firstname || '',
        lastName: editAddress?.lastName || '',
        address1: editAddress?.address1 || '',
        address2: editAddress?.address2 || '',
        city: editAddress?.city || '',
        state: editAddress?.state || '',
        postalCode: editAddress?.postalCode || '',
        phone: editAddress?.phone || '',
        email: editAddress?.email || '',
        countryName: editAddress?.countryName || '',
        countryCode: editAddress?.countryCode || '',
      });
    }
    if (modal === null) {
      addAddressReset();
    }
  };

  const addressClickHandler = (
    item: CustomerAddress,
    name: 'SHIPPING' | 'BILLING',
  ) => {
    if (name === 'BILLING') {
      dispatch(
        update_CheckoutAddress({ type: 'BILLING_ADDRESS', address: item }),
      );
      billingReset({
        firstname: item?.firstname || '',
        lastName: item?.lastName || '',
        address1: item?.address1 || '',
        address2: item?.address2 || '',
        city: item?.city || '',
        state: item?.state || '',
        postalCode: item?.postalCode || '',
        phone: item?.phone || '',
        email: item?.email || '',
        countryName: item?.countryName || '',
        countryCode: item?.countryCode || '',
      });
    } else {
      dispatch(
        update_CheckoutAddress({ type: 'SHIPPING_ADDRESS', address: item }),
      );
      shippingReset({
        firstname: item?.firstname || '',
        lastName: item?.lastName || '',
        address1: item?.address1 || '',
        address2: item?.address2 || '',
        city: item?.city || '',
        state: item?.state || '',
        postalCode: item?.postalCode || '',
        phone: item?.phone || '',
        email: item?.email || '',
        countryName: item?.countryName || '',
        countryCode: item?.countryCode || '',
      });
    }
    setModal(null);
  };

  const addAddressRequestHandler = async (methodName: string) => {
    const data = await getLocation();
    dispatch(showLoader(true));

    const obj = {
      storeCustomerAddressModel: {
        id: selectedAddress ? selectedAddress.id : 0,
        rowVersion: selectedAddress ? selectedAddress.rowVersion : '',
        location: `${data.city}, ${data.region}, ${data.country}, ${data.postal_code}`,
        ipAddress: data.ip_address,
        macAddress: '00-00-00-00-00-00',
        customerId: +userId || +tempId || 0,
        firstname: addAddressValues().firstname,
        lastName: addAddressValues().lastName,
        email: addAddressValues().email || '',
        address1: addAddressValues().address1,
        address2: addAddressValues().address2 || '',
        suite: '',
        city: addAddressValues().city,
        state: addAddressValues().state,
        postalCode: addAddressValues().postalCode,
        phone: addAddressValues().phone,
        fax: selectedAddress ? selectedAddress.fax : '',
        countryName: addAddressValues().countryName,
        countryCode: addAddressValues().countryCode,
        addressType:
          modal === 'EDITSHIPPING' || modal === 'ADDSHIPPING' ? 'S' : 'B',
        isDefault: selectedAddress ? selectedAddress.isDefault : true,
        recStatus: 'A',
        companyName: '',
      },
    };

    const isExist =
      obj?.storeCustomerAddressModel?.addressType === 'S'
        ? shippingAddress?.find(
            (e: any) =>
              e.address1 === obj?.storeCustomerAddressModel?.address1 &&
              e.city === obj?.storeCustomerAddressModel?.city &&
              e.state === obj?.storeCustomerAddressModel?.state &&
              e.postalCode === obj?.storeCustomerAddressModel?.postalCode,
          )
        : billingAddress?.find(
            (e: any) =>
              e.address1 === obj?.storeCustomerAddressModel?.address1 &&
              e.city === obj?.storeCustomerAddressModel?.city &&
              e.state === obj?.storeCustomerAddressModel?.state &&
              e.postalCode === obj?.storeCustomerAddressModel?.postalCode,
          );

    if (isExist?.firstname) {
      dispatch(
        openAlertModal({
          title: 'Error',
          description: 'This address already exists.',
          isAlertModalOpen: true,
        }),
      );
      setModal(null);
      addAddressReset();
    } else if (methodName === 'UPDATE') {
      await UpdateUserAddress(obj)
        .then(() => {
          dispatch(
            openAlertModal({
              title: 'Success',
              description: 'Successfully Updated Address',
              isAlertModalOpen: true,
            }),
          ),
            setModal(null);
        })
        .catch((error) => {
          const errorMsg = error
            ? Object?.values(error)[0]
            : 'Something went wrong';
          dispatch(showLoader(false));
          dispatch(
            openAlertModal({
              title: 'Error',
              description: errorMsg,
              isAlertModalOpen: true,
            }),
          );
        });
    } else {
      await CreateUserAddress(obj)
        .then((res) => {
          dispatch(
            openAlertModal({
              title: 'Success',
              description: 'Successfully added Address',
              isAlertModalOpen: true,
            }),
          ),
            setModal(null);
          addAddressReset();
        })
        .catch((error) => {
          const errorMsg = error
            ? Object?.values(error)[0]
            : 'Something went wrong';
          dispatch(showLoader(false));
          dispatch(
            openAlertModal({
              title: 'Error',
              description: errorMsg,
              isAlertModalOpen: true,
            }),
          );
        });
    }

    await getUserDetailsById(+userId || +tempId)
      .then((res) => {
        if (res?.customerAddress) {
          seperateOutAddress(res?.customerAddress);
        }
      })
      .catch((error) => {
        const errorMsg = error
          ? Object?.values(error)[0]
          : 'Something went wrong';
        dispatch(showLoader(false));
        dispatch(
          openAlertModal({
            title: 'Error',
            description: errorMsg,
            isAlertModalOpen: true,
          }),
        );
      });
    dispatch(showLoader(false));
    setModal(null);
  };

  const countryHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
    addressType: string,
  ) => {
    let country = countries.find((item) => item.name === e.target.value);
    let formik: any;
    let value: any;
    if (addressType === 'SHIP') {
      formik = setShippingValue;
      value = shippingValues();
    } else if (addressType === 'BILL') {
      formik = setBillingValue;
      value = billingValues();
    } else {
      formik = setAddAddressValue;
      value = addAddressValues();
    }
    if (country) {
      formik('countryName', country.name);
      formik('countryCode', country.id);

      if (country.name !== value.countryName) {
        formik('state', '');
        callStatesAPI(country.id, true, formik);

        // formik.setFieldTouched('state', true);
      }
    } else {
      setStates([]);
      formik('countryName', '');
      formik('countryCode', '');
      formik('state', '');
    }
  };

  const checkCartProductsAvailability = async () => {
    const payload = {
      storeId: storeId,
      customerId: +userId || +tempId || 0,
      shipToState: existingShippingAddress?.state || shippingValues().state,
    };
    const response = await checkCartProducts(payload);
    if (response && response.length > 0) {
      setRemoveCartProducts(response);
      let productNames = '';
      let count = 0;
      response.forEach((item, index) => {
        count++;
        productNames =
          productNames +
          item.productName +
          `${response.length > 1 && index !== response.length - 1 ? ', ' : ''}`;
      });
      setRemoveMessage(
        ` ${productNames} ${
          count > 1 ? 'are' : 'is'
        }  not available in your shipping State.\n Click Okay to remove from cart.\n Click Cancel to Change State.`,
      );
      setShowRemoveModal(true);
    }
  };
  const removeItems = async () => {
    await Promise.all(
      removeCartProducts.map((item) => {
        return deleteCartItem(item.shoppingCartItemsId);
      }),
    ).then(() => {
      setShowRemoveModal(false), router.push(paths.cart);
    });
  };

  useEffect(() => {
    getUserDetailsById(+userId).then((res) => {
      if (res?.customerAddress) {
        fetchCountriesNstates(res.customerAddress);
        seperateOutAddress(res.customerAddress);
      } else {
        fetchCountriesNstates(null);
      }
    });
  }, [userId]);

  useEffect(() => {
    if (shippingAddress?.length) convertIntoShippingInitials();
  }, [shippingAddress]);

  useEffect(() => {
    if (billingAddress?.length) convertIntoBillingInitials();
  }, [billingAddress]);

  useEffect(() => {
    if (shippingAddress.length && billingAddress.length) {
      const shippingDefault = shippingAddress.filter((item) => item.isDefault);
      const billingDefault = billingAddress.filter((item) => item.isDefault);
      if (shippingDefault.length > 0 && billingDefault.length > 0) {
        dispatch(
          update_CheckoutAddress({
            type: 'CHECKOUT_ADDRESS_IS_SAVED',
            value: true,
          }),
        );
      }
    }
  }, [shippingAddress, billingAddress]);

  useEffect(() => {
    if (
      existingShippingAddress &&
      orderSubTotal &&
      isShippingChargeFetched.current !==
        existingShippingAddress?.postalCode?.toString()
    ) {
      isShippingChargeFetched.current =
        existingShippingAddress?.postalCode?.toString() || '';
      const shippingChargeType = getShippingType();
      const payload = {
        shippingMethodModel: {
          city: existingShippingAddress?.city,
          state: existingShippingAddress?.state,
          country: existingShippingAddress?.countryName,
          zipCode: existingShippingAddress?.postalCode,
          customerID: +userId || +tempId,
          storeId: storeId,
          ordertotalwithoutshipppingcharge: orderSubTotal + tax,
          shippingType: shippingChargeType,
        },
      };

      if (userId || tempId)
        GetShippingmethod(payload)
          .then((res) => {
            dispatch(addShippingChargeList(res));
          })
          .catch((err) => {
            dispatch(
              openAlertModal({
                title: 'Error',
                description: err,
                isAlertModalOpen: true,
              }),
            );
          });

      checkCartProductsAvailability();
    }
  }, [existingShippingAddress, orderSubTotal]);

  const errorMessage = (formErrors: any, isShipping: boolean) => {
    let errors: string[] = [];
    for (const items in formErrors) {
      errors.push(updatedKeyName(items));
    }

    let errorMessage = '';
    if (errors?.length) {
      errorMessage = `Please Add ${errors.join(', ')} in ${
        isShipping ? 'Shipping' : 'Billing'
      } Address`;
    }
    return errorMessage;
  };
  return cases.ready({
    Controller,
    shippingErrors,
    billingErrors,
    shippingTouchedFields,
    billingTouchedFields,
    billingControl,
    shippingControl,
    countries,
    states,
    postalCodeHandler,
    countryHandler,
    handleShippingAsBilling,
    billingAddress,
    shippingAddress,
    sendSpecialOffersHandler,
    addressOnSubmit,
    shippingSubmitHandle,
    billingSubmitHandle,
    billingValues,
    shippingValues,
    editAddress,
    onChangeHandler,
    modal,
    addressClickHandler,
    showRemoveModal,
    removeItems,
    removeMessage,
    addAddressSubmitHandle,
    addAddressControl,
    addAddressValues,
    addAddressErrors,
    addAddressTouchedFields,
    addAddressRequestHandler,
    errorMessage,
  });
};

export default CheckoutAddressController;
