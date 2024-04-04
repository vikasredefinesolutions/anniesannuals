'use client';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import { SubCategoryList } from '@/types/header';
import { paths } from '@/utils/paths.constant';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Banner from '../../widgets/header/components/Banner';

const Usdazones: React.FC<{
  headerSubMenu: any;
}> = ({ headerSubMenu }) => {
  const [zipcode, setZipcode] = useState('');
  const [error, setError] = useState('');
  const [growingZone, setGrowingZone] = useState<{
    zone: string;
    temperature: string;
  }>({ zone: '', temperature: '' });
  const dispatch = useDispatch();
  const handleFindGrowingZone = async () => {
    if (!zipcode) return setError('Please enter zipcode');
    try {
      const response = await fetch(`https://phzmapi.org/${zipcode}.json`);
      const parsedData = await response.json();
      setGrowingZone({
        temperature: parsedData?.temperature_range,
        zone: parsedData?.zone,
      });
    } catch (error: any) {
      const errMsg = Object.keys(error).length
        ? error[Object.keys(error)[0]]
        : 'Something went wrong';
      return dispatch(
        openAlertModal({
          title: 'Error',
          description: errMsg,
          isAlertModalOpen: true,
        }),
      );
    }
  };

  return (
    <>
      <Banner
        seName={'find-your-usda-zone' as unknown as keyof SubCategoryList}
        headerSubMenu={headerSubMenu}
        bannerData={{
          banner: 'assets/images/product-listing-banner-new-1.png',
          description: `The USDA Plant Hardiness Zone Map divides the United States
          into 13 zones based on average winter temperatures. Ranging
          from Zone 1 (coldest) to Zone 13 (warmest), it helps gardeners
          choose plants suitable for their region. However, it solely
          considers winter cold and doesn't account for factors like
          summer heat, humidity, soil type, or precipitation. The map is
          a valuable resource for outdoor plant selection, with each
          zone representing a 10°F difference in minimum winter
          temperatures.`,
          name: 'Find your USDA Zone',
        }}
        staticImage={true}
      />
      <section className='bg-tertiary'>
        <div className='container mx-auto relative'>
          <div className='py-[20px]'>
            <div className=''>
              <ul className='flex flex-wrap items-center gap-[10px] text-[14px] font-semibold font-sub'>
                <li className=''>
                  <CustomLink href={paths.home} className='text-anchor'>
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
                      />
                    </svg>
                  </CustomLink>
                </li>
                <li className=''>/</li>
                <li className=''> Find your USDA Zone </li>
              </ul>
            </div>
          </div>
          <div className='flex flex-wrap mx-[-15px]'>
            <div className='w-full px-[15px]'>
              <div className='text-title-text mb-[20px] font-bold font-sub text-center'>
                Enter Your Zip Code to Find Your Growing Zone:
              </div>
              <div className='max-w-sm mx-auto mb-[30px] lg:mb-[60px]'>
                <div className='flex items-center'>
                  <input
                    id='ZipCode'
                    name='ZipCode'
                    placeholder='Zip Code'
                    className='form-input mr-[10px]'
                    value={zipcode}
                    onChange={(e) => {
                      setZipcode(e.target.value);
                      setError('');
                    }}
                  />
                  <button
                    onClick={() => handleFindGrowingZone()}
                    className='flex-shrink-0 text-[14px] bg-quaternary text-white font-bold font-sub rounded-bl-default rounded-tr-default px-[20px] py-[15px]'
                  >
                    Save
                  </button>
                </div>
                {error && <p className='text-red-500 mt-1'>{error}</p>}
              </div>

              {growingZone.zone && (
                <div
                  className='max-w-2xl mx-auto flex flex-col justify-center items-center w-full rounded-bl-default rounded-tr-default px-[20px] py-[15px] mb-[30px]'
                  style={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}
                >
                  <div className='w-full mx-auto relative'>
                    <div className='font-sub text-sub-text font-semibold pb-[10px]'>
                      Your Growing Zone
                    </div>
                    <div className='w-[100px] rounded-xs border border-primary mb-[10px]'>
                      <div className='flex items-center py-[7px] px-[18px]'>
                        <div className='text-extra-small-text'>ZONE:</div>
                        <div className='text-normal-text font-semibold'>
                          {growingZone.zone}
                        </div>
                      </div>
                    </div>
                    <div className='text-small-text font-sub mb-[10px]'>
                      Low Temp Range: {growingZone.temperature}
                    </div>
                    <a
                      href={`zone/${growingZone.zone}${paths.plantFinder}`}
                      className='text-small-text font-sub underline hover:no-underline cursor-pointer'
                    >
                      Shop Your Zone Here!
                    </a>
                  </div>
                </div>
              )}

              <div className='mb-[40px] panel-01 tab-content'>
                <div className='max-w-max md:max-w-6xl mx-auto p-[15px] lg:p-[30px] drop-shadow-md rounded-sm bg-[#FCFFF5] mb-[20px]'>
                  <Image isStatic src='assets/images/map.png' alt='' />
                </div>
                <div className='max-w-max md:max-w-6xl mx-auto mb-[20px]'>
                  <div className='max-w-md p-[15px] lg:p-[30px] drop-shadow-md rounded-sm bg-[#FCFFF5] '>
                    <Image isStatic src='assets/images/map-list.png' alt='' />
                  </div>
                </div>
                <div className='max-w-max md:max-w-6xl mx-auto mb-[20px]'>
                  <div className='text-normal-text'>
                    <p className='text-normal-text font-semibold mb-[20px]'>
                      The USDA Plant Hardiness Zone Map is used by gardeners and
                      growers to determine which plants are most likely to
                      thrive at a given location. The map is based on the
                      average annual minimum winter temperature, divided into
                      10-degree F zones.
                    </p>
                    <p className='text-normal-text'>
                      For more detailed maps and information visit the{' '}
                      <a
                        href='https://planthardiness.ars.usda.gov/'
                        target='_blank'
                        className='font-[600] text-primary underline hover:no-underline'
                        title='USDA Hardiness Zone site.'
                      >
                        USDA Hardiness Zone site.
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Usdazones;
