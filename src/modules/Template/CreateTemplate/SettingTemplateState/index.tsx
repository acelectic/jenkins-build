import Box from "@mui/material/Box"
import { useCallback, useMemo, useState } from "react"
import { useForm, useFormState } from "react-final-form"
import { OnChange } from "react-final-form-listeners"
import Card from "../../../../components/common/Card"
import Sarabun from "../../../../components/common/Sarabun"
import SetScoreLevel, {
  scaleDetailsInitialValues,
} from "../../../../components/common/SetScoreLevel"
import { InputField, RadioGroupButtonField } from "../../../../components/fields"
import { IConfirmTemplateType } from "../ConfirmTemplateState"
import SettingTemplateBehavior from "./SettingTemplateBehavior"
import SettingTemplateScale from "./SettingTemplateScale"

//Todo ถ้าเป็น Enum ที่ถูกต้องลองมาแก้ดูนะ ไม่แน่ใจว่าได้ไหม ตั้งไว้ล่วงหน้าก่อน
export enum EnumTemplateType {
  LEADERSHIP_DNA = "leadership_dna",
  BEHAVIOR = "behavior",
  OPEN_ENDED = "open_ended", //ปลายเปิด
  SCALE = "scale",
}

type ISettingTemplateStateProps = {
  isDisableTemplateType?: boolean
}

const SettingTemplateState = (props: ISettingTemplateStateProps) => {
  const { isDisableTemplateType = false } = props
  const formState = useFormState<IConfirmTemplateType>()
  const { values } = formState
  const { jsonScaleDetails } = values
  const form = useForm()

  const [templateType, setTemplateType] = useState<string>(values.templateType)

  // เซ็ทค่าเริ่มต้นของ jsonScaleDetails
  const [initialJsonScaleDetails] = useState(values.jsonScaleDetails)

  // เซ็ทค่าสำหรับตอนเปลี่ยน templateType
  const scaleDetails = useMemo(() => {
    // ถ้า templateType == sclae จะเซ็ท jsonScaleDetails
    if (values.templateType === EnumTemplateType.SCALE) {
      return scaleDetailsInitialValues.filter((v) => v.value <= 6) || []
    } else {
      // ถ้าไม่ใช่ scale จะคืนค่าเริ่มต้นไปให้
      return initialJsonScaleDetails
    }
  }, [initialJsonScaleDetails, values.templateType])

  const onChangeTemplateType = useCallback(
    (type: string) => {
      setTemplateType(type)
      form.change(`jsonScaleDetails`, scaleDetails)
    },
    [scaleDetails, form],
  )

  const required = useCallback((value?: string) => {
    return value ? undefined : "Required"
  }, [])

  return (
    <Card elevation={5}>
      <Sarabun type="H4">ตั้งค่าเทมเพลต</Sarabun>
      <Box height={32} />
      <InputField
        name="nameTemplate"
        style={{ maxWidth: "600px" }}
        isRequired
        multiline
        rows={3}
        label="ชื่อเทมเพลต"
        validate={required}
      />
      <Box height={32} />
      <RadioGroupButtonField
        name={"templateType"}
        isRow={false}
        disabled={isDisableTemplateType}
        subLabelSize={12}
        title="ประเภทของเทมเพลต"
        titleSize={14}
        spacingRadio={{ width: "24px" }}
        validate={required}
        isRequired={true}
        labelSize={16}
        options={[
          {
            value: `${EnumTemplateType.BEHAVIOR}`,
            label: "เทมเพลตแบบกำหนดหัวข้อให้",
            subLabel:
              "เป็นเทมเพลตที่คุณสามารถสร้างหัวข้อการประเมินให้พนักงานไว้เลย โดยไม่ให้พนักงานสามารถสร้างเทมเพลตเองได้",
          },
          {
            value: `${EnumTemplateType.SCALE}`,
            label: "เทมเพลตเปล่าที่ให้พนักงานสร้างหัวข้อเอง",
            subLabel:
              "เป็นเทมเพลตที่คุณสามารถกำหนดจำนวนข้อที่สามารถสร้างหัวข้อการประเมินได้ แต่ไม่ได้สร้างหัวข้อการประเมินไว้ให้กับพนักงาน",
          },
        ]}
      />
      <OnChange name="templateType">
        {(value) => {
          onChangeTemplateType(value)
        }}
      </OnChange>
      <Box height={32} />
      {templateType === EnumTemplateType.BEHAVIOR && <SettingTemplateBehavior />}
      {templateType === EnumTemplateType.SCALE && <SettingTemplateScale />}
      {templateType === EnumTemplateType.LEADERSHIP_DNA && <></> /*Todo มาใส่ด้วย*/}
      {
        templateType === EnumTemplateType.OPEN_ENDED && (
          <SettingTemplateBehavior />
        ) /*Todo มาใส่ด้วย*/
      }
      <Box height={40} />
      {templateType !== EnumTemplateType.OPEN_ENDED && (
        <SetScoreLevel
          isEditLevel={templateType === EnumTemplateType.BEHAVIOR}
          jsonScaleDetails={jsonScaleDetails}
        />
      )}
    </Card>
  )
}

export default SettingTemplateState
