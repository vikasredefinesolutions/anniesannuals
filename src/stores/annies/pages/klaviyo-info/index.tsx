'use client';
import { useAppSelector } from '@/app/redux/hooks';
import { IOrderProps } from '@/app/track-your-package/[orderNumber]/page';
import KlaviyoInfoController from '@/features/myAccount/klaviyo-info/controller';
import Loader from '@/shared/Components/Loader';
import React, { ChangeEvent } from 'react';
import KlaviyoCheckBox from './components/CheckBox';
import KlaviyoInput from './components/Input';

const Invoice: React.FC<IOrderProps> = ({ orderNumber, orderDetails }) => {
  const { isLoading } = useAppSelector((state) => state.common);

  return (
    <KlaviyoInfoController
      configs={null}
      cases={{
        empty: () => <h2>Empty</h2>,
        loading: () => <h2>Loading...</h2>,
        ready: ({
          userData,
          register,
          handleSubmit,
          errors,
          fetchKlaviyoUserData,
          setUserEmail,
          onSubmit,
          setUserData,
        }) => (
          <>
            {isLoading && <Loader />}

            <div className='flex flex-wrap mx-[-15px]'>
              <div className='w-full px-[15px] bg-[#FFF3E0]'>
                <div className='p-[15px] lg:p-[30px] shadow-md rounded-sm mb-[40px] panel-01 tab-content max-w-lg mx-auto bg-[#ffffff] mt-[20px]'>
                  <div className='text-title-text mb-[20px] font-bold font-sub flex items-center justify-center'>
                    Manage Subscription
                  </div>
                  <div className='w-full'>
                    <div className='max-w-lg'>
                      <div className='w-full mb-[20px]'>
                        <div className='relative mb-[20px]'>
                          <label className='block text-small-text mb-[5px] ml-[15px] font-bold uppercase'>
                            Email
                          </label>
                          <div className='relative'>
                            <input
                              placeholder={'Enter your email'}
                              className={`form-input`}
                              type='email'
                              onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.value == '') {
                                  setUserData(null);
                                }
                              }}
                              onChange={(e) => {
                                setUserEmail(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className='flex gap-x-[15px] mb-[10px]'></div>
                      <button
                        type='button'
                        className='btn btn-primary btn-sm uppercase !font-body !rounded-xs mb-[20px]'
                        onClick={() => fetchKlaviyoUserData()}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                  {userData && (
                    <>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='w-full border-t border-t-gray-border'>
                          <div className='max-w-lg mt-[20px]'>
                            <div className='w-full mb-[20px]'>
                              <KlaviyoInput
                                label='FIRST NAME'
                                placeHolder='FIRST NAME'
                                inputFieldOptions={register('firstName')}
                                error={
                                  errors?.firstName &&
                                  errors?.firstName?.message
                                }
                              />
                            </div>
                            <div className='w-full mb-[20px]'>
                              <KlaviyoInput
                                label='LAST NAME'
                                placeHolder='LAST NAME'
                                inputFieldOptions={register('lastName')}
                                error={
                                  errors?.lastName && errors?.lastName?.message
                                }
                              />
                            </div>
                            <div className='w-full mb-[20px]'>
                              <KlaviyoInput
                                label='PHONE'
                                placeHolder='PHONE'
                                inputFieldOptions={register('phone')}
                                error={errors?.phone && errors?.phone?.message}
                              />
                            </div>
                          </div>
                        </div>

                        <div className='w-full border-t border-t-gray-border'>
                          <div className='max-w-lg mt-[20px]'>
                            <div className='text-title-text mb-[20px] font-bold font-sub'>
                              Email
                            </div>
                            {/* <KlaviyoCheckBox
                          type='checkbox'
                          label='Unsubscribe from all marketing emails'
                          inputFieldOptions={register(
                            'isUnSubscribeMarketingEmail',
                          )}
                        /> */}

                            <KlaviyoCheckBox
                              type='checkbox'
                              name='isUnSubscribeMarketingEmail'
                              className='text-default-test  !h-4 !w-4 !border-gray-300 !rounded'
                              label='Unsubscribe from all marketing emails'
                              rootClassName='mb-2'
                              register={register}
                              error={
                                errors?.isUnSubscribeMarketingEmail?.message
                              }
                            />

                            <KlaviyoCheckBox
                              type='checkbox'
                              name='isUnSubscribeAllSms'
                              className='text-default-test  !h-4 !w-4 !border-gray-300 !rounded'
                              label='Unsubscribe from all SMS'
                              rootClassName='mb-2'
                              register={register}
                              error={errors?.isUnSubscribeAllSms?.message}
                            />

                            <KlaviyoCheckBox
                              type='checkbox'
                              name='isDoNotShareMyDetailsAnyOne'
                              className='text-default-test  !h-4 !w-4 !border-gray-300 !rounded'
                              label='Do not share details with anyone'
                              rootClassName='mb-2'
                              register={register}
                              error={
                                errors?.isDoNotShareMyDetailsAnyOne?.message
                              }
                            />

                            <KlaviyoCheckBox
                              type='checkbox'
                              name='isEmailLocalEventsHappeningInNursey'
                              className='text-default-test  !h-4 !w-4 !border-gray-300 !rounded'
                              label='Email about local events happening in our nursery'
                              rootClassName='mb-2'
                              register={register}
                              error={
                                errors?.isEmailLocalEventsHappeningInNursey
                                  ?.message
                              }
                            />

                            {/* <KlaviyoCheckBox
                          type='checkbox'
                          label='Unsubscribe from all SMS'
                          inputFieldOptions={register('isUnSubscribeAllSms')}
                        />

                        

                        <KlaviyoCheckBox
                          type='checkbox'
                          label='Do not share details with anyone'
                          checked={true}
                          inputFieldOptions={register(
                            'isDoNotShareMyDetailsAnyOne',
                          )}
                        />

                        <KlaviyoCheckBox
                          type='checkbox'
                          label='Email about local events happening in our nursery'
                          inputFieldOptions={register(
                            'isEmailLocalEventsHappeningInNursey',
                          )}
                        /> */}
                          </div>
                        </div>
                        <div className='w-full'>
                          <button
                            type='submit'
                            className={`btn btn-primary btn-sm uppercase !font-body !rounded-xs mt-[20px] ${
                              !userData && 'opacity-50'
                            }`}
                            // disabled={userData ? true : false}
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        ),
      }}
    />
  );
};

export default Invoice;
