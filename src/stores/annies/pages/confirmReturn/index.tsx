'use client';
import ConfirmReturnController from '@/features/myAccount/returnConfirm/controller';
import Loader from '@/shared/Components/Loader';
import SideLayout from '../../shared/components/myAccountLayout';
import { _CartItem } from '@/shared/apis/cart/fetchCartProducts';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import PriceLabel from '@/shared/Components/PriceLabel';
import { ChangeEvent } from 'react';
import {
  IReturnItemsProps,
  IReturnItemsRes,
} from '@/shared/apis/orders/getConfirmReturnDetails';
import { useRouter } from 'next/navigation';
import { paths } from '@/utils/paths.constant';

const ConfirmReturn = () => {
  const router = useRouter();
  return (
    <ConfirmReturnController
      configs={null}
      cases={{
        empty: () => <h2>Empty</h2>,
        loading: () => <Loader />,
        ready: ({
          returnOrders,
          refundSummary,
          setRefundSummary,
          returnItems,
          setReturnItems,
          confirmReturnOrder,
        }) => {
          return (
            <SideLayout>
              <div className='flex flex-wrap justify-between items-center mb-[20px] gap-5'>
                <div className='flex flex-wrap justify-between gap-2 md:gap-5 items-center'>
                  <div className='text-2xl-text mb-[10px] font-bold font-sub'>
                    Confirm Your Return
                  </div>
                </div>
              </div>
              <div className='mb-[40px] border-t border-t-gray-border'></div>
              {returnOrders.map((returnItem: _CartItem, index: number) => (
                <div
                  className='p-[15px] lg:p-[30px] drop-shadow-md rounded-sm bg-[#ffffff] mb-[20px]'
                  key={index}
                >
                  <div className='flex flex-wrap items-center mb-[20px] gap-10'>
                    <div className='text-normal-text font-bold mb-[10px] md:mb-0'>
                      Why are you returning this?
                    </div>
                    <div className=''>
                      <div className='relative md:inline-block text-left z-10'>
                        <div className='flex items-center'>
                          <select
                            className='group inline-flex items-center justify-between text-default-text bg-white rounded-[5px] w-full md:w-[250px] px-[15px] py-[9px] leading-none border !border-[#634B91] !text-[#634B91]'
                            value={
                              returnItems[index]['returnItemMessage'] ?? ''
                            }
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                              let updatedItems: IReturnItemsProps[] =
                                returnItems?.map(
                                  (prev: IReturnItemsProps, idx: number) => {
                                    if (idx === index) {
                                      return {
                                        ...prev,
                                        returnItemMessage: e.target.value,
                                      };
                                    } else {
                                      return prev;
                                    }
                                  },
                                );

                              setReturnItems(updatedItems);
                            }}
                          >
                            {refundSummary?.returnMessageLists.map(
                              (returnItem) => {
                                return (
                                  <option
                                    key={returnItem.id}
                                    className='w-full text-left px-2 py-1 text-default-text flex items-center gap-2 text-black'
                                  >
                                    {returnItem.message}
                                  </option>
                                );
                              },
                            )}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='grid grid-cols-12 gap-6 pt-[15px]'>
                    <div className='col-span-12 sm:col-span-2'>
                      <div className='rounded-sm overflow-hidden sm:max-w-[120px]'>
                        <CustomLink href={`${returnItem.seName}.html`}>
                          <Image
                            src={
                              returnItem.colorImage
                                ? returnItem.colorImage
                                : '/assets/images/products/sub-category-1.png'
                            }
                            isStatic={returnItem.colorImage ? false : true}
                            alt=''
                            className='max-w-auto'
                          />
                        </CustomLink>
                      </div>
                    </div>
                    <div className='col-span-12 sm:col-span-4'>
                      <div className='text-normal-text font-bold pb-[10px]'>
                        {returnItem.productName}
                      </div>

                      <div className='text-default-text !font-normal pb-[10px]'>
                        {
                          returnItem?.customFields?.find(
                            (data: { value: string; label: string }) =>
                              data.label === 'GENUS SPECIES NAME',
                          )?.value
                        }
                      </div>
                      <div className='mb-[10px]'>
                        <span className='text-small-text !font-[600]'>
                          Qty:
                        </span>
                        <span className='text-default-text font-[700]'>
                          {returnItem?.totalQty}
                        </span>
                      </div>
                      <div className='text-default-text mb-[10px]'>
                        <span className='text-small-text !font-[600]'>
                          Price:
                        </span>
                        <PriceLabel
                          price={returnItem?.price}
                          className='text-default-text font-[700]'
                          divCheck={false}
                        />
                        {/* <span className='text-default-text font-[700]'>
                          $35.00
                        </span> */}
                      </div>
                    </div>
                    {/* <div className='col-span-12 sm:col-span-4'>
                      <div className='text-small-text mb-[5px] sm:mb-0'>
                        Delivered on:
                      </div>
                      <div className='mb-[20px]'>
                        <div className='font-bold text-default-text'>
                          Friday, Oct 20
                        </div>
                      </div>
                      <div className='text-small-text mb-[5px] sm:mb-0'>
                        Tracking:
                      </div>
                      <div className='mb-[20px]'>
                        <div className='font-bold text-default-text'>
                          09562369986
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              ))}

              <div className='p-[15px] lg:p-[30px] drop-shadow-md rounded-sm bg-[#ffffff] mb-[40px]'>
                <div className='flex flex-wrap mx-[-15px]'>
                  <div className='w-full md:w-6/12 px-[15px] mb-[15px] md:mb-0 last:mb-0'>
                    <div className='mb-[25px] font-bold text-normal-text'>
                      Refund Summery
                    </div>
                    <div className='flex justify-between gap-x-[10px] text-default-text'>
                      <div>Refund Subtotal({returnOrders.length}Item)</div>
                      <PriceLabel
                        className='font-bold'
                        price={refundSummary?.refundSummery?.refundSubTotal}
                      />
                      {/* <div className='font-bold'>$70.00</div> */}
                    </div>
                    <div className='flex justify-between gap-x-[10px] text-default-textt'>
                      <div>Shipping</div>
                      <PriceLabel
                        className='font-bold'
                        price={refundSummary?.refundSummery?.shippingCharges}
                      />
                      {/* <div className='font-bold'>$0.00</div> */}
                    </div>
                    <div className='flex justify-between gap-x-[10px] text-default-text'>
                      <div>Tax</div>
                      <PriceLabel
                        className='font-bold'
                        price={refundSummary?.refundSummery?.shippingTax}
                      />
                      {/* <div className='font-bold'>$0.00</div> */}
                    </div>
                    <div className='flex justify-between gap-x-[10px] text-default-text'>
                      <div>Non-Member 5% Surcharge</div>
                      <PriceLabel
                        className='font-bold'
                        price={refundSummary?.refundSummery?.nonMemberCharges}
                      />
                      {/* <div className='font-bold'>$0.00</div> */}
                    </div>
                    <div className='flex justify-between gap-x-[10px] text-default-text font-bold mt-[25px] mb-[30px]'>
                      <div>Total Estimated Refund</div>
                      <PriceLabel
                        className='font-bold'
                        price={refundSummary?.refundSummery?.refundSubTotal}
                      />
                      {/* <div className='font-bold'>$70.00</div> */}
                    </div>
                  </div>
                  <div className='w-full md:w-6/12 px-[15px] mb-[15px] md:mb-0 last:mb-0'>
                    <div className='mb-[25px] font-bold text-normal-text'>
                      Item You Are Returning
                    </div>
                    {returnOrders.map((order: _CartItem, index: number) => (
                      <div
                        className='flex-wrap flex items-center gap-x-[20px] mb-[20px]'
                        key={index}
                      >
                        <div className='rounded-sm overflow-hidden sm:max-w-[120px]'>
                          <CustomLink href={`${order.seName}.html`}>
                            <Image
                              src={
                                order.colorImage
                                  ? order.colorImage
                                  : '/assets/images/products/sub-category-1.png'
                              }
                              isStatic={order.colorImage ? false : true}
                              alt=''
                              className='max-w-auto'
                            />
                          </CustomLink>
                        </div>
                        <div>
                          <div className='text-normal-text font-bold pb-[10px] mt-[20px] sm:mt-0'>
                            {order.productName}
                          </div>
                          <div className='text-default-text !font-normal pb-[10px]'>
                            {
                              order?.customFields?.find(
                                (data: { value: string; label: string }) =>
                                  data.label === 'GENUS SPECIES NAME',
                              )?.value
                            }
                          </div>
                          <div className='mb-[10px]'>
                            <span className='text-small-text !font-[600]'>
                              Qty:
                            </span>{' '}
                            <span className='text-default-text font-[700]'>
                              {order.totalQty}
                            </span>
                          </div>
                          <div className='text-default-text mb-[10px]'>
                            <span className='text-small-text !font-[600]'>
                              Price:
                            </span>{' '}
                            <PriceLabel
                              price={order?.price}
                              className='text-default-text font-[700]'
                              divCheck={false}
                            />
                            {/* <span className='text-default-text font-[700]'>
                              $35.00
                            </span> */}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className='w-full mb-[20px]'>
                      <div className='flex gap-x-[20px]'>
                        <button
                          className='btn btn-outline-primary btn-sm uppercase !font-body !rounded-xs !inline-flex gap-[10px] items-center'
                          onClick={() => router.push(`${paths.orders}`)}
                        >
                          CANCEL
                        </button>{' '}
                        <button
                          onClick={() => confirmReturnOrder(returnItems)}
                          className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'
                        >
                          Confirm Your Return
                        </button>
                      </div>
                    </div>
                    {/* <div className='text-normal-text mb-[5px]'>
                      <div className='text-small-text mb-[5px] sm:mb-0'>
                        Return by
                      </div>
                      <div className='mb-[20px]'>
                        <div className='font-bold text-default-text'>
                            {r}
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </SideLayout>
          );
        },
      }}
    />
  );
};

export default ConfirmReturn;
