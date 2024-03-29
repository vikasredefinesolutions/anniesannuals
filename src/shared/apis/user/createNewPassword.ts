import { SendAsync } from '@/shared/utils/axios';

export const ResetPassword = async (payload: {
  emailId: string;
  tokenCode: string;
  newPassword: string;
  reEnterPassword: string;
}): Promise<any> => {
  const url = `StoreCustomer/CreateNewPassword.json`;

  const response = await SendAsync<any>({
    url: url,
    method: 'POST',
    data: {
      args: payload,
    },
  });

  return response;
};
