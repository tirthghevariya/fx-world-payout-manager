import React, { useState } from "react";
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

//import images
import avatar1 from "../../assets/images/users/avatar-1.jpg";

const ProfileDropdown = () => {

  const superAdminUser = JSON.parse(localStorage.getItem("superAdminUser"));

  //Dropdown Toggle
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };

  const userType = superAdminUser?.userType || "Admin";
  const displayUserType = userType === "super_admin" ? "Super Admin" : "Admin";
  return (
    <React.Fragment>
      <Dropdown
        isOpen={isProfileDropdown}
        toggle={toggleProfileDropdown}
        className="ms-sm-3 header-item topbar-user"
      >
        <DropdownToggle tag="button" type="button" className="btn">
          <span className="d-flex align-items-center">
            <img
              className="rounded-circle header-profile-user"
              src={avatar1}
              alt="Header Avatar"
            />
            <span className="text-start ms-xl-2">
              <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                {superAdminUser?.userType === "super_admin" ?"Super Admin":"Admin" || "Admin"}
              </span>
              <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">
                {superAdminUser?.username || "Admin"}
              </span>
            </span>
          </span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <h6 className="dropdown-header">Welcome {superAdminUser?.username ||"Admin"}!</h6>
    
          <div className="dropdown-divider"></div>
          {/* {superAdminUser && superAdminUser.userType === "super_admin" ?
           <DropdownItem className="p-0">
            <Link
              to={"/create-user"}
              className="dropdown-item"
            >
              <i class="ri-user-add-fill text-muted fs-16 align-middle me-1"></i>
              <span className="align-middle">Create User</span>
            </Link>
          </DropdownItem>
          :""}        
           */}
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default ProfileDropdown;
