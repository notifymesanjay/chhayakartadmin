import Head from 'next/head';
import { useState, useEffect } from 'react';
import SideBar from './header/sidebar';
// import favIcon from "../public/favicon.ico";
import styles from './home-layout.module.scss';
import { useResponsive } from './shared/use-responsive';

const HomeLayout = ({ children }) => {
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
      <Head>
        <meta name='viewport' content={`width=device-width, initial-scale=1`} />
        <title>Admin | DonateKart</title>
        {/* <link rel="shortcut icon" href={favIcon} /> */}
      </Head>
      <div className={!isSmScreen && styles.bodyWrapper}>
        <div
          className={
            isCollapse && !isSmScreen ? styles.expanded : styles.collapsed
          }>
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
          }`}>
          {children}
        </main>
      </div>
    </>
  );
};

export default HomeLayout;
