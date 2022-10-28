import styled from "@emotion/styled"
import { styled as materialStyled, useTheme } from "@mui/material/styles"
import OldButton from "../../../components/common/OldButton"
import OldSarabun from "../../../components/common/OldSarabun"
import { Divider } from "@mui/material"
import { mobile } from "../../../utils/responsive-helper"
import Card from "../../../components/common/Card"
import { withTheme } from "@mui/styles"

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  margin-bottom: 10px;

  ${mobile} {
    grid-template-columns: auto;
  }
`

const DumbDiv = styled.div`
  width: 100px;
  height: 50px;
  display: flex;
  align-items: center;
`

const StyledButton = materialStyled(withTheme(OldButton))((props) => ({
  background: props.theme.palette.success.main,
}))

const ExampleColorTheme = () => {
  const theme = useTheme()
  return (
    <Card>
      <pre>{`
const DumbDiv = styled.div'
  width: 100px;
  height: 50px;
  display: flex;
  align-items: center;
'

const theme = useTheme()
`}</pre>
      <Divider />

      <GridLayout>
        <DumbDiv style={{ backgroundColor: theme.palette.primary.main }}>
          <OldSarabun color={theme.palette.primary.contrastText}>
            Primary
          </OldSarabun>
        </DumbDiv>
        <pre>{`
        <DumbDiv style={{ backgroundColor: theme.palette.primary.main }}>
          <Sarabun color={theme.palette.primary.contrastText}>Primary</Sarabun>
        </DumbDiv>
        `}</pre>
      </GridLayout>

      <Divider />

      <GridLayout>
        <DumbDiv style={{ backgroundColor: theme.palette.secondary.main }}>
          <OldSarabun color={theme.palette.secondary.contrastText}>
            Secondary
          </OldSarabun>
        </DumbDiv>
        <pre>{`
        <DumbDiv style={{ backgroundColor: theme.palette.secondary.main }}>
          <Sarabun color={theme.palette.secondary.contrastText}>
            Secondary
          </Sarabun>
        </DumbDiv>
        `}</pre>
      </GridLayout>
      <Divider />

      <GridLayout>
        <DumbDiv style={{ backgroundColor: theme.palette.success.main }}>
          <OldSarabun color={theme.palette.success.contrastText}>
            Success
          </OldSarabun>
        </DumbDiv>
        <pre>{`
        <DumbDiv style={{ backgroundColor: theme.palette.success.main }}>
          <Sarabun color={theme.palette.success.contrastText}>Success</Sarabun>
        </DumbDiv>
        `}</pre>
      </GridLayout>
      <Divider />

      <GridLayout>
        <DumbDiv style={{ backgroundColor: theme.palette.warning.main }}>
          <OldSarabun color={theme.palette.warning.contrastText}>
            Warning
          </OldSarabun>
        </DumbDiv>
        <pre>{`
        <DumbDiv style={{ backgroundColor: theme.palette.warning.main }}>
          <Sarabun color={theme.palette.warning.contrastText}>Warning</Sarabun>
        </DumbDiv>
        `}</pre>
      </GridLayout>
      <Divider />

      <GridLayout>
        <DumbDiv style={{ backgroundColor: theme.palette.error.main }}>
          <OldSarabun color={theme.palette.error.contrastText}>
            Error
          </OldSarabun>
        </DumbDiv>
        <pre>{`
        <DumbDiv style={{ backgroundColor: theme.palette.error.main }}>
          <Sarabun color={theme.palette.error.contrastText}>Error</Sarabun>
        </DumbDiv>
        `}</pre>
      </GridLayout>
      <Divider />

      <GridLayout>
        <StyledButton>Lick Me</StyledButton>
        <pre>{`
        import { useTheme } from "@mui/material/styles"

        const StyledButton = materialStyled(withTheme(Button))((props) => ({
          background: props.theme.palette.success.main,
        }))
        
        <StyledButton>Lick Me</StyledButton>
        `}</pre>
      </GridLayout>
    </Card>
  )
}

export default ExampleColorTheme
