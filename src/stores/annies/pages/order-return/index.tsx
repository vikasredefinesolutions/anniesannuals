'use client';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import CheckBox from '@/components/common/checkbox';
import OrderAndReturnController from '@/features/myAccount/orderAndReturns/controller';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import Loader from '@/shared/Components/Loader';
import { _CartItem } from '@/shared/apis/cart/fetchCartProducts';
import { selectCardImage } from '@/utils/helpers';
import { paths } from '@/utils/paths.constant';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import SideLayout from '../../shared/components/myAccountLayout';
import OrderReturnProdutCard from './OrderReturnProductCard';

const CancelOrder = () => {
  const dispatch = useDispatch();

  return (
    <OrderAndReturnController
      configs={null}
      cases={{
        empty: () => <h2>Empty</h2>,
        loading: () => <Loader />,
        ready: ({
          checkedCheckBox,
          setCheckedCheckBox,
          orderDetails,
          cancellOrderFunction,
          handleAddToCart,
          actionType,
          setOrderDetails,
          cartIdQty,
          setCartIdQty,
        }) => (
          <SideLayout>
            <div className=' w-full px-[15px]'>
              <div className='flex flex-wrap justify-between items-center mb-[20px] gap-5'>
                <div className='flex flex-wrap justify-between gap-2 md:gap-5 items-center'>
                  <h1 className='text-2xl-text mb-[10px] font-bold font-sub'>
                    Order Cancellation
                  </h1>
                  <div className='ml-[5px]'>
                    <CustomLink
                      href={`${paths.invoicePage}/${orderDetails?.orderDetails?.id}`}
                      data-modal-toggle='returnorder'
                      className='btn btn-outline-primary btn-xs uppercase !font-body !rounded-xs !inline-flex gap-[10px] items-center !border-[#634B91] !text-[#634B91]'
                    >
                      <Image
                        isStatic
                        src={'/assets/images/eyeIcon.svg'}
                        alt={'eye'}
                      />
                      <span>View Invoice</span>
                    </CustomLink>
                  </div>
                </div>
                <div className='flex flex-wrap justify-between gap-2 md:gap-5 items-center'>
                  <div className='mb-[10px] md:mb-0'>
                    <CustomLink
                      href={paths.orders}
                      className='!flex flex-wrap items-center gap-x-[10px] text-anchor'
                    >
                      <span>
                        <Image
                          src={'/assets/images/return.svg'}
                          alt={'return'}
                          isStatic={true}
                        />
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
                        <Image
                          isStatic={true}
                          src={'/assets/images/printIcon.svg'}
                          alt={'print'}
                        />
                      </span>
                      <span className='underline font-semibold text-default-text'>
                        Print
                      </span>
                    </button>
                  </div>
                  <div className='mb-[10px] md:mb-0'>
                    <CustomLink
                      href={`'mailto:contact@anniesannuals.com'`}
                      className='!flex flex-wrap items-center gap-x-[10px] text-anchor'
                    >
                      <span>
                        <Image
                          isStatic
                          src={'/assets/images/shareIcon.svg'}
                          alt={'share'}
                        />
                      </span>
                      <span className='underline font-semibold text-default-text'>
                        Share
                      </span>
                    </CustomLink>
                  </div>
                </div>
              </div>
            </div>
            <div className='mb-[40px] border-t border-t-gray-border'></div>
            <div className='p-[15px] lg:p-[30px] drop-shadow-md rounded-sm bg-[#ffffff] mb-[20px]'>
              <div className='flex flex-wrap justify-between items-center mb-[20px] gap-5'>
                <div className='text-title-text font-semibold font-sub mb-[10px] md:mb-0'>
                  Order Details
                </div>
                <div className='flex flex-wrap gap-5'>
                  {orderDetails?.orderTrackLink && (
                    <CustomLink
                      href={`${
                        orderDetails?.orderTrackLink
                          ? orderDetails?.orderTrackLink
                          : ''
                      }`}
                      className='btn btn-outline-primary btn-xs uppercase !font-body !rounded-xs !inline-flex gap-[10px] items-center !border-[#634B91] !text-[#634B91]'
                    >
                      <Image
                        src={'/assets/images/trackerICon.svg'}
                        alt={'tracker'}
                        isStatic={true}
                      />
                      <span>
                        {orderDetails?.orderTrackLink
                          ? 'Track package'
                          : 'Unable to track'}
                      </span>
                    </CustomLink>
                  )}
                </div>
              </div>
              <div className='grid grid-cols-12 gap-6 pt-[15px]'>
                <div className='col-span-12 sm:col-span-4'>
                  <div className='text-small-text mb-[5px] sm:mb-0'>
                    Order Number
                  </div>
                  <div className='mb-[20px]'>
                    <div className='font-bold text-default-text'>
                      {orderDetails?.orderDetails?.id}
                    </div>
                  </div>
                </div>
                <div className='col-span-12 sm:col-span-4'>
                  <div className='text-small-text mb-[5px] sm:mb-0'>
                    Ordered On
                  </div>
                  <div className='mb-[20px]'>
                    <div className='font-bold text-default-text'>
                      {dayjs(orderDetails?.orderDetails?.orderDate).format(
                        'MMMM D, YYYY',
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-12 gap-6 pt-[15px]'>
                <div className='col-span-12 sm:col-span-4'>
                  <div className='text-small-text mb-[5px] sm:mb-0'>
                    Shipping Address
                  </div>
                  <div className='mb-[20px]'>
                    <div className='font-bold text-default-text w-full'>
                      {orderDetails?.orderDetails?.shippingFirstName}{' '}
                      {orderDetails?.orderDetails?.shippingLastName}
                    </div>
                    <div className='font-bold text-default-text w-full'>
                      {orderDetails?.orderDetails?.shippingAddress1}{' '}
                      {orderDetails?.orderDetails?.shippingAddress2}{' '}
                      {orderDetails?.orderDetails?.shippingCity}
                    </div>
                    <div className='font-bold text-default-text w-full'>
                      {orderDetails?.orderDetails?.shippingState}{' '}
                      {orderDetails?.orderDetails?.shippingCountry}{' '}
                      {orderDetails?.orderDetails?.shippingZip},{' '}
                    </div>
                    <div className='font-bold text-default-text'>
                      {orderDetails?.orderDetails?.shippingPhone},{' '}
                      {orderDetails?.orderDetails?.shippingEmail}
                    </div>
                  </div>
                </div>
                <div className='col-span-12 sm:col-span-4'>
                  <div className='text-small-text mb-[5px] sm:mb-0'>
                    Billing Address
                  </div>
                  <div className='mb-[20px]'>
                    <div className='font-bold text-default-text w-full'>
                      {orderDetails?.orderDetails?.billingFirstName}{' '}
                      {orderDetails?.orderDetails?.billingLastName}
                    </div>
                    <div className='font-bold text-default-text w-full'>
                      {orderDetails?.orderDetails?.billingAddress1}{' '}
                      {orderDetails?.orderDetails?.billingAddress2}{' '}
                      {orderDetails?.orderDetails?.billingCity}
                    </div>
                    <div className='font-bold text-default-text w-full'>
                      {orderDetails?.orderDetails?.billingState}{' '}
                      {orderDetails?.orderDetails?.billingCountry}{' '}
                      {orderDetails?.orderDetails?.billingZip},{' '}
                    </div>
                    <div className='font-bold text-default-text'>
                      {orderDetails?.orderDetails?.billingPhone},{' '}
                      {orderDetails?.orderDetails?.billingEmail}
                    </div>
                  </div>
                </div>
                <div className='col-span-12 sm:col-span-4'>
                  <div className='text-small-text mb-[15px]'>
                    Payment Method
                  </div>
                  <div className='text-default-text'>
                    <div className='flex flex-wrap items-center'>
                      {/* <div className='mr-[10px]'>
                        <Image
                          isStatic={true}
                          src={`/assets/images/${selectCardImage(
                            orderDetails?.orderDetails!,
                          )}`}
                          alt='visa'
                        />
                      </div>
                      <div>
                        <div className='font-bold mb-[8px]'>
                          Card Ending in {orderDetails?.orderDetails?.last4}
                        </div>
                      </div> */}
                      {orderDetails?.orderDetails?.last4 !== '' && (
                        <div className='mr-[10px]'>
                          <Image
                            src={`/assets/images/${selectCardImage(
                              orderDetails?.orderDetails!,
                            )}`}
                            alt='visa card'
                            isStatic={true}
                          />
                        </div>
                      )}
                      <div>
                        {orderDetails?.orderDetails.paymentMethod ===
                          'PAYPAL' && (
                          <>
                            <div className='font-sub font-bold mb-[8px]'>
                              Paypal
                            </div>
                          </>
                        )}{' '}
                        {orderDetails?.orderDetails.paymentMethod ===
                          'CREDITCARD' && (
                          <>
                            <div className='font-sub font-bold mb-[8px]'>
                              Card Ending in{' '}
                              {orderDetails?.orderDetails?.cardNumber}
                            </div>
                          </>
                        )}
                        {orderDetails?.giftCardWalletAmount && (
                          <>
                            <div className='font-sub font-bold mb-[8px]'>
                              Gift Wallet
                            </div>
                          </>
                        )}
                        {orderDetails?.orderDetails?.giftCertiSerialNumber && (
                          <>
                            <div className='font-sub font-bold mb-[8px]'>
                              Gift Card
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='py-[15px] lg:py-[30px] drop-shadow-md rounded-sm bg-[#ffffff] mb-[40px]'>
              <div className='flex flex-wrap justify-between items-center mb-[20px] gap-5 px-[15px] lg:px-[30px]'>
                <div className='text-title-text font-semibold font-sub mb-[10px] md:mb-0'>
                  Items
                </div>
                <div className='flex flex-wrap gap-5'>
                  <button
                    className='btn btn-outline-primary btn-xs uppercase !font-body !rounded-xs !inline-flex gap-[10px] items-center !border-anchor !text-anchor'
                    onClick={() => {
                      if (checkedCheckBox.length === 0) {
                        dispatch(
                          openAlertModal({
                            title: '',
                            description: 'Please select product',
                            isAlertModalOpen: true,
                          }),
                        );

                        return '';
                      }
                      cancellOrderFunction(
                        checkedCheckBox,
                        checkedCheckBox.length ==
                          orderDetails?.shoppingCartViewModels.filter(
                            (elem: _CartItem) => elem.status !== 'Cancelled',
                          ).length
                          ? true
                          : false,
                        `${orderDetails?.orderDetails.id}`,
                      );
                    }}
                  >
                    <Image
                      isStatic={true}
                      src='/assets/images/return.svg'
                      alt='return'
                    />
                    <span>{`${
                      actionType == 'cancelled' ? 'Cancel ' : 'Return'
                    } Selected Item(s)`}</span>
                  </button>
                  <button
                    className='btn btn-outline-primary btn-xs uppercase !font-body !rounded-xs !inline-flex gap-[10px] items-center !border-anchor !text-anchor'
                    onClick={() => {
                      if (checkedCheckBox.length === 0) {
                        dispatch(
                          openAlertModal({
                            title: '',
                            description: 'Please select product',
                            isAlertModalOpen: true,
                          }),
                        );
                        return '';
                      } else {
                        handleAddToCart(checkedCheckBox);
                      }
                    }}
                  >
                    <span>Re-order Selected Item(s)</span>
                  </button>
                </div>
              </div>
              <div className='px-[15px] lg:px-[30px]'>
                <div className='bg-[#F6EDFF] p-[15px] rounded-sm'>
                  <CheckBox
                    label={'Select All'}
                    type={'checkbox'}
                    onChange={() =>
                      setCheckedCheckBox(
                        orderDetails?.shoppingCartViewModels.filter(
                          (elem: _CartItem) => {
                            if (actionType == 'return') {
                              return elem.status == 'Delivered';
                            } else {
                              return elem.status !== 'Cancelled';
                            }
                          },
                        )!,
                      )
                    }
                    checked={
                      checkedCheckBox?.length ==
                      orderDetails?.shoppingCartViewModels?.filter(
                        (elem: _CartItem) => {
                          if (actionType == 'return') {
                            return elem.status == 'Delivered';
                          } else {
                            return elem.status !== 'Cancelled';
                          }
                        },
                      ).length
                        ? true
                        : false
                    }
                    rootClassNameLabel='ml-[10px] text-default-text !font-semibold'
                    name='cancelAllProduct'
                  />
                </div>
              </div>
              {/* product select */}
              {orderDetails &&
                orderDetails?.shoppingCartViewModels?.map(
                  (productObj: _CartItem, index: number) => (
                    <OrderReturnProdutCard
                      key={productObj.shoppingCartItemsId}
                      productObj={productObj}
                      actionType={actionType}
                      checkedCheckBox={checkedCheckBox}
                      setCheckedCheckBox={setCheckedCheckBox}
                      cartIdQty={cartIdQty}
                      setCartIdQty={setCartIdQty}
                    />
                  ),
                )}
            </div>
          </SideLayout>
        ),
      }}
    />
  );
};

export default CancelOrder;
