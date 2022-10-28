import styled from "@emotion/styled"
import AvatarImage from "../../../assets/images/profile-circle.svg"
import { Box } from "@mui/material"
import Sarabun from "../../../components/common/Sarabun"
import { User } from "../../../services/entity-typed"

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  border: 0px solid black;
  min-height: 80px;
  min-width: 220px;
`
const AvatarImg = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 18px;
`
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const ProfileCell = ({ value }: { value: User }) => {
  return (
    <Container>
      <AvatarImg src={AvatarImage} alt="avatar" />
      <TextContainer>
        <Sarabun type="Subtitle1">{`${value.firstName ?? "-"} ${
          value.lastName ?? "-"
        }`}</Sarabun>
        <Sarabun type="Caption">{`EID: ${value.employeeId ?? "-"}`}</Sarabun>
        <Box height={5} />
        <Sarabun type="Body2">{`${value.positionName ?? "-"}`}</Sarabun>
      </TextContainer>
    </Container>
  )
}

export default ProfileCell
