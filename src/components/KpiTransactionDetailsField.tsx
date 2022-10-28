import styled from "@emotion/styled"
import { Box, Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useCallback } from "react"
import { Field, useFormState } from "react-final-form"
import { useTranslation } from "react-i18next"
import {
  ERROR,
  GRAYSCALE_DARKGRAY_40,
  GRAYSCALE_DARKGRAY_80,
  SECONDARY_DARK,
  SECONDARY_MAIN,
} from "../constants/colors"
import {
  JsonScaleKpiTransactionDetail,
  KpiTransactionDetail,
  Scale,
  ScaleDetail,
} from "../services/entity-typed"
import { KpiType, ScoreType, UnitType } from "../services/enum-typed"
import { maxLength, composeValidators } from "../utils/field-validation"
import { normalizeNumberWith2Digit, parseRemoveComma } from "../utils/helper"
import Sarabun from "./common/Sarabun"
import { DropdownField, InputField } from "./fields"
import ScaleForm from "./ScaleForm"

type StyleKpiTransactionDetail = {
  isShowBorder?: boolean
}

const useStyle = makeStyles<Theme, StyleKpiTransactionDetail>((theme) => ({
  border: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    border: ({ isShowBorder }) => (isShowBorder ? `1px solid ${GRAYSCALE_DARKGRAY_40}` : "unset"),
    borderRadius: "8px",
    marginBottom: "24px",
  },
  borderTop: {
    minHeight: "74px",
    backgroundColor: SECONDARY_DARK,
    borderRadius: "8px 8px 0px 0px",
    display: "flex",
  },
  circle: {
    borderRadius: "50%",
    backgroundColor: SECONDARY_MAIN,
    width: "32px",
    display: "flex",
    height: "32px",
    marginLeft: "16px",
    marginTop: "12px",
    alignItems: "center",
    justifyContent: "center",
  },
  headerIndex: {
    margin: "12px 16px",
  },
  headerName: {
    margin: "16px 0",
    width: "100%",
  },
  headerDescription: {
    width: "100%",
    margin: "24px 0px 0px 0px",
  },
  headerCategory: {
    margin: "24px 0px 0px 0px",
  },
  category: {
    width: "30%",
    minWidth: "350px",
  },
  headerUnit: {
    margin: "24px 0px 0px 0px",
    display: "flex",
    gap: "16px",
    width: "100%",
    minWidth: "400px",
  },
  unit: {
    width: "20%",
    minWidth: "100px",
  },
  target: {
    width: "30%",
  },
  weight: {
    width: "20%",
    margin: "24px 0px 0px 0px",
    minWidth: "300px",
  },
  trashIcon: {
    textAlign: "end",
    marginTop: "30px",
    marginRight: "18px",
    cursor: "pointer",
  },
  kpiType: {
    width: "30%",
    marginBottom: "24px",
    minWidth: "350px",
  },
  actual: {
    width: "20%",
    margin: "24px 0px 0px 0px",
    minWidth: "300px",
  },
  scoreType: {
    margin: "24px 0px 0px 0px",
  },
}))

const ViewMode = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`

type KpiTransactionDetailFieldProps = {
  optionsDropdownUnit: BaseOptionType[] | undefined
  optionsDropdownType: BaseOptionType[] | undefined
  viewModeEdit?: boolean
  viewMode?: boolean
  setSizeField?: React.Dispatch<React.SetStateAction<number>>
  sizeField?: number
  isShowHeader?: boolean
  isShowAddButton?: boolean
  isShowBorder?: boolean
  editMode?: boolean
  isMultipleCreateGoal?: boolean
  isUpdateAssign?: boolean
  attachmentId?: string
  isCreate?: boolean
  kpiTransactionDetail?: KpiTransactionDetail
  jsonScale?: Scale
  isShowMiniKpiReportCard?: boolean
}

export type KpiTransactionDetailFieldType = {
  scoreType: ScoreType
  scales: ScaleDetail[]
  positionTarget: string
  canDeleteField: boolean
}

export type KpiTransactionDetailSubmitType = {
  copyGoalDetails: KpiTransactionDetailType[]
}

export type KpiTransactionDetailType = KpiTransactionDetail & {
  jsonScale: JsonScaleKpiTransactionDetail
  attachmentId?: string
  scales: ScaleDetail[]
}

const KpiTransactionDetailsField = (props: KpiTransactionDetailFieldProps) => {
  const {
    optionsDropdownUnit,
    optionsDropdownType,
    viewModeEdit = false,
    viewMode = false,
    isShowHeader = false,
    isShowBorder = true,
  } = props

  const classes = useStyle({ isShowBorder })

  const required = useCallback((value: any) => {
    return value ? undefined : "Required"
  }, [])

  const validatePercent = useCallback((value: any) => {
    return value ? (value >= 1 && value <= 100 ? undefined : "Invalid") : "Required"
  }, [])
  const formState = useFormState()
  const { values } = formState

  const { t } = useTranslation()

  const kpiTypeOptions = [
    { label: "องค์กร", value: KpiType.COMPANY },
    { label: "หน่วยงาน", value: KpiType.MGR_VIEW },
    { label: "อื่นๆ", value: KpiType.OTHER },
  ]

  return (
    <div className={classes.headerName} style={{ margin: isShowHeader ? "16px" : undefined }}>
      <div className={classes.kpiType}>
        {!viewMode ? (
          <Field name={`kpiType`}>
            {({ input }) => {
              return (
                <DropdownField
                  name="kpiType"
                  options={kpiTypeOptions}
                  label={t("ประเภทของเป้าหมาย (องค์กร/อื่น ๆ /หน่วยงาน)")}
                  isRequired={true}
                  validate={required}
                  viewMode={viewMode}
                  placeHolder="เลือกประเภทของเป้าหมาย"
                />
              )
            }}
          </Field>
        ) : (
          <div>
            <div style={{ display: "flex" }}>
              <Sarabun type="Body2">{t("ประเภทของเป้าหมาย (องค์กร/อื่น ๆ /หน่วยงาน)")}</Sarabun>
              <Sarabun type="Body2" color={ERROR}>
                *
              </Sarabun>
            </div>
            <Box height={8}></Box>
            <Field name={`kpiType`}>
              {({ input }) => {
                return <Sarabun type={"H6"}>{t(input.value)}</Sarabun>
              }}
            </Field>
          </div>
        )}
      </div>
      <div>
        <InputField
          name={`name`}
          viewMode={!viewMode ? viewModeEdit : true}
          label="ชื่อเป้าหมาย (Goal name)"
          placeholder="กรุณากรอกข้อมูล"
          isRequired={true}
          showDescription={false}
          rows={3}
          multiline={true}
          validate={composeValidators(maxLength(255, t("ข้อความยาวเกินกำหนด")), required)}
        />
      </div>
      <div className={classes.headerDescription}>
        <InputField
          name={`description`}
          label="รายละเอียดวิธีการวัดเป้าหมาย (Measurement)"
          viewMode={!viewMode ? viewModeEdit : true}
          subLabel={viewMode ? undefined : "อธิบายว่าเป้านี้วัดผลอย่างไร และใช้เกณฑ์อะไรในการวัดผล"}
          placeholder="กรุณากรอกข้อมูล"
          isRequired={true}
          rows={3}
          multiline={true}
          validate={composeValidators(maxLength(1200, t("ข้อความยาวเกินกำหนด")), required)}
        />
      </div>

      <div className={classes.headerCategory}>
        {!viewMode ? (
          <Field name={`goalCategory`}>
            {({ input }) => {
              return (
                <DropdownField
                  name={`goalCategory`}
                  options={optionsDropdownType}
                  label="ประเภท (Type)"
                  placeHolder="เลือกประเภทของเป้าหมาย"
                  isRequired={true}
                  validate={required}
                  className={classes.category}
                  viewMode={viewModeEdit}
                />
              )
            }}
          </Field>
        ) : (
          <div>
            <div style={{ display: "flex" }}>
              <Sarabun size={14} weight={300}>
                ประเภท (Type)
              </Sarabun>
              <Sarabun size={14} weight={300} color={ERROR}>
                *
              </Sarabun>
            </div>
            <Box height={8}></Box>
            <Field name={`goalCategory`}>
              {({ input }) => {
                return <Sarabun type={"H6"}>{input.value}</Sarabun>
              }}
            </Field>
          </div>
        )}
      </div>
      <div className={classes.headerUnit}>
        <InputField
          name={`target`}
          label="ค่าเป้าหมาย (Target)"
          placeholder="กรุณากรอกข้อมูล"
          validate={required}
          isRequired={true}
          viewMode={viewMode}
          autoComplete={"off"}
          className={classes.target}
          format={normalizeNumberWith2Digit}
          parse={parseRemoveComma()}
        />
        <Field name={`unitType`}>
          {({ input }) => {
            const isUnitOther = `${input.value}` === UnitType.OTHER ? true : false
            return (
              <>
                {!viewMode ? (
                  <>
                    <DropdownField
                      name={`unitType`}
                      options={optionsDropdownUnit}
                      label="หน่วย"
                      placeHolder="เลือกหน่วย"
                      viewMode={viewMode}
                      validate={required}
                      isRequired={true}
                      className={classes.unit}
                    />
                    {isUnitOther && !viewMode ? (
                      <InputField
                        name={`customUnitType`}
                        label="ระบุหน่วยเอง"
                        placeholder="กรอกหน่วย"
                        validate={required}
                        className={classes.unit}
                        viewMode={viewMode}
                      />
                    ) : (
                      <div className={classes.unit}></div>
                    )}
                  </>
                ) : (
                  <div style={{ paddingRight: "80px" }}>
                    <div style={{ display: "flex" }}>
                      <Sarabun size={14} weight={300}>
                        หน่วย (Unit)
                      </Sarabun>
                      <Sarabun size={14} weight={300} color={ERROR}>
                        *
                      </Sarabun>
                    </div>
                    <Box height={16}></Box>
                    <Field name={values.customUnitType ? `customUnitType` : `unitType`}>
                      {({ input }) => {
                        return <Sarabun type={"H6"}>{t(`${input.value || "-"}`)}</Sarabun>
                      }}
                    </Field>
                  </div>
                )}
              </>
            )
          }}
        </Field>
      </div>
      <div className={classes.scoreType}>
        <ScaleForm viewMode={viewMode} />
      </div>

      <div className={classes.weight}>
        {!viewMode ? (
          <InputField
            name={`weight`}
            label="น้ำหนักของเป้าหมาย (Weight)"
            subLabel="น้ำหนักทุกเป้าหมายรวมกันต้องเท่ากับ 100%"
            placeholder="เป็นตัวเลข 1 - 100"
            validate={validatePercent}
            isRequired={true}
            endUnit={true}
            unitText={"%"}
            viewMode={viewMode}
            format={normalizeNumberWith2Digit}
            parse={parseRemoveComma()}
            inputProps={{ maxLength: 3 }}
          />
        ) : (
          <div>
            <div style={{ display: "flex" }}>
              <Sarabun size={14} weight={300}>
                น้ำหนักของเป้าหมาย (Weight)
              </Sarabun>
              <Sarabun size={14} weight={300} color={ERROR}>
                *
              </Sarabun>
            </div>
            <Box height={8}></Box>
            <Field name={`weight`}>
              {({ input }) => {
                return <Sarabun type={"H6"}>{input.value}%</Sarabun>
              }}
            </Field>
          </div>
        )}
      </div>
      <div className={classes.actual}>
        {viewMode && !values.actual ? (
          <ViewMode>
            <Sarabun
              type="Body2"
              color={GRAYSCALE_DARKGRAY_80}
            >{`ค่าที่ทำได้จริง (Actual)`}</Sarabun>
            <Sarabun type={"H6"}>{`ยังไม่ระบุ`}</Sarabun>
          </ViewMode>
        ) : (
          <InputField
            name="actual"
            label={t("ค่าที่ทำได้จริง (Actual)")}
            subLabel={
              viewMode
                ? undefined
                : t("ถ้ายังไม่มีค่าที่ทำได้จริง สามารถกรอกตามทีหลังได้ ก่อนเข้าวงปรับเทียบผลงาน")
            }
            placeholder={t("สามารถกรอกทีหลังได้")}
            viewMode={viewMode}
            parse={parseRemoveComma()}
            format={normalizeNumberWith2Digit}
          />
        )}
      </div>
    </div>
  )
}

export default KpiTransactionDetailsField
