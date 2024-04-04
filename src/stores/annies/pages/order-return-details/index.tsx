'use client';
import OrderDetailsController from '@/features/myAccount/orderDetails/controller';
import Loader from '@/shared/Components/Loader';
import { _Orders } from '@/shared/apis/orders/fetchOrderList';
import { getUserId } from '@/shared/utils/cookie.helper';
import { paths } from '@/utils/paths.constant';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect } from 'react';
import SideLayout from '../../shared/components/myAccountLayout';
import OrderNumberSummary from './Component/OrderNumberSummary';
const AccountSettings = () => {
  const userId = getUserId();
  const router = useRouter();

  useEffect(() => {
    if (!userId) {
      router.push(paths.login);
    }
  }, [userId]);

  return (
    <>
      <OrderDetailsController
        configs={null}
        cases={{
          empty: () => <h2>Empty</h2>,
          loading: () => <Loader />,
          ready: ({
            showOrdersArr,
            ordersList,
            statusBarCssController,
            selectedTabs,
            setSelectedTabs,
            setOrdersArray,
            isOpen: isCancelOrder,
            openModel,
            onRequestClose: onRequestCancelOrder,
            selectedTenure,
            setSelectedTenure,
            searchOrders,
            setSearchText,
            removeSearch,
            handleAddToCart,
            buttonConditionFunction,
            selectedOrder,
            setSelectedOrder,
            isEmployeeLoggedIn,
          }) => {
            return (
              <>
                <SideLayout
                  isCancelOrder={isCancelOrder}
                  onRequestCancelOrder={onRequestCancelOrder}
                  orderNumber={+selectedOrder}
                >
                  <h1 className='text-2xl-text mb-[20px] font-bold font-sub'>
                    {/* Orders & Returns */}
                    Orders
                  </h1>
                  <div className='w-full tab py-4 block px-2 focus:outline-none border-b font-bold border-gray-border'>
                    <ul className='w-full flex border-b border-b-gray-border border-t border-t-gray-border gap-x-10 overflow-y-hidden overflow-x-auto'>
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
                          {`All Orders(${ordersList.totalOrder.length})`}
                        </button>
                      </li>
                      <li
                        className={`relative before:absolute before:h-[3px] before:bottom-0 before:w-full ${
                          selectedTabs == 'In Progress'
                            ? 'block before:bg-[#634B91]'
                            : 'block before:bg-transparent hover:before:bg-[#634B91] hover:before:text-[#634B91]'
                        }`}
                      >
                        <button
                          className='whitespace-nowrap tab px-2 py-4 block focus:outline-none border-b font-semibold hover:border-b-gray-border text-[#7f6da4]'
                          onClick={() => setSelectedTabs('In Progress')}
                        >
                          {`In Progress(${ordersList.inProgress.length})`}
                        </button>
                      </li>
                      <li
                        className={`relative before:absolute before:h-[3px] before:bottom-0 before:w-full ${
                          selectedTabs == 'Delivered'
                            ? 'block before:bg-[#634B91]'
                            : 'block before:bg-transparent hover:before:bg-[#634B91] hover:before:text-[#634B91]'
                        }`}
                      >
                        <button
                          className='whitespace-nowrap tab px-2 py-4 block focus:outline-none border-b font-semibold hover:border-b-gray-border text-[#7f6da4]'
                          onClick={() => setSelectedTabs('Delivered')}
                        >
                          {`Shipped/Delivered(${ordersList.delivered.length})`}
                        </button>
                      </li>
                      <li
                        className={`relative before:absolute before:h-[3px] before:bottom-0 before:w-full ${
                          selectedTabs == 'Cancelled'
                            ? 'block before:bg-[#634B91]'
                            : 'block before:bg-transparent hover:before:bg-[#634B91] hover:before:text-[#634B91]'
                        }`}
                      >
                        <button
                          className='whitespace-nowrap tab px-2 py-4 block focus:outline-none border-b font-semibold hover:border-b-gray-border text-[#7f6da4]'
                          onClick={() => setSelectedTabs('Cancelled')}
                        >
                          {`Cancelled(${ordersList.cancelled.length})`}
                        </button>
                      </li>
                      <li
                        className={`relative before:absolute before:h-[3px] before:bottom-0 before:w-full ${
                          selectedTabs == 'Refunded'
                            ? 'block before:bg-[#634B91]'
                            : 'block before:bg-transparent hover:before:bg-[#634B91] hover:before:text-[#634B91]'
                        }`}
                      >
                        <button
                          className='whitespace-nowrap tab px-2 py-4 block focus:outline-none border-b font-semibold hover:border-b-gray-border text-[#7f6da4]'
                          onClick={() => setSelectedTabs('Refunded')}
                        >
                          {`Refunded(${ordersList.refunded.length})`}
                        </button>
                      </li>
                      {/* <li
                        className={`relative before:absolute before:h-[3px] before:bottom-0 before:w-full ${
                          selectedTabs == 'Returned'
                            ? 'block before:bg-[#634B91]'
                            : 'block before:bg-transparent hover:before:bg-[#634B91] hover:before:text-[#634B91]'
                        }`}
                      >
                        <button
                          className='whitespace-nowrap tab px-2 py-4 block focus:outline-none border-b font-semibold hover:border-b-gray-border text-[#7f6da4]'
                          onClick={() => setSelectedTabs('Returned')}
                        >
                          {`Returned(${ordersList.returned.length})`}
                        </button>
                      </li> */}
                    </ul>
                    <div className='w-full pb-[30px]'>
                      <div className='pt-[30px] pb-[30px]'>
                        <div className='flex flex-wrap mx-[-15px]'>
                          <div className='w-full md:w-7/12 lg:w-5/12 px-[15px] flex'>
                            <div className='flex grow'>
                              <input
                                id=''
                                name=''
                                type='search'
                                onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                  if (e.target.value == '') {
                                    removeSearch();
                                  }
                                }}
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder='Search by order #'
                                className='form-input border !border-gray-border !rounded-tr-[0] !rounded-br-[0]'
                              />
                            </div>
                            <div className='flex'>
                              <button
                                className='flex gap-x-[10px] items-center bg-[#634B91] border border-gray-border hover:bg-[#634B91] text-[#ffffff] font-bold px-[15px] py-[6px] h-full ml-[-1px] group !rounded-tr-[5px] !rounded-br-[5px]'
                                onClick={(e) => searchOrders(showOrdersArr)}
                              >
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='15.999'
                                  height='15.999'
                                  className='fill-white group-hover:fill-white'
                                  viewBox='0 0 15.999 15.999'
                                >
                                  <g
                                    id='Group_6365'
                                    data-name='Group 6365'
                                    transform='translate(-977 -429)'
                                  >
                                    <path
                                      id='Path_5'
                                      data-name='Path 5'
                                      d='M10.932,18.114a7.182,7.182,0,1,1,7.182-7.182A7.19,7.19,0,0,1,10.932,18.114Zm0-13.087a5.905,5.905,0,1,0,4.176,1.73A5.912,5.912,0,0,0,10.932,5.027Z'
                                      transform='translate(973.25 425.25)'
                                    />
                                    <path
                                      id='Path_6'
                                      data-name='Path 6'
                                      d='M28.421,29.06a.636.636,0,0,1-.451-.187l-3.558-3.558a.638.638,0,0,1,.9-.9l3.558,3.558a.638.638,0,0,1-.451,1.09Z'
                                      transform='translate(963.939 415.939)'
                                    />
                                  </g>
                                </svg>
                                <span>Search</span>
                              </button>
                            </div>
                          </div>
                          <div className='w-full md:w-5/12 lg:w-7/12 px-[15px] mt-[20px] md:mt-0 text-right'>
                            <div className='relative md:inline-block text-left z-10'>
                              <div className='flex items-center'>
                                <select
                                  className='form-input border !border-gray-border !rounded-tr-[0] !rounded-br-[0]'
                                  onChange={(e) => {
                                    setSelectedTenure(+e.target.value);
                                  }}
                                  value={selectedTenure}
                                >
                                  <option value='0'>All</option>
                                  <option value='3'>Last 30 Days</option>
                                  <option value='9'>Last Month</option>
                                  <option value='4'>Last Year</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className='bg-white rounded-[5px] overflow-hidden'
                        key={Math.random()}
                      >
                        {showOrdersArr && showOrdersArr.length > 0 ? (
                          showOrdersArr.map(
                            (orderObj: _Orders) =>
                              orderObj.shoppingCartViewModels.length > 0 && (
                                <OrderNumberSummary
                                  statusBarCssController={
                                    statusBarCssController
                                  }
                                  orderObj={orderObj}
                                  key={orderObj.orderNumber}
                                  openModel={openModel}
                                  handleAddToCart={handleAddToCart}
                                  buttonConditionFunction={
                                    buttonConditionFunction
                                  }
                                  selectedOrder={selectedOrder}
                                  setSelectedOrder={setSelectedOrder}
                                  isEmployeeLoggedIn={isEmployeeLoggedIn}
                                  selectedTab={selectedTabs}
                                />
                              ),
                          )
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

export default AccountSettings;
