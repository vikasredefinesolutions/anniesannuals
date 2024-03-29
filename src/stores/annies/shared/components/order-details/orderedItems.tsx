import OrderItemController from '@/features/myAccount/orderDetails/orderItemController/controller';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import PriceLabel from '@/shared/Components/PriceLabel';
import { _OrderDetails } from '@/shared/apis/orders/getOrderByOrderNumber';
import StarRatings from '@/stores/annies/shared/components/StarRatings';
import { paths } from '@/utils/paths.constant';
import React, { Fragment } from 'react';
import OrderSummary from './orderSummary';

interface _Props {
  page?: string;
  className?: string;
  orderDetails?: _OrderDetails;
  handleAddToCart: any;
}

const OrderedItems: React.FC<_Props> = (_Props) => {
  const { page, className, orderDetails, handleAddToCart } = _Props;
  return (
    <OrderItemController
      configs={null}
      cases={{
        empty: () => <h2>Empty</h2>,
        loading: () => <h2>Loading...</h2>,
        ready: ({ selectCardImage }) => (
          <>
            <div className={`${className}`}>
              <div className='flex flex-wrap justify-between items-center mb-[20px] gap-5 px-[15px] lg:px-[30px]'>
                <div className='text-title-text font-semibold font-sub mb-[10px] md:mb-0'>
                  {page === 'invoice' ? 'Item Ordered' : 'Items'}
                </div>
                <div className='flex flex-wrap gap-5'>
                  {/* <CustomLink
                    href={`${paths.orderReturn}?orderNumber=${orderDetails?.orderDetails?.id}`}
                    className='btn btn-outline-primary btn-xs uppercase !font-body !rounded-xs !inline-flex gap-[10px] items-center'
                  >
                    <span>Modify/Cancel My Order</span>
                  </CustomLink> */}
                </div>
              </div>
              {orderDetails!!.shoppingCartViewModels?.map((productObj) => (
                <Fragment key={productObj.productId}>
                  <div className='grid grid-cols-12 gap-6 lg:p-[30px] p-[15px]'>
                    <div className='col-span-12 sm:col-span-2'>
                      <div className='rounded-sm overflow-hidden'>
                        <CustomLink href='product-page.html'>
                          {productObj?.colorImage ? (
                            <Image
                              src={productObj.colorImage}
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
                        </CustomLink>
                      </div>
                    </div>
                    <div className='col-span-12 sm:col-span-3 !bg-[#FCFFF5]'>
                      <div className='text-normal-text font-sub font-bold pb-[10px]'>
                        {productObj.productName}
                      </div>
                      <div className='text-default-text pb-[10px]'>
                        {productObj.customFields.find(
                          (item: any) => item.label == 'GENUS SPECIES NAME',
                        )?.value ?? ''}
                      </div>
                      <div className='flex flex-wrap w-full pb-[10px]'>
                        <StarRatings
                          rating={+productObj.productRatingAverage!!}
                          textsize={'mr-[10px'}
                        />
                        <div className='w-full sm:w-auto mr-[10px]'>
                          <CustomLink
                            href={undefined}
                            className='text-extra-small-text'
                          >
                            {productObj.productRatingAverage}
                          </CustomLink>
                        </div>
                        <div className='w-full sm:w-auto'>
                          <CustomLink
                            href={`${paths.productReview}/${productObj.productId}`}
                            className='text-extra-small-text underline'
                          >
                            {productObj.productReviewsCount} Reviews
                          </CustomLink>
                        </div>
                      </div>
                      <div className='pt-[10px]'>
                        <button
                          onClick={() => handleAddToCart(productObj)}
                          className='btn btn-primary !bg-anchor text-white !font-body !rounded-xs !inline-flex gap-[10px] items-center !py-[8.5px]'
                        >
                          <Image
                            src={'/assets/images/cartOrderDetails.svg'}
                            alt={'cart'}
                            isStatic={true}
                          />
                          <span className='text-small-text text-white'>
                            Buy Again
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className='col-span-12 sm:col-span-1'>
                      <div className='mb-[10px] flex items-center gap-[5px] font-semibold'>
                        <div className='text-small-text'>Qty:</div>
                        <div className='text-default-text font-bold ml-[5px]'>
                          {productObj.totalQty}
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
                            price={productObj.totalPrice}
                            className=''
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='border-t border-t-gray-border'></div>
                </Fragment>
              ))}
              <OrderSummary
                page={'Items'}
                orderDetails={orderDetails!!.orderDetails}
                selectCardImage={selectCardImage}
                productQty={orderDetails?.shoppingCartViewModels?.reduce(
                  (acc: any, curr: any) => acc + curr.totalQty,
                  0,
                )}
                giftWalletAmount={orderDetails?.giftCardWalletAmount || 0}
              />

              {/* Order summary */}
            </div>
          </>
        ),
      }}
    />
  );
};

export default OrderedItems;
