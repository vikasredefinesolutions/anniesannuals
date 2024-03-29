import dynamic from 'next/dynamic';
import { activeStoreName } from '@/shared/configs';

const DynamicJoinCosulationPage = dynamic(
  () => import(`../../${activeStoreName}/pages/joinConsultation`),
);

export default function ProductListing() {
  return <DynamicJoinCosulationPage />;
}
