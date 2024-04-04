import {
  fetchPageComponents,
  fetchPageType,
  getNewsLetterDetails,
} from '@/api/services/home';
import PageNotFound from '@/shared/Components/PageNotFound';
import {
  FetchProductRecentlyViewed,
  IProductsAlike,
  InsertProductRecentlyViewed,
  ShopbygardanProductDetails,
  fetchProductColors,
  fetchProductRatings,
  fetchProductReviews,
  fetchYouAlsoLikeProduct,
  getProductDetailsBySeName,
} from '@/shared/apis/product/product';
import {
  FetchCategoryByproductId,
  SORT,
} from '@/shared/apis/product/productList';
import { activeStoreName } from '@/shared/configs';
import {
  IListingProduct,
  IProductColor,
  IProductDetails,
  IProductRatings,
  IProductReviews,
  IProductsRecentlyViewedResponse,
  IShopBGardenProductDetail,
} from '@/shared/types/product';
import { redirect } from 'next/navigation';

import {
  getStaticAdminConfigs,
  getStaticHeaderSubMenu,
  getStaticStoreDetails,
  tStoreDetailsFile,
} from '@/helper/staticfile.helper';
import { serverLocalState } from '@/serverLocalState';
import { getUserId } from '@/shared/utils/cookie.helper';
import { STATIC_URLS } from '@/shared/utils/helper';
import storeDetails from '@/staticData/storeDetails.json';
import Home2 from '@/stores/annies/pages/Home';
import {
  extractFacetsAndFilters,
  formatFilter,
  pagination,
  productListForMozarchy,
} from '@/stores/annies/pages/productsListing/client';
import { IBreadCrumbsData } from '@/stores/annies/shared/components/breadCrumbstype';
import { SubCategoryList } from '@/types/header';
import { getLocation } from '@/utils/helpers';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import {
  FilterFacetField,
  breadCrumbsData,
  extractSlugName,
  getZone,
  iSelectedFilter,
  productListingPromise,
} from './slug.helper';
export interface IProductListProps {
  list: {
    products: IListingProduct[];
    totalAvailable: number;
    currentPage: number;
    jumpBy: number;
    sortBy: SORT;
  };
  predefinedFacetFilterUrl: string | null;
  selectedFilters: iSelectedFilter[];
  cmsData: any;
  filterOptions: FilterFacetField[] | [];
  isSubcategory: boolean;
  seName: string;
  facetsFoundInURl: boolean;
  cmsStoreThemeConfigsViewModel: tStoreDetailsFile['cmsStoreThemeConfigsViewModel'];
  childCategoryViewModels: {
    id: number;
    name: string;
    sename: string;
    categoryImageList: [];
    categoryCustomFields: [];
  }[];
  pageId: number;
  headerSubMenu: SubCategoryList;
  googleTagManagerResponseCommonData: Record<string, any>;
  bannerData: any;
  breadCrumbs: IBreadCrumbsData[] | [];
}

const DynamicProductListingPage: React.ComponentType<IProductListProps> =
  dynamic(() => import(`../../${activeStoreName}/pages/productsListing`));

const DynamicProductDetailPage: React.ComponentType<IProps> = dynamic(
  () => import(`../../${activeStoreName}/pages/productDetails`),
);
const DynamicShopTheGardenDetailPage: React.ComponentType<IProps2> = dynamic(
  () => import(`../../${activeStoreName}/pages/ShopTheGardenDetails`),
);

interface IProps {
  product: IProductDetails | null;
  aLikeProducts: IProductsAlike[] | null;
  productRatings: IProductRatings | null;
  productReviews: IProductReviews[] | null;
  productColor: IProductColor[] | null;
  recentlyViewedProduct: IProductsRecentlyViewedResponse[] | null;
  breadCrumbs: IBreadCrumbsData[] | [];
  storeId: number;
  cmsStoreThemeConfigsViewModel: tStoreDetailsFile['cmsStoreThemeConfigsViewModel'];
}

interface IProps2 {
  product: IShopBGardenProductDetail | null;
  aLikeProducts: IProductsAlike[] | null;

  recentlyViewedProduct: IProductsRecentlyViewedResponse[] | null;
  breadCrumbs: IBreadCrumbsData[] | [];
  cmsStoreThemeConfigsViewModel: tStoreDetailsFile['cmsStoreThemeConfigsViewModel'];
}

export async function generateMetadata({
  params: { slug = [''] },
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const mainSlug = slug[slug.length - 1];
  const pageMetaData = await fetchPageType({
    storeId: storeDetails.storeId,
    slug: mainSlug,
  });
  const mediaBaseUrl =
    process.env.NEXT_PUBLIC_MEDIA_URL ||
    process.env.NEXT_PUBLIC_EXTRA_MEDIA_URL_DETAIL_MAIN ||
    process.env.NEXT_PUBLIC_REDEFINE_MEDIA ||
    '';

  return {
    title: pageMetaData?.meta_Title || pageMetaData?.name,
    description: pageMetaData?.meta_Description || pageMetaData?.name,
    openGraph: {
      title:
        pageMetaData?.openGraphTitle ||
        pageMetaData?.meta_Title ||
        pageMetaData?.name,
      description:
        pageMetaData?.openGraphDescription ||
        pageMetaData?.meta_Description ||
        pageMetaData?.description ||
        pageMetaData?.name,
      url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/${slug}`,
      siteName: 'Annies Annuals',
      images: [
        {
          url: `${mediaBaseUrl}${pageMetaData?.openGraphImagePath}`,
          width: 800,
          height: 600,
        },
        {
          url: `${mediaBaseUrl}${pageMetaData?.openGraphImagePath}`,
          width: 1800,
          height: 1600,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
  };
}

export default async function DynamicPages({
  params: { slug = [''] },
  searchParams: {
    sort = SORT.popular,
    page = '',
    ignorezone = 'false',
    igff = 'off',
    facets: queryFacets = '',
    filters: queryFilters = '',
  },
}: {
  params: { slug: string[] };
  searchParams: {
    sort: SORT;
    page: string;
    ignorezone?: 'true' | 'false';
    igff: 'on' | 'off';
    facets: string;
    filters: string;
  };
}): Promise<JSX.Element> {
  const { storeId, cmsStoreThemeConfigsViewModel } =
    await getStaticStoreDetails();
  let { sename, otherParams } = extractSlugName(slug);
  const mainSlug = slug[slug.length - 1];
  serverLocalState.set({
    key: 'mainSlug',
    value: mainSlug as 'Product' | 'Category',
  });

  const isPlantAvailablePage = slug.join('/') == 'plants/available-now';
  if (isPlantAvailablePage)
    return redirect('/availability/available-now/plant-finder.html');

  //Getting dynamic page-meta-data from slug
  const pageMetaData = await fetchPageType({
    storeId: storeId,
    slug: STATIC_URLS.has(mainSlug)
      ? `${mainSlug}.html`
      : decodeURIComponent(mainSlug),
  });

  if (pageMetaData.type == '301') {
    if (mainSlug === pageMetaData.slug) {
      return <PageNotFound type='Not Found' />;
    } else {
      redirect(pageMetaData.slug);
    }
  }

  //Read & render Static CMS pages form json file if available

  if (!pageMetaData || (!pageMetaData.id && sename !== 'plant-finder')) {
    return <PageNotFound type={'Not Found'} />;
  }

  if (pageMetaData.type === 'NewsLetter') {
    const data = await getNewsLetterDetails({
      id: pageMetaData?.id,
      storeId: storeId,
    });

    return <div dangerouslySetInnerHTML={{ __html: data.subDescription }} />;
  }

  //All CMS pages
  if (pageMetaData.type == 'Topic') {
    // const pageData = await serveDataFromStaticFile(mainSlug);
    // const breadCrumbs = cmsBreadCrumbsArray(pageMetaData);
    // if (pageData.exist) {
    //   return (
    //     <CmsHtml
    //       htmlComponents={pageData.components}
    //       breadCrumbs={breadCrumbs}
    //       mainSlug={mainSlug}
    //     />
    //   );
    // }

    // if (mainSlug !== '') {
    //   return <PageNotFound type={'Not Published'} />;
    // }

    try {
      const components = await fetchPageComponents({
        pageId: pageMetaData?.id,
        type: 'cache',
      });

      const isHomePage = mainSlug === '';

      return (
        <Home2
          isDigitalCatalogVisible={isHomePage}
          pageData={{ components: components }}
        />
      );
    } catch (error) {
      return <PageNotFound type={'Something went wrong'} />;
    }
  }

  if (
    pageMetaData.type === 'SearchPage' ||
    pageMetaData.type == 'Category' ||
    sename == 'plant-finder'
  ) {
    const headerSubMenu = await getStaticHeaderSubMenu();
    const adminConfigs = // admin configs are only required for Category
      sename === 'plant-finder' || pageMetaData.type === 'SearchPage'
        ? null
        : await getStaticAdminConfigs();
    //
    let isSubcategory = pageMetaData.id == adminConfigs?.gardenID; // for plant-finder & searchPage isSubcategory will always stay false;
    //
    const { filterFacets, filtersChips } = extractFacetsAndFilters({
      encodedFacets: queryFacets,
      encodedFilters: queryFilters,
      ignoreZone: ignorezone === 'true',
      filterFacetUrl: pageMetaData?.facetFilterUrl || null,
      zoneFromCookie: getZone(),
    });

    const { startIndex, endIndex, sortBy, currentPage, itemsPerPage } =
      pagination(sort, page);
    //
    const { productListResponse, categories, cmsData, bannerData } =
      await productListingPromise({
        searchText:
          pageMetaData.type === 'SearchPage' ? pageMetaData?.name : undefined,
        storeId,
        pageId: pageMetaData?.id,
        filterFacets,
        startIndex,
        endIndex,
        pageType: pageMetaData.type,
        pageSeName: pageMetaData.slug,
        sortBy: sortBy,
        plantFinder: sename === 'plant-finder',
      });

    if (!productListResponse) throw new Error('Error fetching products list.');
    const selectedFilters = formatFilter(filtersChips, productListResponse);

    const breadCrumbs = breadCrumbsData(categories);

    const products = productListForMozarchy(productListResponse, isSubcategory);

    return (
      <DynamicProductListingPage
        list={{
          products: products.list,
          jumpBy: itemsPerPage,
          // totalAvailable: isSubcategory
          //   ? products.childCategoryViewModels.length
          //   : products.totalrecords,
          totalAvailable: products.totalrecords,
          currentPage: currentPage,
          sortBy: sortBy,
        }}
        facetsFoundInURl={!!(queryFacets.length > 0)}
        predefinedFacetFilterUrl={pageMetaData?.facetFilterUrl || null}
        pageId={pageMetaData.id}
        selectedFilters={selectedFilters}
        filterOptions={products.storeFilterFacetFieldsViewModel}
        childCategoryViewModels={products.childCategoryViewModels}
        isSubcategory={isSubcategory}
        seName={sename}
        headerSubMenu={headerSubMenu}
        googleTagManagerResponseCommonData={
          products.googleTagManagerResponseCommonData
        }
        cmsStoreThemeConfigsViewModel={cmsStoreThemeConfigsViewModel}
        cmsData={cmsData}
        bannerData={bannerData[0]}
        breadCrumbs={breadCrumbs}
      />
    );
  }

  // ProductDetail page
  if (pageMetaData.type == 'Product') {
    const productSlug = mainSlug.replace('.html', '');
    let productData = await getProductDetailsBySeName(productSlug, storeId, 0);
    let productColor = productData?.sizes
      ? await fetchProductColors(productData?.id!)
      : [];
    let aLikeProducts;
    let productRatings;
    let productReviews;
    const userID = getUserId();
    const location = await getLocation();
    const InsertProductRecentlyViewedPayload = {
      recentViewModel: {
        productId: productData?.id!,
        customerId: userID,
        pageName: 'descriptionPage',
        pageUrl: `${productSlug}`,
        ipAddress: `${location.ip_address}`,
        recStatus: 'A',
      },
    };
    let fetchRecentlyViewedPayload = {
      productId: productData?.id!,
      storeId: storeId,
      ipAddress: `${location.ip_address}`,
      customerId: userID,
      maximumItemsForFetch: 10,
    };
    let recentlyViewedProduct;
    await Promise.allSettled([
      fetchProductRatings(pageMetaData.id),
      fetchProductReviews(pageMetaData.id),
      fetchYouAlsoLikeProduct(pageMetaData.id, storeId),
      InsertProductRecentlyViewed(InsertProductRecentlyViewedPayload),
      FetchProductRecentlyViewed(fetchRecentlyViewedPayload),
    ])
      .then((values) => {
        productRatings =
          values[0].status === 'fulfilled' ? values[0].value : null;
        productReviews =
          values[1].status === 'fulfilled' ? values[1].value : null;
        aLikeProducts =
          values[2].status === 'fulfilled' ? values[2].value : null;
        recentlyViewedProduct =
          values[4].status === 'fulfilled' ? values[4].value : null;
      })
      .catch(() => {
        throw new Error('Something went wrong in Slug');
      });
    const categories = await FetchCategoryByproductId(
      +pageMetaData.id!,
      +storeDetails.storeId,
    );

    const breadCrumbs = breadCrumbsData(categories);
    return (
      <DynamicProductDetailPage
        product={{
          ...productData!,
          seName: productSlug,
          imageUrl: productData?.attributeImagesViewModels[0]?.imageUrl || '',
        }}
        aLikeProducts={aLikeProducts!}
        productRatings={productRatings!}
        productReviews={productReviews!}
        productColor={productColor!}
        recentlyViewedProduct={recentlyViewedProduct!}
        breadCrumbs={breadCrumbs}
        storeId={storeId}
        cmsStoreThemeConfigsViewModel={cmsStoreThemeConfigsViewModel}
      />
    );
  }

  if (pageMetaData.type == 'ShopByGarden' || pageMetaData.type == 'Bundle') {
    const productSlug = mainSlug.replace('.html', '');
    const location = await getLocation();
    const userID = cookies().get('user_id');
    let productData2;
    let aLikeProducts;
    let recentlyViewedProduct;

    const categories = await FetchCategoryByproductId(
      +pageMetaData.id!,
      +storeDetails.storeId,
    );

    const breadCrumbs = breadCrumbsData(categories);

    let fetchRecentlyViewedPayload = {
      productId: pageMetaData.id!,
      storeId: storeId,
      ipAddress: `${location.ip_address}`,
      customerId: +userID?.value! || 0,
      maximumItemsForFetch: 10,
    };

    await Promise.allSettled([
      ShopbygardanProductDetails({
        categoryId: pageMetaData.id,
        storeId,
      }),
      fetchYouAlsoLikeProduct(pageMetaData.id, storeId),
      FetchProductRecentlyViewed(fetchRecentlyViewedPayload),
    ])
      .then((values) => {
        productData2 =
          values[0].status === 'fulfilled' ? values[0].value : null;
        aLikeProducts =
          values[1].status === 'fulfilled' ? values[1].value : null;
        recentlyViewedProduct =
          values[2].status === 'fulfilled' ? values[2].value : [];
      })
      .catch(() => {
        throw new Error('Something went wrong in Slug');
      });

    return (
      <DynamicShopTheGardenDetailPage
        product={productData2!}
        aLikeProducts={aLikeProducts!}
        recentlyViewedProduct={recentlyViewedProduct!}
        breadCrumbs={breadCrumbs}
        cmsStoreThemeConfigsViewModel={cmsStoreThemeConfigsViewModel}
      />
    );
  }
  //Default case
  return <></>;
}
