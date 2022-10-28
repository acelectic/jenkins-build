import { useCallback, useMemo, useState } from "react"
import { useCreateKpiTemplate } from "../../../../services/set-form/set-form-query"
import { StateKpiType } from "../../../../services/enum-typed"
import KpiTemplateForm, { IKpiPeriodTemplateForm } from "./KpiTemplateForm"
import { ISubmitCreateKpiType } from "../../../../services/set-form/set-form-type"

const KpiTemplateCreate = () => {
  const { mutate: submitCreateKpiTemplate, isLoading } = useCreateKpiTemplate()
  const [isSuccess, setIsSuccess] = useState(false)

  const onSubmit = useCallback(
    (values: ISubmitCreateKpiType) => {
      submitCreateKpiTemplate(values, {
        onSuccess: () => {
          setIsSuccess(true)
        },
      })
    },
    [submitCreateKpiTemplate],
  )

  const initialValues = useMemo(() => {
    const _initialValues = ({
      kpiTemplateTimelines: [
        {
          name: "กำหนดเป้าหมาย",
          stateKpi: StateKpiType.SET_GOAL,
        },
        {
          name: "หัวหน้าอนุมัติเป้าหมาย",
          stateKpi: StateKpiType.APPROVE_GOAL,
        },
        {
          name: "พนักงานประเมินตนเอง",
          stateKpi: StateKpiType.SELF_EVALUATION,
        },
        {
          name: "หัวหน้าประเมินผลงาน",
          stateKpi: StateKpiType.MANAGER_EVALUATION,
        },
        {
          name: "ปรับเทียบผลงาน (Calibration)",
          stateKpi: StateKpiType.CALIBRATION,
        },
        {
          name: "หัวหน้ารับผลและ feedback",
          stateKpi: StateKpiType.MEETING,
        },
        {
          name: "ลูกทีมรับทราบผลงาน",
          stateKpi: StateKpiType.ACCEPT_GRADE,
        },
      ],
      defaultMgr: 1,
      isCalibrated: "true",
      reqOneYear: "true",
    } as unknown) as Partial<IKpiPeriodTemplateForm>
    return _initialValues
  }, [])

  return (
    <KpiTemplateForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      isSuccess={isSuccess}
      isSubmitLoading={isLoading}
    />
  )
}

export default KpiTemplateCreate
