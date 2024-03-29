'use client';
import GiftCardDetailsController from '@/features/gift-card-details/controller';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import { paths } from '@/utils/paths.constant';
import Link from 'next/link';
import ProductDesc from '../productDetails/Component/ProductDescription';
import AddDiftCardDetails from './component/addGiftCard';

const GiftCardDetails = () => {
  return (
    <>
      <GiftCardDetailsController
        config={{
          requiredValidationSchema: {
            isFirstNameRequired: true,
            isLastNameRequired: true,
            isEmailRequired: true,
          },
        }}
        cases={{
          view: ({
            errorMessage,
            hookForm: { errors, handleSubmit, register },
            onSubmit,
            GiftCardData,
          }) => {
            return (
              <section className='bg-tertiary'>
                <div className='container mx-auto'>
                  <div className='py-[20px]'>
                    <div>
                      <ul className='flex flex-wrap items-center gap-[10px] text-[14px] font-semibold font-sub'>
                        <li>
                          <CustomLink href={paths.home} className='text-anchor'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='21.621'
                              height='19.897'
                              viewBox='0 0 21.621 19.897'
                            >
                              <path
                                id='Path_48756'
                                data-name='Path 48756'
                                d='M2.25,12,11.2,3.045a1.126,1.126,0,0,1,1.591,0L21.75,12M4.5,9.75V19.875A1.125,1.125,0,0,0,5.625,21H9.75V16.125A1.125,1.125,0,0,1,10.875,15h2.25a1.125,1.125,0,0,1,1.125,1.125V21h4.125A1.125,1.125,0,0,0,19.5,19.875V9.75M8.25,21H16.5'
                                transform='translate(-1.189 -1.853)'
                                fill='none'
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                              />
                            </svg>
                          </CustomLink>
                        </li>
                        <li>/</li>
                        <li>
                          <Link title='' href={'/gift-card-listing'}>
                            Gift Cards
                          </Link>
                        </li>
                        <li>/</li>
                        <li>Gift Cards Details</li>
                      </ul>
                    </div>
                  </div>
                  <div className='pt-[10px] pb-[30px]'>
                    <div className='grid grid-cols-12 gap-y-[20px]'>
                      <div className='col-span-12 md:col-span-4 lg:col-span-6 '>
                        <div className='col-span-12 md:col-span-10 order-1 md:order-2 main-image-outer slick-initialized slick-slider'>
                          <div className='slick-list draggable'>
                            <div
                              className='slick-track'
                              style={{
                                opacity: '1',
                                maxWidth: '745px',
                                transform: 'translate3d(0px, 0px, 0px)',
                              }}
                            >
                              <div
                                className='main-image rounded-tl-2xl rounded-br-2xl overflow-hidden px-[2px] slick-slide slick-current slick-active'
                                style={{ width: '100%' }}
                              >
                                {!!GiftCardData && (
                                  <Image
                                    className='w-full'
                                    src={`${GiftCardData?.imageName}`}
                                    alt='GiftCard'
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='col-span-12 md:col-span-8 lg:col-span-6'>
                        <div className='pl-0 lg:pl-[70px]'>
                          <div className='text-2xl-text font-bold font-sub mb-[30px]'>
                            {GiftCardData?.name}
                          </div>
                          <AddDiftCardDetails
                            errorMessage={errorMessage}
                            handleSubmit={handleSubmit}
                            register={register}
                            onSubmit={onSubmit}
                            errors={errors}
                            GiftCardData={GiftCardData}
                          />
                          {GiftCardData?.description && (
                            <ProductDesc product={GiftCardData as any} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          },
        }}
      ></GiftCardDetailsController>
    </>
  );
};

export default GiftCardDetails;
