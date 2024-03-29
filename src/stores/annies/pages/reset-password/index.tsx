'use client';
import ResetPasswordController from '@/features/user/resetPassword/controller';
import Input from '@/components/common/input';
import { ChangeEvent } from 'react';
import Loader from '@/shared/Components/Loader';

const ResetPassword = () => {
  return (
    <ResetPasswordController
      configs={null}
      cases={{
        empty: () => <h2>Empty</h2>,
        loading: () => <Loader />,
        ready: ({
          onSubmit,
          hookForm: { register, errors, handleSubmit },
          tokenEmail,
          setPassword,
          passwordParameter,
          setToggleVisibilityPassword,
          setToggleVisibilityConfirmPassword,
          toggleVisibilityPassword,
          toggleVisibilityConfirmPassword,
        }) => {
          return (
            <section className='relative pt-[30px] pb-[30px] bg-tertiary'>
              <div className='container mx-auto'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='z-50 justify-center items-center text-default-text'>
                    <div className='w-full h-full flex items-center justify-center'>
                      <div className='relative px-[16px] w-full max-w-lg h-auto'>
                        <div className='relative bg-[#ffffff] shadow max-h-screen overflow-y-auto h-full rounded-sm overflow-hidden p-[30px]'>
                          <div className='flex justify-start items-center pb-[25px] rounded-t sticky top-0 left-0'>
                            <h1 className='font-[600] text-large-text font-sub'>
                              Reset Your Password
                            </h1>
                          </div>
                          <div>
                            <div className='Login-Main'>
                              {tokenEmail && (
                                <div className='mb-[20px] text-small-text'>
                                  Enter your new password for{' '}
                                  <a href='mailto:john@bluewireframe.com'>
                                    {tokenEmail}
                                  </a>
                                </div>
                              )}
                              <div className='relative mb-[10px]'>
                                <label className='ml-[0] lg:ml-[10px] text-small-text !font-bold'>
                                  Password{' '}
                                  <span className='text-rose-600'>*</span>
                                </label>
                                <div className='relative'>
                                  <input
                                    className='form-input'
                                    type={
                                      toggleVisibilityPassword
                                        ? 'text'
                                        : 'password'
                                    }
                                    error={errors?.newpassword?.message}
                                    {...register('newpassword')}
                                    onChange={(
                                      e: ChangeEvent<HTMLInputElement>,
                                    ) => setPassword(e.target.value)}
                                    placeholder='Enter your new password'
                                  />

                                  {errors?.newpassword?.message && (
                                    <p className='font-medium text-xs text-gray-darker'>
                                      <div className='h-6 top-full left-0 text-red-500 text-[16px]'>
                                        {errors?.newpassword?.message}
                                      </div>
                                    </p>
                                  )}
                                  {/* <Input
                                    type={
                                      toggleVisibilityPassword
                                        ? 'text'
                                        : 'password'
                                    }
                                    name='newpassword'
                                    register={register}
                                    onChange={(
                                      e: ChangeEvent<HTMLInputElement>,
                                    ) => setPassword(e.target.value)}
                                    placeholder='Enter your new password'
                                    error={errors?.newpassword?.message}
                                    className='form-input'
                                    rootClassName=''
                                  /> */}
                                  <div
                                    className='absolute top-1/2 -translate-y-1/2 mt-[0] right-2'
                                    x-data='{ open: false }'
                                  >
                                    <button
                                      type='button'
                                      onClick={() =>
                                        setToggleVisibilityPassword(
                                          !toggleVisibilityPassword,
                                        )
                                      }
                                      className='border-b border-b-primary hover:border-0 text-small-text'
                                    >
                                      Show
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className='mb-[20px] ml-[0] lg:ml-[10px]'>
                                <div className='text-small-text !font-bold mb-[10px]'>
                                  Password must contain:
                                </div>
                                <ul>
                                  <li
                                    className={`flex justify-start items-center py-[2px] text-extra-small-text ${
                                      passwordParameter.lengthCheck
                                        ? '!text-default !font-[600]'
                                        : 'text-red-500 !font-[600]'
                                    } `}
                                  >
                                    <span className='material-symbols-outlined mr-[5px] text-[20px]'>
                                      {passwordParameter.lengthCheck
                                        ? 'done'
                                        : 'close'}
                                    </span>{' '}
                                    Minimum length of 8 characters
                                  </li>
                                  <li
                                    className={`flex justify-start items-center py-[2px] text-extra-small-text ${
                                      passwordParameter.upperCaseLetterCheck
                                        ? '!text-default !font-[600]'
                                        : 'text-red-500 !font-[600]'
                                    } `}
                                  >
                                    <span className='material-symbols-outlined mr-[5px] text-[20px]'>
                                      {passwordParameter.upperCaseLetterCheck
                                        ? 'done'
                                        : 'close'}
                                    </span>{' '}
                                    At least one uppercase letter
                                  </li>
                                  <li
                                    className={`flex justify-start items-center py-[2px] text-extra-small-text ${
                                      passwordParameter.numberCheck
                                        ? '!text-default !font-[600]'
                                        : 'text-red-500 !font-[600]'
                                    } `}
                                  >
                                    <span className='material-symbols-outlined mr-[5px] text-[20px]'>
                                      {passwordParameter.numberCheck
                                        ? 'done'
                                        : 'close'}
                                    </span>{' '}
                                    At least one number
                                  </li>
                                  <li
                                    className={`flex justify-start items-center py-[2px] text-extra-small-text ${
                                      passwordParameter.specialCharacterCheck
                                        ? '!text-default !font-[600]'
                                        : 'text-red-500 !font-[600]'
                                    } `}
                                  >
                                    <span className='material-symbols-outlined mr-[5px] text-[20px]'>
                                      {passwordParameter.specialCharacterCheck
                                        ? 'done'
                                        : 'close'}
                                    </span>{' '}
                                    At least one special character
                                  </li>
                                </ul>
                              </div>
                              <div className='relative mb-[20px]'>
                                <label className='ml-[0] lg:ml-[10px] text-small-text !font-bold'>
                                  Confirm Password{' '}
                                  <span className='text-rose-600'>*</span>
                                </label>
                                <div className='relative'>
                                  <Input
                                    type={
                                      toggleVisibilityConfirmPassword
                                        ? 'text'
                                        : 'password'
                                    }
                                    name='confirmpassword'
                                    register={register}
                                    placeholder='Confirm your password'
                                    error={errors?.confirmpassword?.message}
                                    className='form-input'
                                    rootClassName=''
                                  />
                                  <div
                                    className='absolute top-1/2 -translate-y-1/2 mt-[0] right-2'
                                    x-data='{ open: false }'
                                  >
                                    <button
                                      type='button'
                                      onClick={() =>
                                        setToggleVisibilityConfirmPassword(
                                          !toggleVisibilityConfirmPassword,
                                        )
                                      }
                                      className='border-b border-b-primary hover:border-0 text-small-text'
                                    >
                                      Show
                                    </button>
                                  </div>
                                </div>
                              </div>
                              {/* <div className='relative mb-[20px]'>
                                <label className='ml-[0] lg:ml-[10px] text-small-text !font-bold'>
                                  Security{' '}
                                  <span className='text-rose-600'>*</span>
                                </label>
                                <div className='relative'>
                                  <Input
                                    type='password'
                                    name='securityAnswer'
                                    register={register}
                                    placeholder='Enter your Security Answer'
                                    error={errors?.securityAnswer?.message}
                                    className='form-input'
                                    rootClassName=''
                                  />
                                </div>
                              </div> */}
                              <div className=''>
                                <button
                                  type='submit'
                                  className='w-full btn btn-primary btn-xs uppercase !font-body !rounded-xs'
                                  id=''
                                >
                                  Reset Password
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </section>
          );
        },
      }}
    />
  );
};

export default ResetPassword;
