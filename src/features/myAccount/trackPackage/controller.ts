'use client';
import { getUserId } from '@/shared/utils/cookie.helper';
import { paths } from '@/utils/paths.constant';
import { useRouter } from 'next/navigation';
import React, { ReactElement, useEffect, useState } from 'react';

interface _Props {
  configs: null;
  cases: {
    loading: () => ReactElement<any, any>;
    empty: () => ReactElement<any, any>;
    ready: () => ReactElement<any, any>;
  };
}

const TrackPackageController: React.FC<_Props> = ({ cases }) => {
  const [status, setStatus] = useState<'loading' | 'empty' | 'ready'>('ready');
  const router = useRouter();
  const userId = getUserId();
  useEffect(() => {
    if (!userId) {
      router.push(`${paths.home}`);
    }
  }, []);

  if (status === 'loading') {
    return cases.loading();
  }

  if (status === 'empty') {
    return cases.empty();
  }

  if (status === 'ready') {
    return cases.ready();
  }

  return null;
};

export default TrackPackageController;
