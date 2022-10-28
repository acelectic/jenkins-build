import styled from "@emotion/styled"
import { useMemo } from "react"
import AvatarImage from "../../../assets/images/profile-circle.svg"
import Sarabun from "../../../components/common/Sarabun"

const Body = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  width: 370px;
  background: #c4c4c4;
  gap: 8px;
  padding: 2px 4px;
  align-items: center;
`
const AvatarImg = styled.img`
  width: 34px;
  height: 34px;
`

type UserCardProps = {
  picture?: string
  name: string
  eId: string
}

const UserCard = (props: UserCardProps) => {
  const { picture = AvatarImage, name, eId } = props

  const userDetail = useMemo(() => {
    return `${name} (EID: ${eId})`
  }, [eId, name])

  return (
    <Body>
      <AvatarImg src={picture} alt="avatar" />
      <Sarabun size={14} weight={700}>
        {userDetail}
      </Sarabun>
    </Body>
  )
}

export default UserCard
