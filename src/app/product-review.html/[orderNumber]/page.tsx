import { fetchProductReviews } from '@/shared/apis/product/product';
import { activeStoreName } from '@/shared/configs';
import { IProductReviews } from '@/shared/types/product';
import dynamic from 'next/dynamic';

interface IProps {
  reviewsList: IProductReviews[] | [];
}

const DynamicProductReviewPage: React.ComponentType<IProps> = dynamic(
  () => import(`../../../${activeStoreName}/pages/product-review`),
);

export default async function ProductReviewDetails({
  params,
}: {
  params: { orderNumber: string };
}) {
  const orderId = +params.orderNumber;
  const reviewsList = await fetchProductReviews(orderId);

  return (
    <DynamicProductReviewPage reviewsList={reviewsList ? reviewsList : []} />
  );
}
