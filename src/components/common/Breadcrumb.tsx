import { Breadcrumbs as MuiBreadcrumbs, Link } from "@mui/material"
import { NavLink } from "react-router-dom"
import styled from "styled-components/macro"
import Kanit from "./Kanit"
import { spacing } from "@mui/system"

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing)
const CustomStyleBreadcrumbs = styled(Breadcrumbs)`
  .MuiTypography-colorPrimary {
    color: rgba(0, 0, 0, 0.54);
  }
  li > p {
    color: rgba(0, 0, 0, 0.87);
  }
`

type BreadcrumbProps = {
  items: { pathName: string; pathTo: string }[]
}

const Breadcrumb = (props: BreadcrumbProps) => {
  const { items } = props
  return (
    <CustomStyleBreadcrumbs aria-label="Breadcrumb" mt={2}>
      {items.map((value, index) => {
        const { pathName: name, pathTo } = value
        if (index === items.length - 1) {
          return (
            <Kanit type="Paragraph" key={name}>
              {name}
            </Kanit>
          )
        } else {
          return (
            <Link key={name} component={NavLink} exact to={pathTo}>
              {name}
            </Link>
          )
        }
      })}
    </CustomStyleBreadcrumbs>
  )
}

export default Breadcrumb
