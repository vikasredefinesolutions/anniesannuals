'use client';
import React from 'react';
import AccountCloseController from '@/features/myAccount/AccountClosed/controller';
import SideLayout from '../../shared/components/myAccountLayout';
import CustomLink from '@/shared/Components/CustomLink';
import { paths } from '@/utils/paths.constant';

const AccountClosed: React.FC = () => {
  return (
    <AccountCloseController
      configs={null}
      cases={{
        ready: ({ userEmail }) => (
          <SideLayout checkAccount={true}>
            <div className='w-full px-[15px]'>
              <h1 className='text-2xl-text mb-[20px] font-bold font-sub'>
                Account Successfully Closed
              </h1>
              <div className='mb-[40px] border-t border-t-gray-border'></div>
              <div className='p-[15px] lg:p-[30px] drop-shadow-md rounded-sm bg-[#ffffff] mb-[40px] panel-01 tab-content'>
                <div className='w-full'>
                  <div className='max-w-lg'>
                    <div className='w-full mb-[20px] text-small-text'>
                      <p>Your account has been successfully closed.</p>
                    </div>
                    <div className='w-full flex justify-start items-center mb-[20px]'>
                      <div className='w-full md:w-1/3 text-small-text !font-[700]'>
                        Email Address
                      </div>
                      <div className='w-full md:w-2/3 text-normal-text !font-[700]'>
                        <a href={`${paths.mailto}:${userEmail}`}>{userEmail}</a>
                      </div>
                    </div>
                    <div className='p-[15px] lg:p-[30px] bg-[#F6EDFF] mb-[20px]'>
                      <div className='text-anchor text-small-text'>
                        <p className='mb-[10px]'>
                          An email containing additional details and
                          confirmation will be sent to the email address above.
                          This account has been signed out on all devices.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='w-full'>
                  <div className='max-w-lg mt-[20px] flex gap-x-[15px]'>
                    <CustomLink
                      href={paths.home}
                      className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'
                    >
                      Back
                    </CustomLink>
                  </div>
                </div>
              </div>
            </div>
          </SideLayout>
        ),
      }}
    />
  );
};

export default AccountClosed;
