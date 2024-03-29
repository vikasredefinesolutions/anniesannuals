/*Component Name: ElementCarousel
Component Functional Details: Element for Component ElementCarousel  
Created By: Vikas Patel
Created Date: 17th September 2022
Modified By: <Modified By Name>
Modified Date: <Modified Date> */
import 'photoswipe/dist/photoswipe.css';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'react-responsive-carousel/lib/styles/carousel.css';
const ElementImageGallery = (data) => {
  const smallItemStyles = {
    cursor: 'pointer',
    objectFit: 'cover',
    width: '200px',
    maxHeight: '200px',
  };

  // const settings = {
  //     dots: true,
  //     infinite: true,
  //     speed: 500,
  //     slidesToShow: 3,
  //     slidesToScroll: 3
  //   };
  //   console.log("DATA -- ",data.dynamic.value.length);
  return (
    <>
      <div className='mainsection'>
        <div className='flex flex-wrap justify-content-center'>
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
        </div>
        {data?.dynamic?.value?.length > 0 && (
          <>
            <div className='mx-auto mb-[40px] flex justify-center items-center text-center logo-slider'>
              <div className=''>
                <div className='max-w-[950px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 gallery'>
                  <Gallery>
                    {data.dynamic.value.map((image, index) => {
                      return image.Image ? (
                        <Item
                          original={image.Image}
                          thumbnail={image.Image}
                          alt={image.Image_alt}
                          width='1024'
                          height='768'
                        >
                          {({ ref, open }) => (
                            <div>
                              <img
                                className='h-full max-w-auto'
                                style={smallItemStyles}
                                src={image.Image}
                                ref={ref}
                                onClick={open}
                              />
                            </div>
                          )}
                        </Item>
                      ) : (
                        <></>
                      );
                    })}
                  </Gallery>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default ElementImageGallery;
