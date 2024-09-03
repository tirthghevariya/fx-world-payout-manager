import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

// Authentication
import LoginReducer from "./auth/login/reducer";

//tosts
import toastReducer from "./toast/reducer";


// User
import userReducer from "./users/reducer";

//dashboard
import dashboardReducer from "./dashboard/reducer";


//activity Log
import activityLogReducer from "./activityLog/reducer";


const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Login: LoginReducer,
  toast: toastReducer,
  user: userReducer,
  dashboard: dashboardReducer,
  activityLog: activityLogReducer,
});

export default rootReducer;
