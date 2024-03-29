'use client';
import { useAppSelector } from '@/app/redux/hooks';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import AddShippingZipcode from '@/stores/annies/widgets/header/components/AddShippingZipcode';
import { paths } from '@/utils/paths.constant';
import useModel from '../../hooks/use-model';

const ZoneSelector = () => {
  const {
    isOpen: isShippingModalOpen,
    openModel: openShippingModal,
    onRequestClose: closeShippingModal,
  } = useModel(false);

  const { growingZone } = useAppSelector((state) => state.common);
  const { zipCode, zoneName, zoneImageUrl } = useAppSelector(
    (state) => state.common.growingZone,
  );

  return (
    <>
      <div
        className='relative pt-[30px] pb-[30px] '
        style={{
          backgroundColor: ' rgba(105, 77, 132, 1)',
          backgroundImage: `url(${process.env.NEXT_PUBLIC_REDEFINE_MEDIA}/annies/1/store/5/images/shop-by-plant-attribute-floral.png)`,
        }}
      >
        <div className='container mx-auto'>
          <div
            className='max-w-full md:max-w-6xl mx-auto overflow-hidden rounded-tl-xl rounded-br-xl md:flex h-full relative justify-center items-end '
            style={{ backgroundColor: 'rgba(254, 249, 216, 0.8)' }}
          >
            <div className='w-full lg:w-1/2 py-[30px] px-[60px] h-full text-left lg:group'>
              <div className='mx-auto' style={{ paddingLeft: '60px' }}>
                <h2 className='font-sub text-sub-text font-semibold pb-[20px]'>
                  Plant Finder
                </h2>
                <div className='text-extra-small-text font-sub pb-[20px]'>
                  Find the <h2 className='inline'>perfect nursery</h2> plants
                  for your <h2 className='inline'>garden by zone</h2>, sun
                  exposure, height, color, and more!
                </div>
                <CustomLink
                  href={
                    zoneName
                      ? `zone/${zoneName}${paths.plantFinder}`
                      : `${paths.plantFinder}`
                  }
                  className='btn btn-primary btn-xs !font-sub uppercase'
                >
                  SHOP MY ZONE
                </CustomLink>
              </div>
            </div>
            <div
              className='w-full lg:w-1/2 py-[30px] px-[60px] text-left rounded-br-xl group relative'
              style={{ backgroundColor: 'rgba(254, 249, 216, 1)' }}
            >
              <div className='flex justify-between'>
                <div
                  className='w-full relative mx-auto'
                  style={{ paddingLeft: '60px' }}
                >
                  <div className='font-sub text-sub-text font-semibold pb-[10px]'>
                    Your Garden Zone is
                  </div>
                  <div className='w-[120px] rounded-xs border border-primary mb-[10px]'>
                    <div className='flex items-center py-[7px] px-[14px]'>
                      <div className='text-extra-small-text'>ZONE : </div>
                      <div className='text-normal-text font-semibold ml-2'>
                        {!!zoneName && zoneName.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  {growingZone.zipCode && (
                    <div className='text-small-text font-sub mb-[10px]'>
                      {growingZone.cityName}, {growingZone.stateName}{' '}
                      {/* {growingZone.stateName.substring(0, 2).toUpperCase()}{' '} */}
                      {zipCode}
                    </div>
                  )}
                  <button
                    onClick={openShippingModal}
                    className='text-small-text font-sub underline font-bold'
                  >
                    Change My Zone
                  </button>
                </div>
                <div className='w-full hidden md:block'>
                  {growingZone.zipCode ? (
                    <Image src={zoneImageUrl} alt='map' />
                  ) : (
                    <Image
                      src='/annies/1/store/5/images/map-home.png'
                      alt='map'
                    />
                  )}
                </div>
              </div>
            </div>
            <span className='absolute bottom-0 hidden md:block'>
              <Image src='/annies/1/store/5/images/zone-img.png' alt='zone' />
            </span>
          </div>
        </div>
      </div>
      {isShippingModalOpen && (
        <AddShippingZipcode closeModal={closeShippingModal} />
      )}
    </>
  );
};

export default ZoneSelector;
