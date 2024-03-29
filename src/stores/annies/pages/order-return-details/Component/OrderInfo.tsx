import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import PriceLabel from '@/shared/Components/PriceLabel';
import { _CartItem } from '@/shared/apis/cart/fetchCartProducts';
import { paths } from '@/utils/paths.constant';
import dayjs from 'dayjs';
import React from 'react';
import StarRatings from '../../../shared/components/StarRatings';

interface IProps {
  cartObj: _CartItem;
  statusBarCssController: (status: string) => string;
  handleAddToCart: any;
  orderNumber: number;
  selectedTab: string;
}

const OrderInfo: React.FC<IProps> = ({
  cartObj,
  statusBarCssController,
  handleAddToCart,
  orderNumber,
  selectedTab,
}) => {
  return (
    <>
      <div className='grid grid-cols-12 gap-6 border-b border-[#D4D4D4] py-[15px] lg:py-[30px]'>
        <div className='col-span-12 md:col-span-2'>
          <div className='rounded-sm overflow-hidden'>
            {' '}
            <CustomLink href={`/${cartObj.seName}.html`}>
              <Image
                src={
                  cartObj.colorImage
                    ? cartObj.colorImage
                    : `/assets/images/products/sub-category-1.png`
                }
                alt={cartObj.colorImage ? cartObj.productName : 'Placeholder'}
                isStatic={cartObj.colorImage ? false : true}
              />
            </CustomLink>
          </div>
        </div>
        <div className='col-span-12 md:col-span-10'>
          <div className='flex flex-wrap w-full'>
            <div className='w-full text-medium-text font-bold mb-[10px] flex justify-between'>
              <CustomLink href={`/${cartObj.seName}.html`}>
                {cartObj.productName}
              </CustomLink>
              <span>
                {selectedTab == 'Refunded' ? 'Refund' : 'Total'}:{' '}
                <PriceLabel
                  price={
                    selectedTab == 'Refunded'
                      ? cartObj?.refundedAmount
                      : cartObj?.totalPrice
                  }
                  className=''
                  divCheck={false}
                />
              </span>
            </div>
            <div className='w-full sm:flex'>
              <div className='w-full md:w-5/12'>
                <div className='text-default-text mb-[10px]'>
                  {cartObj.customFields.find(
                    (item: any) => item.label == 'GENUS SPECIES NAME',
                  )?.value ?? ''}
                </div>
                {cartObj.productRatingAverage && (
                  <div className='flex items-center gap-x-[10px] mb-[20px]'>
                    <div className='flex items-center gap-0 text-[#FFC557] order-2 sm:order-1'>
                      <StarRatings
                        rating={+cartObj.productRatingAverage}
                        textsize={'text-[26px]'}
                      />
                    </div>
                    <div className='sm:justify-center text-extra-small-text flex order-1 sm:order-2'>
                      {cartObj.productRatingAverage}
                    </div>
                    <div className='sm:justify-center text-extra-small-text flex order-1 sm:order-2'>
                      <CustomLink
                        className='underline hover:no-underline'
                        href={`${paths.productReview}/${cartObj.productId}`}
                      >
                        {cartObj.productReviewsCount} reviews
                      </CustomLink>
                    </div>
                  </div>
                )}
                <div className='mb-[10px]'>
                  <span className='text-small-text !font-[600]'>
                    {`${selectedTab == 'Refunded' ? 'Refund qty:' : 'Qty:'}`}{' '}
                  </span>
                  <span className='text-default-text font-[700]'>
                    {selectedTab == 'Refunded'
                      ? cartObj?.refundQty
                      : cartObj.totalQty}
                  </span>
                </div>
                <div className='text-default-text mb-[10px]'>
                  <span className='text-small-text !font-[600]'>Price:</span>
                  <span className='text-default-text font-[700]'>
                    ${Number(cartObj.price).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className='w-full md:w-4/12'>
                <div className='mb-[20px]'>
                  <div className='text-small-text mb-[10px] !font-[600]'>
                    Status:
                  </div>
                  <div className={statusBarCssController(cartObj.status!)}>
                    {cartObj.status}
                  </div>
                </div>

                {!(
                  cartObj.status == 'Shipped' || cartObj.status == 'Delivered'
                ) && (
                  <div className='mb-[10px]'>
                    <div className='text-small-text mb-[10px] !font-[600]'>
                      Est. Shipping:
                    </div>
                    <div className='text-default-text font-[700]'>
                      {cartObj?.estimateShippingDate
                        ? dayjs(cartObj?.estimateShippingDate).format(
                            'MMMM D, YYYY',
                          )
                        : 'Will update you later'}
                    </div>
                  </div>
                )}
              </div>
              <div className='w-full md:w-3/12'>
                {cartObj.status == 'Processing' ? (
                  <>
                    <div className='mb-[20px]'>
                      <div className='text-small-text mb-[10px] !font-[600]'>
                        &nbsp;
                      </div>
                      <div className='w-auto inline-block px-[15px] py-[5px] rounded-[5px] text-default-text font-[600]'>
                        &nbsp;
                      </div>
                    </div>
                    <div className='mb-[10px]'>
                      <div className='text-small-text mb-[10px] !font-[600]'>
                        Est. Delivery:
                      </div>
                      <div className='text-default-text font-[700]'>
                        {cartObj?.estimateDeliveryDate
                          ? dayjs(cartObj.estimateDeliveryDate).format(
                              'MMMM D, YYYY',
                            )
                          : 'Will update you later'}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {cartObj.status == 'Delivered' && (
                      <div className='mb-[10px] sm:text-right'>
                        <CustomLink
                          href={`${paths.orderReturn}?orderNumber=${orderNumber}&type=return`}
                        >
                          <button className='w-full btn btn-outline-primary btn-xs uppercase !font-body !rounded-xs !inline-flex gap-[10px] items-center justify-center !text-anchor'>
                            <Image
                              src={'/assets/images/return.svg'}
                              alt={'Review Icon'}
                              isStatic={true}
                            />
                            <span>Return Item</span>
                          </button>
                        </CustomLink>
                      </div>
                    )}
                    {cartObj?.productName.split(' ')[0] !== 'Gift' && (
                      <div className='mb-[10px] sm:text-right'>
                        <CustomLink
                          href={`${paths.writeReview}?productId=${
                            cartObj?.productId
                          }&&attributeId=${cartObj?.attributeOptionId || 0}`}
                        >
                          <button className='w-full btn btn-outline-primary btn-xs uppercase !font-body !rounded-xs !inline-flex gap-[10px] items-center justify-center !text-anchor'>
                            <Image
                              src={'/assets/images/writeReviewIcon.svg'}
                              alt={'Review Icon'}
                              isStatic={true}
                            />
                            <span>Write Review</span>
                          </button>
                        </CustomLink>
                      </div>
                    )}

                    <div className='mb-[10px] sm:text-right'>
                      <button
                        className='w-full btn btn-primary btn-xs uppercase !font-body !rounded-xs !inline-flex items-center justify-center !bg-anchor gap-[10px] !border-anchor !text-white'
                        onClick={() => {
                          handleAddToCart(cartObj);
                        }}
                      >
                        <Image
                          src={'/assets/images/cart-icon-white.svg'}
                          alt={'Buy Again'}
                          isStatic={true}
                        />
                        <span>Buy Again</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderInfo;
