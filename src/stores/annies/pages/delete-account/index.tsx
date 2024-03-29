'use client';
import React from 'react';
import DeleteAccountController from '@/features/myAccount/deleteAccount/controller';
import SideLayout from '../../shared/components/myAccountLayout';
import CheckBox from '@/components/common/checkbox';
import { paths } from '@/utils/paths.constant';

const DeleteAccount: React.FC = () => {
  return (
    <DeleteAccountController
      configs={null}
      cases={{
        ready: ({
          payload,
          hookForm: { register, errors, handleSubmit },
          onSubmit,
          userEmail,
          isOpen,
          onRequestClose,
        }) => (
          <SideLayout
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            checkAccount={true}
            verificationPayload={payload}
          >
            <div className='w-full px-[15px]'>
              <h1 className='text-2xl-text mb-[20px] font-bold font-sub'>
                Delete Account
              </h1>
              <div className='mb-[40px] border-t border-t-gray-border'></div>
              <div className='p-[15px] lg:p-[30px] drop-shadow-md rounded-sm bg-[#ffffff] mb-[40px] panel-01 tab-content'>
                <div className='w-full'>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='max-w-lg'>
                      <div className='w-full mb-[20px] text-small-text'>
                        <p>
                          Checking the box at the bottom of this page and
                          pressing “Close My Account” will submit a request to
                          close your account. We're usually able to process
                          requests to close accounts automatically.
                        </p>
                      </div>
                      <div className='w-full flex justify-start items-center mb-[20px]'>
                        <div className='w-full md:w-1/3 text-small-text !font-[700]'>
                          Email Address
                        </div>
                        <a href={`${paths.mailto}:${userEmail}`}>{userEmail}</a>
                      </div>
                      <div className='p-[15px] lg:p-[30px] bg-[#F6EDFF] mb-[20px]'>
                        <div className='text-anchor text-small-text'>
                          <p className='!font-[600] mb-[10px]'>
                            Proceed With Caution
                          </p>
                          <p className='mb-[10px]'>
                            You will permanently lose access to manage your
                            account online. You will have to contact customer
                            support to manage open orders and incomplete
                            returns. You remain liable for any unpaid balances
                            and will not be able to pay them through your online
                            account.
                          </p>
                          <p>
                            If any of these outstanding items apply to you,
                            consider waiting to close your account until they
                            are resolved.
                          </p>
                        </div>
                      </div>
                      <div className='w-full mb-[20px]'>
                        <div className='flex items-center mb-[20px]'>
                          <CheckBox
                            type='checkbox'
                            name='isUnsubscribe'
                            className='text-default-test  !h-4 !w-4 !border-gray-300 !rounded'
                            label='Unsubscribe from Emails'
                            rootClassName='mb-2'
                            register={register}
                            error={errors?.isUnsubscribe?.message}
                          />
                        </div>
                        <div className='flex items-center'>
                          <CheckBox
                            type='checkbox'
                            name='isConfirmCloseMyAccount'
                            className='text-default-test  !h-4 !w-4 !border-gray-300 !rounded'
                            label='I confirm I would like to close my account'
                            rootClassName='mb-2'
                            register={register}
                            error={errors?.isConfirmCloseMyAccount?.message}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='w-full'>
                      <div className='max-w-lg mt-[20px] flex gap-x-[15px]'>
                        <button
                          type='submit'
                          className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'
                        >
                          Close My Account
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </SideLayout>
        ),
      }}
    ></DeleteAccountController>
  );
};

export default DeleteAccount;
