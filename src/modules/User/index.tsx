import { Switch } from "react-router-dom"
import UserList from "./UserList"
import Authorize from "../../components/Authorize"
import { PERMISSIONS } from "../../services/enum-typed"
import paths from "../../constants/paths"
import UserDetail from "./UserDetail"

const User = () => {
  return (
    <Switch>
      <Authorize
        unAuthorize
        permissions={[PERMISSIONS.MANAGE_USER_MANAGE_USER_READ]}
        path={paths.userDetail()}
        component={UserDetail}
      />

      <Authorize
        unAuthorize
        permissions={[PERMISSIONS.MANAGE_USER_MANAGE_USER_READ]}
        path={paths.user()}
        component={UserList}
      />
    </Switch>
  )
}

export default User
