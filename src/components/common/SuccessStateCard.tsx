import styled from "@emotion/styled"
import { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useHistory } from "react-router-dom"
import { PRIMARY_MAIN } from "../../constants/colors"
import paths from "../../constants/paths"
import Button from "./Button"
import Icon from "./Icon"
import Sarabun from "./Sarabun"

const SuccessDiv = styled.div<{ marginBottom: string }>`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: ${({ marginBottom }) => marginBottom};
  width: 100%;
`

const Center = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`
type SuccessStateCardProps = {
  title: string
  titleColor?: string
  detail?: string
  detailColor?: string
  isShowButton?: boolean
  marginBottom?: number
}

const SuccessStateCard = (props: SuccessStateCardProps) => {
  const {
    title,
    detail,
    titleColor,
    detailColor,
    isShowButton = true,
    marginBottom = 64,
  } = props
  const { t } = useTranslation()
  const history = useHistory()
  const onClickButton = useCallback(() => {
    history.push(paths.template())
  }, [history])

  return (
    <SuccessDiv marginBottom={`${marginBottom}px`}>
      <Center>
        <Icon iconName="done" width={320} height={240} />
      </Center>
      <Sarabun type="H3" style={{ marginBottom: "24px" }} color={titleColor}>
        {title}
      </Sarabun>
      <Sarabun type="H6" style={{ marginBottom: "16px" }} color={detailColor}>
        {detail}
      </Sarabun>
      {/*//TODO plug ปุ่ม ให้กดย้อนไปหน้า dashboard*/}
      {isShowButton && (
        <Center>
          <Button
            startIcon={<Icon iconName="squaresFour" width={24} height={24} />}
            width={230}
            height={56}
            backgroundColor={`${PRIMARY_MAIN}`}
            onClick={onClickButton}
          >
            {t(`กลับหน้าแดชบอร์ด`)}
          </Button>
        </Center>
      )}
    </SuccessDiv>
  )
}

export default SuccessStateCard
