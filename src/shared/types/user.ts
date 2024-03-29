export interface IUserDetails {
  customerAddress: CustomerAddress[];
  name: string;
  customerRoleName: string;
  storeName: string;
  createdByName: null;
  modifiedByName: null;
  companyName?: string;
  securityQuestionMasterId: number;
  customerSecurityQuestionAnswer: string;
  id: number;
  firstname: string;
  lastName: string;
  email: string;
  password: string;
  jobTitle: null;
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
  birthDate: null;
  gender: string;
  isForceAdminForResetPassword: boolean;
  resetPasswordRequestDate: null;
  resetPasswordChangedDate: null;
  forgotPasswordResetToken: null;
  klaviyoProfileId: string;
  isUseNet: boolean;
  customerLastActiveDate: null;
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
  isCustomerPersonalization: null;
  leadUrl: null;
  sessionId: string;
  language: null;
  currency: string;
  deleteUnsubscribeEmailToken: string;
  deleteUnsubscribeEmailTokenExpiryDateTime: null;
  recStatus: string;
  createdDate: string;
  createdBy?: string;
  modifiedDate: string;
  modifiedBy: number;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
}

export interface CustomerAddress {
  address1: string;
  address2: string;
  addressType: string;
  city: string;
  companyName?: string;
  countryCode: string;
  countryName: string;
  createdBy?: string;
  createdDate?: null;
  customerId: number;
  email: string;
  fax: string;
  firstname: string;
  id: number;
  ipAddress?: null;
  isDefault: boolean;
  lastName: string;
  location?: null;
  macAddress?: null;
  modifiedBy?: null;
  modifiedDate?: null;
  phone: string;
  postalCode: string;
  recStatus: string;
  rowVersion: string;
  state: string;
  suite: string;
}
