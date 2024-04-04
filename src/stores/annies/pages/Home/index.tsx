// @ts-nocheck
'use client';
import MultiSliderComponent from '@/components/common/Carousel/MultiSliderCarousel';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import ElementAccordionDisplay from '../../../../components/accordian';
import BannerCarousel from '../../../../components/common/Carousel/BannerCarousel';
import NewCrops from '../../shared/Home/Cards/CropCard';
import DigitalCatalog from '../../shared/Home/CatalogSection';
import ZoneSelector from '../../shared/Home/zone-selector';
import HomeController from './homeController';

const ShareIcons = dynamic(() => import('./components/SocialShare/index'));
const FeaturedProducts = dynamic(() => import('./components/FeaturedProducts'));

const ElementFullSlider = dynamic(
  () => import('./components/ElementFullSlider'),
);
const BrandsTabbing = dynamic(() => import('./components/BrandsTabbing'));
const ElementImageGallery = dynamic(
  () => import('./components/ElementImageGallery'),
);
const ElementScrollableLogos = dynamic(
  () => import('./components/ElementScrollableLogos'),
);
const ElementTwoButtons = dynamic(
  () => import('./components/ElementTwoButtons'),
);
const AtoZBrand = dynamic(() => import('./components/AtoZBrand'));
const CalendyCustomForm = dynamic(
  () => import('./components/CalendyCustomForm'),
);

type Home2Props = {
  pageData: any;
  isDigitalCatalogVisible: boolean;
};

const Home2 = ({ pageData, isDigitalCatalogVisible }: Home2Props) => {
  const router = useRouter();
  const html = HomeController({
    pageData: {
      components: pageData.components,
      featuredItems: [pageData.featureProducts] as any,
    },
  });

  const storeLogo = 'WORD TODO';

  // useEffect(() => {
  //   setTimeout(function () {
  //     AOS.init({
  //       disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  //       startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  //       initClassName: 'aos-init', // class applied after initialization
  //       animatedClassName: 'aos-animate', // class applied on animation
  //       useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  //       disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  //       debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  //       throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  //       // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  //       // offset: 120, // offset (in px) from the original trigger point
  //       // delay: 0, // values from 0 to 3000, with step 50ms
  //       duration: 400, // values from 0 to 3000, with step 50ms
  //       easing: 'ease', // default easing for AOS animations
  //       once: false, // whether animation should happen only once - while scrolling down
  //       mirror: true, // whether elements should animate out while scrolling past them
  //       anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger
  //     });
  //     AOS.refresh();
  //   }, 100);
  //   // AOS.init({startEvent: 'overlayLoaded'});
  //   // AOS.refresh();
  // }, []);

  return (
    <div id='allContents'>
      <main>
        {html &&
          html.map((data, compIndex) => {
            let html = <></>;

            if (data.attributes) {
              if (data.type === 1) {
                html = <ShareIcons mediaURL={storeLogo} />;
              } else if (data.type === 2) {
                html = (
                  <FeaturedProducts
                    {...data.data}
                    tabFeaturedPayload={pageData.featuredItems}
                  />
                );
              } else if (data.type === 3) {
                html = (
                  <BannerCarousel
                    {...data?.data}
                    isCentered={data.attributes.node2.isImageCentered}
                  />
                );
              } else if (data.type === 4) {
                const componentValue = data.data;
                html = (
                  <>
                    {/* {data.title !== null && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: data.title,
                        }}
                      />
                    )} */}
                    <ul className='w-full'>
                      <ElementAccordionDisplay
                        accordionValue={componentValue}
                        accordionValueArray={
                          componentValue?.FullAccordion?.value
                        }
                      />
                    </ul>
                  </>
                );
              } else if (data.type === 5) {
                html = <ElementFullSlider {...data.data} />;
              } else if (data.type === 6) {
                html = <AtoZBrand />;
              } else if (data.type === 7) {
                html = <BrandsTabbing {...data.data} />;
              } else if (data.type === 8) {
                html = <CalendyCustomForm {...data.data} />;
              } else if (data.type === 9) {
                html = <ElementImageGallery {...data.data} />;
              } else if (data.type === 10) {
                html = <ElementScrollableLogos {...data.data} />;
              } else if (data.type === 11) {
                html = <ElementTwoButtons {...data.data} />;
              } else if (data.type === 12) {
                html = (
                  <MultiSliderComponent
                    SliderData={data?.data}
                    name={data?.name}
                  />
                );
              } else if (data.type === 13) {
                html = <NewCrops />;
              } else if (data.type === 14) {
                html = <ZoneSelector />;
              }

              return (
                <div key={compIndex} {...data.attributes.node1}>
                  <section {...data.attributes.node2}>
                    <div {...data.attributes.node3}>{html}</div>
                  </section>
                </div>
              );
            }
            return (
              <div
                key={compIndex}
                dangerouslySetInnerHTML={{
                  __html: data,
                }}
              ></div>
            );
          })}
        {isDigitalCatalogVisible && <DigitalCatalog />}
      </main>
    </div>
  );
};
export default Home2;
