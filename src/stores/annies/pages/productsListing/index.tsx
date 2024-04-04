'use client';

import { IProductListProps } from '@/app/[...slug]/page';
import { useAppSelector } from '@/app/redux/hooks';
import HomeComponents from '@/components/HomeComponents';
import Card from '@/shared/Components/Card';
import { getBackGroundColor } from '@/shared/Components/Card/CardColors';
import { GoogleAnalyticsTracker } from '@/shared/utils/googleAnalytics';
import { getPriceWithMsrpAndSalePrice } from '@/shared/utils/helper';
import { SubCategoryList } from '@/types/header';
import Image from 'next/image';
import React, { useEffect } from 'react';
import BreadCrumbs from '../../shared/components/BreadCrumbs';
import useModel from '../../shared/hooks/use-model';
import Banner from '../../widgets/header/components/Banner';
import HeaderCart from '../../widgets/header/components/headerCart';
import CommonDropdown from './components/CommonDropdown';
import FilterCapsules from './components/FilterCapsules';
import LoadingCards from './components/LoadingCards';
import MobileFiltersDropdown from './components/MobileFiltersDropdown';
import PaginationBar from './components/Pagination';
import SortFilter from './components/SortFilter';
import { useFilterOptions } from './filter.helper';

const ProductListing: React.FC<IProductListProps> = ({
  filterOptions: rawFilterOptions,
  isSubcategory,
  selectedFilters,
  cmsData,
  bannerData,
  seName,
  pageId,
  childCategoryViewModels,
  cmsStoreThemeConfigsViewModel,
  headerSubMenu,
  googleTagManagerResponseCommonData,
  breadCrumbs,
  list,
  predefinedFacetFilterUrl,
  facetsFoundInURl,
}) => {
  const {
    products,
    currentPage,
    goToPageHandler,
    openfilterFacetName,
    checkedFilters,
    toggleDropdown,
    mobileDropDown,
    setMobileDropdown,
    applyAllFiltersAtOnce,
    handleFilterCheckbox,
    setLoading,
    removeFilters,
    loading,
    updateSort,
    filterOptions,
  } = useFilterOptions({
    selectedFilters,
    seName,
    sortBy: list.sortBy,
    list,
    pageId,
    facetsFoundInURl,
    isSubcategory,
    predefinedFacetFilterUrl,
    rawFilterOptions,
  });

  const { openModel, isOpen, onRequestClose } = useModel();

  const userWishList = useAppSelector((state) => state.user.wishlistData);

  useEffect(() => {
    GoogleAnalyticsTracker('', googleTagManagerResponseCommonData);
  }, []);

  const isFilter = filterOptions.length > 0;

  return (
    <>
      {bannerData && bannerData.banner && (
        <Banner
          seName={seName as unknown as keyof SubCategoryList}
          headerSubMenu={headerSubMenu}
          bannerData={bannerData}
        />
      )}
      <BreadCrumbs breadCrumbs={breadCrumbs} />
      <section className="bg-tertiary bg-[url('./images/results-section-top-floral.png')] bg-top bg-contain bg-no-repeat overflow-x-hidden 2xl:overflow-x-visible">
        <div className="bg-[url('./images/results-section-bottom-floral.png')] bg-bottom bg-contain bg-no-repeat">
          <div className='container mx-auto relative'>
            <div className='absolute left-[-12%] top-[13%] hidden 2xl:inline-block'>
              <Image
                src='/assets/images/butterfly-1.png'
                alt={'butterfly'}
                height={191}
                width={153}
              />
            </div>
            <div className='md:flex flex-wrap justify-between items-center w-full pt-[20px] pb-[30px] hidden'>
              <div
                id={'results_count'}
                className='font-sub font-bold text-2xl-text py-2 sm:py-0'
              >
                {`${products.totalAvailable} Results`}
              </div>
              {!isSubcategory && (
                <SortFilter
                  isMobile={false}
                  sortedBy={products.sortBy}
                  currentPage={currentPage}
                  setLoading={setLoading}
                  setDropDownValue={setMobileDropdown}
                />
              )}
            </div>
            <div className='flex flex-wrap mx-[-15px]'>
              {!isSubcategory && filterOptions && filterOptions.length > 0 && (
                <div className='md:w-4/12 xl:w-3/12 w-full px-[15px] md:block hidden'>
                  <div className='w-full'>
                    <div className='pb-[30px] text-normal-text font-sub font-bold'>
                      Filter by:
                    </div>
                    <div className='w-full px-[15px] md:px-0'>
                      {filterOptions?.map((filter, filterPosition) => {
                        let isDropdownOpen =
                          openfilterFacetName === filter.sename;

                        if (
                          openfilterFacetName === 'open-first' &&
                          filterPosition === 1
                        ) {
                          isDropdownOpen = true;
                        }

                        return (
                          <div key={filter.filterFacetFieldId}>
                            <CommonDropdown
                              isMobile={false}
                              field={filter}
                              isDropdownOpen={isDropdownOpen}
                              toggleDropdown={toggleDropdown}
                              handleFilterCheckbox={handleFilterCheckbox}
                              checkedFilters={checkedFilters.filters}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
              <div
                className={`${
                  isSubcategory || !isFilter
                    ? 'w-full px-[15px]'
                    : 'md:w-8/12 xl:w-9/12 w-full px-[15px]'
                }`}
              >
                <div className='font-sub font-bold text-2xl-text py-2 sm:py-0 md:hidden'>
                  {`${products.totalAvailable} Results`}
                </div>
                {!isSubcategory && (
                  <FilterCapsules
                    seName={seName}
                    facetsFoundInURl={facetsFoundInURl}
                    isMobile={false}
                    removeFilters={(data) => {
                      removeFilters(data);
                      setLoading(true);
                    }}
                    checkedFilters={checkedFilters.filters}
                  />
                )}
                <div className='flex flex-wrap mx-[-8px] lg:mx-[-15px] theme-color'>
                  {!loading &&
                    products.visible?.map((product, index) => {
                      const bgColor = getBackGroundColor(index);

                      return (
                        <Card
                          product={product}
                          key={product?.id}
                          id={product?.id}
                          sename={product?.sename}
                          productCustomField={product.productCustomFields}
                          name={product?.name}
                          // price={product?.msrp}
                          price={getPriceWithMsrpAndSalePrice(
                            +product?.salePrice,
                            +product?.msrp,
                          )}
                          scrollToTopFor={'listing'}
                          openModel={openModel}
                          // image={
                          //   isSubcategory
                          //     ? product?.categoryImageList[0]?.categoryImage
                          //     : product?.getProductImageOptionList[0]?.imageName
                          // }
                          image={
                            product?.getProductImageOptionList[0]?.imageName
                          }
                          reviews={product?.productRatingAverage}
                          reviewCount={+(product?.productReviewsCount || 0)}
                          userWishList={userWishList}
                          productTagViewModel={product?.productTagViewModel}
                          imageAltTag={
                            product?.getProductImageOptionList[0]?.alttag || ''
                          }
                          getProductImageOptionList={[]}
                          cmsStoreThemeConfigsViewModel={
                            cmsStoreThemeConfigsViewModel
                          }
                          isSubcategory={isSubcategory}
                          isAtoZ={false}
                          containerBg={bgColor}
                          isFilter={isFilter}
                        />
                      );
                    })}

                  {loading && (
                    <LoadingCards
                      cardsToShow={list.jumpBy}
                      isSubcategory={isSubcategory}
                    />
                  )}
                </div>
                {/* {false && (
                  <LoadMoreButton
                    loading={loading}
                    itemsPerPage={products.jumpBy}
                    currentPage={currentPage}
                    availableProductsCount={products.totalAvailable}
                    loadMoreHandler={loadMoreHandler}
                  />
                )} */}
                {products?.totalPages > 1 && (
                  <PaginationBar
                    currentPage={currentPage}
                    totalPages={products.totalPages}
                    onPageChange={goToPageHandler}
                  />
                )}
                <div className='my-[10px]'>
                  <HomeComponents homeComponents={cmsData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {mobileDropDown === 'filter' && (
        <MobileFiltersDropdown
          filterOptions={filterOptions}
          openfilterFacetName={openfilterFacetName}
          applyAllFiltersAtOnce={applyAllFiltersAtOnce}
          removeFilters={removeFilters}
          seName={seName}
          facetsFoundInURl={facetsFoundInURl}
          toggleDropdown={toggleDropdown}
          handleFilterCheckbox={handleFilterCheckbox}
          checkedFilters={checkedFilters.filters}
          setDropDownValue={setMobileDropdown}
        />
      )}

      {mobileDropDown === 'sort' && (
        <SortFilter
          isMobile
          sortedBy={products.sortBy}
          currentPage={currentPage}
          setDropDownValue={setMobileDropdown}
          setLoading={setLoading}
        />
      )}
      {isOpen && (
        <HeaderCart
          closeCart={onRequestClose}
          cmsStoreThemeConfigsViewModel={cmsStoreThemeConfigsViewModel}
        />
      )}
      <div className='fixed bottom-0 left-0 right-0 z-50 md:hidden'>
        <div className='flex justify-center items-center h-[60px]'>
          <a
            onClick={() => setMobileDropdown('filter')}
            className='w-1/2 !rounded-none inline-flex items-center gap-1 filter-btn bg-[#9F2D3C] text-[#ffffff] h-[60px] justify-center'
          >
            <span className='material-icons-outlined'>filter_alt</span>
            <span className='font-semibold'>FILTERS</span>
          </a>
          <a
            onClick={() => setMobileDropdown('sort')}
            className='w-1/2 !rounded-none inline-flex items-center gap-1 sort-btn bg-[#694D84] text-[#ffffff] h-[60px] justify-center'
          >
            <span className='material-icons-outlined rotate-90'>sync_alt</span>
            <span className='font-semibold'>SORT BY</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default ProductListing;