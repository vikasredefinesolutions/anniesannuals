'use client';
import { getShopByType } from '@/api/services/home';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import { DynamicCategories, setShowByTypePayload } from '@/utils/helpers';
import { paths } from '@/utils/paths.constant';
import { useEffect, useState } from 'react';
import CustomCarousel from './CustomCarousel';

interface value {
  value: string | boolean;
}

interface Props {
  bg: value;
  additionalclass: value;
  key: string;
  bg_bg_image_style: value;
  SlidesCount: number;
  title: string;
  bg_fixed_bg: value;
  bg_bg_image_position: value;
}

const MultiSliderComponent = ({
  SliderData,
  name,
}: {
  SliderData: Props;
  name: string;
}) => {
  const [response, setResponse] = useState<[]>();

  useEffect(() => {
    const formatPayload = setShowByTypePayload(name);
    getShopByType(formatPayload)
      .then((responseData) => setResponse(responseData))
      .catch((error) => console.log('Error: MultiSliderCarousel', error));
  }, []);

  const bgClassName = `${SliderData?.additionalclass?.value} ${
    SliderData?.bg_bg_image_style?.value
  } ${SliderData?.bg_bg_image_position?.value} ${
    SliderData?.bg_fixed_bg?.value && 'bg-fixed'
  }`;

  let shopAllRedirectionLink;
  if (name === DynamicCategories.SHOP_BY_CATEGORY) {
    shopAllRedirectionLink = paths.productListingAtoZ;
  } else if (
    name === DynamicCategories.SHOP_BY_FEATURES ||
    name === DynamicCategories.SHOP_BY_USES
  ) {
    shopAllRedirectionLink = paths.plantFinder;
  } else {
    shopAllRedirectionLink = paths.shopTheGarden;
  }

  const getStyle = (bgUrlOrColor: string | boolean) => {
    if (typeof bgUrlOrColor === 'boolean') {
      return {};
    }

    if (bgUrlOrColor.includes('http')) {
      return { backgroundImage: `url(${bgUrlOrColor})` };
    }

    return { getBackGroundColor: bgUrlOrColor };
  };

  return response ? (
    <section
      className={`relative mx-auto py-[30px] bg-top bg-cover bg-no-repeat overflow-x-hidden overflow-hidden ${bgClassName} `}
      style={getStyle(SliderData?.bg?.value)}
    >
      <div className='mx-auto container relative '>
        {name === DynamicCategories?.SHOP_BY_GARDEN && (
          <div className='absolute top-[10%] left-[-2%] lg:top-[40px] lg:left-[-35px] xl:top-[54px] xl:left-[-75px] z-[40] hidden lg:block butterfly-show'>
            <Image
              src='/assets/images/butterfly-4.png'
              alt='butterfly'
              isStatic
              className='w-[50%] lg:w-auto'
            />
          </div>
        )}
        {name === DynamicCategories?.SHOP_BY_USES && (
          <div className='absolute top-[30px] right-[-110px] z-10 hidden lg:block butterfly-show'>
            <Image
              src='/assets/images/dragon-fly-1-new.png'
              alt='Dragon-fly'
              isStatic
              className='w-[50%] lg:w-auto'
            />
          </div>
        )}
        <div className='flex flex-wrap justify-between items-center pb-[15px] relative'>
          <div className='font-sub font-bold text-2xl-text pb-[15px] pl-[15px]'>
            {name}
          </div>
          <div
            className='pb-[15px]'
            style={{ position: 'relative', zIndex: 20 }}
          >
            <CustomLink
              href={shopAllRedirectionLink}
              className='font-sub pr-[15px] font-bold text-medium-text underline '
            >
              Shop All
            </CustomLink>
          </div>
        </div>
        <CustomCarousel
          slidesPerImage={name === DynamicCategories.SHOP_BY_GARDEN ? 3 : 4}
          data={response}
        />
      </div>
    </section>
  ) : null;
};

export default MultiSliderComponent;
