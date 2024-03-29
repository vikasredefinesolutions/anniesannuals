'use client';
import { useAppSelector } from '@/app/redux/hooks';
import PLCartItems from './components/PLCartItems';

import PLCheckoutBillingAddress from './components/PLCheckoutBillingAddress';
import PayLaterPaymentComponent from './components/PLCreditCard';
import PLOrderSummary from './components/PLOrderSummary';
import PayLaterController from '@/features/payLaterController/controller';
import Loader from '@/shared/Components/Loader';
import { _CartItem } from '@/shared/apis/cart/fetchCartProducts';

const PaylaterComponent = () => {
  const { isLoading } = useAppSelector((state) => state.common);

  return (
    <>
      <PayLaterController
        cases={{
          loading: () => <Loader />,
          ready: ({
            Controller,
            billingErrors,
            billingTouchedFields,
            billingControl,
            postalCodeHandler,
            countryHandler,
            billingValues,
            maxLengthCalculator,
            detectCardIssuer,
            monthOptions,
            yearOptions,
            customYearChangeHandler,
            customMonthChangehandler,
            creditCardControl,
            credirCardFieldValues,
            creditCardTouchedFields,
            errors,
            states,
            countries,
            makePaymentHandler,
            handleReviewOrder,
            orderDetails,
            setCreditCardFieldValue,
            showPlaceOrderScreen,
            billingSubmitHandle,
            creditCardhandleSubmit,
            setSelectedPaymentMethod,
            selectedPaymentMethod,
          }) => {
            return (
              <>
                <section className='pt-[30px] lg:pt-[80px] pb-[80px] lg:pb-[80px]'>
                  <div className='container mx-auto max-w-8xl'>
                    <div className='relative'>
                      <h1 className='w-full mb-[30px] font-sub font-bold text-2xl-text text-center'>
                        Order Review
                      </h1>
                    </div>
                    <div className='grid grid-cols-12 gap-[30px] lg:gap-[50px]'>
                      <div className='col-span-12 lg:col-span-8'>
                        <div className='checkout-details p-0 mb-[30px] lg:mb-[100px]'>
                          <div className='lg:flex s'>
                            <PayLaterPaymentComponent
                              monthOptions={monthOptions}
                              yearOptions={yearOptions}
                              maxLengthCalculator={maxLengthCalculator}
                              detectCardIssuer={detectCardIssuer}
                              Controller={Controller}
                              creditCardControl={creditCardControl}
                              creditCardTouchedFields={creditCardTouchedFields}
                              errors={errors}
                              setCreditCardFieldValue={setCreditCardFieldValue}
                              credirCardFieldValues={credirCardFieldValues}
                              customMonthChangehandler={
                                customMonthChangehandler
                              }
                              customYearChangeHandler={customYearChangeHandler}
                              setSelectedPaymentMethod={
                                setSelectedPaymentMethod
                              }
                              selectedPaymentMethod={selectedPaymentMethod}
                            />

                            <PLCheckoutBillingAddress
                              Controller={Controller}
                              countries={countries}
                              states={states}
                              postalCodeHandler={postalCodeHandler}
                              countryHandler={countryHandler}
                              billingValues={billingValues}
                              billingControl={billingControl}
                              billingErrors={billingErrors}
                              billingTouchedFields={billingTouchedFields}
                              handleReviewOrder={handleReviewOrder}
                              billingSubmitHandle={billingSubmitHandle}
                              creditCardhandleSubmit={creditCardhandleSubmit}
                            />
                          </div>
                        </div>

                        <PLCartItems
                          cartItems={
                            orderDetails?.product as unknown as _CartItem[]
                          }
                          showPlaceOrderScreen={showPlaceOrderScreen}
                        />
                      </div>
                      <PLOrderSummary
                        orderSubTotal={
                          orderDetails?.billing?.orderSubtotal || 0
                        }
                        orderTotal={orderDetails?.billing?.orderTotal || 0}
                        shippingCharges={
                          orderDetails?.billing?.orderShippingCosts || 0
                        }
                        discount={
                          orderDetails?.billing?.couponDiscountAmount || 0
                        }
                        salesTax={orderDetails?.billing?.orderTax || 0}
                        makePaymentHandler={makePaymentHandler}
                        handleReviewOrder={handleReviewOrder}
                        showPlaceOrderScreen={showPlaceOrderScreen}
                        selectedPaymentMethod={selectedPaymentMethod}
                      />
                    </div>
                  </div>
                </section>
                {isLoading && <Loader />}
              </>
            );
          },
        }}
      />
    </>
  );
};

export default PaylaterComponent;
