import { Box, Divider as MuiDivider } from "@mui/material"
import { spacing } from "@mui/system"
import styled from "styled-components/macro"
import Card from "../../../components/common/Card"
import Kanit from "../../../components/common/Kanit"
import {
  mobile,
  tablet,
  desktop,
  useScreen,
  breakpoints,
} from "../../../utils/responsive-helper"

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: auto;
  height: 200px;
  width: 100%;
`
const BoxLayout = styled(Box)`
  background-color: #000000;
  flex: 1;

  ${desktop} {
    background-color: #ff0000;
  }

  ${tablet} {
    background-color: #00ff00;
  }

  ${mobile} {
    background-color: #0000ff;
  }
`

const BreakPointDiv = styled.div`
  background-color: #ff0000;

  ${breakpoints.down("sm")} {
    background-color: #0000ff;
  }
`
const Divider = styled(MuiDivider)(spacing)

const ExampleResponsiveHelper = () => {
  const { isMobile, isTablet, isDesktop } = useScreen()

  return (
    <Card>
      <pre>{`
import {
  mobile,
  tablet,
  desktop,
  useScreen,
  breakpoints,
} from "../../../utils/responsive-helper"
`}</pre>
      <br />
      <GridLayout>
        <Kanit type="XsTitle">
          {`Responsive ตามอุปกรณ์ (mobile, tablet, desktop, ipadPro)`}
        </Kanit>
        <Kanit type="SmSubtitle">
          {`กล่องด้านล่างจะเปลี่ยนสีไปตามอุปกรณ์ที่แสดงผล ท่านี้สามารถใช้ร่วมกับ Style Component ได้เลย`}
        </Kanit>
        <pre>{`
const BoxLayout = styled(Box)'
  background-color: #000000;
  flex: 1;
  $.{desktop} {
    background-color: #ff0000;
  }
  $.{tablet} {
    background-color: #00ff00;
  }
  $.{mobile} {
    background-color: #0000ff;
  }
'
<BoxLayout />
* หมายเหตุ กรุณานำ . ที่อยู่ระหว่าง $.{desktop} ออกก่อนใช้งาน
      `}</pre>
      </GridLayout>
      <GridLayout>
        <BoxLayout />
      </GridLayout>

      <Divider my={2} />
      <GridLayout>
        <Kanit type="XsTitle">{`Responsive ตามอุปกรณ์โดยใช้ Hooks`}</Kanit>
        <Kanit type="SmSubtitle">{`ท่านี้ใช้บ่อยตอนทำ inline style`}</Kanit>
        <pre>{`
const { isMobile, isTablet, isDesktop } = useScreen()

<div style={{ backgroundColor: isMobile ? "#0000ff" : "#ff0000" }} />
{isTablet && <Kanit>ข้อความนี้จะปรากฎเมื่อดูด้วย Tablet</Kanit>}
{isDesktop && (
  <Kanit>ฮ่าๆๆๆ เอ็งกำลังใช้ desktop ดูข้อความนี้อยู่ใช่มั้ย</Kanit>
)}
      `}</pre>
      </GridLayout>
      <GridLayout>
        <div style={{ backgroundColor: isMobile ? "#0000ff" : "#ff0000" }} />
        {isTablet && (
          <Kanit>ข้อความนี้จะปรากฎเมื่อดูด้วย Tablet หรือเล็กกว่า</Kanit>
        )}
        {isDesktop && (
          <Kanit>ฮ่าๆๆๆ เอ็งกำลังใช้ desktop ดูข้อความนี้อยู่ใช่มั้ย</Kanit>
        )}
      </GridLayout>

      <Divider my={2} />
      <GridLayout>
        <Kanit type="XsTitle">{`Responsive โดยใช้ breakpoints`}</Kanit>
        <Kanit type="SmSubtitle">{`ท่านี้ใช้เวลาไม่ได้กำหนดขนาดชัดเจน รู้แต่จุดตัด (breakpoints)`}</Kanit>
        <Kanit type="SmSubtitle">{`รู้แต่จุดตัดประกอบด้วย xs,sm, md, ml, lg, xl,`}</Kanit>
        <pre>{`
const BreakPointDiv = styled.div'
  background-color: #ff0000;

  $.{breakpoints.down("sm")} {
    background-color: #0000ff;
  }
'

<BreakPointDiv />
* หมายเหตุ กรุณานำ . ที่อยู่ระหว่าง $.{desktop} ออกก่อนใช้งาน
'
      `}</pre>
      </GridLayout>

      <GridLayout>
        <BreakPointDiv />
      </GridLayout>
    </Card>
  )
}

export default ExampleResponsiveHelper
