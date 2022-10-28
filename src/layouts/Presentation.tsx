import React from "react"
import styled, { createGlobalStyle } from "styled-components/macro"
import { GlobalStyleProps } from "../types/styles"
import { RouteType } from "../types/routes"

import { CssBaseline } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"

import { THEMES } from "../constants"
import createTheme from "../theme"

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  html,
  body,
  #root {
    height: 100%; 
    overflow-x: hidden;
  }

  body {
    background: ${(props) => props.theme.palette.background.default};
  }
`

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

type PresentationPropsType = {
  routes: Array<RouteType>
}

const Presentation: React.FC<PresentationPropsType> = ({ children }) => {
  return (
    <ThemeProvider theme={createTheme(THEMES.DEFAULT)}>
      <ThemeProvider theme={createTheme(THEMES.DEFAULT)}>
        <Root>
          <CssBaseline />
          <GlobalStyle />
          <AppContent>{children}</AppContent>
        </Root>
      </ThemeProvider>
    </ThemeProvider>
  )
}

export default Presentation
