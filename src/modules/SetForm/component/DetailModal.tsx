import styled from "@emotion/styled"
import dayjs from "dayjs"
import { useCallback, useState } from "react"
import { useHistory } from "react-router-dom"
import Authorize from "../../../components/Authorize"
import Button from "../../../components/common/Button"
import Icon from "../../../components/common/Icon"
import LoadingLayout from "../../../components/common/LoadingLayout"
import Modal from "../../../components/common/Modal"
import Sarabun from "../../../components/common/Sarabun"
import ModalKpiTemplateExample from "../../../components/ModalKpiTemplateExample"
import TemplateDetail from "../../../components/TemplateDetail"
import TemplateDetailOneYear from "../../../components/TemplateDetailOneYear"
import TemplateDetailProbation from "../../../components/TemplateDetailProbation"
import { GRAYSCALE_LIGHTGRAY_10, SECONDARY_DARK, WHITE } from "../../../constants/colors"
import paths from "../../../constants/paths"
import {
  useDeleteKpiTemplate,
  useGetAssessmentTemplateDetail,
  useGetEmployeesByKpiTemplate,
} from "../../../services/set-form/set-form-query"
import {
  AssessmentTypeKpiTemplateResponse,
  TemplateType,
} from "../../../services/set-form/set-form-type"
import { PERMISSIONS } from "../../../services/enum-typed"
import DeleteModal from "./DeleteModal"
import ModalConfirmEdit from "./ModalConfirmEdit"

const Body = styled.div`
  /* display: flex;
  width: 100%;
  flex-direction: column;
  background-color: ${GRAYSCALE_LIGHTGRAY_10}; */
`
const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  box-sizing: border-box;
  background: #ffffff;
  /* border: 1px solid #dbdbdb; */
  /* box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1); */
  border-radius: 8px;
  /* padding: 32px 24px; */
  align-items: flex-start;
  gap: 32px;
`
const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
`
const CustomButton = styled(Button)`
  justify-content: "start";
  justify-items: "start";
  margin-right: 16px;
`

type IDetailModalProps = {
  visibleUseStates: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  type: TemplateType
  templateId: string
  assessmentType: AssessmentTypeKpiTemplateResponse
}

const DetailModal = (props: IDetailModalProps) => {
  const { visibleUseStates, type, templateId, assessmentType } = props
  const [isOpenModal, setIsOpenModal] = visibleUseStates
  const [isOpenExampleModal, setIsOpenExampleModal] = useState(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const history = useHistory()

  const { data, isLoading } = useGetAssessmentTemplateDetail({
    useInProgressList: {
      isSelected: false,
    },
    useFinishedList: {
      isSelected: false,
    },
    useFormDetail: {
      isSelected: true,
      params: { type: type, templateId: templateId },
    },
  })

  const { data: employeeData, isLoading: isLoadingEmployee } = useGetEmployeesByKpiTemplate({
    templateId: templateId,
    isKpiType: type === TemplateType.KPI ? true : false,
    page: page,
    limit: pageSize,
  })

  const { mutate: deleteKpiTemplate } = useDeleteKpiTemplate(assessmentType)

  const onConfirmDelete = useCallback(() => {
    deleteKpiTemplate(templateId, {
      onSuccess: () => {
        setIsOpenModal(false)
      },
    })

    setIsOpenDeleteModal(false)
  }, [deleteKpiTemplate, setIsOpenModal, templateId])

  const onClickDelete = useCallback((id: string) => {
    setIsOpenDeleteModal(true)
  }, [])
  const onClickEdit = useCallback(() => {
    setIsOpenEditModal(true)
  }, [])

  const onClickCopy = useCallback(() => {
    if (type === TemplateType.KPI) {
      history.push(
        paths.kpiFormCopy({
          routeParam: {
            assessmentTemplateId: templateId,
          },
        }),
      )
    } else {
      if (assessmentType === AssessmentTypeKpiTemplateResponse.PROBATION) {
        history.push(
          paths.probationFormCopy({
            routeParam: {
              assessmentTemplateId: templateId,
            },
          }),
        )
      } else if (assessmentType === AssessmentTypeKpiTemplateResponse.ONE_YEAR) {
        history.push(
          paths.oneYearFormCopy({
            routeParam: {
              assessmentTemplateId: templateId,
            },
          }),
        )
      }
    }
    setIsOpenModal(false)
    setIsOpenEditModal(false)
  }, [assessmentType, history, setIsOpenModal, templateId, type])

  const onClickConfirmEdit = useCallback(() => {
    if (assessmentType === AssessmentTypeKpiTemplateResponse.PROBATION) {
      history.push(
        paths.probationFormEdit({
          routeParam: {
            assessmentTemplateId: templateId,
          },
        }),
      )
    } else if (assessmentType === AssessmentTypeKpiTemplateResponse.ONE_YEAR) {
      history.push(
        paths.oneYearFormEdit({
          routeParam: {
            assessmentTemplateId: templateId,
          },
        }),
      )
    }
    setIsOpenModal(false)
    setIsOpenEditModal(false)
  }, [assessmentType, history, setIsOpenModal, templateId])

  const onClickOpenExampleModal = useCallback(() => {
    setIsOpenExampleModal(true)
  }, [])

  return (
    <Modal
      visibleUseState={[isOpenModal, setIsOpenModal]}
      closeOnClickOutside={false}
      showOkButton={false}
      showCancelButton={false}
      showCloseIcon={true}
      maxWidth={"1100px"}
    >
      <Body>
        <ContentHeader>
          <Sarabun type="H4">รายละเอียดแบบฟอร์ม</Sarabun>
          <div style={{ display: "flex" }}>
            <Authorize
              permissions={[
                PERMISSIONS.MANAGE_FORMS_ONE_YEAR_CREATE,
                PERMISSIONS.MANAGE_FORMS_KPI_CREATE,
                PERMISSIONS.MANAGE_FORMS_PROBATION_CREATE,
              ]}
            >
              <CustomButton
                buttonType="contained"
                startIcon={<Icon iconName="twoBox" width={15} height={15} />}
                onClick={onClickCopy}
                textColor={WHITE}
                backgroundColor={SECONDARY_DARK}
              >
                คัดลอกแบบฟอร์ม
              </CustomButton>
            </Authorize>
            <Authorize
              permissions={[
                PERMISSIONS.MANAGE_FORMS_ONE_YEAR_DELETE,
                PERMISSIONS.MANAGE_FORMS_KPI_DELETE,
                PERMISSIONS.MANAGE_FORMS_PROBATION_DELETE,
              ]}
            >
              <CustomButton
                buttonType="contained"
                startIcon={<Icon iconName="trashWhite" width={15} height={15} />}
                onClick={onClickDelete.bind(null, templateId)}
                textColor={WHITE}
                backgroundColor={SECONDARY_DARK}
              >
                ลบแบบฟอร์ม
              </CustomButton>
            </Authorize>
            <DeleteModal
              assessmentType={assessmentType}
              showModal={isOpenDeleteModal}
              setShowModal={setIsOpenDeleteModal}
              onOk={onConfirmDelete}
              onClose={() => {
                setIsOpenModal(false)
                setIsOpenDeleteModal(false)
              }}
            />
            {type === TemplateType.KPI ? (
              <>
                <Authorize permissions={[PERMISSIONS.MANAGE_FORMS_KPI_READ]}>
                  <CustomButton
                    buttonType="contained"
                    startIcon={<Icon iconName="eyeWhite" width={15} height={15} />}
                    onClick={onClickOpenExampleModal}
                    textColor={WHITE}
                    backgroundColor={SECONDARY_DARK}
                  >
                    แสดงตัวอย่าง
                  </CustomButton>
                </Authorize>
                <ModalKpiTemplateExample
                  visibleUseState={[isOpenExampleModal, setIsOpenExampleModal]}
                  data={{
                    calKpi: data?.kpiPeriodTemplate.jsonCalKpi?.cal || 0,
                    calCompany: data?.kpiPeriodTemplate.jsonCalKpiCompany?.cal || 0,
                    calOther: data?.kpiPeriodTemplate.jsonCalKpiOther?.cal || 0,
                    calBehavior: data?.kpiPeriodTemplate.jsonCalBehavior?.cal || 0,
                  }}
                  behaviorTemplateDetails={
                    data?.kpiPeriodTemplate.jsonCalBehavior?.jsonBehavior.behaviorTemplateDetails
                  }
                  year={data?.kpiPeriodTemplate.year}
                  quarter={data?.kpiPeriodTemplate.quarter}
                  startDate={dayjs(data?.kpiPeriodTemplate.startDate)
                    .locale("th")
                    .format("DD MMMM")}
                  endDate={dayjs(data?.kpiPeriodTemplate.endDate).locale("th").format("DD MMMM")}
                  descriptionForUser={data?.kpiPeriodTemplate.descriptionForUser}
                />
              </>
            ) : (
              <>
                <Authorize
                  permissions={[
                    PERMISSIONS.MANAGE_FORMS_ONE_YEAR_UPDATE,
                    PERMISSIONS.MANAGE_FORMS_PROBATION_UPDATE,
                  ]}
                >
                  <CustomButton
                    buttonType="contained"
                    startIcon={<Icon iconName="pencilWhite" width={15} height={15} />}
                    onClick={onClickEdit}
                    textColor={WHITE}
                    backgroundColor={SECONDARY_DARK}
                  >
                    แก้ไขแบบฟอร์ม
                  </CustomButton>
                </Authorize>
                <ModalConfirmEdit
                  assessmentType={assessmentType}
                  setShowConfirmModal={setIsOpenEditModal}
                  showConfirmModal={isOpenEditModal}
                  onClose={() => {
                    setIsOpenModal(false)
                    setIsOpenEditModal(false)
                  }}
                  onOk={onClickConfirmEdit}
                />
              </>
            )}
          </div>
        </ContentHeader>
        <LoadingLayout isLoading={isLoading}>
          <Container>
            {assessmentType === AssessmentTypeKpiTemplateResponse.KPI ? (
              <TemplateDetail
                kpiPeriodTemplate={data?.kpiPeriodTemplate}
                employeeList={employeeData?.data}
                pagingResponse={employeeData?.paging}
                pageStates={[page, setPage]}
                pageSizeStates={[pageSize, setPageSize]}
                isLoading={isLoadingEmployee}
              />
            ) : assessmentType === AssessmentTypeKpiTemplateResponse.PROBATION ? (
              <TemplateDetailProbation assessmentTemplate={data?.assessmentTemplate} />
            ) : (
              <Authorize permissions={[PERMISSIONS.MANAGE_FORMS_ONE_YEAR_READ]}>
                <TemplateDetailOneYear
                  assessmentTemplate={data?.assessmentTemplate}
                  isForm={false}
                />
              </Authorize>
            )}
          </Container>
        </LoadingLayout>
      </Body>
    </Modal>
  )
}

export default DetailModal
