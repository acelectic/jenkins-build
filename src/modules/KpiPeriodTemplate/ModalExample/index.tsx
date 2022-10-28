import { Form } from "react-final-form"
import BehaviorAssessmentField from "../../../components/BehaviorAssessmentField"
import Modal from "../../../components/common/Modal"
import CompanyGoalField from "../../../components/CompanyGoalField"
import DevelopmentGuidelines from "../../../components/DevelopmentGuidelines"
import FeedbackField from "../../../components/FeedbackField"
import OtherGoalField from "../../../components/OtherGoalField"
import ProfileSection from "../../../components/ProfileSection"
import SelfAndTeamGoalField from "../../../components/SelfAndTeamGoalField"

type ModalExampleProps = {
  visibleUseState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

const ModalExample = (props: ModalExampleProps) => {
  const { visibleUseState } = props
  const [isOpenModal, setIsOpenModal] = visibleUseState

  return (
    <Modal
      visibleUseState={[isOpenModal, setIsOpenModal]}
      closeOnClickOutside={false}
      showOkButton={false}
      showCancelButton={false}
      showCloseIcon={true}
      maxWidth={"1100px"}
    >
      <Form onSubmit={() => {}}>
        {() => {
          return (
            <div style={{ width: "1100px" }}>
              <ProfileSection titleText="" />
              <CompanyGoalField viewMode={true} weight={"10"} />
              <OtherGoalField viewMode={true} weight={"10"} />
              <SelfAndTeamGoalField
                viewMode={false}
                showEditKpi={true}
                weight={"10"}
              />
              <BehaviorAssessmentField
                viewMode={true}
                isManagerEvaluate={true}
              />
              <FeedbackField viewMode={true} />
              <DevelopmentGuidelines isViewMode={true} />
            </div>
          )
        }}
      </Form>
    </Modal>
  )
}

export default ModalExample
