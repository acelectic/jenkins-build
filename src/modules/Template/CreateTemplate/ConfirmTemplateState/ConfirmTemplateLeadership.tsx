import Box from "@mui/material/Box"
import { makeStyles } from "@mui/styles"
import { Field, useFormState } from "react-final-form"
import { FieldArray } from "react-final-form-arrays"
import { useTranslation } from "react-i18next"
import { IConfirmTemplateType } from "."
import { ITemplateBehaviorDetail } from ".."
import Sarabun from "../../../../components/common/Sarabun"
import SetScoreLevel from "../../../../components/common/SetScoreLevel"
import {
  ERROR,
  GRAYSCALE_DARKGRAY_40,
  GRAYSCALE_DARKGRAY_60,
  GRAYSCALE_LIGHTGRAY_10,
} from "../../../../constants/colors"

const useStyle = makeStyles((theme) => ({
  detailTemplateColumn: {
    display: "flex",
    flexDirection: "column",
  },
  detailTemplateRow: {
    display: "flex",
    flexDirection: "row",
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
    border: `1px solid ${GRAYSCALE_DARKGRAY_60}`,
    borderRadius: "8px",
    padding: 16,
  },
  nameEvaluatorArea: {
    display: "flex",
  },
  divider: {
    backgroundColor: GRAYSCALE_DARKGRAY_40,
    height: "1px",
  },
  detailHeader: {
    display: "flex",
    marginBottom: "16px",
  },
  detailBorder: {
    border: `1px solid ${GRAYSCALE_DARKGRAY_40}`,
    borderRadius: "8px",
    backgroundColor: GRAYSCALE_LIGHTGRAY_10,
    padding: "16px 16px 0px 16px",
    marginBottom: "16px",
  },
}))

const ConfirmTemplateLeadership = () => {
  const classes = useStyle()

  const { t } = useTranslation()

  const formState = useFormState<IConfirmTemplateType>()
  const { values } = formState
  const { jsonScaleDetails } = values

  return (
    <div className={classes.nameEvaluatorText}>
      <Sarabun type="H6">{t("หัวข้อการประเมิน")}</Sarabun>
      <Box height={16} />
      <FieldArray<ITemplateBehaviorDetail> name="templateBehaviors">
        {({ fields }) => {
          return (
            <>
              {fields.map((name, index) => {
                return (
                  <div className={classes.detailBorder}>
                    <div className={classes.nameEvaluatorArea}>
                      <Box width={36} />
                      <Sarabun type="Subtitle2" style={{ flex: 3 }}>
                        {t("ชื่อหัวข้อการประเมิน")} <span style={{ color: ERROR }}>*</span>
                      </Sarabun>
                      <Box width={24} />
                      <Sarabun type="Subtitle2" style={{ flex: 4 }}>
                        {t("รายละเอียด")} <span style={{ color: ERROR }}>*</span>
                      </Sarabun>
                    </div>
                    <Box height={8} />
                    <div className={classes.divider} />
                    <Box height={16} />

                    <div className={classes.detailHeader}>
                      <Sarabun type="Subtitle1"> {`${index + 1}.`}</Sarabun>
                      <Box width={24} />
                      <Field name={`${name}.headerEvaluator`}>
                        {({ input }) => {
                          return (
                            <Sarabun type="Subtitle2" style={{ flex: 3 }}>
                              {`${input.value}`}
                            </Sarabun>
                          )
                        }}
                      </Field>
                      <Box width={24} />
                      <Field name={`${name}.detailEvaluator`}>
                        {({ input }) => {
                          return (
                            <Sarabun type="Subtitle2" style={{ flex: 4 }}>
                              {`${input.value}`}
                            </Sarabun>
                          )
                        }}
                      </Field>
                    </div>
                    <FieldArray name="templateBehaviors">
                      {({ fields }) => {
                        return (
                          <>
                            {fields.map((name, subIndex) => {
                              return (
                                <div className={classes.detailHeader}>
                                  <Sarabun type="Subtitle1">
                                    {`${index + 1}.${subIndex + 1}`}
                                  </Sarabun>
                                  <Box width={24} />
                                  <Field name={`${name}.headerEvaluator`}>
                                    {({ input }) => {
                                      return (
                                        <Sarabun type="Subtitle2" style={{ flex: 3 }}>
                                          {`${input.value}`}
                                        </Sarabun>
                                      )
                                    }}
                                  </Field>
                                  <Box width={24} />
                                  <Field name={`${name}.detailEvaluator`}>
                                    {({ input }) => {
                                      return (
                                        <Sarabun type="Subtitle2" style={{ flex: 4 }}>
                                          {`${input.value}`}
                                        </Sarabun>
                                      )
                                    }}
                                  </Field>
                                </div>
                              )
                            })}
                          </>
                        )
                      }}
                    </FieldArray>
                  </div>
                )
              })}
            </>
          )
        }}
      </FieldArray>
      <Box height={50} />
      <Sarabun type="H6" style={{ paddingBottom: "16px" }}>
        {t(`กำหนดระดับคะแนนสำหรับหัวข้อใหญ่`)}
      </Sarabun>
      <SetScoreLevel isViewMode jsonScaleDetails={jsonScaleDetails} isHideTitle />
      <Sarabun type="H6" style={{ padding: "40px 0 16px 0" }}>
        {t(`กำหนดระดับคะแนนสำหรับหัวข้อย่อย`)}
      </Sarabun>
      <SetScoreLevel isViewMode jsonScaleDetails={jsonScaleDetails} isHideTitle />
    </div>
  )
}

export default ConfirmTemplateLeadership
