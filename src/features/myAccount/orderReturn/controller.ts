import React, { ReactElement, useEffect, useState } from 'react';

interface _Props {
  configs: null;
  cases: {
    loading: () => ReactElement<any, any>;
    empty: () => ReactElement<any, any>;
    ready: () => ReactElement<any, any>;
  };
}

interface _Helper {
  
}

const OrderReturnController:React.FC<_Props> = (_Props) => {
    const [status, setStatus] = useState<'loading' | 'empty' | 'ready'>('ready');
    const {cases} = _Props
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
}

export default OrderReturnController