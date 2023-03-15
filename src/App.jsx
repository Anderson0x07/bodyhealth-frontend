import React, { useState } from "react";
import Myroutes from "./routers/MyRoutes";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import DashBoard from "./components/admin/DashBoard";
import { Light, Dark } from "./style/Theme";
import 'bootstrap/dist/css/bootstrap.min.css';
export const ThemeContext = React.createContext(null);

function App() {
  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? Light : Dark;


  const [open, setOpen] = useState(true);
  return (
    <>
      <ThemeContext.Provider value={{ setTheme, theme }}>
        <ThemeProvider theme={themeStyle}>
          <BrowserRouter>
            <Container
              className={open ? "sidebarState active" : "sidebarState"}>
              <DashBoard open={open} setOpen={setOpen} />
              <Myroutes />
            </Container>
          </BrowserRouter>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 90px auto;
  background: ${({ theme }) => theme.bgtotal};
  transition: all 0.5s;
  &.active {
    grid-template-columns: 300px auto;
  }

  color:${({theme})=>theme.text};
`;

export default App;
