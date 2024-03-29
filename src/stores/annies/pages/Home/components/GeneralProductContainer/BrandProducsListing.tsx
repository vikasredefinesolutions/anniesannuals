import { getStoreId } from '@/utils/cookie.helper';
import { useWindowDimensions } from '@/hooks/useWindowResize';
import { useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import FeaturedSkeleton from '../FeaturedSkeleton';
import { _SelectedTab, newFetauredItemResponse } from '../home.type';
import SlugSingleProductListing from './SlugSingleProductListing';

interface _props {
  productsData: _SelectedTab;
  showBorder: string;
  customMessage: string;
  showProductName: string;
  showSplitProducts: string;
  showButton: string;
  showPrice: string;
  showBrandLogo: string;
  productToDisplay: string;
  featuredItems: { [x: string]: newFetauredItemResponse[] };
}
interface _carouselProps {
  sliderSettings: {
    dots: boolean;
    infinite: boolean;
    speed: number;
    slidesToShow: number;
    slidesToScroll: number;
    arrows: boolean;
  };
  carouselCounter: number;
}

const PrevBtn = ({
  arrowType,
  clickHandler,
}: {
  arrowType: string;
  clickHandler: () => void;
}) => {
  return (
    <div
      className='absolute top-1/2 -translate-y-1/2 left-4 z-10 flex items-center'
      style={{ zIndex: '39' }}
    >
      {arrowType === 'Arrow1' && (
        <button
          name='Previous'
          onClick={clickHandler}
          className='bg-white -ml-4 lg:-ml-4 flex justify-center items-center w-10 h-10 rounded-full shadow focus:outline-none'
        >
          <span className='chevron-left ml-1 text-base material-symbols-outlined font-semibold '>
            arrow_back_ios
          </span>
        </button>
      )}
      {arrowType === 'Arrow2' && (
        <button
          name='Previous'
          onClick={clickHandler}
          className='bg-white -mr-4 lg:-mr-4 flex justify-center items-center w-10 h-10 rounded-full shadow focus:outline-none'
          style={{ zIndex: '39' }}
        >
          <svg
            viewBox='0 0 20 20'
            fill='currentColor'
            className='chevron-left w-6 h-6'
          >
            <path
              fillRule='evenodd'
              d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
              clipRule='evenodd'
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
};

const NextBtn = ({
  arrowType,
  clickHandler,
}: {
  arrowType: string;
  clickHandler: () => void;
}) => {
  return (
    <div
      className='absolute top-1/2 -translate-y-1/2 right-4 z-10 flex items-center'
      style={{ zIndex: '39' }}
    >
      {arrowType === 'Arrow1' && (
        <button
          name='Next'
          onClick={clickHandler}
          className='bg-white -mr-4 lg:-mr-4 flex justify-center items-center w-10 h-10 rounded-full shadow focus:outline-none'
        >
          <span className='chevron-right ml-1  text-base material-symbols-outlined font-semibold'>
            arrow_forward_ios
          </span>
        </button>
      )}
      {arrowType === 'Arrow2' && (
        <button
          name='Next'
          onClick={clickHandler}
          className='bg-white -mr-2 lg:-mr-4 flex justify-center items-center w-10 h-10 rounded-full shadow focus:outline-none'
          style={{ zIndex: '39' }}
        >
          <svg
            viewBox='0 0 20 20'
            fill='currentColor'
            className='chevron-right w-6 h-6'
          >
            <path
              fillRule='evenodd'
              d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
              clipRule='evenodd'
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
};

const BrandProductListing: React.FC<_props> = (props) => {
  const {
    productsData,
    showBorder,
    customMessage,
    showProductName,
    showSplitProducts,
    showButton,
    showPrice,
    showBrandLogo,
    featuredItems,
  } = props;

  const router = useRouter();

  const { width } = useWindowDimensions();

  const [brandsData, setBrandsData] = useState<newFetauredItemResponse[] | []>(
    [],
  );

  // const sliderRef = useRef<null | Slider>(null);

  const storeId = getStoreId();

  //  Fetching products by brand
  useEffect(() => {
    if (featuredItems && Object.keys(featuredItems).length > 0) {
      setBrandsData(featuredItems[productsData?.tabName]);
    }
  }, [productsData?.tabName, storeId, featuredItems]);
  const [sliderPerview, setSlidePerview] = useState(width < 1024 ? 1 : 4);

  useEffect(() => {
    if (width <= 480) {
      setSlidePerview(1);
    } else if (width <= 768) {
      setSlidePerview(2);
    } else if (width <= 1024) {
      setSlidePerview(3);
    } else {
      setSlidePerview(3);
    }
  }, [width, brandsData]);

  const sliderSettings = {
    showArrow: true,
    infiniteLoop: true,
    autoPlay: false,
  };

  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const animation = 500;
  const totalSlide =
    brandsData?.length > 4
      ? Math.ceil(brandsData?.length / sliderPerview) + (sliderPerview - 1)
      : Math.ceil(brandsData?.length / sliderPerview);

  const mod = (n: number, m: number) => ((n % m) + m) % m;

  const prev = () => {
    if (!sliderSettings.infiniteLoop && currentSlide <= 0) return;
    if (currentSlide <= -1) return;
    setCurrentSlide(currentSlide - 1);
  };

  const next = () => {
    if (!sliderSettings.infiniteLoop && currentSlide >= totalSlide - 1) return;
    if (currentSlide >= totalSlide) return; // prevent blanks on fast next-click
    setCurrentSlide(currentSlide + 1);
  };

  const anim = () => {
    if (sliderRef?.current) {
      const elCarouselSlider = sliderRef.current as HTMLElement;
      const elsSlides = elCarouselSlider.childNodes;
      const cMod = mod(currentSlide, totalSlide);
      elCarouselSlider.style.transitionDuration = `${animation}ms`;
      elCarouselSlider.style.transform = `translateX(${-currentSlide * 100}%)`;
      elsSlides.forEach((elSlide: any, i) =>
        elSlide.classList.toggle('is-active', cMod === i),
      );
    }
  };

  useEffect(() => {
    if (sliderSettings.infiniteLoop) {
      if (currentSlide <= -1) {
        setCurrentSlide(totalSlide - currentSlide - 1);
      } else if (currentSlide >= totalSlide) {
        setCurrentSlide(0);
      } else {
        anim();
      }
    } else {
      anim();
    }
  }, [currentSlide]);

  return (
    <div className='carousel'>
      {sliderSettings.showArrow && (
        <PrevBtn arrowType={'Arrow1'} clickHandler={prev} />
      )}

      <ul className='carousel-slider featured-slider' ref={sliderRef}>
        {brandsData && brandsData?.length
          ? brandsData?.map((product) => {
              return (
                <Fragment key={product?.productId}>
                  <div
                    key={product.productId}
                    className='carousel-slide featured-item'
                  >
                    <SlugSingleProductListing
                      showBorder={showBorder}
                      product={product}
                      customMessage={customMessage}
                      showProductName={showProductName}
                      showSplitProducts={showSplitProducts}
                      showButton={showButton}
                      showPrice={showPrice}
                      showBrandLogo={showBrandLogo}
                    />
                  </div>
                </Fragment>
              );
            })
          : Array.from([]).map((_, index) => {
              return (
                <div key={index} className='carousel-slide featured-item'>
                  <div className='px-2'>
                    <div className='w-full'>
                      <div className='text-center relative border border-gray-200 border-solid bg-white relative'>
                        <FeaturedSkeleton />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
      </ul>
      {sliderSettings.showArrow && (
        <NextBtn arrowType='Arrow1' clickHandler={next} />
      )}
    </div>
  );
};

export default BrandProductListing;
