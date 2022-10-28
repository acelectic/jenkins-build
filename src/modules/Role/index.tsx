import { Switch } from "react-router-dom"
import RoleView from "../Role/RoleView"
import RoleNew from "../Role/RoleNew"
import RoleEdit from "../Role/RoleEdit"
import Authorize from "../../components/Authorize"
import { PERMISSIONS } from "../../services/enum-typed"
import RoleDetail from "./RoleDetail"

const Role = () => {
  return (
    <Switch>
      <Authorize
        unAuthorize
        permissions={[PERMISSIONS.MANAGE_ROLE_MANAGE_ROLE_CREATE]}
        path="/roles/new"
        component={RoleNew}
      />
      <Authorize
        unAuthorize
        permissions={[PERMISSIONS.MANAGE_ROLE_MANAGE_ROLE_UPDATE]}
        path="/roles/:id/edit"
        component={RoleEdit}
      />
      <Authorize
        unAuthorize
        permissions={[PERMISSIONS.MANAGE_ROLE_MANAGE_ROLE_READ]}
        path="/roles/:roleId"
        component={RoleDetail}
      />
      <Authorize
        unAuthorize
        permissions={[PERMISSIONS.MANAGE_ROLE_MANAGE_ROLE_READ]}
        path="/roles"
        component={RoleView}
      />
    </Switch>
  )
}

export default Role
