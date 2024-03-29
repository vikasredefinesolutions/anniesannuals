'use client';
import React from 'react';
import PaymentComponent from './components/paymentComponent';
import AddressComponent from './components/addressComponent';
import CheckoutSummary from './components/checkoutSummary';
import CheckoutController from '@/features/checkout/checkoutController/controller';
import CustomLink from '@/shared/Components/CustomLink';
import { paths } from '@/utils/paths.constant';
import { useAppSelector } from '@/app/redux/hooks';
import ReviewOrder from './components/reviewOrder';
import Loader from '@/shared/Components/Loader';
import GuestCheckout from './components/guestcheckout';

const Checkout = () => {
  const {
    required: GuestRequired,
    showPasswordScreen,
    showCreateAccountScreen,
  } = useAppSelector((state) => state.checkout.guestCheckout);

  const { isLoading } = useAppSelector((state) => state.common);
  return (
    <>
      <CheckoutController
        cases={{
          loading: () => <Loader />,
          ready: ({ returnToCart }) => (
            <section className='bg-tertiary pt-[30px] pb-[30px]'>
              <div className='container mx-auto'>
                <div
                  className='w-full mb-[15px] text-small-text flex items-center font-sub cursor-pointer'
                  onClick={returnToCart}
                >
                  <span className='material-icons mr-[5px] align-middle'>
                    chevron_left
                  </span>
                  <span>Return to Cart</span>
                </div>
                <h1 className='w-full mb-[30px] font-sub font-bold text-2xl-text'>
                  Checkout
                </h1>
                <div className='flex flex-wrap mx-[-15px]'>
                  <div className='w-full xl:w-8/12 lg:w-7/12 px-[15px]'>
                    <div className='lg:max-w-[840px] w-full'>
                      {(GuestRequired ||
                        showCreateAccountScreen ||
                        showPasswordScreen) && <GuestCheckout />}
                      <AddressComponent />
                      <PaymentComponent />
                      <ReviewOrder />
                    </div>
                  </div>
                  <CheckoutSummary />
                </div>
              </div>
            </section>
          ),
        }}
      />
      {isLoading && <Loader />}
    </>
  );
};

export default Checkout;
