import React from "react"
import styled from "styled-components/macro"

import { Alert as MuiAlert } from "@mui/lab"
import Default from "../dashboards/Default"
import { spacing } from "@mui/system"

const Alert = styled(MuiAlert)(spacing)

function ProtectedPage() {
  return (
    <>
      <Alert mb={4} severity="info">
        This page is only visible by authenticated users.
      </Alert>

      <Default />
    </>
  )
}

export default ProtectedPage
