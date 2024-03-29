const userAPIRoutes = {
  signIn: 'StoreCustomer/customerlogin.json',
  signUp: 'StoreCustomer/storecustomercreate.json',
  getUserDetailsById: '/StoreCustomer/get/',
  updateUserDetails: 'StoreCustomer/updateaccountsettingsinfo.json',
  decryptUserPassword: 'DataProtectServices/decrypt.json?password=',
  deleteAddress: 'StoreCustomer/deletestorecustomeraddress.json',
  fetchSecurityQuestionArr:
    'SecurityQuestionMaster/getsecurityquestionmasterdropdown.json',
  createSecurityQuestionAnswer: 'CustomerSecurityQuestionAnswer/Create',
  createSubscribeDetails:
    'SubscribeDetailsForAlertCommunications/createsubscribedetails.json',
  getSubscribedetailsByCustomerId:
    'SubscribeDetailsForAlertCommunications/getsubscribedetailsbycustomerid',
};

const homeComponents = {
  fetchPageMetadata: 'CmsTopicsPublish/getpagetypebyslug.json',
  fetchPageComponents: 'CmsComponents/getpagecomponents.json',
  shopByType: 'StoreProduct/getshopbytype.json',
  getNewCrops: 'StoreProduct/getnewcrops',
  fetchCmsComponents: 'CmsComponents/getpagecomponents',
  fetchBannerDetails: 'Brand/getbannerdeatilsbystoreid.json',
  getFeaturedProductitemsByTagnameandsename:
    'StoreProduct/getfeaturedproductitemsbytagnameandsename.json',
  getNewsletterArchive: 'NewsletterArchive/getnewsletterarchivebystoreid',
  getNewsLetterDetails: 'NewsletterArchive/getnewsletterarchivebyid',
  getTestimonialByStoreid: 'Testimonial/gettestimonialbystoreid',
  fetchSearchInput: '/StoreProduct/globalsearch.json',
  fetchAllBrands: '/Brand/getbrandbystoreid',
  uploadImage: '/upload/image',
};

const storeApiRoutes = {
  storeDetails: 'Store/getstorebydomain.json',
  mergedStoreDetails: 'Store/getstorebydomainmerge.json',
  gardenSlideshow: 'Store/getgardenslideshow',
};

const giftCardRoutes = {
  addGiftCard: 'CustomerGiftCardOrVoucher/createcustomergiftcardorvoucher.json',
  getAllGiftCards: 'CustomerGiftCardOrVoucher/getgiftcardorvoucharbycustomerid',
  getGiftCardListing: 'GiftCardProduct/getlistgiftcardproduct.json',
  getGiftCardDetails: 'StoreProduct/giftproductdetailsbysename',
  addGiftCardDetails: 'Store/addtocart.json',
};

const headerAPIRoutes = {
  getFeaturedProductItems:
    'StoreProduct/getfeaturedproductitemsbytagnameandsename.json',
};

const categoryAPIRoutes = {
  fetchCategoryList: 'Category/getcategorylist.json',
};
const contactUsRoutes = {
  postCreateContactUs: 'ContactUs/CreateContactUs.json',
};

export const apiRoutes = {
  ...userAPIRoutes,
  ...homeComponents,
  ...storeApiRoutes,
  ...categoryAPIRoutes,
  ...giftCardRoutes,
  ...headerAPIRoutes,
  ...contactUsRoutes,
};
