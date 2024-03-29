import { useAppDispatch } from '@/app/redux/hooks';
import { clearCart } from '@/app/redux/slices/cartSlice';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import {
  USER_DETAILS,
  USER_ID,
  getUserDetails,
} from '@/shared/utils/cookie.helper';
import { paths } from '@/utils/paths.constant';
import { deleteCookie } from 'cookies-next';
import React from 'react';

const MENU_ITEMS = [
  {
    icon: '/assets/images/accountIcon.svg',
    title: 'Account',
    link: paths.accountSetting,
  },
  {
    icon: '/assets/images/wishlistIcon.svg',
    title: 'Wishlist',
    link: paths.wishList,
  },
  {
    icon: '/assets/images/orderIcon.svg',
    // title: 'Orders & Returns',
    title: 'Orders',
    link: paths.orders,
  },
  // {
  //   icon: '/assets/images/paymentIcon.svg',
  //   title: 'Payment Methods',
  //   link: paths.paymentMethods,
  // },
  // {
  //   icon: '/assets/images/addressIcon.svg',
  //   title: 'Shipping Info',
  //   link: paths.address,
  // },
  {
    icon: '/assets/images/giftCars.svg',
    title: 'Redeem a Gift Card',
    link: paths.gifts,
  },
];
interface IProps {
  setShowUserOption: (value: boolean) => void;
}
const UserMenu: React.FC<IProps> = ({ setShowUserOption }) => {
  const user = getUserDetails();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(clearCart());
    deleteCookie(USER_DETAILS);
    deleteCookie(USER_ID);
  };
  return (
    <div
      className='text-xs absolute right-0 top-full z-50 w-[270px] bg-[#F6EDFF] rounded-[5px] border border-[#D4D4D4] py-[8px] px-[20px]'
      onMouseOver={() => setShowUserOption(true)}
      onMouseLeave={() => setShowUserOption(false)}
    >
      <div className='border-b border-[#B3B3B3] py-2 gap-2.5 flex items-center text-default-text font-[600]'>
        Welcome, {user?.firstName} {user?.lastName}
      </div>
      <ul>
        {MENU_ITEMS.map((item) => (
          <li key={item.title}>
            <CustomLink
              href={item.link}
              className='flex items-center py-2 gap-2.5 text-default-text font-[600]'
            >
              <Image isStatic alt={item.title} src={item.icon} />
              <span className='!font-[#273721]'>{item.title}</span>
            </CustomLink>
          </li>
        ))}
      </ul>
      <div
        onClick={handleLogout}
        className='border-t border-[#B3B3B3] py-2 gap-2.5 flex items-center text-default-text font-[600]'
      >
        <CustomLink
          href={paths.home}
          className='flex items-center py-2 gap-2.5 text-default-text font-[600]'
        >
          <Image
            isStatic={true}
            alt={'logoutIcon'}
            src={'/assets/images/logoutIcon.svg'}
          />
          <span className='!font-[#273721]'>Log Out</span>
        </CustomLink>
      </div>
    </div>
  );
};

export default UserMenu;
