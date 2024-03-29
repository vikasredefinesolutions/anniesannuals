import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import PriceLabel from '@/shared/Components/PriceLabel';
import { _CartItem } from '@/shared/apis/cart/fetchCartProducts';
import { _Orders } from '@/shared/apis/orders/fetchOrderList';
import dayjs from 'dayjs';
import React, { SetStateAction } from 'react';
import OrderHeaderButton from './OrderHeaderButton';
import OrderInfo from './OrderInfo';

interface IProps {
  orderObj: _Orders;
  statusBarCssController: (status: string) => string;
  openModel?: () => void;
  handleAddToCart: any;
  buttonConditionFunction: (orderArr: _CartItem[]) => string;
  selectedOrder: string;
  setSelectedOrder: React.Dispatch<SetStateAction<string>>;
  isEmployeeLoggedIn: boolean;
  selectedTab: string;
}

const OrderNumberSummary: React.FC<IProps> = ({
  orderObj,
  statusBarCssController,
  openModel,
  handleAddToCart,
  setSelectedOrder,
  isEmployeeLoggedIn,
  selectedTab,
}) => {
  return (
    <>
      <div className='bg-[#F6EDFF] px-[15px] py-[15px] lg:px-[30px] lg:py-[20px]'>
        <div className='flex flex-wrap items-center mx-[-15px] justify-between'>
          <div className='w-full xl:w-5/12 px-[15px]'>
            <div className='flex justify-between flex-wrap gap-x-[15px]'>
              <div className='mb-[20px] lg:mb-0'>
                <div className='text-default-text'>{`${
                  selectedTab === 'Refunded' ? 'Refunded on' : 'Ordered On'
                }`}</div>
                <div className='text-normal-text font-bold'>
                  {selectedTab === 'Refunded'
                    ? dayjs(orderObj.refundedOn).format('MMMM D, YYYY')
                    : dayjs(orderObj.orderDate).format('MMMM D, YYYY')}
                </div>
              </div>

              <div className='mb-[20px] lg:mb-0'>
                <div className='text-default-text'>Order Number</div>
                <div className='text-normal-text font-bold'>
                  {orderObj.orderNumber}
                </div>
              </div>

              <div className='mb-[20px] lg:mb-0'>
                <div className='text-default-text'>{`${
                  selectedTab == 'Refunded' ? 'Refund Total' : 'Order Total'
                }`}</div>
                <PriceLabel
                  className='text-normal-text font-bold'
                  price={+orderObj.orderTotal}
                />{' '}
              </div>
            </div>
          </div>
          <div className='w-full xl:w-7/12 px-[15px]'>
            <div className='flex xl:justify-end justify-between flex-wrap gap-[15px]'>
              {(orderObj.orderStatus === 'Processing' ||
                orderObj.orderStatus === 'Hold' ||
                orderObj.orderStatus == 'Pending' ||
                orderObj.orderStatus == 'NEW') &&
              isEmployeeLoggedIn ? (
                <OrderHeaderButton
                  openModel={openModel}
                  textToShow='Cancel'
                  setSelectedOrder={setSelectedOrder}
                  orderNumber={`${orderObj.orderNumber}`}
                  cancelOrReturn='CANCEL'
                />
              ) : (
                orderObj.orderStatus === 'Shipped' ||
                (orderObj.orderStatus === 'Partially Shipped' && (
                  <OrderHeaderButton
                    openModel={openModel}
                    textToShow='Return'
                    setSelectedOrder={setSelectedOrder}
                    orderNumber={`${orderObj.orderNumber}`}
                    cancelOrReturn='RETURN'
                  />
                ))
              )}
              {orderObj.shoppingCartViewModels[0]?.status !== 'Cancelled' &&
                orderObj?.orderTrackLink && (
                  <CustomLink
                    href={`${
                      orderObj?.orderTrackLink ? orderObj?.orderTrackLink : '/'
                    }`}
                    className='btn btn-outline-primary btn-sm uppercase !font-body !rounded-xs !inline-flex gap-[10px] items-center !border-[#634B91] !text-[#634B91]'
                    target='_blank'
                  >
                    <Image
                      src={'/assets/images/trackerICon.svg'}
                      alt={'tracker'}
                      isStatic={true}
                    />
                    <span>
                      {orderObj?.orderTrackLink
                        ? 'Track package'
                        : 'Unable to track'}
                    </span>{' '}
                  </CustomLink>
                )}
              {orderObj.orderStatus !== 'Cancelled' && (
                <CustomLink
                  href={`order-details.html/${orderObj.orderNumber}`}
                  className='btn btn-primary btn-sm uppercase !font-body !rounded-xs !bg-[#694D84] !border-[#634B91] !text-white'
                >
                  Order Details
                </CustomLink>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white bg-opacity-30 px-[15px] lg:px-[30px]'>
        {orderObj.shoppingCartViewModels.map(
          (cartObj: _CartItem, index: number) => (
            <OrderInfo
              cartObj={cartObj}
              key={cartObj.productId + index}
              statusBarCssController={statusBarCssController}
              handleAddToCart={handleAddToCart}
              orderNumber={orderObj.orderNumber}
              selectedTab={selectedTab}
            />
          ),
        )}
      </div>
    </>
  );
};

export default OrderNumberSummary;
