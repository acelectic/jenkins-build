import { CSSProperties, PropsWithChildren, ReactNode, useState } from "react"
import { withStyles, makeStyles } from "@mui/styles"
import {
  Table as BaseTable,
  TableCell as BaseTableCell,
  TableContainer,
  TableHead as BaseTableHead,
  TableBody as BaseTableBody,
  TableRow,
  Paper,
  TablePagination,
  TableCellProps as BaseTableCellProps,
  CircularProgress,
  Theme,
} from "@mui/material"
import { css } from "@emotion/css"
import { hideScrollStyle } from "../../utils/responsive-helper"
import styled from "@emotion/styled"
import { useTranslation } from "react-i18next"
import { format2DecimalNumber } from "../../utils/helper"

const hideScrollBar = css`
  ${hideScrollStyle}
`
const TableWrapper = styled.div`
  width: "0.6rem" 0%;
`

const PaginationLayout = styled.div`
  min-height: 2.5rem;
  width: inherit;
`
type IBasicProps = { className?: string; style?: CSSProperties }

const StyledTableRow = withStyles({
  root: {
    backgroundColor: "transparent",
    borderTopWidth: 1,
    borderTopColor: "#D9DBDE",
    borderTopStyle: "solid",
    "&: hover": {
      backgroundColor: "#D9DBDE",
    },
    "& >": {
      "& th": {
        verticalAlign: "middle",
      },
      "& th:first-of-type": {
        paddingLeft: "0.6rem",
      },
      "& th:last-of-type": {
        paddingRight: "0.6rem",
      },
      "& td:first-of-type": {
        paddingLeft: "0.6rem",
      },
      "& td:last-of-type": {
        paddingRight: "0.6rem",
      },
    },
  },
})(TableRow)

const useStyles = makeStyles<Theme, { bordered?: boolean }>({
  tableContainer: {
    overflowX: "scroll",
    minWidth: "250px",
    boxShadow: "unset",
    borderTopWidth: "0px",
    borderLeftWidth: ({ bordered }) => `${bordered ? "1px" : "0px"}`,
    borderRightWidth: ({ bordered }) => `${bordered ? "1px" : "0px"}`,
    borderBottomWidth: ({ bordered }) => `${bordered ? "1px" : "0px"}`,
    borderStyle: "solid",
    borderColor: "#D9DBDE",
    borderRadius: "8px",
    "& tr > :first-of-type": {
      paddingLeft: "3rem",
    },
    "& .MuiTableCell-root": {
      paddingTop: "0.6rem",
      paddingBottom: "0.6rem",
      paddingRight: "unset",
      borderBottom: "unset",
    },
    "& tbody .MuiTableRow-root:last-of-type": {
      "& .MuiTableCell-root": {
        paddingBottom: "1.3rem",
      },
    },
  },
  table: {
    minWidth: "100%",
    borderWidth: "0.25rem",
  },
  pagination: {
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#D9DBDE",
    borderTopStyle: "solid",
  },
})

export type ITableProps = {
  children: ReactNode
  onChangePage?: (page: number) => void
  onChangeRowsPerPage?: (rowsSize: number) => void
  page?: number
  totalSize?: number
  rowsPerPageOptions?: number[]
  hidePaginate?: boolean
  isLoading?: boolean
  style?: CSSProperties
  className?: string
  initRowsPerPage?: number
  isBordered?: boolean
}

export const Table = (props: ITableProps) => {
  const { t } = useTranslation()
  const {
    children,
    page = 1,
    onChangePage,
    onChangeRowsPerPage,
    hidePaginate = false,
    totalSize = 0,
    rowsPerPageOptions = [5, 10, 20],
    isLoading = false,
    style,
    className,
    initRowsPerPage = 5,
    isBordered = false,
  } = props

  const classes = useStyles({ bordered: isBordered })

  const [rowsPerPage, setRowsPerPage] = useState(initRowsPerPage)
  return (
    <TableContainer
      className={`${classes.tableContainer} ${hideScrollBar} ${className}`}
      component={Paper}
      style={style}
    >
      <TableWrapper>
        <BaseTable className={classes.table}>
          {children}
          {isLoading && (
            <Table.Body>
              <Table.Row
                style={{
                  position: "relative",
                  height: "3.75rem",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <td>
                  <CircularProgress
                    size="1.75rem"
                    style={{
                      position: "absolute",
                      left: "50%",
                      marginTop: "0.9rem",
                    }}
                  />
                </td>
              </Table.Row>
            </Table.Body>
          )}
        </BaseTable>
        {!hidePaginate && (
          <PaginationLayout>
            {totalSize && page ? (
              <TablePagination
                component="div"
                className={classes.pagination}
                rowsPerPageOptions={rowsPerPageOptions}
                count={totalSize}
                rowsPerPage={rowsPerPage}
                page={Math.max(page - 1, 0)}
                onPageChange={(_, page: number) => {
                  onChangePage?.(page + 1)
                }}
                onRowsPerPageChange={({ target }: any) => {
                  onChangeRowsPerPage?.(target.value)
                  setRowsPerPage(Number(target.value))
                }}
                labelRowsPerPage={t("table.rowsPerPageLabel")}
                labelDisplayedRows={({ from, to, count }) =>
                  `${format2DecimalNumber(from)} - ${format2DecimalNumber(to)} ${t(
                    "table.of",
                  )} ${format2DecimalNumber(count)}`
                }
              />
            ) : null}
          </PaginationLayout>
        )}
      </TableWrapper>
    </TableContainer>
  )
}

const TableCell = (props: PropsWithChildren<BaseTableCellProps>) => {
  const { children, ...restProps } = props
  return <BaseTableCell {...restProps}>{children}</BaseTableCell>
}

const useHeadRowStyle = makeStyles({
  root: {
    "& >": {
      "& th": {
        backgroundColor: "#919DAA3D",
        height: "3.125rem",
        fontSize: "1.063rem",
        color: "#004D99",
        fontWeight: 500,
      },
      "& th:first-of-type": {
        borderTopLeftRadius: "0.6rem",
        borderBottomLeftRadius: "0.6rem",
      },
      "& th:last-of-type": {
        borderTopRightRadius: "0.6rem",
        borderBottomRightRadius: "0.6rem",
      },
    },
  },
})

const TableHeadRow = (props: PropsWithChildren<IBasicProps>) => {
  const { className, ...rest } = props
  const classes = useHeadRowStyle()
  return <StyledTableRow {...rest} className={`${classes.root} ${className}`} />
}

const useTableBodyStyle = makeStyles({
  root: {
    "& > tr:first-of-type > td": {
      paddingTop: "0.6rem",
    },
  },
})

const TableBody = (props: PropsWithChildren<IBasicProps>) => {
  const { className, ...rest } = props
  const classes = useTableBodyStyle()
  return <BaseTableBody {...rest} className={`${classes.root} ${className}`} />
}

Table.Head = BaseTableHead
Table.Body = TableBody
Table.Row = StyledTableRow
Table.Cell = TableCell
Table.HeadRow = TableHeadRow

export default Table
