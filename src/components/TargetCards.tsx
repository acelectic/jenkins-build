import styled from "@emotion/styled"
import { Box } from "@mui/material"

import Sarabun from "./common/Sarabun"

import { InputField } from "./fields"

import { DropdownField } from "./fields"
import { ERROR, GRAYSCALE_DARKGRAY_40, SECONDARY_BG } from "../constants/colors"
import Icon from "./common/Icon"
import { normalizeNumber } from "../utils/helper"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"

const Body = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  border: 1px solid ${GRAYSCALE_DARKGRAY_40};
  border-radius: 8px;
  width: 100%;
  justify-content: space-between;
`

const Column = styled.div<{
  color?: string
  width?: number
}>`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 8px;
  flex: none;
  align-self: stretch;
  background-color: ${({ color }) => color};
  width: ${({ width }) => `${width}px`};
  min-width: 230px;
`

const Template = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 8px;
  align-self: stretch;
  justify-content: center;
`

const Detail = styled.div`
  display: flex;
  flex-direction: row;
`

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  min-height: 56px;
  min-width: 56px;
  max-height: 56px;
  max-width: 56px;
  border-radius: 50%;
  background: #edf6ff;
  align-items: center;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
`

enum EnumKpiType {
  KPI = "kpi",
  COMPANY = "company",
  OTHER = "other",
  BEHAVIOR = "behavior",
}

type ITargetCardsProps = {
  types: "kpi" | "company" | "behavior" | "other"
  dropDownFieldName: string
  InputFieldName: string
  dropDownOptions: BaseOptionType[]
}
const TargetCards = (props: ITargetCardsProps) => {
  const { InputFieldName, dropDownFieldName, types, dropDownOptions } = props
  const { t } = useTranslation()

  const targetName = useMemo(() => {
    return types === EnumKpiType.KPI
      ? t("เป้าหมาย KPI")
      : types === EnumKpiType.COMPANY
      ? t("เป้าหมายองค์กร")
      : types === EnumKpiType.OTHER
      ? t("เป้าหมายอื่น ๆ")
      : t("แบบประเมินพฤติกรรม")
  }, [t, types])

  const captionName = useMemo(() => {
    return types === EnumKpiType.KPI
      ? t(`เทมเพลตแบบประเมิน KPI`)
      : types === EnumKpiType.COMPANY
      ? t(`เทมเพลตแบบประเมินองค์กร`)
      : types === EnumKpiType.OTHER
      ? t(`เทมเพลตแบบประเมินอื่น ๆ`)
      : t(`เทมเพลตแบบประเมินพฤติกรรม`)
  }, [t, types])

  return (
    <Body>
      <Column>
        <IconBox>
          <Icon iconName="graduationCap" height={28} width={28} />
        </IconBox>
        <Sarabun type="Subtitle1">{targetName}</Sarabun>
      </Column>
      <Detail>
        <Column width={447}>
          <Template>
            <Row>
              <Sarabun type="Caption" weight={600}>
                {captionName}
              </Sarabun>
              <Sarabun type="Caption" weight={600} color={ERROR}>
                {"*"}
              </Sarabun>
            </Row>
            <DropdownField
              name={dropDownFieldName}
              options={dropDownOptions || []}
              onChange={() => {}}
              style={{ width: "100%" }}
              placeHolder={t(`เลือก${captionName}`)}
            />
          </Template>
        </Column>
        <Column color={SECONDARY_BG} width={200}>
          <Template>
            <Row>
              <Sarabun type="Caption" weight={600}>
                {"เปอร์เซ็นต์ของการประเมิน"}
              </Sarabun>
              <Sarabun type="Caption" weight={600} color={ERROR}>
                {"*"}
              </Sarabun>
            </Row>
            <InputField
              name={InputFieldName}
              placeholder={t(`ใส่จำนวน`)}
              endUnit
              unitText={"%"}
              parse={normalizeNumber}
            />
          </Template>
        </Column>
        <Box minWidth={106} width={106} />
      </Detail>
    </Body>
  )
}

export default TargetCards
