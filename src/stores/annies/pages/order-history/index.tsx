'use client';
import OrderHistoryController from '@/features/myAccount/orderHistory/controller';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import Loader from '@/shared/Components/Loader';
import PriceLabel from '@/shared/Components/PriceLabel';
import { getUserId } from '@/shared/utils/cookie.helper';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import SideLayout from '../../shared/components/myAccountLayout';
const OrderHistory = () => {
  const userId = getUserId();
  const router = useRouter();

  if (!userId) {
    router.push('sign-in.html');
    return;
  }

  return (
    <>
      <OrderHistoryController
        configs={null}
        cases={{
          empty: () => <h2>Empty</h2>,
          loading: () => <Loader />,
          ready: ({
            showOrdersArr,
            statusBarCssController,
            selectedTabs,
            setSelectedTabs,
            isOpen: isCancelOrder,
            onRequestClose: onRequestCancelOrder,
            selectedOrder,
          }) => {
            return (
              <>
                <SideLayout
                  isCancelOrder={isCancelOrder}
                  onRequestCancelOrder={onRequestCancelOrder}
                  orderNumber={+selectedOrder}
                >
                  <h1 className='text-2xl-text mb-[20px] font-bold font-sub'>
                    Orders History
                  </h1>
                  <div className='w-full tab py-4 block px-2 focus:outline-none border-b font-bold border-gray-border'>
                    <ul className='w-full flex border-b border-b-gray-border border-t-gray-border gap-x-10 overflow-y-hidden overflow-x-auto'>
                      <li
                        className={`relative before:absolute before:h-[3px] before:bottom-0 before:w-full ${
                          selectedTabs == 'All Orders'
                            ? 'block before:bg-[#634B91]'
                            : 'block before:bg-transparent hover:before:bg-[#634B91] hover:before:text-[#634B91]'
                        }`}
                      >
                        <button
                          className='whitespace-nowrap tab px-2 py-4 block focus:outline-none border-b font-semibold hover:border-b-gray-border text-[#7f6da4]'
                          onClick={() => setSelectedTabs('All Orders')}
                        >
                          {`All Orders(${showOrdersArr.length})`}
                        </button>
                      </li>
                    </ul>
                    <div className='w-full mb-[30px]'>
                      <div
                        className='rounded-[5px] overflow-hidden'
                        key={Math.random()}
                      >
                        {showOrdersArr && showOrdersArr.length > 0 ? (
                          showOrdersArr.map((orderObj: any) => (
                            <>
                              <div className='bg-[#F6EDFF] px-[15px] py-[15px] lg:px-[30px] lg:py-[20px] mt-[20px]'>
                                <div className='flex flex-wrap items-center mx-[-15px] justify-between'>
                                  <div className='w-full xl:w-5/12 px-[15px]'>
                                    <div className='flex justify-between flex-wrap gap-x-[15px]'>
                                      <div className='mb-[20px] lg:mb-0'>
                                        <div className='text-default-text'>
                                          Ordered On
                                        </div>
                                        <div className='text-normal-text font-bold'>
                                          {dayjs(orderObj.orderShipDate).format(
                                            'MMMM D, YYYY',
                                          )}
                                        </div>
                                      </div>

                                      <div className='mb-[20px] lg:mb-0'>
                                        <div className='text-default-text'>
                                          Order Number
                                        </div>
                                        <div className='text-normal-text font-bold'>
                                          {orderObj.orderNumber}
                                        </div>
                                      </div>

                                      <div className='mb-[20px] lg:mb-0'>
                                        <div className='text-default-text'>
                                          Order Total
                                        </div>
                                        <PriceLabel
                                          className='text-normal-text font-bold'
                                          price={+orderObj.orderAmount}
                                        />{' '}
                                      </div>
                                    </div>
                                  </div>
                                  <div className='w-full xl:w-7/12 px-[15px]'>
                                    <div className='flex xl:justify-end justify-between flex-wrap gap-[15px]'>
                                      {!['ARCHIVED', 'Pending'].includes(
                                        orderObj.status,
                                      ) ? (
                                        <CustomLink
                                          href={`order-history-details.html/${orderObj.orderNumber}`}
                                          className='btn btn-primary btn-sm uppercase !font-body !rounded-xs !bg-[#694D84] !border-[#634B91] !text-white'
                                        >
                                          Order Details
                                        </CustomLink>
                                      ) : (
                                        <div
                                          className={statusBarCssController(
                                            orderObj.status!,
                                          )}
                                        >
                                          {orderObj.status}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='bg-white px-[15px] lg:px-[30px]'>
                                {orderObj.subItems.length > 0 &&
                                  orderObj.subItems.map(
                                    (cartObj: any, index: number) => (
                                      <>
                                        <div className='grid grid-cols-12 gap-6 border-b border-[#D4D4D4] py-[15px] lg:py-[30px]'>
                                          <div className='col-span-12 md:col-span-2'>
                                            <div className='rounded-sm overflow-hidden'>
                                              {' '}
                                              <Image
                                                src={cartObj.productImage}
                                                alt={cartObj.productName}
                                                isStatic={false}
                                              />
                                            </div>
                                          </div>
                                          <div className='col-span-12 md:col-span-10'>
                                            <div className='flex flex-wrap w-full'>
                                              <div className='w-full text-medium-text font-bold mb-[10px] flex justify-between'>
                                                {cartObj.productName}
                                                <span>
                                                  Total: $
                                                  {Number(
                                                    cartObj.price *
                                                      cartObj.quantity,
                                                  ).toFixed(2)}
                                                </span>
                                              </div>
                                              <div className='w-full sm:flex'>
                                                <div className='w-full md:w-5/12'>
                                                  <div className='mb-[10px]'>
                                                    <span className='text-small-text !font-[600]'>
                                                      Qty:{' '}
                                                    </span>
                                                    <span className='text-default-text font-[700]'>
                                                      {cartObj.quantity}
                                                    </span>
                                                  </div>
                                                  <div className='text-default-text mb-[10px]'>
                                                    <span className='text-small-text !font-[600]'>
                                                      Price:
                                                    </span>
                                                    <span className='text-default-text font-[700]'>
                                                      $
                                                      {Number(
                                                        cartObj.price,
                                                      ).toFixed(2)}
                                                    </span>
                                                  </div>
                                                </div>
                                                <div className='w-full md:w-4/12'>
                                                  <div className='mb-[20px]'>
                                                    <div className='text-small-text mb-[10px] !font-[600]'>
                                                      Status:
                                                    </div>
                                                    <div
                                                      className={statusBarCssController(
                                                        orderObj.status!,
                                                      )}
                                                    >
                                                      {orderObj.status}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    ),
                                  )}
                              </div>
                            </>
                          ))
                        ) : (
                          <h3>No Orders Present</h3>
                        )}
                      </div>
                    </div>
                  </div>
                </SideLayout>
              </>
            );
          },
        }}
      />
    </>
  );
};

export default OrderHistory;
