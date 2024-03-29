import {
  getStaticStoreDetails,
  tStoreDetailsFile,
} from '@/helper/staticfile.helper';
import { activeStoreName } from '@/shared/configs';
import dynamic from 'next/dynamic';

const DynamicGiftCertificateDetailsPage: React.ComponentType<{
  cmsStoreThemeConfigsViewModel: tStoreDetailsFile['cmsStoreThemeConfigsViewModel'];
}> = dynamic(
  () => import(`../../${activeStoreName}/pages/gift-certificate-details`),
);

export default async function GiftCertificateDetails() {
  const { cmsStoreThemeConfigsViewModel } = await getStaticStoreDetails();

  return (
    <DynamicGiftCertificateDetailsPage
      cmsStoreThemeConfigsViewModel={cmsStoreThemeConfigsViewModel}
    />
  );
}
