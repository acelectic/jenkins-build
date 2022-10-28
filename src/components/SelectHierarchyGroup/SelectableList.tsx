import styled from "@emotion/styled"
import {
  ChangeEvent,
  useCallback,
  useState,
  KeyboardEvent,
  useMemo,
  MouseEvent,
  useEffect,
} from "react"
import { Field, FieldInputProps, useForm, useFormState } from "react-final-form"
import Checkbox from "../common/Checkbox"
import Sarabun from "../common/Sarabun"
import { Box } from "@mui/system"
import { get } from "lodash"
import { ISelectedOption, ISelectHierarchyGroupFormValues } from "./interface"
import { InputField, WatchValueField } from "../fields"
import { useTranslation } from "react-i18next"
import { GRAYSCALE_DARKGRAY_80, PRIMARY_DARK, TEXT_DARK } from "../../constants/colors"
import { IBaseStructureOption } from "../../services/group-employee/group-employee-type"
import { CircularProgress, TablePagination } from "@mui/material"
import { OnChange } from "react-final-form-listeners"
import { format2DecimalNumber } from "../../utils/helper"
import Icon from "../common/Icon"
import { parseOptionHashToValuesArray, defaultRowsPerPageOptions } from "./helper"

const CheckBoxRow = styled(Box)<{ disabled?: boolean }>`
  display: flex;
  flex: 1;

  filter: ${({ disabled }) => (disabled ? "opacity(0.55)" : "unset")};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`

const InputSearchZone = styled.div`
  display: flex;
  > div {
    width: 100%;
  }
`

const CheckBoxZone = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
`

const CheckBoxListContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  position: relative;
  grid-row-gap: 2px;
  overflow-y: auto;
`

const PaginateLayout = styled(Box)`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  grid-column-gap: 10px;
  margin: auto;
  margin-bottom: 0;
`

const ClearRow = styled(Box)<{ disabled?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding-left: 10px;
  margin-top: 8px;
  > div {
    :hover {
      cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
    }
  }

  filter: ${({ disabled }) => (disabled ? "opacity(0.55)" : "unset")};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`
const CircularProgressStyled = styled(CircularProgress)`
  color: ${GRAYSCALE_DARKGRAY_80};
`

// const RenderCount = () => {
//   const countRef = useRef(0)
//   return <div>{countRef.current++}</div>
// }

type ISelectableListProps = {
  fieldName: keyof ISelectHierarchyGroupFormValues
  options: IBaseStructureOption[]
  onSearch?: (q: string) => void
  paging?: PagingDataInf
  onPageChange?: (page: number) => void
  onRowsPerPageChange?: (page: number) => void
  limit?: number
  hidePaginate?: boolean
  isFetching?: boolean
  onCheckedAllChange?: (isCheckedAll: boolean) => void
  isLocalSearch?: boolean
  searchPlaceholder: string
  clearRelateOptions?: () => void
  selectedLimit?: number
  isHideSelectAll?: boolean
  rowsPerPageOptions?: number[]
  isShowNullValue?: boolean
}
const SelectableList = (props: ISelectableListProps) => {
  const {
    fieldName,
    options,
    onSearch,
    paging,
    onPageChange,
    onRowsPerPageChange,
    limit,
    onCheckedAllChange,
    hidePaginate = false,
    isLocalSearch = false,
    searchPlaceholder,
    clearRelateOptions,
    isFetching = false,
    selectedLimit,
    isHideSelectAll = false,
    rowsPerPageOptions = defaultRowsPerPageOptions,
    isShowNullValue = false,
  } = props
  const { t } = useTranslation()
  const [q, setQ] = useState("")
  const [qLocalSearch, setQLocalSearch] = useState("")
  const form = useForm()
  const formState = useFormState<ISelectHierarchyGroupFormValues>()
  const { values: formValues } = formState

  const totalOptions = useMemo(() => {
    return paging?.totalRecords || 0
  }, [paging?.totalRecords])

  const fieldValues = useMemo(() => {
    return get(formValues || {}, fieldName) as ISelectedOption
  }, [fieldName, formValues])

  const optionsFiltered = useMemo(() => {
    const tempOptions = options || []
    if (isLocalSearch && qLocalSearch) {
      return tempOptions.filter(
        (d) => d.code?.includes(qLocalSearch) || d.description?.includes(qLocalSearch),
      )
    } else {
      return tempOptions
    }
  }, [isLocalSearch, options, qLocalSearch])

  const handlePageChange = useCallback(
    (event: MouseEvent<HTMLButtonElement> | null, page: number) => {
      onPageChange?.(page + 1)
    },
    [onPageChange],
  )

  const handleChangeRowsPerPage = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      onRowsPerPageChange?.(parseInt(event.target.value, 10))
      onPageChange?.(1)
    },
    [onPageChange, onRowsPerPageChange],
  )

  const onSearchKeyPress = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter") {
        onSearch?.(q)
        if (isLocalSearch) {
          setQLocalSearch(q)
        }
      }
    },
    [isLocalSearch, onSearch, q],
  )

  const handleCheckAllClick = useCallback(
    (isCheckedAll: boolean) => {
      if (onCheckedAllChange) {
        onCheckedAllChange?.(isCheckedAll)
      } else {
        form.change(`${fieldName}.isCheckedAll`, !!isCheckedAll)
        if (isCheckedAll) {
          form.change(`${fieldName}.isIncludeNull`, false)
          form.change(`${fieldName}.selectOptions`, {})
        } else {
          form.change(`${fieldName}.isIncludeNull`, false)
          form.change(`${fieldName}.excludeOptions`, {})
        }
      }
      clearRelateOptions?.()
    },
    [clearRelateOptions, fieldName, form, onCheckedAllChange],
  )

  const canSelectedOptions = useMemo(() => {
    return !!options?.length && !isFetching
  }, [isFetching, options?.length])

  const isDisableOnSelectedLimit = useMemo(() => {
    const { selectOptions } = get(formValues || {}, `${fieldName}`, {}) as ISelectedOption
    const selectOptionList = parseOptionHashToValuesArray(selectOptions)
    return selectedLimit ? selectOptionList.length >= selectedLimit : false
  }, [fieldName, formValues, selectedLimit])

  const isIndeterminate = useMemo(() => {
    if (fieldValues?.isCheckedAll) {
      if (!!parseOptionHashToValuesArray(fieldValues?.excludeOptions).length) {
        return true
      }
      if (
        parseOptionHashToValuesArray(fieldValues?.selectOptions).length &&
        parseOptionHashToValuesArray(fieldValues?.selectOptions).length < options?.length
      ) {
        return true
      }
    }

    return false
  }, [
    fieldValues?.excludeOptions,
    fieldValues?.isCheckedAll,
    fieldValues?.selectOptions,
    options?.length,
  ])

  const handleCheckBoxClick = useCallback(
    (isCheckedAll: boolean, option: IBaseStructureOption, isCurrentOptionChecked: boolean) => {
      const { id } = option
      // console.debug({
      //   tag: "handleCheckBoxClick",
      //   fieldName,
      //   isCheckedAll,
      //   isCurrentOptionChecked,
      //   option,
      // })
      if (isCheckedAll) {
        if (onCheckedAllChange) {
          form.change(`${fieldName}.selectOptions.${id}`, isCurrentOptionChecked ? null : option)
          form.change(`${fieldName}.excludeOptions.${id}`, isCurrentOptionChecked ? option : null)
        } else {
          form.change(`${fieldName}.selectOptions`, {})
          form.change(`${fieldName}.excludeOptions.${id}`, isCurrentOptionChecked ? option : null)
        }
      } else {
        form.change(`${fieldName}.selectOptions.${id}`, isCurrentOptionChecked ? null : option)
        form.change(`${fieldName}.excludeOptions`, {})
      }
      clearRelateOptions?.()
    },
    [clearRelateOptions, fieldName, form, onCheckedAllChange],
  )

  const onClearSelectedClick = useCallback(
    (input: FieldInputProps<ISelectedOption, HTMLInputElement>) => {
      input.onChange({
        isCheckedAll: false,
        isIncludeNull: false,
        selectOptions: {},
        excludeOptions: {},
      })
      clearRelateOptions?.()
      onSearch?.("")
      if (isLocalSearch) {
        setQLocalSearch("")
      }
    },
    [clearRelateOptions, isLocalSearch, onSearch],
  )

  const isDisableCheckedAll = useMemo(() => {
    return (
      !canSelectedOptions ||
      selectedLimit === 1 ||
      isDisableOnSelectedLimit ||
      !!q ||
      !!qLocalSearch
    )
  }, [canSelectedOptions, isDisableOnSelectedLimit, q, qLocalSearch, selectedLimit])

  useEffect(() => {
    form.change(`${fieldName}.isShowNullValue`, !!isShowNullValue)
  }, [isShowNullValue, form, fieldName])

  return (
    <>
      <InputSearchZone>
        <InputField
          name={`${fieldName}.q`}
          startIcon={true}
          IconName={"searchGlass"}
          placeholder={searchPlaceholder}
          subscription={{ value: true }}
          onKeyPress={onSearchKeyPress}
        />
        <OnChange name={`${fieldName}.q`}>
          {(value) => {
            setQ(value)
          }}
        </OnChange>
      </InputSearchZone>
      <CheckBoxZone>
        {!isHideSelectAll && (
          <CheckBoxRow disabled={isDisableCheckedAll}>
            <Field<boolean>
              name={`${fieldName}.isCheckedAll`}
              subscription={{ value: true, initial: true }}
            >
              {({ input }) => {
                const isCheckedAll = input.value
                return (
                  <Checkbox
                    checked={!!input.value}
                    label={<Sarabun type="Body1">{t("เลือกทั้งหมด")}</Sarabun>}
                    onChange={() => {
                      const newIsCheckedAll = !isCheckedAll
                      handleCheckAllClick(newIsCheckedAll)
                    }}
                    disabled={isDisableCheckedAll}
                    indeterminate={isIndeterminate}
                  />
                )
              }}
            </Field>
          </CheckBoxRow>
        )}

        {!isFetching && options?.length ? (
          <WatchValueField<boolean> name={`${fieldName}.isCheckedAll`}>
            {(isCheckedAll) => {
              return (
                <>
                  {isShowNullValue && (
                    <CheckBoxRow disabled={!canSelectedOptions || isDisableOnSelectedLimit}>
                      <Field<boolean>
                        name={`${fieldName}.isIncludeNull`}
                        subscription={{ value: true, initial: true }}
                      >
                        {({ input }) => {
                          const isIncludeNull = input.value
                          let isOptionChecked = false
                          if (isCheckedAll) {
                            isOptionChecked = !isIncludeNull
                          } else {
                            isOptionChecked = !!isIncludeNull
                          }
                          return (
                            <Checkbox
                              checked={!!isOptionChecked}
                              label={<Sarabun type="Body1">{t("ไม่ระบุ")}</Sarabun>}
                              onChange={input.onChange.bind(null, !isIncludeNull)}
                              disabled={
                                !canSelectedOptions ||
                                selectedLimit === 1 ||
                                isDisableOnSelectedLimit ||
                                !!q ||
                                !!qLocalSearch
                              }
                            />
                          )
                        }}
                      </Field>
                    </CheckBoxRow>
                  )}
                  <CheckBoxListContainer>
                    {optionsFiltered?.map((option, index) => {
                      const { id, name, disabled: isDisabled } = option

                      let isOptionChecked = false
                      if (isCheckedAll) {
                        isOptionChecked = !fieldValues?.excludeOptions?.[id]
                      } else {
                        isOptionChecked = !!fieldValues?.selectOptions?.[id]
                      }

                      if (onCheckedAllChange) {
                        isOptionChecked = !!fieldValues?.selectOptions?.[id]
                      }

                      if (isDisabled) {
                        isOptionChecked = false
                      }
                      return (
                        <CheckBoxRow
                          key={id}
                          onClick={handleCheckBoxClick.bind(
                            null,
                            !!isCheckedAll,
                            option,
                            isOptionChecked,
                          )}
                          disabled={(isDisableOnSelectedLimit && !isOptionChecked) || isDisabled}
                        >
                          <Box
                            display="flex"
                            flexDirection="row"
                            columnGap="10px"
                            style={{
                              cursor: "pointer",
                            }}
                          >
                            <Checkbox
                              value={isOptionChecked}
                              label={<Sarabun type="Body1">{` ${name || "-"}`}</Sarabun>}
                            />
                          </Box>
                        </CheckBoxRow>
                      )
                    })}
                  </CheckBoxListContainer>
                </>
              )
            }}
          </WatchValueField>
        ) : isFetching ? (
          <Box display="flex" justifyContent="center" padding="20px">
            <CircularProgressStyled size={24} />
          </Box>
        ) : (
          <Box width="100%" display="flex" justifyContent="center" marginTop="12px">
            <Sarabun type="Subtitle1" color={`${TEXT_DARK}`}>
              {t("ไม่มีข้อมูล")}
            </Sarabun>
          </Box>
        )}
      </CheckBoxZone>
      <Field<ISelectedOption> name={`${fieldName}`} subscription={{}}>
        {({ input }) => {
          return (
            <ClearRow
              onClick={onClearSelectedClick.bind(null, input)}
              disabled={!canSelectedOptions}
            >
              <Icon iconName="arrowCounter" width={16} height={16} />
              <Sarabun
                type="Subtitle2"
                color={`${PRIMARY_DARK}`}
                style={{ borderBottom: `1px solid ${PRIMARY_DARK}` }}
              >
                {t(`ล้างทั้งหมด`)}
              </Sarabun>
            </ClearRow>
          )
        }}
      </Field>
      <OnChange name={`${fieldName}.selectOptions`}>
        {(selectOptions) => {
          if (
            parseOptionHashToValuesArray(selectOptions)?.length === totalOptions &&
            totalOptions &&
            fieldValues?.isIncludeNull &&
            !q &&
            !qLocalSearch &&
            !onCheckedAllChange
          ) {
            handleCheckAllClick(true)
          }
        }}
      </OnChange>
      <OnChange name={`${fieldName}.excludeOptions`}>
        {(excludeOptions) => {
          if (
            parseOptionHashToValuesArray(excludeOptions)?.length === totalOptions &&
            totalOptions &&
            !fieldValues?.isIncludeNull &&
            !q &&
            !qLocalSearch &&
            !onCheckedAllChange
          ) {
            handleCheckAllClick(false)
          }
        }}
      </OnChange>
      <OnChange name={`${fieldName}.isIncludeNull`}>
        {() => {
          clearRelateOptions?.()
        }}
      </OnChange>
      {paging && !hidePaginate && canSelectedOptions ? (
        <PaginateLayout>
          <TablePagination
            sx={{
              borderBottomWidth: 0,
            }}
            page={paging?.currentPage ? Math.max(Number(paging?.currentPage) - 1, 0) : 0}
            labelDisplayedRows={({ from, to, count, page }) => {
              return `${format2DecimalNumber(from)}–${format2DecimalNumber(to)} of ${
                count !== -1 ? format2DecimalNumber(count) : `more than ${format2DecimalNumber(to)}`
              }`
            }}
            count={paging?.totalRecords || 0}
            onPageChange={handlePageChange}
            rowsPerPage={limit || 50}
            rowsPerPageOptions={rowsPerPageOptions}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </PaginateLayout>
      ) : null}
    </>
  )
}

export default SelectableList
