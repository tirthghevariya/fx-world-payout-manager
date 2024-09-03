import { APIClient } from "./api_helper";

import * as url from "./url_helper";

const api = new APIClient();

// Login Method
export const chatLogin = (data) => api.create(url.LOGIN, data);

//permissions
export const getPermission = (data) => api.get(url.GET_PERMISSION, data);
export const permissionList = (data) => api.get(url.PERMISSION_LIST, data);
export const createPermission = (data) =>
  api.create(url.CREATE_PERMISSION, data);
export const updatePermission = (data) =>
  api.put(`${url.UPDATE_PERMISSION}/${data.parent}`, data);
export const deletePermission = (data) =>
  api.delete(url.DELETE_PERMISSION, data);
export const deleteBulkPermission = (data) =>
  api.create(url.BULK_DELETE_PERMISSION, data);

//role
export const getRolesList = (data) => api.get(url.GET_ROLES_LIST, data);
export const deleteRole = (data) => api.delete(url.DELETE_ROLE, data);
export const updateRole = (data) =>
  api.put(`${url.UPDATE_ROLE}/${data.roleId}`, data);
export const createRole = (data) => api.create(url.CREATE_ROLE, data);
export const deleteBulkRole = (data) => api.create(url.DELETE_BULK_ROLE, data);

//users
export const getUsersList = (data) => api.get(url.GET_USERS_LIST, data);
export const createUser = (data) => api.create(url.CREATE_USERS, data);
export const updateUser = (data) =>
  api.put(`${url.UPDATE_USERS}/${data.userId}`, data);
export const updateUserStatus = (data) =>
  api.put(`${url.UPDATE_USER_STATUS}/${data.userId}`, data);
export const deleteUser = (data) => api.delete(url.DELETE_USERS, data);
export const bulkDeleteUser = (data) => api.create(url.USER_BULK_DELETE, data);

//Category
export const getCategoryList = (data) => api.get(url.GET_CATEGORY_LIST, data);
export const createCategory = (data) => api.create(url.CREATE_CATEGORY, data);
export const updateCategory = (data) =>
  api.put(`${url.UPDATE_CATEGORY}/${data.categoryId}`, data);
export const deleteCategory = (data) => api.delete(url.DELETE_CATEGORY, data);
export const updateCategoryStatus = (data) =>
  api.put(`${url.UPDATE_CATEGORY_STATUS}/${data.categoryId}`, data);

//Product
export const getProductList = (data) => api.get(url.GET_PRODUCT_LIST, data);
export const deleteProduct = (data) => api.delete(url.DELETE_PRODUCT, data);
export const updateProduct = (data) =>
  api.put(`${url.UPDATE_PRODUCT}/${data.productId}`, data);
export const createProduct = (data) => api.create(url.CREATE_PRODUCT, data);
export const getProductKeysList = (data) => api.get(url.GET_PRODUCT_KEYS, data);
export const bulkImport = (data) => api.create(url.BULK_IMPORT, data);
export const updateProductStatus = (data) =>
  api.put(`${url.UPDATE_PRODUCT_STATUS}/${data.productId}`, data);
export const bulkDeleteProduct = (data) =>
  api.create(url.BULK_DELETE_PRODUCT, data);

//Graphs
export const registerVsActive = (data) => api.get(url.REGISTER_VS_ACTIVE, data);
export const last15DaysOrder = (data) => api.get(url.LAST_15_DAYS_ORDER, data);
export const topPerformingReport = (data) =>
  api.get(url.TOP_PERFORMING_REPORT, data);

//Reports
export const lessThan10 = (data) => api.get(url.PRODUCT_LESS_THAN10, data);
export const productOutOfStock = (data) =>
  api.get(url.PRODUCT_OUTOFSTOCK, data);
export const productStatus = (data) => api.get(url.PRODUCT_STATUS, data);
export const productRange = (data) => api.get(url.PRODUCT_RANGE, data);
export const productDate = (data) => api.get(url.PRODUCT_DATE, data);
export const usersDate = (data) => api.get(url.USERS_DATE, data);
export const usersStatus = (data) => api.get(url.USERS_STATUS, data);
export const orderReport = (data) => api.get(url.ORDER_REPORT, data);
export const mostSoldProduct = (data) => api.get(url.MOST_SOLD_PRODUCT, data);
export const revenueReport = (data) => api.get(url.REVENUE_REPORT, data);
export const lowStockProduct = (data) => api.get(url.LOW_STOCK_PRODUCT, data);
export const vendorCommissionReport = (data) =>
  api.get(url.VENDOR_COMMISSION_REPORT, data);
export const getEnquiryList = (data) => api.get(url.ENQUIRY_PRODUCT, data);
export const getAdminCommission = (data) => api.get(url.ADMIN_COMMISSION, data);
export const getVendorOrders = (data) => api.get(url.VENDOR_ORDERS, data);
export const getCustomerFeedback = (data) =>
  api.get(url.CUSTOMER_FEEDBACK, data);
export const getProductEnquiryList = (data) =>
  api.get(url.PRODUCT_ENQUIRY, data);
export const updateVendorCommission = (data) =>
  api.put(`${url.UPDATE_VENDOR_COMMISSION}/${data.vendorId}`, data);

//backup
export const getBackup = (data) => api.create(url.GET_BACKUP, data);

//Dashboard
export const dashboardCount = (data) => api.get(url.DASHBOARD_COUNT, data);

//notification
export const notificationList = (data) =>
  api.get(url.GET_NOTIFICATION_LIST, data);
export const deleteNotification = (data) =>
  api.delete(url.DELETE_NOTIFICATION, data);
export const sendSMS = (data) => api.create(url.SEND_SMS, data);
export const bulkDeleteNotification = (data) =>
  api.create(url.BULK_DELETE_NOTIFICATION, data);
export const getNotificationCount = (data) =>
  api.get(url.GET_NOTIFICATION_COUNT, data);
export const updateNotificationCount = (data) =>
  api.put(url.UPDATE_NOTIFICATION_COUNT + data);

//Order
export const getOrderList = (data) => api.get(url.GET_ORDER_LIST, data);
export const createOrder = (data) => api.create(url.CREATE_ORDER, data);
export const updateOrderStatus = (data) =>
  api.put(`${url.UPDATE_ORDER_STATUS}/${data.orderId}`, data);
export const updateOrder = (data) =>
  api.put(`${url.UPDATE_ORDER}/${data.orderId}`, data);
export const deleteOrder = (data) => api.delete(url.DELETE_ORDER, data);
export const bulkDeleteOrder = (data) =>
  api.create(url.BULK_DELETE_ORDER, data);

//Setting
export const getSettingList = (data) => api.get(url.GET_ALL_SETTING_LIST, data);
export const getSettingKeyValueList = (data) =>
  api.get(url.GET_SETTING_KEYVALUE_LIST, data);
export const deleteSetting = (data) => api.delete(url.DELETE_SETTING, data);
export const updateSetting = (data) =>
  api.put(`${url.UPDATE_SETTING}/${data.settingId}`, data);
export const creatSetting = (data) => api.create(url.CREATE_SETTING, data);
export const bulkUpdateSetting = (data) =>
  api.put(url.BULK_UPDATE_SETTING, data);

//post type
export const getPostTypeList = (data) => api.get(url.GET_POST_TYPE_LIST, data);
export const deletePostType = (data) => api.delete(url.DELETE_POST_TYPE, data);
export const bulkDeletePostType = (data) =>
  api.create(url.BULK_DELETE_POST_TYPE, data);
export const updatePostType = (data) =>
  api.put(`${url.UPDATE_POST_TYPE}${data.postTypeId}`, data);
export const createPostType = (data) => api.create(url.CREATE_POST_TYPE, data);

//post category
export const getPostCategoryList = (data) =>
  api.get(url.GET_POST_CATEGORY_LIST, data);
export const deletePostCategory = (data) =>
  api.delete(url.DELETE_POST_CATEGORY, data);
export const bulkDeletePostCategory = (data) =>
  api.create(url.BULK_DELETE_POST_CATEGORY, data);
export const updatePostCategory = (data) =>
  api.put(`${url.UPDATE_POST_CATEGORY}${data.postCategoryId}`, data);
export const createPostCategory = (data) =>
  api.create(url.CREATE_POST_CATEGORY, data);
export const updatePostCategoryStatus = (data) =>
  api.put(`${url.UPDATE_POST_CATEGORY_STATUS}/${data.postCategoryId}`, data);

//post
export const getPostList = (data) => api.get(url.GET_POST_LIST, data);
export const deletePost = (data) => api.delete(url.DELETE_POST, data);
export const bulkDeletePost = (data) => api.create(url.BULK_DELETE_POST, data);
export const updatePost = (data) =>
  api.put(`${url.UPDATE_POST}${data.postId}`, data);
export const createPost = (data) => api.create(url.CREATE_POST, data);

// Payment Gateway
export const getPaymentGatewayList = (data) =>
  api.get(url.GET_PAYMENT_GATEWAY_LIST, data);
export const deletePaymentGateway = (data) =>
  api.delete(url.DELETE_PAYMENT_GATEWAY, data);
export const createPaymentGateway = (data) =>
  api.create(url.CREATE_PAYMENT_GATEWAY, data);
export const updatePaymentGateway = (data) =>
  api.put(`${url.UPDATE_PAYMENT_GATEWAY}${data.paymentGatewayId}`, data);

// Coupon
export const getCoupon = (data) => api.get(url.GET_COUPON, data);
export const createCoupon = (data) => api.create(url.CREATE_COUPON, data);
export const updateCoupon = (data) =>
  api.put(`${url.UPDATE_COUPON}/${data.couponId}`, data);
export const updateCouponStatus = (data) =>
  api.put(`${url.UPDATE_COUPON_STATUS}/${data.couponId}`, data);
export const deleteCoupon = (data) => api.delete(url.DELETE_COUPON, data);
export const deleteBulkCoupon = (data) =>
  api.create(url.BULK_DELETE_COUPON, data);
export const applyCoupon = (data) => api.get(url.APPLY_COUPON + data);

//transaction
export const transactionList = (data) => api.get(url.TRANSACTION_LIST, data);

//Employee
export const employeeList = (data) => api.get(url.EMPLOYEE_LIST, data);
export const deleteEmployee = (data) => api.delete(url.DELETE_EMPLOYEE, data);
export const deleteBulkEmployee = (data) =>
  api.create(url.BULK_DELETE_EMPLOYEE, data);
export const createEmployee = (data) => api.create(url.CREATE_EMPLOYEE, data);
export const updateEmployeeStatus = (data) =>
  api.put(`${url.UPDATE_EMPLOYEE_STATUS}/${data.adminId}`, data);
export const updateEmployee = (data) =>
  api.put(`${url.UPDATE_EMPLOYEE}/${data.adminId}`, data);

//email
export const getEmailList = (data) => api.get(url.GET_EMAIL_LIST, data);
export const getTemplateVariableList = (data) =>
  api.get(url.GET_TEMPLATE_VARIABLE_LIST, data);
export const deleteEmail = (data) => api.delete(url.DELETE_EMAIL, data);
export const bulkDeleteEmail = (data) =>
  api.create(url.BULK_DELETE_EMAIL, data);
export const updateEmailTemplates = (data) =>
  api.put(`${url.UPDATE_EMAIL_TEMPLATES}/${data.id}`, data);
export const createEmailTemplates = (data) =>
  api.create(url.CREATE_EMAIL_TEMPLATES, data);
export const updateEmailStatus = (data) =>
  api.put(`${url.UPDATE_EMAIL_STATUS}/${data.id}`, data);

//activity Log
export const getLogList = (data) => api.get(url.GET_ACTIVITY_LOG_LIST, data);
export const deleteActivityLog = (data) =>
  api.delete(url.DELETE_ACTIVITY_LOG, data);
export const bulkDeleteActivityLog = (data) =>
  api.create(url.BULK_DELETE_ACTIVITY_LOG, data);

// Ticket
export const getTicketList = (data) => api.get(url.GET_TICKET, data);
export const getTicketChatList = (data) => api.get(url.GET_TICKE_CHAT + data);
export const createTicket = (data) => api.create(url.CREATE_TICKET, data);
export const updateTicket = (data) =>
  api.put(`${url.UPDATE_TICKET}/${data.id}`, data);
export const updateTicketChat = (data) =>
  api.put(`${url.UPDATE_TICKET_CHAT}/${data.id}`, data);
export const updateTicketStatus = (data) =>
  api.put(`${url.UPDATE_TICKET_STATUS}/${data.id}`, data);
export const getOneTicket = (data) => api.get(url.GET_ONE_TICKET + data);
export const deleteTicket = (data) => api.delete(url.DELETE_TICKET, data);
export const deleteTicketChat = (data) =>
  api.delete(url.DELETE_TICKET_CHAT, data);
export const deleteBulkTicket = (data) =>
  api.create(url.BULK_DELETE_TICKET, data);
export const createTicketChat = (data) =>
  api.create(url.CREATE_TICKET_CHAT, data);

// HERO
export const getHeroSliderList = (data) => api.get(url.GET_HERO_SLIDER, data);
export const createHeroSlider = (data) =>
  api.create(url.CREATE_HERO_SLIDER, data);
export const updateHeroSlider = (data) =>
  api.put(`${url.UPDATE_HERO_SLIDER}/${data.heroSliderId}`, data);
export const deleteHeroSlider = (data) =>
  api.delete(url.DELETE_HERO_SLIDER, data);
export const deleteBulkHeroSlider = (data) =>
  api.create(url.BULK_HERO_SLIDER, data);

// BRANDS
export const getBrandList = (data) => api.get(url.GET_BRANDS_LIST, data);
export const createBrand = (data) => api.create(url.CREATE_BRANDS, data);
export const updateBrand = (data) =>
  api.put(`${url.UPDATE_BRANDS}/${data.brandId}`, data);
export const deleteBrand = (data) => api.delete(url.DELETE_BRANDS, data);
export const deleteBulkBrand = (data) =>
  api.create(url.BULK_DELETE_BRANDS, data);
export const updateBrandStatus = (data) =>
  api.put(`${url.UPDATE_BRANDS_STATUS}/${data.brandId}`, data);

//feedback
export const getFeedbackList = (data) => api.get(url.GET_CONTACT_LIST, data);
export const deleteFeedback = (data) => api.delete(url.DELETE_CONTACT, data);
export const deleteBulkContact = (data) =>
  api.create(url.BULK_DELETE_CONTACT, data);

//vendor order
export const getVendorOrderList = (data) =>
  api.get(url.GET_VENDOR_ORDER_LIST, data);
export const getVendorSingleOrder = (data) =>
  api.get(url.GET_VENDOR_SINGLE_ORDER + data);

//Wallet History
export const getWalletHistory = (data) => api.get(url.GET_WALLET_HISTORY, data);
export const deleteWalletHistory = (data) =>
  api.delete(url.DELETE_WALLET_HISTORY, data);
export const deleteBulkWalletHistory = (data) =>
  api.create(url.BULK_DELETE_WALLET_HISTORY, data);

//Fund Request
export const getFundRequestHistory = (data) =>
  api.get(url.GET_FUND_REQUEST_HISTORY, data);
export const fundRequest = (data) => api.create(url.REQUEST_HISTORY, data);
export const deleteFundRequest = (data) =>
  api.delete(url.DELETE_REQUEST_HISTORY, data);
export const updateFundRequest = (data) =>
  api.put(`${url.UPDATE_REQUEST_HISTORY}/${data.id}`, data);
export const deleteBulkFundRequest = (data) =>
  api.create(url.BULK_DELETE_REQUEST_HISTORY, data);

//vendor
export const getVendorList = (data) => api.get(url.GET_VENDOR_LIST, data);

//currency
export const getCurrencyList = (data) => api.get(url.GET_CURRENCY_LIST, data);
export const createCurrency = (data) => api.create(url.CREATE_CURRENCY, data);
export const deleteCurrency = (data) => api.delete(url.DELETE_CURRENCY, data);
export const updateCurrency = (data) =>
  api.put(`${url.UPDATE_CURRENCY}/${data.currencyId}`, data);
export const deleteBulkCurrency = (data) =>
  api.create(url.BULK_DELETE_CURRENCY, data);
