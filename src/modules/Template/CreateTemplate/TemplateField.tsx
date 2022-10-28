import Box from "@mui/material/Box"
import { Form } from "react-final-form"
import Button from "../../../components/common/Button"
import Sarabun from "../../../components/common/Sarabun"
import {
  BLACK,
  GRAYSCALE_DARKGRAY_60,
  PRIMARY_MAIN,
  SECONDARY_LIGHT,
  WHITE,
} from "../../../constants/colors"
import SettingTemplateState, { EnumTemplateType } from "./SettingTemplateState"
import arrayMutators from "final-form-arrays"
import ConfirmTemplateState from "./ConfirmTemplateState"
import State from "../../../components/common/State"
import { StateComponentType, TemplateState } from "../../../services/enum-typed"
import Modal from "../../../components/common/Modal"
import SuccessStateCard from "../../../components/common/SuccessStateCard"
import Icon from "../../../components/common/Icon"
import { useCallback, useState } from "react"
import paths from "../../../constants/paths"
import { useHistory } from "react-router-dom"
import { useTranslation } from "react-i18next"
import styled from "@emotion/styled"
import { ICreateTemplateFormType } from "."
import {
  CreateTemplateParams,
  TemplateBehaviorDetailParams,
} from "../../../services/kpi-template/kpi-template-type"
import {
  useCreateKpiTemplate,
  useUpdateTemplate,
} from "../../../services/kpi-template/kpi-template-query"
import { useSnackbar } from "../../../utils/custom-hook"

const BodyStyled = styled.div({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
})

const ButtonStyled = styled(Button)({
  textAlign: "end",
  minWidth: "268px",
})

type ITemplateFieldProps = {
  isEditMode?: boolean
  initialForm?: ICreateTemplateFormType
  templateId?: string
}

const TemplateField = (props: ITemplateFieldProps) => {
  const { isEditMode = false, initialForm, templateId } = props

  const history = useHistory()

  const [showSuccessCard, setShowSuccessCard] = useState(false)
  const [templateState, setTemplateState] = useState<TemplateState>(TemplateState.SETTING_TEMPLATE)
  const [confirmCreateModal, setConfirmCreateModal] = useState(false)

  const { mutate: createKpiTemplate } = useCreateKpiTemplate()
  const { mutate: updateTemplate } = useUpdateTemplate(templateId)
  const { snackbar } = useSnackbar()

  const { t } = useTranslation()

  const onClickBack = useCallback(() => {
    if (templateState === TemplateState.SETTING_TEMPLATE) {
      history.push(paths.template())
    } else {
      if (showSuccessCard) {
        history.push(paths.template())
      } else {
        setTemplateState(TemplateState.SETTING_TEMPLATE)
      }
    }
  }, [history, showSuccessCard, templateState])

  const onClickNextState = useCallback(() => {
    // ถ้าอยู่ state setting จะเปลี่ยนเป็น state confirm
    if (templateState === TemplateState.SETTING_TEMPLATE) {
      setTemplateState(TemplateState.CONFIRM_TEMPLATE)
    }
    // ถ้าอยู่ state confirm จะแสดง modal ยืนยันการสร้าง
    else {
      setConfirmCreateModal(true)
    }
  }, [templateState])

  const onCloseConfirmCreateModal = useCallback(() => {
    setConfirmCreateModal(false)
  }, [])

  const createOrUpdateParams = useCallback((values: ICreateTemplateFormType) => {
    const {
      templateType,
      nameTemplate,
      jsonScaleDetails,
      maxTemplate,
      minTemplate,
      templateBehaviors,
      positionTargetTemplate,
    } = values
    let params = {} as CreateTemplateParams

    // เช็คว่า template เป็น type ไหนเพื่อปั่นของให้ตรงตาม type
    if (templateType === EnumTemplateType.BEHAVIOR) {
      const details = templateBehaviors.map((templateBehavior, index) => {
        return {
          name: templateBehavior.headerEvaluator,
          description: templateBehavior.detailEvaluator,
          seq: index + 1,
        } as TemplateBehaviorDetailParams
      })
      params = {
        name: nameTemplate,
        details: details,
        jsonScaleDetails: jsonScaleDetails,
        forKpi: false,
      } as CreateTemplateParams
    } else {
      params = {
        name: nameTemplate,
        minKpi: minTemplate,
        maxKpi: maxTemplate,
        positionTarget: positionTargetTemplate,
        jsonScaleDetails: jsonScaleDetails,
        forKpi: true,
      } as CreateTemplateParams
    }
    return { params }
  }, [])

  const onSubmit = useCallback(
    (values: ICreateTemplateFormType) => {
      const { params } = createOrUpdateParams(values)
      if (isEditMode) {
        updateTemplate(params, {
          onSuccess: () => {
            snackbar({ message: t("Success"), type: "success" })
            setShowSuccessCard(true)
            onCloseConfirmCreateModal()
          },
          onError: (error) => {
            snackbar({ message: error.message, type: "error" })
          },
        })
      } else {
        createKpiTemplate(params, {
          onSuccess: () => {
            snackbar({ message: t("Success"), type: "success" })
            setShowSuccessCard(true)
            onCloseConfirmCreateModal()
          },
          onError: (error) => {
            snackbar({ message: error.message, type: "error" })
          },
        })
      }
    },
    [
      createKpiTemplate,
      createOrUpdateParams,
      isEditMode,
      onCloseConfirmCreateModal,
      snackbar,
      t,
      updateTemplate,
    ],
  )

  return (
    <>
      <BodyStyled onClick={onClickBack}>
        <Icon iconName="caretLeftSecondaryRightBlue" width={16} height={16} />
        <Box width={8} />
        <Sarabun type="Subtitle2" color={SECONDARY_LIGHT}>
          {t("ย้อนกลับ")}
        </Sarabun>
      </BodyStyled>
      <Box height={24} />
      <Sarabun type="H2" color="WHITE">
        {isEditMode ? t("แก้ไขเทมเพลต") : t("สร้างเทมเพลตใหม่")}
      </Sarabun>
      <Box height={24} />

      <State
        stateComponentType={StateComponentType.TEMPLATE}
        currentState={templateState}
        style={{
          backgroundColor: WHITE,
          border: `1px solid ${BLACK}`,
        }}
      />

      {/* แสดงข้อความเมื่อกด submit */}
      {showSuccessCard ? (
        <>
          <Box height={64} />
          <SuccessStateCard
            title={isEditMode ? t("แก้ไขเทมเพลตสำเร็จแล้ว") : t("สร้างเทมเพลตสำเร็จแล้ว")}
            titleColor={WHITE}
            detail={t("สามารถจัดการ หรือแก้ไขเทมเพลตได้ที่หน้าจัดการเทมเพลต")}
            detailColor={WHITE}
          />
        </>
      ) : (
        <Box height={24} />
      )}
      <Form<ICreateTemplateFormType>
        onSubmit={onSubmit}
        initialValues={initialForm}
        mutators={{
          ...arrayMutators,
        }}
        validate={(values) => {
          const errors: IFormValueErrors<ICreateTemplateFormType> = {}
          //เช็คจำนวนสูงสุดที่สร้างได้ของ template ต้องไม่น้อยกว่าจำนวนต่ำสุดที่สร้างได้
          if (values.maxTemplate <= values.minTemplate) {
            errors.maxTemplate = "invalid"
          }
          return errors
        }}
      >
        {({ handleSubmit, invalid, initialValues, values }) => {
          return (
            <form onSubmit={handleSubmit}>
              {templateState === TemplateState.SETTING_TEMPLATE && (
                <SettingTemplateState isDisableTemplateType={isEditMode} />
              )}
              {templateState === TemplateState.CONFIRM_TEMPLATE && <ConfirmTemplateState />}
              {/* ปุ่มจะถูกซ้อนเมื่อกด submit */}
              {showSuccessCard ? null : (
                <>
                  <Box height={50} />
                  <div style={{ textAlign: "end" }}>
                    <ButtonStyled
                      onClick={onClickNextState}
                      isDisabledButton={invalid}
                      minWidth={268}
                      endIcon={
                        <Icon
                          iconName="vector"
                          stroke={invalid ? GRAYSCALE_DARKGRAY_60 : WHITE}
                          width={7.5}
                          height={15}
                        />
                      }
                      backgroundColor={PRIMARY_MAIN}
                    >
                      {templateState === TemplateState.SETTING_TEMPLATE
                        ? t("ไปต่อ")
                        : isEditMode
                        ? t("แก้ไขเทมเพลต")
                        : t("สร้างเทมเพลต")}
                    </ButtonStyled>
                  </div>
                </>
              )}
              <Modal
                visibleUseState={[confirmCreateModal, setConfirmCreateModal]}
                onOk={handleSubmit}
                onCancel={onCloseConfirmCreateModal}
              >
                <Sarabun type="H4" style={{ marginBottom: "40px" }}>
                  {isEditMode
                    ? t("คุณยืนยันที่จะแก้ไขเทมเพลตนี้หรือไม่?")
                    : t("คุณยืนยันที่จะสร้างเทมเพลตนี้หรือไม่?")}
                </Sarabun>
              </Modal>
            </form>
          )
        }}
      </Form>
    </>
  )
}

export default TemplateField
