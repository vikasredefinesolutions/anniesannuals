'use client';
import { IOrderProps } from '@/app/track-your-package/[orderNumber]/page';
import TrackPackageController from '@/features/myAccount/trackPackage/controller';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import { _CartItem } from '@/shared/apis/cart/fetchCartProducts';
import { paths } from '@/utils/paths.constant';
import dayjs from 'dayjs';
import React from 'react';
import SideLayout from '../../shared/components/myAccountLayout';

const TrackPackage: React.FC<IOrderProps> = ({ orderNumber, orderDetails }) => {
  return (
    <TrackPackageController
      configs={null}
      cases={{
        empty: () => <h2>Empty</h2>,
        loading: () => <h2>Loading...</h2>,
        ready: () => {
          return (
            <SideLayout orderNumber={+orderNumber}>
              <div className='flex flex-wrap justify-between items-center mb-[20px] gap-5'>
                <div className='flex flex-wrap justify-between gap-2 md:gap-5 items-center'>
                  <div className='text-2xl-text mb-[10px] font-bold font-sub'>
                    Track Your Package
                  </div>
                </div>
                <div className='flex flex-wrap justify-between gap-2 md:gap-5 items-center'>
                  <div className='mb-[10px] md:mb-0'>
                    <CustomLink
                      href={paths.orders}
                      className='!flex flex-wrap items-center gap-x-[10px] text-anchor'
                    >
                      <span>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='15.811'
                          height='15.811'
                          viewBox='0 0 15.811 15.811'
                        >
                          <path
                            id='Path_17'
                            data-name='Path 17'
                            d='M7.667,12.333,3,7.667m0,0L7.667,3M3,7.667h9.333a4.667,4.667,0,1,1,0,9.333H10'
                            transform='translate(-1.939 -1.939)'
                            fill='none'
                            stroke='#273721'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='1.5'
                          ></path>
                        </svg>
                      </span>
                      <span className='underline font-semibold text-default-text'>
                        Return to shopping
                      </span>
                    </CustomLink>
                  </div>

                  <div className='mb-[10px] md:mb-0'>
                    <button
                      className='!flex flex-wrap items-center gap-x-[10px] text-anchor'
                      onClick={() => window.print()}
                    >
                      <span>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='19.5'
                          height='21'
                          viewBox='0 0 19.5 21'
                        >
                          <path
                            id='Path_16'
                            data-name='Path 16'
                            d='M6.72,13.829q-.36.045-.72.1m.72-.1a42.415,42.415,0,0,1,10.56,0m-10.56,0L6.34,18m10.94-4.171q.36.045.72.1m-.72-.1L17.66,18m0,0,.229,2.523a1.125,1.125,0,0,1-1.12,1.227H7.231a1.124,1.124,0,0,1-1.12-1.227L6.34,18m11.318,0h1.091A2.25,2.25,0,0,0,21,15.75V9.456a2.179,2.179,0,0,0-1.837-2.175q-.954-.143-1.913-.247M6.34,18H5.25A2.25,2.25,0,0,1,3,15.75V9.456A2.179,2.179,0,0,1,4.837,7.281q.954-.143,1.913-.247m10.5,0a48.536,48.536,0,0,0-10.5,0m10.5,0V3.375A1.125,1.125,0,0,0,16.125,2.25H7.875A1.125,1.125,0,0,0,6.75,3.375V7.034M18,10.5h.008v.008H18Zm-3,0h.008v.008H15Z'
                            transform='translate(-2.25 -1.5)'
                            fill='none'
                            stroke='#273721'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='1.5'
                          ></path>
                        </svg>
                      </span>
                      <span className='underline font-semibold text-default-text'>
                        Print
                      </span>
                    </button>
                  </div>

                  <div className='mb-[10px] md:mb-0'>
                    <a
                      href='mailto:contact@anniesannuals.com'
                      className='!flex flex-wrap items-center gap-x-[10px] text-anchor'
                    >
                      <span>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='17.63'
                          height='18.971'
                          viewBox='0 0 17.63 18.971'
                        >
                          <path
                            id='Path_15'
                            data-name='Path 15'
                            d='M6.748,9.945a2,2,0,1,0,0,1.943m0-1.943a2,2,0,0,1,0,1.943m0-1.943,8.5-4.723m-8.5,6.666,8.5,4.723m0,0a2,2,0,1,0,2.72-.777,2,2,0,0,0-2.72.777Zm0-11.389A2,2,0,1,0,16.028,2.5a2,2,0,0,0-.777,2.719Z'
                            transform='translate(-2.25 -1.493)'
                            fill='none'
                            stroke='#273721'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='1.5'
                          ></path>
                        </svg>{' '}
                      </span>
                      <span className='underline font-semibold text-default-text'>
                        Share
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div className='mb-[0] lg:mb-[40px] border-t border-t-gray-border'></div>
              <div className='mb-[0] lg:mb-[40px]'>
                <div className='flex flex-wrap mx-[-15px] pt-[15px]'>
                  <div className='w-full md:w-3/12 px-[15px]'>
                    <div className='text-small-text mb-[5px] sm:mb-0'>
                      Order Number
                    </div>
                    <div className='mb-[20px]'>
                      <div className='font-bold text-default-text'>
                        {orderNumber}
                      </div>
                    </div>
                  </div>

                  <div className='w-full md:w-3/12 px-[15px]'>
                    <div className='text-small-text mb-[5px] sm:mb-0'>
                      Ordered On
                    </div>
                    <div className='mb-[20px]'>
                      <div className='font-bold text-default-text'>
                        {dayjs(orderDetails.orderDetails.orderDate).format(
                          'MMMM D, YYYY',
                        )}
                      </div>
                    </div>
                  </div>

                  <div className='w-full md:w-6/12 px-[15px]'>
                    <div className='mb-[20px] flex justify-end items-end text-[#238FCC]'>
                      <CustomLink
                        href='#'
                        className='text-extra-small-text !text-[#634B91]'
                      >
                        Return to purchase details
                      </CustomLink>
                    </div>
                  </div>
                </div>
              </div>
              <div className='relative mb-[20px] md:mb-[40px] px-[0] md:px-[0px]'>
                <div className='flex'>
                  <div className='flex items-center flex-col text-[#F6EDFF] relative'>
                    <div className='rounded-full transition duration-500 ease-in-out h-[50px] w-[50px] bg-[#634B91] text-center flex justify-center items-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='21.414'
                        height='20'
                        viewBox='0 0 21.414 20'
                      >
                        <g
                          id='Icon_feather-check-square'
                          data-name='Icon feather-check-square'
                          transform='translate(1 1)'
                        >
                          <path
                            id='Path_27'
                            data-name='Path 27'
                            d='M13.5,13.275l3.118,3.118L27.01,6'
                            transform='translate(-8.01 -4.961)'
                            fill='none'
                            stroke='#fff'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                          ></path>
                          <path
                            id='Path_28'
                            data-name='Path 28'
                            d='M22.461,13.5v7a2,2,0,0,1-2,2H6.5a2,2,0,0,1-2-2V6.5a2,2,0,0,1,2-2H17.472'
                            transform='translate(-4.5 -4.5)'
                            fill='none'
                            stroke='#fff'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                          ></path>
                        </g>
                      </svg>
                    </div>

                    <div className='text-center flex flex-col mt-[20px]'>
                      <span className='w-full text-small-text !text-[#634B91]'>
                        Recieved
                      </span>
                      <span className='text-default-text !font-[700] !text-[#634B91]'>
                        {' '}
                        {dayjs(orderDetails.orderDetails.orderDate).format(
                          'MMMM D, YYYY',
                        )}
                      </span>
                    </div>
                  </div>
                  <div className='grow transition duration-500 ease-in-out h-[2px] bg-[#634B91] mt-[25px]'></div>
                  <div className='flex items-center flex-col text-[#F6EDFF] relative'>
                    <div className='rounded-full transition duration-500 ease-in-out h-[50px] w-[50px] bg-[#634B91] text-center flex justify-center items-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='25.688'
                        height='28.745'
                        viewBox='0 0 25.688 28.745'
                        className='feather feather-user-plus'
                      >
                        <g
                          id='Group_127'
                          data-name='Group 127'
                          transform='translate(0.15 0.181)'
                        >
                          <g
                            id='Group_126'
                            data-name='Group 126'
                            transform='translate(0 0)'
                          >
                            <path
                              id='Path_29'
                              data-name='Path 29'
                              d='M13.233,29.122a2.894,2.894,0,0,1-1.446-.382l-9.8-5.658A2.9,2.9,0,0,1,.54,20.576V9.255a2.9,2.9,0,0,1,1.447-2.5l9.8-5.658a2.9,2.9,0,0,1,2.894,0l9.8,5.658a2.9,2.9,0,0,1,1.447,2.506V20.571a2.9,2.9,0,0,1-1.447,2.511l-9.8,5.654A2.9,2.9,0,0,1,13.233,29.122Zm0-27.182a1.658,1.658,0,0,0-.828.222L2.6,7.82a1.661,1.661,0,0,0-.828,1.432V20.571A1.661,1.661,0,0,0,2.6,22l9.8,5.662a1.663,1.663,0,0,0,1.657,0l9.8-5.659a1.661,1.661,0,0,0,.828-1.432V9.255a1.661,1.661,0,0,0-.828-1.432l-9.8-5.66a1.658,1.658,0,0,0-.829-.222Z'
                              transform='translate(-0.54 -0.708)'
                              fill='#fff'
                              stroke='#fff'
                              strokeWidth='0.3'
                            />
                            <path
                              id='Path_30'
                              data-name='Path 30'
                              d='M19.271,81.672a.621.621,0,0,1-.309-.083l-11.45-6.61a.619.619,0,0,1,.619-1.071l11.141,6.434L30.338,73.95a.619.619,0,1,1,.619,1.071L19.579,81.589A.621.621,0,0,1,19.271,81.672Z'
                              transform='translate(-6.576 -66.848)'
                              fill='#fff'
                              stroke='#fff'
                              strokeWidth='0.3'
                            />
                            <path
                              id='Path_31'
                              data-name='Path 31'
                              d='M127.609,157.415a.618.618,0,0,1-.619-.619V143.581a.621.621,0,0,1,1.241,0V156.8a.618.618,0,0,1-.623.618Z'
                              transform='translate(-114.915 -129.376)'
                              fill='#fff'
                              stroke='#fff'
                              strokeWidth='0.3'
                            />
                            <path
                              id='Path_32'
                              data-name='Path 32'
                              d='M65.345,36.274a.619.619,0,0,1-.619-.619V30.267l-11.77-6.794a.619.619,0,1,1,.619-1.071l12.075,6.971a.619.619,0,0,1,.309.536v4.657l2.253-1.342-.2-4.87L56.233,21.549a.619.619,0,1,1,.619-1.071l12.075,6.971a.619.619,0,0,1,.308.51l.232,5.584a.619.619,0,0,1-.3.558l-3.509,2.087A.619.619,0,0,1,65.345,36.274Z'
                              transform='translate(-47.661 -18.509)'
                              fill='#fff'
                              stroke='#fff'
                              strokeWidth='0.3'
                            />
                          </g>
                        </g>
                      </svg>
                    </div>

                    <div className='text-center flex flex-col mt-[20px]'>
                      <span className='w-full text-small-text !text-[#634B91]'>
                        Packed
                      </span>
                      <span className='text-default-text !font-[700] !text-[#634B91]'>
                        {/* {' '}
                        {dayjs(orderDetails.orderDetails.orderDate).format(
                          'MMMM D, YYYY',
                        )} */}
                      </span>
                    </div>
                  </div>
                  <div className='grow transition duration-500 ease-in-out h-[2px] bg-[#634B91] mt-[25px]'></div>
                  <div className='flex items-center flex-col text-[#F6EDFF] relative'>
                    <div className='rounded-full transition duration-500 ease-in-out h-[50px] w-[50px] bg-[#F6EDFF] flex justify-center items-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='25.974'
                        height='24.022'
                        viewBox='0 0 25.974 24.022'
                      >
                        <path
                          id='Path_33'
                          data-name='Path 33'
                          d='M32.88,20.92l-3.172-5.881a.786.786,0,0,0-.691-.413H24.379V11.017a.786.786,0,0,0-.786-.786H7.786A.786.786,0,0,0,7,11.017V31a.786.786,0,0,0,.786.786H10.73a3.256,3.256,0,0,0,6.32,0H23.7a3.256,3.256,0,0,0,6.32,0h2.17A.786.786,0,0,0,32.974,31v-9.7a.786.786,0,0,0-.094-.373ZM8.571,11.8H22.808V24.85H8.571Zm5.32,20.88A1.685,1.685,0,1,1,15.576,31,1.685,1.685,0,0,1,13.891,32.682Zm12.967,0A1.685,1.685,0,1,1,28.544,31,1.685,1.685,0,0,1,26.858,32.682ZM31.4,30.211H30.018a3.256,3.256,0,0,0-6.32,0H17.05a3.256,3.256,0,0,0-6.32,0H8.571V26.421H23.593a.786.786,0,0,0,.786-.786V16.2h4.168L31.4,21.491Z'
                          transform='translate(-7 -10.232)'
                          fill='#634b91'
                        />
                      </svg>
                    </div>

                    <div className='text-center flex flex-col mt-[20px]'>
                      <span className='w-full text-small-text !text-[#634B91]'>
                        Delivering
                      </span>
                      <span className='text-default-text !font-[700] !text-[#634B91]'>
                        {/* {' '}
                        {dayjs(orderDetails.orderDetails.orderDate).format(
                          'MMMM D, YYYY',
                        )} */}
                      </span>
                    </div>
                  </div>
                  <div className='grow transition duration-500 ease-in-out h-[2px] bg-[#634B91] mt-[25px]'></div>
                  <div className='flex items-center flex-col text-[#F6EDFF] relative'>
                    <div className='rounded-full transition duration-500 ease-in-out h-[50px] w-[50px] bg-[#F6EDFF] flex justify-center items-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='25.974'
                        height='24.022'
                        viewBox='0 0 25.974 24.022'
                      >
                        <path
                          id='Path_33'
                          data-name='Path 33'
                          d='M32.88,20.92l-3.172-5.881a.786.786,0,0,0-.691-.413H24.379V11.017a.786.786,0,0,0-.786-.786H7.786A.786.786,0,0,0,7,11.017V31a.786.786,0,0,0,.786.786H10.73a3.256,3.256,0,0,0,6.32,0H23.7a3.256,3.256,0,0,0,6.32,0h2.17A.786.786,0,0,0,32.974,31v-9.7a.786.786,0,0,0-.094-.373ZM8.571,11.8H22.808V24.85H8.571Zm5.32,20.88A1.685,1.685,0,1,1,15.576,31,1.685,1.685,0,0,1,13.891,32.682Zm12.967,0A1.685,1.685,0,1,1,28.544,31,1.685,1.685,0,0,1,26.858,32.682ZM31.4,30.211H30.018a3.256,3.256,0,0,0-6.32,0H17.05a3.256,3.256,0,0,0-6.32,0H8.571V26.421H23.593a.786.786,0,0,0,.786-.786V16.2h4.168L31.4,21.491Z'
                          transform='translate(-7 -10.232)'
                          fill='#634b91'
                        />
                      </svg>
                    </div>

                    <div className='text-center flex flex-col mt-[20px]'>
                      <span className='w-full text-small-text !text-[#634B91]'>
                        Delivered
                      </span>
                      <span className='text-default-text !font-[700] !text-[#634B91]'>
                        {/* {' '}
                        {dayjs(orderDetails.orderDetails.orderDate).format(
                          'MMMM D, YYYY',
                        )} */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex flex-wrap mx-[-15px] mb-[20px]'>
                <div className='w-full md:w-6/12 px-[15px] flex'>
                  <div className='p-[15px] lg:p-[30px] drop-shadow-md rounded-sm bg-[#ffffff] mb-[15px] w-full'>
                    <div className='text-title-text font-semibold font-sub mb-[20px]'>
                      Shipment Information
                    </div>
                    <ul className=''>
                      <li className='flex my-[8px]'>
                        <span className='font-bold text-default-text w-1/3'>
                          Delivery Method
                        </span>
                        <span className='text-default-text w-2/3'>
                          {orderDetails.orderDetails.shippingMethod}
                        </span>
                      </li>
                      <li className='flex my-[8px]'>
                        <span className='font-bold text-default-text w-1/3'>
                          Shipping to
                        </span>
                        <span className='text-default-text w-2/3'>
                          {orderDetails.orderDetails.shippingFirstName}{' '}
                          {orderDetails.orderDetails.shippingLastName},
                          {orderDetails.orderDetails.shippingAddress1}{' '}
                          {orderDetails.orderDetails.shippingAddress2}
                          {orderDetails.orderDetails.shippingCity},
                          {orderDetails.orderDetails.shippingState}{' '}
                          {orderDetails.orderDetails.shippingZip},
                          {orderDetails.orderDetails.shippingCountry}{' '}
                        </span>
                      </li>
                      <li className='flex my-[8px]'>
                        <span className='font-bold text-default-text w-1/3'>
                          Order
                        </span>
                        <span className='text-default-text w-2/3'>
                          {orderNumber}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className='w-full md:w-6/12 px-[15px] flex'>
                  <div className='p-[15px] lg:p-[30px] drop-shadow-md rounded-sm bg-[#ffffff] mb-[15px] w-full'>
                    <div className='text-title-text font-semibold font-sub mb-[30px]'>
                      In your shipment
                    </div>
                    {orderDetails.shoppingCartViewModels.map(
                      (cartObj: _CartItem, index: number) => (
                        <div
                          className='mx-auto'
                          key={cartObj.productId + index}
                        >
                          <div className='flex space-x-6 pb-[20px] '>
                            <div className='w-full md:w-3/12'>
                              <div className='rounded-sm overflow-hidden'>
                                <CustomLink
                                  href={`/${cartObj.seName}`}
                                  className=''
                                >
                                  <Image
                                    src={cartObj.colorImage}
                                    alt={cartObj.productName}
                                  />
                                </CustomLink>
                              </div>
                            </div>

                            <div className='w-full md:w-9/12'>
                              <div className='flex flex-wrap w-full'>
                                <div className='w-full text-medium-text font-bold mb-[10px] flex justify-between'>
                                  {cartObj.productName}
                                </div>
                                <div className='w-full flex'>
                                  <div className='w-full'>
                                    <div className='mb-[10px]'>
                                      <span className='text-small-text !font-[600]'>
                                        Qty:
                                      </span>
                                      <span className='text-default-text font-[700]'>
                                        {cartObj.totalQty}
                                      </span>
                                    </div>

                                    <div className='text-default-text mb-[10px]'>
                                      <span className='text-small-text !font-[600]'>
                                        Price:
                                      </span>
                                      <span className='text-default-text font-[700]'>
                                        ${Number(cartObj.price).toFixed(2)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ),
                    )}
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

export default TrackPackage;
