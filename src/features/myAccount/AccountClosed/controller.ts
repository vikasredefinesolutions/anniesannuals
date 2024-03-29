import React, { ReactElement, useEffect, useState } from "react";
import { getUserId } from "@/shared/utils/cookie.helper";
import { getUserDetailsById } from "@/shared/apis/user/fetchUserDetails";

interface _Props {
  configs: null;
  cases: {
    ready: (helper:_Helpers) => ReactElement<any, any>;
  };
}

interface _Helpers {
    userEmail:string | undefined
}

const AccountCloseController:React.FC<_Props> = (_Props) => {
  const {cases} = _Props
  const [status, setStatus] = useState<'loading' | 'empty' | 'ready'>('ready');
  const [userEmail,setUserEmail] = useState<string | undefined>("")
  const userId = getUserId()

  const getUserData = async () => {
  try{
    const data =await getUserDetailsById(userId)
    setUserEmail(data?.email)
  }catch(error:any){
    console.log(error?.message || 'User data is not found')
  }
}

 useEffect(() => {
    getUserData()
  },[])


if (status === 'ready') {
    return cases.ready({userEmail})
}

return null
}

export default AccountCloseController