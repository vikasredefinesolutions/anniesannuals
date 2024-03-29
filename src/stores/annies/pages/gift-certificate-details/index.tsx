'use client';
import GiftCertificateDetailsController from '@/features/gift-certificate-detail/controller';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import { paths } from '@/utils/paths.constant';
import HeaderCart from '../../widgets/header/components/headerCart';
import AddGiftCertificate from './component/addGiftCertificate';

const GiftCertificateDetail = ({ cmsStoreThemeConfigsViewModel }: any) => {
  return (
    <GiftCertificateDetailsController
      config={{
        requiredValidationSchema: {
          isEmailRequired: true,
          isFirstNameRequired: true,
          isLastNameRequired: true,
        },
      }}
      cases={{
        view: ({
          errorMessage,
          hookForm: { errors, handleSubmit, register, setValue, watch },
          onSubmit,
          getStateList,
          giftCardListingData,
          zipCodeHandler,
          updateCity,
          updateState,
          isOpen,
          onRequestClose,
        }) => {
          return (
            <>
              <section className='bg-tertiary'>
                <div className='container-fluid md:container mx-auto'>
                  <div className='relative w-full pt-[100px] overflow-hidden'>
                    <div className='text-center absolute inset-0'>
                      <Image
                        src='/assets/images/gift-certificates-banner.jpg'
                        className='block w-full object-cover min-h-[235px]'
                        alt='Banner Image'
                        isStatic
                      />
                    </div>
                    <div className='px-[30px] lg:px-[60px] py-[15px] lg:py-[30px] max-w-[1100px] bg-tertiary xl:mx-auto rounded-tl-lg rounded-tr-lg pt-[50px] mx-[20px] relative z-10 mt-[96px]'>
                      <div className='text-center'>
                        <div className='text-2xl-text mb-[15px] font-sub font-bold relative inline-block'>
                          <span>Gift Cards</span>
                        </div>
                      </div>
                    </div>
                    {/* remove mt-[96px] in above div when add description */}
                  </div>
                </div>
              </section>
              <section className='bg-tertiary'>
                <div className='py-[20px]'>
                  <div className='container mx-auto relative'>
                    <ul className='flex flex-wrap items-center gap-[10px] text-[14px] font-semibold font-sub'>
                      <li>
                        <CustomLink href={paths.home} className='text-anchor'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='21.621'
                            height='19.897'
                            viewBox='0 0 21.621 19.897'
                          >
                            <path
                              id='Path_48756'
                              data-name='Path 48756'
                              d='M2.25,12,11.2,3.045a1.126,1.126,0,0,1,1.591,0L21.75,12M4.5,9.75V19.875A1.125,1.125,0,0,0,5.625,21H9.75V16.125A1.125,1.125,0,0,1,10.875,15h2.25a1.125,1.125,0,0,1,1.125,1.125V21h4.125A1.125,1.125,0,0,0,19.5,19.875V9.75M8.25,21H16.5'
                              transform='translate(-1.189 -1.853)'
                              fill='none'
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1.5'
                            />
                          </svg>
                        </CustomLink>
                      </li>
                      <li className=''>/</li>
                      <li className=''>Gift Certificates</li>
                    </ul>
                  </div>
                </div>
              </section>
              <section className='bg-tertiary'>
                <div className='pb-[30px]'>
                  <div className='container mx-auto relative'>
                    <AddGiftCertificate
                      errorMessage={errorMessage}
                      errors={errors}
                      handleSubmit={handleSubmit}
                      onSubmit={onSubmit}
                      register={register}
                      giftCardListingData={giftCardListingData}
                      setValue={setValue}
                      watch={watch}
                      getStateList={getStateList}
                      zipCodeHandler={zipCodeHandler}
                      updateCity={updateCity}
                      updateState={updateState}
                    />
                    <div className='py-[20px]'>
                      <p className='text-normal-text mb-[10px] font-[600]'>
                        Hey, now you can give the perfect gift to your favorite
                        garden lover, Flower Floozie, or even your neighborhood
                        grouch!
                      </p>
                      <p className='text-normal-text mb-[30px] font-[600]'>
                        Delight them with our charming gift certificate on
                        birthdays, for Mother's Day, Father's Day,
                        anniversaries, Valentine's Day or Christmas /Chanukah
                        /Kwanzaa /Solstice! You name it!
                      </p>
                      <p className='text-normal-text mb-[30px] font-[600]'>
                        All gift card purchases are Non-Refundable
                      </p>
                      <p className='text-normal-text mb-[20px] font-[600]'>
                        Emailed gift cards will be emailed directly to the email
                        provided within 24 hours of the order. Please check your
                        spam folder in the event you do not see it in your
                        inbox.
                      </p>
                      <p className='text-normal-text mb-[10px]'>
                        We have discovered it is better to send the E-card to
                        the purchaser. Recipients may be hesitant to open what
                        they may perceive to be an unsolicited email from a
                        business believing it to be spam or a fraud email.
                      </p>
                      <p className='text-normal-text mb-[10px]'>
                        If you forward the E-Card to the recipient yourself,
                        they are more likely to open the email. In addition, we
                        feel this approach has a more personal touch coming
                        directly from you, the purchaser.
                      </p>
                      <p className='text-normal-text mb-[20px]'>
                        The 16 digit number on the card is all that is needed.
                        It will not lose value by being forwarded.
                      </p>
                      <h3 className='class="text-normal-text font-[600] mb-[20px]'>
                        Gift cards by mail are processed the next business day
                        (M – F) and can take 7 – 10 days for delivery via USPS.
                      </h3>
                      <p className='text-normal-text mb-[10px]'>
                        We'll send your lucky recipient a beautiful gift
                        certificate. They can use it online, thru the catalog or
                        at our nursery! Select your style on next page. If you
                        want to speak with a real, live person, we are happy to
                        take your order over the phone!
                      </p>
                    </div>
                  </div>
                </div>
                {isOpen && (
                  <HeaderCart
                    closeCart={onRequestClose}
                    cmsStoreThemeConfigsViewModel={
                      cmsStoreThemeConfigsViewModel
                    }
                  />
                )}
              </section>
            </>
          );
        },
      }}
    />
  );
};

export default GiftCertificateDetail;
