import React from "react"
import styled from "styled-components/macro"

import {
  Box,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Chip as MuiChip,
  Typography as MuiTypography,
} from "@mui/material"

import { rgba } from "polished"

import { spacing } from "@mui/system"

const Card = styled(MuiCard)(spacing)

const Typography = styled(MuiTypography)(spacing)

const CardContent = styled(MuiCardContent)`
  position: relative;

  &:last-child {
    padding-bottom: ${(props) => props.theme.spacing(4)}px;
  }
`

const Chip = styled(MuiChip)`
  position: absolute;
  top: 16px;
  right: 16px;
  height: 20px;
  padding: 4px 0;
  font-size: 85%;
  background-color: ${(props) => props.theme.palette.secondary.main};
  color: ${(props) => props.theme.palette.common.white};
  margin-bottom: ${(props) => props.theme.spacing(4)}px;

  span {
    padding-left: ${(props) => props.theme.spacing(2)}px;
    padding-right: ${(props) => props.theme.spacing(2)}px;
  }
`

const Percentage = styled(MuiTypography)<{
  percentagecolor: string
  mb: number
}>`
  span {
    color: ${(props) => props.percentagecolor};
    font-weight: ${(props) => props.theme.typography.fontWeightBold};
    background: ${(props) => rgba(props.percentagecolor, 0.1)};
    padding: 2px;
    border-radius: 3px;
    margin-right: ${(props) => props.theme.spacing(2)}px;
  }
`

type StatsPropsType = {
  title: string
  amount: string
  chip: string
  percentageText: string
  percentagecolor: string
}

const Stats: React.FC<StatsPropsType> = ({
  title,
  amount,
  chip,
  percentageText,
  percentagecolor,
}) => {
  return (
    <Card mb={3}>
      <CardContent>
        <Typography variant="h6" mb={4}>
          {title}
        </Typography>
        <Typography variant="h3" mb={3}>
          <Box fontWeight="fontWeightRegular">{amount}</Box>
        </Typography>
        <Percentage
          variant="subtitle2"
          mb={4}
          color="textSecondary"
          percentagecolor={percentagecolor}
        >
          <span>{percentageText}</span> Since last week
        </Percentage>
        <Chip label={chip} />
      </CardContent>
    </Card>
  )
}

export default Stats
