import { apiRoutes } from '@/api/apiRoutes';
import { SendAsync } from '@/shared/utils/axios';

export const deleteUserAddress = async (
  addressId: string | number,
  rowVersion: string,
): Promise<string | null> => {
  const url = apiRoutes.deleteAddress;

  let payload = {
    args: {
      id: addressId,
      rowVersion: rowVersion,
      status: 4,
      location: 'string',
      ipAddress: '192.168.1.1',
      macAddress: '00-00-00-00-00-00',
    },
  };

  const response = await SendAsync<any>({
    url,
    method: 'POST',
    data: payload,
  });

  return response;
};
