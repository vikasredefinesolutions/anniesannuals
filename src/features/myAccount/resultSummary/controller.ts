import React, { ReactElement, useState } from 'react';

interface _Props {
  configs: null;
  cases: {
    loading: () => ReactElement<any, any>;
    empty: () => ReactElement<any, any>;
    ready: () => ReactElement<any, any>;
  };
}

const ResultSummaryController: React.FC<_Props> = ({ cases }) => {
  const [status, setStatus] = useState<'loading' | 'empty' | 'ready'>('ready');

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
    return cases.ready();
  }

  return null;
};

export default ResultSummaryController;
