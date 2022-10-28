import styled from "@emotion/styled"
import { Box, CircularProgress } from "@mui/material"
import { map } from "lodash"
import { useCallback, useMemo } from "react"
import { Field, FieldRenderProps, useForm, useFormState } from "react-final-form"
import { useTranslation } from "react-i18next"
import {
  GRAYSCALE_DARKGRAY_80,
  GRAYSCALE_DARKGRAY_60,
  PRIMARY_LIGHT,
  WHITE,
} from "../../constants/colors"
import { IBaseStructureOption } from "../../services/group-employee/group-employee-type"
import Sarabun from "../common/Sarabun"
import {
  ISelectedOption,
  ISelectEmployeeFormValuesKey,
  ISelectHierarchyGroupFormValues,
} from "./interface"
import Icon from "../common/Icon"
import { parseOptionHashToValuesArray } from "./helper"
import { format2DecimalNumber } from "../../utils/helper"

const HierarchyListLayout = styled(Box)`
  display: flex;
  flex-direction: column;
  grid-row-gap: 4px;
  margin-top: 9px;
`
const HierarchyListTitle = styled(Sarabun)`
  font-weight: bold;
`
const ResultListLayout = styled(Box)`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  grid-row-gap: 4px;
  overflow-y: auto;
`
const HierarchyListItemLayout = styled(Box)`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  grid-row-gap: 4px;
  overflow-y: auto;
`
const HierarchyListItem = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 4px 4px 4px 8px;
  gap: 8px;
  min-height: 30px;
  background: ${PRIMARY_LIGHT};
  border-radius: 24px;

  > button {
    padding: 0;
  }
`

const ViewTitleLayout = styled(Box)`
  display: grid;
  grid-template-columns: max-content auto;
  grid-column-gap: 8px;
  align-items: center;
  justify-content: flex-start;
`

const Center = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 32px 0;
`

const CircularProgressStyled = styled(CircularProgress)`
  width: 18px;
  height: 18px;
  color: ${GRAYSCALE_DARKGRAY_80};
`

interface ISelectHierarchyGroupResultProps {
  isHideCountUsers?: boolean
  isHideHeader?: boolean
  isActionDisabled?: boolean
}
const SelectHierarchyGroupResult = (props: ISelectHierarchyGroupResultProps) => {
  const { isHideCountUsers, isHideHeader, isActionDisabled } = props
  const { t } = useTranslation()

  const { values: formValues } = useFormState<ISelectHierarchyGroupFormValues>()
  const { companyOptions: companies } = formValues || {}
  const { selectOptions, excludeOptions } = companies || {}

  const isSelectedCompany = useMemo(() => {
    return (
      parseOptionHashToValuesArray(selectOptions)?.length ||
      parseOptionHashToValuesArray(excludeOptions)?.length
    )
  }, [excludeOptions, selectOptions])

  return (
    <>
      {!isHideHeader && (
        <ViewTitleLayout>
          <Sarabun type="H6">
            {t(`${!isHideCountUsers ? "กลุ่มพนักงานที่เลือก" : "โครงสร้างพนักงานที่เลือก"}`)}
          </Sarabun>

          {!isHideCountUsers && (
            <Field name="isCountUserFetching">
              {({ input }) => {
                const isCountUserFetching = !!input.value
                return (
                  <Box position="relative">
                    <Box
                      position="absolute"
                      style={{
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        display: "flex",
                        opacity: isCountUserFetching ? 1 : 0,
                      }}
                    >
                      <CircularProgressStyled size="small" />
                    </Box>
                    <Box
                      style={{
                        opacity: !isCountUserFetching ? 1 : 0,
                      }}
                    >
                      <Field<number> name="countUser">
                        {({ input }) => {
                          const countUser = input.value
                          return (
                            <Sarabun type="H6">{`(${format2DecimalNumber(
                              Number(countUser || 0),
                            )} คน)`}</Sarabun>
                          )
                        }}
                      </Field>
                    </Box>
                  </Box>
                )
              }}
            </Field>
          )}
        </ViewTitleLayout>
      )}
      {!isSelectedCompany ? (
        <Center>
          <Icon iconName="done" width={320} height={240} />
          <Sarabun type="Body2">{t(`ยังไม่มีกลุ่มพนักงานที่เลือก`)}</Sarabun>
        </Center>
      ) : (
        <ResultListLayout>
          <HierarchyResultListField
            name="companyOptions"
            title={t("บริษัท")}
            marginLevel={1}
            isActionDisabled={isActionDisabled}
          />
          <HierarchyResultListField
            name="jobFunctionOptions"
            title={t("สายงาน")}
            marginLevel={2}
            isActionDisabled={isActionDisabled}
          />
          <HierarchyResultListField
            name="divisionOptions"
            title={t("สำนักงาน")}
            marginLevel={3}
            isActionDisabled={isActionDisabled}
          />
          <HierarchyResultListField
            name="subDivisionOptions"
            title={t("ระดับด้าน")}
            marginLevel={4}
            isActionDisabled={isActionDisabled}
          />
          <HierarchyResultListField
            name="departmentOptions"
            title={t("ฝ่ายงาน")}
            marginLevel={5}
            isActionDisabled={isActionDisabled}
          />
          <HierarchyResultListField
            name="storeOptions"
            title={t("หน่วยงาน")}
            marginLevel={2}
            isActionDisabled={isActionDisabled}
          />
          <HierarchyResultListField
            name="jobLevelOptions"
            title={t("PC grade")}
            marginLevel={1}
            isActionDisabled={isActionDisabled}
          />
          <HierarchyResultListField
            name="jobCodeOptions"
            title={t("Job code")}
            marginLevel={1}
            isActionDisabled={isActionDisabled}
          />
          <HierarchyResultListField
            name="salaryAdminPlanOptions"
            title={t("Salary Plan")}
            marginLevel={1}
            isActionDisabled={isActionDisabled}
          />
          <HierarchyResultListField
            name="employeeTypeOptions"
            title={t("ประเภทพนักงาน")}
            marginLevel={1}
            isActionDisabled={isActionDisabled}
          />
          <HierarchyResultListField
            name="employeeClassificationOptions"
            title={t("Emp Class")}
            marginLevel={1}
            isActionDisabled={isActionDisabled}
          />
          <HierarchyResultListField
            name="positionLevelOptions"
            title={t("Supervisor Level")}
            marginLevel={1}
            isActionDisabled={isActionDisabled}
          />
        </ResultListLayout>
      )}
    </>
  )
}

type IHierarchyResultListProps = {
  title: string
  value: ISelectedOption
  marginLevel?: number
  isActionDisabled?: boolean
  onRemoveItemClick?: (option: IBaseStructureOption) => void
  onRemoveAllItemClick?: () => void
  onRemoveIncludeNullClick?: () => void
}
const HierarchyResultList = (props: IHierarchyResultListProps) => {
  const {
    // fieldName,
    title,
    value,
    marginLevel = 0,
    isActionDisabled = false,
    onRemoveAllItemClick,
    onRemoveItemClick,
    onRemoveIncludeNullClick,
  } = props
  const { selectOptions, excludeOptions, isCheckedAll, isIncludeNull } = value

  const { t } = useTranslation()

  const data = useMemo(() => {
    if (isCheckedAll) return parseOptionHashToValuesArray(excludeOptions)
    else return parseOptionHashToValuesArray(selectOptions)
  }, [isCheckedAll, excludeOptions, selectOptions])

  const handleRemoveItemClick = useCallback(
    (option: IBaseStructureOption) => {
      onRemoveItemClick?.(option)
    },
    [onRemoveItemClick],
  )

  const handleRemoveAllItemClick = useCallback(() => {
    onRemoveAllItemClick?.()
  }, [onRemoveAllItemClick])

  // useEffect(() => {
  //   console.debug({
  //     fieldName,
  //     isCheckedAll,
  //     selectOptions,
  //   })
  // }, [fieldName, isCheckedAll, selectOptions])

  return data?.length || isCheckedAll ? (
    <HierarchyListLayout marginLeft={`${Math.max(marginLevel - 1, 0) * 32}px`}>
      <HierarchyListTitle>{title}</HierarchyListTitle>
      <HierarchyListItemLayout>
        {isCheckedAll ? (
          <>
            <HierarchyListItem>
              <Sarabun type="Body1" color={`${WHITE}`}>
                {t(`ทุก${title}${data?.length ? ` - (${t("ยกเว้น")})` : ""}`)}
              </Sarabun>
              {!isActionDisabled && (
                <Icon
                  className="close-icon"
                  iconName="xCircleWhite"
                  width={20}
                  height={20}
                  onClick={handleRemoveAllItemClick}
                />
              )}
            </HierarchyListItem>
            {isIncludeNull && (
              <HierarchyListItem
                sx={{ marginLeft: 4, background: `${GRAYSCALE_DARKGRAY_60} !important` }}
              >
                <Sarabun type="Body1" color={`${WHITE}`}>
                  {t("ไม่ระบุ")}
                </Sarabun>
                {!isActionDisabled && (
                  <Icon
                    iconName="xCircleWhite"
                    width={20}
                    height={20}
                    onClick={onRemoveIncludeNullClick}
                  />
                )}
              </HierarchyListItem>
            )}
            {map(data, (option) => {
              const { id, name } = option
              return (
                <HierarchyListItem
                  key={id}
                  sx={{ marginLeft: 4, background: `${GRAYSCALE_DARKGRAY_60} !important` }}
                >
                  <Sarabun type="Body1" color={`${WHITE}`}>
                    {`${name}`}
                  </Sarabun>
                  {!isActionDisabled && (
                    <Icon
                      iconName="xCircleWhite"
                      width={20}
                      height={20}
                      onClick={handleRemoveItemClick?.bind(null, option)}
                    />
                  )}
                </HierarchyListItem>
              )
            })}
          </>
        ) : (
          <>
            {isIncludeNull && (
              <HierarchyListItem>
                <Sarabun type="Body1" color={`${WHITE}`}>
                  {t("ไม่ระบุ")}
                </Sarabun>
                {!isActionDisabled && (
                  <Icon
                    iconName="xCircleWhite"
                    width={20}
                    height={20}
                    onClick={onRemoveIncludeNullClick}
                  />
                )}
              </HierarchyListItem>
            )}
            {map(data, (option) => {
              const { id, name } = option
              return (
                <HierarchyListItem key={id}>
                  <Sarabun type="Body1" color={`${WHITE}`}>{`${name}`}</Sarabun>
                  {!isActionDisabled && (
                    <Icon
                      iconName="xCircleWhite"
                      width={20}
                      height={20}
                      onClick={handleRemoveItemClick?.bind(null, option)}
                    />
                  )}
                </HierarchyListItem>
              )
            })}
          </>
        )}
      </HierarchyListItemLayout>
    </HierarchyListLayout>
  ) : (
    <></>
  )
}

interface IHierarchyResultListFieldProps
  extends Omit<IHierarchyResultListProps, "value" | "onRemoveItemClick" | "onRemoveAllItemClick"> {
  name: ISelectEmployeeFormValuesKey
}

export const HierarchyResultListField = (props: IHierarchyResultListFieldProps) => {
  const { name, ...restProps } = props
  const form = useForm()

  const handleOnRemoveItem = useCallback(
    (input: FieldRenderProps<ISelectedOption>["input"]) => (itemTarget: IBaseStructureOption) => {
      const { id } = itemTarget
      form.change(`${input.name}.selectOptions.${id}`, null)
      form.change(`${input.name}.excludeOptions.${id}`, null)
    },
    [form],
  )
  const handleOnRemoveAllItem = useCallback(
    (input: FieldRenderProps<ISelectedOption>["input"]) => () => {
      const { onChange } = input
      onChange?.({
        isCheckedAll: false,
        isIncludeNull: false,
        selectOptions: {},
        excludeOptions: {},
      })
    },
    [],
  )

  const onRemoveIncludeNullClick = useCallback(() => {
    form.change(`${name}.isIncludeNull`, false)
  }, [form, name])

  return (
    <Field<ISelectedOption> name={name} subscription={{ value: true, initial: true }}>
      {({ input }) => {
        const { value } = input
        return (
          <HierarchyResultList
            {...restProps}
            value={value}
            onRemoveItemClick={handleOnRemoveItem(input)}
            onRemoveAllItemClick={handleOnRemoveAllItem(input)}
            onRemoveIncludeNullClick={onRemoveIncludeNullClick}
          />
        )
      }}
    </Field>
  )
}

export default SelectHierarchyGroupResult
