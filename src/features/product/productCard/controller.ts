import React, { ReactElement, useState, ReactNode } from "react";
import { FeatureConfigsType } from "./type";

interface _FilterHelpers {
  pagination: {
    show: boolean;
    type: FeatureConfigsType["topFilters"]["paginationType"];
    values: any;
  };
  handlePageChange: () => {};
  filters: {
    show: boolean;
    type: "dropdown";
    values: [];
  };
  handleFilters: () => {};
  sort: {
    show: boolean;
    values: any;
  };
  handleSort: () => {};
  inStock: {
    show: boolean;
    values: boolean;
  };
  handleInStock: () => {};
  products: { name: string; price: string; seName: string }[];
}

interface _Props {
  configs: FeatureConfigsType["topFilters"];
  ui: {
    position: "top";
    layout: 1;
  };
  cases: {
    loading: () => ReactElement<any, any>;
    empty: () => ReactElement<any, any>;
    ready: (helpers: _FilterHelpers) => ReactElement<any, any>;
  };
}

const ItemsListWithFiltersAtTop: React.FC<_Props> = ({ cases }) => {
  const [status, setStatus] = useState<"loading" | "empty" | "ready">(
    "loading"
  );
  const products = [{ name: "product 1", price: "23", seName: "product-one" }];

  const handlePageChange = () => {
    return {};
  };

  const handleFilters = () => {
    return {};
  };
  const handleSort = () => {
    return {};
  };
  const handleInStock = () => {
    return {};
  };

  if (status === "loading") {
    return cases.loading();
  }

  if (status === "empty") {
    return cases.empty();
  }

  if (status === "ready") {
    return cases.ready({
      //
      pagination: {
        show: false,
        type: "loadProductsOnScroll",
        values: [],
      },
      handlePageChange,
      //
      filters: {
        show: true,
        type: "dropdown",
        values: [],
      },
      handleFilters,
      //
      sort: {
        show: true,
        values: [],
      },
      handleSort,
      //
      inStock: {
        show: true,
        values: true,
      },
      handleInStock,
      //
      products,
    });
  }

  return null;
};

export default ItemsListWithFiltersAtTop;
