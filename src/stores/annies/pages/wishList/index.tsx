'use client';
import WishListController from '@/features/myAccount/wishList/controller';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import Loader from '@/shared/Components/Loader';
import { WishlistType } from '@/shared/apis/cart/removeFromWishlist';
import { getUserId } from '@/shared/utils/cookie.helper';
import { paths } from '@/utils/paths.constant';
import { Fragment } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import ProductNames from '../../shared/components/ProductNames';
import StarRatings from '../../shared/components/StarRatings';
import SideLayout from '../../shared/components/myAccountLayout';

const WishList = () => {
  const userId = getUserId();
  return (
    <WishListController
      configs={null}
      cases={{
        loading: () => <Loader />,
        ready: ({ wishListDatas, removeWishList, removeSuccess }) => {
          return (
            <>
              <SideLayout>
                <div className='w-full px-[15px]'>
                  <div>
                    <h1 className='text-2xl-text mb-[20px] font-bold font-sub'>
                      Wishlist
                    </h1>
                    {/* for border top */}
                    <div className='mb-[40px] border-t border-t-gray-border'></div>
                    {removeSuccess && (
                      <div className='bg-[#ECFFF3] border border-[#9BFFC0] rounded-[10px] flex items-center gap-2 mb-[20px]'>
                        <span className='text-green-700 text-xl'>
                          <AiOutlineCheckCircle />
                        </span>
                        <div className='text-green-700'>
                          <div>Item has been successfully removed</div>
                        </div>
                      </div>
                    )}
                    <div className='p-[15px] lg:p-[30px] drop-shadow-md rounded-sm bg-[#FCFFF5] mb-[40px]'>
                      <div>
                        <div className='flex flex-wrap mx-[-8px] lg:mx-[-15px]'>
                          {wishListDatas?.map((wishListData: WishlistType) => {
                            // let CommonName: string = '';
                            // let CultivarName: string = '';
                            // wishListData?.customFields?.map((el: any) => {
                            //   if (el.label.toUpperCase() == 'COMMON NAME') {
                            //     CommonName = el.value;
                            //   }
                            //   if (el.label.toUpperCase() == 'CULTIVAR NAME') {
                            //     CultivarName = el.value;
                            //   }
                            // });
                            return (
                              <Fragment key={wishListData?.id}>
                                <div className='mb-8 w-6/12 md:w-4/12 xl:w-3/12 pb-[20px] md:pb-[0px] px-[8px] xl:px-[15px]'>
                                  <div className='relative'>
                                    <div className='overflow-hidden rounded-tl-lg rounded-br-lg'>
                                      <CustomLink
                                        href={`/${wishListData?.seName}.html`}
                                        className='max-w-[241px] max-h-[278px]'
                                      >
                                        <Image
                                          src={wishListData?.colorLogoUrl}
                                          alt={'wished product'}
                                        />
                                      </CustomLink>
                                    </div>
                                    <div className='pt-[15px]'>
                                      <div className='overflow-hidden'>
                                        <CustomLink
                                          href={`/${wishListData?.seName}.html`}
                                        >
                                          <h2 className='text-normal-text truncate font-bold font-sub w-full'>
                                            {wishListData?.productName}
                                          </h2>
                                          <ProductNames
                                            customFields={
                                              wishListData.customFields
                                            }
                                            dark
                                          />
                                        </CustomLink>
                                      </div>

                                      <div className='flex flex-wrap w-full'>
                                        <div className='mr-[10px]'>
                                          <StarRatings
                                            rating={Number(
                                              wishListData?.productRatingAverage,
                                            )}
                                            textsize={'text-sm'}
                                          />
                                        </div>
                                        <div className='w-full sm:w-auto mr-[10px]'>
                                          <span
                                            className={`text-extra-small-text ${
                                              wishListData?.productReviewsCount ===
                                                0 && 'text-dark-gray'
                                            }`}
                                          >
                                            {wishListData?.productRatingAverage}
                                          </span>
                                        </div>
                                        <div className='w-full sm:w-auto'>
                                          <span
                                            className={`text-extra-small-text underline ${
                                              wishListData?.productReviewsCount ===
                                                0 && 'text-dark-gray'
                                            }`}
                                          >
                                            {wishListData?.productReviewsCount}{' '}
                                            {wishListData?.productReviewsCount >
                                            1
                                              ? 'Reviews'
                                              : 'Review'}
                                          </span>
                                        </div>
                                      </div>
                                      <div className='text-title-text font-bold pt-[15px]'>
                                        ${wishListData?.price}
                                      </div>
                                      <div className='pt-[15px]'>
                                        {wishListData?.quantity === 0 ? (
                                          <button
                                            type='button'
                                            disabled={true}
                                            className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'
                                          >
                                            Out of Stock
                                          </button>
                                        ) : (
                                          <CustomLink
                                            href={
                                              !!userId
                                                ? `/${wishListData?.seName}.html`
                                                : `/${
                                                    paths.login
                                                  }?redirect=/product/${wishListData?.seName!}.html`
                                            }
                                            className='btn btn-primary btn-sm uppercase !font-body !rounded-xs cursor-pointer'
                                          >
                                            Add to cart
                                          </CustomLink>
                                        )}
                                      </div>
                                      <div className='pt-[15px]'>
                                        <button
                                          onClick={() =>
                                            removeWishList(wishListData?.id)
                                          }
                                          type='button'
                                          className='text-small-text text-primary uppercase font-bold underline'
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Fragment>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SideLayout>
            </>
          );
        },
      }}
    />
  );
};

export default WishList;
