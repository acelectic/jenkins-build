import styled from "@emotion/styled"
import Modal from "../../components/common/Modal"
import Sarabun from "../../components/common/Sarabun"
import { ERROR, GRAYSCALE_DARKGRAY_80, PRIMARY_DARK } from "../../constants/colors"
import { makeStyles } from "@mui/styles"
import { Box } from "@mui/material"
import Icon from "../../components/common/Icon"
import Button from "../../components/common/Button"
import KpiTransactionDetailsField from "../../components/KpiTransactionDetailsField"

import { Form } from "react-final-form"
import arrayMutators from "final-form-arrays"
import {
  useDeleteKpiTransactionDetail,
  useGetKpiTransactionDetail,
} from "../../services/manage-kpi/manage-kpi-query"
import { useCallback, useMemo, useState } from "react"

import { useHistory } from "react-router-dom"
import paths from "../../constants/paths"
import Authorize from "../../components/Authorize"
import { PERMISSIONS } from "../../services/enum-typed"
import { useTranslation } from "react-i18next"
import ModalViewUserManageKpi from "../../components/ModalViewUserManageKpi"
import ConfirmDeleteModal from "./Component/ConfirmDeleteModal"
import ConfirmEditModal from "./Component/ConfirmEditModal"

const useStyle = makeStyles((theme) => ({
  detailTemplateColumn: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "40px",
  },
  detailTemplateRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  copyTemplate: {
    display: "flex",
    flex: 3,
    justifyContent: "end",
  },
  chooseTemplate: {
    display: "flex",
    flexDirection: "column",
  },
  createTemplate: {
    backgroundColor: "gray",
    padding: "32px",
    cursor: "pointer",
  },
  copyCreateTemplate: {
    backgroundColor: "gray",
    padding: "32px",
  },
  whiteColor: {
    color: "#FFFFFF",
  },
  nameEvaluatorText: {
    backgroundColor: "#E7E8EE",
    padding: 16,
  },
  nameEvaluatorArea: {
    display: "flex",
    marginLeft: 24,
  },
  divider: {
    backgroundColor: "black",
    height: "1px",
  },
  detailHeader: {
    display: "flex",
    marginLeft: 24,
  },
}))

const Row = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  width: 100%;
`

const FieldAndHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: 100%;
  height: 100%;
`
const SarabunOnClick = styled(Sarabun)`
  border-bottom: 1px solid ${PRIMARY_DARK};
  :hover {
    cursor: pointer;
  }
`

type IKpiDetailModalProps = {
  visibleUseStates: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  kpiTransactionDetailId: string
}

const KpiDetailModal = (props: IKpiDetailModalProps) => {
  const { kpiTransactionDetailId, visibleUseStates } = props
  const { t } = useTranslation()
  const history = useHistory()
  const classes = useStyle()
  const [isOpenModal, setIsOpenModal] = visibleUseStates
  const [isOpenModalViewUser, setIsOpenModalViewUser] = useState(false)
  const [isOpenModalConfirmDel, setIsOpenModalConfirmDel] = useState(false)
  const [isOpenModalConfirmEdit, setIsOpenModalConfirmEdit] = useState(false)

  const { data, isLoading } = useGetKpiTransactionDetail(kpiTransactionDetailId)
  const { mutate: deleteKpiTransactionDetail } = useDeleteKpiTransactionDetail()

  const initialValues = useMemo(() => {
    if (!!data?.kpiTransactionDetail) {
      return {
        kpiType: data?.kpiTransactionDetail?.kpiType,
        name: data?.kpiTransactionDetail?.name,
        description: data?.kpiTransactionDetail?.description,
        target: data?.kpiTransactionDetail?.target,
        unitType: data?.kpiTransactionDetail?.unitType,
        customUnitType: data?.kpiTransactionDetail?.customUnitType,
        scoreType: data?.kpiTransactionDetail?.scoreType,
        weight: data?.kpiTransactionDetail?.weight,
        actual: data?.kpiTransactionDetail?.actual,
        goalCategory: data?.kpiTransactionDetail?.goalCategory,
        scales: data?.kpiTransactionDetail.jsonScale.jsonScaleDetails,
        positionTarget: data?.kpiTransactionDetail.jsonScale.positionTarget,
      }
    }
  }, [data])

  const onClickConfirmEdit = useCallback(() => {
    history.push(
      paths.manageKpiEditKpi({
        routeParam: {
          kpiTransactionDetailId: kpiTransactionDetailId,
        },
      }),
    )
  }, [history, kpiTransactionDetailId])

  const onClickCopy = useCallback(() => {
    history.push(
      paths.manageKpiCopyKpi({
        routeParam: {
          kpiTransactionDetailId: kpiTransactionDetailId,
        },
      }),
    )
  }, [history, kpiTransactionDetailId])

  const onClickDel = useCallback(() => {
    setIsOpenModalConfirmDel(true)
  }, [])

  const onClickEdit = useCallback(() => {
    setIsOpenModalConfirmEdit(true)
  }, [])

  const onClickOpenModalViewUser = useCallback(() => {
    setIsOpenModalViewUser(true)
  }, [])

  const onConfirmDelete = useCallback(() => {
    deleteKpiTransactionDetail(kpiTransactionDetailId, {
      onSuccess: () => {
        setIsOpenModal(false)
        setIsOpenModalConfirmDel(false)
      },
    })
  }, [deleteKpiTransactionDetail, kpiTransactionDetailId, setIsOpenModal])

  return (
    <Modal
      visibleUseState={[isOpenModal, setIsOpenModal]}
      closeOnClickOutside={false}
      showOkButton={false}
      showCancelButton={false}
      showCloseIcon={true}
      maxWidth={"900px"}
      isLoading={isLoading}
      fitMaxWidth
    >
      <div className={classes.detailTemplateColumn}>
        <div className={classes.detailTemplateRow}>
          <Sarabun type="H4">เป้าหมายที่สร้างให้พนักงาน</Sarabun>
          <div className={classes.copyTemplate}>
            <Authorize
              permissions={[PERMISSIONS.MANAGE_KPI_ASSIGNMENT_MANAGE_KPI_ASSIGNMENT_CREATE]}
            >
              <Button
                startIcon={<Icon iconName="copyWhite" width={24} height={24} />}
                onClick={onClickCopy}
              >
                คัดลอกเป้าหมาย
              </Button>
            </Authorize>
            <Authorize
              permissions={[PERMISSIONS.MANAGE_KPI_ASSIGNMENT_MANAGE_KPI_ASSIGNMENT_DELETE]}
            >
              <Box width={16} />
              <Button
                onClick={onClickDel}
                startIcon={<Icon iconName="trashWhite" width={24} height={24} />}
              >
                ลบเป้าหมาย
              </Button>
            </Authorize>
            <Authorize
              permissions={[PERMISSIONS.MANAGE_KPI_ASSIGNMENT_MANAGE_KPI_ASSIGNMENT_UPDATE]}
            >
              <Box width={16} />
              <Button
                onClick={onClickEdit}
                startIcon={<Icon iconName="pencilWhite" width={24} height={24} />}
              >
                แก้ไขเป้าหมาย
              </Button>
            </Authorize>
          </div>
        </div>
        <Form onSubmit={() => {}} mutators={{ ...arrayMutators }} initialValues={initialValues}>
          {() => {
            return (
              <>
                <KpiTransactionDetailsField
                  viewMode
                  viewModeEdit={true}
                  optionsDropdownUnit={[]}
                  optionsDropdownType={[]}
                  isShowBorder={false}
                  isShowMiniKpiReportCard={false}
                />
                <FieldAndHeader>
                  <div style={{ display: "flex" }}>
                    <Sarabun
                      type="Body2"
                      color={GRAYSCALE_DARKGRAY_80}
                    >{`กลุ่มพนักงานที่ใช้เป้าหมายนี้`}</Sarabun>

                    <Sarabun type="Body2" color={ERROR}>
                      *
                    </Sarabun>
                  </div>
                  <Row style={{ gap: "12PX", alignItems: "center" }}>
                    {!!data?.kpiTransactionDetail && (
                      <Sarabun type="Subtitle1">{`${data?.kpiTransactionDetail?.kpiTransactions.length} คน`}</Sarabun>
                    )}
                    <SarabunOnClick
                      type="Subtitle1"
                      color={`${PRIMARY_DARK}`}
                      onClick={onClickOpenModalViewUser}
                    >
                      {t(`ดูรายชื่อพนักงาน`)}
                    </SarabunOnClick>
                  </Row>
                </FieldAndHeader>
              </>
            )
          }}
        </Form>
      </div>
      <ModalViewUserManageKpi
        visibleUseState={[isOpenModalViewUser, setIsOpenModalViewUser]}
        usersData={data?.kpiTransactionDetailUsers.data || []}
      />
      <ConfirmDeleteModal
        isOpen={isOpenModalConfirmDel}
        setIsOpen={setIsOpenModalConfirmDel}
        onCancel={() => {
          setIsOpenModalConfirmDel(false)
        }}
        onConfirm={onConfirmDelete}
      />
      <ConfirmEditModal
        isOpen={isOpenModalConfirmEdit}
        setIsOpen={setIsOpenModalConfirmEdit}
        onCancel={() => {
          setIsOpenModalConfirmEdit(false)
        }}
        onConfirm={onClickConfirmEdit}
      />
    </Modal>
  )
}

export default KpiDetailModal
