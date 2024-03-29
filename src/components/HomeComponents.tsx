import Accordian from '@/components/accordian';
import BannerCarousel from '@/components/common/Carousel/BannerCarousel';
import MultiSliderComponent from '@/components/common/Carousel/MultiSliderCarousel';
import { activeStoreName } from '@/shared/configs';
import DigitalCatalog from '@/stores/annies/shared/Home/CatalogSection';
import ZoneSelector from '@/stores/annies/shared/Home/zone-selector';
import dynamic from 'next/dynamic';
import AboutUs from './cmsComponents/AboutUs';

const NewCrops = dynamic(
  () => import(`../${activeStoreName}/shared/Home/Cards/CropCard`),
);

interface Props {
  homeComponents: any;
  isDigitalCatalogVisible?: boolean;
}

const HomeComponents = ({ homeComponents, isDigitalCatalogVisible }: Props) => {
  return (
    <div id='AllContents'>
      {homeComponents?.map((data: any, index: number) => {
        let htmlComponent;
        switch (data?.type) {
          case 1:
            htmlComponent = (
              <BannerCarousel
                isCentered
                bannerArr={
                  data?.data?.slickslider?.value || data?.data?.carousel?.value
                }
              />
            );
            break;
          case 2:
            htmlComponent = (
              <Accordian
                accordionValue={data.data}
                accordionValueArray={data?.data?.FullAccordion?.value}
              />
            );
            break;
          case 3:
            htmlComponent = (
              <MultiSliderComponent SliderData={data?.data} name={data?.name} />
            );
            break;
          case 4:
            htmlComponent = <AboutUs data={data?.data?.Description} />;
            break;
          case 5:
            htmlComponent = <ZoneSelector />;
            break;
          case 6:
            htmlComponent = <NewCrops />;
            break;
          default:
            break;
        }
        return (
          <div {...data?.attributes?.node1} key={index}>
            <section {...data?.attributes?.node2}>
              <div {...data?.attributes?.node3}>{htmlComponent}</div>
            </section>
          </div>
        );
      })}
      {isDigitalCatalogVisible && <DigitalCatalog />}
    </div>
  );
};

export default HomeComponents;
