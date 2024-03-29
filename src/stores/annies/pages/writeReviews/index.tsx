'use client';
import React from 'react';
import ProductWriteReviewController from '@/features/product/productWriteReview/controller';
import Input from '@/components/common/input';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import { IReviewProduct } from '@/shared/types/product';
import Loader from '@/shared/Components/Loader';
import { useAppSelector } from '@/app/redux/hooks';

interface _Props {
  product: IReviewProduct | null;
  productId: number;
}

const WriteReviews: React.FC<_Props> = (_Props) => {
  const { product, productId } = _Props;
  const imgUrl = product?.imageUrl as string;
  const { isLoading } = useAppSelector((state) => state.common);
  return (
    <ProductWriteReviewController
      configs={null}
      productId={productId}
      reviewId={Number(product?.reviewId)}
      cases={{
        empty: () => <h2>Empty</h2>,
        loading: () => <h2>Loading...</h2>,
        ready: ({
          checkRating,
          handleUploadImage,
          handleReviewImage,
          uploadInput,
          reviewedImage,
          handleChangeImage,
          files,
          userFirstName,
          userLastName,
          handleRating,
          showRatingValidation,
          onSubmit,
          hookForm: { register, errors, handleSubmit },
          handleClear,
          rating,
          hover,
          setHover,
          totalStars,
          reviewStatus,
        }) => {
          return (
            <>
              {isLoading && <Loader />}
              <div className='w-full bg-[#FFF3E0]'>
                <div className='container mx-auto'>
                  <div className='flex flex-wrap mt-[-12px] relative mx-[-15px]'>
                    <div className='w-full mt-[12px]'>
                      <div className='items-center w-full pl-[15px] pr-[15px] pt-[16px] pb-[16px] mb-[20px]'>
                        <h1 className='w-full text-center font-sub font-bold text-2xl-text flex items-center justify-center mt-[30px]'>
                          {!!Number(product?.reviewId)
                            ? 'Edit a Review'
                            : 'Write a Review'}
                        </h1>
                      </div>
                      <ul className='overflow-hidden' role='list'>
                        <li className='flex flex-wrap px-[15px] py-[36px] border-t border-t-gray-border'>
                          <div className='w-full lg:w-2/6 pl-[15px] pr-[15px] mb-[30px]'>
                            <div className='w-full'>
                              <div className='w-3/4 cursor-pointer'>
                                <CustomLink href={`/${product?.seName}.html`}>
                                  <Image
                                    className='rounded-tl-sm w-[194px] rounded-br-sm rounded-tr-sm rounded-bl-sm overflow-hidden'
                                    src={imgUrl}
                                    alt={'img'}
                                  />
                                </CustomLink>
                              </div>
                            </div>
                          </div>
                          <div className='w-full lg:w-4/6 pl-[15px] pr-[15px] lg:justify-between'>
                            <div className='w-full flex flex-wrap mt-[5px]'>
                              <div className='lg:w-2/3 w-full'>
                                <div className=''>
                                  <CustomLink
                                    className='text-large-text font-bold font-sub mb-[30px]'
                                    href={`/${product?.seName}.html`}
                                  >
                                    {product?.productName}
                                  </CustomLink>
                                </div>
                              </div>
                              <div className='lg:w-1/3 w-full'>
                                <div className='font-[600] text-normal-text md:text-right text-left md:my-0 my-4'>
                                  <div className='flex gap-1 items-center md:justify-end justify-start mb-[5px]'>
                                    {[...Array(totalStars)].map(
                                      (star, index) => {
                                        const currentRating = index + 1;
                                        return (
                                          <label key={index}>
                                            <input
                                              type='radio'
                                              name='rating'
                                              value={currentRating}
                                              onChange={(e) => handleRating(e)}
                                              className='hidden'
                                            />
                                            <span
                                              className='text-xl'
                                              style={{
                                                color:
                                                  currentRating <=
                                                  (hover || rating)
                                                    ? '#ffc107'
                                                    : '#e4e5e9',
                                              }}
                                              onMouseEnter={() =>
                                                setHover(currentRating)
                                              }
                                              onMouseLeave={() => setHover(0)}
                                            >
                                              &#9733;
                                            </span>
                                          </label>
                                        );
                                      },
                                    )}
                                    <span className='text-rose-600'>*</span>
                                  </div>
                                  <div className='w-full text-extra-small-text'>
                                    {reviewStatus[rating - 1]}
                                  </div>
                                  {showRatingValidation && (
                                    <div className='h-6 top-full left-0 text-red-500 text-[16px] font-medium'>
                                      Rating is required
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className='w-full flex flex-wrap mt-[5px]'>
                              <div className='flex justify-between'>
                                <div className='text-small-text'>
                                  <span className='font-semibold'>
                                    POST PUBLICLY AS:
                                  </span>
                                  <span className='capitalize'>
                                    {userFirstName} {userLastName}
                                  </span>
                                  <span> | </span>
                                  <button
                                    onClick={handleClear}
                                    className='!text-anchor hover:!text-anchor-hover text-default-text hover:underline'
                                  >
                                    CLEAR
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='w-full flex flex-wrap md:mt-[5px] mt-8 pl-[15px] pr-[15px]'>
                            <form
                              className='w-full'
                              onSubmit={handleSubmit(onSubmit)}
                            >
                              <div className='w-full flex justify-between mb-8'>
                                <div className='w-full'>
                                  <label className='block text-small-text mb-[5px] ml-[15px] font-bold uppercase'>
                                    HEADLINE FOR YOUR REVIEW
                                    <span className='text-rose-600'>*</span>
                                  </label>
                                  <div className='mt-2'>
                                    <input
                                      name='commentHeading'
                                      className='form-input'
                                      placeholder='Headline For Your Review'
                                      {...register('commentHeading')}
                                      type='text'
                                      autoComplete='off'
                                    />
                                    {errors?.commentHeading && (
                                      <div className='h-6 top-full left-0 text-red-500 text-[16px] font-medium'>
                                        {errors?.commentHeading.message}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className='w-full flex justify-between mb-8'>
                                <div className='w-full'>
                                  <label className='block text-small-text mb-[5px] ml-[15px] font-bold uppercase'>
                                    Description For your review
                                    <span className='text-rose-600'>*</span>
                                  </label>
                                  <div className='mt-2'>
                                    <textarea
                                      rows={4}
                                      placeholder='Enter Description For your review'
                                      className='form-input !h-[150px]'
                                      name='description'
                                      {...register('description')}
                                    ></textarea>
                                    {errors?.description && (
                                      <div className='h-6 top-full left-0 text-red-500 text-[16px] font-medium'>
                                        {errors?.description.message}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div
                                className={`${
                                  uploadInput ? 'mb-8' : 'mb-[43px]'
                                } w-full flex justify-between `}
                              >
                                <div className='w-full p-[6px]'>
                                  {uploadInput ? (
                                    <>
                                      <label htmlFor='file_upload'>
                                        <span className='block text-small-text mb-[5px] ml-[15px] font-bold uppercase'>
                                          Select files to upload
                                        </span>
                                        <div className='w-full items-center block text-base font-medium text-gray-700 form-input text-sub-text border border-gray-400 border-dashed cursor-pointer !rounded-[15px] !h-[150px] mt-2'>
                                          <div className='w-full text-center justify-center inset-0'>
                                            <div className='text-sm lg:text-lg text-black'>
                                              <p className='pt-[10px] lg:pt-[20px] text-center'>
                                                <svg
                                                  className='w-6 h-6 text-current-50 mx-auto'
                                                  xmlns='http://www.w3.org/2000/svg'
                                                  fill='none'
                                                  viewBox='0 0 24 24'
                                                  stroke='currentColor'
                                                >
                                                  <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth='2'
                                                    d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                                                  ></path>
                                                </svg>
                                              </p>
                                              <p>
                                                Drag your files here or click in
                                                this area.
                                              </p>
                                              <p></p>
                                            </div>
                                          </div>
                                        </div>
                                      </label>
                                      <div className='mt-2'>
                                        <input
                                          type='file'
                                          name='images'
                                          placeholder='Select files to upload'
                                          className='hidden !h-[150px] !rounded-[15px]'
                                          id='file_upload'
                                          multiple={true}
                                          accept='image/*, video/*'
                                          onChange={(e) => handleChangeImage(e)}
                                        />
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <span className='block text-small-text mb-[5px] ml-[15px] font-bold uppercase'>
                                        {files.length > 1 ||
                                        (reviewedImage &&
                                          reviewedImage?.length > 1)
                                          ? 'Files uploaded'
                                          : 'File uploaded'}
                                      </span>
                                      <div
                                        className='!flex gap-x-2 items-center px-4 overflow-x-auto  border bg-white border-gray-400 border-dashed cursor-pointer !rounded-[15px] !h-[150px]'
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        {files.length ? (
                                          <>
                                            {files.map((file, index) => (
                                              <div
                                                className='h-20 w-20 relative'
                                                key={`file_${index}`}
                                              >
                                                {file.file.name.endsWith(
                                                  '.mp4',
                                                ) ? (
                                                  <video
                                                    controls
                                                    className='object-center object-cover max-w-2xl max-h-[100px]'
                                                  >
                                                    <source
                                                      src={file.preview}
                                                      type='video/mp4'
                                                    />
                                                  </video>
                                                ) : (
                                                  <Image
                                                    isStatic={true}
                                                    src={file.preview}
                                                    alt='uploaded'
                                                    className='object-center object-cover max-w-2xl max-h-[100px]'
                                                  />
                                                )}
                                                <button
                                                  type='button'
                                                  onClick={() =>
                                                    handleUploadImage(index)
                                                  }
                                                  className='text-red-500 h-[16px] w-[16px] inline-block absolute top-[10px] right-2.5'
                                                >
                                                  <span className='material-icons-outlined !bg-tertiary text-[19px]'>
                                                    delete
                                                  </span>
                                                </button>
                                              </div>
                                            ))}
                                          </>
                                        ) : (
                                          <>
                                            {reviewedImage &&
                                              reviewedImage.map(
                                                (file, index) => (
                                                  <div
                                                    className='h-20 w-20 relative'
                                                    key={`file_${index}`}
                                                  >
                                                    {file?.imageName.endsWith(
                                                      '.mp4',
                                                    ) ? (
                                                      <video
                                                        controls
                                                        className='object-center object-cover max-w-2xl max-h-[100px]'
                                                      >
                                                        <source
                                                          src={file?.imageName}
                                                          type='video/mp4'
                                                        />
                                                      </video>
                                                    ) : (
                                                      <Image
                                                        src={file?.imageName}
                                                        alt='uploaded'
                                                        className='object-center object-cover max-w-2xl max-h-[100px]'
                                                      />
                                                    )}
                                                    <button
                                                      type='button'
                                                      onClick={() =>
                                                        handleReviewImage(index)
                                                      }
                                                      className='text-red-500 h-[16px] w-[16px] inline-block absolute top-[10px] right-2.5'
                                                    >
                                                      <span className='material-icons-outlined !bg-tertiary text-[19px]'>
                                                        delete
                                                      </span>
                                                    </button>
                                                  </div>
                                                ),
                                              )}
                                          </>
                                        )}
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className='w-full flex justify-center'>
                                <button
                                  type='submit'
                                  className='btn btn-primary btn-md'
                                  onClick={checkRating}
                                >
                                  Submit
                                </button>
                              </div>
                            </form>
                          </div>
                        </li>
                      </ul>
                    </div>
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

export default WriteReviews;
