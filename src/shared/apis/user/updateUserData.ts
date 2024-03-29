import { apiRoutes } from '@/api/apiRoutes';
import { IUserDetails } from '@/shared/types/user';
import { SendAsync } from '@/shared/utils/axios';

export const updateUserData = async (
  payload: _UpdateUserDataFields,
): Promise<IUserDetails | null> => {
  const url = apiRoutes.updateUserDetails;

  const response = await SendAsync<any>({
    url,
    method: 'POST',
    data: payload,
  });

  return response;
};

export interface _UpdateUserDataFields {
  customerId: number;
  firstName: string;
  lastName: string;
  companyName?: string;
  password: string;
  gender?: string;
  birthDate?: null;
  customerPhoneNumber?: string;
  jobTitle?: string;
}
