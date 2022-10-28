import qs from "querystring"

type ParamType = { [p: string]: any } | undefined
type Option<T extends ParamType, V extends ParamType> = {
  routeParam?: T
  queryParam?: V
}

const generate = <
  RouteParams extends ParamType = undefined,
  QueryParams extends ParamType = undefined
>(
  url: string,
) => (option?: Option<RouteParams, QueryParams>) => {
  const { routeParam, queryParam } = option || {}
  let newQueryParam = ""
  if (queryParam) {
    newQueryParam = `?${qs.stringify(queryParam)}`
  }

  let newUrl = url
  if (routeParam) {
    const urls = url.split("/")
    newUrl = urls
      .map((u) => {
        if (/:.+/.test(u)) {
          return routeParam[u.slice(1)]
        }
        return u
      })
      .join("/")
  }

  return `${newUrl}${newQueryParam}`
}

const root = generate("/")
const notFound = generate("/404")
const userNotFound = generate("/user_not_found")
const error = generate("/500")
const home = generate("/home")
const profile = generate("/profile")
const auth = generate("/auth")
const signIn = generate(`${auth()}/sign-in`)
const wiki = generate("/wiki")
const user = generate("/users")
const role = generate("/roles")
const userDetail = generate<{ userId: string }>(`${user()}/:userId`)
const cpallOAuth = generate(`/cpall-oauth`)
const cpallOAuthCallback = generate(`${cpallOAuth()}/callback`)
const kpiTemplate = generate("/kpi-templates")
const kpiTemplateCreateForm = generate(`${kpiTemplate()}/create`)
const kpiPeriodTemplatePosition = generate("/kpi-period-template-position")
const kpiPeriodTemplatePositionCreateForm = generate(`${kpiPeriodTemplatePosition()}/create`)
const template = generate("/templates")
const templateCreate = generate(`${template()}/create`)
const templateEdit = generate<{ id: string; templateType: string }>(
  `${template()}/:templateType/:id/edit`,
)
const templateCopy = generate<{ id: string; templateType: string }>(
  `${template()}/:templateType/:id/copy`,
)
const probation = generate(`/probation`)
const assessmentTemplate = generate(`/assessmentTemplate`)
const kpiPeriodTemplate = generate(`/kpi-period-template`)
const kpiLibrary = generate(`/kpi-library`)
const createForm = generate(`/create-template`)

const setForm = generate(`/set-forms`)
const manageGrade = generate(`/manage-grade`)
const manageCalibration = generate(`/manage-calibration`)
const manageCalibrationCreate = generate(`${manageCalibration()}/create`)
const manageCalibrationEdit = generate<{ calibrationId: string }>(
  `${manageCalibration()}/:calibrationId/edit`,
)
const manageCalibrationCopy = generate<{ calibrationId: string }>(
  `${manageCalibration()}/:calibrationId/copy`,
)
const manageKpi = generate(`/manage-kpi`)
const manageKpiCreate = generate(`${manageKpi()}/create`)
const manageKpiHistory = generate(`${manageKpi()}/history`)
const manageKpiCopyKpi = generate<{ kpiTransactionDetailId: string }>(
  `${manageKpi()}/:kpiTransactionDetailId/copy-kpi`,
)
const manageKpiEditKpi = generate<{ kpiTransactionDetailId: string }>(
  `${manageKpi()}/:kpiTransactionDetailId/edit-kpi`,
)
const manageKpiCopyKpiLibrary = generate<{ kpiLibraryId: string }>(
  `${manageKpi()}/:kpiLibraryId/copy-kpi-library`,
)
const trackAssessment = generate(`/track-assessment`)
const trackAssessmentDetail = generate<{
  userId: string
}>(`${trackAssessment()}/detail/:userId`)

const dashboard = generate(`/dashboard`)
const report = generate(`/report`)

const kpiFormCopy = generate<{
  assessmentTemplateId: string
}>(`${setForm()}/kpi/:assessmentTemplateId/copy`)
const oneYearFormCopy = generate<{
  assessmentTemplateId: string
}>(`${setForm()}/one-year/:assessmentTemplateId/copy`)
const probationFormCopy = generate<{
  assessmentTemplateId: string
}>(`${setForm()}/probation/:assessmentTemplateId/copy`)

const oneYearFormEdit = generate<{
  assessmentTemplateId: string
}>(`${setForm()}/one-year/:assessmentTemplateId`)
const probationFormEdit = generate<{
  assessmentTemplateId: string
}>(`${setForm()}/probation/:assessmentTemplateId`)

const kpiFormCreate = generate(`${setForm()}/kpi/create`)
const oneYearFormCreate = generate(`${setForm()}/one-year/create`)
const probationFormCreate = generate(`${setForm()}/probation/create`)
const calibrationHistory = generate(`${manageCalibration()}/calibration-history`)

const paths = {
  root,
  notFound,
  error,
  home,
  profile,
  auth,
  signIn,
  wiki,
  user,
  role,
  userDetail,
  cpallOAuth,
  cpallOAuthCallback,
  kpiTemplate,
  kpiPeriodTemplatePosition,
  kpiTemplateCreateForm,
  kpiPeriodTemplatePositionCreateForm,
  template,
  templateCreate,
  probation,
  assessmentTemplate,
  kpiLibrary,
  kpiPeriodTemplate,
  createForm,
  templateEdit,
  setForm,
  kpiFormCreate,
  oneYearFormCreate,
  probationFormCreate,
  oneYearFormEdit,
  probationFormEdit,
  templateCopy,
  oneYearFormCopy,
  probationFormCopy,
  kpiFormCopy,
  manageGrade,
  manageCalibration,
  manageCalibrationCreate,
  manageKpi,
  calibrationHistory,
  manageKpiCreate,
  manageKpiHistory,
  manageKpiCopyKpiLibrary,
  manageKpiCopyKpi,
  manageKpiEditKpi,
  trackAssessment,
  manageCalibrationCopy,
  manageCalibrationEdit,
  dashboard,
  report,
  trackAssessmentDetail,
  userNotFound,
}

export default paths
