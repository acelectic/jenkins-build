import TitleLayout from "../../../components/common/TitleLayout"
import styled from "styled-components/macro"
import { Box, Grid } from "@mui/material"
import { Form } from "react-final-form"
import { DropdownField, InputField } from "../../../components/fields"
import RoleList from "../component/RoleList"
import { useState, useCallback } from "react"
import Card from "../../../components/common/Card"
import { Plus } from "react-feather"
import { breakpoints } from "../../../utils/responsive-helper"
import { useRouter } from "../../../utils/helper"
import { useTranslation } from "react-i18next"
import { OnChange } from "react-final-form-listeners"
import Authorize from "../../../components/Authorize"
import { PERMISSIONS } from "../../../services/enum-typed"
import { WHITE } from "../../../constants/colors"
import Button from "../../../components/common/Button"
import { RoleFilterByOptions } from "../../../services/enum-typed"
import Sarabun from "../../../components/common/Sarabun"

const BoxMargin = styled(Box)`
  > *:not(:last-of-type) {
    margin-right: 8px;
  }
`
const AddButton = styled(Button)`
  padding-right: 18px;
  padding-left: 18px;
`

const BoxFilter = styled(Box)`
  padding-top: 7px;
`

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
  ${breakpoints.down("lg")} {
    grid-template-columns: repeat(1, 1fr);
  }
`
const GridFilter = styled.div`
  display: grid;
  grid-template-columns: 0.25fr 1fr;
  grid-auto-flow: row;
  gap: 16px;
  grid-template-rows: 2, 2px;
  margin-bottom: 8px;
  margin-right: 20px;
`
const CardLayout = styled(Card)`
  margin-bottom: unset;
  .MuiCardContent-root {
    padding: 24px;
    padding-bottom: 32px;
  }
`

const RoleView = () => {
  const { push } = useRouter()

  const { t } = useTranslation()

  const [query, setQuery] = useState("")
  const [dropdownStatus, setDropdownStatus] = useState(RoleFilterByOptions.ALL)

  const onAddClick = useCallback(() => {
    push("/roles/new")
  }, [push])

  const onSearch = useCallback((event: any) => {
    const value = event.target.value
    setQuery(value)
  }, [])

  return (
    <div>
      <TitleLayout display="flex">
        <Box flex="1">
          <Sarabun type="H2" color={WHITE}>
            {t("role.title")}
          </Sarabun>
        </Box>
        <BoxMargin>
          <Authorize permissions={[PERMISSIONS.MANAGE_ROLE_MANAGE_ROLE_CREATE]}>
            <AddButton startIcon={<Plus color={WHITE} />} onClick={onAddClick}>
              {t("role.addRole")}
            </AddButton>
          </Authorize>
        </BoxMargin>
      </TitleLayout>
      <GridLayout>
        <Box>
          <CardLayout>
            <Form onSubmit={() => {}}>
              {({ handleSubmit }) => {
                return (
                  <form onSubmit={handleSubmit} style={{ display: "inline" }}>
                    <GridFilter>
                      <BoxFilter>
                        <DropdownField
                          name="status"
                          label={t("role.active")}
                          options={[
                            {
                              label: t("role.label.total"),
                              value: RoleFilterByOptions.ALL,
                            },
                            {
                              label: t("role.label.active"),
                              value: RoleFilterByOptions.ACTIVE,
                            },
                            {
                              label: t("role.label.notActive"),
                              value: RoleFilterByOptions.INACTIVE,
                            },
                          ]}
                          initialValue={RoleFilterByOptions.ALL}
                        />
                      </BoxFilter>
                      <div style={{ paddingTop: "7px" }}>
                        <InputField
                          name="searchRole"
                          label="ค้นหา"
                          placeholder={t("ชื่อบทบาท")}
                          IconName="searchGlass"
                          startIcon={true}
                          onKeyPress={(event) => {
                            if (event.key === "Enter") {
                              onSearch(event)
                            }
                          }}
                        />

                        <OnChange name="status">
                          {(value: any) => {
                            setDropdownStatus(value)
                          }}
                        </OnChange>
                      </div>
                    </GridFilter>
                  </form>
                )
              }}
            </Form>
            <Box height={32} />
            <Grid>
              <RoleList q={query} dropdownStatus={dropdownStatus} />
            </Grid>
          </CardLayout>
        </Box>
      </GridLayout>
    </div>
  )
}

export default RoleView
