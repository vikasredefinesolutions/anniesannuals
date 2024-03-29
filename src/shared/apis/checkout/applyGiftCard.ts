import { SendAsync } from '@/shared/utils/axios';

export interface IGiftCard {
  giftCardModel: {
    customerID: number;
    storeId: number;
    giftCardSerialNo: string;
    amountToBeApply: number;
    emailId: string;
  };
}

export interface OGiftCard {
  giftCardSerialNo: string;
  giftCardId: number;
  giftCardAmount: number;
  expiryDate: string;
}

export interface IGiftCardCheck {
  giftCardModel: {
    storeId: number;
    giftCardSerialNo: string;
  };
}

export const applyGiftCard = async (request: IGiftCard) => {
  const url = `/GiftCard/getgiftcarddetails.json`;
  const res: OGiftCard = await SendAsync<OGiftCard>({
    url: url,
    method: 'POST',
    data: request,
  });

  return res;
};

export const checkGiftCard = async (request: IGiftCardCheck) => {
  const url = `/GiftCard/checkWTGbalance/${request.giftCardModel.giftCardSerialNo}/${request.giftCardModel.storeId}/test.json`;
  const res: string = await SendAsync<string>({
    url: url,
    method: 'POST',
  });

  return res;
};
