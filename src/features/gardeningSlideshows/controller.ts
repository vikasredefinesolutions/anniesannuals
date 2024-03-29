'use client';
import { getGardenSlideshow } from '@/api/services/store';
import { getStoreId } from '@/shared/utils/cookie.helper';
import React, { ReactElement, useEffect, useState } from 'react';

interface _Props {
  configs: null;
  cases: {
    loading: () => ReactElement<any, any>;
    empty: () => ReactElement<any, any>;
    ready: (helper: _Helpers) => ReactElement<any, any>;
  };
}

interface _Helpers {
  gardenSlideshow: any;
}

const GardeningSlideshowsController: React.FC<_Props> = ({ cases }) => {
  const [status, setStatus] = useState<'loading' | 'empty' | 'ready'>('ready');
  const [gardenSlideshow, setGardenSlideshow] = useState<any[]>([]);
  const storeId = getStoreId();

  const getSubscribeDetails = async () => {
    //TODO: need to remove static storeId after cookies integration
    const response = await getGardenSlideshow({
      storeId: storeId || 5,
    });
    setGardenSlideshow(
      response.map((item: any) => {
        return {
          ...item,
          slideShowDetailsViewModels: item?.slideShowDetailsViewModels?.map(
            (model: any) => {
              return {
                ...model,
                image: model.imagePath,
              };
            },
          ),
        };
      }),
    );
  };

  useEffect(() => {
    getSubscribeDetails();
  }, []);

  if (status === 'loading') {
    return cases.loading();
  }

  if (status === 'empty') {
    return cases.empty();
  }

  if (status === 'ready') {
    return cases.ready({
      gardenSlideshow,
    });
  }

  return null;
};

export default GardeningSlideshowsController;
