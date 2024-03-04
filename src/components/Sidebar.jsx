import logo_dark from "./assets/logo-dark.svg";
import logo_light from "./assets/logo-light.svg";
import icon_hide from "./assets/icon-hide-sidebar.svg";
import { useContext } from "react";
import { DarkThemeContext } from "../App";
import SelectBorad from "./SelectBorad";
import ThemeToggle from "./ThemeToggle";
const Sidebar = ({
  setHideSidebar,
  selected,
  setSelected,
  setDarkTheme,
}) => {
  const darkTheme = useContext(DarkThemeContext);
  return (
    <div
      className={`  relative h-screen border-r  ${
        darkTheme
          ? " bg-Dark-Charcoal-Gray border-Charcoal-Blue "
          : "bg-white border-Powder-Blue"
      } sm:hidden  `}
    >
      <div className="flex justify-start items-center gap-4 text-black mb-4 h-24 pl-8">
        <img src={darkTheme ? logo_light : logo_dark} alt="" />
      </div>
      <SelectBorad
        selected={selected}
        setSelected={setSelected}
      />

      <ThemeToggle
        setDarkTheme={setDarkTheme}
      />
       <button
      onClick={() => setHideSidebar(true)}
      className="h-12 text-lg w-[85%] text-Slate-Blue flex items-center gap-4 pl-8 mt-2 hover:bg-purple hover:bg-opacity-10 hover:text-purple hover:rounded-r-3xl"
    >
      <img src={icon_hide} alt="" />
      <span>Hide Sidebar</span>
    </button>
     
    </div>
  );
};

export default Sidebar;
