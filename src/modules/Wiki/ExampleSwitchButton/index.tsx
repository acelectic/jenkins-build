import { Box, Divider as MuiDivider } from "@mui/material"
import { spacing } from "@mui/system"
import { useState } from "react"
import styled from "styled-components/macro"
import Card from "../../../components/common/Card"
import Kanit from "../../../components/common/Kanit"
import SwitchButton from "../../../components/common/SwitchButton"
import ToggleButtonDefault from "../../../components/common/ToggleButtonDefault"
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
const BoxLayout = styled(Box)`
  margin-top: 25%;
`
const Divider = styled(MuiDivider)(spacing)
const ExampleSwitchButton = () => {
  const [value, setValue] = useState("ใช้งาน")
  const [checked, setChecked] = useState(false)

  const handleChange = (newAlignment: string) => {
    setValue(newAlignment)
  }

  const toggleButton = () => {
    setChecked(!checked)
  }
  return (
    <Card>
      <Kanit type="XsTitle">
        import ToggleButtonDefault from
        "../../../components/common/ToggleButtonDefault"
      </Kanit>
      <br />
      <GridLayout>
        <BoxLayout>
          <ToggleButtonDefault value="default" onClick={toggleButton}>
            Default
          </ToggleButtonDefault>
        </BoxLayout>
        <pre>{`          <ToggleButtonDefault value="default" onClick={toggleButton}>
            Default
          </ToggleButtonDefault>`}</pre>
      </GridLayout>
      <Divider my={2} />
      <Kanit type="XsTitle">
        import SwitchButton from "../../../components/common/SwitchButton"
      </Kanit>
      <br />
      <GridLayout>
        <BoxLayout>
          <SwitchButton
            value={value}
            onChange={handleChange}
            options={["ใช้งาน", "ไม่ใช้งาน"]}
          />
        </BoxLayout>
        <pre>{`          <SwitchButton
            value={value}
            onChange={handleChange}
            options={["ใช้งาน", "ไม่ใช้งาน"]}
          />`}</pre>
      </GridLayout>
    </Card>
  )
}

export default ExampleSwitchButton
