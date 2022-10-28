import { useEffect, useMemo, useState } from "react"
import styled from "@emotion/styled"
import { useRouter } from "../../../utils/helper"
import { useHistory } from "react-router-dom"
import { useSignIn } from "../../../services/auth/auth-query"
import paths from "../../../constants/paths"
import { FallBackComponent } from "../../../App"
// import Kanit from "../../../components/common/Kanit"
// import { Button } from "@mui/material"
import EkoOAuth from "../../../utils/eko-oauth"
import { config } from "../../../configs"
import UserNotFound from "../UserNotFound"

const Layout = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;

  grid-row-gap: 20px;
`
// const TextStyled = styled(Kanit)`
//   color: red;
// `

const OauthCallback = () => {
  const { query } = useRouter()
  const { code, state } = query || {}
  const history = useHistory()
  const { mutate: signIn, isLoading } = useSignIn()
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const isValidStateKey = EkoOAuth.checkStateCode(state)
    if (code && state && isValidStateKey) {
      signIn(
        { code },
        {
          onSuccess: (data) => {
            window.location.href = paths.dashboard()
          },
          onError: (err) => {
            setIsError(true)
            // history.replace(paths.userNotFound())
          },
        },
      )
    } else {
      if (!config.IS_LOCAL) {
        history.replace(paths.signIn())
      }
    }
  }, [code, state, history, signIn])

  const renderPage = useMemo(() => {
    if (isLoading) {
      return (
        <Layout>
          <FallBackComponent />
        </Layout>
      )
    } else {
      if (isError) {
        return <UserNotFound />
      } else {
        return <></>
      }
    }
  }, [isError, isLoading])

  return renderPage
}

export default OauthCallback
