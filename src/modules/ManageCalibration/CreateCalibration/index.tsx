import { useMemo } from "react"
import {
  ISelectEmployeeFormSubmitValues,
  ISelectHierarchyGroupFormValues,
} from "../../../components/SelectHierarchyGroup/interface"
import { ICalibrateSessionFilterUser } from "../../../services/manage-calibration/manage-calibration-type"
import CalibrationField from "./CalibrationField"

export type IUserCalibrate = {
  name: string
  id: string
}

export type ICalibrationSelectUserType = ICalibrateSessionFilterUser &
  ISelectHierarchyGroupFormValues &
  ISelectEmployeeFormSubmitValues & {
    userCalibrate: IUserCalibrate[]
  }

export type ISelectUserCalibration = {
  nameCalibration: string
  detailCalibration: string
  formType?: string
  quarter?: string
  year?: string
  startDate?: string
  endDate?: string
  dateCalibration?: string
  owner: ICalibrationSelectUserType
  committees: ICalibrationSelectUserType
  hr: ICalibrationSelectUserType
  subjects: ICalibrationSelectUserType
  id?: string
  calibrationState?: string
}

export type ICreateCalibrateFormValues = {
  finalCalibrateSession: ISelectUserCalibration[]
  subCalibrateSessions: ISelectUserCalibration[]
  idemKey?: string
}

const CreateCalibration = () => {
  const initialForm = useMemo((): ICreateCalibrateFormValues => {
    return {
      finalCalibrateSession: [
        {
          nameCalibration: "",
          detailCalibration: "",
          owner: { userCalibrate: [], companies: [] },
          committees: { userCalibrate: [], companies: [] },
          hr: { userCalibrate: [], companies: [] },
          subjects: { userCalibrate: [], companies: [] },
        },
      ],
      subCalibrateSessions: [],
    }
  }, [])

  return <CalibrationField initialFormValues={initialForm} />
}

export default CreateCalibration
