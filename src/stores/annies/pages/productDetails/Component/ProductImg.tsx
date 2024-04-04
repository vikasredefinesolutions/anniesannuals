import MultiSlideCarousel from '@/components/common/multislideCarousel';
import ProductImageController from '@/features/product/productDetail/productImageSection/controller';
import Image from '@/shared/Components/Image';
import Video from '@/shared/Components/Video';
import { IProductColor, IProductDetails } from '@/shared/types/product';
import WishlistIcon from '@/stores/annies/shared/components/wishListIcon';
import React from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import ShareIcons from '../../Home/components/SocialShare/index';

interface IProps {
  selectedColor: IProductColor | null;
  product: IProductDetails | null;
}

const ProductImg: React.FC<IProps> = ({ selectedColor, product }) => {
  let PhotoCredit: string;
  const moreImages = product?.sizes
    ? selectedColor?.moreImages!
    : product?.attributeImagesViewModels!;
  product?.customFields?.map((el) => {
    if (el.label.toLocaleLowerCase() == 'photo credit') {
      PhotoCredit = el.value;
    }
  });
  return (
    <ProductImageController
      configs={{}}
      altImages={
        product?.sizes
          ? selectedColor?.moreImages!
          : product?.attributeImagesViewModels!
      }
      cases={{
        view: ({ selectedImage, handleImageChange }) => {
          const mediaBaseUrl =
            process.env.NEXT_PUBLIC_MEDIA_URL ||
            process.env.NEXT_PUBLIC_EXTRA_MEDIA_URL_DETAIL_MAIN ||
            process.env.NEXT_PUBLIC_REDEFINE_MEDIA ||
            '';
          return (
            <>
              <div className='grid grid-cols-12 gap-[10px] sticky top-[10px]'>
                {moreImages?.length ||
                selectedImage?.imageUrl ||
                selectedImage?.videoUrl ? (
                  <>
                    <div
                      className='col-span-12 md:col-span-2 order-2 md:order-1 sub-img-slider hidden md:block lg:block'
                      id='img-scrollbar'
                      style={{
                        overflowY: 'scroll',
                        height: '750px',
                        scrollbarWidth: 'none',
                      }}
                    >
                      {moreImages &&
                        moreImages.map((el, index) => {
                          return (
                            <div
                              className='md:mb-[10px] last:mb-0  md:auto'
                              key={`${el.displayOrder}_${index}`}
                              onClick={() => {
                                handleImageChange(
                                  el?.imageUrl!,
                                  el.altTag,
                                  el.displayOrder,
                                  el.videoUrl!,
                                );
                              }}
                            >
                              <div
                                className={`relative rounded-tl-default rounded-br-default overflow-hidden mb-[20px] mr-[20px] md:mr-0 last:mb-0 border-[2px] ${
                                  el?.imageUrl == selectedImage?.imageUrl ||
                                  el?.imageUrl == selectedColor?.imageUrl
                                    ? 'border-[#9F2D3C]'
                                    : 'border-transparent'
                                } `}
                              >
                                <div className='rounded-tl-default rounded-br-default overflow-hidden sub-img-item border-[10px] border-transparent'>
                                  {el.imageUrl && !el.videoUrl ? (
                                    <Image
                                      src={el?.imageUrl!}
                                      alt={el?.altTag! || product?.name!}
                                      className='md:max-h-full rounded-tl-default rounded-br-default overflow-hidden'
                                    />
                                  ) : (
                                    <>
                                      {!el.imageUrl && !el.videoUrl ? (
                                        <Image
                                          src={
                                            '/assets/images/wishlist-selected.png'
                                          }
                                          isStatic={true}
                                          alt={el?.altTag! || product?.name!}
                                          className='md:max-h-full rounded-tl-default rounded-br-default overflow-hidden'
                                        />
                                      ) : (
                                        <Video
                                          className='w-full aspect-video'
                                          isStatic={true}
                                          src={el.videoUrl}
                                          alt={el?.altTag! || product?.name!}
                                          allow={'picture-in-picture'}
                                        />
                                      )}
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    <div className='col-span-12 md:col-span-2 order-2 md:order-1 sub-img-slider flex md:hidden'>
                      <MultiSlideCarousel
                        slidesPerImage={4}
                        totalItems={moreImages?.length!}
                        isProductDetails={true}
                      >
                        {moreImages &&
                          moreImages?.map((el, index) => {
                            return (
                              <>
                                <div
                                  className='md:mb-[10px] last:mb-0 w-[188px] md:auto'
                                  key={`${el.displayOrder}_${index}`}
                                  onClick={() => {
                                    handleImageChange(
                                      el?.imageUrl!,
                                      el.altTag,
                                      el.displayOrder,
                                      el.videoUrl!,
                                    );
                                  }}
                                >
                                  <div
                                    className={`relative rounded-tl-default rounded-br-default overflow-hidden mb-[20px] md:mr-0 last:mb-0 border-[2px] ${
                                      el?.imageUrl == selectedImage?.imageUrl ||
                                      el?.imageUrl == selectedColor?.imageUrl
                                        ? 'border-[#9F2D3C]'
                                        : 'border-transparent'
                                    } `}
                                  >
                                    <div className='rounded-tl-default rounded-br-default overflow-hidden sub-img-item border-[10px] border-transparent'>
                                      {el.imageUrl && !el.videoUrl ? (
                                        <Image
                                          src={el?.imageUrl!}
                                          alt={el?.altTag! || product?.name!}
                                          className='md:max-h-full rounded-tl-default rounded-br-default overflow-hidden'
                                        />
                                      ) : (
                                        <>
                                          {!el.imageUrl && !el.videoUrl ? (
                                            <Image
                                              src={
                                                '/assets/images/wishlist-selected.png'
                                              }
                                              isStatic={true}
                                              alt={
                                                el?.altTag! || product?.name!
                                              }
                                              className='md:max-h-full rounded-tl-default rounded-br-default overflow-hidden'
                                            />
                                          ) : (
                                            <Video
                                              className='w-full aspect-video'
                                              isStatic={true}
                                              src={el.videoUrl}
                                              alt={
                                                el?.altTag! || product?.name!
                                              }
                                              allow={'picture-in-picture'}
                                            />
                                          )}
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                      </MultiSlideCarousel>
                    </div>
                    <div className='col-span-12 md:col-span-10 order-1 md:order-2 main-image-outer '>
                      <div className=' relative main-image rounded-tl-2xl rounded-br-2xl overflow-hidden px-[2px]'>
                        {selectedImage.imageUrl && !selectedImage.videoUrl ? (
                          <InnerImageZoom
                            key={selectedImage.imageUrl}
                            zoomType='hover'
                            hideHint={true}
                            imgAttributes={{ alt: `${product?.name}` }}
                            src={mediaBaseUrl + selectedImage?.imageUrl!}
                            className='md:max-h-full rounded-tl-default rounded-br-default overflow-hidden'
                          />
                        ) : (
                          <Video
                            className='w-full aspect-video'
                            isStatic={true}
                            src={selectedImage?.videoUrl}
                            alt={selectedImage?.alt! || product?.name!}
                            allow={'autoplay'}
                          />
                        )}
                        {
                          <div className='absolute left-4 top-4 cursor-pointer h-10 w-10 rounded-full'>
                            <WishlistIcon
                              product={{
                                id: +product?.id!,
                                name: product?.name!,
                                seName: product?.seName!,
                                price: product?.msrp!,
                              }}
                            />
                          </div>
                        }
                        {product?.productTagViewModel.map((el, index) => (
                          <div
                            className={`absolute ${
                              el.tagPosition.toLocaleLowerCase() == 'topleft'
                                ? 'left-[50px] top-4 '
                                : el.tagPosition
                            }  cursor-pointer`}
                            key={el.tagPosition + index}
                          >
                            <Image
                              src={el.imagename}
                              alt={el.productTagName || ''}
                            />
                          </div>
                        ))}
                        {PhotoCredit && (
                          <div className='flex justify-center py-[20px] text-default-text'>
                            {PhotoCredit}
                          </div>
                        )}
                      </div>
                      <div className='mt-2'>
                        <ShareIcons mediaURL={selectedImage.imageUrl} />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className='col-span-12 md:col-span-12 order-1  main-image-outer'>
                      <Image
                        src={'/assets/images/No_productImg.png'}
                        className=' rounded-tl-default rounded-br-default overflow-hidden'
                        alt={''}
                        isStatic={true}
                      />
                    </div>
                  </>
                )}
              </div>
            </>
          );
        },
      }}
    />
  );
};

export default ProductImg;
