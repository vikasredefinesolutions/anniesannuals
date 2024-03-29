'use client';
import { addCartData } from '@/app/redux/slices/cartSlice';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import { addToCart } from '@/shared/apis/cart/addToCart';
import { getCartDetails } from '@/shared/apis/cart/fetchCartProducts';
import {
  IGardenProduct,
  IShopBGardenProductDetail,
} from '@/shared/types/product';
import {
  TEMPUSER_ID,
  getStoreId,
  getTempUserId,
  getUserId,
} from '@/shared/utils/cookie.helper';
import { GoogleAnalyticsTracker } from '@/shared/utils/googleAnalytics';
import { getPriceWithMsrpAndSalePrice } from '@/shared/utils/helper';
import { getLocation } from '@/utils/helpers';
import { setCookie } from 'cookies-next';
import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
interface _DetailsHelpers {
  config: {
    showDescription?: boolean;
    showRatings?: boolean;
  };
  GardenALLimage: any;
  addGardenToCart: (
    gardenProduct: IGardenProduct | undefined,
    salePrice: number,
    msrp: number,
  ) => void;
}
interface _Props {
  config: {
    showDescription?: boolean;
    showRatings?: boolean;
  };
  cases: {
    view: (helpers: _DetailsHelpers) => ReactElement<any, any>;
  };
  product: IShopBGardenProductDetail | null;
  openModel: () => void;
}
const GardenProductInfoController: React.FC<_Props> = ({
  cases,
  config,
  product,
  openModel,
}) => {
  const userId = getUserId();
  const tempId = getTempUserId();
  const GardenALLimage = product?.categoryModels.length
    ? [
        {
          displayOrder: 0,
          imageUrl: product?.categoryModels[0].categoryImagePath,
          altTag: product?.categoryModels[0].altTag,
          videoUrl: '',
        },
        ...product?.storeProductDetailsViewModels.flatMap((el) => {
          return el.attributeImagesViewModels;
        }),
      ]
    : product?.storeProductDetailsViewModels.flatMap((el) => {
        return el.attributeImagesViewModels;
      });
  const dispatch = useDispatch();

  const addGardenToCart = async (
    gardenProduct: IGardenProduct | undefined,
    salePrice: number,
    msrp: number,
  ) => {
    try {
      if (gardenProduct) {
        const storeId = getStoreId() || 5;
        const payload = {
          addToCartModel: {
            customerId: userId || +tempId,
            productId: gardenProduct?.id,
            storeId: storeId,
            ipAddress: getLocation().ip_address,

            shoppingCartItemModel: {
              price: +(getPriceWithMsrpAndSalePrice(salePrice, msrp) || 0),
              quantity: 1,
              // color image details don't get confused with name
              logoTitle: '',
              logogImagePath: gardenProduct?.categoryImagePath || '',
              id: 0,
              weight: 0,
              productType: 0,
              discountPrice: 0,
              perQuantity: 0,
              appQuantity: 0,
              status: 0,
              discountPercentage: 0,
              productCustomizationId: 0,
              itemNotes: '',
              isEmployeeLoginPrice: false,
            },
            shoppingCartItemsDetailModels: [],
            cartLogoPersonModel: [],

            // Static

            isempLogin: false,
            isForm: false,
          },
        };
        const data = await addToCart(payload);
        if (userId == 0) setCookie(TEMPUSER_ID, '' + data);
        dispatch(
          openAlertModal({
            title: 'Success',
            description: 'Added to cart successfully',
            isAlertModalOpen: true,
          }),
        );
        const cartGaPayload = {
          storeId: storeId,
          customerId: userId || 0,
          value: getPriceWithMsrpAndSalePrice(salePrice, msrp),
          coupon: '',
          shoppingCartItemsModel: [
            {
              productId: gardenProduct?.id,
              productName: gardenProduct?.categoryName,
              colorVariants: '',
              price: getPriceWithMsrpAndSalePrice(salePrice, msrp),
              quantity: 1,
            },
          ],
        };

        GoogleAnalyticsTracker('GoogleAddToCartScript', cartGaPayload);
      }
    } catch (error: any) {
      return dispatch(
        openAlertModal({
          title: 'Error',
          description: error[Object.keys(error)[0]] || 'Something Went Wrong',
          isAlertModalOpen: true,
        }),
      );
    }

    getCartDetails(+userId || +tempId, false)
      .then((res) => {
        if (res && res.length > 0) {
          dispatch(addCartData(res));
        }
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
    openModel();
  };

  return cases.view({
    config,
    GardenALLimage,
    addGardenToCart,
  });
};

export default GardenProductInfoController;
