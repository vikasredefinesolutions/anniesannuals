import CustomLink from '@/shared/Components/CustomLink';
import SideLayout from '../../shared/components/myAccountLayout';
import { paths } from '@/utils/paths.constant';
import Image from '@/shared/Components/Image';
import StarRatings from '../../shared/components/StarRatings';
import React, { Fragment } from 'react';
import { ICustomerProductReview } from '@/shared/apis/product/fetchCustomerProductReviews';

const ProductReview: React.FC<{
  reviewsList: ICustomerProductReview[] | [];
}> = ({ reviewsList }) => {
  return (
    <>
      {' '}
      <SideLayout>
        <div className='flex flex-wrap justify-between items-center mb-[20px]'>
          <h1 className='text-2xl-text mb-[10px] font-bold font-sub'>
            Review Your Purchases
          </h1>
          <div className='flex flex-wrap justify-between gap-2 md:gap-5 items-center'>
            <div className='mb-[10px] md:mb-0'>
              <CustomLink
                href={paths.home}
                className='!flex flex-wrap items-center gap-x-[10px] text-anchor'
              >
                <span>
                  <Image
                    className=''
                    isStatic
                    alt=''
                    src='/assets/images/return.svg'
                  />
                </span>
                <span className='underline font-semibold text-default-text'>
                  Return to shopping
                </span>
              </CustomLink>
            </div>
            <div className='mb-[10px] md:mb-0'>
              <CustomLink
                href='mailto:contact@anniesannuals.com'
                className='!flex flex-wrap items-center gap-x-[10px] text-anchor'
              >
                <span>
                  <Image
                    className=''
                    isStatic
                    alt=''
                    src='/assets/images/shareIcon.svg'
                  />
                </span>
                <span className='underline font-semibold text-default-text'>
                  Share
                </span>
              </CustomLink>
            </div>
          </div>
        </div>
        <div className='mb-[40px] border-t border-t-gray-border'></div>
        {/* <div className='p-[15px] lg:p-[30px] drop-shadow-md rounded-sm bg-[#FCFFF5] mb-[15px]'>
          <div className='text-[20px] font-bold text-default flex flex-wrap items-center pb-[10px]'>
            <Image
              src='/assets/images/check-circle.png'
              alt=''
              isStatic
              className='mr-[10px] w-[24px] h-[24px]'
            />
            Review Submitted
          </div>
          <div className='text-small-text ml-[34px]'>
            We’re processing your review. This might take several days. So, we
            appreciate your patience. We will e-mail you when this is complete.
          </div>
        </div> */}

        <div className='py-[15px] lg:py-[30px] drop-shadow-md rounded-sm bg-[#FCFFF5] mb-[40px]'>
          <div className='text-title-text font-semibold font-sub mb-[10px] md:mb-0 px-[15px] lg:px-[30px]'>
            Reviews
          </div>
          {reviewsList.length > 0 ? (
            reviewsList.map(
              (reviewObj: ICustomerProductReview, index: number) => {
                return (
                  <Fragment key={reviewObj.id + index}>
                    <div className='flex flex-wrap mb-[30px] pt-[30px]'>
                      <div className='sm:w-3/12 w-full px-[15px] lg:px-[30px] mb-[30px] sm:mb-0'>
                        <div className='rounded-sm overflow-hidden'>
                          <CustomLink
                            href={`/${reviewObj?.productSename}.html`}
                          >
                            <Image
                              src={reviewObj.productImage}
                              className=''
                              alt='img'
                              isStatic={false}
                            />
                          </CustomLink>
                        </div>
                      </div>

                      <div className='sm:w-9/12 w-full px-[15px] lg:px-[30px]'>
                        <div className='sm:flex justify-between'>
                          {/* <div className='min-w-[200px] text-end order-2 mb-[10px]'>
                            <CustomLink
                              href={`${paths.writeReview}?productId=${reviewObj?.productId}&&attributeId=0`}
                            >
                              <button
                                name='EDIT REVIEW'
                                className='btn btn-outline-primary btn-xs uppercase !font-body !rounded-xs !inline-flex gap-[10px] items-center'
                              >
                                <span>
                                  <Image
                                    isStatic
                                    className=''
                                    alt='editIcon'
                                    src='/assets/images/icon-edit.svg'
                                  />
                                </span>
                                <span className='text-small-text'>
                                  EDIT REVIEW
                                </span>
                              </button>
                            </CustomLink>
                          </div> */}

                          <div className='order-1'>
                            <div className='text-normal-text font-sub font-bold pt-[10px] first:pt-0'>
                              {reviewObj.productName}
                            </div>
                            <div className='text-default-text pt-[10px]'>
                              <StarRatings
                                rating={reviewObj.rating}
                                textsize=''
                              />
                            </div>
                            <div className='text-[20px] font-sub font-bold pt-[10px]'>
                              {reviewObj.commentHeading}
                            </div>
                            <div className='text-small-text pt-[10px]'>
                              {reviewObj.comment}
                            </div>
                            {reviewObj.isRecommend && (
                              <div className='text-default-text flex items-center flex-wrap mb-[15px] pt-[10px]'>
                                <span className='material-icons text-[#BBB2C9] mr-[10px]'>
                                  thumb_up
                                </span>
                                <span>I recommend this product</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='border-t border-t-gray-border'></div>
                  </Fragment>
                );
              },
            )
          ) : (
            <h3>No Reviews Available</h3>
          )}
        </div>
      </SideLayout>
    </>
  );
};

export default ProductReview;