/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import styled from "@emotion/styled"
import { Box } from "@mui/material"
import { useCallback, useMemo, useState } from "react"
import { Form } from "react-final-form"
import Sarabun from "../../../components/common/Sarabun"
import State from "../../../components/common/State"
import { WHITE } from "../../../constants/colors"
import {
  CreateKpiState,
  KpiStatus,
  KpiType,
  StateComponentType,
  UnitType,
} from "../../../services/enum-typed"
import ChooseEmployeeState from "./ChooseEmployeeState"
import ConfirmState from "./ConfirmState"
import FillDetailState from "./FillDetailState"
import arrayMutators from "final-form-arrays"
import { ISubmitCreateKpiTransactionDetail } from "../../../services/manage-kpi/mange-kpi-type"
import { ScaleFormDetail } from "../../../components/ScaleForm"
import { useCurrentUser } from "../../../services/auth/auth-query"
import LoadingLayout from "../../../components/common/LoadingLayout"
import {
  ISelectEmployeeFormSubmitValues,
  ISelectHierarchyGroupFormValues,
} from "../../../components/SelectHierarchyGroup/interface"
import { IGetHierarchyOption } from "../../../services/group-employee/group-employee-type"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 0px solid red;
  height: 100%;
`

export type ISelectEmployee = {
  id: string
  name?: string
  kpiTransactionId?: string
  kpiStatus?: KpiStatus
  firstName?: string
  lastName?: string
  prefix?: string
  employeeId?: string
}

export type IKpiTransactionDetailFormValues = {
  id?: string
  name: string
  description: string
  scoreType: string
  goalCategory: string
  target: number
  unitType: UnitType
  customUnitType: string
  scales: ScaleFormDetail[]
  positionTarget: string
  weight: number
  selectedEmployees: ISelectEmployee[]
  kpiType: KpiType
  actual?: number
  assignableId: string
  userSelected: IGetHierarchyOption
}

type IKpiTransactionDetailTemplateProps = {
  title?: string
  initialValues?: any
  onSubmit: (values: ISubmitCreateKpiTransactionDetail) => void
  isSuccess?: boolean
  isLoadingSubmit?: boolean
  unitOption?: BaseOptionType[]
  categoryOption?: BaseOptionType[]
}

const KpiTransactionDetailTemplate = (props: IKpiTransactionDetailTemplateProps) => {
  const {
    title = "สร้างเป้าหมายใหม่ให้พนักงาน",
    initialValues,
    onSubmit,
    isSuccess,
    isLoadingSubmit,
    unitOption,
    categoryOption,
  } = props
  // const { t } = useTranslation()
  // const history = useHistory()
  const { data: userData, isLoading: isUserLoading } = useCurrentUser()

  const [currentState, setCurrentState] = useState(CreateKpiState.FILL_DETAIL)

  const newInitialValues = useMemo(() => {
    return {
      ...initialValues,
      assignableId: userData?.user.id,
    }
  }, [initialValues, userData?.user.id])

  const onClickSubmitForm = useCallback(
    (
      values: IKpiTransactionDetailFormValues &
        ISelectEmployeeFormSubmitValues &
        ISelectHierarchyGroupFormValues,
    ) => {
      const params: ISubmitCreateKpiTransactionDetail = {
        userSelected: values.userSelected,
        // kpiTransactionIds: [],
        transactionDetails: [
          {
            ...values,
            // kpiTransactionId: "",
            target: Number(values.target),
            weight: Number(values.weight),
            jsonScale: {
              name: `${values.name}_Scale`,
              positionTarget: values.positionTarget,
              jsonScaleDetails: values.scales,
            },
          },
        ],
        actual: values.actual,
      }
      onSubmit(params)
    },
    [onSubmit],
  )

  return (
    <Container>
      <Sarabun type="H2" color={WHITE}>
        {title}
      </Sarabun>
      <Box height={32} />
      <State currentState={currentState} stateComponentType={StateComponentType.CREATE_KPI} />

      <Form<IKpiTransactionDetailFormValues>
        onSubmit={onClickSubmitForm}
        initialValues={newInitialValues}
        mutators={{ ...arrayMutators }}
      >
        {({ handleSubmit }) => {
          return (
            <>
              {currentState === CreateKpiState.FILL_DETAIL && (
                <LoadingLayout isLoading={isUserLoading}>
                  <FillDetailState
                    setCurrentState={setCurrentState}
                    unitOption={unitOption}
                    categoryOption={categoryOption}
                  />
                </LoadingLayout>
              )}

              {currentState === CreateKpiState.CHOOSE_EMPLOYEES && (
                <ChooseEmployeeState setCurrentState={setCurrentState} />
              )}

              {currentState === CreateKpiState.EVALUATE_AND_CONFIRM && (
                <LoadingLayout isLoading={!!isLoadingSubmit}>
                  <ConfirmState
                    setCurrentState={setCurrentState}
                    handleSubmit={handleSubmit}
                    isSuccess={isSuccess}
                  />
                </LoadingLayout>
              )}
            </>
          )
        }}
      </Form>
    </Container>
  )
}

export default KpiTransactionDetailTemplate
