import styled from "@emotion/styled"
import { useTranslation } from "react-i18next"
import { Plus } from "react-feather"
import { useCallback, useState } from "react"
import { Box } from "@mui/material"
import Button from "../../components/common/Button"
import { AssessmentTemplateOrder } from "../../services/set-form/set-form-type"
import { useGetSetFormList } from "../../services/set-form/set-form-query"
import AssessmentTable, { EnumSetFormTemplateType } from "./component/AssessmentTable"
import { TemplateType } from "../../services/enum-typed"
import Sarabun from "../../components/common/Sarabun"
import Tooltip from "../../components/common/Tooltip"
import SelectModal from "./component/SelectModal"
import Icon from "../../components/common/Icon"
import Authorize from "../../components/Authorize"
import { PERMISSIONS } from "../../services/enum-typed"

const Body = styled.div`
  width: 100%;
  height: 100%;
`
const AddButton = styled(Button)`
  padding-right: 40px;
  padding-left: 40px;
  border-radius: 20px;
`
const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 12px;
  /* width: 360px; */
  /* height: 220px; */
  width: fit-content;
  height: fit-content;
  background: #ffffff;
  border-radius: 4px;
  gap: 8px;

  filter: drop-shadow(0px 10px 40px rgba(0, 0, 0, 0.1));
`
const SelectCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  padding: 8px;
  /* width: 336px;
  height: 36px; */
  width: 420px;
  height: 45px;
  background: #ffffff;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  gap: 8px;
  cursor: pointer;
`

const SetFormList = () => {
  const { t } = useTranslation()
  const [openTooltip, setOpenTooltip] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [progressPage, setProgressPage] = useState(1)
  const [progressPageSize, setProgressPageSize] = useState(10)
  const [inProgressOrder, setInProgressOrder] = useState<AssessmentTemplateOrder>(
    AssessmentTemplateOrder.CREATED_AT_DESC,
  )

  const [finishedPage, setFinishedPage] = useState(1)
  const [finishedPageSize, setFinishedPageSize] = useState(10)
  const [finishedOrder, setFinishedOrder] = useState<AssessmentTemplateOrder>(
    AssessmentTemplateOrder.CREATED_AT_DESC,
  )

  const [searchProgress, setSearchProgress] = useState<string>("")
  const [progressFormType, setProgressFormType] = useState(EnumSetFormTemplateType.TOTAL)

  const [searchFinished, setSearchFinished] = useState<string>("")
  const [finishedFormType, setFinishedFormType] = useState(EnumSetFormTemplateType.TOTAL)

  const { data: progressListData, isLoading: isProgressListLoading } = useGetSetFormList({
    useInProgressList: {
      isSelected: true,
      params: {
        q: searchProgress,
        orderBy: inProgressOrder,
        page: progressPage,
        limit: progressPageSize,
        filterBy:
          progressFormType !== EnumSetFormTemplateType.TOTAL && !!progressFormType
            ? progressFormType
            : undefined,
      },
    },
    useFinishedList: {
      isSelected: false,
    },
    useFormDetail: { isSelected: false },
  })

  const { data: finishedListData, isLoading: isFinishedListLoading } = useGetSetFormList({
    useInProgressList: {
      isSelected: false,
    },
    useFinishedList: {
      isSelected: true,
      params: {
        q: searchFinished,
        orderBy: finishedOrder,
        page: finishedPage,
        limit: finishedPageSize,
        filterBy:
          finishedFormType !== EnumSetFormTemplateType.TOTAL && !!finishedFormType
            ? finishedFormType
            : undefined,
      },
    },
    useFormDetail: { isSelected: false },
  })

  const [templateType, setTemplateType] = useState<TemplateType>(TemplateType.KPI)

  const onClickOpenTooltip = useCallback(() => {
    setOpenTooltip(!openTooltip)
  }, [openTooltip])

  const onClickCloseTooltip = useCallback(() => {
    setOpenTooltip(false)
  }, [])

  const onClickOpenModal = useCallback((type: TemplateType) => {
    setTemplateType(type)
    setOpenModal(true)
    setOpenTooltip(false)
  }, [])

  return (
    <Body>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Sarabun type="H2" style={{ color: "white" }}>
          {t("จัดการแบบฟอร์มการประเมิน")}
        </Sarabun>
        <Authorize
          permissions={[
            PERMISSIONS.MANAGE_FORMS_KPI_CREATE,
            PERMISSIONS.MANAGE_FORMS_ONE_YEAR_CREATE,
            PERMISSIONS.MANAGE_FORMS_PROBATION_CREATE,
          ]}
        >
          <Tooltip
            isToggle={true}
            open={openTooltip}
            title={
              <TitleDiv>
                <Sarabun>เลือกประเภทของแบบฟอร์ม</Sarabun>
                <Authorize permissions={[PERMISSIONS.MANAGE_FORMS_KPI_CREATE]}>
                  <SelectCard onClick={onClickOpenModal.bind(null, TemplateType.KPI)}>
                    <Icon iconName="globeStand" height={25} width={25} />
                    <Sarabun type="Subtitle2">ประจำไตรมาส</Sarabun>
                  </SelectCard>
                </Authorize>
                <Authorize permissions={[PERMISSIONS.MANAGE_FORMS_ONE_YEAR_CREATE]}>
                  <SelectCard onClick={onClickOpenModal.bind(null, TemplateType.ONE_YEAR)}>
                    <Icon iconName="calendar" height={25} width={25} />
                    <Sarabun type="Subtitle2">ครบรอบ 1 ปี</Sarabun>
                  </SelectCard>
                </Authorize>
                <Authorize permissions={[PERMISSIONS.MANAGE_FORMS_PROBATION_CREATE]}>
                  <SelectCard onClick={onClickOpenModal.bind(null, TemplateType.PROBATION)}>
                    <Icon iconName="probation" height={25} width={25} />
                    <Sarabun type="Subtitle2">ทดลองงาน</Sarabun>
                  </SelectCard>
                </Authorize>
                <SelectCard onClick={() => {}}>
                  <Icon iconName="arrowsCounter360" height={25} width={25} />
                  <Sarabun type="Subtitle2">360 องศา</Sarabun>
                </SelectCard>
              </TitleDiv>
            }
          >
            {openTooltip && (
              <div
                style={{
                  position: "fixed",
                  top: "0px",
                  right: "0px",
                  bottom: "0px",
                  left: "0px",
                  zIndex: 1,
                }}
                onClick={onClickCloseTooltip}
              />
            )}

            <AddButton
              startIcon={<Plus color="#ffffff" />}
              onClick={onClickOpenTooltip}
              style={{
                padding: "0 40px 0 40px",
                borderRadius: "12px",
              }}
            >
              <Sarabun
                type="Button"
                color="while (condition) {
              
            }"
              >
                {t("สร้างฟอร์มใหม่")}
              </Sarabun>
            </AddButton>
          </Tooltip>
        </Authorize>
      </div>
      <Box height={20} />
      <div style={{ backgroundColor: "white", padding: "20px" }}>
        <AssessmentTable
          data={progressListData?.inProgressList}
          orderUseStates={[inProgressOrder, setInProgressOrder]}
          isLoading={isProgressListLoading}
          pageStates={[progressPage, setProgressPage]}
          perPageStates={[progressPageSize, setProgressPageSize]}
          setSearchValue={setSearchProgress}
          setFormType={setProgressFormType}
        />
      </div>
      <Box height={20} />
      <div style={{ backgroundColor: "white", padding: "20px" }}>
        <AssessmentTable
          type="end"
          data={finishedListData?.finishedList}
          orderUseStates={[finishedOrder, setFinishedOrder]}
          isLoading={isFinishedListLoading}
          pageStates={[finishedPage, setFinishedPage]}
          perPageStates={[finishedPageSize, setFinishedPageSize]}
          setSearchValue={setSearchFinished}
          setFormType={setFinishedFormType}
        />
      </div>
      <SelectModal visibleUseState={[openModal, setOpenModal]} templateType={templateType} />
    </Body>
  )
}

export default SetFormList
