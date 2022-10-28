import styled from "styled-components/macro"
import { Box } from "@mui/material"
import EditRoleLeftField, {
  EditRoleFormValues,
} from "../component/fields/edit-fields/EditRoleLeftField"
import {
  useEditRole,
  useGetCreateRole,
  useGetEditRoleDetail,
  useGetRoleDetail,
} from "../../../services/role/role-query"
import { useRouter } from "../../../utils/helper"
import { useTranslation } from "react-i18next"
import { breakpoints } from "../../../utils/responsive-helper"
import Card from "../../../components/common/Card"
import { useCallback, useMemo, useRef, useState } from "react"
import {
  GRAYSCALE_DARKGRAY_40,
  GRAYSCALE_LIGHTGRAY_20,
  PRIMARY,
  SECONDARY_LIGHT,
  WHITE,
} from "../../../constants/colors"
import HeaderSortable from "../../../components/common/HeaderSortable"
import { SortingState, UserInRoleOrderByOptions } from "../../../services/enum-typed"
import Sarabun from "../../../components/common/Sarabun"
import { Form } from "react-final-form"
import { InputField } from "../../../components/fields"
import { Table } from "../../../components/common/Table"
import Button from "../../../components/common/Button"
import { useSnackbar } from "../../../utils/custom-hook"
import OldModal from "../../../components/common/OldModal"
import Icon from "../../../components/common/Icon"
import { isEmpty, set, some } from "lodash"
import { PermissionData, RolePermissions } from "../../../services/role/role-type"

const CardLayout = styled(Card)`
  padding-left: 12px;
  padding-right: 12px;
  min-height: 845px;
`
const BoxTable = styled(Box)`
  margin-top: 16px;

  margin-right: 25px;
  min-width: 100px;
`

const GridSelectLayout = styled.div`
  display: grid;
  grid-template-columns: 372px auto;
  align-items: end;
  gap: 30px;
  ${breakpoints.down("sm")} {
    grid-template-columns: 1fr;
  }
`

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${GRAYSCALE_DARKGRAY_40};
`

const GridFooter = styled.div`
  margin-top: auto;
`

const BoxMargin = styled(Box)`
  > *:not(:last-of-type) {
    margin-right: 8px;
  }
`
const GridButtonLayout = styled.div`
  display: grid;
  grid-template-columns: 100px 100px;
  gap: 8px;
`

const ButtonBack = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const RoleEdit = () => {
  const { t } = useTranslation()
  const { query, push, goBack } = useRouter()
  const roleId = query.id

  const { snackbar } = useSnackbar()
  const formRef = useRef<any>()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [employee, setEmployee] = useState("")
  const [sortingKey, setSortingKey] = useState("")
  const [sortOrder, setSortOrder] = useState<UserInRoleOrderByOptions>()

  const [isOpenEditModal, setIsOpenEditModal] = useState(false)

  const paramsEditRole = {
    roleDetail: { isSelected: true, roleId: roleId },
    users: { isSelected: false, roleId: roleId, limit: pageSize, page: page },
    searchUsers: {
      isSelected: true,
      limit: 20,
      page: 1,
      excludeRoleId: roleId,
      q: "",
    },
  }

  const { data: roleUsers } = useGetRoleDetail(roleId, {
    limit: pageSize,
    page: page,
    q: employee,
    orderBy: sortOrder,
  })

  const { data: permissionData } = useGetCreateRole({
    roleDetail: { isSelected: true },
  })

  // แกะเอาเฉพาะ permissions ทั้งหมด
  const permissionsList = useMemo(() => {
    const permissions: PermissionData[] = []
    permissionData?.roleDetail.permissions.forEach((permission) => {
      permission.subjects.map((subject) => permissions.push(...subject.permissions))
    })
    return permissions
  }, [permissionData?.roleDetail.permissions])

  const userList = useMemo(() => {
    return roleUsers?.users
  }, [roleUsers?.users])

  const { data: roleData } = useGetEditRoleDetail(paramsEditRole)

  const onChangePage = useCallback((page: number) => {
    setPage(page)
  }, [])

  const onChangeRowsPerPage = useCallback((rowsPerPage: number) => {
    setPage(1)
    setPageSize(rowsPerPage)
  }, [])

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
    [t],
  )

  const onSearch = useCallback((event: any) => {
    const value = event.target.value
    setPage(1)
    setEmployee(value)
  }, [])

  const { mutate: editRole } = useEditRole(roleId)
  const onConfirmEditRole = useCallback(
    (values: EditRoleFormValues) => {
      const permissionList = Object.entries(values.permissions)
        .filter(([, permission]) => !!permission)
        .map(([item]) => item)

      editRole(
        {
          name: values.name,
          description: values.description,
          isActive: values.isActive,
          permissionIds: permissionList,
        },
        {
          onSuccess: () => {
            setIsOpenEditModal(false)
            push("/roles")
            snackbar({
              message: t("role.edit.snackbar.success"),
              type: "success",
            })
          },
          onError: () => {
            snackbar({
              message: t("role.edit.snackbar.error"),
              type: "error",
            })
            setIsOpenEditModal(false)
          },
        },
      )
    },
    [editRole, push, snackbar, t],
  )

  const onSaveEditRole = useCallback(() => {
    setIsOpenEditModal(true)
  }, [])
  const onCancelEditRole = useCallback(() => {
    setIsOpenEditModal(false)
  }, [])

  const initialValues = useMemo(() => {
    const _initialValues = roleData?.permissions.reduce(
      (acc: Record<string, boolean>, permission: RolePermissions) => {
        const isSelected = some(permission.subjects, (subject) => subject.isSelected)
        if (isSelected) {
          acc[permission.featureName] = isSelected
        }
        return acc
      },
      {},
    )
    const _initialPermission = roleData?.permissions.reduce(
      (acc: Record<string, boolean>, permission: RolePermissions) => {
        permission.subjects.forEach((subject) => {
          subject.permissions.forEach((item) => {
            if (item.isSelected) {
              acc[item.id] = item.isSelected
            }
          })
        })
        return acc
      },
      {},
    )
    return {
      name: roleData?.role.name,
      description: roleData?.role.description,
      isActive: roleData?.role.isActive,
      ..._initialValues,
      permissions: _initialPermission,
    }
  }, [
    roleData?.permissions,
    roleData?.role.description,
    roleData?.role.isActive,
    roleData?.role.name,
  ])

  const onGoBack = useCallback(() => {
    goBack()
  }, [goBack])

  const onValidate = useCallback(
    (values: EditRoleFormValues) => {
      const errors: IFormValueErrors<EditRoleFormValues> = {}

      if (!values.name) {
        set(errors, "name", t("role.name.validate"))
      }

      let isHavePermissions = false
      // validate permission ว่าถูกเลือกหรือป่าว ถ้าไม่ถูกเลือกเลยจะกดบันทึกไม่ได้
      if (values.permissions) {
        permissionsList.forEach((permission) => {
          if (!!values.permissions[permission.id]) {
            isHavePermissions = true
          }
        })
      }
      if (!isHavePermissions) {
        set(errors, "permissions", "require")
      }
      return errors
    },
    [permissionsList, t],
  )
  return (
    <div>
      <ButtonBack onClick={onGoBack}>
        <Icon iconName="caretLeftSecondaryRightBlue" width={16} height={16} />
        <Box width={8} />
        <Sarabun type="Subtitle2" color={SECONDARY_LIGHT}>
          ย้อนกลับ
        </Sarabun>
      </ButtonBack>
      <Box height={28} />
      <Form onSubmit={onConfirmEditRole} initialValues={initialValues} validate={onValidate}>
        {({ handleSubmit, form, invalid, errors, values }) => {
          formRef.current = form
          return (
            <>
              <CardLayout>
                <EditRoleLeftField
                  roleDetail={roleData?.role}
                  roleId={roleId}
                  change={form.change}
                  permissionData={permissionData}
                />
                <Divider />
                <Box height={32} />
                <Sarabun type="H4">{t("role.inputform.header.employee")}</Sarabun>
                <Box height="16px" />

                <GridSelectLayout>
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
                </GridSelectLayout>
                <BoxTable>
                  <Table
                    page={Number(userList?.paging.currentPage)}
                    onChangeRowsPerPage={onChangeRowsPerPage}
                    totalSize={userList?.paging.totalRecords}
                    onChangePage={onChangePage}
                    isBordered
                    hidePaginate={isEmpty(userList?.data) ? true : false}
                  >
                    <Table.Head>
                      <Table.Row style={{ backgroundColor: GRAYSCALE_LIGHTGRAY_20 }}>
                        <Table.Cell width={"10%"} style={{ minWidth: 110 }}>
                          <Sarabun type="Subtitle1">{t("role.table.order")}</Sarabun>
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
                          <Table.Cell align="center" colSpan={4}>
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
                                <Sarabun type="Body2">{index + 1 + (page - 1) * pageSize}</Sarabun>
                              </Table.Cell>
                              <Table.Cell>
                                <Sarabun type="Body2">{d.employeeId}</Sarabun>
                              </Table.Cell>
                              <Table.Cell>
                                <Sarabun type="Body2">{`${d.firstName} ${d.lastName}`}</Sarabun>
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
              </CardLayout>
              <Box height={24} />
              <GridFooter>
                <Box display="flex">
                  <Box flex="1"></Box>
                  <BoxMargin>
                    <GridButtonLayout>
                      <Button
                        buttonType="text"
                        onClick={onGoBack}
                        backgroundColor={`${WHITE}`}
                        width={100}
                      >
                        {t("role.edit.button.cancel")}
                      </Button>
                      <Button
                        style={{
                          backgroundColor: invalid ? GRAYSCALE_DARKGRAY_40 : PRIMARY,
                        }}
                        isDisabledButton={invalid}
                        onClick={() => {
                          if (!invalid) {
                            onSaveEditRole()
                          } else {
                            form.submit()
                          }
                          if (errors?.permissions) {
                            snackbar({
                              message: t("role.permission.validate"),
                              type: "warning",
                            })
                          }
                        }}
                      >
                        {t("role.edit.button.save")}
                      </Button>
                    </GridButtonLayout>
                  </BoxMargin>
                </Box>
              </GridFooter>
              <OldModal
                isOpen={isOpenEditModal}
                onCancel={onCancelEditRole}
                onConfirm={handleSubmit}
                type={"warning"}
                maxWidth="sm"
                fullWidth={true}
                title={t("role.edit.modal.title")}
              >
                {t("role.edit.modal.description")}
              </OldModal>
            </>
          )
        }}
      </Form>
    </div>
  )
}

export default RoleEdit
