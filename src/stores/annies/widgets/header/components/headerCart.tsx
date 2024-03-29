import { useAppSelector } from '@/app/redux/hooks';
import CartController from '@/features/cart/cartController/controller';
import { tStoreDetailsFile } from '@/helper/staticfile.helper';
import { Ratings } from '@/shared/Components/Card/Ratings';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import PriceLabel from '@/shared/Components/PriceLabel';
import {
  _GetfeaturedItemsOutput,
  getFeaturedProductItemsBySeName,
} from '@/shared/apis/header/getFeaturedItems';
import storeDetails from '@/staticData/storeDetails.json';
import CartItem from '@/stores/annies/pages/cart/components/CartItem';
import { paths } from '@/utils/paths.constant';
import { useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

type HeaderCartRef = HTMLDivElement | null;

interface Props {
  closeCart: () => void;
  cmsStoreThemeConfigsViewModel: tStoreDetailsFile['cmsStoreThemeConfigsViewModel'];
}

const NextBtn = ({ onClick }: any) => {
  return (
    <div className='absolute top-1/2 -translate-y-1/2 right-[20px] z-20 flex items-center'>
      <button onClick={onClick}>
        <div
          style={{ right: '-19px' }}
          className='overflow-hidden rounded-tr-sm rounded-bl-sm leading-none absolute top-1/2 -translate-y-1/2 z-20 cursor-pointer h-[40px] w-[40px] md:h-[60px] md:w-[60px] bg-[#694D84] bg-opacity-80 hover:bg-opacity-100 slick-arrow block'
        >
          <span className='material-icons-outlined flex justify-center items-center w-full h-full text-[#ffffff]'>
            arrow_forward_ios
          </span>
        </div>
      </button>
    </div>
  );
};

const PrevBtn = ({ onClick }: any) => {
  return (
    <div className='absolute top-1/2 -translate-y-1/2 left-4 z-20 flex items-center'>
      <button onClick={onClick}>
        <div
          className='overflow-hidden rounded-tl-sm rounded-br-sm leading-none absolute top-1/2 -translate-y-1/2 z-20 cursor-pointer h-[40px] w-[40px] md:h-[60px] md:w-[60px] bg-[#694D84] bg-opacity-80 hover:bg-opacity-100 slick-arrow block'
          style={{ left: '-16px' }}
        >
          <span className='material-icons-outlined flex justify-center items-center w-full h-full text-[#ffffff]'>
            arrow_back_ios
          </span>
        </div>
      </button>
    </div>
  );
};

const HeaderCart: React.FC<Props> = ({
  closeCart,
  cmsStoreThemeConfigsViewModel,
}) => {
  const { orderSubTotal } = useAppSelector((state) => state.cart);

  const router = useRouter();

  const annoucement = JSON.parse(
    cmsStoreThemeConfigsViewModel?.find(
      (item) => item.config_name === 'header_config',
    )?.config_value || '',
  );

  const getByItWithvariable = cmsStoreThemeConfigsViewModel.find(
    (data) => data.config_name === 'cartPage',
  );

  const { cartData } = useAppSelector((state) => state.cart);

  const cartTotal = () => {
    let totalItems = 0;
    cartData.map((el) => {
      totalItems = totalItems + el.totalQty;
    });
    return totalItems;
  };

  const buyItWithObject = getByItWithvariable?.config_value.length
    ? JSON.parse(getByItWithvariable.config_value)
    : {};
  const seName = (buyItWithObject?.buy_it_with || []).join(',');

  const payload = {
    sename: seName,
    // sename:
    //   'gift-annie-s-gardening-merit-badges-adopt-a-garden-cat,maxsea-16-16-16-all-purpose-plant-food,maxsea-14-18-14-acid-plant-food',
    type: 'manual',
    storeId: 5,
    maximumItemsForFetch: 5,
    tagName: '',
  };

  const [suggestedItems, setSuggestedItems] = useState<
    _GetfeaturedItemsOutput[]
  >([]);

  const fetchSuggestedItem = async () => {
    try {
      const response = await getFeaturedProductItemsBySeName(payload);
      setSuggestedItems(response);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchSuggestedItem();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    arrow: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
  };

  const cartRef = useRef<HeaderCartRef>(null);

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        closeCart();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [cartRef]);

  return (
    <>
      <div className='fixed bg-[#FCEDFF] inset-0 left-auto max-w-[716px] h-screen w-full text-sm shadow-[0_0px_5px_rgb(0,0,0,0.5)] border border-[#f4ede6] tracking-[1px] z-50 sm:pl-[0] pl-[50px]'>
        <div
          className='fixed inset-0 bg-black shadow bg-opacity-50  '
          arial-hidden='true'
        ></div>
        <div
          ref={cartRef}
          className='relative bg-[#FCEDFF] z-50 text-[12px] leading-normal h-full overflow-y-auto'
        >
          <div className='overflow-x-hidden overflow-y-auto border-t first:border-t-0 border-[#758592] pt-[15px] first:pt-[0px]'>
            <div className='bg-[#ffffff]'>
              <div className='bg-gradient-to-l from-100% from-[#C9C1D2] to-[#FFFFFF] py-[3px]'>
                <div className='flex flex-wrap justify-between items-center'>
                  <div className='w-4/12 sm:w-6/12 md:w-2/12 px-[15px]'>
                    <CustomLink
                      title='Annies'
                      className='max-w-[100px] w-full'
                      href={paths.home}
                    >
                      <div className='brand-logo w-full'>
                        <Image
                          src={storeDetails?.logoUrl}
                          alt='annies'
                          className='max-h-full'
                        />
                      </div>
                    </CustomLink>
                  </div>
                  {annoucement?.announcementRow &&
                    annoucement?.announcementRow?.length &&
                    annoucement?.announcementRow[0]?.isVisible && (
                      <div className='w-5/12 md:w-9/12 px-[10px] hidden md:inline-block'>
                        <div
                          className='font-bold text-[12px] text-black uppercase text-center'
                          dangerouslySetInnerHTML={{
                            __html:
                              annoucement?.announcementRow[0]?.leftSideText ||
                              '',
                          }}
                        ></div>
                      </div>
                    )}

                  <div className='w-8/12 sm:w-6/12 md:w-1/12 px-[15px] text-right flex items-center'>
                    {annoucement?.announcementRow &&
                      annoucement?.announcementRow?.length &&
                      annoucement?.announcementRow[0]?.isVisible && (
                        <div
                          className='font-bold text-[9px] text-black sm:text-[12px] uppercase text-right md:hidden flex justify-end'
                          dangerouslySetInnerHTML={{
                            __html:
                              annoucement?.announcementRow[0]?.leftSideText ||
                              '',
                          }}
                        ></div>
                      )}
                    <button
                      type='button'
                      onClick={closeCart}
                      className='text-[#ffffff] bg-[#295B4C] hover:bg-[#8a2c9b] hover:text-[#ffffff] rounded-full text-[14px] p-[6px] ml-auto inline-flex items-center'
                    >
                      <span className='material-icons-outlined text-[19px]'>
                        close
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className='mx-[15px] mt-[15px]'>
                <CartController
                  cmsStoreThemeConfigsViewModel={cmsStoreThemeConfigsViewModel}
                  cases={{
                    empty: () => (
                      <div className='flex w-full h-[300px] justify-center items-center text-slate-900 font-bold text-lg'>
                        Cart is empty
                      </div>
                    ),
                    loading: () => (
                      <div className='flex w-full h-[300px] justify-center items-center text-slate-900 font-bold text-lg'>
                        Cart is loading...
                      </div>
                    ),
                    ready: ({ cartData, setStatus }) => (
                      <>
                        <div className='font-sub font-bold text-normal-text mb-[15px]'>
                          Shopping cart ({cartTotal() || 0})
                        </div>
                        <div className='overflow-x-hidden'>
                          <div className='pb-[15px] border-b border-b-[#D4CEB9] mb-[15px] last:border-0 last:mb-0 pt-[15px] first:pt-0'>
                            <div className='flex flex-wrap mx-[-15px]'>
                              {cartData.map((item) => (
                                <CartItem
                                  isheadercart={true}
                                  setStatus={setStatus}
                                  item={item}
                                  isEmployeeLoggedIn={false}
                                  key={item.productId}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    ),
                  }}
                />
              </div>
            </div>
            <div className='px-[15px] pb-[30px]'>
              <div className='pr-[30px]'>
                <div className='py-[15px] border-b border-b-gray-border flex flex-wrap justify-between items-center'>
                  <div className='font-semibold text-default-text'>
                    Product Subtotal:
                  </div>
                  <PriceLabel
                    className='font-bold text-default-text'
                    price={orderSubTotal}
                  />
                </div>
                {/* <div className='py-[15px] border-b border-b-gray-border flex flex-wrap justify-between items-center'>
                  <div className='font-semibold text-default-text'>
                    Estimated Shipping:
                  </div>
                  <PriceLabel
                    className='font-bold text-default-text'
                    price={shippingCharge}
                  />
                </div> */}
                <div className='py-[15px] flex flex-wrap justify-between items-center'>
                  <div className='font-semibold text-default-text'>
                    Estimated Shipping
                    <span className='text-small-text font-normal text-[#828282]'>
                      (calculated on checkout)
                    </span>
                  </div>
                  <div className='font-bold text-default-text'>--</div>
                </div>
                <div className='py-[15px] flex flex-wrap justify-between items-center'>
                  <div className='font-semibold text-default-text'>
                    Taxes and Fees
                    <span className='text-small-text font-normal text-[#828282]'>
                      (calculated on checkout)
                    </span>
                  </div>
                  <div className='font-bold text-default-text'>--</div>
                </div>
                <div className='py-[15px] flex flex-wrap justify-between items-center'>
                  <div className='font-bold text-medium-text'>
                    Estimated Order Total:
                  </div>
                  <PriceLabel
                    className='font-bold text-medium-text'
                    price={orderSubTotal}
                  />
                </div>
                <div className='py-[15px] flex flex-wrap justify-between items-center mx-[-15px]'>
                  <div className='lg:w-1/2 px-[15px] lg:mb-0 mb-[15px] w-auto'>
                    <button
                      onClick={() => {
                        closeCart();
                        router.push(paths.checkout);
                      }}
                      className='lg:text-[14px] sm:text-[13px] text-[10px] bg-[#295B4C] w-full text-center text-white font-extrabold uppercase rounded-xs lg:px-[36px] px-[10px] py-[15px] flex items-center justify-center gap-[5px]'
                    >
                      <span className='material-icons-outlined'>lock</span>
                      continue to checkout
                    </button>
                  </div>
                  <div className='lg:w-1/2 px-[15px] lg:mb-0 mb-[15px] w-auto'>
                    <button
                      onClick={() => {
                        closeCart();
                        router.push(paths.cart);
                      }}
                      className='lg:text-[14px] sm:text-[13px] text-[10px] border block border-[#273721] w-full text-center font-extrabold uppercase rounded-xs lg:px-[37px] px-[10px] py-[15px] text-[#273721]'
                    >
                      view cart
                    </button>
                  </div>
                </div>
                <div className='py-[15px]'>
                  <div className='text-center'>
                    <button
                      onClick={closeCart}
                      className='text-[14px] font-semibold text-[#273721] uppercase underline'
                    >
                      continue shopping
                    </button>
                  </div>
                </div>
                {suggestedItems.length > 0 && (
                  <div className='font-sub font-bold text-normal-text py-[15px]'>
                    You Might Also Like
                  </div>
                )}
                {suggestedItems.length > 0 && (
                  <Slider
                    {...settings}
                    responsive={[
                      // {
                      //   breakpoint: 1024,
                      //   settings: {
                      //     slidesToShow: 3,
                      //     slidesToScroll: 3,
                      //     infinite: true,
                      //     dots: true
                      //   }
                      // },
                      {
                        breakpoint: 600,
                        settings: {
                          slidesToShow: 2,
                        },
                      },
                      {
                        breakpoint: 480,
                        settings: {
                          slidesToShow: 1,
                        },
                      },
                    ]}
                  >
                    {suggestedItems.map((data) => {
                      return (
                        <div key={data.productId}>
                          <Fragment key={data.productId}>
                            <div className=' pb-[30px] px-[15px] box-color-main'>
                              <div className='relative overflow-hidden rounded-tl-lg rounded-br-lg group'>
                                <div>
                                  <CustomLink
                                    href={`/${data.productSEName}.html`}
                                  >
                                    <Image src={data.imageUrl} alt='product' />
                                  </CustomLink>
                                </div>
                                <div className='relative sm:absolute p-[15px] box-color bg-opacity-80 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700 '>
                                  <div className='h-full w-full'>
                                    <div className='truncate text-white'>
                                      <CustomLink
                                        href={`/${data.productSEName}.html`}
                                        className='text-normal-text text-white font-bold font-sub w-full '
                                      >
                                        {data.productName}
                                      </CustomLink>
                                    </div>
                                    <div className='text-small-text text-white mb-[5px] w-full leading-none'>
                                      {data.productSEName}
                                    </div>
                                    <div className='flex flex-wrap w-full'>
                                      <div className='mr-[10px]'>
                                        <div className='mr-[10px]'>
                                          {Ratings(
                                            Number(
                                              data?.productReviewsCount || 0,
                                            ),
                                          )}
                                        </div>
                                      </div>
                                      <div className='w-full sm:w-auto'>
                                        <div className='text-white text-extra-small-text'>
                                          {data?.productReviewsCount === 0
                                            ? '0 Review'
                                            : data?.productReviewsCount === 1
                                            ? `${data?.productReviewsCount} Review`
                                            : `${data?.productReviewsCount} Reviews`}
                                        </div>
                                      </div>
                                    </div>
                                    <div className='text-default-text text-white font-bold'>
                                      Price: ${data.salePrice}
                                    </div>
                                    <div className='absolute bottom-[15px] right-[20px]'>
                                      <CustomLink
                                        href={`/${data.productSEName}.html`}
                                        className='h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full'
                                      >
                                        <span className='material-icons-outlined'>
                                          chevron_right
                                        </span>
                                      </CustomLink>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Fragment>

                          {/* <BuyItCard
                          name={data?.productName}
                          seName={subCategoryName}
                          ratting={Number(data.productRatingAverage)}
                          price={Number(data.msrp)}
                          reviews={Number(data.productReviewsCount)}
                          url={data.productSEName + '.html'}
                        /> */}
                        </div>
                      );
                    })}
                  </Slider>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderCart;
