'use client';
import CustomCarousel from '@/components/common/Carousel/CustomCarousel';
import GardeningSlideshowsController from '@/features/gardeningSlideshows/controller';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';

const GardeningSlideshows = () => {
  return (
    <GardeningSlideshowsController
      configs={null}
      cases={{
        empty: () => <h2>Empty</h2>,
        loading: () => (
          <div className='loader-wrapper'>
            <div className='loader'></div>
          </div>
        ),
        ready: ({ gardenSlideshow }) => {
          return (
            <>
              <section className='bg-tertiary'>
                <div className='container-fluid md:container mx-auto'>
                  <div className='relative w-full pt-[100px] overflow-hidden'>
                    <div className='text-center absolute inset-0'>
                      <Image
                        isStatic
                        src='assets/images/product-pg-a-z-banner.jpg'
                        alt=''
                        className='block w-full object-cover min-h-[235px]'
                      />
                    </div>
                    <div className='px-[30px] lg:px-[60px] py-[15px] lg:py-[30px] max-w-[1100px] bg-tertiary xl:mx-auto rounded-tl-lg rounded-tr-lg pt-[50px] mx-[20px] relative z-10'>
                      <div className='text-center relative'>
                        <div className='text-2xl-text mb-[15px] font-sub font-bold relative inline-block'>
                          <h1>Gardening Slideshows</h1>
                          <div className='absolute top-[-40px] left-[100%] w-[70px] h-[70px] z-20 lg:block hidden'>
                            <Image
                              src='/annies/1/store/5/images/butterfly-2.png'
                              className='w-[50%] lg:w-auto ml-auto'
                              width={undefined}
                              alt=''
                            />
                          </div>
                        </div>
                      </div>
                      <div className=''>
                        <div className='font-sub text-center text-default-text font-semibold !leading-6'>
                          We’ve selected over 998 of the finest perennial
                          varieties—from bestselling classics to unique showcase
                          varieties—ensuring we have the perfect plant to fit
                          any spot in your garden. All our perennials are grown
                          in our biodegradable, plantable pots and are backed by
                          our guarantee . Need help navigating our selections?
                          Our team of garden experts is standing by to assist.
                          Our A-Z listings can help, too.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className='bg-tertiary'>
                <div className='container mx-auto relative'>
                  <div className='py-[20px]'>
                    <div>
                      <ul className='flex flex-wrap items-center gap-[10px] text-[14px] font-semibold font-sub'>
                        <li>
                          <CustomLink href='index.html' className='text-anchor'>
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
                              ></path>
                            </svg>
                          </CustomLink>
                        </li>
                        <li>/</li>
                        <li>Gardening Slideshows</li>
                      </ul>
                    </div>
                  </div>

                  {/* <div className='text-medium-text mb-[20px] font-bold font-sub'>
                    Totally Useful Plant Lists &amp; Plant Types
                  </div> */}
                  {/* <div className='mb-[40px] border-t border-t-gray-border'></div> */}
                </div>
              </section>
              <section
                className='relative w-full pb-[30px] bg-[#fff3e0] bg-top bg-cover bg-no-repeat overflow-x-hidden 2xl:overflow-x-visible'
                style={{ backgroundColor: '#fff3e0' }}
              >
                <div className='mx-auto container relative'>
                  {gardenSlideshow.map((data: any, index: number) => {
                    return (
                      <>
                        {data?.slideShowDetailsViewModels &&
                          data?.slideShowDetailsViewModels?.length > 0 && (
                            <>
                              <div className='text-medium-text mb-[20px] font-bold font-sub'>
                                {data?.title}
                              </div>
                              {/* <div className='border-t border-t-gray-border pb-[40px]'></div> */}
                              <div
                                key={index}
                                className='border-t border-t-gray-border mb-[40px] pt-[20px]'
                              >
                                <CustomCarousel
                                  target='_blank'
                                  data={data?.slideShowDetailsViewModels}
                                  slidesPerImage={4}
                                  addDotHtmlAndSlash={false}
                                />
                              </div>
                            </>
                          )}
                      </>
                    );
                  })}
                </div>
              </section>
            </>
          );
        },
      }}
    />
  );
};

export default GardeningSlideshows;
