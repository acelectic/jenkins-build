import Card from "../../../components/common/Card"
import Header from "../../../components/common/Header"
import { Divider as MuiDivider } from "@mui/material"
import { spacing } from "@mui/system"
import styled from "styled-components/macro"
import Kanit from "../../../components/common/Kanit"

import { mobile } from "../../../utils/responsive-helper"

const GridLayout = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  ${mobile} {
    grid-template-columns: auto;
  }
`

const Divider = styled(MuiDivider)(spacing)

const ExampleHeader = () => {
  return (
    <Card>
      <Kanit type="XsTitle">
        import Header from "../../../components/common/Header"
      </Kanit>
      <GridLayout>
        <Header>ตัวอย่าง Header</Header>
        <pre>{`<Header>ตัวอย่าง Header</Header>`}</pre>
        <Header>ตัวอย่าง ข้อมูลทั่วไป</Header>
        <pre>{`<Header>ตัวอย่าง ข้อมูลทั่วไป</Header>`}</pre>
        <Header>ตัวอย่าง บทบาท</Header>
        <pre>{`<Header>ตัวอย่าง บทบาท</Header>`}</pre>
        <Header>ตัวอย่าง ผู้ใช้งาน</Header>
        <pre>{`<Header>ตัวอย่าง ผู้ใช้งาน</Header>`}</pre>
      </GridLayout>
      <Divider my={6} />
    </Card>
  )
}

export default ExampleHeader
