import React, { useLayoutEffect, useCallback, Suspense } from "react"
import { Helmet } from "react-helmet"
import { ThemeProvider } from "styled-components/macro"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import { StylesProvider, ThemeProvider as MuiThemeProvider } from "@mui/styles"
import { QueryClient, QueryClientProvider } from "react-query"
import { useTranslation, I18nextProvider } from "react-i18next"
import { createBrowserHistory } from "history"
import { Router } from "react-router-dom"

import createTheme from "./theme"
import Routes from "./routes/Routes"
import i18n from "./utils/i18n"
import { useSelector } from "react-redux"
import { AppStateType } from "./redux/reducers"
import { AppSnackbar } from "./components/AppSnackBar"
import { isMode, withCtx } from "./utils/helper"
import { AppCtx } from "./constants/contexts"
import { ReactQueryDevtools } from "react-query/devtools"
import { MoonLoader } from "react-spinners"
import { PRIMARY, WHITE } from "./constants/colors"
import DebugSignIn from "./components/debug-sign-in"
import "./initialize"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import { useSnackbar } from "./utils/custom-hook"
import { AnyObject } from "final-form"

const queryClient = new QueryClient()
const history = createBrowserHistory()

export const FallBackComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        backgroundColor: WHITE,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MoonLoader color={PRIMARY} loading={true} size={60} />
    </div>
  )
}

type IApiError = { message: AnyObject; meta: { param?: AnyObject } }

export const useOnError = () => {
  const { snackbar } = useSnackbar()
  const { t } = useTranslation("backend")
  return useCallback((e: unknown) => {
    const error = e as IApiError
    const { message = "Not Identify", meta = {} } = error || {}
    const { param = {} } = meta
    snackbar({
      type: "error",
      message: t(message, { ...param, defaultValue: message }),
    })
    console.debug({
      type: "error",
      message: t(message, { ...param, defaultValue: message }),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

function App() {
  const theme = useSelector((state: AppStateType) => state.themeReducer)
  const onError = useOnError()

  useLayoutEffect(() => {
    // set react query default options here
    queryClient.setDefaultOptions({
      queries: {
        onError,
        retry: 0,
        refetchOnWindowFocus: false,
        cacheTime: 1000 * 60 * 5, // 5 minute
      },
      mutations: {
        onError,
        retry: 0,
      },
    })
  }, [onError])

  return (
    <>
      <Helmet defaultTitle="Backoffice - All Perform Plus" />
      <StylesProvider /* jss={jss} */>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MuiThemeProvider theme={createTheme(theme.currentTheme)}>
            <ThemeProvider theme={createTheme(theme.currentTheme)}>
              <I18nextProvider i18n={i18n}>
                <Router history={history}>
                  <QueryClientProvider client={queryClient}>
                    <AppSnackbar />
                    <Suspense fallback={<FallBackComponent />}>
                      <Routes />
                    </Suspense>
                    {isMode("development") && <ReactQueryDevtools initialIsOpen={false} />}
                    <DebugSignIn />
                  </QueryClientProvider>
                </Router>
              </I18nextProvider>
            </ThemeProvider>
          </MuiThemeProvider>
        </LocalizationProvider>
      </StylesProvider>
    </>
  )
}

export default withCtx(AppCtx)(App)
