import React, { useMemo } from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteComponentProps,
  Redirect,
} from "react-router-dom"
import {
  dashboardLayoutRoutes,
  authLayoutRoutes,
} from "./index"

import DashboardLayout from "../layouts/Dashboard"
import AuthLayout from "../layouts/Auth"
import Page404 from "../theme-pages/auth/Page404"
import { RouteType } from "../types/routes"
import { useCurrentUser } from "../services/auth/auth-query"
import paths from "../constants/paths"
import CPALL from "../modules/CPALL"
import { config } from "../configs"
import Authorize from "../components/Authorize"

const childRoutes = (Layout: React.ElementType, routes: Array<RouteType>) =>
  routes.map(({ component: Component, guard, children, path, permissions = [] }, index: number) => {
    const Guard = guard || React.Fragment

    return children ? (
      children.map((element, childIndex: number) => {
        const ChildGuard = element.guard || React.Fragment

        return (
          <Authorize
            key={element.path}
            path={element.path}
            exact
            permissions={element.permissions || permissions || []}
            render={(props: RouteComponentProps) => (
              <ChildGuard>
                <Layout>
                  <element.component {...props} />
                </Layout>
              </ChildGuard>
            )}
          />
        )
      })
    ) : Component ? (
      <Authorize
        key={path}
        path={path}
        permissions={permissions}
        render={(props) => (
          <Guard>
            <Layout>
              <Component {...props} />
            </Layout>
          </Guard>
        )}
        unAuthorize
      />
    ) : null
  })

const Routes = () => {
  const { data: userData } = useCurrentUser({
    retry: 0,
    suspense: true,
    useErrorBoundary: false,
  })

  const isAuthenticated = useMemo(() => {
    return !!userData?.user
  }, [userData])

  return (
    <Router>
      <Switch>
        {!isAuthenticated ? (
          <Redirect exact from={paths.root()} to={paths.signIn()} />
        ) : (
          <Redirect exact from={paths.signIn()} to={paths.dashboard()} />
        )}
        {childRoutes(AuthLayout, authLayoutRoutes)}
        <Route
          path={paths.cpallOAuthCallback()}
          render={() => (
            <AuthLayout>
              <CPALL />
            </AuthLayout>
          )}
        />
        {!isAuthenticated && !config.IS_LOCAL ? (
          <Redirect to={paths.signIn()} />
        ) : (
          <Switch>
            {childRoutes(DashboardLayout, dashboardLayoutRoutes)}
            <Redirect exact from="/" to={paths.dashboard()} />
          </Switch>
        )}
        <Route
          path={paths.notFound()}
          render={() => (
            <AuthLayout>
              <Page404 />
            </AuthLayout>
          )}
        />
        <Redirect exact from={paths.root()} to={paths.dashboard()} />
        <Redirect to={paths.notFound()} />
      </Switch>
    </Router>
  )
}

export default Routes
