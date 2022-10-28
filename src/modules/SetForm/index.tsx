import { Switch } from "react-router-dom"
import Authorize from "../../components/Authorize"
import paths from "../../constants/paths"
import { PERMISSIONS } from "../../services/enum-typed"
import KpiTemplateCopy from "./CopyForm/KpiTemplateCopy"
import OneYearTemplateCopy from "./CopyForm/OneYearTemplateCopy"
import ProbationTemplateCopy from "./CopyForm/ProbationTemplateCopy"
import KpiTemplateCreate from "./CreateForm/KpiPeriodTemplate"
import OneYearTemplateCreate from "./CreateForm/OneYearTemplate"
import ProbationTemplateCreate from "./CreateForm/ProbationTemplate"
import OneYearTemplateEdit from "./EditForm/OneYearTemplateEdit"
import ProbationTemplateEdit from "./EditForm/ProbationTemplateEdit"

import SetFormList from "./SetFormList"

const setForm = () => {
  return (
    <Switch>
      <Authorize
        unAuthorize
        permissions={[PERMISSIONS.MANAGE_FORMS_KPI_CREATE]}
        path={paths.kpiFormCreate()}
        component={KpiTemplateCreate}
      />
      <Authorize
        unAuthorize
        permissions={[PERMISSIONS.MANAGE_FORMS_ONE_YEAR_CREATE]}
        path={paths.oneYearFormCreate()}
        component={OneYearTemplateCreate}
      />
      <Authorize
        unAuthorize
        permissions={[PERMISSIONS.MANAGE_FORMS_PROBATION_CREATE]}
        path={paths.probationFormCreate()}
        component={ProbationTemplateCreate}
      />

      <Authorize
        unAuthorize
        permissions={[PERMISSIONS.MANAGE_FORMS_KPI_CREATE]}
        path={paths.kpiFormCopy()}
        component={KpiTemplateCopy}
      />
      <Authorize
        unAuthorize
        permissions={[PERMISSIONS.MANAGE_FORMS_ONE_YEAR_CREATE]}
        path={paths.oneYearFormCopy()}
        component={OneYearTemplateCopy}
      />
      <Authorize
        unAuthorize
        permissions={[PERMISSIONS.MANAGE_FORMS_PROBATION_CREATE]}
        path={paths.probationFormCopy()}
        component={ProbationTemplateCopy}
      />

      <Authorize
        unAuthorize
        permissions={[PERMISSIONS.MANAGE_FORMS_ONE_YEAR_UPDATE]}
        path={paths.oneYearFormEdit()}
        component={OneYearTemplateEdit}
      />
      <Authorize
        unAuthorize
        permissions={[PERMISSIONS.MANAGE_FORMS_PROBATION_UPDATE]}
        path={paths.probationFormEdit()}
        component={ProbationTemplateEdit}
      />

      <Authorize
        unAuthorize
        permissions={[
          PERMISSIONS.MANAGE_FORMS_ONE_YEAR_READ,
          PERMISSIONS.MANAGE_FORMS_KPI_READ,
          PERMISSIONS.MANAGE_FORMS_PROBATION_READ,
        ]}
        path={paths.setForm()}
        component={SetFormList}
      />
    </Switch>
  )
}

export default setForm
