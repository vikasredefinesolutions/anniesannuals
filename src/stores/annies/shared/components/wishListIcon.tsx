import React, { useEffect, useState } from 'react';

import { getLocation, sendErrorMessage } from '@/utils/helpers';
import { moveToWishlist } from '@/shared/apis/cart/moveToWishlist';
import { getWishlist } from '@/shared/apis/cart/getWishlistItems';
import { useDispatch } from 'react-redux';
import { setWishlistData } from '@/app/redux/slices/userSlice';
import { getUserId } from '@/shared/utils/cookie.helper';
import { useAppSelector } from '@/app/redux/hooks';
import { removeWishlist } from '@/shared/apis/cart/removeFromWishlist';
import { useRouter } from 'next/navigation';
import { paths } from '@/utils/paths.constant';
import Image from '@/shared/Components/Image';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
interface IProps {
  product: {
    id: number;
    name: string;
    seName: string;
    price: number;
  };
}

const WishlistIcon: React.FC<IProps> = ({ product }) => {
  const [wishListedId, setWishListId] = useState<number>(0);
  const dispatch = useDispatch();
  const userId = getUserId();
  const { wishlistData } = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    checkProductInWishlist();
  }, [wishlistData]);

  const checkProductInWishlist = () => {
    const wishlist = wishlistData.filter((wishlistItem) => {
      if (wishlistItem.productId === product.id!) return wishlistItem;
    });
    if (wishlist[0]) {
      setWishListId(wishlist[0].id);
    } else setWishListId(0);
  };
  const addToWishlist = async () => {
    const data = await getLocation();
    const requestObject = {
      storeproductWishListModel: {
        id: 0,
        name: product.name,
        quantity: 1,
        color: '',
        price: product.price,
        recStatus: 'A',
        rowVersion: '',
        productId: product.id || 0,
        ipAddress: data.ip_address,
        customerId: +userId || 0,
        macAddress: '00-00-00-00-00-00',
        location: `${data?.city}, ${data?.region}, ${data?.country}, ${data?.postal_code}`,
      },
    };
    try {
      const res = await moveToWishlist(requestObject);

      setWishListId(res?.id || 0);
      // iswishlist=true;
      fetchWishlistData();
    } catch (err) {
      dispatch(
        openAlertModal({
          title: 'Error',
          description: err,
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
    return router.push(`${paths.login}?redirect=${product.seName}.html`);
  };

  const fetchWishlistData = async () => {
    const wishlistData = await getWishlist(+userId);
    if (wishlistData) {
      dispatch(setWishlistData(wishlistData));
    }
  };

  const removeFromWishlist = async (wishlistedId: number) => {
    try {
      const removed = await removeWishlist(wishlistedId);

      if (removed) {
        setWishListId(0);
        // iswishlist = false
        await fetchWishlistData();
      }
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
  return (
    <div onClick={wishlistClick}>
      <Image
        src={
          wishListedId !== 0
            ? '/assets/images/wishlist-selected.png'
            : '/assets/images/wishlist.png'
        }
        isStatic={true}
        alt={wishListedId !== 0 ? 'Wishlist Selected' : 'Wishlist Not Selected'}
        title={
          wishListedId !== 0 ? 'Wishlist Selected' : 'Wishlist Not Selected'
        }
      />
    </div>
  );
};

export default WishlistIcon;
