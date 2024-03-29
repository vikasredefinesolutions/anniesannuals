'use client';
import React, { ReactElement, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { _AccountClose, updatecustomeraccountclosed } from '@/shared/apis/user/customeraccountclosed';
import { _Payload } from '@/features/myAccount/deleteAccount/controller';
import { useRouter } from 'next/navigation';
import { paths } from '@/utils/paths.constant';

type _Props = {
  verificationPayload:_Payload | undefined
  cases: {
    view: (helpers: _Helpers) => ReactElement<any, any>;
  };
};
interface _Helpers {
  verificationError:string
  hookForm: { errors: any; register: any; handleSubmit: any };
  onSubmit: any;
}
const VerificationController: React.FC<_Props> = (_Props) => {
  const {cases , verificationPayload} = _Props
  const [verificationError,setVerificationError] = useState<string>("")
   const { push } = useRouter();
   
  const schema = yup.object({
  verificationCode: yup.string().min(6).max(6).required().label('Verification Code'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (values:{verificationCode:string}) => {
    const payLoad = {
      ...verificationPayload,
      deleteUnsubscribeEmailToken:values.verificationCode
    }
  
  const unsubscribeAccount = async () => {
      if(!payLoad?.deleteUnsubscribeEmailToken) throw new Error("Unsubscribe account token is missing") 
      try{
        const data = await updatecustomeraccountclosed(payLoad as _Payload)
        if(data === true){
          push(paths?.closeAccountSuccess)
        }else{
          setVerificationError(data?.deleteUnsubscribeEmailToken)
        }
      }catch(error:any){
        console.log(error?.message || "Account is not deleted")
      }
      }
    unsubscribeAccount()
  };
  
  return cases.view({
    verificationError,
    hookForm: { errors, register, handleSubmit },
    onSubmit,
  });
};

export default VerificationController;
