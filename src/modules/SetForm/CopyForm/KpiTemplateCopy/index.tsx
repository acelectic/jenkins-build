import { useCallback, useMemo, useState } from "react"
import {
  useCreateKpiTemplate,
  useGetKpiForEdit,
} from "../../../../services/set-form/set-form-query"
import { ISubmitCreateKpiType } from "../../../../services/set-form/set-form-type"
import { StateKpiType } from "../../../../services/enum-typed"
import { useRouter } from "../../../../utils/helper"
import KpiTemplateForm, {
  IKpiPeriodTemplateForm,
} from "../../CreateForm/KpiPeriodTemplate/KpiTemplateForm"
import dayjs from "dayjs"
import { EnumSelectedEmployeeType } from "../../../../components/fields/ChooseSelectGroupComponent"

const KpiTemplateCopy = () => {
  const { query } = useRouter<{ assessmentTemplateId: string }>()
  const { mutate: submitCopyKpiTemplate, isLoading: isSubmitLoading } = useCreateKpiTemplate()

  const { data, isLoading } = useGetKpiForEdit(query.assessmentTemplateId)
  const [isSuccess, setIsSuccess] = useState(false)

  const onSubmit = useCallback(
    (values: ISubmitCreateKpiType) => {
      submitCopyKpiTemplate(values, {
        onSuccess: () => {
          setIsSuccess(true)
        },
      })
    },
    [submitCopyKpiTemplate],
  )

  const initialValues: IKpiPeriodTemplateForm = useMemo(() => {
    return {
      name: data?.name!,
      formType: data?.formType!,
      quarter: data?.quarter!,
      year: data?.year!,
      startDate: data?.startDate!,
      endDate: data?.endDate!,
      isCalibrated: data?.isCalibrated ? "true" : "false",
      defaultMgr: data?.defaultMgr!,
      levelApprove: data?.levelApprove!,
      kpiTemplateTimelines: [
        {
          name: "กำหนดเป้าหมาย",
          stateKpi: StateKpiType.SET_GOAL,
          startDate: dayjs(data?.kpiTemplateTimelines[0].startDate),
          endDate: dayjs(data?.kpiTemplateTimelines[0].endDate),
        },
        {
          name: "หัวหน้าอนุมัติเป้าหมาย",
          stateKpi: StateKpiType.APPROVE_GOAL,
          startDate: dayjs(data?.kpiTemplateTimelines[1].startDate),
          endDate: dayjs(data?.kpiTemplateTimelines[1].endDate),
        },
        {
          name: "พนักงานประเมินตนเอง",
          stateKpi: StateKpiType.SELF_EVALUATION,
          startDate: dayjs(data?.kpiTemplateTimelines[2].startDate),
          endDate: dayjs(data?.kpiTemplateTimelines[2].endDate),
        },
        {
          name: "หัวหน้าประเมินผลงาน",
          stateKpi: StateKpiType.MANAGER_EVALUATION,
          startDate: dayjs(data?.kpiTemplateTimelines[3].startDate),
          endDate: dayjs(data?.kpiTemplateTimelines[3].endDate),
        },
        {
          name: "ปรับเทียบผลงาน (Calibration)",
          stateKpi: StateKpiType.CALIBRATION,
          startDate: dayjs(data?.kpiTemplateTimelines[4].startDate),
          endDate: dayjs(data?.kpiTemplateTimelines[4].endDate),
        },
        {
          name: "หัวหน้ารับผลและ feedback",
          stateKpi: StateKpiType.MEETING,
          startDate: dayjs(data?.kpiTemplateTimelines[5].startDate),
          endDate: dayjs(data?.kpiTemplateTimelines[5].endDate),
        },
        {
          name: "ลูกทีมรับทราบผลงาน",
          stateKpi: StateKpiType.ACCEPT_GRADE,
          startDate: dayjs(data?.kpiTemplateTimelines[6].startDate),
          endDate: dayjs(data?.kpiTemplateTimelines[6].endDate),
        },
      ],
      reqOneYear: data?.reqOneYear ? "true" : "false",

      descriptionForUser: data?.descriptionForUser!,
      descriptionForMgr: data?.descriptionForMgr!,
      jsonCalKpi: {
        cal: data?.calKpi?.cal,
        scaleId: data?.calKpi?.scaleId,
      },
      jsonCalKpiCompany: {
        cal: data?.calKpiCompany?.cal,
        scaleId: data?.calKpiCompany?.scaleId,
      },
      jsonCalKpiOther: {
        cal: data?.calKpiOther?.cal,
        scaleId: data?.calKpiOther?.scaleId,
      },
      jsonCalBehavior: {
        cal: data?.calBehavior?.cal,
        behaviorTemplateId: data?.calBehavior?.behaviorTemplateId,
      },
      scaleForGrade: {
        name: data?.scaleForGrade.name!,
        jsonScaleDetails: data?.scaleForGrade.jsonScaleDetails!,
      },

      companies: data?.companies,
      employeeClassificationIds: data?.employeeClassificationIds || undefined,
      employeeTypes: data?.employeeTypes || undefined,
      jobCodeIds: data?.jobCodeIds || undefined,
      jobLevelIds: data?.jobLevelIds || undefined,
      positionLevelIds: data?.positionLevelIds || undefined,
      salaryAdminPlanIds: data?.salaryAdminPlanIds || undefined,
      selectEmployeeType: data?.isOrganize
        ? EnumSelectedEmployeeType.HIERARCHY
        : EnumSelectedEmployeeType.EMPLOYEE,
    }
  }, [data])

  return (
    <>
      {!isLoading && (
        <KpiTemplateForm
          onSubmit={onSubmit}
          initialValues={initialValues}
          isSuccess={isSuccess}
          isSubmitLoading={isSubmitLoading}
        />
      )}
    </>
  )
}

export default KpiTemplateCopy
