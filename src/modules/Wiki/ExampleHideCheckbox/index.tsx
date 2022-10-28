import Card from "../../../components/common/Card"
import Header from "../../../components/common/Header"
import { Divider as MuiDivider, Button } from "@mui/material"
import { spacing } from "@mui/system"
import styled from "styled-components/macro"
import CircleCheckbox from "../../../components/common/Checkbox"
import Kanit from "../../../components/common/Kanit"
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
const Divider = styled(MuiDivider)(spacing)

const ExampleHideCheckbox = () => {
  const [showDetail, setShowDetail] = useState(false)

  return (
    <Card>
      <Kanit type="XsTitle">
        import CircleCheckbox from "../../../components/common/Checkbox"
      </Kanit>
      <GridLayout>
        <Card>
          <CircleCheckbox
            label={"Press Here"}
            checked={showDetail}
            onChange={() => {
              setShowDetail(!showDetail)
            }}
            color="primary"
          ></CircleCheckbox>
          {showDetail && (
            <Card>
              <Header>ตัวอย่าง ที่ถูกซ้อน</Header>
              <Button variant="contained">ตัวอย่าง ปุ่มที่ถูกซ้อน</Button>
              <Kanit type="XsCardTitle">ตัวอย่าง ข้อความที่ถูกซ้อน</Kanit>
            </Card>
          )}
        </Card>
        <pre>{`<Card>
      <Typography variant="h4">Hide with Checkbox</Typography>
      <GridLayout>
        <Card>
          <CircleCheckbox
            label={"Press it to show"}
            checked={showDetail}
            onChange={() => {
              setShowDetail(!showDetail)
            }}
            color="primary"
          ></CircleCheckbox>
          {showDetail && (
            <>
              /* Command Here */
              <Header>ตัวอย่าง ที่ถูกซ้อน</Header>
              <Button variant="contained">ตัวอย่าง ปุ่มที่ถูกซ้อน</Button>
              <Text type="XsCardTitle">ตัวอย่าง ข้อความที่ถูกซ้อน</Text>
            </>
          )}
        </Card>`}</pre>
      </GridLayout>
      <Divider my={6} />
    </Card>
  )
}

export default ExampleHideCheckbox
