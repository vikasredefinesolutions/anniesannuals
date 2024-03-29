import { SendAsync } from '@/shared/utils/axios';

export interface FetchSalesTaxPayload {
  customerId: number;
  zipCode: string;
  logoTotal: number;
  lineTotal: number;
  logoSetupCharge: number;
  shippingCharges: number;
  smallRunFee: number;
}

export const FetchSalesTax = async ({
  customerId,
  zipCode,
  logoTotal,
  lineTotal,
  logoSetupCharge,
  shippingCharges,
  smallRunFee,
}: FetchSalesTaxPayload): Promise<number> => {
  const url = `Store/Getsalestax/${customerId}/${zipCode}/${logoTotal}/${lineTotal}/${logoSetupCharge}/${shippingCharges}/${smallRunFee}.json`;

  const response = await SendAsync<number>({
    url: url,

    method: 'GET',
  });

  return response;
};
