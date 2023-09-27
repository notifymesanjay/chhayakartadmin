import logo from "./logo.svg";
import $ from 'jquery';
import "./App.css";
import { useEffect, useState } from "react";
import { useResponsive } from "./components/shared/use-responsive";
import SideBar from "./components/header/sidebar";
import styles from "./home-layout.module.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Orders from "./components/orders";
import Login from "./components/login";
import Categories from "./components/categories";

function App() {
  const { isSmScreen } = useResponsive();
  const [isMenu, setIsMenu] = useState(true);
  const [screenWidth, setScreenWidth] = useState(576);
  const [isCollapse, setIsCollapse] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 575) {
      setIsMenu(false);
      setScreenWidth(window.innerWidth);
    }
  }, []);

  const closeSideBar = () => {
    if (window.innerWidth <= 575) {
      setIsMenu(false);
    }
  };
  return (
    <>
      <header>
        <meta name="viewport" content={`width=device-width, initial-scale=1`} />
        <title>Admin | DonateKart</title>
        {/* <link rel="shortcut icon" href={favIcon} /> */}
      </header>
      <div className={!isSmScreen && styles.bodyWrapper}>
        <div
          className={
            isCollapse && !isSmScreen ? styles.expanded : styles.collapsed
          }
        >
          <SideBar
            isMenu={isMenu}
            setIsMenu={setIsMenu}
            screenWidth={screenWidth}
            isCollapse={isCollapse}
            setIsCollapse={setIsCollapse}
          />
        </div>
        <main
          className={`${styles.main} ${
            isCollapse && !isSmScreen
              ? styles.expandedBody
              : styles.collapsedBody
          }`}
        >
          <Routes>
            <Route exact={true} path="/" element={<Home />}></Route>
            <Route exact={true} path="/orders" element={<Orders />}></Route>
            <Route exact={true} path="/categories" element={<Categories />}></Route>
            <Route exact={true} path="/login" element={<Login />}></Route>
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
