import styled from "@emotion/styled"
import debounce from "debounce-promise"
import { useCallback, useMemo, useState } from "react"
import { Field, useForm, useFormState } from "react-final-form"
import { FieldArray, FieldArrayRenderProps } from "react-final-form-arrays"
import { useTranslation } from "react-i18next"
import Button from "../../../components/common/Button"
import HeaderSortable from "../../../components/common/HeaderSortable"
import Icon from "../../../components/common/Icon"
import LoadingLayout from "../../../components/common/LoadingLayout"
import Sarabun from "../../../components/common/Sarabun"
import Table from "../../../components/common/Table"
import { AutoCompleteField } from "../../../components/fields"
import { GRAYSCALE_LIGHTGRAY_20 } from "../../../constants/colors"
import { MyCrewOrder } from "../../../services/enum-typed"
import { useGetAutoCompleteCrewOptions, useGetUserPage } from "../../../services/user/user-query"
import { CrewAutoCompleteResponse, ParamUserPage } from "../../../services/user/user-type"
import { useScreen } from "../../../utils/responsive-helper"

const TitleHeaderBox = styled.div`
  display: flex;
  gap: 16px;
`

const SearchBox = styled.div`
  display: flex;
  align-items: end;
  width: 50%;
  gap: 16px;
  margin-bottom: 16px;
`
const TableBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`

export type ICrewProps = {
  editMode?: boolean
  userId: string
}

const makeCrewOptions = (data: CrewAutoCompleteResponse["users"]): BaseOptionType[] => {
  return data?.map((user) => {
    return {
      label: `${user.employeeId} ${user.firstName} ${user.lastName}`,
      value: user.id,
    }
  })
}

const CrewTable = (props: ICrewProps) => {
  const { editMode = false, userId } = props
  const { isTablet } = useScreen()
  const { t } = useTranslation()
  const formState = useFormState()
  const { values } = formState
  const form = useForm()
  const [sortingKey, setSortingKey] = useState("")
  const [orderBy, setOrderBy] = useState(MyCrewOrder.NAME_ASC)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const onChangePage = useCallback(
    (page: number) => {
      setPage(page)
    },
    [setPage],
  )
  const onChangeRowsPerPage = useCallback(
    (rowsPerPage: number) => {
      setPageSize(rowsPerPage)
      setPage(1)
    },
    [setPage, setPageSize],
  )

  const onSorting = useCallback(
    (title) => {
      setSortingKey(title)
      switch (title) {
        case t("roleDetail.employeeId"): {
          orderBy === MyCrewOrder.EMP_ID_DESC
            ? setOrderBy(MyCrewOrder.EMP_ID_ASC)
            : setOrderBy(MyCrewOrder.EMP_ID_DESC)
          break
        }
        case t("roleDetail.position"): {
          orderBy === MyCrewOrder.POSITION_NAME_DESC
            ? setOrderBy(MyCrewOrder.POSITION_NAME_ASC)
            : setOrderBy(MyCrewOrder.POSITION_NAME_DESC)
          break
        }
        case t("roleDetail.store"): {
          orderBy === MyCrewOrder.STORE_NAME_DESC
            ? setOrderBy(MyCrewOrder.STORE_NAME_ASC)
            : setOrderBy(MyCrewOrder.STORE_NAME_DESC)
          break
        }
        default: {
          orderBy === MyCrewOrder.NAME_DESC
            ? setOrderBy(MyCrewOrder.NAME_ASC)
            : setOrderBy(MyCrewOrder.NAME_DESC)
          break
        }
      }
    },
    [orderBy, t],
  )

  const paramsUser: ParamUserPage = {
    users: { isSelected: false, limit: 1 },
    userDetail: {
      isSelected: false,
    },
    myCrews: {
      isSelected: true,
      userId: userId,
      limit: pageSize,
      page: page,
      orderBy: orderBy,
    },
    myRoles: { isSelected: false },
  }
  const { data: myCrewData, isLoading: isUserDetailLoading } = useGetUserPage(paramsUser)

  const { data, mutateAsync: getAsyncCrewOptions } = useGetAutoCompleteCrewOptions(userId)

  const myCrews = useMemo(() => {
    return myCrewData?.myCrews?.myCrews
  }, [myCrewData?.myCrews?.myCrews])

  const crewOptions = useMemo(() => {
    return makeCrewOptions(data || [])
  }, [data])

  const loadCrewOptions = useCallback(
    async (value: string) => {
      const data = await getAsyncCrewOptions({ limit: Number(5), q: value })
      return makeCrewOptions(data || [])
    },
    [getAsyncCrewOptions],
  )

  const onClickAddCrew = useCallback(() => {
    const targetCrew = data?.find((user) => user.id === values.searchCrew)
    const _items: any[] = values.newMyCrew
    _items.push({
      id: values.searchCrew,
      eId: targetCrew?.employeeId,
      name: `${targetCrew?.prefix} ${targetCrew?.firstName} ${targetCrew?.lastName}`,
      positionName: targetCrew?.positionName,
      storeName: targetCrew?.storeName,
    })
    form.change("newMyCrew", _items)
    form.change("searchCrew", undefined)
  }, [data, form, values.newMyCrew, values.searchCrew])

  const onclickRemove = useCallback(
    (fields: FieldArrayRenderProps<any, HTMLElement>["fields"], index: number) => {
      fields.remove(index)
    },
    [],
  )

  return (
    <LoadingLayout isLoading={isUserDetailLoading}>
      {editMode && (
        <TitleHeaderBox>
          <SearchBox>
            <AutoCompleteField
              name="searchCrew"
              label={""}
              placeholder={t(`ค้นหา`)}
              loadOptions={debounce(loadCrewOptions, 200)}
              options={crewOptions}
              style={{ width: "100%" }}
            />
            <Button
              height={25}
              width={146}
              onClick={onClickAddCrew}
              isDisabledButton={!!!values.searchCrew}
            >
              {t(`เพิ่มลูกทีม`)}
            </Button>
          </SearchBox>
        </TitleHeaderBox>
      )}

      {editMode && (
        <TitleHeaderBox>
          <SearchBox>
            <Sarabun type="H5">{t("ลูกทีมเพิ่มใหม่")}</Sarabun>
          </SearchBox>
          <SearchBox>
            <Sarabun type="H5">{t("ลูกทีมปัจจุบัน")}</Sarabun>
          </SearchBox>
        </TitleHeaderBox>
      )}

      <TableBox style={{ flexDirection: isTablet ? "column" : "row" }}>
        {editMode && (
          <Table isBordered hidePaginate style={{ width: isTablet ? "100%" : "50%" }}>
            <Table.Head>
              <Table.Row style={{ backgroundColor: GRAYSCALE_LIGHTGRAY_20 }}>
                <Table.Cell width={"20%"} style={{ paddingLeft: "8px" }}>
                  <Sarabun type="Subtitle1">{t("roleDetail.employeeId")}</Sarabun>
                </Table.Cell>
                <Table.Cell width={"25%"}>
                  <Sarabun type="Subtitle1">{t("roleDetail.name")}</Sarabun>
                </Table.Cell>
                <Table.Cell width={"25%"}>
                  <Sarabun type="Subtitle1">{t("roleDetail.position")}</Sarabun>
                </Table.Cell>
                <Table.Cell width={"25%"}>
                  <Sarabun type="Subtitle1">{t("หน่วยงาน")}</Sarabun>
                </Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
            </Table.Head>
            {!!values.newMyCrew.length ? (
              <Table.Body>
                <FieldArray name={"newMyCrew"}>
                  {({ fields }) => {
                    return fields.map((fieldName, index) => {
                      return (
                        <Table.Row key={index}>
                          <Table.Cell style={{ paddingLeft: "8px" }}>
                            <Field name={`${fieldName}.eId`}>
                              {({ input }) => {
                                return <Sarabun type="Body2">{`${input.value}`}</Sarabun>
                              }}
                            </Field>
                          </Table.Cell>
                          <Table.Cell>
                            <Field name={`${fieldName}.name`}>
                              {({ input }) => {
                                return <Sarabun type="Body2">{`${input.value}`}</Sarabun>
                              }}
                            </Field>
                          </Table.Cell>
                          <Table.Cell>
                            <Field name={`${fieldName}.positionName`}>
                              {({ input }) => {
                                return <Sarabun type="Body2">{`${input.value}`}</Sarabun>
                              }}
                            </Field>
                          </Table.Cell>
                          <Table.Cell>
                            <Field name={`${fieldName}.storeName`}>
                              {({ input }) => {
                                return <Sarabun type="Body2">{`${input.value}`}</Sarabun>
                              }}
                            </Field>
                          </Table.Cell>
                          <Table.Cell
                            onClick={onclickRemove.bind(null, fields, index)}
                            style={{ cursor: "pointer" }}
                          >
                            <Icon iconName="trash" width={20} height={20} />
                          </Table.Cell>
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
        )}

        <Table
          isBordered
          page={page}
          onChangeRowsPerPage={onChangeRowsPerPage}
          totalSize={myCrewData?.myCrews.paging.totalRecords}
          onChangePage={onChangePage}
          initRowsPerPage={10}
          style={{ width: editMode ? (isTablet ? "100%" : "50%") : "100%" }}
          hidePaginate={!!myCrews?.length ? false : true}
        >
          <Table.Head>
            <Table.Row style={{ backgroundColor: GRAYSCALE_LIGHTGRAY_20 }}>
              {!editMode && (
                <Table.Cell width={"10%"} style={{ paddingLeft: "8px" }}>
                  <Sarabun type="Subtitle1">{t("ลำดับ")}</Sarabun>
                </Table.Cell>
              )}

              <Table.Cell width={"20%"} style={{ paddingLeft: editMode ? "8px" : "" }}>
                <HeaderSortable
                  title={t("roleDetail.employeeId")}
                  sortingKey={sortingKey}
                  onSorting={onSorting}
                />
              </Table.Cell>
              <Table.Cell width={"25%"}>
                <HeaderSortable
                  title={t("roleDetail.name")}
                  sortingKey={sortingKey}
                  onSorting={onSorting}
                />
              </Table.Cell>
              <Table.Cell width={"25%"}>
                <HeaderSortable
                  title={t("roleDetail.position")}
                  sortingKey={sortingKey}
                  onSorting={onSorting}
                />
              </Table.Cell>
              <Table.Cell width={"25%"}>
                <HeaderSortable
                  title={t("roleDetail.store")}
                  sortingKey={sortingKey}
                  onSorting={onSorting}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Head>
          {!!myCrews?.length ? (
            <Table.Body>
              {myCrews?.map((user, index) => {
                return (
                  <Table.Row key={index}>
                    {!editMode && (
                      <Table.Cell style={{ paddingLeft: "8px" }}>
                        <Sarabun type="Body2">{`${index + 1 + (page - 1) * pageSize}`}</Sarabun>
                      </Table.Cell>
                    )}
                    <Table.Cell style={{ paddingLeft: editMode ? "8px" : "" }}>
                      <Sarabun type="Body2"> {`${user.employeeId}`}</Sarabun>
                    </Table.Cell>
                    <Table.Cell>
                      <Sarabun type="Body2">{`${user.prefix} ${user.firstName} ${user.lastName}`}</Sarabun>
                    </Table.Cell>
                    <Table.Cell>
                      <Sarabun type="Body2">{`${user.positionName}`}</Sarabun>
                    </Table.Cell>
                    <Table.Cell>
                      <Sarabun type="Body2">{`${user.storeName}`}</Sarabun>
                    </Table.Cell>
                  </Table.Row>
                )
              })}
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
      </TableBox>
    </LoadingLayout>
  )
}

export default CrewTable
