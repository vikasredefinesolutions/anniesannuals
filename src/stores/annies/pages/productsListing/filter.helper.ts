import {
  FilterFacetFieldsValues,
  iSelectedFilter,
} from '@/app/[...slug]/slug.helper';
import { SORT } from '@/shared/apis/product/productList';
import _debounce from 'lodash/debounce';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

let initialLoad = true;

interface iProps {
  selectedFilters: iSelectedFilter[];
  seName: string;
  sortBy: SORT;
  facetsFoundInURl: boolean;
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

export const LISTING_APPLIED_FILTERS = 'laf';

export const useFilterOptions = ({
  selectedFilters,
  seName,
  sortBy,
  facetsFoundInURl,
}: iProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const useIgnoreZoneFromQueryParams =
    useSearchParams().get('ignorezone') === 'true';

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

  const updateRoute = ({
    filtersToApply,
    ignoreZone,
  }: {
    filtersToApply: iSelectedFilter[];
    ignoreZone: boolean;
  }) => {
    const ignoreZoneReally = useIgnoreZoneFromQueryParams || ignoreZone;

    if (filtersToApply.length === 0) {
      const query = `?sort=${sortBy}&page=1&ignorezone=true`;
      storeFiltersLocally({
        filters: [],
        seName,
      });
      router.replace(`/${seName}.html${query}`);
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
      const url = `/${parameters}/${parametersValue}/${seName}.html${query}`;
      storeFiltersLocally({
        filters: filtersToApply,
        seName,
      });
      router.replace(url);
      return;
    }

    storeFiltersLocally({
      filters: filtersToApply,
      seName,
    });
    router.replace(`/${seName}.html${query}`);
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
      });
      return;
    }

    if (!isMobile) {
      updateRoute({ filtersToApply: filtersToApply, ignoreZone: ignoreZone });
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
      updateRoute({ ignoreZone: true, filtersToApply: [] });
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

    updateRoute({ ignoreZone, filtersToApply: remainingFilters });
  };

  const applyAllFiltersAtOnce = () => {
    updateRoute({
      filtersToApply: checkedFilters.filters,
      ignoreZone: checkedFilters.ignoreZone,
    });
    setMobileDropdown(null);
  };

  useEffect(() => {
    setCheckedFilters({
      filters: selectedFilters,
      ignoreZone: useIgnoreZoneFromQueryParams,
    });
  }, [useIgnoreZoneFromQueryParams]);

  return {
    loading,
    setLoading,
    //
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
