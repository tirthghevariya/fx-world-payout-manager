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
  const [isTables, setIsTables] = useState(false);
  const [isCharts, setIsCharts] = useState(false);
  const [isProduct, setisProduct] = useState(false);
  const [isWallet, setIsWallet] = useState(false);
  const [iscurrentState, setIscurrentState] = useState("Dashboard");
  // const permissions = authUser.permissions.map((permission) =>
  //   permission.toUpperCase()
  // );
  //
  // console.log("permissions", permissions);

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        const id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
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
    isTables,
    isCharts,
    isProduct,
    isWallet,
  ]);
  
  const menuItems = [
    ...(superAdminUser && superAdminUser.userType === "super_admin" ? [{
      id: "entries",
      pkey: "Entries",
      label: "Entries",
      link: "/entries",
      icon: " ri-file-list-fill",
      parentId: "entries",
    }] : []),  
  
    ...(superAdminUser && superAdminUser.userType === "super_admin" ? [{
      id: "user",
      pkey: "Users",
      label: "Users",
      link: "/users",
      icon: "ri-shield-user-fill",
      parentId: "user",
    }] : []),

    {
      id: "forms",
      label: "Payout Form",
      icon: "ri-file-list-3-line",
      link: "/payout-form",
      click: function (e) {
        e.preventDefault();
        setIsForms(!isForms);
        setIscurrentState("Forms");
        updateIconSidebar(e);
      },
      stateVariables: isForms,
    },
  ];

  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
