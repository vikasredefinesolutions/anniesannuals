import {
  IProductsAlike,
  fetchProductColors,
  fetchProductRatings,
  fetchProductReviews,
  fetchYouAlsoLikeProduct,
  getProductDetailsBySeName,
} from '@/shared/apis/product/product';
import { activeStoreName } from '@/shared/configs';
import {
  IProductDetails,
  IProductRatings,
  IProductReviews,
} from '@/shared/types/product';
import { getStaticStoreDetails } from '@/helper/staticfile.helper';
import dynamic from 'next/dynamic';
import React from 'react';
const DynamicProductDetailPage: React.ComponentType<IProps> = dynamic(
  () => import(`../../../${activeStoreName}/pages/productDetails`),
);

interface IProps {
  product: IProductDetails | null;
  aLikeProducts: IProductsAlike[] | null;
  productRatings: IProductRatings | null;
  productReviews: IProductReviews[] | null;
}
export default async function ProductDetail({
  params,
}: {
  params: { seName: string };
}) {
  const { storeId } = await getStaticStoreDetails();
  const slug = params?.seName.replace('.html', '');
  const productData = await getProductDetailsBySeName(slug, storeId, 0);
  const productColor = await fetchProductColors(productData?.id!);
  const aLikeProducts = await fetchYouAlsoLikeProduct(
    productData?.id!,
    storeId,
  );
  const productRatings = await fetchProductRatings(productData?.id!);
  const productReviews = await fetchProductReviews(productData?.id!);

  if (!productReviews) return null;

  return (
    <DynamicProductDetailPage
      product={{
        ...productData!,
        seName: productColor ? productColor[0]?.productSEName : '',
        imageUrl: productColor ? productColor[0]?.imageUrl : '',
        attributeOptionId: productColor
          ? productColor[0]?.attributeOptionId
          : 0,
        attributeOptionValue: productColor ? productColor[0]?.name : '',
      }}
      aLikeProducts={aLikeProducts}
      productRatings={productRatings}
      productReviews={productReviews}
    />
  );
}
