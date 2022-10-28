import Card from "./common/Card"
import styled from "@emotion/styled"
import Sarabun from "./common/Sarabun"

import AvatarImage from "../assets/images/profile-circle.svg"
import CustomIcon from "./common/Icon"
import { GRAYSCALE_LIGHTGRAY_20 } from "../constants/colors"
import { useTranslation } from "react-i18next"
import { compact } from "lodash"

const FeedbackCard = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 8px;
  /* box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1); */
  margin-top: 24px;
`

const CardTitle = styled.div`
  display: flex;
  padding: 32px 24px 0 24px;
  justify-content: flex-start;
  align-items: center;
`

const CardBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  /* margin: 44px 0 38px 0; */
  padding: 24px;
`

const AssessorContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  /* background-color: red; */
  margin-right: 2%;
`

const MessageContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  /* background-color: green; */
`

const AssessorDetail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: ${GRAYSCALE_LIGHTGRAY_20};
  padding: 16px 8px 16px 8px;
  border-radius: 8px;
`

const MessageLabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`
const ViewModeMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 12px;
  /* height: 200px;
  border: 1px solid black; */
`

const AvatarImg = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 18px;
`

const CommentContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`

const AssessorTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`

type FeedbackProps = {
  viewMode?: boolean
  name?: string
  isManagerEvaluate?: boolean
}

const FeedbackField = (props: FeedbackProps) => {
  const { t } = useTranslation()
  const { viewMode, isManagerEvaluate = true } = props

  return (
    <FeedbackCard elevation={1}>
      <CardTitle>
        <CustomIcon iconName="chatText" width={32} height={32} style={{ marginRight: 8 }} />
        <Sarabun type="H4">
          {compact([t(`ข้อความจากทีมถึงผู้ประเมิน`), viewMode ? t("(ถ้ามี)") : ""]).join(" ")}
        </Sarabun>
      </CardTitle>

      <CardBody key={`123`}>
        {!isManagerEvaluate && (
          <AssessorContainer>
            <Sarabun type="H6">{t("ผู้ประเมินของคุณ")}</Sarabun>
            <div style={{ height: 16 }} />
            <AssessorDetail>
              <img src={AvatarImage} alt="avatar" />
              <AssessorTextContainer>
                <Sarabun type="Body2">{t("หัวหน้า")}</Sarabun>
                <Sarabun type="H6">นาย ทดลอง ปรองดอง</Sarabun>
                <Sarabun type="Body2">ตำแหน่ง</Sarabun>
              </AssessorTextContainer>
            </AssessorDetail>
          </AssessorContainer>
        )}
        <MessageContainer>
          {!isManagerEvaluate && (
            <MessageLabelContainer>
              <Sarabun type="H6">{t("ระบุข้อความ")}</Sarabun>
            </MessageLabelContainer>
          )}
          <div style={{ height: 6 }} />
          <Container>
            <AvatarImg src={AvatarImage} alt="avatar" />
            <ViewModeMessageContainer>
              <Sarabun type="H5">{`นาย ทดลอง ปรองดอง`}</Sarabun>
              <Sarabun type="Body2">{t("ผู้ถูกประเมิน")}</Sarabun>

              <CommentContainer>
                <Sarabun type="Body1">{``}</Sarabun>
              </CommentContainer>

              {/* <UploadFieldContainer>
            <>ชื่อไฟล์</>
          </UploadFieldContainer> */}
            </ViewModeMessageContainer>
          </Container>
        </MessageContainer>
      </CardBody>
    </FeedbackCard>
  )
}

export default FeedbackField
