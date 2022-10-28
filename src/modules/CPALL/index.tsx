import { Route, Switch } from "react-router-dom"
import paths from "../../constants/paths"
import OauthCallback from "./OauthCallback"

const CPALL = () => {
  return (
    <Switch>
      <Route path={paths.cpallOAuthCallback()} component={OauthCallback} />
    </Switch>
  )
}

export default CPALL
