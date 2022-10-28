import styled from "@emotion/styled"
import { useFormState } from "react-final-form"
import KpiTransactionDetailsField from "../../../components/KpiTransactionDetailsField"
import { GRAYSCALE_DARKGRAY_40, PRIMARY_MAIN, WHITE } from "../../../constants/colors"
import { Dispatch, useCallback } from "react"
import Button from "../../../components/common/Button"
import Icon from "../../../components/common/Icon"
import { useTranslation } from "react-i18next"
import { CreateKpiState } from "../../../services/enum-typed"

const Body = styled.div`
  background-color: ${WHITE};
  padding: 8px;
  margin-top: 32px;
`

const Container = styled.div`
  background-color: ${WHITE};
  flex: 1;
  padding: 16px;
  align-self: stretch;
  border: 1px solid ${GRAYSCALE_DARKGRAY_40};
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`
const BottomCard = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
`
type FillDetailStateProps = {
  setCurrentState: Dispatch<React.SetStateAction<CreateKpiState>>
  unitOption?: BaseOptionType[]
  categoryOption?: BaseOptionType[]
}

const FillDetailState = (props: FillDetailStateProps) => {
  const { setCurrentState, unitOption, categoryOption } = props
  const { t } = useTranslation()
  const formState = useFormState()
  const { invalid } = formState

  const onClickChangeNextState = useCallback(() => {
    setCurrentState(CreateKpiState.CHOOSE_EMPLOYEES)
  }, [setCurrentState])

  return (
    <Body>
      <Container>
        <KpiTransactionDetailsField
          viewMode={false}
          viewModeEdit={false}
          optionsDropdownUnit={unitOption}
          optionsDropdownType={categoryOption}
          isShowBorder={false}
          isShowMiniKpiReportCard={false}
        />
      </Container>
      <BottomCard>
        <Button
          buttonType="contained"
          width={268}
          height={48}
          onClick={onClickChangeNextState}
          isDisabledButton={invalid}
          backgroundColor={PRIMARY_MAIN}
          endIcon={
            <Icon
              iconName="vector"
              width={7.5}
              height={15}
              stroke={WHITE}
              style={{ marginLeft: "16px" }}
            />
          }
        >
          {t(`ไปเลือกกลุ่มพนักงาน`)}
        </Button>
      </BottomCard>
    </Body>
  )
}

export default FillDetailState
