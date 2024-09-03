export const LOGIN = "auth/admin/login";

//Permissions
export const GET_PERMISSION = "/admin/permission";
export const PERMISSION_LIST = "admin/permission/view-all";
export const CREATE_PERMISSION = "/admin/permission/create";
export const UPDATE_PERMISSION = "/admin/permission/update";
export const DELETE_PERMISSION = "/admin/permission/delete/";
export const BULK_DELETE_PERMISSION = "admin/permission/bulk-delete";

//Roles
export const GET_ROLES_LIST = "admin/role/view-all";
export const DELETE_ROLE = "/admin/role/delete/";
export const UPDATE_ROLE = "/admin/role/update";
export const CREATE_ROLE = "/admin/role/create";
export const DELETE_BULK_ROLE = "admin/role/bulk-delete";

//Users
export const GET_USERS_LIST = "user/admin/view-all";
export const CREATE_USERS = "/user/create";
export const UPDATE_USERS = "/user/admin/update";
export const DELETE_USERS = "/user/admin/delete/";
export const UPDATE_USER_STATUS = "/user/admin/update/status";
export const USER_BULK_DELETE = "user/admin/bulk-delete";

//Category
export const GET_CATEGORY_LIST = "product/admin/categories/view-all";
export const CREATE_CATEGORY = "product/admin/categories/create";
export const UPLOAD_IMAGE = "upload/upload/images";
export const UPLOAD_SINGLE_IMAGE = "upload/upload/image";
export const UPDATE_CATEGORY = "/product/admin/categories/update";
export const DELETE_CATEGORY = "product/admin/categories/delete/";
export const UPDATE_CATEGORY_STATUS = "product/admin/categories/update/status";

//Product
export const GET_PRODUCT_LIST = "product/admin/products/view-all";
export const DELETE_PRODUCT = "product/delete/";
export const UPDATE_PRODUCT = "/product/update";
export const CREATE_PRODUCT = "product/create";
export const GET_PRODUCT_KEYS = "product/admin/products/keys";
export const UPLOAD_CSV_FILE = "upload/upload/documents";
export const BULK_IMPORT = "product/bulk-import";
export const UPDATE_PRODUCT_STATUS = "product/update/status";
export const BULK_DELETE_PRODUCT = "product/bulk-delete";

//graphs
export const REGISTER_VS_ACTIVE = "report/admin/registervsactive";
export const LAST_15_DAYS_ORDER = "report/admin/orders/last15daysorder";
export const TOP_PERFORMING_REPORT = "report/admin/top-vendor";

// reports
export const PRODUCT_LESS_THAN10 = "report/admin/products/lessthan10";
export const PRODUCT_OUTOFSTOCK = "report/admin/products/outofstock";
export const PRODUCT_STATUS = "report/admin/products/status";
export const PRODUCT_RANGE = "report/admin/products/range";
export const PRODUCT_DATE = "report/admin/products/date";
export const USERS_DATE = "report/admin/date";
export const USERS_STATUS = "report/admin/status";
export const ORDER_REPORT = "report/admin/orders/filter";
export const MOST_SOLD_PRODUCT = "report/admin/orders/most-sold-products";
export const REVENUE_REPORT = "report/admin/orders/revenue";
export const LOW_STOCK_PRODUCT = "report/admin/products/low-stock";
export const VENDOR_COMMISSION_REPORT = "report/admin/commission";
export const ENQUIRY_PRODUCT = "product/admin/products/view-all";
export const PRODUCT_ENQUIRY = "product/admin/enquiries/view-all";
export const UPDATE_VENDOR_COMMISSION = "user/vendor/commission";
export const CUSTOMER_FEEDBACK = "product/admin/review/view-all";
export const ADMIN_COMMISSION = "/report/admin/commission";
export const VENDOR_ORDERS = "/report/vendor/orders/revenue";

//backup
export const GET_BACKUP = "others/admin/backup/get";

// Dashboard
export const DASHBOARD_COUNT = "/report/admin/dashboard";

//Notification
export const GET_NOTIFICATION_LIST = "communication/notification/view-all";
export const DELETE_NOTIFICATION = "communication/notification/delete/";
export const SEND_SMS = "communication/send-sms";
export const BULK_DELETE_NOTIFICATION =
  "communication/notification/bulk-delete";
export const GET_NOTIFICATION_COUNT =
  "communication/user-notification/view-all";
export const UPDATE_NOTIFICATION_COUNT =
  "communication/user-notification/status/";

//order
export const GET_ORDER_LIST = "order/admin/order/view-all";
export const CREATE_ORDER = "order/create";
export const UPDATE_ORDER_STATUS = "order/update/status";
export const UPDATE_ORDER = "orde/update";
export const DELETE_ORDER = "order/delete/";
export const BULK_DELETE_ORDER = "order/bulk-delete";

//Setting
export const GET_ALL_SETTING_LIST = "others/admin/setting/view-all";
export const GET_SETTING_KEYVALUE_LIST = "others/admin/setting/key-value";
export const DELETE_SETTING = "others/admin/setting/delete/";
export const UPDATE_SETTING = "others/admin/setting/update";
export const CREATE_SETTING = "others/admin/setting/create";
export const BULK_UPDATE_SETTING = "others/admin/setting/bulk-update";

//post-type
export const GET_POST_TYPE_LIST = "others/admin/post/type/view-all";
export const DELETE_POST_TYPE = "others/admin/post/type/delete/";
export const BULK_DELETE_POST_TYPE = "others/admin/post/type/bulk-delete";
export const UPDATE_POST_TYPE = "others/admin/post/type/update/";
export const CREATE_POST_TYPE = "others/admin/post/type/create";

//post-category
export const GET_POST_CATEGORY_LIST = "others/admin/post/category/view-all";
export const DELETE_POST_CATEGORY = "others/admin/post/category/delete/";
export const BULK_DELETE_POST_CATEGORY =
  "others/admin/post/category/bulk-delete";
export const UPDATE_POST_CATEGORY = "others/admin/post/category/update/";
export const CREATE_POST_CATEGORY = "others/admin/post/category/create";
export const UPDATE_POST_CATEGORY_STATUS =
  "others/admin/post/category/update/status";

//post
export const GET_POST_LIST = "others/admin/posts/view-all";
export const DELETE_POST = "others/admin/posts/delete/";
export const BULK_DELETE_POST = "others/admin/posts/bulk-delete";
export const UPDATE_POST = "others/admin/posts/update/";
export const CREATE_POST = "others/admin/posts/create";

//payment-gateway
export const GET_PAYMENT_GATEWAY_LIST =
  "payment/admin/payment-gateway/view-all";
export const DELETE_PAYMENT_GATEWAY = "payment/admin/payment-gateway/delete/";
export const UPDATE_PAYMENT_GATEWAY = "payment/admin/payment-gateway/update/";
export const CREATE_PAYMENT_GATEWAY = "payment/admin/payment-gateway/create";

//coupon
export const GET_COUPON = "/order/admin/coupon/view-all";
export const CREATE_COUPON = "/order/admin/coupon/create";
export const UPDATE_COUPON = "/order/admin/coupon/update";
export const UPDATE_COUPON_STATUS = "/order/admin/coupon/update/status";
export const DELETE_COUPON = "order/admin/coupon/delete/";
export const BULK_DELETE_COUPON = "order/admin/coupon/bulk-delete";
export const APPLY_COUPON = "order/admin/coupon/check-coupon/";

//transaction
export const TRANSACTION_LIST = "payment/admin/transactions/view-all";

//employee
export const EMPLOYEE_LIST = "admin/view-all";
export const DELETE_EMPLOYEE = "admin/delete/";
export const BULK_DELETE_EMPLOYEE = "admin/bulk-delete";
export const CREATE_EMPLOYEE = "/admin/create";
export const UPDATE_EMPLOYEE_STATUS = "admin/update/status";
export const UPDATE_EMPLOYEE = "admin/update";

//email
export const GET_EMAIL_LIST = "communication/admin/emailtemplates/view-all";
export const DELETE_EMAIL = "communication/admin/emailtemplates/delete/";
export const BULK_DELETE_EMAIL =
  "communication/admin/emailtemplates/bulk-delete";
export const UPDATE_EMAIL_TEMPLATES =
  "communication/admin/emailtemplates/update";
export const CREATE_EMAIL_TEMPLATES =
  "communication/admin/emailtemplates/create";
export const GET_TEMPLATE_VARIABLE_LIST =
  "communication/admin/emailtemplates/variable";
export const UPDATE_EMAIL_STATUS =
  "communication/admin/emailtemplates/update/status";

// Activity log
export const GET_ACTIVITY_LOG_LIST = "others/admin/activitylogs/view-all";
export const DELETE_ACTIVITY_LOG = "others/admin/activitylogs/delete/";
export const BULK_DELETE_ACTIVITY_LOG = "others/admin/activitylogs/bulk-delete";

//Ticket
export const GET_TICKET = "communication/admin/tickets/view-all";
export const GET_TICKE_CHAT = "communication/ticket-chats/ticket/";
export const CREATE_TICKET = "/communication/user/tickets/create";
export const UPDATE_TICKET = "/communication/admin/tickets/update";
export const UPDATE_TICKET_CHAT = "communication/ticket-chats";
export const UPDATE_TICKET_STATUS = "communication/admin/tickets/update/status";
export const DELETE_TICKET = "communication/admin/tickets/delete/";
export const DELETE_TICKET_CHAT = "communication/ticket-chats/";
export const BULK_DELETE_TICKET = "communication/admin/tickets/bulk-delete";
export const GET_ONE_TICKET = "communication/tickets/";
export const CREATE_TICKET_CHAT = "communication/ticket-chats";

//hero slider
export const GET_HERO_SLIDER = "others/customer/hero-slider/view-all";
export const CREATE_HERO_SLIDER = "others/admin/hero-slider/create";
export const UPDATE_HERO_SLIDER = "others/admin/hero-slider/update";
export const DELETE_HERO_SLIDER = "others/admin/hero-slider/delete/";
export const BULK_HERO_SLIDER = "others/admin/hero-slider/bulk-delete";

//Brands
export const GET_BRANDS_LIST = "product/admin/brand/view-all";
export const CREATE_BRANDS = "product/admin/brand/create";
export const UPDATE_BRANDS = "product/admin/brand/update";
export const DELETE_BRANDS = "product/admin/brand/delete/";
export const BULK_DELETE_BRANDS = "product/admin/brand/bulk-delete";
export const UPDATE_BRANDS_STATUS = "product/admin/brand/update/status";

//Contact
export const GET_CONTACT_LIST = "communication/admin/contact/view-all";
export const DELETE_CONTACT = "communication/admin/contact/delete/";
export const BULK_DELETE_CONTACT = "communication/admin/contact/bulk-delete";

//Vendor order
export const GET_VENDOR_ORDER_LIST = "order/all";
export const GET_VENDOR_SINGLE_ORDER = "order/";

//Wallet History
export const GET_WALLET_HISTORY = "revenue/wallet-history/all";
export const DELETE_WALLET_HISTORY = "revenue/wallet-history/";
export const BULK_DELETE_WALLET_HISTORY = "revenue/wallet-history/bulk-delete";

//Fund Request
export const GET_FUND_REQUEST_HISTORY = "revenue/request-payment/all";
export const REQUEST_HISTORY = "revenue/request-payment";
export const UPDATE_REQUEST_HISTORY = "revenue/request-payment";
export const DELETE_REQUEST_HISTORY = "revenue/request-payment/";
export const BULK_DELETE_REQUEST_HISTORY =
  "revenew/request-payment/bulk-delete";

// Vendor
export const GET_VENDOR_LIST = "user/vendor/view-all";

//currency
export const GET_CURRENCY_LIST = "payment/admin/currencies/view-all";
export const UPDATE_CURRENCY = "payment/admin/currencies/update";
export const CREATE_CURRENCY = "payment/admin/currencies/create";
export const DELETE_CURRENCY = "payment/admin/currencies/delete/";
export const BULK_DELETE_CURRENCY = "payment/admin/currencies/bulk-delete";
