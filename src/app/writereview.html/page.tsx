import dynamic from 'next/dynamic';
import { activeStoreName } from '@/shared/configs';
import {
  fetchProductColors,
  getProductDetailsBySeName,
} from '@/shared/apis/product/product';
import { IReviewProduct } from '@/shared/types/product';
import storeDetails from '@/staticData/storeDetails.json';

interface _Props {
  product: IReviewProduct | null;
  productId: number;
}

const DynamicWriteReviewPage: React.ComponentType<_Props> = dynamic(
  () => import(`../../${activeStoreName}/pages/writeReviews`),
);

export default async function ProductListing({
  params: { slug = [''] },
  searchParams: { productId = '', attributeId = '', reviewId = '' },
}: {
  params: { slug: string[] };
  searchParams: { productId: string; attributeId: string; reviewId: string };
}) {
  const storeId = +storeDetails.storeId;

  let productColor;
  let productInfo = await getProductDetailsBySeName(
    encodeURIComponent(`""`),
    storeId,
    +productId,
  );
  productColor = productInfo?.sizes
    ? await fetchProductColors(productInfo?.id!)
    : [];
  if (!productInfo || !productColor) {
    throw new Error('server side error');
  }
  const ProductAttributeImg = productColor?.filter((el) => {
    if (el.attributeOptionId == +attributeId) {
      return el.imageUrl;
    }
  })[0]?.imageUrl;

  // console.log(productInfo, '12321');
  let product = {
    productName: productInfo?.name || '',
    seName: productInfo?.seName,
    imageUrl: productInfo?.sizes
      ? ProductAttributeImg || ''
      : productInfo?.imageUrl ||
        productInfo?.attributeImagesViewModels[0].imageUrl ||
        '',
    reviewId: reviewId,
  };

  return <DynamicWriteReviewPage product={product} productId={+productId} />;
}
