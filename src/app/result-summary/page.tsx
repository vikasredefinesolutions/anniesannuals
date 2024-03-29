import { activeStoreName } from '@/shared/configs';
import dynamic from 'next/dynamic';

const DynamicResultSummary = dynamic(
  () => import(`../../${activeStoreName}/pages/result-summary`),
);

export default async function ResultSummary() {
  return <DynamicResultSummary />;
}
