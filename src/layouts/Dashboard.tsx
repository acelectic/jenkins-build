import React, { useState } from "react"
import styled, { createGlobalStyle } from "styled-components/macro"
import { GlobalStyleProps } from "../types/styles"
import { RouteType } from "../types/routes"
import Sidebar from "../components/Sidebar"
import Header from "../components/AppBar"

import { spacing } from "@mui/system"
import { Hidden, CssBaseline, Paper as MuiPaper } from "@mui/material"
import { PRIMARY_DARK } from "../constants/colors"

export const drawerWidth = 285

export const hidingSize = "sm"

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    background: ${(props) => props.theme.palette.background.default};
  }

  .MuiCardHeader-action .MuiIconButton-root {
    padding: 4px;
    width: 28px;
    height: 28px;
  }
`

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`

const Drawer = styled.div`
  ${(props) => props.theme.breakpoints.up(hidingSize)} {
    width: ${drawerWidth}px;
    flex-shrink: 0;
  }
`

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Paper = styled(MuiPaper)(spacing)

const MainContent = styled(Paper)`
  flex: 1;
  background: ${(props) => props.theme.palette.background.default};
  padding: 20px;
  background-color: ${PRIMARY_DARK} !important;

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`

type DashboardPropsType = {
  routes: Array<RouteType>
  width: "md" | "xs" | "sm" | "lg" | "xl"
}

const Dashboard: React.FC<DashboardPropsType> = ({ children, routes, width }) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <Root>
      <CssBaseline />
      <GlobalStyle />
      <Drawer>
        <Hidden mdUp implementation="js">
          <Sidebar
            routes={routes}
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          />
        </Hidden>
        <Hidden smDown implementation="css">
          <Sidebar routes={routes} PaperProps={{ style: { width: drawerWidth } }} />
        </Hidden>
      </Drawer>
      <AppContent>
        <Header onDrawerToggle={handleDrawerToggle} />
        <MainContent /* p={isWidthUp("lg", width) ? 12 : 5} */ p={12}>{children}</MainContent>
        {/* <Footer /> */}
      </AppContent>
      {/* <Settings /> */}
    </Root>
  )
}

export default Dashboard
