import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const CustomLink = (props) => {
  return (
    <Link href={props.to}>
      <a {...props}>{props.children}</a>
    </Link>
  );
};

export const NavLink = (props) => {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let { pathname } = router;
    if (props.matchHash) pathname = `${pathname}${window.location.hash}`;

    setIsActive(
      props.exact ? pathname === props.to : pathname.startsWith(props.to)
    );
  }, [router.pathname]);

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
