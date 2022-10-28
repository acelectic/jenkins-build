import { useState } from "react"
import styled from "styled-components/macro"
import Card from "../../../components/common/Card"
import TimePicker from "../../../components/common/TimePicker"
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

const ExampleTimePicker = () => {
  const [value, setValue] = useState<Dayjs | null>()
  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue)
  }
  return (
    <Card>
      <Kanit type="XsTitle">
        import TimePicker from "../../../components/common/TimePicker"
      </Kanit>
      <GridLayout>
        <TimePicker label="Time" value={value} onChange={handleChange} />
        <pre>{`      <TimePicker
        label="Time"
        name="TimePicker"
        value={value}
        onChange={handleChange}
      />`}</pre>
      </GridLayout>
    </Card>
  )
}

export default ExampleTimePicker
