import { Switch } from "react-router-dom"
import Authorize from "../../components/Authorize"
import paths from "../../constants/paths"
import { PERMISSIONS } from "../../services/enum-typed"
import CalibrationHistory from "./CalibrationHistory"
import CopyCalibration from "./CopyCalibration"
import CreateCalibration from "./CreateCalibration"
import EditCalibration from "./EditCalibration"
import ManageCalibrationList from "./ManageCalibrationList"

const ManageCalibration = () => {
  return (
    <Switch>
      <Authorize
        unAuthorize
        permissions={[PERMISSIONS.MANAGE_CALIBRATION_MANAGE_CALIBRATION_UPDATE]}
        path={paths.manageCalibrationEdit()}
        component={EditCalibration}
      />
      <Authorize
        unAuthorize
        permissions={[PERMISSIONS.MANAGE_CALIBRATION_MANAGE_CALIBRATION_CREATE]}
        path={paths.manageCalibrationCopy()}
        component={CopyCalibration}
      />
      <Authorize
        unAuthorize
        permissions={[PERMISSIONS.MANAGE_CALIBRATION_MANAGE_CALIBRATION_READ]}
        path={paths.calibrationHistory()}
        component={CalibrationHistory}
      />
      <Authorize
        unAuthorize
        permissions={[PERMISSIONS.MANAGE_CALIBRATION_MANAGE_CALIBRATION_CREATE]}
        path={paths.manageCalibrationCreate()}
        component={CreateCalibration}
      />
      <Authorize
        unAuthorize
        permissions={[PERMISSIONS.MANAGE_CALIBRATION_MANAGE_CALIBRATION_READ]}
        path={paths.manageCalibration()}
        component={ManageCalibrationList}
      />
    </Switch>
  )
}

export default ManageCalibration
