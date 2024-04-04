export const isNumberKey = (event: React.ChangeEvent<HTMLInputElement>) => {
  let keyAllowed = false;

  if ((event.nativeEvent as any).inputType === 'deleteContentBackward') {
    keyAllowed = true;
  }

  switch ((event.nativeEvent as any).data) {
    case 'Backspace':
      keyAllowed = true;
      break;
    case 'Enter':
      keyAllowed = true;
      break;
    case '0':
      keyAllowed = true;
      break;
    case '1':
      keyAllowed = true;
      break;
    case '2':
      keyAllowed = true;
      break;
    case '3':
      keyAllowed = true;
      break;
    case '4':
      keyAllowed = true;
      break;
    case '5':
      keyAllowed = true;
      break;
    case '6':
      keyAllowed = true;
      break;
    case '7':
      keyAllowed = true;
      break;
    case '8':
      keyAllowed = true;
      break;
    case '9':
      keyAllowed = true;
      break;
    default:
      break;
  }
  return keyAllowed;
};

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

export function getPriceWithMsrpAndSalePrice(
  salePrice: number,
  msrp: number,
): string | undefined {
  if (!msrp) return undefined;
  return salePrice && salePrice < msrp ? salePrice.toFixed(2) : msrp.toFixed(2);
}

export const MEDIA_BASE_URL =
  process.env.NEXT_PUBLIC_MEDIA_URL ||
  process.env.NEXT_PUBLIC_EXTRA_MEDIA_URL_DETAIL_MAIN ||
  process.env.NEXT_PUBLIC_REDEFINE_MEDIA ||
  '';

export const MEDIA_BASE_URL_CDN = process.env.NEXT_PUBLIC_CDN_IMAGE != undefined &&
  process.env.NEXT_PUBLIC_CDN_IMAGE != '' ? process.env.NEXT_PUBLIC_CDN_IMAGE + MEDIA_BASE_URL : MEDIA_BASE_URL;

export const STATIC_URLS = new Set(['beebash24'])