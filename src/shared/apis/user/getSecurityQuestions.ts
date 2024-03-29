import { apiRoutes } from '@/api/apiRoutes';
import { SendAsync } from '@/shared/utils/axios';

export interface _SecurityQuestionArray {
  value: string;
  label: string;
}

export const getSecurityQuestions = async (): Promise<
  _SecurityQuestionArray[] | null
> => {
  const url = `${apiRoutes.fetchSecurityQuestionArr}`;

  const response = await SendAsync<_SecurityQuestionArray[]>({
    url,
    method: 'GET',
  });

  return response;
};
