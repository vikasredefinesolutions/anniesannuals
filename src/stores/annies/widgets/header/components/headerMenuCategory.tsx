import React from 'react';

import HeaderSubMenuController from '@/features/header/menu/controller';
import { SubCategoryList } from '@/types/header';
import {
  tHeaderSubMenuFile,
  tStoreDetailsFile,
} from '@/helper/staticfile.helper';
import { DynamicContentDesktop } from './DynamicContent';
import CustomContent from './CustomContent';
import { tHeaderSubMenu } from '@/api/jsonServices/updateHeaderSubmenu';
import { IBestSellingProducts } from '@/features/header/menu/types';

interface Props {
  category: { title: string; backgroudClass: string; seName: string };
  headerSubMenu: SubCategoryList;
  onRequestClose: () => void;
  openModel: () => void;
  cmsMenuConfigViewModel: tStoreDetailsFile['cmsMenuConfigViewModel'];
}

type headerKeys = keyof tHeaderSubMenuFile;

const MenuCategory: React.FC<Props> = (Props) => {
  const {
    category,
    openModel,
    onRequestClose,
    headerSubMenu,
    cmsMenuConfigViewModel,
  } = Props;

  let content: tHeaderSubMenu | null = null;
  if (category?.seName in headerSubMenu) {
    content = headerSubMenu[
      category.seName as headerKeys
    ] as unknown as tHeaderSubMenu;
  }

  const Menu: React.FC<{
    subMenuToShow: tHeaderSubMenu | null;
    bestSellingProducts: IBestSellingProducts[];
  }> = ({ subMenuToShow, bestSellingProducts }) => {
    if (!subMenuToShow) return null;

    switch (subMenuToShow?.type) {
      case 'dynamic':
        return (
          <DynamicContentDesktop
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

  return (
    <HeaderSubMenuController
      cmsMenuConfigViewModel={cmsMenuConfigViewModel}
      category={category}
      headerSubMenu={headerSubMenu}
      cases={{
        ready: ({ bestSellingProducts }) => {
          return (
            <div
              className='absolute top-full left-0 right-0 sm:text-[14px] z-50 border-t border-t-[#295B4C] bg-black text-white'
              onMouseEnter={openModel}
              onMouseLeave={onRequestClose}
            >
              <div
                className={`relative bg-${category?.backgroudClass.replace(
                  'color-',
                  '',
                )}`}
              >
                <div className='container mx-auto'>
                  {Menu({ subMenuToShow: content, bestSellingProducts })}
                </div>
              </div>
            </div>
          );
        },
      }}
    />
  );
};

export default MenuCategory;
