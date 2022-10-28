import { useCallback, useMemo, useState } from "react"
import { Form } from "react-final-form"
import ChooseGoalModal from "../../../components/ModalComponent/ChooseGoalModal"
import Button from "../../../components/common/Button"
import { Divider } from "../../../components/common/Divider"
import State, { UserState } from "../../../components/common/State"
import DashBoardProfile from "../../../components/DashBoardProfile"
import ScaleForm, { ScaleFormDetail } from "../../../components/ScaleForm"
import arrayMutators from "final-form-arrays"
import { GRAYSCALE_DARKGRAY_40, PRIMARY_MAIN } from "../../../constants/colors"
import {
  OtherStateType,
  StateComponentType,
} from "../../../services/enum-typed"
import { InputField } from "../../../components/fields"
import styled from "@emotion/styled"
import QuarterDetails from "../../../components/common/QuarterDetails"
import MyTeamTable, {
  MyTeamCardType,
} from "../../../components/common/MyTeamTable"
import Sarabun from "../../../components/common/Sarabun"
import Icon from "../../../components/common/Icon"
import CopyGoalModal from "../../../components/ModalComponent/CopyGoal"

const BackGroundColor = styled.div`
  background-color: #7cfc00;
`

const testScale: ScaleFormDetail[] = [
  { scaleName: "1", value: 1, color: "red", description: "test 1" },
  { scaleName: "2", value: 2, color: "blue", description: "test 2" },
  { scaleName: "3", value: 3, color: "green", description: "test 3" },
  { scaleName: "4", value: 4, color: "red", description: "test 4" },
  { scaleName: "5", value: 5, color: "blue", description: "test 5" },
  { scaleName: "6", value: 6, color: "green", description: "test 6" },
]

const ExampleFrontEndComponent = () => {
  const userList: UserState[] = useMemo(
    () => [
      { name: "AAA", state: OtherStateType.BEHAVIOR_SELECT },
      { name: "BBB", state: OtherStateType.SENT_COMMENT },
    ],
    []
  )

  const [openChooseGoalModal, setOpenChooseGoalModal] = useState<boolean>(false)

  const onOpenChooseGoalModal = useCallback(() => {
    setOpenChooseGoalModal(true)
  }, [])

  const onCloseChooseGoalModal = useCallback(() => {
    setOpenChooseGoalModal(false)
  }, [])

  const intitialPositive = useMemo(() => {
    return {
      scales: testScale,
      positionTarget: 3,
    }
  }, [])

  const myTableItems: MyTeamCardType[] = useMemo(
    () => [
      {
        user: {
          name: `John Cena`,
          eId: `202020`,
          role: "Wrestle",
          id: "5678",
        },
        department: {
          departmentName: "WWE",
        },
        score: {
          scoreNumber: 16,
          scoreDetail: "-",
        },
        status: {
          statusName: "ยังไม่กำหนดเป้าหมาย",
          statusButton: (
            <div>
              <Icon iconName="eye" />
              <Sarabun type="Subtitle2" color={PRIMARY_MAIN}>
                {"ดูเป้าหมาย"}
              </Sarabun>
            </div>
          ),
        },
      },
      {
        user: {
          name: `Punk`,
          eId: `202020`,
          role: "Wrestle",
          id: "5678",
        },
        department: {
          departmentName: "WWE",
        },
        score: {
          scoreNumber: 16,
          scoreDetail: "-",
        },
        status: {
          statusName: "ยังไม่กำหนดเป้าหมาย",
          statusButton: (
            <div>
              <Icon iconName="eye" />
              <Sarabun type="Subtitle2" color={PRIMARY_MAIN}>
                {"ดูเป้าหมาย"}
              </Sarabun>
            </div>
          ),
        },
      },
      {
        user: {
          name: `Rock`,
          eId: `202020`,
          role: "Wrestle",
          id: "5678",
        },
        department: {
          departmentName: "WWE",
        },
        score: {
          scoreNumber: 16,
          scoreDetail: "-",
        },
        status: {
          statusName: "ยังไม่กำหนดเป้าหมาย",
          statusButton: (
            <div>
              <Icon iconName="eye" />
              <Sarabun type="Subtitle2" color={PRIMARY_MAIN}>
                {"ดูเป้าหมาย"}
              </Sarabun>
            </div>
          ),
        },
      },
    ],
    []
  )

  const [openCopyModal, setOpenCopyModal] = useState<boolean>(false)

  const onOpenCopyModal = useCallback(() => {
    return setOpenCopyModal(true)
  }, [])

  const onCloseCopyModal = useCallback(() => {
    return setOpenCopyModal(false)
  }, [])

  return (
    <div
      style={{ backgroundColor: `${GRAYSCALE_DARKGRAY_40}`, padding: "20px" }}
    >
      <h1>DashBoard</h1>
      <DashBoardProfile />
      <Divider style={{ margin: "8px 0" }} />
      <h1>State</h1>
      <State
        currentState={OtherStateType.BEHAVIOR_SELECT}
        isShowUserList={true}
        stateComponentType={StateComponentType.OTHER_EVALUATION}
        userList={userList}
      />
      <Divider style={{ margin: "8px 0" }} />
      <h1>ChooseGoalModal</h1>
      <ChooseGoalModal
        onClose={onCloseChooseGoalModal}
        showModal={openChooseGoalModal}
        setShowModal={setOpenChooseGoalModal}
        quarter={"Q3"}
        year={"2022"}
      />
      <Button onClick={onOpenChooseGoalModal}>Open ChooseGoalModal</Button>{" "}
      <Divider style={{ margin: "8px 0" }} />
      <h1>ScaleForm</h1>
      <Form
        onSubmit={() => {}}
        initialValues={intitialPositive}
        mutators={{
          ...arrayMutators,
        }}
      >
        {({ handleSubmit, invalid, initialValues, values }) => {
          return (
            <form onSubmit={handleSubmit}>
              {/*inputField ให้ตั้งชื่อตามนี้เท่านั้น*/}
              <InputField name="target" />
              <ScaleForm />
            </form>
          )
        }}
      </Form>
      <Divider style={{ margin: "8px 0" }} />
      <h1>QuarterDetails</h1>
      <div>
        <QuarterDetails
          title={"ประเมินประจำไตรมาส (Q1/2022)"}
          description={"นายทดลอง ปรองดอง (EID: 12938)i"}
          stepAssessment={<BackGroundColor>1</BackGroundColor>}
          date={new Date().toString()}
        ></QuarterDetails>
      </div>
      <Divider style={{ margin: "8px 0" }} />
      <h1>My Team Table</h1>
      <MyTeamTable
        items={myTableItems}
        isShowHeader={true}
        onClickName={() => {}}
        currentQuarterTag="2022"
      />
      <Divider style={{ margin: "8px 0" }} />.<h1>ChooseGoalModal</h1>
      <CopyGoalModal
        openCopyGoal={openCopyModal}
        closeCopyGoal={onCloseCopyModal}
        unit={[
          {
            label: "XXX",
            value: 90,
            isDisabled: false,
          },
        ]}
        kpiTransactionId={"XXXYYYZZZ"}
        // categoryTypes={typeOption}
        // items={oldKpiTransaction?.kpiTransactions}
        setOpenCopyGoal={setOpenCopyModal}
        onNext={() => {}}
        // maxKpiTransaction={maxKpi}
        // currentKpiTransaction={
        //   currentKpiTransaction?.kpiTransactionDetails.length
        // }
      />
      <Button onClick={onOpenCopyModal}>Open CopyModal</Button>{" "}
      <Divider style={{ margin: "8px 0" }} />
    </div>
  )
}

export default ExampleFrontEndComponent
