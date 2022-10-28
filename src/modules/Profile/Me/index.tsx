import styled from "@emotion/styled"
import dayjs from "dayjs"
import { pascalize } from "humps"
import { pick } from "lodash"
import { FallBackComponent } from "../../../App"
import Kanit from "../../../components/common/Kanit"
import { useCurrentUser } from "../../../services/auth/auth-query"

const Layout = styled.div`
  margin: auto;
  display: flex;
  flex-flow: column;
  grid-row-gap: 10px;
  background-color: white;
  padding: 20px;
  border-radius: 16px;
`

const OauthInfoLayout = styled.div`
  margin-top: 20px;
  display: flex;
  flex-flow: column;
  grid-row-gap: 10px;
  padding: 20px;
`

const TextStyled = styled(Kanit)``
const TextSpanStyled = styled.span``

const TextPreStyled = styled.pre`
  text-align: left;
`

const Me = () => {
  const { data: userData, isLoading: isUserLoading } = useCurrentUser()

  return isUserLoading ? (
    <FallBackComponent />
  ) : (
    <Layout>
      <TextStyled style={{ fontWeight: "bold" }}>{userData?.user.employeeId}</TextStyled>
      {Object.entries(
        pick(userData?.user || {}, [
          "employeeId",
          "suffix",
          "firstName",
          "lastName",
          "employeeType",
          "grade",
          "hireDate",
          "resignationDate",
          "status",
        ]),
      ).map(([k, v]) => {
        return (
          <TextSpanStyled key={`${k}-${v}`} style={{ fontWeight: "bold" }}>
            {`${pascalize(`${k}`)}: `}
            <TextSpanStyled style={{ fontWeight: "normal" }}>{`${
              dayjs(`${v}`).isValid() ? dayjs(`${v}`).format("DD/MM/YYYY") : v || "-"
            }`}</TextSpanStyled>
          </TextSpanStyled>
        )
      })}
      {userData?.oauthUserInfo && (
        <OauthInfoLayout>
          <TextPreStyled>{JSON.stringify(userData?.oauthUserInfo, null, 2)}</TextPreStyled>
        </OauthInfoLayout>
      )}
    </Layout>
  )
}

export default Me
