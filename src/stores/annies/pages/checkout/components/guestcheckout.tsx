import { useAppSelector } from '@/app/redux/hooks';
import GuestCheckoutController from '@/features/checkout/checkoutController/guestCheckoutController';
import { paths } from '@/utils/paths.constant';
import { CheckoutTextInput } from './checkoutInputs';

const GuestCheckout = () => {
  const { required, showCreateAccountScreen, showPasswordScreen } =
    useAppSelector((state) => state.checkout.guestCheckout);

  return (
    <>
      <GuestCheckoutController
        cases={{
          ready: ({
            Controller,
            creatAccountOnSubmit,
            passwordOnSubmit,
            emailOnSubmit,
            passwordControl,
            guestAccountControl,
            emailControl,
            guestAccountErrors,
            passwordErrors,
            emailErrors,
            guestAccountSubmitHandle,
            passowordSubmitHandle,
            emailSubmitHandle,
            emailTouchedFields,
            passwordTouchedFields,
            guuestAccountTouchedFields,
            continueAsGuest,
            changeConfirmPasswordVisibility,
            changePasswordVisibility,
            passwordVisbility,
            confirmPasswordVisbility,
            isEmployeeLoggedIn,
            passwordParameter,
          }) => {
            return (
              <>
                <div className='pb-[15px] mb-[15px] border-b border-b-[#D4CEB9]'>
                  {required && (
                    <>
                      <form onSubmit={emailSubmitHandle(emailOnSubmit)}>
                        <div className='w-full mb-[25px]'>
                          <label
                            htmlFor='email'
                            className='block text-small-text mb-[5px] ml-[15px] font-bold text-anchor'
                          >
                            Email
                            <span className='text-rose-600'>*</span>
                          </label>
                          <Controller
                            name='email'
                            control={emailControl}
                            render={({
                              field: { value, onChange, onBlur },
                            }) => (
                              <CheckoutTextInput
                                placeHolder='Email'
                                label='EMAIL'
                                additionalClass={''}
                                type={'text'}
                                name={'email'}
                                required={true}
                                value={value}
                                autoComplete='email'
                                onChange={onChange}
                                onBlur={onBlur}
                                touched={!!emailTouchedFields.email}
                                error={!!emailErrors?.email}
                              />
                            )}
                          />
                          {emailErrors?.email?.message && (
                            <p className='font-medium text-xs text-gray-darker'>
                              <div className='h-6 top-full left-0 text-red-500 text-[16px]'>
                                {emailErrors?.email?.message}
                              </div>
                            </p>
                          )}
                        </div>
                        {isEmployeeLoggedIn && (
                          <>
                            <div className='w-full text-center font-medium'>
                              <span>OR</span>
                            </div>
                            <div className='w-full mb-[25px]'>
                              <label
                                htmlFor='mobile'
                                className='block text-small-text mb-[5px] ml-[15px] font-bold text-anchor'
                              >
                                Mobile
                                <span className='text-rose-600'>*</span>
                              </label>
                              <Controller
                                name='mobile'
                                control={emailControl}
                                render={({
                                  field: { value, onChange, onBlur },
                                }) => (
                                  <CheckoutTextInput
                                    placeHolder='Mobile'
                                    label='MOBILE'
                                    additionalClass={''}
                                    type={'number'}
                                    name={'mobile'}
                                    required={true}
                                    value={value}
                                    autoComplete='number'
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    touched={!!emailTouchedFields.email}
                                    error={!!emailErrors?.mobile}
                                  />
                                )}
                              />
                              {emailErrors?.mobile?.message && (
                                <p className='font-medium text-xs text-gray-darker'>
                                  <div className='h-6 top-full left-0 text-red-500 text-[16px]'>
                                    {emailErrors?.mobile?.message}
                                  </div>
                                </p>
                              )}
                            </div>
                          </>
                        )}
                        <div className='flex flex-wrap justify-end items-center'>
                          <div className='mb-[20px] sm:mb-0'>
                            <button
                              type='submit'
                              className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'
                            >
                              Continue
                            </button>
                          </div>
                        </div>
                      </form>
                    </>
                  )}
                  {showPasswordScreen && (
                    <div id='LoginPassword'>
                      <div className='text-title-text font-semibold pb-[20px] mb-[20px] border-b border-gray-border'>
                        Welcome Back!
                      </div>
                      <div className='flex flex-wrap justify-between'>
                        <div className='w-full lg:max-w-[600px]'>
                          <div className='text-normal-text font-normal mb-[20px] tracking-normal'>
                            Please log in to your account
                          </div>

                          <form
                            onSubmit={passowordSubmitHandle(passwordOnSubmit)}
                          >
                            <div className='w-full mb-[25px]'>
                              <label
                                htmlFor='password'
                                className='block text-small-text mb-[5px] ml-[15px] font-bold text-anchor'
                              >
                                Password
                                <span className='text-rose-600'>*</span>
                              </label>
                              <Controller
                                name='password'
                                control={passwordControl}
                                render={({
                                  field: { value, onChange, onBlur },
                                }) => (
                                  <div className='relative'>
                                    <CheckoutTextInput
                                      placeHolder='Password'
                                      label='PASSWORD'
                                      additionalClass={''}
                                      type={
                                        passwordVisbility ? 'text' : 'password'
                                      }
                                      name={'password'}
                                      required={true}
                                      value={value}
                                      autoComplete='password'
                                      onChange={onChange}
                                      onBlur={onBlur}
                                      touched={!!passwordTouchedFields.password}
                                      error={!!passwordErrors?.password}
                                    />
                                    <div className='absolute top-1/2 -translate-y-1/2 mt-[0] right-2'>
                                      <button
                                        type='button'
                                        onClick={changePasswordVisibility}
                                        className='hover:border-0 text-small-text'
                                      >
                                        <span
                                          className={`material-symbols-outlined text-base mdi-${
                                            passwordVisbility
                                              ? 'eye-outline'
                                              : 'eye-off-outline'
                                          }`}
                                        >
                                          {passwordVisbility
                                            ? 'visibility'
                                            : 'visibility_off'}
                                        </span>
                                      </button>
                                    </div>
                                  </div>
                                )}
                              />
                              {passwordErrors?.password?.message && (
                                <p className='font-medium text-xs text-gray-darker'>
                                  <div className='h-6 top-full left-0 text-red-500 text-[16px]'>
                                    {passwordErrors?.password?.message}
                                  </div>
                                </p>
                              )}
                            </div>
                            <div className='flex justify-between items-center'>
                              <div>
                                <a
                                  href={paths.forget}
                                  className='text-anchor test-default-text !font-[600] border-b border-b-primary'
                                >
                                  Forgot Password?
                                </a>
                              </div>
                              <div className='flex flex-wrap justify-end items-center'>
                                <div className='mb-[20px] sm:mb-0'>
                                  <button
                                    type='submit'
                                    className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'
                                  >
                                    Continue
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                  {showCreateAccountScreen && (
                    <div id='LoginPassword'>
                      <div className='text-title-text font-semibold pb-[20px] mb-[20px] border-b border-gray-border'>
                        Create an Account
                      </div>
                      <div className='flex flex-wrap justify-between'>
                        <div className='w-full lg:max-w-[600px]'>
                          <div className='flex flex-wrap items-center justify-between'>
                            <div>
                              <div className='text-sub-text font-normal tracking-normal'>
                                Welcome! It looks like you’re new here.
                              </div>
                              <div className='text-sub-text font-normal mb-[20px] tracking-normal'>
                                Please set a password to create a new account.
                              </div>
                            </div>

                            {showCreateAccountScreen && (
                              <div className=''>
                                <button
                                  className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'
                                  onClick={continueAsGuest}
                                >
                                  CHECKOUT AS GUEST
                                </button>
                              </div>
                            )}
                          </div>

                          <form
                            onSubmit={guestAccountSubmitHandle(
                              creatAccountOnSubmit,
                            )}
                          >
                            <div className='w-full mb-[25px]'>
                              <label
                                htmlFor='password'
                                className='block text-small-text mb-[5px] ml-[15px] font-bold text-anchor'
                              >
                                Password
                                <span className='text-rose-600'>*</span>
                              </label>
                              <Controller
                                name='password'
                                control={guestAccountControl}
                                render={({
                                  field: { value, onChange, onBlur },
                                }) => (
                                  <div className='relative'>
                                    <CheckoutTextInput
                                      placeHolder='Password'
                                      label='PASSWORD'
                                      additionalClass={''}
                                      type={
                                        passwordVisbility ? 'text' : 'password'
                                      }
                                      name={'password'}
                                      required={true}
                                      value={value}
                                      autoComplete='email'
                                      onChange={onChange}
                                      onBlur={onBlur}
                                      touched={
                                        !!guuestAccountTouchedFields.password
                                      }
                                      error={!!guestAccountErrors.password}
                                    />
                                    <div className='absolute top-1/2 -translate-y-1/2 mt-[0] right-2'>
                                      <button
                                        type='button'
                                        onClick={changePasswordVisibility}
                                        className=' hover:border-0 text-small-text'
                                      >
                                        <span
                                          className={`material-symbols-outlined text-base mdi-${
                                            passwordVisbility
                                              ? 'eye-outline'
                                              : 'eye-off-outline'
                                          }`}
                                        >
                                          {passwordVisbility
                                            ? 'visibility'
                                            : 'visibility_off'}
                                        </span>
                                      </button>
                                    </div>
                                  </div>
                                )}
                              />
                              {guestAccountErrors?.password?.message && (
                                <p className='font-medium text-xs text-gray-darker '>
                                  <div className='h-6 top-full left-0 text-red-500 text-[16px]'>
                                    {guestAccountErrors?.password?.message}
                                  </div>
                                </p>
                              )}
                              <div className='mb-[20px] mt-2 ml-[0]'>
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
                            </div>
                            <div className='w-full mb-[25px]'>
                              <label
                                htmlFor='confirmPassword'
                                className='block text-small-text mb-[5px] ml-[15px] font-bold text-anchor'
                              >
                                Confirm Password
                                <span className='text-rose-600'>*</span>
                              </label>
                              <Controller
                                name='confirmPassword'
                                control={guestAccountControl}
                                render={({
                                  field: { value, onChange, onBlur },
                                }) => (
                                  <div className='relative'>
                                    <CheckoutTextInput
                                      placeHolder='Confirm Password'
                                      label='CONFIRM PASSWORD'
                                      additionalClass={''}
                                      type={
                                        confirmPasswordVisbility
                                          ? 'text'
                                          : 'password'
                                      }
                                      name={'confirmPassword'}
                                      required={true}
                                      value={value}
                                      autoComplete='password'
                                      onChange={onChange}
                                      onBlur={onBlur}
                                      touched={
                                        !!guuestAccountTouchedFields.confirmPassword
                                      }
                                      error={
                                        !!guestAccountErrors?.confirmPassword
                                      }
                                    />
                                    <div className='absolute top-1/2 -translate-y-1/2 mt-[0] right-2'>
                                      <button
                                        type='button'
                                        onClick={
                                          changeConfirmPasswordVisibility
                                        }
                                        className='hover:border-0 text-small-text'
                                      >
                                        <span
                                          className={`material-symbols-outlined text-base mdi-${
                                            confirmPasswordVisbility
                                              ? 'eye-outline'
                                              : 'eye-off-outline'
                                          }`}
                                        >
                                          {confirmPasswordVisbility
                                            ? 'visibility'
                                            : 'visibility_off'}
                                        </span>
                                      </button>
                                    </div>
                                  </div>
                                )}
                              />
                              {guestAccountErrors?.confirmPassword?.message && (
                                <p className='font-medium text-xs text-gray-darker'>
                                  <div className='h-6 top-full left-0 text-red-500 text-[16px]'>
                                    {
                                      guestAccountErrors?.confirmPassword
                                        ?.message
                                    }
                                  </div>
                                </p>
                              )}
                            </div>
                            <div className='flex flex-wrap justify-end items-center'>
                              <div className='mb-[20px] sm:mb-0'>
                                <button
                                  type='submit'
                                  className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'
                                >
                                  Continue
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            );
          },
        }}
      />
    </>
  );
};

export default GuestCheckout;
