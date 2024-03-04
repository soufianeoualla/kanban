import show_sidebar from "./components/assets/icon-show-sidebar.svg";
import { createContext, useState } from "react";
import "./App.css";
import Content from "./components/Content";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useSelector } from "react-redux";
import MobileMenu from "./components/MobileMenu";

export const DarkThemeContext = createContext();

function App() {
  const boardsData = useSelector((state) => state.board);
  const [hideSidebar, setHideSidebar] = useState(false);
  const [selected, setSelected] = useState(0);
  const [darkTheme, setDarkTheme] = useState(true);
  const [mobileMenu, setMobileMenu] = useState();
  return (
    <>
      <div className={`app items-start w-screen relative `}>
        {hideSidebar && (
          <button
            onClick={() => setHideSidebar(false)}
            className="show-sidebar flex justify-center items-center bg-purple absolute bottom-8 z-10 w-14 h-12 rounded-r-3xl"
          >
            <img src={show_sidebar} alt="" />
          </button>
        )}

        <DarkThemeContext.Provider value={darkTheme}>
          {!hideSidebar && (
            <Sidebar
              setHideSidebar={setHideSidebar}
              selected={selected}
              setSelected={setSelected}
              setDarkTheme={setDarkTheme}
            />
          )}
          <div className="w-full grid ">
            <Header
              hideSidebar={hideSidebar}
              selectedBoard={boardsData[selected]}
              setMobileMenu={setMobileMenu}
              mobileMenu={mobileMenu}
            />

            <Content
              selectedBoard={boardsData[selected]}
              hideSidebar={hideSidebar}
            />
          </div>
          {mobileMenu && (
            <MobileMenu
            setMobileMenu={setMobileMenu}
              selected={selected}
              setSelected={setSelected}
              setDarkTheme={setDarkTheme} 
            />
          )}
        </DarkThemeContext.Provider>
      </div>
    </>
  );
}

export default App;
