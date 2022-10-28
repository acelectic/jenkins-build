import { useTranslation } from "react-i18next"
import Card from "./common/Card"
import QuarterCard from "./common/QuarterCard"
import Sarabun from "./common/Sarabun"
import { GRAYSCALE_DARKGRAY_40, SECONDARY_MAIN, WHITE } from "../constants/colors"
import { IAssessmentTransactionsSummaryReport } from "../services/report/report-types"

export type CardProbationProps = {
  assessmentTransactionsSummary?: IAssessmentTransactionsSummaryReport
}

const CardProbation = (props: CardProbationProps) => {
  const { assessmentTransactionsSummary } = props
  const {
    totalProbationOneHundredDay,
    totalProbationOneHundredDayNotPassed,
    totalProbationOneHundredDayPassed,
    totalProbationSixtyDay,
    totalProbationSixtyDayNotPassed,
    totalProbationSixtyDayPassed,
  } = assessmentTransactionsSummary || {}
  const { t } = useTranslation()

  return (
    <Card
      styleCard={{
        border: `1px solid ${GRAYSCALE_DARKGRAY_40}`,
      }}
    >
      <div>
        <Sarabun type="H5" style={{ marginTop: 4 }}>
          {t("การประเมินทดลองงาน ")}
        </Sarabun>
        <div style={{ display: "flex" }}>
          <QuarterCard
            titleComponent={
              <Sarabun color={WHITE} type="H4">
                {t(`60 วัน`)}
              </Sarabun>
            }
            bodyStyle={{
              padding: "24px",
              border: `1px solid ${SECONDARY_MAIN}`,
            }}
            style={{ paddingTop: 16, paddingRight: 16 }}
          >
            <div style={{ display: "flex" }}>
              <Sarabun type="Body2" style={{ marginTop: 4, flex: 3, textAlign: "center" }}>
                {t("ประเมิน ")}
              </Sarabun>
              <Sarabun type="Subtitle1" style={{ marginTop: 4, flex: 3, textAlign: "center" }}>
                {t(`${Number(totalProbationSixtyDay) || 0}`)}
              </Sarabun>
              <Sarabun type="Body2" style={{ marginTop: 4, flex: 3, textAlign: "center" }}>
                {t("คน ")}
              </Sarabun>
            </div>
            <div style={{ display: "flex" }}>
              <Sarabun type="Body2" style={{ marginTop: 4, flex: 3, textAlign: "center" }}>
                {t("ผ่าน ")}
              </Sarabun>
              <Sarabun type="Subtitle1" style={{ marginTop: 4, flex: 3, textAlign: "center" }}>
                {t(`${Number(totalProbationSixtyDayPassed) || 0}`)}
              </Sarabun>
              <Sarabun type="Body2" style={{ marginTop: 4, flex: 3, textAlign: "center" }}>
                {t("คน ")}
              </Sarabun>
            </div>
            <div style={{ display: "flex" }}>
              <Sarabun type="Body2" style={{ marginTop: 4, flex: 3, textAlign: "center" }}>
                {t("ไม่ผ่าน ")}
              </Sarabun>
              <Sarabun type="Subtitle1" style={{ marginTop: 4, flex: 3, textAlign: "center" }}>
                {t(`${Number(totalProbationSixtyDayNotPassed) || 0}`)}
              </Sarabun>
              <Sarabun type="Body2" style={{ marginTop: 4, flex: 3, textAlign: "center" }}>
                {t("คน ")}
              </Sarabun>
            </div>
          </QuarterCard>
          <QuarterCard
            titleComponent={
              <Sarabun color={WHITE} type="H4">
                {t(`100 วัน`)}
              </Sarabun>
            }
            bodyStyle={{
              padding: "24px",
              border: `1px solid ${SECONDARY_MAIN}`,
            }}
            style={{ paddingTop: 16 }}
          >
            <div style={{ display: "flex" }}>
              <Sarabun type="Body2" style={{ marginTop: 4, flex: 3, textAlign: "center" }}>
                {t("ประเมิน ")}
              </Sarabun>
              <Sarabun type="Subtitle1" style={{ marginTop: 4, flex: 3, textAlign: "center" }}>
                {t(`${Number(totalProbationOneHundredDay) || 0}`)}
              </Sarabun>
              <Sarabun type="Body2" style={{ marginTop: 4, flex: 3, textAlign: "center" }}>
                {t("คน ")}
              </Sarabun>
            </div>
            <div style={{ display: "flex" }}>
              <Sarabun type="Body2" style={{ marginTop: 4, flex: 3, textAlign: "center" }}>
                {t("ผ่าน ")}
              </Sarabun>
              <Sarabun type="Subtitle1" style={{ marginTop: 4, flex: 3, textAlign: "center" }}>
                {t(`${Number(totalProbationOneHundredDayPassed) || 0}`)}
              </Sarabun>
              <Sarabun type="Body2" style={{ marginTop: 4, flex: 3, textAlign: "center" }}>
                {t("คน ")}
              </Sarabun>
            </div>
            <div style={{ display: "flex" }}>
              <Sarabun type="Body2" style={{ marginTop: 4, flex: 3, textAlign: "center" }}>
                {t("ไม่ผ่าน ")}
              </Sarabun>
              <Sarabun type="Subtitle1" style={{ marginTop: 4, flex: 3, textAlign: "center" }}>
                {t(`${Number(totalProbationOneHundredDayNotPassed) || 0}`)}
              </Sarabun>
              <Sarabun type="Body2" style={{ marginTop: 4, flex: 3, textAlign: "center" }}>
                {t("คน ")}
              </Sarabun>
            </div>
          </QuarterCard>
        </div>
      </div>
    </Card>
  )
}

export default CardProbation
