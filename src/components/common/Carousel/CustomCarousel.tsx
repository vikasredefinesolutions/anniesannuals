'use client';
import { useAppSelector } from '@/app/redux/hooks';
import MultiSlideCarousel from '@/components/common/multislideCarousel';
import { WishlistType } from '@/shared/apis/cart/removeFromWishlist';
import { activeStoreName } from '@/shared/configs';
import { getPriceWithMsrpAndSalePrice } from '@/shared/utils/helper';
import ShoppingCartCard from '@/stores/annies/shared/Home/Cards/ShoppingCartCard';
import { ShowCategoryValue } from '@/types/home';
import { subCategoryBgEnum } from '@/utils/helpers';
import dynamic from 'next/dynamic';
import React from 'react';

interface Props {
  data: ShowCategoryValue[];
  showNameAndCultivatorName?: boolean;
  slidesPerImage: number;
  cardType?: 'product-card' | 'shoping-cart-card';
  isProducts?: boolean;
  addDotHtmlAndSlash?: boolean;
  target?: '_blank' | '_self';
}

interface CardProps {
  id: number;
  name: string;
  image: string;
  imageAltTag: string;
  containerBg?: string;
  productCustomField?: Array<{
    label: string;
    value: string;
  }>;
  showNameAndCultivatorName?: boolean;
  brandName?: string;
  reviews?: string;
  price?: string;
  seName: string;
  ratting: string;
  redirectLink?: string;
  customcollectionurl: string;
  productTagViewModel: {
    productId: number;
    imagename: string;
    productTagName: string;
    tagPosition: string;
  }[];
  userWishList: WishlistType[];
  isProduct?: boolean;
  addDotHtmlAndSlash?: boolean;
  target?: '_blank' | '_self';
}

const Card: React.ComponentType<CardProps> = dynamic(
  () => import(`../../../${activeStoreName}/shared/Home/Cards/ProductCard`),
);

const CustomCarousel = ({
  data,
  showNameAndCultivatorName,
  slidesPerImage,
  cardType = 'product-card',
  isProducts = false,
  addDotHtmlAndSlash = true,
  target = '_self',
}: Props) => {
  const userWishList = useAppSelector((state) => state.user.wishlistData);

  return (
    <div>
      <MultiSlideCarousel
        slidesPerImage={slidesPerImage}
        totalItems={data?.length}
      >
        {data?.map((data: ShowCategoryValue) => {
          const newSubCategoryBg = data?.customFields?.find(
            (carouselData) => carouselData.label === subCategoryBgEnum,
          )?.value;
          const containerBg = newSubCategoryBg?.startsWith('color')
            ? newSubCategoryBg?.replace('color', 'bg')
            : newSubCategoryBg || 'bg-primary';

          const newCropsDescription = data.customFields?.find(
            (data) => data.label === 'GENUS SPECIES NAME',
          )?.value;

          if (cardType === 'shoping-cart-card') {
            return (
              <ShoppingCartCard
                availableItems={data?.quantity || data?.inventory || 0}
                key={data.id}
                name={data.name}
                ratting={+data?.productRatingAverage || 0}
                id={data.id}
                productId={data.productId}
                sizes={data.sizes}
                image={data.image}
                imageAltTag={data.imageAltTag}
                price={Number(data?.msrp)}
                reviews={Number(data.productReviewsCount)}
                seName={data.seName!}
                brandName={newCropsDescription}
                addDotHtmlAndSlash={addDotHtmlAndSlash}
                target={target}
              />
            );
          }

          return (
            <Card
              addDotHtmlAndSlash={addDotHtmlAndSlash}
              key={data.id}
              containerBg={containerBg}
              productCustomField={data.customFields}
              showNameAndCultivatorName={showNameAndCultivatorName}
              name={data.name}
              id={data.id}
              image={data.image}
              target={target}
              imageAltTag={data.imageAltTag}
              // price={data?.msrp}
              price={getPriceWithMsrpAndSalePrice(
                +data?.salePrice,
                +data?.msrp,
              )}
              reviews={data.productReviewsCount}
              ratting={data?.productRatingAverage}
              seName={data.slideLink || data.seName!}
              customcollectionurl={data?.customcollectionurl}
              productTagViewModel={data?.productTagViewModel}
              isProduct={isProducts}
              userWishList={userWishList}
            />
          );
        })}
      </MultiSlideCarousel>
    </div>
  );
};

export default CustomCarousel;
