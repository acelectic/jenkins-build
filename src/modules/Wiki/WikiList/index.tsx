import PageTitle from "../../../components/common/PageTitle"
import styled from "styled-components/macro"

import ExampleAutoComplete from "../ExampleAutoComplete"
import ExampleBreadcrumb from "../ExampleBreadcrumb"
import ExampleButton from "../ExampleButton"
import ExampleCard from "../ExampleCard"
import ExampleModal from "../ExampleModal"
import ExamplePageTitle from "../ExamplePageTitle"
import ExampleSelect from "../ExampleSelect"
import ExampleTag from "../ExampleTag"
import ExampleTimePicker from "../ExampleTimePicker"
import ExampleToggleButton from "../ExampleToggleButton"
import ExampleTable from "../ExampleTable"
import ExampleSwitchButton from "../ExampleSwitchButton"
import ExampleCheckbox from "../ExampleCheckbox"
import ExampleDatePicker from "../ExampleDatePicker"
import ExampleHeader from "../ExampleHeader"
import ExampleHideCheckbox from "../ExampleHideCheckbox"
import ExampleInput from "../ExampleInput"
import ExampleKanit from "../ExampleKanit"
import ExampleSarabun from "../ExampleSarabun"
import ExampleColorTheme from "../ExampleColorTheme"
import ExampleIconButton from "../ExampleIconButton"
import ExampleLoading from "../ExampleLoading"
import ExampleForm from "../ExampleForm"
import ExampleResponsiveHelper from "../ExampleResponsiveHelper"
import ExampleApi from "../ExampleApi"
import ExampleSnackbar from "../ExampleSnackbar"
import { Box, Accordion, AccordionSummary, AccordionDetails } from "@mui/material"
import Kanit from "../../../components/common/Kanit"
import { ExpandMore } from "@mui/icons-material"
import { useTranslation } from "react-i18next"
import ExampleCheckAndConfirm from "../ExampleCheckAndConfirm"
import ExampleIconComponent from "../ExampleIcon"
import ExampleListUser from "../ExampleListUser"
import ExampleSetScoreLevel from "../ExampleSetScoreLevel"
import ExampleModalCopyForm from "../ExampleModalCopyForm"
import ExampleSelectGroupEmp from "../ExampleSelectGroupEmp/ExampleSelectGroupEmp"
import ExampleFrontEndComponent from "../ExampleFrontEndComponent"
import ReportGraph from "../../../components/common/ReportGraph"

import ExampleModalSelectEmployees from "../ExampleModalSelectEmployees"
import ExampleInfiniteScoller from "../ExampInfiniteScoller"

const CardLayout = styled(Box)`
  margin-top: 10px;
  margin-bottom: 10px;
`

type WikiAccordionSummaryType = {
  title?: string
  children: React.ReactChild
}

const WikiAccordion = (props: WikiAccordionSummaryType) => {
  const { title, children } = props
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Kanit type="SmTitle">{title}</Kanit>
      </AccordionSummary>
      <AccordionDetails style={{ display: "grid" }}>
        <CardLayout>{children}</CardLayout>
      </AccordionDetails>
    </Accordion>
  )
}

const WikiList = () => {
  const { t } = useTranslation()

  return (
    <Box>
      <PageTitle>{t("wiki.title")}</PageTitle>
      <WikiAccordion title="API Client">
        <ExampleApi />
      </WikiAccordion>
      <WikiAccordion title="AutoComplete">
        <ExampleAutoComplete />
      </WikiAccordion>
      <WikiAccordion title="Breadcrumb">
        <ExampleBreadcrumb />
      </WikiAccordion>
      <WikiAccordion title="Button">
        <ExampleButton />
      </WikiAccordion>
      <WikiAccordion title="Card">
        <ExampleCard />
      </WikiAccordion>
      <WikiAccordion title="Check and Confirm">
        <ExampleCheckAndConfirm />
      </WikiAccordion>
      <WikiAccordion title="Checkbox">
        <ExampleCheckbox />
      </WikiAccordion>
      <WikiAccordion title="Checkbox (Hide)">
        <ExampleHideCheckbox />
      </WikiAccordion>
      <WikiAccordion title="Color Theme">
        <ExampleColorTheme />
      </WikiAccordion>
      <WikiAccordion title="Component From Front-End">
        <ExampleFrontEndComponent />
      </WikiAccordion>
      <WikiAccordion title="DatePicker">
        <ExampleDatePicker />
      </WikiAccordion>
      <WikiAccordion title="Form Field">
        <ExampleForm />
      </WikiAccordion>
      <WikiAccordion title="Header">
        <ExampleHeader />
      </WikiAccordion>
      <WikiAccordion title="Icon">
        <ExampleIconComponent />
      </WikiAccordion>
      <WikiAccordion title="IconButton">
        <ExampleIconButton />
      </WikiAccordion>
      <WikiAccordion title="Input">
        <ExampleInput />
      </WikiAccordion>
      <WikiAccordion title="Kanit">
        <ExampleKanit />
      </WikiAccordion>
      <WikiAccordion title="Loading">
        <ExampleLoading />
      </WikiAccordion>
      <WikiAccordion title="Modal">
        <ExampleModal />
      </WikiAccordion>
      <WikiAccordion title="PageTitle">
        <ExamplePageTitle />
      </WikiAccordion>
      <WikiAccordion title="Responsive Helper">
        <ExampleResponsiveHelper />
      </WikiAccordion>
      <WikiAccordion title="Sarabun">
        <ExampleSarabun />
      </WikiAccordion>
      <WikiAccordion title="Select">
        <ExampleSelect />
      </WikiAccordion>
      <WikiAccordion title="Snackbar">
        <ExampleSnackbar />
      </WikiAccordion>
      <WikiAccordion title="SwitchButton">
        <ExampleSwitchButton />
      </WikiAccordion>
      <WikiAccordion title="TimePicker">
        <ExampleTimePicker />
      </WikiAccordion>
      <WikiAccordion title="Tag">
        <ExampleTag />
      </WikiAccordion>
      <WikiAccordion title="ToggleButton">
        <ExampleToggleButton />
      </WikiAccordion>
      <WikiAccordion title="Table">
        <ExampleTable />
      </WikiAccordion>
      <WikiAccordion title="ListUsers">
        <ExampleListUser />
      </WikiAccordion>
      <WikiAccordion title="SetScoreLevel">
        <ExampleSetScoreLevel />
      </WikiAccordion>
      <WikiAccordion title="CopyForm">
        <ExampleModalCopyForm />
      </WikiAccordion>
      <WikiAccordion title="SelectGroupEmployee">
        <ExampleSelectGroupEmp />
      </WikiAccordion>
      <WikiAccordion title="ExampleModalSelectEmployees">
        <ExampleModalSelectEmployees />
      </WikiAccordion>
      <WikiAccordion title="DashboardReportGraph">
        <div style={{ width: "714px" }}>
          <ReportGraph
            quarters={[
              {
                name: "1",
                datasets: [100, 200, 150, 400, 800, 400],
                color: "red",
              },
              {
                name: "2",
                datasets: [134, 230, 155, 450, 840, 450],
                color: "green",
              },
              {
                name: "3",
                datasets: [154, 250, 154, 460, 860, 470],
                color: "blue",
              },
            ]}
          />
        </div>
      </WikiAccordion>
      <WikiAccordion title="ExampleInfinite">
        <ExampleInfiniteScoller />
      </WikiAccordion>
    </Box>
  )
}

export default WikiList
