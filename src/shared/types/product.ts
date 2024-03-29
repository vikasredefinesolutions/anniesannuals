import { IProductImageOption } from '../apis/product/product';

export interface IProductDetails {
  id: number;
  storeId: number;
  name: string;
  seName: string;
  imageUrl: string;
  description: string;
  shortDescription: string;
  howToUse: string;
  productSpecification: string;
  productFeatures: string;
  productTagDetails: string;
  productAvaliability: boolean;
  quantity: number;
  ourCost: number;
  msrp: number;
  imap: number;
  salePrice: number;
  companionProductId: number | null;
  companionProductName: string | null;
  companionProductSEName: string | null;
  companionProductImage: string | null;
  isEnableLogolocation: boolean;
  shippingDate: string;
  sku: string;
  brandID: number | null;
  brandName: string | null;
  brandImage: string | null;
  sizes: string;
  brandColorLogoUrl: string;
  brandBannerImage: null;
  companionMSRP: string | null;
  isDiscontinue: boolean;
  discontinueDate: string;
  discontinueEndDate: string;
  isBrandOnline: boolean;
  isPolicywithcheckbox: boolean;
  policyMessage: string;
  isEnduserDisplay: boolean;
  isSpecialBrand: boolean;
  categoryName?: string;
  productBrandLogo: string | null;
  brandSEname: string | null;
  isDropShipProduct: boolean;
  isShortDescriptionOnTop: boolean;
  attributeOptionId: number;
  attributeOptionValue: string;
  productTagViewModel: Array<{
    productId: number;
    imagename: string;
    productTagName: string;
    tagPosition: string;
  }>;
  attributeImagesViewModels: Array<{
    displayOrder: number;
    imageUrl: string;
    altTag: string;
    videoUrl: string;
  }>;
  customFields: Array<ICustomField>;
  filterFacetFields: Array<IFilterFacetFields>;
  productRatingAverage: string;
  futureInventoryDate: null;
  futureInventory: number;
  isGiftCardProduct: boolean;
  isAddToCart: boolean;
}
export interface ICustomField {
  value: string;
  label: string;
}
export interface IFilterFacetFieldsvalue {
  value: string;
  iconCode: null | string;
  imagePath: null | string;
}
export interface IFilterFacetFields {
  values: Array<IFilterFacetFieldsvalue>;
  name: string;
}

export interface IListingProduct {
  productCustomFields: any;
  isonlinebrand: boolean;
  brandUrl: string;
  id?: number;
  name: string;
  getProductImageOptionList: GetProductImageOptionList[] | [];
  productTagViewModel: Array<{
    productId: number;
    imagename: string;
    productTagName: string;
    tagPosition: string;
  }>;
  isspecialbrand: boolean;
  sename: string;
  msrp: number;
  salePrice: number;
  brandlogo?: string;
  iswishlist?: boolean;
  label?: string;
  wishListId?: number;
  sku?: string;
  imageUrl: string;
  categoryImageList: any;
  imap?: string;
  productId?: number;
  productName?: string;
  productSEName?: string;
  productDisplayOrder?: number;
  attributeOptionName?: string;
  blackBrandlogo: string;
  ourCost?: number;
  brandName: string;
  index: number | string;
  lowPrice: number;
  categoryName?: string;
  productBrandlogo: string | null;
  description: string;
  productRatingAverage: string;
  productReviewsCount: string;
}

export interface productListData {
  totalrecords: number;
  getlAllProductList: IListingProduct[];
}
export interface GetProductImageOptionList {
  id: number;
  imageName: string;
  colorName?: string;
  displayorder?: number;
  alttag?: string;
  attributeOptionID?: number;
  imageUrl: string;
  attributeOptionName?: string;
  displayOrder?: number;
  altTag?: string;
  productId?: number;
}

export interface IProductRatings {
  totalRatingCount: number;
  ratingAverage: string;
  fiveStarRatingCount: number;
  fourStarRatingCount: number;
  threeStarRatingCount: number;
  twoStarRatingCount: number;
  oneStarRatingCount: number;
  qualityOfProduct: number;
  valueOfProduct: number;
  easyOfUse: number;
}
export interface IProductReviewByUserId {
  storeId: number;
  customerId: number;
  reviewId: number | undefined;
}

export interface IProductReviewsByUserId {
  id: number;
  productId: number;
  productName: string;
  productSename: string;
  productImage: string;
  customerId: number;
  storeId: number;
  commentHeading: string;
  comment: string;
  rating: number;
  helpFullCount: number;
  notHelpFullCount: number;
  recStatus: string;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
  images: Array<IProductReviewsImage>;
  isRecommend: boolean;
  createdDate: string;
}

export interface IProductReviews {
  reviewId: number;
  name: string;
  email: string;
  reviewDate: string;
  rating: number;
  commentHeading: string;
  comments: string;
  helpFullCount: number;
  notHelpFullCount: number;
  images: Array<IProductReviewsImage>;
}
export interface IProductReviewsImage {
  displayOrder: number;
  imageName: string;
}
export interface IReviewProduct {
  seName?: string;
  productName: string;
  imageUrl: string;
  reviewId?: string;
}
export type IListing = Record<string, IListingProduct[]>;
export interface IProductColor {
  productId: number;
  productName: string;
  productSEName: string;
  attributeOptionId: number;
  name: string;
  imageUrl: string;
  displayOrder: number;
  altTag: string;
  moreImages: IOtherImage[];
  minQuantity: number;
  multipleQuantity: number;
  isDefaultProduct: boolean;
  splitproductList: null | ISplitProductList[];
}
export interface IOtherImage {
  displayOrder: number;
  imageUrl: string;
  altTag: string;
  videoUrl: string;
}
export interface ISplitProductList {
  name: string;
  seName: string;
  imageurl: string;
  colorName: string;
  prodcutId: number;
}
export interface IProductInventory {
  productId: number;
  colorAttributeOptionId: number;
  attributeOptionId: number;
  name: string;
  displayOrder: number;
  price: number;
  sku: string;
  minQuantity: number;
  upC_GTN: string;
  multipleQuantity: number;
  combinationId: number;
  varientName: string;
  varientImagePath: null;
  inventory: number;
  futureInventory: number;
  futureInventoryDate: string;
  inventoryId: number;
}

export interface IProductInventoryTransfomed {
  sizes: {
    colorAttributeOptionId: number;
    sizeArr: IProductInventory[];
  }[];
  inventory: IProductInventory[];
}
export interface IProductsRecentlyViewed {
  id: number;
  customerId: number;
  productId: number;
  pageName: string;
  pageUrl: string;
  recStatus: string;
  ipAddress: string;
}
export interface IProductsRecentlyViewedPayload {
  recentViewModel: {
    customerId: number;
    productId: number;
    pageName: string;
    pageUrl: string;
    recStatus: string;
    ipAddress: string;
  };
}
export interface IProductsRecentlyViewedResponse {
  id: number;
  name: string;
  msrp: number;
  seName: string;
  image: string;
  categoryId: number;
  isSpecialBrand: boolean;
  lowPrice: number;
  masterId: number;
  storeId: number;
  getProductImageOptionList: IProductImageOption[];
  splitproductList?: [];
  customFields: Array<{
    value: string;
    label: string;
  }>;
  productReviewsCount: number;
  productRatingAverage: string;
  productTagViewModel: Array<{
    productId: number;
    imagename: string;
    productTagName: string;
    tagPosition: string;
  }>;
}

export interface IFetchProductsRecentlyViewedPayload {
  productId: number;
  storeId: number;
  ipAddress: string;
  customerId: number;
  maximumItemsForFetch: number;
}
export interface _ProductImageOption {
  id: number;
  productId: number;
  imageName: string;
  colorName: string;
  displayorder: number;
  alttag: string;
}
export interface IShopBGardenProductDetailPayload {
  storeId: number;
  categoryId: number;
}

export interface IShopBGardenProductDetail {
  storeProductDetailsViewModels: Array<IProductDetails>;
  msrp: number;
  salePrice: number;
  categoryModels: Array<ICategoryModels>;
  singleCategoryViewModels: Array<ISingleCategoryViewModels>;
  ourSku?: string;
}
export interface ICategoryModels {
  id: number;
  categoryName: string;
  categoryImagePath: string;
  altTag: string;
  titleTag: string;
  description: string;
  collectionImageURl: string;
  seName: string;
  bannerImagePath: string;
  seTitle: string;
  seKeywords: string;
  seDescription: string;
  displayOrder: number;
  dropDownViewModel: [];
}

export interface ISingleCategoryViewModels {
  id: number;
  name: string;
  sename: string;
}

export interface IGardenProduct {
  id: number;
  seName: string;
  categoryImagePath: string;
  categoryName: string;
}
