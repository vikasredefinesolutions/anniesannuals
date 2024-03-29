'use client';
import GiftCardListingController from '@/features/gift-card-listing/controller';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import { paths } from '@/utils/paths.constant';

const GiftCardsListing = () => {
  return (
    <GiftCardListingController
      cases={{
        view: ({ giftCardListingData }) => {
          return (
            <>
              <section className='bg-[#EDFFFA]'>
                <div className='container-fluid md:container mx-auto'>
                  <div className='relative w-full'>
                    <div className='text-center'>
                      <Image
                        src='/assets/images/product-listing-banner.png'
                        className='block w-full object-cover min-h-[235px]'
                        alt='Banner Image'
                        isStatic
                      />
                    </div>
                    <div className='px-[30px] lg:px-[60px] py-[15px] lg:py-[30px] max-w-[1100px] bg-[#EDFFFA] xl:mx-auto rounded-tl-lg rounded-tr-lg absolute inset-0 mt-[50px] mx-[20px]'>
                      <div className='text-center'>
                        <div className='text-2xl-text mb-[15px] font-sub font-bold relative inline-block'>
                          <span>Gift Cards</span>
                          <div className='absolute top-[-60px] right-[-80px] lg:block hidden'>
                            <Image
                              isStatic
                              src='/assets/images/butterfly-2.png'
                              alt='butterfly'
                              className='w-[50%] lg:w-auto ml-auto'
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className='font-sub text-center text-default-text font-semibold max-h-[100px] sm:max-h-[100px] md:max-h-[140px] max-h-auto overflow-hidden !leading-6'>
                          {/* Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Aenean pretium ante quam, ac auctor erat
                          tristique eu. */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section
                style={{
                  backgroundImage:
                    'url("assets/images/results-section-top-floral.png")',
                }}
                className={`bg-tertiary bg-top bg-contain bg-no-repeat overflow-x-hidden 2xl:overflow-x-visible`}
              >
                <div
                  style={{
                    backgroundImage:
                      'url("assets/images/results-section-bottom-floral.png")',
                  }}
                  className='bg-bottom bg-contain bg-no-repeat'
                >
                  <div className='container mx-auto relative'>
                    <div className='pt-[20px]'>
                      <ul className='flex flex-wrap items-center gap-[10px] text-[14px] font-semibold font-sub'>
                        <li className=''>
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
                        <li className=''>/</li>
                        <li className=''>Gift Cards</li>
                      </ul>
                    </div>
                    <div className='absolute left-[-12%] top-[13%] hidden 2xl:inline-block'>
                      <Image
                        src='/assets/images/butterfly-1.png'
                        alt='butterfly'
                        isStatic
                      />
                    </div>
                    <div className='flex flex-wrap mx-[-15px]'>
                      <div className='w-full px-[15px] py-[20px]'>
                        <div className='flex flex-wrap mx-[-8px] lg:mx-[-15px]'>
                          {giftCardListingData.map((data) => (
                            <div
                              key={data.productId}
                              className='w-6/12 md:w-6/12 lg:w-3/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px]'
                            >
                              <div className='relative overflow-hidden rounded-tl-lg rounded-br-lg group'>
                                <CustomLink
                                  href={`gift-card-listing/${data.seName}`}
                                >
                                  <Image alt='image' src={`${data.image}`} />
                                </CustomLink>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          );
        },
      }}
    />
  );
};

export default GiftCardsListing;
