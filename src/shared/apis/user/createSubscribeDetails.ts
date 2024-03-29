import { apiRoutes } from '@/api/apiRoutes';
import { SendAsync } from '@/shared/utils/axios';

export const createSubscribeDetails = async (
  payload: _createSubscribeDetailsFields,
): Promise<string | null> => {
  const url = apiRoutes.createSubscribeDetails;

  const response = await SendAsync<any>({
    url,
    method: 'POST',
    data: payload,
  });

  return response;
};

export interface _createSubscribeDetailsFields {
  subscribeDetailsModel: {
    rowVersion: string;
    location: string;
    ipAddress: string;
    macAddress: string;
    id: number;
    storeId: number;
    customerId: number;
    isEmailNoLimit: boolean;
    isEmailNoOnceWeek: boolean;
    isEmailNoOnceMonth: boolean;
    isEmailUnsubscribeMarketing: boolean;
    isContentNoPrefrence: boolean;
    isContentPromotionalEmails: boolean;
    isContentProductReviewEmails: boolean;
    isPhoneCallsEventsOrdersToBirthday: boolean;
    recStatus: string;
  };
}
