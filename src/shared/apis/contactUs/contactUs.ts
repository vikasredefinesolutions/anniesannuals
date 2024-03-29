import { apiRoutes } from '@/api/apiRoutes';
import { SendAsync } from '@/shared/utils/axios';

export interface _ContactUs {
  contactUsModel: {
    rowVersion: string;
    location: string;
    ipAddress: string;
    macAddress: string;
    id: number;
    name: string;
    email: string;
    subject: string;
    address: string;
    city: string;
    county: string;
    state: string;
    zipCode: string;
    phone: string;
    comment?: string;
    storeId: number;
    recStatus: string;
    companyName: string;
    isReferral: boolean;
  };
}

export const postContactUsData = async (payload: _ContactUs) => {
  try {
    const res = await SendAsync<_ContactUs>({
      url: apiRoutes.postCreateContactUs,
      method: 'POST',
      data: payload,
    });
    return res;
  } catch (error: any) {
    throw error;
  }
};
