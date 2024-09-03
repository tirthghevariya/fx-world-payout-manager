import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isPages, setIsPages] = useState(false);
  const [isForms, setIsForms] = useState(false);
  const [isTables, setIsTables] = useState(false);
  const [isCharts, setIsCharts] = useState(false);
  const [isProduct, setisProduct] = useState(false);
  const [isSetting, setisSetting] = useState(false);
  const [isOrder, setisOrder] = useState(false);
  const [isReport, setisReport] = useState(false);
  const [isCms, setisCms] = useState(false);
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
    if (iscurrentState !== "Tables") {
      setIsTables(false);
    }
    if (iscurrentState !== "CMS") {
      setIsTables(false);
    }
    if (iscurrentState !== "Charts") {
      setIsCharts(false);
    }
    if (iscurrentState !== "Product") {
      setisProduct(false);
    }
    if (iscurrentState !== "Setting") {
      setisSetting(false);
    }
    if (iscurrentState !== "Report") {
      setisReport(false);
    }
    if (iscurrentState !== "wallet") {
      setIsWallet(false);
    }
    if (iscurrentState === "/admin/dashboard") {
      history("/admin/dashboard");
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
    {
      id: "widgets",
      label: "Dashboard",
      icon: "ri-honour-line",
      link: "/admin/dashboard",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("Widgets");
      },
    },
    {
      id: "user",
      pkey: "Users",
      label: "Users",
      link: "/user",
      icon: " ri-shield-user-fill",
      parentId: "user",
    },
    {
      id: "productCatlog",
      label: "Product Catalog",
      link: "/#",
      icon: " ri-booklet-fill",
      click: function (e) {
        e.preventDefault();
        setisProduct(!isProduct);
        setIscurrentState("Product");
        updateIconSidebar(e);
      },
      stateVariables: isProduct,
      subItems: [
        {
          id: "category",
          pkey: "category",
          label: "Category",
          link: "/product/category",
          parentId: "category",
        },
        {
          id: "product",
          pkey: "product",
          label: "Product",
          link: "/product",
          parentId: "product",
        },
        {
          id: "brands",
          pkey: "brands",
          label: "Brand",
          link: "/brands",
          parentId: "brands",
        },
      ],
    },
    {
      id: "setting",
      label: "Setting",
      link: "/#",
      icon: " ri-settings-3-fill",
      click: function (e) {
        e.preventDefault();
        setisSetting(!isSetting);
        setIscurrentState("Setting");
        updateIconSidebar(e);
      },
      stateVariables: isSetting,
      subItems: [
        {
          id: "backup",
          label: "Backup",
          link: "/admin/setting/backup-setting",
          parentId: "setting",
          pkey: "demo",
        },
        {
          id: "permission",
          pkey: "permission",
          label: "Permissions",
          link: "/admin/setting/permission",
          parentId: "setting",
        },
        {
          id: "role",
          pkey: "roles",
          label: "Roles",
          link: "/admin/setting/role",
          parentId: "setting",
        },
        {
          id: "insert-setting",
          pkey: "create",
          label: "Insert Setting",
          link: "/admin/setting/insert-setting",
          parentId: "setting",
        },
        {
          id: "setting",
          pkey: "setting",
          label: "Setting",
          link: "/admin/setting",
          parentId: "setting",
        },
      ],
    },
    {
      id: "order",
      label: "Order",
      link: "/#",
      icon: "ri-list-ordered",
      click: function (e) {
        e.preventDefault();
        setisOrder(!isOrder);
        setIscurrentState("Order");
        updateIconSidebar(e);
      },
      stateVariables: isOrder,
      subItems: [
        {
          id: "order",
          pkey: "order",
          label: "Order",
          link: "/order",
          parentId: "order",
        },
      ],
    },
    {
      id: "reports",
      label: "Reports",
      icon: "bx bxs-report",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setisReport(!isReport);
        setIscurrentState("Report");
        updateIconSidebar(e);
      },
      stateVariables: isReport,
      subItems: [
        {
          id: "outOfStock",
          label: "Out of Stock Product",
          link: "/report/out-of-stock-product",
          parentId: "tables",
        },
        {
          id: "productLessThanOne",
          label: "Less Than 10 Products",
          link: "/report/product-less-than-ten",
          parentId: "tables",
        },
        {
          id: "productDate",
          label: "Product Created Date",
          link: "/report/product-created-date",
          parentId: "tables",
        },
        {
          id: "productRange",
          label: "Product Range",
          link: "/report/product-range",
          parentId: "tables",
        },
        {
          id: "productStatus",
          label: "Product Status",
          link: "/report/product-status",
          parentId: "tables",
        },
        {
          id: "userCreatedDate",
          label: "User Created Date",
          link: "/report/user-created-date",
          parentId: "tables",
        },
        {
          id: "userStatus",
          label: "User Status",
          link: "/report/user-status",
          parentId: "tables",
        },
        {
          id: "orderReports",
          label: "Order Report",
          link: "/report/order-report",
          parentId: "tables",
        },
        {
          id: "vendorCommission",
          label: "Vendor Commission",
          link: "/report/vendor-commission",
          parentId: "tables",
        },
        {
          id: "customer-feedback",
          label: "Customer Feedback",
          link: "/report/customer-feedback",
          parentId: "tables",
        },
        {
          id: "admin-commission",
          label: "Admin Commission",
          link: "/report/admin-commission",
          parentId: "tables",
        },
        {
          id: "vendor-orders",
          label: "Vendor Orders",
          link: "/report/vendor-orders",
          parentId: "tables",
        },
      ],
    },
    {
      id: "notification",
      pkey: "notification",
      label: "Notification",
      link: "/notification",
      icon: "bx bxs-notification",
      parentId: "notification",
    },
    {
      id: "ticket",
      pkey: "ticket",
      label: "Ticket",
      link: "/ticket",
      icon: "ri-coupon-2-fill",
      parentId: "ticket",
    },
    {
      id: "email",
      pkey: "email",
      label: "Email Templates",
      link: "/email",
      icon: "ri-mail-line",
      parentId: "email",
    },
    {
      id: "activity-log",
      pkey: "activity-log",
      label: "Activity log",
      link: "/activity-log",
      icon: "ri-mail-line",
      parentId: "activity-log",
    },
    {
      id: "cms",
      label: "CMS",
      icon: "ri-layout-grid-line",
      link: "/#",
      // pkey: "posttypes",
      click: function (e) {
        e.preventDefault();
        setisCms(!isCms);
        setIscurrentState("CMS");
        updateIconSidebar(e);
      },
      stateVariables: isCms,
      subItems: [
        {
          id: "post",
          label: "Post",
          link: "/post",
          parentId: "tables",
          pkey: "posttypes",
        },
        {
          id: "post-type",
          label: "Post Type",
          link: "/post-type",
          parentId: "cms",
          pkey: "post category",
        },
        {
          id: "post-category",
          label: "Post Category",
          link: "/post-category",
          parentId: "cms",
          pkey: "post",
        },
      ],
    },
    {
      id: "product-by-category",
      pkey: "productByCategory",
      label: "Product By Category",
      link: "/product/product-by-category",
      icon: "ri-shield-user-fill",
      parentId: "product-by-category",
    },
    {
      id: "payment-gateway",
      pkey: "PaymentGateway",
      label: "Payment Gateway",
      link: "/payment-gateway",
      icon: "ri-bank-card-fill",
      parentId: "payment-gateway",
    },
    {
      id: "Coupon",
      pkey: "coupon",
      label: "Coupon",
      link: "/coupon",
      icon: "ri-ticket-2-line",
      parentId: "Coupon",
    },
    {
      id: "transaction",
      pkey: "transaction",
      label: "Transaction",
      link: "/transaction",
      icon: "ri-shield-user-fill",
      parentId: "transaction",
    },
    {
      id: "hero-slider",
      pkey: "hero-slider",
      label: "Hero Slider",
      link: "/hero-slider",
      icon: "ri-equalizer-line",
      parentId: "hero-slider",
    },
    {
      id: "employee",
      pkey: "employee",
      label: "Employee",
      link: "/employee",
      icon: "ri-shield-user-fill",
      parentId: "employee",
    },
    {
      id: "vendor",
      pkey: "vendor",
      label: "Vendor",
      link: "/vendor",
      icon: "ri-shield-user-fill",
      parentId: "vendor",
    },
    {
      id: "feedback",
      pkey: "feedback",
      label: "FeedBack",
      link: "/feedback",
      icon: "ri-feedback-fill",
      parentId: "feedback",
    },
    {
      id: "currency",
      pkey: "currency",
      label: "Currency",
      link: "/currency",
      icon: "ri-currency-fill",
      parentId: "currency",
    },
    {
      id: "enquiry",
      label: "Enquiry Product",
      icon: "ri-honour-line",
      link: "/enquiry-product",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("Widgets");
      },
    },
    {
      id: "product-enquiry",
      label: "Product Enquiry",
      icon: "ri-honour-line",
      link: "/product-enquiry",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("Widgets");
      },
    },
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

    {
      id: "tables",
      label: "Tables",
      icon: "ri-layout-grid-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsTables(!isTables);
        setIscurrentState("Tables");
        updateIconSidebar(e);
      },
      stateVariables: isTables,
      subItems: [
        {
          id: "basictables",
          label: "Basic Tables",
          link: "/tables-basic",
          parentId: "tables",
        },
        {
          id: "reactdatatables",
          label: "React Datatables",
          link: "/tables-react",
          parentId: "tables",
        },
      ],
    },

    {
      id: "apexcharts",
      label: "Bar Graph",
      icon: "ri-pie-chart-line",
      link: "/charts-apex-column",
      click: function (e) {
        e.preventDefault();
      },
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
