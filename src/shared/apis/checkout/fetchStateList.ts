import { SendAsync } from '@/shared/utils/axios';

export interface _State {
  id: number;
  name: string;
}

export interface stateListResponse {
  data: _State[];
  errors: {};
  otherData: null;
  success: boolean;
}

export const FetchStatesList = async (id: number): Promise<_State[] | null> => {
  const url = `StoreCustomer/getcustomerstatebycountryid/${id}.json`;

  const response = await SendAsync<stateListResponse['data']>({
    url: url,
    method: 'GET',
  });

  if (response?.length === 0) {
    return null;
  }

  return response;
};
