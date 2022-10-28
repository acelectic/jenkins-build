import styled from "@emotion/styled"
import { CSSProperties, useCallback } from "react"
import { useTranslation } from "react-i18next"
import Sarabun from "../../../components/common/Sarabun"
import {
  PRIMARY_DARK,
  SECONDARY_BG,
  SEMANTIC_ERROR_BG,
  SEMANTIC_ERROR_DARK,
} from "../../../constants/colors"
import { AssessmentStatus } from "../../../services/enum-typed"
import Avatar from "../../../components/common/Avatar"
import { IOneYearTrackAssessmentData } from "../../../services/track-assessment/track-assessment-type"
import { normalizeDateTH } from "../../../utils/helper"
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

type IOneYearTrackAssessmentRowProps = {
  style?: CSSProperties
  trackData: IOneYearTrackAssessmentData
  indexTrackData?: number
  pageSize?: number
  currentPage?: number
}

const OneYearTrackAssessmentRow = (props: IOneYearTrackAssessmentRowProps) => {
  const { style, trackData, pageSize = 1, indexTrackData = 0, currentPage = 1 } = props

  const { t } = useTranslation()

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

  const getStatusText = useCallback(
    (status: AssessmentStatus, mgrSeq: number) => {
      return status === AssessmentStatus.MGR_REVIEW
        ? t(`รอหัวหน้าลำดับ ${mgrSeq} ประเมิน`)
        : status === AssessmentStatus.ONE_ONE_MEETING
        ? t(`หัวหน้าให้ Feedback`)
        : t(`รับผลการประเมิน`)
    },
    [t],
  )

  const renderStateColumn = useCallback(
    (props: { status: AssessmentStatus; mgrSeq: number; dayRemaining: string }) => {
      const { status, mgrSeq, dayRemaining } = props
      return (
        <RenderColumn style={{ backgroundColor: getColor(Number(dayRemaining)) }}>
          <Sarabun
            type="Subtitle2"
            color={getColor(Number(dayRemaining), true)}
            style={{ marginBottom: "4px" }}
          >
            {getStatusText(status, mgrSeq)}
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
    [getColor, getStatusText, t],
  )

  return (
    <Table.Row style={{ ...style }}>
      <Table.Cell>
        <Sarabun>{indexTrackData + 1 + (currentPage - 1) * pageSize}</Sarabun>
      </Table.Cell>
      <Table.Cell>
        <NameRow>
          <Avatar width={40} height={40} src={trackData.avatar} />
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
      <Table.Cell align="center">
        <Sarabun type="Body2">{normalizeDateTH(trackData.endDate)}</Sarabun>
      </Table.Cell>
      <Table.Cell style={{ padding: 0, maxWidth: "126px" }}>
        {renderStateColumn({
          status: trackData.status,
          mgrSeq: trackData.mgrSeq,
          dayRemaining: trackData.timeRemaining,
        })}
      </Table.Cell>
    </Table.Row>
  )
}

export default OneYearTrackAssessmentRow
