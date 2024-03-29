import { ICustomField, IFilterFacetFields } from '@/shared/types/product';

import React, { ReactElement, useState } from 'react';

interface _DetailsHelpers {
  config: {};
  activeDropDown: boolean;
  setActiveDropDown: (value: boolean) => void;
  informationField?: informationField;
}
interface _Props {
  config: {};
  productData?: {
    productCustomField: Array<ICustomField>;
    producFilterFacetFields: Array<IFilterFacetFields>;
  };
  cases: {
    view: (helpers: _DetailsHelpers) => ReactElement<any, any>;
  };
}
interface informationField {
  'Pot Size': string;
  LifeSpan: string;
  'Flower Colors': string;
  'Bloom Time': string;
  Zones: string;
  'Sun Exposure': string;
  'Product Date': string;
  'Product Availability': string;
  'Cultivar Name': string;
  'Plant Info Date': string;
  'Water Needs': string;
  'Plant Type': string;
  'Night Color': string;
}
const ProductDetailInfoController: React.FC<_Props> = ({
  cases,
  config,
  productData,
}) => {
  const [activeDropDown, setActiveDropDown] = useState(true);

  const informationField = {
    'Pot Size': '',
    LifeSpan: '',
    'Flower Colors': '',
    'Bloom Time': '',
    Zones: '',
    'Sun Exposure': '',
    'Product Date': '',
    'Product Availability': '',
    'Cultivar Name': '',
    'Plant Info Date': '',
    'Water Needs': '',
    'Plant Type': '',
    'Night Color': '',
  };
  productData?.productCustomField?.map((el) => {
    if (el.label.toLocaleLowerCase() == 'pot size') {
      informationField['Pot Size'] = el.value;
    }
    if (el.label.toLocaleLowerCase() == 'product date') {
      informationField['Product Date'] = el.value;
    }
    if (el.label.toLocaleLowerCase() == 'product availability') {
      informationField['Product Availability'] = el.value;
    }
    if (el.label.toLocaleLowerCase() == 'plant info date') {
      informationField['Plant Info Date'] = el.value;
    }
  });
  productData?.producFilterFacetFields?.map((el) => {
    if (el.name.toLocaleLowerCase() == 'zone') {
      const zone = el.values.map((el1) => el1.value).join(', ');
      informationField['Zones'] = zone;
    }
    if (el.name.toLocaleLowerCase() == 'life span') {
      const LifeSpan = el.values.map((el1) => el1.value).join(', ');
      informationField['LifeSpan'] = LifeSpan;
    }
    if (el.name.toLocaleLowerCase() == 'color') {
      const color = el.values.map((el1) => el1.value).join(', ');
      informationField['Flower Colors'] = color;
    }
    if (el.name.toLocaleLowerCase() == 'bloom time') {
      const bloomTime = el.values.map((el1) => el1.value).join(', ');
      informationField['Bloom Time'] = bloomTime;
    }
    if (el.name.toLowerCase() == 'sun') {
      const sunExposure = el.values.map((el1) => el1.value).join(', ');
      informationField['Sun Exposure'] = sunExposure;
    }
    if (el.name.toLowerCase() == 'water') {
      const waterNeeds = el.values.map((el1) => el1.value).join(', ');
      informationField['Water Needs'] = waterNeeds;
    }
    if (el.name.toLowerCase() == 'night color') {
      const nightColor = el.values.map((el1) => el1.value).join(', ');
      informationField['Night Color'] = nightColor;
    }
    if (el.name.toLowerCase() == 'plant type') {
      const plantType = el.values.map((el1) => el1.value).join(', ');
      informationField['Plant Type'] = plantType;
    }
  });
  return cases.view({
    config,
    activeDropDown,
    setActiveDropDown,
    informationField,
  });
};

export default ProductDetailInfoController;
