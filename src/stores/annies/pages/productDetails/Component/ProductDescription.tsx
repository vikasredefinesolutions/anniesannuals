import ProductDetailInfoController from '@/features/product/productDetail/productDetailInfo.ts/controller';
import { IProductDetails } from '@/shared/types/product';
import React from 'react';

interface IProps {
  product: IProductDetails | null;
}

const ProductDesc: React.FC<IProps> = ({ product }) => {
  return (
    <ProductDetailInfoController
      config={{}}
      cases={{
        view: ({ config, activeDropDown, setActiveDropDown }) => {
          return (
            <>
              {product?.description && (
                <>
                  <div
                    className='text-title-text font-sub font-semibold flex items-center justify-between mb-[10px] pt-[15px] border-t border-gray-border cursor-pointer'
                    onClick={() => setActiveDropDown(!activeDropDown)}
                  >
                    <div>Description</div>
                    <div className=''>
                      <span className='material-icons-outlined'>
                        {activeDropDown ? 'remove' : 'add'}
                      </span>
                    </div>
                  </div>
                  <meta itemProp='description' content={product?.description} />
                  {activeDropDown && (
                    <div
                      className='text-default-text'
                      style={{ lineHeight: '1.6' }}
                      dangerouslySetInnerHTML={{
                        __html: product?.description,
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

export default ProductDesc;
