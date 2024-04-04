import { IProductListProps } from '@/app/[...slug]/page';
import {
  FilterFacetField,
  FilterFacetFieldsValues,
  iSelectedFilter,
} from '@/app/[...slug]/slug.helper';
import {
  SORT,
  fetchProductList,
  fetchProductListForPlantFinder,
} from '@/shared/apis/product/productList';
import { IListingProduct } from '@/shared/types/product';
import {
  getGrowingZone,
  getStoreId,
  getUserId,
} from '@/shared/utils/cookie.helper';
import _debounce from 'lodash/debounce';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import {
  extractFacetsAndFilters,
  formatFilter,
  pagination,
  productListForMozarchy,
} from './client';

let initialLoad = true;
export const LISTING_APPLIED_FILTERS = 'laf';

interface iProps {
  selectedFilters: iSelectedFilter[];
  seName: string;
  rawFilterOptions: [] | FilterFacetField[];
  sortBy: SORT;
  facetsFoundInURl: boolean;
  isSubcategory: IProductListProps['isSubcategory'];
  list: IProductListProps['list'];
  pageId: IProductListProps['pageId'];
  predefinedFacetFilterUrl: IProductListProps['predefinedFacetFilterUrl'];
}

function removeDuplicates(arr: string[]) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

const extractInitialFacetFieldId = (
  selectedFilters: iSelectedFilter[],
): 'open-first' | string => {
  if (selectedFilters.length > 0) {
    if (initialLoad) {
      initialLoad = false;
      return 'open-first';
    }
    //
    let lastFacetAdded: string = 'zone';
    selectedFilters.forEach((facet) => {
      if (facet.allowToRemoveFromChip) {
        lastFacetAdded = facet.facetName;
        return;
      }
    });

    return lastFacetAdded === 'zone' ? 'open-first' : lastFacetAdded;
  }

  return 'open-first';
};

export const useFilterOptions = ({
  selectedFilters,
  seName,
  sortBy,
  pageId,
  list,
  isSubcategory,
  predefinedFacetFilterUrl,
  rawFilterOptions,
  facetsFoundInURl,
}: iProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const useIgnoreZoneFromQueryParams =
    useSearchParams().get('ignorezone') === 'true';

  const facetsFromQuery = useSearchParams().get('facets');
  const filtersFromQuery = useSearchParams().get('filters');

  const [filterOptions, setFilterOptions] = useState(rawFilterOptions);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [latestSortBy, setLatestSortBy] = useState<SORT>(sortBy);
  const [products, setProducts] = useState<{
    jumpBy: number;
    totalAvailable: number;
    totalPages: number;
    sortBy: SORT;
    visible: IListingProduct[];
  }>({
    jumpBy: list.jumpBy,
    totalAvailable: list.totalAvailable,
    totalPages: Math.ceil(list.totalAvailable / list.jumpBy),
    sortBy: list.sortBy,
    visible: list.products,
  });

  const [mobileDropDown, setMobileDropdown] = useState<
    'filter' | 'sort' | null
  >(null);
  const [openfilterFacetName, setOpenFilterFacetName] = useState<
    'open-first' | string | null
  >(extractInitialFacetFieldId(selectedFilters));

  const [checkedFilters, setCheckedFilters] = useState<{
    filters: iSelectedFilter[];
    ignoreZone: boolean;
  }>({ filters: selectedFilters, ignoreZone: useIgnoreZoneFromQueryParams });

  const storeFiltersLocally = ({
    filters,
    seName,
  }: {
    filters: iSelectedFilter[];
    seName: string;
  }) => {
    localStorage.setItem(
      LISTING_APPLIED_FILTERS,
      JSON.stringify({ filters, seName }),
    );
  };

  const removeZoneFromFiltersIfValueIsAll = (
    filtersToApply: iSelectedFilter[],
  ): string[] => {
    const filters: string[] = [];
    filtersToApply.forEach((filter) => {
      if (filter.facetName === 'zone' && filter.filterFacetFieldValue === 'All')
        return;

      filters.push(filter.facetName.toLowerCase());
    });
    return filters;
  };

  const removePredefinedFacets = (
    facetsNFiltersToApply: iSelectedFilter[],
  ): iSelectedFilter[] => {
    const filters: iSelectedFilter[] = [];

    facetsNFiltersToApply.forEach((facet) => {
      if (facet.allowToRemoveFromChip) {
        filters.push(facet);
        return;
      }
    });

    return filters;
  };

  const dontUpdateRoute = async ({
    encodedFacets,
    encodedFilters,
    latestCurrentPage,
    latestSortBy,
  }: {
    encodedFilters: string | null;
    encodedFacets: string | null;
    latestCurrentPage: number;
    latestSortBy: SORT;
  }) => {
    const { filterFacets, filtersChips } = extractFacetsAndFilters({
      encodedFacets,
      encodedFilters,
      ignoreZone: useIgnoreZoneFromQueryParams,
      filterFacetUrl: predefinedFacetFilterUrl,
      zoneFromCookie: getGrowingZone()?.zoneName || null,
    });

    const rawProducts = await getProductsLocally({
      filterFacets,
      latestCurrentPage,
      latestSortBy,
    });
    if (!rawProducts) throw new Error('Error fetching products list.');
    const selectedFilters = formatFilter(filtersChips, rawProducts);
    const products = productListForMozarchy(rawProducts, isSubcategory);

    setCheckedFilters((prev) => ({
      ignoreZone: prev.ignoreZone,
      filters: selectedFilters,
    }));
    setProducts({
      jumpBy: list.jumpBy,
      totalAvailable: products.totalrecords,
      sortBy: list.sortBy,
      totalPages: Math.ceil(list.totalAvailable / list.jumpBy),
      visible: products.list,
    });
    setFilterOptions(products.storeFilterFacetFieldsViewModel);
    setLoading(false);
  };

  const getProductsLocally = async ({
    filterFacets,
    latestCurrentPage,
    latestSortBy,
  }: {
    filterFacets: {
      name: string;
      value: string[];
    }[];
    latestCurrentPage: number;
    latestSortBy: SORT;
  }) => {
    const plantFinder = seName === 'plant-finder';
    const { startIndex, endIndex } = pagination(
      latestSortBy,
      latestCurrentPage.toString(),
    );

    if (plantFinder) {
      return await fetchProductListForPlantFinder({
        storeID: getStoreId(),
        categoryIds: [0],
        customerId: getUserId(),
        pageStartindex: startIndex,
        pageEndindex: endIndex,
        filterOptionforfaceteds: filterFacets,
        sortby: latestSortBy,
      });
    }
    return await fetchProductList({
      storeID: getStoreId(),
      categoryIds: [pageId],
      customerId: getUserId(),
      pageStartindex: startIndex,
      pageEndindex: endIndex,
      filterOptionforfaceteds: filterFacets,
      sortby: latestSortBy,
    });
  };

  const updateRoute = ({
    filtersToApply,
    ignoreZone,
    latestCurrentPage,
    latestSortBy,
  }: {
    filtersToApply: iSelectedFilter[];
    ignoreZone: boolean;
    latestCurrentPage: number;
    latestSortBy: SORT;
  }) => {
    const ignoreZoneReally = useIgnoreZoneFromQueryParams || ignoreZone;

    if (filtersToApply.length === 0) {
      storeFiltersLocally({
        filters: [],
        seName,
      });
      const query = `?sort=${sortBy}&page=1&ignorezone=true`;
      router.replace(`/${seName}.html${query}`, { scroll: false });
      return;
    }

    const facets = removeDuplicates(
      removeZoneFromFiltersIfValueIsAll(removePredefinedFacets(filtersToApply)),
    );

    //
    const filters: string[] = [];
    //
    facets.forEach((name) => {
      const filteredValue = filtersToApply.filter((filter) => {
        if (!filter.allowToRemoveFromChip) return false;

        return filter.facetName === name;
      });
      const filterValueInString = encodeURIComponent(
        filteredValue
          .map((res) => res.sename)
          .join('~')
          .toLowerCase(),
      );
      filters.push(filterValueInString);
    });

    const query = `?sort=${sortBy}&page=1&ignorezone=${ignoreZoneReally}`;

    if (facets.length !== 0 && facets.length === filters.length) {
      const parameters = facets.join(',');
      const parametersValue = filters.join(',');

      setLoading(true);

      const url = `/${seName}.html${query}&facets=${parameters}&filters=${parametersValue}`;
      storeFiltersLocally({
        filters: filtersToApply,
        seName,
      });
      router.replace(url, { scroll: false });
      return;
    }

    storeFiltersLocally({
      filters: filtersToApply,
      seName,
    });
    router.replace(`/${seName}.html${query}`, { scroll: false });
  };

  const handleDelayRouteUpdation = useCallback(
    _debounce(updateRoute, 1500),
    [],
  );

  const handleFilterCheckbox = (
    option: FilterFacetFieldsValues,
    dropdownName: string,
    isMobile: boolean,
    allowToRemoveFromChip: boolean,
    delayRouteUpdation: boolean = false,
  ) => {
    if (!isMobile) {
      setLoading(true);
    }
    const filtersToApply: iSelectedFilter[] = [];
    let filterAlreadyInTheList = false;
    const ignoreZone = dropdownName === 'zone';

    checkedFilters.filters.forEach((filter) => {
      if (filter.facetName === 'zone' && option.sename === 'all') {
        filterAlreadyInTheList = true;
        // filtersToApply.push({
        //   ...option,
        //   facetName: 'zone',
        //   allowToRemoveFromChip,
        // });
        return;
      }

      if (filter.filterFacetFieldValueId === option.filterFacetFieldValueId) {
        filterAlreadyInTheList = true;
        return;
      }

      filtersToApply.push(filter);
    });

    if (!filterAlreadyInTheList) {
      filtersToApply.push({
        ...option,
        facetName: dropdownName,
        allowToRemoveFromChip,
      });
    }

    setCheckedFilters({
      filters: filtersToApply,
      ignoreZone: ignoreZone,
    });

    if (delayRouteUpdation) {
      handleDelayRouteUpdation({
        filtersToApply: filtersToApply,
        ignoreZone: ignoreZone,
        latestSortBy,
        latestCurrentPage: currentPage,
      });
      return;
    }

    if (!isMobile) {
      updateRoute({
        filtersToApply: filtersToApply,
        ignoreZone: ignoreZone,
        latestSortBy,
        latestCurrentPage: currentPage,
      });
    }
  };

  const toggleDropdown = (facetToOpen: string | null) => {
    if (!facetToOpen) {
      setOpenFilterFacetName(null);
    }
    setOpenFilterFacetName((openedFacet) =>
      openedFacet === facetToOpen ? null : facetToOpen,
    );
  };

  const extractFiltersFromLocalStorage = () => {
    const string = localStorage.getItem(LISTING_APPLIED_FILTERS);
    if (!string) return null;
    const filtersWithSeName = JSON.parse(string) as {
      filters: iSelectedFilter[];
      seName: string;
    };
    if (filtersWithSeName.seName !== seName) return null;
    return filtersWithSeName.filters;
  };

  const removeFilters = ({
    type,
    filterFacetFieldValueId,
    ignoreZone,
  }: {
    type: 'individual' | 'all';
    filterFacetFieldValueId: null | number;
    ignoreZone: boolean;
  }) => {
    if (type === 'all') {
      updateRoute({
        ignoreZone: useIgnoreZoneFromQueryParams,
        filtersToApply: [],
        latestSortBy,
        latestCurrentPage: currentPage,
      });
      return;
    }

    let filtersToUse: iSelectedFilter[] = selectedFilters;
    if (!selectedFilters || selectedFilters.length === 0) {
      if (facetsFoundInURl) {
        filtersToUse = extractFiltersFromLocalStorage() || [];
      }
    }

    const remainingFilters: iSelectedFilter[] = filtersToUse.filter(
      (filter) => filter.filterFacetFieldValueId !== filterFacetFieldValueId,
    );

    updateRoute({
      ignoreZone,
      filtersToApply: remainingFilters,
      latestSortBy,
      latestCurrentPage: currentPage,
    });
  };

  const applyAllFiltersAtOnce = () => {
    updateRoute({
      filtersToApply: checkedFilters.filters,
      ignoreZone: checkedFilters.ignoreZone,
      latestSortBy,
      latestCurrentPage: currentPage,
    });
    setMobileDropdown(null);
  };

  const goToPageHandler = (pageNo: number) => {
    setLoading(true);
    setCurrentPage(pageNo);
    const facets = facetsFromQuery ? `&facets=${facetsFromQuery}` : '';
    const filters = filtersFromQuery ? `&filters=${filtersFromQuery}` : '';
    const query =
      `?sort=${products.sortBy}&page=${pageNo}&ignorezone=${useIgnoreZoneFromQueryParams}` +
      facets +
      filters;

    router.push(query, { scroll: false });
  };

  const updateSort = (sortBy: number) => {
    updateRoute({
      filtersToApply: checkedFilters.filters,
      ignoreZone: useIgnoreZoneFromQueryParams,
      latestSortBy: sortBy,
      latestCurrentPage: currentPage,
    });
  };

  useEffect(() => {
    setCheckedFilters((prev) => ({
      filters: selectedFilters,
      ignoreZone: useIgnoreZoneFromQueryParams,
    }));
  }, [useIgnoreZoneFromQueryParams, selectedFilters.length]);

  useEffect(() => {
    setCurrentPage(list.currentPage);
    setProducts({
      jumpBy: list.jumpBy,
      totalAvailable: list.totalAvailable,
      sortBy: list.sortBy,
      totalPages: Math.ceil(list.totalAvailable / list.jumpBy),
      visible: list.products,
    });
    setLoading(false);
  }, [list]);

  return {
    products,
    currentPage,
    goToPageHandler,
    //
    updateSort,
    //
    loading,
    setLoading,
    //
    filterOptions,
    checkedFilters,
    //
    mobileDropDown,
    setMobileDropdown,
    //
    openfilterFacetName,
    setOpenFilterFacetName,
    //
    removeFilters,
    handleFilterCheckbox,
    toggleDropdown,
    applyAllFiltersAtOnce,
  };
};
