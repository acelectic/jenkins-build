import styled from "@emotion/styled"
import { useTranslation } from "react-i18next"
import { WHITE } from "../constants/colors"
import Icon from "./common/Icon"
import Sarabun from "./common/Sarabun"
import { CalKpiPercent } from "./ModalKpiTemplateExample"
import ScoreAssessment from "./ScoreAssessment"
import TextOrComment from "./TextOrComment"

const Body = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  /* align-items: flex-end; */
  width: 100%;
  /* margin-bottom: -8px; */
  /* position: absolute; */
  width: 100%;
  height: fit-content;
  /* left: 109px; */
  background: ${WHITE};
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  border-radius: 12px;
  padding: 24px;
  gap: 36px;
  overflow: auto;
  margin-top: 24px;
`
const CardTitle = styled.div`
  display: flex;
  padding: 8px 0px 0px 0px;
  justify-content: flex-start;
  align-items: center;
  border: 0px solid black;
`

type DevelopmentGuidelineProps = {
  isViewMode?: boolean
  change?: Function
  currentUserName?: string
  data?: CalKpiPercent
}

const DevelopmentGuidelines = (props: DevelopmentGuidelineProps) => {
  const { isViewMode = false, data } = props
  const { t } = useTranslation()

  return (
    <Body>
      <CardTitle>
        <Icon
          iconName="chatText"
          width={32}
          height={32}
          style={{ marginRight: 8 }}
        />
        <Sarabun type="H4">{t("การประเมินและแนวทางการพัฒนา")}</Sarabun>
      </CardTitle>
      <ScoreAssessment isCompleteAllScore isViewMode={isViewMode} data={data} />
      <TextOrComment advice={""} />
    </Body>
  )
}

export default DevelopmentGuidelines
