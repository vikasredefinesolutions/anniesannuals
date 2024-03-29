// @ts-nocheck
import { parse } from 'node-html-parser';
import { updateSetProperties } from './components/home.helper.jsx';

const HomeController = ({ pageData }: any) => {
  const loadBackgroundDefault = (element: any) => {
    if (element.selectedVal != undefined) {
      if (Object.keys(element.selectedVal).length > 0) {
        const bgPropertyName = 'bg';
        let attributes: any;
        Object.entries(element.selectedVal).map(([key, value]) => {
          if (key == bgPropertyName) {
            attributes = value;
          }
        });
        if (attributes != undefined && Object.keys(attributes).length > 0) {
          if (attributes.type == 'color') {
            return attributes.value;
          } else if (attributes.type == 'image') {
            return "url('" + attributes.value + "')";
          }
        }
      }
    }
    return 'none';
  };

  const loadBackgroundType = (element: any) => {
    if (element.selectedVal != undefined) {
      if (Object.keys(element.selectedVal).length > 0) {
        const bgPropertyName = 'bg';
        let attributes: any;
        Object.entries(element.selectedVal).map(([key, value]) => {
          if (key == bgPropertyName) {
            attributes = value;
          }
        });

        if (attributes != undefined && Object.keys(attributes).length > 0) {
          return attributes.type;
        }
      }
    }
    return '';
  };

  const loadBackgroundDefaultStyle = (element: any) => {
    if (element.selectedVal != undefined) {
      if (Object.keys(element.selectedVal).length > 0) {
        const bgPropertyName = 'bg';

        let attributes: any;
        Object.entries(element.selectedVal).map(([key, value]) => {
          if (key == bgPropertyName + '_bg_style') {
            attributes = value;
          }
        });

        if (attributes != undefined && Object.keys(attributes).length > 0) {
          if (attributes.value !== 'fullbg') {
            return 'inner';
          }
        }
      }
    }
    return 'outer';
  };

  const checkFixedBG = (element: any) => {
    if (element.selectedVal != undefined) {
      if (Object.keys(element.selectedVal).length > 0) {
        const bgPropertyName = Object.keys(element.properties).find(
          (key) => key === 'bg',
        );

        let attributes: any;
        let fixedBg: any;
        Object.entries(element.selectedVal).map(([key, value]) => {
          if (key == bgPropertyName) {
            attributes = value;
          }
          if (key == bgPropertyName + '_fixed_bg') {
            fixedBg = value;
          }
        });

        if (attributes != undefined && Object.keys(attributes).length > 0) {
          if (attributes.type == 'image') {
            if (fixedBg && fixedBg.value) {
              return true;
            }
          }
        }
      }
    }
    return false;
  };

  const loadBackgroundImageClass = (element: any) => {
    if (element.selectedVal != undefined) {
      if (Object.keys(element.selectedVal).length > 0) {
        const bgPropertyName = 'bg';

        let attributes: any;
        Object.entries(element.selectedVal).map(([key, value]) => {
          if (key == bgPropertyName) {
            attributes = value;
          }
        });

        let bgType = '';

        if (attributes != undefined && Object.keys(attributes).length > 0) {
          if (attributes.type == 'image') {
            bgType = 'image';
          }
        }
        if (bgType === 'image') {
          let imageClass = '';

          if ('bg_bg_image_style' in element.selectedVal) {
            imageClass += ' ' + element.selectedVal.bg_bg_image_style.value;
          }
          if ('bg_bg_image_position' in element.selectedVal) {
            imageClass += ' ' + element.selectedVal.bg_bg_image_position.value;
          }
          return imageClass;
        }
      }
    }
    return '';
  };

  let cont = 0;
  return pageData?.components &&
    pageData?.components.filter(
      (component: any) => component.visibility !== 'off',
    ).length > 0
    ? pageData.components
        .filter((component: any) => component.visibility !== 'off')
        .map((componentValue: any, index: number) => {
          /* Code for hidden component */
          if (typeof componentValue.selectedVal == 'string') {
            componentValue.selectedVal = JSON.parse(componentValue.selectedVal);
          }
          if (typeof componentValue.properties == 'string') {
            componentValue.properties = JSON.parse(componentValue.properties);
          }

          const backgroundDefault = loadBackgroundDefault(componentValue);
          const backgroundStyle = loadBackgroundDefaultStyle(componentValue);
          const backgroundImageClass = loadBackgroundImageClass(componentValue);
          const fixedBgDisplay = checkFixedBG(componentValue);
          let additionalclass = '';
          let additionalclass1 = '';
          let innerDivClass = '';
          let isImageCentered = false;
          if (
            componentValue.selectedVal &&
            'additionalclass' in componentValue.selectedVal
          ) {
            additionalclass1 = componentValue.selectedVal.additionalclass.value;
          }
          if (
            componentValue.selectedVal &&
            'container' in componentValue.selectedVal
          ) {
            if (componentValue.selectedVal.container.value == 'w-full') {
              isImageCentered = true;
              additionalclass += ' container-fluid';
            } else {
              isImageCentered = true;
              additionalclass +=
                ' ' + componentValue.selectedVal.container.value + ' mx-auto ';
            }
          } else {
            // additionalclass += ' container mx-auto ';
          }
          if (
            componentValue.selectedVal &&
            'container_left_padding' in componentValue.selectedVal
          ) {
            innerDivClass +=
              ' ' + componentValue.selectedVal.container_left_padding.value;
          }
          if (
            componentValue.selectedVal &&
            'container_top_padding' in componentValue.selectedVal
          ) {
            innerDivClass +=
              ' ' + componentValue.selectedVal.container_top_padding.value;
          }
          if (
            componentValue.selectedVal &&
            'container_right_padding' in componentValue.selectedVal
          ) {
            innerDivClass +=
              ' ' + componentValue.selectedVal.container_right_padding.value;
          }
          if (
            componentValue.selectedVal &&
            'container_bottom_padding' in componentValue.selectedVal
          ) {
            innerDivClass +=
              ' ' + componentValue.selectedVal.container_bottom_padding.value;
          }
          if (
            componentValue.selectedVal &&
            'container_left_margin' in componentValue.selectedVal
          ) {
            innerDivClass +=
              ' ' + componentValue.selectedVal.container_left_margin.value;
          }
          if (
            componentValue.selectedVal &&
            'container_top_margin' in componentValue.selectedVal
          ) {
            innerDivClass +=
              ' ' + componentValue.selectedVal.container_top_margin.value;
          }
          if (
            componentValue.selectedVal &&
            'container_right_margin' in componentValue.selectedVal
          ) {
            innerDivClass +=
              ' ' + componentValue.selectedVal.container_right_margin.value;
          }
          if (
            componentValue.selectedVal &&
            'container_bottom_margin' in componentValue.selectedVal
          ) {
            innerDivClass +=
              ' ' + componentValue.selectedVal.container_bottom_margin.value;
          }

          let componentName = 'div' + componentValue.no;
          if (
            componentValue.selectedVal &&
            'componentname' in componentValue.selectedVal
          ) {
            componentName = componentValue.selectedVal.componentname.value;
          }

          const attributes = {
            node1: {
              className: `w-full mx-auto ${
                componentValue.visibility == 'off' ? 'hidden' : ''
              } ${
                backgroundStyle === 'outer' ? backgroundImageClass : ''
              }  ${additionalclass1}`,
              stylev2:
                loadBackgroundType(componentValue) == 'image'
                  ? `background-image: ${
                      backgroundStyle === 'outer' ? backgroundDefault : 'none'
                    }; ,
              background-attachment: ${
                backgroundStyle === 'outer'
                  ? fixedBgDisplay
                    ? 'fixed'
                    : 'inherit'
                  : 'inherit'
              }`
                  : `background: ${
                      backgroundStyle === 'outer' ? backgroundDefault : 'none'
                    }`,
              style:
                loadBackgroundType(componentValue) === 'image'
                  ? {
                      backgroundImage:
                        backgroundStyle === 'outer'
                          ? backgroundDefault
                          : 'none',
                      backgroundAttachment:
                        backgroundStyle === 'outer'
                          ? fixedBgDisplay
                            ? 'fixed'
                            : 'inherit'
                          : 'inherit',
                    }
                  : {
                      background:
                        backgroundStyle === 'outer'
                          ? backgroundDefault
                          : 'none',
                    },
              name: componentName,
              id: `div${componentValue.no}`,
            },
            node2: {
              isImageCentered,
              className: additionalclass,
            },
            node3: {
              className: `${innerDivClass} ${
                backgroundStyle === 'inner' ? backgroundImageClass : ''
              }`,
              stylev2:
                loadBackgroundType(componentValue) == 'image'
                  ? `background-image: ${
                      backgroundStyle === 'inner' ? backgroundDefault : 'none'
                    }; ,
              background-attachment: ${
                backgroundStyle === 'inner'
                  ? fixedBgDisplay
                    ? 'fixed'
                    : 'inherit'
                  : 'inherit'
              }`
                  : `background: ${
                      backgroundStyle === 'inner' ? backgroundDefault : 'none'
                    }`,
              style:
                loadBackgroundType(componentValue) == 'image'
                  ? {
                      backgroundImage:
                        backgroundStyle === 'inner'
                          ? backgroundDefault
                          : 'none',
                      backgroundAttachment:
                        backgroundStyle === 'inner'
                          ? fixedBgDisplay
                            ? 'fixed'
                            : 'inherit'
                          : 'inherit',
                    }
                  : {
                      background:
                        backgroundStyle === 'inner'
                          ? backgroundDefault
                          : 'none',
                    },
            },
          };

          if (Object.keys(componentValue.properties).includes('socialshare')) {
            return { type: 1, data: { mediaURL: 'storeLogo' }, attributes };
          } else if (
            Object.keys(componentValue.selectedVal).includes('featuredproducts')
          ) {
            return {
              type: 2,
              data: {
                dataArr: componentValue.selectedVal,
                featuredItems: pageData.featuredItems[cont++],
              },
              attributes,
            };
          } else if (
            Object.keys(componentValue.selectedVal).includes('carousel')
          ) {
            return {
              type: 3,
              data: {
                bannerArr: componentValue.selectedVal.carousel.value,
              },
              attributes,
            };
          } else if (
            Object.keys(componentValue.selectedVal).includes('FullAccordion')
          ) {
            componentValue.selectedVal.FullAccordion.value =
              componentValue.selectedVal.FullAccordion.value.map(
                (accordion: any, index: number) => {
                  return {
                    ...accordion,
                    openstatus: index === 0 ? 'Yes' : 'No',
                  };
                },
              );
            let fHTML: HTMLElement | null = null;
            if (componentValue?.selectedVal?.Title?.value) {
              const html = `<div id="${attributes.node1.id}"><div class='text-box-h2 mb-4' id='Title'>${componentValue?.selectedVal?.Title.value}</div></div>`;
              fHTML = parse(`${html}`) as unknown as HTMLElement;
              updateSetProperties(componentValue, fHTML);
            }

            return {
              type: 4,
              data: componentValue?.selectedVal,
              attributes,
              title: `${fHTML}`,
            };
          } else if (
            Object.keys(componentValue.selectedVal).includes('slickslider')
          ) {
            return {
              type: 3,
              data: {
                bannerArr: componentValue.selectedVal.slickslider.value,
              },
              attributes,
            };
          } else if (
            Object.keys(componentValue.properties).includes('BrandsAtoZ')
          ) {
            return {
              type: 6,
              data: {},
              attributes,
            };
          } else if (
            Object.keys(componentValue.properties).includes('brandtabbing')
          ) {
            return {
              type: 7,
              data: {
                componentValue: componentValue,
              },
              attributes,
            };
          } else if (
            Object.keys(componentValue.properties).includes('dynamicform')
          ) {
            attributes.node2.className = attributes.node2.className.replace(
              'container-fluid',
              '',
            );
            return {
              type: 8,
              data: {
                componentValue: componentValue,
              },
              attributes,
            };
          } else if (
            Object.keys(componentValue.properties).includes('lightboxgallery')
          ) {
            return {
              type: 9,
              data: componentValue.selectedVal,
              attributes,
            };
          } else if (
            Object.keys(componentValue.properties).includes('scrolllogos')
          ) {
            return {
              type: 10,
              data: componentValue.selectedVal,
              attributes,
            };
          } else if (
            Object.keys(componentValue.properties).includes('RightButtonLink')
          ) {
            return {
              type: 11,
              data: componentValue.selectedVal,
              attributes,
            };
          } else if (
            componentValue?.html?.includes('multi_carousel_component')
          ) {
            return {
              type: 12,
              data: componentValue.selectedVal,
              attributes,
              name: componentValue?.name,
            };
          } else if (componentValue?.html.includes('new_crops')) {
            return {
              type: 13,
              data: componentValue.selectedVal,
              attributes,
            };
          } else if (componentValue?.html.includes('get_my_zone')) {
            return {
              type: 14,
              data: componentValue.selectedVal,
              attributes,
            };
          } else if (
            Object.keys(componentValue.properties).includes('PlainText')
          ) {
            const html = `<div style="${attributes.node1.stylev2}" class="${attributes.node1.className}" name="${attributes.node1.name}" id="${attributes.node1.id}"><section class="${attributes.node2.className}"><div style="${attributes.node3.stylev2}" class="${attributes.node3.className}">${componentValue.selectedVal?.PlainText?.value}</div></section></div>`;
            let root = parse(`${html.replace('Headeline', 'Headline')}`);

            updateSetProperties(componentValue, root);
            return `${root}`;
          } else {
            const html = `<div style="${attributes.node1.stylev2}" class="${attributes.node1.className}" name="${attributes.node1.name}" id="${attributes.node1.id}"><section class="${attributes.node2.className}"><div style="${attributes.node3.stylev2}" class="${attributes.node3.className}">
            <div class="${componentValue.uuid}">
            ${componentValue.html}
            </div>
            </div></section></div>`;
            const finalHtml = html
              .replace(
                '"https://pkheadlessstorage.blob.core.windows.net/storagemedia/1/store/gray-500-horizontal.png"',
                '""',
              )
              .replace(
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque massa nibh, pulvinar vitae aliquet nec, accumsan aliquet orci.',
                '',
              )
              .replace(
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
                '',
              )
              .replace(
                's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                '',
              )
              .replace('Headeline', 'Headline');
            let root = parse(`${html}`);
            updateSetProperties(componentValue, root);
            return `${root}`;
          }
        })
    : [];
};

export default HomeController;
