import { useAppDispatch } from '@/app/redux/hooks';
import { showLoader } from '@/app/redux/slices/commonSlice';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import CustomLink from '@/shared/Components/CustomLink';
import PriceLabel from '@/shared/Components/PriceLabel';
import { paths } from '@/utils/paths.constant';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import React from 'react';

interface _Props {
  orderSubTotal: number;
  orderTotal: number;
  handleReviewOrder: () => void;
  salesTax: number;
  shippingCharges: number;
  makePaymentHandler: () => void;
  showPlaceOrderScreen: boolean;
  discount: number;
  selectedPaymentMethod: string;
}

const CheckoutSummary: React.FC<_Props> = ({
  orderSubTotal,
  orderTotal,
  shippingCharges,
  salesTax,
  makePaymentHandler,
  showPlaceOrderScreen,
  discount,
  selectedPaymentMethod,
}) => {
  const dispatch = useAppDispatch();
  return (
    <div className='col-span-12 lg:col-span-4'>
      <div className='sticky top-0 pb-[20px]'>
        <div className='bg-[#FCFFF5] border border-gray-border drop-shadow-md rounded-sm mb-[15px]'>
          <div className='p-[15px] border-b border-b-gray-border flex flex-wrap justify-between items-center'>
            <div className='font-sub font-bold text-sub-text'>
              Order Summary
            </div>
          </div>
          <div className='px-[15px]'>
            <div className='py-[15px] border-b border-b-gray-border flex flex-wrap justify-between items-center'>
              <div className='font-semibold text-default-text'>
                Product Subtotal:
              </div>
              <div className='font-bold text-default-text'>
                <PriceLabel className={''} price={orderSubTotal.toFixed(2)} />
              </div>
            </div>
            {shippingCharges > 0 && (
              <div className='py-[15px] border-b border-b-gray-border flex flex-wrap justify-between items-center'>
                <div className='font-semibold text-default-text'>
                  Estimated Shipping:
                </div>
                <div className='font-bold text-default-text'>
                  {' '}
                  <PriceLabel className={''} price={shippingCharges} />
                </div>
              </div>
            )}

            {salesTax > 0 && (
              <div className='py-[15px] flex flex-wrap justify-between items-center'>
                <div className='font-semibold text-default-text'>
                  Taxes and Fees
                  <span className='block sm:inline-block text-small-text font-normal text-[#828282]'>
                    (calculated on checkout)
                  </span>
                </div>
                <div className='font-bold text-default-text'>
                  {' '}
                  <PriceLabel className={''} price={salesTax.toFixed(2)} />
                </div>
              </div>
            )}
            <div className='py-[15px] flex flex-wrap justify-between items-center'>
              <div className='font-bold text-medium-text'>
                Estimated Order Total:
              </div>
              <div className='font-bold text-medium-text'>
                <PriceLabel className={''} price={orderTotal} />
              </div>
            </div>
          </div>

          {selectedPaymentMethod !== 'Paypal' && (
            <div className='mb-[15px] px-[15px]'>
              <button
                onClick={() => makePaymentHandler()}
                disabled={!showPlaceOrderScreen}
                className={`btn btn-primary btn-md uppercase !font-body !rounded-xs !inline-flex justify-center !bg-[#9C331C] w-full text-center text-white ${
                  !showPlaceOrderScreen ? 'opacity-50' : ''
                }`}
              >
                <span className='material-icons-outlined'>lock</span>
                PLACE ORDER
              </button>
            </div>
          )}
          {orderTotal > 0 && selectedPaymentMethod === 'Paypal' && (
            <div className=' mb-[15px] px-[15px]'>
              <PayPalScriptProvider
                options={{
                  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
                  currency: 'USD',
                  intent: 'capture',
                }}
              >
                <PayPalButtons
                  disabled={!showPlaceOrderScreen}
                  fundingSource={'paypal'}
                  style={{
                    color: 'gold',
                    shape: 'rect',
                    label: 'pay',
                    height: 50,
                    disableMaxWidth: true,
                  }}
                  createOrder={async (data: any, actions: any) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: orderTotal,
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={async (data: any, actions: any) => {
                    return actions.order
                      .capture()
                      .then((details: any) => {
                        dispatch(showLoader(true));
                        makePaymentHandler();
                      })
                      .catch((err: any) => {
                        dispatch(
                          openAlertModal({
                            title: 'Error',
                            description:
                              'Something Went Wrong in Placing Order',
                            isAlertModalOpen: true,
                          }),
                        );
                        dispatch(showLoader(false));
                      });
                  }}
                />
              </PayPalScriptProvider>
            </div>
          )}
        </div>
        <div className='mb-[15px] text-extra-small-text font-semibold text-center'>
          For your convenience, we ship in boxes of 4,6,8 or 12
        </div>
        <div className='text-center font-sub font-bold text-sub-text mb-[15px]'>
          1-888-266-4370{'  '}
          {/* <span className='text-normal-text'>Ext. 1</span> */}
        </div>
        <div className='text-normal-text mb-[15px] text-center'>
          <CustomLink href={paths.faq}>Have a question?</CustomLink>{' '}
          <CustomLink href={paths.contactUs}>Need Help?</CustomLink>
        </div>
        <div className='text-normal-text mb-[15px] text-center'>
          Or email us at:{' '}
          <a
            href='mailto:contact@anniesannuals.com'
            title='Email'
            className='font-[700]'
          >
            contact@anniesannuals.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
