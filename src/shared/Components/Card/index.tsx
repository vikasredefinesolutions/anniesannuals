import { setWishlistData } from '@/app/redux/slices/userSlice';
import { tStoreDetailsFile } from '@/helper/staticfile.helper';
import { getWishlist } from '@/shared/apis/cart/getWishlistItems';
import { moveToWishlist } from '@/shared/apis/cart/moveToWishlist';
import {
  WishlistType,
  removeWishlist,
} from '@/shared/apis/cart/removeFromWishlist';
import { getTempUserId, getUserId } from '@/shared/utils/cookie.helper';
import { PixelTracker } from '@/shared/utils/facebookPixel';
import { MEDIA_BASE_URL, MEDIA_BASE_URL_CDN } from '@/shared/utils/helper';
import { getLocation } from '@/utils/helpers';
import { paths } from '@/utils/paths.constant';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CustomLink from '../CustomLink';
import PriceLabel from '../PriceLabel';
import { Ratings } from './Ratings';

interface Props {
  id?: number;
  name: string;
  sename: string;
  image: string;
  product: any;
  imageAltTag?: string;
  containerBg?: string;
  getProductImageOptionList: [];
  productCustomField?: Array<{ label: string; value: string }>;
  brandName?: string;
  reviews?: string | number;
  reviewCount: number;
  price: string | undefined;
  cmsStoreThemeConfigsViewModel?: tStoreDetailsFile['cmsStoreThemeConfigsViewModel'];
  productTagViewModel: Array<{
    productId: number;
    imagename: string;
    productTagName: string;
    tagPosition: string;
  }>;
  isFilter?: boolean;
  isSubcategory: boolean;
  openModel: () => void;
  isAtoZ: boolean;
  scrollToTopFor?: 'listing' | 'all';
  userWishList: WishlistType[];
}

const Card = ({
  id: productId,
  name: productName,
  sename,
  image,
  imageAltTag,
  product,
  containerBg,
  brandName,
  productCustomField,
  cmsStoreThemeConfigsViewModel,
  productTagViewModel,
  price,
  reviewCount,
  reviews,
  isFilter,
  isSubcategory,
  isAtoZ,
  scrollToTopFor = 'all',
  openModel,
  userWishList,
}: Props) => {
  const userId = getUserId();
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [wishedListedId, setWishListedId] = useState<number | null>(null);

  const [quantity, setQuantity] = useState(1);
  const tempId = getTempUserId();

  const updateWishlistLocally = async () => {
    try {
      const updatedWishlist = await getWishlist(+userId);

      if (!updatedWishlist) throw `Can't udpate the wishlist.`;
      dispatch(setWishlistData(updatedWishlist));
    } catch (error) {}
  };

  const addToWishlist = async (productId: number) => {
    setWishListedId(99999999); // dummy value will be updated after API Response.
    const pc = await getLocation();

    try {
      const payload = {
        storeproductWishListModel: {
          id: 0,
          name: productName,
          quantity: 1,
          color: '',
          price: +price!,
          recStatus: 'A',
          rowVersion: '',
          productId: productId,
          ipAddress: pc?.ip_address,
          customerId: +userId,
          macAddress: '00-00-00-00-00-00',
          location: `${pc?.city}, ${pc?.region}, ${pc?.country}, ${pc?.postal_code}`,
        },
      };
      const response = await moveToWishlist(payload);

      setWishListedId(response.id);

      const pixelPaylod = {
        value: product!.msrp,
        currency: 'USD',
        content_name: product?.name,
        content_category: 'snippet',
        content_ids: product?.id,
      };
      PixelTracker('track', 'AddToWishlist', pixelPaylod);
      await updateWishlistLocally();
    } catch (error) {
      setWishListedId(null); // dummy value will be updated after API Response.
    }
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

  const handleWishlistIcon = async (
    productId: number | undefined,
    isAlredyInWishlist: null | number,
  ) => {
    if (!productId) return;
    if (!userId)
      return router.push(`${paths.login}?redirect=${paths.cart}.html`);

    if (isAlredyInWishlist) {
      await removeFromWishlist(isAlredyInWishlist);
      return;
    }
    await addToWishlist(productId);
  };

  const verifyProductAsWishlisted = (productId: number) => {
    const isWishlisted = userWishList.find(
      (wishedProduct) => wishedProduct.productId === productId,
    );
    if (!isWishlisted) return;
    setWishListedId(isWishlisted.id);
  };

  useEffect(() => {
    if (!userId || !productId) return;
    verifyProductAsWishlisted(productId);
  }, []);

  useEffect(() => {
    return () => {
      if (scrollToTopFor === 'listing') {
        const breadCrumbsDiv = document.getElementById('breadcrumbs');
        if (!breadCrumbsDiv) return;
        breadCrumbsDiv.scrollIntoView();
        return;
      }
      window.scroll(0, 0);
    };
  }, []);

  const cultivar =
    productCustomField?.find(
      (field: { label: string; value: string }) =>
        field.label === 'CULTIVAR NAME',
    )?.value || '';

  const prefferedCommonName =
    productCustomField?.find(
      (field: { label: string; value: string }) =>
        field.label === 'PREFERRED COMMON NAME',
    )?.value || '';

  const itemNote =
    productCustomField?.find(
      (field: { label: string; value: string }) => field.label === 'Item Note',
    )?.value || '';

  const [showPopup, setShowPopup] = useState(false);

  const handleMouseEnter = (itemNote: string) => {
    if (itemNote.length > 20) {
      setShowPopup(true);
    }
  };

  const handleMouseLeave = () => {
    setShowPopup(false);
  };

  return (
    <div
      key={productId}
      className={
        isSubcategory
          ? 'w-6/12 md:w-4/12 lg:w-3/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px] box-color-main divmore'
          : `w-6/12 ${
              isAtoZ || !isFilter ? 'lg:w-3/12' : 'lg:w-4/12'
            } pb-[30px] px-[15px] box-color-main`
      }
    >
      <div className='relative overflow-hidden rounded-tl-lg rounded-br-lg group'>
        <div className=''>
          <CustomLink href={`/${sename}.html`}>
            <Image
              src={
                image
                  ? `${MEDIA_BASE_URL_CDN}${image}`
                  : '/assets/images/No_productImg.png'
              }
              className='group-hover:scale-125 transition-all duration-700 w-full'
              alt={imageAltTag || sename}
              width={370}
              height={426}
              // isCdnUrlAdded={true}
              // style={{ width: '100%' }}
            />
          </CustomLink>
        </div>
        <div
          className='absolute left-4 top-4 cursor-pointer'
          onClick={() => handleWishlistIcon(productId, wishedListedId)}
        >
          <Image
            // isStatic
            src={
              wishedListedId
                ? '/assets/images/wishlist-selected.png'
                : '/assets/images/wishlist.png'
            }
            height={36}
            width={36}
            alt={wishedListedId ? 'Wishlist Selected' : 'Wishlist'}
            title='Wishlist'
          />
        </div>

        {productTagViewModel.map(
          ({ productId, imagename, tagPosition }, index) => (
            <div
              key={index}
              className={`absolute ${
                tagPosition === 'topleft' ? 'left-[50px]' : 'right-0'
              } top-4 cursor-pointer`}
            >
              <Image
                src={`${MEDIA_BASE_URL}${imagename}`}
                alt='New Product'
                title='New Product'
                height={30}
                width={67}
              />
            </div>
          ),
        )}
        <div
          className={`relative lg:absolute box-color bg-opacity-80 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700 ${
            containerBg || 'bg-default'
          }`}
        >
          {itemNote && (
            <div
              style={{
                backgroundColor: 'yellow',
                padding: '0px 15px',
              }}
            >
              <div
                onMouseEnter={() => handleMouseEnter(itemNote)}
                onMouseLeave={handleMouseLeave}
                style={{
                  maxWidth: '220px',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  position: 'relative',
                }}
              >
                {itemNote}
              </div>
            </div>
          )}
          {showPopup && (
            <div
              style={{
                position: 'absolute',
                top: '15%',
                left: '1%',
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '3px 5px',
                zIndex: '100',
              }}
            >
              {itemNote}
            </div>
          )}
          <div
            className='h-full w-full p-[15px]'
            style={{ paddingBottom: isSubcategory ? '0px' : '' }}
          >
            <div className='truncate text-white'>
              <CustomLink
                href={`/${sename}.html`}
                className='text-normal-text text-white font-bold font-sub w-full '
              >
                {productName}
                {!isSubcategory && (
                  <div
                    className='text-small-text text-white w-full font-bold mb-[5px] leading-none'
                    style={{ height: '14px' }}
                  >
                    {cultivar}
                  </div>
                )}
              </CustomLink>
            </div>
            {!isSubcategory && (
              <div
                className='text-small-text text-white mb-[5px] w-full leading-none'
                style={{ height: '14px' }}
              >
                {prefferedCommonName}
              </div>
            )}
            {brandName && (
              <div className='text-default-text text-white mb-[10px] w-full'>
                {brandName}
              </div>
            )}
            {!isSubcategory && (
              <>
                {reviews && (
                  <div className='flex flex-wrap w-full items-center text-sm tracking-normal mb-[5px] md:mb-[0px]'>
                    <div className='mr-[10px]'>{Ratings(Number(reviews))}</div>
                    <div className='w-full sm:w-auto'>
                      <CustomLink
                        href={undefined}
                        className={`${
                          reviewCount === 0 ? 'text-dark-gray' : 'text-white'
                        } text-small-text`}
                      >
                        {reviewCount} {+reviewCount > 1 ? 'Reviews' : 'Review'}
                      </CustomLink>
                    </div>
                  </div>
                )}
                <div className='flex flex-wrap justify-between items-end w-full '>
                  <PriceLabel
                    price={price}
                    className='text-default-text text-white font-bold'
                    style={{ paddingRight: '20px' }}
                  />
                  {!product.isDiscontinue &&
                    !product.isOutOfStock &&
                    (product.isAddToCart || product.isPreOrder) && (
                      <div className='lg:absolute relative bottom-[13px] right-[9px]'>
                        <a
                          href={`/${sename}.html`}
                          className='h-[30px] w-auto px-[10px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full'
                        >
                          <span className=''>Add to Cart</span>
                        </a>
                      </div>
                    )}
                  {product.isOutOfStock && !product.isDiscontinue && (
                    <div
                      className='lg:absolute relative bottom-[13px] right-[9px]'
                      onClick={() =>
                        handleWishlistIcon(productId, wishedListedId)
                      }
                    >
                      <a className='h-[30px] w-auto px-[10px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full text-default-text'>
                        <span className=''>
                          {wishedListedId
                            ? 'Remove from Wishlist'
                            : 'Add To Wishlist'}
                        </span>
                      </a>
                    </div>
                  )}
                </div>
              </>
            )}
            {/* {!isSubcategory &&
              !product.isDiscontinue &&
              (product.isAddToCart || product.isPreOrder) && (
                <div className='lg:absolute relative bottom-[13px] right-[9px]'>
                  
                  <a
                    href={`/${sename}.html`}
                    className='h-[30px] w-auto px-[10px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full'
                  >
                    <span className=''>Add to Cart</span>
                  </a>
                </div>
              )} */}
          </div>

          {isSubcategory && (
            <div className='text-default-text text-white mb-[10px] truncate w-full p-[15px] pt-[0px]'>
              Spring & Early Summer Gardens
              <div className='absolute p-[15px] bg-opacity-80 group-hover:bg-opacity-100 right-0 bottom-0 mb-[10px] transition-all duration-700'>
                <CustomLink
                  href={`/${sename}.html`}
                  className='h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full'
                >
                  <span className='material-icons-outlined'>chevron_right</span>
                </CustomLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
