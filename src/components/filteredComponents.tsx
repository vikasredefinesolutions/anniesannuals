import { VisibleComponents } from '@/types/home';

interface Props {
  visibleComponents: VisibleComponents[];
}

const filteredComponents = ({ visibleComponents }: Props) => {
  const loadBackgroundDefault = (element: any) => {
    const selectedVal = element.selectedVal;
    if (selectedVal && selectedVal.bg && selectedVal.bg.type) {
      const { type, value } = selectedVal.bg;
      if (type === 'color') {
        return value;
      } else if (type === 'image') {
        return `url('${value}')`;
      }
    }
    return 'none';
  };

  const loadBackgroundType = (element: any) => {
    const selectedVal = element.selectedVal;
    if (selectedVal && selectedVal.bg && selectedVal.bg.type) {
      return selectedVal.bg.type;
    }
    return '';
  };

  const loadBackgroundDefaultStyle = (element: any) => {
    if (
      element.selectedVal &&
      element.selectedVal.bg_style &&
      element.selectedVal.bg_style.value !== 'fullbg'
    ) {
      return 'inner';
    }
    return 'outer';
  };

  const checkFixedBG = (element: any): boolean => {
    const selectedVal = element.selectedVal;
    if (
      selectedVal.bg &&
      selectedVal.bg.type === 'image' &&
      selectedVal.bg_fixed_bg &&
      selectedVal.bg_fixed_bg.value
    ) {
      return true;
    }
    return false;
  };

  const loadBackgroundImageClass = (element: any): string => {
    const selectedVal = element.selectedVal;

    if (selectedVal?.bg?.type === 'image') {
      let imageClass = '';
      if (selectedVal?.bg_bg_image_style?.value) {
        imageClass += ` ${selectedVal.bg_bg_image_style.value}`;
      }
      if (selectedVal?.bg_bg_image_position?.value) {
        imageClass += ` ${selectedVal.bg_bg_image_position.value}`;
      }
      return imageClass.trim();
    }

    return '';
  };

  const SetComponentFromKeys = visibleComponents.map(
    (data: VisibleComponents) => {
      let parsedObject = data.properties;
      let parsedSelectedVal = data.selectedVal;

      if (typeof data.properties === 'string') {
        parsedObject = JSON.parse(data.properties);
      }
      if (typeof parsedSelectedVal === 'string') {
        parsedSelectedVal = JSON.parse(parsedSelectedVal);
      }

      if (data.cleanHTMl) {
        return data.cleanHTMl;
      }
      const backgroundDefault = loadBackgroundDefault(data);
      const backgroundStyle = loadBackgroundDefaultStyle(data);
      const backgroundImageClass = loadBackgroundImageClass(data);
      const fixedBgDisplay = checkFixedBG(data);

      let additionalclass = '';
      let additionalclass1 = '';
      let innerDivClass = '';

      if (parsedSelectedVal?.additionalclass) {
        additionalclass1 = parsedSelectedVal.additionalclass.value;
      }

      additionalclass +=
        parsedSelectedVal?.container?.value === 'w-full'
          ? ' container-fluid'
          : ` ${parsedSelectedVal?.container?.value} mx-auto`;

      const containerPaddingProperties = [
        'container_left_padding',
        'container_top_padding',
        'container_right_padding',
        'container_bottom_padding',
        'container_left_margin',
        'container_top_margin',
        'container_right_margin',
        'container_bottom_margin',
      ];
      containerPaddingProperties.forEach((property) => {
        if (parsedSelectedVal?.[property]) {
          innerDivClass += ` ${parsedSelectedVal[property].value}`;
        }
      });
      let componentName = 'div' + data?.id;
      if (parsedSelectedVal?.componentname) {
        componentName = parsedSelectedVal.componentname.value;
      }
      const commonAttributes = {
        className: `w-full mx-auto ${
          backgroundStyle === 'outer' ? backgroundImageClass : ''
        } ${additionalclass1}`,
        style: {
          backgroundImage:
            loadBackgroundType(data) === 'image'
              ? backgroundStyle === 'outer'
                ? backgroundDefault
                : 'none'
              : backgroundStyle === 'outer'
              ? backgroundDefault
              : 'none',
          backgroundAttachment:
            backgroundStyle === 'outer'
              ? fixedBgDisplay
                ? 'fixed'
                : 'inherit'
              : 'inherit',
        },
      };
      const attributes = {
        node1: {
          ...commonAttributes,
          name: componentName,
          id: `div${data?.id}`,
        },
        node2: {
          className: additionalclass,
        },
        node3: {
          className: `${innerDivClass} ${
            backgroundStyle === 'inner' ? backgroundImageClass : ''
          }`,
          style: {
            backgroundImage:
              loadBackgroundType(data) === 'image'
                ? backgroundStyle === 'inner'
                  ? backgroundDefault
                  : 'none'
                : backgroundStyle === 'inner'
                ? backgroundDefault
                : 'none',
            backgroundAttachment:
              backgroundStyle === 'inner'
                ? fixedBgDisplay
                  ? 'fixed'
                  : 'inherit'
                : 'inherit',
          },
        },
      };
      if (data?.html.includes('Banner_Section')) {
        return {
          type: 1,
          data: parsedSelectedVal,
          attributes,
        };
      } else if (Object.keys(parsedSelectedVal).includes('FullAccordion')) {
        return {
          type: 2,
          data: parsedSelectedVal,
          attributes,
        };
      } else if (data?.html.includes('multi_carousel_component')) {
        return {
          type: 3,
          data: parsedSelectedVal,
          name: data?.name,
          attributes,
        };
      } else if (Object.keys(parsedSelectedVal).includes('Description')) {
        return {
          type: 4,
          data: parsedSelectedVal,
          attributes,
        };
      } else if (data?.html.includes('get_my_zone')) {
        return {
          type: 5,
          data: parsedSelectedVal,
          attributes,
        };
      } else if (data?.html.includes('new_crops')) {
        return {
          type: 6,
          data: parsedSelectedVal,
          attributes,
        };
      }
    },
  );
  return SetComponentFromKeys;
};

export default filteredComponents;
