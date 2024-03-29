'use client';
import { useAppSelector } from '@/app/redux/hooks';
import HeaderController from '@/features/header/controller';
import { tStoreDetailsFile } from '@/helper/staticfile.helper';
import { SubCategoryList } from '@/types/header';
import { paths } from '@/utils/paths.constant';
import { usePathname } from 'next/navigation';
import useModel from '../../shared/hooks/use-model';
import EmployeeHeader from './components/EmployeeHeader';
import HeaderBanner from './components/headerBanner';
import LowerHeader from './components/lowerHeader';
import UpperHeader from './components/upperHeader';

export interface iHeaderProps {
  headerConfig: any;
  headerSubMenu: SubCategoryList;
  cmsStoreThemeConfigsViewModel: tStoreDetailsFile['cmsStoreThemeConfigsViewModel'];
  cmsMenuConfigViewModel: tStoreDetailsFile['cmsMenuConfigViewModel'];
}

const Header = ({
  headerConfig,
  headerSubMenu,
  cmsMenuConfigViewModel,
  cmsStoreThemeConfigsViewModel,
}: iHeaderProps) => {
  const { isOpen, openModel, onRequestClose } = useModel(false);
  const urlPathName = usePathname();
  const isEmployeeLoggedIn = useAppSelector((state) => state.employee.loggedIn);

  return (
    <>
      {urlPathName === paths.thankYou ? null : (
        <HeaderController
          cases={{
            view: ({ handleSignOut }) => {
              return (
                <div className='w-full' id='header'>
                  {isEmployeeLoggedIn && (
                    <EmployeeHeader handleSignOut={handleSignOut} />
                  )}
                  <HeaderBanner
                    cmsStoreThemeConfigsViewModel={
                      cmsStoreThemeConfigsViewModel
                    }
                  />
                  <header className='relative'>
                    <nav aria-label='top w-full'>
                      <UpperHeader
                        onOpenModel={openModel}
                        cmsStoreThemeConfigsViewModel={
                          cmsStoreThemeConfigsViewModel
                        }
                      />
                      <LowerHeader
                        cmsMenuConfigViewModel={cmsMenuConfigViewModel}
                        isOpen={isOpen}
                        onRequestClose={onRequestClose}
                        headerSubMenu={headerSubMenu}
                      />
                    </nav>
                  </header>
                  {headerConfig?.announcementRow &&
                    headerConfig?.announcementRow?.length > 1 &&
                    headerConfig?.announcementRow[1]?.isVisible &&
                    (headerConfig?.announcementRow[1]?.leftSideText ||
                      headerConfig?.announcementRow[1]?.rightSideText) && (
                      <div className='w-full text-center py-3'>
                        <div
                          className='font-extrabold xl:text-[12px] text-[10px] uppercase '
                          dangerouslySetInnerHTML={{
                            __html:
                              headerConfig?.announcementRow[1]?.leftSideText ||
                              headerConfig?.announcementRow[1]?.rightSideText ||
                              '',
                          }}
                        ></div>
                      </div>
                    )}
                </div>
              );
            },
          }}
        />
      )}
    </>
  );
};

export default Header;
