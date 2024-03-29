import Link from 'next/link';
import React from 'react';
import CustomLink from './CustomLink';
import { paths } from '@/utils/paths.constant';
import Image from './Image';

export interface _Props {
  type: 'Not Published' | 'Not Found' | 'Something went wrong';
}

const PageNotFound: React.FC<_Props> = ({ type }) => {
  return (
    <section className=''>
      <div className='relative'>
        <div className='overflow-hidden w-full lg:h-[626px] sm:h-[400px] h-auto'>
          <Image
            isStatic
            className='max-w-none w-full h-full mx-auto'
            src='/assets/images/404-error-banner.png'
            alt=''
          />
        </div>
        <div className='sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2'>
          <div className='p-[10px] bg-[#F6EDFF] sm:bg-opacity-90 relative overflow-hidden sm:rounded-tl-lg sm:rounded-br-lg lg:min-w-[950px] md:min-w-[700px] sm:min-w-[600px] min-w-full'>
            <div className='pt-[20px] sm:pt-[40px] text-center'>
              <div className='font-sub font-bold lg:text-[60px] md:text-[32px] text-[24px] text-anchor sm:pb-[40px] pb-[20px] max-w-[700px] mx-auto'>
                Page {type}
              </div>
              {type !== 'Something went wrong' && (
                <div className='text-normal-text max-w-[550px] mx-auto sm:pb-[40px] pb-[20px]'>
                  We are sorry, we can't seem to find the page you are looking
                  for. Try double checking the spelling or check out the below
                  links.
                </div>
              )}
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
                    href='plant-finder.html'
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

export default PageNotFound;
