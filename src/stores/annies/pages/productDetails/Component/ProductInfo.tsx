import ProductInfoController from '@/features/product/productDetail/productInfoSection/controller';
import { tStoreDetailsFile } from '@/helper/staticfile.helper';
import CustomLink from '@/shared/Components/CustomLink';
import PriceLabel from '@/shared/Components/PriceLabel';
import {
  IProductColor,
  IProductDetails,
  IProductRatings,
  IProductReviews,
} from '@/shared/types/product';
import { getUserId } from '@/shared/utils/cookie.helper';
import BreadCrumbs from '@/stores/annies/shared/components/BreadCrumbs';
import { IBreadCrumbsData } from '@/stores/annies/shared/components/breadCrumbstype';
import HeaderCart from '@/stores/annies/widgets/header/components/headerCart';
import { paths } from '@/utils/paths.constant';
import { useRouter } from 'next/navigation';
import React from 'react';
import StarRatings from '../../../shared/components/StarRatings';
import ProductColorAndSize from './ProductColorAndSize';
import ProductDesc from './ProductDescription';
import ProductGurantee from './ProductGuarantee';
import ProductImg from './ProductImg';
import ProductInformation from './ProductInformation';
import ProductReview from './ProductReview';
import ProductShipComp from './ProductShipComp';
import ProductSpecialFeature from './ProductSpeacialFeatures';
import ProductUses from './ProductUses';
import QuantityInput from './QuantityInput';

interface IProps {
  product: IProductDetails | null;
  totalReviewCount: number;
  avgReviewrating: number;
  productRatings: IProductRatings | null;
  productReviews: IProductReviews[] | null;
  productColor: IProductColor[] | null;
  breadCrumbs: IBreadCrumbsData[] | [];
  cmsStoreThemeConfigsViewModel: tStoreDetailsFile['cmsStoreThemeConfigsViewModel'];
}

const ProductInfo: React.FC<IProps> = ({
  product,
  avgReviewrating,
  totalReviewCount,
  productReviews,
  productRatings,
  productColor,
  breadCrumbs,
  cmsStoreThemeConfigsViewModel,
}) => {
  // const genusSpeciesName = product?.customFields.filter(
  //   (el) => el.label == 'GENUS SPECIES NAME',
  // )[0]?.value;
  let CommonName: string;
  let CultivarName: string;
  let prefferedCommonName: string;
  let secondaryCommonName: string;
  let RestrictState: string;
  let plantType = '';
  product?.filterFacetFields?.map((el) => {
    if (el.name.toLowerCase() == 'plant type') {
      plantType = el.values.map((el1) => el1.value).join(', ');
    }
  });
  const isGiftProduct =
    plantType != '' && plantType.toLocaleLowerCase().includes('gifts');

  product?.customFields?.map((el) => {
    if (el.label.toUpperCase() == 'COMMON NAME') {
      CommonName = el.value;
    }
    if (el.label.toUpperCase() == 'CULTIVAR NAME') {
      CultivarName = el.value;
    }
    if (el.label.toUpperCase() == 'PREFERRED COMMON NAME') {
      prefferedCommonName = el.value;
    }
    if (el.label.toUpperCase() == 'SECONDARY COMMON NAME') {
      secondaryCommonName = el.value;
    }
    if (el.label.toUpperCase() == 'Restrict Ship To State'.toUpperCase()) {
      RestrictState = el.value;
    }
  });
  const router = useRouter();
  const userId = getUserId();
  const shippingDate = new Date(product?.shippingDate!)
    .toDateString()
    .split(' ');

  const futureInventoryDate = new Date(product?.futureInventoryDate!)
    .toDateString()
    .split(' ');

  return (
    <ProductInfoController
      config={{ showDescription: true, showRatings: true, productPage: true }}
      productColor={productColor}
      product={product}
      cases={{
        view: ({
          config,
          quantity,
          handleQuantityChange,
          handleAddToCart,
          changeColorHandler,
          selectedColor,
          inventoryData,
          setSelectedSize,
          selectedSize,
          wishListId,
          removeFromWishlist,
          addToWishlist,
          onRequestClose,
          isOpen,
          DiscountPriceTable,
          productPrice,
        }) => {
          const wishlistClick = () => {
            if (userId) {
              wishListId === 0
                ? addToWishlist(product?.id!, product?.name!)
                : removeFromWishlist(wishListId);
              return;
            }
            return router.push(
              `${paths.login}?redirect=/${product?.seName!}.html`,
            );
          };
          const scrollToReview = () => {
            var targetElement = document.getElementById('ReviewSection');
            targetElement?.scrollIntoView({ behavior: 'smooth' });
          };

          const showText = () => {
            if (
              (product?.sizes && selectedSize?.inventory) ||
              (!product?.sizes && product?.quantity)
            ) {
              return '';
            } else if (
              product?.futureInventoryDate &&
              product?.futureInventory
            ) {
              return `This pre-order will start shipping in
              ${futureInventoryDate[1]}, ${futureInventoryDate[3]}`;
            }
            return '';
          };
          return (
            <>
              <BreadCrumbs breadCrumbs={breadCrumbs} />
              <section className='bg-tertiary'>
                <div className='container mx-auto'>
                  <div
                    className='pt-[10px] pb-[30px]'
                    itemType='https://schema.org/Product'
                    itemScope
                  >
                    <div className='grid grid-cols-12 gap-y-[20px]'>
                      <div className='col-span-12 lg:col-span-6'>
                        <ProductImg
                          selectedColor={selectedColor}
                          product={product}
                        />
                      </div>
                      <div className='col-span-12 lg:col-span-6'>
                        <div className='pl-0 lg:pl-[70px]'>
                          <meta itemProp='name' content={product?.name} />
                          <h1 className='text-2xl-text font-bold font-sub'>
                            {' '}
                            {product?.name}
                          </h1>
                          {(CultivarName || CommonName) && (
                            <div className='text-sub-text font-sub opacity-80 pt-[10px] font-bold'>
                              {CultivarName && (
                                <h2>
                                  {`${CultivarName}${CommonName ? ',' : ''} `}
                                </h2>
                              )}
                              {CommonName && <h2>{`${CommonName}`}</h2>}
                            </div>
                          )}
                          {prefferedCommonName ||
                            (secondaryCommonName && (
                              <div className='text-sub-text font-sub opacity-80 pt-[10px] mb-[10px] flex flex-wrap'>
                                {prefferedCommonName && (
                                  <h2>
                                    {`${prefferedCommonName}${
                                      secondaryCommonName ? ',' : ''
                                    } `}
                                  </h2>
                                )}
                                {secondaryCommonName && (
                                  <h2>{`${secondaryCommonName}`}</h2>
                                )}
                              </div>
                            ))}

                          {config.showRatings && (
                            <div className='text-extra-small-text mb-[15px] flex flex-wrap items-center gap-[8px]'>
                              <div
                                className='flex flex-wrap items-center gap-[8px]'
                                onClick={scrollToReview}
                              >
                                <div className=''>
                                  <StarRatings
                                    rating={avgReviewrating}
                                    textsize={'text-sm'}
                                  />
                                </div>
                                <div>{avgReviewrating} </div>
                                <div
                                  className=''
                                  itemProp='aggregateRating'
                                  itemType='https://schema.org/AggregateRating'
                                  itemScope
                                >
                                  <meta
                                    itemProp='reviewCount'
                                    content={`${totalReviewCount}`}
                                  />
                                  <meta
                                    itemProp='ratingValue'
                                    content={productRatings?.ratingAverage}
                                  />
                                  <div className='underline'>
                                    {totalReviewCount} Reviews
                                  </div>
                                </div>
                              </div>
                              <div className=''>
                                <CustomLink
                                  href={
                                    userId
                                      ? `${paths.writeReview}?productId=${
                                          product?.id
                                        }&&attributeId=${
                                          selectedColor?.attributeOptionId || 0
                                        }&&reviewId=0`
                                      : `${paths.login}?redirect=${
                                          paths.writeReview
                                        }?productId=${
                                          product?.id
                                        }&&attributeId=${
                                          selectedColor?.attributeOptionId || 0
                                        }`
                                  }
                                  className='underline'
                                >
                                  Write a review
                                </CustomLink>
                              </div>
                            </div>
                          )}
                          {!product?.sizes &&
                            !(product?.isGiftCardProduct || isGiftProduct) && (
                              <ProductShipComp
                                product={product}
                                DiscountPriceTable={DiscountPriceTable}
                              />
                            )}

                          {product?.sizes &&
                            !(product?.isGiftCardProduct || isGiftProduct) && (
                              <ProductColorAndSize
                                productColor={productColor}
                                productId={product.sku}
                                changeColorHandler={changeColorHandler}
                                selectedColor={selectedColor}
                                inventoryData={inventoryData}
                                setSelectedSize={setSelectedSize}
                                selectedSize={selectedSize}
                              />
                            )}
                          {/* {productColor?.map((el=>))} */}
                          {/* <PriceLabelDetails
                            salePrice={product?.salePrice || 0}
                            msrp={product?.msrp || 0}
                          /> */}
                          <PriceLabel
                            className={'text-large-text font-bold mb-[15px]'}
                            price={productPrice}
                          />
                          {/* {getPriceWithMsrpAndSalePriceInDetailPage(
                            product?.salePrice || 0,
                            product?.msrp || 0,
                          )} */}
                          <QuantityInput
                            product={product}
                            handleAddToCart={handleAddToCart}
                            handleQuantityChange={handleQuantityChange}
                            quantityValue={quantity}
                            showWishList={true}
                            productPage={true}
                            wishlistClickHandler={wishlistClick}
                            wishListId={wishListId}
                            selectedSize={selectedSize}
                          />

                          {!(product?.isGiftCardProduct || isGiftProduct) && (
                            <div className='w-full pb-[15px]'>
                              {product?.quantity !== 0 &&
                                !product?.isDiscontinue && (
                                  <div className='text-small-text font-sub font-bold mb-[10px]'>
                                    Estimated Shipping Date:
                                  </div>
                                )}
                              <div className='w-full'>
                                <div className='w-full border border-[#B3B3B3] rounded-[5px]'>
                                  <div className='text-small-text font-sub'>
                                    {product?.quantity !== 0 &&
                                      !product?.isDiscontinue && (
                                        <div className='text-[#9C331C] py-[5px] px-[10px]'>
                                          {`Shipping Begins The Week Of ${shippingDate[1]} ${shippingDate[2]}, ${shippingDate[3]}`}
                                        </div>
                                      )}
                                    {showText() !== '' && (
                                      <div className='text-[#9C331C] py-[10px] px-[10px]'>
                                        {/* {product?.futureInventory &&
                                        product!.isAddToCart
                                          ? `This pre-order will start shipping in
                                        ${futureInventoryDate[1]} ${futureInventoryDate[2]}, ${futureInventoryDate[3]}`
                                          : `Eliminate reference to future inventory`} */}
                                        {showText()}
                                      </div>
                                    )}
                                    {RestrictState && (
                                      <div className='py-[5px] px-[10px] whitespace-'>
                                        Cannot ship to:{' '}
                                        {RestrictState.replaceAll(',', ', ')}
                                      </div>
                                    )}

                                    <div className='py-[5px] px-[10px] font-semibold'>
                                      For your convenience, we ship in boxes of
                                      4, 6, 8 or 12
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          {/* <div className='mb-[40px] font-semibold italic text-small-text'>
                            We will email you as soon as the plant is available
                          </div> */}
                          <ProductDesc product={product} />
                          <ProductInformation
                            productCustomField={product?.customFields!}
                            producFilterFacetFields={
                              product?.filterFacetFields!
                            }
                            productId={product?.sku!}
                          />
                          <ProductSpecialFeature
                            producFilterFacetFields={
                              product?.filterFacetFields!
                            }
                          />
                          <ProductUses
                            producFilterFacetFields={
                              product?.filterFacetFields!
                            }
                          />
                          <ProductGurantee product={product} />
                          <ProductReview
                            productRatings={productRatings}
                            productReviews={productReviews}
                            productId={product?.id!}
                            seName={product?.seName!}
                            attributeId={product?.attributeOptionId!}
                          />
                        </div>
                      </div>
                    </div>
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
              </section>
            </>
          );
        },
      }}
    />
  );
};

export default ProductInfo;
