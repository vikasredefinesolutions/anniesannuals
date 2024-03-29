'use client';
import Image from '@/shared/Components/Image';
import React from 'react';
import CustomLink from '@/shared/Components/CustomLink';
import TestimonialsController from '@/features/testimonials/controller';

const Testimonials = () => {
  return (
    <TestimonialsController
      configs={null}
      cases={{
        empty: () => <h2>Empty</h2>,
        loading: () => (
          <div className='loader-wrapper'>
            <div className='loader'></div>
          </div>
        ),
        ready: ({ testimonials }) => {
          return (
            <>
              <section className='bg-tertiary'>
                <div className='container-fluid md:container mx-auto'>
                  <div className='relative w-full pt-[100px] overflow-hidden'>
                    <div className='text-center absolute inset-0'>
                      <Image
                        isStatic
                        src='assets/images/testimonials-banner.jpg'
                        alt=''
                        className='block w-full object-cover min-h-[235px]'
                      />
                    </div>
                    <div className='px-[30px] lg:px-[60px] py-[15px] lg:py-[30px] max-w-[1100px] bg-tertiary xl:mx-auto rounded-tl-lg rounded-tr-lg pt-[50px] mx-[20px] relative z-10'>
                      <div className='text-center relative'>
                        <div className='text-2xl-text mb-[15px] font-sub font-bold relative inline-block'>
                          <h1>What People Are Saying About Us!</h1>
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
                          Our goal is to provide excellent customer service and
                          we'll do our best to ensure your complete
                          satisfaction! We will gladly replace your plants if
                          they arrive damaged or fail to thrive within 30 days.
                          Just be sure to report damaged plants within 48 hours
                          of receipt.
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
                        <li>What People Are Saying About Us!</li>
                      </ul>
                    </div>
                  </div>
                  <div className='w-full pb-[40px]'>
                    <div className='w-full font-sub font-bold text-2xl-text flex items-start justify-center mb-[30px] lg:mb-[60px]'>
                      Our customers are our first priority
                    </div>
                    <div className='grid grid-cols-12 gap-[30px] mt-[20px]'>
                      {testimonials?.map((testimonial: any) => {
                        return (
                          <>
                            <div className='col-span-12 sm:col-span-6 lg:col-span-4 relative overflow-hidden rounded-tl-lg rounded-br-lg group bg-[#ffffff] p-[30px]'>
                              <div className='absolute inset-0 top-[20px] left-[20px] z-0'>
                                <img src='images/coat.png' alt='' />
                              </div>
                              <div className='relative z-10 mt-[30px]'>
                                {
                                  <p
                                    className='text-normal-text mb-[10px]'
                                    dangerouslySetInnerHTML={{
                                      __html: testimonial?.comment,
                                    }}
                                  ></p>
                                }
                                <p className='text-normal-text font-bold mb-[10px]'>
                                  {testimonial?.authorName?.split('.')[0]}
                                  {'.'}
                                </p>
                                <p className='text-normal-text'>
                                  {testimonial?.authorName?.split('.')[1]}
                                </p>
                              </div>
                            </div>
                          </>
                        );
                      })}
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

export default Testimonials;
