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
    .required('First name is required')
    .label('First Name');
  const lastNameSchema = Yup.string()
    .required('Last name is required')
    .label('Last Name');
  const emailSchema = Yup.string()
    .email()
    .required('Email is required')
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
      .min(0, 'Message Text must be at least 0 characters long')
      .max(100, 'Message Text must be at most 100 characters long'),
  };
  return validation;
};

export default InitialValidationSchema;
