import { Route, Switch } from "react-router-dom"
import paths from "../../constants/paths"
import Me from "./Me"

const Profile = () => {
  return (
    <Switch>
      <Route path={paths.profile()} component={Me} />
    </Switch>
  )
}

export default Profile
