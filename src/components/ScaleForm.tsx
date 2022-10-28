import { makeStyles } from "@mui/styles"
import { result } from "lodash"
import { useCallback, useMemo, useRef } from "react"
import { Field, useFormState } from "react-final-form"
import {
  ERROR,
  GRAYSCALE_DARKGRAY_40,
  GRAYSCALE_DARKGRAY_80,
  GRAYSCALE_LIGHTGRAY_10,
  GRAYSCALE_LIGHTGRAY_20,
} from "../constants/colors"
import Sarabun from "./common/Sarabun"
import { InputField, RadioGroupButtonField } from "./fields"
import { FieldArray, FieldArrayRenderProps } from "react-final-form-arrays"
import { OnChange } from "react-final-form-listeners"
import { Box } from "@mui/material"
import { normalizeNumberWith2Digit, parseRemoveComma } from "../utils/helper"

const useStyle = makeStyles((theme) => ({
  backgroundScale: {
    // backgroundColor: GRAYSCALE_LIGHTGRAY_10,
    // padding: "16px",
    width: "fit-content",
  },
  headerTable: {
    backgroundColor: GRAYSCALE_LIGHTGRAY_20,
    height: "38px",
    display: "flex",
    alignItems: "center",
    borderTopRightRadius: "16px",
    borderTopLeftRadius: "16px",
    flex: 2,
  },
  textHeaderLeft: {
    marginLeft: "8px",
    flex: 1,
    minWidth: "366px",
  },
  textHeaderRight: {
    marginRight: "16px",
    flex: 2,
    textAlign: "end",
    minWidth: "212px",
  },
  scaleDetail: {
    display: "flex",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "end",
    paddingLeft: "16px",
    paddingTop: "16px",
    flex: 2,
  },
  scaleDetailText: {
    display: "flex",
    alignItems: "center",
    textAlign: "start",
    flex: 1,
  },
  circle: {
    display: "flex",
    width: "32px",
    minWidth: "32px",
    height: "32px",
    minHeight: "32px",
    borderRadius: "50%",
    backgroundColor: GRAYSCALE_DARKGRAY_80,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "12px",
  },
  inputScale: {
    maxWidth: "216px",
    flex: 2,
    marginRight: "8px",
  },
  divider: {
    backgroundColor: GRAYSCALE_DARKGRAY_40,
    height: "1px",
    display: "flex",
    marginTop: "16px",
  },
  scaleName: {
    marginLeft: "8px",
  },
  inputField: {},
}))

export type ScaleFormDetail = {
  color: string
  value: number
  scaleName: string
  description: string
}

export enum ScoreType {
  POSITIVE = "positive",
  NEGATIVE = "negative",
}

type ScaleFormState = {
  scales: ScaleFormDetail[]
  positionTarget: string
  scoreType: ScoreType
  target: string
}

type ScaleFormProps = {
  name?: string
  viewMode?: boolean
}
const ScaleForm = (props: ScaleFormProps) => {
  const { name, viewMode = false } = props
  const fieldsRef = useRef<FieldArrayRenderProps<ScaleFormDetail, HTMLElement>["fields"]>()
  const classes = useStyle()
  const formState = useFormState()

  const getFormValues = useCallback(
    (formValues) => {
      if (name) {
        return result<ScaleFormState>(formValues, name)
      } else {
        return formValues as ScaleFormState
      }
    },
    [name],
  )

  const required = useCallback((value: any) => {
    return value ? undefined : "Required"
  }, [])

  //เช็คว่า scale ที่กรอกมาถูกต้องหรือไม่
  //ถ้าเป็น positive ช่องที่กรอกมาจะต้องไม่น้อยกว่าหรือเท่ากับช่องก่อนหน้า
  //ถ้าเป็น negative ช่องที่กรอกมาจะต้องไม่มากก่าหรือเท่ากับช่องก่อนหน้า
  const invalidInputScale = useCallback(
    (index: number) => (value: string, allValues: any) => {
      if (value === undefined) {
        return "required"
      }
      const formValue = getFormValues(allValues)
      if (formValue === undefined) {
        return
      }
      const { scales, scoreType } = formValue

      if (index === 0) {
        return undefined
      } else if (index + 1 === scales.length) {
        const scalesSort = scales
        const _value = Number(scalesSort[index].value)
        const preValue = Number(scalesSort[index - 1].value)
        if (scoreType === ScoreType.POSITIVE) {
          return _value <= preValue ? "invalid" : undefined
        } else {
          return _value >= preValue ? "invalid" : undefined
        }
      }
      const scalesSort = scales
      const _value = Number(scalesSort[index].value)
      const preValue = Number(scalesSort[index - 1].value)
      const nextValue = Number(scalesSort[index + 1].value)
      if (scoreType === ScoreType.POSITIVE) {
        return _value <= preValue || _value >= nextValue ? "invalid" : undefined
      } else {
        return _value >= preValue || _value <= nextValue ? "invalid" : undefined
      }
      // const scalesSort =
      //   scoreType === ScoreType.POSITIVE
      //     ? reverse(scales.map((scale: ScaleFormDetail) => scale))
      //     : scales
    },
    [getFormValues],
  )
  const formValues = useMemo(() => {
    return getFormValues(formState.values)
  }, [formState.values, getFormValues])

  const getFieldName = useCallback(
    (fieldName: string) => {
      if (name) {
        return [name, fieldName].join(".")
      } else {
        return fieldName
      }
    },
    [name],
  )

  //คำนวณ scale ในกรณี target เป็นบวก
  const onCalPositive = useCallback(
    (scales: ScaleFormDetail[], positionTarget: string, target: string) => {
      const percent = Number(target) * 0.2
      const scaleValues = scales.map((scale, index) => {
        let newValue = target
        if (target === "." || target === "-") {
          return 0
        }
        if (positionTarget === `${index + 1}`) {
          newValue = target
        } else if (positionTarget > `${index + 1}`) {
          newValue = `${Number(target) - Number(percent) * (Number(positionTarget) - (index + 1))}`
        } else if (positionTarget < `${index + 1}`) {
          newValue = `${Number(target) + Number(percent) * (index + 1 - Number(positionTarget))}`
        }
        //    const _scale = scale
        //    _scale.value = Number(newValue)
        //  //  fields.update(index, _scale)

        if (`${newValue}`.includes(".")) {
          return Number(newValue).toFixed(2)
        } else {
          return Number(newValue)
        }
      })
      return scaleValues
    },
    [],
  )

  //คำนวณ scale ในกรณี target เป็นลบ
  const onCalNegative = useCallback(
    (scales: ScaleFormDetail[], positionTarget: string, target: string) => {
      const percent = Number(target) * 0.2
      const scaleValues = scales.map((scale, index) => {
        let newValue = target
        if (target === "." || target === "-") {
          return 0
        }
        if (positionTarget === `${index + 1}`) {
          newValue = target
        } else if (positionTarget > `${index + 1}`) {
          newValue = `${Number(target) + Number(percent) * (Number(positionTarget) - (index + 1))}`
        } else if (positionTarget < `${index + 1}`) {
          newValue = `${Number(target) - Number(percent) * (index + 1 - Number(positionTarget))}`
        }
        if (`${newValue}`.includes(".")) {
          return Number(newValue).toFixed(2)
        } else {
          return Number(newValue)
        }
      })
      return scaleValues
    },
    [],
  )

  //TODO: เขียน comment กันลีม
  // เมื่อ inputField ถูกเปลี่ยนค่าจะทำการคำนวณเพิ่มหรือลดค่า 20%
  const onTargetChange = useCallback(
    (target: string, fields: FieldArrayRenderProps<ScaleFormDetail, HTMLElement>["fields"]) => {
      const { scales, positionTarget, scoreType } = formValues
      if (fields && scales && scoreType !== undefined && !isNaN(Number(target))) {
        if (scoreType === ScoreType.POSITIVE) {
          if (Number(target) > 0) {
            const scaleValues = onCalPositive(scales, positionTarget, target)
            scaleValues.forEach((scaleValue, index) => {
              const _scale = scales[index]
              _scale.value = Number(scaleValue)

              fields.update(index, _scale)
            })
          } else {
            const scaleValues = onCalNegative(scales, positionTarget, target)
            scaleValues.forEach((scaleValue, index) => {
              const _scale = scales[index]
              _scale.value = Number(scaleValue)

              fields.update(index, _scale)
            })
          }
        } else {
          if (Number(target) > 0) {
            const scaleValues = onCalNegative(scales, positionTarget, target)
            scaleValues.forEach((scaleValue, index) => {
              const _scale = scales[index]
              _scale.value = Number(scaleValue)
              fields.update(index, _scale)
            })
          } else {
            const scaleValues = onCalPositive(scales, positionTarget, target)
            scaleValues.forEach((scaleValue, index) => {
              const _scale = scales[index]
              _scale.value = Number(scaleValue)
              fields.update(index, _scale)
            })
          }
        }

        // const scaleValuesSorted =
        //   scoreType === ScoreType.NEGATIVE ? reverse(scaleValues) : scaleValues
        // scaleValuesSorted.forEach((scaleValue, index) => {
        //   const _scale = scales[index]
        //   _scale.value = Number(scaleValue)
        //   fields.update(index, _scale)
        // })
      }
    },
    [formValues, onCalNegative, onCalPositive],
  )

  const onScoreTypeChange = useCallback(
    (
      scoreType: ScoreType,
      fields: FieldArrayRenderProps<ScaleFormDetail, HTMLElement>["fields"],
    ) => {
      const { scales, target, positionTarget } = formValues
      if (fields && scales && target !== undefined) {
        if (scoreType === ScoreType.POSITIVE) {
          if (Number(target) > 0) {
            const scaleValues = onCalPositive(scales, positionTarget, target)
            scaleValues.forEach((scaleValue, index) => {
              const _scale = scales[index]
              _scale.value = Number(scaleValue)
              fields.update(index, _scale)
            })
          } else {
            const scaleValues = onCalNegative(scales, positionTarget, target)
            scaleValues.forEach((scaleValue, index) => {
              const _scale = scales[index]
              _scale.value = Number(scaleValue)
              fields.update(index, _scale)
            })
          }
        } else {
          if (Number(target) > 0) {
            const scaleValues = onCalNegative(scales, positionTarget, target)
            scaleValues.forEach((scaleValue, index) => {
              const _scale = scales[index]
              _scale.value = Number(scaleValue)
              fields.update(index, _scale)
            })
          } else {
            const scaleValues = onCalPositive(scales, positionTarget, target)
            scaleValues.forEach((scaleValue, index) => {
              const _scale = scales[index]
              _scale.value = Number(scaleValue)
              fields.update(index, _scale)
            })
          }
        }

        // const scaleValuesSorted =
        //   scoreType === ScoreType.NEGATIVE ? reverse(scaleValues) : scaleValues
        // scaleValuesSorted.forEach((scaleValue, index) => {
        //   const _scale = scales[index]
        //   _scale.value = Number(scaleValue)
        //   console.debug('onScoreTypeChange', _scale.value)
        //   fields.update(index, _scale)
        // })
      }
    },
    [formValues, onCalNegative, onCalPositive],
  )
  return (
    <div>
      <FieldArray<ScaleFormDetail> name={getFieldName(`scales`)}>
        {({ fields }) => {
          const { scoreType, target } = formValues
          fieldsRef.current = fields
          return (
            <div>
              <div className={classes.backgroundScale}>
                {viewMode ? (
                  <>
                    <div style={{ display: "flex" }}>
                      <Sarabun type="Body2" color={GRAYSCALE_DARKGRAY_80}>
                        กำหนดระดับคะแนน (Rating Scale)
                      </Sarabun>
                      <Sarabun type="Body2" color={ERROR}>
                        *
                      </Sarabun>
                    </div>

                    <div style={{ height: 8 }} />
                    {scoreType === ScoreType.POSITIVE && <Sarabun>{"+ ตัวเลขมาก ดี"}</Sarabun>}
                    {scoreType === ScoreType.NEGATIVE && <Sarabun>{"- ตัวเลขน้อย ดี"}</Sarabun>}
                  </>
                ) : (
                  <RadioGroupButtonField
                    name={getFieldName(`scoreType`)}
                    isRow
                    subLabelSize={10}
                    title="กำหนดระดับคะแนน (Rating Scale)"
                    titleSize={14}
                    spacingRadio={{ width: "24px" }}
                    disabled={target !== undefined ? false : true}
                    validate={required}
                    isRequired={true}
                    options={[
                      {
                        value: "positive",
                        label: "+ ตัวเลขมาก ดี",
                        subLabel: "ยิ่งตัวเลขมาก ยิ่งได้เกรดดี",
                      },
                      {
                        value: "negative",
                        label: "- ตัวเลขน้อย ดี",
                        subLabel: "ยิ่งตัวเลขน้อย ยิ่งได้เกรดดี",
                      },
                    ]}
                  />
                )}
                <OnChange name={getFieldName(`scoreType`)}>
                  {(value) => {
                    onScoreTypeChange(value, fields)
                  }}
                </OnChange>

                <Box
                  display={
                    target !== undefined && target.length !== 0 && scoreType !== undefined
                      ? "block"
                      : "none"
                  }
                >
                  <div style={{ height: "24px" }} />
                  <div className={classes.headerTable}>
                    <Sarabun size={16} weight={500} className={classes.textHeaderLeft}>
                      {"ระดับคะแนน (Scale)"}
                    </Sarabun>
                    <Sarabun size={16} weight={500} className={classes.textHeaderRight}>
                      {"ค่าที่คาดหมาย (Expected value)"}
                    </Sarabun>
                  </div>
                  <div style={{ backgroundColor: GRAYSCALE_LIGHTGRAY_10 }}>
                    {fields.map((fieldArrayName, index) => {
                      return (
                        <div key={fieldArrayName}>
                          <div className={classes.scaleDetail}>
                            <div className={classes.scaleDetailText}>
                              <div className={classes.circle}>
                                <Field name={`${fieldArrayName}.scaleName`}>
                                  {({ input }) => (
                                    <Sarabun
                                      size={20}
                                      weight={700}
                                      color={GRAYSCALE_LIGHTGRAY_20}
                                      style={{ display: "flex" }}
                                    >
                                      {`${input.value}`}
                                    </Sarabun>
                                  )}
                                </Field>
                              </div>
                              {viewMode ? (
                                <Field name={`${fieldArrayName}.description`}>
                                  {({ input }) => (
                                    <Sarabun
                                      size={16}
                                      weight={400}
                                      className={classes.scaleName}
                                    >{`${input.value}`}</Sarabun>
                                  )}
                                </Field>
                              ) : (
                                <InputField
                                  name={`${fieldArrayName}.description`}
                                  className={classes.inputField}
                                  viewMode={viewMode}
                                  fullWidth
                                  style={{
                                    width: "100%",
                                    paddingRight: "16px",
                                  }}
                                />
                              )}
                            </div>
                            <div className={classes.inputScale}>
                              <InputField
                                name={`${fieldArrayName}.value`}
                                className={classes.inputField}
                                initialValue={scoreType !== undefined ? undefined : `${0}`}
                                validate={invalidInputScale(index)}
                                viewMode={viewMode}
                                format={normalizeNumberWith2Digit}
                                parse={parseRemoveComma(11)}
                              />
                            </div>
                          </div>
                          <div className={classes.divider}></div>
                        </div>
                      )
                    })}
                  </div>
                </Box>
              </div>

              <OnChange name={getFieldName(`target`)}>
                {(value, previous) => {
                  onTargetChange(value, fields)
                }}
              </OnChange>
            </div>
          )
        }}
      </FieldArray>
    </div>
  )
}

export default ScaleForm
