import { DynamicSubMenuContent } from '@/api/jsonServices/updateHeaderSubmenu';
import {
  IBestSellingProducts,
  ISubmenuCategories,
} from '@/features/header/menu/types';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import React, { useEffect, useState } from 'react';

interface iProps {
  category: {
    title: string;
    backgroudClass: string;
    seName: string;
  };
  subCategories: DynamicSubMenuContent['items'];
  bestSellingProducts: IBestSellingProducts[];
  onRequestClose: () => void;
}

const seperatePopularOnes = (subCategories: DynamicSubMenuContent['items']) => {
  const popular: DynamicSubMenuContent['items'] = [];
  const nonPopular: DynamicSubMenuContent['items'] = [];
  subCategories.forEach((item) => {
    if (item.isPopular) {
      popular.push(item);
      return;
    }
    nonPopular.push(item);
  });

  return {
    popular,
    nonPopular,
  };
};

const getPopularSeName = (item: ISubmenuCategories) => {
  if (
    item.customSEName?.includes('search/result') ||
    item.seName?.includes('search/result')
  ) {
    return `/${item.customSEName || item.seName}`;
  }

  return `/${item.customSEName || item.seName}.html`;
};

const defineColumnsForPopulars = (
  bestSellingProducts: IBestSellingProducts[],
  subCategories: ISubmenuCategories[],
): {
  popular: 0 | 1 | 2 | 3;
  bestSellar: 0 | 1 | 2 | 3 | number;
} => {
  if (bestSellingProducts.length === 1) {
    return {
      popular: 3,
      bestSellar: 1,
    };
  }

  if (bestSellingProducts.length === 2) {
    return {
      popular: 2,
      bestSellar: 2,
    };
  }

  if (bestSellingProducts.length === 3) {
    return {
      popular: 1,
      bestSellar: 3,
    };
  }

  return {
    popular: 3,
    bestSellar: 0,
  };
};

export const DynamicContentDesktop: React.FC<iProps> = ({
  category,
  onRequestClose,
  bestSellingProducts,
  subCategories,
}) => {
  const [categories, setCategories] = useState<{
    popular: ISubmenuCategories[];
    nonPopular: ISubmenuCategories[];
  }>(seperatePopularOnes(subCategories));

  const [columns, setColumns] = useState<{
    popular: 0 | 1 | 2 | 3;
    bestSellar: 0 | 1 | 2 | 3 | number;
  }>(defineColumnsForPopulars(bestSellingProducts, subCategories));

  useEffect(() => {
    setCategories(seperatePopularOnes(subCategories));
    setColumns(defineColumnsForPopulars(bestSellingProducts, subCategories));
  }, [bestSellingProducts, subCategories]);

  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-6 pt-[37px] pb-[60px]'>
      <div className='col-span-1'>
        <div className='text-[18px] font-bold font-sub text-body-color'>
          {category?.title}
        </div>
        <ul className='text-[13px] lg:text-[14px] font-sub font-semibold'>
          {categories?.nonPopular?.map((item) => (
            <li className='pt-[20px]' key={item?.seName}>
              <CustomLink
                className='inline-block text-anchor hover:text-anchor-hover'
                title={item?.categoryName}
                href={getPopularSeName(item)}
                onClick={onRequestClose}
              >
                {item?.categoryName}
              </CustomLink>
            </li>
          ))}
        </ul>

        <div className='mt-[30px]'>
          <CustomLink
            className='inline-flex flex-wrap items-center px-[32px] py-[16px] bg-primary text-white text-[14px] font-extrabold rounded-xs uppercase'
            title={category?.title}
            href={`/${category?.seName}.html`}
            onClick={onRequestClose}
          >
            shop all
          </CustomLink>
        </div>
      </div>
      <div
        className={`col-span-1 lg:col-span-2 xl:col-span-2`}
        // ${
        //   columns.popular === 3 ? 2 : 2        }
      >
        <div className='text-[18px] font-bold font-sub text-body-color'>
          Popular
        </div>
        <ul
          className={`text-[13px] lg:text-[14px] font-sub font-semibold grid grid-cols-1 lg:grid-cols-2`} // 3
        >
          {categories?.popular?.map((item) => (
            <li className='pt-[20px] ' key={item?.seName}>
              <CustomLink
                className='inline-block text-anchor hover:text-anchor-hover break-words'
                title={item?.categoryName}
                href={getPopularSeName(item)}
                onClick={onRequestClose}
              >
                {item?.categoryName}
              </CustomLink>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={`col-span-1 ${
          columns.bestSellar === 3 ? 'xl:col-span-3' : ''
        } `}
      >
        {bestSellingProducts.length > 0 && (
          <>
            {' '}
            <div className='text-[18px] font-bold font-sub text-body-color'>
              Best Selling
            </div>
            <div
              className={`grid grid-cols-1 ${
                columns.bestSellar === 3 ? 'lg:grid-cols-3 ' : ''
              } gap-[27px]`}
            >
              {bestSellingProducts.map((item) => (
                <div
                  className={`col-span-1 ${
                    columns.bestSellar === 3 ? 'lg:col-span-1' : ''
                  }`}
                  key={item?.imageUrl}
                  onClick={onRequestClose}
                >
                  <div className='mt-[20px]'>
                    <CustomLink title='' href={`/${item?.link}.html`}>
                      <Image
                        className='rounded-tl-xl rounded-br-xl overflow-hidden'
                        src={item?.imageUrl}
                        alt={item?.title}
                      />
                    </CustomLink>
                  </div>
                  <div className='mt-[15px]'>
                    <CustomLink
                      className='inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover'
                      title=''
                      href={`/${item?.link}.html`}
                    >
                      {item?.title}
                    </CustomLink>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const DynamicContentMobile: React.FC<iProps> = ({
  category,
  onRequestClose,
  bestSellingProducts,
  subCategories,
}) => {
  const [categories, setCategories] = useState<{
    popular: ISubmenuCategories[];
    nonPopular: ISubmenuCategories[];
  }>(seperatePopularOnes(subCategories));

  const [columns, setColumns] = useState<{
    popular: 0 | 1 | 2 | 3;
    bestSellar: 0 | 1 | 2 | 3 | number;
  }>(defineColumnsForPopulars(bestSellingProducts, subCategories));

  useEffect(() => {
    setCategories(seperatePopularOnes(subCategories));
    setColumns(defineColumnsForPopulars(bestSellingProducts, subCategories));
  }, [bestSellingProducts, subCategories]);

  return (
    <div className={`bg-${category.backgroudClass.replace('color-', '')}}`}>
      <ul className=''>
        {categories.nonPopular.length ? (
          <li className=''>
            <div className='relative flex items-center justify-between pl-[25px] pt-[20px]'>
              <CustomLink
                href={`/${category?.seName}.html`}
                onClick={onRequestClose}
              >
                <span className='text-[18px] font-[600]'>{category.title}</span>
              </CustomLink>
            </div>
            <div className='text-[14px] pt-[10px]'>
              <ul className=''>
                {categories?.nonPopular?.map((item) => (
                  <li
                    className='py-[10px] pl-[25px]'
                    key={item?.customSEName || item?.seName}
                  >
                    <CustomLink
                      onClick={onRequestClose}
                      className='inline-block font-semibold text-anchor hover:text-anchor-hover'
                      title={item?.categoryName}
                      href={`/${item?.customSEName || item?.seName}.html`}
                    >
                      {item?.categoryName}
                    </CustomLink>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ) : null}

        {categories?.popular.length ? (
          <li className=''>
            <div className='relative flex items-center justify-between pl-[25px] pt-[20px]'>
              <span className='text-[18px] font-[600]'>Popular</span>
            </div>
            <div className='text-[14px] pt-[10px]'>
              <ul className=''>
                {categories?.popular?.map((item) => (
                  <li
                    className='py-[10px] pl-[25px]'
                    key={item?.customSEName || item?.seName}
                  >
                    <CustomLink
                      onClick={onRequestClose}
                      className='inline-block font-semibold text-anchor hover:text-anchor-hover'
                      title={item?.categoryName}
                      href={getPopularSeName(item)}
                    >
                      {item?.categoryName}
                    </CustomLink>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ) : null}

        {bestSellingProducts.length > 0 && (
          <li className=''>
            <div className='relative flex items-center justify-between pl-[25px] pt-[20px]'>
              <span className='text-[18px] font-[600]'>Best Seller</span>
            </div>

            <div className='text-[14px] pt-[10px]'>
              <ul className=''>
                {bestSellingProducts.map((item) => (
                  <li
                    key={item?.imageUrl}
                    className='py-[12px] border-b border-b-[#295B4C] px-[30px]'
                  >
                    <CustomLink
                      className='inline-block font-semibold text-anchor hover:text-anchor-hover'
                      title=''
                      onClick={onRequestClose}
                      href={`${item?.link}.html`}
                    >
                      <span className=''>
                        <Image
                          className='block rounded-tl-xl rounded-br-xl overflow-hidden'
                          src={item?.imageUrl}
                          alt=''
                        />
                      </span>
                      <span className='mt-[10px] block'>{item?.title}</span>
                    </CustomLink>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};
