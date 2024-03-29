import {
  passwordRegExp,
  __ValidationText,
  phonePattern2,
  phonePattern3,
  phonePattern4,
  phonePattern1,
} from '@/utils/helpers';
import * as Yup from 'yup';

export type _Config = {
  enableFeatures: {
    rememberMeButton?: boolean;
    confirmPassword?: boolean;
  };
  requiredValidationSchema: {
    isFirstNameRequired: boolean;
    isLastNameRequired: boolean;
    isEmailRequired: boolean;
    isConfirmPassword?: boolean;
    isPhoneNumberRequired?: boolean;
  };
};

export const initialValidationScheme = (configKeys: _Config) => {
  const firstNameSchema = Yup.string().label('First Name');
  const lastNameSchema = Yup.string().label('Last Name');
  const emailSchema = Yup.string().email().label('Email');
  const phoneSchema = Yup.string()
    .trim()
    .required(__ValidationText.phone.required);

  const validation: {
    Firstname: Yup.StringSchema<
      string | undefined,
      Yup.AnyObject,
      undefined,
      ''
    >;
    LastName: Yup.StringSchema<
      string | undefined,
      Yup.AnyObject,
      undefined,
      ''
    >;
    password: Yup.StringSchema<
      string | undefined,
      Yup.AnyObject,
      undefined,
      ''
    >;
    email: Yup.StringSchema<string | undefined, Yup.AnyObject, undefined, ''>;
    phone: Yup.StringSchema<string | undefined, Yup.AnyObject, undefined, ''>;
    rememberMe?: Yup.BooleanSchema<
      boolean | undefined,
      Yup.AnyObject,
      undefined,
      ''
    >;
    confirmPassword?: Yup.StringSchema<string, Yup.AnyObject, undefined, ''>;
  } = {
    Firstname: configKeys.requiredValidationSchema.isFirstNameRequired
      ? firstNameSchema.required('First Name is required')
      : firstNameSchema,
    LastName: configKeys.requiredValidationSchema.isLastNameRequired
      ? lastNameSchema.required('Last Name is required')
      : lastNameSchema,
    password: Yup.string().matches(
      passwordRegExp,
      'Password must match the below criteria',
    ),
    email: configKeys.requiredValidationSchema.isEmailRequired
      ? emailSchema.required('Email is required')
      : emailSchema,

    phone: configKeys.requiredValidationSchema.isPhoneNumberRequired
      ? phoneSchema.test(
          'phone-test',
          __ValidationText.phone.valid,
          (value) => {
            if (
              phonePattern1.test(value || '') ||
              phonePattern2.test(value || '') ||
              phonePattern3.test(value || '') ||
              phonePattern4.test(value || '')
            ) {
              return true;
            }
            return false;
          },
        )
      : Yup.string(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Password does match')
      .required()
      .label('Confirm Password'),
  };

  if (configKeys.enableFeatures.rememberMeButton) {
    validation['rememberMe'] = Yup.boolean();
  }

  if (configKeys?.enableFeatures.confirmPassword) {
    validation['confirmPassword'] = Yup.string()
      .required('Please re-type your password')
      .oneOf([Yup.ref('password')], 'Password does not match');
  }
  return validation;
};
