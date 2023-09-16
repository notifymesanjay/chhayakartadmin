import { useEffect, useState } from "react";

const UseViewport = () => {
  const [viewPortWidth, setViewPortWidth] = useState(0);

  const reportWindowSize = () => {
    setViewPortWidth(
      window.innerWidth > 768 ? window.innerWidth * 0.7 : window.innerWidth
    );
  };

  useEffect(() => {
    setViewPortWidth(window.innerWidth);
    reportWindowSize();
    window.addEventListener("resize", reportWindowSize);

    return () => {
      window.removeEventListener("resize", reportWindowSize);
    };
  }, []);

  return viewPortWidth;
};

export default UseViewport;
