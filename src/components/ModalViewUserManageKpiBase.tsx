/* eslint-disable @typescript-eslint/naming-convention */
import styled from "@emotion/styled"
import { useTranslation } from "react-i18next"
import { IKpiTransactionDetailUserResponse } from "../services/manage-kpi/mange-kpi-type"
import Modal from "./common/Modal"
import Sarabun from "./common/Sarabun"
import Table from "./common/Table"

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`

type IModalViewUserManageKpiBaseProps = {
  visibleUseState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  data: IKpiTransactionDetailUserResponse[]
  page: number
  pageSize: number
  totalSize: number
  onChangePage: (page: number) => void
  onChangeRowsPerPage: (page: number) => void
}

const ModalViewUserManageKpiBase = (props: IModalViewUserManageKpiBaseProps) => {
  const {
    visibleUseState,
    data,
    page,
    pageSize,
    totalSize,
    onChangePage,
    onChangeRowsPerPage,
  } = props
  const { t } = useTranslation()

  return (
    <Modal
      visibleUseState={visibleUseState}
      style={{
        width: "100%",
        maxWidth: "fit-content",
        overflow: "auto",
        minWidth: "800px",
      }}
      showCancelButton={false}
      showOkButton={false}
    >
      <FlexCol>
        <Sarabun
          style={{
            marginBottom: "20px",
          }}
          type="H4"
        >
          {t("รายชื่อพนักงาน")}
        </Sarabun>
        <Table
          page={page}
          onChangeRowsPerPage={onChangeRowsPerPage}
          totalSize={totalSize}
          onChangePage={onChangePage}
          initRowsPerPage={pageSize}
          style={{ minWidth: "800px" }}
        >
          <Table.Head>
            <Table.Row>
              <Table.Cell>{t("table.index")}</Table.Cell>
              <Table.Cell>{t("table.employeeId")}</Table.Cell>
              <Table.Cell>{t("table.name")}</Table.Cell>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            {data.map((employee, index) => {
              const { employeeId, firstName, lastName, prefix } = employee
              return (
                <Table.Row key={employeeId} style={{ cursor: "pointer" }} hover>
                  <Table.Cell style={{ alignItems: "center" }}>{index + 1}</Table.Cell>
                  <Table.Cell>{employeeId}</Table.Cell>
                  <Table.Cell>{`${prefix} ${firstName} ${lastName}`}</Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </FlexCol>
    </Modal>
  )
}

export default ModalViewUserManageKpiBase
