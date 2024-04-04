import {
  DynamicSubMenuContent,
  tHeaderSubMenu,
} from '@/api/jsonServices/updateHeaderSubmenu';
import CustomLink from '@/shared/Components/CustomLink';
import { MEDIA_BASE_URL_CDN } from '@/shared/utils/helper';
import { SubCategoryList } from '@/types/header';
import Image from 'next/image';
import React from 'react';

interface iProps {
  headerSubMenu: SubCategoryList;
  seName: keyof SubCategoryList;
  bannerData: any;
  staticImage?: boolean;
}

const Banner: React.FC<iProps> = ({
  headerSubMenu,
  seName,
  bannerData,
  staticImage = false,
}) => {
  let items: DynamicSubMenuContent['items'] = [];
  if (seName in headerSubMenu) {
    const subMenu = headerSubMenu[
      seName as iProps['seName']
    ] as unknown as tHeaderSubMenu;
    items =
      subMenu?.type === 'dynamic'
        ? (subMenu.items as DynamicSubMenuContent['items'])
        : [];
  }
  return (
    <section className='bg-tertiary'>
      <div className='container-fluid md:container mx-auto'>
        <div className='relative w-full pt-[100px] overflow-hidden'>
          <div className='text-center absolute inset-0'>
            <Image
              src={MEDIA_BASE_URL_CDN + bannerData?.banner}
              height={310}
              width={1570}
              alt=''
              className='block w-full object-cover min-h-[235px]'
              priority
              quality={70}
            />
          </div>
          <div
            className={`px-[30px] lg:px-[60px] py-[15px] lg:py-[30px] max-w-[1100px] bg-tertiary xl:mx-auto rounded-tl-lg rounded-tr-lg pt-[50px] mx-[20px] relative z-10 ${
              !bannerData.description && 'mt-[96px]'
            }`}
          >
            <div className='text-center relative'>
              <div className='text-2xl-text mb-[15px] font-sub font-bold relative inline-block'>
                <h1>{bannerData.name}</h1>
                <div className='absolute top-[-60px] right-[-80px] lg:block hidden'>
                  <Image
                    src='/assets/images/butterfly-2.png'
                    className='w-[50%] lg:w-auto ml-auto'
                    alt=''
                    height={101}
                    width={82}
                  />
                </div>
              </div>
            </div>
            <div className=''>
              <div
                dangerouslySetInnerHTML={{
                  __html: bannerData.description,
                }}
              />
              {/* <div className='text-[#9F2D3C] uppercase text-[16px] font-semibold text-center underline block md:hidden'>
                More
              </div> */}
            </div>
          </div>
        </div>
      </div>
      {items?.length > 0 && (
        <div className='container mx-auto bg-[FF0000]'>
          <div className='flex flex-wrap justify-center mx-[-15px] cat-main-slider pt-[30px]'>
            {items?.map((item, index) => {
              if (item.isPopular) return null;

              return (
                <div
                  key={index}
                  className='lg:w-2/12 md:w-3/12 sm:w-4/12 w-6/12 px-[15px] pb-[10px] box-color-main'
                >
                  <div className='relative overflow-hidden rounded-tl-lg rounded-br-lg group'>
                    <div className=''>
                      <CustomLink
                        href={`/${item?.customSEName || item.seName}.html`}
                      >
                        <Image
                          // isStatic={!item?.categoryImagePath && true}
                          height={400}
                          width={300}
                          src={
                            MEDIA_BASE_URL_CDN + item?.categoryImagePath ||
                            `/assets/images/products/sub-category-${1}.png`
                          }
                          className='group-hover:scale-125 transition-all duration-700'
                          alt=''
                          // isCdnUrlAdded={true}
                        />
                      </CustomLink>
                    </div>
                    <div className='absolute px-[5px] h-[74px] box-color group-hover:bg-opacity-100 inset-x-0 bottom-0 text-center transition-all duration-700'>
                      <div className='flex justify-center items-center h-full w-full'>
                        <CustomLink
                          href={`/${item?.customSEName || item.seName}.html`}
                          className='text-default-text text-white font-semibold font-sub'
                        >
                          <h3>{item.categoryName}</h3>
                        </CustomLink>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default Banner;
