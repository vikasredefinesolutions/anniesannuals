import ProductDetailInfoController from '@/features/product/productDetail/productDetailInfo.ts/controller';
import { IProductDetails } from '@/shared/types/product';
import React from 'react';

interface IProps {
  product: IProductDetails | null;
}

const ProductGurantee: React.FC<IProps> = ({ product }) => {
  return (
    <ProductDetailInfoController
      config={{}}
      cases={{
        view: ({ config, activeDropDown, setActiveDropDown }) => {
          return (
            <>
              {product?.shortDescription && (
                <>
                  <div
                    className='text-title-text font-sub font-semibold flex items-center justify-between mb-[10px] pt-[15px] border-t border-gray-border cursor-pointer'
                    onClick={() => setActiveDropDown(!activeDropDown)}
                  >
                    <div>Our Guarantee</div>
                    <div className=''>
                      <span className='material-icons-outlined'>
                        {activeDropDown ? 'remove' : 'add'}
                      </span>
                    </div>
                  </div>
                  {activeDropDown && (
                    <div
                      className='text-default-text pb-[15px]'
                      dangerouslySetInnerHTML={{
                        __html: product?.shortDescription,
                      }}
                    ></div>
                  )}
                </>
              )}
            </>
          );
        },
      }}
    />
  );
};

export default ProductGurantee;
