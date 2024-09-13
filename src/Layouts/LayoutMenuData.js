import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const superAdminUser = JSON.parse(localStorage.getItem("superAdminUser"));

  const history = useNavigate();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isPages, setIsPages] = useState(false);
  const [isForms, setIsForms] = useState(false);
  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Auth") {
      setIsAuth(false);
    }
    if (iscurrentState !== "Pages") {
      setIsPages(false);
    }
    if (iscurrentState !== "Forms") {
      setIsForms(false);
    }
    if (iscurrentState === "/payout-form") {
      history("/payout-form");
      document.body.classList.add("twocolumn-panel");
    }
  }, [
    history,
    iscurrentState,
    isDashboard,
    isAuth,
    isPages,
    isForms,
  ]);

  const menuItems = [
    ...(superAdminUser && superAdminUser?.clientId ? [{
      id: "entries",
      pkey: "Entries",
      label: "Entries",
      link: "/entries",
      icon: " ri-file-list-fill",
      parentId: "entries",
    }] : []),

    ...(superAdminUser && superAdminUser?.clientId ? [{
      id: "user",
      pkey: "Users",
      label: "Users",
      link: "/users",
      icon: "ri-shield-user-fill",
      parentId: "user",
    }] : []),
    ...(superAdminUser && superAdminUser?.userType === "super_admin" || superAdminUser?.userType === undefined ? [{

      id: "forms",
      label: "Payout Form",
      icon: "ri-file-list-3-line",
      link: "/payout-form",
      stateVariables: isForms,

    }] : []),
  ];

  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
