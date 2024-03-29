import React from 'react';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import HeaderSubMenuController from '@/features/header/menu/controller';
import { SubCategoryList } from '@/types/header';
import {
  tHeaderSubMenuFile,
  tStoreDetailsFile,
} from '@/helper/staticfile.helper';
import {
  IBestSellingProducts,
  ISubmenuCategories,
} from '@/features/header/menu/types';
import { DynamicContentMobile } from './DynamicContent';
import CustomContent from './CustomContent';
import { tHeaderSubMenu } from '@/api/jsonServices/updateHeaderSubmenu';

interface iProps {
  category: { title: string; backgroudClass: string; seName: string };
  headerSubMenu: SubCategoryList;
  onRequestClose: () => void;
  cmsMenuConfigViewModel: tStoreDetailsFile['cmsMenuConfigViewModel'];
}

type headerKeys = keyof tHeaderSubMenuFile;

const SubMenuItem: React.FC<{
  subMenuToShow: tHeaderSubMenu | null;
  bestSellingProducts: IBestSellingProducts[];
  category: iProps['category'];
  onRequestClose: iProps['onRequestClose'];
}> = ({ subMenuToShow, bestSellingProducts, category, onRequestClose }) => {
  if (!subMenuToShow) return null;

  switch (subMenuToShow?.type) {
    case 'dynamic':
      return (
        <DynamicContentMobile
          category={category}
          subCategories={subMenuToShow?.items}
          onRequestClose={onRequestClose}
          bestSellingProducts={bestSellingProducts}
        />
      );
    case 'custom':
      return (
        <CustomContent
          category={category}
          subMenuString={subMenuToShow?.items}
          onRequestClose={onRequestClose}
        />
      );

    default:
      return null;
  }
};

const MobileSubMenu: React.FC<iProps> = ({
  category,
  headerSubMenu,
  onRequestClose,
  cmsMenuConfigViewModel,
}) => {
  let content: tHeaderSubMenu | null = null;
  if (category?.seName in headerSubMenu) {
    content = headerSubMenu[
      category.seName as headerKeys
    ] as unknown as tHeaderSubMenu;
  }

  return (
    <HeaderSubMenuController
      cmsMenuConfigViewModel={cmsMenuConfigViewModel}
      category={category}
      headerSubMenu={headerSubMenu}
      cases={{
        ready: ({ bestSellingProducts }) => (
          <SubMenuItem
            subMenuToShow={content}
            bestSellingProducts={bestSellingProducts}
            onRequestClose={onRequestClose}
            category={category}
          />
        ),
      }}
    />
  );
};

export default MobileSubMenu;
