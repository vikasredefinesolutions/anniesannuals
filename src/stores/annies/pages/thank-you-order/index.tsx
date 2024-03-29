'use client';
import ThankYouOrderController from '@/features/thankYouOrder/controller';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import Loader from '@/shared/Components/Loader';
import PriceLabel from '@/shared/Components/PriceLabel';
import { _CartItem } from '@/shared/apis/cart/fetchCartProducts';
import { getUserDetails } from '@/shared/utils/cookie.helper';
import { selectCardImage } from '@/utils/helpers';
import { paths } from '@/utils/paths.constant';
import dayjs from 'dayjs';

const ThankYouOrder = () => {
  const userDetails = getUserDetails();
  return (
    <ThankYouOrderController
      cases={{
        loading: () => <Loader />,
        ready: ({ orderNumber, orderDetails, checkCommonName }) => {
          return (
            <>
              <div className='font-body' id='printOrder'>
                <header>
                  <nav aria-label='Top'>
                    <div className='bg-tertiary'>
                      <div className='container mx-auto'>
                        <div className='text-center p-[10px]'>
                          <CustomLink
                            title='Annie`s Annuals and Perennials'
                            className='inline-block'
                            href={paths.home}
                          >
                            <Image
                              isStatic
                              alt=''
                              src='/assets/images/logo.png'
                              className=''
                            />
                          </CustomLink>
                        </div>
                      </div>
                    </div>
                  </nav>
                </header>

                <section
                  id='section-to-print'
                  className='bg-tertiary pt-[30px] pb-[30px]'
                >
                  <div className='container mx-auto '>
                    <div className='flex flex-wrap justify-between items-center gap-5 mb-[15px] printOptionHidden'>
                      <div className=''>
                        <CustomLink
                          href={paths.home}
                          className='text-small-text font-sub'
                        >
                          <span className='inline-block align-middle material-icons mr-[5px]'>
                            chevron_left
                          </span>{' '}
                          <span className='inline-block align-middle'>
                            Continue Shopping
                          </span>
                        </CustomLink>
                      </div>
                      <div className=''>
                        <button
                          className='!flex flex-wrap items-center gap-x-[10px] text-anchor cursor-pointer'
                          onClick={() => window.print()}
                        >
                          <span>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='14'
                              height='15.077'
                              viewBox='0 0 14 15.077'
                            >
                              <path
                                id='Path_48812'
                                data-name='Path 48812'
                                d='M6.288,1.5A1.346,1.346,0,0,0,4.942,2.846V4.993c-.306.038-.611.079-.915.125A2.1,2.1,0,0,0,2.25,7.212v4.519A2.154,2.154,0,0,0,4.4,13.885H4.6l-.111,1.224a1.346,1.346,0,0,0,1.34,1.468h6.846a1.346,1.346,0,0,0,1.34-1.468L13.9,13.885H14.1a2.154,2.154,0,0,0,2.154-2.154V7.212a2.1,2.1,0,0,0-1.778-2.094q-.456-.068-.915-.124V2.846A1.346,1.346,0,0,0,12.212,1.5Zm6.192,3.378V2.846a.269.269,0,0,0-.269-.269H6.288a.269.269,0,0,0-.269.269V4.878a35.433,35.433,0,0,1,6.462,0Zm-.156,5.934a.267.267,0,0,1,.239.242l.378,4.153a.269.269,0,0,1-.269.294H5.827a.269.269,0,0,1-.269-.294l.378-4.153a.268.268,0,0,1,.239-.242,29.968,29.968,0,0,1,6.15,0Zm.694-2.85a.538.538,0,0,1,.538-.538h.006a.538.538,0,0,1,.538.538v.006a.538.538,0,0,1-.538.538h-.006a.538.538,0,0,1-.538-.538ZM11.4,7.423a.538.538,0,0,0-.538.538v.006a.539.539,0,0,0,.538.538h.006a.538.538,0,0,0,.538-.538V7.962a.538.538,0,0,0-.538-.538Z'
                                transform='translate(-2.25 -1.5)'
                                fill-rule='evenodd'
                              ></path>
                            </svg>{' '}
                          </span>
                          <span className='text-small-text hover:underline'>
                            Print invoice
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className='w-full mb-[30px] text-center font-sub font-bold text-2xl-text sm:flex items-center justify-center'>
                      <span className='material-icons text-[#388C1D] mr-[5px] text-2xl-text align-middle w-full sm:w-auto mb-[5px] sm:mb-0'>
                        check_circle
                      </span>{' '}
                      <span className='w-full sm:w-auto'>
                        Thank You. Your order has been successfully placed!
                      </span>
                    </div>

                    <div className='bg-[#FCFFF5] rounded-sm p-[15px] md:p-[40px] md:pb-[50px] drop-shadow-md mb-[30px]'>
                      <div className='text-title-text font-sub font-bold mb-[10px]'>
                        Order Number:{' '}
                        <span className='text-[#3B5697]'>{orderNumber}</span>
                      </div>
                      <div className='text-default-text mb-[18px] font-semibold font-sub flex flex-wrap gap-x-[70px] gap-y-[10px]'>
                        <div className=''>
                          Time placed:{' '}
                          <span className='font-bold'>
                            {dayjs(orderDetails?.orderDetails.orderDate).format(
                              `MM/DD/YYYY`,
                            )}
                          </span>
                        </div>
                        {/* <div className=''>
                          Arriving on or before:{' '}
                          <span className='font-bold'>
                            {dayjs(
                              orderDetails?.orderDetails.inHandDate,
                            ).format(`MM/DD/YYYY`)}
                          </span>
                        </div> */}
                      </div>
                      <div className='text-normal-text'>
                        We are processing your order and have sent you a
                        confirmation email on{' '}
                        <CustomLink
                          href='mailto:john.newman@gmail.com'
                          className='font-semibold'
                        >
                          {userDetails?.email}
                        </CustomLink>
                      </div>
                    </div>

                    <div className='bg-[#FCFFF5] rounded-sm p-[15px] md:p-[40px] md:pb-[50px] drop-shadow-md mb-[30px]'>
                      <div className='flex flex-wrap mx-[-15px]'>
                        <div className='md:w-6/12 w-full px-[15px] mb-[20px] md:mb-0'>
                          <div className='font-sub font-bold text-medium-text mb-[15px]'>
                            Billing Address
                          </div>
                          <div className='text-normal-text'>
                            <div>
                              <p>
                                {`${orderDetails?.orderDetails.billingFirstName} ${orderDetails?.orderDetails.billingLastName}`}
                                ,
                              </p>{' '}
                              <p>
                                {`${orderDetails?.orderDetails.billingAddress1}`}
                                {orderDetails?.orderDetails.billingAddress2 &&
                                  `, ${orderDetails.orderDetails.billingAddress2}`}
                              </p>
                              <p>
                                {`${orderDetails?.orderDetails.billingCity}`},{' '}
                              </p>{' '}
                              <p>
                                {`${orderDetails?.orderDetails.billingState}`},{' '}
                                {`${orderDetails?.orderDetails.billingCountry}`}
                                , {`${orderDetails?.orderDetails.billingZip}`}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className='md:w-6/12 w-full px-[15px] mb-[20px] md:mb-0'>
                          <div className='font-sub font-bold text-medium-text mb-[15px]'>
                            Shipping Address
                          </div>
                          <div className='text-normal-text'>
                            <div>
                              <p>
                                {`${orderDetails?.orderDetails.shippingFirstName} ${orderDetails?.orderDetails.shippingLastName}`}
                                ,
                              </p>{' '}
                              <p>
                                {`${orderDetails?.orderDetails.shippingAddress1}`}
                                {orderDetails?.orderDetails.shippingAddress2 &&
                                  `, ${orderDetails.orderDetails.shippingAddress2}`}
                              </p>
                              <p>
                                {`${orderDetails?.orderDetails.shippingCity}`},{' '}
                              </p>{' '}
                              <p>
                                {`${orderDetails?.orderDetails.shippingState}`},{' '}
                                {`${orderDetails?.orderDetails.shippingCountry}`}
                                , {`${orderDetails?.orderDetails.shippingZip}`}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='bg-[#FCFFF5] rounded-sm p-[15px] md:p-[40px] md:pb-[50px] drop-shadow-md mb-[30px]'>
                      <div className='flex flex-wrap mx-[-15px]'>
                        <div className='md:w-6/12 w-full px-[15px] mb-[20px] md:mb-0'>
                          <div className='font-sub font-bold text-medium-text mb-[15px]'>
                            Shipping Information
                          </div>
                          <div className='text-normal-text'>
                            <div className='flex flex-wrap items-center mb-[6px]'>
                              <span className='font-sub font-bold mr-[15px]'>
                                {orderDetails?.orderDetails.shippingMethod}
                              </span>{' '}
                              <span className='font-bold mr-[15px]'>
                                ${orderDetails?.orderDetails.orderShippingCosts}
                              </span>{' '}
                              {/* <span className='font-body ml-0 sm:ml-[10px] text-small-text font-semibold my-[10px] sm:my-0 w-full sm:w-auto'>
                                <span className='text-[#9F2D3C]'>
                                  Shipping to{' '}
                                  {orderDetails?.orderDetails.shippingState} on
                                  {dayjs(
                                    orderDetails?.orderDetails.inHandDate,
                                  ).format(`MM/DD/YYYY`)}
                                  .
                                </span>
                              </span> */}
                            </div>
                            {/* <div className='text-default-text mb-[26px]'>
                              5-6 Business Days
                            </div> */}
                            {orderDetails?.orderDetails.giftPackNote && (
                              <>
                                <div className='text-default-text font-bold'>
                                  Gift Box -{' '}
                                  {orderDetails?.orderDetails.isGiftWrap
                                    ? 'Yes'
                                    : 'No'}
                                </div>
                                <div className='text-default-text font-bold'>
                                  Gift Note -{' '}
                                  {orderDetails?.orderDetails.giftPackNote}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        {/* {console.log(orderDetails, '<----order details')} */}
                        <div className='md:w-6/12 w-full px-[15px] mb-[20px] md:mb-0'>
                          <div className='font-sub font-bold text-medium-text mb-[15px]'>
                            Payment Information
                          </div>
                          <div className='text-normal-text'>
                            <div className='flex flex-wrap items-center'>
                              <div>
                                {orderDetails?.orderDetails.paymentMethod ===
                                  'PAYPAL' && (
                                  <>
                                    <div className='font-sub font-bold mb-[8px]'>
                                      Paypal
                                    </div>
                                  </>
                                )}{' '}
                                {orderDetails?.orderDetails.paymentMethod ===
                                  'CREDITCARD' &&
                                  orderDetails?.orderDetails?.last4 && (
                                    <>
                                      <div className='flex flex-wrap items-center'>
                                        <div className='mr-[10px]'>
                                          <Image
                                            src={`/assets/images/${selectCardImage(
                                              orderDetails?.orderDetails,
                                            )}`}
                                            alt='visa card'
                                            isStatic={true}
                                          />
                                        </div>
                                        <div>
                                          <div className='font-bold mb-[8px]'>
                                            Card Ending in{' '}
                                            {orderDetails?.orderDetails?.last4}
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                {orderDetails?.orderDetails.storeCredit ? (
                                  <div className='font-sub font-bold mb-[8px]'>
                                    Store Credit: $
                                    {orderDetails?.orderDetails.storeCredit}
                                  </div>
                                ) : null}
                                {orderDetails?.orderDetails
                                  ?.giftCertiSerialNumber && (
                                  <>
                                    <div className='font-sub font-bold mb-[8px]'>
                                      Gift Card :{' '}
                                      {
                                        orderDetails?.orderDetails
                                          ?.giftCertiSerialNumber
                                      }
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-wrap mx-[-15px]'>
                      <div className='w-full lg:w-8/12 px-[15px]'>
                        <div className='lg:max-w-[840px] w-full mb-[30px] lg:mb-0'>
                          {orderDetails?.shoppingCartViewModels.map(
                            (orderObj: _CartItem, index: number) => (
                              <div
                                className=''
                                key={orderObj.productId + index}
                              >
                                <div className='pb-[10px] border-b border-b-[#D4CEB9] mb-[15px] last:border-0 last:mb-0 last:pb-0 pt-[10px] first:pt-0'>
                                  <div className='flex flex-wrap mx-[-15px]'>
                                    <div className='sm:w-4/12 lg:w-3/12 w-1/2 px-[15px] mb-[15px]'>
                                      <div className='mb-[5px]'>
                                        <Image
                                          isStatic={false}
                                          src={`${orderObj.colorImage}`}
                                          className='rounded-sm overflow-hidden'
                                          alt=''
                                        />
                                      </div>
                                    </div>
                                    <div className='sm:w-8/12 lg:w-9/12 w-1/2 px-[15px] mb-[15px]'>
                                      <div className=''>
                                        <div className='text-normal-text font-bold font-sub mb-[7px]'>
                                          {orderObj.productName}
                                        </div>
                                        {checkCommonName(
                                          orderObj?.customFields,
                                        ) && (
                                          <div className='text-normal-text italic font-sub opacity-80 mb-[7px]'>
                                            '
                                            {checkCommonName(
                                              orderObj?.customFields,
                                            )}
                                            '
                                          </div>
                                        )}

                                        {/* <div className='text-small-text opacity-80 mb-[15px]'>
                                            Height: 12-15" - Benificial for
                                            Pollinators, Attracts butterflies,
                                            Deer Resistant, Long Blooming
                                          </div> */}
                                        <div className='text-default-text font-semibold mb-[10px] flex items-center gap-[5px] font-sub'>
                                          <div className=''>Qty:</div>
                                          <div className=''>
                                            {orderObj.totalQty}
                                          </div>
                                        </div>
                                        <div className='text-default-text font-semibold mb-[10px] flex items-center gap-[5px]'>
                                          <div className='font-sub'>Price:</div>
                                          <PriceLabel
                                            className='font-bold'
                                            price={orderObj.price}
                                          />
                                        </div>
                                        <div className='text-default-text font-semibold mb-[10px] flex items-center gap-[5px]'>
                                          <div className='font-sub'>
                                            Item Total:
                                          </div>
                                          <PriceLabel
                                            className='font-bold'
                                            price={orderObj.totalPrice}
                                          />
                                        </div>
                                        {/* <div className='text-default-text font-semibold mb-[10px] flex items-center gap-[5px]'>
                                          <div className='font-sub'>
                                            {dayjs(orderObj.estimateDeliveryDate).format('MMMM, D')}
                                          </div>
                                        </div> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </div>

                      <div className='w-full lg:w-4/12 px-[15px]'>
                        <div className='bg-[#FCFFF5] border border-gray-border drop-shadow-md rounded-sm mb-[30px]'>
                          <div className='p-[15px] border-b border-b-gray-border flex flex-wrap justify-between items-center'>
                            <div className='font-sub font-bold text-sub-text'>
                              Order Summary
                            </div>
                            <div className='font-sub font-bold text-default-text'>
                              {orderDetails?.shoppingCartViewModels.length}{' '}
                              Items
                            </div>
                          </div>
                          <div className='px-[15px]'>
                            <div className='py-[15px] border-b border-b-gray-border flex flex-wrap justify-between items-center'>
                              <div className='font-semibold text-default-text'>
                                Product Subtotal:
                              </div>

                              <PriceLabel
                                price={
                                  +orderDetails?.orderDetails.orderSubtotal!
                                }
                                className='font-bold text-default-text'
                              />
                            </div>
                            <div className='py-[15px] border-b border-b-gray-border flex flex-wrap justify-between items-center'>
                              <div className='font-semibold text-default-text'>
                                Shipping:
                              </div>
                              <PriceLabel
                                price={
                                  orderDetails?.orderDetails
                                    ?.orderShippingCosts ?? '0'
                                }
                                className='font-bold text-default-text'
                              />
                            </div>
                            {orderDetails?.orderDetails?.orderTax! > 0 && (
                              <div className='py-[15px] border-b border-b-gray-border flex flex-wrap justify-between items-center'>
                                <div className='font-semibold text-default-text'>
                                  Taxes and Fees
                                </div>
                                <div className='font-bold text-default-text'>
                                  <PriceLabel
                                    price={
                                      orderDetails?.orderDetails?.orderTax!
                                    }
                                    className='font-bold text-default-text'
                                  />
                                </div>
                              </div>
                            )}
                            {orderDetails?.orderDetails.storeCredit! > 0 && (
                              <div className='py-[15px] border-b border-b-gray-border flex flex-wrap justify-between items-center'>
                                <div className='font-semibold text-default-text'>
                                  Store Credit
                                </div>
                                <PriceLabel
                                  deductable='-'
                                  price={orderDetails?.orderDetails.storeCredit}
                                  className='font-bold text-default-text'
                                />
                              </div>
                            )}
                            {orderDetails?.orderDetails
                              .giftCertificateDiscountAmount! > 0 && (
                              <div className='py-[15px] border-b border-b-gray-border flex flex-wrap justify-between items-center'>
                                <div className='font-semibold text-default-text'>
                                  Gift Card Discount
                                </div>
                                <PriceLabel
                                  deductable='-'
                                  price={
                                    orderDetails?.orderDetails
                                      .giftCertificateDiscountAmount!
                                  }
                                  className='font-bold text-default-text'
                                />
                              </div>
                            )}
                            {orderDetails &&
                            orderDetails?.orderDetails?.couponDiscountAmount >
                              0 ? (
                              <div className='py-[15px] border-b border-b-gray-border flex flex-wrap justify-between items-center'>
                                <div className='font-semibold text-default-text'>
                                  Discount:
                                </div>

                                <PriceLabel
                                  deductable='-'
                                  price={
                                    +orderDetails?.orderDetails
                                      ?.couponDiscountAmount
                                  }
                                  className='font-bold text-default-text'
                                />
                              </div>
                            ) : null}
                            <div className='py-[15px] flex flex-wrap justify-between items-center'>
                              <div className='font-bold text-medium-text'>
                                Order Total:
                              </div>
                              <PriceLabel
                                price={+orderDetails?.orderDetails.orderTotal!}
                                className='font-bold text-default-text'
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </>
          );
        },
      }}
    />
  );
};

export default ThankYouOrder;
