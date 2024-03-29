import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import { paths } from '@/utils/paths.constant';
import React from 'react';

const ThankYou = () => {
  return (
    <section className=''>
      <div className='relative'>
        <div className='overflow-hidden w-full h-full lg:h-[626px] sm:h-[400px]'>
          <Image
            className='max-w-none w-full h-full mx-auto'
            src='/assets/images/thank-you-banner.png'
            alt=''
            isStatic={true}
          />
        </div>
        <div className='sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2'>
          <div className='p-[10px] bg-[#F6EDFF] sm:bg-opacity-90 relative overflow-hidden sm:rounded-tl-lg sm:rounded-br-lg lg:min-w-[950px] md:min-w-[700px] sm:min-w-[600px] min-w-full'>
            <div className='pt-[20px] sm:pt-[40px] text-center'>
              <h1 className='font-sub font-bold lg:text-[60px] md:text-[32px] text-[24px] text-anchor sm:pb-[40px] pb-[20px] max-w-[700px] mx-auto'>
                Thank you!
              </h1>
              <div className='text-normal-text max-w-[550px] mx-auto sm:pb-[40px] pb-[20px]'>
                We really appreciate you giving us a moment of your time today.
                We will get back to you shortly
              </div>
              <div className='sm:flex flex-wrap items-center justify-between max-w-[700px] sm:pb-[40px] pb-[20px] mx-auto'>
                <div className='mb-[10px] sm:mb-0 w-full sm:w-auto'>
                  <CustomLink
                    href={paths.home}
                    className='text-normal-text uppercase font-bold underline hover:text-anchor-hover'
                  >
                    Go to the home page
                  </CustomLink>
                </div>
                <div className='mb-[10px] sm:mb-0 w-full sm:w-auto'>
                  <CustomLink
                    href={paths.plantFinder}
                    className='text-normal-text uppercase font-bold underline hover:text-anchor-hover'
                  >
                    check out our plants
                  </CustomLink>
                </div>
                <div className='mb-[10px] sm:mb-0 w-full sm:w-auto'>
                  <CustomLink
                    href={paths.shopTheGarden}
                    className='text-normal-text uppercase font-bold underline hover:text-anchor-hover'
                  >
                    shop the garden
                  </CustomLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThankYou;
