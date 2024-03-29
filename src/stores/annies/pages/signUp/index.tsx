'use client';
import { useAppSelector } from '@/app/redux/hooks';
import CheckBox from '@/components/common/checkbox';
import Input from '@/components/common/input';
import SignupController from '@/features/user/userSignUp/controller';
import CustomLink from '@/shared/Components/CustomLink';
import Loader from '@/shared/Components/Loader';
import { paths } from '@/utils/paths.constant';
import React, { ChangeEvent } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const SignUpPage: React.FC = () => {
  const { isLoading } = useAppSelector((state) => state.common);
  return (
    <>
      <SignupController
        config={{
          enableFeatures: {
            rememberMeButton: false,
            confirmPassword: true,
          },
          requiredValidationSchema: {
            isFirstNameRequired: true,
            isLastNameRequired: true,
            isEmailRequired: true,
            isConfirmPassword: true,
            isPhoneNumberRequired: true,
          },
        }}
        cases={{
          view: ({
            passwordShown,
            setPasswordShown,
            conformPassowrdPasswordShown,
            setConformPassowrdPasswordShown,
            hookForm: { errors, handleSubmit, register },
            onSubmit,
            errorMessage,
            onChange,
            verifiedCaptcha,
            verifyCaptcha,
            setPassword,
            passwordParameter,
          }) => {
            return (
              <>
                <section className='relative pt-[30px] pb-[30px] bg-tertiary'>
                  <div className='container mx-auto'>
                    <div className='z-50 justify-center items-center text-default-text'>
                      <div className='w-full h-full flex items-center justify-center'>
                        <form
                          className='relative px-[16px] w-full max-w-lg h-auto'
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          <div className='relative bg-[#ffffff] shadow h-full rounded-sm p-[30px]'>
                            <div className='flex justify-start items-center pb-[25px]'>
                              <h1 className='font-[600] text-large-text font-sub'>
                                Create An Account
                              </h1>
                            </div>
                            <div>
                              <div className='Login-Main'>
                                <div className='mb-[20px] text-small-text'>
                                  Create an account and benefit from a more
                                  personal shopping experience and quicker
                                  online checkout.
                                </div>
                                <div className='mb-[20px]'>
                                  <div className='text-small-text !font-bold mb-[20px]'>
                                    Why create an account?
                                  </div>
                                  <div className='block md:flex justify-start items-center'>
                                    <div className='w-full lg:w-1/2 flex items-center mb-[20px]'>
                                      <span className='bg-[#F6EDFF] h-[30px] w-[30px] rounded-full flex justify-center items-center text-small-text mr-[5px]'>
                                        <svg
                                          xmlns='http://www.w3.org/2000/svg'
                                          width='16'
                                          height='15.402'
                                          viewBox='0 0 16 15.402'
                                        >
                                          <path
                                            id='Path_17'
                                            data-name='Path 17'
                                            d='M24.373,26.378a.574.574,0,1,1-.574-.569.574.574,0,0,1,.574.569Zm-7.427,0a.568.568,0,1,0-.006,0Zm8.576-1.71H15.585a.357.357,0,0,1-.07-.706L25.6,22.386a.569.569,0,0,0,.477-.464L27.22,15.65a.567.567,0,0,0-.46-.664.58.58,0,0,0-.666.458l-.118.677H15.011l.025-.047A2.337,2.337,0,0,0,12.942,12.7H11.8a.576.576,0,0,0-.571.571.569.569,0,0,0,.571.569h1.145a1.192,1.192,0,0,1,1.067,1.723l-.439.871a.023.023,0,0,1,0,.019.652.652,0,0,0-.031.118.639.639,0,0,1-.023.105v.019a.557.557,0,0,0,.019.1.382.382,0,0,0,.017.095L15.7,22.78l-.361.058a1.489,1.489,0,0,0-.489,2.771,1.71,1.71,0,1,0,3.239.769,1.65,1.65,0,0,0-.107-.569h4.213a1.805,1.805,0,0,0-.1.569,1.714,1.714,0,1,0,3.328-.569h.105a.571.571,0,1,0,0-1.141Z'
                                            transform='translate(-11.23 -12.7)'
                                            fill='#634b91'
                                            fill-rule='evenodd'
                                          />
                                        </svg>
                                      </span>
                                      <span className='text-small-text'>
                                        Checkout quickly and easily
                                      </span>
                                    </div>
                                    <div className='w-full lg:w-1/2 flex items-center mb-[20px]'>
                                      <span className='bg-[#F6EDFF] h-[30px] w-[30px] rounded-full flex justify-center items-center text-small-text mr-[5px]'>
                                        <svg
                                          xmlns='http://www.w3.org/2000/svg'
                                          width='14.334'
                                          height='18'
                                          viewBox='0 0 14.334 18'
                                        >
                                          <g
                                            id='Group_38'
                                            data-name='Group 38'
                                            transform='translate(-19.527 -11.734)'
                                          >
                                            <path
                                              id='Path_18'
                                              data-name='Path 18'
                                              d='M26.694,11.734A7.167,7.167,0,0,0,19.527,18.9c0,5.957,7.167,10.833,7.167,10.833S33.862,24.5,33.862,18.9a7.166,7.166,0,0,0-7.167-7.166Zm1.455,6.255a.087.087,0,0,0-.036-.072l-3.255-2.38a.089.089,0,0,0-.1,0l-1.461,1.01a.088.088,0,0,0-.039.073.087.087,0,0,0,.039.073L26.644,19a.088.088,0,0,0,.1,0l1.367-.944a.088.088,0,0,0,.038-.071Zm2.143-.929a.09.09,0,0,0-.091.006l-3.284,2.27a.087.087,0,0,0-.038.073v3.481a.089.089,0,0,0,.047.078.087.087,0,0,0,.041.01.093.093,0,0,0,.051-.016l3.284-2.27a.088.088,0,0,0,.039-.073V17.139a.089.089,0,0,0-.048-.078Zm-3.822,2.275-3.285-2.269a.088.088,0,0,0-.139.073V20.62a.088.088,0,0,0,.039.073l3.284,2.27a.093.093,0,0,0,.051.016.087.087,0,0,0,.041-.01.089.089,0,0,0,.047-.078V19.409a.088.088,0,0,0-.038-.073Zm-1.2-4.016,3.255,2.38a.093.093,0,0,0,.053.017.088.088,0,0,0,.05-.016l1.463-1.011a.087.087,0,0,0,0-.145l-3.35-2.315a.09.09,0,0,0-.1,0l-1.368.945a.09.09,0,0,0-.038.073.089.089,0,0,0,.036.072Z'
                                              fill='#634b91'
                                              fill-rule='evenodd'
                                            />
                                          </g>
                                        </svg>
                                      </span>
                                      <span className='text-small-text'>
                                        View your order status and history
                                      </span>
                                    </div>
                                  </div>
                                  <div className='block md:flex justify-start items-center'>
                                    <div className='w-full lg:w-1/2 flex items-center mb-[20px] lg:mb-[0px]'>
                                      <span className='bg-[#F6EDFF] h-[30px] w-[30px] rounded-full flex justify-center items-center text-small-text mr-[5px]'>
                                        <svg
                                          xmlns='http://www.w3.org/2000/svg'
                                          width='15.091'
                                          height='18'
                                          viewBox='0 0 15.091 18'
                                        >
                                          <path
                                            id='Union_10'
                                            data-name='Union 10'
                                            d='M2047.116,17.993a.277.277,0,0,1-.2-.177l-.9-2.471-.1.105a.538.538,0,0,1-.777,0l-.1-.1-.9,2.471a.275.275,0,0,1-.257.183.269.269,0,0,1-.193-.082l-.965-1-1.748.774a.268.268,0,0,1-.294-.052.29.29,0,0,1-.075-.3l1.25-3.879-1.265,0a.558.558,0,0,1-.548-.566v-2.71l-1.891-2a.578.578,0,0,1,.008-.8l1.883-1.951V2.709a.558.558,0,0,1,.548-.566h2.629L2045.141.16a.551.551,0,0,1,.777,0l1.919,1.982h2.627a.558.558,0,0,1,.548.566V5.435l1.919,1.968a.583.583,0,0,1,0,.8l-1.919,1.982V12.9a.558.558,0,0,1-.548.566l-1.265,0,1.251,3.878a.29.29,0,0,1-.075.3.267.267,0,0,1-.294.052l-1.748-.774-.966,1a.269.269,0,0,1-.194.083A.265.265,0,0,1,2047.116,17.993Zm-6.521-12.558a.586.586,0,0,1-.154.4l-1.892,1.959,1.892,2a.582.582,0,0,1,.154.4V12.9l1.623,0,1.007,0a.54.54,0,0,1,.386.165l1.514,1.566.4.416,1.92-1.982a.54.54,0,0,1,.386-.165l1.006,0,1.623,0v-2.71a.574.574,0,0,1,.16-.4l1.919-1.982-1.919-1.969a.585.585,0,0,1-.16-.4V2.709h-2.629a.54.54,0,0,1-.385-.165L2045.531.562l-1.92,1.982a.539.539,0,0,1-.386.165h-2.629Zm4.934,7.184a4.739,4.739,0,0,1-4.66-4.814,4.663,4.663,0,1,1,9.32,0,4.739,4.739,0,0,1-4.66,4.814Zm-.809-6.138a.275.275,0,0,1-.206.156l-1.83.283,1.331,1.329a.289.289,0,0,1,.079.251l-.306,1.883,1.634-.895a.266.266,0,0,1,.255,0l1.643.882L2047,8.489a.29.29,0,0,1,.077-.251L2048.4,6.9l-1.832-.266a.275.275,0,0,1-.207-.154l-.826-1.712Z'
                                            transform='translate(-2038 0)'
                                            fill='#634b91'
                                          />
                                        </svg>
                                      </span>
                                      <span className='text-small-text'>
                                        Get Updates
                                      </span>
                                    </div>
                                    <div className='w-full lg:w-1/2 flex items-center'>
                                      <span className='bg-[#F6EDFF] h-[30px] w-[30px] rounded-full flex justify-center items-center text-[14px] text-primary mr-[5px]'>
                                        <svg
                                          xmlns='http://www.w3.org/2000/svg'
                                          width='14.56'
                                          height='14'
                                          viewBox='0 0 14.56 14'
                                        >
                                          <path
                                            id='Icon_ionic-ios-heart'
                                            data-name='Icon ionic-ios-heart'
                                            d='M14.015,3.938H13.98a3.982,3.982,0,0,0-3.325,1.82A3.982,3.982,0,0,0,7.33,3.938H7.3a3.957,3.957,0,0,0-3.92,3.955,8.52,8.52,0,0,0,1.673,4.644,29.319,29.319,0,0,0,5.607,5.4,29.318,29.318,0,0,0,5.607-5.4,8.52,8.52,0,0,0,1.673-4.644A3.957,3.957,0,0,0,14.015,3.938Z'
                                            transform='translate(-3.375 -3.938)'
                                            fill='#634b91'
                                          />
                                        </svg>
                                      </span>
                                      <span className='text-small-text'>
                                        Create a Wishlist of Favorite Plants
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <Input
                                  name='Firstname'
                                  onChange={onChange}
                                  label='First Name'
                                  rootClassName='mb-2'
                                  register={register}
                                  placeholder='Enter First Name'
                                  error={errors?.Firstname?.message}
                                  type='text'
                                />
                                <Input
                                  name='LastName'
                                  onChange={onChange}
                                  rootClassName='mb-2'
                                  label='Last Name'
                                  register={register}
                                  placeholder='Enter Last Name'
                                  error={errors?.LastName?.message}
                                  type='text'
                                />
                                <Input
                                  onChange={onChange}
                                  type='email'
                                  name='email'
                                  rootClassName='mb-2'
                                  label='Email'
                                  error={errors?.email?.message}
                                  register={register}
                                  placeholder='Enter your email'
                                />
                                <Input
                                  name='phone'
                                  onChange={onChange}
                                  rootClassName='mb-2'
                                  label='Phone Number'
                                  register={register}
                                  placeholder='Enter Phone Number'
                                  error={errors?.phone?.message}
                                  type='number'
                                />
                                <div className='relative'>
                                  <label className='block text-small-text mb-[5px] font-bold uppercase'>
                                    Password
                                    <span className='text-rose-600'>*</span>
                                  </label>
                                  <input
                                    type={`${
                                      passwordShown ? 'text' : 'password'
                                    }`}
                                    name='password'
                                    {...register('password')}
                                    className='form-input'
                                    onChange={(
                                      e: ChangeEvent<HTMLInputElement>,
                                    ) => setPassword(e.target.value)}
                                    placeholder='Enter your Password'
                                  />

                                  {errors?.password?.message && (
                                    <p className='font-medium text-xs text-gray-darker'>
                                      <div className='h-6 top-full left-0 text-red-500 text-[16px]'>
                                        {errors?.password?.message}
                                      </div>
                                    </p>
                                  )}
                                  {/* <Input
                                    onChange={(
                                      e: ChangeEvent<HTMLInputElement>,
                                    ) => setPassword(e.target.value)}
                                    type={`${
                                      passwordShown ? 'text' : 'password'
                                    }`}
                                    name='password'
                                    rootClassName='mb-4'
                                    label='Password'
                                    register={register}
                                    placeholder='Enter your Password'
                                    error={errors?.password?.message}
                                  /> */}

                                  <div
                                    className={`${
                                      !!errors?.password?.message
                                        ? 'top-[33%]'
                                        : 'top-1/2'
                                    } absolute  mt-[0] right-2`}
                                  >
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setPasswordShown(!passwordShown);
                                      }}
                                      className='border-b border-b-primary hover:border-0 text-small-text'
                                    >
                                      Show
                                    </button>
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
                                <div className='relative'>
                                  <Input
                                    onChange={onChange}
                                    type={
                                      conformPassowrdPasswordShown
                                        ? 'text'
                                        : 'password'
                                    }
                                    name='confirmPassword'
                                    label='Confirm Password'
                                    rootClassName='mb-6'
                                    register={register}
                                    placeholder='Re-enter Password'
                                    error={errors?.confirmPassword?.message}
                                  />
                                  <div
                                    className={`${
                                      !!errors?.confirmPassword?.message
                                        ? 'top-[33%]'
                                        : 'top-1/2'
                                    } absolute  mt-[0] right-2`}
                                  >
                                    <a
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setConformPassowrdPasswordShown(
                                          !conformPassowrdPasswordShown,
                                        );
                                      }}
                                      className='border-b cursor-pointer border-b-primary hover:border-0 text-small-text'
                                    >
                                      Show
                                    </a>
                                  </div>
                                </div>
                                {/* <CheckBox
                                  onChange={onChange}
                                  type='checkbox'
                                  name='keepme'
                                  label=' I want to get the latest information and deals via
                          email.'
                                /> */}
                                <CheckBox
                                  onChange={onChange}
                                  type='checkbox'
                                  name='ChkKeepMeLogged'
                                  className='text-default-test'
                                  label='Keep me signed in'
                                  rootClassName='mb-2'
                                />

                                <ReCAPTCHA
                                  className='mb-[20px]'
                                  sitekey={
                                    process.env.NEXT_PUBLIC_RECAPTCHASITEKEY ||
                                    ''
                                  }
                                  onChange={verifyCaptcha}
                                />

                                <div className='mb-[30px]'>
                                  <button
                                    type='submit'
                                    className={`w-full btn btn-primary btn-sm uppercase !font-body !rounded-xs ${
                                      !(verifiedCaptcha === 'VALID') &&
                                      'opacity-50'
                                    }`}
                                    id=''
                                    disabled={verifiedCaptcha !== 'VALID'}
                                  >
                                    Create Account
                                  </button>
                                </div>
                                <div className='mb-[20px] text-[16px] text-primary text-left'>
                                  By registering for an account, you agree to
                                  our&nbsp;
                                  <CustomLink
                                    href='/terms-and-conditions.html'
                                    className='border-b border-[#295B4CFF] underline'
                                  >
                                    Terms of Use
                                  </CustomLink>
                                  . Please read our &nbsp;
                                  <CustomLink
                                    href='/privacy-policy.html'
                                    title=''
                                    className='border-b border-[#295B4CFF] underline'
                                  >
                                    Privacy Notice
                                  </CustomLink>
                                  .
                                </div>
                                <div className='mb-[20px] text-[16px] text-[#295B4CFF] text-center !font-bold !font-sub'>
                                  Already have an Account?
                                </div>
                                <div className=''>
                                  <CustomLink
                                    href={paths.login}
                                    className='w-full inline-flex justify-center text-[16px] rounded-xs border border-primary text-[#295B4C] font-semibold uppercase py-[10px] text-center'
                                  >
                                    Sign In
                                  </CustomLink>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </section>
                {isLoading && <Loader />}
              </>
            );
          },
        }}
      />
    </>
  );
};

export default SignUpPage;
