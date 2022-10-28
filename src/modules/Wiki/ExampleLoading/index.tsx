import { Box } from "@mui/material"
import styled from "styled-components/macro"
import Card from "../../../components/common/Card"
import Kanit from "../../../components/common/Kanit"
import Loading from "../../../components/common/Loading"
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

const ExampleLoading = () => {
  return (
    <Card>
      <GridLayout>
        <BoxLayout>
          <Loading isLoading={true}>
            <Kanit type="MTitle">This is Content</Kanit>
          </Loading>
        </BoxLayout>
        <pre>{`
<Loading isLoading={true}>
  <Kanit type="MTitle">This is Content</Kanit>
</Loading>
        `}</pre>
      </GridLayout>
    </Card>
  )
}

export default ExampleLoading
