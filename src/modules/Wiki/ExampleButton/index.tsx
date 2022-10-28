import Card from "../../../components/common/Card"
import OldButton from "../../../components/common/OldButton"
import { Divider as MuiDivider } from "@mui/material"
import { spacing } from "@mui/system"
import styled from "styled-components/macro"
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
const Divider = styled(MuiDivider)(spacing)
const ExampleButton = () => {
  return (
    <Card>
      <Kanit type="XsTitle">
        import Button from "../../../components/common/Button"
      </Kanit>
      <Divider my={6} />
      <Kanit type="MSubtitle">Text Button</Kanit>
      <GridLayout>
        <OldButton variant="text" textColor="black">
          ข้อความในปุ่ม
        </OldButton>
        <pre>{`<Button variant="text" textColor="black">ข้อความในปุ่ม</Button>`}</pre>
        <OldButton variant="text" textColor="Black" disabled>
          ข้อความในปุ่ม
        </OldButton>
        <pre>{`<Button variant="text" textColor="black" disabled>Disabled</Button>`}</pre>
        <OldButton
          variant="text"
          href="#text-buttons"
          textColor="#000000"
          textType="XsSubtitle"
        >
          Linkข้อความ
        </OldButton>
        <pre>{`<Button variant="text" href="#text-buttons" textColor="#000000" textType="XsSubtitle">Link</Button>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">Contained Button</Kanit>
      <GridLayout>
        <OldButton variant="contained">ข้อความในปุ่ม</OldButton>
        <pre>{`<Button variant="contained">ข้อความในปุ่ม</Button>`}</pre>
        <OldButton variant="contained" disabled>
          ข้อความในปุ่ม
        </OldButton>
        <pre>{`<Button variant="contained" disabled>Disabled</Button>`}</pre>
        <OldButton variant="contained" href="#contained-buttons">
          Linkข้อความ
        </OldButton>
        <pre>{`<Button variant="contained" href="#contained-buttons">Link</Button>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">Outlined Button</Kanit>
      <GridLayout>
        <OldButton variant="outlined" textColor="#000000">
          ข้อความในปุ่ม
        </OldButton>
        <pre>{`<Button variant="outlined" textColor="#000000">ข้อความในปุ่ม</Button>`}</pre>
        <OldButton variant="outlined" textColor="#000000" disabled>
          ข้อความในปุ่ม
        </OldButton>
        <pre>{`<Button variant="outlined" textColor="#000000" disabled>ข้อความในปุ่ม</Button>`}</pre>
        <OldButton variant="outlined" textColor="#000000" href="#outlined-buttons">
          Linkข้อความ
        </OldButton>
        <pre>{`<Button variant="outlined" textColor="#000000" href="#outlined-buttons">Link</Button>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">Color</Kanit>
      <GridLayout>
        <OldButton variant="text" textColor="#000000" color="primary">
          ข้อความในปุ่ม
        </OldButton>
        <pre>{`<Button variant="text" textColor="#000000" color="primary">ข้อความในปุ่ม</Button>`}</pre>
        <OldButton variant="text" textColor="#000000" color="secondary">
          ข้อความในปุ่ม
        </OldButton>
        <pre>{`<Button variant="text" textColor="#000000" color="secondary">ข้อความในปุ่ม</Button>`}</pre>
        <OldButton
          variant="contained"
          color="primary"
          textType="Paragraph"
          textColor="#00ff00"
        >
          ข้อความในปุ่ม
        </OldButton>
        <pre>{`<Button variant="contained" color="primary" textType="Paragraph" textColor="#00ff00">ข้อความในปุ่ม</Button>`}</pre>
        <OldButton variant="contained" color="secondary" textColor="white">
          ข้อความในปุ่ม
        </OldButton>
        <pre>{`<Button variant="contained" color="secondary" textColor="white">ข้อความในปุ่ม</Button>`}</pre>
        <OldButton variant="outlined" textColor="#000000" color="primary">
          ข้อความในปุ่ม
        </OldButton>
        <pre>{`<Button variant="outlined" textColor="#000000" color="primary">ข้อความในปุ่ม</Button>`}</pre>
        <OldButton variant="outlined" textColor="#000000" color="secondary">
          ข้อความในปุ่ม
        </OldButton>
        <pre>{`<Button variant="outlined" textColor="#000000" color="secondary">ข้อความในปุ่ม</Button>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">Size</Kanit>
      <GridLayout>
        <OldButton variant="text" textColor="#000000" size="small">
          ข้อความในปุ่ม
        </OldButton>
        <pre>{`<Button variant="text" textColor="#000000" size="small">ข้อความในปุ่ม</Button>`}</pre>
        <OldButton variant="text" textColor="#000000" size="medium">
          ข้อความในปุ่ม
        </OldButton>
        <pre>{`<Button variant="text" textColor="#000000" size="medium">ข้อความในปุ่ม</Button>`}</pre>
        <OldButton variant="text" textColor="#000000" size="large">
          ข้อความในปุ่ม
        </OldButton>
        <pre>{`<Button variant="text" textColor="#000000" size="large">ข้อความในปุ่ม</Button>`}</pre>
        <OldButton variant="contained" textColor="#000000" size="small">
          ข้อความในปุ่ม
        </OldButton>
        <pre>{`<Button variant="contained" textColor="#000000" size="small">ข้อความในปุ่ม</Button>`}</pre>
        <OldButton variant="contained" textColor="#000000" size="medium">
          ข้อความในปุ่ม
        </OldButton>
        <pre>{`<Button variant="contained" textColor="#000000" size="medium">ข้อความในปุ่ม</Button>`}</pre>
        <OldButton variant="contained" textColor="#000000" size="large">
          ข้อความในปุ่ม
        </OldButton>
        <pre>{`<Button variant="contained" textColor="#000000" size="large">ข้อความในปุ่ม</Button>`}</pre>
        <OldButton variant="outlined" textColor="#000000" size="small">
          ข้อความในปุ่ม
        </OldButton>
        <pre>{`<Button variant="outlined" textColor="#000000" size="small">ข้อความในปุ่ม</Button>`}</pre>
        <OldButton variant="outlined" textColor="#000000" size="medium">
          ข้อความในปุ่ม
        </OldButton>
        <pre>{`<Button variant="outlined" textColor="#000000" size="medium">ข้อความในปุ่ม</Button>`}</pre>
        <OldButton variant="outlined" textColor="#000000" size="large">
          ข้อความในปุ่ม
        </OldButton>
        <pre>{`<Button variant="outlined" textColor="#000000" size="large">ข้อความในปุ่ม</Button>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">Buttons with icon and label</Kanit>
      <GridLayout>
        <OldButton variant="contained" startIcon={<>icon</>}>
          ข้อความในปุ่ม
        </OldButton>
        <pre>{`<Button variant="contained" startIcon={<icon />}>ข้อความในปุ่ม</Button>`}</pre>
        <OldButton variant="outlined" textColor="#000000" endIcon={<>icon</>}>
          ข้อความในปุ่ม
        </OldButton>
        <pre>{`<Button variant="outlined" textColor="#000000" endIcon={<icon />}>ข้อความในปุ่ม</Button>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">Buttons New Normal With textColor</Kanit>
      <GridLayout>
        <OldButton variant="contained" color="primary" textColor="#e4a735">
          ข้อความในปุ่ม
        </OldButton>
        <pre>{`<Button variant="contained" color="primary" textColor="#444444">ข้อความในปุ่ม</Button>`}</pre>
        <OldButton variant="contained" color="secondary" textColor="#92c2e2">
          ข้อความในปุ่ม
        </OldButton>
        <pre>{`<Button variant="contained" color="secondary" textColor="#92c2e2">ข้อความในปุ่ม</Button>`}</pre>
      </GridLayout>
      <Kanit type="MSubtitle">Buttons New Normal With Standard textColor</Kanit>
      <GridLayout>
        <OldButton variant="outlined" color="primary" textColor="black">
          ข้อความในปุ่ม
        </OldButton>
        <pre>{`<Button variant="outlined" color="primary" textColor="black">ข้อความในปุ่ม</Button>`}</pre>
        <OldButton variant="contained" color="secondary" textColor="white">
          ข้อความในปุ่ม
        </OldButton>
        <pre>{`<Button variant="contained" color="secondary" textColor="white">ข้อความในปุ่ม</Button>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">Buttons New Normal With textType</Kanit>
      <GridLayout>
        <OldButton variant="contained" color="primary" textType="LTitle">
          ข้อความในปุ่ม
        </OldButton>
        <pre>{`<Button variant="contained" color="primary" textType="LTitle"">ข้อความในปุ่ม</Button>`}</pre>
      </GridLayout>
      <GridLayout>
        <OldButton variant="contained" color="secondary" textType="LSubtitle">
          ข้อความในปุ่ม
        </OldButton>
        <pre>{`<Button variant="contained" color="secondary" textType="LSubtitle"">ข้อความในปุ่ม</Button>`}</pre>
      </GridLayout>
      <GridLayout>
        <OldButton variant="contained" color="primary" textType="MTitle">
          ข้อความในปุ่ม
        </OldButton>
        <pre>{`<Button variant="contained" color="primary" textType="MTitle"">ข้อความในปุ่ม</Button>`}</pre>
      </GridLayout>
      <GridLayout>
        <OldButton variant="contained" color="secondary" textType="MSubtitle">
          ข้อความในปุ่ม
        </OldButton>
        <pre>{`<Button variant="contained" color="secondary" textType="MSubtitle"">ข้อความในปุ่ม</Button>`}</pre>
      </GridLayout>
      <GridLayout>
        <OldButton variant="contained" color="primary" textType="SmTitle">
          ข้อความในปุ่ม
        </OldButton>
        <pre>{`<Button variant="contained" color="primary" textType="SmTitle">ข้อความในปุ่ม</Button>`}</pre>
      </GridLayout>
      <GridLayout>
        <OldButton variant="contained" color="secondary" textType="XsTitle">
          ข้อความในปุ่ม
        </OldButton>
        <pre>{`<Button variant="contained" color="secondary" textType="XsTitle"">ข้อความในปุ่ม</Button>`}</pre>
      </GridLayout>
      <GridLayout>
        <OldButton variant="contained" color="primary" textType="XsSubtitle">
          ข้อความในปุ่ม
        </OldButton>
        <pre>{`<Button variant="contained" color="primary" textType="XsSubtitle"">ข้อความในปุ่ม</Button>`}</pre>
      </GridLayout>
      <GridLayout>
        <OldButton variant="contained" color="secondary" textType="Hint">
          ข้อความในปุ่ม
        </OldButton>
        <pre>{`<Button variant="contained" color="secondary" textType="Hint">ข้อความในปุ่ม</Button>`}</pre>
      </GridLayout>
      <Divider my={6} />
    </Card>
  )
}

export default ExampleButton
