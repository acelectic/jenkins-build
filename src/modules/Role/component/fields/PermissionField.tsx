import { Box } from "@mui/material"
import { useEffect, useState, Fragment } from "react"
import { OnChange } from "react-final-form-listeners"
import { Divider as MuiDivider } from "@mui/material"
import styled from "styled-components"
import Card from "../../../../components/common/Card"
import OldSarabun from "../../../../components/common/OldSarabun"
import { SwitchField } from "../../../../components/fields"
import { SubjectType } from "../../../../services/role/role-type"
import { spacing } from "@mui/system"
import { Field, useFormState } from "react-final-form"
import { result } from "lodash"
import { useTranslation } from "react-i18next"

import Checkbox from "../../../../components/common/Checkbox"

type PermissionType = {
  permissionName: string
  subjects: SubjectType[]
  change: Function
}

const BoxSpace = styled(Box)`
  padding-left: 19px;
  cursor: pointer;
`

const BoxPermissionSpace = styled(Box)`
  padding-left: 19px;
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
  flex: 6;
`
const CardLayout = styled(Card)`
  min-width: 150px;
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0px;
  margin-bottom: 12px;
  border: 1px solid;
  border-color: #dcdee5;
  .MuiCardContent-root {
    padding: unset;
  }
`
const BoxMargin = styled(Box)`
  > *:not(:last-of-type) {
    margin-right: 8px;
  }

  margin-top: 9px;
  margin-right: 38px;
`
const Divider = styled(MuiDivider)(spacing)

const PermissionField = (props: PermissionType) => {
  const { t } = useTranslation()
  const { permissionName, subjects, change } = props
  const [hide, setHide] = useState(true)
  const formState = useFormState()
  useEffect(() => {
    const start = result(formState.values, permissionName)
    setHide(!start)
  }, [formState.values, permissionName])

  return (
    <CardLayout>
      <Box display="flex">
        <BoxSpace flex="1">
          <Field name={permissionName} type="checkbox">
            {({ input }) => {
              return (
                <Checkbox
                  onClick={setHide.bind(null, !hide)}
                  checked={input.checked}
                  label={`${t(`permission.feathers.name.${permissionName}`)}`}
                  onChange={() => {
                    input.onChange(!input.checked)
                  }}
                  color="primary"
                />
              )
            }}
          </Field>
        </BoxSpace>
        {hide ? null : (
          <BoxMargin>
            <OldSarabun
              type="ParagraphBold"
              color="#2C3D92"
              onClick={() => {
                subjects.map((permissionItem) =>
                  permissionItem.permissions.map((item) => change(`permissions.${item.id}`, true)),
                )
              }}
              style={{ cursor: "pointer", textDecorationLine: "underline" }}
            >
              {t("role.permission.all")}
            </OldSarabun>
          </BoxMargin>
        )}
      </Box>
      <OnChange name={permissionName}>
        {(values: any) => {
          if (!values) {
            subjects.map((permissionItem) =>
              permissionItem.permissions.map((item) => change(`permissions.${item.id}`, false)),
            )
          }
        }}
      </OnChange>
      {hide ? null : (
        <div>
          <Divider />
          <BoxPermissionSpace>
            {subjects.map((permissionItem) => {
              return (
                <BoxContentCard key={permissionItem.subjectName}>
                  <OldSarabun type="Paragraph" style={{ flex: 3, minWidth: 150 }}>
                    {t(`permission.subjects.name.${permissionItem.subjectName}`)}
                  </OldSarabun>

                  <OldSarabun
                    type="ParagraphBold"
                    color="#2C3D92"
                    onClick={() => {
                      permissionItem.permissions.map((item) =>
                        change(`permissions.${item.id}`, true),
                      )
                    }}
                    style={{
                      cursor: "pointer",
                      flex: 1,
                      minWidth: 45,
                      textDecorationLine: "underline",
                    }}
                  >
                    {t("role.permission.choose")}
                  </OldSarabun>
                  <BoxPermissionCard>
                    {permissionItem.permissions.map((item) => {
                      return (
                        <Fragment key={item.id}>
                          <SwitchField
                            name={`permissions.${item.id}`}
                            type={"checkbox"}
                            textOn={t(`permission.actions.${item.action}`)}
                            textOff={t(`permission.actions.${item.action}`)}
                          >
                            {t(`permission.actions.${item.action}`)}
                          </SwitchField>
                          <Box width={8} />
                        </Fragment>
                      )
                    })}
                  </BoxPermissionCard>
                </BoxContentCard>
              )
            })}
          </BoxPermissionSpace>
        </div>
      )}
    </CardLayout>
  )
}

export default PermissionField
