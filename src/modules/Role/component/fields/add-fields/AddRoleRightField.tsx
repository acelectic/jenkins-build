import Card from "../../../../../components/common/Card"
import OldButton from "../../../../../components/common/OldButton"
import Header from "../../../../../components/common/Header"
import Table from "../../../../../components/common/Table"
import styled from "styled-components/macro"
import { Box } from "@mui/material"
import { useState, useCallback } from "react"
import Loading from "../../../../../components/common/Loading"
import { AutoCompleteField } from "../../../../../components/fields"
import { breakpoints } from "../../../../../utils/responsive-helper"
import { useTranslation } from "react-i18next"
import { Form } from "react-final-form"

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
  max-width: 120px;
  text-overflow: ellipsis;
`
const TableCard = styled(Card)`
  padding: 0px;
  margin: 0px;
`

const AddRoleRightField = () => {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const onChangePage = useCallback((page: number) => {
    setPage(page)
  }, [])
  const onChangeRowsPerPage = useCallback((rowsPerPage: number) => {}, [])

  return (
    <Form onSubmit={() => {}}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <CardLayout disabled>
            <Box height="8px" />
            <Header>{t("role.inputform.header.employee")}</Header>
            <Box height="30px" />
            <GridSelectLayout>
              <AutoCompleteField
                name="userIds"
                placeholder={t("role.inputform.search")}
                style={{ width: "372px" }}
              />
              <AddButton color="primary">{t("role.inputform.button.add")}</AddButton>
            </GridSelectLayout>
            <Box height="50px" />
            <Loading isLoading={false}>
              <TableCard>
                <Table
                  page={page}
                  onChangeRowsPerPage={onChangeRowsPerPage}
                  totalSize={1}
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
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </TableCard>
            </Loading>
          </CardLayout>
        </form>
      )}
    </Form>
  )
}

export default AddRoleRightField
