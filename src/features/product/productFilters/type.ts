export interface FeatureConfigsType {
  topFilters: {
    showFiltersWithDropdowns: boolean;
    filterDropdownsValues: [];
    showSortBy: boolean;
    showSortValues: [];
    paginationType:
      | "showLoadMoreButton"
      | "showPageNumbers"
      | "loadProductsOnScroll";
  };
  productListingCard: {
    showPrice: boolean;
    showName: boolean;
    showOthersColors: boolean;
  };
}
