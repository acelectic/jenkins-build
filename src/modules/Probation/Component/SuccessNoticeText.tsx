import styled from "@emotion/styled"
import { CSSProperties } from "react"
import { useTranslation } from "react-i18next"
import Sarabun from "../../../components/common/Sarabun"
import { Check } from "react-feather"

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
`

type SuccessNoticeTextProps = {
  // IconName?: IconNameKeys
  IconSize?: number
  textLine1?: string
  textLine2?: string
  textLine3?: string
  textLine4?: string
  textSize?: number
  textWeight?: number
  textLineHeight?: number
  style?: CSSProperties
}

const SuccessNoticeText = (props: SuccessNoticeTextProps) => {
  const {
    // IconName = "checkCircle",
    // IconSize = 112,
    textLine1 = "คุณประเมินผลการทดลองงานครบ 60 วัน ของ ",
    textLine2 = "นายสนิท มานะยิ่ง ",
    textLine3 = "เรียบร้อยแล้ว",
    textLine4 = "เมื่อลูกทีมรับทราบผลการประเมินแล้ว ระบบจะส่งการแจ้งเตือนไปยังคุณอีกที",
    // textSize,
    // textWeight,
    // textLineHeight,
    style,
  } = props
  const { t } = useTranslation()
  return (
    <Body style={style}>
      {/* <CustomIcon iconName={IconName} width={IconSize} height={IconSize} /> */}
      <Check width={40} height={40} />
      <Sarabun
        size={36}
        style={{ lineHeight: "40px", marginTop: "30px", marginBottom: "30px" }}
      >
        {t(textLine1)}
      </Sarabun>

      <Sarabun size={36} style={{ lineHeight: "40px" }}>
        {t(textLine2)}
      </Sarabun>

      <Sarabun size={36} style={{ lineHeight: "40px", marginTop: "30px" }}>
        {t(textLine3)}
      </Sarabun>
      <Sarabun size={24} style={{ lineHeight: "40px", marginTop: "56px" }}>
        {t(textLine4)}
      </Sarabun>
    </Body>
  )
}

export default SuccessNoticeText
