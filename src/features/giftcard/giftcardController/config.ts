import * as Yup from 'yup';

export type _GiftCardconfig = {
  requiredValidationSchema: {
    isCodeRequired: boolean;
    isPinRequired: boolean;
  };
};
export const initialValidationScheme = (configKeys: _GiftCardconfig) => {
  const serialNoSchema = Yup.string().label('Serial No').min(16).max(16);
  const pinSchema = Yup.string().label('Pin').max(4);

  const validation: {
    serialNo: Yup.StringSchema<
      string | undefined,
      Yup.AnyObject,
      undefined,
      ''
    >;
    pin?: Yup.StringSchema<string | undefined, Yup.AnyObject, undefined, ''>;
    isGiftCardVoucher?: Yup.BooleanSchema<
      boolean | undefined,
      Yup.AnyObject,
      undefined,
      ''
    >;
  } = {
    serialNo: configKeys.requiredValidationSchema.isCodeRequired
      ? serialNoSchema.required('First Name is required')
      : serialNoSchema,
    pin: configKeys.requiredValidationSchema.isPinRequired
      ? Yup.string().when('isGiftCardVoucher', (isGiftCardVoucher) => {
        return isGiftCardVoucher[0]
          ? pinSchema
          : Yup.string().required('Pin is Required').min(4).max(4)
        })
      : pinSchema,
  };
  return validation;
};
