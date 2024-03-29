// ** React Imports
import React, { Fragment, useEffect, useState } from 'react';

// ** MUI Imports
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import MuiTab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import { __pagesConstant } from '../../home.contant';
import { FeaturedProductTabs } from '../featuredProduct/tab';
import {
  _SelectedTab,
  newFetauredItemResponse,
} from '../../components/home.type';
import BrandProductListing from './BrandProducsListing';

interface _props {
  data: _SelectedTab[];
  showBorder: string;
  customMessage: string;
  showProductName: string;
  showSplitProducts: string;
  showButton: string;
  showPrice: string;
  showBrandLogo: string;
  footerTabing: string;
  productToDisplay: string;
  featuredItems: { [x: string]: newFetauredItemResponse[] };
}

// ** Styled Tab component
const Tab = styled(MuiTab)(({ theme }) => ({
  minHeight: 48,
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(3),
  },
}));

const ProductsInfoTabs: React.FC<_props> = (props) => {
  const {
    data,
    showBorder,
    customMessage,
    showProductName,
    showSplitProducts,
    showButton,
    showPrice,
    showBrandLogo,
    footerTabing,
    productToDisplay,
    featuredItems,
  } = props;

  // ** State
  const [value, setValue] = useState<string>(data[0]?.index);
  const [footerTabColorName, setFooterTabColorName] = useState<string>('');

  useEffect(() => {
    setFooterTabColorName(data[0]?.footerTabColorName);
    setValue(data[0]?.index);
  }, [data]);

  const handleChange = (newValue: string, footerTabColorName: string) => {
    setValue(newValue);
    setFooterTabColorName(footerTabColorName);
  };

  return (
    <TabContext value={value}>
      <FeaturedProductTabs
        data={data}
        footerTabing={footerTabing}
        footerTabColorName={footerTabColorName}
        handleChange={handleChange}
        value={value}
      />

      <Box sx={{ marginTop: 0 }}>
        {data.map((product: any, index: number) => {
          return (
            <Fragment key={`${product.index}`}>
              <TabPanel sx={{ p: 0 }} value={product.index}>
                <BrandProductListing
                  customMessage={customMessage}
                  featuredItems={featuredItems}
                  showBorder={showBorder}
                  showProductName={showProductName}
                  showSplitProducts={showSplitProducts}
                  showButton={showButton}
                  showPrice={showPrice}
                  showBrandLogo={showBrandLogo}
                  productsData={product}
                  productToDisplay={productToDisplay}
                />
              </TabPanel>
            </Fragment>
          );
        })}
      </Box>

      {footerTabing === __pagesConstant?.show?.Yes && (
        <div className='pt-5'>
          <TabList
            variant='scrollable'
            scrollButtons='auto'
            aria-label='forced scroll tabs example'
            sx={{
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
              marginBottom: '30px',
            }}
            className='tab-container'
          >
            {data.map((product, index) => {
              return (
                <div key={index} className='lg:w-1/5 w-full'>
                  <button
                    className={`bg-[${product?.footerTabColorName}] hover:bg-[#ffffff] block pt-[16px] pb-[16px] pl-[40px] pr-[40px] text-center text-white font-[600] hover:text-[#ffffff] w-full`}
                    onClick={() =>
                      handleChange(product.index, product?.footerTabColorName)
                    }
                  >
                    {product?.tabName}
                  </button>
                </div>
              );
            })}
          </TabList>
        </div>
      )}
    </TabContext>
  );
};

export default ProductsInfoTabs;
