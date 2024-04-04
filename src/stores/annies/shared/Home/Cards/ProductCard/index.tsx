'use client';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import { moveToWishlist } from '@/shared/apis/cart/moveToWishlist';
import {
  WishlistType,
  removeWishlist,
} from '@/shared/apis/cart/removeFromWishlist';
import { USER_ID } from '@/shared/utils/cookie.helper';
import { getLocation, sendErrorMessage } from '@/utils/helpers';
import { paths } from '@/utils/paths.constant';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface Props {
  id: number;
  name: string;
  image: string;
  showNameAndCultivatorName?: boolean;
  imageAltTag: string;
  productCustomField?: Array<{ label: string; value: string }>;
  containerBg?: string;
  brandName?: string;
  reviews?: number;
  price?: string;
  redirectLink?: string;
  iswishlist?: boolean;
  wishListId?: number;
  productTagViewModel: {
    productId: number;
    imagename: string;
    productTagName: string;
    tagPosition: string;
  }[];
  seName: string;
  customcollectionurl: string;
  ratting: string;
  isProduct?: boolean;
  userWishList: WishlistType[];
  addDotHtmlAndSlash?: boolean;
  target?: '_blank' | '_self';
}

const Card = ({
  id,
  name,
  image,
  imageAltTag,
  containerBg,
  showNameAndCultivatorName,
  ratting,
  productTagViewModel,
  productCustomField,
  iswishlist,
  wishListId,
  seName,
  customcollectionurl,
  brandName,
  price,
  reviews = 0,
  redirectLink = '',
  isProduct = false,
  addDotHtmlAndSlash = true,
  userWishList,
  target,
}: Props) => {
  const dispatch = useDispatch();
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
            reviews === 0 ? 'text-dark-gray' : 'text-[#FFC607]'
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
              reviews === 0 ? 'text-dark-gray' : 'text-white'
            }  extra-small-text`}
          >
            {reviews} {reviews > 1 ? 'Reviews' : 'Review'}
          </CustomLink>
        </div>
      </div>
    );
  };

  let userId = getCookie(USER_ID);
  const router = useRouter();

  const [wishListedId, setWishListId] = useState(
    wishListId ? Number(wishListId) : 0,
  );

  if (isProduct && name === 'Anagallis monellii')
    console.log({ wishListedId, wishListId });

  const addToWishlist = async () => {
    const data = getLocation();
    if (!price || !userId) return;

    const requestObject = {
      storeproductWishListModel: {
        id: 0,
        name,
        quantity: 1,
        color: '',
        price: +price,
        recStatus: 'A',
        rowVersion: '',
        productId: id,
        ipAddress: data.ip_address,
        customerId: +userId,
        macAddress: '00-00-00-00-00-00',
        location: `${data?.city}, ${data?.region}, ${data?.country}, ${data?.postal_code}`,
      },
    };
    try {
      const res = await moveToWishlist(requestObject);
      setWishListId(res?.id || 0);
    } catch (err) {
      dispatch(
        openAlertModal({
          title: 'Error',
          description: sendErrorMessage(err),
          isAlertModalOpen: true,
        }),
      );
    }
  };

  const removeFromWishlist = async (wishlistedId: number) => {
    try {
      const removedItem = await removeWishlist(wishlistedId);
      setWishListId(0);
    } catch (error) {
      dispatch(
        openAlertModal({
          title: 'Error',
          description: sendErrorMessage(error),
          isAlertModalOpen: true,
        }),
      );
    }
  };

  const wishlistClick = () => {
    if (userId) {
      wishListedId === 0 ? addToWishlist() : removeFromWishlist(wishListedId);
      return;
    }
    return router.push(`${paths.login}?redirect=${paths.cart}.html`);
  };

  const cultivar =
    productCustomField?.find(
      (field: { label: string; value: string }) =>
        field.label === 'CULTIVAR NAME',
    )?.value || '';
  const commonName =
    productCustomField?.find(
      (field: { label: string; value: string }) =>
        field.label === 'COMMON NAME',
    )?.value || '';

  const result = `${cultivar}${cultivar && commonName && ' , '}${commonName}`;

  const verifyProductAsWishlisted = (productId: number) => {
    const isWishlisted = userWishList.find(
      (wishedProduct) => wishedProduct.productId === productId,
    );
    if (!isWishlisted) return;
    setWishListId(isWishlisted.id);
  };

  useEffect(() => {
    if (!userId || !id) return;
    verifyProductAsWishlisted(id);
  }, []);
  return (
    <div
      className={`relative overflow-hidden rounded-tl-lg rounded-br-lg h-full ${
        ratting ? 'max-w-[370px]' : 'max-w-[504px]'
      } `}
      key={id}
    >
      <CustomLink
        addDotHtmlAndSlash={addDotHtmlAndSlash}
        href={customcollectionurl || seName}
        aria-label={name}
        target={target}
      >
        {image ? (
          <Image
            src={image}
            className='group hover:scale-125 transition-all duration-700 group object-cover w-full'
            alt={imageAltTag}
            height={426}
            width={370}
            isCdnUrlAdded={true}
          />
        ) : (
          <div
            className='min-h-[426px] min-w-[370px] group hover:scale-125 bg-[#f0f0f0] transition-all duration-700 group object-cover w-full h-full'
            style={{
              minHeight: '427px',
              minWidth: '300px',
              background: '#fff9ef',
              width: '100%',
              height: '100%',
            }}
          />
        )}
      </CustomLink>

      {isProduct && (
        <div
          className='absolute left-4 top-4 cursor-pointer'
          onClick={wishlistClick}
        >
          <Image
            src={
              wishListedId !== undefined && wishListedId !== 0
                ? '/assets/images/wishlist-selected.png'
                : '/assets/images/wishlist.png'
            }
            alt='Wishlist Selected'
            title='Wishlist Selected'
            isStatic
          />
        </div>
      )}

      {productTagViewModel &&
        isProduct &&
        productTagViewModel.map((data) => (
          <div
            className={`absolute ${
              data.tagPosition === 'topleft' ? 'left-[50px]' : 'right-0'
            } top-4 cursor-pointer`}
            key={data?.productId}
          >
            <Image src={`${data.imagename}`} alt='new product' />
          </div>
        ))}
      <div
        className={`absolute p-[15px] box-color bg-opacity-80 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700 w-full ${containerBg}`}
      >
        <div className='flex truncate text-white'>
          <CustomLink
            addDotHtmlAndSlash={addDotHtmlAndSlash}
            href={customcollectionurl || seName}
            target={target}
            className='text-normal-text text-white font-semibold font-sub w-full overflow-hidden my-1'
          >
            {name}
            {showNameAndCultivatorName && (
              <div
                className='text-default-text text-white  w-full '
                style={{
                  fontWeight: '100',
                  fontSize: '14px',
                  whiteSpace: 'pre-wrap',
                }}
              >
                <h5>{result}</h5>
              </div>
            )}
          </CustomLink>
        </div>
        {brandName && (
          <div className='text-default-text text-white mb-[10px] w-full'>
            {brandName}
          </div>
        )}
        <div className='mb-1'>
          {ratting && <StarRating ratting={Number(ratting)} />}
        </div>

        {price && (
          <div className='text-default-text text-white font-bold mt-1'>
            ${price}
          </div>
        )}
      </div>
      <div className='absolute bottom-[15px] right-[20px]'>
        <CustomLink
          addDotHtmlAndSlash={addDotHtmlAndSlash}
          href={customcollectionurl || seName}
          target={target}
          className='h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full'
        >
          <span className='material-icons-outlined'>chevron_right</span>
        </CustomLink>
      </div>
    </div>
  );
};

export default Card;
