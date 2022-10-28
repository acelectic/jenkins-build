import styled from "@emotion/styled"
import { CSSProperties } from "react"
import { useTranslation } from "react-i18next"
import Sarabun from "../../../components/common/Sarabun"

const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin: 44px 0;
`
const TextBox = styled.div`
  border: 1px solid black;
  padding: 12px 20px;
`

const DateDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`

type StepTitleDescriptionProps = {
  title?: string
  assessmentDate?: string
  isShowAssessmentDate?: boolean
  description?: string
  detail?: string
  style?: CSSProperties
  isShowDetail?: boolean
}

const StepTitleDescription = (props: StepTitleDescriptionProps) => {
  const {
    title = "ประเมินผลการทดลองงานครบ 60 วัน",
    assessmentDate = "(ประเมินผลเมื่อ 20 มี.ค. 2565  14.20 น.)",
    isShowAssessmentDate = false,
    description = "กรุณาตรวจสอบคะแนนที่หัวหน้าคนก่อนหน้าประเมินไว้ และสามารถแก้ไขได้หากผลการประเมินไม่ถูกต้อง",
    detail = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit
          amet, consectetur`,
    style,
    isShowDetail = true,
  } = props
  const { t } = useTranslation()
  return (
    <Body style={style}>
      <DateDiv>
        <Sarabun size={36} style={{ lineHeight: "40px" }}>
          {t(title)}
        </Sarabun>
        {isShowAssessmentDate ? (
          <Sarabun size={14} style={{ lineHeight: "40px" }}>
            {t(assessmentDate)}
          </Sarabun>
        ) : null}
      </DateDiv>
      <Sarabun
        size={18}
        style={{ lineHeight: "40px", marginTop: "8px", marginBottom: "16px" }}
      >
        {t(description)}
      </Sarabun>
      {isShowDetail ? (
        <TextBox>
          <Sarabun size={14} style={{ lineHeight: "30px" }}>
            {t(detail)}
          </Sarabun>
        </TextBox>
      ) : null}
    </Body>
  )
}

export default StepTitleDescription
