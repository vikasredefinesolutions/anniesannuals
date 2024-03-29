import { apiRoutes } from '@/api/apiRoutes';
import { SendAsync } from '@/shared/utils/axios';

export const getDecryptPassword = async (
  password: string,
): Promise<string | null> => {
  const url = `${apiRoutes.decryptUserPassword}${password}`;

  const response = await SendAsync<any>({
    url,
    method: 'POST',
  });

  return response;
};
