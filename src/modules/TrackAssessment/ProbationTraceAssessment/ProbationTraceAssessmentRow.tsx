import styled from "@emotion/styled"
import { CSSProperties, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import Sarabun from "../../../components/common/Sarabun"
import {
  GRAYSCALE_DARKGRAY_60,
  PRIMARY_DARK,
  SECONDARY_BG,
  SEMANTIC_ERROR_BG,
  SEMANTIC_ERROR_DARK,
  SEMANTIC_SUCCESS_DARK,
  SEMANTIC_WARNING_MAIN,
} from "../../../constants/colors"
import { AssessmentStatus } from "../../../services/enum-typed"
import Avatar from "../../../components/common/Avatar"
import {
  IIsPassed,
  IProbationTrackAssessmentData,
} from "../../../services/track-assessment/track-assessment-type"
import Button from "../../../components/common/Button"
import { useHistory } from "react-router"
import paths from "../../../constants/paths"
import Authorize from "../../../components/Authorize"
import { PERMISSIONS } from "../../../services/enum-typed"
import { Table } from "../../../components/common/Table"

const RenderColumn = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  padding: 12px;
  text-align: center;
  background-color: ${SECONDARY_BG};
  min-width: 126px;
  height: 100%;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  width: 100%;
  gap: 8px;
`

const NameRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  width: 100%;
`

const NameColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const ResultRow = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  align-items: baseline;
  gap: 8px;
  width: 100%;
`

const Dot = styled.div`
  display: flex;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${GRAYSCALE_DARKGRAY_60};
`

type IProbationTrackAssessmentRowProps = {
  style?: CSSProperties
  trackData: IProbationTrackAssessmentData
  indexTrackData?: number
  pageSize?: number
  currentPage?: number
}

const ProbationTrackAssessmentRow = (props: IProbationTrackAssessmentRowProps) => {
  const { style, trackData, pageSize = 1, indexTrackData = 0, currentPage = 1 } = props
  // console.debug("result100", trackData.result100)
  const haveAssessment60: boolean = useMemo(() => trackData.assessmentStatus60 !== null, [
    trackData.assessmentStatus60,
  ])

  const haveAssessment100: boolean = useMemo(() => trackData.assessmentStatus100 !== null, [
    trackData.assessmentStatus100,
  ])

  const { t } = useTranslation()
  const history = useHistory()

  const onClickFailButton = useCallback(() => {
    history.push(
      paths.trackAssessmentDetail({
        routeParam: {
          userId: trackData.userId,
        },
      }),
    )
  }, [history, trackData.userId])

  const getResultColor = useCallback((status: AssessmentStatus, result: IIsPassed) => {
    return status === AssessmentStatus.ONE_ONE_MEETING
      ? `${SEMANTIC_ERROR_DARK}`
      : status === AssessmentStatus.MGR_REVIEW
      ? `${SEMANTIC_WARNING_MAIN}`
      : result.isPassed
      ? `${SEMANTIC_SUCCESS_DARK}`
      : `${SEMANTIC_ERROR_DARK}`
  }, [])

  const renderResult = useCallback(
    (status: AssessmentStatus, result: IIsPassed) => {
      return (
        <ResultRow>
          <Dot
            style={{
              backgroundColor: getResultColor(status, result),
            }}
          />
          <Sarabun type="Body2" color={getResultColor(status, result)}>
            {t(
              status === AssessmentStatus.ONE_ONE_MEETING
                ? `ไม่ผ่าน`
                : status === AssessmentStatus.MGR_REVIEW
                ? `รอผล`
                : result.isPassed
                ? `ผ่าน`
                : `ไม่ผ่าน`,
            )}
          </Sarabun>
        </ResultRow>
      )
    },
    [getResultColor, t],
  )

  const renderFailColumn = useCallback(
    (props: { dayRemaining: number }) => {
      const { dayRemaining } = props
      return (
        <RenderColumn style={{ backgroundColor: `${SEMANTIC_ERROR_BG}` }}>
          <Sarabun
            type="Subtitle2"
            color={`${SEMANTIC_ERROR_DARK}`}
            style={{ marginBottom: "4px" }}
          >
            {`รอ HR จัดการผลการประเมิน`}
          </Sarabun>
          <Sarabun type="Overline" size={10} color={`${SEMANTIC_ERROR_DARK}`}>
            {t(`ภายในอีก`)}
          </Sarabun>
          <Sarabun type="H3" color={`${SEMANTIC_ERROR_DARK}`}>
            {Math.abs(Number(dayRemaining))}
            <span style={{ fontSize: "10px" }}>{t(` วัน`)}</span>
          </Sarabun>
        </RenderColumn>
      )
    },
    [t],
  )

  const getColor = useCallback(
    (dayRemaining: number, isTextColor?: boolean, isDateColor?: boolean) => {
      if (isTextColor) {
        return dayRemaining <= 5 && isDateColor
          ? `${SEMANTIC_ERROR_DARK}`
          : dayRemaining < 0
          ? `${SEMANTIC_ERROR_DARK}`
          : `${PRIMARY_DARK}`
      } else {
        return dayRemaining < 0 ? `${SEMANTIC_ERROR_BG}` : `${SECONDARY_BG}`
      }
    },
    [],
  )

  const renderStatusText = useCallback(
    (status: AssessmentStatus, mgrSeq: number, assessmentType: "60" | "100") => {
      return status === AssessmentStatus.MGR_REVIEW
        ? t(`รอหัวหน้าลำดับ ${mgrSeq} ประเมิน ${assessmentType} วัน`)
        : t(`รับผลการประเมินครบรอบ ${assessmentType} วัน`)
    },
    [t],
  )

  const renderStateColumn = useCallback(
    (props: {
      status: AssessmentStatus
      mgrSeq: number
      dayRemaining: number
      assessmentType: "60" | "100"
    }) => {
      const { status, mgrSeq, dayRemaining, assessmentType } = props
      return (
        <RenderColumn style={{ backgroundColor: getColor(Number(dayRemaining)) }}>
          <Sarabun
            type="Subtitle2"
            color={getColor(Number(dayRemaining), true)}
            style={{ marginBottom: "4px" }}
          >
            {renderStatusText(status, mgrSeq, assessmentType)}
          </Sarabun>
          <Sarabun type="Overline" size={10} color={getColor(Number(dayRemaining), true)}>
            {t(Number(dayRemaining) < 0 ? `เกินเวลามาแล้ว` : `ภายในอีก`)}
          </Sarabun>
          <Sarabun type="H3" color={getColor(Number(dayRemaining), true, true)}>
            {Math.abs(Number(dayRemaining))}
            <span style={{ fontSize: "10px" }}>{t(` วัน`)}</span>
          </Sarabun>
        </RenderColumn>
      )
    },
    [getColor, renderStatusText, t],
  )

  return (
    <Table.Row style={{ ...style }}>
      <Table.Cell>
        <Sarabun>{indexTrackData + 1 + (currentPage - 1) * pageSize}</Sarabun>
      </Table.Cell>
      <Table.Cell>
        <NameRow>
          <Avatar width={40} height={40} />
          <NameColumn>
            <Sarabun type="Subtitle1">{t(`${trackData.firstName} ${trackData.lastName}`)}</Sarabun>
            <Sarabun type="Caption">{`EID: ${trackData.employeeId}`}</Sarabun>
          </NameColumn>
        </NameRow>
      </Table.Cell>
      <Table.Cell>
        <Sarabun type="Body2">{`${trackData.storeName}`}</Sarabun>
      </Table.Cell>
      <Table.Cell>
        <Sarabun type="Body2">{`${trackData.companyName}`}</Sarabun>
      </Table.Cell>
      <Table.Cell>
        <Row style={{ paddingRight: "16px" }}>
          <Column style={{ width: "50%", display: "flex", alignItems: "center" }}>
            {haveAssessment60 ? (
              <div>{renderResult(trackData.assessmentStatus60, trackData.result60)}</div>
            ) : (
              <Sarabun type="Body2">-</Sarabun>
            )}
          </Column>
          <Column style={{ width: "50%", display: "flex", alignItems: "center" }}>
            {haveAssessment100 ? (
              <div>{renderResult(trackData.assessmentStatus100, trackData.result100)}</div>
            ) : (
              <Sarabun type="Body2">-</Sarabun>
            )}
          </Column>
        </Row>
      </Table.Cell>

      <Table.Cell style={{ padding: 0, maxWidth: "126px" }}>
        {
          //ที่ต้องมี || หรือ เนื่องจากว่า component ของการทดลองงานนั้น จะต้องรองรับทั้งสองรูปแบบ คือ 100/60 วัน
          trackData.assessmentStatus60 === AssessmentStatus.ONE_ONE_MEETING ||
          trackData.assessmentStatus100 === AssessmentStatus.ONE_ONE_MEETING
            ? renderFailColumn({ dayRemaining: trackData.timeRemaining })
            : renderStateColumn({
                //เช็คเพื่อจะได้ส่งข้อมูลไปถูกว่าจะใช้อันไหน ถ้ามี 100 ใช้ 100 ถ้าไม่มีใช้ข้อมูลของ 60
                status: trackData.assessmentStatus100
                  ? trackData.assessmentStatus100
                  : trackData.assessmentStatus60,
                mgrSeq: trackData.mgrSeq,
                dayRemaining: trackData.timeRemaining,
                assessmentType: trackData.assessmentStatus100 ? "100" : "60",
              })
        }
      </Table.Cell>
      <Table.Cell
        style={{
          padding: "16px",
        }}
      >
        {
          //ที่ต้องมี || หรือ เนื่องจากว่า component ของการทดลองงานนั้น จะต้องรองรับทั้งสองรูปแบบ คือ 100/60 วัน
          trackData.assessmentStatus60 === AssessmentStatus.ONE_ONE_MEETING ||
          trackData.assessmentStatus100 === AssessmentStatus.ONE_ONE_MEETING ? (
            <Authorize permissions={[PERMISSIONS.TRACK_ASSESSMENT_PROBATION_UPDATE]}>
              <Button onClick={onClickFailButton} width={108}>{`จัดการผลการประเมิน`}</Button>
            </Authorize>
          ) : null
        }
      </Table.Cell>
    </Table.Row>
  )
}

export default ProbationTrackAssessmentRow
