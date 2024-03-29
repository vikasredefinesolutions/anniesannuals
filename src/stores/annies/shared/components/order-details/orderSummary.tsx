import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import PriceLabel from '@/shared/Components/PriceLabel';
import { IProductOrderDetail } from '@/shared/apis/orders/getOrderByOrderNumber';
import { paths } from '@/utils/paths.constant';
import React from 'react';

interface _Props {
  page: string;
  orderDetails: IProductOrderDetail;
  selectCardImage: (orderDetail: IProductOrderDetail) => string;
  productQty: number;
  giftWalletAmount: number;
}

const OrderSummary: React.FC<_Props> = (_Props) => {
  const { page, orderDetails, selectCardImage, productQty, giftWalletAmount } =
    _Props;

  return (
    <>
      <div className='flex flex-wrap'>
        <div className='md:w-8/12 w-full lg:p-[30px] p-[15px] mb-[20px] md:mb-0'>
          <div className='font-bold text-[20px]'>Order Summary</div>
          <div className='py-[5px] flex flex-wrap justify-between items-center'>
            <div className='text-default-text'>{`Subtotal (${productQty} Item):`}</div>
            <PriceLabel
              className='font-bold text-default-text'
              price={orderDetails?.orderSubtotal}
            />
          </div>
          {orderDetails?.orderShippingCosts > 0 && (
            <div className='py-[5px] flex flex-wrap justify-between items-center'>
              <div className='text-default-text'>Shipping:</div>
              <PriceLabel
                className='font-bold text-default-text'
                price={orderDetails?.orderShippingCosts}
              />
            </div>
          )}
          {orderDetails?.orderTax > 0 && (
            <div className='py-[5px] flex flex-wrap justify-between items-center'>
              <div className='text-default-text'>Tax:</div>
              <PriceLabel
                className='font-bold text-default-text'
                price={orderDetails?.orderTax}
              />
            </div>
          )}
          {/* <div className='py-[5px] flex flex-wrap justify-between items-center'>
            <div className='text-default-text'>Non-Member 5% Surcharge:</div>
            <div className='font-bold text-default-text'>$0.00</div>
          </div> */}

          {orderDetails?.giftCertificateDiscountAmount > 0 && (
            <div className='py-[5px] flex flex-wrap justify-between items-center'>
              <div className='text-default-text'>Gift Card Discount:</div>
              -
              <PriceLabel
                className='font-bold text-default-text'
                price={orderDetails?.giftCertificateDiscountAmount}
              />
            </div>
          )}

          {orderDetails?.couponDiscountAmount > 0 && (
            <div className='py-[5px] flex flex-wrap justify-between items-center'>
              <div className='text-default-text'>Coupon Discount:</div>
              <PriceLabel
                deductable='-'
                className='font-bold text-default-text'
                price={orderDetails?.couponDiscountAmount}
              />
            </div>
          )}

          {orderDetails?.storeCredit > 0 && (
            <div className='py-[5px] flex flex-wrap justify-between items-center'>
              <div className='text-default-text'>Store Credit Discount:</div>
              <PriceLabel
                deductable='-'
                className='font-bold text-default-text'
                price={orderDetails?.storeCredit}
              />
            </div>
          )}
          <div className='py-[5px] flex flex-wrap justify-between items-center'>
            <div className='text-default-text font-semibold'>
              Estimated Total:
            </div>
            <PriceLabel
              className='font-bold text-default-text'
              price={orderDetails?.orderTotal}
            />
          </div>
        </div>
        <div className='md:w-4/12 w-full lg:p-[30px] p-[15px] mb-[20px] md:mb-0'>
          <div className='text-small-text mb-[15px] font-semibold'>
            Payment Method
          </div>
          <div className='text-normal-text'>
            <div className='flex flex-wrap items-center'>
              <div>
                {orderDetails?.paymentMethod === 'PAYPAL' && (
                  <>
                    <div className='font-sub font-bold mb-[8px]'>Paypal</div>
                  </>
                )}{' '}
                {orderDetails?.paymentMethod === 'CREDITCARD' &&
                  orderDetails?.cardNumber !== '' && (
                    <>
                      <div className='flex flex-wrap items-center'>
                        <div className='mr-[10px]'>
                          <Image
                            src={`/assets/images/${selectCardImage(
                              orderDetails,
                            )}`}
                            alt='visa card'
                            isStatic={true}
                          />
                        </div>
                        <div>
                          <div className='font-bold mb-[8px]'>
                            Card Ending in {orderDetails?.last4}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                {giftWalletAmount > 0 && (
                  <>
                    <div className='font-sub font-bold mb-[8px]  mt-[10px]'>
                      Gift Wallet
                    </div>
                  </>
                )}
                {orderDetails?.storeCredit > 0 && (
                  <>
                    <div className='font-sub font-bold mb-[8px]  mt-[10px]'>
                      Store Credit Used{' '}
                      <span className='font-light'>
                        {orderDetails?.storeCredit.toFixed(2)}
                      </span>
                    </div>
                  </>
                )}
                {orderDetails?.giftCertiSerialNumber && (
                  <>
                    <div className='font-sub font-bold mb-[8px]  mt-[10px]'>
                      Gift Card{' '}
                      <span className='font-light'>
                        {orderDetails?.giftCertiSerialNumber}
                      </span>
                    </div>
                  </>
                )}
                {orderDetails?.couponCode !== '' && (
                  <>
                    <div className='font-sub font-bold mb-[8px]  mt-[10px]'>
                      Promotional Code{' '}
                      <span className='font-light'>
                        {orderDetails?.couponCode}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {!!page && (
          <div className='text-right w-full lg:p-[30px] p-[15px] mb-[20px] md:mb-0'>
            <CustomLink
              href={paths.home}
              className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'
            >
              KEEP SHOPPING
            </CustomLink>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderSummary;
