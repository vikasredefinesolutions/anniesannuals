import { apiRoutes } from '@/api/apiRoutes';
import axiosClient from '@/api/axiosClient/axiosClient';
import storeDetails from '@/staticData/storeDetails.json';

export const userSignup = async (payload: _SignInFormFields) => {
  try {
    const response = await axiosClient.post(apiRoutes.signUp, payload);
    return response;
  } catch (error) {
    console.log('Error inUserSignUp', error);
  }
};

export interface _SignInFormFields {
  storeCustomerModel: {
    id: number;
    rowVersion: string;
    location: string;
    ipAddress: string;
    macAddress: string;
    Firstname: string;
    LastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    companyName: string;
    jobTitle: string;
    companyId: number;
    sharedCustomerId: number;
    navCustomerId: string;
    customerType: string;
    storeId: number;
    isTaxableuser: boolean;
    storeCustomerAddress: ICustomerSignUpAddressFields[] | [];
    recStatus: 'A';
    industryId: number;
    gender: string;
    memberFrom: number;
    memberTo: number;
    organizationId: number;
    primaryColor: string;
    mascotId: string;
    teamGender: string;
    timeOfYearPurchase: string;
    position: string;
    birthDate: null;
    organizationName: string;
    customerPhoneNumber: string;
    primarySport: number;
  };
}

export interface ICustomerSignUpAddressFields {
  id: number;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
  customerId: number;
  firstname: string;
  lastName: string;
  companyName: string;
  email: string;
  address1: string;
  address2: string;
  suite: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  fax: string;
  countryName: string;
  countryCode: string;
  addressType: 'B';
  isDefault: boolean;
  recStatus: string;
}

export const initialSignUpPayload: _SignInFormFields = {
  storeCustomerModel: {
    id: 0,
    rowVersion: '',
    location: '',
    ipAddress: '',
    macAddress: '00-00-00-00-00-00',
    Firstname: '',
    LastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: 'companyName',
    jobTitle: '',
    companyId: 0,
    sharedCustomerId: 0,
    navCustomerId: '',
    customerType: '',
    storeId: storeDetails.storeId,
    isTaxableuser: false,
    storeCustomerAddress: [
      // {
      //   id: 0,
      //   rowVersion: '',
      //   location: '',
      //   ipAddress: '',
      //   macAddress: '00-00-00-00-00-00',
      //   customerId: 0,
      //   firstname: 'firstname',
      //   lastName: 'lastname',
      //   companyName: '',
      //   email: 'email',
      //   address1: '',
      //   address2: '',
      //   suite: '',
      //   city: '',
      //   state: '',
      //   postalCode: '',
      //   phone: 'phone',
      //   fax: '',
      //   countryName: '',
      //   countryCode: '',
      //   addressType: 'B',
      //   isDefault: false,
      //   recStatus: 'A',
      // },
    ],
    recStatus: 'A',
    industryId: 0,
    gender: '',
    memberFrom: 0,
    memberTo: 0,
    organizationId: 0,
    primaryColor: '',
    mascotId: '',
    teamGender: '',
    timeOfYearPurchase: '',
    position: '',
    birthDate: null,
    organizationName: '',
    primarySport: 0,
    customerPhoneNumber: '',
  },
};
