import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import PriceLabel from '@/shared/Components/PriceLabel';
import { _CartItem } from '@/shared/apis/cart/fetchCartProducts';

interface _Props {
  cartItems: _CartItem[];
  showPlaceOrderScreen: boolean;
}

const PLCartItems = ({ cartItems, showPlaceOrderScreen }: _Props) => {
  return (
    <>
      {showPlaceOrderScreen && (
        <div className='pb-[50px] mb-[40px]'>
          <hr />
          <div className='flex justify-between text-default-text font-sub font-semibold'>
            <div className='font-sub font-bold text-normal-text mb-[30px]'>
              Items in your cart:
            </div>
            <div className=''>Total</div>
          </div>
          <div className='w-full'>
            {cartItems.map((item: _CartItem, index: number) => {
              return (
                <div
                  key={index}
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
                          <div className='text-normal-text font-bold font-sub mb-[8px]'>
                            <CustomLink
                              href={`/${item.seName}.html`}
                              title={item.productName}
                            >
                              {item.productName}
                            </CustomLink>
                          </div>

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
                                              <div className='w-6/12 text-center font-bold'>
                                                {view.qty}
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
                                      <div className='w-6/12 text-center font-bold'>
                                        {item.totalQty}
                                      </div>
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
                    </div>
                    <div className='w-full sm:w-2/12 md:w-2/12 px-[15px]'>
                      <PriceLabel
                        className={'text-right text-default-text font-bold'}
                        price={item.totalPrice}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default PLCartItems;
