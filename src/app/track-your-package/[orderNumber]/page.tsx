import {
  _OrderDetails,
  getOrderByOrderNumber,
} from '@/shared/apis/orders/getOrderByOrderNumber';
import { activeStoreName } from '@/shared/configs';
import dynamic from 'next/dynamic';
import React from 'react';

export interface IOrderProps {
  orderNumber: string;
  orderDetails: _OrderDetails;
}

const DynamicTrackYourPackage: React.ComponentType<IOrderProps> = dynamic(
  () => import(`../../../${activeStoreName}/pages/trackPackage`),
);

export default async function TrackPackage({
  params,
}: {
  params: { orderNumber: string };
}) {
  const orderNumber = params.orderNumber;
  const orderDetails = await getOrderByOrderNumber(orderNumber);
  return (
    <DynamicTrackYourPackage
      orderNumber={orderNumber}
      orderDetails={orderDetails}
    />
  );
}
