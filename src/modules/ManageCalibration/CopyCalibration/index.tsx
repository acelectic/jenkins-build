import { useMemo } from "react"
import { useCalibrateSessionCopyAndEdit } from "../../../services/manage-calibration/manage-calibration-query"
import { ICreateCalibrateFormValues } from "../CreateCalibration"
import { useRouter } from "../../../utils/helper"
import LoadingLayout from "../../../components/common/LoadingLayout"
import CalibrationField from "../CreateCalibration/CalibrationField"
import { getCalibrateInitialFormValues } from "../helper"

const CopyCalibration = () => {
  const { query } = useRouter<{ calibrationId: string }>()
  const { calibrationId } = query

  const { data: calibrateResponse, isLoading } = useCalibrateSessionCopyAndEdit(calibrationId)

  const initialFormValues = useMemo((): ICreateCalibrateFormValues => {
    return getCalibrateInitialFormValues(calibrateResponse)
  }, [calibrateResponse])

  return (
    <LoadingLayout isLoading={isLoading}>
      <CalibrationField initialFormValues={initialFormValues} />
    </LoadingLayout>
  )
}

export default CopyCalibration
