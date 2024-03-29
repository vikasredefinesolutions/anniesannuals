import { IProductOrderDetail } from '@/shared/apis/orders/getOrderByOrderNumber';
import { IFilterFacetFields } from '@/types/helpers';
import { getStoreId } from './cookie.helper';

interface IGeoLocationResponse {
  country_code: string;
  country_name: string;
  city: string;
  postal: string;
  latitude: number;
  longitude: number;
  IPv4: string;
  state: string;
}
const storeId = getStoreId();

export const passwordRegExp =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?#&]{8,}$/;

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const phonePattern1 = /^\(?([0-9]{3})\)?[-]([0-9]{3})[-]([0-9]{4})$/; //Matches xxx-xxx-xxxx
export const phonePattern2 = /^\(?([0-9]{3})\)?[.]([0-9]{3})[.]([0-9]{4})$/; //Matches xxx.xxx.xxxx
export const phonePattern3 = /^\(?([0-9]{3})\)?[ ]([0-9]{3})[ ]([0-9]{4})$/; //Matches xxx xxx xxxx
export const phonePattern4 = /^[0-9]{10}$/; //Matches xxxxxxxxxx

export const passwordUpperCaseRegex = /[A-Z]/;
export const passwordAtLeastRegex = /[0-9]/;
export const passwordSpecialCharacterRegex = /(?=.*[@$!%*?&#])/;

export const __ValidationText = {
  phone: {
    required: 'Enter your phone Number.',
    valid:
      'Enter Valid Phone Number. Format xxx-xxx-xxxx, xxx xxx xxxx, xxx.xxx.xxxx, xxxxxxxxxx',
    valid2: 'Enter Valid Phone Number. Format xxxxxxxxxx',
    length: 10,
  },
};

export const setShowByTypePayload = (key: string) => {
  let payload = {
    storeID: storeId,
    countforfetchitems: 0,
    shopByGarden: DynamicCategories.SHOP_BY_GARDEN === key,
    shopByCategories: DynamicCategories.SHOP_BY_CATEGORY === key,
    shopByFeatures: DynamicCategories.SHOP_BY_FEATURES === key,
    shopByUses: DynamicCategories.SHOP_BY_USES === key,
  };

  return payload;
};

export const selectCardImage = (orderDetails: IProductOrderDetail) => {
  if (orderDetails?.cardType == 'VISA') {
    return 'card-visa.png';
  } else if (orderDetails?.cardType == 'AMEX') {
    return 'card-american-express.png';
  } else if (orderDetails?.cardType == 'DISCOVER') {
    return 'card-discover.png';
  } else if (orderDetails?.cardType == 'MASTERCARD') {
    return 'card-master-card.png';
  } else {
    return 'card-visa.png';
  }
};

export const statusBarCssController = (status: string) => {
  if (status == 'Processing' || status == 'Refund in progress') {
    return `w-auto inline-block px-[15px] py-[5px] rounded-[5px] text-default-text font-[600] bg-tertiary !text-quaternary`;
  } else if (status == 'Delivered') {
    return `w-auto inline-block px-[15px] py-[5px] rounded-[5px] text-default-text font-[600] bg-[#EDFFFA] !text-default`;
  } else if (status == 'Refund Completed' || status == 'Cancelled') {
    return `w-auto inline-block px-[15px] py-[5px] rounded-[5px] text-default-text font-[600] bg-[#F2F2F2] !text-[#B3B3B3]`;
  } else {
    return `w-auto inline-block px-[15px] py-[5px] rounded-[5px] text-default-text font-[600] bg-tertiary !text-quaternary`;
  }
};

export const sendErrorMessage = (error: any) => {
  const errorMsg = error ? Object?.values(error)[0] : 'Something went wrong';
  return errorMsg;
};

export const subCategoryBgEnum = 'CATEGORY BACKGROUND COLOR';
export const GENUS_CATEGORY_ENUM = 'GENUS SPECIES NAME';

export enum DynamicCategories {
  SHOP_BY_GARDEN = 'Shop By Garden',
  SHOP_BY_CATEGORY = 'Shop By Category',
  SHOP_BY_FEATURES = 'Shop by Features',
  SHOP_BY_USES = 'Shop By Uses',
}

export function getLocation() {
  return {
    country_code: '',
    country: '',
    city: '',
    postal_code: '',
    latitude: 0,
    longitude: 0,
    ip_address: '192.168.1.1',
    region: '',
  };
}

export const alphabets = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

export const fetchZipcodefromGeolocation =
  async (): Promise<IGeoLocationResponse | null> => {
    try {
      const geoIp = await fetch('https://geolocation-db.com/json/').then(
        (response) => response.json(),
      );
      return geoIp;
    } catch (error) {
      console.log('Error: GEO Location not found.', error);
      return null;
    }
  };

export const socialReference: { id: number; name: string }[] = [
  { id: 1, name: 'Catalog' },
  { id: 2, name: "Annie's Monthly Emails/Newsletter" },
  { id: 3, name: "Dave's Garden" },
  { id: 4, name: 'Newspaper/Magazine Article' },
  { id: 5, name: 'TV/Radio' },
  { id: 6, name: 'SF Flower and Garden Show' },
  { id: 7, name: 'Friend' },
  { id: 8, name: 'Retail Nursery' },
  { id: 9, name: 'Talk/Appearance' },
  { id: 10, name: 'Internet Search' },
  { id: 11, name: 'Other' },
  { id: 12, name: 'Facebook' },
  { id: 13, name: 'Twitter' },
];


export const generateGA4ProductCategories = (filterFacetFileds: IFilterFacetFields[]) => {
  let ga4Categories: Record<string, string> = {
    "productMainCategory": "",
    "category1": "",
    "category2": "",
    "category3": "",
  }

  let setCounter = 0;
  const values = Object.values(ga4Categories);

  const lifeSpan = filterFacetFileds.find(field => field?.name == 'Life Span')?.values;
  lifeSpan?.forEach(item => {
    if (setCounter > 3) return;
    values[setCounter] = item?.value;
    setCounter += 1;
  });

  if (setCounter <= 3) {
    const specialFetures = filterFacetFileds.find(field => field?.name == 'Features/Category')?.values;
    specialFetures?.forEach(item => {
      if (setCounter > 3) return;
      values[setCounter] = item?.value;
      setCounter += 1;
    });
  };

  if (setCounter <= 3) {
    const uses = filterFacetFileds.find(field => field?.name == 'Uses')?.values;
    uses?.forEach(item => {
      if (setCounter > 3) return;
      values[setCounter] = item?.value;
      setCounter += 1;
    });
  }

  Object.keys(ga4Categories).forEach((field, index) => ga4Categories[field] = values[index])

  return ga4Categories;

}

export const getConcatinatedValue = (payload: string[] | number[] = []) => {
  return payload.join(' ,');
}
