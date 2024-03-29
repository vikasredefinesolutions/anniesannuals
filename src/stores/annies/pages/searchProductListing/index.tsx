'use client';
import { useAppSelector } from '@/app/redux/hooks';
import Card from '@/shared/Components/Card';
import { getBackGroundColor } from '@/shared/Components/Card/CardColors';
import { _GetSearchInput } from '@/shared/apis/header/globalSearch';
import { PixelTracker } from '@/shared/utils/facebookPixel';
import { getPriceWithMsrpAndSalePrice } from '@/shared/utils/helper';
import React, { useEffect } from 'react';

interface _Props {
  productData: _GetSearchInput[] | null;
  text: string;
}

const SearchProductListing: React.FC<_Props> = (_Props) => {
  const { productData, text } = _Props;

  useEffect(() => {
    let filteredProduct;
    if (productData) {
      filteredProduct = productData.slice(0, 50).reduce(
        (acc: any, curr: _GetSearchInput) => {
          return {
            productPrices: acc.productPrices + curr.msrp,
            productIds: [...acc.productIds, curr.id],
          };
        },
        { productPrices: 0, productIds: [] },
      );
    }
    const pixelPayload = {
      value: productData ? filteredProduct?.productPrices : 0,
      currency: 'USD',
      content_category: 'products',
      content_ids: productData ? filteredProduct?.productIds : [],
      search_string: text,
    };
    PixelTracker('track', 'Search', pixelPayload);
  }, []);

  const userWishList = useAppSelector((state) => state.user.wishlistData);

  return (
    <div>
      <div className='bg-[#FFF0ED]'>
        <div className='container-fluid md:container mx-auto'>
          <div className='container mx-auto relative'>
            <div className='text-left'>
              <h1 className='text-2xl-text my-[10px] mt-[30px] font-sub font-bold relative inline-block'>
                Search results for "{text}"
              </h1>
            </div>
            <div className='text-left'>
              <div className='my-[10px] mb-8 font-sub font-bold text-xl relative inline-block'>
                {productData && productData?.length > 0 ? (
                  <div>
                    {productData && productData?.length > 1
                      ? `${productData.length} results found`
                      : '1 result found'}
                  </div>
                ) : (
                  'No result found'
                )}
              </div>
            </div>
            {/* <div className='flex flex-wrap mx-[-15px]'> */}
            <div className='flex flex-wrap mx-[-8px] lg:mx-[-15px] theme-color'>
              {productData &&
                productData.map((product, index) => {
                  const bgColor = getBackGroundColor(index);
                  return (
                    <Card
                      product={product}
                      key={product?.id}
                      id={product?.id}
                      sename={product?.seName}
                      productCustomField={product.customFields}
                      name={product?.name}
                      price={getPriceWithMsrpAndSalePrice(
                        +product?.salePrice,
                        +product?.msrp,
                      )}
                      userWishList={userWishList}
                      image={product?.productFirstImage}
                      reviews={product?.productRatingAverage}
                      reviewCount={+(product?.productReviewsCount || 0)}
                      productTagViewModel={product?.productTagViewModel}
                      // imageAltTag={
                      //   product?.getProductImageOptionList[0]?.alttag || ''
                      // }
                      getProductImageOptionList={[]}
                      isSubcategory={false}
                      isAtoZ={false}
                      containerBg={bgColor}
                      openModel={function (): void {
                        throw new Error('Function not implemented.');
                      }}
                    />
                  );
                })}
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProductListing;
