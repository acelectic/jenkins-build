import styled from "@emotion/styled"
import { useTranslation } from "react-i18next"
import Icon from "../../../components/common/Icon"
import Sarabun from "../../../components/common/Sarabun"
import State from "../../../components/common/State"
import { SECONDARY_LIGHT, WHITE } from "../../../constants/colors"
import { CalibrationSettingState, StateComponentType } from "../../../services/enum-typed"

const SarabunGoBack = styled(Sarabun)({
  marginBottom: 24,
})

const GoToPrevious = styled.div({
  display: "flex",
  cursor: "pointer",
})

type IHeaderCalibrateCardProps = {
  onClickBack: () => void
  calibrationSettingState: CalibrationSettingState
}

const HeaderCalibrateCard = (props: IHeaderCalibrateCardProps) => {
  const { calibrationSettingState: calibrationState, onClickBack } = props

  const { t } = useTranslation()

  return (
    <>
      <GoToPrevious onClick={onClickBack}>
        <Icon
          iconName="caretLeftSecondaryRightBlue"
          width={16}
          height={16}
          style={{ marginRight: 8 }}
        />
        <SarabunGoBack type="Subtitle2" color={SECONDARY_LIGHT}>
          {t("ย้อนกลับ")}
        </SarabunGoBack>
      </GoToPrevious>
      <Sarabun type="H2" color="WHITE" style={{ marginBottom: 24 }}>
        {t("วงปรับเทียบผลงาน (Calibration)")}
      </Sarabun>
      <State
        stateComponentType={StateComponentType.MANAGE_CALIBRATION}
        currentState={calibrationState}
        style={{
          backgroundColor: WHITE,
        }}
      />
    </>
  )
}

export default HeaderCalibrateCard
