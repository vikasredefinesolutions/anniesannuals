'use client';
import { useAppSelector } from '@/app/redux/hooks';
import GiftCardController from '@/features/giftcard/giftcardController/controller';
import PriceLabel from '@/shared/Components/PriceLabel';
import dayjs from 'dayjs';
import SideLayout from '../../shared/components/myAccountLayout';
import CheckGiftCardBalance from '../checkout/components/checkGiftCardBalance';

interface AccordionArray {
  title: string;
  desc: string;
  icon: string;
  index: string;
  openstatus: string;
  secure: 'Yes' | 'No';
  titleheadtag: string;
}

const GiftCards = () => {
  const { giftCardAmount } = useAppSelector((state) => state.checkout.payment);

  return (
    <>
      <GiftCardController
        config={{
          requiredValidationSchema: {
            isCodeRequired: true,
            isPinRequired: false,
          },
        }}
        cases={{
          view: ({
            hookForm: { register, errors, handleSubmit, reset, setValue },
            errorMessage,
            setIsShowVoucher,
            applyGiftCardDiscount,
            giftCardValue,
            balance,
            giftCouponNameChangeHandler,
            setShowAddGiftcard,
            showAddGiftCard,
            cards,
            isShowVoucher,
            onSubmit,
            onChange,
            customerStoreCredit,
            storeCredit,
          }) => {
            return (
              <>
                <SideLayout>
                  <h1 className='text-2xl-text mb-[20px] font-bold font-sub'>
                    Store Credits & Gift Cards
                  </h1>
                  <div className='mb-[40px] border-t border-t-gray-border'></div>
                  <div className='p-[15px] lg:p-[30px] shadow-md rounded-sm bg-[#ffffff] mb-[40px] panel-01 tab-content'>
                    <div className='py-[15px] border-b border-b-gray-border flex flex-wrap justify-between items-center'>
                      <div className='font-semibold text-medium-text'>
                        Store Credit
                      </div>
                      <PriceLabel
                        price={customerStoreCredit.storeCreditRefundBalance}
                        className='fo/StoreCustomerCredit/list.jsonont-bold text-default-text'
                      />
                    </div>
                    <table className='store-credit-table'>
                      <tr>
                        <th className='store-credit-table-td-th'>Reason</th>
                        <th className='store-credit-table-td-th'>Credit</th>
                        <th className='store-credit-table-td-th'>Debit</th>
                        <th className='store-credit-table-td-th'>
                          Total Balance
                        </th>
                        <th className='store-credit-table-td-th'>Used On</th>
                      </tr>

                      {storeCredit?.items.map((creditData) => (
                        <tr key={creditData.reason}>
                          <td className='store-credit-table-td-th'>
                            {creditData.reason}
                          </td>
                          <td className='store-credit-table-td-th'>
                            {creditData.creditAmount
                              .toString()
                              .includes('-') ? (
                              '-'
                            ) : (
                              <PriceLabel
                                price={creditData.creditAmount}
                                className={''}
                              />
                            )}
                          </td>
                          <td className='store-credit-table-td-th'>
                            {creditData.creditAmount
                              .toString()
                              .includes('-') ? (
                              <PriceLabel
                                price={Math.abs(creditData.creditAmount)}
                                className={''}
                              />
                            ) : (
                              '-'
                            )}
                          </td>
                          <td className='store-credit-table-td-th'>
                            <PriceLabel
                              price={Math.abs(creditData.balanceAmount)}
                              className={''}
                            />
                          </td>
                          <td className='store-credit-table-td-th'>
                            {dayjs(creditData.createdDate).format(
                              'MMMM D, YYYY h:mm A',
                            )}
                          </td>
                        </tr>
                      ))}
                    </table>
                    {/* <div className='p-[15px] lg:p-[30px] bg-[#F6EDFF] max-w-2xl mb-[20px]'>
                      <div className='text-small-text'>
                        Use your gift cards to make purchases.
                      </div>
                    </div> */}
                    {/* {showAddGiftCard ? (
                      <AddGiftCard
                        onCancelClick={() => setShowAddGiftcard(false)}
                        isGiftVoucher={isShowVoucher}
                        register={register}
                        errors={errors}
                        reset={reset}
                        handleSubmit={handleSubmit}
                        onSubmit={onSubmit}
                        errorMessage={errorMessage}
                      />
                    ) : (
                      <>
                        <div className='flex flex-wrap gap-[20px] mb-[15px] border-b border-b-gray-border pb-[20px]'>
                          <button
                            className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'
                            onClick={() => {
                              setShowAddGiftcard(true);
                              setIsShowVoucher(true);
                              setValue('isGiftCardVoucher', false);
                            }}
                          >
                            ADD GIFT CARD
                          </button>
                          
                        </div>
                        <div className='pb-[15px] flex flex-wrap justify-between items-center'>
                          <div className='font-semibold text-medium-text'>
                            Remaining Amount
                          </div>
                          <PriceLabel
                            className='font-bold text-default-text'
                            price={customerStoreCredit.storeCreditRefundBalance}
                          />
                        </div>
                        <div className='mb-[30px] border-t border-t-gray-border'></div>
                        <div className='text-medium-text mb-[20px] font-bold font-sub'>
                          Saved Gift Cards / Vouchers
                        </div>

                        {cards.map((c) => (
                          <GiftCard key={c.id} cardInfo={c} />
                        ))}
                        {cards.length == 0 && (
                          <div className='p-[15px] lg:p-[30px]   bg-[#FCFFF5]  max-w-2xl mb-[20px]'>
                            <div className='text-small-text'>
                              No Information Found!
                            </div>
                          </div>
                        )}
                      </>
                    )} */}
                  </div>
                  <CheckGiftCardBalance
                    applyGiftCardDiscount={applyGiftCardDiscount}
                    balance={+balance}
                    giftCardAmount={giftCardAmount}
                    giftCardValue={giftCardValue}
                    giftCouponNameChangeHandler={giftCouponNameChangeHandler}
                  />
                  {/* <div>
                    <div className='text-medium-text font-bold font-sub'>
                      Need Help?
                    </div>

                    <div className='py-[20px]'>
                      <ElementAccordionDisplay
                        accordionValue={AccordianValue}
                        accordionValueArray={AccordianData}
                      />
                    </div>
                  </div> */}
                </SideLayout>
              </>
            );
          },
        }}
      />
    </>
  );
};
export default GiftCards;
