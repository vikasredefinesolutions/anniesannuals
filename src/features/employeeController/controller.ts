import CryptoJS from 'crypto-js';
import { employeeData } from './config';
import { useSearchParams, useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { employeeActions } from '@/app/redux/slices/employeeSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

export type EmployeeDataObject = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
};
const EmployeeController = () => {
  const { updateEmployee } = employeeActions;
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  let employeeID = searchParams.get('id');
  const decryptData = () => {
    try {
      if (typeof employeeID === 'string') {
        //for Employee Id
        employeeID = employeeID?.replaceAll(' ', '+');
        const employeeIdBytes = CryptoJS.AES.decrypt(
          employeeID,
          employeeData.secretPass,
        );
        let stringyfiedEmployeeIdBytes = employeeIdBytes.toString(
          CryptoJS.enc.Utf8,
        );
        const decrptedEmployeeId = JSON.parse(stringyfiedEmployeeIdBytes);
        console.log(decrptedEmployeeId.email);

        //For userMailId

        if (decrptedEmployeeId) {
          setCookie('emp_id', JSON.stringify(decrptedEmployeeId.id.toString()));
          setCookie(
            'emp_email',
            JSON.stringify(decrptedEmployeeId.email.toString()),
          );
          dispatch(
            updateEmployee({
              empId: decrptedEmployeeId.id,
              employee: {
                firstname: decrptedEmployeeId.firstName,
                lastName: decrptedEmployeeId.lastName,
                email: decrptedEmployeeId.email,
                customerName: '',
                customerEmail: '',
              },
            }),
          );
          //alert('Employee Login Success');
        }
      }
    } catch (error) {
      console.log('error in Employee Controller', error);
    }
  };

  useEffect(() => {
    decryptData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default EmployeeController;
