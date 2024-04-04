'use client';
import Input from '@/components/common/input';
import EmailPasswordController from '@/features/myAccount/emailPassword/controller';
import Image from '@/shared/Components/Image';
import Loader from '@/shared/Components/Loader';
import { getUserId } from '@/shared/utils/cookie.helper';
import { paths } from '@/utils/paths.constant';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect } from 'react';
import SideLayout from '../../shared/components/myAccountLayout';

const EmailPassword = () => {
  const userId = getUserId();
  const router = useRouter();

  useEffect(() => {
    if (!userId) {
      router.push(paths.login);
    }
  }, [userId]);

  return (
    <EmailPasswordController
      configs={null}
      cases={{
        loading: () => <Loader />,
        empty: () => <h1>empty</h1>,
        ready: ({
          onSubmit,
          hookForm: { errors, register, handleSubmit },
          show,
          setShow,
          showTwo,
          setShowTwo,
          userData,
          passwordShown,
          togglePasswordVisiblity,
          newPasswordShown,
          toggleNewPasswordVisiblity,
          decryptedPassword,
          Controller,
          control,
          passwordChecker,
          passwordParameter,
          setError,
        }) => (
          <>
            <SideLayout checkAccount={true}>
              <h1 className='text-2xl-text mb-[20px] font-bold font-sub'>
                Email & Password
              </h1>
              <div className='mb-[40px] border-t border-t-gray-border'></div>
              <div className='p-[15px] lg:p-[30px] drop-shadow-md rounded-sm bg-[#FFFFFF] mb-[40px] panel-01 tab-content'>
                <div className='w-full'>
                  <div className='w-full md:grid md:grid-cols-6 gap-x-[15px] items-center pb-[30px]'>
                    <div className='col-span-1'>
                      <span className='text-small-text !font-bold'>
                        Email Address
                      </span>
                    </div>
                    <div className='col-span-4 mb-[10px] lg:mb-[0]'>
                      <div className='text-normal-text !font-bold'>
                        {userData?.email}
                      </div>
                    </div>
                    {/* <div className='col-span-1 text-right flex justify-start lg:justify-end'>
                      <CustomLink
                        href={undefined}
                        className='btn btn-outline-primary btn-sm uppercase !font-body !rounded-xs !inline-flex gap-[10px] items-center'
                        onClick={() => setShow(!show)}
                      >
                        <span>
                          <Image src={'images/edit.svg'} alt={'editImage'} />
                        </span>
                        <span>Edit</span>
                      </CustomLink>
                    </div> */}
                  </div>
                  {/* {show && (
                    <div className='w-full md:grid md:grid-cols-6 gap-x-[15px] items-center pb-[30px]'>
                      <div className='col-span-1'>&nbsp;</div>
                      <div className='col-span-4'>
                        <div className='max-w-full lg:max-w-2xl'>
                          <div className='p-[15px] lg:p-[30px] bg-[#F6EDFF] mb-[20px]'>
                            <div className='text-anchor text-small-text'>
                              <span className='!font-[600]'>
                                We care about your security.
                              </span>
                              &nbsp;Before you reset your email address, please
                              note that stored credit card data will be erased
                              in order to protect your account and your
                              identity.
                            </div>
                          </div>
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                              <div className='w-full mb-[20px]'>
                                <Input
                                  name='newemailaddress'
                                  label=' new email address'
                                  rootClassName='mb-2'
                                  register={register}
                                  placeholder='Enter your new email address'
                                  // error={errors?.Firstname?.message}
                                  type='email'
                                />
                              </div>
                              <div className='w-full mb-[20px]'>
                                <div className='relative'>
                                  <Input
                                    name='password'
                                    label='password'
                                    rootClassName='mb-2'
                                    register={register}
                                    placeholder='Enter your password'
                                    // error={errors?.Firstname?.message}
                                    type={passwordShown ? 'text' : 'password'}
                                  />
                                  <div className='absolute top-1/2 -translate-y-1/2 mt-[0] right-2'>
                                    <a
                                      onClick={togglePasswordVisiblity}
                                      className='border-b border-b-primary hover:border-0 text-small-text'
                                    >
                                      Show
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div className='max-w-lg mt-[20px] flex gap-x-[15px]'>
                                <button
                                  type='submit'
                                  className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'
                                >
                                  Save Email
                                </button>
                                <a
                                  href=''
                                  className='btn btn-outline-primary btn-sm uppercase !font-body !rounded-xs !inline-flex gap-[10px] items-center'
                                >
                                  cancel
                                </a>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className='col-span-1 text-right flex justify-end'>
                        &nbsp;
                      </div>
                    </div>
                  )} */}
                </div>
                <div className='w-full border-t border-t-gray-border'>
                  <div className='w-full md:grid md:grid-cols-6 gap-x-[15px] items-center pt-[30px]'>
                    <div className='col-span-1'>
                      <span className='text-small-text !font-bold'>
                        Password
                      </span>
                    </div>
                    <div className='col-span-4 mb-[10px] lg:mb-[0]'>
                      <div className='text-normal-text !font-bold'>
                        {decryptedPassword.split('').map((res) => '*')}
                      </div>
                    </div>
                    <div className='col-span-1 text-right flex justify-start lg:justify-end'>
                      <button
                        className='btn btn-outline-primary btn-sm uppercase !font-body !rounded-xs !inline-flex gap-[10px] items-center'
                        onClick={() => setShowTwo(!showTwo)}
                      >
                        <span>
                          <Image
                            src={'/assets/images/icon-edit.svg'}
                            alt={'editImage'}
                            isStatic
                          />
                        </span>
                        <span>Edit</span>
                      </button>
                    </div>
                  </div>
                  {showTwo && (
                    <div className='w-full md:grid md:grid-cols-6 gap-x-[15px] items-center pt-[30px]'>
                      <div className='col-span-1'>&nbsp;</div>
                      <div className='col-span-4'>
                        <div className='max-w-full lg:max-w-2xl'>
                          <div className='p-[15px] lg:p-[30px] bg-[#F6EDFF] mb-[20px]'>
                            <div className='text-small-text text-anchor'>
                              <span className='font-[500]'>
                                To protect your account, we will erase your
                                stored credit card information when you change
                                your password.
                              </span>
                            </div>
                          </div>
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='max-w-full lg:max-w-2xl'>
                              <div className='relative mb-[20px]'>
                                <div className='relative'>
                                  <Input
                                    name='currentpassword'
                                    label='Current Password'
                                    rootClassName='mb-2'
                                    register={register}
                                    placeholder='Enter your  password'
                                    error={errors?.currentpassword?.message}
                                    type='password'
                                  />
                                </div>
                              </div>
                              <div className='relative mb-[20px]'>
                                <div className='relative'>
                                  <label className='block text-small-text mb-[5px] font-bold uppercase'>
                                    New Password
                                    <span className='text-rose-600'>*</span>
                                  </label>
                                  <Controller
                                    name='newpassword'
                                    control={control}
                                    render={() => (
                                      <input
                                        name='newpassword'
                                        className='form-input'
                                        {...register('newpassword')}
                                        error={errors?.newpassword?.message}
                                        placeholder='Enter your password'
                                        onChange={(
                                          e: ChangeEvent<HTMLInputElement>,
                                        ) => {
                                          setError('newpassword', '');
                                          passwordChecker(e.target.value);
                                        }}
                                        type={
                                          passwordShown ? 'text' : 'password'
                                        }
                                      />
                                    )}
                                  />{' '}
                                  {errors?.newpassword?.message && (
                                    <p className='font-medium text-xs text-gray-darker'>
                                      <div className='h-6 top-full left-0 text-red-500 text-[16px]'>
                                        {errors?.newpassword?.message}
                                      </div>
                                    </p>
                                  )}
                                  <div
                                    className={`${
                                      !!errors?.newpassword?.message
                                        ? 'top-[37%]'
                                        : 'top-1/2'
                                    } absolute  mt-[0] right-2`}
                                  >
                                    <button
                                      type='button'
                                      onClick={togglePasswordVisiblity}
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
                                <div className='relative'>
                                  <Input
                                    name='confirmpassword'
                                    label='Confrim Password'
                                    rootClassName='mb-2'
                                    register={register}
                                    placeholder='Re-enter your password'
                                    error={errors?.confirmpassword?.message}
                                    type={
                                      newPasswordShown ? 'text' : 'password'
                                    }
                                  />
                                  <div
                                    className={`${
                                      !!errors?.confirmpassword?.message
                                        ? 'top-[37%]'
                                        : 'top-1/2'
                                    } absolute  mt-[0] right-2`}
                                  >
                                    <button
                                      type='button'
                                      onClick={toggleNewPasswordVisiblity}
                                      className='border-b border-b-primary hover:border-0 text-small-text'
                                    >
                                      Show
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className='max-w-lg mt-[20px] flex gap-x-[15px]'>
                                <button
                                  type='submit'
                                  className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'
                                >
                                  Save Password
                                </button>
                                <button
                                  className='btn btn-outline-primary btn-sm uppercase !font-body !rounded-xs !inline-flex gap-[10px] items-center'
                                  type='button'
                                  onClick={() => setShowTwo(!showTwo)}
                                >
                                  cancel
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className='col-span-1 text-right flex justify-end'>
                        &nbsp;
                      </div>
                    </div>
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

export default EmailPassword;
