import React, { ReactElement, useState } from 'react';

interface _Props {
  configs: null;
  cases: {
    loading: () => ReactElement<any, any>;
    empty: () => ReactElement<any, any>;
    ready: (
      TABS_PATH: { title: string; path: string }[],
    ) => ReactElement<any, any>;
  };
}

const AccountTabsController: React.FC<_Props> = ({ cases }) => {
  const [status, setStatus] = useState<'loading' | 'empty' | 'ready'>('ready');

  const TABS_PATH = [
    { title: 'Consultation Results', path: '/myaccount' },
    { title: 'Results Tracking', path: '/result-summary' },
    { title: 'Purchase', path: '/purchase-summary' },
    { title: 'Settings', path: '/address' },
    { title: 'Sign Out', path: '/' },
    { title: 'Help', path: '/help' },
  ];

  const handlePageChange = () => {
    return {};
  };

  const handleSort = () => {
    return {};
  };
  const handleInStock = () => {
    return {};
  };

  if (status === 'loading') {
    return cases.loading();
  }

  if (status === 'empty') {
    return cases.empty();
  }

  if (status === 'ready') {
    return cases.ready(TABS_PATH);
  }

  return null;
};

export default AccountTabsController;
