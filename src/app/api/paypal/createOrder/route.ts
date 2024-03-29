import paypal from '@paypal/checkout-server-sdk';
import { NextRequest } from 'next/server';
import { client } from '../../../../shared/utils/paypal';
import { nextResponse } from '../../cors/cors';

export async function POST(req: NextRequest) {
  const requestBody = await req.text();
  const data = !requestBody ? null : JSON.parse(requestBody);

  try {
    const PaypalClient = client();
    //This code is lifted from https://github.com/paypal/Checkout-NodeJS-SDK
    const request = new paypal.orders.OrdersCreateRequest();
    request.headers['Prefer'] = 'return=representation';
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: data.order_price + '',
          },
        },
      ],
    });
    const response = await PaypalClient.execute(request);
    if (response.statusCode !== 201) {
      console.log('RES: ', response);
      return nextResponse(500, { message: 'Some Error Occured at backend' });
    }

    // Your Custom Code for doing something with order
    // Usually Store an order in the database like MongoDB

    return nextResponse(200, { message: response.result.id });
  } catch (err) {
    console.log('Err at Create Order: ', err);
    return nextResponse(500, { message: 'Could Not Found the user' });
  }
}
