import { useAppSelector } from '@/app/redux/hooks';
import { _CartSummaryProps } from '@/features/cart/cartController/controller';
import CustomLink from '@/shared/Components/CustomLink';
import PriceLabel from '@/shared/Components/PriceLabel';
import useModel from '@/stores/annies/shared/hooks/use-model';
import AddShippingZipcode from '@/stores/annies/widgets/header/components/AddShippingZipcode';
import { paths } from '@/utils/paths.constant';
import React from 'react';

const CartSummarry: React.FC<_CartSummaryProps> = ({
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
}) => {
  const { orderSubTotal, orderTotal, cartQuantity, couponDetails, cartData } =
    useAppSelector((state) => state.cart);
  const {
    isOpen: isShippingModalOpen,
    openModel: openShippingModal,
    onRequestClose: closeShippingModal,
  } = useModel(false);

  const date =
    cartData[0]?.estimateShippingDate !== null
      ? new Date(cartData[0]?.estimateShippingDate).toLocaleDateString()
      : '';

  const { growingZone } = useAppSelector((state) => state.common);

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
                <PriceLabel className={''} price={orderSubTotal} />
              </div>
            </div>

            <div className='py-[15px] flex flex-wrap justify-between items-center'>
              <div className='font-semibold text-default-text'>
                Estimated Shipping
                <span className='block sm:inline-block text-small-text font-normal text-[#828282]'>
                  (calculated on checkout)
                </span>
              </div>
              <div className='font-bold text-default-text'>--</div>
            </div>
            {+couponDetails.amount > 0 && (
              <div className='py-[15px] border-b border-b-gray-border flex flex-wrap justify-between items-center'>
                <div className='font-semibold text-default-text'>Discount:</div>
                <div className='font-bold text-default-text'>
                  {' '}
                  <PriceLabel className={''} price={-couponDetails.amount} />
                </div>
              </div>
            )}
            <div className='py-[15px] flex flex-wrap justify-between items-center'>
              <div className='font-semibold text-default-text'>
                Taxes and Fees
                <span className='block sm:inline-block text-small-text font-normal text-[#828282]'>
                  (calculated on checkout)
                </span>
              </div>
              <div className='font-bold text-default-text'>--</div>
            </div>
            <div className='py-[15px] flex flex-wrap justify-between items-center'>
              <div className='font-bold text-medium-text'>
                Estimated Order Total:
              </div>
              <div className='font-bold text-medium-text'>
                <PriceLabel className={''} price={orderTotal} />
              </div>
            </div>
          </div>
          <div className='bg-[#F6EDFF] rounded-sm p-[15px] mx-[15px] mb-[15px]'>
            <div
              className='flex flex-wrap justify-between items-center cursor-pointer'
              onClick={() => setShowDiscountInput(!showDiscountInput)}
            >
              <div className='relative flex ml-[8px]' x-data='{ open: false }'>
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
                    <div
                      className='bg-default border border-gray-border p-[15px] rounded-md overflow-hidden mb-2'
                      // x-show='open'
                      // x-transition:enter='transition ease-out duration-200 transform'
                      // x-transition:enter-start='opacity-0 translate-y-2'
                      // x-transition:enter-end='opacity-100 translate-y-0'
                      // x-transition:leave='transition ease-out duration-200'
                      // x-transition:leave-start='opacity-100'
                      // x-transition:leave-end='opacity-0'
                      // x-cloak
                    >
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
                  onChange={(e) => couponChangeHandler(e.target.value)}
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
          {growingZone.stateName && (
            <div className='mb-[15px] px-[15px]'>
              <div className='text-small-text'>
                <span className='text-[#9F2D3C] mr-[5px]'>
                  Shipping to {growingZone.stateName}{' '}
                  {date !== '' && `on ${date}`}.
                </span>
                <button
                  onClick={openShippingModal}
                  className='text-small-text underline'
                >
                  Change Location
                </button>
              </div>
            </div>
          )}
          <div className='mb-[15px] px-[15px]'>
            <CustomLink
              href={paths.checkout}
              className='btn btn-primary btn-md uppercase !font-body !rounded-xs !inline-flex justify-center !bg-[#9C331C] w-full text-center text-white'
            >
              <span className='material-icons-outlined'>lock</span>
              Checkout
            </CustomLink>
          </div>
        </div>
        <div className='mb-[15px] text-extra-small-text font-semibold text-center'>
          For your convenience, we ship in boxes of 4,6,8 or 12
        </div>
        <div className='border border-primary rounded-[5px] p-[20px] mb-[20px] text-small-text'>
          <div className='border-b border-b-[#D4CEB9] pb-[20px] mb-[20px]'>
            <p className='pb-[5px] text-[#9F2D3C] font-semibold'>
              Check your{' '}
              <a
                href='http://www.accuweather.com/'
                target='_blank'
                className='text-anchor hover:text-secondary cursor-pointer'
              >
                temperatures
              </a>{' '}
              for the ship date below.
            </p>
            <p className='pb-[5px] font-semibold'>
              See{' '}
              <CustomLink href={paths.faq}>Our Guarantee and FAQ.</CustomLink>
            </p>
            <p className='pb-[5px] font-semibold'>
              Order when temperatures in your area will support baby plant
              survival.
            </p>
            <p className='pb-[5px] text-[#9F2D3C] font-semibold'>
              Guarantee is void in extreme temperatures. (BELOW 38℉ or ABOVE
              85℉)
            </p>
          </div>
          <div className='border-b border-b-[#D4CEB9] pb-[20px] mb-[20px]'>
            <p className='pb-[5px] text-[#9F2D3C] font-semibold'>
              Please Note Your Estimated Arrival Date
            </p>
            <p className='font-semibold'>
              Non-plant items can take 5 - 14 days to be delivered.
            </p>
          </div>
          <div className='pb-[10px]'>
            <p className='pb-[5px] font-semibold'>
              Do you know your USDA hardiness{' '}
              <span className='text-[#9F2D3C]'>zone</span>? Find it{' '}
              <span
                onClick={openShippingModal}
                className='underline cursor-pointer'
              >
                HERE
              </span>
              .
            </p>
            <p className='font-semibold pb-[5px]'>
              The ship date noted above is when your plants will leave our
              nursery.
            </p>
            <p className='font-semibold'>
              No cancellations after 5 days from order placed date.
            </p>
          </div>
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
        {/* <div className='border-b border-gray-border' x-data='{open : false}'>
          <div
            className='text-title-text font-sub flex items-center justify-between mb-[15px] pt-[15px] border-t border-gray-border cursor-pointer'
            onClick={() => setOpenBrandDescription(!openBrandDescription)}
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
                We offer a 100% unconditional guarantee for all our perennials
                to reach you in good condition and to grow. If you're not
                satisfied, we'll reship or refund immediately. Please don't
                hesitate to contact us if you have questions or concerns—we
                share your passion for gardening and want your new plants to
                thrive in your border!
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
      {isShippingModalOpen && (
        <AddShippingZipcode closeModal={closeShippingModal} />
      )}
    </div>
  );
};

export default CartSummarry;
