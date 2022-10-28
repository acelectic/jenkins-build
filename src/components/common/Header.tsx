import { TypographyProps, Divider as MuiDivider } from "@mui/material"
import { PropsWithChildren } from "react"
import Kanit from "./Kanit"
import { spacing } from "@mui/system"
import styled from "styled-components/macro"

const Divider = styled(MuiDivider)(spacing)
const HeaderDivider = styled(Divider)`
  border: 1px solid #2c3d92;
  background-color: #2c3d92;
  margin-top: 0px;
`

const Header = (props: PropsWithChildren<TypographyProps>) => {
  const { children } = props
  return (
    <div>
      <Kanit type="XsTitle" color="#2c3d92">
        {children}
      </Kanit>
      <HeaderDivider />
    </div>
  )
}

export default Header
