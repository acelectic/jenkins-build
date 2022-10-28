import styled from "@emotion/styled"
import { useTranslation } from "react-i18next"
import { Paging } from "../services/entity-typed"
import { EmployeeForKpiTemplate } from "../services/set-form/set-form-type"
import Modal from "./common/Modal"
import Sarabun from "./common/Sarabun"
import Table from "./common/Table"
import { useCallback } from "react"

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`
type ModalViewEmployeesKpiProps = {
  visibleUseState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  employeeResponse?: EmployeeForKpiTemplate[]
  pagingResponse?: Paging
  pageState: [number, React.Dispatch<React.SetStateAction<number>>]
  pageSizeState: [number, React.Dispatch<React.SetStateAction<number>>]
  isLoading: boolean
}

const ModalViewEmployeesKpi = (props: ModalViewEmployeesKpiProps) => {
  const { t } = useTranslation()
  const {
    visibleUseState,
    employeeResponse,
    pagingResponse,
    pageState,
    pageSizeState,
    isLoading,
  } = props
  const [page, setPage] = pageState
  const [pageSize, setPageSize] = pageSizeState
  const [isOpenModal, setIsOpenModal] = visibleUseState

  const onChangePage = useCallback(
    (page: number) => {
      setPage(page)
    },
    [setPage]
  )
  const onChangeRowsPerPage = useCallback(
    (rowsPerPage: number) => {
      setPageSize(rowsPerPage)
      setPage(1)
    },
    [setPage, setPageSize]
  )
  return (
    <Modal
      visibleUseState={[isOpenModal, setIsOpenModal]}
      style={{ width: "100%", maxWidth: "fit-content", overflow: "auto" }}
      showCancelButton={false}
      showOkButton={false}
    >
      <FlexCol>
        <Sarabun type="H4">รายชื่อพนักงาน</Sarabun>
        <Table
          page={page}
          onChangeRowsPerPage={onChangeRowsPerPage}
          totalSize={pagingResponse?.totalRecords}
          onChangePage={onChangePage}
          initRowsPerPage={10}
          style={{ width: "900px", marginTop: "16px" }}
          isLoading={isLoading}
        >
          <Table.Head>
            <Table.Row>
              <Table.Cell style={{ paddingLeft: "8px" }}>
                {t("table.index")}
              </Table.Cell>
              <Table.Cell width={"20%"}>{t("table.employeeId")}</Table.Cell>
              <Table.Cell>{t("table.name")}</Table.Cell>
              <Table.Cell>{t("table-store")}</Table.Cell>
              <Table.Cell>{t("table.position")}</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {employeeResponse?.map((employee, index) => {
              const {
                employeeId,
                firstName,
                lastName,
                positionName,
                storeName,
              } = employee
              return (
                <Table.Row key={index} style={{ cursor: "pointer" }} hover>
                  <Table.Cell style={{ paddingLeft: "8px" }}>
                    <Sarabun type="Body2">{`${
                      index + 1 + (page - 1) * pageSize
                    }`}</Sarabun>
                  </Table.Cell>
                  <Table.Cell>{employeeId}</Table.Cell>
                  <Table.Cell>{`${firstName} ${lastName}`}</Table.Cell>
                  <Table.Cell>{`${storeName || "-"}`}</Table.Cell>
                  <Table.Cell>{positionName || "-"}</Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </FlexCol>
    </Modal>
  )
}

export default ModalViewEmployeesKpi
