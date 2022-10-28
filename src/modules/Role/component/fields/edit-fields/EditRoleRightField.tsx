import Card from "../../../../../components/common/Card"
import OldButton from "../../../../../components/common/OldButton"
import Header from "../../../../../components/common/Header"
import Table from "../../../../../components/common/Table"
import IconButton from "../../../../../components/common/IconButton"
import { Trash2 } from "react-feather"
import styled from "styled-components/macro"
import { Box } from "@mui/material"
import { useState, useCallback, useRef } from "react"
import Loading from "../../../../../components/common/Loading"
import { AutoCompleteField } from "../../../../../components/fields"
import { breakpoints } from "../../../../../utils/responsive-helper"
import OldModal from "../../../../../components/common/OldModal"
import { useTranslation } from "react-i18next"
import {
  useGetAsyncSearchUserOptions,
  useGetEditRoleDetail,
  useAddRoleUsers,
  useDeleteRoleUsers,
} from "../../../../../services/role/role-query"
import { useSnackbar } from "../../../../../utils/custom-hook"
import { Form } from "react-final-form"
import { EditUserParams } from "../../../../../services/role/role-type"

const TrashIconButton = styled(IconButton)`
  margin-left: 18px;
  max-width: 20.78px;
  max-height: 20px;
  align-items: center;
  justify-content: center;
  text-align: center;
`
const GridSelectLayout = styled.div`
  display: grid;
  grid-template-columns: 372px auto;
  gap: 30px;
  ${breakpoints.down("sm")} {
    grid-template-columns: 1fr;
  }
`
const CardLayout = styled(Card)`
  padding-left: 12px;
  padding-right: 12px;
  min-height: 845px;
`
const AddButton = styled(OldButton)`
  min-width: min-content;
  max-width: fit-content;
  padding-left: 12px;
  padding-right: 12px;
  > * {
    white-space: nowrap;
  }
`
const TableCard = styled(Card)`
  padding: 0px;
  margin: 0px;
`

export type RoleID = { roleId: string }

export type RoleEditResult = RoleID

const EditRoleRightField = (props: RoleEditResult) => {
  const { t } = useTranslation()
  const { roleId } = props
  const { snackbar } = useSnackbar()
  const formRef = useRef<any>()
  const [userDeleteId, setUserDeleteId] = useState("")
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [isOpenModal, setIsOpenModal] = useState(false)

  const onChangePage = useCallback((page: number) => {
    setPage(page)
  }, [])
  const onChangeRowsPerPage = useCallback((rowsPerPage: number) => {
    setPage(1)
    setPageSize(rowsPerPage)
  }, [])
  const { data: userData, isLoading: isLoadingData } = useGetEditRoleDetail({
    roleDetail: { isSelected: true, roleId: roleId },
    users: { isSelected: true, roleId: roleId, limit: pageSize, page: page },
    searchUsers: {
      isSelected: true,
      limit: 20,
      page: 1,
      excludeRoleId: roleId,
    },
  })

  const { mutate: addUser } = useAddRoleUsers(roleId)
  const onConfirmAddUser = useCallback(
    (value: EditUserParams) => {
      addUser(value, {
        onSuccess: () => {
          snackbar({ message: t("role.success.add.user"), type: "success" })

          formRef.current.reset()
        },
        onError: () => {
          snackbar({ message: t("role.error.add.user"), type: "error" })
        },
      })
    },
    [addUser, snackbar, t],
  )

  const { mutate: deleteUser } = useDeleteRoleUsers(roleId)
  const onDeleteUser = useCallback((userDelId: string) => {
    setUserDeleteId(userDelId)
    setIsOpenModal(true)
  }, [])
  const onCancelDeleteUser = useCallback(() => {
    setIsOpenModal(false)
  }, [])
  const onConfirmDeleteUser = useCallback(() => {
    deleteUser(
      { userId: userDeleteId },
      {
        onSuccess: () => {
          snackbar({ message: t("role.delete.user.sucess"), type: "success" })
          setIsOpenModal(false)
          formRef.current.reset()
        },
        onError: () => {
          snackbar({ message: t("role.delete.user.error"), type: "error" })
          setIsOpenModal(false)
        },
      },
    )
  }, [deleteUser, snackbar, t, userDeleteId])

  const {
    data: employeeOption = [],
    mutateAsync: getAsyncUserOptions,
  } = useGetAsyncSearchUserOptions()
  const loadOptions = useCallback(
    (value: string) => {
      return getAsyncUserOptions({
        roles: { isSelected: false, limit: 1, page: 1 },
        roleDetail: { isSelected: false, roleId: roleId },
        users: {
          isSelected: false,
          roleId: roleId,
          limit: pageSize,
          page: page,
        },
        searchUsers: {
          isSelected: true,
          limit: 20,
          page: 1,
          excludeRoleId: roleId,
          q: value,
        },
      })
    },
    [getAsyncUserOptions, page, pageSize, roleId],
  )

  return (
    <Form onSubmit={onConfirmAddUser}>
      {({ handleSubmit, form }) => {
        formRef.current = form
        return (
          <form onSubmit={handleSubmit}>
            <CardLayout>
              <Box height="8px" />
              <Header>{t("role.inputform.header.employee")}</Header>
              <Box height="30px" />

              <GridSelectLayout>
                <AutoCompleteField
                  name="userId"
                  placeholder={t("role.inputform.search")}
                  style={{ width: "372px" }}
                  options={employeeOption}
                  loadOptions={loadOptions}
                />
                <AddButton color="primary" onClick={handleSubmit}>
                  {t("role.inputform.button.add")}
                </AddButton>
              </GridSelectLayout>
              <Box height="50px" />
              <Loading isLoading={isLoadingData}>
                <TableCard>
                  <Table
                    page={Number(userData?.users.paging.currentPage)}
                    onChangeRowsPerPage={onChangeRowsPerPage}
                    totalSize={userData?.users.paging.totalRecords}
                    onChangePage={onChangePage}
                    isBordered
                  >
                    <Table.Head>
                      <Table.Row>
                        <Table.Cell>{t("role.table.order")}</Table.Cell>
                        <Table.Cell>{t("role.table.employee.id")}</Table.Cell>
                        <Table.Cell>{t("role.table.employee.name")}</Table.Cell>
                        <Table.Cell>{t("role.table.employee.position")}</Table.Cell>
                        <Table.Cell>{t("role.table.action")}</Table.Cell>
                      </Table.Row>
                    </Table.Head>
                    {userData?.users.data.length !== 0 ? (
                      <Table.Body>
                        {userData?.users.data.map((d, index) => {
                          return (
                            <Table.Row
                              onClick={() => {}}
                              style={{ cursor: "pointer" }}
                              hover
                              key={index}
                            >
                              <Table.Cell>{index + 1 + (page - 1) * pageSize}</Table.Cell>
                              <Table.Cell>{d.employeeId}</Table.Cell>
                              <Table.Cell>{`${d.firstName} ${d.lastName}`}</Table.Cell>
                              <Table.Cell>{d.positionName}</Table.Cell>
                              <Table.Cell>
                                <TrashIconButton
                                  icon={<Trash2 />}
                                  color="error"
                                  iconSize="small"
                                  onClick={onDeleteUser.bind(null, d.id)}
                                />
                              </Table.Cell>
                            </Table.Row>
                          )
                        })}
                      </Table.Body>
                    ) : (
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell></Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    )}
                  </Table>
                </TableCard>
              </Loading>

              <OldModal
                isOpen={isOpenModal}
                onCancel={onCancelDeleteUser}
                onConfirm={onConfirmDeleteUser}
                title={t("role.edit.deleteuser.title")}
                type="delete"
                fullWidth={true}
                maxWidth="sm"
              >
                {t("role.edit.delete.user")}
              </OldModal>
            </CardLayout>
          </form>
        )
      }}
    </Form>
  )
}

export default EditRoleRightField
