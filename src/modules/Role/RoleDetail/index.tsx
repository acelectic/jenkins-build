import styled from "@emotion/styled"
import Box from "@mui/material/Box"
import { useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

import Authorize from "../../../components/Authorize"
import Button from "../../../components/common/Button"
import Card from "../../../components/common/Card"
import Icon from "../../../components/common/Icon"
import LoadingLayout from "../../../components/common/LoadingLayout"
import Modal from "../../../components/common/Modal"
import Sarabun from "../../../components/common/Sarabun"
import { SECONDARY_LIGHT, WHITE } from "../../../constants/colors"
import { PERMISSIONS } from "../../../services/enum-typed"
import { useDeleteRole, useGetRoleDetail } from "../../../services/role/role-query"
import { useSnackbar } from "../../../utils/custom-hook"
import { useRouter } from "../../../utils/helper"
import RoleViewDetail from "../component/RoleViewDetail"

const BoxDetailMargin = styled(Box)`
  > *:not(:last-of-type) {
    margin-right: 8px;
  }
`
const EditIcon = styled(Icon)`
  max-width: 21px;
  max-height: 21px;
  color: #000000;
`

const GridDetailButtonLayout = styled.div`
  display: grid;
  grid-template-columns: 0.1fr 0.1fr;
  gap: 12px;
  justify-content: flex-end;
`
const EditDetailIconButton = styled(Button)<{ disabled?: boolean }>`
  min-width: 36px;
  max-height: 36px;

  background-color: ${({ isDisabledButton: disabled }) => {
    return disabled ? "#dddddd" : "#EBFAF1"
  }};
  &.MuiButton-contained:hover {
    background-color: #c5ffdc;
  }

  svg {
    color: ${({ isDisabledButton: disabled }) => {
      return disabled ? "#8C8D8D" : "#2ECC71"
    }};
  }
`
const DeleteDetailIconButton = styled(Button)<{ disabled?: boolean }>`
  max-width: 36px;
  max-height: 36px;

  background-color: ${({ isDisabledButton: disabled }) => {
    return disabled ? "#dddddd" : "#FDEAEF"
  }};
  &.MuiButton-contained:hover {
    background-color: #ffcedb;
  }

  svg {
    color: ${({ isDisabledButton: disabled }) => {
      return disabled ? "#8C8D8D" : "#E0255F"
    }};
  }
`
const DefaultDetailCard = styled(Card)`
  .MuiCardContent-root {
    min-width: 350px;
  }
`

const TrashIcon = styled(Icon)`
  max-width: 21px;
  max-height: 21px;
  color: #000000;
`

const BoxHeader = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: auto;
  min-width: 250px;
`

const BoxColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ButtonBack = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const RoleDetail = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const { t } = useTranslation()
  const { query, push, goBack } = useRouter()
  const { roleId } = query

  const { snackbar } = useSnackbar()

  const { data: roleDetail, isLoading: isRoleDetailLoading } = useGetRoleDetail(roleId)
  const { mutate: deleteRole } = useDeleteRole(roleId)

  const onEditClick = useCallback(() => {
    push(`/roles/${roleId}/edit`)
  }, [push, roleId])

  const onDeleteClick = useCallback(() => {
    setIsOpenModal(true)
  }, [])

  const onConfirmDeleteRole = useCallback(() => {
    deleteRole(undefined, {
      onSuccess: () => {
        setIsOpenModal(false)
        push("/roles")
        snackbar({ message: t("roles.delete.role"), type: "success" })
      },
      onError: (error) => {
        const _error = error as any
        setIsOpenModal(false)
        snackbar({ message: _error?.message, type: "error" })
      },
    })
  }, [deleteRole, push, snackbar, t])

  const onCancelDeleteRole = useCallback(() => {
    setIsOpenModal(false)
  }, [])

  const onGoBack = useCallback(() => {
    goBack()
  }, [goBack])

  //สำหรับ Role Super Admin จะลบหรือแก้ไขไม่ได้เลยจึงต้อง HardCode ไว้เนื่องจาก Role เป็น Name
  const isDisableDeleteRole = useMemo(() => {
    return roleDetail?.users.data.length || roleDetail?.role.name === "SUPER ADMIN" ? true : false
  }, [roleDetail?.role.name, roleDetail?.users.data.length])

  //สำหรับ Role Super Admin จะลบหรือแก้ไขไม่ได้เลยจึงต้อง HardCode ไว้เนื่องจาก Role เป็น Name
  const isDisableEditButton: boolean = useMemo(
    () => (roleDetail?.role.name === "SUPER ADMIN" ? true : false),
    [roleDetail?.role.name],
  )

  return (
    <LoadingLayout isLoading={isRoleDetailLoading}>
      <ButtonBack onClick={onGoBack}>
        <Icon iconName="caretLeftSecondaryRightBlue" width={16} height={16} />
        <Box width={8} />
        <Sarabun type="Subtitle2" color={SECONDARY_LIGHT}>
          ย้อนกลับ
        </Sarabun>
      </ButtonBack>
      <Box height={28} />
      <DefaultDetailCard>
        <BoxHeader>
          <Sarabun type="H2">{roleDetail?.role.name}</Sarabun>

          <BoxDetailMargin>
            <GridDetailButtonLayout>
              <Authorize permissions={[PERMISSIONS.MANAGE_ROLE_MANAGE_ROLE_UPDATE]}>
                <EditDetailIconButton
                  onClick={onEditClick}
                  startIcon={<EditIcon iconName="pencilWhite" width={24} height={24} />}
                  minWidth={100}
                  textColor={WHITE}
                  isDisabledButton={isDisableEditButton}
                >
                  {t("แก้ไข")}
                </EditDetailIconButton>
              </Authorize>
              <Authorize permissions={[PERMISSIONS.MANAGE_ROLE_MANAGE_ROLE_DELETE]}>
                <DeleteDetailIconButton
                  onClick={onDeleteClick}
                  isDisabledButton={isDisableDeleteRole}
                  startIcon={<TrashIcon iconName="trashWhite" width={24} height={24} />}
                  minWidth={80}
                  textColor={WHITE}
                >
                  {t("ลบ")}
                </DeleteDetailIconButton>
              </Authorize>
            </GridDetailButtonLayout>
          </BoxDetailMargin>
        </BoxHeader>
        <RoleViewDetail roleDetail={roleDetail?.role!} permissions={roleDetail?.permissions!} />
      </DefaultDetailCard>
      <Modal
        visibleUseState={[isOpenModal, setIsOpenModal]}
        onCancel={onCancelDeleteRole}
        onOk={onConfirmDeleteRole}
      >
        <BoxColumn>
          <Icon iconName="warningOrange" width={64} height={64} />
          <Box height={16} />
          <Sarabun type="H4">{t("role.delete.detail")}</Sarabun>
          <Box height={32} />
        </BoxColumn>
      </Modal>
    </LoadingLayout>
  )
}

export default RoleDetail
