import { SendAsync } from '@/shared/utils/axios';
export interface _SubscribeToNewsletter {
  subscribeModel: {
    rowVersion: string;
    location: string;
    ipAddress: string;
    macAddress: string;
    id: number;
    email: string;
    isSubscribe: boolean;
    storeId: number;
    recStatus: string;
  };
}

export interface _AppConfigPayload {
  domainConcateEmail: string;
}

export interface IGrowingZone {
  zoneName: string;
  stateCode: string;
  stateName: string;
  zipCode: string;
  cityName: string;
  storeId: string | number;
  zoneImageUrl: string;
}

export const subsribeToNewsLetter = async (payload: _SubscribeToNewsletter) => {
  const res = await SendAsync<_SubscribeToNewsletter>({
    url: '/Subscribe/CreateSubscribe.json',
    method: 'POST',
    data: payload,
  });
  return res;
};

export const uploadMedia = async (folder: string, files: File) => {
  try {
    const url = `/upload/image?folderPath=${folder}`;
    const res = await SendAsync<any>({
      url,
      method: 'POST',
      data: { files },
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const fetchGrowingZone = async (
  zipcode: string,
  storeId: string | number,
): Promise<IGrowingZone[] | null> => {
  try {
    const url = `ZoneStateMapping/get/${storeId}/${zipcode}.json`;
    const res = await SendAsync<IGrowingZone[]>({
      url,
      method: 'GET',
    });
    return res;
  } catch (error: any) {
    return null;
  }
};

export const getAppConfig = async (storeId: number, name: string) => {
  const payload = { storeId, name };
  try {
    const url = 'AppConfig/getappconfig.json';
    const res = await SendAsync<_AppConfigPayload>({
      url,
      method: 'POST',
      data: payload,
    });
    return res;
  } catch (error) {
    return null;
  }
};

export interface IModalDetails {
  title: string;
  description: any;
  isAlertModalOpen: boolean;
  isShowButton?: boolean;
  onConfirm?: () => void;
}
