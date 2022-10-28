import styled from "@emotion/styled"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import {
  GRAYSCALE_DARKGRAY_40,
  GRAYSCALE_LIGHTGRAY_20,
  PRIMARY_LIGHT,
  WHITE,
} from "../constants/colors"
import { EnumTemplateType } from "../modules/Template/CreateTemplate/SettingTemplateState"
import { OneYearForFourMGRStates, StateComponentType } from "../services/enum-typed"
import { useGetTemplateDetail } from "../services/kpi-template/kpi-template-query"
import AssessmentTransaction from "./AssessmentTransaction"
import Avatar from "./common/Avatar"
import Modal from "./common/Modal"
import Sarabun from "./common/Sarabun"
import State from "./common/State"

const Body = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 24px;
  background-color: ${GRAYSCALE_LIGHTGRAY_20};
  box-sizing: border-box;
  padding: 24px 28px;
  height: 100%;
`

const Profile = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px 24px;
  gap: 24px;
  border-radius: 8px;
  background-color: ${PRIMARY_LIGHT};
  height: 100px;
  align-items: center;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const MessageDiv = styled.div`
  padding: 12px;
  background: ${GRAYSCALE_DARKGRAY_40};
  border-radius: 8px;
`

type ModalExampleOneYearProps = {
  visibleUseState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  behaviorTemplateId?: string
  levelApprove?: number
  evaluatorMessage?: string
}

const ModalExampleOneYear = (props: ModalExampleOneYearProps) => {
  const { visibleUseState, behaviorTemplateId, levelApprove, evaluatorMessage } = props
  const [isOpenModal, setIsOpenModal] = visibleUseState
  const { t } = useTranslation()

  const { data: templateDetailResponse, isLoading } = useGetTemplateDetail({
    templateType: EnumTemplateType.BEHAVIOR,
    templateId: behaviorTemplateId || "",
  })

  const behaviorTemplateDetails: any = useMemo(() => {
    return templateDetailResponse?.behaviorTemplate?.behaviorTemplateDetails || []
  }, [templateDetailResponse?.behaviorTemplate?.behaviorTemplateDetails])

  return (
    <Modal
      visibleUseState={[isOpenModal, setIsOpenModal]}
      closeOnClickOutside={false}
      showOkButton={false}
      showCancelButton={false}
      showCloseIcon={true}
      maxWidth={"1100px"}
      isLoading={isLoading}
    >
      <Body>
        <Sarabun type="H2">{t(`ประเมินผลงานครบรอบ 1 ปี`)}</Sarabun>
        <Profile>
          <Avatar height={64} width={64} />
          <Column>
            <Sarabun color={`${WHITE}`} type="H5">
              {t(`นายสนิท มานะยิ่ง (Sanit Maanayiing)`)}
            </Sarabun>
            <Sarabun color={`${WHITE}`} type="Caption">
              {`Junior Marketing / Center of Excellence | ผู้ประเมิน: นายทดลอง ปรองดอง`}
            </Sarabun>
          </Column>
        </Profile>
        <State
          currentState={OneYearForFourMGRStates.SECOND_MGR_REVIEW}
          stateComponentType={
            levelApprove && levelApprove > 3
              ? StateComponentType.ONE_YEAR_FOR_FOUR_MGR_EVALUATION
              : StateComponentType.ONE_YEAR_FOR_THREE_MGR_EVALUATION
          }
        />
        <Column>
          <Sarabun type="H3">{`ประเมินผลงานครบรอบ 1 ปี`}</Sarabun>
          <Sarabun type="Body1">{`กรุณาตรวจสอบคะแนนที่หัวหน้าคนก่อนหน้าประเมินไว้ และสามารถแก้ไขได้หากผลการประเมินไม่ถูกต้อง`}</Sarabun>
        </Column>
        <MessageDiv>
          <Sarabun type="Body1">{t(`${evaluatorMessage}`)}</Sarabun>
        </MessageDiv>
        <Sarabun type="H5">{t(`ผู้ประเมิน`)}</Sarabun>
        <AssessmentTransaction
          behaviorTemplateDetails={behaviorTemplateDetails}
          seq={levelApprove || 1}
          isOneYear={true}
        />
      </Body>
    </Modal>
  )
}

export default ModalExampleOneYear
