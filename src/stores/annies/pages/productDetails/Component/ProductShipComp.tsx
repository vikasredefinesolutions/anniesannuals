import { useAppSelector } from '@/app/redux/hooks';
import PriceLabel from '@/shared/Components/PriceLabel';
import { _ProductDiscountTable } from '@/shared/apis/product/product';
import { IProductDetails } from '@/shared/types/product';
import useModel from '@/stores/annies/shared/hooks/use-model';
import AddShippingZipcode from '@/stores/annies/widgets/header/components/AddShippingZipcode';
import React from 'react';

interface IProps {
  product: IProductDetails | null;
  DiscountPriceTable: _ProductDiscountTable | null;
}

const ProductShipComp: React.FC<IProps> = ({ product, DiscountPriceTable }) => {
  const { growingZone } = useAppSelector((state) => state.common);
  const {
    isOpen: isShippingModalOpen,
    openModel: openShippingModal,
    onRequestClose: closeShippingModal,
  } = useModel(false);

  const PlantInZone = () => {
    let inZone = false;
    product?.filterFacetFields?.map((el) => {
      if (el.name.toLocaleLowerCase() == 'zone') {
        const zone = el.values.find(
          (el) =>
            el.value.toLocaleLowerCase() ==
            growingZone.zoneName.toLocaleLowerCase(),
        );

        if (zone) {
          inZone = true;
        }
      }
    });
    return inZone;
  };
  return (
    <>
      {' '}
      <div className='border border-primary rounded-[5px] items-center flex justify-start p-[20px] mb-[15px]'>
        <div className='w-1/2 mx-auto relative'>
          {growingZone.zoneName && (
            <div className='font-sub text-normal-text font-semibold pb-[10px]'>
              Your Garden Zone is
            </div>
          )}
          {growingZone.zoneName && (
            <div className='text-small-text font-sub mb-[10px]'>
              {growingZone.stateName}, {growingZone.stateCode}{' '}
              {growingZone.zipCode}
            </div>
          )}
          <button
            onClick={openShippingModal}
            className='text-small-text font-sub underline hover:no-underline font-bold'
          >
            {growingZone.zoneName ? 'Change' : 'Add'} My Zone
          </button>
        </div>

        <div className='w-1/2 mb-[10px]'>
          {growingZone.zoneName && (
            <>
              <span className='min-w-[100px] inline-block text-center rounded-xs border border-primary p-[10px] mb-[15px]'>
                <div className='text-sub-text font-semibold'>
                  {growingZone.zoneName}
                </div>
              </span>
              {!PlantInZone() && (
                <div className='text-[#9C331C]'>
                  Plants struggle to flourish in the {growingZone.zoneName}{' '}
                  zone.
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {DiscountPriceTable && (
        <div className='w-full pb-[15px]'>
          <div className='text-small-text font-sub font-bold mb-[10px]'>
            Exclusive Pricing:
          </div>
          <div className='w-full flex space-x-6'>
            <div className='w-1/2 bg-[#F2F2F2] border border-[#B3B3B3] rounded-[5px]'>
              <div className='text-small-text font-sub flex border-b border-b-[#B3B3B3]'>
                <div className='w-1/2 py-[10px] px-[10px]'>Quantity:</div>
                {DiscountPriceTable.subRows.map((el) => (
                  <div
                    className='w-1/2 py-[10px] px-[10px]'
                    key={el.displayQuantity}
                  >
                    {el.displayQuantity}
                  </div>
                ))}
              </div>
              <div className='text-small-text font-sub flex'>
                <div className='w-1/2 py-[10px] px-[10px]'>Price:</div>
                {DiscountPriceTable.subRows.map((el) => (
                  <PriceLabel
                    className='w-1/2 py-[10px] px-[10px]'
                    key={el.discountPrice}
                    price={el.discountPrice}
                  />
                ))}
              </div>
            </div>
            <div className='w-1/2 bg-[#F2F2F2] border border-[#B3B3B3] rounded-[5px] py-[10px] px-[20px] flex items-center justify-center'>
              <div className='text-small-text font-sub font-bold text-center'>
                Fill the box for no additional shipping charges. We ship in
                boxes of 4, 6, 8 or 12 plants.
              </div>
            </div>
          </div>
        </div>
      )}
      {isShippingModalOpen && (
        <AddShippingZipcode closeModal={closeShippingModal} />
      )}
    </>
  );
};

export default ProductShipComp;
