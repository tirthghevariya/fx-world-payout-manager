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
import CreateUser from "../pages/CreateUser/createUser";

const authProtectedRoutes = [
  //charts


  // Widgets
  { path: "/admin/dashboard", component: <Widgets /> },

  // Forms
  { path: "/forms-elements", component: <BasicElements /> },
  { path: "/create-user", component: <CreateUser /> },

  // users
  { path: "/user", component: <Users /> },

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
];

export { authProtectedRoutes, publicRoutes };
