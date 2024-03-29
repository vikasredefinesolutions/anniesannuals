import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { setGrowingZone } from '@/app/redux/slices/commonSlice';
import Loader from '@/shared/Components/Loader';
import { fetchGrowingZone } from '@/shared/apis/common/common';
import { GROWING_ZONE } from '@/shared/utils/cookie.helper';
import storeDetails from '@/staticData/storeDetails.json';
import { paths } from '@/utils/paths.constant';
import { setCookie } from 'cookies-next';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

interface IProps {
  closeModal: () => void;
  page?: string;
}

const AddShippingZipcode: React.FC<IProps> = ({ closeModal, page }) => {
  const [zipcode, setZipcode] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const ignoreZoneQueryParams = useSearchParams().get('ignorezone');
  const pathName = usePathname();
  const router = useRouter();
  const { isLoading } = useAppSelector((state) => state.common);
  const storeId = storeDetails.storeId;
  const handleAddZipcode = async () => {
    if (!zipcode) return setError('Please enter zipcode');
    // dispatch(showLoader(true));
    const growingZone = await fetchGrowingZone(zipcode, storeId);
    if (growingZone && growingZone.length > 0) {
      const growingZoneData = growingZone[0];
      setCookie(
        GROWING_ZONE,
        JSON.stringify({ ...growingZoneData, zipCode: zipcode }),
      );
      dispatch(setGrowingZone({ ...growingZoneData, zipCode: zipcode }));
      // dispatch(showLoader(false));

      closeModal();
      if (page === paths.checkout) {
        router.push(paths.cart);
      }
      if (page !== paths.checkout) {
        let queryParams = '';

        if (ignoreZoneQueryParams) {
          queryParams = '?ignorezone=false';
        }

        window.location.replace(pathName + queryParams);
      }

      return;
    }
    // dispatch(showLoader(false));
    return setError('Zone not found, Please enter valid zipcode.');
  };

  return (
    <div
      id='ShiptoZipModal'
      aria-hidden='true'
      className='overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center h-modal inset-0 text-default-text'
    >
      {isLoading && <Loader />}
      <div className='w-full h-full bg-[#000000] bg-opacity-[0.50] flex items-center justify-center'>
        <div className='relative px-[16px] w-full max-w-3xl h-auto'>
          <div className='relative bg-[#FCEDFF] shadow max-h-screen overflow-y-auto h-full rounded-sm overflow-hidden'>
            <div className='flex justify-between items-start p-[25px] rounded-t border-b sticky top-0 left-0 bg-[#FCEDFF]'>
              <div className='font-[600] text-large-text'></div>
              <div className='flex items-center gap-x-2'>
                <button
                  onClick={closeModal}
                  type='button'
                  className='text-[#ffffff] bg-[#295B4C] hover:bg-[#8a2c9b] hover:text-[#ffffff] rounded-lg text-[14px] p-[6px] ml-auto inline-flex items-center'
                  data-modal-toggle='ShiptoZipModal'
                >
                  <svg
                    className='w-[24px] h-[24px]'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clip-rule='evenodd'
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className='p-[25px]'>
              {page === 'checkout' && (
                <div className='font-sub text-center font-bold text-2xl-text mb-[30px]'>
                  You will be redirected to cart Page
                </div>
              )}
              <div className='font-sub text-center font-bold text-2xl-text mb-[30px]'>
                Set your Shipping Zip Code
              </div>
              <div className='text-default-text mb-[30px] text-center max-w-xl mx-auto'>
                The ideal planting season for each growing zone determines how
                orders are shipped. For more precise estimates of when your
                order will arrive, input the zip code of your shipping address.
              </div>
              <div className='max-w-sm mx-auto mb-[30px]'>
                <div className='flex items-center'>
                  <input
                    id='ZipCode'
                    name='ZipCode'
                    placeholder='Zip Code'
                    value={zipcode}
                    onFocus={() => setError('')}
                    onChange={(e) => setZipcode(e.target.value)}
                    onKeyUp={(e) => {
                      if (e.key === 'Enter') handleAddZipcode();
                    }}
                    className='form-input mr-[10px]'
                  />{' '}
                  <button
                    onClick={handleAddZipcode}
                    type='button'
                    className='flex-shrink-0 text-[14px] bg-[#F0AD42] text-white font-bold font-sub rounded-bl-default rounded-tr-default px-[20px] py-[15px]'
                  >
                    Save
                  </button>
                </div>
                {error && <p className='text-red-500 mt-1'>{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddShippingZipcode;
