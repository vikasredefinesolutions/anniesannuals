'use client';
import { useAppSelector } from '@/app/redux/hooks';
import ContactUsController from '@/features/contactUs/controller';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import Loader from '@/shared/Components/Loader';
import { paths } from '@/utils/paths.constant';
import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const ContactUs: React.FC = () => {
  const { isLoading } = useAppSelector((state) => state.common);
  return (
    <ContactUsController
      configs={null}
      cases={{
        ready: ({
          hookForm: { register, errors, handleSubmit },
          onSubmit,
          verifiedCaptcha,
          verifyCaptcha,
          messageLength,
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
                    <div className='px-[30px] lg:px-[60px] py-[15px] lg:py-[30px] max-w-[1100px] bg-tertiary xl:mx-auto rounded-tl-lg rounded-tr-lg pt-[50px] mx-[20px] relative z-10 mt-[96px]'>
                      <div className='text-center relative'>
                        <div className='text-2xl-text mb-[15px] font-sub font-bold relative inline-block'>
                          <h1>Contact Us</h1>
                          <div className='absolute top-[-40px] left-[100%] w-[70px] h-[70px] z-20 lg:block hidden'>
                            <Image
                              src='/annies/1/store/5/images/butterfly-2.png'
                              className='w-[50%] lg:w-auto ml-auto'
                              alt='butterfly'
                            />
                          </div>
                        </div>
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
                          <li className=''>Contact Us</li>
                        </ul>
                      </div>
                    </div>
                    <div className='md:flex md:space-x-[15px]'>
                      <div className='mb-[30px] w-full xl:w-4/12 md:w-4/12'>
                        <div className='bg-primary overflow-hidden rounded-tl-lg rounded-br-lg group p-[30px] mr-[0] lg:mr-[50px]'>
                          <div className='text-large-text font-[700] font-sub text-[#ffffff] mb-[30px]'>
                            Mail Order
                          </div>
                          <div className=''>
                            <div className='flex justify-start items-top mb-[20px]'>
                              <span className='w-[35px] mt-[5px]'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='19.13'
                                  height='19.144'
                                  viewBox='0 0 19.13 19.144'
                                >
                                  <g
                                    id='Group_6220'
                                    data-name='Group 6220'
                                    transform='translate(-5.716 -10.313)'
                                  >
                                    <path
                                      id='Path_49119'
                                      data-name='Path 49119'
                                      d='M6.489,17.657a23.022,23.022,0,0,0,4.588,6.464,22,22,0,0,0,6.407,4.6,7.675,7.675,0,0,0,2.983.737,2.745,2.745,0,0,0,2.016-.73l1.952-1.951a1.615,1.615,0,0,0-.119-2.271l-2.876-2.876a1.615,1.615,0,0,0-2.271-.118l-.9.9c-.248.186-1.782-.287-3.507-2.012s-2.2-3.261-2.013-3.507l.9-.9a1.615,1.615,0,0,0-.119-2.271l-2.877-2.876a1.614,1.614,0,0,0-2.271-.118L6.432,12.676c-.974.974-.954,2.743.056,4.98Zm.894-4.029,1.951-1.951a.109.109,0,0,1,.075-.022.441.441,0,0,1,.293.14l2.876,2.876c.149.149.161.326.119.369l-.9.9c-1.114,1.115.169,3.565,2.013,5.409a10.16,10.16,0,0,0,2.844,2.065c1.507.681,2.254.26,2.565-.052l.9-.9c.043-.043.22-.03.369.118l2.876,2.876c.149.149.161.326.119.368l-1.951,1.951c-.541.542-1.853.434-3.509-.289a20.646,20.646,0,0,1-5.994-4.316A21.641,21.641,0,0,1,7.715,17.1c-.742-1.642-.866-2.941-.332-3.475Z'
                                      transform='translate(0)'
                                      fill='#fff'
                                    ></path>
                                  </g>
                                </svg>
                              </span>
                              <div className='w-[calc(100%-35px)]'>
                                <span className='block text-medium-text font-semibold text-[#ffffff] mb-[10px]'>
                                  (888) 266-4370
                                </span>{' '}
                                <span className='text-small-text text-[#ffffff]'>
                                   Customer Service &amp; Phone orders: 8am - 4pm
                                  PST, MON-FRI
                                </span>
                              </div>
                            </div>
                            <div className='flex justify-start items-top mb-[20px]'>
                              <span className='w-[35px] mt-[5px]'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='21'
                                  height='16.5'
                                  viewBox='0 0 21 16.5'
                                >
                                  <path
                                    id='Path_49122'
                                    data-name='Path 49122'
                                    d='M21.75,6.75v10.5A2.25,2.25,0,0,1,19.5,19.5H4.5a2.25,2.25,0,0,1-2.25-2.25V6.75m19.5,0A2.25,2.25,0,0,0,19.5,4.5H4.5A2.25,2.25,0,0,0,2.25,6.75m19.5,0v.243a2.25,2.25,0,0,1-1.07,1.916l-7.5,4.615a2.25,2.25,0,0,1-2.36,0L3.32,8.91A2.25,2.25,0,0,1,2.25,6.994V6.75'
                                    transform='translate(-1.5 -3.75)'
                                    fill='none'
                                    stroke='#fff'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='1.5'
                                  ></path>
                                </svg>
                              </span>
                              <div className='w-[calc(100%-35px)]'>
                                <span className='text-small-text text-[#ffffff]'>
                                  Annie's Annuals &amp; Perennials, LLC
                                  <br />
                                  801 Chesley Ave.
                                  <br />
                                  Richmond, CA 94801
                                </span>
                              </div>
                            </div>
                            <div className='flex justify-start items-top mb-[20px]'>
                              <span className='w-[35px] mt-[5px]'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='19.5'
                                  height='19.5'
                                  viewBox='0 0 19.5 19.5'
                                >
                                  <path
                                    id='Path_49123'
                                    data-name='Path 49123'
                                    d='M9.879,7.519a3.31,3.31,0,0,1,4.242,0,2.4,2.4,0,0,1,0,3.712,2.957,2.957,0,0,1-.67.442A2.237,2.237,0,0,0,12,13.5v.75M21,12a9,9,0,1,1-9-9A9,9,0,0,1,21,12Zm-9,5.25h.008v.008H12Z'
                                    transform='translate(-2.25 -2.25)'
                                    fill='none'
                                    stroke='#fff'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='1.5'
                                  ></path>
                                </svg>
                              </span>
                              <div className='w-[calc(100%-35px)]'>
                                <span className='text-small-text text-[#ffffff]'>
                                  Wholesale Inquiries Only:
                                  <br />
                                  (510) 257-6598
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className='text-large-text font-[700] font-sub text-[#ffffff] mb-[30px]'>
                            Nursery
                          </div>
                          <div className=''>
                            <div className='flex justify-start items-top mb-[20px]'>
                              <span className='w-[35px] mt-[5px]'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='19.13'
                                  height='19.144'
                                  viewBox='0 0 19.13 19.144'
                                >
                                  <g
                                    id='Group_6220'
                                    data-name='Group 6220'
                                    transform='translate(-5.716 -10.313)'
                                  >
                                    <path
                                      id='Path_49119'
                                      data-name='Path 49119'
                                      d='M6.489,17.657a23.022,23.022,0,0,0,4.588,6.464,22,22,0,0,0,6.407,4.6,7.675,7.675,0,0,0,2.983.737,2.745,2.745,0,0,0,2.016-.73l1.952-1.951a1.615,1.615,0,0,0-.119-2.271l-2.876-2.876a1.615,1.615,0,0,0-2.271-.118l-.9.9c-.248.186-1.782-.287-3.507-2.012s-2.2-3.261-2.013-3.507l.9-.9a1.615,1.615,0,0,0-.119-2.271l-2.877-2.876a1.614,1.614,0,0,0-2.271-.118L6.432,12.676c-.974.974-.954,2.743.056,4.98Zm.894-4.029,1.951-1.951a.109.109,0,0,1,.075-.022.441.441,0,0,1,.293.14l2.876,2.876c.149.149.161.326.119.369l-.9.9c-1.114,1.115.169,3.565,2.013,5.409a10.16,10.16,0,0,0,2.844,2.065c1.507.681,2.254.26,2.565-.052l.9-.9c.043-.043.22-.03.369.118l2.876,2.876c.149.149.161.326.119.368l-1.951,1.951c-.541.542-1.853.434-3.509-.289a20.646,20.646,0,0,1-5.994-4.316A21.641,21.641,0,0,1,7.715,17.1c-.742-1.642-.866-2.941-.332-3.475Z'
                                      transform='translate(0)'
                                      fill='#fff'
                                    ></path>
                                  </g>
                                </svg>
                              </span>
                              <div className='w-[calc(100%-35px)]'>
                                <span className='block text-medium-text font-semibold text-[#ffffff] mb-[10px]'>
                                  (510) 215-3301
                                </span>
                              </div>
                            </div>
                            <div className='flex justify-start items-top mb-[20px]'>
                              <span className='w-[35px] mt-[5px]'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='21.621'
                                  height='19.897'
                                  viewBox='0 0 21.621 19.897'
                                >
                                  <path
                                    id='Path_49124'
                                    data-name='Path 49124'
                                    d='M2.25,12,11.2,3.045a1.126,1.126,0,0,1,1.591,0L21.75,12M4.5,9.75V19.875A1.125,1.125,0,0,0,5.625,21H9.75V16.125A1.125,1.125,0,0,1,10.875,15h2.25a1.125,1.125,0,0,1,1.125,1.125V21h4.125A1.125,1.125,0,0,0,19.5,19.875V9.75M8.25,21H16.5'
                                    transform='translate(-1.189 -1.853)'
                                    fill='none'
                                    stroke='#fff'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='1.5'
                                  ></path>
                                </svg>
                              </span>
                              <div className='w-[calc(100%-35px)]'>
                                <span className='text-small-text text-[#ffffff]'>
                                  740 Market Ave.
                                  <br />
                                  Richmond, CA 94801
                                </span>
                              </div>
                            </div>
                            <div className='flex justify-start items-top mb-[20px]'>
                              <span className='w-[35px] mt-[5px]'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='19.5'
                                  height='19.257'
                                  viewBox='0 0 19.5 19.257'
                                >
                                  <path
                                    id='Path_49125'
                                    data-name='Path 49125'
                                    d='M9,6.75V15m6-6v8.25m.5,3.5,4.875-2.437A1.124,1.124,0,0,0,21,17.3V4.82a1.125,1.125,0,0,0-1.628-1.006L15.5,5.748a1.12,1.12,0,0,1-1.006,0L9.5,3.252a1.125,1.125,0,0,0-1.006,0L3.622,5.689A1.125,1.125,0,0,0,3,6.7V19.18a1.125,1.125,0,0,0,1.628,1.006L8.5,18.252a1.12,1.12,0,0,1,1.006,0l4.994,2.5a1.127,1.127,0,0,0,1.006,0Z'
                                    transform='translate(-2.25 -2.372)'
                                    fill='none'
                                    stroke='#fff'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='1.5'
                                  ></path>
                                </svg>
                              </span>
                              <div className='w-[calc(100%-35px)]'>
                                <CustomLink href='directions.html'>
                                  <span className='text-small-text text-[#ffffff]'>
                                    See Directions
                                  </span>
                                </CustomLink>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='w-full xl:w-8/12 md:w-8/12'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className='max-w-4xl mb-[30px]'>
                            <div className='text-large-text font-[700] font-sub mb-[20px]'>
                              Contact Us:
                            </div>
                            <div className='text-small-text mb-[20px]'>
                              Your email address will not be published.*
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
                                  name='firstName'
                                  placeholder='Enter your first name'
                                  {...register('firstName')}
                                  className='group inline-flex items-center justify-between text-default-text bg-transparent w-full px-2 py-3 leading-none border border-primary rounded-xs'
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
                                  name='lastName'
                                  placeholder='Enter your Last name'
                                  {...register('lastName')}
                                  className='group inline-flex items-center justify-between text-default-text bg-transparent w-full px-2 py-3 leading-none border border-primary rounded-xs'
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
                                  name='email'
                                  {...register('email')}
                                  placeholder='Enter your email'
                                  className='group inline-flex items-center justify-between text-default-text bg-transparent w-full px-2 py-3 leading-none border border-primary rounded-xs'
                                />
                                {errors?.email && errors?.email.message ? (
                                  <div className='h-6 font-medium top-full left-0 text-red-500 text-[16px]'>
                                    {errors?.email.message}
                                  </div>
                                ) : null}
                              </div>
                              <div className='w-full px-[15px] mb-[20px]'>
                                <label
                                  htmlFor='subject'
                                  className='block text-small-text mb-[5px] ml-[15px] font-bold uppercase'
                                >
                                  Subject{' '}
                                  <span className='text-rose-600'>*</span>
                                </label>
                                <input
                                  id='subject'
                                  name='subject'
                                  {...register('subject')}
                                  placeholder='Enter your subject line'
                                  className='group inline-flex items-center justify-between text-default-text bg-transparent w-full px-2 py-3 leading-none border border-primary rounded-xs'
                                />
                                {errors?.subject && errors?.subject.message ? (
                                  <div className='h-6 font-medium top-full left-0 text-red-500 text-[16px]'>
                                    {errors?.subject.message}
                                  </div>
                                ) : null}
                              </div>
                              <div className='w-full px-[15px] mb-[20px]'>
                                <label
                                  htmlFor='messageToGiftCard'
                                  className='block text-small-text mb-[5px] ml-[15px] font-bold uppercase'
                                >
                                  Message to recipient ({messageLength} /500
                                  character limit)
                                </label>{' '}
                                <textarea
                                  name='messageToGiftCard'
                                  id='messageToGiftCard'
                                  cols={30}
                                  rows={10}
                                  maxLength={500}
                                  {...register('messageToGiftCard')}
                                  placeholder='Type your comment here...'
                                  className='group inline-flex items-center justify-between text-default-text bg-transparent w-full px-2 py-3 leading-none border border-primary rounded-xs'
                                />
                                {errors?.messageToGiftCard &&
                                errors?.messageToGiftCard.message ? (
                                  <div className='h-6 font-medium top-full left-0 text-red-500 text-[16px]'>
                                    {errors?.messageToGiftCard.message}
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
                            <div className='text-normal-text font-semibold mb-[20px]'>
                              Sorry, we do not sell seeds.
                            </div>
                            <div className='text-normal-text font-semibold mb-[20px]'>
                              You can purchase plants in our online store.
                            </div>
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

export default ContactUs;
