import { useState } from "react"
import styled from "styled-components/macro"
import Card from "../../../components/common/Card"
import Select from "../../../components/common/Select"
import Kanit from "../../../components/common/Kanit"
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

const ExampleSelect = () => {
  const selectOption = [
    { label: "ตัวเลิอก 1", value: 1 },
    { label: "ตัวเลิอก 2", value: 2 },
    { label: "ตัวเลิอก 3", value: 3 },
  ]
  const [selectValue, setSelectValue] = useState("")
  return (
    <Card>
      <Kanit type="XsTitle">
        import Select from "../../../components/common/Select"
      </Kanit>
      <GridLayout>
        <Select
          label="รูปแบบ"
          options={selectOption}
          onChange={(e: any) => {
            setSelectValue(e.target.value)
          }}
          value={selectValue}
        />
        <pre>
          {`        <Select
          label="รูปแบบ"
          options={selectOption}
          onChange={(e: any) => {
            setSelectValue(e.target.value)
          }}
          value={selectValue}
        />
          `}
        </pre>
      </GridLayout>
    </Card>
  )
}

export default ExampleSelect
