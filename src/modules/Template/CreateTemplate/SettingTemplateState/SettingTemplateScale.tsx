import styled from "@emotion/styled"
import Box from "@mui/material/Box"
import { makeStyles } from "@mui/styles"
import { useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import Sarabun from "../../../../components/common/Sarabun"
import { DropdownField } from "../../../../components/fields"
import { GRAYSCALE_DARKGRAY_60, PRIMARY } from "../../../../constants/colors"

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
  },
}))

const SettingTemplateScale = () => {
  const classes = useStyle()

  const { t } = useTranslation()

  const required = useCallback((value: string) => {
    return value ? undefined : "Required"
  }, [])

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
      <Sarabun>{t("จำนวนของหัวข้อการประเมิน")}</Sarabun>
      <Box height={16} />
      <div className={classes.optionArea}>
        <DropdownUnitTemplateField
          name="minTemplate"
          label={t("จำนวนต่ำสุดที่สร้างได้")}
          isRequired
          placeHolder="1 - 10"
          options={optionsNumberTemplateList}
          validate={required}
        />
        <Box width={24} />
        <Sarabun type="Subtitle2" style={{ marginBottom: "15px" }}>
          {t("ถึง")}
        </Sarabun>
        <Box width={24} />
        <DropdownUnitTemplateField
          name="maxTemplate"
          isRequired
          label={t("จำนวนสูงสุดที่ไม่ควรมีเกิน")}
          placeHolder="1 - 10"
          options={optionsNumberTemplateList}
          validate={required}
        />
        <Box width={90} />
        <DropdownUnitTemplateField
          name="positionTargetTemplate"
          isRequired
          label={t("ระดับเป้าหมาย")}
          placeHolder="1 - 6"
          options={optionsPositionTargetTemplateList}
          validate={required}
        />
      </div>
    </div>
  )
}

export default SettingTemplateScale
