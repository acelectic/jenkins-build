import { useMemo } from "react"

import { useGetTemplateDetail } from "../../../services/kpi-template/kpi-template-query"

import { useRouter } from "../../../utils/helper"
import { ICreateTemplateFormType, ITemplateBehaviorDetail } from "../CreateTemplate"
import LoadingLayout from "../../../components/common/LoadingLayout"
import TemplateField from "../CreateTemplate/TemplateField"
import { EnumTemplateType } from "../CreateTemplate/SettingTemplateState"

export enum EnumTemplateTypePath {
  BEHAVIORS = "behaviors",
  SCALES = "scales",
}

const EditTemplate = () => {
  const { query } = useRouter<{ id: string; templateType: string }>()
  const { id, templateType } = query

  const { data: templateDetailResponse, isLoading } = useGetTemplateDetail({
    templateId: id,
    templateType:
      templateType === EnumTemplateTypePath.BEHAVIORS
        ? EnumTemplateType.BEHAVIOR
        : EnumTemplateType.SCALE,
  })

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

  return (
    <LoadingLayout isLoading={isLoading}>
      <TemplateField isEditMode={true} initialForm={initialForm} templateId={id} />
    </LoadingLayout>
  )
}

export default EditTemplate
