import Card from "../../../components/common/Card"
import OldSarabun from "../../../components/common/OldSarabun"
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

const ExampleKanit = () => {
  return (
    <Card>
      <Kanit type="XsTitle">
        import Sarabun from "../../../components/common/Sarabun"
      </Kanit>
      <Divider my={6} />
      <Kanit type="MSubtitle">L Title</Kanit>
      <GridLayout>
        <OldSarabun type="LTitle">{`กรอกข้อความ`}</OldSarabun>
        <pre>{` <Text type="LTitle">{กรอกข้อความ}</Text>`}</pre>
        <OldSarabun type="LTitle">{`Text Here`}</OldSarabun>
        <pre>{` <Text type="LTitle">{Text Here}</Text>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">L Subtitle</Kanit>
      <GridLayout>
        <OldSarabun type="LSubtitle">{`กรอกข้อความ`}</OldSarabun>
        <pre>{` <Text type="LSubtitle">{กรอกข้อความ}</Text>`}</pre>
        <OldSarabun type="LSubtitle">{`Text Here`}</OldSarabun>
        <pre>{` <Text type="LSubtitle">{Text Here}</Text>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">M Title</Kanit>
      <GridLayout>
        <OldSarabun type="MTitle">{`กรอกข้อความ`}</OldSarabun>
        <pre>{` <Text type="MTitle">{กรอกข้อความ}</Text>`}</pre>
        <OldSarabun type="MTitle">{`Text Here`}</OldSarabun>
        <pre>{` <Text type="MTitle">{Text Here}</Text>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">M Subtitle</Kanit>
      <GridLayout>
        <OldSarabun type="MSubtitle">{`กรอกข้อความ`}</OldSarabun>
        <pre>{` <Text type="MSubtitle">{กรอกข้อความ}</Text>`}</pre>
        <OldSarabun type="MSubtitle">{`Text Here`}</OldSarabun>
        <pre>{` <Text type="MSubtitle">{Text Here}</Text>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">Sm Title</Kanit>
      <GridLayout>
        <OldSarabun type="SmTitle">{`กรอกข้อความ`}</OldSarabun>
        <pre>{` <Text type="SmTitle">{กรอกข้อความ}</Text>`}</pre>
        <OldSarabun type="SmTitle">{`Text Here`}</OldSarabun>
        <pre>{` <Text type="SmTitle">{Text Here}</Text>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">Sm Subtitle</Kanit>
      <GridLayout>
        <OldSarabun type="SmSubtitle">{`กรอกข้อความ`}</OldSarabun>
        <pre>{` <Text type="SmSubtitle">{กรอกข้อความ}</Text>`}</pre>
        <OldSarabun type="SmSubtitle">{`Text Here`}</OldSarabun>
        <pre>{` <Text type="SmSubtitle">{Text Here}</Text>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">Xs Title</Kanit>
      <GridLayout>
        <OldSarabun type="XsTitle">{`กรอกข้อความ`}</OldSarabun>
        <pre>{` <Text type="XsTitle">{กรอกข้อความ}</Text>`}</pre>
        <OldSarabun type="XsTitle">{`Text Here`}</OldSarabun>
        <pre>{` <Text type="XsTitle">{Text Here}</Text>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">Xs CardTitle</Kanit>
      <GridLayout>
        <OldSarabun type="XsCardTitle">{`กรอกข้อความ`}</OldSarabun>
        <pre>{` <Text type="XsCardTitle">{กรอกข้อความ}</Text>`}</pre>
        <OldSarabun type="XsCardTitle">{`Text Here`}</OldSarabun>
        <pre>{` <Text type="XsCardTitle">{Text Here}</Text>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">Xs Subtitle</Kanit>
      <GridLayout>
        <OldSarabun type="XsSubtitle">{`กรอกข้อความ`}</OldSarabun>
        <pre>{` <Text type="XsSubtitle">{กรอกข้อความ}</Text>`}</pre>
        <OldSarabun type="XsSubtitle">{`Text Here`}</OldSarabun>
        <pre>{` <Text type="XsSubtitle">{Text Here}</Text>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">Xs Header</Kanit>
      <GridLayout>
        <OldSarabun type="XsHeader">{`กรอกข้อความ`}</OldSarabun>
        <pre>{` <Text type="XsHeader">{กรอกข้อความ}</Text>`}</pre>
        <OldSarabun type="XsHeader">{`Text Here`}</OldSarabun>
        <pre>{` <Text type="XsHeader">{Text Here}</Text>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">Paragraph Bold</Kanit>
      <GridLayout>
        <OldSarabun type="ParagraphBold">{`กรอกข้อความ`}</OldSarabun>
        <pre>{` <Text type="ParagraphBold">{กรอกข้อความ}</Text>`}</pre>
        <OldSarabun type="ParagraphBold">{`Text Here`}</OldSarabun>
        <pre>{` <Text type="ParagraphBold">{Text Here}</Text>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">Paragraph</Kanit>
      <GridLayout>
        <OldSarabun type="Paragraph">{`กรอกข้อความ`}</OldSarabun>
        <pre>{` <Text type="Paragraph">{กรอกข้อความ}</Text>`}</pre>
        <OldSarabun type="Paragraph">{`Text Here`}</OldSarabun>
        <pre>{` <Text type="Paragraph">{Text Here}</Text>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">Placeholder</Kanit>
      <GridLayout>
        <OldSarabun type="Placeholder">{`กรอกข้อความ`}</OldSarabun>
        <pre>{` <Text type="Placeholder">{กรอกข้อความ}</Text>`}</pre>
        <OldSarabun type="Placeholder">{`Text Here`}</OldSarabun>
        <pre>{` <Text type="Placeholder">{Text Here}</Text>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">Hint Bold</Kanit>
      <GridLayout>
        <OldSarabun type="HintBold">{`กรอกข้อความ`}</OldSarabun>
        <pre>{` <Text type="HintBold">{กรอกข้อความ}</Text>`}</pre>
        <OldSarabun type="HintBold">{`Text Here`}</OldSarabun>
        <pre>{` <Text type="HintBold">{Text Here}</Text>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">Hint</Kanit>
      <GridLayout>
        <OldSarabun type="Hint">{`กรอกข้อความ`}</OldSarabun>
        <pre>{` <Text type="Hint">{กรอกข้อความ}</Text>`}</pre>
        <OldSarabun type="Hint">{`Text Here`}</OldSarabun>
        <pre>{` <Text type="Hint">{Text Here}</Text>`}</pre>
      </GridLayout>
      <Divider my={6} />
    </Card>
  )
}

export default ExampleKanit
