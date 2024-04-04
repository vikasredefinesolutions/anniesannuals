'use client';
import { useAppSelector } from '@/app/redux/hooks';
import EmployeeLoginScreenController from '@/features/employeeController/loginController';
import Loader from '@/shared/Components/Loader';
import { CheckoutTextInput } from '../checkout/components/checkoutInputs';

const EmployeeLoginScreen = () => {
  const { isLoading } = useAppSelector((state) => state.common);
  return (
    <>
      <>
        <EmployeeLoginScreenController
          cases={{
            ready: ({
              Controller,
              emailOnSubmit,
              emailControl,
              emailErrors,
              emailSubmitHandle,
              emailTouchedFields,
            }) => {
              return (
                <>
                  <section className='bg-tertiary pt-[60px] pb-[30px] h-full'>
                    <div className='flex justify-center items-center text-medium-text font-bold text-anchor'>
                      Please input customer email address or phone number
                    </div>
                    <div className='p-[15px] mb-[15px] border-b border-b-[#D4CEB9] w-full mt-[30px] flex justify-center items-center '>
                      <form
                        onSubmit={emailSubmitHandle(emailOnSubmit)}
                        className='w-1/2'
                      >
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
                  </section>
                </>
              );
            },
          }}
        />
      </>
      {isLoading && <Loader />}
    </>
  );
};

export default EmployeeLoginScreen;
