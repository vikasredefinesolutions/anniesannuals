import * as Yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(Yup);

export const initialValidationScheme = (configKeys: _LoginConfig) => {
  const validation: {
    password: Yup.StringSchema<
      string | undefined,
      Yup.AnyObject,
      undefined,
      ''
    >;
    email: Yup.StringSchema<string, Yup.AnyObject, undefined, ''>;
    rememberMe?: Yup.BooleanSchema<
      boolean | undefined,
      Yup.AnyObject,
      undefined,
      ''
    >;
  } = {
    password: Yup.string().required().label("Password") ,
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  };

  if (configKeys.enableFeatures.rememberMeButton) {
    validation['rememberMe'] = Yup.boolean();
    return validation;
  }

  return validation;
};

export type _LoginConfig = {
  enableFeatures: {
    rememberMeButton: boolean;
    showPasswordButton: boolean;
  };
};
