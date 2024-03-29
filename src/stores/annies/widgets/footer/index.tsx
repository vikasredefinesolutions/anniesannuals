import { updateStoreDetails } from '@/api/jsonServices/updateStoreDetails';
import { ICmsStoreThemeConfig } from '@/shared/types/cmsThemeConfig';
import { getStaticStoreDetails } from '@/helper/staticfile.helper';
import FooterComponent from './footer';

async function Footer() {
  const getFooterDataFromStoreDetails = async (): Promise<string> => {
    let footerHtml = '';
    const { cmsStoreThemeConfigsViewModel = [] } =
      await getStaticStoreDetails();

    const setFooterHtml = () => {
      const footerConfigData = cmsStoreThemeConfigsViewModel.find(
        (configItem: ICmsStoreThemeConfig) =>
          configItem.config_name === 'footer',
      );
      if (footerConfigData?.config_value)
        footerHtml = footerConfigData.config_value;
    };

    if (!!cmsStoreThemeConfigsViewModel?.length) {
      setFooterHtml();
    } else {
      const isStoreUpdated = await updateStoreDetails();
      if (isStoreUpdated) setFooterHtml();
    }
    return footerHtml;
  };
  const footerHtml = await getFooterDataFromStoreDetails();

  return <FooterComponent footerHtml={footerHtml} />;
}

export default Footer;
