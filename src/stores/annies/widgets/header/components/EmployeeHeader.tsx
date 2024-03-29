import { useAppSelector } from '@/app/redux/hooks';
import React from 'react';

interface IProps {
  handleSignOut: () => void;
}
const EmployeeHeader: React.FC<IProps> = ({ handleSignOut }) => {
  const empEmail = useAppSelector((state) => state.employee.employee?.email);

  return (
    <div className='bg-primary hidden md:block'>
      <div className='container pl-[15px] pr-[15px] mx-auto'>
        <div className='flex flex-wrap justify-end items-center text-[#ffffff]'>
          <div className='flex items-center mr-[10px]'>
            <div className='text-[#ffffff] text-[14px] tracking-[1.4px] leading-[30px]'>
              <span>{empEmail!}</span>
            </div>
            <span className='ml-[10px]'>|</span>
          </div>
          <div className='text-[#ffffff] text-[14px] tracking-[1.4px] leading-[30px]'>
            Employee Logged in{' '}
            <span
              onClick={() => handleSignOut()}
              className='hover:underline cursor-pointer'
            >
              (Logout)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHeader;
