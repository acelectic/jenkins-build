import styled from "@emotion/styled"
import { useCallback, useState } from "react"
import { Form } from "react-final-form"
import CheckAndConfirmState from "../../../../components/CheckAndConfirmState"
import State from "../../../../components/common/State"
import {} from "../../../../components/fields"
import {
  EmployeeType,
  StateComponentType,
  TemplateCreateState,
  TemplateType,
} from "../../../../services/enum-typed"
import ContentFormField from "./ContentFormField"
import SelectEmployeeField from "./SelectEmployeeField"
import SettingFormField from "./SettingFormField"
import arrayMutators from "final-form-arrays"
import {
  ICompany,
  JsonScaleForGrade,
  ISubmitCreateOneYearType,
  TemplateTypeDelete,
} from "../../../../services/set-form/set-form-type"
import { set } from "lodash"
import { useGetOptionKpiTemplate } from "../../../../services/set-form/set-form-query"
import Sarabun from "../../../../components/common/Sarabun"
import { PRIMARY_DARK, WHITE } from "../../../../constants/colors"
import { useTranslation } from "react-i18next"
import { Box } from "@mui/material"
import paths from "../../../../constants/paths"
import { useHistory } from "react-router-dom"
import GoBackHeader from "../../../../components/common/GoBackHeader"
import LoadingLayout from "../../../../components/common/LoadingLayout"
import {
  ISelectEmployeeFormSubmitValues,
  ISelectHierarchyGroupFormValues,
} from "../../../../components/SelectHierarchyGroup/interface"
import { mapGetOptionIds } from "../../../../components/SelectHierarchyGroup/helper"
import InitialSelectHierarchyGroupOptions from "../../../../components/SelectHierarchyGroup/InitialSelectHierarchyGroupOptions"

const StateCard = styled.div`
  margin-top: 24px;
`

export type IOneYearTemplateFormType = {
  name: string
  isActive: boolean
  defaultMgr: number
  levelApprove: number
  mgr1: number
  mgr2?: number
  mgr3?: number
  mgr4?: number
  feedback: number
  acceptGrade: number
  descriptionForUser: string
  descriptionForMgr: string
  jsonCalBehavior: {
    behaviorTemplateId: string
    cal: number
  }
  scaleForGrade: JsonScaleForGrade
  companies: ICompany[]
  jobLevelIds?: string[]
  jobCodeIds?: string[]
  salaryAdminPlanIds?: string[]
  employeeTypes?: EmployeeType[] | string[]
  employeeClassificationIds?: string[]
  positionLevelIds?: string[]

  groupSelected?: ISelectHierarchyGroupFormValues
}

export type IOneYearTemplateFormProps = {
  onSubmit: (values: ISubmitCreateOneYearType) => void
  initialValues?: Partial<IOneYearTemplateFormType>
  isSuccess?: boolean
  isSubmitLoading?: boolean
  isEdit?: boolean
}

const OneYearTemplateForm = (props: IOneYearTemplateFormProps) => {
  const { onSubmit, initialValues, isSuccess, isSubmitLoading, isEdit } = props
  const { t } = useTranslation()
  const history = useHistory()

  const [currentState, setCurrentState] = useState(TemplateCreateState.SETTING_TEMPLATE)

  const { data: getOptionKpiTemplate } = useGetOptionKpiTemplate(TemplateTypeDelete.ONE_YEAR)

  const handleSubmit = useCallback(
    (
      values: IOneYearTemplateFormType &
        Partial<ISelectEmployeeFormSubmitValues> &
        Partial<ISelectHierarchyGroupFormValues>,
    ) => {
      const params: ISubmitCreateOneYearType = {
        name: values.name,
        descriptionForUser: values.descriptionForUser,
        descriptionForMgr: values.descriptionForMgr,
        scaleForGrade: {
          name: `${values.name}_scale`,
          jsonScaleDetails: values.scaleForGrade.jsonScaleDetails,
        },
        companies: values.companies,
        calBehavior: {
          behaviorTemplateId: values.jsonCalBehavior.behaviorTemplateId,
          cal: Number(values.jsonCalBehavior.cal),
        },
        timelineForOneYear: {
          mgr1: Number(values.mgr1),
          mgr2: Number(values.mgr2) || undefined,
          mgr3: Number(values.mgr3) || undefined,
          mgr4: Number(values.mgr4) || undefined,
          feedback: Number(values.feedback),
          acceptGrade: Number(values.acceptGrade),
        },
        isActive: values.isActive ?? true,
        levelApprove: values.levelApprove,
        defaultMgr: values.defaultMgr,

        employeeClassificationIds: mapGetOptionIds(
          values.employeeClassificationOptions?.totalOptions,
        ),
        employeeTypes: mapGetOptionIds(values.employeeTypeOptions?.totalOptions),
        jobCodeIds: mapGetOptionIds(values.jobCodeOptions?.totalOptions),
        jobLevelIds: mapGetOptionIds(values.jobLevelOptions?.totalOptions),
        positionLevelIds: mapGetOptionIds(values.positionLevelOptions?.totalOptions),
        salaryAdminPlanIds: mapGetOptionIds(values.salaryAdminPlanOptions?.totalOptions),

        companySelected: values.companySelected,
        jobFunctionSelected: values.jobFunctionSelected,
        divisionSelected: values.divisionSelected,
        subDivisionSelected: values.subDivisionSelected,
        departmentSelected: values.departmentSelected,
        storeSelected: values.storeSelected,
      }
      onSubmit(params)
    },
    [onSubmit],
  )

  const validate = useCallback(
    (values: IOneYearTemplateFormType) => {
      const errors: IFormValueErrors<IOneYearTemplateFormType> = {}

      if (values.mgr1 && values.mgr1 < 1) {
        set(errors, "mgr1", "ระยะเวลาต้องมากกว่า 0 วัน")
        if (values.mgr2 === 2) {
          set(errors, "mgr2", "ระยะเวลาต้องมากกว่า 0 วัน")
        }
        if (values.mgr3 === 3) {
          set(errors, "mgr3", "ระยะเวลาต้องมากกว่า 0 วัน")
        }
        if (values.mgr4 === 4) {
          set(errors, "mgr4", "ระยะเวลาต้องมากกว่า 0 วัน")
        }
      }

      // if (values.levelApprove) {
      // }
      if (values.feedback && values.feedback < 1) {
        set(errors, "feedback", "ระยะเวลาต้องมากกว่า 0 วัน")
      }
      if (values.acceptGrade && values.acceptGrade < 1) {
        set(errors, "acceptGrade", "ระยะเวลาต้องมากกว่า 0 วัน")
      }

      if (currentState === TemplateCreateState.SET_TARGET) {
        if (!values.jsonCalBehavior?.cal) {
          set(errors, "jsonCalBehavior.cal", "Required")
        }
        if (!values.jsonCalBehavior?.behaviorTemplateId) {
          set(errors, "jsonCalBehavior.behaviorTemplateId", "Required")
        }
      }

      if (currentState !== TemplateCreateState.SET_TARGET) {
        set(errors, "jsonCalBehavior", undefined)
      }

      return errors
    },
    [currentState],
  )

  const goBack = useCallback(() => {
    history.push(paths.setForm())
  }, [history])

  return (
    <>
      <GoBackHeader onGoBackClick={goBack} />
      <Box height={24} />
      <Sarabun type="H2" color={WHITE}>
        {t("แบบฟอร์มครบรอบ 1 ปี")}
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
        <Form<IOneYearTemplateFormType>
          onSubmit={handleSubmit}
          initialValues={{ ...initialValues }}
          mutators={{
            ...arrayMutators,
          }}
          validate={validate}
        >
          {({ handleSubmit, values, invalid }) => {
            return (
              <>
                {currentState === TemplateCreateState.SETTING_TEMPLATE && (
                  <SettingFormField
                    values={values}
                    setCurrentState={setCurrentState}
                    invalid={invalid}
                  />
                )}
                {currentState === TemplateCreateState.SET_TARGET && (
                  <ContentFormField setCurrentState={setCurrentState} invalid={invalid} />
                )}
                {currentState === TemplateCreateState.SELECT_EMPLOYEE && (
                  <SelectEmployeeField setCurrentState={setCurrentState} />
                )}
                {currentState === TemplateCreateState.CONFIRM_TEMPLATE && (
                  <LoadingLayout isLoading={!!isSubmitLoading}>
                    <CheckAndConfirmState
                      type={TemplateType.ONE_YEAR}
                      setCurrentState={setCurrentState}
                      handleSubmit={handleSubmit}
                      options={getOptionKpiTemplate}
                      isSuccess={isSuccess}
                      isEdit={isEdit}
                      valuesOneYear={values}
                      // isSubmitLoading={isSubmitLoading}
                    />
                  </LoadingLayout>
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

export default OneYearTemplateForm
