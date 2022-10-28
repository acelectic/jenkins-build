import styled from "@emotion/styled"
import { CircularProgress } from "@mui/material"
import Box from "@mui/material/Box"
import { filter, get } from "lodash"

import { useCallback, useMemo } from "react"
import { Field, useForm, useFormState } from "react-final-form"
import { FieldArray, FieldArrayRenderProps } from "react-final-form-arrays"
import { useTranslation } from "react-i18next"
import { IUserCalibrate } from ".."
import Avatar from "../../../../components/common/Avatar"
import Button from "../../../../components/common/Button"
import Icon from "../../../../components/common/Icon"
import Sarabun from "../../../../components/common/Sarabun"
import {
  ISelectEmployeeFormSubmitValues,
  ISelectHierarchyGroupFormValues,
} from "../../../../components/SelectHierarchyGroup/interface"
import { ERROR, PRIMARY_LIGHT, WHITE } from "../../../../constants/colors"
import { IBaseStructureOption } from "../../../../services/group-employee/group-employee-type"

const RowsArea = styled("div")({
  display: "flex",
  paddingLeft: 16,
})

const SelectUserArea = styled("div")({
  minWidth: 300,
})

const SelectUserZone = styled("div")({
  marginLeft: 16,
})

const UserBox = styled("div")<{ disabled?: boolean }>(({ disabled }) => ({
  backgroundColor: PRIMARY_LIGHT,
  filter: disabled ? "opacity(0.5)" : "unset",
  cursor: disabled ? "default" : "pointer",
  display: "flex",
  alignItems: "center",
  borderRadius: 24,
}))

const IconBox = styled("div")({
  display: "flex",
  justifyContent: "end",
  flex: 1,
})

const ButtonSelectArea = styled("div")<{ isHasValue: boolean }>(({ isHasValue }) => ({
  display: "flex",
  justifyContent: isHasValue ? "end" : "start",
  flex: 1,
  marginRight: 16,
  marginBottom: 16,
}))

type ISelectUserProps = {
  fieldArrayName: string
  title: string
  onClickSelect: Function
  onDeleteUser?: Function
  isRequired?: boolean
  isLoading?: boolean
}
const SelectUser = (props: ISelectUserProps) => {
  const {
    onClickSelect,
    fieldArrayName,
    title,
    onDeleteUser,
    isRequired = false,
    isLoading,
  } = props

  const { t } = useTranslation()
  const { values: formValues } = useFormState()
  const form = useForm()

  const subFromValues = useMemo(() => {
    const tempParentFormValues = formValues || {}

    const resultSubParentFormValues = get(tempParentFormValues, fieldArrayName, {})

    return resultSubParentFormValues as ISelectHierarchyGroupFormValues &
      ISelectEmployeeFormSubmitValues & {
        userCalibrate: IBaseStructureOption[]
      }
  }, [fieldArrayName, formValues])

  const onClickButton = useCallback(
    (fieldsName: string) => {
      onClickSelect(fieldsName)
    },
    [onClickSelect],
  )
  const required = useCallback(
    (users: IUserCalibrate[]) => {
      if (users && isRequired) {
        return users.length ? undefined : "Required"
      }
      return undefined
    },
    [isRequired],
  )

  const onClickDeleteUser = useCallback(
    (fields: FieldArrayRenderProps<IUserCalibrate, HTMLElement>["fields"], index: number) => {
      const { userSelected, userOptions } = subFromValues
      const target = fields.value[index]
      onDeleteUser?.(target)
      if (userSelected?.isCheckedAll) {
        const newExcludeUserIds = userSelected.excludeIds || []
        if (!newExcludeUserIds?.includes(target.id)) {
          newExcludeUserIds.push(target.id)
        }
        delete userOptions?.selectOptions[target.id]
        form.change(`${fieldArrayName}.userOptions.selectOptions`, userOptions?.selectOptions || {})
        form.change(`${fieldArrayName}.userOptions.excludeOptions.${target.id}`, target)
        form.change(`${fieldArrayName}.userSelected.excludeIds`, newExcludeUserIds)
      } else {
        const newUserSelected = filter(
          userSelected?.selectedIds || [],
          (userId) => userId !== target.id,
        )
        delete userOptions?.excludeOptions[target.id]
        delete userOptions?.selectOptions[target.id]
        form.change(
          `${fieldArrayName}.userOptions.excludeOptions`,
          userOptions?.excludeOptions || {},
        )
        form.change(`${fieldArrayName}.userOptions.selectOptions`, userOptions?.selectOptions || {})
        form.change(`${fieldArrayName}.userSelected.selectedIds`, newUserSelected)
      }
      fields.remove(index)
    },
    [fieldArrayName, form, onDeleteUser, subFromValues],
  )
  return (
    <>
      <Box height={16} />
      <RowsArea>
        <Sarabun style={{ minWidth: 250 }}>
          {title} {isRequired && <span style={{ color: `${ERROR}` }}>*</span>}
        </Sarabun>

        <FieldArray<IUserCalibrate>
          name={`${fieldArrayName}.userCalibrate`}
          validate={required}
          render={({ fields, meta }) => {
            const isHasValue = fields.value && fields.value.length > 0

            return (
              <>
                {isHasValue && (
                  <SelectUserZone>
                    {fields.map((fieldName, index) => {
                      return (
                        <SelectUserArea key={fieldName}>
                          <Field<string> name={`${fieldName}.name`}>
                            {({ input }) => {
                              const { value: name } = input
                              return (
                                <UserBox disabled={!!isLoading}>
                                  <Box width={8} />
                                  <Avatar width={20} height={20} />
                                  <Box width={8} />
                                  <Sarabun color={WHITE}>{name}</Sarabun>
                                  <IconBox>
                                    <Icon
                                      iconName="xCircleWhite"
                                      width={20}
                                      height={20}
                                      onClick={onClickDeleteUser.bind(null, fields, index)}
                                    />
                                  </IconBox>
                                </UserBox>
                              )
                            }}
                          </Field>
                          <Box height={8} />
                        </SelectUserArea>
                      )
                    })}
                  </SelectUserZone>
                )}
                <Box width={16} />
                <ButtonSelectArea isHasValue={isHasValue}>
                  <Button
                    onClick={onClickButton.bind(null, fieldArrayName)}
                    minWidth={100}
                    style={{ maxHeight: 48 }}
                    isDisabledButton={isLoading}
                  >
                    {isLoading ? <CircularProgress size={30} /> : t("เลือก")}
                  </Button>
                  <Box height={8} />
                </ButtonSelectArea>
              </>
            )
          }}
        ></FieldArray>
      </RowsArea>
    </>
  )
}

export default SelectUser
