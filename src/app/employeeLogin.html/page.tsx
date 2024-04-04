import { activeStoreName } from '@/shared/configs';
import dynamic from 'next/dynamic';

const DynamicEmployeeLoginPage = dynamic(
  () => import(`../../${activeStoreName}/pages/employeeLoginScreen`),
);

export default function EmployeeLoginResirect() {
  return <DynamicEmployeeLoginPage />;
}
