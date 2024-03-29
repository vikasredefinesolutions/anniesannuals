import React from 'react';

const DetailsSkeleton: React.FC = () => {
  return (
    <React.Fragment>
      <section className='bg-tertiary'>
        <div className='container mx-auto'>
          <div className='py-[20px]'>
            <div className=''>
              <ul className='flex flex-wrap items-center gap-[10px] text-[14px] font-semibold font-sub'>
                <li className='breadcrumbs-skeleton'></li>
                <li className=''>/</li>
                <li className='breadcrumbs-skeleton'></li>
                <li className=''>/</li>
                <li className='breadcrumbs-skeleton'></li>
              </ul>
            </div>
          </div>
          <div className='pt-[10px] pb-[30px]'>
            <div className='grid grid-cols-12 gap-y-[20px]'>
              <div className='col-span-12 lg:col-span-6'>
                <div className='grid grid-cols-12 gap-[10px] sticky top-[10px]'>
                  <div className='col-span-12 md:col-span-2 order-2 md:order-1 sub-img-slider'>
                    <div className='md:mb-[10px] last:mb-0'>
                      <div className='more-img-skeleton'></div>
                    </div>
                    <div className='md:mb-[10px] last:mb-0'>
                      <div className='more-img-skeleton'></div>
                    </div>
                    <div className='md:mb-[10px] last:mb-0'>
                      <div className='more-img-skeleton'></div>
                    </div>
                  </div>
                  <div className='col-span-12 md:col-span-10 order-1 md:order-2 main-image-outer img-skeleton'></div>
                </div>
              </div>
              <div className='col-span-12 lg:col-span-6'>
                <div className='pl-0 lg:pl-[70px]'>
                  <div className='title-skeleton'></div>
                  <div className='sub-title-skeleton'></div>
                  <div className='sub-title-skeleton mb-[30px] w-full'></div>
                  <div className='zon-box-skeleton rounded-[5px] items-center flex justify-start p-[20px] mb-[20px]'></div>
                  <div className='w-full pb-[20px]'>
                    <div className='sub-title-skeleton'></div>
                    <div className='w-full flex space-x-6'>
                      <div className='w-1/2 qty-box-skeleton rounded-[5px]'></div>
                      <div className='w-1/2 qty-box-skeleton rounded-[5px] p-[20px] flex items-center justify-center'></div>
                    </div>
                  </div>
                  <div className='price-skeleton mb-[10px]'></div>
                  <div className='button-skeleton pb-[20px] gap-[10px]'></div>
                  <div className='w-full pb-[20px] pt-[20px]'>
                    <div className='sub-title-skeleton'></div>
                    <div className='w-full'>
                      <div className='shipping-skeleton'></div>
                    </div>
                  </div>
                  <div className='description-skeleton mb-[20px] mt-[20px]'></div>
                  <div className='description-skeleton mb-[20px] mt-[20px]'></div>
                  <div className='description-skeleton mb-[20px] mt-[20px]'></div>
                  <div className='description-skeleton mb-[20px] mt-[20px]'></div>
                  <div className='description-skeleton mb-[20px] mt-[20px]'></div>
                  <div className='description-skeleton mb-[20px] mt-[20px]'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='relative pt-[30px] pb-[30px] features-skeleton'>
        <div className='container mx-auto relative'>
          <div className='flex flex-wrap justify-between items-center pb-[15px]'>
            <div className='font-sub font-bold text-2xl-text pb-[15px] garden-title-skeleton'></div>
            <div className='pb-[15px] garden-link-skeleton'></div>
          </div>
          <div className='flex mx-[-15px]'>
            <div className='features-pro-skeleton mx-[15px]'></div>
            <div className='features-pro-skeleton mx-[15px]'></div>
            <div className='features-pro-skeleton mx-[15px]'></div>
            <div className='features-pro-skeleton mx-[15px]'></div>
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
      </section>
    </React.Fragment>
  );
};

export default DetailsSkeleton;
