import { useCallback, useMemo, useState } from "react"
import styled from "styled-components/macro"
import Sarabun from "./Sarabun"
import { InputField } from "../fields"
import { FieldArray } from "react-final-form-arrays"
import { ColorResult, GithubPicker } from "react-color"
import { useForm } from "react-final-form"
import { ScaleDetail } from "../../services/entity-typed"
import { useTranslation } from "react-i18next"
import {
  BLACK,
  ERROR,
  GRAYSCALE_DARKGRAY_40,
  GRAYSCALE_LIGHTGRAY_10,
  SECONDARY_BG,
  WHITE,
} from "../../constants/colors"
import Icon from "./Icon"
import Dropdown from "./Dropdown"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
  width: 100%;
`
const Body = styled.div<{
  color?: string
}>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 16px;
  gap: 24px;
  background: ${GRAYSCALE_LIGHTGRAY_10};
  /* border: 1px solid ${GRAYSCALE_DARKGRAY_40}; */
  border-radius: 8px;
  box-sizing: border-box;
  width: 100%;
  background-color: ${({ color }) => color};
`
const ColorsBox = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  /* width: 100%; */
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  z-index: 2;
  min-width: 162px;
  max-width: 162px;
  margin-left: -10px;
  margin-top: 214px;
`
const ScaleColorRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 16px;
  min-width: 141px;
  /* width: 100%; */
`

const TextBox = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 24px;
  min-width: 24px;
  max-width: 24px;
`
const Circle = styled.div<{
  color?: string
  isHideMargin?: boolean
}>`
  display: flex;
  border-radius: 50%;
  max-width: 32px;
  max-height: 32px;
  min-width: 32px;
  min-height: 32px;
  margin: ${({ isHideMargin }) => (isHideMargin ? "0px" : "8px")};
  background-color: ${({ color }) => color};
`

const ColorButton = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  /* justify-content: space-between; */
  align-items: center;
  padding: 8px;
  gap: 8px;
  width: 72px;
  height: 48px;
  background: ${WHITE};
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: 8px;
  cursor: pointer;
  :hover {
    border: 1px solid ${BLACK};
  }
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

export const colorOptions = [
  "#D20F03",
  "#DD2946",
  "#E65289",
  "#EE7ABF",
  "#F5A3E7",
  "#F7CCFA",

  "#FF6A16",
  "#FF5337",
  "#FF5A69",
  "#FF7FA9",
  "#FFA4D8",
  "#FFCCF6",

  "#FFC700",
  "#FFA129",
  "#FF8952",
  "#FF837A",
  "#FFA3A8",
  "#FFCCDC",

  "#6BA808",
  "#A3B92D",
  "#C8C153",
  "#D7BC7A",
  "#E4C2A3",
  "#F1D5CC",

  "#1B42A6",
  "#3D7AB7",
  "#60AAC6",
  "#84D1D5",
  "#A9E3D9",
  "#CFF0E3",

  "#A36DFA",
  "#9682FD",
  "#989FFF",
  "#AFC6FF",
  "#C6E4FF",
  "#DFF8FF",
]

export const scaleDetailsInitialValues: ScaleDetail[] = [
  {
    value: 1,
    color: "#D20F03",
    scaleName: "1",
    description: "ผลงานไม่น่าพึงพอใจ (Unsatisfactory)",
  },
  {
    value: 2,
    color: "#FF6A16",
    scaleName: "2",
    description: "จำเป็นต้องปรับปรุง (Needs Improvement)",
  },
  {
    value: 3,
    color: "#FFC700",
    scaleName: "3",
    description: "ผลงานส่วนใหญ่เป็นไปตามที่คาดหมาย (Partially Meets Expectations)",
  },
  {
    value: 4,
    color: "#6BA808",
    scaleName: "4",
    description: "ผลงานส่วนใหญ่เกินความคาดหมาย (Partially Exceeds Expectations)",
  },
  {
    value: 5,
    color: "#1B42A6",
    scaleName: "5",
    description: "ผลงานทั้งหมดเกินความคาดหมาย (Exceeds Expectations)",
  },
  {
    value: 6,
    color: "#A36DFA",
    scaleName: "6",
    description: "ผลงานโดดเด่น (Outstanding)",
  },
  {
    value: 7,
    color: "#D20F03",
    scaleName: "7",
    description: "",
  },
  {
    value: 8,
    color: "#FF6A16",
    scaleName: "8",
    description: "",
  },
  {
    value: 9,
    color: "#FFC700",
    scaleName: "9",
    description: "",
  },
  {
    value: 10,
    color: "#6BA808",
    scaleName: "10",
    description: "",
  },
  {
    value: 11,
    color: "#1B42A6",
    scaleName: "11",
    description: "",
  },
  {
    value: 12,
    color: "#A36DFA",
    scaleName: "12",
    description: "",
  },
  {
    value: 13,
    color: "#D20F03",
    scaleName: "13",
    description: "",
  },
  {
    value: 14,
    color: "#FF6A16",
    scaleName: "14",
    description: "",
  },
  {
    value: 15,
    color: "#FFC700",
    scaleName: "15",
    description: "",
  },
]
type SetScoreLevelType = {
  isViewMode?: boolean
  fieldName?: string
  isEditLevel?: boolean
  jsonScaleDetails?: ScaleDetail[]
  isHideTitle?: boolean
}

const SetScoreLevel = (props: SetScoreLevelType) => {
  const {
    isViewMode = false,
    fieldName,
    jsonScaleDetails,
    isEditLevel = false,
    isHideTitle = false,
  } = props
  const [selectMaxScales, setSelectMaxScales] = useState(jsonScaleDetails?.length || 6)

  const { t } = useTranslation()

  const scalesNumbers = useMemo(() => {
    return (
      scaleDetailsInitialValues.map((item, index) => {
        return {
          label: `${item.value}`,
          value: item.value,
        }
      }) || []
    )
  }, [])

  const InitialScaleDetails = useMemo(() => {
    return jsonScaleDetails
      ? jsonScaleDetails
      : scaleDetailsInitialValues.filter((v) => v.value <= selectMaxScales) || []
  }, [jsonScaleDetails, selectMaxScales])

  return (
    <Container>
      {!isHideTitle && <Sarabun type="H6">{t(`กำหนดระดับคะแนน`)}</Sarabun>}

      {isViewMode && jsonScaleDetails ? (
        <Body color={GRAYSCALE_LIGHTGRAY_10}>
          <Column style={{ gap: "8px" }}>
            <Row>
              <Sarabun type="Body2">{t(`ระดับคะแนน`)}</Sarabun>
              <Sarabun type="Body2" color={ERROR}>{`*`}</Sarabun>
            </Row>

            <Sarabun type="H4">{jsonScaleDetails?.length}</Sarabun>
          </Column>
          <Column style={{ width: "100%" }}>
            <Row>
              <Sarabun type="Body2">{t(`สีของแต่ละระดับคะแนน`)}</Sarabun>
              <Sarabun type="Body2" color={ERROR}>
                {`*`}
              </Sarabun>
            </Row>
            {jsonScaleDetails.map((ScaleDetail, index) => {
              return (
                <ScaleColorRow>
                  <TextBox>
                    <Sarabun type="Body1">{`${index + 1}.`}</Sarabun>
                  </TextBox>

                  <Circle color={ScaleDetail.color} />
                  <Sarabun type="Subtitle1">{t(ScaleDetail.description)}</Sarabun>
                </ScaleColorRow>
              )
            })}
          </Column>
        </Body>
      ) : (
        <FieldArray
          name={fieldName ? `${fieldName}.jsonScaleDetails` : "jsonScaleDetails"}
          initialValue={InitialScaleDetails}
        >
          {({ fields }) => {
            return (
              <Body color={SECONDARY_BG}>
                <Column style={{ gap: "8px" }}>
                  <Row>
                    <Sarabun type="Body2">{t(`ระดับคะแนน`)}</Sarabun>
                    <Sarabun type="Body2" color={ERROR}>{`*`}</Sarabun>
                  </Row>
                  <div>
                    {isEditLevel ? (
                      <Dropdown
                        options={scalesNumbers}
                        onChange={(dropdownValue) => {
                          const value = dropdownValue || 0
                          //ลบFieldArray
                          fields.map((_, index) => index >= Number(value) && fields.pop())
                          //เพิ่มaFieldArray
                          scaleDetailsInitialValues
                            .filter((v) => v.value <= Number(value) && v.value > selectMaxScales)
                            .map((v) =>
                              fields.push(
                                InitialScaleDetails[v.value - 1]
                                  ? InitialScaleDetails[v.value - 1]
                                  : scaleDetailsInitialValues[v.value - 1],
                              ),
                            )
                          setSelectMaxScales(Number(value))
                        }}
                        value={selectMaxScales}
                        style={{ backgroundColor: "white", minWidth: 0 }}
                      />
                    ) : (
                      <Sarabun type="H4">{fields.length}</Sarabun>
                    )}
                  </div>
                </Column>

                <Column style={{ width: "100%" }}>
                  <Row>
                    <Sarabun type="Body2">{t(`สีของแต่ละระดับคะแนน`)}</Sarabun>
                    <Sarabun type="Body2" color={ERROR}>
                      {t(`*`)}
                    </Sarabun>
                  </Row>

                  {fields.map((fieldArray, index) => {
                    return (
                      <ColorAndScoreLevel
                        key={index}
                        index={index}
                        fieldName={fieldArray}
                        defaultColor={fields.value[index].color}
                      />
                    )
                  })}
                </Column>
              </Body>
            )
          }}
        </FieldArray>
      )}
    </Container>
  )
}

type ColorAndScoreLevelProps = {
  index: number
  fieldName: string
  defaultColor: string
}

const ColorAndScoreLevel = (prop: ColorAndScoreLevelProps) => {
  const { index, fieldName, defaultColor = "red" } = prop
  const [color, setColor] = useState<ColorResult>()
  const [openPicker, setOpenPicker] = useState(false)
  const { hex = defaultColor } = color || {}

  const form = useForm()
  const updateColor = useCallback(
    (color: ColorResult) => {
      setColor(color)
      form.change(`${fieldName}.color`, color.hex)
      form.change(`${fieldName}.value`, index + 1)
      form.change(`${fieldName}.scaleName`, `${index + 1}`)
      // console.debug("fields ==> ", fields.map)
      // fields.remove(1)
      // fields.map((v) => console.debug("v ==> ", v.length))
    },
    [fieldName, form, index],
  )

  const handleClick = useCallback(() => {
    setOpenPicker(!openPicker)
  }, [openPicker])

  const handleClose = useCallback(() => {
    setOpenPicker(false)
  }, [])

  const required = useCallback((value: any) => {
    return value ? undefined : "Required"
  }, [])

  return (
    <ScaleColorRow>
      <TextBox>
        <Sarabun type="Body1">{`${index + 1}.`}</Sarabun>
      </TextBox>

      <ColorButton
        onClick={handleClick}
        style={openPicker ? { border: "2px solid #1976d2", padding: 7 } : {}}
      >
        <Circle isHideMargin color={hex} />
        {openPicker ? (
          <ColorsBox>
            <div
              style={{
                position: "fixed",
                top: "0px",
                right: "0px",
                bottom: "0px",
                left: "0px",
              }}
              onClick={handleClose}
            />
            <GithubPicker
              color={hex}
              onChangeComplete={updateColor}
              colors={colorOptions}
              triangle="hide"
            />
          </ColorsBox>
        ) : (
          <></>
        )}
        <Icon
          iconName={openPicker ? "caretUpBlack" : "caretDownBlack"}
          height={16}
          width={16}
          style={{ display: "flex" }}
        />
      </ColorButton>
      <InputField
        placeholder="ใส่คำอธิบาย"
        // label="ใส่คำอธิบาย"
        fullWidth={true}
        variant="outlined"
        name={`${fieldName}.description`}
        style={{ width: "100%" }}
        validate={required}
      />
    </ScaleColorRow>
  )
}

export default SetScoreLevel
