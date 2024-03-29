'use client';
import React, { useEffect, useRef, useState } from 'react';

export interface BannerArray {
  showThumb: string;
  showArrow: string;
  infiniteLoop: string;
  autoPlay: string;
  stopOnHover: string;
  showIndicators: string;
  showStatus: string;
  images: Image[];
}

export interface Image {
  srno: number;
  image_url: string;
  image_link: string;
  image_alt: string;
  image_or_video: string;
  video_type: string;
  video_url: string;
  headline1_display: boolean;
  headline: string;
  font_size: string;
  text_transform: string;
  font_family: string;
  font_color: string;
  line_height: string;
  letter_spacing: string;
  font_weight: string;
  font_style: string;
  text_decoration: string;
  text_align: string;
  image_video_bg_color: string;
  left_padding: string;
  top_padding: string;
  right_padding: string;
  bottom_padding: string;
  left_margin: string;
  top_margin: string;
  right_margin: string;
  bottom_margin: string;
  headline_tag: string;
  headline1_box_shadow: string;
  headline1_class: string;
  headline1: string;
  font_size1: string;
  text_transform1: string;
  font_family1: string;
  font_color1: string;
  line_height1: string;
  letter_spacing1: string;
  font_weight1: string;
  font_style1: string;
  text_decoration1: string;
  text_align1: string;
  left_padding1: string;
  top_padding1: string;
  right_padding1: string;
  bottom_padding1: string;
  left_margin1: string;
  top_margin1: string;
  right_margin1: string;
  bottom_margin1: string;
  headline2_box_shadow: string;
  headline2_class: string;
  description_class: string;
  button_class: string;
  button_box_shadow: string;
  button_class1: string;
  button_box_shadow1: string;
  button_display: string;
  button_text: string;
  button_text_transform: string;
  button_style: string;
  button_size: string;
  button_link: string;
  button_link_window: string;
  button_link_follow: string;
  btn_font_family: string;
  btn_font_size: string;
  btn_font_weight: string;
  button_text_alignment: string;
  button_letter_spacing: string;
  btn_font_line_height: string;
  btn_top_padding: string;
  btn_right_padding: string;
  btn_bottom_padding: string;
  btn_left_padding: string;
  btn_top_margin: string;
  btn_right_margin: string;
  btn_bottom_margin: string;
  btn_left_margin: string;
  text_hpos: string;
  text_vpos: string;
  text_bg_color: string;
  bg_opacity: number;
  bg_hex_color: string;
  headline_width: string;
  image_height_width: ImageHeightWidth;
  visibility?: boolean;
  icon_image_url: string;
  description: string;
  button_text1: string;
  headline_font_size: string;
  headline2_display: string;
  description_display: string;
  font_color2: string;
  button_display1: string;
  button_alt: string;
  button_link1: string;
  button_alt1: string;
  button_link_window1: string;
  headline_tag1: string;
  button_text_alignment1: string;
  headline_aos_effect: string;
  headline1_aos_effect: string;
  button_aos_effect: string;
  button1_aos_effect: string;
  headline_additional_class: string;
  inside_container?: boolean;
  image_video_bg_color_rgb?: object;
  image_video_bg_opacity?: number;
}

export interface ImageHeightWidth {
  height: number;
  width: number;
}

const PrevBtn = ({
  arrowType,
  clickHandler,
}: {
  arrowType: string;
  clickHandler: () => void;
}) => {
  return (
    <div className='absolute top-1/2 -translate-y-1/2 left-4 z-10 flex items-center'>
      {arrowType === 'Arrow1' && (
        <button onClick={clickHandler}>
          <div className='overflow-hidden rounded-tl-sm rounded-br-sm leading-none absolute top-1/2 -translate-y-1/2 left-[20px] md:left-[60px] z-20 cursor-pointer h-[40px] w-[40px] md:h-[60px] md:w-[60px] bg-[#694D84] bg-opacity-80 hover:bg-opacity-100 slick-arrow'>
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
          className='bg-white -ml-2 lg:-ml-4 flex justify-center items-center w-10 h-10 rounded-full shadow focus:outline-none'
          style={{ zIndex: '39' }}
        >
          <svg
            viewBox='0 0 20 20'
            fill='currentColor'
            className='chevron-left w-6 h-6'
          >
            <path
              fillRule='evenodd'
              d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 01-1.414 0z'
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
    <div className='absolute top-1/2 -translate-y-1/2 right-[20px] z-10 flex items-center'>
      {arrowType === 'Arrow1' && (
        <button onClick={clickHandler}>
          <div className='overflow-hidden rounded-tr-sm rounded-bl-sm leading-none absolute top-1/2 -translate-y-1/2 right-[20px] md:right-[60px] z-20 cursor-pointer h-[40px] w-[40px] md:h-[60px] md:w-[60px] bg-[#694D84] bg-opacity-80 hover:bg-opacity-100 slick-arrow'>
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
              d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010-1.414l4-4a1 1 0 01-1.414 0z'
              clipRule='evenodd'
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
};

const BannerCarousel = ({
  bannerArr,
  isCentered,
}: {
  bannerArr: BannerArray;
  isCentered: boolean;
}) => {
  let tmpArr = bannerArr.images.filter(
    (image) => image.visibility === undefined || image.visibility,
  );
  const sliderRef = useRef<HTMLUListElement | null>(null);
  const [carousel, setCarousel] = useState<Element | null>(null);
  const [images, setImages] = useState<NodeListOf<Element>>();
  const [totalImages, setTotalImages] = useState(0);
  const [stopOnHover, setStopOnHover] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlide = tmpArr.length;
  const [loading, setLoading] = useState(true);

  const sliderSettings = {
    showArrow: bannerArr?.showArrow === 'On',
    infiniteLoop: bannerArr?.infiniteLoop === 'On',
    autoPlay: bannerArr?.autoPlay === 'On',
    showStatus: bannerArr?.showStatus === 'On',
    stopOnHover: bannerArr?.stopOnHover === 'On',
    showIndicators: bannerArr?.showIndicators === 'On',
  };

  useEffect(() => {
    let handleAutoPlay: any;
    if (!stopOnHover && sliderSettings.autoPlay && carousel && images) {
      handleAutoPlay = setTimeout(() => {
        next();
      }, 3000);
    }
    return () => {
      if (handleAutoPlay) {
        clearTimeout(handleAutoPlay);
      }
    };
  }, [currentSlide, stopOnHover, carousel, images]);

  useEffect(() => {
    if (sliderRef.current) {
      const car = sliderRef.current;
      setCarousel(car);
    }
  }, [sliderRef.current]);

  useEffect(() => {
    if (carousel) {
      let images: any;
      images = carousel.querySelectorAll('.carousel-slide');
      const totalImages = Object.keys(images).length;
      setImages(images);
      setTotalImages(totalImages);
    }
  }, [carousel]);

  if (!tmpArr.length) {
    return <></>;
  }

  const prev = () => {
    if (!sliderSettings.infiniteLoop && currentSlide <= 0) return;
    if (currentSlide <= -1) return;
    if (carousel && images) {
      const _currentIndex = (currentSlide - 1 + totalImages) % totalImages;
      setCurrentSlide(_currentIndex);
      carousel.setAttribute('style', `transform: translateX(-100%)`);
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
    if (!sliderSettings.infiniteLoop && currentSlide >= totalSlide - 1) return;
    if (currentSlide >= totalSlide) return;
    if (carousel && images) {
      carousel.classList.add('sliding-transition');
      const _currentIndex = (currentSlide + 1) % totalImages;
      setCurrentSlide(_currentIndex);
      carousel.setAttribute('style', `transform: translateX(-100%)`);
      setTimeout(() => {
        carousel.appendChild(images[currentSlide]);
        carousel.classList.remove('sliding-transition');
        carousel.setAttribute('style', '');
      }, 500);
    }
  };

  const goto = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <React.Fragment>
      {loading && <></>}
      <div
        className='carousel'
        onMouseEnter={() => sliderSettings.stopOnHover && setStopOnHover(true)}
        onMouseLeave={() => {
          sliderSettings.stopOnHover && setStopOnHover(false);
        }}
      >
        {sliderSettings.showStatus && (
          <p className='carousel-status'>
            {currentSlide + 1} of {totalSlide}
          </p>
        )}
        {sliderSettings.showArrow && (
          <PrevBtn arrowType={'Arrow1'} clickHandler={prev} />
        )}
        <ul
          className='carousel-slider'
          style={{ alignItems: 'center' }}
          ref={sliderRef}
        >
          {tmpArr.map((image, backgroundIndex) => {
            let headlineStartTag = '';
            let headline1StartTag = '';
            let headlineEndTag = '';
            let headline1EndTag = '';
            if (image.headline_tag) {
              headlineStartTag = '<' + image.headline_tag + '>';
              headlineEndTag = '</' + image.headline_tag + '>';
            }
            if (image.headline_tag1) {
              headline1StartTag = '<' + image.headline_tag1 + '>';
              headline1EndTag = '</' + image.headline_tag1 + '>';
            }
            // let newClass = '';
            // if (image?.headline_additional_class)
            //   newClass =
            //     image?.headline_additional_class +
            //     ' ' +
            //     (image.text_hpos ? image.text_hpos : '') +
            //     ` ` +
            //     (image.text_vpos ? image.text_vpos : '') +
            //     ' ' +
            //     image.headline_font_size;
            // else
            //   newClass =
            //     'w-full flex absolute inset-0 p-1 lg:p-4 text-white ' +
            //     (image.text_hpos ? image.text_hpos : '') +
            //     ` ` +
            //     (image.text_vpos ? image.text_vpos : '') +
            //     ' ' +
            //     image.headline_font_size;

            let newClass = '';
            let insideClass = '';
            if (image?.headline_additional_class)
              newClass = image?.headline_additional_class;
            else
              newClass =
                'flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white min-w-[220px]';
            if (image?.inside_container)
              insideClass =
                'flex container mx-auto ' +
                (image.text_hpos ? image.text_hpos : '') +
                ' ' +
                (image.text_vpos ? image.text_vpos : '');
            else
              newClass +=
                ' ' +
                (image.text_hpos ? image.text_hpos : '') +
                ' ' +
                (image.text_vpos ? image.text_vpos : '');

            return (
              <li key={backgroundIndex} className='carousel-slide'>
                <div
                  // style={
                  //   image.image_or_video == 'Image'
                  //     ? getSlideStyle(
                  //         image.image_height_width,
                  //         image.image_video_bg_color,
                  //       )
                  //     : {}
                  // }
                  key={backgroundIndex}
                  className={`relative presentation-mode ${
                    image.image_or_video !== 'Image'
                      ? 'cgslide-' + (backgroundIndex + 1)
                      : ''
                  }`}
                >
                  <div
                  // className={
                  //   image.image_or_video == 'Image' && !isLoaded
                  //     ? 'hidden'
                  //     : 'overflow-hidden'
                  // }
                  //   style={getSlideStyle(image.image_height_width)}
                  >
                    <div className='w-full'>
                      {image.image_or_video == 'Image' ? (
                        image.image_link && image.image_link != '' ? (
                          <a
                            className={`block${
                              isCentered ? ' text-center' : ''
                            }`}
                            href={`${image.image_link}`}
                          >
                            <img
                              src={`${image.image_url}`}
                              alt={`${image.image_alt}`}
                              onLoad={() => {
                                setLoading(false);
                              }}
                              className={`${
                                isCentered ? 'inline-block' : ''
                              }mx-auto `}
                            />
                          </a>
                        ) : (
                          <img
                            src={`${image.image_url}`}
                            onLoad={() => {
                              setLoading(false);
                            }}
                            alt={`${image.image_alt}`}
                            className='mx-auto h-[350px] lg:h-auto object-cover object-center'
                          />
                        )
                      ) : (
                        <>
                          {image.video_type == 'Youtube' ? (
                            <iframe
                              name='Youtube'
                              className='w-full aspect-video'
                              src={`https://www.youtube.com/embed/${image.video_url}?rel=0`}
                              allow='autoplay; encrypted-media'
                            ></iframe>
                          ) : (
                            <iframe
                              name='Vimeo'
                              className='p-0 w-full aspect-[7/3]'
                              src={`https://player.vimeo.com/video/${image.video_url}?autoplay=1&loop=1&background=1&muted=1`}
                              allow='autoplay'
                            ></iframe>
                          )}
                        </>
                      )}
                      {image?.image_video_bg_color_rgb && (
                        <div
                          className='w-full absolute inset-0'
                          style={{
                            background: `rgba(${image.image_video_bg_color_rgb},${image.image_video_bg_opacity})`,
                          }}
                        ></div>
                      )}

                      {(image.icon_image_url ||
                        image.headline ||
                        image.headline1 ||
                        image.description ||
                        image.button_text ||
                        image.button_text1) && (
                        <div className={newClass}>
                          <div className={insideClass}>
                            <div
                              className={`${
                                image.headline_width ? image.headline_width : ''
                              }`}
                              style={{
                                background: `rgb(${image.text_bg_color}, ${image.bg_opacity})`,
                                padding: '20px',
                              }}
                            >
                              {image.icon_image_url && (
                                <div className='text-center'>
                                  <img src={image.icon_image_url} />
                                </div>
                              )}
                              {image.headline1_display && (
                                <div
                                  className={image.headline1_class ?? ''}
                                  data-aos={image?.headline_aos_effect ?? ''}
                                  style={{
                                    color: image.font_color ?? '',
                                    textShadow:
                                      image.headline1_box_shadow ?? '',
                                  }}
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      headlineStartTag +
                                      image.headline +
                                      headlineEndTag,
                                  }}
                                ></div>
                              )}
                              {image.headline2_display && (
                                <div
                                  className={image.headline2_class ?? ''}
                                  data-aos={image?.headline1_aos_effect ?? ''}
                                  style={{
                                    color: image.font_color1 ?? '',
                                    textShadow:
                                      image.headline2_box_shadow ?? '',
                                  }}
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      headline1StartTag +
                                      image.headline1 +
                                      headline1EndTag,
                                  }}
                                ></div>
                              )}
                              {image.description_display && (
                                <div
                                  className={image.description_class ?? ''}
                                  style={{ color: image.font_color2 ?? '' }}
                                  dangerouslySetInnerHTML={{
                                    __html: image.description,
                                  }}
                                ></div>
                              )}
                              {image.button_display1 === undefined ? (
                                image.button_display == 'Yes' && (
                                  <>
                                    <div
                                      className={image?.button_text_alignment}
                                      title={image.button_text}
                                    >
                                      <a
                                        href={image.button_link}
                                        data-aos={
                                          image?.button_aos_effect ?? ''
                                        }
                                        title={
                                          tmpArr[0].button_alt ??
                                          tmpArr[0].button_text
                                        }
                                        target={
                                          image.button_link_window == '_self'
                                            ? ''
                                            : '_blank'
                                        }
                                        className={`${image.button_class}`}
                                        style={{
                                          boxShadow: image?.button_box_shadow,
                                        }}
                                        rel='noreferrer'
                                      >
                                        {image.button_text}
                                      </a>
                                    </div>
                                  </>
                                )
                              ) : (
                                <>
                                  {image.button_display1 === 'Yes' &&
                                  image.button_display === 'Yes' ? (
                                    <>
                                      <div className='pt-3 lg:pt-5 text-center'>
                                        <a
                                          href={image.button_link}
                                          data-aos={
                                            image?.button_aos_effect ?? ''
                                          }
                                          title={
                                            tmpArr[0].button_alt ??
                                            tmpArr[0].button_text
                                          }
                                          target={
                                            image.button_link_window == '_self'
                                              ? ''
                                              : '_blank'
                                          }
                                          className={`${image.button_class}`}
                                          style={{
                                            boxShadow: image?.button_box_shadow,
                                          }}
                                          rel='noreferrer'
                                        >
                                          {image.button_text}
                                        </a>
                                        <a
                                          href={image.button_link1}
                                          data-aos={
                                            image?.button1_aos_effect ?? ''
                                          }
                                          title={
                                            tmpArr[0].button_alt1 ??
                                            tmpArr[0].button_text1
                                          }
                                          target={
                                            image.button_link_window1 == '_self'
                                              ? ''
                                              : '_blank'
                                          }
                                          className={`${image.button_class1}`}
                                          style={{
                                            boxShadow:
                                              image?.button_box_shadow1,
                                          }}
                                          rel='noreferrer'
                                        >
                                          {image.button_text1}
                                        </a>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      {image.button_display == 'Yes' && (
                                        <>
                                          <div
                                            className={
                                              image?.button_text_alignment
                                            }
                                            title={image.button_text}
                                          >
                                            <a
                                              href={image.button_link}
                                              data-aos={
                                                image?.button_aos_effect ?? ''
                                              }
                                              title={
                                                tmpArr[0].button_alt ??
                                                tmpArr[0].button_text
                                              }
                                              target={
                                                image.button_link_window ==
                                                '_self'
                                                  ? ''
                                                  : '_blank'
                                              }
                                              className={`${image.button_class}`}
                                              style={{
                                                boxShadow:
                                                  image?.button_box_shadow,
                                              }}
                                              rel='noreferrer'
                                            >
                                              {image.button_text}
                                            </a>
                                          </div>
                                        </>
                                      )}
                                      {image.button_display1 == 'Yes' && (
                                        <>
                                          <div
                                            className={
                                              image?.button_text_alignment1
                                            }
                                            title={image.button_text1}
                                          >
                                            <a
                                              href={image.button_link1}
                                              data-aos={
                                                image?.button1_aos_effect ?? ''
                                              }
                                              title={
                                                tmpArr[0].button_alt1 ??
                                                tmpArr[0].button_text1
                                              }
                                              target={
                                                image.button_link_window1 ==
                                                '_self'
                                                  ? ''
                                                  : '_blank'
                                              }
                                              className={`${image.button_class1}`}
                                              style={{
                                                boxShadow:
                                                  image?.button_box_shadow1,
                                              }}
                                              rel='noreferrer'
                                            >
                                              {image.button_text1}
                                            </a>
                                          </div>
                                        </>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        {sliderSettings.showArrow && (
          <NextBtn arrowType='Arrow1' clickHandler={next} />
        )}
        {sliderSettings.showIndicators && (
          <ul className='control-dots'>
            {new Array(totalSlide).fill('').map((_, index) => (
              <li
                key={index}
                onClick={() => goto(index)}
                className={`dot${currentSlide === index ? ' selected' : ''}`}
                value={index}
                role='button'
              ></li>
            ))}
          </ul>
        )}
      </div>
    </React.Fragment>
  );
};

export default BannerCarousel;
