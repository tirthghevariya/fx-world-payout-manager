/* eslint-disable react/react-in-jsx-scope */
const activeInActive = [
  { label: "Active", value: "Active" },
  { label: "InActive", value: "InActive" },
];

const discTypeOption = [
  { label: "Percentage", value: "Percentage" },
  { label: "Fixed", value: "Fixed" },
];

import { UPLOAD_IMAGE } from "../../helpers/url_helper";

// permission
export const createPermissionformFields = [
  {
    type: "input",
    label: "name",
    name: "name",
    inputType: "text",
    placeholder: "Enter your Permision name",
  },
  {
    type: "input",
    label: "Parent",
    name: "parent",
    inputType: "text",
    placeholder: "Enter your parent",
  },
];

export const updatePermissionformFields = [
  {
    type: "input",
    label: "name",
    name: "name",
    inputType: "text",
    placeholder: "Enter your Permision name",
  },
  {
    type: "hidden",
    label: "Parent",
    name: "parent",
    inputType: "text",
    placeholder: "Enter your parent",
  },
];

//Role
export const createRoleformFields = [
  {
    type: "input",
    label: "name",
    name: "name",
    inputType: "text",
    placeholder: "Enter your Permision name",
  },
  {
    type: "hidden",
    label: "Parent",
    name: "permission",
    inputType: "text",
    placeholder: "Enter your parent",
  },
];

// User
export const createUserformFields = [
  {
    type: "input",
    label: "FirstName",
    name: "firstName",
    inputType: "text",
    placeholder: "Enter your firstName",
  },
  {
    type: "input",
    label: "LastName",
    name: "lastName",
    inputType: "text",
    placeholder: "Enter your lastName",
  },
  {
    type: "input",
    label: "Email",
    name: "email",
    inputType: "text",
    placeholder: "Enter your Email",
  },
  {
    type: "input",
    label: "Password",
    name: "password",
    inputType: "password",
    placeholder: "Enter your password",
  },
  {
    type: "input",
    label: "Mobile No",
    name: "mobile",
    inputType: "tel",
    placeholder: "Enter your Mobile No",
  },
];

export const updateUserformFields = [
  {
    type: "input",
    label: "Name",
    name: "firstName",
    inputType: "text",
    placeholder: "Enter your firstName",
  },
  {
    type: "input",
    label: "Email",
    name: "email",
    inputType: "text",
    placeholder: "Enter your Email",
  },
];

export const updateUserStatusformFields = [
  {
    type: "input",
    label: "Banned Reason",
    name: "bannedReason",
    inputType: "text",
    placeholder: "Please provide the banned reason.",
  },
];

// Category
const createCategoryformFields = (categoryOption) => [
  {
    type: "input",
    label: "Category Name",
    name: "categoryName",
    inputType: "text",
    placeholder: "Enter your category name",
  },
  {
    type: "input",
    label: "Description",
    name: "description",
    inputType: "text",
    placeholder: "Enter your description",
  },
  {
    type: "dropdown",
    label: "Status",
    name: "categoryStatus",
    options: activeInActive,
  },
  {
    type: "dropdown",
    label: "Select Category",
    name: "parentCategoryId",
    defaultValue: "",
    options: categoryOption,
  },
  {
    type: "fileInput",
    label: "Choose a file:",
    name: "categoryImage",
    placeholder: "Select File",
    multi: true,
    uploadUrl: UPLOAD_IMAGE,
    uploadType: ".png, .jpg, .jpeg",
  },
];
export default createCategoryformFields;

export const updateCategoryformFields = [
  {
    type: "input",
    label: "Category Name",
    name: "categoryName",
    inputType: "text",
    placeholder: "Enter your category name",
  },
  {
    type: "input",
    label: "Description",
    name: "description",
    inputType: "text",
    placeholder: "Enter your description",
  },
  {
    type: "dropdown",
    label: "Status",
    name: "categoryStatus",
    options: activeInActive,
  },
  {
    type: "fileInput",
    label: "Choose a file:",
    name: "categoryImage",
    placeholder: "Select File",
    multi: true,
    uploadUrl: UPLOAD_IMAGE,
    uploadType: ".png, .jpg, .jpeg",
  },
];

// Product
const createProductformFields = (categoriesOption, brandsOption) => [
  {
    type: "input",
    label: "Product Name",
    name: "productName",
    inputType: "text",
    placeholder: "Enter your Product name",
  },
  {
    type: "input",
    label: "Description",
    name: "description",
    inputType: "text",
    placeholder: "Enter your description",
  },
  {
    type: "input",
    label: "Price",
    name: "price",
    inputType: "text",
    placeholder: "Enter Product price",
  },
  {
    type: "input",
    label: "Quantity",
    name: "quantity",
    inputType: "text",
    placeholder: "Enter Product quantity",
  },
  {
    type: "dropdown",
    label: "Select Category",
    name: "categoryId",
    defaultValue: "",
    options: categoriesOption,
  },
  {
    type: "dropdown",
    label: "Select Brand",
    name: "brandId",
    defaultValue: "",
    options: brandsOption,
  },
  {
    type: "input",
    label: "SKU",
    name: "SKU",
    inputType: "text",
    placeholder: "Enter Product SKU",
  },
  {
    type: "input",
    label: "Weight",
    name: "weight",
    inputType: "text",
    placeholder: "Enter Product weight",
  },
  {
    type: "input",
    label: "Length",
    name: "length",
    inputType: "text",
    placeholder: "Enter Product length",
  },
  {
    type: "input",
    label: "Width",
    name: "width",
    inputType: "text",
    placeholder: "Enter Product width",
  },
  {
    type: "input",
    label: "Height",
    name: "height",
    inputType: "text",
    placeholder: "Enter Product height",
  },
  {
    type: "input",
    label: "Optional Notes",
    name: "optionalNotes",
    inputType: "text",
    placeholder: "Enter Product optionalNotes",
  },
  {
    type: "fileInput",
    label: "Choose a file:",
    name: "productImage",
    placeholder: "Select File",
    multi: true,
    uploadUrl: UPLOAD_IMAGE,
    uploadType: ".png, .jpg, .jpeg",
  },
];
export { createProductformFields };

const updateProductformFields = (categoriesOption, brandsOption) => [
  {
    type: "input",
    label: "Product Name",
    name: "productName",
    inputType: "text",
    placeholder: "Enter your Product name",
  },
  {
    type: "input",
    label: "Description",
    name: "description",
    inputType: "text",
    placeholder: "Enter your description",
  },
  {
    type: "input",
    label: "Price",
    name: "price",
    inputType: "text",
    placeholder: "Enter Product price",
  },
  {
    type: "input",
    label: "Quantity",
    name: "quantity",
    inputType: "text",
    placeholder: "Enter Product quantity",
  },
  {
    type: "input",
    label: "SKU",
    name: "SKU",
    inputType: "text",
    placeholder: "Enter Product SKU",
  },
  {
    type: "input",
    label: "Weight",
    name: "weight",
    inputType: "text",
    placeholder: "Enter Product weight",
  },
  {
    type: "input",
    label: "Length",
    name: "length",
    inputType: "text",
    placeholder: "Enter Product length",
  },
  {
    type: "dropdown",
    label: "Select Category",
    name: "categoryId",
    defaultValue: "",
    options: categoriesOption,
  },
  {
    type: "dropdown",
    label: "Select Brand",
    name: "brandId",
    defaultValue: "",
    options: brandsOption,
  },
  {
    type: "input",
    label: "Width",
    name: "width",
    inputType: "text",
    placeholder: "Enter Product width",
  },
  {
    type: "input",
    label: "Height",
    name: "height",
    inputType: "text",
    placeholder: "Enter Product height",
  },
  {
    type: "input",
    label: "Optional Notes",
    name: "optionalNotes",
    inputType: "text",
    placeholder: "Enter Product optionalNotes",
  },
  {
    type: "fileInput",
    label: "Choose a file:",
    name: "productImage",
    placeholder: "Select File",
    multi: true,
    uploadUrl: UPLOAD_IMAGE,
    uploadType: ".png, .jpg, .jpeg",
  },
];
export { updateProductformFields };

export const addButtonText = {
  loadingText: "Adding...",
  normalText: (
    <>
      <i className="ri-add-fill"></i> Add
    </>
  ),
};

export const sendNotificationText = {
  loadingText: "Sending...",
  normalText: (
    <>
      <i className="  bx bxs-send"></i> Send
    </>
  ),
};

export const updateButtonText = {
  loadingText: "Updating...",
  normalText: (
    <>
      <i className=" ri-arrow-left-up-line"></i> Update
    </>
  ),
};

export const updateBannedButtonText = {
  loadingText: "Updating...",
  normalText: (
    <>
      <i className=" ri-arrow-left-up-line"></i> Update Status
    </>
  ),
};

export const sendNotificationFormFields = [
  {
    type: "input",
    label: "Mobile No",
    name: "mobile",
    inputType: "text",
    placeholder: "Enter your mobile No",
  },
  {
    type: "input",
    label: "Message",
    name: "message",
    inputType: "text",
    placeholder: "Enter your message",
  },
];

// setting
export const createSettingformFields = [
  {
    type: "input",
    label: "Key",
    name: "key",
    inputType: "text",
    placeholder: "Enter your key name",
  },
  {
    type: "input",
    label: "Value",
    name: "value",
    inputType: "text",
    placeholder: "Enter your value",
  },
  {
    type: "input",
    label: "Label",
    name: "label",
    inputType: "text",
    placeholder: "Enter your label",
  },
  {
    type: "input",
    label: "Description",
    name: "description",
    inputType: "text",
    placeholder: "Enter your description",
  },
];

export const updateSettingformFields = [
  {
    type: "input",
    label: "Key",
    name: "key",
    inputType: "text",
    placeholder: "Enter your key name",
  },
  {
    type: "input",
    label: "Value",
    name: "value",
    inputType: "text",
    placeholder: "Enter your value",
  },
  {
    type: "input",
    label: "Label",
    name: "label",
    inputType: "text",
    placeholder: "Enter your label",
  },
  {
    type: "input",
    label: "Description",
    name: "description",
    inputType: "text",
    placeholder: "Enter your description",
  },
  {
    type: "hidden",
    label: "Parent",
    name: "settingId",
    inputType: "text",
    placeholder: "Enter your parent",
  },
];

// Post Type
export const createPostTypeformFields = [
  {
    type: "input",
    label: "name",
    name: "name",
    inputType: "text",
    placeholder: "Enter your Post type name",
  },
];

export const updatePostTypeformFields = [
  {
    type: "input",
    label: "name",
    name: "name",
    inputType: "text",
    placeholder: "Enter your Post type name",
  },
  {
    type: "hidden",
    label: "postTypeId",
    name: "postTypeId",
    inputType: "text",
    placeholder: "Enter your parent",
  },
];

// Post Category
export const createPostCategoryformFields = [
  {
    type: "input",
    label: "name",
    name: "name",
    inputType: "text",
    placeholder: "Enter your Post Category name",
  },
  {
    type: "dropdown",
    label: "Status",
    name: "categoryStatus",
    options: activeInActive,
  },
  {
    type: "input",
    label: "Meta Title",
    name: "metaTitle",
    inputType: "text",
    placeholder: "Enter your metaTitle",
  },
  {
    type: "input",
    label: "Meta Description",
    name: "metaDescription",
    inputType: "text",
    placeholder: "Enter your metaDescription",
  },
  {
    type: "input",
    label: "Meta Keywords",
    name: "metaKeywords",
    inputType: "text",
    placeholder: "Enter your metaKeywords",
  },
];

export const updatePostCategoryformFields = [
  {
    type: "input",
    label: "name",
    name: "name",
    inputType: "text",
    placeholder: "Enter your Post type name",
  },
  {
    type: "hidden",
    label: "postCategoryId",
    name: "postCategoryId",
    inputType: "text",
    placeholder: "Enter your parent",
  },
  {
    type: "dropdown",
    label: "Status",
    name: "categoryStatus",
    options: activeInActive,
  },
  {
    type: "input",
    label: "Meta Title",
    name: "metaTitle",
    inputType: "text",
    placeholder: "Enter your metaTitle",
  },
  {
    type: "input",
    label: "Meta Description",
    name: "metaDescription",
    inputType: "text",
    placeholder: "Enter your metaDescription",
  },
  {
    type: "input",
    label: "Meta Keywords",
    name: "metaKeywords",
    inputType: "text",
    placeholder: "Enter your metaKeywords",
  },
];

// Payment Gateway
export const createPGFormFields = [
  {
    type: "input",
    label: "Payment Gateway Name",
    name: "paymentGatewayName",
    inputType: "text",
    placeholder: "Enter payment gateway name",
  },
  {
    type: "input",
    label: "Payment Gateway URL",
    name: "paymentGatewayUrl",
    inputType: "text",
    placeholder: "Enter payment gateway URL",
  },
  {
    type: "input",
    label: "Payment Gateway Mode",
    name: "paymentGatewayMode",
    inputType: "text",
    placeholder: "Enter payment gateway mode",
  },
  {
    type: "input",
    label: "Key ID",
    name: "keyId",
    inputType: "text",
    placeholder: "Enter key ID",
  },
  {
    type: "input",
    label: "Key Secret",
    name: "keySecret",
    inputType: "text",
    placeholder: "Enter key secret",
  },
  {
    type: "input",
    label: "Merchant ID",
    name: "merchantId",
    inputType: "text",
    placeholder: "Enter merchant ID",
  },
  {
    type: "input",
    label: "Merchant Key",
    name: "merchantKey",
    inputType: "text",
    placeholder: "Enter merchant key",
  },
  {
    type: "input",
    label: "Client ID",
    name: "clientId",
    inputType: "text",
    placeholder: "Enter client ID",
  },
  {
    type: "input",
    label: "Client Secret",
    name: "clientSecret",
    inputType: "text",
    placeholder: "Enter client secret",
  },
  {
    type: "input",
    label: "Other",
    name: "other",
    inputType: "text",
    placeholder: "Enter other details",
  },
];

export const updatePGFormFields = [
  {
    type: "input",
    label: "Payment Gateway Name",
    name: "paymentGatewayName",
    inputType: "text",
    placeholder: "Enter payment gateway name",
  },
  {
    type: "input",
    label: "Payment Gateway URL",
    name: "paymentGatewayUrl",
    inputType: "text",
    placeholder: "Enter payment gateway URL",
  },
  {
    type: "input",
    label: "Payment Gateway Mode",
    name: "paymentGatewayMode",
    inputType: "text",
    placeholder: "Enter payment gateway mode",
  },
  {
    type: "input",
    label: "Key ID",
    name: "keyId",
    inputType: "text",
    placeholder: "Enter key ID",
  },
  {
    type: "input",
    label: "Key Secret",
    name: "keySecret",
    inputType: "text",
    placeholder: "Enter key secret",
  },
  {
    type: "input",
    label: "Merchant ID",
    name: "merchantId",
    inputType: "text",
    placeholder: "Enter merchant ID",
  },
  {
    type: "input",
    label: "Merchant Key",
    name: "merchantKey",
    inputType: "text",
    placeholder: "Enter merchant key",
  },
  {
    type: "input",
    label: "Client ID",
    name: "clientId",
    inputType: "text",
    placeholder: "Enter client ID",
  },
  {
    type: "input",
    label: "Client Secret",
    name: "clientSecret",
    inputType: "text",
    placeholder: "Enter client secret",
  },
  {
    type: "input",
    label: "Other",
    name: "other",
    inputType: "text",
    placeholder: "Enter other details",
  },
  {
    type: "invalid",
    label: "Other",
    name: "paymentGatewayId",
    inputType: "text",
    placeholder: "Enter other details",
  },
];

// coupon
export const createCouponformFields = [
  {
    type: "input",
    label: "Coupon Code",
    name: "couponCode",
    inputType: "text",
    placeholder: "Enter your coupon code",
  },
  {
    type: "dropdown",
    label: "Discount Type",
    name: "discountType",
    defaultValue: "",
    options: discTypeOption,
  },
  {
    type: "input",
    label: "Discount Amount",
    name: "discountAmount",
    inputType: "text",
    placeholder: "Enter discount amount",
  },
  {
    type: "datePicker",
    label: "Expiry Date",
    name: "expiryDate",
    placeholder: "Enter expiry date",
  },
  {
    type: "hidden",
    label: "Is Active",
    name: "isActive",
    inputType: "text",
    placeholder: "Enter active status",
  },
  {
    type: "input",
    label: "Usage Count",
    name: "usageCount",
    inputType: "text",
    placeholder: "Enter usage count",
  },
  {
    type: "input",
    label: "Description",
    name: "description",
    inputType: "text",
    placeholder: "Enter coupon description",
  },
];

export const updateCouponformFields = [
  {
    type: "input",
    label: "Coupon Code",
    name: "couponCode",
    inputType: "text",
    placeholder: "Enter your coupon code",
  },
  {
    type: "dropdown",
    label: "Discount Type",
    name: "discountType",
    defaultValue: "",
    options: discTypeOption,
  },
  {
    type: "input",
    label: "Discount Amount",
    name: "discountAmount",
    inputType: "text",
    placeholder: "Enter discount amount",
  },
  {
    type: "datePicker",
    label: "Expiry Date",
    name: "expiryDate",
    placeholder: "Enter expiry date",
  },
  {
    type: "hidden",
    label: "Is Active",
    name: "isActive",
    inputType: "text",
    placeholder: "Enter active status",
  },
  {
    type: "hidden",
    label: "",
    name: "couponId",
    inputType: "",
    placeholder: "",
  },
  {
    type: "input",
    label: "Usage Count",
    name: "usageCount",
    inputType: "text",
    placeholder: "Enter usage count",
  },
  {
    type: "input",
    label: "Description",
    name: "description",
    inputType: "text",
    placeholder: "Enter coupon description",
  },
];

//employee
const createEmployeeformFields = (roleOption) => [
  {
    type: "input",
    label: "Email",
    name: "email",
    inputType: "text",
    placeholder: "Enter your email",
  },
  {
    type: "input",
    label: "Password",
    name: "password",
    inputType: "password",
    placeholder: "Enter your password",
  },
  {
    type: "input",
    label: "First Name",
    name: "firstName",
    inputType: "text",
    placeholder: "Enter your first name",
  },
  {
    type: "input",
    label: "Last Name",
    name: "lastName",
    inputType: "text",
    placeholder: "Enter your last name",
  },
  {
    type: "input",
    label: "Mobile",
    name: "mobile",
    inputType: "text",
    placeholder: "Enter your mobile number",
  },
  {
    type: "dropdown",
    label: "Select Role",
    name: "role",
    defaultValue: "",
    options: roleOption,
  },
];
export { createEmployeeformFields };

const updateEmployeeformFields = (roleOption) => [
  {
    type: "input",
    label: "Email",
    name: "email",
    inputType: "text",
    placeholder: "Enter your email",
  },
  {
    type: "input",
    label: "Password",
    name: "password",
    inputType: "password",
    placeholder: "Enter your password",
  },
  {
    type: "input",
    label: "First Name",
    name: "firstName",
    inputType: "text",
    placeholder: "Enter your first name",
  },
  {
    type: "input",
    label: "Last Name",
    name: "lastName",
    inputType: "text",
    placeholder: "Enter your last name",
  },
  {
    type: "input",
    label: "Mobile",
    name: "mobile",
    inputType: "text",
    placeholder: "Enter your mobile number",
  },
  {
    type: "dropdown",
    label: "Select Role",
    name: "role",
    defaultValue: "",
    options: roleOption,
  },
];
export { updateEmployeeformFields };

export const updateEmployeeStatusformFields = [
  {
    type: "input",
    label: "Banned Reason",
    name: "bannedReason",
    inputType: "text",
    placeholder: "Please provide the banned reason.",
  },
];

//ticket
const createTicketformFields = (userOption, priorityOption) => [
  {
    type: "dropdown",
    label: "User",
    name: "userId",
    options: userOption,
    placeholder: "Enter user status",
  },
  {
    type: "input",
    label: "Request By",
    name: "requestedBy",
    inputType: "password",
    placeholder: "Enter requester's password",
  },
  {
    type: "input",
    label: "Email",
    name: "email",
    inputType: "text",
    placeholder: "Enter user's first name",
  },
  {
    type: "input",
    label: "Type",
    name: "type",
    inputType: "text",
    placeholder: "Enter user's last name",
  },
  {
    type: "input",
    label: "Subject",
    name: "subject",
    inputType: "text",
    placeholder: "Enter subject",
  },
  {
    type: "input",
    label: "Description",
    name: "description",
    inputType: "text",
    placeholder: "Enter description",
  },
  {
    type: "dropdown",
    label: "Priority",
    name: "priority",
    options: priorityOption,
    placeholder: "Enter priority",
  },
];
export { createTicketformFields };

const updateTicketformFields = (userOption, priorityOption) => [
  {
    type: "dropdown",
    label: "Status",
    name: "userId",
    options: userOption,
    placeholder: "Enter user status",
  },
  {
    type: "input",
    label: "Requested By",
    name: "requestedBy",
    inputType: "password",
    placeholder: "Enter requested by",
  },
  {
    type: "input",
    label: "Email",
    name: "email",
    inputType: "text",
    placeholder: "Enter email",
  },
  {
    type: "input",
    label: "Type",
    name: "type",
    inputType: "text",
    placeholder: "Enter type",
  },
  {
    type: "input",
    label: "Subject",
    name: "subject",
    inputType: "text",
    placeholder: "Enter subject",
  },
  {
    type: "input",
    label: "Description",
    name: "description",
    inputType: "text",
    placeholder: "Enter description",
  },
  {
    type: "dropdown",
    label: "Priority",
    name: "priority",
    options: priorityOption,
    placeholder: "Enter priority",
  },
  {
    type: "invalid",
    label: "Id",
    name: "id",
    inputType: "text",
    placeholder: "Enter description",
  },
];
export { updateTicketformFields };

export const createHeroSliderformFields = [
  {
    type: "input",
    label: "Banner Title",
    name: "bannerTitle",
    inputType: "text",
    placeholder: "Enter your banner title",
  },
  {
    type: "input",
    label: "Banner Description",
    name: "bannerDescription",
    inputType: "text",
    placeholder: "Enter your banner description",
  },
  {
    type: "input",
    label: "Banner Button Text",
    name: "bannerButtonText",
    inputType: "text",
    placeholder: "Enter your banner button text",
  },
  {
    type: "input",
    label: "Banner Button Link",
    name: "bannerButtonLink",
    inputType: "text",
    placeholder: "Enter your banner button link",
  },
  {
    type: "input",
    label: "Banner Order",
    name: "order",
    inputType: "text",
    placeholder: "Enter banner order",
  },
  {
    type: "fileInput",
    label: "Choose a file:",
    name: "imageUrl",
    placeholder: "Select File",
    multi: false,
    uploadUrl: UPLOAD_IMAGE,
    uploadType: ".png, .jpg, .jpeg",
  },
];

export const updateHeroSliderformFields = [
  {
    type: "input",
    label: "Banner Title",
    name: "bannerTitle",
    inputType: "text",
    placeholder: "Enter your banner title",
  },
  {
    type: "input",
    label: "Banner Description",
    name: "bannerDescription",
    inputType: "text",
    placeholder: "Enter your banner description",
  },
  {
    type: "input",
    label: "Banner Button Text",
    name: "bannerButtonText",
    inputType: "text",
    placeholder: "Enter your banner button text",
  },
  {
    type: "input",
    label: "Banner Button Link",
    name: "bannerButtonLink",
    inputType: "text",
    placeholder: "Enter your banner button link",
  },
  {
    type: "input",
    label: "Banner Order",
    name: "order",
    inputType: "text",
    placeholder: "Enter Banner Order",
  },
  {
    type: "invalid",
    label: "Banner Order",
    name: "heroSliderId",
    inputType: "text",
    placeholder: "Enter your category name",
  },
  {
    type: "fileInput",
    label: "Choose a file:",
    name: "imageUrl",
    placeholder: "Select File",
    multi: false,
    uploadUrl: UPLOAD_IMAGE,
    uploadType: ".png, .jpg, .jpeg",
  },
];

export const createBrandformFields = [
  {
    type: "input",
    label: "Brand Name",
    name: "brandName",
    inputType: "text",
    placeholder: "Enter your Brand name",
  },
  {
    type: "input",
    label: "Description",
    name: "description",
    inputType: "text",
    placeholder: "Enter your description",
  },
  {
    type: "invalid",
    label: "Description",
    name: "brandId",
    inputType: "text",
    placeholder: "Enter your description",
  },
  {
    type: "fileInput",
    label: "Choose a file:",
    name: "logoUrl",
    placeholder: "Select File",
    multi: false,
    uploadUrl: UPLOAD_IMAGE,
    uploadType: ".png, .jpg, .jpeg",
  },
];

export const updateBrandformFields = [
  {
    type: "input",
    label: "Brand Name",
    name: "brandName",
    inputType: "text",
    placeholder: "Enter your Brand name",
  },
  {
    type: "input",
    label: "Description",
    name: "description",
    inputType: "text",
    placeholder: "Enter your description",
  },
  {
    type: "fileInput",
    label: "Choose a file:",
    name: "logoUrl",
    placeholder: "Select File",
    multi: false,
    uploadUrl: UPLOAD_IMAGE,
    uploadType: ".png, .jpg, .jpeg",
  },
];

export const createFundRequestformFields = [
  {
    type: "input",
    label: "Request Amount",
    name: "amount",
    inputType: "text",
    placeholder: "Enter your amount",
  },
  {
    type: "input",
    label: "Message",
    name: "message",
    inputType: "text",
    placeholder: "Enter message",
  },
];

export const updateFundRequestformFields = [
  {
    type: "input",
    label: "Request Amount",
    name: "amount",
    inputType: "text",
    placeholder: "Enter your amount",
  },
  {
    type: "input",
    label: "Message",
    name: "message",
    inputType: "text",
    placeholder: "Enter message",
  },
  {
    type: "invalid",
    label: "Message",
    name: "id",
    inputType: "text",
    placeholder: "Enter message",
  },
];

//currency
export const createCurrencyformFields = [
  {
    type: "input",
    label: "Currency Code",
    name: "currencyCode",
    inputType: "text",
    placeholder: "Enter your currency code",
  },
  {
    type: "input",
    label: "Currency Name",
    name: "currencyName",
    inputType: "text",
    placeholder: "Enter your currency name",
  },
  {
    type: "input",
    label: "Symbol",
    name: "symbol",
    inputType: "text",
    placeholder: "Enter currency symbol",
  },
  {
    type: "input",
    label: "Country",
    name: "country",
    inputType: "text",
    placeholder: "Enter currency country",
  },
  {
    type: "input",
    label: "Exchange Rate",
    name: "exchangeRate",
    inputType: "text",
    placeholder: "Enter exchange rate",
  },
  {
    type: "input",
    label: "Decimal Places",
    name: "decimalPlaces",
    inputType: "text",
    placeholder: "Enter decimal place",
  },
];

export const updateCurrencyformFields = [
  {
    type: "input",
    label: "Currency Code",
    name: "currencyCode",
    inputType: "text",
    placeholder: "Enter your currency code",
  },
  {
    type: "input",
    label: "Currency Name",
    name: "currencyName",
    inputType: "text",
    placeholder: "Enter your currency name",
  },
  {
    type: "input",
    label: "Symbol",
    name: "symbol",
    inputType: "text",
    placeholder: "Enter currency symbol",
  },
  {
    type: "input",
    label: "Country",
    name: "country",
    inputType: "text",
    placeholder: "Enter currency country",
  },
  {
    type: "input",
    label: "Exchange Rate",
    name: "exchangeRate",
    inputType: "text",
    placeholder: "Enter exchange rate",
  },
  {
    type: "input",
    label: "Decimal Places",
    name: "decimalPlaces",
    inputType: "text",
    placeholder: "Enter decimal place",
  },
  {
    type: "invalid",
    label: "Decimal Places",
    name: "currencyId",
    inputType: "text",
    placeholder: "Enter decimal place",
  },
];

export const updateVendorCommissionformFields = [
  {
    type: "input",
    label: "Vendor Commission",
    name: "vendorCommission",
    inputType: "text",
    placeholder: "Enter vendor commission",
  },
  {
    type: "invalid",
    label: "Vendor Commission",
    name: "vendorId",
    inputType: "text",
    placeholder: "Enter vendor commission",
  },
];

// {
//   type: "dropdown",
//   label: "Role",
//   name: "role",
//   options: options,
// },
// {
//   type: "multiDropdown",
//   label: "Permissions",
//   name: "permissions",
//   options: options,
// },
// {
//   type: "datePicker",
//   label: "Date of Birth",
//   name: "dob",
//   placeholder: "Select Date",
// },
// {
//   type: "checkbox",
//   label: "Hobbies",
//   name: "hobbies",
//   options: options,
// },
// {
//   type: "radioButton",
//   label: "Gender",
//   name: "gender",
//   options: options,
// },
// {
//   type: "fileInput",
//   label: "Choose a file:",
//   name: "file",
//   placeholder: "Select File",
// },
