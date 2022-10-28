import { Box, Divider as MuiDivider } from "@mui/material"

import { spacing } from "@mui/system"
import styled from "styled-components/macro"

import Card from "../../../components/common/Card"
import { useCallback, useEffect, useMemo, useState } from "react"

import Table from "../../../components/common/Table"
import { InputField } from "../../../components/fields"
import { Form } from "react-final-form"
import { useGetRoleDetail } from "../../../services/role/role-query"
import { useTranslation } from "react-i18next"
import { RoleDetailItem, RolePermissions } from "../../../services/role/role-type"
import Sarabun from "../../../components/common/Sarabun"
import OldSarabun from "../../../components/common/OldSarabun"
import {
  GRAYSCALE_DARKGRAY_40,
  GRAYSCALE_DARKGRAY_60,
  GRAYSCALE_LIGHTGRAY_20,
  PRIMARY_MAIN,
} from "../../../constants/colors"
import Tag from "../../../components/common/Tag"
import Icon from "../../../components/common/Icon"
import HeaderSortable from "../../../components/common/HeaderSortable"
import { SortingState, UserInRoleOrderByOptions } from "../../../services/enum-typed"
import ActiveStatus from "./ActiveStatus"
import { isEmpty } from "lodash"

const BoxContent = styled(Box)`
  width: 90%;
  display: grid;
  grid-template-columns: 0.35fr 0.35fr;
  margin-top: 16px;
  margin-left: 8px;
`
const BoxTable = styled(Box)`
  margin-top: 16px;

  margin-right: 25px;
  min-width: 100px;
`

const BoxHeader = styled(Box)`
  margin-top: 24px;
  margin-right: 12px;
  margin-left: 12px;
  min-width: 557px;
`

const BoxAutoComplete = styled(Box)`
  margin-top: 16px;

  min-width: 372px;
  width: 372px;
`

const CardLayout = styled(Card)`
  min-width: 150px;
  margin-left: 0px;
  margin-right: 20px;
  margin-top: 25px;
  border: 1px solid;
  border-color: #dcdee5;
  .MuiCardContent-root {
    padding: unset;
  }
`
const BoxHeaderCard = styled(Box)`
  margin-left: 24px;
  margin-top: 8px;
  margin-bottom: 10px;
  min-width: 100px;
  max-width: 550px;
`
const BoxContentCard = styled(Box)`
  display: flex;

  padding-left: 32px;
  padding-top: 11px;
  padding-bottom: 11px;
  min-width: 520px;
`
const BoxPermissionCard = styled(Box)`
  display: flex;
`
const Divider = styled.div`
  margin: 0px 12px;
  width: 100%;
  height: 1px;
  background-color: ${GRAYSCALE_DARKGRAY_40};
`

export enum TagAction {
  ADD = "create",
  UPDATE = "update",
  DELETE = "delete",
  READ = "read",
  REPORT = "report",
  CALIBRATE = "calibrate",
}

type RoleViewDetailProps = {
  roleDetail: RoleDetailItem
  permissions: RolePermissions[]
}

const RoleViewDetail = (props: RoleViewDetailProps) => {
  const { roleDetail, permissions } = props
  const DividerMui = styled(MuiDivider)(spacing)

  const { t } = useTranslation()

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [q, setQ] = useState("")
  const [sortOrder, setSortOrder] = useState<UserInRoleOrderByOptions>()
  const [sortingKey, setSortingKey] = useState("")

  const { data: roleUsers } = useGetRoleDetail(roleDetail.id, {
    limit: limit,
    page: page,
    q: q,
    orderBy: sortOrder,
  })

  const userList = useMemo(() => {
    return roleUsers?.users
  }, [roleUsers?.users])

  // const {
  //   data: userOption = [],
  //   mutateAsync: getAsyncUserOptions,
  // } = useGetUserName({
  //   users: {
  //     isSelected: true,
  //     roleId: roleDetail.role.id,
  //     limit: 5,
  //     q: query,
  //   },
  // })
  // const onClickAutoComplete = useCallback((value) => {
  //   setUserList()
  // },[])

  useEffect(() => {
    setPage(1)
  }, [])

  // const loadUserOptions = useCallback(
  //   (value: string) => {
  //     return getAsyncUserOptions({ q: value, limit: pageSize })
  //   },
  //   [getAsyncUserOptions, pageSize]
  // )

  useEffect(() => {
    if (roleDetail.id) {
      setPage(1)
    }
  }, [roleDetail.id])

  const onChangePage = useCallback(
    (page: number) => {
      setPage(page)
    },
    [setPage],
  )

  const onChangeRowsPerPage = useCallback(
    (rowsPerPage: number) => {
      setPage(1)
      setLimit(rowsPerPage)
    },
    [setPage, setLimit],
  )

  const onSearch = useCallback(
    (event: any) => {
      const value = event.target.value
      setPage(1)
      setQ(value)
    },
    [setPage, setQ],
  )

  const tagIcon = useMemo(
    () => (tagAction: string) => {
      switch (tagAction) {
        case TagAction.ADD:
          return <Icon iconName="add" width={12} height={12} style={{ marginRight: "8px" }} />
        case TagAction.UPDATE:
          return (
            <Icon iconName="pencilWhite" width={16} height={16} style={{ marginRight: "8px" }} />
          )
        case TagAction.DELETE:
          return (
            <Icon iconName="trashWhite" width={16} height={16} style={{ marginRight: "8px" }} />
          )
        case TagAction.READ:
          return <Icon iconName="eyeWhite" width={16} height={16} style={{ marginRight: "8px" }} />
        default:
          return <></>
      }
    },
    [],
  )

  const onSorting = useCallback(
    (title, ordering) => {
      setSortingKey(title)
      setSortOrder(ordering)
      switch (title) {
        case t("roleDetail.employeeId"): {
          ordering === SortingState.DESCENDING
            ? setSortOrder(UserInRoleOrderByOptions.EMPLOYEE_ID_ASC)
            : setSortOrder(UserInRoleOrderByOptions.EMPLOYEE_ID_DESC)
          break
        }
        case t("roleDetail.name"): {
          ordering === SortingState.DESCENDING
            ? setSortOrder(UserInRoleOrderByOptions.NAME_ASC)
            : setSortOrder(UserInRoleOrderByOptions.NAME_DESC)
          break
        }
        case t("roleDetail.position"): {
          ordering === SortingState.DESCENDING
            ? setSortOrder(UserInRoleOrderByOptions.POSITION_ASC)
            : setSortOrder(UserInRoleOrderByOptions.POSITION_DESC)
          break
        }
      }
    },
    [setSortOrder, t],
  )

  const permissionList = useMemo(() => {
    const permissionsSelected = permissions.reduce((acc: RolePermissions[], permission) => {
      const permissionSelected = permission.subjects.filter((subject) => subject.isSelected)
      if (permissionSelected.length) {
        const rolePermission: RolePermissions = {
          ...permission,
          subjects: permissionSelected,
        }
        acc.push(rolePermission)
      }
      return acc
    }, [])
    return permissionsSelected
  }, [permissions])

  return (
    <div>
      <BoxHeader>
        <Sarabun type="H4">{t("roleDetail.genaral")}</Sarabun>
        <BoxContent>
          <div>
            <Sarabun type="Body2">{t("roleDetail.roleName")}</Sarabun>
            <Box height={8} />
            <Sarabun type="Subtitle1">{roleDetail?.name}</Sarabun>
          </div>
          <div>
            <Sarabun type="Body2">{t("role.active")}:</Sarabun>
            <Box height={8} />
            <ActiveStatus
              isActive={roleDetail?.isActive}
              textStatus={roleDetail?.isActive ? t("roleList.active") : t("roleList.notActive")}
            />
          </div>
        </BoxContent>
        <BoxContent>
          <div>
            <Sarabun type="Body2">{t("roleDetail.description")}</Sarabun>
            <Box height={8} />
            <Sarabun type="Subtitle1">
              {roleDetail?.description ? roleDetail?.description : "-"}
            </Sarabun>
          </div>
        </BoxContent>
      </BoxHeader>
      <Box height={32} />
      <Divider />
      <Box height={8} />
      <BoxHeader>
        <Sarabun type="H4">{t("roleDetail.permission")}</Sarabun>

        {permissionList.length ? (
          permissionList.map((permission, index) => (
            <CardLayout key={index}>
              <BoxHeaderCard>
                <OldSarabun type="Paragraph">
                  {t(`permission.feathers.name.${permission.featureName}`)}
                </OldSarabun>
              </BoxHeaderCard>
              <DividerMui my={0} />

              {permission.subjects.map((detail, index) => (
                <div key={index}>
                  <BoxContentCard>
                    <OldSarabun type="Paragraph" style={{ flex: 3 }}>
                      {t(`permission.subjects.name.${detail.subjectName}`)}
                    </OldSarabun>
                    <BoxPermissionCard style={{ flex: 5 }}>
                      {detail.permissions.map((detailPermission, index) =>
                        detailPermission.isSelected ? (
                          <>
                            <Tag
                              text={t(`permission.actions.${detailPermission.action}`)}
                              key={index}
                              style={{
                                backgroundColor: PRIMARY_MAIN,
                                minWidth: 75,
                              }}
                              startIcon={tagIcon(detailPermission.action)}
                              fontSize={13}
                              weight={400}
                            />
                            <Box width={8} />
                          </>
                        ) : (
                          <></>
                        ),
                      )}
                    </BoxPermissionCard>
                  </BoxContentCard>
                  {index + 1 === permission.subjects.length ? "" : <DividerMui my={0} />}
                </div>
              ))}
            </CardLayout>
          ))
        ) : (
          <>
            <Box height={32} />
            <Sarabun type="Subtitle1" style={{ marginLeft: 8 }} color={GRAYSCALE_DARKGRAY_60}>
              {t("ไม่มีข้อมูล")}
            </Sarabun>
          </>
        )}
      </BoxHeader>
      <Box height={32} />
      <Divider />
      <Box height={8} />
      <BoxHeader>
        <Sarabun type="H4">{t("roleDetail.employee")}</Sarabun>
        <Form onSubmit={() => {}}>
          {() => {
            return (
              <BoxAutoComplete>
                <InputField
                  name="searchUserTable"
                  label={t("roleDetail.searchEmployee")}
                  placeholder={t("roleDetail.searchEmployee")}
                  IconName="searchGlass"
                  startIcon={true}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      onSearch(event)
                    }
                  }}
                />
                {/* <AutoCompleteField
                  name="searchUserTable"
                  loadOptions={loadUserOptions}
                  options={userOption}
                  placeholder={t("roleDetail.searchEmployee")}
                /> */}
                {/* <OnChange name="searchUserTable">
                  {(value: any, previous: any) => {
                    setPage(1)
                    setQuery(value)
                  }}
                </OnChange> */}
              </BoxAutoComplete>
            )
          }}
        </Form>
        <BoxTable>
          <Table
            page={Number(userList?.paging.currentPage)}
            onChangeRowsPerPage={onChangeRowsPerPage}
            totalSize={userList?.paging.totalRecords}
            onChangePage={onChangePage}
            initRowsPerPage={limit}
            isBordered
            hidePaginate={isEmpty(userList?.data) ? true : false}
          >
            <Table.Head>
              <Table.Row style={{ backgroundColor: GRAYSCALE_LIGHTGRAY_20 }}>
                <Table.Cell width={"10%"} style={{ minWidth: 110 }}>
                  <Sarabun type="Subtitle1">{t("roleDetail.No")}</Sarabun>
                </Table.Cell>
                <Table.Cell style={{ minWidth: 130 }}>
                  <HeaderSortable
                    title={t("roleDetail.employeeId")}
                    sortingKey={sortingKey}
                    onSorting={onSorting}
                  />
                </Table.Cell>
                <Table.Cell style={{ minWidth: 200 }}>
                  <HeaderSortable
                    title={t("roleDetail.name")}
                    sortingKey={sortingKey}
                    onSorting={onSorting}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Sarabun type="Subtitle1">{t("หน่วยงาน")}</Sarabun>
                </Table.Cell>
                <Table.Cell>
                  <Sarabun type="Subtitle1">{t("บริษัท")}</Sarabun>
                </Table.Cell>
                <Table.Cell>
                  <HeaderSortable
                    title={t("roleDetail.position")}
                    sortingKey={sortingKey}
                    onSorting={onSorting}
                  />
                </Table.Cell>
              </Table.Row>
            </Table.Head>

            {userList?.data.length === 0 ? (
              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" colSpan={6}>
                    <Sarabun type="Subtitle1" color="#D7D9E0">
                      {t("role.noData")}
                    </Sarabun>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ) : (
              <Table.Body>
                {userList?.data.map((d, index) => {
                  return (
                    <Table.Row key={index}>
                      <Table.Cell>
                        <Sarabun type="Body2">{index + 1 + (page - 1) * limit}</Sarabun>
                      </Table.Cell>
                      <Table.Cell>
                        <Sarabun type="Body2"> {d.employeeId}</Sarabun>
                      </Table.Cell>
                      <Table.Cell>
                        <Sarabun type="Body2">{`${d.firstName} ${d.lastName}`}</Sarabun>
                      </Table.Cell>
                      <Table.Cell>
                        <Sarabun type="Body2">{d.storeName}</Sarabun>
                      </Table.Cell>
                      <Table.Cell>
                        <Sarabun type="Body2">{d.companyName}</Sarabun>
                      </Table.Cell>
                      <Table.Cell>
                        <Sarabun type="Body2">{d.positionName}</Sarabun>
                      </Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            )}
          </Table>
        </BoxTable>
      </BoxHeader>
    </div>
  )
}

export default RoleViewDetail
