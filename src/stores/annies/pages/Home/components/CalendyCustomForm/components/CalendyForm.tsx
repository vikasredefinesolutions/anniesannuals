import {
  phonePattern1,
  phonePattern2,
  phonePattern3,
  phonePattern4,
} from '@/utils/helpers';
import { __ValidationText } from '@/stores/annies/pages/Home/home.contant';
import { UploadImage } from '@/api/services/home';
import { getStoreId, getUserId } from '@/utils/cookie.helper';
import { getLocation } from '@/utils/helpers';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import * as Yup from 'yup';
import Image from '@/shared/Components/Image';
import Input from './Input';

// export const GoogleAnalyticsEmailTrackerForCG = (
//   email: string,
//   storeCode: string,
// ) => {
//   if (storeCode !== _Store_CODES.CG || !email) return;
//   const dataLayer = window?.dataLayer || [];
//   dataLayer.push({
//     event: 'offline_tracking',
//     user: {
//       email: email,
//     },
//   });
// };

type _RequestConsultation = {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  preferedContactMethod: '' | 'MOBILE' | 'EMAIL';
  desiredQty: number | null;
  inHandDate: string;
  message: string;
  shipToMultipleLocations: '' | 'Yes' | 'No';
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.firstName.required)
    .min(__ValidationText.requestConsultation.firstName.minLength)
    .max(__ValidationText.requestConsultation.firstName.maxLength),
  lastName: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.lastName.required)
    .min(__ValidationText.requestConsultation.lastName.minLength)
    .max(__ValidationText.requestConsultation.lastName.maxLength),
  companyName: Yup.string()
    .trim()
    .required(__ValidationText.requestConsultation.companyName.required)
    .min(__ValidationText.requestConsultation.companyName.minLength)
    .max(__ValidationText.requestConsultation.companyName.maxLength),

  email: Yup.string()
    .trim()
    .email(__ValidationText.requestConsultation.email.validRequest)
    .required(__ValidationText.requestConsultation.email.required),

  phone: Yup.string()
    .required(__ValidationText.requestConsultation.phone.required)
    .test(
      'phone-test',
      __ValidationText.signUp.storeCustomerAddress.phone.valid,
      (value) => {
        if (
          phonePattern1.test(value || '') ||
          phonePattern2.test(value || '') ||
          phonePattern3.test(value || '') ||
          phonePattern4.test(value || '')
        )
          return true;
        return false;
      },
    ),

  inHandDate: Yup.string().trim(),

  preferedContactMethod: Yup.string().required(
    __ValidationText.requestConsultation.preferedContactMethod,
  ),
  desiredQty: Yup.string()
    .nullable()
    .required(__ValidationText.requestConsultation.desiredQty.required),
});
const CalendyForm: React.FC<{ setFormSubmit: (value: boolean) => void }> = ({
  setFormSubmit,
}) => {
  const { showLoader, openAlertModal } = useActions();

  const storeId = getStoreId();
  const imageFolderPath = '';

  const [captchaVerified, setverifiedRecaptch] = useState<
    'NOT_VALID' | null | 'VALID'
  >(null);
  const [fileUploded, setFileUploded] = useState<boolean>(false);
  const customerId = getUserId();
  const captchaHandler = () => {
    setverifiedRecaptch('VALID');
  };
  const [fileToUpload, setFileToUpload] = useState<{
    logoPathURL: string | null;
    name: string;
    type: string;
    previewURL: string;
  } | null>(null);
  const fileReader = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.files &&
      !['image/png', 'image/jpeg', 'image/jpg'].includes(
        event.target.files[0].type,
      )
    ) {
      alert('Please select an image file.');
      return;
    }
    if (event.target?.files === null) return;

    try {
      const logoFileURL = await UploadImage({
        folderPath: imageFolderPath,
        files: event?.target?.files[0],
      });
      const file = {
        logoPathURL: logoFileURL,
        name: event.target.files[0].name,
        type: event.target.files[0].type,
        previewURL: URL.createObjectURL(event.target.files[0]),
      };
      setFileToUpload(file);
      setFileUploded(true);
    } catch (error) {
      openAlertModal({
        isOpen: true,
        title: 'Error',
        description: `Check your Internet Connection and try again, we couldn't connect to server`,
      });
    }
    showLoader(false);
  };
  const [initialValues, setInitialValues] = useState<_RequestConsultation>({
    firstName: '',
    lastName: '',
    companyName: '',
    // jobTitle: '',
    phone: '',
    email: '',
    inHandDate: '',
    preferedContactMethod: '',
    desiredQty: null,
    message: '',
    shipToMultipleLocations: 'No',
  });
  const contactMethod = [
    {
      id: 0,
      label: 'email',
      value: 'EMAIL',
    },
    {
      id: 1,
      label: 'phone',
      value: 'MOBILE',
    },
  ];
  const [openUpload, setOpenUpload] = useState<Boolean>();
  const handleSubmit = async (value: _RequestConsultation) => {
    if (!captchaVerified || captchaVerified === 'NOT_VALID') {
      setverifiedRecaptch('NOT_VALID');
      return;
    }
    // GoogleAnalyticsEmailTrackerForCG(value.email, store.code);
    const location = await getLocation();
    // WORK TODO: Request consultation
    // const visitorInCookie = extractCookies(
    //   __Cookie.visitorId,
    //   'browserCookie',
    // ).visitorId;
    // const payload: _SubmitConsultationPayload = {
    //   consultationModel: {
    //     id: 0,
    //     rowVersion: '',
    //     location: `${location.city}, ${location.region}, ${location.country}, ${location.postal_code}`,
    //     ipAddress: location.ip_address,
    //     macAddress: '00-00-00-00-00-00',
    //     storeId: storeId,
    //     productId: 0,
    //     firstname: value.firstName,
    //     lastname: value.lastName,
    //     company: value.companyName,
    //     email: value.email,
    //     phone: value.phone,
    //     contactMethod: value.preferedContactMethod === 'EMAIL' ? 2 : 1,
    //     desiredQuantity: value.desiredQty,
    //     inHandsDate: value.inHandDate,
    //     logoUrl: fileToUpload?.logoPathURL ? fileToUpload.logoPathURL : '',
    //     message: value.message,
    //     gclid: store.gclid,
    //     productattributeoptionid: 0,
    //     recStatus: 'A',
    //     status: '',
    //     customerId: +customerId,
    //     visitorId: visitorInCookie || '',
    //     shipToMultipleLocations: value.shipToMultipleLocations,
    //   },
    // };
    // SumbitRequestConsultationDetails(payload).then(() => {
    //   setFormSubmit(true);
    // });
    // .finally(() => showLoader(false));
    setFormSubmit(true);
  };
  return (
    <div className='w-full lg:w-1/2 px-0 lg:pr-[20px] pb-[20px]'>
      <div className='rounded-lg bg-white shadow-2xl pt-[12px] pb-[12px]'>
        <div className='flex flex-wrap'>
          <div className='w-full pl-[15px] pr-[15px] my-[15px]'>
            <div className='w-full'>
              <span className='material-icons text-primary text-[40px]'>
                groups
              </span>
            </div>
            <div className='w-full text-[20px] leading-[20px] lg:leading-[26px] lg:text-[24px] font-semibold max-w-[70%]'>
              Custom Order Support Starts Here.
            </div>
          </div>
          <div className='w-full'>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({ values, handleChange, setFieldValue }) => {
                return (
                  <Form>
                    <div className='flex flex-wrap gap-y-4 pl-[20px] pr-[20px]'>
                      <Input
                        type='text'
                        label='First Name'
                        isRequired
                        name='firstName'
                        value={values.firstName}
                        onChange={handleChange}
                        id='First Name'
                        placeholder='First Name *'
                      />

                      <Input
                        type='text'
                        label='Last Name'
                        id='Last Name'
                        isRequired
                        onChange={handleChange}
                        name='lastName'
                        placeholder='Last Name *'
                        value={values.lastName}
                        className='text-medium-text border border-[#ababab] rounded pt-[12px] pb-[12px] pl-[12px] pr-[12px] w-full'
                      />

                      <Input
                        label='Last Name'
                        isRequired
                        onChange={handleChange}
                        id='Company Name'
                        name='companyName'
                        placeholder='Company *'
                        value={values.companyName}
                        className='text-medium-text border border-[#ababab] rounded pt-[12px] pb-[12px] pl-[12px] pr-[12px] w-full'
                      />

                      <Input
                        isRequired
                        type='email'
                        id='email-address'
                        label='email-address'
                        name='email'
                        onChange={handleChange}
                        value={values.email}
                        placeholder='Email *'
                        className='text-medium-text border border-[#ababab] rounded pt-[12px] pb-[12px] pl-[12px] pr-[12px] w-full'
                      />

                      <Input
                        isRequired
                        type='number'
                        id='Phone Number'
                        label='Phone Number'
                        name='phone'
                        onChange={handleChange}
                        value={values.phone}
                        autoComplete='Phone Number'
                        placeholder='Phone *'
                        className='text-medium-text border border-[#ababab] rounded pt-[12px] pb-[12px] pl-[12px] pr-[12px] w-full'
                      />
                      <Input
                        label='Select Prefered Contact Method'
                        isRequired
                        name='preferedContactMethod'
                        value={values.preferedContactMethod}
                        onChange={handleChange}
                        type='select'
                        selectOptions={contactMethod}
                        placeholder=' Select Prefered Contact Method *'
                      />
                      <Input
                        label='Desired Quantity'
                        id='Desired Quantity'
                        isRequired
                        onChange={handleChange}
                        name='desiredQty'
                        placeholder='Desired Quantity *'
                        value={
                          values.desiredQty ? values.desiredQty.toString() : ''
                        }
                        type='number'
                      />
                      <div className='w-full '>
                        <label className='text-medium-text pt-[12px] pb-[12px] pl-[0] pr-[0] w-full'>
                          Does your order need to ship to multiple locations?
                          <span className='text-rose-500'>*</span>
                        </label>
                        <div className='pt-[12px] pb-[12px] pl-[0] pr-[0]'>
                          <div className='form-group flex justify-start items-center'>
                            <label
                              className='radio-inline mr-1 last:mr-0 flex flex-wrap justify-start items-center'
                              htmlFor='shipToMultipleLocations_Yes'
                            >
                              <input
                                id={'shipToMultipleLocations_Yes'}
                                type='radio'
                                value={`Yes`}
                                name={`shipToMultipleLocations`}
                                onChange={handleChange}
                                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 '
                              />
                              <span
                                id={'yes_shipToMultipleLocations'}
                                className='ml-[10px]'
                              >
                                Yes
                              </span>
                            </label>

                            <label
                              className='radio-inline mr-1 last:mr-0 flex flex-wrap justify-start items-center ml-[10px]'
                              htmlFor='shipToMultipleLocations_No'
                            >
                              <input
                                id={'shipToMultipleLocations_No'}
                                type='radio'
                                value={`No`}
                                name={`shipToMultipleLocations`}
                                onChange={handleChange}
                                checked={values.shipToMultipleLocations == 'No'}
                                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 '
                              />
                              <span
                                id={'no_shipToMultipleLocations'}
                                className='ml-[10px]'
                              >
                                No
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className='w-full'>
                        <div className='bg-[#f5f7f6] flex flex-wrap items-center justify-between pt-[8px] pb-[8px] pl-[12px] pr-[12px]'>
                          <div className='text-sub-text font-bold'>
                            Optional Information
                          </div>
                          <div>&nbsp;</div>
                        </div>
                      </div>
                      <div className='w-full'>
                        <div className='flex flex-wrap items-center justify-between'>
                          <div className='w-[50%]'>In Hand Date:</div>
                          <div className='w-[50%]'>
                            <Input
                              label='In-Hand Date'
                              isRequired
                              name='inHandDate'
                              value={values.inHandDate}
                              onChange={handleChange}
                              placeholder='MM/DD/YYYY'
                              innerClass='flex items-center'
                              type='date'
                              min={new Date().toISOString().split('T')[0]}
                            />
                          </div>
                        </div>
                      </div>
                      <div className='w-full'>
                        {!openUpload && (
                          <div className='flex flex-wrap items-center justify-between'>
                            <div className=''>Provide Logo (Optional):</div>
                            <div className=''>
                              <a
                                className='text-medium-text rounded pt-[12px] pb-[12px] pl-[12px] !text-anchor hover:!text-anchor-hover underline text-normal-text font-semibold'
                                onClick={() => {
                                  setOpenUpload(true);
                                }}
                              >
                                + Add Logo
                              </a>
                            </div>
                          </div>
                        )}

                        {openUpload && (
                          <div className='bg-[#f5f7f6] pl-[8px] pr-[8px] pb-[8px] pt-[8px] mt-[8px] border-[2px] border-[#eaeaea]'>
                            <div className='flex flex-wrap items-center justify-between'>
                              <div className='text-normal-text font-semibold'>
                                First Logo
                              </div>
                              <div className=''>
                                <a
                                  className='text-medium-text rounded pt-[12px] pb-[12px] pl-[12px] !text-anchor hover:!text-anchor-hover underline text-normal-text font-semibold'
                                  onClick={() => {
                                    setOpenUpload(false);
                                  }}
                                >
                                  X Remove
                                </a>
                              </div>
                            </div>

                            <div className='mt-[8px]'>
                              <label className='text-normal-text' htmlFor=''>
                                Select your logo
                              </label>
                              {fileUploded ? (
                                <div className='flex items-center justify-between border border-[#a5a5a5] text-medium-text pl-[5px] pr-[5px] pt-[5px] pb-[5px] rounded'>
                                  <Image
                                    className='w-14 max-h-14'
                                    src={fileToUpload?.logoPathURL || ''}
                                    alt=''
                                  />
                                  <button
                                    className='underline font-bold text-base text-[#006cd1]'
                                    onClick={() => {
                                      setFileToUpload({
                                        logoPathURL: '',
                                        name: '',
                                        type: '',
                                        previewURL: '',
                                      });
                                      setFileUploded(false);
                                    }}
                                  >
                                    X Remove
                                  </button>
                                  <button
                                    onClick={() =>
                                      document
                                        .getElementById('getFile')
                                        ?.click()
                                    }
                                    className='border-r-2 text-white bg-[#003a70] px-3 py-2 font-light text-sm'
                                  >
                                    Edit
                                  </button>
                                  <input
                                    className='hidden'
                                    type='file'
                                    id='getFile'
                                    // value={fileToUpload?.name}
                                    onChange={fileReader}
                                    accept={'image/*'}
                                  />
                                </div>
                              ) : (
                                <div className='flex items-center justify-between border border-[#a5a5a5] text-medium-text pl-[5px] pr-[5px] pt-[5px] pb-[5px] rounded bg-[#ffffff]'>
                                  <div className='text-medium-text'>
                                    Upload Your Logo
                                  </div>
                                  <div className=''>
                                    <input
                                      type='file'
                                      name={'logo'}
                                      id={'logo'}
                                      // value={fileToUpload?.name}
                                      className='sr-only'
                                      onChange={fileReader}
                                      accept={'image/*'}
                                    />
                                    <label
                                      htmlFor='logo'
                                      className='btn-primary text-medium-text inline-flex flex-wrap items-center justify-between pl-[12px] pr-[12px] pt-[8px] pb-[8px]'
                                    >
                                      <span className='material-icons-round mr-[5px]'>
                                        folder_open
                                      </span>
                                      <span>Upload</span>
                                    </label>
                                  </div>
                                </div>
                              )}
                              {/* <Input
                            isRequired={false}
                            type='file'
                            id='upload2'
                            value={values.fileUpload}
                            name='fileUpload'
                            label=' Upload Your Logo'
                            onChange={fileReader}
                            placeholder='Upload Your Logo'
                          /> */}
                            </div>
                          </div>
                        )}
                      </div>
                      <Input
                        type='textarea'
                        label='Message'
                        isRequired={false}
                        placeholder='Message'
                        id='message'
                        onChange={handleChange}
                        name={'message'}
                        value={values.message}
                      />
                      <ReCAPTCHA
                        className='pt-4 first:pt-0'
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHASITEKEY || ''}
                        onChange={captchaHandler}
                      />
                      {captchaVerified === 'NOT_VALID' && (
                        <p className='text-rose-500'>
                          {__ValidationText.requestConsultation.captcha}
                        </p>
                      )}
                      <div className='w-full text-center'>
                        <input
                          type='submit'
                          className='btn btn-md btn-secondary w-full mb-[15px]'
                          value={'Submit'}
                        />
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendyForm;
function useActions(): { showLoader: any; openAlertModal: any } {
  throw new Error('Function not implemented.');
}
