import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { addCartData } from '@/app/redux/slices/cartSlice';
import { setGrowingZone } from '@/app/redux/slices/commonSlice';
import { setWishlistData } from '@/app/redux/slices/userSlice';
import { tStoreDetailsFile } from '@/helper/staticfile.helper';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import { getCartDetails } from '@/shared/apis/cart/fetchCartProducts';
import { getWishlist } from '@/shared/apis/cart/getWishlistItems';
import {
  getGrowingZone,
  getTempUserId,
  getUserId,
} from '@/shared/utils/cookie.helper';
import useModel from '@/stores/annies/shared/hooks/use-model';
import { paths } from '@/utils/paths.constant';
import { usePathname } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import AddShippingZipcode from './AddShippingZipcode';
import UserMenu from './UserMenu';
import HeaderCart from './headerCart';

interface iProps {
  cmsStoreThemeConfigsViewModel: tStoreDetailsFile['cmsStoreThemeConfigsViewModel'];
}
const HeaderBanner: React.FC<iProps> = ({ cmsStoreThemeConfigsViewModel }) => {
  const { isOpen, openModel, onRequestClose } = useModel(false);
  const { zipCode, zoneName } = useAppSelector(
    (state) => state.common.growingZone,
  );
  const dispatch = useAppDispatch();
  const { cartData } = useAppSelector((state) => state.cart);
  const pathname = usePathname();

  const {
    isOpen: isShippingModalOpen,
    openModel: openShippingModal,
    onRequestClose: closeShippingModal,
  } = useModel(false);

  const [showUserOption, setShowUserOption] = useState<boolean>(false);
  const annoucement = JSON.parse(
    cmsStoreThemeConfigsViewModel.find(
      (item) => item.config_name === 'header_config',
    )?.config_value || '',
  );
  const userId = getUserId();
  const tempId = getTempUserId();

  useEffect(() => {
    const growingZone = getGrowingZone();
    if (growingZone) dispatch(setGrowingZone(growingZone));
    try {
      getCartDetails(+userId || +tempId, false).then((res) => {
        if (res && res.length > 0) {
          dispatch(addCartData(res));
        }
      });
    } catch (error) {
      throw new Error(`${error}`);
    }
  }, []);
  const cartTotal = useCallback(() => {
    let totalItems = 0;
    if (cartData && cartData.length > 0) {
      cartData.map((el) => {
        totalItems = totalItems + el.totalQty;
      });
    }

    return totalItems;
  }, [cartData?.length]);
  const fetchWishlistData = async () => {
    if (userId) {
      const wishlistData = await getWishlist(+userId);
      if (wishlistData) {
        dispatch(setWishlistData(wishlistData));
      }
    }
  };
  useEffect(() => {
    fetchWishlistData();
  }, []);

  return (
    <>
      <div className='lg:bg-gradient-to-l lg:from-90% lg:from-[#634B91] lg:via-[#FFEDD1] lg:to-[#FFF3E0] bg-transparent py-[3px] lg:relative lg:top-0 lg:right-0 absolute top-[25px] right-0 z-40'>
        <div className='container mx-auto'>
          <div className='flex items-center justify-end'>
            {/* <div className='w-full lg:w-1/4 hidden lg:inline-block'></div> */}
            <div className='w-full flex items-center justify-between'>
              <div className='w-full lg:w-auto hidden lg:inline-block grow'>
                {annoucement?.announcementRow[0]?.isVisible && (
                  <div
                    className='font-extrabold xl:text-[12px] text-[10px] uppercase flex justify-center items-center'
                    dangerouslySetInnerHTML={{
                      __html: annoucement?.announcementRow[0]?.leftSideText
                        ? annoucement?.announcementRow[0]?.leftSideText
                        : '',
                    }}
                  ></div>
                )}
              </div>

              <div className='w-full lg:w-auto'>
                <div className='flex items-center justify-end gap-[6px] sm:gap-[10px]'>
                  {zoneName && (
                    <div className='hidden text-[14px] lg:flex items-center mr-[10px] gap-[7px]'>
                      <div>Your Garden Zone Is</div>
                      <p className='inline-block font-extrabold text-black uppercase underline cursor-pointer'>
                        {zoneName}
                      </p>
                    </div>
                  )}
                  <div className='hidden text-[14px] sm:flex items-center mr-[10px] gap-[7px]'>
                    <div>Ship to</div>
                    {zipCode ? (
                      <p
                        className='inline-block font-extrabold text-black uppercase underline cursor-pointer'
                        onClick={openShippingModal}
                      >
                        {zipCode}
                      </p>
                    ) : (
                      <button
                        onClick={openShippingModal}
                        className='inline-block font-extrabold text-primary uppercase underline'
                      >
                        Add zip
                      </button>
                    )}
                  </div>
                  <div className=''>
                    <div className='flex relative'>
                      <CustomLink
                        href={userId ? paths.accountSetting : paths.login}
                        className='text-[#ffffff] flex items-center justify-center'
                      >
                        <span
                          onMouseOver={() => {
                            userId && setShowUserOption(true);
                          }}
                          onMouseLeave={() => {
                            userId && setShowUserOption(false);
                          }}
                          className='inline-flex items-center justify-center w-[30px] h-[30px] bg-[#1B6074] rounded-full'
                        >
                          <Image
                            isStatic
                            src='/assets/images/account.svg'
                            className='max-h-full mx-auto '
                            alt='login'
                            height={15}
                            width={15}
                          />
                        </span>
                      </CustomLink>
                      {showUserOption && (
                        <UserMenu setShowUserOption={setShowUserOption} />
                      )}
                    </div>
                  </div>
                  <div className='flex relative'>
                    <CustomLink
                      href={userId ? paths.wishList : paths.login}
                      className='text-[#ffffff] flex items-center justify-center'
                    >
                      <span className='inline-flex items-center justify-center w-[30px] h-[30px] bg-[#9F2D3C] rounded-full'>
                        <Image
                          isStatic
                          src='/assets/images/wishlist.svg'
                          alt='wishlist'
                          className='max-h-full mx-auto'
                          height={15}
                          width={15}
                        />
                      </span>
                    </CustomLink>
                  </div>
                  <div className='flow-root relative'>
                    {pathname != paths.checkout && (
                      <button
                        onClick={openModel}
                        className='text-[#ffffff] group flex items-center relative'
                      >
                        <span className='inline-flex items-center justify-center w-[30px] h-[30px] bg-[#2E631D] rounded-full'>
                          <Image
                            isStatic
                            src='/assets/images/cart.svg'
                            alt='cart'
                            className='max-h-full mx-auto'
                            height={15}
                            width={15}
                          />
                        </span>
                        <div
                          className='text-[10px] bg-[#694D84] w-[18px] h-[18px] rounded-full leading-[18px] text-center'
                          style={{
                            top: '-3px',
                            right: '-7px',
                            position: 'absolute',
                          }}
                        >
                          {cartTotal()}
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <HeaderCart
          closeCart={onRequestClose}
          cmsStoreThemeConfigsViewModel={cmsStoreThemeConfigsViewModel}
        />
      )}
      {isShippingModalOpen && (
        <AddShippingZipcode closeModal={closeShippingModal} page={pathname} />
      )}
    </>
  );
};

export default HeaderBanner;
