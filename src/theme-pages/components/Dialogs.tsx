import React, { useMemo, useState } from "react"
import styled from "styled-components/macro"
import { NavLink } from "react-router-dom"

import { Helmet } from "react-helmet"

import {
  Avatar,
  Button,
  CardContent,
  Dialog,
  DialogProps,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Paper as MuiPaper,
  Select,
  Switch,
  TextField,
  Typography,
  TableHead,
  TableRow,
  TableCell,
  Table,
  // Checkbox,
  // TableSortLabel,
  TableBody,
  // TableContainer,
  TablePagination,
  SelectChangeEvent,
  Breakpoint,
} from "@mui/material"

import { Add as AddIcon, Person as PersonIcon } from "@mui/icons-material"

import { spacing } from "@mui/system"
import OldModal from "../../components/common/OldModal"
import { useSnackbar } from "../../utils/custom-hook"
import { withStyles } from "@mui/styles"
// import { useSearchPatient } from "../../services/patient/patient-query"

const Card = styled(MuiCard)(spacing)

const Divider = styled(MuiDivider)(spacing)

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing)

const Paper = styled(MuiPaper)(spacing)

const emails = ["username@gmail.com", "user02@gmail.com"]

export interface SimpleDialogProps {
  open: boolean
  selectedValue: string
  onClose: (value: string) => void
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props

  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleListItemClick = (value: string) => {
    onClose(value)
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
      <List>
        {emails.map((email) => (
          <ListItem button onClick={() => handleListItemClick(email)} key={email}>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))}
        <ListItem autoFocus button onClick={() => handleListItemClick("addAccount")}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem>
      </List>
    </Dialog>
  )
}

function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState(emails[1])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (value: string) => {
    setOpen(false)
    setSelectedValue(value)
  }

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Simple Dialogs
        </Typography>
        <Typography variant="body2" gutterBottom>
          Simple dialogs can provide additional details or actions about a list item.
        </Typography>

        <Paper mt={4}>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Open simple dialog
          </Button>
          <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
          <Paper mt={2}>
            <Typography variant="body2">Selected: {selectedValue}</Typography>
          </Paper>
        </Paper>
      </CardContent>
    </Card>
  )
}

function AlertDialog() {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Alerts
        </Typography>
        <Typography variant="body2" gutterBottom>
          Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a
          situation.
        </Typography>

        <Paper mt={4}>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Open alert dialog
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Let Google help apps determine location. This means sending anonymous location data
                to Google, even when no apps are running.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Disagree
              </Button>
              <Button onClick={handleClose} color="primary" autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </CardContent>
    </Card>
  )
}

function MaxWidthDialog() {
  const [open, setOpen] = React.useState(false)
  const [fullWidth, setFullWidth] = React.useState(true)
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("sm")

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleMaxWidthChange = (event: SelectChangeEvent<false | Breakpoint>) => {
    setMaxWidth(event.target.value as DialogProps["maxWidth"])
  }

  const handleFullWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullWidth(event.target.checked)
  }

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Optional Sizes
        </Typography>
        <Typography variant="body2" gutterBottom>
          You can set a dialog maximum width by using the maxWidth enumerable in combination with
          the fullWidth boolean.
        </Typography>

        <Paper mt={4}>
          <>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
              Open max-width dialog
            </Button>
            <Dialog
              fullWidth={fullWidth}
              maxWidth={maxWidth}
              open={open}
              onClose={handleClose}
              aria-labelledby="max-width-dialog-title"
            >
              <DialogTitle id="max-width-dialog-title">Optional sizes</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  You can set my maximum width and whether to adapt or not.
                </DialogContentText>
                <form noValidate>
                  <FormControl>
                    <InputLabel htmlFor="max-width">maxWidth</InputLabel>
                    <Select
                      autoFocus
                      value={maxWidth}
                      onChange={handleMaxWidthChange}
                      inputProps={{
                        name: "max-width",
                        id: "max-width",
                      }}
                    >
                      <MenuItem value={false as any}>false</MenuItem>
                      <MenuItem value="xs">xs</MenuItem>
                      <MenuItem value="sm">sm</MenuItem>
                      <MenuItem value="md">md</MenuItem>
                      <MenuItem value="lg">lg</MenuItem>
                      <MenuItem value="xl">xl</MenuItem>
                    </Select>
                  </FormControl>
                </form>
                <form>
                  <FormControlLabel
                    control={<Switch checked={fullWidth} onChange={handleFullWidthChange} />}
                    label="Full width"
                  />
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </>
        </Paper>
      </CardContent>
    </Card>
  )
}

function FormDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Form Dialogs
        </Typography>
        <Typography variant="body2" gutterBottom>
          Form dialogs allow users to fill out form fields within a dialog.
        </Typography>

        <Paper mt={4}>
          <div>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
              Open form dialog
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To subscribe to this website, please enter your email address here. We will send
                  updates occasionally.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Email Address"
                  type="email"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpen(false)} color="primary">
                  Cancel
                </Button>
                <Button onClick={() => setOpen(false)} color="primary">
                  Subscribe
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Paper>
      </CardContent>
    </Card>
  )
}

function createData(patientId: string, firstName: string, lastName: string) {
  return { patientId, firstName, lastName } as const
}
type HeadCell = {
  id: string
  numeric: boolean
  disablePadding: boolean
  label: string
}

type RowType = {
  patientId: string
  firstName: string
  lastName: string
}

const rows: Array<RowType> = [
  createData("1213111111", "Luke", "Skywalker"),
  createData("1213112212", "Anakin", "Skywalker"),
  createData("1215561113", "Ben", "Skywalker"),
  createData("1213164314", "Rey", "Skywalker"),
  createData("1213118111", "Steve", "Jobs"),
  createData("9213112212", "Tony", "Jaa"),
  createData("8215561113", "Tony", "Woodsome"),
  createData("7213164314", "Tony", "Stark"),
  createData("6213111111", "Harry", "Potter"),
  createData("5213112212", "Payat", "Fun-o"),
  createData("4215561113", "Naruto", "Usumaki"),
  createData("3213164314", "Ghost", "Rider"),
  createData("2213111111", "Pangpon", "Eiei"),
  createData("1210112212", "Aaaaa", "Skywalker"),
  createData("1315501113", "Baaaa", "Skywalker"),
  createData("6313164314", "SDdex", "Skywalker"),
  createData("2313111111", "Lewdede", "Skywalker"),
  createData("1313112212", "Pgthyjyj", "Skywalker"),
  createData("3315561113", "Qdedef", "Skywalker"),
  createData("9313164314", "Dewdwe", "Skywalker"),
  createData("9313164315", "Obe-one", "Kenobe"),
  createData("9313164316", "Game", "Wanchai"),
]

export type ExTableProps = {
  onSelect: (id: string, firstName: string, lastName: string) => void
}

export const ExTable = (props: ExTableProps) => {
  const { onSelect } = props

  const [selected, setSelected] = React.useState<Array<string>>([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [dense] = React.useState(false)

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (patientId: string) => selected.indexOf(patientId) !== -1

  const handleClick = (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>, item: RowType) => {
    const selectedIndex = selected.indexOf(item.patientId)
    let newSelected: Array<string> = [item.patientId]
    if (selected[selectedIndex] === item.patientId) {
      newSelected = []
    }
    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, name)
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1))
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1))
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1)
    //   )
    // }

    console.debug(newSelected)

    setSelected(newSelected)
    const row = rows.find((row) => {
      return row.patientId === newSelected[0]
    })
    onSelect(row?.patientId || "", row?.firstName || "", row?.lastName || "")
  }
  const headCells: Array<HeadCell> = [
    {
      id: "patientId",
      numeric: false,
      disablePadding: false,
      label: "Patient ID",
    },
    {
      id: "firstName",
      numeric: false,
      disablePadding: false,
      label: "Firstname",
    },
    {
      id: "lastName",
      numeric: false,
      disablePadding: false,
      label: "Lastname",
    },
  ]

  // function getComparator(order: "desc" | "asc", orderBy: string) {
  //   return order === "desc"
  //     ? (a: RowType, b: RowType) => descendingComparator(a, b, orderBy)
  //     : (a: RowType, b: RowType) => -descendingComparator(a, b, orderBy)
  // }

  // function stableSort(
  //   array: Array<RowType>,
  //   comparator: (a: RowType, b: RowType) => number
  // ) {
  //   const stabilizedThis = array.map((el: RowType, index: number) => ({
  //     el,
  //     index,
  //   }))
  //   stabilizedThis.sort((a, b) => {
  //     const order = comparator(a.el, b.el)
  //     if (order !== 0) return order
  //     return a.index - b.index
  //   })
  //   return stabilizedThis.map((element) => element.el)
  // }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  const CustomTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#909090",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell)

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <CustomTableCell
                key={headCell.id}
                align={headCell.numeric ? "right" : "left"}
                padding={headCell.disablePadding ? "none" : "normal"}
                // sortDirection={orderBy === headCell.id ? order : false}
              >
                {headCell.label}
              </CustomTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
            const isItemSelected = isSelected(row.patientId)
            const labelId = `enhanced-table-checkbox-${index}`

            return (
              <TableRow
                hover
                onClick={(event) => handleClick(event, row)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.patientId}
                selected={isItemSelected}
              >
                <TableCell
                  component="th"
                  id={labelId}
                  scope="row"
                  // padding="none"
                >
                  {row.patientId}
                </TableCell>
                <TableCell align="left">{row.firstName}</TableCell>
                <TableCell align="left">{row.lastName}</TableCell>
                {/* <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell> */}
              </TableRow>
            )
          })}
          {emptyRows > 0 && (
            <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export const CustomModal = () => {
  const [open1, setOpen1] = React.useState(false)
  const [open2, setOpen2] = React.useState(false)
  const { snackbar } = useSnackbar()
  const modal1 = React.useMemo(() => {
    return (
      <OldModal
        fullWidth={true}
        maxWidth={"xs"}
        isOpen={open1}
        title={"Patient"}
        onConfirm={() => {
          setOpen1(false)
          snackbar({ message: "onConfirm", type: "success" })
        }}
        onCancel={() => {
          setOpen1(false)
          snackbar({ message: "onCancel", type: "info" })
        }}
      >
        <div>หากท่านต้องการลบข้อมูลคนไข้ “202103000001” ให้ทำ การกดปุ่ม Confirm</div>
      </OldModal>
    )
  }, [open1, snackbar])

  // modal2 -------------------------------------------------------------

  const [selected, setSelected] = useState({
    id: "",
    firstName: "",
    lastName: "",
  })
  const modal2 = useMemo(() => {
    return (
      <OldModal
        fullWidth={true}
        maxWidth={"xl"}
        childrenMargin={50}
        childrenPadding={0}
        titleMargin={26}
        titlePadding={24}
        isOpen={open2}
        title={"Patient"}
        onConfirm={() => {
          setOpen2(false)
          snackbar({
            message: `onConfirm ${selected.id} ${selected.firstName} ${selected.lastName}`,
            type: "success",
          })
        }}
        onCancel={() => {
          setOpen2(false)
          snackbar({ message: "onCancel", type: "info" })
        }}
      >
        <ExTable
          onSelect={(id, fn, ln) => {
            console.debug("ff", fn)
            setSelected({ id: id, firstName: fn, lastName: ln })
          }}
        />
      </OldModal>
    )
  }, [open2, selected, snackbar])

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Custom Modal simple
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setOpen1(true)}>
          Open
        </Button>
        {modal1}
        <Typography variant="h6" gutterBottom>
          Custom Modal table
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setOpen2(true)}>
          Open
        </Button>
        {modal2}
      </CardContent>
    </Card>
  )
}

const ExampleModalSelectTable = () => {
  const [selected] = useState()

  // const {
  //   data: searchPatientData,
  //   isFetching: isSearchPatientFetching,
  // } = useSearchPatient({
  //   q: text,
  //   page,
  //   per_page: perPage,
  // })

  return (
    <div>
      {/* <InputSearch
        title="Dialog"
        isLoading={isSearchPatientFetching}
        data={searchPatientData?.patients || []}
        page={page}
        perPage={perPage}
        totalItems={searchPatientData?.paging.totalCount}
        headers={[
          {
            key: "patientId",
            label: "Patient Id",
          },
          {
            key: "firstName",
          },
          {
            key: "lastName",
          },
        ]}
        onPageChange={onPageChange}
        onSearch={onSearch}
        onSelected={(d) => {
          onSelected(d)
        }}
      /> */}
      <div>
        <pre>{JSON.stringify(selected, null, 2)}</pre>
      </div>
      {/* {Object.entries(selected || {}).map(([k, v], index) => {
        return (
          <div key={[index, k].join("-")}>
            <span style={{ marginRight: 10 }}>Key: {k}</span>
            <span>{`Value: ${v}`}</span>
          </div>
        )
      })} */}
    </div>
  )
}

function Dialogs() {
  return (
    <>
      <Helmet title="Dialogs" />
      <Typography variant="h3" gutterBottom display="inline">
        Dialogs
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          Dashboard
        </Link>
        <Link component={NavLink} exact to="/">
          Components
        </Link>
        <Typography>Dialogs</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <SimpleDialogDemo />
          <AlertDialog />
        </Grid>
        <Grid item xs={12} md={6}>
          <MaxWidthDialog />
          <FormDialog />
        </Grid>
      </Grid>
      <CustomModal />
      <ExampleModalSelectTable />
    </>
  )
}

export default Dialogs
