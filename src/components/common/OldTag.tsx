import { Chip, ChipProps } from "@mui/material"
import { useMemo } from "react"
import styled from "styled-components/macro"
import Kanit from "./Kanit"

export enum OldTagsType {
  SUCCESS = "success",
  ERROR = "error",
  PERMISSION = "permission",
}

const TagsSuccess = styled(Chip)`
  background-color: #ebfaf1;
  color: #2ecc71;
  height: 24px;
  font-size: 13px;
  font-weight: 400;
  line-height: 19px;
  border-radius: 15px;
  .MuiChip-label {
    overflow: unset;
    text-overflow: unset;
  }
`
const TagsDanger = styled(Chip)`
  background-color: rgba(224, 37, 95, 0.1);
  color: #e0255f;

  height: 24px;
  font-size: 13px;
  font-weight: 400;
  line-height: 19px;
  border-radius: 15px;
  .MuiChip-label {
    overflow: unset;
    text-overflow: unset;
  }
`
const TagsPermission = styled(Chip)`
  background-color: #eaecf4;
  color: #2c3d92;

  height: 24px;
  min-width: 75px;
  font-size: 13px;
  font-weight: 400;
  line-height: 19px;
  border-radius: 15px;
  .MuiChip-label {
    overflow: unset;
    text-overflow: unset;
  }
`

type TagProps = {
  text: string
  type?: OldTagsType
} & ChipProps

const OldTag = (props: TagProps) => {
  const { text, type, ...restProps } = props
  const checkTagType = useMemo(() => {
    switch (type) {
      case OldTagsType.SUCCESS:
        return (
          <TagsSuccess
            label={
              <Kanit type="XsHeader" color="#2ecc71">
                {text}
              </Kanit>
            }
            {...restProps}
          />
        )
      case OldTagsType.ERROR:
        return (
          <TagsDanger
            label={
              <Kanit type="XsHeader" color="#e0255f">
                {text}
              </Kanit>
            }
            {...restProps}
          />
        )
      case OldTagsType.PERMISSION:
        return (
          <TagsPermission
            label={
              <Kanit type="XsHeader" color="#2c3d92">
                {text}
              </Kanit>
            }
            {...restProps}
          />
        )
    }
  }, [restProps, text, type])
  return <div>{checkTagType}</div>
}

export default OldTag
