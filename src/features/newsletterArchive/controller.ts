'use client';
import { getNewsletterArchive } from '@/api/services/home';
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

export interface _Newsletters {
  author: string;
  description: string;
  id: number;
  imagePath: string;
  ipAddress: string;
  location: string;
  macAddress: string;
  recStatus: string;
  storeID: number;
  subTitle: string;
  title: string;
  pageUrl: string;
}
interface _Helpers {
  newsletters: _Newsletters[];
}

const NewsletterArchiveController: React.FC<_Props> = ({ cases }) => {
  const [status, setStatus] = useState<'loading' | 'empty' | 'ready'>('ready');
  const [newsletters, setNewsletters] = useState<any[]>([]);
  const storeId = getStoreId();

  const getNewslettersDetails = async () => {
    const response = await getNewsletterArchive({
      storeId: storeId || 5,
    });
    setNewsletters(response);
  };

  useEffect(() => {
    getNewslettersDetails();
  }, []);

  if (status === 'loading') {
    return cases.loading();
  }

  if (status === 'empty') {
    return cases.empty();
  }

  if (status === 'ready') {
    return cases.ready({
      newsletters,
    });
  }

  return null;
};

export default NewsletterArchiveController;
