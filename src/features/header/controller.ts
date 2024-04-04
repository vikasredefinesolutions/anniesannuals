import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { clearCart } from '@/app/redux/slices/cartSlice';
import { setGrowingZone } from '@/app/redux/slices/commonSlice';
import { employeeActions } from '@/app/redux/slices/employeeSlice';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import { fetchGrowingZone } from '@/shared/apis/common/common';
import {
  EMP_EMAIL,
  EMP_ID,
  GROWING_ZONE,
  USER_DETAILS,
  USER_ID,
  getEmployeeEmail,
  getEmployeeId,
  getGrowingZone,
} from '@/shared/utils/cookie.helper';
import storeDetails from '@/staticData/storeDetails.json';
import { TEMPUSER_ID } from '@/utils/cookie.helper';
import { fetchZipcodefromGeolocation } from '@/utils/helpers';
import { paths } from '@/utils/paths.constant';
import {
  CookieValueTypes,
  deleteCookie,
  getCookie,
  setCookie,
} from 'cookies-next';
import { usePathname, useRouter } from 'next/navigation';
import { ReactElement, useEffect } from 'react';

interface _FooterHelper {
  orderTotal: number;
  handleSignIn: () => void;
  handleSignOut: () => void;
  userId: CookieValueTypes;
}

type _Props = {
  cases: {
    view: (helpers: _FooterHelper) => ReactElement<any, any>;
  };
};

const HeaderController: React.FC<_Props> = ({ cases }) => {
  const urlPathName = usePathname();
  let userId = getCookie(USER_ID);
  const dispatch = useAppDispatch();

  const growingZone = getGrowingZone();
  const { updateEmployee } = employeeActions;

  const fetchZipcodeAndGrowingZone = async () => {
    try {
      const geoLocation = await fetchZipcodefromGeolocation();
      if (geoLocation?.postal) {
        const growingZone = await fetchGrowingZone(
          geoLocation?.postal,
          storeDetails?.storeId,
        );
        if (growingZone?.length) {
          const growingZoneData = growingZone[0];
          setCookie(
            GROWING_ZONE,
            JSON.stringify({
              ...growingZoneData,
              zipCode: geoLocation?.postal,
            }),
          );
          dispatch(
            setGrowingZone({
              ...growingZoneData,
              zipCode: geoLocation?.postal,
            }),
          );
          window.location.reload();
        }
      }
    } catch (error) {
      dispatch(
        openAlertModal({
          title: 'Error',
          description: 'Something Went Wrong in Credit Card Form',
          isAlertModalOpen: true,
        }),
      );
    }
  };

  useEffect(() => {
    let empId = getEmployeeId();
    let empEamil = getEmployeeEmail();

    if (empId && empEamil) {
      dispatch(
        updateEmployee({
          empId: empId,
          employee: {
            firstname: '',
            lastName: '',
            email: empEamil,
            customerName: '',
            customerEmail: '',
          },
        }),
      );
    }
  }, []);

  useEffect(() => {
    if (!growingZone) {
      fetchZipcodeAndGrowingZone();
    }
  }, []);

  // total Cart-item Count
  const { orderTotal } = useAppSelector((state) => state.cart);
  const router = useRouter();

  const handleSignIn = () => {
    if (userId) {
      router.push(`${paths.accountSetting}`);
    } else {
      router.push(`${paths.login}?redirect=${encodeURIComponent(urlPathName)}`);
    }
  };

  const handleSignOut = () => {
    deleteCookie(USER_ID);
    deleteCookie(USER_DETAILS);
    deleteCookie(TEMPUSER_ID);
    let employeeId = getEmployeeId();
    let employeeEmail = getEmployeeEmail();
    if (employeeEmail && employeeId) {
      deleteCookie(EMP_ID);
      deleteCookie(EMP_EMAIL);
      dispatch(updateEmployee('CLEAN_UP'));
    }
    dispatch(clearCart());
    router.push(`${paths.login}`);
  };

  return cases.view({
    orderTotal,
    handleSignIn,
    handleSignOut,
    userId,
  });
};

export default HeaderController;
