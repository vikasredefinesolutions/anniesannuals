import { useAppDispatch } from '@/app/redux/hooks';
import { addCartData } from '@/app/redux/slices/cartSlice';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import MultiSlideCarousel from '@/components/common/multislideCarousel';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import PriceLabel from '@/shared/Components/PriceLabel';
import { addToCart } from '@/shared/apis/cart/addToCart';
import { getCartDetails } from '@/shared/apis/cart/fetchCartProducts';
import { IProductsAlike } from '@/shared/apis/product/product';
import {
  TEMPUSER_ID,
  getTempUserId,
  getUserId,
} from '@/shared/utils/cookie.helper';
import { PixelTracker } from '@/shared/utils/facebookPixel';
import { GoogleAnalyticsTracker } from '@/shared/utils/googleAnalytics';
import storeDetails from '@/staticData/storeDetails.json';
import { getLocation } from '@/utils/helpers';
import { setCookie } from 'cookies-next';
import React from 'react';
import ProductNames from './ProductNames';
import StarRatings from './StarRatings';
import WishlistIcon from './wishListIcon';

interface IProps {
  alikeproduct: IProductsAlike[] | null;
  title: string;
}

const ProductSuggestions: React.FC<IProps> = ({ alikeproduct, title }) => {
  const tempId = getTempUserId();
  const userId = getUserId();
  const dispatch = useAppDispatch();

  const colors = [
    'bg-[#9F2D3C]',
    'bg-[#A8007B]',
    'bg-default',
    'bg-secondary',
    'bg-[#9F2D3C]',
  ];

  const handleAddToCart = async (product: IProductsAlike) => {
    try {
      const payload = {
        addToCartModel: {
          customerId: userId || +tempId,
          productId: product!.id,
          storeId: storeDetails?.storeId,
          ipAddress: getLocation().ip_address,

          shoppingCartItemModel: {
            price: product?.msrp,
            quantity: 1,
            // color image details don't get confused with name
            logoTitle: '',
            logogImagePath: product?.image,
            // not to touch
            id: 0,
            weight: 0,
            productType: 0,
            discountPrice: 0,
            perQuantity: 0,
            appQuantity: 0,
            status: 0,
            discountPercentage: 0,
            productCustomizationId: 0,
            itemNotes: '',
            isEmployeeLoginPrice: false,
          },
          shoppingCartItemsDetailModels: [],
          cartLogoPersonModel: [],
          // Static

          isempLogin: false,
          isForm: false,
        },
      };

      const data = await addToCart(payload);
      const cartGaPayload = {
        storeId: storeDetails?.storeId,
        customerId: userId || 0,
        value: product?.msrp,
        coupon: '',
        shoppingCartItemsModel: [
          {
            productId: product?.id,
            productName: product?.name,
            colorVariants: '',
            price: product?.msrp,
            quantity: 1,
          },
        ],
      };
      const pixelPaylod = {
        value: product?.msrp,
        currency: 'USD',
        content_name: product.name,
        content_type: 'product', // Required for Dynamic Product Ads
        content_ids: product.id, // Required for Dynamic Product Ads
      };
      PixelTracker('track', 'AddToCart', pixelPaylod);

      GoogleAnalyticsTracker('GoogleAddToCartScript', cartGaPayload);
      if (userId == 0) setCookie(TEMPUSER_ID, '' + data);

      getCartDetails(+userId || +tempId, false)
        .then((res) => {
          if (res && res.length > 0) {
            dispatch(addCartData(res));
            dispatch(
              openAlertModal({
                title: 'Success',
                description: 'Added to cart successfully',
                isAlertModalOpen: true,
              }),
            );
          }
        })
        .catch((err) => {
          dispatch(
            openAlertModal({
              title: 'Error',
              description: err,
              isAlertModalOpen: true,
            }),
          );
        });
    } catch (error: any) {
      //TODO: need to add modal later
      dispatch(
        openAlertModal({
          title: 'Error',
          description: error[Object.keys(error)[0]],
          isAlertModalOpen: true,
        }),
      );
    }
  };

  return (
    <section
      className='relative pt-[30px] pb-[30px] bg-[#FCEEFF]'
      style={
        title == 'Recently Viewed'
          ? {}
          : {
              backgroundSize: 'cover',
              backgroundImage: 'url(assets/images/digital-catalog-floral.png)',
              backgroundPosition: 'top center',
              backgroundRepeat: 'no-repeat',
            }
      }
    >
      <div className='container mx-auto relative'>
        <div className='flex flex-wrap justify-between items-center pb-[15px]'>
          <div className='font-sub font-bold pb-[15px] text-[18px] sm:text-[24px] lg:text-[36px] text-anchor'>
            {title}
          </div>
        </div>

        <MultiSlideCarousel
          slidesPerImage={4}
          totalItems={alikeproduct?.length!}
        >
          {alikeproduct?.map((productData, index) => {
            return (
              <React.Fragment key={productData.seName + index}>
                <div
                  className={`relative overflow-hidden rounded-tl-lg rounded-br-lg h-full ${
                    productData?.productRatingAverage
                      ? 'max-w-[370px]'
                      : 'max-w-[504px]'
                  } `}
                  key={productData.id}
                >
                  <div
                    className='absolute left-4 top-4 cursor-pointer h-10 w-10 rounded-full'
                    style={{ zIndex: 1 }}
                  >
                    <WishlistIcon
                      product={{
                        id: productData?.id,
                        name: productData?.name,
                        price: productData?.msrp,
                        seName: productData?.seName,
                      }}
                    />
                  </div>
                  <CustomLink href={`/${productData.seName}.html`}>
                    {productData.image ? (
                      <Image
                        src={productData.image}
                        className='group hover:scale-125 transition-all duration-700 group object-cover w-full'
                        alt={productData.name}
                      />
                    ) : (
                      <Image
                        src={'/assets/images/No_productImg.png'}
                        isStatic={true}
                        alt={productData?.name!}
                        className='group hover:scale-125 transition-all duration-700 group object-cover w-full'
                      />
                    )}
                  </CustomLink>
                  {productData?.productTagViewModel.map((el, index) => (
                    <div
                      className={`absolute ${
                        el.tagPosition === 'topleft' ? 'left-[53px]' : 'right-0'
                      } top-[18px] cursor-pointer`}
                      key={el.tagPosition + index}
                    >
                      <Image src={el.imagename} alt={el.productTagName || ''} />
                    </div>
                  ))}
                  <div
                    className={`absolute p-[15px] box-color bg-opacity-80 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700 w-full  ${
                      colors[index % 5]
                    }`}
                  >
                    <div className='flex truncate text-white'>
                      <CustomLink href={`/${productData.seName}.html`}>
                        <h5 className='text-normal-text text-white font-semibold font-sub w-full overflow-hidden my-1'>
                          {productData.name}
                        </h5>
                        <ProductNames
                          customFields={productData.customFields}
                          dark={false}
                        />
                      </CustomLink>
                    </div>

                    <div className='mb-1'>
                      <div className='flex flex-wrap w-full items-center text-sm tracking-normal'>
                        <div className='mr-[10px] flex gap-1'>
                          {' '}
                          <StarRatings
                            rating={+productData?.productRatingAverage}
                            textsize={'text-sm'}
                          />
                        </div>
                        <div className=''>
                          <CustomLink
                            href={`/${productData.seName}.html`}
                            className='text-white text-small-text'
                          >
                            {productData.productReviewsCount}{' '}
                            {productData.productReviewsCount > 1
                              ? 'Reviews'
                              : 'Review'}
                          </CustomLink>
                        </div>
                      </div>
                    </div>
                    <PriceLabel
                      className='text-default-text text-white font-bold'
                      price={productData.msrp}
                    />
                  </div>
                  <div className='lg:absolute relative bottom-[13px] right-[9px] '>
                    <a
                      href={`/${productData.seName}.html`}
                      className='h-[30px] w-auto px-[10px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full text-default-text'
                    >
                      <span className=''>Add to Cart</span>
                    </a>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </MultiSlideCarousel>
      </div>
    </section>
  );
};

export default ProductSuggestions;
