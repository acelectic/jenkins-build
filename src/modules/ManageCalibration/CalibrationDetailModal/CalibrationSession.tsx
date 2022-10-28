import { useMemo } from "react"
import Sarabun from "../../../components/common/Sarabun"
import { makeStyles } from "@mui/styles"
import styled from "@emotion/styled"
import UserCard from "./UserCard"
import { WHITE } from "../../../constants/colors"
import { IFinalCalibrateSession } from "../../../services/manage-calibration/manage-calibration-type"
import { CalibratorType } from "../../../services/enum-typed"
import dayjs from "dayjs"

const useStyle = makeStyles((theme) => ({
  finalCalibrateSession: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    boxSizing: "border-box",
  },
  subCalibrateSessions: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #000000",
    padding: "32px 18px 52px 46px",
  },
  divider: {
    backgroundColor: "black",
    height: "1px",
  },
}))

const Body = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  gap: 14;
  background-color: "red";
`

const SelectUsersBox = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  /* align-items: center;
  gap: 4px;
  justify-content: space-between; */
  width: 100%;
  border: 1px solid #c4c4c4;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  width: 100%;
`

const NameColumn = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-width: 260px;
  padding: 12px 0px 12px 24px;
  border-right: 1px solid #000000;
`

const DetailColumn = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  padding: 12px 24px;
  justify-content: center;
  gap: 12px;
  min-height: 70px;
`

const ScrollDetailColumn = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  min-height: 400px;
  gap: 12px;
  max-height: 400px;
  padding: 12px 24px;
  overflow: auto;
`

const CalibrationSessionDetail = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  height: 100px;
`

const SubHeader = styled.div`
  display: flex;
  box-sizing: border-box;
  background: #525252;
  padding: 10px 32px;
  width: 100%;
`

type CalibrationSessionProps = {
  type?: "final" | "sub"
  calibrateSession?: IFinalCalibrateSession
  index?: number
}

const CalibrationSession = (props: CalibrationSessionProps) => {
  const { type = "final", calibrateSession: data, index = 0 } = props
  const { name, calibrators, calibratedUsers, sessionStartDate } = data || {}
  const classes = useStyle()

  const owner = useMemo(() => {
    return calibrators?.find((calibrator) => calibrator.calibratorType === CalibratorType.OWNER)
  }, [calibrators])

  const committees = useMemo(() => {
    return calibrators?.filter(
      (calibrator) => calibrator.calibratorType === CalibratorType.COMMITTEE,
    )
  }, [calibrators])

  const hrs = useMemo(() => {
    return calibrators?.filter((calibrator) => calibrator.calibratorType === CalibratorType.HR)
  }, [calibrators])

  return (
    <div>
      {type === "sub" && (
        <SubHeader>
          <Sarabun size={32} weight={600} color={WHITE}>
            {`วงปรับเทียบผลงานย่อย - ${index + 1}`}
          </Sarabun>
        </SubHeader>
      )}

      <div
        className={type === "final" ? classes.finalCalibrateSession : classes.subCalibrateSessions}
      >
        {/* {type === "final" && (
          <Sarabun size={32} weight={600} style={{ paddingBottom: "58px" }}>
            วงปรับเทียบผลงานใหญ่
          </Sarabun>
        )} */}

        <Body>
          <CalibrationSessionDetail>
            <Sarabun size={16} weight={400}>
              ชื่อวงปรับเทียบผลงาน*
            </Sarabun>
            <Sarabun size={18} weight={700}>
              {name}
            </Sarabun>
          </CalibrationSessionDetail>
          <CalibrationSessionDetail>
            <Sarabun size={16} weight={400}>
              วันที่นัดปรับเทียบผลงาน
            </Sarabun>
            <Sarabun size={18} weight={700}>
              {sessionStartDate
                ? dayjs(sessionStartDate).format("DD-MM-YYYY")
                : `ยังไม่นัดปรับเทียบผลงาน`}
            </Sarabun>
          </CalibrationSessionDetail>
          <Sarabun size={16} weight={400}>
            เลือกคนเข้าวงปรับเทียบผลงาน*
          </Sarabun>
          <SelectUsersBox>
            <Row style={{ borderBottom: "1px solid #000000" }}>
              <NameColumn>
                <Sarabun size={16} weight={700}>
                  ประธานวง (Owner)*
                </Sarabun>
              </NameColumn>
              <DetailColumn>
                {owner && (
                  <UserCard
                    name={`${owner.firstName} ${owner.lastName}`}
                    eId={`${owner.employeeId}`}
                  />
                )}
              </DetailColumn>
            </Row>
            <Row style={{ borderBottom: "1px solid #000000" }}>
              <NameColumn>
                <Sarabun size={16} weight={700}>
                  คณะกรรมการ (Committees)*
                </Sarabun>
                <Sarabun size={24} weight={700}>
                  {`(${committees?.length || 0} คน)`}
                </Sarabun>
              </NameColumn>
              <DetailColumn>
                {committees?.map((Committee) => {
                  const { firstName, lastName, employeeId } = Committee
                  const name = `${firstName} ${lastName}`
                  return <UserCard name={`${name}`} eId={`${employeeId}`} />
                })}
              </DetailColumn>
            </Row>
            <Row style={{ borderBottom: "1px solid #000000" }}>
              <NameColumn>
                <Sarabun size={16} weight={700}>
                  HR ที่ดูแล*
                </Sarabun>
                <Sarabun size={24} weight={700}>
                  {`(${hrs?.length || 0} คน)`}
                </Sarabun>
              </NameColumn>
              <DetailColumn>
                {hrs?.map((hr) => {
                  const { firstName, lastName, employeeId } = hr
                  const name = `${firstName} ${lastName}`
                  return <UserCard name={`${name}`} eId={`${employeeId}`} />
                })}
              </DetailColumn>
            </Row>
            <Row>
              <NameColumn>
                <Sarabun size={16} weight={700}>
                  พนักงานที่ได้รับการประเมิน (Subjects)*
                </Sarabun>
                <Sarabun size={24} weight={700}>
                  {`(${calibratedUsers?.length || 0} คน)`}
                </Sarabun>
              </NameColumn>
              <>
                <ScrollDetailColumn>
                  {calibratedUsers?.map((calibratedUser, index) => {
                    const { firstName, lastName, employeeId } = calibratedUser
                    const name = `${firstName} ${lastName}`
                    return <UserCard name={`${name}`} eId={`${employeeId}`} />
                  })}
                </ScrollDetailColumn>
              </>
            </Row>
          </SelectUsersBox>
        </Body>
      </div>
    </div>
  )
}

export default CalibrationSession
