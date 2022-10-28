import styled from "@emotion/styled"
import { useCallback, useMemo, useState } from "react"
import Sarabun from "../../../components/common/Sarabun"
import { InputField } from "../../../components/fields"
import AvatarImage from "../../../assets/images/profile-circle.svg"
import QuarterCard from "../../../components/common/QuarterCard"
import { MessageSquare } from "react-feather"
import { GRAYSCALE_DARKGRAY_40 } from "../../../constants/colors"
import QuarterCardTitle from "../../../components/QuarterCardTitle"

const BehaviorAssessmentContainer = styled.div`
  margin-top: 42px;
`

const InputDiv = styled.div`
  margin: 10px 0 16px 0;
`
const ScoreDiv = styled.div`
  margin: 10px 0 16px 0;
`
const ScoreContent = styled.div`
  border: 1px solid ${GRAYSCALE_DARKGRAY_40};
  margin: 10px 0 10px 0;
  border-radius: 8px;
  display: flex;
`
const ScoreLeftBox = styled.div`
  border: 1px solid ${GRAYSCALE_DARKGRAY_40};
  margin: 10px;
  border-radius: 8px;
  height: 300px;
  width: 40%;
`
const ScoreRightBox = styled.div`
  margin: 10px;
  width: 100%;
  padding: 12px;
`
const ResultScoreBox = styled.div`
  background-color: ${GRAYSCALE_DARKGRAY_40};
  height: 100px;
  align-items: center;
  text-align: justify;
  display: flex;
  justify-content: space-between;
  padding: 0px 60px 0px 20px;
  margin-top: 10px;
`

const MessageLabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
`

const RowContainer = styled.div`
  margin-bottom: 30px;
`

const ViewModeMessageContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 11px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
  margin-left: 65px;
  flex: 6;
`

const CommentDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 4;
`

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ViewModeContainer = styled.div`
  /* border: 1px solid gray; */
  border-radius: 8px;
  /* padding: 24px; */
`
type BehaviorAssessmentProps = {
  viewMode?: boolean
  name?: string
  canEdit?: boolean
}

const ProbationAssessment = (props: BehaviorAssessmentProps) => {
  const { viewMode = false, name = "นาย อะไรไม่รู้ คิดไม่ออก" } = props
  const behavior = {
    myBehaviorTransaction: {
      attachmentId: "123",
      attachmentToMgrId: "123",
      comment: "123",
      commentToMgr: "123",
      createdAt: "2022-03-23T04:27:48.981Z",
      creatorId: "dc7fc755-18b4-4c26-b916-3dee5c8dfad5",
      deletedAt: null,
      evaluator: {
        avatar: "",
        createdAt: "2022-03-22T07:50:50.858Z",
        creatorId: "e47816f8-630e-4228-b2d4-bebc027241f2",
        deletedAt: null,
        employeeId: "0004444",
        firstName: "ธนาเศรษฐ์",
        genTrOneHundredDays: false,
        genTrOneYear: false,
        genTrSixtyDays: false,
        grade: null,
        hireDate: "2016-09-01T00:00:00.000Z",
        id: "fa849560-e3bc-44a4-8b3b-7cab559c88a0",
        lastName: "โมทนะชัยนันต์",
        prefix: "นาย",
        resignationDate: null,
        status: true,
        tenantId: "2ef7ca7c-9e92-47d2-83bc-c578e002c6c4",
        updatedAt: "2022-03-22T07:50:50.858Z",
        updaterId: "e47816f8-630e-4228-b2d4-bebc027241f2",
        userCareerHistory: {
          companyId: "dbbe3cae-923f-4860-873e-b1d706ea8060",
          createdAt: "2022-03-22T07:51:08.385Z",
          creatorId: "e47816f8-630e-4228-b2d4-bebc027241f2",
          deletedAt: null,
          departmentId: "a422d1bf-00a9-4b9f-aaf4-17554b27419b",
          directManager1Id: "436b06a2-314f-4dcf-aba5-10ccc0a57d6e",
          directManager2Id: "cfc5b17b-1eb6-4631-9bd4-c2ebce22be5e",
          divisionId: "cf9c70ca-f436-4b89-8857-b0c232739060",
          employeeClassificationId: "813a9af1-3fb2-4214-9c8d-b8a8a6b4ebac",
          employeeType: "part_time",
          fieldControlId: "23bed1cf-6bea-4bbf-8bc7-b7560665f64f",
          id: "fa70ff9f-ebfa-4ad3-a6b9-3e552a1f7447",
          jobCodeId: "82fc55f0-18ef-45d7-b12b-9d0d198332b2",
          jobFunctionId: "2c73c0f1-d844-48c5-a14d-863bda9438cc",
          jobLevelId: "434e3abf-4f03-44b7-a3a9-55d58944e682",
          positionId: "1c64102b-af3f-486b-bf07-9ec9272fd801",
          positionLevelId: "061a6b55-067b-407d-8347-d18da641f02a",
          salaryAdminPlanId: "689d6885-2d01-4e1c-9158-7b5fafdf3ff7",
          sectionId: "2ca0b144-71ac-4c60-82d4-fec5958d46d3",
          segmentId: "8bda7553-649d-497f-b030-996b344dba51",
          storeId: "e7a920e1-d2c8-4886-b453-a5505efd244d",
          subDivisionId: "93b50a38-68ad-4dc0-a036-cfd8e138a07e",
          tenantId: "2ef7ca7c-9e92-47d2-83bc-c578e002c6c4",
          updatedAt: "2022-03-22T07:51:08.385Z",
          updaterId: null,
          userId: "fa849560-e3bc-44a4-8b3b-7cab559c88a0",
        },
      },
      evaluatorId: "fa849560-e3bc-44a4-8b3b-7cab559c88a0",
      id: "391d68ee-469b-4dc0-8586-2fb57d58e3a9",
      isActive: false,
      kpiPeriodTemplateId: "3c592c79-c146-4b61-afb0-1b337ea5fd95",
      kpiTransactionId: "94b961b7-705f-47a8-b278-5cec7ee17a04",
      seq: 1,
      tenantId: "2ef7ca7c-9e92-47d2-83bc-c578e002c6c4",
      updatedAt: "2022-03-23T04:27:48.981Z",
      updaterId: "dc7fc755-18b4-4c26-b916-3dee5c8dfad5",
      kpiBehaviorTransactionDetails: [
        {
          actual: "1",
          createdAt: "2022-03-23T04:27:48.981Z",
          creatorId: "dc7fc755-18b4-4c26-b916-3dee5c8dfad5",
          deletedAt: null,
          id: "212f67b7-d415-4393-a67e-5e3e0f20de3f",
          jsonBehaviorDetailId: "6fbbdb14-7f74-4db7-963b-fdd58d0c1840",
          kpiBehaviorTransactionId: "391d68ee-469b-4dc0-8586-2fb57d58e3a9",
          kpiPeriodTemplatePositionId: "85a9b4fe-c2de-428b-b2c0-7b23a409d44c",
          kpiTransactionId: "94b961b7-705f-47a8-b278-5cec7ee17a04",
          tenantId: "2ef7ca7c-9e92-47d2-83bc-c578e002c6c4",
          updatedAt: "2022-03-23T04:27:48.981Z",
          updaterId: "dc7fc755-18b4-4c26-b916-3dee5c8dfad5",
          behaviorTemplateDetail: {
            behaviorTemplateId: "f5bbaa4c-aa4a-4da7-aab0-24bf7a8b4ab8",
            createdAt: "2022-03-04T09:00:06.711Z",
            creatorId: "8baf87d2-8f3f-4886-93d7-ebc0b5705c0b",
            deletedAt: null,
            description: "test detail des 1",
            id: "6fbbdb14-7f74-4db7-963b-fdd58d0c1840",
            name: "test detail 11",
            tenantId: "2ef7ca7c-9e92-47d2-83bc-c578e002c6c4",
            updatedAt: "2022-03-04T09:00:06.711Z",
            updaterId: "8baf87d2-8f3f-4886-93d7-ebc0b5705c0b",
          },
          jsonScale: {
            createdAt: "2022-03-04T08:54:36.523Z",
            creatorId: "8baf87d2-8f3f-4886-93d7-ebc0b5705c0b",
            deletedAt: null,
            description: null,
            id: "04f266b8-9518-4c26-80b1-74732efe3d8e",
            name: "test1",
            positionTarget: "3",
            tenantId: "dbd76b94-e6ff-4b99-882c-e4307f3218b6",
            updatedAt: "2022-03-04T08:54:36.523Z",
            updaterId: "8baf87d2-8f3f-4886-93d7-ebc0b5705c0b",
            scaleDetails: [
              {
                color: "red",
                description: "xxxxx",
                scaleName: "1",
                value: 1,
              },
              {
                color: "blue",
                description: "yyyy",
                scaleName: "2",
                value: 2,
              },
              {
                color: "green",
                description: "zzzz",
                scaleName: "3",
                value: 3,
              },
            ],
          },
        },
        {
          actual: "2",
          createdAt: "2022-03-23T04:27:48.981Z",
          creatorId: "dc7fc755-18b4-4c26-b916-3dee5c8dfad5",
          deletedAt: null,
          id: "212f67b7-d415-4393-a67e-5e3e0f20de3f",
          jsonBehaviorDetailId: "6fbbdb14-7f74-4db7-963b-fdd58d0c1840",
          kpiBehaviorTransactionId: "391d68ee-469b-4dc0-8586-2fb57d58e3a9",
          kpiPeriodTemplatePositionId: "85a9b4fe-c2de-428b-b2c0-7b23a409d44c",
          kpiTransactionId: "94b961b7-705f-47a8-b278-5cec7ee17a04",
          tenantId: "2ef7ca7c-9e92-47d2-83bc-c578e002c6c4",
          updatedAt: "2022-03-23T04:27:48.981Z",
          updaterId: "dc7fc755-18b4-4c26-b916-3dee5c8dfad5",
          behaviorTemplateDetail: {
            behaviorTemplateId: "f5bbaa4c-aa4a-4da7-aab0-24bf7a8b4ab8",
            createdAt: "2022-03-04T09:00:06.711Z",
            creatorId: "8baf87d2-8f3f-4886-93d7-ebc0b5705c0b",
            deletedAt: null,
            description: "test detail des 1",
            id: "6fbbdb14-7f74-4db7-963b-fdd58d0c1840",
            name: "test detail 11",
            tenantId: "2ef7ca7c-9e92-47d2-83bc-c578e002c6c4",
            updatedAt: "2022-03-04T09:00:06.711Z",
            updaterId: "8baf87d2-8f3f-4886-93d7-ebc0b5705c0b",
          },
          jsonScale: {
            createdAt: "2022-03-04T08:54:36.523Z",
            creatorId: "8baf87d2-8f3f-4886-93d7-ebc0b5705c0b",
            deletedAt: null,
            description: null,
            id: "04f266b8-9518-4c26-80b1-74732efe3d8e",
            name: "test1",
            positionTarget: "3",
            tenantId: "dbd76b94-e6ff-4b99-882c-e4307f3218b6",
            updatedAt: "2022-03-04T08:54:36.523Z",
            updaterId: "8baf87d2-8f3f-4886-93d7-ebc0b5705c0b",
            scaleDetails: [
              {
                color: "red",
                description: "xxxxx",
                scaleName: "1",
                value: 1,
              },
              {
                color: "blue",
                description: "yyyy",
                scaleName: "2",
                value: 2,
              },
              {
                color: "green",
                description: "zzzz",
                scaleName: "3",
                value: 3,
              },
            ],
          },
        },
        {
          actual: "3",
          createdAt: "2022-03-23T04:27:48.981Z",
          creatorId: "dc7fc755-18b4-4c26-b916-3dee5c8dfad5",
          deletedAt: null,
          id: "212f67b7-d415-4393-a67e-5e3e0f20de3f",
          jsonBehaviorDetailId: "6fbbdb14-7f74-4db7-963b-fdd58d0c1840",
          kpiBehaviorTransactionId: "391d68ee-469b-4dc0-8586-2fb57d58e3a9",
          kpiPeriodTemplatePositionId: "85a9b4fe-c2de-428b-b2c0-7b23a409d44c",
          kpiTransactionId: "94b961b7-705f-47a8-b278-5cec7ee17a04",
          tenantId: "2ef7ca7c-9e92-47d2-83bc-c578e002c6c4",
          updatedAt: "2022-03-23T04:27:48.981Z",
          updaterId: "dc7fc755-18b4-4c26-b916-3dee5c8dfad5",
          behaviorTemplateDetail: {
            behaviorTemplateId: "f5bbaa4c-aa4a-4da7-aab0-24bf7a8b4ab8",
            createdAt: "2022-03-04T09:00:06.711Z",
            creatorId: "8baf87d2-8f3f-4886-93d7-ebc0b5705c0b",
            deletedAt: null,
            description: "test detail des 1",
            id: "6fbbdb14-7f74-4db7-963b-fdd58d0c1840",
            name: "test detail 11",
            tenantId: "2ef7ca7c-9e92-47d2-83bc-c578e002c6c4",
            updatedAt: "2022-03-04T09:00:06.711Z",
            updaterId: "8baf87d2-8f3f-4886-93d7-ebc0b5705c0b",
          },
          jsonScale: {
            createdAt: "2022-03-04T08:54:36.523Z",
            creatorId: "8baf87d2-8f3f-4886-93d7-ebc0b5705c0b",
            deletedAt: null,
            description: null,
            id: "04f266b8-9518-4c26-80b1-74732efe3d8e",
            name: "test1",
            positionTarget: "3",
            tenantId: "dbd76b94-e6ff-4b99-882c-e4307f3218b6",
            updatedAt: "2022-03-04T08:54:36.523Z",
            updaterId: "8baf87d2-8f3f-4886-93d7-ebc0b5705c0b",
            scaleDetails: [
              {
                color: "red",
                description: "xxxxx",
                scaleName: "1",
                value: 1,
              },
              {
                color: "blue",
                description: "yyyy",
                scaleName: "2",
                value: 2,
              },
              {
                color: "green",
                description: "zzzz",
                scaleName: "3",
                value: 3,
              },
            ],
          },
        },
      ],
    },
    mgrBehaviorTransactions: [
      {
        attachmentId: "132",
        attachmentToMgrId: "123",
        comment: "123",
        commentToMgr: "",
        createdAt: "2022-03-23T04:27:48.981Z",
        creatorId: "dc7fc755-18b4-4c26-b916-3dee5c8dfad5",
        deletedAt: null,
        evaluatorId: "436b06a2-314f-4dcf-aba5-10ccc0a57d6e",
        id: "d4933af0-437b-4d43-9dcd-3e9dbeb40906",
        isActive: false,
        kpiPeriodTemplateId: "3c592c79-c146-4b61-afb0-1b337ea5fd95",
        kpiTransactionId: "94b961b7-705f-47a8-b278-5cec7ee17a04",
        seq: 2,
        tenantId: "2ef7ca7c-9e92-47d2-83bc-c578e002c6c4",
        updatedAt: "2022-03-23T04:27:48.981Z",
        updaterId: "dc7fc755-18b4-4c26-b916-3dee5c8dfad5",
        evaluator: {
          avatar: "",
          createdAt: "2022-03-22T07:50:51.213Z",
          creatorId: "e47816f8-630e-4228-b2d4-bebc027241f2",
          deletedAt: null,
          employeeId: "4001993",
          firstName: "อุไร",
          genTrOneHundredDays: false,
          genTrOneYear: false,
          genTrSixtyDays: false,
          grade: null,
          hireDate: "1997-03-05T00:00:00.000Z",
          id: "436b06a2-314f-4dcf-aba5-10ccc0a57d6e",
          lastName: "นาอุดม",
          prefix: "นาง",
          resignationDate: null,
          status: true,
          tenantId: "2ef7ca7c-9e92-47d2-83bc-c578e002c6c4",
          updatedAt: "2022-03-22T07:50:51.213Z",
          updaterId: "e47816f8-630e-4228-b2d4-bebc027241f2",
          userCareerHistory: {
            companyId: "dbbe3cae-923f-4860-873e-b1d706ea8060",
            createdAt: "2022-03-22T07:51:08.774Z",
            creatorId: "e47816f8-630e-4228-b2d4-bebc027241f2",
            deletedAt: null,
            departmentId: "a422d1bf-00a9-4b9f-aaf4-17554b27419b",
            directManager1Id: "cfc5b17b-1eb6-4631-9bd4-c2ebce22be5e",
            directManager2Id: "673e1926-d650-4668-81e9-e0164d55fea1",
            divisionId: "cf9c70ca-f436-4b89-8857-b0c232739060",
            employeeClassificationId: "4e46ea6a-f653-41e3-9910-cf904c070957",
            employeeType: "full_time",
            fieldControlId: "23bed1cf-6bea-4bbf-8bc7-b7560665f64f",
            id: "fa896120-ccc0-4b0e-81b3-666e06feea7d",
            jobCodeId: "49593d56-ba9e-43fa-8061-94a20ed44d8e",
            jobFunctionId: "2c73c0f1-d844-48c5-a14d-863bda9438cc",
            jobLevelId: "a78318c8-f69f-4896-9789-d4ece87a6720",
            positionId: "d2fac320-c642-4a44-84e8-4f4a59f855dd",
            positionLevelId: "9a03c742-0f88-4c32-a8af-379a41bae74a",
            salaryAdminPlanId: "689d6885-2d01-4e1c-9158-7b5fafdf3ff7",
            sectionId: "2ca0b144-71ac-4c60-82d4-fec5958d46d3",
            segmentId: "8bda7553-649d-497f-b030-996b344dba51",
            storeId: "e7a920e1-d2c8-4886-b453-a5505efd244d",
            subDivisionId: "93b50a38-68ad-4dc0-a036-cfd8e138a07e",
            tenantId: "2ef7ca7c-9e92-47d2-83bc-c578e002c6c4",
            updatedAt: "2022-03-22T07:51:08.774Z",
            updaterId: null,
            userId: "436b06a2-314f-4dcf-aba5-10ccc0a57d6e",
          },
        },
      },
    ],
  }

  const [score] = useState(81)
  const [targetScore] = useState(80)

  const isEmptyKpiBehaviorTransactionDetail = useMemo(() => {
    return false
  }, [])

  const result = useMemo(() => {
    if (score === 0) {
      return "รอผล"
    } else if (score < targetScore) {
      return "ไม่ผ่าน"
    } else {
      return "ผ่าน"
    }
  }, [score, targetScore])

  const isShowSection = useMemo(() => {
    return true || !isEmptyKpiBehaviorTransactionDetail
  }, [isEmptyKpiBehaviorTransactionDetail])

  const renderBehaviorRows = useMemo(() => {
    return behavior?.myBehaviorTransaction.kpiBehaviorTransactionDetails.map((detail, index) => {
      return (
        // <ProbationRowDetail
        //   key={index}
        //   index={index}
        //   viewMode={viewMode}
        //   detail={detail}
        //   length={length}
        //   canEdit={canEdit}
        // />
        <></>
      )
    })
  }, [behavior?.myBehaviorTransaction.kpiBehaviorTransactionDetails])

  const required = useCallback((value: any) => (value ? undefined : "Required"), [])

  return (
    <BehaviorAssessmentContainer style={{ display: isShowSection ? "inherit" : "none" }}>
      <QuarterCard
        titleComponent={
          <QuarterCardTitle
            tooltipText="แบบประเมินพฤติกรรม"
            title={`แบบประเมิน`}
            leftIconName="add"
          />
        }
      >
        {!isEmptyKpiBehaviorTransactionDetail && (
          <div style={{ display: "flex" }}>
            <div style={{ flex: 21 }} />
            <div
              style={{
                flex: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 5,
                marginBottom: 21,
              }}
            >
              <Sarabun>คะแนนของคุณ</Sarabun>
            </div>
          </div>
        )}
        <InputField
          name={`kpiBehaviorTransaction.id`}
          placeholder={""}
          defaultValue={behavior?.myBehaviorTransaction?.id ?? ""}
          validate={required}
          required={true}
          style={{ display: "none" }}
        />
        <RowContainer>{renderBehaviorRows}</RowContainer>
        <ScoreDiv>
          <MessageLabelContainer>
            <MessageSquare />
            <Sarabun>{`ผลการประเมิน`}</Sarabun>
          </MessageLabelContainer>
          <ScoreContent>
            <ScoreLeftBox></ScoreLeftBox>
            <ScoreRightBox>
              <Sarabun style={{ padding: "0px" }}>ผลการประเมินที่ระบบประเมินให้</Sarabun>
              <div style={{ display: "flex", padding: "12px 0px 12px 140px" }}>
                <Sarabun
                  style={{ paddingTop: "4px", paddingRight: "30px" }}
                >{`คะแนนการประเมิน `}</Sarabun>
                <Sarabun>{`${score === 0 ? "รอผล" : `${score}`}`}</Sarabun>
                <Sarabun style={{ paddingTop: "4px", paddingLeft: "30px" }}>{`คะแนน`}</Sarabun>
              </div>
              <ResultScoreBox>
                <div>
                  <Sarabun>ผลการประเมิน</Sarabun>
                  <Sarabun>{`(เกณฑ์ผ่านการประเมินอยู่ที่ ${targetScore} คะแนนขึ้นไป)`}</Sarabun>
                </div>
                <div>
                  <Sarabun>{`${result}`}</Sarabun>
                </div>
              </ResultScoreBox>
            </ScoreRightBox>
          </ScoreContent>
        </ScoreDiv>
        {!viewMode ? (
          <>
            <MessageLabelContainer>
              <MessageSquare />
              <Sarabun>{`ข้อความเกี่ยวกับแบบประเมินพฤติกรรม ${
                !viewMode ? "(ถ้ามี)" : ""
              }`}</Sarabun>
            </MessageLabelContainer>

            <InputDiv>
              <ViewModeMessageContainer>
                <AvatarImg src={AvatarImage} alt="avatar" />
                <NameContainer>
                  <Sarabun>{name}</Sarabun>
                  <Sarabun>ผู้ประเมิน</Sarabun>
                </NameContainer>
              </ViewModeMessageContainer>
              <div style={{ marginLeft: "60px", marginTop: "20px" }}>
                <InputField
                  name={`kpiBehaviorTransaction.comment`}
                  placeholder="ระบุข้อความ หรือคำอธิบายเกี่ยวกับผลงานของคุณให้หัวหน้าเพื่อประกอบการประเมินเกรด"
                  isRequired={false}
                  required={false}
                  showDescription={false}
                  rows={6}
                  multiline={true}
                  defaultValue={behavior?.myBehaviorTransaction.comment ?? ""}
                />
              </div>
            </InputDiv>
          </>
        ) : (
          <ViewModeContainer>
            <MessageLabelContainer>
              <MessageSquare />
              <Sarabun>{`คอมเม้นต์หรือคำแนะนำเกี่ยวกับผลการประเมิน`}</Sarabun>
            </MessageLabelContainer>
            {behavior.mgrBehaviorTransactions.map((item, index) => {
              return (
                <Container>
                  <CommentDetailContainer>
                    <ViewModeMessageContainer>
                      <AvatarImg src={AvatarImage} alt="avatar" />
                      <NameContainer>
                        <Sarabun>
                          {item.evaluator.firstName}
                          {item.evaluator.lastName}
                        </Sarabun>
                        <Sarabun>ผู้ประเมิน(หัวหน้าลำดับที่{index + 1})</Sarabun>
                      </NameContainer>
                    </ViewModeMessageContainer>
                  </CommentDetailContainer>
                  <CommentContainer>
                    <Sarabun>{item.comment ?? "-"}</Sarabun>
                  </CommentContainer>
                </Container>
              )
            })}
          </ViewModeContainer>
        )}
      </QuarterCard>
    </BehaviorAssessmentContainer>
  )
}

export default ProbationAssessment
