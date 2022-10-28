import { useTranslation } from "react-i18next"

import Sarabun from "../../components/common/Sarabun"
import { PRIMARY_DARK, WHITE } from "../../constants/colors"
import CardShortCut from "./component/CardShortCut"
import CountMyCrewAssessment from "../../components/CountMyCrewAssessment"
import StepAssessment from "../../components/StepAssessment"
import CardCalibrateSession from "./component/CardCalibrateSession"
import styled from "@emotion/styled"
import TrackAssessmentPage from "../TrackAssessment/TrackAssessmentPage"
import { useGetCurrentUserPermissions } from "../../services/auth/auth-query"
import Icon from "../../components/common/Icon"
import Authorize from "../../components/Authorize"
import { useMemo } from "react"
import { isEmpty } from "lodash"
import { PERMISSIONS } from "../../services/enum-typed"
import { useGetDashboards } from "../../services/dashboard/dashboard-query"
import DashboardProfile from "./component/DashboardProfile"
import Loading from "../../components/common/Loading"

const Body = styled.div`
  background-color: ${PRIMARY_DARK};
`

const SarabunPaddingBottom = styled(Sarabun)`
  padding-bottom: 24px;
`
const Flex = styled.div`
  display: flex;
  height: 100%;
`

const TrackZone = styled.div`
  display: flex;
  width: 100%;
  min-height: 580px;
`

const Dashboards = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  gap: 48px;
`

const ProfileArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  gap: 28px;
`

const CalibrateAndTrackAssessment = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 48px;
`

const IconArea = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 296px;
  min-height: 434px;
  justify-content: flex-end;
  margin-left: 28px;
`

const Dashboard = () => {
  const { t } = useTranslation()
  const { data: permissions, isLoading: isLoadingPermissions } = useGetCurrentUserPermissions()
  const { data: dashboardsData, isLoading: isLoadingDashboardsData } = useGetDashboards()

  const isShowShortCut = useMemo(() => {
    const permissionsShortCut = [
      PERMISSIONS.MANAGE_KPI_LIBRARY_MANAGE_KPI_LIBRARY_READ,
      PERMISSIONS.MANAGE_TEMPLATE_MANAGE_TEMPLATE_READ,
      PERMISSIONS.MANAGE_FORMS_KPI_READ,
      PERMISSIONS.MANAGE_FORMS_ONE_YEAR_READ,
      PERMISSIONS.MANAGE_FORMS_PROBATION_READ,
      PERMISSIONS.MANAGE_GRADE_MANAGE_GRADE_READ,
      PERMISSIONS.MANAGE_ROLE_MANAGE_ROLE_READ,
    ] as string[]
    if (permissions?.length) {
      const findPermissions = permissions.filter((permission) =>
        permissionsShortCut.includes(permission),
      )
      return findPermissions.length ? true : false
    }
    return false
  }, [permissions])

  const kpiTransactionList = useMemo(() => {
    return dashboardsData?.kpiTransaction
  }, [dashboardsData?.kpiTransaction])

  const totalKpiTransaction = useMemo(() => {
    const total = kpiTransactionList?.total
    return Number(total) || 0
  }, [kpiTransactionList?.total])

  const totalProbationSixtyDay = useMemo(() => {
    const total = dashboardsData?.assessmentTransaction.totalProbationSixtyDay
    return Number(total) || 0
  }, [dashboardsData?.assessmentTransaction.totalProbationSixtyDay])

  const totalProbationOneHundredDay = useMemo(() => {
    const total = dashboardsData?.assessmentTransaction.totalProbationOneHundredDay
    return Number(total) || 0
  }, [dashboardsData?.assessmentTransaction.totalProbationOneHundredDay])

  const totalOneYear = useMemo(() => {
    const total = dashboardsData?.assessmentTransaction.totalOneYear
    return Number(total) || 0
  }, [dashboardsData?.assessmentTransaction.totalOneYear])

  const stepAssessmentKpiTransaction = useMemo(() => {
    const {
      total,
      totalAcceptGrade,
      totalApprove,
      totalCalibration,
      totalMgrReview,
      totalNew,
      totalOneOnOneMeeting,
      totalSent,
    } = kpiTransactionList || {}
    return {
      total: Number(total),
      totalAcceptGrade: Number(totalAcceptGrade),
      totalApprove: Number(totalApprove),
      totalCalibration: Number(totalCalibration),
      totalMgrReview: Number(totalMgrReview),
      totalNew: Number(totalNew),
      totalOneOnOneMeeting: Number(totalOneOnOneMeeting),
      totalSent: Number(totalSent),
    }
  }, [kpiTransactionList])

  return (
    <Body>
      <SarabunPaddingBottom type="H2" color={WHITE}>
        {t("แดชบอร์ดของฉัน")}
      </SarabunPaddingBottom>
      <Loading isLoading={isLoadingDashboardsData && isLoadingPermissions}>
        <Dashboards>
          <ProfileArea>
            <Flex>
              <ProfileArea>
                <DashboardProfile />
                <CountMyCrewAssessment
                  totalKpiTransaction={totalKpiTransaction}
                  totalProbationSixtyDay={totalProbationSixtyDay}
                  totalProbationOneHundredDay={totalProbationOneHundredDay}
                  totalOneYear={totalOneYear}
                />
              </ProfileArea>

              {isShowShortCut ? (
                <IconArea style={{ justifyContent: "flex-start" }}>
                  <CardShortCut />
                </IconArea>
              ) : (
                <IconArea>
                  <Icon iconName="dashboard" width={296} height={196} />
                </IconArea>
              )}
            </Flex>
            <StepAssessment kpiTransaction={stepAssessmentKpiTransaction} />
          </ProfileArea>
          <CalibrateAndTrackAssessment>
            <Authorize permissions={[]}>
              {!isEmpty(dashboardsData?.calibrateSessions) && (
                <div>
                  <SarabunPaddingBottom type="H2" color={WHITE}>
                    {t("วงปรับเทียบผลงานที่ดูแลอยู่")}
                  </SarabunPaddingBottom>
                  <CardCalibrateSession calibrateSessions={dashboardsData?.calibrateSessions} />
                </div>
              )}
            </Authorize>
            <Authorize
              permissions={[
                PERMISSIONS.TRACK_ASSESSMENT_KPI_READ,
                PERMISSIONS.TRACK_ASSESSMENT_ONE_YEAR_READ,
                PERMISSIONS.TRACK_ASSESSMENT_PROBATION_READ,
              ]}
            >
              <TrackZone>
                <TrackAssessmentPage pageTitle={t("ติดตามการประเมินที่ดำเนินการอยู่")} />
              </TrackZone>
            </Authorize>
          </CalibrateAndTrackAssessment>
        </Dashboards>
      </Loading>
    </Body>
  )
}

export default Dashboard
