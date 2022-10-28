import React from "react"
import styled from "styled-components/macro"

import { Helmet } from "react-helmet"

import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@mui/material"

import { spacing } from "@mui/system"

import { green, red } from "@mui/material/colors"

import Actions from "./Actions"
import BarChart from "./BarChart"
import DoughnutChart from "./DoughnutChart"
import USAMap from "./USAMap"
import Stats from "./Stats"
import Table from "./Table"

const Divider = styled(MuiDivider)(spacing)

const Typography = styled(MuiTypography)(spacing)

function SaaS() {
  return (
    <>
      <Helmet title="SaaS Dashboard" />
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            SaaS Dashboard
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
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Income"
            amount="$37.500"
            chip="Monthly"
            percentageText="+14%"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Visitors"
            amount="150.121"
            chip="Annual"
            percentageText="-12%"
            percentagecolor={red[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Completed Orders"
            amount="12.432"
            chip="Weekly"
            percentageText="+24%"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Pending Orders"
            amount="22"
            chip="Weekly"
            percentageText="-6%"
            percentagecolor={red[500]}
          />
        </Grid>
      </Grid>

      <Grid container spacing={6}>
        <Grid item xs={12} lg={5}>
          <USAMap />
        </Grid>
        <Grid item xs={12} lg={7}>
          <BarChart />
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={4}>
          <DoughnutChart />
        </Grid>
        <Grid item xs={12} lg={8}>
          <Table />
        </Grid>
      </Grid>
    </>
  )
}

export default SaaS
