'use client';
import {
  GetGiftCard,
  getGiftCardListing,
} from '@/shared/apis/giftCardListing/getGiftCardListing';
import { getStoreId } from '@/shared/utils/cookie.helper';
import React, { ReactElement, useEffect, useState } from 'react';

interface GiftCardHelpers {
  giftCardListingData: any[];
}

interface Props {
  cases: {
    view: (helpers: GiftCardHelpers) => ReactElement<any, any>;
  };
}
const storeId = getStoreId();

const GiftCardListingController: React.FC<Props> = ({ cases }) => {
  const [GiftCardsListing, setGiftCardsListing] = useState<GetGiftCard[]>([]);

  useEffect(() => {
    const fetchGiftCardData = async () => {
      try {
        const response = await getGiftCardListing({ storeId });
        setGiftCardsListing(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGiftCardData();
  }, []);

  return cases.view({
    giftCardListingData: GiftCardsListing,
  });
};

export default GiftCardListingController;
