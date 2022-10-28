import styled from "styled-components/macro"
import Card from "../../../components/common/Card"
import { mobile } from "../../../utils/responsive-helper"
import { useSnackbar } from "../../../utils/custom-hook"
import OldButton from "../../../components/common/OldButton"
import { useCallback } from "react"

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: 20px;
  margin-bottom: 10px;

  ${mobile} {
    grid-template-columns: auto;
  }
`

const ExampleSnackbar = () => {
  const { snackbar } = useSnackbar()

  // "error" | "info" | "success" | "warning"
  const onSummonNormalSnackbar = useCallback(() => {
    snackbar({
      message: "Normal สแน็คบาร์",
      description: "normal สแน็คบาร์ is type info",
    })
  }, [snackbar])

  const onSummonInfoSnackbar = useCallback(() => {
    snackbar({
      type: "info",
      message: "Info สแน็คบาร์",
      description: "I'm so blue (สแน็คบาร์)",
    })
  }, [snackbar])

  const onSummonSuccessSnackbar = useCallback(() => {
    snackbar({
      type: "success",
      message: "Success สแน็คบาร์",
      description: "I'm so green (สแน็คบาร์)",
    })
  }, [snackbar])

  const onSummonWarningSnackbar = useCallback(() => {
    snackbar({
      type: "warning",
      message: "Warning สแน็คบาร์",
      description: "I'm so yellow (สแน็คบาร์)",
    })
  }, [snackbar])

  const onSummonErrorSnackbar = useCallback(() => {
    snackbar({
      type: "error",
      message: "Error สแน็คบาร์",
      description: "I'm so red (สแน็คบาร์)",
    })
  }, [snackbar])

  return (
    <Card>
      <GridLayout>
        <OldButton
          variant="outlined"
          textColor="#000"
          onClick={onSummonNormalSnackbar}
        >
          Normal Snackbar
        </OldButton>

        <OldButton
          variant="outlined"
          textColor="#000"
          onClick={onSummonInfoSnackbar}
        >
          Info Snackbar
        </OldButton>

        <OldButton
          variant="outlined"
          textColor="#000"
          onClick={onSummonSuccessSnackbar}
        >
          Success Snackbar
        </OldButton>

        <OldButton
          variant="outlined"
          textColor="#000"
          onClick={onSummonWarningSnackbar}
        >
          Warning Snackbar
        </OldButton>

        <OldButton
          variant="outlined"
          textColor="#000"
          onClick={onSummonErrorSnackbar}
        >
          Error Snackbar
        </OldButton>
      </GridLayout>
    </Card>
  )
}

export default ExampleSnackbar
