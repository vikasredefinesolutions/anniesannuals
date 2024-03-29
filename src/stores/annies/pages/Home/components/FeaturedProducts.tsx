import { getFeaturedProductitemsByTagnameandsename } from '@/api/services/home';
import { getStoreCode } from '@/utils/cookie.helper';
import React, { useEffect, useState } from 'react';
import BrandProductListing from './GeneralProductContainer/BrandProducsListing';
import ProductsInfoTabs from './GeneralProductContainer/GeneralProductTabs';
import { _SelectedBrands, newFetauredItemResponse } from './home.type';
interface _props {
  dataArr: _SelectedBrands;
  featuredItems: { [x: string]: newFetauredItemResponse[] };
  count: number;
  setCount: (x: any) => void;
  tabFeaturedPayload: any;
}

const FeaturedProducts: React.FC<_props> = (props) => {
  const { dataArr, featuredItems, tabFeaturedPayload } = props;

  const storeCode = getStoreCode();
  let fTitle = dataArr?.sectionTitle?.value;

  const [products, setProducts] = useState<{
    [x: string]: newFetauredItemResponse[];
  }>(featuredItems);

  useEffect(() => {
    (async () => {
      const prod = featuredItems;
      if (tabFeaturedPayload[0]) {
        for (const key in tabFeaturedPayload[0]) {
          const tab = tabFeaturedPayload[0][key];
          if (tab.sename) {
            prod[tab.tabName] = await getFeaturedProductitemsByTagnameandsename(
              tab,
            );
          }
        }
        setProducts(prod);
      }
    })();
  }, [featuredItems]);

  return (
    <section className='mainsection featured_items text-center por_a'>
      {fTitle && (
        <div
          className={`pkhg-featured-title pkhg-featured-title peter-millar-promotional-embroidered-clothing-nw ${dataArr?.sectionTitle_final_class?.value}`}
        >
          {' '}
          {storeCode === 'PKHG' ? (
            <>
              <span>{fTitle}</span>
            </>
          ) : (
            <> {fTitle}</>
          )}
        </div>
      )}

      <div>
        {dataArr?.featuredproducts_tabing_display &&
        dataArr?.featuredproducts_tabing_display?.value === 'Yes' &&
        dataArr.featuredproducts.value.length > 1 ? (
          <ProductsInfoTabs
            data={dataArr?.featuredproducts?.value}
            featuredItems={products}
            showBorder={dataArr?.featuredproducts_show_border?.value}
            customMessage={dataArr?.featuredproducts_custom_message?.value}
            showProductName={dataArr?.featuredproducts_show_product_name?.value}
            showPrice={dataArr?.featuredproducts_show_price?.value}
            footerTabing={
              dataArr?.featuredproducts_footer_tabing_display?.value
            }
            showSplitProducts={
              dataArr?.featuredproducts_show_split_products?.value
            }
            showButton={dataArr?.featuredproducts_show_button?.value}
            showBrandLogo={dataArr?.featuredproducts_show_brand_logo?.value}
            productToDisplay={
              dataArr?.featuredproducts_product_to_display?.value
            }
          />
        ) : (
          <div className='relative pt-[30px] '>
            <BrandProductListing
              showBorder={dataArr?.featuredproducts_show_border?.value}
              featuredItems={products}
              productsData={dataArr?.featuredproducts?.value[0]}
              customMessage={dataArr?.featuredproducts_custom_message?.value}
              showProductName={
                dataArr?.featuredproducts_show_product_name?.value
              }
              showPrice={dataArr?.featuredproducts_show_price?.value}
              showSplitProducts={
                dataArr?.featuredproducts_show_split_products?.value
              }
              showButton={dataArr?.featuredproducts_show_button?.value}
              showBrandLogo={dataArr?.featuredproducts_show_brand_logo?.value}
              productToDisplay={
                dataArr?.featuredproducts_product_to_display?.value
              }
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
