import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

// Authentication
import LoginReducer from "./auth/login/reducer";
import AccountReducer from "./auth/register/reducer";
import ProfileReducer from "./auth/profile/reducer";

//tosts
import toastReducer from "./toast/reducer";

//permission
import permissionReducer from "./permission/reducer";
//role
import roleReducer from "./roles/reducer";

// User
import userReducer from "./users/reducer";

//category
import categoryReducer from "./category/reducer";

//category
import productReducer from "./product/reducer";

//dashboard
import dashboardReducer from "./dashboard/reducer";

//reports
import reportsReducer from "./reports/reducer";

// notification
import notificationReducer from "./notification/reducer";

// order
import orderReducer from "./order/reducer";

//setting
import settingReducer from "./setting/reducer";

//post Type
import postTypeReducer from "./postType/reducer";

//post category
import postCategoryReducer from "./postCategory/reducer";

//post
import postReducer from "./post/reducer";

//payment Gateway
import PaymentGatewayReducer from "./paymentGateway/reducer";

//Coupon
import couponReducer from "./coupon/reducer";

//Employee
import employeeReducer from "./employee/reducer";

//Employee
import emailReducer from "./email/reducer";

//activity Log
import activityLogReducer from "./activityLog/reducer";

//ticket
import ticketReducer from "./ticket/reducer";

//Hero Slider
import heroReducer from "./heroSlider/reducer";

//Brand
import brandReducer from "./brand/reducer";

//Feedback
import feedbackReducer from "./contact/reducer";

//Wallet
import walletReducer from "./wallet/reducer";

//Currency
import currencyReducer from "./currency/reducer";

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Login: LoginReducer,
  Account: AccountReducer,
  Profile: ProfileReducer,
  toast: toastReducer,
  permission: permissionReducer,
  role: roleReducer,
  user: userReducer,
  category: categoryReducer,
  product: productReducer,
  dashboard: dashboardReducer,
  reports: reportsReducer,
  notification: notificationReducer,
  order: orderReducer,
  setting: settingReducer,
  postType: postTypeReducer,
  postCategory: postCategoryReducer,
  post: postReducer,
  paymentGateway: PaymentGatewayReducer,
  coupon: couponReducer,
  employee: employeeReducer,
  email: emailReducer,
  activityLog: activityLogReducer,
  ticket: ticketReducer,
  heroSlider: heroReducer,
  brand: brandReducer,
  feedback: feedbackReducer,
  wallet: walletReducer,
  currency: currencyReducer,
});

export default rootReducer;
