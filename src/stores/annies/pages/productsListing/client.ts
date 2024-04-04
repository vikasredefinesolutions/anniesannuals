import {
  FilterOption,
  IProductListResponse,
  iSelectedFilter,
} from '@/app/[...slug]/slug.helper';
import { SORT } from '@/shared/apis/product/productList';

const extractPredefinedFacetNFilter = (
  filterFacetUrl: string | null,
): {
  facets: string[];
  filters: string[];
} => {
  if (!filterFacetUrl) {
    return {
      facets: [],
      filters: [],
    };
  }

  const facetNFilters = filterFacetUrl.split('/');
  const filters = decodeURIComponent(facetNFilters[1])
    .replace(' ', '-')
    .toLowerCase()
    .split(',');
  const facets = decodeURIComponent(facetNFilters[0]).split(',');

  return {
    facets: facets,
    filters: filters,
  };
};

interface iExtractFacetsAndFilters {
  encodedFacets: string | null;
  encodedFilters: string | null;
  ignoreZone: boolean;
  filterFacetUrl: string | null;
  zoneFromCookie: string | null;
}

interface oExtractFacetsAndFilters {
  filterFacets: FilterOption[];
  filtersChips: {
    name: string;
    value: string;
    allowToRemoveFromChip: boolean;
  }[];
}

export const removeDuplicates = (arr: string[]) => {
  let unique: string[] = [];
  arr.forEach((element) => {
    if (!unique.includes(element)) {
      unique.push(element);
    }
  });
  return unique;
};

export const extractFacetsAndFilters = ({
  encodedFacets,
  encodedFilters,
  ignoreZone,
  filterFacetUrl,
  zoneFromCookie,
}: iExtractFacetsAndFilters): oExtractFacetsAndFilters => {
  let filterFacets: FilterOption[] = [];
  const filtersChips: {
    name: string;
    value: string;
    allowToRemoveFromChip: boolean;
  }[] = [];
  let zoneAdded = false;

  //
  try {
    let predefinedFacetExistInParam = false;

    if (encodedFacets && encodedFilters) {
      // when both fitlerFacet and params contains value
      let facets = removeDuplicates(
        decodeURIComponent(encodedFacets)
          .replace(' ', '-')
          .toLowerCase()
          .split(','),
      );
      let filters = decodeURIComponent(encodedFilters).split(',');

      const predefinedFacetNFilter =
        extractPredefinedFacetNFilter(filterFacetUrl);

      facets.forEach((facet, index) => {
        const filtersByOneParticularFacet = filters[index];
        facet = facet.replace(' ', '-').toLowerCase();
        //
        let predefinedFacetExist: {
          facet: string | null;
          filters: string;
        } = {
          facet: null,
          filters: '',
        };

        predefinedFacetNFilter.facets.find((predefinedFacet, index) => {
          if (predefinedFacet === facet) {
            predefinedFacetExist = {
              facet: predefinedFacet,
              filters: predefinedFacetNFilter.filters[index],
            };
          }
        });

        // if filter and facet are present on filterFacetURL.
        if (predefinedFacetExist.facet) {
          predefinedFacetExistInParam = true;
          filterFacets.push({
            name: facet,
            value: [
              ...filtersByOneParticularFacet.split('~'),
              ...predefinedFacetExist?.filters.split('~'),
            ], // here we are addding fitlers and facets from filterFacetURL and params for API call
          });

          filtersByOneParticularFacet.split('~').forEach((filter) => {
            filtersChips.push({
              name: facet,
              value: filter,
              allowToRemoveFromChip: true, // here we are adding filters and facets extracted from params
            });
          });

          predefinedFacetExist.filters
            .split('~')
            .forEach((predefinedFilter) => {
              filtersChips.push({
                name: facet,
                value: predefinedFilter,
                allowToRemoveFromChip: false, // here we are addding fitlers and facets from filterFacetURL
              });
            });

          return;
        }

        // if no filter and facet are present on filterFacetURL.
        filterFacets.push({
          name: facet,
          value: filtersByOneParticularFacet.split('~'),
        });

        filtersByOneParticularFacet.split('~').forEach((filter) => {
          let filterName = filter;

          if (facet === 'zone') {
            if (ignoreZone === false && zoneFromCookie)
              filterName = zoneFromCookie;
            zoneAdded = true;
          }

          filtersChips.push({
            name: facet,
            value: filterName,
            allowToRemoveFromChip: true,
          });
        });
      });
    }

    // incase if no params are found and filterFacetURL contains value.
    if (!predefinedFacetExistInParam) {
      const { facets, filters } = extractPredefinedFacetNFilter(filterFacetUrl);

      facets.forEach((facet, index) => {
        const filtersByFacet = filters[index];
        facet = facet.replace(' ', '-').toLowerCase();

        filterFacets.push({
          name: facet,
          value: filtersByFacet.split('~'),
        });

        filtersByFacet.split('~').forEach((filter) => {
          filtersChips.push({
            name: facet,
            value: filter,
            allowToRemoveFromChip: false,
          });
        });
      });
    }
  } catch (error: any) {
    throw new Error(
      error?.message || 'Occurred while extracting filters and facets',
    );
  } finally {
    // add zone only over here either in absence of params or zone not added manually through params.
    const useZoneFromCookie =
      ignoreZone === false && !!zoneFromCookie && zoneAdded === false;

    if (useZoneFromCookie) {
      filtersChips.push({
        name: 'zone',
        value: zoneFromCookie,
        allowToRemoveFromChip: true,
      });
      filterFacets.push({
        name: 'zone',
        value: [zoneFromCookie],
      });
    }

    return {
      filterFacets,
      filtersChips,
    };
  }
};

export const formatFilter = (
  filtersChips: {
    name: string;
    value: string;
    allowToRemoveFromChip: boolean;
  }[],
  productListResponse: IProductListResponse,
): iSelectedFilter[] => {
  let selectedFilters: iSelectedFilter[] = [];

  for (let element of filtersChips) {
    let filterFieldName = element?.name?.toLowerCase();

    productListResponse.storeFilterFacetFieldsViewModel.find((facet) => {
      if (facet?.sename?.toLowerCase() === filterFieldName) {
        facet?.filterFacetFieldsValues.find((filterValue) => {
          if (filterValue.sename === element.value) {
            selectedFilters.push({
              ...filterValue,
              facetName: element.name,
              allowToRemoveFromChip: element.allowToRemoveFromChip,
            });
            return true;
          }
          return false;
        });
        return true;
      }
      return false;
    });
  }

  return selectedFilters;
};

export const productListForMozarchy = (
  response: IProductListResponse,
  isSubcategory: boolean,
) => {
  const productList = response as IProductListResponse;
  // let product: IListing | null = null;

  // //
  // if ('getlAllProductList' in response)
  //   productList?.getlAllProductList?.forEach((item) => {
  //     if (product && product[`${item.categoryName}`]) {
  //       product = {
  //         ...product,
  //         [`${item.categoryName}`]: [...product[`${item.categoryName}`], item],
  //       };
  //     } else {
  //       product = {
  //         ...product,
  //         [`${item.categoryName}`]: [item],
  //       };
  //     }
  //   });

  return {
    // list: isSubcategory
    //   ? productList?.childCategoryViewModels || []
    //   : productList?.getlAllProductList || [],
    list: productList?.getlAllProductList || [],
    totalrecords: productList.totalrecords,
    storeFilterFacetFieldsViewModel:
      productList?.storeFilterFacetFieldsViewModel || [],
    childCategoryViewModels: productList.childCategoryViewModels,
    googleTagManagerResponseCommonData:
      productList.googleTagManagerResponseCommonData,
  };
};

export const pagination = (
  sort: SORT,
  page: string,
): {
  startIndex: number;
  endIndex: number;
  sortBy: SORT;
  currentPage: number;
  itemsPerPage: number;
} => {
  const sortBy: SORT = sort ? (sort as unknown as SORT) : 0;
  const pageNo = +(page || 1);
  const itemsPerPage = 12;

  return {
    itemsPerPage: itemsPerPage,
    startIndex: (pageNo - 1) * itemsPerPage,
    endIndex: pageNo * itemsPerPage - 1,
    sortBy: sortBy,
    currentPage: pageNo,
  };
};
