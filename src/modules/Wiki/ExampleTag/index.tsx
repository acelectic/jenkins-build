import { Box, Divider as MuiDivider } from "@mui/material"
import { spacing } from "@mui/system"
import styled from "styled-components/macro"
import Card from "../../../components/common/Card"
import Kanit from "../../../components/common/Kanit"
import OldTag, { OldTagsType } from "../../../components/common/OldTag"
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
  margin-top: 10%;
`
const Divider = styled(MuiDivider)(spacing)

const ExampleTag = () => {
  return (
    <Card>
      <Kanit type="XsTitle">
        {`import Tag, {TagsType} from "../../../components/common/Tag"`}
      </Kanit>
      <br />
      <GridLayout>
        <BoxLayout>
          <OldTag text={"ใช้งาน"} type={OldTagsType.SUCCESS} />
        </BoxLayout>
        <pre>{`<Tag text={"ใช้งาน"} type={TagsType.SUCCESS} />`}</pre>
      </GridLayout>
      <Divider my={2} />
      <GridLayout>
        <BoxLayout>
          <OldTag text={"ผิดพลาด"} type={OldTagsType.ERROR} />
        </BoxLayout>
        <pre>{`<Tag text={"ผิดพลาด"} type={TagsType.ERROR} />`}</pre>
      </GridLayout>
      <Divider my={2} />
      <GridLayout>
        <BoxLayout>
          <OldTag text={"อนุมัติ"} type={OldTagsType.PERMISSION} />
        </BoxLayout>
        <pre>{`<Tag text={"อนุมัติ"} type={TagsType.PERMISSION} />`}</pre>
      </GridLayout>
    </Card>
  )
}

export default ExampleTag
