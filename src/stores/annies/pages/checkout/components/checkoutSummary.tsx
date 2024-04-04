import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { showLoader } from '@/app/redux/slices/commonSlice';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import CheckoutSummaryController from '@/features/checkout/checkoutController/checkoutSummaryController';
import CustomLink from '@/shared/Components/CustomLink';
import PriceLabel from '@/shared/Components/PriceLabel';
import useModel from '@/stores/annies/shared/hooks/use-model';
import AddShippingZipcode from '@/stores/annies/widgets/header/components/AddShippingZipcode';
import { paths } from '@/utils/paths.constant';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

const CheckoutSummary = () => {
  const {
    orderSubTotal,
    orderTotal,
    cartQuantity,
    tax,
    couponDetails,
    cartData,
    totalShippingCost,
  } = useAppSelector((state) => state.cart);
  const { checkoutAddressSaved, shipping } = useAppSelector(
    (state) => state.checkout.address,
  );

  const { loggedIn: isEmployeeLoggedIn } = useAppSelector(
    (state) => state.employee,
  );

  const { growingZone } = useAppSelector((state) => state.common);
  const { checkoutShippingSaved } = useAppSelector(
    (state) => state.checkout.shippingMethod,
  );
  const {
    checkoutPaymentSaved,
    giftCardAmount,
    skipPaymentMethod,
    method,
    useGiftWalletBalance,
    useStoreCredit,
    usedGiftCardWalletBalance,
    usedStoreCredits,
  } = useAppSelector((state) => state.checkout.payment);

  const {
    isOpen: isShippingModalOpen,
    openModel: openShippingModal,
    onRequestClose: closeShippingModal,
  } = useModel(false);
  const dispatch = useAppDispatch();

  const date =
    cartData[0]?.isPreOrder && cartData[0]?.futureInventoryShipDate != ''
      ? new Date(cartData[0]?.futureInventoryShipDate).toDateString().split(' ')
      : new Date(cartData[0]?.shippingDate).toDateString().split(' ');

  const preOrderDate =
    cartData[0]?.isPreOrder && cartData[0]?.futureInventoryShipDate != ''
      ? new Date(cartData[0]?.futureInventoryShipDate).toDateString().split(' ')
      : [];

  return (
    <>
      <CheckoutSummaryController
        cases={{
          ready: ({
            removeCouponCodeHandler,
            applyDiscountCouponHandler,
            couponChangeHandler,
            coupon,
            couponCode,
            setShowDiscountInput,
            showDiscountInput,
            setOpenBrandDescription,
            openBrandDescription,
            setShowPromotionalText,
            showPromotionalText,
            handlePlaceOrder,
            storeOrderDetails,
          }) => {
            const couponAvailable = () => {
              return (
                <div className='flex justify-between items-center  pt-[15px]'>
                  <span>{coupon}</span>

                  <button
                    onClick={() => removeCouponCodeHandler(false)}
                    className='btn btn-primary  uppercase !font-body !rounded-xs !py-[10px] md:py-0'
                  >
                    remove
                  </button>
                </div>
              );
            };

            const disableCheckoutButton = () => {
              if (
                checkoutAddressSaved &&
                checkoutPaymentSaved &&
                checkoutShippingSaved
              ) {
                return false;
              }
              return true;
            };

            const disablePayLaterButton = () => {
              if (
                checkoutAddressSaved &&
                checkoutShippingSaved &&
                skipPaymentMethod
              ) {
                return false;
              }
              return true;
            };
            return (
              <div className='w-full lg:w-5/12 xl:w-4/12 px-[15px]'>
                <div className='sticky top-0 pb-[20px]'>
                  <div className='bg-[#FCFFF5] border border-gray-border drop-shadow-md rounded-sm mb-[15px]'>
                    <div className='p-[15px] border-b border-b-gray-border flex flex-wrap justify-between items-center'>
                      <div className='font-sub font-bold text-sub-text'>
                        Order Summary
                      </div>
                      <div className='font-sub font-bold text-normal-text'>
                        {cartQuantity} Items
                      </div>
                    </div>
                    <div className='px-[15px]'>
                      <div className='py-[15px] border-b border-b-gray-border flex flex-wrap justify-between items-center'>
                        <div className='font-semibold text-default-text'>
                          Product Subtotal:
                        </div>
                        <div className='font-bold text-default-text'>
                          <PriceLabel
                            className={''}
                            price={orderSubTotal.toFixed(2)}
                          />
                        </div>
                      </div>
                      <div className='py-[15px] border-b border-b-gray-border flex flex-wrap justify-between items-center'>
                        <div className='font-semibold text-default-text'>
                          Estimated Shipping:
                        </div>
                        <div className='font-bold text-default-text'>
                          {' '}
                          <PriceLabel
                            className={''}
                            price={totalShippingCost.toFixed(2)}
                          />
                        </div>
                      </div>
                      {+couponDetails.amount > 0 && (
                        <div className='py-[15px] border-b border-b-gray-border flex flex-wrap justify-between items-center'>
                          <div className='font-semibold text-default-text'>
                            Discount:
                          </div>
                          <div className='font-bold text-default-text'>
                            {' '}
                            <PriceLabel
                              className={''}
                              price={couponDetails.amount}
                              deductable='-'
                            />
                          </div>
                        </div>
                      )}
                      {giftCardAmount > 0 && (
                        <div className='py-[15px] border-b border-b-gray-border flex flex-wrap justify-between items-center'>
                          <div className='font-semibold text-default-text'>
                            Gift Card Value:
                          </div>
                          <div className='font-bold text-default-text'>
                            {' '}
                            <PriceLabel
                              className={''}
                              price={giftCardAmount.toFixed(2)}
                              deductable='-'
                            />
                          </div>
                        </div>
                      )}
                      {useStoreCredit && (
                        <div className='py-[15px] border-b border-b-gray-border flex flex-wrap justify-between items-center'>
                          <div className='font-semibold text-default-text'>
                            Store Credit Amount:
                          </div>
                          <div className='font-bold text-default-text'>
                            {' '}
                            <PriceLabel
                              className={''}
                              price={usedStoreCredits.toFixed(2)}
                              deductable='-'
                            />
                          </div>
                        </div>
                      )}
                      {useGiftWalletBalance && (
                        <div className='py-[15px] border-b border-b-gray-border flex flex-wrap justify-between items-center'>
                          <div className='font-semibold text-default-text'>
                            Gift Wallet Amount:
                          </div>
                          <div className='font-bold text-default-text'>
                            {' '}
                            <PriceLabel
                              className={''}
                              price={usedGiftCardWalletBalance.toFixed(2)}
                              deductable='-'
                            />
                          </div>
                        </div>
                      )}
                      <div className='py-[15px] flex flex-wrap justify-between items-center'>
                        <div className='font-semibold text-default-text'>
                          Taxes and Fees
                        </div>
                        <div className='font-bold text-default-text'>
                          {' '}
                          <PriceLabel className={''} price={tax.toFixed(2)} />
                        </div>
                      </div>
                      <div className='py-[15px] flex flex-wrap justify-between items-center'>
                        <div className='font-bold text-medium-text'>
                          Estimated Order Total:
                        </div>
                        <div className='font-bold text-medium-text'>
                          <PriceLabel
                            className={''}
                            price={(orderTotal -
                              giftCardAmount -
                              usedStoreCredits +
                              tax <
                            0
                              ? 0
                              : orderTotal -
                                giftCardAmount -
                                usedStoreCredits +
                                tax
                            ).toFixed(2)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='bg-[#F6EDFF] rounded-sm p-[15px] mx-[15px] mb-[15px]'>
                      <div
                        className='flex flex-wrap justify-between items-center cursor-pointer'
                        onClick={() => setShowDiscountInput(!showDiscountInput)}
                      >
                        <div
                          className='relative flex ml-[8px]'
                          x-data='{ open: false }'
                        >
                          <button className=''></button>
                          <div className='font-sub font-semibold text-default-text'>
                            Promotional Code:
                            <span
                              className='bg-primary text-[#ffffff] rounded-full inline-block text-center text-[14px] w-[18px] leading-[18px] h-[18px]'
                              onMouseOver={() => {
                                setShowPromotionalText(true);
                              }}
                              onMouseLeave={() => setShowPromotionalText(false)}
                            >
                              i
                            </span>
                          </div>
                          {showPromotionalText && (
                            <div className='z-10 absolute bottom-full right-0 transform'>
                              <div className='bg-default border border-gray-border p-[15px] rounded-md overflow-hidden mb-2'>
                                <div className='text-extra-small-text !text-white whitespace-nowrap'>
                                  Apply promo code
                                  <br />
                                  to get discount
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className=''>
                          <span className='material-icons-outlined'>
                            {showDiscountInput ? 'expand_less' : 'expand_more'}
                          </span>
                        </div>
                      </div>
                      {coupon && couponAvailable()}
                      {!coupon && showDiscountInput && (
                        <div className='flex items-center pt-[15px]'>
                          <input
                            id='CouponCode'
                            name='CouponCode'
                            placeholder='Enter your code here'
                            onChange={(e) =>
                              couponChangeHandler(e.target.value)
                            }
                            value={couponCode}
                            className='form-input mr-[10px]'
                          />
                          <button
                            onClick={() => applyDiscountCouponHandler(false)}
                            className='btn btn-primary  uppercase !font-body !rounded-xs !py-[10px] md:py-0'
                          >
                            apply
                          </button>
                        </div>
                      )}
                    </div>
                    {!shipping?.state && (
                      <div className='mb-[15px] px-[15px]'>
                        <div className='text-small-text'>
                          {growingZone.stateName && (
                            <span className='text-[#9F2D3C] mr-[5px]'>
                              Shipping to{' '}
                              {shipping?.state ?? growingZone.stateName}{' '}
                              {date.length === 4 &&
                                `week of  ${date[1]} ${date[2]}, ${date[3]}`}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    {preOrderDate.length > 1 && (
                      <div className='mb-[15px] px-[15px]'>
                        <div className='text-small-text'>
                          <span className='text-[#9F2D3C] mr-[5px]'>
                            Pre orders will start shipping in{' '}
                            {`${preOrderDate[1]}, ${preOrderDate[3]}`}
                          </span>
                        </div>
                      </div>
                    )}
                    {!skipPaymentMethod && method !== 'Paypal' && (
                      <div className='mb-[15px] px-[15px]'>
                        <button
                          onClick={() => handlePlaceOrder('ORDERNOW')}
                          disabled={disableCheckoutButton()}
                          className={`btn btn-primary btn-md uppercase !font-body !rounded-xs !inline-flex justify-center !bg-[#9C331C] w-full text-center text-white ${
                            disableCheckoutButton() ? 'opacity-50' : ''
                          }`}
                        >
                          <span className='material-icons-outlined'>lock</span>
                          PLACE ORDER
                        </button>
                      </div>
                    )}
                    {isEmployeeLoggedIn && skipPaymentMethod && (
                      <div className='mb-[15px] px-[15px]'>
                        <button
                          onClick={() => handlePlaceOrder('PAYLATER')}
                          disabled={disablePayLaterButton()}
                          className={`btn btn-primary btn-md uppercase !font-body !rounded-xs !inline-flex justify-center !bg-[#9C331C] w-full text-center text-white ${
                            disablePayLaterButton() ? 'opacity-50' : ''
                          }`}
                        >
                          <span className='material-icons-outlined'>lock</span>
                          PAY LATER
                        </button>
                      </div>
                    )}
                    {orderTotal > 0 && method === 'Paypal' && (
                      <div className=' mb-[15px] px-[15px]'>
                        <PayPalScriptProvider
                          options={{
                            clientId:
                              process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
                            currency: 'USD',
                            intent: 'capture',
                          }}
                        >
                          <PayPalButtons
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
                                      value: (
                                        orderTotal +
                                        tax -
                                        usedStoreCredits -
                                        usedGiftCardWalletBalance
                                      ).toFixed(2),
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
                                  storeOrderDetails('PAYPAL', details);
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
                  {/* <div
                  className='border-b border-gray-border'
                  x-data='{open : false}'
                >
                  <div
                    className='text-title-text font-sub flex items-center justify-between mb-[15px] pt-[15px] border-t border-gray-border cursor-pointer'
                    onClick={() =>
                      setOpenBrandDescription(!openBrandDescription)
                    }
                  >
                    <div className='font-[700]'>100% Guarantee</div>
                    <div className=''>
                      <span className='material-icons-outlined'>
                        {openBrandDescription ? 'remove' : 'add'}
                      </span>
                    </div>
                  </div>
                  {openBrandDescription && (
                    <div className='mb-[30px] text-normal-text'>
                      <div className='mb-[30px] leading-[32px]'>
                        We offer a 100% unconditional guarantee for all our
                        perennials to reach you in good condition and to grow.
                        If you're not satisfied, we'll reship or refund
                        immediately. Please don't hesitate to contact us if you
                        have questions or concerns—we share your passion for
                        gardening and want your new plants to thrive in your
                        border!
                      </div>
                      <div className='rounded-tl-2xl rounded-br-2xl overflow-hidden'>
                        <img
                          src='images/100-guarantee.jpg'
                          className='max-h-full'
                          alt=''
                        />
                      </div>
                    </div>
                  )}
                </div> */}
                </div>
              </div>
            );
          },
        }}
      />
      {isShippingModalOpen && (
        <AddShippingZipcode closeModal={closeShippingModal} page={'checkout'} />
      )}
    </>
  );
};

export default CheckoutSummary;
