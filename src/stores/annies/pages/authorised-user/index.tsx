'use client';
import AuthoriserdUserController from '@/features/myAccount/authorisedUser/controller';
import React, { useState } from 'react';
import SideLayout from '../../shared/components/myAccountLayout';
import Image from '@/shared/Components/Image';
import Input from '@/components/common/input';
import CustomLink from '@/shared/Components/CustomLink';

const AuthorisedUser: React.FC = () => {
  return (
    <AuthoriserdUserController
      configs={null}
      cases={{
        loading: () => <div>Loading</div>,
        empty: () => <div>Empty</div>,
        ready: ({
          onSubmit,
          hookForm: { errors, register, handleSubmit },
          show,
          setShow,
        }) => (
          <>
            <SideLayout checkAccount={true}>
              <h1 className='text-2xl-text mb-[20px] font-bold font-sub'>
                Authorized User
              </h1>
              <div className='mb-[40px] border-t border-t-gray-border'></div>
              <div className='p-[15px] lg:p-[30px] shadow rounded-sm bg-white border border-gray-border mb-[40px] panel-01 tab-content'>
                <div className='w-full'>
                  <div className='w-full md:grid md:grid-cols-6 gap-x-[15px] items-center'>
                    <div className='col-span-1'>
                      <span className='font-bold'>Authorized Users</span>
                    </div>
                    <div className='col-span-4'></div>
                    <div className='col-span-1 text-right flex justify-end'>
                      <CustomLink
                        href={undefined}
                        className='btn btn-outline-primary !rounded-[5px] !w-[104px] !flex justify-end items-center gap-x-[10px] active'
                        onClick={() => setShow(!show)}
                      >
                        <span>
                          <Image
                            src={'images/edit.svg'}
                            alt={'editIcon'}
                            className={''}
                          />
                        </span>
                        <span>Edit</span>
                      </CustomLink>
                    </div>
                  </div>
                  {show && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className='w-full md:grid md:grid-cols-6 gap-x-[15px] items-center pb-[30px]'>
                        <div className='col-span-1'>&nbsp;</div>
                        <div className='col-span-4'>
                          <div className='max-w-full lg:max-w-2xl pt-[60px]'>
                            <div>
                              <div className='w-full mb-[20px] text-normal-text'>
                                <div className='font-bold'>Add user</div>
                              </div>
                              <div className='w-full mb-[20px]'>
                                <Input
                                  name='adduser_firstname'
                                  label='First Name'
                                  rootClassName='mb-2'
                                  register={register}
                                  placeholder='Enter your first name'
                                  error={errors?.adduser_firstname?.message}
                                  type='text'
                                />
                              </div>
                              <div className='w-full mb-[20px]'>
                                <Input
                                  name='adduser_lastname'
                                  label='Last Name'
                                  rootClassName='mb-2'
                                  register={register}
                                  placeholder='Enter your last name'
                                  error={errors?.adduser_lastname?.message}
                                  type='text'
                                />
                              </div>
                              <div className='pt-[10px] flex justify-start items-center gap-[10px]'>
                                <div className='lg:mb-0 mb-[15px] w-auto'>
                                  <button
                                    type='submit'
                                    className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'
                                  >
                                    Save
                                  </button>
                                </div>
                                <div className='lg:mb-0 mb-[15px] w-auto'>
                                  <button className='btn btn-outline-primary btn-sm uppercase !font-body !rounded-xs !inline-flex gap-[10px] items-center'>
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-span-1 text-right flex justify-end'>
                          &nbsp;
                        </div>
                        <div className='col-span-5 text-small-text mt-[60px]'>
                          <div className='mb-[20px] last:mb-0'>
                            <div className='font-bold mb-[5px]'>
                              Authorized User Permissions
                            </div>
                            <div>
                              Can check order status/tracking on all orders.
                            </div>
                            <div>
                              Can set up returns for credit or a
                              replacement.Return Policy
                            </div>
                            <div>
                              Cannot place orders on the account or get any
                              credit card information.
                            </div>
                          </div>
                          <div className='mb-[20px] last:mb-0'>
                            <div className='font-bold mb-[5px]'>
                              Annies Won’t Give Out Your Account Information
                            </div>
                            <div>
                              Annies customer service representatives will only
                              confirm (not give out) account information (phone
                              number, email, etc.) after the authorized user has
                              provided that information.
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </SideLayout>
          </>
        ),
      }}
    />
  );
};

export default AuthorisedUser;
