import styled from "@emotion/styled"
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import Sarabun from "../../components/common/Sarabun"
import { GRAYSCALE_DARKGRAY_40, WHITE } from "../../constants/colors"
import { useGetCurrentUserPermissions } from "../../services/auth/auth-query"
import { PERMISSIONS } from "../../services/enum-typed"
import TrackAssessmentTab, {
  TrackAssessmentTabItem,
} from "./Component/TraceAssessmentTab"
import KpiTrackAssessmentTab from "./KpiTrackAssessmentTab"
import OneYearTrackAssessmentTab from "./OneYearTraceAssessmentTab"
import ProbationTraceAssessmentTab from "./ProbationTraceAssessment"

const Body = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  gap: 24px;
  overflow: auto;
  height: 100%;
  width: 100%;
`

const PageTitleText = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const TabZone = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${GRAYSCALE_DARKGRAY_40};
  border-radius: 8px;
  width: 100%;
  background-color: ${WHITE};
  height: 100%;
  overflow: hidden;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
`

export enum ColumnSortableTitle {
  NAME = "ชื่อวงปรับเทียบผลงาน",
  CALIBRATION_DATE = "วันที่ปรับเทียบผลงาน",
}

type TrackAssessmentPageProps = {
  pageTitle?: string
}

const TrackAssessmentPage = (props: TrackAssessmentPageProps) => {
  const { pageTitle = "ติดตามการประเมิน" } = props
  const [noticeNumber, setNoticeNumber] = useState<number>(0)
  const { t } = useTranslation()
  const { data: permissions } = useGetCurrentUserPermissions()

  const tabItem: TrackAssessmentTabItem[] = useMemo<
    TrackAssessmentTabItem[]
  >(() => {
    const items: TrackAssessmentTabItem[] = []

    if (permissions?.includes(PERMISSIONS.TRACK_ASSESSMENT_KPI_READ)) {
      items.push({
        label: "ประจำไตรมาส",
        content: <KpiTrackAssessmentTab setNoticeNumber={setNoticeNumber} />,
      })
    }
    if (permissions?.includes(PERMISSIONS.TRACK_ASSESSMENT_PROBATION_READ)) {
      items.push({
        label: "ทดลองงาน",
        content: (
          <ProbationTraceAssessmentTab setNoticeNumber={setNoticeNumber} />
        ),
        isNotice: noticeNumber > 0 ? true : false,
        noticeNumber: noticeNumber,
      })
    }
    if (permissions?.includes(PERMISSIONS.TRACK_ASSESSMENT_ONE_YEAR_READ)) {
      items.push({
        label: "ครบรอบ 1 ปี",
        content: (
          <OneYearTrackAssessmentTab setNoticeNumber={setNoticeNumber} />
        ),
      })
    }
    /**ที่ต้องมีตัวสุดท้ายเพราะ เพื่อจะให้มันเป็น tab ปล่าว จะได้ออกมาตาม Ui */
    items.push({
      label: "",
      content: null,
      disabled: true,
    })

    return items
  }, [noticeNumber, permissions])

  return (
    <Body>
      <PageTitleText>
        <Sarabun type="H2" color={WHITE}>
          {t(`${pageTitle}`)}
        </Sarabun>
      </PageTitleText>
      {/**ตัวTab ที่รวมทั้งสามการประเมินไว้ */}
      <TabZone>
        <TrackAssessmentTab items={tabItem} />
      </TabZone>
    </Body>
  )
}

export default TrackAssessmentPage
