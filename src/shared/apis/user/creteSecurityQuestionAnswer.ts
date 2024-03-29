import { apiRoutes } from '@/api/apiRoutes';
import { SendAsync } from '@/shared/utils/axios';

export interface _SecurityQuestionAnswerPayload {
  customerSecurityQuestionAnswerModel: _SecurityQuestionAnswer;
}

export interface _SecurityQuestionAnswer {
  id: number;
  storeId: number;
  customerID: number;
  securityQuestionMasterId: number;
  answer: string;
  recStatus: string;
  location: string;
  ipAddress: string;
  macAddress: string;
  rowVersion: string;
}

export const createSecurityQuestionAnswer = async (
  storeId: number,
  customerID: number,
  securityQuestionMasterId: string,
  answer: string,
): Promise<_SecurityQuestionAnswer | null> => {
  const url = `${apiRoutes.createSecurityQuestionAnswer}`;

  let payload: _SecurityQuestionAnswerPayload = {
    customerSecurityQuestionAnswerModel: {
      id: 0,
      storeId: storeId,
      customerID: customerID,
      securityQuestionMasterId: +securityQuestionMasterId,
      answer: answer,
      recStatus: 'A',
      location: '',
      ipAddress: '',
      macAddress: '',
      rowVersion: '',
    },
  };

  const response = await SendAsync<_SecurityQuestionAnswer>({
    url,
    method: 'POST',
    data: payload,
  });

  return response;
};
