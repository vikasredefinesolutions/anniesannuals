import {
  DynamicSubMenuContent,
  tHeaderSubMenu,
} from '@/api/jsonServices/updateHeaderSubmenu';
import { getStaticHeaderSubMenu } from '@/helper/staticfile.helper';
import { SubCategoryList } from '@/types/header';
import React from 'react';
import { LoadingCard } from './components/LoadingCards';

const animationStyle = {
  backgroundColor: '#f5f5f6',
  background: 'linear-gradient(90deg, #fff9ef 25%, #FFF3E0 50%, #fff9ef 75%)',
  animation: 'shimmer 1.5s infinite',
  backgroundSize: '200% 100%',
};

const AnimationTag = (
  <style>
    {`@keyframes shimmer{
  0%{
  background-position:200% 0;
  }
  100%{
  background-position:-200% 0;
  }
  }`}
  </style>
);

interface iProps {
  seName: string;
}

const ProductListingSkeleton: React.FC<iProps> = async ({ seName }) => {
  const headerSubMenu = await getStaticHeaderSubMenu();

  let items: DynamicSubMenuContent['items'] = [];
  if (seName in headerSubMenu) {
    const subMenu = headerSubMenu[
      seName as unknown as keyof SubCategoryList
    ] as unknown as tHeaderSubMenu;
    items =
      subMenu?.type === 'dynamic'
        ? (subMenu.items as DynamicSubMenuContent['items'])
        : [];
  }

  return (
    <>
      <section className='bg-tertiary'>
        <div className='container-fluid md:container mx-auto'>
          <div className='relative w-full pt-[50px] overflow-hidden min-h-[310px]'>
            <div className='text-center absolute inset-0'>
              <div
                className='block w-full object-cover min-h-[310px]'
                style={animationStyle}
              >
                {AnimationTag}
              </div>
            </div>
          </div>
        </div>
        <div className='container mx-auto bg-[FF0000] px-0'>
          <div className='flex flex-wrap justify-center cat-main-slider pt-[30px]'>
            {items.map((item, index) => {
              if (item.isPopular) return null;
              return (
                <div
                  key={index}
                  className='lg:w-2/12 md:w-3/12 sm:w-4/12 w-6/12 px-[15px] pb-[10px] box-color-main'
                >
                  <div className='relative overflow-hidden rounded-tl-lg rounded-br-lg group'>
                    <div
                      className='w-[236px] h-[272px] block'
                      style={animationStyle}
                    >
                      {AnimationTag}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className='section bg-tertiary'>
        <div className='container mx-auto'>
          <div className='flex flex-wrap items-center gap-x-[5px] text-default-text pt-[15px] lg:pt-[30px] pb-[15px] lg:pb-[30px]'>
            <button className='inline-flex items-center breadcrumbs-skeleton'></button>
            <span className='inline-block'> / </span>
            <button className='inline-flex items-center breadcrumbs-skeleton'></button>
          </div>
        </div>
      </section>
      <section className='bg-tertiary bg-top bg-contain bg-no-repeat overflow-x-hidden 2xl:overflow-x-visible'>
        <div className='container mx-auto relative'>
          <div className='md:flex flex-wrap justify-between items-center w-full pt-[20px] pb-[30px] hidden'>
            <div
              className='font-sub font-bold text-2xl-text py-2 sm:py-0'
              style={{
                //   backgroundColor: '#323232',
                //   color: '#323232',
                height: '2.5rem',
                width: '15rem',
                borderRadius: '.8rem',
                margin: '0.5rem 0',
                background:
                  'linear-gradient(90deg, #fff9ef 25%, #FFF3E0 50%, #fff9ef 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
              }}
            >
              {AnimationTag}
            </div>
            <div className='py-2 sm:py-0'>
              <div className='relative inline-block text-left z-10'>
                <div className='flex items-center'>
                  <button
                    type='button'
                    className='group inline-flex items-center justify-between text-default-text bg-tertiary w-[250px] px-2 py-3 leading-none border border-primary rounded-xs'
                    id='menu-button'
                    aria-expanded='false'
                    aria-haspopup='true'
                  >
                    <span>Sort by:</span>
                    <span>Most Popular</span>
                    <span className='material-icons-outlined text-lg leading-none'>
                      expand_more
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-wrap mx-[-15px]'>
            <div className='md:w-4/12 xl:w-3/12 w-full px-[15px] md:block hidden'>
              <div className='w-full'>
                <div className='pb-[30px] text-normal-text font-sub font-bold'>
                  Filter by:
                </div>
                <div
                  className='w-full px-[15px] md:px-0'
                  style={animationStyle}
                >
                  <div
                    className='border border-transparent border-b border-b-gray-border mb-[20px] p-[15px] bg-[#f5f5f6] !border-[#D4D4D4] rounded-tl-sm rounded-br-sm'
                    style={{ minHeight: '800px' }}
                  >
                    {AnimationTag}
                  </div>
                </div>
              </div>
            </div>
            <div className='md:w-8/12 xl:w-9/12 w-full px-[15px]'>
              <div className='md:flex flex-wrap items-center gap-[5px] pb-[20px]'>
                <div
                  className='flex flex-wrap items-center gap-[5px] bg-[#FCEEFF] rounded-sm px-[10px] py-[5px] text-[#634B91] border border-[#694D84]'
                  style={animationStyle}
                >
                  <button className='text-[12px] w-8 h-5'></button>
                  <span className='material-icons-outlined text-[12px] leading-none'>
                    close
                  </span>
                </div>
                <div
                  className='flex flex-wrap items-center gap-[5px] bg-[#FCEEFF] rounded-sm px-[10px] py-[5px] text-[#634B91] border border-[#694D84]'
                  style={animationStyle}
                >
                  <button className='text-[12px] w-8 h-5'></button>
                  <span className='material-icons-outlined text-[12px] leading-none'>
                    close
                  </span>
                </div>
                <button
                  className='text-[12px] text-[#634B91] uppercase'
                  style={{ textDecoration: 'underline', cursor: 'pointer' }}
                >
                  Clear All
                </button>
              </div>
              <div className='flex flex-wrap mx-[-8px] lg:mx-[-15px] theme-color'>
                {['', '', '', '', '', '', '', '', ''].map((_, index) => (
                  <LoadingCard key={index} isSubcategory={false} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductListingSkeleton;
