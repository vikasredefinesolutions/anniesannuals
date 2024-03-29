import { apiRoutes } from '@/api/apiRoutes';
import { SendAsync } from '@/shared/utils/axios';

interface _AddGiftCardOrVoucherInput {
  customerGiftCardOrVoucherModel: {
    id: number;
    customerId: number;
    serialNo: string;
    pin?: string;
    storeId: number;
    isGiftCardVoucher: boolean;
    recStatus: string;
    location: string;
    ipAddress: string;
    macAddress: string;
  };
}

export interface _AddGiftCardOrVoucherOutPut {
  customerId: number;
  id: number;
  ipAddress: string;
  isGiftCardVoucher: true;
  location: string;
  macAddress: string;
  pin: string;
  recStatus: string;
  serialNo: string;
  storeId: number;
}

export const AddGiftCardOrVoucher = async (
  payload: _AddGiftCardOrVoucherInput,
) => {
  try {
    const res = await SendAsync<_AddGiftCardOrVoucherOutPut>({
      url: apiRoutes.addGiftCard,
      method: 'POST',
      data: payload,
    });
    return res;
  } catch (error: any) {
    throw error
  }
};
