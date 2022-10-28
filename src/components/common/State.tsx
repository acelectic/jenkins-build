import styled from "@emotion/styled"
import React, { CSSProperties, ReactNode, useCallback, useMemo, useState } from "react"

import { ReactComponent as ArrowRight } from "../../assets/icons/arrow-right.svg"
import { ReactComponent as ArrowDown } from "../../assets/icons/arrow-down.svg"
import { tablet, useScreen, desktop } from "../../utils/responsive-helper"
import { Avatar, AvatarGroup, Box, Button, Paper } from "@mui/material"
import {
  AssessmentProbationStates,
  CalibrationSettingState,
  CreateKpiState,
  KpiStatus,
  MultipleProbationState,
  OneYearAcceptGradeForEmployee,
  OneYearForFourMGRStates,
  OneYearForThreeMGRStates,
  OneYearMultipleMGROneAndTwo,
  OneYearMultipleMGRThreeAndFour,
  OtherStateType,
  SelfProbationStates,
  StateComponentType,
  TemplateCreateState,
  TemplateState,
} from "../../services/enum-typed"
import Sarabun from "./Sarabun"
import { ReactComponent as ProfileCircle } from "../../assets/images/profile-circle.svg"
import { makeStyles } from "@mui/styles"
import Tag from "./Tag"

import { forEach } from "lodash"
import {
  GRAYSCALE_DARKGRAY_60,
  GRAYSCALE_DARKGRAY_80,
  PRIMARY_LIGHT,
  SECONDARY_LIGHT,
  SEMANTIC_ERROR_DARK,
  WHITE,
} from "../../constants/colors"
import StateTag from "./StateTag"
import Tooltip from "./Tooltip"
import { format2DecimalNumber } from "../../utils/helper"

const Container = styled.div<{
  isMyTeam: boolean
}>`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: ${({ isMyTeam }) => (isMyTeam ? "space-between" : "space-around")};
  align-items: center;
  ${tablet} {
    flex-direction: column;
  }
`

const StateItemContainer = styled.div<{
  isLast: boolean
  isShow: boolean
  isMyTeam: boolean
}>`
  width: 100%;
  display: ${({ isShow }) => (isShow ? "flex" : "none")};
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  margin-right: ${({ isLast }) => (isLast ? 0 : 12)}px;
  ${tablet} {
    width: 280px;
    flex-direction: column;
    margin-right: 0px;
    margin-bottom: 15px;
    justify-content: space-around;
  }
  ${desktop} {
    display: flex;
  }
`

const Content = styled.div<{
  currentColor: string
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  width: 100%;
  margin-right: 12px;
  /* border: 1px solid black; */

  ${tablet} {
    flex-direction: row;
    border-width: 1px;
    border-style: solid;
    border-color: ${({ currentColor }) => currentColor};
    border-radius: 16px;
    height: unset;
  }
`

const IndexLabel = styled.div<{
  currentColor: string
}>`
  width: 28px;
  height: 28px;
  min-width: 28px;
  min-height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background-color: ${({ currentColor }) => currentColor};
`

const WhiteSpace = styled.div`
  height: 8px;
  width: 8px;
`

const ShowMoreContainer = styled.div`
  display: none;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  ${tablet} {
    display: flex;
  }
`

const ProfileImageStyled = styled(ProfileCircle)`
  width: 30px;
  height: 30px;
  background-color: ${WHITE};
  margin: -6px;
`

const Divider = styled.div`
  background-color: ${WHITE};
  height: 1px;
  margin: 0px 8px;
`
const StateItemArea = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 8px;
`
const useStyles = makeStyles({
  root: {
    "& .MuiAvatar-root": {
      width: 25,
      height: 25,
      border: "2px solid #6E6D72",
      boxSizing: "border-box",
      fontSize: "2px",
    },
    justifyContent: "center",
  },
  userDetailArea: {
    display: "flex",
    alignItems: "center",
    margin: "0px 8px",
  },
  userAvatarArea: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginTop: "28px",
    marginRight: "18px",
    alignItems: "center",
  },
  tooltipCard: {
    backgroundColor: `${GRAYSCALE_DARKGRAY_80}`,
    borderRadius: "4px",
    minWidth: "156px",
  },
  tagStyle: {
    minWidth: "48px",
  },
})

type StateItem = {
  title?: string
  state:
    | KpiStatus
    | OtherStateType
    | AssessmentProbationStates
    | OneYearForThreeMGRStates
    | OneYearForFourMGRStates
    | SelfProbationStates
    | MultipleProbationState
    | OneYearAcceptGradeForEmployee
    | OneYearMultipleMGRThreeAndFour
    | OneYearMultipleMGROneAndTwo
    | TemplateState
    | TemplateCreateState
    | CalibrationSettingState
    | CreateKpiState
  isFail?: boolean
}

export type StateData = Array<StateItem>

export type UserState = {
  name: string
  state?:
    | KpiStatus
    | OtherStateType
    | AssessmentProbationStates
    | OneYearForThreeMGRStates
    | OneYearForFourMGRStates
    | MultipleProbationState
    | OneYearAcceptGradeForEmployee
    | OneYearMultipleMGRThreeAndFour
    | OneYearMultipleMGROneAndTwo
    | TemplateState
    | TemplateCreateState
    | CalibrationSettingState
    | CreateKpiState
}
const otherStateData: StateData = [
  {
    title: "ตรวจผลงาน",
    state: OtherStateType.BEHAVIOR_SELECT,
  },
  {
    title: "ประเมินพฤติกรรม",
    state: OtherStateType.BEHAVIOR_ASSESSMENT,
  },
  {
    title: "ให้คะแนน",
    state: OtherStateType.SENT_GRADE,
  },
  {
    title: "ให้คำแนะนำ และการพัฒนา",
    state: OtherStateType.SENT_COMMENT,
  },
]

const selfEvaluationStateData: StateData = [
  {
    title: "กำหนดเป้าหมาย",
    state: KpiStatus.NEW,
  },
  {
    title: "รออนุมัติเป้าหมาย",
    state: KpiStatus.SENT,
  },
  {
    title: "รายงานผล KPI และประเมินตนเอง",
    state: KpiStatus.APPROVED,
  },
  {
    title: "หัวหน้าประเมินผล",
    state: KpiStatus.MGR_REVIEW,
  },
  {
    title: "ปรับเทียบผลงาน (Calibration)",
    state: KpiStatus.CALIBRATION,
  },
  {
    title: "หัวหน้าให้ Feedback",
    state: KpiStatus.ONE_ONE_MEETING,
  },
  {
    title: "รับทราบผลงาน",
    state: KpiStatus.ACCEPT_GRADES,
  },
]

const otherEvaluationStateData = [
  {
    title: "กำหนดเป้าหมาย",
    state: KpiStatus.NEW,
  },
  {
    title: "อนุมัติเป้าหมาย",
    state: KpiStatus.SENT,
  },
  {
    title: "รอลูกทีมรายงานผล KPI และประเมินผล",
    state: KpiStatus.APPROVED,
  },
  {
    title: "ประเมินผลงานลูกทีม",
    state: KpiStatus.MGR_REVIEW,
  },
  {
    title: "ปรับเทียบผลงาน (Calibration)",
    state: KpiStatus.CALIBRATION,
  },
  {
    title: "รับผลและให้ Feedback ลูกทีม",
    state: KpiStatus.ONE_ONE_MEETING,
  },
  {
    title: "ลูกทีมรับทราบผลงาน",
    state: KpiStatus.ACCEPT_GRADES,
  },
]

const probationStateData: StateData = [
  {
    title: "หัวหน้าฝ่ายประเมินผลงานครบ 60 วัน",
    state: AssessmentProbationStates.SIXTY_MGR_REVIEW,
  },
  {
    title: "หัวหน้าสำนักประเมินผลงานครบ 60 วัน",
    state: AssessmentProbationStates.SIXTY_ONE_ONE_MEETING,
  },
  {
    title: "ลูกทีมรับทราบผลการประเมินครบ 60 วัน",
    state: AssessmentProbationStates.SIXTY_ACCEPT_GRADE,
  },
  {
    title: "หัวหน้าฝ่ายประเมินผลงานครบ 100 วัน",
    state: AssessmentProbationStates.HUNDRED_MGR_REVIEW,
  },
  {
    title: "หัวหน้าสำนักประเมินผลงานครบ 100 วัน",
    state: AssessmentProbationStates.HUNDRED_ONE_ONE_MEETING,
  },
  {
    title: "ลูกทีมรับทราบผลการประเมินครบ 100 วัน",
    state: AssessmentProbationStates.HUNDRED_ACCEPT_GRADE,
  },
]

const selfProbationStateData: StateData = [
  {
    title: "รับทราบผลการประเมินครบ 60 วัน",
    state: SelfProbationStates.SIXTY_ACCEPT_GRADE,
  },

  {
    title: "รับทราบผลการประเมินครบ 100 วัน",
    state: SelfProbationStates.HUNDRED_ACCEPT_GRADE,
  },
]

const multipleProbationStateData = [
  { title: "ให้คะแนน", state: MultipleProbationState.ASSESSMENT },
  { title: "ให้คำแนะนำ", state: MultipleProbationState.COMMENT },
]

const oneYearForThreeMGRStateData: StateData = [
  {
    title: "หัวหน้าลำดับที่ 1 ประเมินผลงาน",
    state: OneYearForThreeMGRStates.FIRST_MGR_REVIEW,
  },
  {
    title: "หัวหน้าลำดับที่ 2 ประเมินผลงาน",
    state: OneYearForThreeMGRStates.SECOND_MGR_REVIEW,
  },
  {
    title: "หัวหน้าลำดับที่ 3 ประเมินผลงาน",
    state: OneYearForThreeMGRStates.THIRD_MGR_REVIEW,
  },
  {
    title: "หัวหน้าลำดับที่ 1 ส่งผลการประเมินให้ลูกทีม",
    state: OneYearForThreeMGRStates.FIRST_MGR_SEND_ASSESSMENT,
  },
  {
    title: "ลูกทีมรับทราบผล การประเมิน",
    state: OneYearForThreeMGRStates.ACCEPT_RESULT_ASSESSMENT,
  },
]

const oneYearForFourMGRStateData: StateData = [
  {
    title: "หัวหน้าลำดับที่ 1 ประเมินผลงาน",
    state: OneYearForFourMGRStates.FIRST_MGR_REVIEW,
  },
  {
    title: "หัวหน้าลำดับที่ 2 ประเมินผลงาน",
    state: OneYearForFourMGRStates.SECOND_MGR_REVIEW,
  },
  {
    title: "หัวหน้าลำดับที่ 3 ประเมินผลงาน",
    state: OneYearForFourMGRStates.THIRD_MGR_REVIEW,
  },
  {
    title: "หัวหน้าลำดับที่ 4 ประเมินผลงาน",
    state: OneYearForFourMGRStates.FOURTH_MGR_REVIEW,
  },
  {
    title: "หัวหน้าลำดับที่ 1 ส่งผลการประเมินให้ลูกทีม",
    state: OneYearForFourMGRStates.FIRST_MGR_SEND_ASSESSMENT,
  },
  {
    title: "ลูกทีมรับทราบผล การประเมิน",
    state: OneYearForFourMGRStates.ACCEPT_RESULT_ASSESSMENT,
  },
]

const oneYearAcceptGradeForEmployee = [
  {
    title: "รับทราบผลการประเมิน",
    state: OneYearAcceptGradeForEmployee.ACCEPT_RESULT_ASSESSMENT,
  },
]

const oneYearMultipleMGROneAndTwoData = [
  {
    title: "ประเมินพฤติกรรม",
    state: OneYearMultipleMGROneAndTwo.BEHAVIOURAL_ASSESSMENT,
  },
  {
    title: "ให้คะแนน",
    state: OneYearMultipleMGROneAndTwo.GRADE,
  },
  {
    title: "ให้คำแนะนำ และผลงานที่โดดเด่น",
    state: OneYearMultipleMGROneAndTwo.SUGGEST_AND_OUTSTANDING_WORK,
  },
]

const oneYearMultipleMGRThreeAndFourData = [
  {
    title: "ให้คะแนน",
    state: OneYearMultipleMGRThreeAndFour.GRADE,
  },
  {
    title: "ให้คำแนะนำ และผลงานที่โดดเด่น",
    state: OneYearMultipleMGRThreeAndFour.SUGGEST_AND_OUTSTANDING_WORK,
  },
]

const templateStateData = [
  {
    title: "ตั้งค่าเทมเพลต",
    state: TemplateState.SETTING_TEMPLATE,
  },
  {
    title: "ตรวจสอบและยืนยัน",
    state: TemplateState.CONFIRM_TEMPLATE,
  },
]

const templateCreateStateData = [
  { title: "ตั้งค่าแบบฟอร์ม", state: TemplateCreateState.SETTING_TEMPLATE },
  {
    title: "กำหนดเนื้อหาของแบบฟอร์ม",
    state: TemplateCreateState.SET_TARGET,
  },
  { title: "เลือกกลุ่มพนักงาน", state: TemplateCreateState.SELECT_EMPLOYEE },
  { title: "ตรวจสอบและยืนยัน", state: TemplateCreateState.CONFIRM_TEMPLATE },
]

const calibrationCreateStateData = [
  {
    title: "ตั้งค่าวงปรับเทียบผลงานใหญ่",
    state: CalibrationSettingState.SETTING_FINAL_CALIBRATION,
  },
  {
    title: "ตั้งค่าวงปรับเทียบผลงานย่อย",
    state: CalibrationSettingState.SETTING_SUB_CALIBRATION,
  },
]

const createKpiStateData: StateData = [
  {
    title: "กรอกรายละเอียดเป้าหมาย",
    state: CreateKpiState.FILL_DETAIL,
  },
  {
    title: "เลือกกลุ่มพนักงาน",
    state: CreateKpiState.CHOOSE_EMPLOYEES,
  },
  {
    title: "ตรวจสอบและยืนยัน",
    state: CreateKpiState.EVALUATE_AND_CONFIRM,
  },
]

type StateProps = {
  // data?: StateData
  currentState: StateItem["state"] | undefined
  isReject?: boolean
  onStateClick?: Function | undefined
  stateComponentType?: StateComponentType
  style?: CSSProperties
  userList?: UserState[]
  isShowUserList?: boolean
  isMyTeam?: boolean
  countUsers?: number[]
}

const State = (props: StateProps) => {
  const {
    currentState,
    isReject = false,
    onStateClick,
    stateComponentType = StateComponentType.SELF_EVALUATION,
    style,
    userList,
    isShowUserList,
    isMyTeam = false,
    countUsers,
  } = props
  const classes = useStyles()
  const { isTablet } = useScreen()
  const [isShow, setIsShow] = useState(false)
  const state = useMemo(() => {
    if (stateComponentType === StateComponentType.SELF_EVALUATION) {
      return selfEvaluationStateData
    } else if (stateComponentType === StateComponentType.OTHER_SELF_EVALUATION) {
      return otherEvaluationStateData
    } else if (stateComponentType === StateComponentType.OTHER_EVALUATION) {
      return otherStateData
    } else if (stateComponentType === StateComponentType.PROBATION_EVALUATION) {
      return probationStateData
    } else if (stateComponentType === StateComponentType.ONE_YEAR_FOR_THREE_MGR_EVALUATION) {
      return oneYearForThreeMGRStateData
    } else if (stateComponentType === StateComponentType.SELF_PROBATION) {
      return selfProbationStateData
    } else if (stateComponentType === StateComponentType.ONE_YEAR_FOR_FOUR_MGR_EVALUATION) {
      return oneYearForFourMGRStateData
    } else if (stateComponentType === StateComponentType.ONE_YEAR_ACCEPT_GRADE_FOR_EMPLOYEE) {
      return oneYearAcceptGradeForEmployee
    } else if (stateComponentType === StateComponentType.MULTI_PROBATION) {
      return multipleProbationStateData
    } else if (stateComponentType === StateComponentType.ONE_YEAR_MULTIPLE_MGR_ONE_AND_TWO) {
      return oneYearMultipleMGROneAndTwoData
    } else if (stateComponentType === StateComponentType.ONE_YEAR_MULTIPLE_MGR_THREE_AND_FOUR) {
      return oneYearMultipleMGRThreeAndFourData
    } else if (stateComponentType === StateComponentType.TEMPLATE) {
      return templateStateData
    } else if (stateComponentType === StateComponentType.TEMPLATE_CREATE) {
      return templateCreateStateData
    } else if (stateComponentType === StateComponentType.MANAGE_CALIBRATION) {
      return calibrationCreateStateData
    } else if (stateComponentType === StateComponentType.CREATE_KPI) {
      return createKpiStateData
    }
  }, [stateComponentType])

  // const firstActiveState = useMemo(() => {
  //   if (stateComponentType === StateComponentType.SELF_EVALUATION) {
  //     return KpiStatus.NEW
  //   } else if (stateComponentType === StateComponentType.OTHER_EVALUATION) {
  //     return OtherStateType.BEHAVIOR_SELECT
  //   } else {
  //     return OneYearStateType.MGR_SECTION
  //   }
  // }, [])

  const lastActiveIndex = useMemo(() => {
    let i = 0
    forEach(state || [], (item: StateItem, index: number) => {
      if (item.state === currentState) {
        i = index
      }
    })
    return i
  }, [currentState, state])

  const getCurrentColor = useCallback(
    (item: StateItem, index: number) => {
      if (item.state === currentState) {
        if (!isReject) {
          return PRIMARY_LIGHT
        } else {
          return SEMANTIC_ERROR_DARK // fail
        }
      } else {
        if (index < lastActiveIndex) {
          return SECONDARY_LIGHT
        }
        return GRAYSCALE_DARKGRAY_60
      }
    },
    [currentState, isReject, lastActiveIndex],
  )
  const [open, setOpen] = useState<any>()

  const handleOnClickTooltip = useCallback(
    (item: StateItem) => {
      //ถ้ากด state เดิมจะปิด tooltip
      if (open === item.state) {
        setOpen("")
      }
      //ถ้าไม่จะเซ็ตค่าอันใหม่ลงไปเพื่อเปิด tooltip ของแต่ละ state
      else {
        setOpen(item.state)
      }
    },
    [open],
  )

  //สำหรับแสดงจำนวนรูป avatar ในแต่ละ state
  const renderUserState = useMemo(
    () => (item: StateItem) => {
      const renderItem: ReactNode[] = []
      //กรองหา user ที่อยู่ใน state นั้น
      const userListSort = userList?.filter((user) => user.state === item.state)

      // ถ้ามี user ใน state นั้น จะเก็บ avatar ลงไป ถ้าไม่มีจะคืนกล่องเปล่าที่มีความสูงแทน
      if (userListSort?.length)
        userListSort?.forEach((user) => {
          renderItem.push(
            <Avatar>
              <ProfileImageStyled width={24} height={24} />
            </Avatar>,
          )
        })
      else {
        renderItem.push(<Box height={24} />)
      }
      return renderItem
    },
    [userList],
  )

  // สำหรับแสดงจำนวน user ที่อยู่ในแต่ละ state
  const renderUserNumberInState = useMemo(
    () => (item: StateItem) => {
      //กรองหา user ที่อยู่ใน state นั้น
      const userListSort = userList?.filter((user) => user.state === item.state)

      // ถ้ามี user ใน state นั้น จะคืน tag ไป ถ้าไม่มีจะคืนกล่องเปล่าที่มีความสูงแทน
      return userListSort?.length ? (
        <StateTag
          text={`${format2DecimalNumber(userListSort?.length)} คน`}
          className={classes.tagStyle}
        />
      ) : (
        <Box height={24} />
      )
    },
    [classes.tagStyle, userList],
  )

  // สำหรับแสดงชื่อ user ตอนกด tooltip
  const renderUserDetailToolTip = useMemo(
    () => (item: StateItem) => {
      const renderItem: ReactNode[] = []
      //กรองหา user ที่อยู่ใน state นั้น
      const userListSort = userList?.filter((user) => user.state === item.state)

      userListSort?.forEach((user, index) => {
        if (index < 10) {
          renderItem.push(
            <>
              <Box height={8} />
              <div className={classes.userDetailArea}>
                <ProfileCircle width={24} height={24} />
                <Box width={8} />
                <Sarabun type="Subtitle2" color={WHITE}>{`${user.name}`}</Sarabun>
              </div>
              <Box height={8} />
              {index + 1 < userListSort.length ? <Divider /> : <></>}
            </>,
          )
        }
      })
      return renderItem
    },
    [classes.userDetailArea, userList],
  )
  return (
    <Paper
      elevation={0}
      style={{
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 8,
        paddingBottom: 8,
        ...style,
      }}
    >
      <Container isMyTeam={isMyTeam}>
        {state?.length &&
          state.map((item: StateItem, index: number) => {
            const isLast = index + 1 === state.length
            const currentColor = getCurrentColor(item, index)

            return (
              <>
                <StateItemArea>
                  <StateItemContainer
                    isMyTeam={isMyTeam}
                    key={index}
                    isLast={isLast}
                    isShow={lastActiveIndex === index || isShow}
                  >
                    <Content
                      currentColor={currentColor}
                      onClick={() => onStateClick && onStateClick(item.state)}
                    >
                      <IndexLabel currentColor={currentColor}>
                        <Sarabun type="Subtitle2" color={WHITE}>
                          {index + 1}
                        </Sarabun>
                      </IndexLabel>
                      <WhiteSpace />
                      <Sarabun type="Subtitle2" color={currentColor}>
                        {item.title}
                      </Sarabun>
                    </Content>

                    {!isLast && !isTablet && isMyTeam && <ArrowRight />}
                    {/* ลูกศรขวาแสดงเมื่อไม่ใช่อันสุดท้ายและตั้งแต่ Tablet ขึ้นไป  ใช้เฉพาะหน้า myTeam*/}

                    {!isLast && isTablet && <ArrowDown />}
                    {/* ลูกศรล่างแสดงเมื่อไม่ใช่อันสุดท้ายและตั้งแต่ Tablet ลงมา */}

                    {isLast && isTablet && <div style={{ height: 8 }} />}
                    {/* พื้นที่เปล่าเพื่อให้ระยะอันสุดท้ายเท่าๆ กับอันอื่น */}

                    {!isTablet && isShowUserList && userList?.length && (
                      <div style={{ display: "flex" }}>
                        <div className={classes.userAvatarArea}>
                          {renderUserNumberInState(item)}
                          <Box height={12} />
                          <Tooltip
                            isToggle={true}
                            arrow={true}
                            placement={"bottom"}
                            /// disableHoverListener

                            title={
                              <div className={classes.tooltipCard}>
                                {renderUserDetailToolTip(item)}
                              </div>
                            }
                            arrowColor={`${GRAYSCALE_DARKGRAY_80}`}
                            open={open === item.state ? true : false}
                          >
                            <AvatarGroup
                              max={4}
                              className={classes.root}
                              onClick={handleOnClickTooltip.bind(null, item)}
                            >
                              {renderUserState(item)}
                            </AvatarGroup>
                          </Tooltip>
                        </div>
                      </div>
                    )}

                    {!isTablet && countUsers && countUsers[index] !== 0 ? (
                      <Tag
                        text={`${format2DecimalNumber(countUsers[index])} คน`}
                        style={{ marginTop: 28 }}
                      />
                    ) : countUsers && countUsers[index] === 0 ? (
                      <Box height={52} />
                    ) : (
                      <></>
                    )}
                  </StateItemContainer>
                </StateItemArea>
                {!isLast && !isTablet && !isMyTeam && <ArrowRight />}
              </>
            )
          })}
      </Container>
      <ShowMoreContainer>
        {isShow ? (
          <Button onClick={() => setIsShow(false)}>
            <Sarabun size={14}>See-Less</Sarabun>
          </Button>
        ) : (
          <Button onClick={() => setIsShow(true)}>
            <Sarabun size={14}>View-All</Sarabun>
          </Button>
        )}
      </ShowMoreContainer>
    </Paper>
  )
}

export default State
