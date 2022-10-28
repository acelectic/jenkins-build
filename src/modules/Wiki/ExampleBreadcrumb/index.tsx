import Card from "../../../components/common/Card"
import Breadcrumb from "../../../components/common/Breadcrumb"
import { Divider as MuiDivider } from "@mui/material"
import { spacing } from "@mui/system"
import styled from "styled-components/macro"
import { useMemo } from "react"
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

const ExampleBreadcrumb = () => {
  const breadcrumbs = useMemo(() => {
    return [
      {
        pathName: "Wiki",
        pathTo: "/Wiki",
      },
      {
        pathName: "next Page",
        pathTo: "/Wiki",
      },
    ]
  }, [])

  return (
    <Card>
      <Kanit type="XsTitle">
        import Breadcrumb from "../../../components/common/Breadcrumb"
      </Kanit>
      <GridLayout>
        <Breadcrumb items={breadcrumbs} />
        <pre>{`
const breadcrumbs = useMemo(() => {
  return [
    {
      pathName: "Wiki",
      pathTo: "/Wiki",
    },
    {
      pathName: "next Page",
      pathTo: "/Wiki",
    },
  ]
}, [])
return(<Breadcrumb items={breadcrumbs} />)`}</pre>
      </GridLayout>
      <Divider my={6} />
    </Card>
  )
}

export default ExampleBreadcrumb
