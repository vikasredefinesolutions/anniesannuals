'use client';
import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import SideLayout from '../../shared/components/myAccountLayout';
import AlertscommunicationsController from '@/features/alertsCommunications/controller';
import CheckBox from '@/components/common/checkbox';
import Image from '@/shared/Components/Image';

const AlertsCommunications = () => {
  return (
    <>
      <AlertscommunicationsController
        configs={null}
        cases={{
          empty: () => <h2>Empty</h2>,
          loading: () => (
            <div className='loader-wrapper'>
              <div className='loader'>
                <Image
                  src={'/assets/images/borboletas-butterflies.gif'}
                  alt={''}
                  isStatic={true}
                />
              </div>
            </div>
          ),
          ready: ({
            onSubmit,
            hookForm: { register, handleSubmit },
            subscribeDetails,
            handleSubScribeDetailsChange,
            successMsg,
          }) => {
            return (
              <>
                <SideLayout>
                  <h1 className='text-2xl-text mb-[20px] font-bold font-sub'>
                    Alerts & Communications
                  </h1>
                  <div className='mb-[40px] border-t border-t-gray-border'></div>
                  {successMsg && (
                    <div className='bg-[#ECFFF3] border border-[#9BFFC0] rounded-[10px] p-3 flex items-center gap-2 mb-[20px]'>
                      <span className='text-green-700 text-xl'>
                        <AiOutlineCheckCircle />
                      </span>
                      <div className='text-green-700'>
                        <div>
                          Your Alerts & Communications information has been
                          successfully saved!
                        </div>
                      </div>
                    </div>
                  )}
                  <div className='p-[15px] lg:p-[30px] shadow-md rounded-sm bg-[#ffffff] mb-[40px] tab-content'>
                    <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
                      <div className='w-full'>
                        <div className='max-w-2xl'>
                          <div className='text-title-text mb-[20px] font-bold font-sub'>
                            Email
                          </div>
                          <div className='flex items-center mb-[10px]'>
                            <CheckBox
                              name='emailFrequency'
                              type='radio'
                              id='isEmailNoLimit'
                              fullWidth={false}
                              checked={
                                subscribeDetails?.frequency === 'isEmailNoLimit'
                              }
                              register={register}
                              onChange={() => {
                                handleSubScribeDetailsChange(
                                  'frequency',
                                  'isEmailNoLimit',
                                );
                              }}
                            />
                            <label
                              htmlFor='isEmailNoLimit'
                              className='ml-[10px] text-default-text !font-[600]'
                            >
                              No limit - Receive all emails
                            </label>
                          </div>
                          <div className='flex items-center mb-[10px]'>
                            <CheckBox
                              name='emailFrequency'
                              id='isEmailNoOnceWeek'
                              type='radio'
                              checked={
                                subscribeDetails?.frequency ===
                                'isEmailNoOnceWeek'
                              }
                              fullWidth={false}
                              register={register}
                              onChange={() => {
                                handleSubScribeDetailsChange(
                                  'frequency',
                                  'isEmailNoOnceWeek',
                                );
                              }}
                            />
                            <label
                              htmlFor='isEmailNoOnceWeek'
                              className='ml-[10px] text-default-text !font-[600]'
                            >
                              No more than once a week
                            </label>
                          </div>
                          <div className='flex items-center mb-[10px]'>
                            <CheckBox
                              name='emailFrequency'
                              id='isEmailNoOnceMonth'
                              type='radio'
                              checked={
                                subscribeDetails?.frequency ===
                                'isEmailNoOnceMonth'
                              }
                              fullWidth={false}
                              register={register}
                              onChange={() => {
                                handleSubScribeDetailsChange(
                                  'frequency',
                                  'isEmailNoOnceMonth',
                                );
                              }}
                            />
                            <label
                              htmlFor='isEmailNoOnceMonth'
                              className='ml-[10px] text-default-text !font-[600]'
                            >
                              No more than once a month
                            </label>
                          </div>
                          <div className='flex items-center mb-[10px]'>
                            <CheckBox
                              name='emailFrequency'
                              id='isEmailUnsubscribeMarketing'
                              type='radio'
                              checked={
                                subscribeDetails.frequency ===
                                'isEmailUnsubscribeMarketing'
                              }
                              fullWidth={false}
                              register={register}
                              onChange={() => {
                                handleSubScribeDetailsChange(
                                  'frequency',
                                  'isEmailUnsubscribeMarketing',
                                );
                              }}
                            />
                            <label
                              htmlFor='isEmailUnsubscribeMarketing'
                              className='ml-[10px] text-default-text !font-[600]'
                            >
                              Unsubscribe from all marketing emails
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className='w-full'>
                        <div className='max-w-xl mt-[20px]'>
                          <div className='text-title-text mb-[20px] font-bold font-sub'>
                            Content preference
                          </div>
                          <div className='flex items-center mb-[10px]'>
                            <CheckBox
                              name='noPreference'
                              id='isContentNoPrefrence'
                              type='radio'
                              checked={subscribeDetails.content.includes(
                                'isContentNoPrefrence',
                              )}
                              fullWidth={false}
                              register={register}
                              onChange={() => {
                                handleSubScribeDetailsChange(
                                  'content',
                                  'isContentNoPrefrence',
                                );
                              }}
                            />{' '}
                            <label
                              htmlFor='isContentNoPrefrence'
                              className='ml-[10px] text-default-text !font-[600]'
                            >
                              No Prefrence
                            </label>
                          </div>
                          <div className='flex items-center mb-[10px]'>
                            <CheckBox
                              name='emailPreference'
                              id='isContentPromotionalEmails'
                              type='checkbox'
                              checked={subscribeDetails.content.includes(
                                'isContentPromotionalEmails',
                              )}
                              fullWidth={false}
                              register={register}
                              onChange={() => {
                                handleSubScribeDetailsChange(
                                  'content',
                                  'isContentPromotionalEmails',
                                );
                              }}
                            />{' '}
                            <label
                              htmlFor='isContentPromotionalEmails'
                              className='ml-[10px] text-default-text !font-[600]'
                            >
                              Promotional Emails (coupons, exclusive deals, and
                              inspirations.)
                            </label>
                          </div>
                          <div className='flex items-center mb-[10px]'>
                            <CheckBox
                              name='emailPreference'
                              id='isContentProductReviewEmails'
                              type='checkbox'
                              checked={subscribeDetails.content.includes(
                                'isContentProductReviewEmails',
                              )}
                              fullWidth={false}
                              register={register}
                              onChange={() => {
                                handleSubScribeDetailsChange(
                                  'content',
                                  'isContentProductReviewEmails',
                                );
                              }}
                            />{' '}
                            <label
                              htmlFor='isContentProductReviewEmails'
                              className='ml-[10px] text-default-text !font-[600]'
                            >
                              Product Review Emails (request to review products
                              you've purchased)
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className='w-full'>
                        <div className='max-w-2xl mt-[20px]'>
                          <div className='text-title-text mb-[20px] font-bold font-sub'>
                            Phone
                          </div>
                          <div className='flex items-center mb-[10px]'>
                            <CheckBox
                              name='phonePreference'
                              id='isPhoneCallsEventsOrdersToBirthday'
                              type='checkbox'
                              checked={
                                subscribeDetails?.phone ===
                                'isPhoneCallsEventsOrdersToBirthday'
                              }
                              fullWidth={false}
                              register={register}
                              onChange={() => {
                                handleSubScribeDetailsChange(
                                  'phone',
                                  'isPhoneCallsEventsOrdersToBirthday',
                                );
                              }}
                            />{' '}
                            <label
                              htmlFor='isPhoneCallsEventsOrdersToBirthday'
                              className='ml-[10px] text-default-text !font-[600]'
                            >
                              Calls from us about everything from events and
                              your orders to birthday wishes
                            </label>
                          </div>
                          <div className='p-[10px] lg:p-[20px] bg-[#F6EDFF] mb-[20px]'>
                            <div className='text-anchor text-small-text'>
                              <p>
                                You will always receive order alerts and
                                transactional emails.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='w-full'>
                        <div className='max-w-lg mt-[20px] flex gap-x-[15px]'>
                          <button
                            type='submit'
                            className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'
                          >
                            SAVE PREFERENCES
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </SideLayout>
              </>
            );
          },
        }}
      />
    </>
  );
};

export default AlertsCommunications;
