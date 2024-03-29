import React from 'react';
import MenuItems from './headerMenuItems';
import MobileMenu from './mobileMenu';
import { SubCategoryList } from '@/types/header';
import { tStoreDetailsFile } from '@/helper/staticfile.helper';

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  headerSubMenu: SubCategoryList;
  cmsMenuConfigViewModel: tStoreDetailsFile['cmsMenuConfigViewModel'];
}

const LowerHeader: React.FC<Props> = (Props) => {
  const { isOpen, onRequestClose, headerSubMenu, cmsMenuConfigViewModel } =
    Props;
  return (
    <>
      <div className='lg:hidden'>
        <MobileMenu
          cmsMenuConfigViewModel={cmsMenuConfigViewModel}
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          headerSubMenu={headerSubMenu}
        />
      </div>
      <div className='bg-[#FFF3E0]'>
        <div className='container mx-auto'>
          <div className='h-full hidden lg:block'>
            <div>
              <div className='h-full grid grid-flow-col justify-items-stretch header-nav gap-[1px]'>
                <MenuItems
                  cmsMenuConfigViewModel={cmsMenuConfigViewModel}
                  headerSubMenu={headerSubMenu}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LowerHeader;
