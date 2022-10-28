import { Box, Divider as MuiDivider } from "@mui/material"
import { spacing } from "@mui/system"
import { useState } from "react"

import styled from "styled-components/macro"
import Card from "../../../components/common/Card"
import Kanit from "../../../components/common/Kanit"
import ToggleButton from "../../../components/common/ToggleButton"
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
  margin-top: 50%;
`
const Divider = styled(MuiDivider)(spacing)

const ExampleToggleButton = () => {
  const [checked, setChecked] = useState(false)
  const toggleButton = () => {
    setChecked(!checked)
  }
  return (
    <Card>
      <Kanit type="XsTitle">
        import ToggleButton from "../../../components/common/ToggleButton"
      </Kanit>
      <br />
      <GridLayout>
        <BoxLayout>
          <ToggleButton isSelected={true} value={true} name="checked">
            ดู
          </ToggleButton>
        </BoxLayout>
        <pre>{`
           <ToggleButton isSelected={true} value="checked" name="checked">
            ดู
          </ToggleButton>`}</pre>
      </GridLayout>
      <Divider my={2} />
      <GridLayout>
        <BoxLayout>
          <ToggleButton isSelected={false} value={false} name="unchecked">
            เพิ่ม
          </ToggleButton>
        </BoxLayout>
        <pre>{`
          <ToggleButton isSelected={false} value="unchecked" name="unchecked">
            เพิ่ม
          </ToggleButton>`}</pre>
      </GridLayout>
      <Divider my={2} />
      <GridLayout>
        <BoxLayout>
          <ToggleButton
            isSelected={checked}
            value={checked}
            name={"toggleButton"}
            onClick={toggleButton}
          >
            อนุมัติ
          </ToggleButton>
        </BoxLayout>
        <pre>{`
          <ToggleButton
            isSelected={checked}
            value="toggleButton"
            name={"toggleButton"}
            onClick={toggleButton}
          >
            อนุมัติ
          </ToggleButton> `}</pre>
      </GridLayout>
    </Card>
  )
}

export default ExampleToggleButton
