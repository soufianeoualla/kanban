import { useContext } from "react";
import SelectBorad from "./SelectBorad";
import ThemeToggle from "./ThemeToggle";
import { DarkThemeContext } from "../App";

const MobileMenu = ({selected, setSelected, setDarkTheme,setMobileMenu}) => {
  const darkTheme = useContext(DarkThemeContext);

  return (
    <>
      <div
      onClick={()=>setMobileMenu(false)}
       className="fixed bg-black bg-opacity-30 inset-0 w-full h-full z-10"></div>
      <div
        className={`fixed  top-0 left-1/2 translate-x-[-50%] translate-y-[40%] w-[80%] h-auto rounded-lg z-20 py-6 ${
          darkTheme ? " bg-Dark-Charcoal-Gray" : "bg-white"
        }`}
      >
        <SelectBorad selected={selected} setSelected={setSelected} />
        <ThemeToggle setDarkTheme={setDarkTheme} />{" "}
      </div>
    </>
  );
};

export default MobileMenu;
