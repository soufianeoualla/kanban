import { useContext } from "react";
import { DarkThemeContext } from "../App";
import icon_dark_theme from "./assets/icon-dark-theme.svg";
import icon_light_theme from "./assets/icon-light-theme.svg";
const ThemeToggle = ({setDarkTheme}) => {
  const darkTheme = useContext(DarkThemeContext);
  return (
    <div className=" absolute bottom-10 w-full sm:static  sm:flex sm:justify-center sm:items-center mt-2">
    <div
      className={`h-12 ml-6 w-[85%] flex justify-center gap-6 items-center ${
        darkTheme ? "bg-Charcoal" : "bg-Light-Blue-Gray"
      } sm:ml-0  `}
    >
      <img src={icon_light_theme} alt="" />
      <div
        onClick={() => setDarkTheme(!darkTheme)}
        className="w-10 h-5 rounded-3xl bg-purple relative hover:bg-opacity-20 cursor-pointer"
      >
        <div
          className={`toggle w-[14px] h-[14px] rounded-full bg-white absolute top-1/2 translate-y-[-50%] transition-all ${
            darkTheme ? "right-[3px] " : "left-[3px] "
          } `}
        >
          {" "}
        </div>
      </div>

      <img src={icon_dark_theme} alt="" />
    </div>

   
  </div>
  )
}

export default ThemeToggle
