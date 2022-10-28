import { useCallback, useEffect, useMemo } from "react"
// import { useDispatch } from "react-redux"
// import { useHistory } from "react-router-dom"
import styled from "styled-components/macro"
// import { Link } from "react-router-dom"
// import { signIn } from "../../redux/actions/authActions"

import {
  // Avatar,
  // Checkbox,
  // FormControlLabel,
  Paper,
  // Typography,
} from "@mui/material"
import EkoOAuth from "../../utils/eko-oauth"
import { FallBackComponent } from "../../App"
import { useRouter } from "../../utils/helper"
import { useHistory } from "react-router-dom"
import paths from "../../constants/paths"
import { useCurrentUser } from "../../services/auth/auth-query"

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)}px;

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)}px;
  }
`

// const BigAvatar = styled(Avatar)`
//   width: 92px;
//   height: 92px;
//   text-align: center;
//   margin: 0 auto ${(props) => props.theme.spacing(5)}px;
// `

function SignIn() {
  const { query } = useRouter()
  const history = useHistory()
  // const dispatch = useDispatch()
  const { data: userData } = useCurrentUser({
    retry: 0,
  })

  const onEkoOAuthClick = useCallback(() => {
    EkoOAuth.signIn()
  }, [])

  const inDebugMode = useMemo(() => {
    return !!query.debug
  }, [query.debug])

  useEffect(() => {
    if (!inDebugMode) {
      onEkoOAuthClick()
    } else if (userData) {
      history.push(paths.dashboard())
    }
  }, [onEkoOAuthClick, inDebugMode, userData, history])

  return (
    <Wrapper>
      <FallBackComponent />
      {/* <Helmet title="Sign In" />
      <LogoImg src={CPAllLogo} alt="logo" />
      <Button
        fullWidth
        style={{ marginTop: 20 }}
        variant="contained"
        color="primary"
        onClick={onEkoOAuthClick}
      >
        SignIn Eko
      </Button> */}
    </Wrapper>
  )
}

export default SignIn
