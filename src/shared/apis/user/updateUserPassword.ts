import { SendAsync } from '@/shared/utils/axios';

export const updateUserPassword = async (
  currentPassword: string,
  newPassword: string,
  customerId: string,
): Promise<string | null> => {
  const url = '/StoreCustomer/changepasswordinfo.json';
  let payload = {
    customerId: customerId,
    currentPassword: currentPassword,
    newPassword: newPassword,
    confirmNewPassword: newPassword,
  };

  const response = await SendAsync<any>({
    url,
    method: 'POST',
    data: payload,
  });

  return response;
};
