import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  TableCellProps,
  Grid,
  Typography,
} from "@mui/material"
import { KeyboardEvent, useRef, useState, useEffect, useCallback } from "react"
import OldModal, { ModalProps } from "./common/OldModal"
import { range, uniq } from "lodash"
import { RefObject } from "react"
import { Pagination, Skeleton } from "@mui/lab"
import { makeStyles, withStyles } from "@mui/styles"

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 520,
  },
  paginate: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    alignItems: "baseline",
    padding: "12px",
  },
})

type Header<T> = {
  key: keyof T
  label?: string
} & Partial<Pick<TableCellProps, "align" | "size" | "padding" | "width" | "style">>

export type BaseModalSelectTableData = {
  [key: string]: unknown
}

export type ModalSelectTableProps<T> = {
  isOpen: boolean
  data: T[]
  headers: Header<T>[]
  onConfirm?: (v: T) => void
  isLoading?: boolean
  title: string
} & Omit<ModalProps, "onConfirm"> &
  Pick<
    SelectTableProps<T>,
    "page" | "perPage" | "totalItems" | "totalPages" | "onPageChange" | "hideSeq"
  >
const ModalSelectTable = <T extends BaseModalSelectTableData>(props: ModalSelectTableProps<T>) => {
  const {
    isOpen = false,
    data,
    headers,
    onConfirm,
    onCancel,
    page,
    perPage,
    totalItems,
    totalPages,
    onPageChange,
    isLoading = false,
    hideSeq,
    title,
    ...restProps
  } = props

  const modalRef = useRef<HTMLDivElement>(null)

  const [selected, setSelected] = useState<T>()

  const onConfirmClick = useCallback(() => {
    if (selected) {
      onConfirm?.(selected)
    }
  }, [onConfirm, selected])

  const onCancelClick = useCallback(() => {
    onCancel()
    setSelected(undefined)
  }, [onCancel])

  const onSelect = useCallback((value: T) => {
    setSelected(value)
  }, [])

  return (
    <OldModal
      modalRef={modalRef}
      fullWidth={true}
      maxWidth={"xl"}
      childrenMargin={50}
      childrenPadding={0}
      titleMargin={26}
      titlePadding={24}
      isOpen={isOpen}
      title={title}
      onConfirm={onConfirmClick}
      onCancel={onCancelClick}
      {...restProps}
    >
      <SelectTable<T>
        isLoading={isLoading}
        modalRef={modalRef}
        data={data}
        selected={selected}
        headers={headers}
        onSelect={onSelect}
        onEnter={onConfirmClick}
        page={page}
        perPage={perPage}
        totalItems={totalItems}
        totalPages={totalPages}
        hideSeq={hideSeq}
        onPageChange={onPageChange}
      />
    </OldModal>
  )
}

const CustomTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.grey[400],
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

export type SelectTableProps<T> = {
  data: T[]
  selected?: T
  headers: Header<T>[]
  page: number
  perPage: number
  totalItems?: number
  totalPages?: number
  modalRef: RefObject<HTMLDivElement>
  isLoading?: boolean
  hideSeq?: boolean
  onPageChange?: (page: number) => void
  onSelect?: (v: T) => void
  onEnter?: () => void
}

export const SelectTable = <T extends BaseModalSelectTableData>(props: SelectTableProps<T>) => {
  const {
    modalRef,
    data,
    selected,
    headers,
    page = 1,
    perPage = 10,
    totalItems = 1,
    totalPages = 1,
    isLoading = false,
    onPageChange,
    onSelect,
    onEnter,
    hideSeq = false,
  } = props
  const containerRef = useRef<HTMLDivElement>(null)
  const tableRowsRef = useRef<HTMLTableRowElement[]>([])
  const [rowIndexSelected, setRowIndexSelected] = useState<number>()
  const [rowsPerPage] = useState(perPage)
  const [localPage, setLocalPage] = useState(page)

  const classes = useStyles()

  const handleChangePage = useCallback((event: any, newPage: number) => {
    setLocalPage(newPage)
  }, [])

  const onRowClick = useCallback((rowIndex: number) => {
    setRowIndexSelected(rowIndex)
  }, [])

  const onKeyDown = useCallback(
    (ev: any) => {
      const event = ev as KeyboardEvent
      const { key } = event

      const minRow = 0
      const maxRow = data.length - 1
      const minPage = 1
      const maxPage = totalPages

      const prevRow =
        rowIndexSelected !== undefined ? Math.max(minRow, rowIndexSelected - 1) : minRow
      const isFirstRow = uniq([prevRow, rowIndexSelected, minRow]).length === 1

      const nextRow =
        rowIndexSelected !== undefined ? Math.min(maxRow, rowIndexSelected + 1) : maxRow
      const isLastRow = uniq([nextRow, rowIndexSelected, maxRow]).length === 1

      const goNextPage = () => {
        setLocalPage((prevPage) => {
          const next = Math.min(maxPage, prevPage + 1)
          return next
        })
      }
      const goPrevPage = () => {
        setLocalPage((prevPage) => {
          const next = Math.max(minPage, prevPage - 1)
          return next
        })
      }

      const scrollToTop = () => {
        const _containerRef = containerRef.current
        if (_containerRef) {
          _containerRef.scrollTo({
            top: 0,
          })
        }
      }

      switch (key) {
        case "ArrowUp":
          if (isFirstRow) {
            goPrevPage()
            scrollToTop()
            setRowIndexSelected(minRow)
          } else {
            setRowIndexSelected(prevRow)
          }
          break
        case "ArrowDown":
          if (isLastRow) {
            goNextPage()
            scrollToTop()
            setRowIndexSelected(minRow)
          } else {
            setRowIndexSelected(nextRow)
          }
          break
        case "ArrowLeft":
          goPrevPage()
          scrollToTop()
          break
        case "ArrowRight":
          goNextPage()
          scrollToTop()
          break
        case "Enter":
          onEnter?.()
          break
        default:
          break
      }
    },
    [data.length, totalPages, rowIndexSelected, onEnter],
  )

  useEffect(() => {
    const rowIndexFromSelected = data.findIndex((v) => v.value === selected?.value)
    if (rowIndexFromSelected > -1) setRowIndexSelected(rowIndexFromSelected)
    else setRowIndexSelected(0)
  }, [data, selected?.value])

  useEffect(() => {
    if (rowIndexSelected !== undefined) {
      const dataSelected = data[rowIndexSelected]
      if (dataSelected) {
        onSelect?.(dataSelected)
        if (tableRowsRef.current.length) {
          const rowsRef = tableRowsRef.current
          const rowSelectedRef = rowsRef[rowIndexSelected]
          rowSelectedRef.focus()
        }
      }
    }
  }, [data, onSelect, rowIndexSelected])

  useEffect(() => {
    const _modalRef = modalRef.current
    if (_modalRef) {
      _modalRef.addEventListener("keydown", onKeyDown)
    }
    return () => {
      _modalRef?.removeEventListener("keydown", onKeyDown)
    }
  }, [modalRef, onKeyDown])

  useEffect(() => {
    if (tableRowsRef.current.length) {
      const rowsRef = tableRowsRef.current
      const firstRow = rowsRef[0]
      firstRow.focus()
    }
  }, [])

  useEffect(() => {
    onPageChange?.(localPage)
  }, [localPage, onPageChange])
  return (
    <Paper className={classes.root}>
      <TableContainer ref={containerRef} className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {!hideSeq && (
                <CustomTableCell width={"auto"} scope="row" component="th">
                  {"ลำดับ"}
                </CustomTableCell>
              )}
              {headers.map((headCell, headerColIndex) => {
                const { key, label, ...restHeaderProps } = headCell
                return (
                  <CustomTableCell
                    key={`${key}-${label}-${headerColIndex}`}
                    width={"33%"}
                    scope="row"
                    component="th"
                    {...restHeaderProps}
                  >
                    {label || key}
                  </CustomTableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              data.map((d, rowIndex) => {
                return (
                  <TableRow
                    key={`${rowIndex}-${d}`}
                    ref={(ref) => {
                      if (ref) {
                        tableRowsRef.current[rowIndex] = ref
                      }
                    }}
                    hover
                    onClick={() => onRowClick(rowIndex)}
                    tabIndex={-1}
                    aria-checked={rowIndex === rowIndexSelected}
                    selected={rowIndex === rowIndexSelected}
                  >
                    {!hideSeq && (
                      <TableCell width={"auto"} scope="row" component="th">
                        {(localPage - 1) * perPage + rowIndex + 1}
                      </TableCell>
                    )}
                    {headers.map(({ key }) => (
                      <TableCell
                        id={`enhanced-table-checkbox-${rowIndex}`}
                        key={`${rowIndex}-${key}`}
                        scope="row"
                        component="td"
                      >
                        <div>{`${d[key] ? d[key] : "-"}`}</div>
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })}
            {isLoading &&
              range(rowsPerPage).map((d, rowIndex) => {
                return (
                  <TableRow key={`${rowIndex}`}>
                    {!hideSeq && (
                      <TableCell scope="row" component="td" style={{ padding: 8 }}>
                        <Skeleton animation="wave" style={{ padding: 8 }} />
                      </TableCell>
                    )}
                    {headers.map(({ key }) => (
                      <TableCell
                        key={`${rowIndex}-${key}`}
                        scope="row"
                        component="td"
                        style={{ padding: 8 }}
                      >
                        <Skeleton
                          key={`${rowIndex}-${key}`}
                          animation="wave"
                          style={{ padding: 8 }}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container justifyContent="flex-end">
        <Grid className={classes.paginate}>
          <Typography variant="subtitle2">{`Total: ${totalItems.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}`}</Typography>
          <Pagination
            count={totalPages}
            page={localPage}
            onChange={handleChangePage}
            disabled={!totalItems}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default ModalSelectTable
