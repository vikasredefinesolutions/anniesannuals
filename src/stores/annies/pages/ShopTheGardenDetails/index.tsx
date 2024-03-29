'use client';
import ProductController from '@/features/product/productDetail/productSection/controller';
import { tStoreDetailsFile } from '@/helper/staticfile.helper';
import CustomLink from '@/shared/Components/CustomLink';
import { IProductsAlike } from '@/shared/apis/product/product';
import {
  IProductColor,
  IProductRatings,
  IProductReviews,
  IProductsRecentlyViewedResponse,
  IShopBGardenProductDetail,
} from '@/shared/types/product';
import { getStoreId, getUserId } from '@/shared/utils/cookie.helper';
import { PixelTracker } from '@/shared/utils/facebookPixel';
import { GoogleAnalyticsTracker } from '@/shared/utils/googleAnalytics';
import React, { useEffect } from 'react';
import ProductSuggestions from '../../shared/components/ProductSuggestion';
import { IBreadCrumbsData } from '../../shared/components/breadCrumbstype';
import GardenProductInfo from './Component/GardenProductInfo';

interface IProps {
  product: IShopBGardenProductDetail | null;
  aLikeProducts: IProductsAlike[] | null;
  productRatings: IProductRatings | null;
  productReviews: IProductReviews[] | null;
  productColor: IProductColor[] | null;
  recentlyViewedProduct: IProductsRecentlyViewedResponse[] | null;
  breadCrumbs: IBreadCrumbsData[] | [];
  cmsStoreThemeConfigsViewModel: tStoreDetailsFile['cmsStoreThemeConfigsViewModel'];
}

const ShopTheProductDetail: React.FC<IProps> = ({
  product,
  aLikeProducts,
  productColor,
  recentlyViewedProduct,
  breadCrumbs,
  cmsStoreThemeConfigsViewModel,
}) => {
  useEffect(() => {
    const userId = getUserId();
    const storeId = getStoreId();
    const gtmPayload = {
      storeId: storeId,
      customerId: userId || 0,
      productId: product?.categoryModels?.[0]?.id,
      productName: product?.categoryModels?.[0]?.categoryName,
      colorName: productColor?.length
        ? productColor?.find(
            (item) => item.productId === product?.categoryModels?.[0]?.id,
          )?.attributeOptionId
        : '',
      price: product?.msrp,
      salesPrice: product?.salePrice,
      sku: product?.ourSku || product?.categoryModels?.[0]?.categoryName,
      brandName: 'Annies',
      quantity: 1,
      itemListName: breadCrumbs?.length > 1 ? breadCrumbs?.pop()?.name : '',
      itemListId: '',
      productMainCategory: '',
      category1: '',
      category2: '',
      category3: '',
    };
    const pixelPayload = {
      value: product?.msrp,
      currency: 'USD',
      content_name: product?.categoryModels?.[0]?.categoryName,
      content_type: product?.categoryModels?.[0]?.categoryName,
      content_ids: product?.categoryModels?.[0]?.id,
    };

    // Track ViewContent event when the component mounts
    PixelTracker('track', 'ViewContent', pixelPayload);
    GoogleAnalyticsTracker('GoogleProductDetailScript', gtmPayload);
  }, []);
  return (
    <ProductController
      config={{
        showMoreInfo: true,
        showReviewsRatings: true,
        showYouMayAsloLike: Boolean(aLikeProducts?.length),
        showRecentlyViewedProduct: Boolean(aLikeProducts?.length),
        showRandomReview: Boolean(false),
      }}
      cases={{
        view: ({ config }) => {
          return (
            <>
              <section className={'bg-tertiary'}>
                <div className="bg-[url('./images/results-section-bottom-floral.png')] bg-bottom bg-contain bg-no-repeat">
                  <div className='container mx-auto relative'>
                    <div className='pt-[30px] pb-[10px]'>
                      <div className=''>
                        <ul className='flex flex-wrap items-center gap-[10px] text-[14px] font-semibold font-sub'>
                          <React.Fragment>
                            <li>
                              <CustomLink
                                href='/'
                                className='inline-flex items-center'
                              >
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='21.621'
                                  height='19.897'
                                  viewBox='0 0 21.621 19.897'
                                >
                                  <path
                                    id='Path_48756'
                                    data-name='Path 48756'
                                    d='M2.25,12,11.2,3.045a1.126,1.126,0,0,1,1.591,0L21.75,12M4.5,9.75V19.875A1.125,1.125,0,0,0,5.625,21H9.75V16.125A1.125,1.125,0,0,1,10.875,15h2.25a1.125,1.125,0,0,1,1.125,1.125V21h4.125A1.125,1.125,0,0,0,19.5,19.875V9.75M8.25,21H16.5'
                                    transform='translate(-1.189 -1.853)'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='1.5'
                                  ></path>
                                </svg>
                              </CustomLink>
                            </li>

                            <li className=''>/</li>
                            <li className=''>
                              <CustomLink
                                href='/shop-the-garden.html'
                                title='/'
                              >
                                Shop The Garden
                              </CustomLink>
                            </li>
                          </React.Fragment>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <GardenProductInfo
                product={product}
                productColor={productColor}
                breadCrumbs={breadCrumbs}
                cmsStoreThemeConfigsViewModel={cmsStoreThemeConfigsViewModel}
              />

              {config.showYouMayAsloLike && (
                <ProductSuggestions
                  alikeproduct={aLikeProducts}
                  title={'You Might Also Like'}
                />
              )}
              {config.showYouMayAsloLike && (
                <ProductSuggestions
                  alikeproduct={recentlyViewedProduct}
                  title={'Recently Viewed'}
                />
              )}
            </>
          );
        },
      }}
    />
  );
};

export default ShopTheProductDetail;
