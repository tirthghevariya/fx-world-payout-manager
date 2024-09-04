import React from "react";
import { Navigate } from "react-router-dom";

// Widgets
import Widgets from "../pages/Dashboard/Index";
//Forms
import BasicElements from "../pages/Forms/formikForm";

//login
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";

//users
import Users from "../pages/Users/users";

const authProtectedRoutes = [
  //charts
  // users
 

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
  { path: "/admin/dashboard", component: <Widgets /> },
  // Forms
  { path: "/forms-elements", component: <BasicElements /> },
  { path: "/user", component: <Users /> },
];

export { authProtectedRoutes, publicRoutes };
