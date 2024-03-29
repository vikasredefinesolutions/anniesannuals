import React, { Fragment, useState } from 'react';
import useModel from '@/stores/annies/shared/hooks/use-model';
import MobileSubMenu from './mobileSubMenu';
import storeDetails from '@/staticData/storeDetails.json';
import CustomLink from '@/shared/Components/CustomLink';
import { SubCategoryList } from '@/types/header';
import { tStoreDetailsFile } from '@/helper/staticfile.helper';

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  headerSubMenu: SubCategoryList;
  cmsMenuConfigViewModel: tStoreDetailsFile['cmsMenuConfigViewModel'];
}

const MobileMenu: React.FC<Props> = (Props) => {
  const { isOpen, onRequestClose, headerSubMenu } = Props;

  const [selectedCategory, setSelectedCategory] = useState({
    title: '',
    backgroudClass: '',
    btnBackgroundClass: '',
    seName: '',
    customSeName: '',
  });

  const {
    isOpen: isOpenSubMenu,
    openModel: openSubMenuModel,
    onRequestClose: inRequestSubMenuClose,
  } = useModel(false);

  const handleSubMenu = (
    categoryName: string,
    seName: string,
    customSeName: string,
    btnBackgroundClass = '',
    backgroundClass = '',
  ): void => {
    setSelectedCategory({
      backgroudClass: backgroundClass,
      btnBackgroundClass: btnBackgroundClass,
      title: categoryName,
      seName: seName,
      customSeName: customSeName,
    });
    openSubMenuModel();
  };

  if (!isOpen) return null;
  return (
    <>
      <div className='fixed z-[100] lg:hidden inset-0 bg-[#000000] bg-opacity-50 mobile-menu font-sub'>
        <div className='w-full max-w-xs bg-[#FFF3E0] h-screen overflow-x-scroll'>
          <div className='header-nav relative tracking-[1px]'>
            {isOpenSubMenu ? (
              <div
                className='leading-none p-[10px] bg-[#FFF3E0]'
                onClick={inRequestSubMenuClose}
              >
                <button className='inline-block bg-primary hover:bg-[#8a2c9b] text-white rounded-full p-[5px] w-[30px] h-[30px] text-[12px]'>
                  <span className='material-icons-outlined text-[19px]'>
                    chevron_left
                  </span>
                </button>
              </div>
            ) : (
              <div
                className='leading-none p-[10px] bg-[#FFF3E0]'
                onClick={onRequestClose}
              >
                <CustomLink
                  href={undefined}
                  className='inline-block bg-primary hover:bg-[#8a2c9b] text-white rounded-full p-[5px] mobile-menu-close w-[30px] h-[30px] text-[12px]'
                >
                  <span className='material-icons-outlined text-[19px]'>
                    close
                  </span>
                </CustomLink>
              </div>
            )}
            {isOpenSubMenu ? (
              <>
                <div
                  className={`relative flex items-center justify-between bg-${selectedCategory.btnBackgroundClass.replace(
                    'color-',
                    '',
                  )}`}
                >
                  <div className='flex items-center justify-between w-full px-[10px]'>
                    <span className='font-semibold text-[#ffffff] text-[14px] relative pl-[15px] mr-[5px] flex items-center pt-[10px] pb-[10px] grow primary-link hover:primary-link-hover'>
                      {selectedCategory.title}
                    </span>
                  </div>
                </div>
                <MobileSubMenu
                  cmsMenuConfigViewModel={Props.cmsMenuConfigViewModel}
                  category={selectedCategory}
                  onRequestClose={onRequestClose}
                  headerSubMenu={headerSubMenu}
                />
              </>
            ) : (
              <>
                {Props.cmsMenuConfigViewModel.map((category) => {
                  const buttonClass = category?.categoryCustomFields?.find(
                    (item) => item.label === 'CATEGORY BACKGROUND COLOR',
                  );
                  const backgrouldClass = category?.categoryCustomFields?.find(
                    (item) => item.label === 'SUB CATEGORY BACKGROUND COLOR',
                  );
                  return (
                    <Fragment key={category.id}>
                      {category.se_Name === 'shop-the-garden' ||
                      category.se_Name === 'sale' ? (
                        <div
                          className={`relative flex items-center justify-between bg-${buttonClass?.value.replace(
                            'color-',
                            '',
                          )}`}
                        >
                          <CustomLink
                            href={`/${
                              category?.customCollectionUrl || category.se_Name
                            }.html`}
                            className='flex items-center justify-between w-full px-[10px]'
                          >
                            <span
                              onClick={() => onRequestClose()}
                              className='font-semibold text-[#ffffff] text-[14px] relative pl-[15px] mr-[5px] flex items-center pt-[10px] pb-[10px] grow primary-link hover:primary-link-hover'
                            >
                              {category.title}
                            </span>
                            <span className='material-icons-outlined text-[25px] text-[#ffffff]'>
                              chevron_right
                            </span>
                          </CustomLink>
                        </div>
                      ) : (
                        <div
                          className={`relative flex items-center justify-between bg-${buttonClass?.value.replace(
                            'color-',
                            '',
                          )}`}
                          onClick={() =>
                            handleSubMenu(
                              category.title,
                              category.se_Name,
                              category?.customCollectionUrl,
                              buttonClass?.value,
                              backgrouldClass?.value,
                            )
                          }
                        >
                          <CustomLink
                            href={undefined}
                            className='flex items-center justify-between w-full px-[10px]'
                          >
                            <span className='font-semibold text-[#ffffff] text-[14px] relative pl-[15px] mr-[5px] flex items-center pt-[10px] pb-[10px] grow primary-link hover:primary-link-hover'>
                              {category.title}
                            </span>
                            <span className='material-icons-outlined text-[25px] text-[#ffffff]'>
                              chevron_right
                            </span>
                          </CustomLink>
                        </div>
                      )}
                    </Fragment>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
