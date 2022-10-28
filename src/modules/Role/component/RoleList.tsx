import { useCallback, useState } from "react"
import Table from "../../../components/common/Table"
import OldSarabun from "../../../components/common/OldSarabun"
import { useGetRolePage } from "../../../services/role/role-query"
import Loading from "../../../components/common/Loading"
import { useTranslation } from "react-i18next"
import { GRAYSCALE_LIGHTGRAY_20, PRIMARY_MAIN } from "../../../constants/colors"
import Sarabun from "../../../components/common/Sarabun"
import Icon from "../../../components/common/Icon"
import {
  RoleFilterByOptions,
  RoleOrderByOptions,
  SortingState,
} from "../../../services/enum-typed"
import HeaderSortable from "../../../components/common/HeaderSortable"
import { useRouter } from "../../../utils/helper"
import styled from "@emotion/styled"
import ActiveStatus from "./ActiveStatus"

const EyeDetail = styled.div`
  text-align: center;
  cursor: pointer;
  min-width: 100px;
`

type RoleListProps = {
  q: string
  dropdownStatus: RoleFilterByOptions
}

const RoleList = (props: RoleListProps) => {
  const { dropdownStatus, q } = props
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const { t } = useTranslation()

  const { push } = useRouter()

  const [sortingKey, setSortingKey] = useState("")
  const [sortOrder, setSortOrder] = useState<RoleOrderByOptions>()

  const { data: roleList, isLoading: isRoleListLoading } = useGetRolePage({
    limit: pageSize,
    page: page,
    q: q,
    orderBy: sortOrder,
    filterBy: !!dropdownStatus ? dropdownStatus : RoleFilterByOptions.ALL,
  })

  // const [roleListState, setRoleListState] = useState<Role[]>()

  // useEffect(() => {
  //   switch (dropdownStatus) {
  //     case RoleListDropdownStatus.SelectAll:
  //       setRoleListState(roleList?.data)
  //       break
  //     case RoleListDropdownStatus.SelectActive:
  //       setRoleListState(
  //         roleList?.data.filter((role) => role.isActive === true)
  //       )
  //       break
  //     case RoleListDropdownStatus.SelectNotActive:
  //       setRoleListState(
  //         roleList?.data.filter((role) => role.isActive === false)
  //       )
  //   }
  // }, [dropdownStatus, roleList?.data])

  const onChangePage = useCallback((page: number) => {
    setPage(page)
  }, [])

  const onChangeRowsPerPage = useCallback((rowsPerPage: number) => {
    setPageSize(rowsPerPage)
    setPage(1)
  }, [])

  const onSorting = useCallback(
    (title, ordering) => {
      setSortingKey(title)
      setSortOrder(ordering)
      switch (title) {
        case t("roleList.role"): {
          ordering === SortingState.DESCENDING
            ? setSortOrder(RoleOrderByOptions.NAME_ASC)
            : setSortOrder(RoleOrderByOptions.NAME_DESC)
          break
        }
        default: {
          ordering === SortingState.DESCENDING
            ? setSortOrder(RoleOrderByOptions.STATUS_ASC)
            : setSortOrder(RoleOrderByOptions.STATUS_DESC)
          break
        }
      }
    },
    [t]
  )

  const onClickViewDetail = useCallback(
    (roleId: string) => {
      push(`/roles/${roleId}`)
    },
    [push]
  )

  return (
    <Loading isLoading={isRoleListLoading}>
      <Table
        page={Number(roleList?.paging.currentPage)}
        onChangeRowsPerPage={onChangeRowsPerPage}
        totalSize={roleList?.paging.totalRecords}
        onChangePage={onChangePage}
        initRowsPerPage={pageSize}
      >
        <Table.Head>
          <Table.Row style={{ backgroundColor: GRAYSCALE_LIGHTGRAY_20 }}>
            <Table.Cell width={"8%"} style={{ minWidth: 150 }}>
              <Sarabun type="Subtitle1">{t("roleList.No")}</Sarabun>
            </Table.Cell>
            <Table.Cell width={"60%"}>
              <HeaderSortable
                title={t("roleList.role")}
                sortingKey={sortingKey}
                onSorting={onSorting}
              />
            </Table.Cell>
            <Table.Cell width={"8%"} style={{ minWidth: 150 }}>
              <HeaderSortable
                title={t("role.active")}
                sortingKey={sortingKey}
                onSorting={onSorting}
              />
            </Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        </Table.Head>

        <Table.Body>
          {roleList?.data.map((role, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>
                  <OldSarabun type="Paragraph">
                    {index + 1 + (page - 1) * pageSize}
                  </OldSarabun>
                </Table.Cell>
                <Table.Cell>
                  <OldSarabun type="Paragraph">{role.name}</OldSarabun>
                </Table.Cell>
                <Table.Cell>
                  <ActiveStatus
                    isActive={role.isActive}
                    textStatus={role.isActive ? t("ใช้งาน") : t("ไม่ใช้งาน")}
                  />
                </Table.Cell>
                <Table.Cell>
                  <EyeDetail onClick={onClickViewDetail.bind(null, role.id)}>
                    <Icon iconName="eye" />
                    <Sarabun type="Subtitle2" color={PRIMARY_MAIN}>
                      {t("ดูรายอะเอียด")}
                    </Sarabun>
                  </EyeDetail>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </Loading>
  )
}

export default RoleList
