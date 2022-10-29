import { useTranslation } from "react-i18next"
import Card from "../../../components/common/Card"
import Sarabun from "../../../components/common/Sarabun"
import QuarterCardTitle from "../../../components/QuarterCardTitle"
import { BLACK, GRAYSCALE_DARKGRAY_40, PRIMARY_LIGHT, WHITE } from "../../../constants/colors"
import styled from "@emotion/styled"
import Authorize from "../../../components/Authorize"
import { PERMISSIONS } from "../../../services/enum-typed"
import DownloadItem from "./DownloadItem"

const QuarterNameStyled = styled.div`
  display: flex;
  background: ${PRIMARY_LIGHT};
  border-radius: 4px;
  padding: 4px 8px;
  margin: 16px 0px;
`

export type ICardDownloadProps = {}

const CardDownload = () => {
  const { t } = useTranslation()

  return (
    <Card
      styleCard={{
        border: `1px solid ${GRAYSCALE_DARKGRAY_40}`,
        maxWidth: 296,
        borderRadius: 8,
      }}
      styleContent={{ padding: 16 }}
    >
      <Authorize permissions={[PERMISSIONS.REPORT_REPORT_REPORT]}>
        <QuarterCardTitle
          title={t(`ดาวน์โหลดรายงานการประเมิน`)}
          leftIconName="downloadFile"
          textColor={BLACK}
          typeText="Subtitle2"
        />
      </Authorize>
      <QuarterNameStyled>
        <Sarabun color={WHITE} type="H4">
          {t(` 2022/Q2`)}
        </Sarabun>
      </QuarterNameStyled>
      <DownloadItem fileName={"รายงานสถานการณ์การประเมินประจำไตรมาส"} onClick={() => {}} />
      <DownloadItem
        fileName={"รายงานโควต้าการตัดเกรดการประเมินประจำไตรมาสแยกตามหน่วยงาน"}
        onClick={() => {}}
      />
    </Card>
  )
}

export default CardDownload
