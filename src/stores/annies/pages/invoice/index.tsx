'use client';
import { IOrderProps } from '@/app/track-your-package/[orderNumber]/page';
import InvoiceController from '@/features/myAccount/invoice/controller';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import PriceLabel from '@/shared/Components/PriceLabel';
import { paths } from '@/utils/paths.constant';
import React from 'react';
import SideLayout from '../../shared/components/myAccountLayout';
import OrderedItems from '../../shared/components/order-details/orderedItems';

const Invoice: React.FC<IOrderProps> = ({ orderNumber, orderDetails }) => {
  const date =
    orderDetails.shoppingCartViewModels?.[0].estimateShippingDate !== null
      ? new Date(
          orderDetails.shoppingCartViewModels?.[0].estimateShippingDate ?? '',
        ).toLocaleDateString()
      : 'Will Update You Soon';

  return (
    <InvoiceController
      configs={null}
      cases={{
        empty: () => <h2>Empty</h2>,
        loading: () => <h2>Loading...</h2>,
        ready: ({ userData, handleAddToCart, onClickPrint }) => (
          <SideLayout orderNumber={+orderNumber}>
            <div className=' w-full px-[15px]'>
              <div className='flex flex-wrap justify-between items-center mb-[20px] gap-5'>
                <div className='flex flex-wrap justify-between gap-2 md:gap-5 items-center'>
                  <h1 className='text-2xl-text mb-[10px] font-bold font-sub'>
                    It’s Ordered,{' '}
                    <span>{`${userData?.firstName} ${userData?.lastName}`}</span>
                  </h1>
                </div>
                <div className='flex flex-wrap justify-between gap-2 md:gap-5 items-center'>
                  <div className='mb-[10px] md:mb-0'>
                    <CustomLink
                      href={paths.orders}
                      className='!flex flex-wrap items-center gap-x-[10px] text-anchor'
                    >
                      <span>
                        <Image
                          src={'/assets/images/return.svg'}
                          alt={'return'}
                          isStatic={true}
                        />
                      </span>
                      <span className='underline font-semibold text-default-text'>
                        Return to shopping
                      </span>
                    </CustomLink>
                  </div>
                </div>
              </div>
            </div>
            <div className='mb-[40px] border-t border-t-gray-border'></div>
            {/* order numbers */}
            <div className='mb-[20px] flex'>
              <div className='w-full md:w-9/12'>
                <div className='text-small-text mb-[5px] sm:mb-0'>
                  Order Number
                </div>
                <div className='mb-[10px]'>
                  <div className='font-bold text-default-text'>
                    {orderNumber}
                  </div>
                </div>

                <div className='text-small-text mb-[5px] sm:mb-0'>
                  Order Total
                </div>
                <div className='mb-[10px]'>
                  <PriceLabel
                    className='text-large-text font-bold !text-[#634B91]'
                    price={orderDetails.orderDetails?.orderTotal}
                  />
                </div>
              </div>
              <div className='w-full md:w-3/12'>
                <CustomLink
                  href={paths.helpCentre}
                  title='Need Help?'
                  className='text-default-text !font-[600] mb-[20px]'
                >
                  Need Help?
                </CustomLink>
                <div className='w-full'>
                  <CustomLink
                    href={paths.faq}
                    title='FAQ'
                    className='!text-[#634B91] text-small-text block py-[5px] underline hover:no-underline'
                  >
                    FAQ
                  </CustomLink>

                  <CustomLink
                    href={paths.orderAndShipping}
                    title='Ordering &amp; Shipping'
                    className='!text-[#634B91] text-small-text block py-[5px] underline hover:no-underline'
                  >
                    Ordering &amp; Shipping
                  </CustomLink>
                  <CustomLink
                    href={paths.findUsdaZones}
                    title=' Find Your USDA Zone'
                    className='!text-[#634B91] text-small-text block py-[5px] underline hover:no-underline'
                  >
                    Find Your USDA Zone
                  </CustomLink>
                </div>
              </div>
            </div>
            {/* Account */}
            {!userData && (
              <div className='p-[15px] lg:p-[30px] drop-shadow-md rounded-sm bg-[#ffffff] mb-[20px]'>
                <div className='text-title-text mb-[20px] font-bold font-sub text-center'>
                  Create An Account for easier checkouts next time
                </div>
                <div className='text-small-text mb-[20px] text-center'>
                  Create an account and benefit from a more personal shopping
                  experience and quicker online checkout.
                </div>
                <div className='max-w-sm mx-auto'>
                  <CustomLink
                    href='save-payment-methods.html'
                    className='w-full btn btn-primary btn-sm uppercase !font-body !rounded-xs text-center'
                  >
                    Create Account
                  </CustomLink>
                </div>
              </div>
            )}
            {/* Est. Delivery: */}
            <div className='py-[15px] lg:py-[30px] drop-shadow-md rounded-sm bg-[#ffffff] mb-[40px]'>
              <div className='mb-[10px] md:mb-[20px] border-b border-b-gray-border px-[15px] lg:px-[30px]'>
                <div className='flex flex-wrap mx-[-15px]'>
                  <div className='w-full md:w-4/12 px-[15px]'>
                    <div className='text-small-text mb-[5px] sm:mb-0'>
                      Est. Delivery:
                    </div>
                    <div className='mb-[20px]'>
                      <div className='font-bold text-default-text'>{date}</div>
                    </div>
                    <div className='mb-[20px]'>
                      <div className='font-bold text-default-text'>
                        {orderDetails.orderDetails?.shippingMethod}
                      </div>
                    </div>
                    <div className='mb-[20px]'>
                      <div className='font-bold text-default-text'>
                        Shipping Method:{' '}
                        {orderDetails.orderDetails?.orderShippingCosts}{' '}
                        {orderDetails.orderDetails?.shippingMethod}
                      </div>
                    </div>
                  </div>
                  <div className='w-full md:w-4/12 mx-[15px]'>
                    <div className='text-small-text mb-[5px] sm:mb-0'>
                      Shipping Address
                    </div>
                    <div className='mb-[20px]'>
                      <div className='font-bold text-default-text w-full'>
                        {`${orderDetails.orderDetails?.shippingFirstName} ${orderDetails.orderDetails?.shippingLastName}`}
                      </div>
                      <div className='font-bold text-default-text w-full'>
                        {`${orderDetails.orderDetails?.shippingAddress1}, ${orderDetails.orderDetails?.shippingCity}, ${orderDetails?.orderDetails?.shippingState} ${orderDetails?.orderDetails?.shippingZip}, ${orderDetails?.orderDetails?.shippingCountry}`}
                        <br />
                        Ph: {`${orderDetails?.orderDetails?.shippingPhone}`}
                      </div>
                    </div>
                  </div>
                  <div className='w-full md:w-3/12 px-[15px]'>
                    <div className='text-small-text mb-[5px] sm:mb-0'>
                      Billing Address
                    </div>
                    <div className='mb-[20px]'>
                      <div className='font-bold text-default-text w-full'>
                        {`${orderDetails?.orderDetails?.billingFirstName} ${orderDetails?.orderDetails?.billingLastName}`}
                      </div>
                      <div className='font-bold text-default-text w-full'>
                        {`${orderDetails?.orderDetails?.billingAddress1}, ${orderDetails?.orderDetails?.billingCity}, ${orderDetails?.orderDetails?.billingState} ${orderDetails.orderDetails?.billingZip}, ${orderDetails?.orderDetails?.billingCountry}`}
                        <br />
                        Ph: {`${orderDetails?.orderDetails?.billingPhone}`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <OrderedItems
                orderDetails={orderDetails}
                page='invoice'
                handleAddToCart={handleAddToCart}
              />
            </div>
          </SideLayout>
        ),
      }}
    />
  );
};

export default Invoice;
