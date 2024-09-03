import React from "react";
import { Navigate } from "react-router-dom";

// Widgets
import Widgets from "../pages/Dashboard/Index";
//Forms
import BasicElements from "../pages/Forms/formikForm";

//Tables
import BasicTables from "../pages/Tables/BasicTables/BasicTables";
import ReactTable from "../pages/Tables/ReactTables";
//AuthenticationInner pages
import BasicSignIn from "../pages/AuthenticationInner/Login/BasicSignIn";
import CoverSignIn from "../pages/AuthenticationInner/Login/CoverSignIn";
import BasicSignUp from "../pages/AuthenticationInner/Register/BasicSignUp";
import CoverSignUp from "../pages/AuthenticationInner/Register/CoverSignUp";
import BasicPasswReset from "../pages/AuthenticationInner/PasswordReset/BasicPasswReset";

import CoverPasswReset from "../pages/AuthenticationInner/PasswordReset/CoverPasswReset";
import BasicLockScreen from "../pages/AuthenticationInner/LockScreen/BasicLockScr";
import CoverLockScreen from "../pages/AuthenticationInner/LockScreen/CoverLockScr";
import BasicLogout from "../pages/AuthenticationInner/Logout/BasicLogout";
import CoverLogout from "../pages/AuthenticationInner/Logout/CoverLogout";
import BasicSuccessMsg from "../pages/AuthenticationInner/SuccessMessage/BasicSuccessMsg";
import CoverSuccessMsg from "../pages/AuthenticationInner/SuccessMessage/CoverSuccessMsg";
import BasicTwosVerify from "../pages/AuthenticationInner/TwoStepVerification/BasicTwosVerify";
import CoverTwosVerify from "../pages/AuthenticationInner/TwoStepVerification/CoverTwosVerify";
import Basic404 from "../pages/AuthenticationInner/Errors/Basic404";
import Cover404 from "../pages/AuthenticationInner/Errors/Cover404";
import Alt404 from "../pages/AuthenticationInner/Errors/Alt404";
import Error500 from "../pages/AuthenticationInner/Errors/Error500";

import BasicPasswCreate from "../pages/AuthenticationInner/PasswordCreate/BasicPasswCreate";
import CoverPasswCreate from "../pages/AuthenticationInner/PasswordCreate/CoverPasswCreate";
import Offlinepage from "../pages/AuthenticationInner/Errors/Offlinepage";

//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

//Charts

import ColumnCharts from "../pages/Charts/ApexCharts/ColumnCharts";

// User Profile
import UserProfile from "../pages/Authentication/user-profile";

// permissions
import PermissionsList from "../pages/Permissions/permissions";

// Roles
import Roles from "../pages/Roles/roles";
import Permission from "../pages/Roles/assignPermission";

//users
import Users from "../pages/Users/users";

//category
import CategoryList from "../pages/Category/category";

//product
import ProductList from "../pages/Product/product";
import BrandList from "../pages/Brand/brand.js";
import BulkImport from "../pages/Product/bulkImportForm";
import OutofStockProduct from "../pages/Reports/outOfstockProduct.js";
import LessThan10ProductList from "../pages/Reports/productLessThanTen.js";
import ProductDate from "../pages/Reports/productDate.js";
import ProductRange from "../pages/Reports/productRange.js";
import ProductStatus from "../pages/Reports/productStatus.js";
import UserDate from "../pages/Reports/userDate.js";
import UserStatus from "../pages/Reports/userStatus.js";
import OrderReport from "../pages/Reports/orderReport.js";
//setting
import BackupSetting from "../pages/Setting/backupSetting.js";
import InsertSetting from "../pages/Setting/insertSetting.js";
import Setting from "../pages/Setting/setting.js";
//notification
import Notification from "../pages/Notification/notification.js";

//order
import OrderList from "../pages/Order/order.js";
import CreateOrderForm from "../pages/Order/createOrderForm.js";
import OrderCompletedScreen from "../pages/Order/orderCompleted.js";
import OrderFailedScreen from "../pages/Order/orderFail.js";
//CMS
import PostType from "../pages/CMS/postType/postType.js";
import PostCategory from "../pages/CMS/postCategory/postCategory.js";
import Post from "../pages/CMS/Post/post.js";
import UpdatePost from "../pages/CMS/Post/updatePost.js";
import ProductByCategory from "../pages/ProductByCategory/productByCategory.js";

//payemnt gateay
import PaymentGateway from "../pages/paymentGateway/paymentGateway.js";

//Coupon
import CouponList from "../pages/Coupon/coupon.js";

//Transaction
import Transaction from "../pages/Transaction/transaction.js";
import Employee from "../pages/Employee/employee.js";
import Email from "../pages/Email/email.js";
import EmailTemplates from "../pages/Email/emailTemplates.js";
import ActivityLogList from "../pages/ActivityLog/activityLog.js";
import UserNotification from "../pages/Notification/userNotification.js";
import TicketList from "../pages/Ticket/ticket.js";
import TicketModule from "../pages/Ticket/ticketChat.js";
import HeroSliderList from "../pages/HeroSlider/heroSlider.js";
import FeedbackList from "../pages/Feedback/feedback.js";
import VendorOrderList from "../pages/VendorOrder/vendorOrder.js";
import VendorOrderDetail from "../pages/VendorOrder/orderDetail.js";
import WalletHistory from "../pages/Wallet/WalletHistory/walletHistory.js";
import FundRequest from "../pages/Wallet/FundRequest/fundRequest.js";
import VendorList from "../pages/Vendor/vendor.js";
import CurrencyList from "../pages/Currency/currency.js";
import VendorCommission from "../pages/Reports/vendorCommission.js";
import EnquiryProduct from "../pages/Enquiry/enquiryProduct.js";
import ProductEnquiry from "../pages/Enquiry/productEnquiry.js";
import CustomerFeedback from "../pages/Reports/customerFeedback.js";
import AdminCommission from "../pages/Reports/adminCommission.js";
import VendorOrders from "../pages/Reports/vendorOrders.js";

const authProtectedRoutes = [
  //charts

  { path: "/charts-apex-column", component: <ColumnCharts /> },

  // Widgets
  { path: "/admin/dashboard", component: <Widgets /> },

  // Forms
  { path: "/forms-elements", component: <BasicElements /> },

  //Tables
  { path: "/tables-basic", component: <BasicTables /> },
  { path: "/tables-react", component: <ReactTable /> },

  //User Profile
  { path: "/profile", component: <UserProfile /> },

  // permissions
  { path: "/admin/setting/permission", component: <PermissionsList /> },

  // roles
  { path: "/admin/setting/role", component: <Roles /> },
  { path: "/role/permission/:id", component: <Permission /> },

  // users
  { path: "/user", component: <Users /> },

  // vendor
  { path: "/vendor", component: <VendorList /> },

  // category
  { path: "/product/category", component: <CategoryList /> },

  // product
  { path: "/product", component: <ProductList /> },
  { path: "/brands", component: <BrandList /> },
  { path: "/product/bulk-import", component: <BulkImport /> },

  //Reports
  {
    path: "/report/product-less-than-ten",
    component: <LessThan10ProductList />,
  },
  {
    path: "/report/admin-commission",
    component: <AdminCommission />,
  },
  {
    path: "/report/vendor-orders",
    component: <VendorOrders />,
  },
  { path: "/report/out-of-stock-product", component: <OutofStockProduct /> },
  { path: "/report/product-created-date", component: <ProductDate /> },
  { path: "/report/product-range", component: <ProductRange /> },
  { path: "/report/product-status", component: <ProductStatus /> },
  { path: "/report/user-created-date", component: <UserDate /> },
  { path: "/report/user-status", component: <UserStatus /> },
  { path: "/report/order-report", component: <OrderReport /> },
  { path: "/report/vendor-commission", component: <VendorCommission /> },
  { path: "/report/customer-feedback", component: <CustomerFeedback /> },

  //Setting
  { path: "/admin/setting/backup-setting", component: <BackupSetting /> },
  { path: "/admin/setting/insert-setting", component: <InsertSetting /> },
  { path: "/admin/setting", component: <Setting /> },
  //Notification
  { path: "/notification", component: <Notification /> },
  { path: "/user-notification", component: <UserNotification /> },

  //Ticket
  { path: "/ticket", component: <TicketList /> },

  //Email
  { path: "/email", component: <Email /> },
  { path: "/create/email-template", component: <EmailTemplates /> },
  { path: "/update/email-template/:id", component: <EmailTemplates /> },

  //Order
  { path: "/order", component: <OrderList /> },
  { path: "/vendor/order", component: <VendorOrderList /> },
  { path: "/vendor/order-detail/:id", component: <VendorOrderDetail /> },
  { path: "/order/order-product", component: <CreateOrderForm /> },
  { path: "/order/update-order/:id", component: <CreateOrderForm /> },
  { path: "/order-completed", component: <OrderCompletedScreen /> },
  { path: "/order-failed", component: <OrderFailedScreen /> },

  //CMS
  { path: "/post-type", component: <PostType /> },
  { path: "/post-category", component: <PostCategory /> },
  { path: "/post", component: <Post /> },
  { path: "/create/post", component: <UpdatePost /> },
  { path: "/update/post/:postId", component: <UpdatePost /> },
  //Payment Gateway

  { path: "/payment-gateway", component: <PaymentGateway /> },
  //Product By category
  { path: "/product/product-by-category", component: <ProductByCategory /> },

  //Coupon
  { path: "/coupon", component: <CouponList /> },

  //Transaction
  { path: "/transaction", component: <Transaction /> },

  //Employee
  { path: "/employee", component: <Employee /> },

  //hero Slider
  { path: "/hero-slider", component: <HeroSliderList /> },

  //Activity Log
  { path: "/activity-log", component: <ActivityLogList /> },

  //Activity Log
  { path: "/ticket-chat/:id", component: <TicketModule /> },

  //Activity Log
  { path: "/feedback", component: <FeedbackList /> },

  //Activity Log
  { path: "/wallet/wallet-history", component: <WalletHistory /> },

  //Activity Log
  { path: "/wallet/fund-request", component: <FundRequest /> },

  //Currency
  { path: "/currency", component: <CurrencyList /> },

  //Enquiry
  { path: "/enquiry-product", component: <EnquiryProduct /> },
  { path: "/product-enquiry", component: <ProductEnquiry /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/admin/dashboard" />,
  },
  { path: "*", component: <Navigate to="/admin/dashboard" /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },

  //AuthenticationInner pages
  { path: "/auth-signin-basic", component: <BasicSignIn /> },
  { path: "/auth-signin-cover", component: <CoverSignIn /> },
  { path: "/auth-signup-basic", component: <BasicSignUp /> },
  { path: "/auth-signup-cover", component: <CoverSignUp /> },
  { path: "/auth-pass-reset-basic", component: <BasicPasswReset /> },
  { path: "/auth-pass-reset-cover", component: <CoverPasswReset /> },
  { path: "/auth-lockscreen-basic", component: <BasicLockScreen /> },
  { path: "/auth-lockscreen-cover", component: <CoverLockScreen /> },
  { path: "/auth-logout-basic", component: <BasicLogout /> },
  { path: "/auth-logout-cover", component: <CoverLogout /> },
  { path: "/auth-success-msg-basic", component: <BasicSuccessMsg /> },
  { path: "/auth-success-msg-cover", component: <CoverSuccessMsg /> },
  { path: "/auth-twostep-basic", component: <BasicTwosVerify /> },
  { path: "/auth-twostep-cover", component: <CoverTwosVerify /> },
  { path: "/auth-404-basic", component: <Basic404 /> },
  { path: "/auth-404-cover", component: <Cover404 /> },
  { path: "/auth-404-alt", component: <Alt404 /> },
  { path: "/auth-500", component: <Error500 /> },

  { path: "/auth-pass-change-basic", component: <BasicPasswCreate /> },
  { path: "/auth-pass-change-cover", component: <CoverPasswCreate /> },
  { path: "/auth-offline", component: <Offlinepage /> },
];

export { authProtectedRoutes, publicRoutes };
