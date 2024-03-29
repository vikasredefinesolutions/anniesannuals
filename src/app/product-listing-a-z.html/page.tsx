import {
  getStaticStoreDetails,
  tStoreDetailsFile,
} from '@/helper/staticfile.helper';
import { fetchProductListAtoZ } from '@/shared/apis/product/productListAtoZ';
import { activeStoreName } from '@/shared/configs';
import { productListData } from '@/shared/types/product';
import dynamic from 'next/dynamic';
import React from 'react';
import { pagination } from '../[...slug]/slug.helper';

interface IProductListProps {
  productList: productListData;
  jumpBy: number;
  totalAvailable: number;
  currentPage: number;
  cmsStoreThemeConfigsViewModel: tStoreDetailsFile['cmsStoreThemeConfigsViewModel'];
}

const DynamicProductListingPage: React.ComponentType<IProductListProps> =
  dynamic(() => import(`../../${activeStoreName}/pages/productsListingAtoZ`));

export default async function ProductListingAtoZ({
  params: { slug = [''] },
  searchParams: { page = '', filter = 'A' },
}: {
  params: { slug: string[] };
  searchParams: { page: string; filter: string };
}): Promise<JSX.Element> {
  const { startIndex, endIndex, sortBy, currentPage, itemsPerPage } =
    pagination(3, page);
  const getProductListData = async () => {
    const payload = {
      storeID: 5,
      customerId: 0,
      pageStartindex: startIndex,
      pageEndindex: endIndex,
      filterOptionforfaceteds: [
        {
          name: 'name',
          value: [filter],
        },
      ],
    };
    const productListResponse = await fetchProductListAtoZ(payload);
    return productListResponse;
  };
  const { storeId, cmsStoreThemeConfigsViewModel } =
    await getStaticStoreDetails();
  const productList = (await getProductListData()) as productListData;

  return (
    <DynamicProductListingPage
      productList={productList}
      jumpBy={itemsPerPage}
      totalAvailable={productList.totalrecords}
      currentPage={currentPage}
      cmsStoreThemeConfigsViewModel={cmsStoreThemeConfigsViewModel}
    />
  );
}
