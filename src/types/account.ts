export interface UserData {
  name: string;
  customerRoleName: string;
  storeName: string;
  createdByName: string | null;
  modifiedByName: string | null;
  companyName: string;
  customerAddress: {
    id: number;
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
    phone: string | null;
    fax: string;
    countryName: string;
    countryCode: string;
    addressType: string;
    isDefault: boolean;
    recStatus: string;
    createdDate: string | null;
    createdBy: string | null;
    modifiedDate: string | null;
    modifiedBy: string | null;
    rowVersion: string;
    location: string | null;
    ipAddress: string | null;
    macAddress: string | null;
  }[];
  id: number;
  firstname: string;
  lastName: string;
  email: string;
  password: string;
  jobTitle: string;
  companyId: number;
  tierId: number;
  isRegistered: number;
  storeId: number;
  sharedCustomerId: number;
  isLocked: boolean;
  navCustomerId: string;
  isSuperuser: boolean;
  customerType: string;
  isTaxableuser: boolean;
  industryId: number;
  customerRoleId: number;
  birthDate: string | null;
  gender: string;
  isForceAdminForResetPassword: boolean;
  resetPasswordRequestDate: string | null;
  resetPasswordChangedDate: string | null;
  forgotPasswordResetToken: string | null;
  klaviyoProfileId: string;
  isUseNet: boolean;
  customerLastActiveDate: string | null;
  memberFrom: number;
  memberTo: number;
  organizationId: number;
  primaryColor: string;
  mascotId: string;
  teamGender: string;
  timeOfYearPurchase: string;
  position: string;
  organizationName: string;
  primarySport: number;
  isCustomerPersonalization: null | boolean;
  leadUrl: null | string;
  sessionId: string;
  language: null | string;
  currency: string;
  recStatus: string;
  createdDate: string;
  createdBy: number;
  modifiedDate: string;
  modifiedBy: number;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
} 