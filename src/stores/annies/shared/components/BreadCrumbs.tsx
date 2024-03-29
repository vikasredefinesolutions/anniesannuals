'use client';
import CustomLink from '@/shared/Components/CustomLink';
import { __SpecialBreadCrumbsPaths, paths } from '@/utils/paths.constant';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IBreadCrumbProps } from './breadCrumbstype';

const BreadCrumbs: React.FC<IBreadCrumbProps> = ({
  breadCrumbs: breadCrumbsData,
  bgColor,
}) => {
  const [breadCrumbs, setBreadCrumbs] = useState(breadCrumbsData);
  const urlPathName = usePathname();
  useEffect(() => {
    if (breadCrumbsData.length == 0) {
      getStaticbreadCrumbs();
    }
  }, []);

  const getStaticbreadCrumbs = () => {
    __SpecialBreadCrumbsPaths.forEach((item) => {
      if (item.path.includes(urlPathName)) {
        if (item.name) {
          setBreadCrumbs([
            { name: 'Home', url: paths.home },
            { name: item.name, url: item.directTo || '' },
          ]);
          return;
        }
      }
    });
  };
  return (
    <>
      {breadCrumbs && breadCrumbs.length > 0 && (
        <section className={bgColor ? bgColor : 'bg-tertiary'} id={'breadcrumbs_'}>
          <div className="bg-[url('./images/results-section-bottom-floral.png')] bg-bottom bg-contain bg-no-repeat">
            <div className='container mx-auto relative'>
              <div className='pt-[30px] pb-[10px]'>
                <div className=''>
                  <ul
                    className='flex flex-wrap items-center gap-[10px] text-[14px] font-semibold font-sub'
                    itemScope
                    itemType='https://schema.org/BreadcrumbList'
                  >
                    <>
                      {breadCrumbs.map((item, index) => (
                        <React.Fragment key={item.name + index}>
                          {index == 0 ? (
                            <>
                              <li
                                itemProp='itemListElement'
                                itemScope
                                itemType='https://schema.org/ListItem'
                              >
                                <CustomLink
                                  href={item.url}
                                  className='inline-flex items-center'
                                  itemProp='item'
                                >
                                  <span
                                    itemProp='name'
                                    style={{ display: 'none' }}
                                  >
                                    Home
                                  </span>
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='21.621'
                                    height='19.897'
                                    viewBox='0 0 21.621 19.897'
                                  >
                                    <path
                                      id='Path_48756'
                                      data-name='Path 48756'
                                      d='M2.25,12,11.2,3.045a1.126,1.126,0,0,1,1.591,0L21.75,12M4.5,9.75V19.875A1.125,1.125,0,0,0,5.625,21H9.75V16.125A1.125,1.125,0,0,1,10.875,15h2.25a1.125,1.125,0,0,1,1.125,1.125V21h4.125A1.125,1.125,0,0,0,19.5,19.875V9.75M8.25,21H16.5'
                                      transform='translate(-1.189 -1.853)'
                                      fill='none'
                                      stroke='currentColor'
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      strokeWidth='1.5'
                                    ></path>
                                  </svg>
                                </CustomLink>
                                <meta
                                  itemProp='position'
                                  content={`${index + 1}`}
                                />
                              </li>
                            </>
                          ) : (
                            <>
                              <li className=''>/</li>
                              <li
                                className=''
                                itemProp='itemListElement'
                                itemScope
                                itemType='https://schema.org/ListItem'
                              >
                                <CustomLink
                                  href={item.url}
                                  title={item.name}
                                  itemProp='item'
                                >
                                  {index === 1 ? (
                                    <h3 itemProp='name'>{item.name}</h3>
                                  ) : (
                                    <span itemProp='name'>{item.name}</span>
                                  )}
                                </CustomLink>
                                <meta
                                  itemProp='position'
                                  content={`${index + 1}`}
                                />
                              </li>
                            </>
                          )}
                        </React.Fragment>
                      ))}
                    </>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default BreadCrumbs;
