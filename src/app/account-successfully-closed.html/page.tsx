import dynamic from 'next/dynamic';
import { activeStoreName } from '@/shared/configs';

const DynamicAccountSuccessfullyClosed = dynamic(
  () => import(`../../${activeStoreName}/pages/accountClosed`),
);

export default function AccountClosed() {
  return <DynamicAccountSuccessfullyClosed />;
}
