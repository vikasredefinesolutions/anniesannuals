'use client';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import { addGiftCardToCart } from '@/shared/apis/giftCardDetails/addGiftCardToCart';
import {
  GiftCardDetails,
  getGiftCardDetails,
} from '@/shared/apis/giftCardDetails/getGiftCardDetails';
import { USER_ID } from '@/shared/utils/cookie.helper';
import storeDetails from '@/staticData/storeDetails.json';
import { getLocation } from '@/utils/helpers';
import { yupResolver } from '@hookform/resolvers/yup';
import { getCookie } from 'cookies-next';
import { useParams } from 'next/navigation';
import React, { ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import InitialValidationSchema, { _GiftCardDetailsConfig } from './config';

interface _Helpers {
  hookForm: {
    errors: any;
    register: any;
    handleSubmit: any;
  };
  errorMessage: null | string;
  setErrorMessage: Function;
  GiftCardData: GiftCardDetails | undefined;
  onSubmit: any;
  config?: _GiftCardDetailsConfig;
  onChange: () => void;
}

type _GiftCardDetailsProps = {
  config: _GiftCardDetailsConfig;
  cases: {
    view: (helpers: _Helpers) => ReactElement<any, any>;
  };
};
const GiftCardDetailsController: React.FC<_GiftCardDetailsProps> = ({
  cases,
  config,
}) => {
  const params = useParams();
  const slug = params['slug']?.[0];

  const schema = yup.object(InitialValidationSchema(config));

  const [errorMessage, setErrorMessage] = useState(null);
  const [GiftCardData, setGiftCardData] = useState<GiftCardDetails>();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchGiftCardData = async () => {
      try {
        const response = await getGiftCardDetails(slug, storeDetails.storeId);
        setGiftCardData(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGiftCardData();
  }, []);

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
      subjectLine: 'Enter Your Gift Card Email Subject Line',
    },
  });

  let userId = getCookie(USER_ID);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = hookForm;

  const onSubmit = async (values: any) => {
    const data = getLocation();
    let payload: any = {
      addToCartModel: {
        customerId: userId,
        productId: GiftCardData?.id,
        storeId: storeDetails.storeId,
        isempLogin: false,
        ipAddress: data?.ip_address,
        isForm: false,
        shoppingCartItemModel: {
          id: 0,
          price: GiftCardData?.salePrice,
          quantity: 1,
          weight: 0,
          productType: 0,
          discountPrice: 0,
          logoTitle: '',
          logogImagePath: GiftCardData?.imageName,
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
            attributeOptionName: 'Name^Email^Message^SubjectLine',
            attributeOptionValue: `${values.firstName} ${values.lastName}^${values.email}^${values.message}^${values.subjectLine}`,
            attributeOptionId: '0',
          },
        ],
        cartLogoPersonModel: [],
      },
    };

    try {
      await addGiftCardToCart(payload);
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
    hookForm: { register, errors, handleSubmit },
    onChange,
    onSubmit,
    config,
    setErrorMessage,
    GiftCardData,
  });
};

export default GiftCardDetailsController;
