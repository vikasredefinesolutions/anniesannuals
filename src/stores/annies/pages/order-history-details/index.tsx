'use client';
import OrderDetailsController from '@/features/myAccount/orderDetails/controller';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import Loader from '@/shared/Components/Loader';
import PriceLabel from '@/shared/Components/PriceLabel';
import { paths } from '@/utils/paths.constant';
import dayjs from 'dayjs';
import React, { Fragment } from 'react';
import SideLayout from '../../shared/components/myAccountLayout';

const OrderDetails: React.FC<any> = ({
  orderNumber,
  orderDetails,
  productList,
}) => {
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
                </div>
                <div className='flex flex-wrap justify-between gap-2 md:gap-5 items-center'>
                  <div className='mb-[10px] md:mb-0'>
                    <CustomLink
                      href={`${paths.ordersHistory}`}
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
                <div className='flex flex-wrap gap-5'></div>
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
                      {dayjs(orderDetails?.orderShipDate).format(
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
                      {orderDetails?.shippingAddress &&
                        `${orderDetails?.shippingAddress}`}
                      {orderDetails?.shippingAddress2 &&
                        `, ${orderDetails?.shippingAddress2}`}
                    </div>
                    <div className='font-bold text-default-text w-full'>
                      {orderDetails?.shippingTown &&
                        `${orderDetails?.shippingTown}, `}
                    </div>{' '}
                    <div className='font-bold text-default-text w-full'>
                      {orderDetails?.shippingState &&
                        `${orderDetails?.shippingState}, `}
                      {orderDetails?.shippingCountry &&
                        `${orderDetails?.shippingCountry}, `}
                      {orderDetails?.shippingZip &&
                        `${orderDetails?.shippingZip}`}
                    </div>
                  </div>
                </div>
                <div className='col-span-12 sm:col-span-4'>
                  <div className='text-small-text font-semibold mb-[5px] sm:mb-0'>
                    Billing Address
                  </div>
                  <div className='mb-[20px] font-bold text-default-text'>
                    <div className='font-bold text-default-text w-full'>
                      {orderDetails?.billingAddress &&
                        `${orderDetails?.billingAddress}`}
                      {orderDetails?.billingAddress2 &&
                        `, ${orderDetails.orderDetails.billingAddress2}`}
                    </div>
                    <div className='font-bold text-default-text w-full'>
                      {`${orderDetails?.billingCity}`},{' '}
                    </div>{' '}
                    <div className='font-bold text-default-text w-full'>
                      {`${orderDetails?.billingState}`},{' '}
                      {orderDetails?.billingCountryCode &&
                        `${orderDetails?.billingCountryCode}`}
                      ,{' '}
                      {orderDetails?.billingPostalCode &&
                        `${orderDetails?.billingPostalCode}`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='py-[15px] lg:py-[30px] drop-shadow-md rounded-sm bg-[#FCFFF5] mb-[40px]'>
              <div className='flex flex-wrap justify-between items-center mb-[20px] gap-5 px-[15px] lg:px-[30px]'>
                <div className='text-title-text font-semibold font-sub mb-[10px] md:mb-0'>
                  Items
                </div>
              </div>
              {productList?.map((productObj: any) => (
                <Fragment key={productObj.productId}>
                  <div className='grid grid-cols-12 gap-6 lg:p-[30px] p-[15px]'>
                    <div className='col-span-12 sm:col-span-2'>
                      <div className='rounded-sm overflow-hidden'>
                        {productObj?.productImage ? (
                          <Image
                            src={productObj.productImage}
                            alt='product'
                            isStatic={false}
                          />
                        ) : (
                          <Image
                            src={`/assets/images/products/sub-category-1.png`}
                            alt='product'
                            isStatic
                          />
                        )}
                      </div>
                    </div>
                    <div className='col-span-12 sm:col-span-3 !bg-[#FCFFF5]'>
                      <div className='text-normal-text font-sub font-bold pb-[10px]'>
                        {productObj.productName}
                      </div>
                    </div>
                    <div className='col-span-12 sm:col-span-1'>
                      <div className='mb-[10px] flex items-center gap-[5px] font-semibold'>
                        <div className='text-small-text'>Qty:</div>
                        <div className='text-default-text font-bold ml-[5px]'>
                          {productObj.quantity}
                        </div>
                      </div>
                    </div>
                    <div className='col-span-12 sm:col-span-3'>
                      <div className='mb-[10px] flex items-center gap-[5px] font-semibold sm:justify-end'>
                        <div className='text-small-text'>Price:</div>
                        <div className='text-default-text font-bold ml-[5px]'>
                          <PriceLabel price={productObj.price} className='' />
                        </div>
                      </div>
                    </div>
                    <div className='col-span-12 sm:col-span-3'>
                      <div className='mb-[10px] flex items-center gap-[5px] font-semibold sm:justify-end'>
                        <div className='text-small-text'>Item Total:</div>
                        <div className='text-default-text font-bold ml-[5px]'>
                          <PriceLabel
                            price={productObj.price * productObj.quantity}
                            className=''
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='border-t border-t-gray-border'></div>
                </Fragment>
              ))}
              <div className='flex flex-wrap'>
                <div className='md:w-8/12 w-full lg:p-[30px] p-[15px] mb-[20px] md:mb-0'>
                  <div className='font-bold text-[20px]'>Order Summary</div>
                  <div className='py-[5px] flex flex-wrap justify-between items-center'>
                    <div className='text-default-text'>{`Subtotal (${productList?.length} Item):`}</div>
                    <PriceLabel
                      className='font-bold text-default-text'
                      price={orderDetails?.orderAmount}
                    />
                  </div>
                  {Number(orderDetails?.shipping) > 0 && (
                    <div className='py-[5px] flex flex-wrap justify-between items-center'>
                      <div className='text-default-text'>Shipping:</div>
                      <PriceLabel
                        className='font-bold text-default-text'
                        price={Number(orderDetails?.shipping)}
                      />
                    </div>
                  )}
                  {Number(orderDetails?.tax) > 0 && (
                    <div className='py-[5px] flex flex-wrap justify-between items-center'>
                      <div className='text-default-text'>Tax:</div>
                      <PriceLabel
                        className='font-bold text-default-text'
                        price={Number(orderDetails?.tax)}
                      />
                    </div>
                  )}
                  <div className='py-[5px] flex flex-wrap justify-between items-center'>
                    <div className='text-default-text font-semibold'>
                      Estimated Total:
                    </div>
                    <PriceLabel
                      className='font-bold text-default-text'
                      price={
                        Number(orderDetails?.shipping) +
                        Number(orderDetails?.tax) +
                        Number(orderDetails?.orderAmount)
                      }
                    />
                  </div>
                </div>
                <div className='text-right w-full lg:p-[30px] p-[15px] mb-[20px] md:mb-0'>
                  <CustomLink
                    href={paths.home}
                    className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'
                  >
                    KEEP SHOPPING
                  </CustomLink>
                </div>
              </div>

              {/* Order summary */}
            </div>
          </SideLayout>
        ),
      }}
    />
  );
};

export default OrderDetails;
