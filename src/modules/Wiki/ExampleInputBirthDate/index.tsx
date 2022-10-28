import Card from "../../../components/common/Card"
import { Typography } from "@mui/material"
import styled from "styled-components/macro"
import InputBirthDate from "../../../components/common/InputBirthDate"
import { useState } from "react"
import { mobile } from "../../../utils/responsive-helper"

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  margin-bottom: 10px;

  ${mobile} {
    grid-template-columns: auto;
  }
`
const ExampleBirthDate = () => {
  const [value, setValue] = useState<Date | null>(null)
  return (
    <Card>
      <Typography variant="h3">Input BrithDate</Typography>
      <GridLayout>
        <InputBirthDate
          prevValue={"1"}
          value={value}
          onChange={(newvalue) => {
            setValue(newvalue)
          }}
          onBlur={() => {}}
        />
      </GridLayout>
    </Card>
  )
}

export default ExampleBirthDate
