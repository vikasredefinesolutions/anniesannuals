'use client';
import CheckBox from '@/components/common/checkbox';
import Input from '@/components/common/input';
import CustomLink from '@/shared/Components/CustomLink';
import { paths } from '@/utils/paths.constant';
import React from 'react';
import LoginModelController from '../../../../features/user/userLogin/controller';

const SignInPage: React.FC = () => {
  return (
    <>
      <LoginModelController
        config={{
          enableFeatures: {
            rememberMeButton: true,
            showPasswordButton: false,
          },
        }}
        cases={{
          view: ({
            hookForm: { register, errors, handleSubmit },
            errorMessage,
            onSubmit,
            Controller,
            control,
            showPassword,
            setShowPassword,
          }) => {
            return (
              <>
                <section className='relative pt-[30px] pb-[30px] bg-tertiary'>
                  <div className='container mx-auto'>
                    <div className='z-50 justify-center items-center text-default-text'>
                      <form
                        className='w-full h-full flex items-center justify-center'
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div className='relative px-[16px] w-full max-w-lg h-auto'>
                          <div className='relative bg-[#ffffff] shadow h-full rounded-sm overflow-hidden p-[30px]'>
                            <div className='flex justify-start items-center pb-[25px] rounded-t sticky top-0 left-0'>
                              <h1 className='font-[600] text-large-text font-sub'>
                                Sign In
                              </h1>
                            </div>
                            <div>
                              <div className='Login-Main'>
                                <span className='text-rose-600'>
                                  {errorMessage}
                                </span>
                                <div className='mb-[10px]'>
                                  <Controller
                                    name='userName'
                                    control={control}
                                    render={({
                                      onChange,
                                    }: {
                                      onChange: any;
                                    }) => (
                                      <Input
                                        name='userName'
                                        type='email'
                                        label='Email'
                                        register={register}
                                        rootClassName='mb-2'
                                        placeholder='Enter Email Address'
                                        error={errors?.userName?.message}
                                      />
                                    )}
                                  />
                                </div>
                                <div className='relative mb-[10px]'>
                                  <Input
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    rootClassName='mb-4'
                                    label='Password'
                                    register={register}
                                    placeholder='Enter your Password'
                                    error={errors?.password?.message}
                                  />
                                  <div className='absolute top-1/2 translate-y-1/2 mt-[0] right-2'>
                                    <button
                                      className='border-b border-b-primary hover:border-0 text-small-text cursor-pointer'
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setShowPassword(!showPassword);
                                      }}
                                    >
                                      Show
                                    </button>
                                  </div>
                                </div>
                                <div className='flex justify-between items-center pb-[20px]'>
                                  <div className='mb-[10px] flex items-center gap-1 test-default-text !font-[600]'>
                                    <CheckBox
                                      label='Remember me'
                                      rootClassName='w-1/2'
                                      name='ChkKeepMeLogged'
                                      type='checkbox'
                                    />
                                  </div>
                                  <div className='mb-[10px]'>
                                    <a
                                      href={paths.forget}
                                      className='text-anchor test-default-text !font-[600] border-b border-b-primary'
                                    >
                                      Forgot Password?
                                    </a>
                                  </div>
                                </div>
                                <div className='mb-[20px]'>
                                  <button
                                    className='w-full btn btn-primary btn-xs uppercase !font-body !rounded-xs'
                                    id=''
                                    type='submit'
                                  >
                                    SIGN IN
                                  </button>
                                </div>
                                <div className='mb-[20px] text-[16px] text-center !font-bold !font-sub'>
                                  Don't have an account? Create one now!
                                </div>
                                <div className=''>
                                  <CustomLink
                                    href={paths.signUp}
                                    className='w-full inline-flex justify-center text-[14px] rounded-xs border border-primary text-primary font-extrabold uppercase px-[16px] py-[15px] text-center'
                                  >
                                    Sign Up
                                  </CustomLink>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </section>
              </>
            );
          },
        }}
      />
    </>
  );
};

export default SignInPage;
