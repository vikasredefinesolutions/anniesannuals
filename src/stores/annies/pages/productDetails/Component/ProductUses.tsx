import ProductDetailInfoController from '@/features/product/productDetail/productDetailInfo.ts/controller';
import { IFilterFacetFields } from '@/shared/types/product';
import { Tooltip } from '@mui/material';
import React from 'react';

interface IProps {
  producFilterFacetFields: Array<IFilterFacetFields>;
}

const ProductUses: React.FC<IProps> = ({ producFilterFacetFields }) => {
  const productUses = producFilterFacetFields?.filter((el) => {
    if (el.name == 'Uses') return el;
  })[0]?.values;
  const cardColors = [
    'bg-primary',
    'bg-[#634B91]',
    'bg-[#9C331C]',
    'bg-[#1A6074]',
    'bg-[#694D84]',
    'bg-[#3B5697]',
  ];
  return (
    <ProductDetailInfoController
      config={{}}
      cases={{
        view: ({ config, activeDropDown, setActiveDropDown }) => {
          return (
            <>
              {productUses?.length && (
                <div className='' x-data='{open : true}'>
                  <div
                    className='text-title-text font-sub font-semibold flex items-center justify-between mb-[10px] pt-[15px] border-t border-gray-border cursor-pointer'
                    onClick={() => setActiveDropDown(!activeDropDown)}
                  >
                    <div className=''>Uses</div>
                    <div className=''>
                      <div className=''>
                        <span className='material-icons-outlined'>
                          {activeDropDown ? 'remove' : 'add'}
                        </span>
                      </div>
                    </div>
                  </div>
                  {activeDropDown && (
                    <div className='mb-[5px]'>
                      <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-[30px] text-default-text'>
                        <div className='col-span-1'>
                          {productUses.map((el, index) => {
                            if (index == productUses.length && index % 2 !== 0)
                              return (
                                <div
                                  className='col-span-1 border-t border-gray-border first:border-t-0'
                                  key={el.value + index}
                                >
                                  <div className='flex flex-wrap items-center gap-[20px] px-[5px] py-[10px] mb-[20px] last:mb-0'></div>
                                </div>
                              );
                            if (index % 2 != 0) return null;
                            return (
                              <div
                                className='col-span-1 border-t border-gray-border first:border-t-0'
                                key={el.value + index}
                              >
                                <div className='flex flex-wrap items-center gap-[20px] px-[5px] py-[10px] mb-[20px] last:mb-0'>
                                  {el.iconCode && (
                                    <div
                                      className={`w-[35px] h-[35px] ${
                                        cardColors[index % cardColors.length]
                                      } rounded-sm flex items-center justify-center`}
                                    >
                                      {' '}
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: el.iconCode!,
                                        }}
                                      ></div>
                                    </div>
                                  )}
                                  <Tooltip title={el.value}>
                                    <h4
                                      className='w-[210px]'
                                      style={{
                                        wordBreak: 'break-all',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                      }}
                                    >
                                      {el.value}
                                    </h4>
                                  </Tooltip>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className='col-span-1  lg:border-t-0 border-t border-gray-border'>
                          {productUses.map((el, index) => {
                            if (index % 2 == 0) return null;
                            return (
                              <div
                                className='col-span-1 border-t border-gray-border first:border-t-0'
                                key={el.value + index}
                              >
                                <div className='flex flex-wrap items-center gap-[20px] px-[5px] py-[10px] mb-[20px] last:mb-0'>
                                  {el.iconCode && (
                                    <div
                                      className={`w-[35px] h-[35px] ${
                                        cardColors[index % cardColors.length]
                                      } rounded-sm flex items-center justify-center`}
                                    >
                                      {' '}
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: el.iconCode!,
                                        }}
                                      ></div>
                                    </div>
                                  )}
                                  <Tooltip title={el.value}>
                                    <h4
                                      className='w-[210px]'
                                      style={{
                                        wordBreak: 'break-all',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                      }}
                                    >
                                      {el.value}
                                    </h4>
                                  </Tooltip>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          );
        },
      }}
    />
  );
};

export default ProductUses;
