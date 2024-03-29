import { SendAsync } from '@/shared/utils/axios';

export interface _GetCityStateCountryWithZip {
  countryId: number;
  countryName: string;
  stateId: number;
  stateName: string;
  cityId: number;
  cityName: string;
  zipCode: string;
}

export interface zipCodeResponse {
  data: _GetCityStateCountryWithZip;
  errors: {};
  otherData: null;
  success: boolean;
}

export const getLocationWithZipCode = async (
  zipCode: string,
): Promise<_GetCityStateCountryWithZip | null> => {
  const url = `City/getcitystatecountrybyzipCode/${zipCode}.json`;

  const response = await SendAsync<zipCodeResponse['data']>({
    url: url,
    method: 'GET',
  });

  return response;
};
