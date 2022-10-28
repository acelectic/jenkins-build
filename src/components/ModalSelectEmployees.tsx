/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import styled from "@emotion/styled"
import { Box, Modal } from "@mui/material"
import dayjs, { Dayjs } from "dayjs"
import { FormApi } from "final-form"
import { compact, get } from "lodash"
import { useCallback, useMemo, useState, useRef } from "react"
import { Form, FormSpy, useForm, useFormState } from "react-final-form"
import { useTranslation } from "react-i18next"
import { ERROR } from "../constants/colors"
import { IBaseStructureOption } from "../services/group-employee/group-employee-type"
import { useScreen } from "../utils/responsive-helper"
import Button from "./common/Button"
import Icon from "./common/Icon"
import { useAppModalStyles } from "./common/Modal"
import Sarabun from "./common/Sarabun"
import { useSetNormalizeHierarchyOption } from "./SelectHierarchyGroup/helper"
import InitialSelectHierarchyGroupOptions from "./SelectHierarchyGroup/InitialSelectHierarchyGroupOptions"
import {
  IParentFromValues,
  ISelectEmployeeFormSubmitValues,
  ISelectHierarchyGroupFormValues,
} from "./SelectHierarchyGroup/interface"
import SelectEmployeeGroupComponent from "./SelectHierarchyGroup/SelectEmployeeGroupComponent"

const Layout = styled(Box)`
  &.content {
    padding: 40px 30px;
    height: calc(100vh - 40px);
    box-sizing: border-box;
  }
`

const ContentLayout = styled(Box)`
  flex: 1;
  display: flex;
  flex-flow: column;
  align-items: stretch;
  overflow: hidden;
`

const HeaderLayout = styled(Box)`
  display: grid;
  grid-template-columns: auto max-content;
`

const CloseIconLayout = styled(Box)`
  cursor: pointer;
`

const BodyLayout = styled(Box)`
  flex: 1;
  border: grey;
  border-width: 1px;
  border-style: inset;
  display: flex;
  flex-flow: column;
  align-items: stretch;
  overflow: hidden;
  > * {
    flex: 1;
    height: 100%;
  }
`

const FooterLayout = styled(Box)`
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;

  @media (max-height: 769px) {
    margin-top: 20px;
  }
`

type IModalSelectEmployeesProps = {
  fieldName?: string
  visible: boolean
  title: string
  description?: string
  onClose?: () => void
  onConfirm?: (
    values: IParentFromValues & ISelectHierarchyGroupFormValues & ISelectEmployeeFormSubmitValues,
  ) => void
  isRequireKpiTransaction?: boolean
  scopeUserIds?: string[]
  selectedLimit?: number
  isRequired?: boolean
  limitMaxEmployeesSelect?: number
  isDisabledByKpiStatus?: boolean
  endDate?: Dayjs
}
const ModalSelectEmployees = (props: IModalSelectEmployeesProps) => {
  const {
    // initialValues: initialValuesFromParent,
    fieldName: parentFieldName,
    visible: isVisible,
    title,
    description,
    onConfirm,
    onClose,
    isRequireKpiTransaction = false,
    scopeUserIds = [],
    selectedLimit,
    isRequired = false,
    limitMaxEmployeesSelect,
    isDisabledByKpiStatus = false,
    endDate = dayjs(),
  } = props

  const classes = useAppModalStyles({
    maxWidth: "80%",
    fitMaxWidth: true,
  })
  const { t } = useTranslation()
  const [formValues, setFormValues] = useState<
    Partial<IParentFromValues & ISelectHierarchyGroupFormValues & ISelectEmployeeFormSubmitValues>
  >({})
  const formRef = useRef<
    FormApi<IParentFromValues & ISelectHierarchyGroupFormValues & ISelectEmployeeFormSubmitValues>
  >()
  const {
    getFinalFilterOptionIds,
    getHierarchyOptionsSelected,
    setHierarchyOptionsToForm,
    setFilterOptionsToForm,
  } = useSetNormalizeHierarchyOption()

  const { isMobile } = useScreen()
  const parentForm = useForm()
  const parentFormState = useFormState()
  const { values: parentFormValues } = parentFormState

  const subParentFromValues = useMemo(() => {
    let resultSubParentFormValues = {}
    const tempParentFormValues = parentFormValues || {}
    if (parentFieldName) {
      resultSubParentFormValues = get(tempParentFormValues, parentFieldName, {})
    } else {
      resultSubParentFormValues = tempParentFormValues
    }
    // console.debug({
    //   parentFormValues,
    //   parentFieldName,
    //   resultSubParentFormValues,
    // })

    return resultSubParentFormValues as IParentFromValues &
      ISelectHierarchyGroupFormValues &
      ISelectEmployeeFormSubmitValues & {
        selectedEmployees: IBaseStructureOption[]
        userCalibrate: IBaseStructureOption[]
      }
  }, [parentFieldName, parentFormValues])

  const { countSelectUser = 0 } = formValues || {}

  const onSubmit = useCallback(
    async (
      values: IParentFromValues & ISelectHierarchyGroupFormValues & ISelectEmployeeFormSubmitValues,
    ) => {
      const {
        companyOptions,
        jobFunctionOptions,
        divisionOptions,
        subDivisionOptions,
        departmentOptions,
        storeOptions,
        jobLevelOptions,
        employeeTypeOptions,
        salaryAdminPlanOptions,
        jobCodeOptions,
        employeeClassificationOptions,
        userOptions,
      } = values
      const filterOptionIds = getFinalFilterOptionIds({
        companyOptions,
        jobFunctionOptions,
        divisionOptions,
        subDivisionOptions,
        departmentOptions,
        storeOptions,
        jobLevelOptions,
        employeeTypeOptions,
        salaryAdminPlanOptions,
        jobCodeOptions,
        employeeClassificationOptions,
      })
      const {
        companySelected,
        jobFunctionSelected,
        divisionSelected,
        subDivisionSelected,
        departmentSelected,
        storeSelected,
        userSelected,
      } = getHierarchyOptionsSelected({
        companyOptions,
        jobFunctionOptions,
        divisionOptions,
        subDivisionOptions,
        departmentOptions,
        storeOptions,
        jobLevelOptions,
        employeeTypeOptions,
        salaryAdminPlanOptions,
        jobCodeOptions,
        employeeClassificationOptions,
        userOptions,
      })

      const fieldPrefix = parentFieldName ? `${parentFieldName}.` : ""
      parentForm.batch(() => {
        setFilterOptionsToForm(parentForm, values, fieldPrefix)
        setHierarchyOptionsToForm(parentForm, values, fieldPrefix)
      })
      onConfirm?.({
        ...values,
        ...filterOptionIds,
        companyOptions,
        jobFunctionOptions,
        divisionOptions,
        subDivisionOptions,
        departmentOptions,
        storeOptions,
        jobLevelOptions,
        employeeTypeOptions,
        salaryAdminPlanOptions,
        jobCodeOptions,
        employeeClassificationOptions,
        companySelected,
        jobFunctionSelected,
        divisionSelected,
        subDivisionSelected,
        departmentSelected,
        storeSelected,
        userSelected,
      })
    },
    [
      getFinalFilterOptionIds,
      getHierarchyOptionsSelected,
      onConfirm,
      parentFieldName,
      parentForm,
      setFilterOptionsToForm,
      setHierarchyOptionsToForm,
    ],
  )

  const onCloseIconClick = useCallback(() => {
    onClose?.()
  }, [onClose])

  const onConfirmButtonClick = useCallback(async () => {
    await formRef?.current?.submit?.()
  }, [])

  const initialValues = useMemo(() => {
    const { selectedEmployees, userCalibrate, ...restValues } = subParentFromValues
    // console.debug({ subParentFromValues })

    const _initialValues: Partial<
      IParentFromValues & ISelectHierarchyGroupFormValues & ISelectEmployeeFormSubmitValues
    > = {
      ...restValues,
      endDate: endDate?.format(),
      userSelected: subParentFromValues?.userSelected
        ? subParentFromValues.userSelected
        : {
            isCheckedAll: false,
            selectedIds: compact([...(userCalibrate || []), ...(selectedEmployees || [])]).map(
              (e) => e.id,
            ),
            excludeIds: [],
          },
    }
    // console.debug({
    //   modalInitialValues: _initialValues,
    // })
    return _initialValues
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subParentFromValues])

  const isDisabledConfirmButton = useMemo(() => {
    if (countSelectUser < 1) return true
    if (limitMaxEmployeesSelect && countSelectUser > limitMaxEmployeesSelect) return true
    return false
  }, [countSelectUser, limitMaxEmployeesSelect])

  return (
    <Modal
      open={isVisible}
      className={classes.appModal}
      onClose={onCloseIconClick}
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      disableRestoreFocus
    >
      <Layout
        className={isMobile ? `content ${classes.layoutMobile}` : `content ${classes.layout}`}
      >
        <ContentLayout>
          <HeaderLayout>
            <Sarabun type="H4">
              {title} {isRequired && <span style={{ color: `${ERROR}` }}>*</span>}
            </Sarabun>
            <CloseIconLayout onClick={onCloseIconClick}>
              <Icon iconName="close" />
            </CloseIconLayout>
            <Sarabun type="Body2">{description}</Sarabun>
          </HeaderLayout>
          <Box height={32} />
          <BodyLayout>
            {isVisible && (
              <Form onSubmit={onSubmit} initialValues={initialValues}>
                {({ form }) => {
                  formRef.current = form
                  return (
                    <div>
                      <SelectEmployeeGroupComponent
                        isRequireKpiTransaction={isRequireKpiTransaction}
                        scopeUserIds={scopeUserIds}
                        selectedLimit={selectedLimit}
                        isDisabledByKpiStatus={isDisabledByKpiStatus}
                        templateEndDate={endDate}
                        isInModal
                      />
                      <InitialSelectHierarchyGroupOptions />
                      <FormSpy>
                        {({ values }) => {
                          setFormValues(values)
                          return <></>
                        }}
                      </FormSpy>
                    </div>
                  )
                }}
              </Form>
            )}
          </BodyLayout>
          <FooterLayout>
            <Button onClick={onConfirmButtonClick} isDisabledButton={isDisabledConfirmButton}>
              {t("ยืนยันเลือกพนักงาน")}
            </Button>
          </FooterLayout>
        </ContentLayout>
      </Layout>
    </Modal>
  )
}

export default ModalSelectEmployees
