'use client';
import { useWindowDimensions } from '@/hooks/useWindowResize';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  slidesPerImage: number;
  totalItems: number;
  isHeaderCarousel?: boolean;
  sliderSettings?: {
    showArrow: boolean;
    infiniteLoop: boolean;
    autoPlay: boolean;
  };
  isProductDetails?: boolean;
}

const defaultSliderSettings = {
  showArrow: true,
  infiniteLoop: true,
  autoPlay: false,
};

const PrevBtn = ({
  arrowType,
  clickHandler,
}: {
  arrowType: string;
  clickHandler: () => void;
}) => {
  return (
    <div className='absolute top-1/2 -translate-y-1/2 left-4 z-20 flex items-center'>
      {arrowType === 'Arrow1' && (
        <button onClick={clickHandler}>
          <div
            className='overflow-hidden rounded-tl-sm rounded-br-sm leading-none absolute top-1/2 -translate-y-1/2 z-20 cursor-pointer h-[40px] w-[40px] md:h-[60px] md:w-[60px] bg-[#694D84] bg-opacity-80 hover:bg-opacity-100 slick-arrow block'
            style={{ left: '-16px' }}
          >
            <span className='material-icons-outlined flex justify-center items-center w-full h-full text-[#ffffff]'>
              arrow_back_ios
            </span>
          </div>
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
    <div className='absolute top-1/2 -translate-y-1/2 right-[20px] z-20 flex items-center'>
      {arrowType === 'Arrow1' && (
        <button onClick={clickHandler}>
          <div
            style={{ right: '-19px' }}
            className='overflow-hidden rounded-tr-sm rounded-bl-sm leading-none absolute top-1/2 -translate-y-1/2 z-20 cursor-pointer h-[40px] w-[40px] md:h-[60px] md:w-[60px] bg-[#694D84] bg-opacity-80 hover:bg-opacity-100 slick-arrow block'
          >
            <span className='material-icons-outlined flex justify-center items-center w-full h-full text-[#ffffff]'>
              arrow_forward_ios
            </span>
          </div>
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

const MultiSlideCarousel = ({
  children,
  slidesPerImage,
  totalItems,
  isHeaderCarousel = false,
  sliderSettings = defaultSliderSettings,
  isProductDetails = false,
}: Props) => {
  const { width } = useWindowDimensions();

  const sliderRef = useRef(null);
  const [carousel, setCarousel] = useState<Element | null>(null);
  const [images, setImages] = useState<NodeListOf<Element>>();
  const [totalImages, setTotalImages] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (sliderRef.current) {
      const car = sliderRef.current;
      setCarousel(car);
    }
  }, [sliderRef.current]);

  const [imageWidth, setImageWidth] = useState(392.5);

  useEffect(() => {
    if (carousel) {
      let images: any;
      if (slidesPerImage === 3) {
        images = carousel.querySelectorAll('.shop-by-garden-slides');
      } else {
        if (isProductDetails) {
          images = carousel.querySelectorAll('.feature-slide');
        } else {
          images = carousel.querySelectorAll('.carousel-slider-slide');
        }
      }
      const slider1 = images[0];
      setImageWidth(slider1?.clientWidth);
      const totalImages = Object.keys(images).length;
      setImages(images);
      setTotalImages(totalImages);
    }
  }, [carousel]);

  const prev = () => {
    if (carousel && images) {
      const _currentIndex = (currentIndex - 1 + totalImages) % totalImages;
      setCurrentIndex(_currentIndex);
      carousel.setAttribute('style', `transform: translateX(-${imageWidth}px)`);
      carousel.insertBefore(images[_currentIndex], carousel.firstChild);

      setTimeout(() => {
        carousel.setAttribute('style', '');
        carousel.classList.add('sliding-transition');
      }, 10);

      setTimeout(() => {
        carousel.classList.remove('sliding-transition');
      }, 490);
    }
  };

  const next = () => {
    if (carousel && images) {
      carousel.classList.add('sliding-transition');
      const _currentIndex = (currentIndex + 1) % totalImages;
      setCurrentIndex(_currentIndex);
      carousel.setAttribute('style', `transform: translateX(-${imageWidth}px)`);
      setTimeout(() => {
        carousel.appendChild(images[currentIndex]);
        carousel.classList.remove('sliding-transition');
        carousel.setAttribute('style', '');
      }, 500);
    }
  };

  // Touch Events
  const [isSwiped, setIsSwiped] = useState(false);
  const [initialX, setInitialX] = useState(0);
  const [rectLeft, setRectLeft] = useState<number | null>(null);
  // 0 = left, 1 = right
  const [detectedTouch, setDetectedTouch] = useState<number | null>(null);
  useEffect(() => {
    if (carousel) {
      setRectLeft(carousel.getBoundingClientRect().left);
    }
  }, [carousel]);

  const getXY = (e: React.TouchEvent<HTMLUListElement>) => {
    return rectLeft ? e.touches[0].pageX - rectLeft : 0;
  };

  const onTouchStart = (event: React.TouchEvent<HTMLUListElement>) => {
    setIsSwiped(true);
    setInitialX(event.touches[0].pageX);
  };

  const onTouchMove = (event: React.TouchEvent<HTMLUListElement>) => {
    if (isSwiped) {
      const currentX = event.touches[0].pageX;
      const diffX = currentX - initialX;
      setDetectedTouch(diffX > 0 ? 1 : -1);
    }
  };

  const onTouchEnd = () => {
    if (isSwiped) {
      if (detectedTouch === 1) {
        prev();
      } else if (detectedTouch === -1) {
        next();
      }
      setIsSwiped(false);
    }
  };

  const showArrows =
    (totalItems > slidesPerImage ||
      (width <= 480 && totalItems <= slidesPerImage && totalItems > 1) ||
      (width <= 768 && totalItems <= slidesPerImage && totalItems > 2) ||
      (width <= 1024 && totalItems <= slidesPerImage && totalItems > 3)) &&
    sliderSettings.showArrow;

  return (
    <div className='carousel mx-[-15px] z-4'>
      {showArrows && <PrevBtn arrowType='Arrow1' clickHandler={prev} />}
      <ul
        className={`${
          totalItems < 4 ? 'flex' : 'carousel-slider'
        } featured-slider`}
        ref={sliderRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {React.Children.map(children, (child, index) => {
          return (
            <li
              key={index}
              className={`${
                isProductDetails
                  ? 'feature-slide'
                  : slidesPerImage === 3
                  ? 'shop-by-garden-slides'
                  : 'carousel-slider-slide'
              } featured-item box-color-main`}
              style={{ padding: isProductDetails ? '0 10px' : '0 15px' }}
            >
              {child}
            </li>
          );
        })}
      </ul>
      {showArrows && <NextBtn arrowType='Arrow1' clickHandler={next} />}
    </div>
  );
};

export default MultiSlideCarousel;
