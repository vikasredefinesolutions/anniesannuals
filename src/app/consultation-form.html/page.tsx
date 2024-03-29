import dynamic from 'next/dynamic';
import { activeStoreName } from '@/shared/configs';

const DynamicCosulationFormPage = dynamic(
  () => import(`../../${activeStoreName}/pages/consultationForm`),
);

export default function ProductListing() {
  return <DynamicCosulationFormPage />;
}
