import React from "react"
import styled, { withTheme, ThemeProps } from "styled-components/macro"

import { CardContent, Card as MuiCard, Typography, Theme } from "@mui/material"
import orange from "@mui/material/colors/orange"
import red from "@mui/material/colors/red"
import yellow from "@mui/material/colors/yellow"
import { spacing } from "@mui/system"

import { Polar } from "react-chartjs-2"

const Card = styled(MuiCard)(spacing)

const Spacer = styled.div(spacing)

const ChartWrapper = styled.div`
  height: 300px;
`

function PolarChart({ theme }: ThemeProps<Theme>) {
  const data = {
    labels: ["Speed", "Reliability", "Comfort", "Safety", "Efficiency"],
    datasets: [
      {
        label: "Model S",
        data: [35, 38, 65, 70, 24],
        backgroundColor: [
          theme.palette.secondary.main,
          yellow[700],
          orange[500],
          red[500],
          theme.palette.grey[300],
        ],
      },
    ],
  }

  const options = { maintainAspectRatio: false }

  return (
    <Card mb={1}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Polar Area Chart
        </Typography>
        <Typography variant="body2" gutterBottom>
          Polar area charts are similar to pie charts, but each segment has the
          same angle.
        </Typography>

        <Spacer mb={6} />

        <ChartWrapper>
          <Polar data={data} options={options} />
        </ChartWrapper>
      </CardContent>
    </Card>
  )
}

export default withTheme(PolarChart)
