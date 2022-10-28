import styled from "@emotion/styled"
import { Box, Button, Modal, TextField } from "@mui/material"
import { useCallback, useMemo } from "react"
import { useSignIn } from "../../services/auth/auth-query"
import { useVisible } from "../../utils/custom-hook"
import EmailIcon from "@mui/icons-material/Email"
import AccountBoxIcon from "@mui/icons-material/AccountBox"
import paths from "../../constants/paths"
import { group1List, ITestUserLoginData } from "./users"
import OldSarabun from "../common/OldSarabun"
import { config } from "../../configs"
import { mobile } from "../../utils/responsive-helper"
import { Form, Field } from "react-final-form"

const Text = styled(OldSarabun)``

const Layout = styled(Box)`
  position: fixed;
  top: 5px;
  left: 5px;
  z-index: 5000;
`

const ButtonLayout = styled.div`
  display: flex;
  flex-flow: row wrap;
  overflow: auto;
  flex: 1;
  > div {
    counter-increment: line-number;
    flex: 1;
    margin: 10px;
    ::before {
      content: "Test Team: " counter(line-number);
      font-weight: bold;
      font-size: 24px;
    }
    .button-wrapper {
      display: flex;
      flex-flow: column;
      align-items: baseline;
      margin: 15px 10px;
      > div {
        :first-of-type {
          margin-right: 10px;
        }
      }

      .position-level {
        display: flex;
        flex-flow: row;
        text-transform: capitalize;
        grid-column-gap: 5px;

        > :nth-of-type(2) {
          white-space: nowrap;
        }
      }
    }
  }
`
const HeaderLayout = styled.div`
  width: 100%;
  max-width: 400px;
`
const ContentLayout = styled.div`
  display: flex;
  flex-flow: column;
  max-height: 80vh;
  max-width: 80vw;
  min-width: 500px;
  counter-reset: line-number;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 15px;
  box-sizing: border-box;
  ${mobile} {
    min-width: 80vw;
    .input-layout {
      width: 100%;
    }
  }
`
const TextStyled = styled(Text)`
  text-transform: lowercase;
`

const TextFieldStyled = styled(TextField)`
  margin-bottom: 10px;
`

const ButtonStyled = styled(Button)`
  margin-bottom: 10px;
  text-transform: capitalize;
  font-weight: 600;
`

interface IDebugSignInFormValues {
  employeeId?: string
}

const DebugSignIn = () => {
  const visible = useVisible()

  const { mutate: signIn } = useSignIn()

  const handleSignIn = useCallback(
    (employeeId: string) => {
      signIn(
        {
          code: "some-code",
          employeeId,
          debug: true,
        },
        {
          onSuccess: (data) => {
            window.location.href = paths.dashboard()
          },
          onError: (err) => {
            // history.replace(paths.signIn())
          },
          onSettled: () => {
            visible.close()
          },
        },
      )
    },
    [signIn, visible],
  )

  const renderButtonGroup = useCallback(
    ({ label, employeeId, detail }: ITestUserLoginData) => (
      <div className="button-wrapper" key={`${label}-${employeeId}`}>
        <div className="position-level">
          <div>{`${(label || "unknown").toString()}`}</div>
          <div>{`${detail?.toString() || ""}`}</div>
        </div>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSignIn.bind(null, employeeId)}
          style={{
            width: "max-content",
            marginTop: 0.5,
          }}
        >
          <TextStyled>{`${employeeId.toString().toLowerCase()}`}</TextStyled>
        </Button>
      </div>
    ),
    [handleSignIn],
  )

  const isDebugMode = useMemo(() => {
    const isDebugMode = config.REACT_APP_DEBUG_MODE
    return isDebugMode
  }, [])

  const onSubmit = useCallback(
    (values: IDebugSignInFormValues) => {
      // console.log({ values })
      const { employeeId } = values
      employeeId && handleSignIn(employeeId)
    },
    [handleSignIn],
  )

  return isDebugMode ? (
    <Layout>
      <Button
        variant="contained"
        color="secondary"
        onClick={visible.open}
        startIcon={<AccountBoxIcon />}
      >
        Debug SignIn
      </Button>
      <Modal
        open={visible.visible}
        onClose={visible.close}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Form onSubmit={onSubmit}>
          {({ handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <ContentLayout>
                  <HeaderLayout className="header-layout">
                    <Box
                      className="input-layout"
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        marginBottom: "0.75rem",
                      }}
                    >
                      <EmailIcon style={{ margin: 8 }} />
                      <Field name="employeeId">
                        {({ input }) => {
                          return (
                            <TextFieldStyled
                              {...input}
                              id="outlined-basic"
                              label="EmployeeId"
                              size="small"
                              autoComplete="off"
                              variant="standard"
                              style={{ width: "100%" }}
                              autoFocus
                            />
                          )
                        }}
                      </Field>
                    </Box>

                    <ButtonStyled
                      variant="contained"
                      color="primary"
                      type="submit"
                      style={{ width: "100%" }}
                    >
                      Sign In
                    </ButtonStyled>
                  </HeaderLayout>
                  <ButtonLayout>
                    {config.IS_LOCAL && <div>{group1List.map(renderButtonGroup)}</div>}
                  </ButtonLayout>
                </ContentLayout>
              </form>
            )
          }}
        </Form>
      </Modal>
    </Layout>
  ) : (
    <></>
  )
}

export default DebugSignIn
