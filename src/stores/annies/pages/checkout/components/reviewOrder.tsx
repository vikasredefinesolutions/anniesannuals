import { useAppSelector } from '@/app/redux/hooks';
import CartItemController from '@/features/cart/cartItemController/controller';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import PriceLabel from '@/shared/Components/PriceLabel';
import { getUserId } from '@/shared/utils/cookie.helper';
import { isNumberKey } from '@/shared/utils/helper';
import { useRouter } from 'next/navigation';

const ReviewOrder = () => {
  const { cartData } = useAppSelector((state) => state.cart);
  const { checkoutPaymentSaved } = useAppSelector(
    (state) => state.checkout.payment,
  );

  const userId = getUserId();
  const router = useRouter();

  return (
    <>
      <div className='pb-[15px] mb-[15px] border-b border-b-[#D4CEB9]'>
        <div className='font-sub font-bold text-sub-text'>
          4. Review and Submit Order
        </div>
        {checkoutPaymentSaved && (
          <div className='lg:pl-[25px] pl-0 mt-[30px]'>
            {cartData.map((item, index) => {
              let CommonName: string;
              let CultivarName: string;
              let prefferedCommonName: string;
              let secondaryCommonName: string;
              let RestrictState: string;

              item?.customFields?.map((el: any) => {
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
                if (
                  el.label.toUpperCase() ==
                  'Restrict Ship To State'.toUpperCase()
                ) {
                  RestrictState = el.value;
                }
              });
              return (
                <div key={item.productId}>
                  <CartItemController
                    item={item}
                    cases={{
                      ready: ({
                        quantity,
                        updateQuantity,
                        price,
                        debounceFnForQuantity,
                        checkCommonName,
                      }) => {
                        const date = new Date(
                          item.shippingDate,
                        ).toLocaleDateString();

                        return (
                          <>
                            <div
                              key={item.productId}
                              className='pb-[15px] border-b border-b-[#D4CEB9] mb-[15px] last:border-0 last:mb-0 last:pb-0 pt-[15px] first:pt-0'
                            >
                              <div className='flex justify-between '>
                                {' '}
                                {/* mx-[-15px] */}
                                <div className='w-full md:w-10/12 px-[15px]'>
                                  <div className='grid lg:grid-rows-2 grid-cols-3 grid-flow-row-dense lg:grid-flow-col gap-4'>
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
                                            />
                                          )}
                                        </CustomLink>
                                      </div>
                                    </div>
                                    <div className='row-span-1 col-span-3 lg:row-span-2 ml-[0] lg:ml-[20px]'>
                                      <div className='text-normal-text font-bold font-sub mb-[8px]'>
                                        <CustomLink
                                          href={`/${item.seName}.html`}
                                          title={item.productName}
                                        >
                                          {item.productName}
                                        </CustomLink>
                                      </div>

                                      {prefferedCommonName ||
                                        (secondaryCommonName && (
                                          <div className='text-sub-text font-sub opacity-80 pt-[10px] mb-[10px] flex flex-wrap'>
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

                                      {checkCommonName(item?.customFields) && (
                                        <div className='text-normal-text italic font-sub opacity-80 mb-[8px]'>
                                          '{checkCommonName(item?.customFields)}
                                          '
                                        </div>
                                      )}

                                      <div className='col-span-3'>
                                        <>
                                          {item.shoppingCartItemDetailsViewModel
                                            .length > 0 ? (
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
                                                      {' '}
                                                      <div className='flex justify-between items-center py-2'>
                                                        <div className='text-small-text w-1/4'>
                                                          {' '}
                                                          {
                                                            view.attributeOptionValue
                                                          }
                                                        </div>
                                                        <div className='text-small-text w-1/4 text-center flex justify-center items-center'>
                                                          <div className='flex items-center border border-primary rounded-xs h-[50px] max-w-[100px]'>
                                                            <button
                                                              type='button'
                                                              disabled={true}
                                                              onClick={() => {
                                                                if (
                                                                  quantity[
                                                                    view
                                                                      .attributeOptionValue
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
                                                              className=' w-3/12 text-center font-bold hidden'
                                                            >
                                                              -
                                                            </button>
                                                            <div className='w-full text-center font-bold'>
                                                              <input
                                                                disabled={true}
                                                                className='w-full text-center focus:outline-none bg-transparent'
                                                                type='number'
                                                                value={
                                                                  quantity[
                                                                    view
                                                                      .attributeOptionValue
                                                                  ]
                                                                }
                                                                onChange={(
                                                                  e,
                                                                ) => {
                                                                  if (
                                                                    isNumberKey(
                                                                      e,
                                                                    )
                                                                  ) {
                                                                    updateQuantity(
                                                                      view.attributeOptionValue,
                                                                      +e.target
                                                                        .value,
                                                                    );
                                                                    debounceFnForQuantity(
                                                                      item.attributeOptionId ||
                                                                        0,
                                                                      view.id,
                                                                      +e.target
                                                                        .value,
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
                                                              disabled={true}
                                                              onClick={() => {
                                                                updateQuantity(
                                                                  view.attributeOptionValue,
                                                                  quantity[
                                                                    view
                                                                      .attributeOptionValue
                                                                  ] + 1,
                                                                );
                                                                debounceFnForQuantity(
                                                                  item.attributeOptionId ||
                                                                    0,
                                                                  view.id,
                                                                  quantity[
                                                                    view
                                                                      .attributeOptionValue
                                                                  ] + 1,
                                                                  item.shoppingCartItemsId,
                                                                  view.attributeOptionValue,
                                                                );
                                                              }}
                                                              className=' w-3/12 text-center font-bold hidden'
                                                            >
                                                              +
                                                            </button>
                                                          </div>
                                                        </div>
                                                        <div className='text-small-text w-1/4 text-right'>
                                                          <PriceLabel
                                                            price={
                                                              view?.unitPrice ||
                                                              0
                                                            }
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
                                                      disabled={true}
                                                      onClick={() => {
                                                        if (
                                                          quantity['totalQty'] >
                                                          0
                                                        ) {
                                                          updateQuantity(
                                                            'totalQty',
                                                            quantity[
                                                              'totalQty'
                                                            ] - 1,
                                                          );
                                                          debounceFnForQuantity(
                                                            0,
                                                            0,
                                                            quantity[
                                                              'totalQty'
                                                            ] - 1,
                                                            item.shoppingCartItemsId,
                                                            'totalQty',
                                                          );
                                                        }
                                                      }}
                                                      className=' w-3/12 text-center font-bold hidden'
                                                    >
                                                      -
                                                    </button>
                                                    <div className='w-full text-center font-bold'>
                                                      <input
                                                        disabled={true}
                                                        className='w-full text-center focus:outline-none bg-transparent'
                                                        type='number'
                                                        value={
                                                          quantity['totalQty']
                                                        }
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
                                                      disabled={true}
                                                      type='button'
                                                      onClick={() => {
                                                        updateQuantity(
                                                          'totalQty',
                                                          quantity['totalQty'] +
                                                            1,
                                                        );
                                                        debounceFnForQuantity(
                                                          0,
                                                          0,
                                                          quantity['totalQty'] +
                                                            1,
                                                          item.shoppingCartItemsId,
                                                          'totalQty',
                                                        );
                                                      }}
                                                      className=' w-3/12 text-center font-bold hidden'
                                                    >
                                                      +
                                                    </button>
                                                  </div>
                                                </div>
                                                <div className='text-small-text w-1/4 text-right'>
                                                  <PriceLabel
                                                    className=''
                                                    price={
                                                      item.totalPrice /
                                                      item.totalQty
                                                    }
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
                                    <div className='row-span-1 col-span-3 lg:col-span-2 ml-[0] lg:ml-[20px]'>
                                      <div className='text-small-text mb-[12px]'>
                                        <span className='text-[#9F2D3C]'>
                                          Shipping begins the week of {date}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className='w-full md:w-2/12 px-[15px]'>
                                  <PriceLabel
                                    className={
                                      'text-right text-default-text font-bold'
                                    }
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
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default ReviewOrder;
