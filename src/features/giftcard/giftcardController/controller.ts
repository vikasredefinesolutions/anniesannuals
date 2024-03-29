'use client';
import { showLoader } from '@/app/redux/slices/commonSlice';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import { checkGiftCard } from '@/shared/apis/checkout/applyGiftCard';
import { AddGiftCardOrVoucher } from '@/shared/apis/giftCard/addGiftCardOrVoucher';
import { getCustomerGiftCardOrVoucher } from '@/shared/apis/giftCard/getCustomerGiftCardOrVoucher';
import {
  FetchCustomerStoreCredits,
  FetchStoreCredit,
  StoreCredit,
} from '@/shared/apis/storeCredits/fetchCustomerCredit';
import { USER_ID } from '@/shared/utils/cookie.helper';
import storeDetails from '@/staticData/storeDetails.json';
import { IGiftCard } from '@/stores/annies/shared/Home/Cards/GiftCard';
import { yupResolver } from '@hookform/resolvers/yup';
import { getCookie } from 'cookies-next';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { _GiftCardconfig, initialValidationScheme } from './config';

interface _GiftCardHelpers {
  hookForm: {
    errors: any;
    register: any;
    handleSubmit: any;
    reset: any;
    setValue: any;
  };
  errorMessage: null | string;
  onSubmit: any;
  cards: IGiftCard[];
  isShowVoucher: boolean;
  applyGiftCardDiscount: () => void;
  giftCardValue: string;
  balance: number;
  giftCouponNameChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setIsShowVoucher: React.Dispatch<React.SetStateAction<boolean>>;
  showAddGiftCard: boolean;
  setShowAddGiftcard: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: Function;
  config: _GiftCardconfig;
  onChange: any;
  customerStoreCredit: _CustomerCreditBalance;
  storeCredit: StoreCredit;
}

interface _CustomerCreditBalance {
  customerID: number;
  storeCreditRefundBalance: number;
  giftCardWalletBalance: number;
}

type SubmitPayload = {
  serialNo: string;
  pin: string;
  isGiftCardVoucher: boolean;
};

type _Props = {
  config: _GiftCardconfig;
  cases: {
    view: (helpers: _GiftCardHelpers) => ReactElement<any, any>;
  };
};

const GiftCardController: React.FC<_Props> = ({ cases, config }) => {
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [isShowVoucher, setIsShowVoucher] = useState(false);
  const [showAddGiftCard, setShowAddGiftcard] = useState(false);

  const { id: storeId } = storeDetails;
  const [customerStoreCredit, setCustomerStoreCredit] =
    useState<_CustomerCreditBalance>({
      customerID: 0,
      storeCreditRefundBalance: 0,
      giftCardWalletBalance: 0,
    });
  const [storeCredit, setStoreCredit] = useState<StoreCredit>({
    pageIndex: 0,
    pageSize: 0,
    totalCount: 0,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
    items: [
      {
        creditAmount: 0,
        balanceAmount: 0,
        reason: '',
        createdDate: '',
      },
    ],
  });
  const [cards, setCards] = useState<IGiftCard[]>([]);
  const [giftCardValue, setGiftCardValue] = useState<string>('');
  const [balance, setBalance] = useState<number>(0);

  const schema = yup.object(initialValidationScheme(config));
  const loginUserId = getCookie(USER_ID);
  const dispatch = useDispatch();

  const fetchGiftCards = useCallback(async () => {
    try {
      const response = await getCustomerGiftCardOrVoucher(
        Number(loginUserId),
        storeDetails.storeId,
      );
      setCards(response);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchStoreCustomerCredit = async () => {
    try {
      if (loginUserId) {
        let payload = {
          storeId: +storeDetails.storeId,
          customerId: +loginUserId,
        };
        const creditRes = await FetchCustomerStoreCredits(payload);
        setCustomerStoreCredit(creditRes);
      }
    } catch (err) {
      throw new Error('Something went wrong');
    }
  };

  const fetchStoreCredit = async () => {
    try {
      if (loginUserId) {
        let payload = {
          args: {
            pageIndex: 0,
            pageSize: 0,
            pagingStrategy: 0,
            sortingOptions: [
              {
                field: 'string',
                direction: 0,
                priority: 0,
              },
            ],
            filteringOptions: [
              {
                field: 'string',
                operator: 0,
                value: 'string',
              },
            ],
          },
          customerId: +loginUserId,
        };
        const creditResponse = await FetchStoreCredit(payload);
        setStoreCredit(creditResponse);
      }
    } catch (error: any) {
      throw new Error('Something went wrong', error);
    }
  };

  const applyGiftCardDiscount = async () => {
    dispatch(showLoader(true));
    try {
      const payload = {
        giftCardModel: {
          storeId: storeId || 5,
          giftCardSerialNo: giftCardValue.split(' ').join(''),
        },
      };

      const response = await checkGiftCard(payload);
      if (response && response !== '') {
        setBalance(+response);
      } else {
        setBalance(0);
      }

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

  useEffect(() => {
    fetchStoreCustomerCredit();
    fetchStoreCredit();
  }, []);

  useEffect(() => {
    fetchGiftCards();
  }, [fetchGiftCards]);

  const hookForm = useForm({
    resolver: yupResolver(schema),
    defaultValues: { serialNo: '', pin: '123', isGiftCardVoucher: false },
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = hookForm;

  const onChange = () => {
    setErrorMessage(null);
  };

  const onSubmit = async (values: SubmitPayload) => {
    let payload: any = {
      id: 0,
      customerId: Number(loginUserId) || 0,
      serialNo: values?.serialNo,
      storeId: 5,
      isGiftCardVoucher: values?.isGiftCardVoucher,
      recStatus: 'A',
      location: 'Ahmedabad',
      ipAddress: '192.168.1.1',
      macAddress: '00-00-00-00-00-00',
      pin: '',
    };
    let response;

    if (!isShowVoucher) {
      payload = { ...payload, pin: values?.pin };
    }

    try {
      response = await AddGiftCardOrVoucher({
        customerGiftCardOrVoucherModel: payload,
      });
    } catch (error: any) {
      dispatch(
        openAlertModal({
          title: 'Error',
          description:
            error['customerGiftCardOrVoucherModel.SerialNo'] ||
            'Something went wrong',
          isAlertModalOpen: true,
        }),
      );
    }
    if (response?.serialNo) {
      setShowAddGiftcard(false);
      fetchGiftCards();
    }
  };

  const giftCouponNameChangeHandler = (
    name: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setGiftCardValue(name.target.value);
  };

  return cases.view({
    hookForm: { register, errors, handleSubmit, reset, setValue },
    config,
    showAddGiftCard,
    setShowAddGiftcard,
    errorMessage,
    applyGiftCardDiscount,
    giftCardValue,
    balance,
    giftCouponNameChangeHandler,
    onChange,
    cards,
    onSubmit,
    isShowVoucher,
    setIsShowVoucher,
    setErrorMessage,
    customerStoreCredit,
    storeCredit,
  });
};
export default GiftCardController;
