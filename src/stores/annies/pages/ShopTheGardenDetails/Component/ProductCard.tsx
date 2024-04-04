import { useAppSelector } from '@/app/redux/hooks';
import ProductInfoController from '@/features/product/productDetail/productInfoSection/controller';
import { tStoreDetailsFile } from '@/helper/staticfile.helper';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import PriceLabel from '@/shared/Components/PriceLabel';
import { IProductDetails } from '@/shared/types/product';
import { getUserId } from '@/shared/utils/cookie.helper';
import StarRatings from '@/stores/annies/shared/components/StarRatings';
import HeaderCart from '@/stores/annies/widgets/header/components/headerCart';
import { paths } from '@/utils/paths.constant';
import { useRouter } from 'next/navigation';
import React from 'react';
import QuantityInput from '../../productDetails/Component/QuantityInput';

interface IProps {
  el: IProductDetails & { inventory: number };
  CommonName: string;
  CultivarName: string;
  prefferedCommonName: string;
  cmsStoreThemeConfigsViewModel: tStoreDetailsFile['cmsStoreThemeConfigsViewModel'];
  openShippingModal: () => void;
  index: number;
  setgardenData: (
    gardenDataArray: Array<IProductDetails & { buyQuantity: number }>,
  ) => void;
  gardenData: Array<IProductDetails & { buyQuantity: number }>;
  setQuantityHandler: any;
}

const ProductCard: React.FC<IProps> = ({
  el,
  CommonName,
  CultivarName,
  prefferedCommonName,
  cmsStoreThemeConfigsViewModel,
  openShippingModal,
  index,
  setgardenData,
  gardenData,
  setQuantityHandler,
}) => {
  const { growingZone } = useAppSelector((state) => state.common);
  const { zipCode } = useAppSelector((state) => state.common.growingZone);

  const router = useRouter();
  const userId = getUserId();
  const bgColor = [
    'bg-[#FFF0ED]',
    'bg-[#F1FFED]',
    'bg-[#EDFBF6]',
    'bg-[#F6EDF6]',
  ];

  return (
    <>
      <ProductInfoController
        config={{
          showDescription: true,
          showRatings: true,
        }}
        product={el}
        setQuantityHandler={setQuantityHandler}
        setgardenData={setgardenData}
        gardenData={gardenData}
        cases={{
          view: ({
            config,
            quantity,
            handleQuantityChange,
            handleAddToCart,
            changeColorHandler,
            inventoryData,
            setSelectedSize,
            selectedSize,
            wishListId,
            removeFromWishlist,
            addToWishlist,
            isOpen,
            onRequestClose,
          }) => {
            const wishlistClick = () => {
              if (userId) {
                wishListId === 0
                  ? addToWishlist(el?.id!, el?.name!)
                  : removeFromWishlist(wishListId);
                return;
              }
              return router.push(
                `${paths.login}?redirect=/${el?.seName!}.html`,
              );
            };
            return (
              <div
                className={`${bgColor[index % bgColor.length]}
              ${
                index == 0 ? `mt-[15px]` : `mt-[30px]`
              }  rounded-tl-xl rounded-br-xl shadow-[0px_2px_2px_rgba(0,0,0,0.1)] `}
              >
                {/* px-[20px] py-[20px] lg:px-[30px] lg:py-[20px] */}
                <div className='flex flex-wrap justify-start p-[20px]'>
                  <div className='w-full md:w-1/6'>
                    <div className='w-full md:w-auto rounded-sm overflow-hidden'>
                      <CustomLink href={`/${el.seName}.html`}>
                        <Image
                          src={el.attributeImagesViewModels[0].imageUrl}
                          alt={''}
                        />
                      </CustomLink>
                    </div>
                  </div>
                  <div className='w-full md:w-5/6 py-[20px] sm:pl-[15px] pl-[0px] md:pt-0 md:pb-0'>
                    <div className='text-default-text'>
                      <CustomLink href={`/${el.seName}.html`}>
                        <h1 className='text-title-text font-bold pb-[5px] font-sub'>
                          {el.name}
                        </h1>
                      </CustomLink>
                      <div className='mb-[15px] flex flex-wrap'>
                        {CultivarName && (
                          <div className='text-small-text text-default-text w-full font-bold mb-[5px] leading-none'>
                            {CultivarName}
                          </div>
                        )}
                      </div>
                      <div className='text-small-text text-default-text mb-[5px] w-full leading-none'>
                        {prefferedCommonName}
                      </div>
                      <div className='mb-[15px] flex flex-wrap items-center gap-[8px]'>
                        <StarRatings
                          rating={+el.productRatingAverage}
                          textsize={'text-[16px]'}
                        />
                        <div className=''>
                          {Number(el.productRatingAverage).toFixed(2)}
                        </div>
                      </div>
                      <div className='w-full pb-[15px]'>
                        <PriceLabel
                          className={'text-title-text font-bold pb-[5px]'}
                          price={el?.msrp}
                        />
                        {/* <div className='font-semibold pb-[15px] text-[#02573A]'>
                    Order more to save! 3+ for $11.95
                  </div> */}
                      </div>
                    </div>
                    <QuantityInput
                      product={el}
                      handleAddToCart={handleAddToCart}
                      handleQuantityChange={handleQuantityChange}
                      quantityValue={quantity}
                      showWishList={true}
                      wishlistClickHandler={wishlistClick}
                      wishListId={wishListId}
                      productPage={false}
                      gardenProducInventory={el.inventory}
                    />

                    {/* <div className=''>
                    <span className='text-default-text'>
                      <div className='text-default-text mb-[20px] font-sub font-semibold flex items-center gap-[12px]'>
                        <div className='flex items-center whitespace-nowrap gap-[8px] mb-[20px] sm:mb-0'>
                          <div className=''>Shipping to</div>
                          <div className=''>
                            {growingZone.stateCode} {growingZone.zipCode}
                          </div>
                        </div>
                        <div className='flex flex-wrap items-center gap-[8px]'>
                          <div className='bg-[#3B5697] bg-opacity-30 rounded-xs flex items-end gap-[5px] py-[7px] px-[18px]'>
                            <div className='text-extra-small-text'>ZONE:</div>
                            <div className='text-normal-text font-semibold'>
                              {growingZone.zoneName}
                            </div>
                          </div>
                          <div className=''>
                            {zipCode ? (
                              <p
                                className='inline-block font-extrabold text-primary uppercase underline cursor-pointer'
                                onClick={openShippingModal}
                              >
                                {zipCode}
                              </p>
                            ) : (
                              <button
                                onClick={openShippingModal}
                                className='inline-block font-extrabold text-primary uppercase underline'
                              >
                                Add zip
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </span>
                  </div> */}
                  </div>
                </div>
                {isOpen && (
                  <HeaderCart
                    closeCart={onRequestClose}
                    cmsStoreThemeConfigsViewModel={
                      cmsStoreThemeConfigsViewModel
                    }
                  />
                )}
              </div>
            );
          },
        }}
      />
    </>
  );
};

export default ProductCard;
