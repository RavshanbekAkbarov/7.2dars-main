import { useEffect, useState } from "react";

const themeFromLocalStorage = () => {
  return localStorage.getItem("theme") || "winter";
};

export function UseThemeToggle() {
  const [theme, setTheme] = useState(themeFromLocalStorage());
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const changeTheme = () => {
    setTheme((prev) => (prev == "winter" ? "dracula" : "winter"));
  };
  return [changeTheme, theme];
}
