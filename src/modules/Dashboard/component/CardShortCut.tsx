import styled from "@emotion/styled"
import { Box } from "@mui/material"
import { useCallback } from "react"
import { Sliders } from "react-feather"
import { useTranslation } from "react-i18next"
import { useHistory } from "react-router-dom"
import Authorize from "../../../components/Authorize"
import Card from "../../../components/common/Card"
import Icon from "../../../components/common/Icon"
import Sarabun from "../../../components/common/Sarabun"
import QuarterCardTitle from "../../../components/QuarterCardTitle"
import { BLACK, GRAYSCALE_DARKGRAY_40, PRIMARY_LIGHT, WHITE } from "../../../constants/colors"
import paths from "../../../constants/paths"
import { PERMISSIONS } from "../../../services/enum-typed"

const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  cursor: pointer;
`

const IconStyle = styled(Icon)`
  margin-top: 8px;
`

const VectorStyle = styled(Icon)`
  margin-left: 4px;
  margin-top: 4px;
`

const SarabunStyle = styled(Sarabun)`
  margin-top: 4px;
`

export type CardShortCutProps = {}

const CardShortCut = () => {
  const { t } = useTranslation()
  const history = useHistory()

  const onClickGoToAssessmentTemplate = useCallback(() => {
    history.push(paths.setForm())
  }, [history])

  const onClickGoToTemplate = useCallback(() => {
    history.push(paths.template())
  }, [history])

  const onClickGoToKpiLibrary = useCallback(() => {
    history.push(paths.kpiLibrary())
  }, [history])

  const onClickGoToManageGrade = useCallback(() => {
    history.push(paths.manageGrade())
  }, [history])

  const onClickGoToUser = useCallback(() => {
    history.push(paths.role())
  }, [history])

  return (
    <Card
      styleCard={{
        backgroundColor: PRIMARY_LIGHT,
        height: "100%",
      }}
      styleContent={{ display: "flex", justifyContent: "space-between" }}
    >
      <div>
        <QuarterCardTitle
          title={t(`สร้างและจัดการการประเมิน`)}
          leftIconName="clipboard"
          textColor={WHITE}
          typeText="Subtitle2"
        />
        <Authorize
          permissions={[
            PERMISSIONS.MANAGE_FORMS_KPI_READ,
            PERMISSIONS.MANAGE_FORMS_ONE_YEAR_READ,
            PERMISSIONS.MANAGE_FORMS_PROBATION_READ,
          ]}
        >
          <Card
            styleCard={{
              marginBottom: 16,
              marginTop: 16,
            }}
            styleContent={{ padding: 8 }}
          >
            <FlexCenter onClick={onClickGoToAssessmentTemplate}>
              <IconStyle
                iconName={"listPlusSidebar"}
                width={32}
                height={32}
                stroke={PRIMARY_LIGHT}
              />
              <Box width={16} />
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <SarabunStyle type="Subtitle2">{t("จัดการฟอร์ม")}</SarabunStyle>
                <VectorStyle iconName="vector" width={7.5} height={16} stroke={BLACK} />
              </div>
            </FlexCenter>
          </Card>
        </Authorize>
        <Authorize permissions={[PERMISSIONS.MANAGE_TEMPLATE_MANAGE_TEMPLATE_READ]}>
          <Card
            styleCard={{
              border: `1px solid ${GRAYSCALE_DARKGRAY_40}`,
              marginBottom: 16,
              marginTop: 16,
            }}
            styleContent={{ padding: 8 }}
          >
            <FlexCenter onClick={onClickGoToTemplate}>
              <Icon
                iconName={"appWindowSidebar"}
                style={{ marginTop: "8px" }}
                width={32}
                height={32}
                stroke={PRIMARY_LIGHT}
              />
              <Box width={16} />
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <SarabunStyle type="Subtitle2">{t("จัดการเทมเพลต")}</SarabunStyle>
                <VectorStyle iconName="vector" width={7.5} height={16} stroke={BLACK} />
              </div>
            </FlexCenter>
          </Card>
        </Authorize>
        <Authorize permissions={[PERMISSIONS.MANAGE_KPI_LIBRARY_MANAGE_KPI_LIBRARY_READ]}>
          <Card
            styleCard={{
              marginBottom: 16,
              marginTop: 16,
            }}
            styleContent={{ padding: 8 }}
          >
            <FlexCenter onClick={onClickGoToKpiLibrary}>
              <IconStyle
                iconName={"cardholderSidebar"}
                width={32}
                height={32}
                stroke={PRIMARY_LIGHT}
              />
              <Box width={16} />
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <SarabunStyle type="Subtitle2">{t("จัดการ KPI library")}</SarabunStyle>
                <VectorStyle iconName="vector" width={7.5} height={16} stroke={BLACK} />
              </div>
            </FlexCenter>
          </Card>
        </Authorize>
        <Authorize permissions={[PERMISSIONS.MANAGE_GRADE_MANAGE_GRADE_READ]}>
          <Card
            styleCard={{
              marginBottom: 16,
              marginTop: 16,
            }}
            styleContent={{ padding: 8 }}
          >
            <FlexCenter onClick={onClickGoToManageGrade}>
              <IconStyle iconName={"starSidebar"} width={32} height={32} stroke={PRIMARY_LIGHT} />
              <Box width={16} />
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <SarabunStyle type="Subtitle2">{t("กำหนดโควต้าเกรด")}</SarabunStyle>
                <VectorStyle iconName="vector" width={7.5} height={16} stroke={BLACK} />
              </div>
            </FlexCenter>
          </Card>
        </Authorize>
        <Authorize permissions={[PERMISSIONS.MANAGE_ROLE_MANAGE_ROLE_READ]}>
          <Card
            styleCard={{
              marginTop: 16,
            }}
            styleContent={{ padding: 8 }}
          >
            <FlexCenter onClick={onClickGoToUser}>
              {/* <IconStyle iconName={"filePlus"} width={32} height={32} /> */}
              <Sliders width={32} height={32} stroke={PRIMARY_LIGHT} style={{ marginTop: 8 }} />
              <Box width={16} />
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <SarabunStyle type="Subtitle2">{t("บทบาท")}</SarabunStyle>
                <VectorStyle iconName="vector" width={7.5} height={16} stroke={BLACK} />
              </div>
            </FlexCenter>
          </Card>
        </Authorize>
      </div>
    </Card>
  )
}

export default CardShortCut
