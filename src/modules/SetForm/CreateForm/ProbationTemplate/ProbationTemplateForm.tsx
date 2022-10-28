import styled from "@emotion/styled"
import { Box } from "@mui/material"
import { set } from "lodash"
import { useCallback, useState } from "react"
import { Form } from "react-final-form"
import { useTranslation } from "react-i18next"

import CheckAndConfirmState from "../../../../components/CheckAndConfirmState"
import Sarabun from "../../../../components/common/Sarabun"
import State from "../../../../components/common/State"
import { PRIMARY_DARK, WHITE } from "../../../../constants/colors"
import { useGetOptionKpiTemplate } from "../../../../services/set-form/set-form-query"
import {
  ICompany,
  ISubmitCreateProbationType,
  JsonCalBehavior,
  TemplateTypeDelete,
} from "../../../../services/set-form/set-form-type"
import {
  EmployeeType,
  StateComponentType,
  TemplateCreateState,
  TemplateType,
} from "../../../../services/enum-typed"
import ContentFormField from "./ContentFormField"
import SelectEmployeeField from "./SelectEmployeeField"
import SettingFormField from "./SettingFormField"
import paths from "../../../../constants/paths"
import { useHistory } from "react-router-dom"
import GoBackHeader from "../../../../components/common/GoBackHeader"
import LoadingLayout from "../../../../components/common/LoadingLayout"
import { mapGetOptionIds } from "../../../../components/SelectHierarchyGroup/helper"
import {
  ISelectEmployeeFormSubmitValues,
  ISelectHierarchyGroupFormValues,
} from "../../../../components/SelectHierarchyGroup/interface"
import InitialSelectHierarchyGroupOptions from "../../../../components/SelectHierarchyGroup/InitialSelectHierarchyGroupOptions"

const StateCard = styled.div`
  margin-top: 24px;
`

export type IProbationTemplateFormType = {
  name: string
  isActive: boolean
  defaultMgr: number
  levelApprove: number
  mgr1_60: number
  mgr2_60?: number
  mgr1_100: number
  mgr2_100?: number
  acceptGrade: number
  descriptionForUser: string
  descriptionForMgr: string
  calBehavior: JsonCalBehavior
  passValue: number
  companies: ICompany[]
  jobLevelIds?: string[]
  jobCodeIds?: string[]
  salaryAdminPlanIds?: string[]
  employeeTypes?: EmployeeType[] | string[]
  employeeClassificationIds?: string[]
  positionLevelIds?: string[]

  groupSelected?: ISelectHierarchyGroupFormValues
}

export type IProbationTemplateFormProps = {
  onSubmit: (values: ISubmitCreateProbationType) => void
  initialValues?: Partial<IProbationTemplateFormType>
  isSuccess?: boolean
  isSubmitLoading?: boolean
  isEdit?: boolean
}

const ProbationTemplateForm = (props: IProbationTemplateFormProps) => {
  const { onSubmit, initialValues, isSuccess, isSubmitLoading, isEdit } = props
  const { t } = useTranslation()
  const history = useHistory()

  const [currentState, setCurrentState] = useState(TemplateCreateState.SETTING_TEMPLATE)

  const handleSubmit = useCallback(
    (
      values: Partial<IProbationTemplateFormType> &
        Partial<ISelectEmployeeFormSubmitValues> &
        Partial<ISelectHierarchyGroupFormValues>,
    ) => {
      const params: ISubmitCreateProbationType = {
        name: values.name || "",
        descriptionForUser: values.descriptionForUser || "",
        descriptionForMgr: values.descriptionForMgr || "",
        companies: values.companies || [],
        calBehavior: {
          behaviorTemplateId: values.calBehavior?.behaviorTemplateId,
          cal: Number(values.calBehavior?.cal),
        },
        timelineForProbation: {
          mgr1_60: Number(values.mgr1_60),
          mgr2_60: Number(values.mgr2_60) || undefined,
          mgr1_100: Number(values.mgr1_100),
          mgr2_100: Number(values.mgr2_100) || undefined,
          acceptGrade: Number(values.acceptGrade),
        },
        isActive: values.isActive ?? true,
        passValue: Number(values.passValue),
        levelApprove: values.levelApprove || 1,
        defaultMgr: values.defaultMgr || 1,

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
    (values: IProbationTemplateFormType) => {
      const errors: IFormValueErrors<IProbationTemplateFormType> = {}

      if (values.mgr1_60 && values.mgr1_60 < 1) {
        set(errors, "mgr1_60", "ระยะเวลาต้องมากกว่า 0 วัน")
      }
      if (values.mgr2_60 && values.mgr2_60 < 1) {
        set(errors, "mgr2_60", "ระยะเวลาต้องมากกว่า 0 วัน")
      }
      if (values.mgr1_100 && values.mgr1_100 < 1) {
        set(errors, "mgr1_100", "ระยะเวลาต้องมากกว่า 0 วัน")
      }
      if (values.mgr2_100 && values.mgr2_100 < 1) {
        set(errors, "mgr2_100", "ระยะเวลาต้องมากกว่า 0 วัน")
      }
      if (values.acceptGrade && values.acceptGrade < 1) {
        set(errors, "acceptGrade", "ระยะเวลาต้องมากกว่า 0 วัน")
      }

      if (currentState === TemplateCreateState.SET_TARGET) {
        if (!values.calBehavior?.cal) {
          set(errors, "calBehavior.cal", "Required")
        } else if (values.calBehavior?.cal < 1) {
          set(errors, "calBehavior.cal", "เปอร์เซ็นต์ของการประเมินต้องมากกว่า 0")
        }

        if (!values.calBehavior?.behaviorTemplateId) {
          set(errors, "calBehavior.behaviorTemplateId", "Required")
        }
      }

      if (currentState !== TemplateCreateState.SET_TARGET) {
        set(errors, "calBehavior", undefined)
      }
      console.debug({ errors, values })
      return errors
    },
    [currentState],
  )

  const { data: getOptionKpiTemplate } = useGetOptionKpiTemplate(TemplateTypeDelete.PROBATION)

  const goBack = useCallback(() => {
    history.push(paths.setForm())
  }, [history])

  return (
    <>
      <GoBackHeader onGoBackClick={goBack} />
      <Box height={24} />
      <Sarabun type="H2" color={WHITE}>
        {t("แบบฟอร์มทดลองงาน")}
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
        <Form<IProbationTemplateFormType>
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validate={validate}
        >
          {({ handleSubmit, invalid, values }) => {
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
                      type={TemplateType.PROBATION}
                      handleSubmit={handleSubmit}
                      setCurrentState={setCurrentState}
                      options={getOptionKpiTemplate}
                      isSuccess={isSuccess}
                      isEdit={isEdit}
                      valuesProbation={values}
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

export default ProbationTemplateForm
