'use client';
import { getNewCrops } from '@/api/services/home';
import CustomCarousel from '@/components/common/Carousel/CustomCarousel';
import CustomLink from '@/shared/Components/CustomLink';
import { getStoreId, getUserId } from '@/shared/utils/cookie.helper';
import { paths } from '@/utils/paths.constant';
import { useEffect, useState } from 'react';

const NewCrops: React.FC = () => {
  const [response, setResponse] = useState(null);
  const storeId = getStoreId();
  const customerId = getUserId();

  useEffect(() => {
    getNewCrops({
      storeId: storeId,
      countForFetchItems: 0,
      customerId: customerId,
    }).then((data) => setResponse(data));
  }, []);

  if (!response) return null;

  return (
    <>
      <section className='relative w-full pt-[30px] pb-[30px] bg-[#FCEEFF] bg-top bg-cover bg-no-repeat overflow-x-hidden 2xl:overflow-x-visible'>
        <div className='mx-auto container relative'>
          <div className='flex flex-wrap justify-between items-center pb-[15px]'>
            <div className='font-sub font-bold text-2xl-text pl-[15px] pb-[15px]'>
              New 2024
            </div>
            <div className='pb-[15px]'>
              <CustomLink
                href={paths.newProducts}
                className='font-sub font-bold text-medium-text underline'
              >
                Shop All New
              </CustomLink>
            </div>
          </div>
          <CustomCarousel
            data={response}
            slidesPerImage={4}
            isProducts
            showNameAndCultivatorName
          />
        </div>
      </section>
    </>
  );
};

export default NewCrops;
