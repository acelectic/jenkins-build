import styled from "@emotion/styled"
import { Box } from "@mui/material"
import { useCallback, useMemo, useState } from "react"
import { useHistory } from "react-router-dom"
import Authorize from "../../components/Authorize"
import Button from "../../components/common/Button"
import Sarabun from "../../components/common/Sarabun"
import ChooseGoalModal from "../../components/ModalComponent/ChooseGoalModal"
import { WHITE } from "../../constants/colors"
import paths from "../../constants/paths"
import { ManageKpiOrder, PERMISSIONS } from "../../services/enum-typed"
import CopyEmpty from "./Component/CopyGoalModal/components/CopyEmpty"
import CopyGoalModal from "./Component/CopyGoalModal/CopyGoal"
import CopyLibraryModal from "./Component/CopyLibraryModal/CopyLibrary"
import KpiDetailModal from "./KpiDetailModal"
import { useGetManageKpi } from "../../services/manage-kpi/manage-kpi-query"
import KpiTransactionDetailTable from "./Component/KpiTransactionDetailTable"
import { useTranslation } from "react-i18next"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 0px solid red;
  height: 100%;
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;
`

const ManageKpi = () => {
  const history = useHistory()
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [orderBy, setOrderBy] = useState<ManageKpiOrder>(ManageKpiOrder.NAME_ASC)

  const [isOpenChooseGoalModal, setIsOpenChooseGoalModal] = useState(false)
  const [isOpenKpiDetailModal, setIsOpenKpiDetailModal] = useState(false)
  const [kpiTransactionDetailId, setKpiTransactionDetailId] = useState("")
  const [isOpenCopyGoal, setOpenCopyGoal] = useState<boolean>(false)
  const [isOpenCopyLibrary, setIsOpenCopyLibrary] = useState<boolean>(false)
  const [isOpenEmpty, setIsOpenEmpty] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState("")

  const { data: manageKpiData, isLoading: isManageKpiLoading } = useGetManageKpi({
    kpiTransactionDetails: {
      isSelected: true,
      params: {
        isActiveTemplate: true,
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

  const onHistoryClick = useCallback(() => {
    history.push(paths.manageKpiHistory())
  }, [history])

  const onCreateKpiClick = useCallback(() => {
    history.push(paths.manageKpiCreate())
  }, [history])

  const onDetailClick = useCallback((kpiTransactionDetailId: string) => {
    setKpiTransactionDetailId(kpiTransactionDetailId)
    setIsOpenKpiDetailModal(true)
  }, [])

  const onOpenEmpty = useCallback(() => {
    setIsOpenEmpty(true)
  }, [])

  const closeEmpty = useCallback(() => {
    setIsOpenEmpty(false)
  }, [])

  const onOpenCopyGoal = useCallback(() => {
    if (!!manageKpiData?.oldKpiTransactions.length) {
      setOpenCopyGoal(true)
    } else {
      onOpenEmpty()
    }
    setIsOpenChooseGoalModal(false)
  }, [manageKpiData?.oldKpiTransactions.length, onOpenEmpty])

  const onOpenCopyLibrary = useCallback(() => {
    if (!!manageKpiData?.kpiLibrary.length) {
      setIsOpenCopyLibrary(true)
    } else {
      onOpenEmpty()
    }
    setIsOpenChooseGoalModal(false)
  }, [manageKpiData?.kpiLibrary.length, onOpenEmpty])

  const closeCopyGoal = useCallback(() => {
    setOpenCopyGoal(false)
  }, [])
  const closeCopyLibrary = useCallback(() => {
    setIsOpenCopyLibrary(false)
  }, [])

  const isEmptyData: boolean = useMemo(
    () =>
      !manageKpiData ||
      !manageKpiData.kpiTransactionDetails ||
      !manageKpiData.kpiTransactionDetails.data.length
        ? true
        : false,
    [manageKpiData],
  )

  return (
    <Container>
      <TitleContainer>
        <Sarabun type="H2" color={WHITE}>
          {t(`สร้างเป้าหมายให้พนักงาน`)}
        </Sarabun>
        <ButtonArea>
          <Button buttonType="outlined" backgroundColor={WHITE} onClick={onHistoryClick}>
            <Sarabun>{t(`ดูประวัติ`)}</Sarabun>
          </Button>
          <Box width={16} />
          <Authorize permissions={[PERMISSIONS.MANAGE_KPI_ASSIGNMENT_MANAGE_KPI_ASSIGNMENT_CREATE]}>
            <Button onClick={setIsOpenChooseGoalModal.bind(null, true)}>
              <Sarabun color={WHITE}>{t(`สร้างเป้าหมายใหม่`)}</Sarabun>
            </Button>
          </Authorize>
        </ButtonArea>
      </TitleContainer>

      <KpiTransactionDetailTable
        KpiTransactionDetailData={manageKpiData?.kpiTransactionDetails!}
        isLoading={isManageKpiLoading}
        pageState={[page, setPage]}
        pageSizeState={[pageSize, setPageSize]}
        orderByState={[orderBy, setOrderBy]}
        searchState={[searchValue, setSearchValue]}
        onClickDetail={onDetailClick}
        isEmptyData={isEmptyData}
      />

      <ChooseGoalModal
        onClose={setIsOpenChooseGoalModal.bind(null, false)}
        showModal={isOpenChooseGoalModal}
        setShowModal={setIsOpenChooseGoalModal}
        onOpenCreateGoalModal={onCreateKpiClick}
        onOpenCopyGoalModal={onOpenCopyGoal}
        onOpenChooseFromLibraryModal={onOpenCopyLibrary}
      />
      <KpiDetailModal
        visibleUseStates={[isOpenKpiDetailModal, setIsOpenKpiDetailModal]}
        kpiTransactionDetailId={kpiTransactionDetailId}
      />
      <CopyGoalModal
        isOpenCopyGoal={isOpenCopyGoal}
        closeCopyGoal={closeCopyGoal}
        unit={[]}
        kpiTransactionId={"test"}
        categoryTypes={[]}
        items={manageKpiData?.oldKpiTransactions}
        setOpenCopyGoal={setOpenCopyGoal}
        onNext={() => {
          closeCopyGoal()
        }}
      />

      <CopyLibraryModal
        isOpenCopyLibrary={isOpenCopyLibrary}
        closeCopyLibrary={closeCopyLibrary}
        unit={[]}
        categoryTypes={[]}
        kpiLibraries={undefined}
        jsonScale={undefined}
        kpiTransactionId={"test"}
        setOpenCopyLibrary={setIsOpenCopyLibrary}
        onNext={() => {
          closeCopyLibrary()
        }}
        newKpiLibraryList={manageKpiData?.kpiLibrary}
        maxKpiTransaction={1}
      />
      <CopyEmpty
        openEmptyModal={isOpenEmpty}
        setOpenEmptyModal={setIsOpenEmpty}
        onOk={closeEmpty}
        onClose={closeEmpty}
      />
    </Container>
  )
}

export default ManageKpi
