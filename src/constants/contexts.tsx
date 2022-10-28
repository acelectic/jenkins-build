import { AppSnackbarProps } from "../components/AppSnackBar"
import { createCtx } from "../utils/helper"

const AppSnackbarOption: AppSnackbarProps = {
  visible: false,
  message: "",
  description: "",
  type: "info",
}

export const AppCtx = createCtx({
  appSnackbar: AppSnackbarOption,
})
