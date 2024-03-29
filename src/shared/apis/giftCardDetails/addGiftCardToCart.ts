import { apiRoutes } from '@/api/apiRoutes';
import { SendAsync } from '@/shared/utils/axios';

interface _AddGiftCardDetailsInput {
  addToCartModel: {
    customerId: number;
    productId: number;
    storeId: number;
    isempLogin: boolean;
    ipAddress: string;
    isForm: boolean;
    shoppingCartItemModel: {
      id: number;
      price: number;
      quantity: number;
      weight: number;
      productType: number;
      discountPrice: number;
      logoTitle: string;
      logogImagePath: string;
      perQuantity: number;
      appQuantity: number;
      status: number;
      discountPercentage: number;
      productCustomizationId: number;
      itemNotes: string;
      isEmployeeLoginPrice: false;
    };
    shoppingCartItemsDetailModels: [
      {
        attributeOptionName: string;
        attributeOptionValue: string;
        attributeOptionId: string;
      },
    ];
    cartLogoPersonModel: [];
  };
}

export const addGiftCardToCart = async (payload: _AddGiftCardDetailsInput) => {
  try {
    const res = await SendAsync({
      url: apiRoutes.addGiftCardDetails,
      method: 'POST',
      data: payload,
    });
    return res;
  } catch (error: any) {
    throw error;
  }
};
