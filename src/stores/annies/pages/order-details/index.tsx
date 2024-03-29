'use client';
import { IOrderProps } from '@/app/track-your-package/[orderNumber]/page';
import OrderDetailsController from '@/features/myAccount/orderDetails/controller';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import Loader from '@/shared/Components/Loader';
import { paths } from '@/utils/paths.constant';
import dayjs from 'dayjs';
import React from 'react';
import SideLayout from '../../shared/components/myAccountLayout';
import OrderedItems from '../../shared/components/order-details/orderedItems';

const OrderDetails: React.FC<IOrderProps> = ({ orderNumber, orderDetails }) => {
  console.log(orderDetails, '<----order details');
  return (
    <OrderDetailsController
      configs={null}
      cases={{
        empty: () => <h2>Empty</h2>,
        loading: () => <Loader />,
        ready: ({ handleAddToCart }) => (
          <SideLayout orderNumber={+orderNumber}>
            <div className=' w-full px-[15px]'>
              <div className='flex flex-wrap justify-between items-center mb-[20px] gap-5'>
                <div className='flex flex-wrap justify-between gap-2 md:gap-5 items-center'>
                  <h1 className='text-2xl-text mb-[10px] font-bold font-sub'>
                    Order Details
                  </h1>
                  <div className='ml-[5px]'>
                    <CustomLink
                      href={`/invoice.html/${orderNumber}`}
                      className='btn btn-outline-primary btn-xs uppercase !font-body !rounded-xs !inline-flex gap-[10px] items-center !border-[#634B91] !text-[#634B91]'
                    >
                      <Image
                        src={'/assets/images/eyeIcon.svg'}
                        alt={'eye'}
                        isStatic={true}
                      />
                      <span>View Invoice</span>
                    </CustomLink>
                  </div>
                </div>
                <div className='flex flex-wrap justify-between gap-2 md:gap-5 items-center'>
                  <div className='mb-[10px] md:mb-0'>
                    <CustomLink
                      href={`${paths.orders}`}
                      className='!flex flex-wrap items-center gap-x-[10px] text-anchor'
                    >
                      <span>
                        <Image
                          src={'/assets/images/return.svg'}
                          alt={'return'}
                          isStatic
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
            {/* Order List */}
            <div className='p-[15px] lg:p-[30px] drop-shadow-md rounded-sm bg-[#FCFFF5] mb-[20px]'>
              <div className='flex flex-wrap justify-between items-center mb-[20px] gap-5'>
                <div className='text-title-text font-semibold font-sub mb-[10px] md:mb-0'>
                  Order Details
                </div>
                <div className='flex flex-wrap gap-5'>
                  {/* <CustomLink
                    href={`${paths.orderReturn}?orderNumber=${orderDetails.orderDetails.id}`}
                    className='btn btn-outline-primary btn-xs uppercase !font-body !rounded-xs !inline-flex gap-[10px] items-center !border-[#634B91] !text-[#634B91]'
                  >
                    <Image
                      src={'/assets/images/cancelOrderIcon.svg'}
                      alt={'cancel'}
                      isStatic={true}
                    />
                    <span>Cancel Order</span>
                  </CustomLink> */}
                  <CustomLink
                    href={`${
                      orderDetails?.orderTrackLink
                        ? orderDetails?.orderTrackLink
                        : ''
                    }`}
                    className='btn btn-outline-primary btn-xs uppercase !font-body !rounded-xs !inline-flex gap-[10px] items-center !border-[#634B91] !text-[#634B91]'
                  >
                    <Image
                      src={'/assets/images/trackerICon.svg'}
                      alt={'tracker'}
                      isStatic={true}
                    />
                    <span>
                      {orderDetails?.orderTrackLink
                        ? 'Track package'
                        : 'Unable to track'}
                    </span>
                  </CustomLink>
                </div>
              </div>
              <div className='grid grid-cols-12 gap-6 pt-[15px]'>
                <div className='col-span-12 sm:col-span-4'>
                  <div className='text-small-text font-semibold mb-[5px] sm:mb-0'>
                    Order Number
                  </div>
                  <div className='mb-[20px]'>
                    <div className='font-bold text-default-text'>
                      {orderNumber}
                    </div>
                  </div>
                </div>
                <div className='col-span-12 sm:col-span-4'>
                  <div className='text-small-text font-semibold mb-[5px] sm:mb-0'>
                    Ordered On
                  </div>
                  <div className='mb-[20px]'>
                    <div className='font-bold text-default-text'>
                      {dayjs(orderDetails?.orderDetails?.orderDate).format(
                        'MMMM D, YYYY',
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-12 gap-6 pt-[15px]'>
                <div className='col-span-12 sm:col-span-4'>
                  <div className='text-small-text font-semibold mb-[5px] sm:mb-0'>
                    Shipping Address
                  </div>
                  <div className='mb-[20px] font-bold text-default-text'>
                    <div className='font-bold text-default-text w-full'>
                      {`${orderDetails?.orderDetails?.shippingFirstName} ${orderDetails?.orderDetails?.shippingLastName}`}
                      ,
                    </div>{' '}
                    <div className='font-bold text-default-text w-full'>
                      {`${orderDetails?.orderDetails?.shippingAddress1}`}
                      {orderDetails?.orderDetails?.shippingAddress2 &&
                        `, ${orderDetails.orderDetails?.shippingAddress2}`}
                    </div>
                    <div className='font-bold text-default-text w-full'>
                      {`${orderDetails?.orderDetails?.shippingCity}`},{' '}
                    </div>{' '}
                    <div className='font-bold text-default-text w-full'>
                      {`${orderDetails?.orderDetails?.shippingState}`},{' '}
                      {`${orderDetails?.orderDetails?.shippingCountry}`},{' '}
                      {`${orderDetails?.orderDetails?.shippingZip}`}
                    </div>
                  </div>
                </div>
                <div className='col-span-12 sm:col-span-4'>
                  <div className='text-small-text font-semibold mb-[5px] sm:mb-0'>
                    Billing Address
                  </div>
                  <div className='mb-[20px] font-bold text-default-text'>
                    <div className='font-bold text-default-text w-full'>
                      {`${orderDetails?.orderDetails?.billingFirstName} ${orderDetails?.orderDetails?.billingLastName}`}
                      ,
                    </div>{' '}
                    <div className='font-bold text-default-text w-full'>
                      {`${orderDetails?.orderDetails?.billingAddress1}`}
                      {orderDetails?.orderDetails?.billingAddress2 &&
                        `, ${orderDetails.orderDetails.billingAddress2}`}
                    </div>
                    <div className='font-bold text-default-text w-full'>
                      {`${orderDetails?.orderDetails?.billingCity}`},{' '}
                    </div>{' '}
                    <div className='font-bold text-default-text w-full'>
                      {`${orderDetails?.orderDetails?.billingState}`},{' '}
                      {`${orderDetails?.orderDetails?.billingCountry}`},{' '}
                      {`${orderDetails?.orderDetails?.billingZip}`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* items */}
            <OrderedItems
              className='py-[15px] lg:py-[30px] drop-shadow-md rounded-sm bg-[#FCFFF5] mb-[40px]'
              page='Items'
              orderDetails={orderDetails}
              handleAddToCart={handleAddToCart}
            />
          </SideLayout>
        ),
      }}
    />
  );
};

export default OrderDetails;
