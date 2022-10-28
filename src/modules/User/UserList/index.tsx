import Card from "../../../components/common/Card"
import React, { useState, useCallback } from "react"
import styled from "styled-components/macro"
import { Box } from "@mui/material"
import { DropdownField, InputField } from "../../../components/fields"
import { Form } from "react-final-form"
import TitleLayout from "../../../components/common/TitleLayout"
import UserTable from "../component/UserTable"
import { breakpoints, useScreen } from "../../../utils/responsive-helper"
import { useTranslation } from "react-i18next"
import { OnChange } from "react-final-form-listeners"
import paths from "../../../constants/paths"
import { useHistory } from "react-router-dom"
import { User } from "../../../services/entity-typed"
import { GetAllUserFilter } from "../../../services/enum-typed"
import Sarabun from "../../../components/common/Sarabun"
import { WHITE } from "../../../constants/colors"

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 15px;
  ${breakpoints.down("lg")} {
    grid-template-columns: 1fr;
  }
`

const GridLayoutItem = styled.div`
  display: grid;
  grid-template-columns: 0.25fr 1fr;
  grid-auto-flow: row;
  gap: 16px;
  grid-template-rows: 2, 2px;
  margin-bottom: 8px;
  margin-right: 20px;
`

const TableCard = styled(Card)`
  margin: 0;
  padding: 0;
  margin-top: 20px;
`

const CardLayoutLeft = styled(Card)`
  .MuiCardContent-root {
    padding-top: 8px;
    padding-bottom: 0px;
    padding-left: 5px;
    padding-right: 5px;
  }
  padding: 12px;
`

const SelectBox = styled(Box)`
  /* padding-top: 7px; */
`
const SearchBox = styled.div`
  width: 100%;
`

const UserList = () => {
  const [filterTable, setFilterTable] = useState<GetAllUserFilter>(
    GetAllUserFilter.ALL
  )
  const { t } = useTranslation()
  const { isTablet } = useScreen()
  const [target, setTarget] = useState("")
  const history = useHistory()

  const onClickViewDetailUser = useCallback(
    (data: User) => {
      history.push(
        paths.userDetail({
          routeParam: {
            userId: data.id,
          },
        })
      )
    },
    [history]
  )

  const onSearch = useCallback((event: any) => {
    const value = event.target.value
    setTarget(value)
  }, [])
  return (
    <>
      <TitleLayout display="flex">
        <Box flex="1">
          <Sarabun type="H2" color={WHITE}>
            {t("user.title")}
          </Sarabun>
        </Box>
      </TitleLayout>
      <GridLayout>
        <Box>
          <CardLayoutLeft>
            <Form onSubmit={() => {}} subscription={{}}>
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <GridLayoutItem
                    style={{ flexDirection: isTablet ? "column" : "row" }}
                  >
                    <SelectBox>
                      <DropdownField
                        name="filter"
                        label={t("สถานะ")}
                        options={[
                          {
                            label: t("ดูทั้งหมด"),
                            value: GetAllUserFilter.ALL,
                          },
                          {
                            label: t("ใช้งาน"),
                            value: GetAllUserFilter.STATUS_ACTIVE,
                          },
                          {
                            label: t("ลาออก"),
                            value: GetAllUserFilter.STATUS_INACTIVE,
                          },
                        ]}
                        initialValue={filterTable}
                      />
                    </SelectBox>
                    <OnChange name={"filter"}>
                      {(value) => {
                        setFilterTable(value)
                      }}
                    </OnChange>
                    <SearchBox>
                      <InputField
                        name="search"
                        label="ค้นหา"
                        startIcon={true}
                        IconName="searchGlass"
                        placeholder={t("ชื่อ, หน่วยงาน, บริษัท")}
                        onKeyPress={(event) => {
                          if (event.key === "Enter") {
                            onSearch(event)
                          }
                        }}
                      />
                    </SearchBox>
                  </GridLayoutItem>
                </form>
              )}
            </Form>
            <TableCard>
              <UserTable
                onClickViewDetailUser={onClickViewDetailUser}
                q={target}
                filter={filterTable}
              />
            </TableCard>
          </CardLayoutLeft>
        </Box>
      </GridLayout>
    </>
  )
}

export default UserList
