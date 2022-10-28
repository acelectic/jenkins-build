import { Switch } from "react-router-dom"
import Authorize from "../../components/Authorize"
import paths from "../../constants/paths"
import { PERMISSIONS } from "../../services/enum-typed"
import TrackAssessmentDetail from "./TrackAssessmentDetail"
import TrackAssessmentPage from "./TrackAssessmentPage"

const TrackAssessment = () => {
  //Switch เอาไว้จัดการว่าตอนนี้ path อะไร แล้วจะเรียก component นั้นออกมาแสดง
  return (
    <Switch>
      <Authorize
        unAuthorize
        permissions={[
          PERMISSIONS.TRACK_ASSESSMENT_KPI_READ,
          PERMISSIONS.TRACK_ASSESSMENT_ONE_YEAR_READ,
          PERMISSIONS.TRACK_ASSESSMENT_PROBATION_READ,
        ]}
        path={paths.trackAssessmentDetail()}
        component={TrackAssessmentDetail}
      />
      <Authorize
        unAuthorize
        permissions={[
          PERMISSIONS.TRACK_ASSESSMENT_KPI_READ,
          PERMISSIONS.TRACK_ASSESSMENT_ONE_YEAR_READ,
          PERMISSIONS.TRACK_ASSESSMENT_PROBATION_READ,
        ]}
        path={paths.trackAssessment()}
        component={TrackAssessmentPage}
      />
    </Switch>
  )
}

export default TrackAssessment
