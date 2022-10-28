import styled from "@emotion/styled"
import Box from "@mui/material/Box"
import { makeStyles } from "@mui/styles"
import { useCallback, useMemo } from "react"
import { useFormState } from "react-final-form"
import { useTranslation } from "react-i18next"
import { IConfirmTemplateType } from "."
import Sarabun from "../../../../components/common/Sarabun"
import SetScoreLevel from "../../../../components/common/SetScoreLevel"
import { DropdownField } from "../../../../components/fields"
import {
  GRAYSCALE_DARKGRAY_60,
  GRAYSCALE_LIGHTGRAY_10,
  PRIMARY,
} from "../../../../constants/colors"

const DropdownUnitTemplateField = styled(DropdownField)`
  min-width: 200px;
`

const useStyle = makeStyles((theme) => ({
  buttonStyled: {
    textAlign: "end",
    minWidth: "250px",
    background: PRIMARY,
  },
  totalHeaderEvaluator: {
    border: `1px solid ${GRAYSCALE_DARKGRAY_60}`,
    padding: "16px",
    borderRadius: 8,
  },
  optionArea: {
    display: "flex",
    alignItems: "end",
    backgroundColor: GRAYSCALE_LIGHTGRAY_10,
    padding: 16,
    borderRadius: 8,
  },
}))

const ConfirmTemplateScale = () => {
  const classes = useStyle()

  const { t } = useTranslation()

  const formState = useFormState<IConfirmTemplateType>()
  const { values } = formState
  const { jsonScaleDetails } = values

  const required = useCallback((value: string) => {
    return value ? undefined : "Required"
  }, [])

  // option เลือกจำนวน max,min template
  const optionsNumberTemplateList: BaseOptionType[] = useMemo(() => {
    return [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3", value: 3 },
      { label: "4", value: 4 },
      { label: "5", value: 5 },
      { label: "6", value: 6 },
      { label: "7", value: 7 },
      { label: "8", value: 8 },
      { label: "9", value: 9 },
      { label: "10", value: 10 },
    ]
  }, [])

  // option เลือกระดับเป้าหมาย
  const optionsPositionTargetTemplateList: BaseOptionType[] = useMemo(() => {
    return [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
      { label: "5", value: "5" },
      { label: "6", value: "6" },
    ]
  }, [])

  return (
    <div className={classes.totalHeaderEvaluator}>
      <Sarabun type="H6">{t("จำนวนของหัวข้อการประเมิน")}</Sarabun>
      <Box height={16} />
      <div className={classes.optionArea}>
        <DropdownUnitTemplateField
          name="minTemplate"
          label={t("จำนวนต่ำสุดที่สร้างได้")}
          isRequired
          options={optionsNumberTemplateList}
          viewMode
          validate={required}
        />
        <Box width={24} />
        <Sarabun type="Subtitle2" style={{ marginBottom: "2.5px" }}>
          ถึง
        </Sarabun>
        <Box width={24} />
        <DropdownUnitTemplateField
          name="maxTemplate"
          isRequired
          viewMode
          label={t("จำนวนสูงสุดที่ไม่ควรมีเกิน")}
          options={optionsNumberTemplateList}
          validate={required}
        />
        <Box width={90} />
        <DropdownUnitTemplateField
          name="positionTargetTemplate"
          isRequired
          viewMode
          label={t("ระดับเป้าหมาย")}
          placeHolder="1 - 6"
          options={optionsPositionTargetTemplateList}
          validate={required}
        />
      </div>
      <Box height={40} />
      <SetScoreLevel isViewMode jsonScaleDetails={jsonScaleDetails} />
    </div>
  )
}

export default ConfirmTemplateScale
