import React from "react"
import styled from "styled-components/macro"
import { NavLink as RouterNavLink } from "react-router-dom"

import { Helmet } from "react-helmet"
import CloseIcon from "@mui/icons-material/Close"

import {
  CardContent,
  Fade,
  Grid,
  IconButton,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  Divider as MuiDivider,
  Paper as MuiPaper,
  Slide,
  Snackbar,
  SnackbarOrigin,
  Typography,
  ListProps,
  SlideProps,
  SnackbarCloseReason,
} from "@mui/material"

import { spacing } from "@mui/system"
import { useSnackbar } from "../../utils/custom-hook"

const NavLink = React.forwardRef<ListProps, any>((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
))

const Card = styled(MuiCard)(spacing)

const Divider = styled(MuiDivider)(spacing)

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing)

const Paper = styled(MuiPaper)(spacing)

const Button = styled(MuiButton)(spacing)

function SimpleSnackbar() {
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }
  const handleCloseSnackbar = (
    event: React.SyntheticEvent<any> | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Simple Snackbar
        </Typography>
        <Typography variant="body2" gutterBottom>
          A basic snackbar that aims to reproduce Google Keep's snackbar behavior.
        </Typography>
        <Paper mt={3}>
          <Button onClick={handleClick} variant="contained" color="secondary">
            Open simple snackbar
          </Button>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message="Note archived"
            action={
              <>
                <Button color="secondary" size="small" onClick={handleClose}>
                  UNDO
                </Button>
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </>
            }
          />
        </Paper>
      </CardContent>
    </Card>
  )
}

interface IPositionedSnackbarState extends SnackbarOrigin {
  open: boolean
}

function PositionedSnackbar() {
  const [state, setState] = React.useState<IPositionedSnackbarState>({
    open: false,
    vertical: "top",
    horizontal: "center",
  })
  const { vertical, horizontal, open } = state

  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ open: true, ...newState })
  }

  const handleClose = () => {
    setState({ ...state, open: false })
  }

  const buttons = (
    <>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        mr={2}
        onClick={handleClick({ vertical: "top", horizontal: "center" })}
      >
        Top-Center
      </Button>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        mr={2}
        onClick={handleClick({ vertical: "top", horizontal: "right" })}
      >
        Top-Right
      </Button>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        mr={2}
        onClick={handleClick({ vertical: "bottom", horizontal: "right" })}
      >
        Bottom-Right
      </Button>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        mr={2}
        onClick={handleClick({ vertical: "bottom", horizontal: "center" })}
      >
        Bottom-Center
      </Button>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        mr={2}
        onClick={handleClick({ vertical: "bottom", horizontal: "left" })}
      >
        Bottom-Left
      </Button>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        mr={2}
        onClick={handleClick({ vertical: "top", horizontal: "left" })}
      >
        Top-Left
      </Button>
    </>
  )

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Positioned Snackbar
        </Typography>
        <Typography variant="body2" gutterBottom>
          There may be circumstances when the placement of the snackbar needs to be more flexible.
        </Typography>
        <Paper mt={3}>
          {buttons}
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            message="I love snacks"
            key={vertical + horizontal}
          />
        </Paper>
      </CardContent>
    </Card>
  )
}

interface IConsecutiveSnackbarMessage {
  message: string
  key: number
}

function ConsecutiveSnackbar() {
  const [snackPack, setSnackPack] = React.useState<IConsecutiveSnackbarMessage[]>([])
  const [open, setOpen] = React.useState(false)
  const [messageInfo, setMessageInfo] = React.useState<IConsecutiveSnackbarMessage | undefined>(
    undefined,
  )

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] })
      setSnackPack((prev) => prev.slice(1))
      setOpen(true)
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false)
    }
  }, [snackPack, messageInfo, open])

  const handleClick = (message: string) => () => {
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }])
  }

  const handleClose = (event: React.SyntheticEvent | MouseEvent, reason?: string) => {
    if (reason === "clickaway") {
      return
    }
    setOpen(false)
  }

  const handleCloseSnackbar = (
    event: React.SyntheticEvent<any> | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Consecutive Snackbar
        </Typography>
        <Typography variant="body2" gutterBottom>
          Per Google's guidelines, when multiple snackbar updates are necessary, they should appear
          one at a time.
        </Typography>
        <Paper mt={3}>
          <Button variant="contained" color="secondary" mr={2} onClick={handleClick("Message A")}>
            Show message A
          </Button>
          <Button variant="contained" color="secondary" mr={2} onClick={handleClick("Message B")}>
            Show message B
          </Button>
          <Snackbar
            key={messageInfo ? messageInfo.key : undefined}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            /*  onExited={handleExited} */
            message={messageInfo ? messageInfo.message : undefined}
            action={
              <>
                <Button color="secondary" size="small" onClick={handleClose}>
                  UNDO
                </Button>
                <IconButton aria-label="close" color="inherit" onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </>
            }
          />
        </Paper>
      </CardContent>
    </Card>
  )
}

type TransitionProps = Omit<SlideProps, "direction">

function TransitionLeft(props: TransitionProps) {
  return <Slide {...props} direction="left" />
}

function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction="up" />
}

function TransitionRight(props: TransitionProps) {
  return <Slide {...props} direction="right" />
}

function TransitionDown(props: TransitionProps) {
  return <Slide {...props} direction="down" />
}

function DirectionSnackbar() {
  const [open, setOpen] = React.useState(false)
  const [transition, setTransition] = React.useState<
    React.ComponentType<TransitionProps> | undefined
  >(undefined)

  const handleClick = (Transition: React.ComponentType<TransitionProps>) => () => {
    setTransition(() => Transition)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Control Direction
        </Typography>
        <Typography variant="body2" gutterBottom>
          Change the direction of the transition. Slide is the default transition.
        </Typography>
        <Paper mt={3}>
          <Button
            onClick={handleClick(TransitionLeft)}
            variant="contained"
            color="secondary"
            mr={2}
          >
            Right
          </Button>
          <Button onClick={handleClick(TransitionUp)} variant="contained" color="secondary" mr={2}>
            Up
          </Button>
          <Button
            onClick={handleClick(TransitionRight)}
            variant="contained"
            color="secondary"
            mr={2}
          >
            Left
          </Button>
          <Button
            onClick={handleClick(TransitionDown)}
            variant="contained"
            color="secondary"
            mr={2}
          >
            Down
          </Button>
          <Snackbar
            open={open}
            onClose={handleClose}
            TransitionComponent={transition}
            ContentProps={{
              "aria-describedby": "message-id",
            }}
            message={<span id="message-id">I love snacks</span>}
          />
        </Paper>
      </CardContent>
    </Card>
  )
}

function TransitionSnackbar() {
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Snackbar Transition
        </Typography>
        <Typography variant="body2" gutterBottom>
          Use a different transition (fade).
        </Typography>
        <Paper mt={3}>
          <Button onClick={handleClick} variant="contained" color="secondary">
            Open with Fade Transition
          </Button>
          <Snackbar
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
            ContentProps={{
              "aria-describedby": "message-id",
            }}
            message={<span id="message-id">I love snacks</span>}
          />
        </Paper>
      </CardContent>
    </Card>
  )
}

export const CustomSnackBar = () => {
  const { snackbar } = useSnackbar()

  return (
    <Card mb={6}>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <p>{`const { snackbar } = useSnackbar()`}</p>
            <br />
            <hr />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => snackbar({ message: "So Yummy" })}
            >
              Normal
            </Button>
            <p>{`snackbar({ message: 'So Yummy' })`}</p>
            <hr />
            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                snackbar({
                  message: "So Yummy",
                  type: "success",
                  description: "พนักงานวางแผน พนักงานวางแผน",
                })
              }
            >
              Success
            </Button>
            <p>{`snackbar({ message: 'So Yummy', type: 'success' })`}</p>
            <hr />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => snackbar({ message: "So Yummy", type: "warning" })}
            >
              Warning
            </Button>
            <p>{`snackbar({ message: 'So Yummy', type: 'warning' })`}</p>
            <hr />

            <Button
              variant="contained"
              color="secondary"
              onClick={() => snackbar({ message: "So Yummy", type: "error" })}
            >
              Error
            </Button>
            <p>{`snackbar({ message: 'So Yummy', type: 'error' })`}</p>
            <hr />

            <Button
              variant="contained"
              color="secondary"
              onClick={() => snackbar({ message: "So Yummy", type: "info" })}
            >
              Info
            </Button>
            <p>{`snackbar({ message: 'So Yummy', type: 'info' })`}</p>
            <hr />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

function Snackbars() {
  return (
    <>
      <Helmet title="Snackbars" />
      <Typography variant="h3" gutterBottom display="inline">
        Snackbars
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          Dashboard
        </Link>
        <Link component={NavLink} exact to="/">
          Components
        </Link>
        <Typography>Snackbars</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <SimpleSnackbar />
          <ConsecutiveSnackbar />
          <TransitionSnackbar />
        </Grid>
        <Grid item xs={12} md={6}>
          <PositionedSnackbar />
          <DirectionSnackbar />
          <CustomSnackBar />
        </Grid>
      </Grid>
    </>
  )
}

export default Snackbars
