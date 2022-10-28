import AssessmentTransaction from "../../../components/AssessmentTransaction"
import Modal from "../../../components/common/Modal"
import { BehaviorTemplateDetail } from "../../../services/entity-typed"

type ModalExampleOneYearProps = {
  visibleUseState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

const ModalExampleOneYear = (props: ModalExampleOneYearProps) => {
  const { visibleUseState } = props
  const [isOpenModal, setIsOpenModal] = visibleUseState

  const behaviorTemplateDetails: BehaviorTemplateDetail[] = [
    {
      id: "67f994fe-566b-48b5-8e93-ddd57382ecaa",
      tenantId: "2ef7ca7c-9e92-47d2-83bc-c578e002c6c4",
      createdAt: "2022-05-03T05:46:30.174Z",
      creatorId: "cf408232-f04a-4e81-b670-c2b542be6d0d",
      deletedAt: null,
      updatedAt: "2022-05-03T05:46:30.174Z",
      updaterId: "cf408232-f04a-4e81-b670-c2b542be6d0d",
      seq: 4,
      name: "ขยัน",
      description: "detail des 4",
      behaviorTemplateId: "d99592f8-f2dc-4063-83d3-44417ae08898",
    },
    {
      id: "6598873e-639f-4b81-bcf1-3b793b5a5b86",
      seq: 5,
      name: "ซื่อสัตย์",
      tenantId: "2ef7ca7c-9e92-47d2-83bc-c578e002c6c4",
      createdAt: "2022-05-03T05:46:30.174Z",
      creatorId: "cf408232-f04a-4e81-b670-c2b542be6d0d",
      deletedAt: null,
      updatedAt: "2022-05-03T05:46:30.174Z",
      updaterId: "cf408232-f04a-4e81-b670-c2b542be6d0d",
      description: "detail des 5",
      behaviorTemplateId: "d99592f8-f2dc-4063-83d3-44417ae08898",
    },
    {
      id: "7a98999b-123c-4b88-8a0d-d6567b4a7759",
      seq: 1,
      name: "ทำงานมีประสิทธิภาพ",
      tenantId: "2ef7ca7c-9e92-47d2-83bc-c578e002c6c4",
      createdAt: "2022-05-03T05:46:30.174Z",
      creatorId: "cf408232-f04a-4e81-b670-c2b542be6d0d",
      deletedAt: null,
      updatedAt: "2022-05-03T05:46:30.174Z",
      updaterId: "cf408232-f04a-4e81-b670-c2b542be6d0d",
      description: "detail des 1",
      behaviorTemplateId: "d99592f8-f2dc-4063-83d3-44417ae08898",
    },
    {
      id: "96d966c3-0eab-45a3-b868-9cf19b5fdc5d",
      seq: 2,
      name: "บุคลิกภาพดี",
      tenantId: "2ef7ca7c-9e92-47d2-83bc-c578e002c6c4",
      createdAt: "2022-05-03T05:46:30.174Z",
      creatorId: "cf408232-f04a-4e81-b670-c2b542be6d0d",
      deletedAt: null,
      updatedAt: "2022-05-03T05:46:30.174Z",
      updaterId: "cf408232-f04a-4e81-b670-c2b542be6d0d",
      description: "detail des 2",
      behaviorTemplateId: "d99592f8-f2dc-4063-83d3-44417ae08898",
    },
    {
      id: "4ed2b29d-49d7-4bd2-8a8f-0a168d710ef7",
      seq: 3,
      name: "ยิ้มแย้มแจ่มใส",
      tenantId: "2ef7ca7c-9e92-47d2-83bc-c578e002c6c4",
      createdAt: "2022-05-03T05:46:30.174Z",
      creatorId: "cf408232-f04a-4e81-b670-c2b542be6d0d",
      deletedAt: null,
      updatedAt: "2022-05-03T05:46:30.174Z",
      updaterId: "cf408232-f04a-4e81-b670-c2b542be6d0d",
      description: "detail des 3",
      behaviorTemplateId: "d99592f8-f2dc-4063-83d3-44417ae08898",
    },
  ]

  return (
    <Modal
      visibleUseState={[isOpenModal, setIsOpenModal]}
      closeOnClickOutside={false}
      showOkButton={false}
      showCancelButton={false}
      showCloseIcon={true}
      maxWidth={"1100px"}
    >
      <div style={{ width: "1100px" }}>
        <AssessmentTransaction
          behaviorTemplateDetails={behaviorTemplateDetails}
          seq={4}
          isOneYear={true}
        />
      </div>
    </Modal>
  )
}

export default ModalExampleOneYear
