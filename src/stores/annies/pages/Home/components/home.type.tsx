import React from 'react';

export interface _Brand {
  catalogdetails: any;
  id: number;
  brandName: string;
  seName: string;
  brandColorImageUrl: string;
  brandCollectionUrl: string;
  brandBlackColorImageUrl: string;
  isBrandOnline: boolean;
}

export interface _SelectedTab {
  data: newFetauredItemResponse[];
  footerTabColorName: string;
  displayMethod: string;
  index: string;
  productCount: number;
  selectedProducts: any;
  tabName: string;
  tabing: string;
  productType?: string;
  selectedBrands?: { value: string; label: string }[];
  label: string;
}

export interface _BrandProps {
  brands: _Brand[] | null;
  alphabets: string[];
  accordian: any;
  metaData: any;
  html: any;
  featuredItems: any;
}

export interface _BrandsTemplates {
  type1: React.FC<_BrandProps>;
  type2: React.FC<_BrandProps>;
  type3: React.FC<_BrandProps>;
  type4: React.FC<_BrandProps>;
}

export interface _Value {
  type: string;
  value: string;
}

export interface _SelectedBrands {
  bg?: _Value;
  sectionTitle?: _Value;
  sectionTitle_final_class?: _Value;
  featuredproducts_tabing_display: _Value;
  featuredproducts_section_title: _Value;
  featuredproducts_footer_tabing_display: _Value;
  featuredproducts_product_to_display: _Value;
  featuredproducts_show_border: _Value;
  featuredproducts_custom_message: _Value;
  featuredproducts_show_product_name: _Value;
  featuredproducts_show_price: _Value;
  featuredproducts_show_button: _Value;
  featuredproducts_show_brand_logo: _Value;
  featuredproducts_show_split_products: _Value;
  featuredproducts: {
    type: string;
    value: {
      data: newFetauredItemResponse[];
      displayMethod: string;
      footerTabColorName: string;
      index: string;
      productCount: number;
      selectedProducts: any;
      tabName: string;
      tabing: string;
      proudctType?: string;
      selectedBrands: { value: string; label: string }[];
      label: string;
    }[];
  };
}

export interface newFetauredItemResponse {
  productId: number;
  productBrandLogo: string;
  productName: string;
  productSEName: string;
  ourCost: number;
  msrp: number;
  imap: number;
  salePrice: number;
  productDisplayOrder: number;
  imageUrl: string;
  brandLogoUrl: string;
  blackAndWhiteLogoUrl: string;
  brandName: string;
  brandSename: string;
  discountPercentage: number;
  isCallUsForPriceManufacture: boolean;
  isShowavailability: boolean;
  moreImages: moreImages[];
  isSpecialBrand: boolean;
  lowPrice: number;
  splitproductList: splitproductList[] | null;
  getProductImageOptionList: GetProductImageOptionList[] | [];
  productTagViewModel: Array<{
    productId: number;
    imagename: string;
    productTagName: string;
    tagPosition: string;
  }>;
}

export interface moreImages {
  id: number;
  attributeOptionID: number;
  attributeOptionName: string;
  imageUrl: string;
  displayOrder: number;
  altTag: string;
}

export interface splitproductList {
  name: string;
  seName: string;
  imageurl: string;
  colorName: string;
  prodcutId: number;
}

export interface GetProductImageOptionList {
  id: number;
  imageName?: string;
  colorName?: string;
  displayorder?: number;
  alttag?: string;
  attributeOptionID?: number;
  imageUrl: string;
  attributeOptionName?: string;
  displayOrder?: number;
  altTag?: string;
}

export interface _FeaturedProduct {
  productId: number;
  productName: string;
  productSEName: string;
  ourCost: string;
  msrp: string;
  imap: string;
  salePrice: string;
  productDisplayOrder: number;
  imageUrl: string;
  moreImages: _FeaturedMoreImages[];
}

export interface _FeaturedMoreImages {
  id: number;
  attributeOptionID: number;
  attributeOptionName: string;
  imageUrl: string;
  displayOrder: number;
  altTag: string;
}
