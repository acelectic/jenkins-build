import styled from "@emotion/styled"
import { useCallback, useState } from "react"
import { Form } from "react-final-form"
import CheckAndConfirmState from "../../../../components/CheckAndConfirmState"
import State from "../../../../components/common/State"
import {
  EmployeeType,
  StateComponentType,
  StateKpiType,
  TemplateCreateState,
  TemplateType,
} from "../../../../services/enum-typed"
import ContentFormField from "./ContentFormField"
import SelectEmployeeField from "./SelectEmployeeField"
import SettingFormField from "./SettingFormField"
import arrayMutators from "final-form-arrays"
import { useGetOptionKpiTemplate } from "../../../../services/set-form/set-form-query"
import {
  ICompany,
  JsonCalBehavior,
  JsonCalKpi,
  JsonScaleForGrade,
  IRemoveKpiPeriodTemplateUserType,
  ISubmitCreateKpiType,
  TemplateTypeDelete,
} from "../../../../services/set-form/set-form-type"
import { set } from "lodash"
import { Box } from "@mui/material"
import Sarabun from "../../../../components/common/Sarabun"
import { useTranslation } from "react-i18next"
import { PRIMARY_DARK, WHITE } from "../../../../constants/colors"
// import LoadingLayout from "../../../../components/common/LoadingLayout"
import { parseFormValue } from "../../shared"
import dayjs from "dayjs"
import { useHistory } from "react-router-dom"
import GoBackHeader from "../../../../components/common/GoBackHeader"
import paths from "../../../../constants/paths"
import InitialSelectHierarchyGroupOptions from "../../../../components/SelectHierarchyGroup/InitialSelectHierarchyGroupOptions"
import { EnumSelectedEmployeeType } from "../../../../components/fields/ChooseSelectGroupComponent"
import { ISelectHierarchyGroupFormValues } from "../../../../components/SelectHierarchyGroup/interface"

const StateCard = styled.div`
  margin-top: 24px;
`

export type ITimelinesKpiTemplate = {
  name: string
  stateKpi: StateKpiType
  startDate?: string | dayjs.Dayjs
  endDate?: string | dayjs.Dayjs
}

export type IKpiPeriodTemplateForm = {
  removeKpiPeriodTemplateUser?: IRemoveKpiPeriodTemplateUserType
  name: string
  formType: string
  quarter: string
  year: string
  startDate?: string
  endDate?: string
  defaultMgr: number
  levelApprove?: number
  quotaGrade?: number
  kpiTemplateTimelines: ITimelinesKpiTemplate[]
  reqOneYear?: string | boolean
  isCalibrated?: string

  descriptionForUser: string
  descriptionForMgr: string
  jsonCalKpi: JsonCalKpi
  jsonCalKpiCompany: JsonCalKpi
  jsonCalKpiOther: JsonCalKpi
  jsonCalBehavior: JsonCalBehavior
  scaleForGrade: JsonScaleForGrade

  companies?: ICompany[]
  employeeClassificationIds?: string[]
  employeeTypes?: EmployeeType[] | string[]
  jobCodeIds?: string[]
  jobLevelIds?: string[]
  positionLevelIds?: string[]
  salaryAdminPlanIds?: string[]

  groupSelected?: ISelectHierarchyGroupFormValues

  selectEmployeeType?: EnumSelectedEmployeeType
}

export type IKpiTemplateFormProps = {
  onSubmit: (values: ISubmitCreateKpiType) => void
  initialValues?: Partial<IKpiPeriodTemplateForm>
  isSuccess?: boolean
  isSubmitLoading?: boolean
}

const KpiPeriodTemplateFrom = (props: IKpiTemplateFormProps) => {
  const { onSubmit, initialValues, isSuccess, isSubmitLoading } = props
  const { t } = useTranslation()
  const [currentState, setCurrentState] = useState(TemplateCreateState.SETTING_TEMPLATE)

  const { data: getOptionKpiTemplate } = useGetOptionKpiTemplate(TemplateTypeDelete.KPI)

  const handleSubmit = useCallback(
    (values: IKpiPeriodTemplateForm) => {
      onSubmit(parseFormValue(values))
    },
    [onSubmit],
  )

  const validate = useCallback(
    (values: IKpiPeriodTemplateForm) => {
      const errors: IFormValueErrors<IKpiPeriodTemplateForm> = {}

      if (currentState === TemplateCreateState.SETTING_TEMPLATE) {
        if (values.year && values.year.length !== 4) {
          set(errors, "year", "กรุณาใส่เลขปีให้ถูกต้อง")
        }
      }

      if (currentState === TemplateCreateState.SET_TARGET) {
        if (!values.jsonCalKpi?.scaleId) {
          set(errors, "jsonCalKpi.scaleId", "Required")
        }
        if (!values.jsonCalKpi?.cal) {
          if (values.jsonCalKpi?.cal !== 0) set(errors, "jsonCalKpi.cal", "Required")
        }
        if (!values.jsonCalKpiCompany?.scaleId) {
          set(errors, "jsonCalKpiCompany.scaleId", "Required")
        }
        if (!values.jsonCalKpiCompany?.cal) {
          if (values.jsonCalKpiCompany?.cal !== 0) set(errors, "jsonCalKpiCompany.cal", "Required")
        }
        if (!values.jsonCalKpiOther?.scaleId) {
          set(errors, "jsonCalKpiOther.scaleId", "Required")
        }
        if (!values.jsonCalKpiOther?.cal) {
          if (values.jsonCalKpiOther?.cal !== 0) set(errors, "jsonCalKpiOther.cal", "Required")
        }
        if (!values.jsonCalBehavior?.cal) {
          set(errors, "jsonCalBehavior.cal", "Required")
        }
        if (!values.jsonCalBehavior?.behaviorTemplateId) {
          set(errors, "jsonCalBehavior.behaviorTemplateId", "Required")
        }
      }

      if (values.jsonCalBehavior?.cal && values.jsonCalBehavior?.cal < 1) {
        set(errors, "jsonCalBehavior.cal", "เปอร์เซ็นต์ของการประเมินต้องมากกว่า 0")
      }

      if (currentState !== TemplateCreateState.SET_TARGET) {
        set(errors, "jsonCalKpi", undefined)
        set(errors, "jsonCalKpiCompany", undefined)
        set(errors, "jsonCalKpiOther", undefined)
        set(errors, "jsonCalBehavior", undefined)
      }

      return errors
    },
    [currentState],
  )

  const history = useHistory()

  const onGoBack = useCallback(() => {
    history.push(paths.setForm())
  }, [history])

  return (
    <>
      <GoBackHeader onGoBackClick={onGoBack} />
      <Box height={24} />
      <Sarabun type="H2" color={WHITE}>
        {t("แบบฟอร์มประจำไตรมาส")}
      </Sarabun>
      <StateCard>
        <State
          currentState={currentState}
          stateComponentType={StateComponentType.TEMPLATE_CREATE}
        />
      </StateCard>
      <Box height={24} />
      <div
        style={{
          backgroundColor: isSuccess ? `${PRIMARY_DARK}` : `${WHITE}`,
          padding: "12px",
        }}
      >
        <Form<IKpiPeriodTemplateForm>
          onSubmit={handleSubmit}
          mutators={{
            ...arrayMutators,
          }}
          initialValues={{ ...initialValues }}
          validate={validate}
        >
          {({ handleSubmit, invalid, values }) => {
            return (
              <>
                {currentState === TemplateCreateState.SETTING_TEMPLATE && (
                  <SettingFormField
                    values={values}
                    invalid={invalid}
                    setCurrentState={setCurrentState}
                  />
                )}
                {currentState === TemplateCreateState.SET_TARGET && (
                  <ContentFormField setCurrentState={setCurrentState} invalid={invalid} />
                )}
                {currentState === TemplateCreateState.SELECT_EMPLOYEE && (
                  <SelectEmployeeField setCurrentState={setCurrentState} />
                )}
                {currentState === TemplateCreateState.CONFIRM_TEMPLATE && (
                  <CheckAndConfirmState
                    type={TemplateType.KPI}
                    handleSubmit={handleSubmit}
                    setCurrentState={setCurrentState}
                    options={getOptionKpiTemplate}
                    isSuccess={isSuccess}
                    isSubmitLoading={isSubmitLoading}
                    valuesKpi={values}
                  />
                )}
                <InitialSelectHierarchyGroupOptions />
              </>
            )
          }}
        </Form>
      </div>
    </>
  )
}

export default KpiPeriodTemplateFrom
