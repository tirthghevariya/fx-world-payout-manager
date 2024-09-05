import React from "react";
import { Navigate } from "react-router-dom";

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
    component: <Navigate to="/forms-elements" />,
  },
  { path: "*", component: <Navigate to="/forms-elements" /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
];

export { authProtectedRoutes, publicRoutes };
