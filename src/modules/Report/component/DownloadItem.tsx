import { useTranslation } from "react-i18next"
import Card from "../../../components/common/Card"
import Icon from "../../../components/common/Icon"
import Sarabun from "../../../components/common/Sarabun"
import { BLACK, GRAYSCALE_DARKGRAY_40 } from "../../../constants/colors"
import styled from "@emotion/styled"

const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`

const CursorAndFlex = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const VectorStyle = styled(Icon)`
  min-width: 16px;
  min-height: 16px;
`

const IconStyle = styled(Icon)`
  min-width: 32px;
  min-height: 32px;
  padding-right: 8px;
`

const SarabunStyle = styled(Sarabun)`
  margin-right: 16px;
`

export type DownloadItemProps = {
  fileName: string
  onClick: () => void
}

const DownloadItem = (props: DownloadItemProps) => {
  const { fileName, onClick } = props
  const { t } = useTranslation()

  return (
    <Card
      styleCard={{
        border: `1px solid ${GRAYSCALE_DARKGRAY_40}`,
        marginBottom: 8,
        borderRadius: 8,
      }}
      styleContent={{ padding: 8 }}
      onClick={onClick}
    >
      <FlexCenter>
        <IconStyle iconName={"filePlus"} />
        <CursorAndFlex>
          <SarabunStyle type="Subtitle2">{t(fileName)}</SarabunStyle>
          <VectorStyle iconName="vector" width={16} height={16} stroke={BLACK} />
        </CursorAndFlex>
      </FlexCenter>
    </Card>
  )
}

export default DownloadItem
