import * as Yup from 'yup';

export type _GiftCardDetailsConfig = {
  requiredValidationSchema: {
    isFirstNameRequired: boolean;
    isLastNameRequired: boolean;
    isEmailRequired: boolean;
  };
};
const InitialValidationSchema = (configKeys: _GiftCardDetailsConfig) => {
  const firstNameSchema = Yup.string()
    .required('Recipient First Name is required.')
    .label('Recipient First Name');
  const lastNameSchema = Yup.string()
    .required('Recipient Last Name is required.')
    .label('Recipient Last Name');
  const emailSchema = Yup.string()
    .email()
    .required('Email is required.')
    .label('Email');

  const validation: {
    firstName: Yup.StringSchema<
      string | undefined,
      Yup.AnyObject,
      undefined,
      ''
    >;
    lastName: Yup.StringSchema<
      string | undefined,
      Yup.AnyObject,
      undefined,
      ''
    >;
    email: Yup.StringSchema<string | undefined, Yup.AnyObject, undefined, ''>;
    subjectLine: Yup.StringSchema<
      string | undefined,
      Yup.AnyObject,
      undefined,
      ''
    >;
    message: Yup.StringSchema<string | undefined, Yup.AnyObject, undefined, ''>;
    eGiftCardValue: Yup.StringSchema<
      string | undefined,
      Yup.AnyObject,
      undefined,
      ''
    >;
    mailGiftCardValue: Yup.StringSchema<
      string | undefined,
      Yup.AnyObject,
      undefined,
      ''
    >;
    imageText: Yup.StringSchema<
      string | undefined,
      Yup.AnyObject,
      undefined,
      ''
    >;
    confirmEmail: Yup.StringSchema<
      string | undefined,
      Yup.AnyObject,
      undefined,
      ''
    >;
    address1: Yup.StringSchema<
      string | undefined,
      Yup.AnyObject,
      undefined,
      ''
    >;
    address2: Yup.StringSchema<
      string | undefined,
      Yup.AnyObject,
      undefined,
      ''
    >;
    city: Yup.StringSchema<string | undefined, Yup.AnyObject, undefined, ''>;
    state: Yup.StringSchema<string | undefined, Yup.AnyObject, undefined, ''>;
    zipCode: Yup.StringSchema<string | undefined, Yup.AnyObject, undefined, ''>;
  } = {
    firstName: configKeys.requiredValidationSchema.isFirstNameRequired
      ? firstNameSchema.required()
      : firstNameSchema,
    lastName: configKeys.requiredValidationSchema.isLastNameRequired
      ? lastNameSchema.required()
      : lastNameSchema,
    email: configKeys.requiredValidationSchema.isEmailRequired
      ? emailSchema.required()
      : emailSchema,
    subjectLine: Yup.string().label('Email Subject'),
    message: Yup.string()
      .label('Message')
      .min(0, 'Message Text must be at least 0 characters long.')
      .max(100, 'Message Text must be at most 100 characters long.'),
    imageText: Yup.string().label('Image'),
    eGiftCardValue: Yup.string().label('EGift Card'),
    mailGiftCardValue: Yup.string().label('Physical Gift Card'),
    address1: Yup.string()
      .when('imageText', {
        is: (imageText: string) => {
          if (imageText) {
            return true;
          }
        },
        then: (schema) => schema.required('AddressLine1 is required.'),
      })
      .label('Address 1'),
    address2: Yup.string().label('Address2'),
    city: Yup.string()
      .when('imageText', {
        is: (imageText: string) => {
          if (imageText) {
            return true;
          }
        },
        then: (schema) => schema.required('City is required.'),
      })
      .label('City'),
    confirmEmail: Yup.string()
      .email()
      .oneOf([Yup.ref('email')], 'Email and ConfirmEmail do not match')
      .required('Confirm Email is required.')
      .label('Email'),
    state: Yup.string()
      .when('imageText', {
        is: (imageText: string) => {
          if (imageText) {
            return true;
          }
        },
        then: (schema) => schema.required('State is required.'),
      })
      .label('State'),
    zipCode: Yup.string()
      .when('imageText', {
        is: (imageText: string) => {
          if (imageText) {
            return true;
          }
        },
        then: (schema) => schema.required('ZipCode is required.'),
      })
      .label('ZipCode'),
  };
  return validation;
};

export default InitialValidationSchema;
