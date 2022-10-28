import { makeStyles } from "@mui/styles"
import { useCallback } from "react"
import { Field } from "react-final-form"
import { FieldArray } from "react-final-form-arrays"
import Sarabun from "../../../../../components/common/Sarabun"
import { DropdownField, InputField } from "../../../../../components/fields"
import ScaleForm from "../../../../../components/ScaleForm"
import {
  GRAYSCALE_DARKGRAY_40,
  SECONDARY_DARK,
  SECONDARY_MAIN,
  WHITE,
} from "../../../../../constants/colors"
import { KpiTransactionDetail } from "../../../../../services/entity-typed"
import { UnitType } from "../../../../../services/enum-typed"
import { normalizeNumber } from "../../../../../utils/helper"

const useStyle = makeStyles((theme) => ({
  border: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    border: `1px solid ${GRAYSCALE_DARKGRAY_40}`,
    borderRadius: "8px",
    marginBottom: "24px",
  },
  borderTop: {
    height: "74px",
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
    marginLeft: "16px",
    marginTop: "12px",
  },
  headerName: {
    margin: "16px",
  },
  headerDescription: {
    margin: "24px 0px 0px 0px",
  },
  headerCategory: {
    margin: "24px 0px 0px 0px",
  },
  category: {
    width: "500px",
  },
  headerUnit: {
    margin: "24px 0px 0px 0px",
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    width: "100%",
  },
  unit: {
    width: "132.5px",
  },
  target: {
    width: "280px",
  },
  weight: {
    width: "276px",
  },
}))

type CustomDetailProps = {
  optionsDropdownUnit: BaseOptionType[] | undefined
  optionsDropdown: BaseOptionType[] | undefined
}

const CustomDetail = (props: CustomDetailProps) => {
  const { optionsDropdownUnit, optionsDropdown } = props

  const classes = useStyle()

  const required = useCallback((value: any) => {
    return value ? undefined : "Required"
  }, [])

  const validatePercent = useCallback((value: any) => {
    return value
      ? value >= 1 && value <= 100
        ? undefined
        : "Invalid"
      : "Required"
  }, [])

  return (
    <FieldArray<Partial<KpiTransactionDetail>> name="copyGoalDetails">
      {({ fields }) => {
        return (
          <div>
            {fields.map((name, index) => {
              // fields.push({})
              return (
                <div>
                  <>
                    <div className={classes.border}>
                      <div className={classes.borderTop}>
                        <div className={classes.circle}>
                          <Sarabun size={18} weight={700} color={WHITE}>
                            {`${index + 1}`}
                          </Sarabun>
                        </div>
                        <div className={classes.headerIndex}>
                          <Field name={`${name}.name`}>
                            {({ input }) => (
                              <Sarabun size={18} weight={700} color={WHITE}>
                                {`${input.value}`}
                              </Sarabun>
                            )}
                          </Field>
                          <Field name={`${name}.description`}>
                            {({ input }) => (
                              <Sarabun size={14} weight={400} color={WHITE}>
                                {`${input.value}`}
                              </Sarabun>
                            )}
                          </Field>
                        </div>
                      </div>
                      <div className={classes.headerName}>
                        <div>
                          <InputField
                            name={`${name}.name`}
                            viewMode={true}
                            label="ชื่อเป้าหมาย (Goal name)"
                            placeholder="กรุณากรอกข้อมูล"
                            // validate={required}
                            isRequired={true}
                            showDescription={false}
                            rows={3}
                            multiline={true}
                          />
                        </div>
                        <div className={classes.headerDescription}>
                          <InputField
                            name={`${name}.description`}
                            label="รายละเอียดวิธีการวัดเป้าหมาย (Measurement)* "
                            viewMode={true}
                            subLabel="อธิบายว่าเป้านี้วัดผลอย่างไร และใช้เกณฑ์อะไรในการวัดผล"
                            placeholder="กรุณากรอกข้อมูล"
                            validate={required}
                            isRequired={true}
                            rows={3}
                            multiline={true}
                          />
                        </div>

                        <div className={classes.headerCategory}>
                          <DropdownField
                            name={`${name}.goalCategory`}
                            options={optionsDropdown}
                            viewMode={true}
                            validate={required}
                            label="ประเภท (Type)"
                            placeHolder="เลือกประเภทของเป้าหมาย"
                            isRequired={true}
                            className={classes.category}
                          />
                        </div>
                        <div className={classes.headerUnit}>
                          <InputField
                            name={`${name}.target`}
                            label="ค่าเป้าหมาย (Target)"
                            placeholder="กรุณากรอกข้อมูล"
                            validate={required}
                            isRequired={true}
                            autoComplete={"off"}
                            className={classes.target}
                            parse={normalizeNumber}
                            inputProps={{ maxLength: 6 }}
                          />
                          <Field name={`${name}.unitType`}>
                            {({ input }) => {
                              const isUnitOther =
                                `${input.value}` === UnitType.OTHER
                                  ? true
                                  : false
                              return (
                                <>
                                  <DropdownField
                                    name={`${name}.unitType`}
                                    options={optionsDropdownUnit}
                                    label="หน่วย"
                                    placeHolder="เลือกหน่วย"
                                    validate={required}
                                    isRequired={true}
                                    className={classes.unit}
                                  />

                                  {isUnitOther ? (
                                    <InputField
                                      name={`${name}.customUnitType`}
                                      label="ระบุหน่วยเอง"
                                      placeholder="กรอกหน่วย"
                                      isRequired={true}
                                      className={classes.unit}
                                    />
                                  ) : (
                                    <div className={classes.unit}></div>
                                  )}
                                </>
                              )
                            }}
                          </Field>
                        </div>
                        <div className={classes.headerDescription}>
                          <ScaleForm name={name} />
                        </div>
                        <div className={classes.headerDescription}>
                          <InputField
                            name={`${name}.weight`}
                            label="น้ำหนักของเป้าหมาย (Weight)"
                            subLabel="น้ำหนักทุกเป้าหมายรวมกันต้องเท่ากับ 100%"
                            placeholder="เป็นตัวเลข 1 - 100"
                            validate={validatePercent}
                            isRequired={true}
                            endUnit={true}
                            unitText={"%"}
                            className={classes.weight}
                            parse={normalizeNumber}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                </div>
              )
            })}
          </div>
        )
      }}
    </FieldArray>
  )
}

export default CustomDetail
