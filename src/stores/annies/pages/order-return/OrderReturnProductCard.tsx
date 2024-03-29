import CheckBox from '@/components/common/checkbox';
import { ICartIdQty } from '@/features/myAccount/orderAndReturns/controller';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import { _CartItem } from '@/shared/apis/cart/fetchCartProducts';
import { statusBarCssController } from '@/utils/helpers';
import { paths } from '@/utils/paths.constant';
import dayjs from 'dayjs';
import { SetStateAction, useEffect, useState } from 'react';
import StarRatings from '../../shared/components/StarRatings';

interface IOrderReturnProductCardProps {
  productObj: _CartItem;
  actionType: string | null;
  checkedCheckBox: any;
  setCheckedCheckBox: React.Dispatch<React.SetStateAction<_CartItem[] | []>>;
  cartIdQty: ICartIdQty[] | [];
  setCartIdQty: React.Dispatch<SetStateAction<ICartIdQty[] | []>>;
}

const OrderReturnProdutCard: React.FC<IOrderReturnProductCardProps> = ({
  productObj,
  actionType,
  checkedCheckBox,
  setCheckedCheckBox,
  cartIdQty,
  setCartIdQty,
}) => {
  const [quantity, setQuantity] = useState(productObj.totalQty);
  useEffect(() => {
    setCartIdQty((prevCartItem) => {
      const itemIndex = prevCartItem.findIndex(
        (item) => item.cartId === productObj.shoppingCartItemsId,
      );
      const updatedItems = [...prevCartItem];
      if (itemIndex !== -1) {
        updatedItems[itemIndex] = { ...updatedItems[itemIndex], qty: quantity };
      } else {
        updatedItems.push({
          cartId: productObj.shoppingCartItemsId,
          qty: quantity,
        });
      }

      return updatedItems;
    });
  }, [quantity]);

  return (
    <div className='grid grid-cols-12 gap-6 lg:p-[30px] p-[15px]'>
      <div className='col-span-12 md:col-span-3'>
        <div className='flex justify-center items-center'>
          <div className='mr-[10px]'>
            {(productObj.status == 'Delivered' ||
              (productObj.status !== 'Cancelled' &&
                actionType == 'cancelled')) && (
              <CheckBox
                type={'checkbox'}
                name='cancelAllProduct'
                checked={
                  checkedCheckBox.find(
                    (elem: _CartItem) =>
                      elem.shoppingCartItemsId ===
                      productObj.shoppingCartItemsId,
                  )
                    ? true
                    : false
                }
                onChange={(e: any) => {
                  if (e.target.checked) {
                    setCheckedCheckBox([...checkedCheckBox, productObj]);
                  } else {
                    setCheckedCheckBox(
                      checkedCheckBox?.filter(
                        (elem: _CartItem) =>
                          elem.shoppingCartItemsId !==
                          productObj.shoppingCartItemsId,
                      )!,
                    );
                  }
                }}
              />
            )}
          </div>
          <div className='rounded-sm overflow-hidden'>
            <CustomLink href='product-page.html'>
              <Image alt='product' src={productObj.colorImage} />
            </CustomLink>
          </div>
        </div>
      </div>
      <div className='col-span-12 md:col-span-9'>
        <div className='flex flex-wrap w-full'>
          <div className='w-full text-medium-text !font-bold mb-[10px] flex justify-between items-center'>
            <CustomLink href={`${productObj.seName}.html`}>
              {productObj.productName}
            </CustomLink>
            <span>Total: ${productObj.totalPrice.toFixed(2)}</span>
          </div>
          <div className='w-full md:flex'>
            <div className='w-full md:w-5/12'>
              <div className='text-default-text mb-[10px]'>
                {productObj.customFields.find(
                  (item: any) => item.label == 'GENUS SPECIES NAME',
                )?.value ?? ''}
              </div>

              <div className='flex items-center gap-x-[10px] md:mb-[20px] mb-[10px]'>
                <div className='flex items-center gap-0 text-[#FFC557] order-2 sm:order-1'>
                  <StarRatings
                    rating={+productObj.productRatingAverage!}
                    textsize='text-[25px]'
                  />
                </div>
                <div className='sm:justify-center text-extra-small-text flex order-1 sm:order-2'>
                  {productObj.productRatingAverage}
                </div>
                <div className='sm:justify-center text-extra-small-text flex order-1 sm:order-2'>
                  <CustomLink
                    href={`${paths.productReview}/${productObj.productId}`}
                    title=''
                    className='underline hover:no-underline'
                  >
                    {productObj.productReviewsCount} reviews
                  </CustomLink>
                </div>
              </div>
              <div className='mb-[10px] flex items-center'>
                <span className='text-small-text !font-[600] mr-[5px]'>
                  Qty:
                </span>{' '}
                {productObj.status == 'Delivered' ||
                (productObj.status !== 'Cancelled' &&
                  actionType == 'cancelled') ? (
                  <div className='text-small-text w-1/4 text-center flex justify-center items-center'>
                    <div className='flex items-center border border-primary rounded-xs h-[50px] max-w-[100px]'>
                      <button
                        type='button'
                        className='inline-block w-3/12 text-center font-bold'
                        onClick={() => {
                          if (quantity == 1) {
                            alert('Cannot set less than 1');
                          } else {
                            return setQuantity((prevQty) => prevQty - 1);
                          }
                        }}
                      >
                        -
                      </button>
                      <div className='w-6/12 text-center font-bold'>
                        <input
                          className='w-full text-center focus:outline-none bg-transparent'
                          type='number'
                          value={quantity}
                          min={0}
                        />
                      </div>
                      <button
                        type='button'
                        className='inline-block w-3/12 text-center font-bold'
                        onClick={() => {
                          if (quantity == productObj.totalQty) {
                            alert('Cannot set more than total quantity');
                          } else {
                            setQuantity((prevQty) => prevQty + 1);
                          }
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ) : (
                  <input
                    className='text-default-text font-[700]'
                    type='number'
                    value={quantity}
                  />
                )}
              </div>
              <div className='text-default-text mb-[10px]'>
                <span className='text-small-text !font-[600]'>Price:</span>{' '}
                <span className='text-default-text font-[700]'>
                  ${productObj.price.toFixed(2)}
                </span>
              </div>
            </div>
            <div className='w-full md:w-4/12'>
              <div className='md:mb-[20px] mb-[10px]'>
                <div className='text-small-text mb-[10px] !font-[600]'>
                  Status:
                </div>
                <div className={statusBarCssController(productObj.status!)}>
                  {productObj.status}
                </div>
              </div>

              <div className='mb-[10px]'>
                <div className='text-small-text mb-[10px] !font-[600]'>
                  Est. Shipping:
                </div>
                <div className='text-default-text font-[700]'>
                  {productObj?.estimateShippingDate
                    ? dayjs(productObj?.estimateShippingDate).format(
                        'MMMM D, YYYY',
                      )
                    : 'Will update you later'}
                </div>
              </div>
            </div>
            <div className='w-full md:w-3/12'>
              <div className='mb-[20px] hidden md:block'>
                <div className='text-small-text mb-[10px] !font-[600]'>
                  &nbsp;
                </div>
                <div className='w-auto inline-block px-[15px] py-[5px] rounded-[5px] text-default-text font-[600]'>
                  &nbsp;
                </div>
              </div>
              <div className='mb-[10px]'>
                <div className='text-small-text mb-[10px] !font-[600]'>
                  Est. Delivery:
                </div>
                <div className='text-default-text font-[700]'>
                  {productObj?.estimateDeliveryDate
                    ? dayjs(productObj.estimateDeliveryDate).format(
                        'MMMM D, YYYY',
                      )
                    : 'Will update you later'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderReturnProdutCard;
