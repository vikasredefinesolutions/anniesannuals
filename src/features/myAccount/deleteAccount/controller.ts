import React, { ReactElement, useEffect, useState } from 'react'
import { _UserInfo } from './../../../shared/apis/user/fetchUserDetails';
import useModel from '@/stores/annies/shared/hooks/use-model';
import { getUserDetailsById } from '@/shared/apis/user/fetchUserDetails';
import { getUserId } from '@/shared/utils/cookie.helper';
import { IUserDetails } from '@/shared/types/user';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { _AccountClose, deleteAccountAndUnscribeEmail } from '@/shared/apis/user/customeraccountclosed';


interface _Props {
  configs: null;
  cases: {
    ready: (helper:_Helper) => ReactElement<any, any>;
  };
}
interface _Helper {
  payload:_Payload | undefined
  onSubmit: (values:_OpenModel) => void;
  hookForm: { errors: any; register: any; handleSubmit: any };
  userEmail:string | undefined,
  isOpen:boolean,
  onRequestClose:() => void
}
 
interface _OpenModel {
isConfirmCloseMyAccount:boolean,
isUnsubscribe:boolean
}

export interface _Payload {
  customerId: number,
  isUnsubscribe:boolean,
  isConfirmCloseMyAccount:boolean,
  deleteUnsubscribeEmailToken: string
}

const DeleteAccountController:React.FC<_Props> = ({cases}) => {
const [status, setStatus] = useState<'loading' | 'empty' | 'ready'>('ready');
const [userData,setUserData]  = useState<IUserDetails|null >()
const [userEmail,setUserEmail] = useState<string | undefined>("")
const {isOpen,openModel,onRequestClose} = useModel(false)
const [payload,setPayload] = useState<_Payload >()
const userId = getUserId();

const getUserData = async () => {
  try{
    const data =await getUserDetailsById(userId)
    setUserData(data)
    setUserEmail(data?.email)
  }catch(error:any){
    console.log(error?.message || 'User data is not found')
  }
}

const scheme =yup.object({
 isUnsubscribe: yup.boolean().default(false),
 isConfirmCloseMyAccount:yup.boolean().oneOf([true],"Please check here for close your account").required().default(false)
})

const hookForm = useForm({
  resolver: yupResolver(scheme),
    defaultValues: {
      isUnsubscribe:false,
      isConfirmCloseMyAccount:false
    }
})

const {
  register,
  formState: { errors },
  handleSubmit,
} = hookForm;

const deleteaccountandunscribeemail = async () => {
  try{
    await deleteAccountAndUnscribeEmail(userId)
  }catch(error:any){
    console.log(error?.message || "Delete unsubscribe email token is not generated")
  }
}

const onSubmit = (values:_OpenModel) => {
  if(values?.isConfirmCloseMyAccount === true) {
    openModel()
  }
  deleteaccountandunscribeemail()
  getUserData()
  setPayload({
    customerId: userData?.id as number,
    isUnsubscribe: values?.isUnsubscribe,
    isConfirmCloseMyAccount: values?.isConfirmCloseMyAccount,
    deleteUnsubscribeEmailToken: userData?.deleteUnsubscribeEmailToken as string
    })
}

  useEffect(() => {
    getUserData()
  },[])

if (status === 'ready') {
    return cases.ready({payload,hookForm:{errors,register,handleSubmit},onSubmit,userEmail,isOpen,onRequestClose});
}
}

export default DeleteAccountController