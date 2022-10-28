import styled from "@emotion/styled"
import { Link } from "@mui/material"
import { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useHistory } from "react-router-dom"
import Icon from "../../../components/common/Icon"
import Sarabun from "../../../components/common/Sarabun"
import { SECONDARY_LIGHT, WHITE } from "../../../constants/colors"
import paths from "../../../constants/paths"
import { ManageKpiOrder } from "../../../services/enum-typed"
import { useGetManageKpi } from "../../../services/manage-kpi/manage-kpi-query"
import KpiTransactionDetailTable from "../Component/KpiTransactionDetailTable"
import KpiDetailModal from "../KpiDetailModal"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 0px solid red;
  height: 100%;
`

const GoToPrevious = styled(Link)`
  display: flex;
  cursor: pointer;
  align-items: center;
  margin-bottom: 32px;
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const KpiHistory = () => {
  const { t } = useTranslation()
  const history = useHistory()

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [orderBy, setOrderBy] = useState<ManageKpiOrder>(ManageKpiOrder.NAME_ASC)

  const [openKpiDetailModal, setOpenKpiDetailModal] = useState(false)
  const [kpiTransactionDetailId, setKpiTransactionDetailId] = useState("")
  const [searchValue, setSearchValue] = useState("")

  const { data: manageKpiData, isLoading: manageKpiLoading } = useGetManageKpi({
    kpiTransactionDetails: {
      isSelected: true,
      params: {
        isActiveTemplate: false,
        page: page,
        limit: pageSize,
        orderBy: orderBy,
        q: searchValue,
      },
    },
    kpiTransactionDetail: {
      isSelected: false,
    },
    kpiTransactionDetailUsers: {
      isSelected: false,
    },
    oldKpiTransactions: { isSelected: true, params: {} },
    kpiLibrary: {
      isSelected: true,
      params: { page: 1, limit: 1000, orderBy: "name_asc" },
    },
    structureOptions: {
      isSelected: false,
    },
    userByHierarchy: {
      isSelected: false,
    },
    options: {
      isSelected: true,
    },
  })

  const gotoMainMenu = useCallback(() => {
    history.push(paths.manageKpi())
  }, [history])

  const onDetailClick = useCallback((kpiTransactionDetailId: string) => {
    console.debug(`click index ${kpiTransactionDetailId}`)
    setKpiTransactionDetailId(kpiTransactionDetailId)
    setOpenKpiDetailModal(true)
  }, [])

  return (
    <Container>
      <GoToPrevious underline="none" onClick={gotoMainMenu}>
        <Icon iconName="caretLeftLightBlue" width={16} height={16} />
        <Sarabun
          type="Subtitle2"
          color={SECONDARY_LIGHT}
          style={{
            borderBottom: `1.2px solid ${SECONDARY_LIGHT}`,
            paddingBottom: "2px",
          }}
        >
          {t(`ย้อนกลับ Main menu`)}
        </Sarabun>
      </GoToPrevious>
      <TitleContainer>
        <Sarabun type="H2" color={WHITE}>
          ประวัติเป้าหมายที่ดำเนินการเสร็จสิ้นแล้ว
        </Sarabun>
      </TitleContainer>
      <KpiTransactionDetailTable
        KpiTransactionDetailData={manageKpiData?.kpiTransactionDetails!}
        isLoading={manageKpiLoading}
        pageState={[page, setPage]}
        orderByState={[orderBy, setOrderBy]}
        pageSizeState={[pageSize, setPageSize]}
        searchState={[searchValue, setSearchValue]}
        onClickDetail={onDetailClick}
        titleText={"เป้าหมายประจำไตรมาสที่ดำเนินการเสร็จสิ้นแล้ว"}
      />
      <KpiDetailModal
        visibleUseStates={[openKpiDetailModal, setOpenKpiDetailModal]}
        kpiTransactionDetailId={kpiTransactionDetailId}
      />
    </Container>
  )
}

export default KpiHistory
