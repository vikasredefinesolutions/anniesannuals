'use client';
import ProductController from '@/features/product/productDetail/productSection/controller';
import { tStoreDetailsFile } from '@/helper/staticfile.helper';
import { IProductsAlike } from '@/shared/apis/product/product';
import {
  IProductColor,
  IProductDetails,
  IProductRatings,
  IProductReviews,
  IProductsRecentlyViewedResponse,
} from '@/shared/types/product';
import { getUserId } from '@/shared/utils/cookie.helper';
import { PixelTracker } from '@/shared/utils/facebookPixel';
import { GoogleAnalyticsTracker } from '@/shared/utils/googleAnalytics';
import { generateGA4ProductCategories } from '@/utils/helpers';
import React, { useEffect } from 'react';
import ProductSuggestions from '../../shared/components/ProductSuggestion';
import { IBreadCrumbsData } from '../../shared/components/breadCrumbstype';
import ProductInfo from './Component/ProductInfo';

interface IProps {
  product: IProductDetails | null;
  aLikeProducts: IProductsAlike[] | null;
  productRatings: IProductRatings | null;
  productReviews: IProductReviews[] | null;
  productColor: IProductColor[] | null;
  recentlyViewedProduct: IProductsRecentlyViewedResponse[] | null;
  breadCrumbs: IBreadCrumbsData[] | [];
  storeId: number;
  cmsStoreThemeConfigsViewModel: tStoreDetailsFile['cmsStoreThemeConfigsViewModel'];
}

const ProductDetail: React.FC<IProps> = ({
  product,
  aLikeProducts,
  productRatings,
  productReviews,
  productColor,
  recentlyViewedProduct,
  breadCrumbs,
  storeId,
  cmsStoreThemeConfigsViewModel,
}) => {
  useEffect(() => {
    const userId = getUserId();
    const gtmPayload = {
      storeId: storeId,
      customerId: userId || 0,
      productId: product?.id,
      productName: product?.name,
      colorName: productColor?.length
        ? productColor?.find((item) => item.productId === product?.id)
            ?.attributeOptionId
        : '',
      price: product?.msrp,
      salesPrice: product?.salePrice,
      sku: product?.sku,
      brandName: product?.brandName || 'Annies',
      quantity: product?.quantity,
      itemListName: breadCrumbs?.length > 1 ? breadCrumbs?.pop()?.name : '',
      itemListId: '',
      ...generateGA4ProductCategories(product?.filterFacetFields || []),
    };
    const pixelPayload = {
      value: product?.msrp,
      currency: 'USD',
      content_name: product?.name,
      content_type: product?.categoryName,
      content_ids: product?.id,
    };

    // Track ViewContent event when the component mounts
    PixelTracker('track', 'ViewContent', pixelPayload);
    GoogleAnalyticsTracker('GoogleProductDetailScript', gtmPayload);
  }, []);

  return (
    <>
      <ProductController
        config={{
          showMoreInfo: true,
          showReviewsRatings: true,
          showYouMayAsloLike: Boolean(aLikeProducts?.length),
          showRecentlyViewedProduct: Boolean(aLikeProducts?.length),
          showRandomReview: Boolean(productReviews?.length),
        }}
        cases={{
          view: ({ config }) => {
            return (
              <>
                <ProductInfo
                  product={product}
                  productReviews={productReviews}
                  productRatings={productRatings}
                  avgReviewrating={parseFloat(
                    productRatings?.ratingAverage || '0',
                  )}
                  totalReviewCount={productRatings?.totalRatingCount!}
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
    </>
  );
};

export default ProductDetail;
