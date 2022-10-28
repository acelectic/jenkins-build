/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "@emotion/styled"
import { useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import Button from "../common/Button"
import Icon from "../common/Icon"

import { GRAYSCALE_DARKGRAY_40, PRIMARY_MAIN, WHITE } from "../../constants/colors"
import Sarabun from "../common/Sarabun"
import Box from "@mui/material/Box"
import RadioGroupButton from "../common/RadioGroupButton"
import { useForm, useFormState } from "react-final-form"
import {
  ISelectHierarchyGroupFormValues,
  IParentFromValues,
  ISelectedOption,
} from "../SelectHierarchyGroup/interface"
import { isEmpty } from "lodash"
import { useSetNormalizeHierarchyOption } from "../SelectHierarchyGroup/helper"
import SelectHierarchyGroup, { EnumSelectHierarchyGroupType } from "../SelectHierarchyGroup"
import { IGetHierarchyOption } from "../../services/group-employee/group-employee-type"

const Title = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 24px;
  background: ${WHITE};
  border: 1px solid ${GRAYSCALE_DARKGRAY_40};
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%;
`

const ButtonZone = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  box-sizing: border-box;
  margin-top: 24px;
  justify-content: space-between;
`

export enum EnumSelectedEmployeeType {
  EMPLOYEE = "employee",
  HIERARCHY = "hierarchy",
}

type IChooseSelectGroupComponentProps = {
  onNextClick?: (values?: any) => void
  onBackClick?: () => void
  isRequireKpiTransaction?: boolean
  buttonText?: string
  isRequireLeastOneUser?: boolean
  isOnlySelectHierarchy?: boolean
  hideCountUsers?: boolean
}

const ChooseSelectGroupComponent = (props: IChooseSelectGroupComponentProps) => {
  const {
    onNextClick,
    onBackClick,
    isRequireKpiTransaction,
    buttonText = "ไปตั้งค่าวงปรับเทียบย่อย",
    isOnlySelectHierarchy = false,
    isRequireLeastOneUser = false,
    hideCountUsers = false,
  } = props

  const { t } = useTranslation()

  const form = useForm<ISelectHierarchyGroupFormValues>()
  const { values: formValues } = useFormState<ISelectHierarchyGroupFormValues & IParentFromValues>()

  const [selectEmployeeType, setSelectEmployeeType] = useState<EnumSelectedEmployeeType>(
    formValues?.selectEmployeeType || EnumSelectedEmployeeType.HIERARCHY,
  )

  const { setFilterOptionsToForm, setHierarchyOptionsToForm } = useSetNormalizeHierarchyOption()

  const selectedGroupOptions = useMemo(
    () => [
      {
        value: EnumSelectedEmployeeType.HIERARCHY,
        label: t("เลือกรูปแบบตามโครงสร้างองค์กร"),
      },
      {
        value: EnumSelectedEmployeeType.EMPLOYEE,
        label: t("เลือกตามรายชื่อพนักงาน"),
      },
    ],
    [t],
  )

  const handleSelectedGroup = useCallback((value: EnumSelectedEmployeeType) => {
    setSelectEmployeeType(value)
  }, [])

  const onConfirmButtonClick = useCallback(() => {
    form.batch(() => {
      setFilterOptionsToForm(form, formValues)
      setHierarchyOptionsToForm(form, formValues)
      form.change("selectEmployeeType" as any, selectEmployeeType)

      if (selectEmployeeType === EnumSelectedEmployeeType.HIERARCHY) {
        const defaultUserOptions: ISelectedOption = {
          selectOptions: {},
          excludeOptions: {},
          isCheckedAll: false,
          isIncludeNull: false,
          totalOptions: [],
        }
        const defaultUserSelected: IGetHierarchyOption = {
          isCheckedAll: false,
          selectedIds: [],
          excludeIds: [],
        }
        form.change("userSelected" as any, defaultUserSelected)
        form.change("userOptions" as any, defaultUserOptions)
      }
    })

    onNextClick?.()
  }, [
    form,
    formValues,
    onNextClick,
    selectEmployeeType,
    setFilterOptionsToForm,
    setHierarchyOptionsToForm,
  ])

  const isDisabledNextButton = useMemo(() => {
    let isDisabled = false
    const {
      companyOptions,
      isCountUserFetching,
      countUser = 0,
      countSelectUser = 0,
      isCountUserSelectFetching,
    } = formValues || {}
    const { isCheckedAll, selectOptions } = companyOptions || {}
    switch (selectEmployeeType) {
      case EnumSelectedEmployeeType.HIERARCHY:
        if (isRequireLeastOneUser && countUser < 1) isDisabled = true
        if (!isCheckedAll && isEmpty(selectOptions)) isDisabled = true
        if (isCountUserFetching) isDisabled = true
        break
      case EnumSelectedEmployeeType.EMPLOYEE:
        if (isRequireLeastOneUser && countSelectUser < 1) isDisabled = true
        if (isCountUserSelectFetching) isDisabled = true
        break
      default:
        break
    }

    return isDisabled
  }, [formValues, isRequireLeastOneUser, selectEmployeeType])

  const selectType = useMemo(() => {
    if (isOnlySelectHierarchy || selectEmployeeType === EnumSelectedEmployeeType.HIERARCHY) {
      return EnumSelectHierarchyGroupType.HIERARCHY
    } else {
      return EnumSelectHierarchyGroupType.EMPLOYEE
    }
  }, [isOnlySelectHierarchy, selectEmployeeType])

  return (
    <div>
      <Title>
        <Sarabun type="H4">{t(`เลือกกลุ่มพนักงาน`)}</Sarabun>
        <Box height={4} />
        <Sarabun type="Body2">
          {t(`เลือกกลุ่มพนักงานที่ยังไม่มีแบบฟอร์มการประเมินที่แอคทีฟอยู่`)}
        </Sarabun>
        <Box height={32} />
        {!isOnlySelectHierarchy && (
          <>
            <RadioGroupButton
              title="เลือกรูปแบบการเลือกกลุ่มพนักงาน"
              options={selectedGroupOptions}
              value={selectEmployeeType}
              onChange={(value) => {
                handleSelectedGroup((value as unknown) as EnumSelectedEmployeeType)
              }}
            />
            <Box height={32} />
          </>
        )}
        <SelectHierarchyGroup
          type={selectType}
          hideCountUsers={hideCountUsers}
          isRequireKpiTransaction={isRequireKpiTransaction}
        />
      </Title>
      <ButtonZone>
        <Button
          buttonType="outlined"
          startIcon={<Icon iconName="caretLeft" width={24} height={24} />}
          onClick={onBackClick}
          width={200}
        >
          {t(`ย้อนกลับ`)}
        </Button>
        <Button
          endIcon={<Icon iconName="caretRightWhite" width={24} height={24} />}
          onClick={onConfirmButtonClick}
          isDisabledButton={isDisabledNextButton}
          width={260}
          backgroundColor={`${PRIMARY_MAIN}`}
        >
          {t(`${buttonText}`)}
        </Button>
      </ButtonZone>
    </div>
  )
}

export default ChooseSelectGroupComponent
