import styled from "@emotion/styled"
import { Box } from "@mui/material"
import { useTranslation } from "react-i18next"
import { GRAYSCALE_DARKGRAY_40 } from "../constants/colors"
import Sarabun from "./common/Sarabun"
import { InputField } from "./fields"

const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #ffffff;
  border: 1px solid ${GRAYSCALE_DARKGRAY_40};
  box-sizing: border-box;
  border-radius: 8px;
  padding: 30px 24px 44px 32px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  gap: 16px;
`

type Props = {
  advice?: string
}

const TextOrComment = (props: Props) => {
  const { t } = useTranslation()
  const { advice } = props
  return (
    <Body>
      <Sarabun type="H5">{t("ข้อความ หรือคอมเมนต์แนะนำลูกทีม")}</Sarabun>
      <Box height={16} />
      <Content>
        <InputField
          name="advice.comment"
          placeholder="ระบุข้อความ หรือคอมเมนต์แนะนำการทำงานของลูกทีม และแนวทางการพัฒนา"
          multiline={true}
          rows={5}
          defaultValue={advice}
          disabled={true}
        />
      </Content>
    </Body>
  )
}

export default TextOrComment
