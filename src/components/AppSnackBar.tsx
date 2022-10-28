// import IconButton from "@mui/material/IconButton"
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar"
// import { CloseIcon } from "@material-ui/data-grid"
import { useContext } from "react"
import MuiAlert from "@mui/lab/Alert"
import { AppCtx } from "../constants/contexts"
import Kanit from "../components/common/Kanit"
import OldSarabun from "./common/OldSarabun"

export type AppSnackbarProps = {
  visible: boolean
  message?: string
  description?: string
  type?: "error" | "info" | "success" | "warning"
}

export const AppSnackbar = () => {
  const [state, setState, { initialValue }] = useContext(AppCtx)

  const handleClose = (event: React.SyntheticEvent<any> | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return
    }

    setState({
      appSnackbar: initialValue.appSnackbar,
    })
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={state.appSnackbar.visible}
      autoHideDuration={1500}
      onClose={handleClose}
    >
      <MuiAlert onClose={handleClose} severity={state.appSnackbar.type} variant="standard">
        <Kanit type="XsTitle">{state.appSnackbar.message}</Kanit>
        <OldSarabun type="Placeholder" color="#8C8D8D">
          {state.appSnackbar.description}
        </OldSarabun>
      </MuiAlert>
    </Snackbar>
  )
}
