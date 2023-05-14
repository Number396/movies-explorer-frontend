import { useEffect, useState } from "react";
import { SCREEN_SM, SCREEN_MD, SCREEN_LG } from "../utils/constants";

export function useResize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    width,
    isScreenSm: width >= SCREEN_SM && width < SCREEN_MD,
    isScreenMd: width >= SCREEN_MD && width < SCREEN_LG,
    isScreenLg: width >= SCREEN_LG,
  };
}
