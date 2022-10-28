import { useCallback, useMemo, useState } from "react"
import Button from "../../../../components/common/Button"
import Modal from "../../../../components/common/Modal"
import Sarabun from "../../../../components/common/Sarabun"
import ConfirmDelete from "./ConfirmDelete"
import ConfirmEdit from "./ConfirmEdit"
import { Box } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Form } from "react-final-form"
import arrayMutators from "final-form-arrays"
import { ICreateTemplateFormType, ITemplateBehaviorDetail } from "../../CreateTemplate"
import { EnumTemplateType } from "../../CreateTemplate/SettingTemplateState"
import TemplateDetail from "../../components/TemplateDetail"
import Icon from "../../../../components/common/Icon"
import { useGetTemplateDetail } from "../../../../services/kpi-template/kpi-template-query"
import { TemplateDetailParams } from "../../../../services/kpi-template/kpi-template-type"
import { useHistory } from "react-router-dom"
import paths from "../../../../constants/paths"
import Authorize from "../../../../components/Authorize"
import { PERMISSIONS } from "../../../../services/enum-typed"

const useStyle = makeStyles((theme) => ({
  detailTemplateColumn: {
    display: "flex",
    flexDirection: "column",
  },
  detailTemplateRow: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "32px",
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

type IDetailTemplateProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onCancel: () => void
  onConfirmDelete: () => void
  onConfirmEdit: (item: ICreateTemplateFormType) => void
  templateDetailParams: TemplateDetailParams
}

const DetailTemplate = (props: IDetailTemplateProps) => {
  const {
    isOpen,
    setIsOpen,
    onCancel,
    onConfirmDelete,
    onConfirmEdit,
    templateDetailParams,
  } = props

  const classes = useStyle()
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const history = useHistory()

  const { data: templateDetailResponse, isLoading } = useGetTemplateDetail(templateDetailParams)

  const onOpenEditModal = useCallback(() => {
    setIsOpenEditModal(true)
  }, [])

  const onCloseEditModal = useCallback(() => {
    setIsOpenEditModal(false)
  }, [])

  const onOpenDeleteModal = useCallback(() => {
    setIsOpenDeleteModal(true)
  }, [])

  const onCloseDeleteModal = useCallback(() => {
    setIsOpenDeleteModal(false)
  }, [])

  const initialForm = useMemo(() => {
    let initial
    // เช็คว่าของ template ที่ได้จาก api เป็นแบบ behavior หรือ scale
    // ปั่นของตาม type template
    if (templateDetailResponse?.behaviorTemplate) {
      const {
        name,
        jsonScale,
        behaviorTemplateDetails,
        id,
      } = templateDetailResponse.behaviorTemplate
      const { jsonScaleDetails } = jsonScale
      initial = {
        id: id,
        nameTemplate: name,
        templateType: EnumTemplateType.BEHAVIOR,
        jsonScaleDetails: jsonScaleDetails || [],
        templateBehaviors: behaviorTemplateDetails.map((behaviorTemplateDetail) => {
          return {
            headerEvaluator: behaviorTemplateDetail.name,
            detailEvaluator: behaviorTemplateDetail.description,
          } as ITemplateBehaviorDetail
        }),
      } as ICreateTemplateFormType
    } else if (templateDetailResponse?.scale) {
      const {
        id,
        name,
        minKpi,
        maxKpi,
        positionTarget,
        jsonScaleDetails,
      } = templateDetailResponse.scale
      initial = {
        id: id,
        nameTemplate: name,
        templateType: EnumTemplateType.SCALE,
        jsonScaleDetails: jsonScaleDetails || [],
        minTemplate: minKpi,
        maxTemplate: maxKpi,
        positionTargetTemplate: positionTarget,
      } as ICreateTemplateFormType
    }
    return initial
  }, [templateDetailResponse?.behaviorTemplate, templateDetailResponse?.scale])

  const onConfirmEditTemplate = useCallback(() => {
    setIsOpen(false)
    onConfirmEdit(initialForm!)
  }, [initialForm, onConfirmEdit, setIsOpen])

  const onClickCopyTemplate = useCallback(() => {
    history.push(
      paths.templateCopy({
        routeParam: {
          id: initialForm?.id!,
          templateType:
            initialForm?.templateType === EnumTemplateType.BEHAVIOR ? "behaviors" : "scales",
        },
      }),
    )
  }, [history, initialForm?.id, initialForm?.templateType])
  return (
    <>
      <Modal
        visibleUseState={[isOpen, setIsOpen]}
        showCancelButton={false}
        showOkButton={false}
        onCancel={onCancel}
        maxWidth={"1304px"}
        isLoading={isLoading}
      >
        <div className={classes.detailTemplateColumn}>
          <div className={classes.detailTemplateRow}>
            <Sarabun type="H4">รายละเอียดเทมเพลต</Sarabun>

            <div className={classes.copyTemplate}>
              <Authorize permissions={[PERMISSIONS.MANAGE_TEMPLATE_MANAGE_TEMPLATE_CREATE]}>
                <Button
                  startIcon={<Icon iconName="copyWhite" width={24} height={24} />}
                  onClick={onClickCopyTemplate}
                >
                  คัดลอกเทมเพลต
                </Button>
              </Authorize>
              <Box width={16} />
              <Authorize permissions={[PERMISSIONS.MANAGE_TEMPLATE_MANAGE_TEMPLATE_DELETE]}>
                <Button
                  onClick={onOpenDeleteModal}
                  startIcon={<Icon iconName="trashWhite" width={24} height={24} />}
                >
                  ลบเทมเพลต
                </Button>
              </Authorize>
              <Box width={16} />
              <Authorize permissions={[PERMISSIONS.MANAGE_TEMPLATE_MANAGE_TEMPLATE_UPDATE]}>
                <Button
                  onClick={onOpenEditModal}
                  startIcon={<Icon iconName="pencilWhite" width={24} height={24} />}
                >
                  แก้ไขเทมเพลต
                </Button>
              </Authorize>
            </div>
          </div>
          <Form<ICreateTemplateFormType>
            onSubmit={() => {}}
            initialValues={initialForm}
            mutators={{
              ...arrayMutators,
            }}
          >
            {({ handleSubmit, invalid, initialValues, values }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <TemplateDetail />
                </form>
              )
            }}
          </Form>
        </div>
      </Modal>
      <ConfirmEdit
        isOpen={isOpenEditModal}
        setIsOpen={setIsOpenEditModal}
        onCancel={onCloseEditModal}
        onConfirm={onConfirmEditTemplate}
      />
      <ConfirmDelete
        isOpen={isOpenDeleteModal}
        setIsOpen={setIsOpenDeleteModal}
        onCancel={onCloseDeleteModal}
        onConfirm={onConfirmDelete}
        behaviorTemplate={templateDetailResponse?.behaviorTemplate}
        scale={templateDetailResponse?.scale}
      />
    </>
  )
}

export default DetailTemplate
