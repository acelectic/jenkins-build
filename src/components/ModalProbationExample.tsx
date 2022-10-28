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
import { AssessmentProbationStates, StateComponentType } from "../services/enum-typed"
import { useGetTemplateDetail } from "../services/kpi-template/kpi-template-query"
import AssessmentTransaction from "./AssessmentTransaction"
import Avatar from "./common/Avatar"
import Modal from "./common/Modal"
import Sarabun from "./common/Sarabun"
import State from "./common/State"
import ProbationManagerTab, { ProbationManagerTabItem } from "./ProbationManagerTab"

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

type ModalProbationExampleProps = {
  visibleUseState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  seq: number
  targetScore: number
  evaluatorMessage: string
  behaviorTemplateId?: string
}

const ModalProbationExample = (props: ModalProbationExampleProps) => {
  const { visibleUseState, seq, targetScore, evaluatorMessage, behaviorTemplateId } = props
  const { t } = useTranslation()
  const [isOpenModal, setIsOpenModal] = visibleUseState

  const { data: templateDetailResponse, isLoading } = useGetTemplateDetail({
    templateType: EnumTemplateType.BEHAVIOR,
    templateId: behaviorTemplateId || "",
  })

  const behaviorTemplateDetails: any = useMemo(() => {
    return templateDetailResponse?.behaviorTemplate?.behaviorTemplateDetails || []
  }, [templateDetailResponse?.behaviorTemplate?.behaviorTemplateDetails])

  const items: ProbationManagerTabItem[] = useMemo(
    () => [
      {
        name: "กิจกร จรลักษณ์วิหาร",
        role: "1",
        result: "ผ่าน",
        date: `20/03/2022`,
        content: <></>,
        disabled: true,
      },
      {
        name: "กิจกร จรลักษณ์วิหาร",
        role: "2",
        result: "รอผล",
        date: "",
        content: (
          <AssessmentTransaction
            behaviorTemplateDetails={behaviorTemplateDetails}
            seq={seq}
            targetScore={targetScore}
          />
        ),
        disabled: true,
      },
    ],
    [behaviorTemplateDetails, seq, targetScore],
  )

  return (
    <Modal
      visibleUseState={[isOpenModal, setIsOpenModal]}
      closeOnClickOutside={false}
      showOkButton={false}
      showCancelButton={false}
      showCloseIcon={true}
      maxWidth={"1100px"}
      style={{ width: "90%", maxWidth: "100%" }}
      isLoading={isLoading}
    >
      <Body>
        <Sarabun type="H2">{t(`ประเมินผลการทดลองงาน`)}</Sarabun>
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
          currentState={AssessmentProbationStates.SIXTY_ONE_ONE_MEETING}
          stateComponentType={StateComponentType.PROBATION_EVALUATION}
        />
        <Column>
          <Sarabun type="H3">{`ประเมินผลการทดลองงานครบ 60 วัน`}</Sarabun>
          <Sarabun type="Body1">{`กรุณาตรวจสอบคะแนนที่หัวหน้าคนก่อนหน้าประเมินไว้ และสามารถแก้ไขได้หากผลการประเมินไม่ถูกต้อง`}</Sarabun>
        </Column>
        <MessageDiv>
          <Sarabun type="Body1">{t(`${evaluatorMessage}`)}</Sarabun>
        </MessageDiv>
        <Sarabun type="H5">{t(`ผู้ประเมิน`)}</Sarabun>
        <div>
          <ProbationManagerTab
            defaultTab={2}
            items={items}
            contentStyle={{ padding: "24px" }}
            tabMode="Probation"
          />
        </div>
      </Body>
    </Modal>
  )
}

export default ModalProbationExample
