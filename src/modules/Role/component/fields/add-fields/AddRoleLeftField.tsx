import Card from "../../../../../components/common/Card"
import Header from "../../../../../components/common/Header"
import Kanit from "../../../../../components/common/Kanit"
import styled from "styled-components/macro"
import { Box } from "@mui/material"
import { useState, useCallback } from "react"
import { InputField, SwitchField } from "../../../../../components/fields"
import { breakpoints } from "../../../../../utils/responsive-helper"
import OldModal from "../../../../../components/common/OldModal"
import { useTranslation } from "react-i18next"
import { useGetCreateRole } from "../../../../../services/role/role-query"
import { Form } from "react-final-form"
import arrayMutators from "final-form-arrays"
import { useAddRole } from "../../../../../services/role/role-query"
import { useRouter } from "../../../../../utils/helper"
import { useSnackbar } from "../../../../../utils/custom-hook"
import PermissionField from "../PermissionField"
import { RoleValuesType } from "../../../../../services/role/role-type"
import Button from "../../../../../components/common/Button"
import { WHITE } from "../../../../../constants/colors"

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
  ${breakpoints.down("lg")} {
    grid-template-columns: 1fr;
  }
`
const CardLayout = styled(Card)`
  padding-left: 12px;
  padding-right: 12px;
  min-height: 845px;
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
const GridFooter = styled.div`
  margin-top: auto;
`

const Input = styled(InputField)`
  min-width: 378px;
  max-width: 650px;
`

type AddRoleFormValues = {
  name: string
  description: string
  isActive: string
  permissions: string[]
}

const AddRoleLeftField = () => {
  const { t } = useTranslation()
  const { data: permissionData } = useGetCreateRole({
    roleDetail: { isSelected: true },
  })
  const [isOpenModal, setIsOpenModal] = useState(false)
  const { snackbar } = useSnackbar()
  const { push } = useRouter()

  const onSaveClick = useCallback(() => {
    setIsOpenModal(true)
  }, [])
  const onCancelClick = useCallback(() => {
    push("/roles")
  }, [push])

  const { mutate: addRole } = useAddRole()
  const onConfirmAddRole = useCallback(
    (value: RoleValuesType) => {
      const permissionList = Object.entries(value.permissions)
        .filter(([, permission]) => !!permission)
        .map(([item]) => item)
      addRole(
        {
          name: value.name,
          description: value.description,
          isActive: value.isActive === t("role.inputform.active") ? true : false,
          permissionIds: permissionList,
        },
        {
          onSuccess: () => {
            setIsOpenModal(false)
            snackbar({ message: t("role.new.add.success"), type: "success" })
            push("/roles")
          },
          onError: () => {
            setIsOpenModal(false)
            snackbar({ message: t("role.new.add.error"), type: "error" })
          },
        },
      )
    },
    [addRole, push, snackbar, t],
  )
  const onCancelAddRole = useCallback(() => {
    setIsOpenModal(false)
  }, [])
  const initialValues = {
    isActive: t("role.inputform.active"),
  }

  return (
    <div>
      <Form<AddRoleFormValues>
        onSubmit={onConfirmAddRole}
        mutators={{ ...arrayMutators }}
        subscription={{ values: true, invalid: true, errors: true }}
        initialValues={initialValues}
        validate={(values) => {
          const error: FormValueErrorsType<AddRoleFormValues> = {}
          if (!values.name) {
            error.name = t("role.name.validate")
          }
          const permissionList = Object.entries(values.permissions || {})
            .filter(([, permission]) => !!permission)
            .map(([item]) => item)
          if (!permissionList.length) {
            error.permissions = t("role.permission.validate")
          }
          return error
        }}
      >
        {({ handleSubmit, form, invalid, errors }) => {
          return (
            <form onSubmit={handleSubmit}>
              <CardLayout>
                <Box height="8px" />
                <Header>{t("role.inputform.header.general")}</Header>
                <Box height="28px" />
                <GridLayout>
                  <InputField
                    name="name"
                    label={t("role.inputform.subtitle.role")}
                    placeholder={"กรุณากรอกข้อมูล"}
                  />
                  <Box>
                    {/* <OldSarabun type="XsSubtitle">
                      {t("role.inputform.subtitle.status")}
                    </OldSarabun>
                    <Box height="8px" /> */}
                    {/* <SwitchButtonField
                      options={[
                        t("role.inputform.active"),
                        t("role.inputform.notactive"),
                      ]}
                      name="isActive"
                    /> */}
                    <SwitchField
                      name={"isActive"}
                      label={"สถานะปัจจุบัน"}
                      isRequired
                      type="checkbox"
                    />
                  </Box>
                </GridLayout>
                <Box height="16px" />
                <Input
                  placeholder={"กรุณากรอกข้อมูล"}
                  name="description"
                  label={t("role.inputform.subtitle.description")}
                />
                <Box height="39px" />
                <Kanit type="SmTitle">{t("role.inputform.title.permission")}</Kanit>
                <Box height="30px" />
                {permissionData?.roleDetail.permissions
                  .filter((item) => item.featureName !== null)
                  .map((d, index) => {
                    return (
                      <PermissionField
                        key={index}
                        permissionName={d.featureName}
                        subjects={d.subjects}
                        change={form.change}
                      />
                    )
                  })}
              </CardLayout>
              <Box height={24} />
              <GridFooter>
                <Box display="flex">
                  <Box flex="1"></Box>
                  <BoxMargin>
                    <GridButtonLayout>
                      <Button
                        buttonType="text"
                        onClick={onCancelClick}
                        backgroundColor={`${WHITE}`}
                        width={100}
                      >
                        {t("role.new.button.cancel")}
                      </Button>
                      <Button
                        onClick={() => {
                          if (!invalid) {
                            onSaveClick()
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
                        {t("role.new.button.save")}
                      </Button>
                    </GridButtonLayout>
                  </BoxMargin>
                </Box>
              </GridFooter>
              <OldModal
                isOpen={isOpenModal}
                onCancel={onCancelAddRole}
                onConfirm={handleSubmit}
                type={"success"}
                maxWidth="sm"
                fullWidth={true}
                title={t("role.new.modal.title")}
              >
                {t("role.new.modal.description")}
              </OldModal>
            </form>
          )
        }}
      </Form>
    </div>
  )
}

export default AddRoleLeftField
