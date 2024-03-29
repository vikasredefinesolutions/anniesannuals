import React from 'react';

const HomeSkeleton: React.FC = () => {
  return (
    <React.Fragment>
      <section className='overflow-hidden'>
        <div className='home-main-slider main-banner-skeleton'></div>
      </section>
      {/* <section className='relative pt-[30px] pb-[30px] section1-skeleton'>
        <div className='container mx-auto'>
          <div className='max-w-full md:max-w-7xl mx-auto overflow-hidden rounded-tl-xl rounded-br-xl md:flex h-full relative justify-center items-end plant-skeleton'>
            <div className='w-full lg:w-1/2 py-[30px] px-[60px] h-full text-left lg:group'></div>
            <div className='w-full lg:w-1/2 py-[30px] px-[60px] h-[207px] text-left overflow-hidden lg:group plant-skeleton'></div>
          </div>
        </div>
      </section>
      <section className='relative pt-[30px] pb-[30px] bg-tertiary overflow-hidden overflow-x-hidden 2xl:overflow-x-visible garden-bg'>
        <div className='container mx-auto relative'>
          <div className='flex flex-wrap justify-between items-center pb-[15px]'>
            <div className='font-sub font-bold text-2xl-text pb-[15px] garden-title-skeleton'></div>
            <div className='pb-[15px] garden-link-skeleton'></div>
          </div>
          <div className='flex mx-[-15px]'>
            <div className='garden-pro-skeleton mx-[15px]'></div>
            <div className='garden-pro-skeleton mx-[15px]'></div>
            <div className='garden-pro-skeleton mx-[15px]'></div>
          </div>
        </div>
      </section>
      <section className='relative pt-[30px] pb-[30px]'>
        <div className='container mx-auto relative'>
          <div className='flex flex-wrap justify-between items-center pb-[15px]'>
            <div className='font-sub font-bold text-2xl-text pb-[15px] garden-title-skeleton'></div>
            <div className='pb-[15px] garden-link-skeleton'></div>
          </div>
          <div className='mx-[-15px] grid grid-cols-4'>
            <div className='cat-pro-skeleton mx-[15px]'></div>
            <div className='cat-pro-skeleton mx-[15px]'></div>
            <div className='cat-pro-skeleton mx-[15px]'></div>
            <div className='cat-pro-skeleton mx-[15px]'></div>
          </div>
        </div>
      </section> */}
      <section className='pt-[30px] education-skeleton'></section>
    </React.Fragment>
  );
};

export default HomeSkeleton;
