import { Switch } from "react-router-dom"
import Authorize from "../../components/Authorize"
import paths from "../../constants/paths"
import { PERMISSIONS } from "../../services/enum-typed"
import CopyTemplate from "./CopyTemplate"
import CreateTemplate from "./CreateTemplate"
import EditTemplate from "./EditTemplate"
import TemplateList from "./TemplateList"

const Template = () => {
  return (
    <Switch>
      <Authorize
        unAuthorize
        permissions={[]}
        path={paths.templateCreate()}
        component={CreateTemplate}
      />
      <Authorize
        unAuthorize
        permissions={[]}
        path={paths.templateEdit()}
        component={EditTemplate}
      />
      <Authorize
        unAuthorize
        permissions={[]}
        path={paths.templateCopy()}
        component={CopyTemplate}
      />
      <Authorize
        unAuthorize
        permissions={[PERMISSIONS.MANAGE_TEMPLATE_MANAGE_TEMPLATE_READ]}
        path={paths.template()}
        component={TemplateList}
      />
    </Switch>
  )
}

export default Template
