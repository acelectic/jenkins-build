import React from "react"
import styled, { withTheme, ThemeProps } from "styled-components/macro"

import { Helmet } from "react-helmet"

import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
  Theme,
} from "@mui/material"

import { green, red } from "@mui/material/colors"

import { spacing } from "@mui/system"

import Actions from "./Actions"
import BarChart from "./BarChart"
import DoughnutChart from "./DoughnutChart"
import LanguagesTable from "./LanguagesTable"
import Stats from "./Stats"
import TrafficTable from "./TrafficTable"
import WorldMap from "./WorldMap"

const Divider = styled(MuiDivider)(spacing)

const Typography = styled(MuiTypography)(spacing)

function Analytics({ theme }: ThemeProps<Theme>) {
  return (
    <>
      <Helmet title="Analytics Dashboard" />
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Analytics Dashboard
          </Typography>
          <Typography variant="subtitle1">
            Welcome back, Lucy! We've missed you.{" "}
            <span role="img" aria-label="Waving Hand Sign">
              👋
            </span>
          </Typography>
        </Grid>

        <Grid item>
          <Actions />
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} lg={5}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={12} md={6}>
              <Stats
                title="Visitors"
                amount="24.532"
                chip="Today"
                percentageText="+14%"
                percentagecolor={green[500]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Stats
                title="Activity"
                amount="63.200"
                chip="Annual"
                percentageText="-12%"
                percentagecolor={red[500]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Stats
                title="Real-Time"
                amount="1.320"
                chip="Monthly"
                percentageText="-18%"
                percentagecolor={red[500]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Stats
                title="Bounce"
                amount="12.364"
                chip="Yearly"
                percentageText="+27%"
                percentagecolor={green[500]}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={7}>
          <BarChart />
        </Grid>
      </Grid>

      <Grid container spacing={6}>
        <Grid item xs={12} lg={8}>
          <WorldMap />
        </Grid>
        <Grid item xs={12} lg={4}>
          <DoughnutChart />
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={4}>
          <LanguagesTable />
        </Grid>
        <Grid item xs={12} lg={8}>
          <TrafficTable />
        </Grid>
      </Grid>
    </>
  )
}

export default withTheme(Analytics)
