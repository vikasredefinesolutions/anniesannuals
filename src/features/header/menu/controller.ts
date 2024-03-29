import React, {
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { SubCategoryList } from '@/types/header';
import { IBestSellingProducts } from './types';
import { tStoreDetailsFile } from '@/helper/staticfile.helper';

interface _SubMenuHelpers {
  bestSellingProducts: IBestSellingProducts[];
  // isProductCategory: boolean;
}

interface _Props {
  category: { title: string; backgroudClass: string; seName: string };
  headerSubMenu: SubCategoryList;
  cases: {
    ready: (helpers: _SubMenuHelpers) => ReactNode;
  };
  cmsMenuConfigViewModel: tStoreDetailsFile['cmsMenuConfigViewModel'];
}

const HeaderSubMenuController: React.FC<_Props> = ({
  cases,
  category,
  cmsMenuConfigViewModel,
}) => {
  const [bestSellingProducts, setBestSellingProducts] = useState<
    { imageUrl: string; title: string; link: string }[]
  >([]);

  useEffect(() => {
    getBestSellingProducts();
  }, [category.title]);

  const getBestSellingProducts = () => {
    const selectedMenu = cmsMenuConfigViewModel.find(
      (item) => item.title === category.title,
    );
    if (
      selectedMenu?.categoryCustomFields &&
      selectedMenu?.categoryCustomFields?.length > 2
    ) {
      let bestSellingProd: {
        imageUrl: string;
        title: string;
        link: string;
      }[] = [];
      selectedMenu?.categoryCustomFields.forEach((field, index) => {
        const image = selectedMenu?.categoryCustomFields.find(
          (item) => item.label === `Image${index}`,
        );
        const title = selectedMenu?.categoryCustomFields.find(
          (item) => item.label === `Image${index} Title`,
        );
        const link = selectedMenu?.categoryCustomFields.find(
          (item) => item.label === `Image${index} link`,
        );

        if (image?.value && title?.value)
          bestSellingProd.push({
            imageUrl: image?.value,
            title: title.value,
            link: link?.value || '',
          });
      });
      setBestSellingProducts(bestSellingProd);
    } else {
      return [];
    }
  };

  return cases.ready({
    bestSellingProducts,
  });
};

export default HeaderSubMenuController;
