import Image from '@/shared/Components/Image';
import { IProductColor, IProductDetails, IProductInventory, IProductInventoryTransfomed } from '@/shared/types/product';
import React, { Suspense } from 'react';

interface IProps {
    productColor: IProductColor[] | null;
    productId:string|number,
    changeColorHandler: (value: IProductColor) => void;
    selectedColor: IProductColor | null;
    inventoryData: IProductInventoryTransfomed | null;
    setSelectedSize:(value: IProductInventory) => void
    selectedSize:IProductInventory|null
}

const ProductColorAndSize: React.FC<IProps> = ({
  productColor,
  productId,
  changeColorHandler,
  setSelectedSize,
  inventoryData,
  selectedColor,
  selectedSize
}) => {
  return (
    <>
      <div className='flex items-end gap-[5px] mb-[15px]'>
        <div className='text-normal-text font-sub'>Item ID:</div>
        <div className='text-normal-text font-semibold'>{productId}</div>
      </div>
      <div className='flex justify-start items-center gap-[20px] mb-[20px]'>
        <div className='w-full max-w-[60px] py-[10px] font-sub'>Color:</div>
        <ul className='w-[calc(100%-80px)] flex flex-wrap items-center gap-[10px] text-default-text'>
          {productColor?.map((color) => {
            return (
              <li
                key={color.name}
                className='border hover:border-primary rounded-full p-[0px] relative group block mb-[10px] md:mb-[0px] border-primary'
                onClick={() => changeColorHandler(color)}
              >
                <Image
                  src={color.imageUrl}
                  alt={color.altTag}
                  className='w-[32px] h-[32px] rounded-full cursor-pointer'
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div className='flex items-start gap-[20px] pb-[30px]'>
        <div className='w-full max-w-[60px] py-[10px] font-sub'>SIZE:</div>
        <ul
          className='w-[calc(100%-80px)] flex flex-wrap items-center gap-[10px] text-default-text'
          x-data='{ selected : 1 }'
        >
           
          {inventoryData?.sizes.map((el) => {
            if (el.colorAttributeOptionId == selectedColor?.attributeOptionId) {
              return (
                <>
                  {el.sizeArr.map((size) => {
                    return (
                      <li
                        key={size.name}
                        onClick={() => setSelectedSize(size)}
                        className={`flex items-center justify-center border hover:border-primary px-[10px] py-[8px] cursor-pointer  ${
                          selectedSize?.name == size.name
                            ? 'bg-primary text-white'
                            : 'border-gray-border'
                        } rounded-sm`}
                      >
                        {size.name}
                      </li>
                    );
                  })}
                </>
              );
            }
          })}
        </ul>
      </div>
    </>
  );
};

export default ProductColorAndSize;
