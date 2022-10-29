import styled from "styled-components/macro"
import { Box } from "@mui/material"
import { InputField, SwitchField } from "../../../../../components/fields"
import { breakpoints } from "../../../../../utils/responsive-helper"
import { useTranslation } from "react-i18next"
import { CreateRoleResponse, RoleDetailItem } from "../../../../../services/role/role-type"
import PermissionField from "../PermissionField"
import Sarabun from "../../../../../components/common/Sarabun"
import { GRAYSCALE_DARKGRAY_40 } from "../../../../../constants/colors"
import { values } from "lodash"

const GridLayout = styled.div`
  display: flex;
  ${breakpoints.down("lg")} {
    grid-template-columns: 1fr;
  }
`

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${GRAYSCALE_DARKGRAY_40};
`

export type IEditRoleFormValues = {
  name: string
  description: string
  isActive: boolean
  permissions: Record<string, boolean>
}

export type IRoleResult = {
  roleDetail: RoleDetailItem | undefined
  change: Function
  permissionData?: CreateRoleResponse
}

export type IRoleID = { roleId: string }

export type IRoleDetailResult = IRoleResult & IRoleID

const EditRoleLeftField = (props: IRoleDetailResult) => {
  const { t } = useTranslation()
  const { change, permissionData } = props

  return (
    <div>
      <Box height="8px" />
      <Sarabun type="H2">{t("แก้ไขบทบาท")}</Sarabun>
      <Box height={32} />
      <Sarabun type="H4">{t("role.inputform.header.general")}</Sarabun>
      <Box height="16px" />
      <GridLayout>
        <InputField
          style={{ minWidth: "378px" }}
          name="name"
          label={t("role.inputform.subtitle.role")}
        />
        <Box width={24} />
        <SwitchField name={"isActive"} label={"สถานะปัจจุบัน"} isRequired type="checkbox" />
      </GridLayout>
      <Box height="16px" />
      <InputField
        name="description"
        style={{ maxWidth: "550px" }}
        label={t("role.inputform.subtitle.description")}
      />
      <Box height="32px" />
      <Divider />
      <Box height="32px" />
      <Sarabun type="H4">{t("role.inputform.title.permission")}</Sarabun>
      <Box height="16px" />
      {permissionData?.roleDetail.permissions
        .filter((item) => item.featureName !== null)
        .map((d, index) => {
          return (
            <PermissionField
              key={values(d).join("-")}
              permissionName={d.featureName}
              subjects={d.subjects}
              change={change}
            />
          )
        })}
    </div>
  )
}

export default EditRoleLeftField
