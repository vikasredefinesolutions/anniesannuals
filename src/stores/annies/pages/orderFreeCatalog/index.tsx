'use client';
import { useAppSelector } from '@/app/redux/hooks';
import OrderFreeCatalogController from '@/features/orderFreeCatalog/controller';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import Loader from '@/shared/Components/Loader';
import { socialReference } from '@/utils/helpers';
import { paths } from '@/utils/paths.constant';
import React, { Fragment } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const OrderFreeCatalog: React.FC = () => {
  const { isLoading } = useAppSelector((state) => state.common);

  return (
    <OrderFreeCatalogController
      configs={null}
      cases={{
        ready: ({
          stateData,
          getCurrentCountryStateData,
          countryData,
          register,
          hookForm: { errors, handleSubmit },
          onSubmit,
          verifiedCaptcha,
          verifyCaptcha,
        }) => {
          return (
            <>
              {isLoading && <Loader />}
              <section className='bg-tertiary'>
                <div className='container-fluid md:container mx-auto'>
                  <div className='relative w-full pt-[100px] overflow-hidden'>
                    <div className='text-center absolute inset-0'>
                      <Image
                        isStatic={true}
                        src={'/assets/images/contact-us-banner.jpg'}
                        alt={'bgImg'}
                        className='block w-full object-cover min-h-[235px]'
                      />
                    </div>
                    <div className='px-[30px] lg:px-[60px] py-[15px] lg:py-[30px] max-w-[1100px] bg-tertiary xl:mx-auto rounded-tl-lg rounded-tr-lg pt-[50px] mx-[20px] relative z-10'>
                      <div className='text-center relative'>
                        <div className='text-2xl-text mb-[15px] font-sub font-bold relative inline-block'>
                          <h1>ORDER A FREE CATALOG!</h1>
                          <div className='absolute top-[-40px] left-[100%] w-[70px] h-[70px] z-20 lg:block hidden'>
                            <Image
                              src='/annies/1/store/5/images/butterfly-2.png'
                              className='w-[50%] lg:w-auto ml-auto'
                              alt='butterfly'
                            />
                          </div>
                        </div>
                      </div>
                      <div className=''>
                        <div className='font-sub text-center text-default-text font-semibold !leading-6'>
                          <h3 className='text-2xl'>By signing up you’ll:</h3>
                          Receive our most current catalog filled with exclusive
                          plants, new introductions and photos of our
                          demonstration gardens in bloom! Spring catalogs are
                          available from mid-February and Summer catalogs are
                          available from mid-April.
                        </div>
                        {/* <div className='font-sub text-center text-default-text mt-[15px] font-semibold  !leading-6'>
                          <h3 className='text-2xl'>
                            Subscribe to our newsletter and you’ll:
                          </h3>
                          <p>
                            Receive e-mails announcing Annie's choice "Plants of
                            the Month," nursery news and info on our sales days.
                          </p>
                          <p>Be invited to our FUN-TABULOUS parties!</p>
                          <p>
                            Receive “first dibs” info and photos of our newest
                            and coolest plants!
                          </p>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className='bg-tertiary'>
                <div>
                  <div className='container mx-auto relative'>
                    <div className='py-[20px]'>
                      <div className=''>
                        <ul className='flex flex-wrap items-center gap-[10px] text-[14px] font-semibold font-sub'>
                          <li className=''>
                            <CustomLink
                              href={paths.home}
                              className='text-anchor'
                            >
                              <Image
                                src={'/assets/images/homeIcon.svg'}
                                alt={'home'}
                                isStatic={true}
                              />
                            </CustomLink>
                          </li>
                          <li className=''>/</li>
                          <li className=''>Order Free Catalog</li>
                        </ul>
                      </div>
                    </div>
                    <div className='md:flex md:space-x-[15px]'>
                      <div className='mb-[30px] w-full xl:w-4/12 md:w-4/12'>
                        <div className='bg-primary overflow-hidden rounded-tl-lg rounded-br-lg group p-[30px] mr-[0] lg:mr-[50px]'>
                          <CustomLink href='/assets/images/pdf/2024-spring-catalog.pdf'>
                            <Image
                              src={
                                '/assets/images/2024-spring-catalog-medium.jpg'
                              }
                              alt={'catalog'}
                              isStatic={true}
                              className='w-full'
                            />
                            <CustomLink href='/assets/images/pdf/2024-spring-catalog.pdf'>
                              <h1 className='text-medium-text text-center font-[700] my-[10px] mb-[30px] text-[#ffffff]'>
                                See our new Spring 2024 catalog!
                              </h1>
                            </CustomLink>
                            <h1 className='text-medium-text text-center font-[700] my-[10px] text-[#ffffff] '>
                              <div className='my-[10px]'>
                                {' '}
                                See Past Catalogs:
                              </div>
                              <div className='my-[10px]'>
                                <span>
                                  <CustomLink href='/assets/images/pdf/2023-spring-catalog.pdf'>
                                    Spring 2023
                                  </CustomLink>
                                </span>{' '}
                                |
                                <span>
                                  <CustomLink href='/assets/images/pdf/2023-summer-catalog.pdf'>
                                    Summer 2023
                                  </CustomLink>
                                </span>{' '}
                              </div>
                            </h1>
                          </CustomLink>
                        </div>
                      </div>
                      <div className='w-full xl:w-8/12 md:w-8/12'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className='max-w-4xl pb-[30px]'>
                            <div className='text-large-text font-[700] font-sub mb-[20px]'>
                              Fill A Form
                            </div>
                            <div className='flex flex-wrap mx-[-15px] mb-[30px]'>
                              <div className='md:w-6/12 w-full px-[15px] mb-[20px]'>
                                <label
                                  htmlFor={'firstName'}
                                  className='block text-small-text mb-[5px] ml-[15px] font-bold uppercase'
                                >
                                  first name{' '}
                                  <span className='text-rose-600'>*</span>
                                </label>
                                <input
                                  id='firstName'
                                  placeholder='Enter your first name'
                                  {...register('firstName')}
                                  className=' form-input'
                                />
                                {errors?.firstName &&
                                errors?.firstName.message ? (
                                  <div className='h-6 font-medium top-full left-0 text-red-500 text-[16px]'>
                                    {errors?.firstName.message}
                                  </div>
                                ) : null}
                              </div>
                              <div className='md:w-6/12 w-full px-[15px] mb-[20px]'>
                                <label
                                  htmlFor={'lastName'}
                                  className='block text-small-text mb-[5px] ml-[15px] font-bold uppercase'
                                >
                                  last name{' '}
                                  <span className='text-rose-600'>*</span>
                                </label>
                                <input
                                  id='lastName'
                                  placeholder='Enter your Last name'
                                  {...register('lastName')}
                                  className='form-input'
                                />
                                {errors?.lastName &&
                                errors?.lastName.message ? (
                                  <div className='h-6 font-medium top-full left-0 text-red-500 text-[16px]'>
                                    {errors?.lastName.message}
                                  </div>
                                ) : null}
                              </div>
                              <div className='w-full px-[15px] mb-[20px]'>
                                <label
                                  htmlFor='email'
                                  className='block text-small-text mb-[5px] ml-[15px] font-bold uppercase'
                                >
                                  Email <span className='text-rose-600'>*</span>
                                </label>{' '}
                                <input
                                  id='email'
                                  {...register('email')}
                                  placeholder='Enter your email'
                                  className=' form-input'
                                />
                                {errors?.email && errors?.email.message ? (
                                  <div className='h-6 font-medium top-full left-0 text-red-500 text-[16px]'>
                                    {errors?.email.message}
                                  </div>
                                ) : null}
                              </div>
                              <div className='w-full px-[15px] mb-[20px]'>
                                <label
                                  htmlFor='confirmEmail'
                                  className='block text-small-text mb-[5px] ml-[15px] font-bold uppercase'
                                >
                                  Confirm Email{' '}
                                </label>{' '}
                                <input
                                  id='confirmEmail'
                                  {...register('confirmEmail')}
                                  placeholder='Confirm your email'
                                  className=' form-input'
                                />
                                {errors?.confirmEmail &&
                                errors?.confirmEmail.message ? (
                                  <div className='h-6 font-medium top-full left-0 text-red-500 text-[16px]'>
                                    {errors?.confirmEmail.message}
                                  </div>
                                ) : null}
                              </div>
                              <div className='w-full px-[15px] mb-[20px]'>
                                <label
                                  htmlFor='street'
                                  className='block text-small-text mb-[5px] ml-[15px] font-bold uppercase'
                                >
                                  Street{' '}
                                  <span className='text-rose-600'>*</span>
                                </label>{' '}
                                <input
                                  id='street'
                                  {...register('street')}
                                  placeholder='Enter your address'
                                  className=' form-input'
                                />
                                {errors?.street && errors?.street.message ? (
                                  <div className='h-6 font-medium top-full left-0 text-red-500 text-[16px]'>
                                    {errors?.street.message}
                                  </div>
                                ) : null}
                              </div>
                              <div className='w-full px-[15px] mb-[20px]'>
                                <label
                                  htmlFor='city'
                                  className='block text-small-text mb-[5px] ml-[15px] font-bold uppercase'
                                >
                                  City <span className='text-rose-600'>*</span>
                                </label>{' '}
                                <input
                                  id='city'
                                  {...register('city')}
                                  placeholder='Enter your city name'
                                  className=' form-input'
                                />
                                {errors?.city && errors?.city.message ? (
                                  <div className='h-6 font-medium top-full left-0 text-red-500 text-[16px]'>
                                    {errors?.city.message}
                                  </div>
                                ) : null}
                              </div>
                              <div className='w-full px-[15px] mb-[20px]'>
                                <label
                                  htmlFor='country'
                                  className='block text-small-text mb-[5px] ml-[15px] font-bold uppercase'
                                >
                                  Country{' '}
                                  <span className='text-rose-600'>*</span>
                                </label>{' '}
                                <select
                                  {...register('country')}
                                  onChange={(e) =>
                                    getCurrentCountryStateData(
                                      +e.target.options[e.target.selectedIndex]
                                        .id,
                                    )
                                  }
                                  className='form-input !pt-[13px]'
                                >
                                  <option defaultValue={''} value={''}>
                                    Select your country
                                  </option>
                                  {countryData?.map((country) => (
                                    <Fragment key={country.id}>
                                      <option
                                        value={country.name}
                                        id={`${country.id}`}
                                        data-key={`${country.countryCode}`}
                                      >
                                        {country.name}
                                      </option>
                                    </Fragment>
                                  ))}
                                </select>
                                {errors?.country && errors?.country.message ? (
                                  <div className='h-6 font-medium top-full left-0 text-red-500 text-[16px]'>
                                    {errors?.country.message}
                                  </div>
                                ) : null}
                              </div>
                              <div className='md:w-6/12 w-full px-[15px] mb-[20px]'>
                                <label
                                  htmlFor='state'
                                  className='block text-small-text mb-[5px] ml-[15px] font-bold uppercase'
                                >
                                  State / province{' '}
                                  <span className='text-rose-600'>*</span>
                                </label>
                                <select
                                  id='state'
                                  placeholder='Enter your state name '
                                  {...register('state')}
                                  className='form-input !pt-[13px]'
                                >
                                  <option defaultValue={''} value={''}>
                                    Select your state or province
                                  </option>
                                  {stateData?.map((state) => (
                                    <option value={state.name} key={state.id}>
                                      {state.name}
                                    </option>
                                  ))}
                                </select>
                                {errors?.state && errors?.state.message ? (
                                  <div className='h-6 font-medium top-full left-0 text-red-500 text-[16px]'>
                                    {errors?.state.message}
                                  </div>
                                ) : null}
                              </div>
                              <div className='md:w-6/12 w-full px-[15px] mb-[20px]'>
                                <label
                                  htmlFor='zip'
                                  className='block text-small-text mb-[5px] ml-[15px] font-bold uppercase'
                                >
                                  Zip <span className='text-rose-600'>*</span>
                                </label>
                                <input
                                  id='zip'
                                  placeholder='Enter your city zip '
                                  {...register('zip')}
                                  className='form-input'
                                />
                                {errors?.zip && errors?.zip.message ? (
                                  <div className='h-6 font-medium top-full left-0 text-red-500 text-[16px]'>
                                    {errors?.zip.message}
                                  </div>
                                ) : null}
                              </div>
                              <div className='w-full px-[15px] mb-[20px]'>
                                <label
                                  htmlFor='comment'
                                  className='block text-small-text mb-[5px] ml-[15px] font-bold uppercase'
                                >
                                  Referral{' '}
                                  <span className='text-rose-600'>*</span>
                                </label>{' '}
                                <select
                                  {...register('comment')}
                                  className='form-input !pt-[13px]'
                                  placeholder='How did you hear of us?'
                                >
                                  <option defaultValue={''} value={''}>
                                    How did you hear of us?
                                  </option>
                                  {socialReference?.map(
                                    (reference: {
                                      id: number;
                                      name: string;
                                    }) => (
                                      <Fragment key={reference.id}>
                                        <option value={reference.name}>
                                          {reference.name}
                                        </option>
                                      </Fragment>
                                    ),
                                  )}
                                </select>
                                {errors?.comment && errors?.comment.message ? (
                                  <div className='h-6 font-medium top-full left-0 text-red-500 text-[16px]'>
                                    {errors?.comment.message}
                                  </div>
                                ) : null}
                              </div>
                              <div className='w-full px-[15px] flex flex-wrap justify-between items-center'>
                                <div>
                                  {' '}
                                  <ReCAPTCHA
                                    className='mb-[20px]'
                                    sitekey={
                                      process.env
                                        .NEXT_PUBLIC_RECAPTCHASITEKEY || ''
                                    }
                                    onChange={verifyCaptcha}
                                  />
                                </div>
                                <div className='mb-[20px] sm:mb-0'>
                                  <button
                                    type='submit'
                                    className={`w-full btn btn-primary btn-sm uppercase !font-body !rounded-xs 
                                     ${
                                       !(verifiedCaptcha === 'VALID') &&
                                       'opacity-50'
                                     }`}
                                    id=''
                                    disabled={
                                      verifiedCaptcha === 'VALID' ? false : true
                                    }
                                  >
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </div>
                            {/* <div className='mb-[20px] sm:mb-0'>
                              <CustomLink href={paths.home}>
                                <button className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'>
                                  Annie's online store
                                </button>
                              </CustomLink>
                            </div> */}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          );
        },
      }}
    />
  );
};

export default OrderFreeCatalog;
