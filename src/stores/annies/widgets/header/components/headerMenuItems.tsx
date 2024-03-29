import React, { Fragment, useState } from 'react';
import useModel from '@/stores/annies/shared/hooks/use-model';
import MenuCategory from './headerMenuCategory';
import { IHeaderMenuConfig } from '@/shared/types/cmsThemeConfig';
import CustomLink from '@/shared/Components/CustomLink';
import { SubCategoryList } from '@/types/header';
import { tStoreDetailsFile } from '@/helper/staticfile.helper';

interface Props {
  headerSubMenu: SubCategoryList;
  cmsMenuConfigViewModel: tStoreDetailsFile['cmsMenuConfigViewModel'];
}

const MenuItems: React.FC<Props> = ({
  headerSubMenu,
  cmsMenuConfigViewModel,
}) => {
  const { isOpen, openModel, onRequestClose } = useModel(false);
  const [selectedCategory, setSelectedCategory] = useState({
    title: '',
    backgroudClass: '',
    seName: '',
  });
  const handleCategory = (
    name: string,
    seName: string,
    backgroudClass = '',
  ): void => {
    setSelectedCategory({
      title: name,
      backgroudClass: backgroudClass,
      seName: seName,
    });
    openModel();
  };

  return (
    <>
      {cmsMenuConfigViewModel?.map((category: IHeaderMenuConfig, index) => {
        const buttonClass = category?.categoryCustomFields?.find(
          (item) => item.label === 'CATEGORY BACKGROUND COLOR',
        );
        const backgrouldClass = category?.categoryCustomFields?.find(
          (item) => item.label === 'SUB CATEGORY BACKGROUND COLOR',
        );
        return (
          <div className='relative' key={category.id}>
            <div
              className={`relative bg-${buttonClass?.value.replace(
                'color-',
                '',
              )}
               ${index === 0 ? 'rounded-tl-sm ' : ''}
                ${
                  index === cmsMenuConfigViewModel.length - 1
                    ? 'rounded-br-sm '
                    : ''
                }
               text-white hover:bg-opacity-80 focus:bg-opacity-80`}
              onMouseEnter={() =>
                handleCategory(
                  category.title,
                  category.se_Name,
                  backgrouldClass?.value,
                )
              }
              onMouseLeave={onRequestClose}
            >
              <CustomLink
                href={`/${
                  category?.customCollectionUrl || category?.se_Name
                }.html`}
                className={`relative text-[12px] xl:text-[14px] flex justify-center items-center font-semibold pt-[11px] pb-[8px] px-[5px] xl:px-[10px] font-sub primary-link hover:primary-link-hover`}
              >
                {category.title}
              </CustomLink>
            </div>
          </div>
        );
      })}
      {isOpen ? (
        <MenuCategory
          cmsMenuConfigViewModel={cmsMenuConfigViewModel}
          category={selectedCategory}
          headerSubMenu={headerSubMenu}
          openModel={openModel}
          onRequestClose={onRequestClose}
        />
      ) : null}
    </>
  );
};

export default MenuItems;
