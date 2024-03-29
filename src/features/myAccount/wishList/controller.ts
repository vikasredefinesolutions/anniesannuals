import { getWishlist } from '@/shared/apis/cart/getWishlistItems';
import {
  WishlistType,
  removeWishlist,
} from '@/shared/apis/cart/removeFromWishlist';
import { getUserId } from '@/shared/utils/cookie.helper';
import { useRouter } from 'next/navigation';
import React, { ReactElement, useEffect, useState } from 'react';

interface _Props {
  configs: null;
  cases: {
    loading: () => ReactElement<any, any>;
    ready: (helper: _Helper) => ReactElement<any, any>;
  };
}

interface _Helper {
  wishListDatas: WishlistType[];
  removeWishList: (Id: number) => void;
  removeSuccess: boolean;
}

const WishListController: React.FC<_Props> = (_Props) => {
  const { cases } = _Props;
  const [status, setStatus] = useState<'loading' | 'empty' | 'ready'>(
    'loading',
  );
  const [wishListDatas, setWishListDatas] = useState<WishlistType[]>([]);
  const [removeSuccess, setRemoveSuccess] = useState<boolean>(false);
  const userId = getUserId();
  const router = useRouter();

  const fetchWishListDatas = async () => {
    try {
      const data = await getWishlist(userId);
      setStatus('ready');
      setWishListDatas(data);
    } catch (error: any) {
      console.log(error?.message || 'Wishlist is not found');
    }
  };

  useEffect(() => {
    if (userId) {
      fetchWishListDatas();
    } else {
      router.push('sign-in.html');
    }
  }, []);

  const removeWishList = async (Id: number) => {
    if (!Id) throw new Error('Product id not found');
    try {
      await removeWishlist(Id);
      fetchWishListDatas();
      setRemoveSuccess(true);
    } catch (error: any) {
      console.log(error?.message || 'Wishlist is not removed');
    }
    setTimeout(() => {
      setRemoveSuccess(false);
    }, 2000);
  };
  if (status === 'loading') {
    return cases.loading();
  }
  if (status === 'ready') {
    return cases.ready({ wishListDatas, removeWishList, removeSuccess });
  }
  return null;
};

export default WishListController;
