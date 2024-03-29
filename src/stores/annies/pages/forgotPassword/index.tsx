'use client';
import Input from '@/components/common/input';
import ForgotPasswordController from '@/features/user/forgotPassword/controller';
import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const ForgotPasswordPage = () => {
  return (
    <ForgotPasswordController
      configs={null}
      cases={{
        empty: () => <h2>Empty</h2>,
        loading: () => <h2>Loading...</h2>,
        ready: ({
          sendCustomerChangePasswordLink,
          storeId,
          email,
          onSubmit,
          hookForm: { register, errors, handleSubmit },
          captchaHandler,
          captchaVerified,
        }) => (
          <section className='relative pt-[30px] pb-[30px] bg-tertiary'>
            <div className='container mx-auto'>
              <div className='z-50 justify-center items-center text-default-text'>
                <div className='w-full h-full flex items-center justify-center'>
                  <div className='relative px-[16px] w-full max-w-lg h-auto'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className='relative bg-[#ffffff] shadow max-h-screen overflow-y-auto h-full rounded-sm overflow-hidden p-[30px]'>
                        <div className='flex justify-start items-center pb-[25px] rounded-t sticky top-0 left-0'>
                          <h1 className='font-[600] text-large-text font-sub'>
                            Password Reset
                          </h1>
                        </div>
                        <div>
                          <div className='Login-Main'>
                            <div className='mb-[20px] text-small-text'>
                              Enter the email for your account and we’ll send
                              you a link to reset your password.
                            </div>
                            <div className='mb-[20px]'>
                              <label className='ml-[0] lg:ml-[10px] text-small-text !font-bold'>
                                Email <span className='text-rose-600'>*</span>
                              </label>{' '}
                              <Input
                                type='email'
                                name='email'
                                register={register}
                                placeholder='Enter your email'
                                error={errors?.email?.message}
                                className='form-input'
                                rootClassName=''
                              />
                            </div>
                            <div className='relative mb-[20px]'>
                              <ReCAPTCHA
                                className='max-w-xs w-full'
                                sitekey={
                                  process.env.NEXT_PUBLIC_RECAPTCHASITEKEY || ''
                                }
                                onChange={captchaHandler}
                              />
                            </div>
                            <div className=''>
                              <button
                                type='submit'
                                className={`w-full btn btn-primary btn-sm uppercase !font-body !rounded-xs ${
                                  captchaVerified == 'VALID' ? '' : 'opacity-50'
                                }`}
                                id=''
                                disabled={
                                  captchaVerified == 'VALID' ? false : true
                                }
                              >
                                Send Link
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ),
      }}
    />
  );
};

export default ForgotPasswordPage;
