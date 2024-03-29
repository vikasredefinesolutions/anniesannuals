'use client';
import { useEffect, useState } from 'react';
import {
  ClearBrandCache,
  ClearCategoryCache,
} from '@/shared/apis/cache/cache.service';
import { getStoreId } from '@/shared/utils/cookie.helper';

const ClearCacheById = ({
  params: { clearCacheId = '' },
}: {
  params: { clearCacheId: string };
}) => {
  const storeId = getStoreId();
  const [message, setMessage] = useState<null | string>(null);

  const extractor = (
    info: string | undefined,
  ): { id: number; clear: 'brand_id' | 'category_id' } => {
    if (!info) throw new Error('No Info Found to be Cleared');
    if (typeof info !== 'string') throw new Error('Info is not a string');

    const clearCacheIdData = decodeURIComponent(info);
    const array = clearCacheIdData.split('=');
    if (array.length !== 2)
      throw new Error(
        'Info is not in correct format. For example: brand_id=1 or category_id=1',
      );

    if (isNaN(+array[1])) throw new Error('Id is not a number');

    return {
      id: +array[1],
      clear: array[0] as 'brand_id' | 'category_id',
    };
  };

  useEffect(() => {
    try {
      const { id, clear } = extractor(clearCacheId);

      if (clear === 'brand_id') {
        const response = ClearBrandCache({ storeid: storeId, brandid: id });
        if (!response) setMessage('Error clearing brand cache');
        setMessage('Brand Cache Cleared with id: ' + id);
        return;
      }

      if (clear === 'category_id') {
        const response = ClearCategoryCache({
          storeid: storeId,
          categoryid: id,
        });
        if (!response) setMessage('Error clearing category cache');
        setMessage('Category Cache Cleared with id: ' + id);
        return;
      }

      setMessage(
        'No Cache Found to be Cleared. Try with "brand_id" or "category_id".',
      );
    } catch (error: any) {
      setMessage(error?.message || 'Error clearing cache');
    }
  }, []);

  return <>{message ? <h1>{message}</h1> : <h1>Clearing Cache... </h1>}</>;
};

export default ClearCacheById;
