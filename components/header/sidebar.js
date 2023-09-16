import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
// import homeImg from '../../public/images/sidebar/home.webp';
// import createCampaign from '../../public/images/sidebar/create-campaign.webp';
// import businessDev from '../../public/images/sidebar/Business-dev.webp';
// import monthlyGiving from '../../public/images/sidebar/Monthly-giving.webp';
// import giftCard from '../../public/images/sidebar/Gift-card.webp';
// import support from '../../public/images/sidebar/Support.webp';
// import accounts from '../../public/images/sidebar/Accounts.webp';
// import settings from '../../public/images/sidebar/settings.webp';
// import homeImgActive from '../../public/images/sidebar/home-active.webp';
// import createCampaignActive from '../../public/images/sidebar/create-campaign-active.webp';
// import businessDevActive from '../../public/images/sidebar/Business-dev-active.webp';
// import monthlyGivingActive from '../../public/images/sidebar/Monthly-giving-active.webp';
// import giftCardActive from '../../public/images/sidebar/Gift-card-active.webp';
// import supportActive from '../../public/images/sidebar/Support-active.webp';
// import accountsActive from '../../public/images/sidebar/Accounts-active.webp';
// import settingsActive from '../../public/images/sidebar/settings-active.webp';
import useAuthService from "../../services/authService";
import { useResponsive } from "../shared/use-responsive";
import { NavLink } from "../customLink";
import CollapsibleMenu from "./collapsible-menu";
import styles from "./sidebar.module.scss";

const sideMenu = [
  {
    id: 1,
    name: "Dashboard",
    path: "/",
    // img: homeImg,
    // activeImg: homeImgActive,
    expand: false,
    isIcon: false,
    children: [],
  },
  {
    id: 2,
    name: "Orders",
    path: "/orders",
    // img: createCampaign,
    // activeImg: createCampaignActive,
    expand: false,
    isIcon: false,
    children: [],
  },
  {
    id: 3,
    name: "Categories",
    path: "",
    // img: businessDev,
    // activeImg: businessDevActive,
    expand: false,
    isIcon: false,
    children: [
      {
        id: 31,
        name: "Manage Categories",
        path: "/campaign-manager-dashboard",
      },
      {
        id: 32,
        name: "Order Categories",
        path: "/ngos",
      },
    ],
  },
  {
    id: 4,
    name: "Products",
    path: "/monthlyGiving",
    // img: monthlyGiving,
    // activeImg: monthlyGivingActive,
    expand: false,
    isIcon: false,
    children: [
      {
        id: 41,
        name: "Manage Products",
        path: "/campaign-manager-dashboard",
      },
      {
        id: 42,
        name: "Units",
        path: "/ngos",
      },
      {
        id: 43,
        name: "Media",
        path: "/ngos",
      },
      {
        id: 44,
        name: "Bulk Upload",
        path: "/ngos",
      },
      {
        id: 45,
        name: "Taxes",
        path: "/ngos",
      },
      {
        id: 46,
        name: "Brands",
        path: "/ngos",
      },
      {
        id: 47,
        name: "Product Order",
        path: "/ngos",
      },
    ],
  },
  {
    id: 5,
    name: "Sellers",
    path: "/gift-cards",
    // img: giftCard,
    // activeImg: giftCardActive,
    expand: false,
    isIcon: false,
    children: [
      {
        id: 51,
        name: "Add Seller",
        path: "/ngos",
      },
      {
        id: 52,
        name: "Seller Requests",
        path: "/ngos",
      },
      {
        id: 53,
        name: "Manage Requests",
        path: "/ngos",
      },
      {
        id: 54,
        name: "Seller Commissions",
        path: "/ngos",
      },
      {
        id: 55,
        name: "Seller Wallet Transactions",
        path: "/ngos",
      },
      {
        id: 56,
        name: "Seller Policies",
        path: "/ngos",
      },
    ],
  },
  {
    id: 6,
    name: "Home Sliders",
    path: "",
    // img: support,
    // activeImg: supportActive,
    expand: false,
    isIcon: true,
    children: [],
  },
  {
    id: 7,
    name: "Offer Image",
    path: "/accounts",
    // img: accounts,
    // activeImg: accountsActive,
    expand: false,
    isIcon: true,
    children: [
      {
        id: 71,
        name: "Manage Offer Image",
        path: "/ngos",
      },
      {
        id: 72,
        name: "Manage Popup Offer",
        path: "/ngos",
      },
    ],
  },
  {
    id: 8,
    name: "Featured Sections",
    path: "",
    // img: settings,
    // activeImg: settingsActive,
    expand: false,
    isIcon: false,
    children: [
      {
        id: 81,
        name: "Manage Section",
        path: "/images",
      },
      {
        id: 82,
        name: "Order Section",
        path: "/users",
      },
    ],
  },
  {
    id: 9,
    name: "Return Requests",
    path: "",
    // img: settings,
    // activeImg: settingsActive,
    expand: false,
    isIcon: false,
    children: [],
  },
  {
    id: 10,
    name: "Withdrawal Requests",
    path: "",
    // img: settings,
    // activeImg: settingsActive,
    expand: false,
    isIcon: false,
    children: [],
  },
  {
    id: 11,
    name: "Delivery Boys",
    path: "",
    // img: settings,
    // activeImg: settingsActive,
    expand: false,
    isIcon: false,
    children: [
      {
        id: 111,
        name: "Manage Delivery Boys",
        path: "/images",
      },
      {
        id: 112,
        name: "Delivery Boy Requests",
        path: "/users",
      },
      {
        id: 113,
        name: "Fund Transfers",
        path: "/users",
      },
      {
        id: 114,
        name: "Delivery Boy Cash",
        path: "/users",
      },
      {
        id: 115,
        name: "Delivery Boy Policies",
        path: "/users",
      },
    ],
  },
  {
    id: 12,
    name: "Notifications",
    path: "",
    // img: settings,
    // activeImg: settingsActive,
    expand: false,
    isIcon: false,
    children: [
      {
        id: 121,
        name: "Send Notification",
        path: "/images",
      },
      {
        id: 122,
        name: "Manage Notifications",
        path: "/users",
      },
      {
        id: 123,
        name: "Notification Settings",
        path: "/users",
      },
    ],
  },
  {
    id: 13,
    name: "System",
    path: "",
    // img: settings,
    // activeImg: settingsActive,
    expand: false,
    isIcon: false,
    children: [
      {
        id: 131,
        name: "Store Settings",
        path: "/images",
      },
      {
        id: 132,
        name: "Time Slots",
        path: "/users",
      },
      {
        id: 133,
        name: "Payment Methods",
        path: "/users",
      },
      {
        id: 134,
        name: "Contact Us",
        path: "/users",
      },
      {
        id: 135,
        name: "About Us",
        path: "/users",
      },
      {
        id: 136,
        name: "Fire Setup",
        path: "/users",
      },
      {
        id: 137,
        name: "System Registration",
        path: "/users",
      },
    ],
  },
  {
    id: 14,
    name: "Location",
    path: "",
    // img: settings,
    // activeImg: settingsActive,
    expand: false,
    isIcon: false,
    children: [],
  },

  {
    id: 15,
    name: "Customers",
    path: "",
    // img: settings,
    // activeImg: settingsActive,
    expand: false,
    isIcon: false,
    children: [
      {
        id: 151,
        name: "Customers",
        path: "/images",
      },
      {
        id: 152,
        name: "Wishlists",
        path: "/users",
      },
      {
        id: 153,
        name: "Transactions",
        path: "/users",
      },
      {
        id: 154,
        name: "Customer Policies",
        path: "/users",
      },
    ],
  },
  {
    id: 16,
    name: "Reports",
    path: "",
    // img: settings,
    // activeImg: settingsActive,
    expand: false,
    isIcon: false,
    children: [
      {
        id: 161,
        name: "Product Sales Report",
        path: "/images",
      },
      {
        id: 162,
        name: "Sales Reports",
        path: "/users",
      },
    ],
  },
  {
    id: 17,
    name: "System Users",
    path: "",
    // img: settings,
    // activeImg: settingsActive,
    expand: false,
    isIcon: false,
    children: [],
  },
  {
    id: 18,
    name: "Role",
    path: "",
    // img: settings,
    // activeImg: settingsActive,
    expand: false,
    isIcon: false,
    children: [],
  },
  {
    id: 17,
    name: "FAQs",
    path: "",
    // img: settings,
    // activeImg: settingsActive,
    expand: false,
    isIcon: false,
    children: [],
  },
];

const SideBar = ({ setIsCollapse }) => {
  const router = useRouter();
  const { isSmScreen } = useResponsive();
  const { authService } = useAuthService();
  const [openCollapse, setOpenCollapse] = useState(!isSmScreen);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const siteLinks = (
    <>
      <span className={styles.pageLinksWrapper}>
        {sideMenu.map((menuItem, index) => (
          <li id="giftCards" role="presentation" key={index}>
            {openCollapse && (
              <span
                className={`${styles.border} ${
                  menuItem.path !== "" &&
                  router.pathname === menuItem.path &&
                  menuItem.id !== 2
                    ? styles.activeBorder
                    : ""
                }`}
              ></span>
            )}
            <NavLink
              to={menuItem.path}
              className={
                menuItem.path !== "" && router.pathname === menuItem.path
                  ? styles.active
                  : styles.inactive
              }
            >
              <span
                onClick={() => {
                  menuItem.expand = !menuItem.expand;
                }}
              >
                {
                  //   <Image
                  //     src={
                  //       router.pathname === menuItem.path
                  //         ? menuItem.activeImg
                  //         : menuItem.img
                  //     }
                  //     className={`${styles.menuIcon} ${
                  //       menuItem.isIcon && styles.menuIcon1
                  //     }`}
                  //     width={menuItem.id === 2 ? 18 : 22}
                  //     height={menuItem.id === 2 && 22}
                  //     alt={`icon-${menuItem.name}`}
                  //   />
                }{" "}
                {openCollapse && menuItem.name}{" "}
                {menuItem.children.length > 0 && openCollapse && (
                  <i className={styles.icon}>
                    <FontAwesomeIcon icon={faAngleDown} />
                  </i>
                )}
              </span>
              {menuItem.children.length > 0 && menuItem.expand && (
                <ul className={`${styles.navbarNav} ${styles.childNav}`}>
                  <span>
                    {menuItem.children.map((item, index) => (
                      <li id="giftCards" role="presentation" key={index}>
                        {openCollapse && (
                          <span
                            className={`${styles.border} ${
                              router.pathname === item.path
                                ? styles.activeBorder
                                : ""
                            }`}
                          ></span>
                        )}
                        <NavLink
                          to={item.path}
                          className={`${
                            item.path !== "" && router.pathname === item.path
                              ? styles.active
                              : styles.inactive
                          } ${styles.childrenName}`}
                        >
                          {openCollapse && item.name}
                        </NavLink>
                      </li>
                    ))}
                  </span>
                </ul>
              )}
            </NavLink>
          </li>
        ))}
      </span>
      <span>
        <li className={styles.login}>
          {isAuthenticated ? (
            <NavLink to="" className={styles.inactive}>
              {openCollapse && (
                <div className={styles.profileWrapper}>
                  <p className={styles.profile}>PROFILE</p>
                  <div className={styles.profileDetails}>
                    <p className={styles.profileName}>
                      {
                        JSON.parse(
                          localStorage.getItem("authorizationData")
                        ).email.split("@")[0]
                      }
                    </p>
                    <div
                      className={styles.test}
                      onClick={() => {
                        setShowLogout(!showLogout);
                      }}
                    >
                      ...
                    </div>
                    {showLogout && (
                      <span
                        className={styles.logoutDropDown}
                        onClick={() => {
                          authService.logOut();
                          window.location.replace("/login");
                        }}
                      >
                        Logout
                      </span>
                    )}
                  </div>
                </div>
              )}
            </NavLink>
          ) : (
            <NavLink className={styles.inactive} to="/login">
              {openCollapse && "Login"}
            </NavLink>
          )}
        </li>
      </span>
    </>
  );

  useEffect(() => {
    setIsCollapse(openCollapse);
    if (!openCollapse) {
      sideMenu.map((siteLink) => (siteLink.expand = false));
    }
  }, [openCollapse]);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("authorizationData"));
    const isLoggedIn = authData && authData.accessToken;
    setIsAuthenticated(isLoggedIn);
  }, []);

  return useMemo(() => (
    <section className={styles.navbarWrapper}>
      <nav id="header" className={`${styles.navbar} ${styles.flexItemCenter}`}>
        <CollapsibleMenu isOpen={openCollapse} toggleCollapse={setOpenCollapse}>
          <ul className={styles.navbarNav}>{siteLinks}</ul>
        </CollapsibleMenu>
      </nav>
    </section>
  ));
};

export default SideBar;
