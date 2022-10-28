import styled from "@emotion/styled"
import { Form } from "react-final-form"
import { useTranslation } from "react-i18next"
import Sarabun from "../../components/common/Sarabun"
import ProbationManagerTab, { ProbationManagerTabItem } from "../../components/ProbationManagerTab"
import { PRIMARY } from "../../constants/colors"
import ProbationAssessment from "./Component/ProbationAssessment"
import StepTitleDescription from "./Component/StepTitleDescription"
import SuccessNoticeText from "./Component/SuccessNoticeText"
import { ChevronLeft } from "react-feather"
import ProfileSection from "../../components/ProfileSection"
import Button from "../../components/common/Button"
import { useState } from "react"
import { Box, Link } from "@mui/material"

const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px 20px;
`
const GoToPrevious = styled(Link)`
  display: "inline";
  cursor: pointer;
`
const Header = styled.div`
  display: flex;
  align-items: center;
  margin: 24px 0 16px 0;
  width: 100%;
  flex-wrap: wrap;
  gap: 32px;
`
const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 24px 0px 24px 0px;
  padding: 9px 0 20px 0;
`

const Probation = () => {
  const bossStatus = 1 | 2
  const [, setIsOpenModalPass] = useState(false)

  const { t } = useTranslation()

  const items: ProbationManagerTabItem[] = [
    {
      name: "ทดลอง ปรองดอง",
      role: "หัวหน้าฝ่าย",
      result: "ผ่าน",
      date: "20/03/2022",
      content: (
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid white",
            padding: "20px",
          }}
        >
          <StepTitleDescription isShowAssessmentDate={true} description="" />
          <Form onSubmit={() => {}}>
            {({ handleSubmit, invalid }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <ProbationAssessment viewMode={true} />
                </form>
              )
            }}
          </Form>
        </div>
      ),
    },
    {
      name: "ทดลอง ปรองดอง",
      role: "หัวหน้าฝ่าย",
      result: "ผ่าน",
      date: "20/03/2022",
      content: (
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid white",
            padding: "20px",
          }}
        >
          <StepTitleDescription isShowAssessmentDate={true} description="" />
          <Form onSubmit={(value) => {}}>
            {({ handleSubmit, invalid }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <div>
                    <ProbationAssessment viewMode={true} />
                    <Box height={12} />
                  </div>
                </form>
              )
            }}
          </Form>
        </div>
      ),
      disabled: bossStatus === 1 ? true : false,
    },
  ]
  return (
    <Body>
      <GoToPrevious onClick={() => {}}>
        <ChevronLeft />
        <Sarabun color={PRIMARY}>{t(`ย้อนกลับ My Dashboard`)}</Sarabun>
      </GoToPrevious>

      <Header>
        <Sarabun type="H4">{`ประเมินผลการทดลองงาน`}</Sarabun>
      </Header>
      <ProfileSection titleText={""} />
      <SuccessNoticeText />
      <Sarabun size={24} style={{ lineHeight: "40px", marginBottom: "20px" }}>
        {t("ผู้ประเมิน")}
      </Sarabun>
      <ProbationManagerTab items={items} defaultTab={bossStatus} />
      <ButtonBox>
        <div style={{ textAlign: "start" }}>
          <Button
            onClick={() => {
              setIsOpenModalPass(true)
            }}
          >
            ส่งการประเมิน
          </Button>
        </div>
      </ButtonBox>
      {/* <Modal
        isOpen={isOpenModalPass}
        title=""
        fullWidth={true}
        maxWidth="sm"
        onCancel={() => {
          setIsOpenModalPass(false)
        }}
        onConfirm={() => {
          setIsOpenModalPass(false)
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Sarabun type="MTitle">
            คุณยืนยันที่จะส่งผลการประเมินหรือไม่ ?
          </Sarabun>
          <Sarabun type="Paragraph">
            หากคุณส่งผลการประเมินแล้ว จะแก้ไขไม่ได้อีก
          </Sarabun>
        </div>
      </Modal>
      <Modal
        isOpen={isOpenModalNotPass}
        title=""
        fullWidth={true}
        maxWidth="sm"
        onCancel={() => {
          setIsOpenModalNotPass(false)
        }}
        onConfirm={() => {
          setIsOpenModalNotPass(false)
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Sarabun type="MTitle">
            คุณยืนยันที่จะประเมินผลว่า “ไม่ผ่าน” หรือไม่ ?
          </Sarabun>
          <Sarabun type="Paragraph">
            หากคุณส่งผลการประเมินแล้ว จะแก้ไขไม่ได้อีก
          </Sarabun>
        </div>
      </Modal> */}
    </Body>
  )
}

export default Probation
