'use client';
import Input from '@/components/common/input';
import AccountSettingController from '@/features/myAccount/accountSetting/controller';
import Image from '@/shared/Components/Image';
import Loader from '@/shared/Components/Loader';
import { getUserId } from '@/shared/utils/cookie.helper';
import { useRouter } from 'next/navigation';
import SideLayout from '../../shared/components/myAccountLayout';

const AccountSettings = () => {
  const userId = getUserId();
  const router = useRouter();

  if (!userId) {
    router.push('sign-in.html');
    return;
  }

  return (
    <>
      <AccountSettingController
        configs={null}
        cases={{
          empty: () => <h2>Empty</h2>,
          loading: () => <Loader />,
          ready: ({
            successMsg,
            onSubmit,
            hookForm: { errors, register, handleSubmit },
            activeCurrency,
            activeFlag,
            currencyData,
            handleCurrency,
            open,
            setOpen,
            userData,
            securityQuestion,
            securityQuestionHookForm: {
              securityQuestionErros,
              securityQuesRegister,
              securityQuestionHandleSubmit,
            },
            securityQuestionSubmit,
            updatableStatus,
            setUpdatableStatus,
          }) => {
            return (
              <>
                <SideLayout checkAccount={true}>
                  <h1 className='text-2xl-text mb-[20px] font-bold font-sub'>
                    Account Settings
                  </h1>
                  <div className='mb-[40px] border-t border-t-gray-border'></div>
                  {successMsg && (
                    <div className='bg-[#ECFFF3] border border-[#9BFFC0] rounded-[10px] p-3 flex mb-[20px]'>
                      <Image
                        src={'/assets/images/success-green.png'}
                        alt={'successIcon'}
                        isStatic
                        className={''}
                      />
                      <div className='text-green-700'>
                        <div>
                          Your account information has been successfully saved!
                        </div>
                      </div>
                    </div>
                  )}
                  <div className='p-[15px] lg:p-[30px] shadow-md rounded-sm bg-[#ffffff] mb-[40px] panel-01 tab-content'>
                    <div className='max-w-lg'>
                      {/* <div className='w-full mb-[20px]'>
                        <label
                          htmlFor='question'
                          className='block text-small-text mb-[5px] ml-[15px] font-bold uppercase'
                        >
                          Username
                        </label>
                        <input
                          className='form-input'
                          style={{ backgroundColor: 'rgb(220,220,220)' }}
                          value={userData?.name}
                          placeholder='John123'
                          type='text'
                          disabled
                        />
                      </div> */}
                      {/* <button
                        type='submit'
                        className='flex gap-x-[15px] mb-[20px]'
                      >
                        <a className='btn btn-primary btn-sm uppercase !font-body !rounded-xs !bg-[#C4CCE0] !border-[#C4CCE0]'>
                          Save user name
                        </a>
                      </button> */}
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className='w-full'>
                        <div className='max-w-lg mt-[20px]'>
                          <div className='text-title-text mb-[20px] font-bold font-sub'>
                            Personal Information
                          </div>
                          <div className='w-full mb-[20px]'>
                            <Input
                              name='firstname'
                              label='First Name'
                              rootClassName='mb-2'
                              register={register}
                              placeholder='Enter your first name'
                              error={errors?.firstname?.message}
                              type='text'
                            />
                          </div>
                          <div className='w-full mb-[20px]'>
                            <Input
                              name='lastname'
                              label='Last Name'
                              rootClassName='mb-2'
                              register={register}
                              placeholder='Enter your last name'
                              error={errors?.lastname?.message}
                              type='text'
                            />
                          </div>
                          <div className='w-full mb-[20px]'>
                            <Input
                              name='phonenumber'
                              label='Phone Number'
                              rootClassName='mb-2'
                              register={register}
                              placeholder='Enter your phone number'
                              error={errors?.phonenumber?.message}
                              type='text'
                            />
                          </div>
                          <div className='w-full mb-[20px]'>
                            <label
                              htmlFor='question'
                              className='block text-small-text mb-[5px] ml-[15px] font-bold uppercase'
                            >
                              Email
                              <span className='text-rose-600'> *</span>
                            </label>
                            <input
                              name='email'
                              className='form-input'
                              style={{ backgroundColor: 'rgb(220,220,220)' }}
                              type='email'
                              value={userData?.email}
                              disabled
                            />
                          </div>

                          <button
                            type='submit'
                            className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'
                          >
                            save personal information
                          </button>
                        </div>
                      </div>
                    </form>

                    <form
                      onSubmit={securityQuestionHandleSubmit(
                        securityQuestionSubmit,
                      )}
                    >
                      {/* <div className='w-full'>
                        <div className='max-w-lg mt-[20px]'>
                          <div className='text-title-text mb-[20px] font-bold font-sub'>
                            Security Question
                          </div>
                          <div className='w-full mb-[20px]'>
                            <label
                              htmlFor='question'
                              className='block text-small-text mb-[5px] ml-[15px] font-bold uppercase'
                            >
                              Question
                              <span className='text-rose-600'> *</span>
                            </label>
                            <select
                              className='form-input'
                              name='questionId'
                              style={{
                                backgroundColor: `${
                                  updatableStatus ? 'rgb(220,220,220)' : ''
                                }`,
                              }}
                              disabled={updatableStatus ? true : false}
                              {...securityQuesRegister('questionId')}
                            >
                              <option value={''}>Select question</option>
                              {securityQuestion.map((res) => {
                                return (
                                  <option key={res.value} value={res.value}>
                                    {res.label}
                                  </option>
                                );
                              })}
                            </select>
                            {securityQuestionErros?.questionId && (
                              <div>
                                <span className='font-medium text-red-500 text-[17px]'>
                                  {securityQuestionErros?.questionId.message}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className='w-full mb-[20px]'>
                            <Input
                              name='answer'
                              label='Answer'
                              rootClassName='mb-2'
                              register={securityQuesRegister}
                              placeholder='Enter your answer'
                              error={securityQuestionErros?.answer?.message}
                              disabled={updatableStatus ? true : false}
                              type='text'
                              className='form-input'
                            />
                          </div>
                        </div>
                        <div className='max-w-lg mt-[20px] flex gap-x-[15px]'>
                          <button
                            type='submit'
                            className='btn btn-primary btn-sm uppercase !font-body !rounded-xs mr-5'
                          >
                            {'save security question'}
                          </button>

                          {updatableStatus && (
                            <button
                              type='button'
                              className='btn btn-outline-primary btn-sm uppercase !font-body !rounded-xs mr-5'
                              onClick={() => setUpdatableStatus(false)}
                            >
                              {'update security question'}
                            </button>
                          )}
                        </div>
                      </div> */}
                    </form>
                    {/* <div className='w-full'>
                      <div className='max-w-lg mt-[20px]'>
                        <div className='text-title-text mb-[20px] font-bold font-sub'>
                          Language & Currency Settings
                        </div>
                        <div className='w-full mb-[20px]'>
                          <label
                            htmlFor='language'
                            className='block text-small-text mb-[5px] ml-[15px] font-bold uppercase'
                          >
                            Language
                            <span className='text-rose-600'> *</span>
                          </label>
                          <select
                            id='language'
                            className='form-input'
                            {...register('language')}
                            name='language'
                          >
                            {!!userData?.language ? (
                              <option value={userData?.language}>
                                {userData?.language}
                              </option>
                            ) : (
                              <option value={''}>Select Language</option>
                            )}
                            <option value={'english'}>English</option>
                          </select>
                          {errors?.language && (
                            <div>
                              <span className='font-medium text-red-500 text-[17px]'>
                                {errors?.language.message}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className='w-full mb-[20px]'>
                          <label className='block text-small-text mb-[5px] ml-[15px] font-bold uppercase'>
                            Currency
                            <span className='text-rose-600'> *</span>
                          </label>
                          <div>
                            <div className='relative inline-flex w-full'>
                              <button
                                className='flex justify-between items-center bg-white border border-[#B3B3B3] w-full rounded-[5px] py-[10px] pl-[15px] pr-[5px] text-[16px]'
                                onClick={() => setOpen(!open)}
                              >
                                <span className='flex items-center grow text-default-text'>
                                  <span className='mr-[20px]'>
                                    <Image
                                      src={activeFlag}
                                      isStatic
                                      alt={activeCurrency}
                                      className={''}
                                    />
                                  </span>
                                  <span>{activeCurrency}</span>
                                </span>
                                <span>
                                  <Image
                                    src={'/assets/images/downArrow.png'}
                                    isStatic
                                    alt={'downArrow'}
                                    className={''}
                                  />
                                </span>
                              </button>
                              {open && (
                                <div className='!z-50 absolute top-full left-0 w-full bg-white border border-neutral-200 pb-1.5 rounded shadow-lg overflow-hidden mt-1 max-h-80 overflow-y-auto'>
                                  <div className='font-medium text-sm text-gray-500 divide-y divide-slate-200'>
                                    {currencyData.map((currency: any) => (
                                      <button
                                        tabIndex={0}
                                        key={currency.id}
                                        className='flex items-center justify-between w-full hover:bg-slate-50 py-2 px-3 cursor-pointer'
                                        onClick={() =>
                                          handleCurrency(
                                            currency.flag,
                                            currency.name,
                                          )
                                        }
                                      >
                                        <span className='flex items-center gap-[10px]'>
                                          <span className='mr-[20px]'>
                                            <Image
                                              src={currency.flag}
                                              alt={currency.name}
                                              isStatic
                                              className={''}
                                            />
                                          </span>
                                          <span>{currency.name}</span>
                                        </span>
                                        {currency.name === activeCurrency && (
                                          <Image
                                            src={'/assets/images/blueTick.png'}
                                            alt={'blueTick'}
                                            isStatic
                                            className={''}
                                          />
                                        )}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    {/* <div className='w-full'>
                      <div className='max-w-lg mt-[20px] flex gap-x-[15px]'>
                        <button
                          type='button'
                          className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'
                        >
                          save
                        </button>
                        
                      </div>
                    </div> */}
                  </div>
                  <div className='p-[15px] lg:p-[30px] shadow-md rounded-sm bg-[#ffffff] mb-[40px] tab-content'>
                    <div className='w-full'>
                      <div className='max-w-lg'>
                        <div className='text-title-text mb-[20px] font-bold font-sub'>
                          Looking to Close your Account?
                        </div>
                        <div className='flex gap-x-[15px]'>
                          <a
                            href='delete-account.html'
                            className='btn btn-outline-primary btn-sm uppercase !font-body !rounded-xs !inline-flex gap-[10px] items-center'
                          >
                            Submit Account Closure Request
                          </a>
                        </div>
                      </div>
                    </div>
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

export default AccountSettings;
