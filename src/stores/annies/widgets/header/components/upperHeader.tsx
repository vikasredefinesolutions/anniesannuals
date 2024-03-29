import { useAppSelector } from '@/app/redux/hooks';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import { tStoreDetailsFile } from '@/helper/staticfile.helper';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import {
  _CustomField,
  _GetSearchInput,
  getGlobalSearchInput,
} from '@/shared/apis/header/globalSearch';
import storeDetails from '@/staticData/storeDetails.json';
import useModel from '@/stores/annies/shared/hooks/use-model';
import { useDebounce } from '@/stores/annies/shared/hooks/useDebounce';
import { getUserId } from '@/utils/cookie.helper';
import { paths } from '@/utils/paths.constant';
import { usePathname, useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SearchResults from './SearchResults';
import HeaderCart from './headerCart';

interface Props {
  onOpenModel: () => void;
  cmsStoreThemeConfigsViewModel: tStoreDetailsFile['cmsStoreThemeConfigsViewModel'];
}

const UpperHeader: React.FC<Props> = (Props) => {
  const { cartData } = useAppSelector((state) => state.cart);
  const { onOpenModel, cmsStoreThemeConfigsViewModel } = Props;
  const { isOpen, openModel, onRequestClose } = useModel(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedValue = useDebounce<string>(searchQuery, 500);
  const [searchData, setSearchData] = useState<_GetSearchInput[]>([]);
  // const [showUserOption, setShowUserOption] = useState<boolean>(false);
  const [closeSearch, setCloseSearch] = useState(true);
  const { storeId } = storeDetails;
  const router = useRouter();
  const dispatch = useDispatch();
  const userId = getUserId();
  const pathname = usePathname();

  const annoucementRowDetails = cmsStoreThemeConfigsViewModel.find(
    (item) => item.config_name === 'header_config',
  )?.config_value;
  const annoucement = annoucementRowDetails
    ? JSON.parse(annoucementRowDetails)
    : {};

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchQuery(event.target.value);
    setCloseSearch(true);
  };

  const handleSearchClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCloseSearch(true);
  };

  const handleRedirection = (): void => {
    if (searchQuery.length <= 2) {
      dispatch(
        openAlertModal({
          title: '',
          description: 'Please enter at least 3 characters to search',
          isAlertModalOpen: true,
        }),
      );
    } else {
      setSearchQuery('');
      router.push(
        `${paths.searchProductListing}?q=${encodeURIComponent(searchQuery)}`,
      );
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleRedirection();
    }
  };

  const getSearchData = async () => {
    const payload = {
      storeId: storeId,
      content: debouncedValue,
      isFull: true,
      isDiscontinue: false,
      hoverCount: 20,
    };
    try {
      const data = await getGlobalSearchInput(payload);
      data && setSearchData(data);
    } catch (error: any) {
      console.log(error?.message || 'something missing search data payload');
    }
  };

  useEffect(() => {
    if (searchQuery === '') {
      setSearchData([]);
    }

    if ((searchQuery || '').length >= 2) {
      getSearchData();
    }
  }, [debouncedValue]);

  useEffect(() => {
    const handleClick = () => {
      setCloseSearch(false);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [closeSearch]);

  function getCultivatedName(field: _CustomField[] | null, labelValue: string) {
    const fieldValue = field?.find(
      (field: { label: string; value: string }) => field.label === labelValue,
    )?.value;

    return fieldValue
      ? labelValue !== 'SECONDARY COMMON NAME'
        ? `${fieldValue},`
        : fieldValue
      : '';
  }

  const cartTotal = () => {
    let totalItems = 0;
    if (cartData && cartData.length > 0) {
      cartData.map((el) => {
        totalItems = totalItems + el.totalQty;
      });
    }

    return totalItems;
  };

  return (
    <>
      <div className='bg-[#FFF3E0]'>
        <div className='container mx-auto'>
          <div className=''>
            <div className='font-extrabold text-[12px] uppercase w-full lg:hidden flex justify-center text-center py-[5px]'>
              {annoucement?.announcementRow[0]?.isVisible && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: annoucement?.announcementRow[0]?.leftSideText || '',
                  }}
                ></div>
              )}
            </div>
            <div className='flex justify-between relative left-0 top-[31px] lg:top-[0px] pb-[40px] lg:pb-[0px] '>
              <div className='lg:hidden relative left-0 h-8 w-4 z-10'>
                <button
                  aria-label='mobile-menu'
                  type='button'
                  className='text-[#295B4C] mobile-menu-btn'
                  onClick={onOpenModel}
                >
                  <Image
                    isStatic={true}
                    src={'/assets/images/hamburgerMenu.svg'}
                    alt='menu'
                  />
                </button>
              </div>
              <div className='w-[120px] mx-auto lg:mx-0 lg:flex lg:items-center lg:w-[25%] relative z-10'>
                <CustomLink
                  title='Annie`s Annuals and Perennials'
                  className='max-w-[310px] w-full lg:inline-block block lg:mt-[-40px] mt-[-25px]'
                  href={paths.home}
                >
                  <div className='brand-logo w-full'>
                    <Image
                      src={storeDetails.logoUrl}
                      alt='annies'
                      className='max-h-full'
                      width={216}
                      height={100}
                    />
                  </div>
                </CustomLink>
              </div>
              <div className='hidden lg:flex lg:items-end lg:w-1/3'>
                <div className='mt-[8px]'>
                  <CustomLink href={paths.orderFreeCatalog}>
                    <Image
                      isStatic={true}
                      src={'/assets/images/annies-digital-catalog-top.svg'}
                      alt={'catalog_logo'}
                    />
                  </CustomLink>
                </div>
              </div>
              <div
                className='w-full lg:w-1/3 hidden lg:flex items-center justify-end'
                itemScope
                itemType='https://schema.org/WebSite'
              >
                <meta
                  itemProp='url'
                  content={process.env.NEXT_PUBLIC_MAIN_DOMAIN}
                />
                <form
                  className='w-full'
                  itemProp='potentialAction'
                  itemScope
                  itemType='https://schema.org/SearchAction'
                >
                  <meta
                    itemProp='target'
                    content={
                      process.env.NEXT_PUBLIC_MAIN_DOMAIN +
                      `search/result?q={search_term_string}`
                    }
                  />
                  <div className='w-full relative'>
                    <div className='border border-[#295B4C] rounded-tl-sm rounded-br-sm pt-[9px] pb-[9px] pl-[15px] pr-[30px] relative bg-[#ffffff]'>
                      <input
                        itemProp='query-input'
                        autoComplete='off'
                        className='bg-opacity-20 outline-none w-full border-0 focus:ring-0 text-[15px] text-[#273721] bg-[#ffffff]'
                        id='txtSearchDesktop'
                        maxLength={255}
                        min={1}
                        name='search_term_string'
                        placeholder='Search our store…'
                        type='text'
                        onChange={(e) => handleSearch(e)}
                        value={searchQuery}
                        onKeyDown={(e) => handleKeyPress(e)}
                        onClick={(e) => handleSearchClick(e)}
                      />
                      <button
                        type='button'
                        onClick={handleRedirection}
                        className='flex items-center justify-center'
                      >
                        <span className='w-[17px] h-[17px] inline-block absolute right-[8px] top-1/2 -translate-y-1/2'>
                          <Image
                            src={'/assets/images/icon-header-search.png'}
                            alt='search'
                            className='max-h-full mx-auto'
                            isStatic={true}
                          />
                        </span>
                      </button>
                    </div>
                    {searchData.length > 0 && closeSearch ? (
                      <ul
                        onBlur={() => setSearchQuery('')}
                        className='bg-white p-3 mt-1 border border-[#295B4C] absolute z-50 w-full max-h-[350px] overflow-auto'
                      >
                        {searchData?.map(
                          ({ name, id, seName, customFields }, index) => (
                            <Fragment key={id}>
                              <CustomLink href={`/${seName}.html`}>
                                <li>
                                  <div
                                    onClick={() => setSearchQuery('')}
                                    className={`flex justify-between items-center ${
                                      index === searchData.length - 1
                                        ? ''
                                        : 'border-b border-b-gray-border pb-[10px] mb-[10px]'
                                    } `}
                                  >
                                    {name}&nbsp;
                                    <SearchResults
                                      customFields={customFields}
                                    />
                                  </div>
                                </li>
                              </CustomLink>
                            </Fragment>
                          ),
                        )}
                      </ul>
                    ) : null}
                  </div>
                </form>
              </div>
              <div className='lg:hidden flex gap-[7px]'>
                <div>
                  <CustomLink
                    href={userId ? paths.accountSetting : paths.login}
                    className='text-[#ffffff] flex items-center justify-center'
                  >
                    <span
                      // onMouseOver={() => {
                      //   userId && setShowUserOption(true);
                      // }}
                      // onMouseLeave={() => {
                      //   userId && setShowUserOption(false);
                      // }}
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
                  {/* {showUserOption && (
                    <UserMenu setShowUserOption={setShowUserOption} />
                  )} */}
                </div>
                <div>
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
                <div>
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
            <div className='lg:hidden'>
              <form>
                <div className='pb-[10px] relative'>
                  <div className='border border-[#295B4C] rounded-tl-sm rounded-br-sm pt-[9px] pb-[9px] pl-[15px] pr-[30px] relative bg-white'>
                    <input
                      autoComplete='off'
                      type='text'
                      className='bg-transparent outline-none w-full border-0 focus:ring-0 text-[15px] text-[#273721]'
                      id='txtSearchMobile'
                      min={1}
                      maxLength={255}
                      name='search_term_string'
                      placeholder='Search our store'
                      onChange={(e) => handleSearch(e)}
                      value={searchQuery}
                      onKeyDown={(e) => handleKeyPress(e)}
                    />
                    <button
                      onClick={handleRedirection}
                      type='button'
                      className='flex items-center justify-center'
                    >
                      <span className='w-[17px] h-[17px] inline-block absolute right-[8px] top-1/2 -translate-y-1/2'>
                        <Image
                          src={'/assets/images/icon-header-search.png'}
                          alt='search'
                          className='max-h-full mx-auto'
                          isStatic={true}
                        />
                      </span>
                    </button>
                  </div>
                  {searchData.length > 0 ? (
                    <ul className='bg-white p-3 mt-1  border border-[#295B4C] absolute z-50 w-full max-h-[350px] overflow-auto'>
                      {searchData?.map(
                        ({ name, id, seName, customFields }, index) => (
                          <Fragment key={id}>
                            <CustomLink href={`/${seName}.html`}>
                              <li className=''>
                                <div
                                  onClick={() => setSearchQuery('')}
                                  className={`flex justify-between items-center ${
                                    index === searchData.length - 1
                                      ? ''
                                      : 'border-b border-b-gray-border pb-[10px] mb-[10px]'
                                  } `}
                                >
                                  {name}&nbsp;
                                  {/* {`(
                                      ${getCultivatedName(
                                        customFields,
                                        'CULTIVAR NAME',
                                      )}
                                      ${getCultivatedName(
                                        customFields,
                                        'PREFERRED COMMON NAME',
                                      )}
                                      ${getCultivatedName(
                                        customFields,
                                        'SECONDARY COMMON NAME',
                                      )}

                                    )`} */}
                                  <SearchResults customFields={customFields} />
                                </div>
                              </li>
                            </CustomLink>
                          </Fragment>
                        ),
                      )}
                    </ul>
                  ) : null}
                </div>
              </form>
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
      <div className='bg-[#FFF3E0]'></div>
    </>
  );
};

export default UpperHeader;
