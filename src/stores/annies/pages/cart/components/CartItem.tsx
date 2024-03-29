/* eslint-disable @next/next/no-img-element */
import CartItemController from '@/features/cart/cartItemController/controller';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import PriceLabel from '@/shared/Components/PriceLabel';
import { _CartItem } from '@/shared/apis/cart/fetchCartProducts';
import { isNumberKey } from '@/shared/utils/helper';
import React from 'react';

interface _Props {
  item: _CartItem;
  key: number;
  isEmployeeLoggedIn: boolean;
  setStatus: React.Dispatch<
    React.SetStateAction<'loading' | 'empty' | 'ready'>
  >;
  isheadercart?: boolean;
}

const CartItem: React.FC<_Props> = ({
  key,
  item,
  setStatus,
  isheadercart = false,
}) => {
  const date =
    item?.isPreOrder && item?.futureInventoryShipDate != ''
      ? new Date(item?.futureInventoryShipDate).toDateString().split(' ')
      : new Date(item?.shippingDate).toDateString().split(' ');

  const preOrderText =
    item?.isPreOrder && item?.futureInventoryShipDate != ''
      ? 'Pre-orders will start shipping in'
      : 'Shipping begins the week of';

  let CommonName: string;
  let CultivarName: string;
  let prefferedCommonName: string;
  let secondaryCommonName: string;

  item?.customFields?.map((el: { label: string; value: string }) => {
    if (el.label.toUpperCase() == 'COMMON NAME') {
      CommonName = el.value;
    }
    if (el.label.toUpperCase() == 'CULTIVAR NAME') {
      CultivarName = el.value;
    }
    if (el.label.toUpperCase() == 'PREFERRED COMMON NAME') {
      prefferedCommonName = el.value;
    }
    if (el.label.toUpperCase() == 'SECONDARY COMMON NAME') {
      secondaryCommonName = el.value;
    }
  });

  return (
    <CartItemController
      item={item}
      setCartStatus={setStatus}
      cases={{
        ready: ({
          removeItemHandler,
          quantity,
          updateQuantity,
          debounceFnForQuantity,
          checkCommonName,
        }) => {
          return (
            <>
              <div
                key={key}
                className='pb-[15px] border-b border-b-[#D4CEB9] mb-[15px] last:border-0 last:mb-0 last:pb-0 pt-[15px] first:pt-0'
              >
                <div className='flex flex-wrap'>
                  {/* mx-[-15px] */}
                  <div className='w-full sm:w-10/12 md:w-10/12 px-[15px]'>
                    <div className='grid grid-cols-4 grid-flow-row-dense lg:grid-flow-col gap-4'>
                      <div className='row-span-1 col-span-1 lg:row-span-3'>
                        <div className='mb-[5px]'>
                          <CustomLink
                            href={`/${item.seName}.html`}
                            title={item.productName}
                          >
                            {item?.colorImage ? (
                              <Image
                                src={item.colorImage}
                                alt={item.productName}
                                title=''
                                className='rounded-tl-sm rounded-br-sm rounded-tr-sm rounded-bl-sm overflow-hidden'
                              />
                            ) : (
                              <Image
                                src={`/assets/images/products/sub-category-1.png`}
                                alt='product'
                                isStatic
                                className='rounded-tl-sm rounded-br-sm rounded-tr-sm rounded-bl-sm overflow-hidden'
                              />
                            )}
                          </CustomLink>
                        </div>
                      </div>
                      <div className='row-span-1 col-span-3 lg:row-span-2 ml-[0] lg:ml-[20px]'>
                        <div className='text-normal-text font-bold font-sub'>
                          <CustomLink
                            href={`/${item.seName}.html`}
                            title={item.productName}
                          >
                            {item.productName}
                            {item?.isPreOrder &&
                              item?.futureInventoryShipDate && (
                                <span className='text-[#9F2D3C] font-light text-sm'>
                                  &nbsp; &nbsp;Pre-order separate shipment
                                </span>
                              )}
                          </CustomLink>
                        </div>
                        {(CultivarName || CommonName) && (
                          <div className='text-defult-text font-bold font-sub opacity-80'>
                            {CultivarName && (
                              <h2>
                                {`${CultivarName}dfa${CommonName ? ',' : ''} `}
                              </h2>
                            )}
                            {CommonName && <h2>{`${CommonName}`}</h2>}
                          </div>
                        )}
                        {prefferedCommonName ||
                          (secondaryCommonName && (
                            <div className='text-defult-text  opacity-80 flex flex-wrap'>
                              {prefferedCommonName && (
                                <h2>
                                  {`${prefferedCommonName}${
                                    secondaryCommonName ? ',' : ''
                                  } `}
                                </h2>
                              )}
                              {secondaryCommonName && (
                                <h2>{`${secondaryCommonName}`}</h2>
                              )}
                            </div>
                          ))}
                        {checkCommonName(item?.customFields) ? (
                          <CustomLink
                            href={`/${item.seName}.html`}
                            title={item.productName}
                          >
                            <div className='text-normal-text italic font-sub opacity-80 '>
                              '{checkCommonName(item?.customFields)}'
                            </div>
                          </CustomLink>
                        ) : (
                          <></>
                        )}
                        <div className='col-span-3'>
                          <>
                            {item.shoppingCartItemDetailsViewModel.length >
                            0 ? (
                              <>
                                <div className='flex justify-between items-center py-2'>
                                  <div className='text-small-text font-semibold w-1/4'>
                                    Size
                                  </div>
                                  <div className='text-small-text font-semibold w-1/4 text-center'>
                                    Qty
                                  </div>
                                  <div className='text-small-text font-semibold w-1/4 text-right'>
                                    Unit Price
                                  </div>
                                  <div className='text-small-text font-semibold w-1/4 text-right'>
                                    Price
                                  </div>
                                </div>
                                {item.shoppingCartItemDetailsViewModel.map(
                                  (view) => {
                                    return (
                                      <>
                                        <div className='flex justify-between items-center py-2'>
                                          <div className='text-small-text w-1/4'>
                                            {view.attributeOptionValue}
                                          </div>
                                          <div className='text-small-text w-1/4 text-center flex justify-center items-center'>
                                            <div className='flex items-center border border-primary rounded-xs h-[50px] max-w-[100px]'>
                                              <button
                                                type='button'
                                                onClick={() => {
                                                  if (
                                                    quantity[
                                                      view.attributeOptionValue
                                                    ] > 0
                                                  ) {
                                                    updateQuantity(
                                                      view.attributeOptionValue,
                                                      quantity[
                                                        view
                                                          .attributeOptionValue
                                                      ] - 1,
                                                    );
                                                    debounceFnForQuantity(
                                                      item.attributeOptionId ||
                                                        0,
                                                      view.id,
                                                      quantity[
                                                        view
                                                          .attributeOptionValue
                                                      ] - 1,
                                                      item.shoppingCartItemsId,
                                                      view.attributeOptionValue,
                                                    );
                                                  }
                                                }}
                                                className='inline-block w-3/12 text-center font-bold'
                                              >
                                                -
                                              </button>
                                              <div className='w-6/12 text-center font-bold'>
                                                <input
                                                  className='w-full text-center focus:outline-none bg-transparent'
                                                  type='number'
                                                  value={
                                                    quantity[
                                                      view.attributeOptionValue
                                                    ]
                                                  }
                                                  onChange={(e) => {
                                                    if (isNumberKey(e)) {
                                                      updateQuantity(
                                                        view.attributeOptionValue,
                                                        +e.target.value,
                                                      );
                                                      debounceFnForQuantity(
                                                        item.attributeOptionId ||
                                                          0,
                                                        view.id,
                                                        +e.target.value,
                                                        item.shoppingCartItemsId,
                                                        view.attributeOptionValue,
                                                      );
                                                    }
                                                  }}
                                                  min={0}
                                                />
                                              </div>
                                              <button
                                                type='button'
                                                onClick={() => {
                                                  updateQuantity(
                                                    view.attributeOptionValue,
                                                    quantity[
                                                      view.attributeOptionValue
                                                    ] + 1,
                                                  );
                                                  debounceFnForQuantity(
                                                    item.attributeOptionId || 0,
                                                    view.id,
                                                    quantity[
                                                      view.attributeOptionValue
                                                    ] + 1,
                                                    item.shoppingCartItemsId,
                                                    view.attributeOptionValue,
                                                  );
                                                }}
                                                className='inline-block w-3/12 text-center font-bold'
                                              >
                                                +
                                              </button>
                                            </div>
                                          </div>
                                          <div className='text-small-text w-1/4 text-right'>
                                            <PriceLabel
                                              price={view?.unitPrice || 0}
                                              className=''
                                            />
                                          </div>
                                          <div className='text-small-text w-1/4 text-right'>
                                            <PriceLabel
                                              price={view.price}
                                              className=''
                                            />
                                          </div>
                                        </div>{' '}
                                      </>
                                    );
                                  },
                                )}
                                <div className='flex justify-between py-3 mt-3 border-t border-[#D4CEB9]'>
                                  <div className='text-small-text w-1/4 font-[700]'>
                                    Product Total:
                                  </div>
                                  <div className='text-small-text w-1/4 font-[700] text-center'>
                                    &nbsp;
                                  </div>
                                  <div className='text-small-text w-1/4 text-center'>
                                    &nbsp;
                                  </div>
                                  <div className='text-small-text w-1/4 font-[700] text-right'>
                                    <PriceLabel
                                      className=''
                                      price={item.totalPrice}
                                    />
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                {' '}
                                <div className='flex justify-between items-center py-2'>
                                  <div className='text-small-text font-semibold w-1/4'>
                                    &nbsp;
                                  </div>
                                  <div className='text-small-text font-semibold w-1/4 text-center'>
                                    Qty
                                  </div>
                                  <div className='text-small-text font-semibold w-1/4 text-right'>
                                    Unit Price
                                  </div>
                                  <div className='text-small-text font-semibold w-1/4 text-right'>
                                    Price
                                  </div>
                                </div>
                                <div className='flex justify-between items-center py-2'>
                                  <div className='text-small-text w-1/4'>
                                    &nbsp;
                                  </div>
                                  <div className='text-small-text w-1/4 text-center flex justify-center items-center'>
                                    <div
                                      className='flex items-center border border-primary rounded-xs h-[50px] max-w-[100px]'
                                      x-data='{quantity : 2}'
                                    >
                                      <button
                                        type='button'
                                        onClick={() => {
                                          if (quantity['totalQty'] > 0) {
                                            updateQuantity(
                                              'totalQty',
                                              quantity['totalQty'] - 1,
                                            );
                                            debounceFnForQuantity(
                                              0,
                                              0,
                                              quantity['totalQty'] - 1,
                                              item.shoppingCartItemsId,
                                              'totalQty',
                                            );
                                          }
                                        }}
                                        className='inline-block w-3/12 text-center font-bold'
                                      >
                                        -
                                      </button>
                                      <div className='w-6/12 text-center font-bold'>
                                        <input
                                          className='w-full text-center focus:outline-none bg-transparent'
                                          type='number'
                                          value={quantity['totalQty']}
                                          onChange={(e) => {
                                            if (isNumberKey(e)) {
                                              updateQuantity(
                                                'totalQty',
                                                +e.target.value,
                                              );
                                              debounceFnForQuantity(
                                                0,
                                                0,
                                                +e.target.value,
                                                item.shoppingCartItemsId,
                                                'totalQty',
                                              );
                                            }
                                          }}
                                          min={0}
                                        />
                                      </div>
                                      <button
                                        type='button'
                                        onClick={() => {
                                          updateQuantity(
                                            'totalQty',
                                            quantity['totalQty'] + 1,
                                          );
                                          debounceFnForQuantity(
                                            0,
                                            0,
                                            quantity['totalQty'] + 1,
                                            item.shoppingCartItemsId,
                                            'totalQty',
                                          );
                                        }}
                                        className='inline-block w-3/12 text-center font-bold'
                                      >
                                        +
                                      </button>
                                    </div>
                                    {isheadercart && (
                                      <button
                                        onClick={() =>
                                          removeItemHandler(
                                            item.shoppingCartItemsId,
                                          )
                                        }
                                        className='text-primary hover:text-primary-hover ml-[5px]'
                                      >
                                        <span className='material-symbols-outlined mr-[5px] align-middle'>
                                          delete
                                        </span>
                                      </button>
                                    )}
                                  </div>
                                  <div className='text-small-text w-1/4 text-right'>
                                    <PriceLabel
                                      className=''
                                      price={item.totalPrice / item.totalQty}
                                    />
                                  </div>
                                  <div className='text-small-text w-1/4 text-right'>
                                    <PriceLabel
                                      className=''
                                      price={item.totalPrice}
                                    />
                                  </div>
                                </div>
                                <div className='flex justify-between py-3 mt-3 border-t border-[#D4CEB9]'>
                                  <div className='text-small-text w-1/4 font-[700]'>
                                    Product Total:
                                  </div>
                                  <div className='text-small-text w-1/4 font-[700] text-center'>
                                    &nbsp;
                                  </div>
                                  <div className='text-small-text w-1/4 text-center'>
                                    &nbsp;
                                  </div>
                                  <div className='text-small-text w-1/4 font-[700] text-right'>
                                    <PriceLabel
                                      className=''
                                      price={item.totalPrice}
                                    />
                                  </div>
                                </div>
                              </>
                            )}
                          </>
                        </div>
                      </div>
                      <div className='row-span-1 col-span-3 lg:col-span-3 ml-[0] lg:ml-[20px]'>
                        <div className='text-small-text mb-[12px]'>
                          {!item.isGiftcardProduct && (
                            <span className='text-[#9F2D3C]'>
                              {`${preOrderText} ${date[1]}, ${date[3]}`}
                            </span>
                          )}
                          {!isheadercart && (
                            <button
                              onClick={() =>
                                removeItemHandler(item.shoppingCartItemsId)
                              }
                              className='text-primary hover:text-primary-hover'
                            >
                              <span className='material-icons-outlined mr-[5px] align-middle'>
                                delete
                              </span>
                            </button>
                          )}
                        </div>
                        <div className='flex flex-wrap items-center gap-[10px]'>
                          {/* <div className=''>
                            <button
                              onClick={() => wishlistClick()}
                              className='btn btn-outline-primary btn-sm uppercase !font-body !rounded-xs !inline-flex gap-[10px] items-center'
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='20.2'
                                height='19.732'
                                viewBox='0 0 20.2 19.732'
                              >
                                <path
                                  id='Icon_ionic-ios-heart'
                                  data-name='Icon ionic-ios-heart'
                                  d='M16.675,3.938h-.044a4.978,4.978,0,0,0-4.156,2.275A4.978,4.978,0,0,0,8.319,3.938H8.275a4.946,4.946,0,0,0-4.9,4.944,10.65,10.65,0,0,0,2.091,5.806,36.648,36.648,0,0,0,7.009,6.751,36.648,36.648,0,0,0,7.009-6.751,10.65,10.65,0,0,0,2.091-5.806A4.946,4.946,0,0,0,16.675,3.938Z'
                                  transform='translate(-2.375 -2.938)'
                                  fill={wishListId ? 'red' : 'none'}
                                  stroke='currentColor'
                                  strokeWidth='2'
                                />
                              </svg>
                              <span className=''>Move to wishlist</span>
                            </button>
                          </div> */}
                        </div>
                      </div>
                    </div>
                    {item?.productBundleAllProductViewModels && (
                      <>
                        {item.productBundleAllProductViewModels.map((item) => (
                          <>
                            <div className='grid grid-cols-4 grid-flow-row-dense lg:grid-flow-col gap-4'>
                              <div className='row-span-1 col-span-1 lg:row-span-3'>
                                <div className='mb-[8px]'>
                                  <CustomLink
                                    href={`/${item.name}.html`}
                                    title={item.name}
                                  >
                                    {item?.attributeImagesViewModels ? (
                                      <Image
                                        src={
                                          item.attributeImagesViewModels[0]
                                            ?.imageUrl
                                        }
                                        alt={item.name}
                                        title=''
                                        className='rounded-tl-sm rounded-br-sm rounded-tr-sm rounded-bl-sm overflow-hidden lg:max-w-[100px] mx-auto'
                                      />
                                    ) : (
                                      <Image
                                        src={`/assets/images/products/sub-category-1.png`}
                                        alt='product'
                                        isStatic
                                        className='rounded-tl-sm rounded-br-sm rounded-tr-sm rounded-bl-sm overflow-hidden lg:max-w-[100px] mx-auto'
                                      />
                                    )}
                                  </CustomLink>
                                </div>
                              </div>
                              <div className='row-span-1 col-span-3 lg:row-span-2 ml-[0] lg:ml-[20px]'>
                                <div className='text-normal-text font-bold font-sub mb-[8px]'>
                                  <CustomLink
                                    href={`/${item.name}.html`}
                                    title={item.name}
                                  >
                                    {item.name}
                                  </CustomLink>
                                </div>

                                <div className='col-span-3'>
                                  <>
                                    {' '}
                                    <div className='flex justify-between items-center py-2'>
                                      <div className='text-small-text font-semibold w-1/4'>
                                        &nbsp;
                                      </div>
                                      <div className='text-small-text font-semibold w-1/4 text-center'>
                                        Qty
                                      </div>
                                      <div className='text-small-text font-semibold w-1/4 text-right'>
                                        Unit Price
                                      </div>
                                      <div className='text-small-text font-semibold w-1/4 text-right'>
                                        Price
                                      </div>
                                    </div>
                                    <div className='flex justify-between items-center py-2'>
                                      <div className='text-small-text w-1/4'>
                                        &nbsp;
                                      </div>
                                      <div className='text-small-text w-1/4 text-center flex justify-center items-center'>
                                        <div
                                          className='flex items-center justify-center border border-primary rounded-xs h-[50px] max-w-[100px]'
                                          x-data='{quantity : 2}'
                                        >
                                          <div className='w-6/12 text-center font-bold'>
                                            <input
                                              className='w-full text-center focus:outline-none bg-transparent'
                                              type='number'
                                              value={
                                                quantity['totalQty'] *
                                                item.quantity
                                              }
                                              min={0}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className='text-small-text w-1/4 text-right'>
                                        <PriceLabel
                                          className=''
                                          price={item.salePrice}
                                        />
                                      </div>
                                      <div className='text-small-text w-1/4 text-right'>
                                        <PriceLabel
                                          className=''
                                          price={
                                            item.salePrice *
                                            (quantity['totalQty'] *
                                              item.quantity)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </>
                                </div>
                              </div>
                            </div>
                          </>
                        ))}
                      </>
                    )}
                  </div>
                  <div className='w-full sm:w-2/12 md:w-2/12 px-[15px]'>
                    <PriceLabel
                      className={'text-right text-default-text font-bold'}
                      price={item.totalPrice}
                    />
                  </div>
                </div>
              </div>
            </>
          );
        },
      }}
    />
  );
};

export default CartItem;
