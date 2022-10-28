import { Box, BoxProps } from "@mui/material"
import styled from "styled-components/macro"

const BoxLayout = styled(Box)`
  margin-bottom: 12px;
`

const TitleLayout = (props: BoxProps) => {
  const { children, ...restProps } = props
  return <BoxLayout {...restProps}>{children}</BoxLayout>
}

export default TitleLayout
