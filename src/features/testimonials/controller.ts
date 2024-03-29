'use client';
import { getTestimonialByStoreid } from '@/api/services/home';
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
  testimonials: any;
}

const TestimonialsController: React.FC<_Props> = ({ cases }) => {
  const [status, setStatus] = useState<'loading' | 'empty' | 'ready'>('ready');
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const storeId = getStoreId();

  const getTestuminualDetails = async () => {
    const response = await getTestimonialByStoreid({
      storeId: storeId || 5,
    });
    setTestimonials(response);
  };

  useEffect(() => {
    getTestuminualDetails();
  }, []);

  if (status === 'loading') {
    return cases.loading();
  }

  if (status === 'empty') {
    return cases.empty();
  }

  if (status === 'ready') {
    return cases.ready({
      testimonials,
    });
  }

  return null;
};

export default TestimonialsController;
