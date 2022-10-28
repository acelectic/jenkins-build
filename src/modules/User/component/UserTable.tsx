import Table from "../../../components/common/Table"
import { useCallback, useEffect, useState } from "react"
import Loading from "../../../components/common/Loading"
import { ParamUserPage } from "../../../services/user/user-type"
import { useGetUserPage } from "../../../services/user/user-query"
import { useTranslation } from "react-i18next"
import {
  GRAYSCALE_DARKGRAY_60,
  GRAYSCALE_LIGHTGRAY_20,
  PRIMARY_MAIN,
  SEMANTIC_SUCCESS_MAIN,
} from "../../../constants/colors"
import HeaderSortable from "../../../components/common/HeaderSortable"
import {
  EnumColumnUserTitle,
  GetAllUserFilter,
  GetAllUserOrder,
} from "../../../services/enum-typed"
import Avatar from "../../../components/common/Avatar"
import Sarabun from "../../../components/common/Sarabun"
import Icon from "../../../components/common/Icon"
import { User } from "../../../services/entity-typed"
import styled from "@emotion/styled"

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

interface UserTableProps {
  onClickViewDetailUser?: (data: User) => void
  q?: string
  filter?: GetAllUserFilter
}

const UserTable = (props: UserTableProps) => {
  const { onClickViewDetailUser: setData, q, filter } = props
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const { t } = useTranslation()

  const [sortingKey, setSortingKey] = useState("")

  const [orderBy, setOrderBy] = useState<GetAllUserOrder>(GetAllUserOrder.NAME_ASC)

  const onChangePage = useCallback((page: number) => {
    setPage(page)
  }, [])
  const onChangeRowsPerPage = useCallback((rowsPerPage: number) => {
    setPageSize(rowsPerPage)
    setPage(1)
  }, [])

  const onSorting = useCallback(
    (title) => {
      setSortingKey(title)
      setPage(1)
      switch (title) {
        case EnumColumnUserTitle.STORE: {
          orderBy === GetAllUserOrder.STORE_NAME_DESC
            ? setOrderBy(GetAllUserOrder.STORE_NAME_ASC)
            : setOrderBy(GetAllUserOrder.STORE_NAME_DESC)
          break
        }
        case EnumColumnUserTitle.COMPANY: {
          orderBy === GetAllUserOrder.COMPANY_NAME_DESC
            ? setOrderBy(GetAllUserOrder.COMPANY_NAME_ASC)
            : setOrderBy(GetAllUserOrder.COMPANY_NAME_DESC)
          break
        }
        default: {
          orderBy === GetAllUserOrder.NAME_DESC
            ? setOrderBy(GetAllUserOrder.NAME_ASC)
            : setOrderBy(GetAllUserOrder.NAME_DESC)
          break
        }
      }
    },
    [orderBy],
  )

  const paramsUser: ParamUserPage = {
    users: {
      isSelected: true,
      limit: pageSize,
      page: page,
      q: q,
      filterBy: !!filter ? filter : GetAllUserFilter.ALL,
      orderBy: orderBy,
    },
    userDetail: { isSelected: false },
    myCrews: { isSelected: false },
    myRoles: { isSelected: false },
  }

  const { data: userList, isLoading: isUserListLoading } = useGetUserPage(paramsUser)

  useEffect(() => {
    setPage(1)
  }, [q])

  return (
    <Loading isLoading={isUserListLoading}>
      <Table
        page={page}
        onChangeRowsPerPage={onChangeRowsPerPage}
        totalSize={userList?.users.paging.totalRecords}
        onChangePage={onChangePage}
        initRowsPerPage={10}
      >
        <Table.Head style={{ backgroundColor: GRAYSCALE_LIGHTGRAY_20 }}>
          <Table.Row>
            <Table.Cell width={"10%"} style={{ paddingLeft: "24px" }}>
              <Sarabun type="Subtitle1">{t("ลำดับ")}</Sarabun>
            </Table.Cell>
            <Table.Cell width={"25%"}>
              <HeaderSortable
                title={t(`${EnumColumnUserTitle.NAME}`)}
                sortingKey={sortingKey}
                onSorting={onSorting}
              />
            </Table.Cell>
            <Table.Cell width={"25%"}>
              <HeaderSortable
                title={t(`${EnumColumnUserTitle.STORE}`)}
                sortingKey={sortingKey}
                onSorting={onSorting}
              />
            </Table.Cell>
            <Table.Cell width={"20%"}>
              <HeaderSortable
                title={t(`${EnumColumnUserTitle.COMPANY}`)}
                sortingKey={sortingKey}
                onSorting={onSorting}
              />
            </Table.Cell>
            <Table.Cell width={"10%"} style={{ minWidth: "50px" }}>
              <Sarabun type="Subtitle1">{t(`${EnumColumnUserTitle.STATUS}`)}</Sarabun>
            </Table.Cell>
            <Table.Cell width={"10%"}>{}</Table.Cell>
          </Table.Row>
        </Table.Head>

        <Table.Body>
          {userList?.users.data.map((user, index) => {
            const {
              firstName,
              lastName,
              employeeId,
              companyName,
              storeName,
              resignationDate,
            } = user
            return (
              <Table.Row key={index} hover>
                <Table.Cell width={"10%"} style={{ paddingLeft: "30px" }}>
                  <Sarabun type="Body2">{`${index + 1 + (page - 1) * pageSize}`}</Sarabun>
                </Table.Cell>
                <Table.Cell>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      columnGap: "8px",
                    }}
                  >
                    <Avatar height={30} width={30} />
                    <div>
                      <Sarabun>{`${firstName} ${lastName}`}</Sarabun>
                      <Sarabun>{`EID: ${employeeId}`}</Sarabun>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>{`${storeName}`}</Table.Cell>
                <Table.Cell>{`${companyName}`}</Table.Cell>
                <Table.Cell>
                  {!!!resignationDate ? (
                    <RowGap gap={8}>
                      <GreenDot />
                      <Sarabun color={SEMANTIC_SUCCESS_MAIN}>{t("ใช้งาน")}</Sarabun>
                    </RowGap>
                  ) : (
                    <RowGap gap={8}>
                      <GrayDot />
                      <Sarabun color={GRAYSCALE_DARKGRAY_60}>{t("ลาออก")}</Sarabun>
                    </RowGap>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <div
                    style={{
                      textAlign: "center",
                      cursor: "pointer",
                      minWidth: 100,
                    }}
                    onClick={setData?.bind(null, user)}
                  >
                    <Icon iconName="eye" />
                    <Sarabun type="Subtitle2" color={PRIMARY_MAIN}>
                      {t("ดูรายอะเอียด")}
                    </Sarabun>
                  </div>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </Loading>
  )
}

export default UserTable
