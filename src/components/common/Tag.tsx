import styled from "@emotion/styled"
import { Chip, ChipProps } from "@mui/material"
import { CSSProperties, useMemo } from "react"
import { SECONDARY_MAIN, WHITE } from "../../constants/colors"

import Sarabun from "./Sarabun"

export enum TagsType {}

const CustomChip = styled(Chip)`
  height: 24px;
`

type TagProps = {
  text: string
  type?: TagsType
  style?: CSSProperties
  className?: string
  fontSize?: number
  weight?: number
  lineHeight?: number
  fontColor?: string
  startIcon?: React.ReactNode
} & ChipProps

const Tag = (props: TagProps) => {
  const {
    text,
    type,
    style,
    className,
    weight = 600,
    fontSize = 8,
    lineHeight,
    fontColor = WHITE,
    startIcon,
    ...restProps
  } = props
  const checkTagType = useMemo(() => {
    switch (type) {
      default:
        return (
          <CustomChip
            className={className}
            style={{ backgroundColor: `${SECONDARY_MAIN}`, ...style }}
            label={
              <div style={{ display: "flex", alignItems: "center" }}>
                {startIcon}
                <Sarabun
                  size={fontSize}
                  weight={weight}
                  color={fontColor}
                  style={{ lineHeight: `${lineHeight}` }}
                >
                  {text}
                </Sarabun>
              </div>
            }
            {...restProps}
          />
        )
    }
  }, [
    className,
    fontColor,
    fontSize,
    lineHeight,
    restProps,
    startIcon,
    style,
    text,
    type,
    weight,
  ])
  return <>{checkTagType}</>
}

export default Tag
