'use client';
import { _Payload } from '@/features/myAccount/deleteAccount/controller';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import { getUserDetails, getUserId } from '@/shared/utils/cookie.helper';
import { paths } from '@/utils/paths.constant';
import { usePathname } from 'next/navigation';
import React, { Fragment, ReactNode, useState } from 'react';
import Verification from '../../pages/delete-account/Verification';
import BreadCrumbs from './BreadCrumbs';
import CancelOrderPopUp from './order-details/cancelOrder';

interface Props {
  verificationPayload?: _Payload;
  children: ReactNode;
  isOpen?: boolean;
  onRequestClose?: () => void;
  checkAccount?: boolean;
  isCancelOrder?: boolean;
  onRequestCancelOrder?: () => void;
  orderNumber?: number;
}

interface Imenu {
  name: string;
  slug: string[];
  id: number;
}
const SideLayout: React.FC<Props> = ({
  verificationPayload,
  children,
  isOpen,
  onRequestClose,
  checkAccount = false,
  isCancelOrder,
  onRequestCancelOrder,
  orderNumber,
}) => {
  const [openModel, setOpenModel] = useState<boolean>(checkAccount);
  const path: string = usePathname();
  const userDetails = getUserDetails();
  const userId = getUserId();
  const myAccountMenu: Imenu[] = [
    {
      id: 11,
      slug: [
        '/account-settings.html',
        '/delete-account.html',
        paths.closeAccountSuccess,
      ],
      name: 'Account Settings',
    },
    { id: 12, slug: ['/address.html'], name: 'Address' },
    { id: 13, slug: ['/email-password.html'], name: 'Email & Password' },
  ];

  const layoutMenu: Imenu[] = [
    { id: 1, slug: ['/dashboard.html'], name: 'Dashboard' },
    {
      id: 2,
      slug: [
        `${paths.orders}`,
        `${paths.orderDetail}/${orderNumber && orderNumber}`,
        `${paths.invoicePage}/${orderNumber && orderNumber}`,
        `${paths.trackPackage}/${orderNumber && orderNumber}`,
        `${paths.orderReturn}`,
        `${paths.orderConfirmReturn}`,
      ],
      // name: 'Orders & Returns',
      name: 'Orders',
    },
    { id: 3, slug: ['/my-reviews.html'], name: 'My Reviews' },
    { id: 4, slug: ['/wishlist.html'], name: 'Wishlist' },
    { id: 5, slug: [`${paths.accountSetting}`], name: 'Account Settings' },
    { id: 6, slug: [`${paths.address}`], name: 'Address' },
    { id: 7, slug: [`${paths.changesPassword}`], name: 'Email &  Password' },
    {
      id: 8,
      slug: [userId ? '/gift-cards.html' : paths.login],
      name: 'Store Credits & Gift Cards',
    },
    {
      id: 9,
      slug: [
        `${paths.ordersHistory}`,
        `${paths.ordersHistoryDetail}/${orderNumber && orderNumber}`,
      ],
      name: 'Orders History',
    },
    // {
    //   id: 9,
    //   slug: ['/alerts-communications.html'],
    //   name: 'Alerts & Communications',
    // },
    // { id: 10, slug: ['/help-centre.html'], name: 'Help Centre' },
  ];
  const allMenu: Imenu[] = [...myAccountMenu, ...layoutMenu];
  const filterSlug: Imenu[] = allMenu.filter(
    ({ slug, name }: Imenu) => path === slug[0],
  );

  const handleMyAccount = (item?: string) => {
    if (item === 'My Account') {
      setOpenModel(!openModel);
    }
  };
  const checkPath = (path: string): boolean => {
    if (
      !!(path !== `/order-details.html/${orderNumber && orderNumber}`) ||
      path !== '/delete-account.html' ||
      path !== `/invoice.html/${orderNumber && orderNumber}` ||
      path !== `${paths.orderConfirmReturn}`
    ) {
      return true;
    }
    return false;
  };

  return (
    <>
      {isOpen && (
        <Verification
          verificationPayload={verificationPayload}
          onRequestClose={onRequestClose}
        />
      )}
      {isCancelOrder && (
        <CancelOrderPopUp
          onRequestCancelOrder={() => {
            if (onRequestCancelOrder) onRequestCancelOrder();
          }}
          orderNumber={orderNumber}
        />
      )}
      <section className='bg-tertiary'>
        <div className='container mx-auto relative'>
          {path !== paths.orderConfirmReturn ? (
            <div className='py-[20px]'>
              <div>
                <ul className='flex flex-wrap items-center gap-[10px] text-[14px] font-semibold font-sub'>
                  <li>
                    <CustomLink href={paths.home} className='text-anchor'>
                      <Image
                        src={'/assets/images/homeIcon.svg'}
                        alt={'home'}
                        isStatic={true}
                      />
                    </CustomLink>
                  </li>
                  <li>/</li>
                  {checkPath(path) && <li>{filterSlug[0]?.name}</li>}
                  {path ===
                    `/order-details.html/${orderNumber && orderNumber}` && (
                    <>
                      <li>
                        <CustomLink href={`${paths.orders}`}>
                          {/* Orders & Returns */}
                          Orders
                        </CustomLink>
                      </li>
                      <li>/</li>
                      <li>Order Detail(s)</li>
                    </>
                  )}
                  {path === '/order-return.html' && (
                    <>
                      <li>
                        <CustomLink href={`${paths.orders}`}>
                          {/* Orders & Returns */}
                          Orders
                        </CustomLink>
                      </li>
                      <li>/</li>
                      <li>Order Return</li>
                    </>
                  )}

                  {path === '/delete-account.html' && (
                    <>
                      <li>
                        <CustomLink href={'/account-settings.html'}>
                          Account Settings
                        </CustomLink>
                      </li>
                      <li>/</li>
                      <li>Delete Account</li>
                    </>
                  )}
                  {path === paths?.closeAccountSuccess && (
                    <>
                      <li>
                        <CustomLink href={paths?.accountSetting}>
                          Account Settings
                        </CustomLink>
                      </li>
                      <li>/</li>
                      <li>
                        <CustomLink href={paths?.deleteAccount}>
                          Delete Account
                        </CustomLink>
                      </li>
                      <li>/</li>
                      <li>Account Successfully Closed</li>
                    </>
                  )}
                  {path === `/invoice.html/${orderNumber && orderNumber}` && (
                    <>
                      <li>
                        <CustomLink href={`${paths.orders}`}>
                          {/* Orders & Returns */}
                          Orders
                        </CustomLink>
                      </li>
                      <li>/</li>
                      <li>
                        <CustomLink
                          href={`/order-details.html/${
                            orderNumber && orderNumber
                          }`}
                        >
                          Order Details
                        </CustomLink>
                      </li>
                      <li>/</li>
                      <li>{`It’s Ordered, ${userDetails?.firstName} ${userDetails?.lastName}`}</li>
                    </>
                  )}
                  {path ===
                    `${paths.trackPackage}/${orderNumber && orderNumber}` && (
                    <>
                      <li>
                        <CustomLink href={`${paths.orders}`}>
                          {/* Orders & Returns */}
                          Orders
                        </CustomLink>
                      </li>
                      <li>/</li>
                      <li>Order Details</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          ) : (
            <BreadCrumbs breadCrumbs={[]} />
          )}
          <div className='flex flex-wrap mx-[-15px]'>
            <div className='lg:w-3/12 w-full px-[15px]'>
              <div className='text-default-text font-semibold overflow-auto relative mb-[30px] lg:mb-0'>
                <ul className='w-full flex lg:block'>
                  {layoutMenu?.map(({ id, slug, name }: Imenu) => (
                    <Fragment key={id}>
                      <li
                        className={`${
                          name === 'My Account'
                            ? 'hidden lg:flex flex-wrap items-center justify-between mt-[2px] '
                            : 'inline-flex lg:flex flex-wrap items-center justify-between mt-[2px]'
                        }`}
                        onClick={() => handleMyAccount(name)}
                      >
                        <CustomLink
                          href={slug[0]}
                          className={`${
                            slug[0] == path ||
                            slug[1] == path ||
                            slug[2] == path ||
                            slug[3] == path ||
                            slug[4] == path ||
                            (name === 'My Account' && openModel)
                              ? 'lg:border-l-[4px] lg:border-l-[#634B91] bg-[#F6EDFF] text-[#634B91]'
                              : 'lg:border-l-transparent lg:border-l-[4px] bg-transparent'
                          } lg:w-full py-[13px] px-[16px] rounded-[4px] overflow-hidden hover:text-[#634B91] hover:bg-[#F6EDFF] lg:border-l-[4px]  lg:hover:border-l-[4px] lg:hover:border-l-[#634B91] lg:hover:border-t-0 lg:border-t-0 border-t-[4px] border-t-transparent hover:border-t-[4px] hover:border-t-[#634B91] whitespace-nowrap`}
                        >
                          {name}
                          {name === 'My Account' ? (
                            openModel ? (
                              <span className='material-icons-outlined float-right'>
                                expand_less
                              </span>
                            ) : (
                              <span className='material-icons-outlined float-right'>
                                expand_more
                              </span>
                            )
                          ) : null}
                        </CustomLink>
                        {name === 'My Account' && openModel ? (
                          <ul className='w-full'>
                            {myAccountMenu.map((subItem: Imenu) => (
                              <>
                                <li className='flex mt-[2px]' key={subItem.id}>
                                  <CustomLink
                                    href={subItem.slug[0]}
                                    className={`${
                                      subItem.slug[0] === path ||
                                      subItem.slug[1] === path ||
                                      subItem.slug[2] === path
                                        ? '!text-[#634B91] lg:border-l-[4px] lg:border-l-[#634B91] bg-[#F6EDFF]'
                                        : 'lg:border-l-transparent lg:border-l-[4px] bg-transparent'
                                    } w-full lg:w-full py-[13px] px-[16px] pl-[50px] rounded-[4px] overflow-hidden text-black hover:text-[#634B91]  hover:bg-[#F6EDFF]  lg:hover:border-l-[4px] lg:hover:border-l-[#634B91] lg:hover:border-t-0 lg:border-t-0 border-t-[4px] border-t-[#634B91] hover:border-t-[4px] hover:border-t-[#634B91] whitespace-nowrap`}
                                  >
                                    {subItem.name}
                                  </CustomLink>
                                </li>
                              </>
                            ))}
                          </ul>
                        ) : null}
                      </li>
                      {name === 'My Account'
                        ? myAccountMenu.map(({ id, slug, name }: Imenu) => {
                            return (
                              <Fragment key={id}>
                                <li className='inline-flex lg:hidden flex-wrap items-center justify-between mt-[2px]'>
                                  <CustomLink
                                    href={slug[0]}
                                    className={`${
                                      slug[0] == path ||
                                      (name === 'My Account' && openModel)
                                        ? 'bg-[#F6EDFF] text-[#634B91] border-t-[4px] border-t-[#634B91] '
                                        : 'bg-transparent'
                                    } py-[13px] px-[16px] rounded-[4px] overflow-hidden hover:text-[#634B91] hover:bg-[#F6EDFF]  hover:border-t-[#634B91] whitespace-nowrap`}
                                  >
                                    {name}
                                  </CustomLink>
                                </li>
                              </Fragment>
                            );
                          })
                        : null}
                    </Fragment>
                  ))}
                </ul>
              </div>
            </div>
            <div className='lg:w-9/12 w-full px-[15px]'>{children}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SideLayout;
