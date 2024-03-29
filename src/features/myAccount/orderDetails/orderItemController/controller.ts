import { IProductOrderDetail } from '@/shared/apis/orders/getOrderByOrderNumber';
import React, { ReactElement, useState } from 'react';

interface IHelper {
  selectCardImage: (orderDetails: IProductOrderDetail) => string;
}

interface _Props {
  configs: null;
  cases: {
    loading: () => ReactElement<any, any>;
    empty: () => ReactElement<any, any>;
    ready: (helper: IHelper) => ReactElement<any, any>;
  };
}

const OrderItemController: React.FC<_Props> = (_Props) => {
  const [status, setStatus] = useState<'loading' | 'empty' | 'ready'>('ready');
  const { cases } = _Props;

  const selectCardImage = (orderDetails: IProductOrderDetail) => {
    if (orderDetails?.cardType == 'VISA') {
      return 'card-visa.png';
    } else if (orderDetails?.cardType == 'AMEX') {
      return 'card-american-express.png';
    } else if (orderDetails?.cardType == 'DISCOVER') {
      return 'card-discover.png';
    } else if (orderDetails?.cardType == 'MASTERCARD') {
      return 'card-master-card.png';
    } else {
      return 'card-visa.png';
    }
  };

  if (status === 'loading') {
    return cases.loading();
  }

  if (status === 'empty') {
    return cases.empty();
  }

  if (status === 'ready') {
    return cases.ready({
      selectCardImage,
    });
  }

  return null;
};

export default OrderItemController;
