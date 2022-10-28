import Card from "../../../components/common/Card"
import { spacing } from "@mui/system"
import { Divider as MuiDivider } from "@mui/material"
import styled from "styled-components/macro"
import OldDatePicker from "../../../components/common/OldDatePicker"
import { useState } from "react"
import Kanit from "../../../components/common/Kanit"
import { mobile } from "../../../utils/responsive-helper"
import { Dayjs } from "dayjs"

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  margin-bottom: 10px;

  ${mobile} {
    grid-template-columns: auto;
  }
`
const Divider = styled(MuiDivider)(spacing)
const ExampleDatePicker = () => {
  const [value, setValue] = useState<Dayjs | null>(null)
  return (
    <Card>
      <Kanit type="XsTitle">
        import DatePicker from "../../../components/common/DatePicker"
      </Kanit>
      <Divider my={6} />
      <Kanit type="MSubtitle">Date Picker</Kanit>
      <GridLayout>
        <OldDatePicker
          value={value}
          onChange={(newvalue) => {
            setValue(newvalue)
          }}
        />
        <pre>{`<DatePicker value={value} onChange={(newvalue) => {setValue(newvalue)}} />`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">Date Picker Read-only</Kanit>
      <GridLayout>
        <OldDatePicker
          value={value}
          onChange={(newvalue) => {
            setValue(newvalue)
          }}
          readOnly
        />
        <pre>{`<DatePicker value={value} onChange={(newvalue) => {setValue(newvalue)}} readOnly />`}</pre>
      </GridLayout>
      <Divider my={6} />
    </Card>
  )
}

export default ExampleDatePicker
