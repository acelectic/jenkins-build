import { TypographyProps } from "@mui/material"
import Kanit from "./Kanit"
import { PropsWithChildren } from "react"
import { WHITE } from "../../constants/colors"

const PageTitle = (props: PropsWithChildren<TypographyProps>) => {
  const { children } = props
  return (
    <Kanit type="MTitle" style={{ color: WHITE }}>
      {children}
    </Kanit>
  )
}

export default PageTitle
