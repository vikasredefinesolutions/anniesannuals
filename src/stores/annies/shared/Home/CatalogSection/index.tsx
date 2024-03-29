import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import { paths } from '@/utils/paths.constant';

const DigitalCatalog = () => {
  return (
    <section
      className='relative pt-[30px] bg-[#F1FFED] bg-top bg-cover bg-no-repeat overflow-x-hidden 2xl:overflow-x-visible'
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_REDEFINE_MEDIA}/annies/1/store/5/images/digital-catalog-floral.png)`,
      }}
    >
      <div className='container px-4 mx-auto'>
        <div className='flex flex-wrap items-center -mx-4'>
          <div className='w-full lg:text-left text-center px-4 mb-4 md:mb-0 lg:w-1/2 order-2 lg:order-2'>
            <div className='text-content'>
              <div className='text-[18px] sm:text-[24px] lg:text-[36px] text-anchor font-bold mb-4 font-sub'>
                Check Out Our Digital Catalog
              </div>
              <div className='flex flex-wrap lg:justify-start justify-center gap-4 pt-[30px]'>
                <div className='mb-[10px] w-full max-w-[300px] lg:max-w-[220px] xl:max-w-[260px]'>
                  <CustomLink
                    href={paths.orderFreeCatalog}
                    className='btn btn-primary w-full text-center font-semibold !text-[18px] lg:!text-[16px] xl:!text-[18px]'
                  >
                    Order Free Catalog
                  </CustomLink>
                </div>
                <div className='mb-[10px] w-full max-w-[300px] lg:max-w-[220px] xl:max-w-[260px]'>
                  <CustomLink
                    href={`${process.env.NEXT_PUBLIC_MAIN_DOMAIN}assets/images/pdf/2024-spring-catalog.pdf`}
                    target='_blank'
                    className='btn btn-secondary w-full text-center font-semibold !text-[18px] lg:!text-[16px] xl:!text-[18px]'
                  >
                    Browse Digital Catalog
                  </CustomLink>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full px-4 lg:w-1/2 pb-5 lg:pb-0 order-1 lg:order-1'>
            <div className='text-left relative'>
              <CustomLink
                href={`${process.env.NEXT_PUBLIC_MAIN_DOMAIN}assets/images/pdf/2024-spring-catalog.pdf`}
                target='_blank'
                className=''
              >
                <Image
                  className='relative md:px-0 mx-auto object-cover alttitle img-editable'
                  src='/annies/1/store/5/images/digital-catalog-bottom_638375411549900658.png'
                  alt='Digital-catelog'
                />
              </CustomLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalCatalog;
