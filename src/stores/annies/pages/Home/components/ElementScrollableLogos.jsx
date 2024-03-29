/*Component Name: ElementCarousel
Component Functional Details: Element for Component ElementCarousel  
Created By: Vikas Patel
Created Date: 17th September 2022
Modified By: <Modified By Name>
Modified Date: <Modified Date> */
import 'react-responsive-carousel/lib/styles/carousel.css';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
//import "swiper/css";
//import "swiper/css/pagination";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// import required modules
import { Pagination } from 'swiper/modules';
const ElementScrollableLogos = (data) => {
  return (
    <>
      <div className='mainsection'>
        <div className='justify-content-center'>
          {data?.Headline && (
            <div className='w-full'>
              <div
                className={`${
                  data?.Headline_final_class?.value
                    ? data.Headline_final_class.value
                    : 'mb-[20px] mt-[20px] text-large-text font-semibold md:text-[32px] mx-auto text-center'
                }`}
                id='Headline'
              >
                Premium Brands
              </div>
            </div>
          )}
          {data?.dynamic?.value?.length > 0 && (
            <>
              <div className='mx-auto mb-[40px] justify-center items-center text-center logo-slider'>
                <div className='swiper mySwiper swiper-initialized swiper-horizontal'>
                  <div className=''>
                    <Swiper
                      slidesPerView={
                        data?.scrolllogos_count_display?.value ?? 5
                      }
                      spaceBetween={
                        data?.scrolllogos_column_spacing?.value ?? 30
                      }
                      pagination={{
                        clickable: true,
                      }}
                      modules={[Pagination]}
                      cssMode={true}
                      className='mySwiper'
                      slidesPerGroup={
                        data?.scrolllogos_count_display?.value ?? 5
                      }
                      breakpoints={{
                        0: {
                          slidesPerView: 1,
                          slidesPerGroup: 1,
                        },
                        400: {
                          slidesPerView: 2,
                          slidesPerGroup: 2,
                        },
                        639: {
                          slidesPerView: 3,
                          slidesPerGroup: 3,
                        },
                        865: {
                          slidesPerView:
                            data?.scrolllogos_count_display?.value ?? 5,
                          slidesPerGroup:
                            data?.scrolllogos_count_display?.value ?? 5,
                        },
                      }}
                    >
                      {data.dynamic.value.map((image, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <a href={image.Image_link}>
                              <img
                                style={{ maxWidth: '170px' }}
                                className='img-fluid rounded-0 mx-auto h-full'
                                alt={image?.Image_alt}
                                title={image?.Image_alt}
                                src={image.Image}
                              />
                            </a>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                </div>
              </div>
            </>
          )}
          {data?.Description && (
            <div
              className={`${
                data?.Description_final_class?.value
                  ? data.Description_final_class.value
                  : 'text-[#3f5364] text-[18px] leading-[26px] tracking-wider pt-[40px] pb-[40px]'
              }`}
              dangerouslySetInnerHTML={{ __html: data.Description.value }}
            ></div>
          )}
        </div>
      </div>
    </>
  );
};
export default ElementScrollableLogos;
