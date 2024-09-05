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
    if (iscurrentState === "/forms-elements") {
      history("/forms-elements");
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
      id: "user",
      pkey: "Users",
      label: "Entries",
      link: "/user",
      icon: "ri-shield-user-fill",
      parentId: "user",
    }] : []),
    {
      id: "forms",
      label: "Forms",
      icon: "ri-file-list-3-line",
      link: "/forms-elements",
      click: function (e) {
        e.preventDefault();
        setIsForms(!isForms);
        setIscurrentState("Forms");
        updateIconSidebar(e);
      },
      stateVariables: isForms,
    },
  ];

  // const isAdminOnly = permissions.length === 1 && permissions[0] === "admin";

  // if (isAdminOnly) {
  //   filteredMenuItems = menuItems;
  // } else {
  //   filteredMenuItems = menuItems.filter((item) => {
  //     const permissionExists = permissions.some(
  //       (permission) => permission === item.label.toLowerCase()
  //     );
  //     return permissionExists;
  //   });

  //   const additionalItems = [
  //     {
  //       id: "forms",
  //       label: "Forms",
  //       icon: "ri-file-list-3-line",
  //       link: "/forms-elements",
  //     },
  //     {
  //       id: "tables",
  //       label: "Tables",
  //       icon: "ri-layout-grid-line",
  //       link: "/#",
  //     },
  //     {
  //       id: "apexcharts",
  //       label: "Bar Graph",
  //       icon: "ri-pie-chart-line",
  //       link: "/charts-apex-column",
  //     },
  //   ];

  //   filteredMenuItems = [...filteredMenuItems, ...additionalItems];
  //   menuItems.forEach((parentItem) => {
  //     if (
  //       parentItem.subItems &&
  //       permissions.some((permission) => permission === parentItem.pkey)
  //     ) {
  //       filteredMenuItems.push(parentItem);
  //       filteredMenuItems.push(
  //         ...parentItem.subItems.filter((subItem) =>
  //           permissions.some((permission) => permission === subItem.pkey)
  //         )
  //       );
  //     }
  //   });
  // }

  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
