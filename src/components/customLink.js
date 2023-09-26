import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const CustomLink = (props) => {
  return (
    <a href={props.to} {...props}>
      {props.children}
    </a>
  );
};

export const NavLink = (props) => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let { pathname } = location;
    if (props.matchHash) pathname = `${pathname}${window.location.hash}`;

    setIsActive(
      props.exact ? pathname === props.to : pathname.startsWith(props.to)
    );
  }, [location.pathname]);

  return (
    <CustomLink
      className={`${props.className || ""} ${isActive ? "active" : ""}`}
      {...props}
    >
      {props.children}
    </CustomLink>
  );
};

export default CustomLink;
