import Card from "../../../components/common/Card"
import Kanit from "../../../components/common/Kanit"
import { Divider as MuiDivider } from "@mui/material"
import { spacing } from "@mui/system"
import styled from "styled-components/macro"
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
    <Card disabled>
      <Kanit type="XsTitle">
        import Kanit from "../../../components/common/Kanit"
      </Kanit>
      <Divider my={6} />
      <Kanit type="MSubtitle">L Title</Kanit>
      <GridLayout>
        <Kanit type="LTitle">{`กรอกข้อความ`}</Kanit>
        <pre>{` <Text type="LTitle">{กรอกข้อความ}</Text>`}</pre>
        <Kanit type="LTitle">{`Text Here`}</Kanit>
        <pre>{` <Text type="LTitle">{Text Here}</Text>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">L Subtitle</Kanit>
      <GridLayout>
        <Kanit type="LSubtitle">{`กรอกข้อความ`}</Kanit>
        <pre>{` <Text type="LSubtitle">{กรอกข้อความ}</Text>`}</pre>
        <Kanit type="LSubtitle">{`Text Here`}</Kanit>
        <pre>{` <Text type="LSubtitle">{Text Here}</Text>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">M Title</Kanit>
      <GridLayout>
        <Kanit type="MTitle">{`กรอกข้อความ`}</Kanit>
        <pre>{` <Text type="MTitle">{กรอกข้อความ}</Text>`}</pre>
        <Kanit type="MTitle">{`Text Here`}</Kanit>
        <pre>{` <Text type="MTitle">{Text Here}</Text>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">M Subtitle</Kanit>
      <GridLayout>
        <Kanit type="MSubtitle">{`กรอกข้อความ`}</Kanit>
        <pre>{` <Text type="MSubtitle">{กรอกข้อความ}</Text>`}</pre>
        <Kanit type="MSubtitle">{`Text Here`}</Kanit>
        <pre>{` <Text type="MSubtitle">{Text Here}</Text>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">Sm Title</Kanit>
      <GridLayout>
        <Kanit type="SmTitle">{`กรอกข้อความ`}</Kanit>
        <pre>{` <Text type="SmTitle">{กรอกข้อความ}</Text>`}</pre>
        <Kanit type="SmTitle">{`Text Here`}</Kanit>
        <pre>{` <Text type="SmTitle">{Text Here}</Text>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">Sm Subtitle</Kanit>
      <GridLayout>
        <Kanit type="SmSubtitle">{`กรอกข้อความ`}</Kanit>
        <pre>{` <Text type="SmSubtitle">{กรอกข้อความ}</Text>`}</pre>
        <Kanit type="SmSubtitle">{`Text Here`}</Kanit>
        <pre>{` <Text type="SmSubtitle">{Text Here}</Text>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">Xs Title</Kanit>
      <GridLayout>
        <Kanit type="XsTitle">{`กรอกข้อความ`}</Kanit>
        <pre>{` <Text type="XsTitle">{กรอกข้อความ}</Text>`}</pre>
        <Kanit type="XsTitle">{`Text Here`}</Kanit>
        <pre>{` <Text type="XsTitle">{Text Here}</Text>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">Xs CardTitle</Kanit>
      <GridLayout>
        <Kanit type="XsCardTitle">{`กรอกข้อความ`}</Kanit>
        <pre>{` <Text type="XsCardTitle">{กรอกข้อความ}</Text>`}</pre>
        <Kanit type="XsCardTitle">{`Text Here`}</Kanit>
        <pre>{` <Text type="XsCardTitle">{Text Here}</Text>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">Xs Subtitle</Kanit>
      <GridLayout>
        <Kanit type="XsSubtitle">{`กรอกข้อความ`}</Kanit>
        <pre>{` <Text type="XsSubtitle">{กรอกข้อความ}</Text>`}</pre>
        <Kanit type="XsSubtitle">{`Text Here`}</Kanit>
        <pre>{` <Text type="XsSubtitle">{Text Here}</Text>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">Xs Header</Kanit>
      <GridLayout>
        <Kanit type="XsHeader">{`กรอกข้อความ`}</Kanit>
        <pre>{` <Text type="XsHeader">{กรอกข้อความ}</Text>`}</pre>
        <Kanit type="XsHeader">{`Text Here`}</Kanit>
        <pre>{` <Text type="XsHeader">{Text Here}</Text>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">Paragraph Bold</Kanit>
      <GridLayout>
        <Kanit type="ParagraphBold">{`กรอกข้อความ`}</Kanit>
        <pre>{` <Text type="ParagraphBold">{กรอกข้อความ}</Text>`}</pre>
        <Kanit type="ParagraphBold">{`Text Here`}</Kanit>
        <pre>{` <Text type="ParagraphBold">{Text Here}</Text>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">Paragraph</Kanit>
      <GridLayout>
        <Kanit type="Paragraph">{`กรอกข้อความ`}</Kanit>
        <pre>{` <Text type="Paragraph">{กรอกข้อความ}</Text>`}</pre>
        <Kanit type="Paragraph">{`Text Here`}</Kanit>
        <pre>{` <Text type="Paragraph">{Text Here}</Text>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">Placeholder</Kanit>
      <GridLayout>
        <Kanit type="Placeholder">{`กรอกข้อความ`}</Kanit>
        <pre>{` <Text type="Placeholder">{กรอกข้อความ}</Text>`}</pre>
        <Kanit type="Placeholder">{`Text Here`}</Kanit>
        <pre>{` <Text type="Placeholder">{Text Here}</Text>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">Hint Bold</Kanit>
      <GridLayout>
        <Kanit type="HintBold">{`กรอกข้อความ`}</Kanit>
        <pre>{` <Text type="HintBold">{กรอกข้อความ}</Text>`}</pre>
        <Kanit type="HintBold">{`Text Here`}</Kanit>
        <pre>{` <Text type="HintBold">{Text Here}</Text>`}</pre>
      </GridLayout>
      <Divider my={6} />
      <Kanit type="MSubtitle">Hint</Kanit>
      <GridLayout>
        <Kanit type="Hint">{`กรอกข้อความ`}</Kanit>
        <pre>{` <Text type="Hint">{กรอกข้อความ}</Text>`}</pre>
        <Kanit type="Hint">{`Text Here`}</Kanit>
        <pre>{` <Text type="Hint">{Text Here}</Text>`}</pre>
      </GridLayout>
      <Divider my={6} />
    </Card>
  )
}

export default ExampleKanit
