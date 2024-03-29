import { SendAsync } from '@/shared/utils/axios';

export interface _Country {
  countryCode: string;
  id: number;
  name: string;
}

export interface countryListResponse {
  data: _Country[];
  errors: {};
  otherData: null;
  success: boolean;
}

export const FetchCountriesList = async (): Promise<_Country[] | null> => {
  const url = `StoreCustomer/getcustomercountry.json`;

  const response = await SendAsync<countryListResponse['data']>({
    url: url,
    method: 'POST',
  });

  if (response.length === 0) {
    return null;
  }

  return response;
};
