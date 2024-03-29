import { addCartData } from '@/app/redux/slices/cartSlice';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import { setWishlistData } from '@/app/redux/slices/userSlice';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import { addToCart } from '@/shared/apis/cart/addToCart';
import { getCartDetails } from '@/shared/apis/cart/fetchCartProducts';
import { getWishlist } from '@/shared/apis/cart/getWishlistItems';
import { removeWishlist } from '@/shared/apis/cart/removeFromWishlist';
import {
  TEMPUSER_ID,
  getTempUserId,
  getUserId,
} from '@/shared/utils/cookie.helper';
import { PixelTracker } from '@/shared/utils/facebookPixel';
import { GoogleAnalyticsTracker } from '@/shared/utils/googleAnalytics';
import storeDetails from '@/staticData/storeDetails.json';
import { getLocation } from '@/utils/helpers';
import { paths } from '@/utils/paths.constant';
import { setCookie } from 'cookies-next';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

interface Props {
  id: number;
  productId?: number | any;
  sizes?: string;
  ratting?: number;
  name: string;
  image: string;
  imageAltTag: string;
  brandName?: string;
  reviews?: number | string;
  price: number;
  seName: string;
  availableItems: number;
  addDotHtmlAndSlash?: boolean;
  target?: '_blank' | '_self';
}

const ShoppingCartCard = ({
  image,
  imageAltTag,
  name,
  id,
  productId,
  sizes,
  brandName,
  price,
  reviews = 0,
  ratting,
  seName,
  target,
  availableItems,
  addDotHtmlAndSlash,
}: Props) => {
  const [quantity, setQuantity] = useState<number>(1);
  const userId = getUserId();
  const tempId = getTempUserId();
  const dispatch = useDispatch();
  const [wishedListedId, setWishListedId] = useState<number | null>(null);

  const updateWishlistLocally = async () => {
    try {
      const updatedWishlist = await getWishlist(+userId);
      if (!updatedWishlist) throw `Can't udpate the wishlist.`;
      dispatch(setWishlistData(updatedWishlist));
    } catch (error) {}
  };

  const removeFromWishlist = async (wishListedId: number) => {
    setWishListedId(null);
    //
    try {
      await removeWishlist(wishListedId);
      await updateWishlistLocally();
    } catch (error) {
      setWishListedId(wishListedId);
    }
  };

  const handleAddToCart = async () => {
    if (!quantity) return alert('Quantity must be greater than 0');
    try {
      const payload = {
        addToCartModel: {
          customerId: userId || +tempId,
          productId: productId,
          storeId: storeDetails?.storeId,
          ipAddress: getLocation().ip_address,

          shoppingCartItemModel: {
            price: price,
            quantity: 1,
            // color image details don't get confused with name
            logoTitle: '',
            logogImagePath: image,
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
          shoppingCartItemsDetailModels: !sizes
            ? []
            : [
                {
                  attributeOptionName: 'Color',
                  attributeOptionValue: '0',
                  attributeOptionId: 0,
                },
              ],
          cartLogoPersonModel: !sizes
            ? []
            : [
                {
                  id: 0,
                  attributeOptionId: 0,
                  attributeOptionValue: '0',
                  code: '',
                  price: price!,
                  quantity: 1,
                  estimateDate: new Date(),
                  isEmployeeLoginPrice: 0,
                },
              ],
          // Static

          isempLogin: false,
          isForm: false,
        },
      };

      const data = await addToCart(payload);
      setQuantity(1);
      // openModel();
      const cartGaPayload = {
        storeId: storeDetails?.storeId,
        customerId: userId || 0,
        value: quantity * Number(price),
        coupon: '',
        shoppingCartItemsModel: [
          {
            productId: id,
            productName: name,
            colorVariants: '',
            price: quantity * Number(price),
            quantity: quantity,
          },
        ],
      };
      const pixelPaylod = {
        value: quantity * Number(price),
        currency: 'USD',
        content_name: name,
        content_type: 'product', // Required for Dynamic Product Ads
        content_ids: id, // Required for Dynamic Product Ads
      };
      PixelTracker('track', 'AddToCart', pixelPaylod);

      removeFromWishlist(id);

      GoogleAnalyticsTracker('GoogleAddToCartScript', cartGaPayload);
      if (userId == 0) setCookie(TEMPUSER_ID, '' + data);
      //TODO: need to add modal later
      // alert('Added to cart successfully');
      getCartDetails(+userId || +tempId, false)
        .then((res) => {
          if (res && res.length > 0) {
            dispatch(addCartData(res));
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
    } finally {
      // openModel();
    }
  };

  const StarRating = ({ ratting }: { ratting: number }) => {
    const renderStars = (num: number) => {
      const filledStars = Array.from({ length: num }, (_, index) => (
        <span
          key={index}
          className='material-icons-outlined text-[#FFC607] text-sm tracking-normal'
        >
          star
        </span>
      ));

      const emptyStars = Array.from({ length: 5 - num }, (_, index) => (
        <span
          key={index + num}
          className={`material-icons-outlined ${
            ratting === 0 ? 'text-dark-gray' : 'text-[#FFC607]'
          } text-sm tracking-normal`}
        >
          star_border
        </span>
      ));

      return [...filledStars, ...emptyStars];
    };
    return (
      <div className='flex flex-wrap w-full items-center text-sm tracking-normal'>
        <div className='mr-[10px] flex gap-1'>{renderStars(ratting)}</div>
        <div className=''>
          <CustomLink
            href={paths.home}
            className={`${
              reviews === 0 ? 'text-dark-gray' : 'text-black'
            }  text-extra-small-text`}
          >
            {reviews} {+reviews > 1 ? 'Reviews' : 'Review'}
          </CustomLink>
        </div>
      </div>
    );
  };

  return (
    <div
      className='relative overflow-hidden rounded-tl-lg rounded-br-lg'
      key={id}
    >
      <div className='h-full'>
        <CustomLink
          href={seName}
          target={target}
          addDotHtmlAndSlash={addDotHtmlAndSlash}
          aria-label={name}
        >
          {image ? (
            <Image
              src={`${image}`}
              className='group hover:scale-125 transition-all duration-700 max-w-[370px] max-h-[342px] group object-cover'
              alt={imageAltTag}
            />
          ) : (
            <div className='group hover:scale-125 bg-[#f0f0f0] transition-all duration-700 group object-cover h-full w-full' />
          )}
        </CustomLink>
      </div>
      <div className='relative p-[15px] bg-[#FCFFF5] inset-x-0 bottom-0 transition-all duration-700'>
        <div
          className='w-[125px] md:w-[175px] lg:w-[275px]'
          style={{
            wordBreak: 'break-all',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <CustomLink
            href={seName}
            addDotHtmlAndSlash={addDotHtmlAndSlash}
            target={target}
            className='text-normal-text text-black font-semibold font-sub  truncate overflow-hidden'
          >
            {name}
          </CustomLink>
        </div>
        {/* {brandName && (
          <div className='text-default-text text-black mb-[10px] w-full'>
            {brandName}
          </div>
        )} */}

        {<StarRating ratting={Number(ratting)} />}

        {price && (
          <div className='text-default-text text-black font-bold'>${price}</div>
        )}

        {availableItems == 0 ? (
          <div className='w-full pt-[10px]'>
            <button
              type='button'
              disabled={true}
              className='btn  bg-light-gray btn-sm w-full uppercase !font-body !rounded-xs text-center  !text-[10px] lg:text-[17px]'
            >
              Out of Stock
            </button>
          </div>
        ) : (
          <div className='w-full pt-[10px]'>
            <CustomLink href={`${seName}.html`}>
              <button
                type='button'
                className='btn btn-primary btn-sm w-full uppercase !font-body !rounded-xs text-center  !text-[10px] lg:text-[17px]'
                // onClick={handleAddToCart}
              >
                Add To Cart
              </button>
            </CustomLink>
          </div>
        )}
      </div>
    </div>
  );
};
export default ShoppingCartCard;
