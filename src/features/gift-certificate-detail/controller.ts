'use client';
import { useAppDispatch } from '@/app/redux/hooks';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import { FetchStatesList } from '@/shared/apis/checkout/fetchStateList';
import { getLocationWithZipCode } from '@/shared/apis/checkout/getLocationWithZipCode';
import { addGiftCardToCart } from '@/shared/apis/giftCardDetails/addGiftCardToCart';
import {
  GetGiftCard,
  getGiftCardListing,
} from '@/shared/apis/giftCardListing/getGiftCardListing';
import { USER_ID, getStoreId } from '@/shared/utils/cookie.helper';
import useModel from '@/stores/annies/shared/hooks/use-model';
import { getLocation } from '@/utils/helpers';
import { yupResolver } from '@hookform/resolvers/yup';
import { getCookie } from 'cookies-next';
import React, { ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InitialValidationSchema, { _GiftCardDetailsConfig } from './config';

interface GetStateListProps {
  id: number;
  name: string;
}
interface _Helpers {
  hookForm: {
    errors: any;
    register: any;
    handleSubmit: any;
    setValue: any;
    watch: any;
  };
  errorMessage: null | string;
  setErrorMessage: Function;
  zipCodeHandler: (value: string) => void;
  giftCardListingData: any[];
  onSubmit: any;
  getStateList: GetStateListProps[];
  updateCity: string;
  updateState: string;
  config?: _GiftCardDetailsConfig;
  onChange: () => void;
  isOpen: any;
  onRequestClose: any;
}

type _GiftCardDetailsProps = {
  config: _GiftCardDetailsConfig;
  cases: {
    view: (helpers: _Helpers) => ReactElement<any, any>;
  };
};
const GiftCertificateDetailsController: React.FC<_GiftCardDetailsProps> = ({
  cases,
  config,
}) => {
  const storeId = getStoreId();
  const [updateCity, setUpdateCity] = useState('');
  const [updateState, setUpdateState] = useState('');
  const [getStateList, setGetStateList] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const data = getLocation();
  const [GiftCardsListing, setGiftCardsListing] = useState<GetGiftCard[]>([]);
  const { openModel, isOpen, onRequestClose } = useModel();

  useEffect(() => {
    const fetchGiftCardData = async () => {
      try {
        const response = await getGiftCardListing({ storeId });
        setGiftCardsListing(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGiftCardData();
  }, []);

  const zipCodeHandler = (zipCode: string) => {
    if (zipCode.length !== 5 && zipCode.length !== 6) return;
    try {
      getLocationWithZipCode(zipCode).then((res) => {
        if (!res) return;
        if (res.cityName) {
          setUpdateCity(res.cityName);
        }
        if (res.stateName) {
          setUpdateState(res.stateName);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const FetchStateList = async () => {
      try {
        const stateResponse = await FetchStatesList(1);
        if (stateResponse) {
          setGetStateList(stateResponse);
        }
      } catch (error) {
        console.log(error);
      }
    };
    FetchStateList();
  }, []);

  const schema = yup.object(InitialValidationSchema(config));

  const [errorMessage, setErrorMessage] = useState(null);

  const onChange = () => {
    setErrorMessage(null);
  };

  const hookForm = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      message: '',
      address1: '',
      address2: '',
      city: '',
      confirmEmail: '',
      state: '',
      zipCode: '',
      subjectLine: 'Enter Your Gift Card Email Subject Line',
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = hookForm;

  let userId = getCookie(USER_ID);

  const onSubmit = async (values: any) => {
    const isEgiftCard = values.eGiftCardValue ? true : false;

    const GiftCardData = GiftCardsListing?.find((data) =>
      isEgiftCard
        ? data.name === 'E Gift Card'
        : data.name.startsWith(values.imageText),
    );

    const sendType = isEgiftCard
      ? 'Send gift card to email address only'
      : 'Send gift card to a physical address';
    let payload: any = {
      addToCartModel: {
        customerId: userId,
        productId: GiftCardData?.productId,
        storeId: storeId,
        isempLogin: false,
        ipAddress: data?.ip_address,
        isForm: false,
        shoppingCartItemModel: {
          id: 0,
          price: values.eGiftCardValue || values.mailGiftCardValue,
          quantity: 1,
          weight: 0,
          productType: 0,
          discountPrice: 0,
          logoTitle: '',
          logogImagePath: GiftCardData?.image,
          perQuantity: 0,
          appQuantity: 0,
          status: 0,
          discountPercentage: 0,
          productCustomizationId: 0,
          itemNotes: '',
          isEmployeeLoginPrice: false,
        },
        shoppingCartItemsDetailModels: [
          {
            attributeOptionName:
              'Name^Email^Message^SendType^SubjectLine^ImageText^Address1^Address2^City^State^Zipcode',
            attributeOptionValue: `${values.firstName} ${values.lastName}^${values.email}^${values.message}^${sendType}^${values.subjectLine}^${values.imageText}^${values.address1}^${values.address2}^${values.city}^${values.state}^${values.zipCode}`,
            attributeOptionId: '0',
          },
        ],
        cartLogoPersonModel: [],
      },
    };
    try {
      if (userId) {
        await addGiftCardToCart(payload);
        openModel();
      } else {
        dispatch(
          openAlertModal({
            title: 'Error',
            description: ' Please login to Purchase gift card',
            isAlertModalOpen: true,
          }),
        );
      }
      reset();
    } catch (error: any) {
      dispatch(
        openAlertModal({
          title: 'Error',
          description:
            error?.response.data['Errors']['Error'] || 'Something went wrong!',
          isAlertModalOpen: true,
        }),
      );
    }
  };

  return cases.view({
    errorMessage,
    hookForm: {
      register,
      errors,
      handleSubmit,
      setValue,
      watch,
    },
    onChange,
    onSubmit,
    config,
    getStateList,
    setErrorMessage,
    zipCodeHandler,
    updateCity,
    updateState,
    giftCardListingData: GiftCardsListing,
    isOpen,
    onRequestClose,
  });
};

export default GiftCertificateDetailsController;
