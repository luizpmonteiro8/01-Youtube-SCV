/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { blueTheme, greyTheme, redTheme } from "theme";

export const changeTheme = (color: "grey" | "red" | "blue") => {
  localStorage.setItem("colorTheme", color);
};

export const getTheme = () => {
  const [color, setColor] = useState("grey");
  const [theme, setTheme] = useState(greyTheme);

  useEffect(() => {
    if (localStorage.getItem("colorTheme") != null) {
      setColor(localStorage.getItem("colorTheme")!);
    }
    switch (color) {
      case "grey":
        setTheme(greyTheme);
        break;
      case "blue":
        setTheme(blueTheme);
        break;
      case "red":
        setTheme(redTheme);
        break;

      default:
        setTheme(greyTheme);
    }
  }, [color]);

  return theme;
};
