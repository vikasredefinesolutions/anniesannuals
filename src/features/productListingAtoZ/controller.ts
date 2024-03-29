import { useAppSelector } from '@/app/redux/hooks';
import { WishlistType } from '@/shared/apis/cart/removeFromWishlist';
import { SORT } from '@/shared/apis/product/productList';
import { fetchProductListAtoZ } from '@/shared/apis/product/productListAtoZ';
import { IListingProduct, productListData } from '@/shared/types/product';
import { alphabets } from '@/utils/helpers';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { ReactElement, useEffect, useState } from 'react';

export interface _ReadyProps {
  alphabets: string[];
  totalPages: number;
  currentPage: number;
  productListData: IListingProduct[];
  handleFilterChar: (char: string) => void;
  handlePageChange: () => void;
  goToPageHandler: (pageNo: number) => void;
  filterChar: string;
  isLastPage: boolean;
  userWishList: WishlistType[];
}

export interface _LoadingProps {
  alphabets: string[];
  filterChar: string;
}

interface _Props {
  productListData: productListData;
  jumpBy: number;
  totalAvailable: number;
  currentPage: number;
  cases: {
    loading: (_LoadingProps: _LoadingProps) => ReactElement<any, any>;
    empty: () => ReactElement<any, any>;
    ready: (_ReadyProps: _ReadyProps) => ReactElement<any, any>;
  };
}

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

const ProductListingAtoZController: React.FC<_Props> = ({
  cases,
  productListData: productData,
  jumpBy,
  totalAvailable,
  currentPage: CP,
}) => {
  const [status, setStatus] = useState<'loading' | 'empty' | 'ready'>(
    'loading',
  );
  let totalPages = Math.ceil(totalAvailable / jumpBy) || 0;
  const searchParams = useSearchParams();
  const initialFilter = searchParams.get('filter');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageStartIndex, setPageStartIndex] = useState<number>(0);
  const [pageEndIndex, setPageEndIndex] = useState<number>(19);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [productListData, setProductListData] = useState<IListingProduct[]>([]);
  const [filterChar, setFilterChar] = useState<string>(initialFilter || 'A');
  const userWishList = useAppSelector((state) => state.user.wishlistData);

  useEffect(() => {
    setCurrentPage(CP);
  }, [CP]);
  const router = useRouter();
  const goToPageHandler = (pageNo: number) => {
    setCurrentPage(pageNo);
    let sortQuery = `?filter=${filterChar}&page=${pageNo}`;
    router.push(sortQuery, { scroll: false });
  };

  useEffect(() => {
    if (productListData.length > 0) {
      getProductListData(1);
    }
  }, [currentPage]);

  useEffect(() => {
    if (productListData.length > 0) {
      getProductListData(2);
    }
  }, [filterChar]);
  useEffect(() => {
    setProductListData(
      [...productData.getlAllProductList].sort((a, b) =>
        a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1,
      ),
    );
  }, []);

  useEffect(() => {
    if (productListData.length > 0) {
      setStatus('ready');
    }
  }, [productListData]);

  const getProductListData = async (change: number) => {
    const page = searchParams.get('page');
    const { startIndex, endIndex, itemsPerPage } = pagination(3, page || '1');

    const payload = {
      storeID: 5,
      customerId: 0,
      pageStartindex: startIndex,
      pageEndindex: endIndex,
      filterOptionforfaceteds: [
        {
          name: 'name',
          value: [filterChar],
        },
      ],
    };
    setStatus('loading');
    const productListResponse = await fetchProductListAtoZ(payload);
    setStatus('ready');
    let updatedProductList;
    if (Array.isArray(productListResponse?.getlAllProductList)) {
      totalPages =
        Math.ceil(productListResponse?.totalrecords || 0 / itemsPerPage) || 0;
      // if (change == 1) {
      //   updatedProductList = [
      //     ...productListData,
      //     ...(productListResponse?.getlAllProductList || []),
      //   ];
      // } else {
      updatedProductList = [...(productListResponse?.getlAllProductList || [])];
      // }

      if (updatedProductList?.length)
        setProductListData(
          updatedProductList.sort((a, b) =>
            a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1,
          ),
        );
      if (
        updatedProductList.length >= Number(productListResponse?.totalrecords)
      ) {
        setIsLastPage(true);
      }
    }
  };

  const handlePageChange = () => {
    setPageStartIndex((prev) => prev + 20);
    setPageEndIndex((prev) => prev + 20);
  };

  const handleFilterChar = (char: string) => {
    setFilterChar(char);
  };

  if (status === 'loading') {
    return cases.loading({ alphabets, filterChar });
  }

  if (status === 'empty') {
    return cases.empty();
  }

  if (status === 'ready') {
    console.log(
      productListData,
      'productListDataproductListDataproductListData',
    );

    return cases.ready({
      alphabets,
      productListData,
      isLastPage,
      totalPages,
      currentPage,
      handleFilterChar,
      handlePageChange,
      goToPageHandler,
      filterChar,
      userWishList,
    });
  }

  return null;
};

export default ProductListingAtoZController;
