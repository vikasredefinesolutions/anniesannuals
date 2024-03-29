'use client';
import { useAppSelector } from '@/app/redux/hooks';
import CustomCarousel from '@/components/common/Carousel/CustomCarousel';
import CartController, {
  _ReadyProps,
} from '@/features/cart/cartController/controller';
import { tStoreDetailsFile } from '@/helper/staticfile.helper';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import Loader from '@/shared/Components/Loader';
import { _CartItem } from '@/shared/apis/cart/fetchCartProducts';
import { paths } from '@/utils/paths.constant';
import BreadCrumbs from '../../shared/components/BreadCrumbs';
import useModel from '../../shared/hooks/use-model';
import AddShippingZipcode from '../../widgets/header/components/AddShippingZipcode';
import CartItem from './components/CartItem';
import CartSummarry from './components/CartSummary';

interface iProps {
  cmsStoreThemeConfigsViewModel: tStoreDetailsFile['cmsStoreThemeConfigsViewModel'];
}
const Cart: React.FC<iProps> = (props) => {
  const { isLoading } = useAppSelector((state) => state.common);
  const {
    isOpen: isShippingModalOpen,
    openModel: openShippingModal,
    onRequestClose: closeShippingModal,
  } = useModel(false);
  return (
    <>
      <BreadCrumbs breadCrumbs={[]} />
      <CartController
        cmsStoreThemeConfigsViewModel={props.cmsStoreThemeConfigsViewModel}
        cases={{
          empty: () => {
            return (
              <section className=''>
                <div className='relative'>
                  <div className='overflow-hidden w-full h-full lg:h-[626px] sm:h-[400px] h-auto'>
                    <Image
                      className='max-w-none w-full h-full mx-auto'
                      src='/annies/1/store/5/images/empty-cart-banner.png'
                      alt=''
                    />
                  </div>
                  <div className='sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2'>
                    <div className='p-[10px] bg-[#F6EDFF] sm:bg-opacity-90 relative overflow-hidden sm:rounded-tl-lg sm:rounded-br-lg lg:min-w-[950px] md:min-w-[700px] sm:min-w-[600px] min-w-full'>
                      <div className='pt-[20px] sm:pt-[40px] text-center'>
                        <div className='flex justify-center'>
                          <Image
                            src='/assets/images/empty-card.png'
                            alt='text-center'
                            isStatic={true}
                          />
                        </div>
                        <div className='font-sub font-bold lg:text-[60px] md:text-[32px] text-[24px] text-anchor sm:pb-[40px] pb-[20px] max-w-[600px] mx-auto'>
                          Your cart is empty
                        </div>
                        <div className='text-normal-text max-w-[450px] mx-auto sm:pb-[40px] pb-[20px]'>
                          Fill it up with some beautiful plants!
                        </div>
                        <div className='sm:flex flex-wrap items-center justify-between max-w-[450px] sm:pb-[40px] pb-[20px] mx-auto'>
                          <div className='mb-[10px] sm:mb-0 w-full sm:w-auto'>
                            <CustomLink
                              href={paths.productListingAtoZ}
                              className='text-normal-text uppercase font-bold underline hover:text-anchor-hover'
                            >
                              check out our plants{' '}
                            </CustomLink>
                          </div>
                          <div className='mb-[10px] sm:mb-0 w-full sm:w-auto'>
                            <CustomLink
                              href={paths.shopTheGarden}
                              className='text-normal-text uppercase font-bold underline hover:text-anchor-hover'
                            >
                              shop the garden{' '}
                            </CustomLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          },
          loading: () => <Loader />,
          ready: ({
            cartData,
            isEmployeeLoggedIn,
            removeCouponCodeHandler,
            applyDiscountCouponHandler,
            couponChangeHandler,
            coupon,
            setShowDiscountInput,
            showDiscountInput,
            setOpenBrandDescription,
            openBrandDescription,
            setShowPromotionalText,
            showPromotionalText,
            couponCode,
            savedForLater,
            buyItWithProductData,
            setStatus,
          }: _ReadyProps) => {
            return (
              <>
                <section className='bg-tertiary'>
                  <div className='container mx-auto'>
                    <div className=''>
                      <h1 className='font-sub font-bold text-2xl-text mb-[30px]'>
                        Shopping Cart
                      </h1>
                      <div className='pb-[20px] text-default-text'>
                        <p className='pb-[10px]'>
                          We ship plants year-round, anywhere in the continental
                          US unless restricted by law.{' '}
                          <span style={{ fontWeight: 'bold' }}>
                            Please purchase plants when you are ready to plant
                            them outside and choose plants appropriate for your{' '}
                            <u>
                              <span
                                onClick={openShippingModal}
                                className='cursor-pointer'
                              >
                                USDA zone
                              </span>
                            </u>
                            .
                          </span>
                        </p>
                        <ul className='list-disc px-[15px]'>
                          <li>
                            Non-plant items ship separately from plants and can
                            take up to 5-9 days for delivery.
                          </li>
                          <li>
                            The ship date you choose is the date we ship your
                            plants and non-plant items from our nursery.
                          </li>
                          <li>
                            Once your order has been submitted, we cannot make
                            changes.
                          </li>
                        </ul>
                      </div>
                      <div className='flex flex-wrap mx-[-15px]'>
                        <div className='w-full lg:w-7/12 xl:w-8/12 px-[15px]'>
                          <div className='lg:max-w-[840px] w-full'>
                            <div className='pb-[50px] mb-[40px]'>
                              <div className='flex justify-between text-default-text font-sub font-semibold'>
                                <div className='font-sub font-bold text-normal-text mb-[30px]'>
                                  Items in your cart:
                                </div>
                                <div className=''>Total</div>
                              </div>
                              <div className=''>
                                {cartData.map((item: _CartItem) => {
                                  return (
                                    <CartItem
                                      key={item.shoppingCartItemsId}
                                      item={item}
                                      isEmployeeLoggedIn={isEmployeeLoggedIn}
                                      setStatus={setStatus}
                                    />
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                        <CartSummarry
                          removeCouponCodeHandler={removeCouponCodeHandler}
                          applyDiscountCouponHandler={
                            applyDiscountCouponHandler
                          }
                          couponChangeHandler={couponChangeHandler}
                          coupon={coupon}
                          couponCode={couponCode}
                          setShowDiscountInput={setShowDiscountInput}
                          showDiscountInput={showDiscountInput}
                          setOpenBrandDescription={setOpenBrandDescription}
                          openBrandDescription={openBrandDescription}
                          setShowPromotionalText={setShowPromotionalText}
                          showPromotionalText={showPromotionalText}
                        />
                      </div>
                    </div>
                  </div>
                </section>
                {buyItWithProductData && buyItWithProductData.length > 0 && (
                  <section
                    className='relative pt-[30px] pb-[30px] bg-[#FCEEFF]'
                    style={{
                      backgroundSize: 'cover',
                      backgroundImage: 'url(images/digital-catalog-floral.png)',
                      backgroundPosition: 'top',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    <div className='container mx-auto relative'>
                      <div className='flex flex-wrap justify-between items-center pb-[15px]'>
                        <div className='font-sub font-bold pb-[15px] text-[18px] sm:text-[24px] lg:text-[36px] text-anchor'>
                          Buy it with
                        </div>
                      </div>
                      <CustomCarousel
                        data={buyItWithProductData}
                        slidesPerImage={4}
                        cardType='shoping-cart-card'
                      />
                    </div>
                  </section>
                )}
                {savedForLater && savedForLater.length > 0 && (
                  <section className='relative pt-[30px] pb-[30px] lg:pb-[60px] bg-[#FCEEFF]'>
                    <div className='container mx-auto relative'>
                      <div className='flex flex-wrap justify-between items-center pb-[15px]'>
                        <div className='font-sub font-bold pb-[15px] text-[18px] sm:text-[24px] lg:text-[36px] text-anchor'>
                          Saved for Later
                        </div>
                      </div>
                      <CustomCarousel
                        data={savedForLater}
                        slidesPerImage={4}
                        cardType='shoping-cart-card'
                      />
                    </div>
                  </section>
                )}
                {isShippingModalOpen && (
                  <AddShippingZipcode closeModal={closeShippingModal} />
                )}
              </>
            );
          },
        }}
      />
      {isLoading && <Loader />}
    </>
  );
};

export default Cart;
