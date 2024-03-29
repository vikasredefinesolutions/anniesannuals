import { activeStoreName } from '@/shared/configs';
import dynamic from 'next/dynamic';

const DynamicWishListPage = dynamic(
  () => import(`../../${activeStoreName}/pages/wishList`),
);

export default async function WishLists() {
  return <DynamicWishListPage />;
}
