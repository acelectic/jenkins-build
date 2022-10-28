import React from "react"
import { ThemeProps } from "styled-components/macro"
import { SpacingProps } from "@mui/system"
import { Theme } from "@mui/material"

export type GlobalStyleProps = {
  theme: ThemeProps<Theme> & { palette: any }
}

export interface MuiButtonSpacingType extends SpacingProps {
  component?: React.PropsWithoutRef<{}>
  to?: string
}

export interface MuiChipSpacingType extends SpacingProps {
  component?: React.PropsWithoutRef<{}>
  href?: string
  icon?: JSX.Element | null
}
