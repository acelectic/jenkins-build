import { useMemo } from "react"
import { ScaleDetail } from "../../../services/entity-typed"
import { EnumTemplateType } from "./SettingTemplateState"
import TemplateField from "./TemplateField"

export type ITemplateBehaviorDetail = {
  headerEvaluator: string
  detailEvaluator: string
}

export type ICreateTemplateFormType = {
  jsonScaleDetails: ScaleDetail[]
  maxTemplate: string | number
  minTemplate: string | number
  nameTemplate: string
  templateBehaviors: ITemplateBehaviorDetail[]
  templateType: EnumTemplateType
  positionTargetTemplate: string | number
  id?: string
}

const CreateTemplate = () => {
  const initialForm = useMemo(() => {
    return {
      templateBehaviors: [
        { headerEvaluator: "", detailEvaluator: "" },
        { headerEvaluator: "", detailEvaluator: "" },
      ],
    } as ICreateTemplateFormType
  }, [])

  return <TemplateField isEditMode={false} initialForm={initialForm} />
}

export default CreateTemplate
