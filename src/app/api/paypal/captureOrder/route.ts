import { client } from '@/shared/utils/paypal';
import paypal from '@paypal/checkout-server-sdk';
import { NextRequest } from 'next/server';
import { nextResponse } from '../../cors/cors';

export async function POST(req: NextRequest) {
  const requestBody = await req.text();
  const data = !requestBody ? null : JSON.parse(requestBody);
  if (req.method != 'POST') return nextResponse(400, { message: 'Not Found' });

  if (!data.orderId)
    return nextResponse(400, { message: 'No OrderId Occured' });

  //Capture order to complete payment
  const { orderId } = data;
  const PaypalClient = client();
  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  const response = await PaypalClient.execute(request);
  if (!response) {
    return nextResponse(200, { message: 'Some Error Occured' });
  }

  // Your Custom Code to Update Order Status
  // And Other stuff that is related to that order, like wallet
  // Here I am updateing the wallet and sending it back to frontend to update it on frontend

  return nextResponse(200, { message: JSON.stringify(response) });
}
