import * as Yup from "yup";

// Define validation schema for the form
export const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Please Enter Full Name"),
  emailId: Yup.string()
    .required("Please Enter Email Id")
    .email("Please Enter a Valid Email Address"),
  mobile: Yup.string()
    .required("Please Enter Your Mobile No.")
    .matches(/^[0-9]{10}$/, "Please Enter a Valid 10-digit Mobile Number"),
  password: Yup.string()
    .required("Please Enter Your Password")
    .min(6, "Password must be at least 6 characters long"),
  country: Yup.string().required("Please Select country"),
  langKnown: Yup.array().min(1, "Please select at least one option"),
  selectedDate: Yup.date(),
  description: Yup.string(),
  hobbies: Yup.array().min(1, "Please select at least one hobby"),
  gender: Yup.string(),
});

// permission
export const createPermissionSchema = {
  name: Yup.string().required("Please Enter Permission Name"),
  parent: Yup.string().required("Please Enter parent Id"),
};

export const updatePermissionSchema = {
  name: Yup.string().required("Please Enter Permission Name"),
  parent: Yup.string(),
};

// Role
export const createRoleSchema = {
  name: Yup.string().required("Please Enter Role Name"),
  permission: Yup.array(),
};

// users
export const createUserSchema = {
  firstName: Yup.string().required("Please Enter FirstName"),
  lastName: Yup.string().required("Please Enter LastName"),
  email: Yup.string()
    .required("Please Enter Email Id")
    .email("Please Enter a Valid Email Address"),
  password: Yup.string()
    .required("Please Enter Your Password")
    .min(6, "Password must be at least 6 characters long"),
  mobile: Yup.string()
    .required("Please Enter Your Mobile No.")
    .matches(/^[0-9]{10}$/, "Please Enter a Valid 10-digit Mobile Number"),
};

export const updateUserSchema = {
  email: Yup.string()
    .required("Please Enter Email Id")
    .email("Please Enter a Valid Email Address"),
  firstName: Yup.string().required("Please Enter Name"),
};

export const updateUserStatusSchema = {
  bannedReason: Yup.string().required("Please Enter Reason"),
};

//category
export const createCategorySchema = {
  categoryName: Yup.string().required("Please Enter category Name"),
  description: Yup.string().required("Please Enter description"),
  categoryStatus: Yup.string().required("Please Select status"),
  parentCategoryId: Yup.string().required("Please select category"),
};

export const updateCategorySchema = {
  categoryName: Yup.string().required("Please Enter category Name"),
  description: Yup.string().required("Please Enter description"),
  categoryStatus: Yup.string().required("Please Select status"),
};

//product
export const createProductSchema = {
  productName: Yup.string().required("Please Enter product Name"),
  description: Yup.string().required("Please Enter description"),
  price: Yup.string().required("Please Enter price"),
  quantity: Yup.string().required("Please Enter quantity"),
  categoryId: Yup.string().required("Please Select Category"),
  brandId: Yup.string().required("Please Select Brand"),
  SKU: Yup.string().required("Please Enter SKU"),
  weight: Yup.string().required("Please Enter weight"),
  length: Yup.string().required("Please Enter length"),
  width: Yup.string().required("Please Enter width"),
  height: Yup.string().required("Please Enter height"),
  optionalNotes: Yup.string(),
};

export const updateProductSchema = {
  productName: Yup.string().required("Please Enter product Name"),
  description: Yup.string().required("Please Enter description"),
  price: Yup.string().required("Please Enter price"),
  quantity: Yup.string().required("Please Enter quantity"),
  SKU: Yup.string().required("Please Enter SKU"),
  categoryId: Yup.string().required("Please Select Category"),
  brandId: Yup.string().required("Please Select Brand"),
  weight: Yup.string().required("Please Enter weight"),
  length: Yup.string().required("Please Enter length"),
  width: Yup.string().required("Please Enter width"),
  height: Yup.string().required("Please Enter height"),
  optionalNotes: Yup.string(),
};

//notification
export const sendNotificationSchema = {
  mobile: Yup.string().required("Please Enter mobile number"),
  message: Yup.string().required("Please Enter message"),
};

// setting
export const createSettingSchema = {
  key: Yup.string().required("Please enter a key."),
  value: Yup.string().required("Please enter a value."),
  label: Yup.string().required("Please enter a label."),
  description: Yup.string().required("Please enter a description."),
};

export const updateSettingSchema = {
  key: Yup.string().required("Please enter a key."),
  value: Yup.string().required("Please enter a value."),
  label: Yup.string().required("Please enter a label."),
  description: Yup.string().required("Please enter a description."),
  settingId: Yup.string(),
};

// post Type
export const createPostTypeSchema = {
  name: Yup.string().required("Please Enter PostType Name"),
};

export const updatePostTypeSchema = {
  name: Yup.string().required("Please Enter Post Type Name"),
  postTypeId: Yup.string(),
};

// post Category
export const createPostCategorySchema = {
  name: Yup.string().required("Please Enter PostCategory Name"),
  categoryStatus: Yup.string().required("Please Select category Status"),
  metaTitle: Yup.string().required("Please Enter metaTitle Name"),
  metaDescription: Yup.string().required("Please Enter metaDescription Name"),
  metaKeywords: Yup.string().required("Please Enter metaKeywords Name"),
};

export const updatePostCategorySchema = {
  name: Yup.string().required("Please Enter Post Category Name"),
  postCategoryId: Yup.string(),
  categoryStatus: Yup.string().required("Please Select category Status"),
  metaTitle: Yup.string().required("Please Enter metaTitle Name"),
  metaDescription: Yup.string().required("Please Enter metaDescription Name"),
  metaKeywords: Yup.string().required("Please Enter metaKeywords Name"),
};

// PG
export const createPGSchema = {
  paymentGatewayName: Yup.string().required(
    "Please enter payment gateway name"
  ),
  paymentGatewayUrl: Yup.string()
    .url("Please enter a valid URL")
    .required("Please enter payment gateway URL"),
  paymentGatewayMode: Yup.string().required(
    "Please enter payment gateway mode"
  ),
  keyId: Yup.string().required("Please enter key ID"),
  keySecret: Yup.string().required("Please enter key secret"),
  merchantId: Yup.string().required("Please enter merchant ID"),
  merchantKey: Yup.string().required("Please enter merchant key"),
  clientId: Yup.string().required("Please enter client ID"),
  clientSecret: Yup.string().required("Please enter client secret"),
  other: Yup.string(),
};

export const updatePGSchema = {
  paymentGatewayName: Yup.string().required(
    "Please enter payment gateway name"
  ),
  paymentGatewayUrl: Yup.string()
    .url("Please enter a valid URL")
    .required("Please enter payment gateway URL"),
  paymentGatewayMode: Yup.string().required(
    "Please enter payment gateway mode"
  ),
  keyId: Yup.string().required("Please enter key ID"),
  keySecret: Yup.string().required("Please enter key secret"),
  merchantId: Yup.string().required("Please enter merchant ID"),
  merchantKey: Yup.string().required("Please enter merchant key"),
  clientId: Yup.string().required("Please enter client ID"),
  clientSecret: Yup.string().required("Please enter client secret"),
  other: Yup.string(),
};

// coupon
export const createCouponSchema = {
  couponCode: Yup.string().required("Please enter coupon code"),
  discountType: Yup.string().required("Please enter discount type"),
  discountAmount: Yup.number().required("Please enter discount amount"),
  expiryDate: Yup.string().required("Please enter expiry date"),
  isActive: Yup.string(),
  usageCount: Yup.number().required("Please enter usage count"),
  description: Yup.string().required("Please enter coupon description"),
};

export const updateCouponSchema = {
  couponCode: Yup.string().required("Please enter coupon code"),
  discountType: Yup.string().required("Please enter discount type"),
  discountAmount: Yup.number().required("Please enter discount amount"),
  expiryDate: Yup.string().required("Please enter expiry date"),
  isActive: Yup.string(),
  usageCount: Yup.number().required("Please enter usage count"),
  description: Yup.string().required("Please enter coupon description"),
};

//employee
export const createEmployeeSchema = {
  email: Yup.string()
    .required("Please Enter Email Id")
    .email("Please Enter a Valid Email Address"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Please enter a password"),
  firstName: Yup.string().required("Please enter your first name"),
  lastName: Yup.string().required("Please enter your last name"),
  mobile: Yup.string()
    .matches(/^\d{10}$/, "Invalid mobile number")
    .required("Please enter your mobile number"),
  role: Yup.string().required("Please enter a role"),
};

export const updateEmployeeSchema = {
  email: Yup.string()
    .required("Please Enter Email Id")
    .email("Please Enter a Valid Email Address"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Please enter a password"),
  firstName: Yup.string().required("Please enter your first name"),
  lastName: Yup.string().required("Please enter your last name"),
  mobile: Yup.string()
    .matches(/^\d{10}$/, "Invalid mobile number")
    .required("Please enter your mobile number"),
  role: Yup.string().required("Please enter a role"),
};

export const updateEmployeeStatusSchema = {
  bannedReason: Yup.string().required("Please Enter Reason"),
};

//ticket
export const createTicketSchema = {
  userId: Yup.string().required("Please select User"),
  requestedBy: Yup.string().required("Please enter requester's password"),
  email: Yup.string()
    .required("Please Enter Email Id")
    .email("Please Enter a Valid Email Address"),
  type: Yup.string().required("Please enter user's last name"),
  subject: Yup.string().required("Please enter subject"),
  description: Yup.string().required("Please enter description"),
  priority: Yup.string().required("Please select priority"),
};

export const updateTicketSchema = {
  userId: Yup.string().required("Please select User"),
  requestedBy: Yup.string().required("Please enter requester's password"),
  email: Yup.string()
    .required("Please Enter Email Id")
    .email("Please Enter a Valid Email Address"),
  type: Yup.string().required("Please enter user's last name"),
  subject: Yup.string().required("Please enter subject"),
  description: Yup.string().required("Please enter description"),
  priority: Yup.string().required("Please select priority"),
  id: Yup.string(),
};

export const createHeroSliderSchema = {
  bannerTitle: Yup.string().required("Please Enter category Name"),
  bannerDescription: Yup.string().required("Please Enter category Name"),
  bannerButtonText: Yup.string().required("Please Enter category Name"),
  bannerButtonLink: Yup.string().required("Please Enter category Name"),
  order: Yup.string().required("Please Enter category Name"),
};
export const updateHeroSliderSchema = {
  bannerTitle: Yup.string().required("Please Enter category Name"),
  bannerDescription: Yup.string().required("Please Enter category Name"),
  bannerButtonText: Yup.string().required("Please Enter category Name"),
  bannerButtonLink: Yup.string().required("Please Enter category Name"),
  order: Yup.string().required("Please Enter category Name"),
  heroSliderId: Yup.string(),
};

//product
export const createBrandSchema = {
  brandName: Yup.string().required("Please Enter brand Name"),
  description: Yup.string().required("Please Enter description"),
};

export const createFundRequestSchema = {
  amount: Yup.number()
    .typeError("Please enter a valid amount")
    .positive("Amount must be greater than zero")
    .min(100, "Amount must be at least 100")
    .required("Please enter an amount"),
  message: Yup.string().required("Please enter a message"),
};

//currency
export const createCurrencySchema = {
  currencyCode: Yup.string().required("Please enter currency code"),
  currencyName: Yup.string().required("Please enter currency name"),
  symbol: Yup.string().required("Please enter currency symbol"),
  country: Yup.string().required("Please enter country"),
  exchangeRate: Yup.number().required("Please enter exchange rate"),
  decimalPlaces: Yup.number().required("Please enter decimal places"),
};

export const updateVendorCommissionSchema = {
  vendorCommission: Yup.number().required("Please enter a commission"),
};
