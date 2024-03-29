import { useAppDispatch } from '@/app/redux/hooks';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import QtyInput from '@/shared/Components/Inputs/QtyInput';
import { IProductDetails, IProductInventory } from '@/shared/types/product';

import React, { useState } from 'react';

interface IProps {
  quantityValue: number;
  handleQuantityChange: (qty: number) => void;
  handleAddToCart: (product: IProductDetails) => void;
  product: IProductDetails | null;
  showWishList?: boolean;
  wishlistClickHandler?: () => void;
  wishListId?: number;
  productPage?: boolean;
  selectedSize?: IProductInventory | null;
}

const QuantityInput: React.FC<IProps> = ({
  product,
  quantityValue,
  handleQuantityChange,
  handleAddToCart,
  showWishList = false,
  wishlistClickHandler,
  wishListId,
  productPage,
  selectedSize,
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const addtocartonfutureInv = product!.isAddToCart;
  const dispatch = useAppDispatch();
  const isOutOfBox = () => {
    if (product?.isDiscontinue) {
      return true;
    }
    if (!product?.sizes && product?.quantity === 0) {
      if (
        product.futureInventoryDate &&
        product.futureInventory !== 0 &&
        addtocartonfutureInv
      ) {
        return false;
      }
      return true;
    } else if (product?.sizes && selectedSize?.inventory == 0) {
      if (
        product.futureInventoryDate &&
        product.futureInventory !== 0 &&
        addtocartonfutureInv
      ) {
        return false;
      }
      return true;
    }
    return false;
  };
  const addtocartText = () => {
    if (
      (product?.sizes && selectedSize?.inventory) ||
      (!product?.sizes && product?.quantity)
    ) {
      return 'Add to Cart';
    } else if (
      product?.futureInventoryDate &&
      product?.futureInventory &&
      addtocartonfutureInv
    ) {
      return 'Pre Order';
    }
    return 'Add to Cart';
  };

  return (
    <>
      <div className={`flex flex-wrap mb-[15px] gap-[10px]`}>
        {!isOutOfBox() && !product?.isDiscontinue && (
          <div
            className={'flex items-center border border-primary rounded-xs'}
            role='group'
          >
            <button
              disabled={quantityValue <= 0}
              onClick={() => handleQuantityChange(quantityValue - 1)}
              type='button'
              className={`inline-block text-medium-text w-[30px] text-center font-bold`}
            >
              -
            </button>
            <div className='w-[40px] text-center font-bold'>
              <QtyInput
                name='qty'
                value={quantityValue}
                onChangeHandler={(value) =>
                  handleQuantityChange(value as number)
                }
                className='w-full bg-transparent text-center focus:outline-none'
              />
            </div>
            <button
              onClick={() => handleQuantityChange(quantityValue + 1)}
              type='button'
              className={
                'inline-block text-medium-text w-[30px] text-center font-bold'
              }
            >
              +
            </button>
          </div>
        )}

        {isOutOfBox() || product?.isDiscontinue ? (
          <>
            {product?.isDiscontinue && (
              <button
                type='button'
                disabled={true}
                className={` inline-block ${
                  productPage ? 'btn-md' : ''
                } text-[14px] bg-primary text-white font-extrabold uppercase rounded-xs px-[30px] py-[15px]`}
              >
                Discontinue
              </button>
            )}
            {isOutOfBox() && (
              <button
                type='button'
                disabled={true}
                className={` inline-block ${
                  productPage ? 'btn-md' : ''
                } text-[14px] bg-primary text-white font-extrabold uppercase rounded-xs px-[30px] py-[15px]`}
              >
                Out of Stock
              </button>
            )}
          </>
        ) : (
          <button
            onClick={() => {
              if (selectedSize || !product?.sizes) {
                product && handleAddToCart(product!);
              } else {
                dispatch(
                  openAlertModal({
                    title: 'Error',
                    description: `Please specify the desired size`,
                    isAlertModalOpen: true,
                  }),
                );
              }
            }}
            className={`inline-block ${
              productPage ? 'btn-md' : ''
            } text-[14px] bg-primary text-white font-extrabold uppercase rounded-xs px-[30px] py-[15px]`}
          >
            {addtocartText()}
          </button>
        )}

        {showWishList && (
          <>
            <button
              onClick={() => {
                if (!product?.sizes || selectedSize || wishListId !== 0) {
                  wishlistClickHandler && wishlistClickHandler();
                } else {
                  dispatch(
                    openAlertModal({
                      title: 'Error',
                      description: `Please specify the desired size`,
                      isAlertModalOpen: true,
                    }),
                  );
                }
              }}
              className={`inline-flex  ${
                productPage ? 'btn-md' : ''
              } gap-[9px] text-[14px] rounded-xs border border-primary text-primary font-extrabold uppercase px-[16px] py-[15px] items-center`}
            >
              {wishListId !== 0 ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='17.971'
                  height='16.64'
                  viewBox='0 0 17.971 16.64'
                >
                  <g
                    id='Group_5815'
                    data-name='Group 5815'
                    transform='translate(23877.709 19765.66)'
                  >
                    <path
                      id='Path_49012'
                      data-name='Path 49012'
                      d='M18.971,7.743a4.079,4.079,0,0,0-4.16-3.993,4.167,4.167,0,0,0-3.826,2.425A4.167,4.167,0,0,0,7.159,3.75,4.079,4.079,0,0,0,3,7.743c0,6.406,7.986,10.647,7.986,10.647S18.971,14.149,18.971,7.743Z'
                      transform='translate(-23879.709 -19768.41)'
                      fill='none'
                      stroke='#9c331c'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                    />
                    <path
                      id='Path_49013'
                      data-name='Path 49013'
                      d='M9.968,17.714l-.006,0-.018-.01q-.159-.087-.315-.179a20.686,20.686,0,0,1-3.487-2.6c-1.89-1.764-3.893-4.381-3.893-7.6A4.393,4.393,0,0,1,6.718,3,4.518,4.518,0,0,1,10.26,4.686,4.518,4.518,0,0,1,13.8,3,4.392,4.392,0,0,1,18.27,7.313c0,3.225-2,5.842-3.893,7.6a20.682,20.682,0,0,1-3.487,2.6q-.156.092-.315.18l-.018.01-.006,0h0a.618.618,0,0,1-.578,0h0Z'
                      transform='translate(-23878.959 -19768)'
                      fill='#9c331c'
                    />
                  </g>
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='17.971'
                  height='16.641'
                  viewBox='0 0 17.971 16.641'
                >
                  <path
                    id='Path_49012'
                    data-name='Path 49012'
                    d='M18.971,7.743a4.079,4.079,0,0,0-4.16-3.993,4.167,4.167,0,0,0-3.826,2.425A4.167,4.167,0,0,0,7.159,3.75,4.079,4.079,0,0,0,3,7.743c0,6.406,7.986,10.647,7.986,10.647S18.971,14.149,18.971,7.743Z'
                    transform='translate(-2 -2.75)'
                    fill='none'
                    stroke='#295b4c'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                  />
                </svg>
              )}
              <span className=''>
                {' '}
                {wishListId !== 0 ? 'Remove From Wishlist' : 'Add to wishlist'}
              </span>
            </button>
            {productPage && (
              <div className='relative inline-flex mt-[20px]'>
                <span
                  className='material-icons text-[#9C331C]'
                  onMouseEnter={() => setShowInfo(true)}
                  onMouseLeave={() => setShowInfo(false)}
                >
                  info
                </span>
                {showInfo && (
                  <div className='bg-[#FFF0ED] rounded-sm m-[2px] p-[10px] shadow absolute lg:right-0 bottom-full w-[220px]'>
                    Save your time. Add your favorites in one location.
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default QuantityInput;
