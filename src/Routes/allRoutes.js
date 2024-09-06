import React from "react";
import { Navigate } from "react-router-dom";

//Forms
import BasicElements from "../pages/Forms/formikForm";

//login
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";

//entries
import Entries from "../pages/Entries/entries";
import CreateUser from "../pages/CreateUser/createUser";

//users
import Users from "../pages/Users/users";

const authProtectedRoutes = [
  //charts

  // Forms
  { path: "/payout-form", component: <BasicElements /> },
  { path: "/create-user", component: <CreateUser /> },

  // entries
  { path: "/entries", component: <Entries /> },
  { path: "/users", component: <Users /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/payout-form" />,
  },
  { path: "*", component: <Navigate to="/payout-form" /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
];

export { authProtectedRoutes, publicRoutes };
