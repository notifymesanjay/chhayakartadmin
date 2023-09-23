import { useEffect, useState } from "react";
import Home from "../components/home/index";
import HomeLayout from "../components/home-layout";
import NotFound from "../components/not-found";

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("authorizationData"));
    const isLoggedIn = authData && authData.access_token;
    setIsAuthenticated(isLoggedIn);
  }, []);

  return <HomeLayout>{isAuthenticated ? <Home /> : <NotFound />}</HomeLayout>;
}
