import styled from "styled-components/macro"
import Card from "../../../components/common/Card"
import PageTitle from "../../../components/common/PageTitle"
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

const ExamplePageTitle = () => {
  return (
    <Card>
      <GridLayout>
        <PageTitle>รูปแบบของ PageTitle</PageTitle>
        <pre>{`<PageTitle>รูปแบบของ PageTitle</PageTitle>`}</pre>
      </GridLayout>
    </Card>
  )
}

export default ExamplePageTitle
