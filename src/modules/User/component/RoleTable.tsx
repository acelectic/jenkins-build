import styled from "styled-components/macro"
import { useTranslation } from "react-i18next"
import Table from "../../../components/common/Table"
import {
  GRAYSCALE_DARKGRAY_60,
  GRAYSCALE_LIGHTGRAY_20,
  SEMANTIC_SUCCESS_MAIN,
} from "../../../constants/colors"
import HeaderSortable from "../../../components/common/HeaderSortable"
import Sarabun from "../../../components/common/Sarabun"
import { useCallback, useMemo, useState } from "react"
import { AutoCompleteField } from "../../../components/fields"
import Button from "../../../components/common/Button"
import { Role } from "../../../services/role/role-type"
import { useGetAutoCompleteRoleOptions } from "../../../services/user/user-query"
import { Field, useForm, useFormState } from "react-final-form"
import { FieldArray, FieldArrayRenderProps } from "react-final-form-arrays"
import Icon from "../../../components/common/Icon"
import debounce from "debounce-promise"
import { RoleAutoCompleteResponse } from "../../../services/user/user-type"
import ConfirmDelModal from "./ConfirmDelModal"

const SearchBox = styled.div`
  display: flex;
  align-items: end;
  width: 100%;
  gap: 16px;
  margin-bottom: 16px;
`

const RowGap = styled.div<{
  gap?: number
  padding?: number
}>`
  display: flex;
  flex-direction: row;
  gap: ${({ gap }) => `${gap}px`};
  padding: ${({ padding }) => `${padding}px`};
  width: 100%;
  align-items: center;
`

const GreenDot = styled.div`
  display: flex;
  border-radius: 50%;
  background-color: ${SEMANTIC_SUCCESS_MAIN};
  height: 8px;
  width: 8px;
  margin-left: 8px;
`
const GrayDot = styled.div`
  display: flex;
  border-radius: 50%;
  background-color: ${GRAYSCALE_DARKGRAY_60};
  height: 8px;
  width: 8px;
  margin-left: 8px;
`

type RoleProps = {
  editMode?: boolean
  roles?: Role[]
  userId: string
  orderState: [string, React.Dispatch<React.SetStateAction<string>>]
}

const makeRoleOptions = (data: RoleAutoCompleteResponse["myRoles"]): BaseOptionType[] => {
  return data?.map((role) => {
    return {
      label: `${role.name}`,
      value: role.id,
    }
  })
}

const RoleTable = (props: RoleProps) => {
  const { editMode = false, userId, orderState } = props
  const { t } = useTranslation()
  const formState = useFormState()
  const { values } = formState
  const form = useForm()
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)

  const [sortingKey, setSortingKey] = useState("")
  const [orderBy, setOrderBy] = orderState
  const onSorting = useCallback(
    (title) => {
      setSortingKey(title)
      orderBy === "name_desc" ? setOrderBy("name_asc") : setOrderBy("name_desc")
    },
    [orderBy, setOrderBy],
  )

  const { data, mutateAsync: getAsyncRoleOptions } = useGetAutoCompleteRoleOptions(userId)

  const roleOptions = useMemo(() => {
    return makeRoleOptions(data || [])
  }, [data])

  const loadRoleOptions = useCallback(
    async (value: string) => {
      const data = await getAsyncRoleOptions({ limit: Number(5), q: value })
      return makeRoleOptions(data || [])
    },
    [getAsyncRoleOptions],
  )

  const onclickAddRole = useCallback(() => {
    const _items: any[] = values.myRoles
    const targetRole = data?.find((role) => role.id === values.searchRole)
    _items.push({
      id: targetRole?.id,
      name: targetRole?.name,
      isActive: targetRole?.isActive,
    })
    form.change("myRoles", _items)
    form.change("searchRole", undefined)
    form.change("isEditRole", true)
  }, [data, form, values.myRoles, values.searchRole])

  const onclickRemove = useCallback(
    (fields: FieldArrayRenderProps<any, HTMLElement>["fields"], index: number) => {
      form.change("isEditRole", true)
      fields.remove(index)
      setIsOpenDeleteModal(false)
    },
    [form],
  )

  const onClickOpenModalDelete = useCallback(() => {
    setIsOpenDeleteModal(true)
  }, [])

  const onClickCloseModalDelete = useCallback(() => {
    setIsOpenDeleteModal(false)
  }, [])

  return (
    <>
      {editMode && (
        <SearchBox>
          <AutoCompleteField
            name="searchRole"
            label={""}
            placeholder={t(`ค้นหา`)}
            loadOptions={debounce(loadRoleOptions, 200)}
            options={roleOptions}
            style={{ width: "100%" }}
          />
          <Button
            height={48}
            width={146}
            onClick={onclickAddRole}
            isDisabledButton={!!!values.searchRole}
          >
            {t(`เพิ่มบทบาท`)}
          </Button>
        </SearchBox>
      )}

      <Table isBordered hidePaginate>
        <Table.Head>
          <Table.Row style={{ backgroundColor: GRAYSCALE_LIGHTGRAY_20 }}>
            <Table.Cell width={"10%"} style={{ minWidth: "100px" }}>
              <Sarabun type="Subtitle1">{t("ลำดับ")}</Sarabun>
            </Table.Cell>
            <Table.Cell width={"65%"}>
              {editMode ? (
                <Sarabun type="Subtitle1">{t("ชื่อบทบาท")}</Sarabun>
              ) : (
                <HeaderSortable
                  title={t("ชื่อบทบาท")}
                  sortingKey={sortingKey}
                  onSorting={onSorting}
                />
              )}
            </Table.Cell>
            <Table.Cell width={"20%"}>
              <Sarabun type="Subtitle1">{t("สถานะ")}</Sarabun>
            </Table.Cell>
            <Table.Cell width={"5%"}></Table.Cell>
          </Table.Row>
        </Table.Head>
        {!!values.myRoles.length ? (
          <Table.Body>
            <FieldArray name={`myRoles`}>
              {({ fields }) => {
                return fields.map((fieldName, index) => {
                  return (
                    <Table.Row key={index}>
                      <Table.Cell>
                        <Sarabun type="Body2">{`${index + 1}`}</Sarabun>
                      </Table.Cell>
                      <Table.Cell>
                        <Field name={`${fieldName}.name`}>
                          {({ input }) => {
                            return <Sarabun type="Body2"> {`${input.value}`}</Sarabun>
                          }}
                        </Field>
                      </Table.Cell>
                      <Table.Cell>
                        <Field name={`${fieldName}.isActive`}>
                          {({ input }) => {
                            return input.value ? (
                              <RowGap gap={8}>
                                <GreenDot />
                                <Sarabun color={SEMANTIC_SUCCESS_MAIN}>{t("ใช้งาน")}</Sarabun>
                              </RowGap>
                            ) : (
                              <RowGap gap={8}>
                                <GrayDot />
                                <Sarabun color={GRAYSCALE_DARKGRAY_60}>{t("ไม่ใช้งาน")}</Sarabun>
                              </RowGap>
                            )
                          }}
                        </Field>
                      </Table.Cell>
                      {editMode ? (
                        <Table.Cell onClick={onClickOpenModalDelete} style={{ cursor: "pointer" }}>
                          <Icon iconName="trash" width={20} height={20} />
                        </Table.Cell>
                      ) : (
                        <Table.Cell></Table.Cell>
                      )}
                      <ConfirmDelModal
                        showModal={isOpenDeleteModal}
                        setShowModal={setIsOpenDeleteModal}
                        onOk={onclickRemove.bind(null, fields, index)}
                        onClose={onClickCloseModalDelete}
                      />
                    </Table.Row>
                  )
                })
              }}
            </FieldArray>
          </Table.Body>
        ) : (
          <Table.Body>
            <Table.Row>
              <Table.Cell align="center" colSpan={5}>
                <Sarabun type="Subtitle1" color="#D7D9E0">
                  {t("role.noData")}
                </Sarabun>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        )}
      </Table>
    </>
  )
}

export default RoleTable
