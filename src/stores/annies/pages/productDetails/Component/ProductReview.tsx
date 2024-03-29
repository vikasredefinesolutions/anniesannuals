import Image from '@/shared/Components/Image';
import { IProductRatings, IProductReviews } from '@/shared/types/product';
import React, { useState } from 'react';
import StarRatings from '../../../shared/components/StarRatings';
import ProductDetailInfoController from '@/features/product/productDetail/productDetailInfo.ts/controller';
import ReviewController from '@/features/product/productDetail/productReviewSection/controller';
import CustomLink from '@/shared/Components/CustomLink';
import { paths } from '@/utils/paths.constant';
import { getUserId } from '@/shared/utils/cookie.helper';
import RatingBarSection from '../../../shared/components/RatingBarSection';
import RatingLevelBarSection from '@/stores/annies/shared/components/RatingLevelBar';

interface IProps {
  productRatings: IProductRatings | null;
  productReviews: IProductReviews[] | null;
  productId: number;
  attributeId: number;
  seName: string;
}

const ProductReview: React.FC<IProps> = ({
  productRatings,
  productReviews,
  productId,
  attributeId,
  seName,
}) => {
  const userId = getUserId();
  const [showSortOption, setShowSortOption] = useState(false);
  const getPercentage = (totalReviewCount?: number, reviewCount?: number) => {
    return totalReviewCount && reviewCount
      ? (reviewCount / totalReviewCount) * 100
      : 0;
  };
  return (
    <ProductDetailInfoController
      config={{}}
      cases={{
        view: ({ config, activeDropDown, setActiveDropDown }) => {
          return (
            <>
              <div
                id='ReviewSection'
                className='text-title-text font-sub font-semibold flex items-center justify-between mb-[10px] pt-[15px] border-t border-gray-border cursor-pointer'
                onClick={() => setActiveDropDown(!activeDropDown)}
              >
                <div>Review</div>
                <div className=''>
                  <span className='material-icons-outlined'>
                    {activeDropDown ? 'remove' : 'add'}
                  </span>
                </div>
              </div>
              {activeDropDown && (
                <ReviewController
                  config={{
                    showReviewsRatings: true,
                    showPagination: true,
                    isReviewActionsEnabled: true,
                  }}
                  seName={seName}
                  productReviews={productReviews || []}
                  cases={{
                    view: ({
                      config,
                      currentPage,
                      reviews,
                      seeAllReview,
                      handlePageChange,
                      handleReviewAction,
                      handleSeeAllReviews,
                      filterReview,
                      productSortBy,
                      setproductSortBy,
                      activeFilter,
                    }) => {
                      return (
                        <>
                          {' '}
                          <div className='mb-[30px] text-default-text'>
                            <div className=''>
                              <div className='flex flex-wrap items-center mx-[-15px] mb-[15px]'>
                                <div className='w-1/2 px-[15px]'>
                                  <div className='flex flex-wrap items-end mb-[10px]'>
                                    <div className='font-sub font-bold text-2xl-text'>
                                      {productRatings?.ratingAverage || 0}
                                    </div>
                                    <div className='text-normal-text font-semibold ml-[10px]'>
                                      Out Of 5
                                    </div>
                                  </div>
                                  <StarRatings
                                    rating={parseFloat(
                                      productRatings?.ratingAverage || '0',
                                    )}
                                    textsize={'text-[26px]'}
                                  />
                                  {!seeAllReview &&
                                    productReviews &&
                                    productReviews?.length > 1 && (
                                      <>
                                        <div
                                          onClick={() => handleSeeAllReviews()}
                                          className='text-normal-text font-semibold'
                                        >
                                          See all {productReviews?.length}{' '}
                                          reviews
                                        </div>
                                      </>
                                    )}
                                  {/* <div className=""><a href="/"
                                    className="text-normal-text font-semibold">See all {reviews.length} reviews</a>
                                  </div> */}
                                </div>
                                <div className='w-1/2 px-[15px] text-right'>
                                  <CustomLink
                                    href={
                                      userId
                                        ? `${
                                            paths.writeReview
                                          }?productId=${productId}&&attributeId=${
                                            attributeId || 0
                                          }`
                                        : `${paths.login}?redirect=${
                                            paths.writeReview
                                          }?productId=${productId}&&attributeId=${
                                            attributeId || 0
                                          }`
                                    }
                                    className='btn btn-sm btn-primary uppercase !font-body !rounded-xs whitespace-nowrap'
                                  >
                                    <span className='material-icons-outlined align-middle'>
                                      drive_file_rename_outline
                                    </span>
                                    <span className='text-[12px]'>
                                      Write a review
                                    </span>
                                  </CustomLink>
                                </div>
                              </div>
                              {productReviews?.length && (
                                <>
                                  <div className='flex flex-wrap mx-[-15px]'>
                                    <div className='w-full md:w-6/12 px-[15px]'>
                                      <div className='font-bold font-sub mb-[15px]'>
                                        Select a row below to filter reviews.
                                      </div>
                                      <div onClick={() => filterReview(5)}>
                                        <RatingBarSection
                                          text={'5 Star'}
                                          ratingCount={
                                            productRatings?.fiveStarRatingCount ||
                                            0
                                          }
                                          ratingPercent={getPercentage(
                                            productRatings?.totalRatingCount,
                                            productRatings?.fiveStarRatingCount,
                                          )}
                                        />
                                      </div>
                                      <div onClick={() => filterReview(4)}>
                                        <RatingBarSection
                                          text={'4 Star'}
                                          ratingCount={
                                            productRatings?.fourStarRatingCount ||
                                            0
                                          }
                                          ratingPercent={getPercentage(
                                            productRatings?.totalRatingCount,
                                            productRatings?.fourStarRatingCount,
                                          )}
                                        />
                                      </div>
                                      <div onClick={() => filterReview(3)}>
                                        <RatingBarSection
                                          text={'3 Star'}
                                          ratingCount={
                                            productRatings?.threeStarRatingCount ||
                                            0
                                          }
                                          ratingPercent={getPercentage(
                                            productRatings?.totalRatingCount,
                                            productRatings?.threeStarRatingCount,
                                          )}
                                        />
                                      </div>
                                      <div onClick={() => filterReview(2)}>
                                        <RatingBarSection
                                          text={'2 Star'}
                                          ratingCount={
                                            productRatings?.twoStarRatingCount ||
                                            0
                                          }
                                          ratingPercent={getPercentage(
                                            productRatings?.totalRatingCount,
                                            productRatings?.twoStarRatingCount,
                                          )}
                                        />
                                      </div>
                                      <div onClick={() => filterReview(1)}>
                                        <RatingBarSection
                                          text={'1 Star'}
                                          ratingCount={
                                            productRatings?.oneStarRatingCount ||
                                            0
                                          }
                                          ratingPercent={getPercentage(
                                            productRatings?.totalRatingCount,
                                            productRatings?.oneStarRatingCount,
                                          )}
                                        />
                                      </div>
                                    </div>
                                    <div className='w-full md:w-6/12 px-[15px]'>
                                      <div className='font-bold font-sub mb-[15px]'>
                                        Average Customer Ratings
                                      </div>
                                      <div className='flex items-center justify-between mx-[-5px] mb-[15px]'>
                                        <div className='px-[5px] w-[150px]'>
                                          Overall
                                        </div>
                                        <div className='grow px-[5px]'>
                                          <StarRatings
                                            rating={parseFloat(
                                              productRatings?.ratingAverage ||
                                                '0',
                                            )}
                                            textsize={'text-[20px]'}
                                          />
                                        </div>
                                        <div className='px-[5px] text-right w-[40px]'>
                                          {parseFloat(
                                            productRatings?.ratingAverage ||
                                              '0',
                                          )}
                                        </div>
                                      </div>
                                      <RatingLevelBarSection
                                        text={'Quality of Product'}
                                        ratingCount={
                                          productRatings?.qualityOfProduct!
                                        }
                                      />
                                      <RatingLevelBarSection
                                        text={'Value of Product'}
                                        ratingCount={
                                          productRatings?.valueOfProduct!
                                        }
                                      />
                                      <RatingLevelBarSection
                                        text={'Easy of Use'}
                                        ratingCount={productRatings?.easyOfUse!}
                                      />
                                    </div>
                                  </div>
                                  <div className='flex flex-wrap mx-[-15px] mb-[15px]'>
                                    <div className='w-full px-[15px]'>
                                      <div className='bg-[#EEF3FF] p-[10px] flex flex-wrap items-center justify-between rounded-[3px]'>
                                        <div className='font-bold extra-small-text'>
                                          {reviews.length} OF{' '}
                                          {activeFilter
                                            ? reviews.length
                                            : productReviews?.length}{' '}
                                          REVIEWS
                                        </div>
                                        <div className='py-2 sm:py-0'>
                                          <div
                                            className='relative inline-block text-left z-10'
                                            onClick={() =>
                                              setShowSortOption(true)
                                            }
                                            onMouseLeave={() =>
                                              setShowSortOption(false)
                                            }
                                          >
                                            <div className='flex items-center'>
                                              <button
                                                type='button'
                                                className='group inline-flex items-center justify-between text-default-text bg-[#EEF3FF] w-[200px] px-2 py-3 leading-none'
                                                id='menu-button'
                                                x-ref='button'
                                                aria-expanded='false'
                                                aria-haspopup='true'
                                              >
                                                <span>
                                                  <span>Sort by:</span>{' '}
                                                  <span>{productSortBy}</span>{' '}
                                                </span>
                                                <span className='material-icons-outlined text-lg leading-none'>
                                                  expand_more
                                                </span>
                                              </button>
                                            </div>
                                            {showSortOption && (
                                              <div
                                                className='origin-top-right absolute right-0 mt-0 w-[200px] border border-primary bg-tertiary ring-1 ring-black ring-opacity-5 rounded-xs focus:outline-none'
                                                // style={{ display: 'none' }}
                                              >
                                                <div
                                                  className='py-1'
                                                  x-ref='options'
                                                >
                                                  <button
                                                    type='button'
                                                    className='w-full text-left px-2 py-1 text-default-text flex items-center gap-2 text-black'
                                                    onClick={() => {
                                                      setproductSortBy(
                                                        'Most Recent',
                                                      );
                                                    }}
                                                  >
                                                    {productSortBy ==
                                                      'Most Recent' && (
                                                      <span className='material-icons-outlined text-default-text text-default'>
                                                        check
                                                      </span>
                                                    )}{' '}
                                                    <span>Most Recent</span>
                                                  </button>{' '}
                                                  <button
                                                    type='button'
                                                    className='w-full text-left px-2 py-1 text-default-text flex items-center gap-2 text-black'
                                                    onClick={() => {
                                                      setproductSortBy(
                                                        'Oldest',
                                                      );
                                                    }}
                                                  >
                                                    {productSortBy ==
                                                      'Oldest' && (
                                                      <span className='material-icons-outlined text-default-text text-default'>
                                                        check
                                                      </span>
                                                    )}{' '}
                                                    <span>Oldest</span>
                                                  </button>
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                            {reviews.map((reviewItem, index) => {
                              return (
                                <div
                                  key={
                                    reviewItem.commentHeading +
                                    index +
                                    reviewItem.helpFullCount
                                  }
                                  className='mx-[-15px] mb-[30px] last:mb-0'
                                  itemProp='review'
                                  itemType='https://schema.org/Review'
                                  itemScope
                                >
                                  <div className='flex flex-wrap justify-between mb-[10px]'>
                                    <div className='px-[15px] flex flex-wrap items-center'>
                                      <div
                                        className='text-normal-text font-sub font-bold'
                                        itemProp='author'
                                        itemType='https://schema.org/Person'
                                        itemScope
                                      >
                                        <meta
                                          itemProp='name'
                                          content={reviewItem.name}
                                        />
                                        <span className='text-default'>
                                          {reviewItem.name}
                                        </span>
                                      </div>
                                      <div className='px-[10px]'>|</div>
                                      <div className='text-default-text mr-[5px]'>
                                        <span className='text-[#90887F]'>
                                          Verified Reviewer
                                        </span>
                                      </div>
                                      <div className=''>
                                        <span className='material-icons text-default align-middle'>
                                          check_circle
                                        </span>
                                      </div>
                                    </div>
                                    <div className='px-[15px] text-default-text'>
                                      <div className='text-[#90887F]'>
                                        {reviewItem.reviewDate}
                                      </div>
                                    </div>
                                  </div>

                                  <div
                                    className='mb-[10px] px-[15px]'
                                    itemProp='reviewRating'
                                    itemType='https://schema.org/Rating'
                                    itemScope
                                  >
                                    <meta
                                      itemProp='ratingValue'
                                      content={reviewItem.rating + ''}
                                    />
                                    <meta itemProp='bestRating' content='5' />
                                    <div className='text-default-text'>
                                      <StarRatings
                                        rating={reviewItem.rating}
                                        textsize={''}
                                      />
                                    </div>
                                  </div>

                                  <div className='flex flex-wrap justify-between'>
                                    <div className='w-full px-[15px]'>
                                      <div className='text-medium-text font-bold font-sub mb-[10px]'>
                                        {reviewItem.commentHeading}
                                      </div>
                                      <div className='text-small-text mb-[15px]'>
                                        <div className='leading-7'>
                                          {reviewItem.comments}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className='flex flex-wrap mb-[15px]'>
                                    {reviewItem.images.length > 0 &&
                                      reviewItem.images.map(
                                        (el1, itemIndex) => {
                                          return (
                                            <div
                                              className='px-[15px] mb-[15px] last:mb-0'
                                              key={el1.displayOrder + itemIndex}
                                            >
                                              <Image
                                                src={el1.imageName}
                                                className={'max-h-40'}
                                                alt={el1.imageName}
                                              />
                                            </div>
                                          );
                                        },
                                      )}
                                  </div>
                                  <div
                                    className='text-default-text flex items-center flex-wrap mb-[15px] px-[15px] cursor-pointer'
                                    onClick={() =>
                                      handleReviewAction(
                                        'like',
                                        reviewItem.reviewId,
                                      )
                                    }
                                  >
                                    <span className='material-icons text-[#90887F] mr-[10px]'>
                                      thumb_up
                                    </span>
                                    <span className='text-[#90887F]'>
                                      I recommend this product
                                    </span>
                                  </div>
                                  <div className='w-full px-[15px]'>
                                    <div className='text-default-text mb-[10px] font-sub'>
                                      Was this review helpful?
                                    </div>
                                    <div className='flex items-center divide-x divide-gray-border'>
                                      <div
                                        className='mb-[10px] text-default-text flex items-center px-[10px] first:pl-0 '
                                        onClick={async () => {
                                          handleReviewAction(
                                            'like',
                                            reviewItem.reviewId,
                                          );
                                        }}
                                      >
                                        <span className='material-icons text-[#90887F] mr-[10px] cursor-pointer'>
                                          thumb_up
                                        </span>
                                        <span className='text-[#90887F]'>
                                          Yes ({reviewItem.helpFullCount})
                                        </span>
                                      </div>
                                      <div
                                        className='mb-[10px] text-default-text flex items-center px-[10px] first:pl-0 '
                                        onClick={() =>
                                          handleReviewAction(
                                            'dislike',
                                            reviewItem.reviewId,
                                          )
                                        }
                                      >
                                        <span className='material-icons text-[#90887F] mr-[10px] cursor-pointer'>
                                          thumb_down
                                        </span>
                                        <span className='text-[#90887F]'>
                                          No ({reviewItem.notHelpFullCount})
                                        </span>
                                      </div>
                                      <div className='mb-[10px] text-default-text flex items-center px-[10px] first:pl-0'>
                                        <span className='material-icons text-[#90887F] mr-[10px] cursor-pointer'>
                                          outlined_flag
                                        </span>
                                        <span className='text-[#90887F]'>
                                          Report
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                            {reviews.length <
                              (activeFilter
                                ? reviews.length
                                : productReviews?.length)! && (
                              <div className='text-center sm:text-left'>
                                <button
                                  onClick={handleSeeAllReviews}
                                  className='btn btn-md btn-primary'
                                >
                                  Load More Reviews
                                </button>
                              </div>
                            )}
                          </div>
                        </>
                      );
                    },
                  }}
                />
              )}
            </>
          );
        },
      }}
    />
  );
};

export default ProductReview;
