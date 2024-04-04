import { useAppSelector } from '@/app/redux/hooks';
import MultiSlideCarousel from '@/components/common/multislideCarousel';
import GardenProductInfoController from '@/features/product/productDetail/gardenProductInfoSection/Controller';
import ProductDetailInfoController from '@/features/product/productDetail/productDetailInfo.ts/controller';
import ProductImageController from '@/features/product/productDetail/productImageSection/controller';
import { tStoreDetailsFile } from '@/helper/staticfile.helper';
import Image from '@/shared/Components/Image';
import Video from '@/shared/Components/Video';
import {
  IProductColor,
  IProductDetails,
  IShopBGardenProductDetail,
} from '@/shared/types/product';
import { getPriceWithMsrpAndSalePrice } from '@/shared/utils/helper';
import BreadCrumbs from '@/stores/annies/shared/components/BreadCrumbs';
import { IBreadCrumbsData } from '@/stores/annies/shared/components/breadCrumbstype';
import useModel from '@/stores/annies/shared/hooks/use-model';
import AddShippingZipcode from '@/stores/annies/widgets/header/components/AddShippingZipcode';
import HeaderCart from '@/stores/annies/widgets/header/components/headerCart';
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

interface IProps {
  product: IShopBGardenProductDetail | null;
  productColor: IProductColor[] | null;
  breadCrumbs: IBreadCrumbsData[] | [];
  cmsStoreThemeConfigsViewModel: tStoreDetailsFile['cmsStoreThemeConfigsViewModel'];
}

const GardenProductInfo: React.FC<IProps> = ({
  product,
  breadCrumbs,
  cmsStoreThemeConfigsViewModel,
}) => {
  const { growingZone } = useAppSelector((state) => state.common);
  const [qunatityHandler, setQuantityHandler] = useState<boolean | undefined>(
    true,
  );
  const {
    isOpen: isShippingModalOpen,
    openModel: openShippingModal,
    onRequestClose: closeShippingModal,
  } = useModel(false);
  const {
    isOpen: isCartModalOpen,
    openModel: openCartModal,
    onRequestClose: closeCartModal,
  } = useModel(false);
  const [gardenData, setgardenData] = useState<
    Array<IProductDetails & { buyQuantity: number }>
  >([]);
  const [isShopGardenDisable, setIsShopGardenDisable] =
    useState<boolean>(false);

  useEffect(() => {
    const data12 = product?.storeProductDetailsViewModels.map((product) => {
      if (product.quantity == 0 || product?.inventory == 0) {
        setIsShopGardenDisable(true);
      }
      return {
        ...product,
        buyQuantity: product.quantity == 0 ? 0 : product.quantity,
      };
    });
    if (data12) setgardenData(data12);
  }, [product?.storeProductDetailsViewModels]);

  const qunatityCompare = () => {
    if (gardenData.length > 0) {
      return product?.storeProductDetailsViewModels
        .map((el, index) => {
          return el.quantity == gardenData[index]['buyQuantity'];
        })
        .every((match) => match);
    }
  };
  useEffect(() => {
    let qunatityCompared: boolean | undefined = qunatityCompare();
    setQuantityHandler(qunatityCompared);
  }, [gardenData]);
  return (
    <GardenProductInfoController
      config={{ showDescription: true, showRatings: true }}
      openModel={openCartModal}
      product={product}
      cases={{
        view: ({ config, GardenALLimage, addGardenToCart }) => {
          return (
            <>
              <BreadCrumbs breadCrumbs={breadCrumbs} bgColor={'bg-[#FCEDFF]'} />
              <section className='bg-[#FCEDFF] pt-[10px] pb-[30px]'>
                <div className='container mx-auto'>
                  <div className='grid grid-cols-12 gap-y-[20px]'>
                    <ProductImageController
                      configs={{}}
                      altImages={GardenALLimage}
                      cases={{
                        view: ({
                          selectedImage,
                          handleImageChange,
                          altImages,
                        }) => {
                          return (
                            <>
                              <div className='col-span-12 lg:col-span-6'>
                                <div className='grid grid-cols-12 gap-[10px] sticky top-[10px]'>
                                  <div
                                    className='col-span-12 md:col-span-2 sub-image order-2 lg:order-1 hidden md:block lg:block'
                                    id='img-scrollbar'
                                    style={{
                                      overflowY: 'scroll',
                                      height: '750px',
                                      scrollbarWidth: 'none',
                                    }}
                                  >
                                    {altImages &&
                                      altImages?.map((el, index) => {
                                        return (
                                          <div
                                            className='md:mb-[10px] last:mb-0'
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
                                                el?.imageUrl ==
                                                selectedImage?.imageUrl
                                                  ? 'border-[#9F2D3C]'
                                                  : 'border-transparent'
                                              } `}
                                            >
                                              <div className='rounded-tl-default rounded-br-default overflow-hidden sub-img-item border-[10px] border-transparent'>
                                                {el.imageUrl && !el.videoUrl ? (
                                                  <Image
                                                    src={el?.imageUrl!}
                                                    alt={el?.altTag!}
                                                    className='md:max-h-full rounded-tl-default rounded-br-default overflow-hidden'
                                                  />
                                                ) : (
                                                  <Video
                                                    className='w-full aspect-video'
                                                    isStatic={true}
                                                    src={el.videoUrl}
                                                    alt={el?.altTag}
                                                    allow={'picture-in-picture'}
                                                  />
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })}
                                  </div>
                                  <div className='shop-the-garden-carousel-container col-span-12 md:col-span-2 order-2 md:order-1 sub-img-slider flex md:hidden'>
                                    <MultiSlideCarousel
                                      slidesPerImage={4}
                                      totalItems={altImages?.length!}
                                    >
                                      {altImages &&
                                        altImages?.map((el, index) => {
                                          return (
                                            <>
                                              <div
                                                className='md:mb-[10px] last:mb-0'
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
                                                  className={`relative rounded-tl-default rounded-br-default overflow-hidden mb-[20px] mr-0 last:mb-0 border-[2px] ${
                                                    el?.imageUrl ==
                                                    selectedImage?.imageUrl
                                                      ? 'border-[#9F2D3C]'
                                                      : 'border-transparent'
                                                  } `}
                                                >
                                                  <div className='rounded-tl-default rounded-br-default overflow-hidden sub-img-item border-[10px] border-transparent'>
                                                    {el.imageUrl &&
                                                    !el.videoUrl ? (
                                                      <Image
                                                        src={el?.imageUrl!}
                                                        alt={el?.altTag!}
                                                        className='md:max-h-full rounded-tl-default rounded-br-default overflow-hidden'
                                                      />
                                                    ) : (
                                                      <Video
                                                        className='w-full aspect-video'
                                                        isStatic={true}
                                                        src={el.videoUrl}
                                                        alt={el?.altTag}
                                                        allow={
                                                          'picture-in-picture'
                                                        }
                                                      />
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            </>
                                          );
                                        })}
                                    </MultiSlideCarousel>
                                  </div>
                                  <div className='col-span-12 md:col-span-10 order-1 md:order-2 main-image-outer'>
                                    <div className='main-image rounded-tl-2xl rounded-br-2xl overflow-hidden px-[2px]'>
                                      {selectedImage.imageUrl &&
                                      !selectedImage.videoUrl ? (
                                        <Image
                                          src={selectedImage?.imageUrl!}
                                          alt={selectedImage?.alt}
                                          className='md:max-h-full rounded-tl-default rounded-br-default overflow-hidden'
                                        />
                                      ) : (
                                        <Video
                                          className='w-full aspect-video'
                                          isStatic={true}
                                          src={selectedImage?.videoUrl}
                                          alt={selectedImage?.alt}
                                          allow={'autoplay'}
                                        />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        },
                      }}
                    />
                    <div className='col-span-12 lg:col-span-6'>
                      <div className='pl-0 lg:pl-[70px]'>
                        <div className='font-sub font-bold text-2xl-text'>
                          {product?.categoryModels[0].categoryName}
                        </div>
                        <div className='text-small-text font-semibold   mt-[15px]'>
                          {
                            <button
                              disabled={
                                isShopGardenDisable == false
                                  ? !qunatityHandler
                                  : isShopGardenDisable
                              }
                              className='w-full bg-primary text-white font-extrabold uppercase rounded-xs px-[30px] py-[15px] cursor-pointer'
                              style={{
                                opacity:
                                  !qunatityHandler || isShopGardenDisable
                                    ? 0.8
                                    : 1,
                              }}
                              onClick={() => {
                                addGardenToCart(
                                  product?.categoryModels[0],
                                  product?.salePrice || 0,
                                  product?.msrp || 0,
                                );
                              }}
                            >
                              {`Buy Entire Garden - $${getPriceWithMsrpAndSalePrice(
                                product?.salePrice || 0,
                                product?.msrp || 0,
                              )}`}
                            </button>
                          }
                        </div>
                        <div className='mainsection'>
                          {product?.storeProductDetailsViewModels.map(
                            (el, index) => {
                              // const genusSpeciesName = el?.customFields.filter(
                              //   (el) => el.label == 'GENUS SPECIES NAME',
                              // )[0]?.value;
                              let CommonName: string = '';
                              let CultivarName: string = '';
                              let prefferedCommonName: string = '';

                              el?.customFields.map((el1) => {
                                if (el1.label.toUpperCase() == 'COMMON NAME') {
                                  CommonName = el1.value;
                                }
                                if (
                                  el1.label.toUpperCase() == 'CULTIVAR NAME'
                                ) {
                                  CultivarName = el1.value;
                                }
                                if (
                                  el1.label.toUpperCase() ==
                                  'PREFERRED COMMON NAME'
                                ) {
                                  prefferedCommonName = el1.value;
                                }
                              });
                              return (
                                <React.Fragment key={index}>
                                  <ProductCard
                                    el={el}
                                    CommonName={CommonName}
                                    CultivarName={CultivarName}
                                    prefferedCommonName={prefferedCommonName}
                                    cmsStoreThemeConfigsViewModel={
                                      cmsStoreThemeConfigsViewModel
                                    }
                                    openShippingModal={openShippingModal}
                                    index={index}
                                    setgardenData={setgardenData}
                                    gardenData={gardenData}
                                    setQuantityHandler={setQuantityHandler}
                                  />
                                </React.Fragment>
                              );
                            },
                          )}
                          {/* [bg-[#FFF0ED],bg-[#EDFBF6],bg-[#F6EDF6],bg-[#F1FFED]  ] */}
                          <div className='border border-primary rounded-[5px] items-center flex justify-start p-[20px] mb-[15px] mt-[15px]'>
                            <div className='w-1/2 mx-auto relative'>
                              {growingZone.zoneName && (
                                <div className='font-sub text-normal-text font-semibold pb-[10px]'>
                                  Your Garden Zone is
                                </div>
                              )}
                              {growingZone.zoneName && (
                                <div className='text-small-text font-sub mb-[10px]'>
                                  {growingZone.stateName},{' '}
                                  {growingZone.stateCode} {growingZone.zipCode}
                                </div>
                              )}
                              <button
                                onClick={openShippingModal}
                                className='text-small-text font-sub underline hover:no-underline'
                              >
                                {growingZone.zoneName ? 'Change' : 'Add'} My
                                Zone
                              </button>
                            </div>

                            <div className='w-1/2 mb-[10px]'>
                              {growingZone.zoneName && (
                                <span className='min-w-[100px] inline-block text-center rounded-xs border border-primary p-[10px]'>
                                  <div className='text-sub-text font-semibold'>
                                    {growingZone.zoneName}
                                  </div>
                                </span>
                              )}
                            </div>
                          </div>

                          {/* <div className='text-small-text font-semibold mb-[15px]'>
                            <span className='text-[#9C331C]'>
                              This product will begin shipping the week of
                              09/11/2023
                            </span>
                          </div>  */}

                          <ProductDetailInfoController
                            config={{}}
                            cases={{
                              view: ({
                                config,
                                activeDropDown,
                                setActiveDropDown,
                              }) => {
                                return (
                                  <>
                                    {product?.categoryModels[0].description && (
                                      <>
                                        <div
                                          className='text-title-text font-sub font-semibold flex items-center justify-between mb-[10px] pt-[15px] border-t border-gray-border cursor-pointer'
                                          onClick={() =>
                                            setActiveDropDown(!activeDropDown)
                                          }
                                        >
                                          <div>Description</div>
                                          <div className=''>
                                            <span className='material-icons-outlined'>
                                              {activeDropDown
                                                ? 'remove'
                                                : 'add'}
                                            </span>
                                          </div>
                                        </div>
                                        {activeDropDown && (
                                          <div
                                            className='text-default-text'
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                product?.categoryModels[0]
                                                  .description,
                                            }}
                                          ></div>
                                        )}
                                      </>
                                    )}
                                  </>
                                );
                              },
                            }}
                          />
                          {/* <ProductDetailInfoController
                            config={{}}
                            cases={{
                              view: ({
                                config,
                                activeDropDown,
                                setActiveDropDown,
                              }) => {
                                return (
                                  <>
                                    {product?.categoryModels[0]
                                      .seDescription && (
                                      <>
                                        <div
                                          className='text-title-text font-sub font-semibold flex items-center justify-between mb-[10px] pt-[15px] border-t border-gray-border cursor-pointer'
                                          onClick={() =>
                                            setActiveDropDown(!activeDropDown)
                                          }
                                        >
                                          <div>100% Guarantee</div>
                                          <div className=''>
                                            <span className='material-icons-outlined'>
                                              {activeDropDown
                                                ? 'remove'
                                                : 'add'}
                                            </span>
                                          </div>
                                        </div>
                                        {activeDropDown && (
                                          <div
                                            className='text-default-text'
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                product?.categoryModels[0]
                                                  .seDescription,
                                            }}
                                          ></div>
                                        )}
                                      </>
                                    )}
                                  </>
                                );
                              },
                            }}
                          /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {isShippingModalOpen && (
                <AddShippingZipcode closeModal={closeShippingModal} />
              )}
              {isCartModalOpen && (
                <HeaderCart
                  closeCart={closeCartModal}
                  cmsStoreThemeConfigsViewModel={cmsStoreThemeConfigsViewModel}
                />
              )}
            </>
          );
        },
      }}
    />
  );
};

export default GardenProductInfo;
