import styled from "@emotion/styled"
import { Box } from "@mui/material"
import { useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import HeaderSortable from "../../../../components/common/HeaderSortable"
import Icon from "../../../../components/common/Icon"
import Input from "../../../../components/common/Input"
import Sarabun from "../../../../components/common/Sarabun"
import Table from "../../../../components/common/Table"
import { PRIMARY_MAIN, WHITE } from "../../../../constants/colors"
import { KpiType, ManageKpiColumnTitle, ManageKpiOrder } from "../../../../services/enum-typed"
import { KpiTransactionDetailResponse } from "../../../../services/manage-kpi/mange-kpi-type"
import { format2DecimalNumber } from "../../../../utils/helper"

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const TableContainer = styled.div`
  background-color: ${WHITE};
  flex: 1;
  padding: 16px;
  align-self: stretch;
  margin-top: 32px;
`

const LeftSideContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const RightSideContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const NameCellContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 75px;
  justify-content: center;
`

type IKpiTransactionDetailTableProps = {
  KpiTransactionDetailData: KpiTransactionDetailResponse
  isLoading: boolean
  pageState: [number, React.Dispatch<React.SetStateAction<number>>]
  pageSizeState: [number, React.Dispatch<React.SetStateAction<number>>]
  orderByState: [ManageKpiOrder, React.Dispatch<React.SetStateAction<ManageKpiOrder>>]
  searchState: [string, React.Dispatch<React.SetStateAction<string>>]
  onClickDetail: (kpiTransactionDetailId: string) => void
  titleText?: string
  isEmptyData?: boolean
}

const KpiTransactionDetailTable = (props: IKpiTransactionDetailTableProps) => {
  const {
    KpiTransactionDetailData,
    isLoading,
    pageState,
    pageSizeState,
    orderByState,
    searchState,
    onClickDetail,
    isEmptyData,
    titleText = "เป้าหมายประจำไตรมาสที่ดำเนินการอยู่",
  } = props
  const { t } = useTranslation()
  const [page, setPage] = pageState
  const [pageSize, setPageSize] = pageSizeState
  const [sortingKey, setSortingKey] = useState("")
  const [searchValue, setSearchValue] = searchState
  const [orderBy, setOrderBy] = orderByState

  const onSorting = useCallback(
    (title, ordering) => {
      setSortingKey(title)
      setPage(1)
      switch (title) {
        case t(`${ManageKpiColumnTitle.KPI_TYPE}`): {
          orderBy === ManageKpiOrder.KPI_TYPE_DESC
            ? setOrderBy(ManageKpiOrder.KPI_TYPE_ASC)
            : setOrderBy(ManageKpiOrder.KPI_TYPE_DESC)
          break
        }
        case t(`${ManageKpiColumnTitle.WEIGHT}`): {
          orderBy === ManageKpiOrder.WEIGHT_DESC
            ? setOrderBy(ManageKpiOrder.WEIGHT_ASC)
            : setOrderBy(ManageKpiOrder.WEIGHT_DESC)
          break
        }
        case t(`${ManageKpiColumnTitle.TARGET}`): {
          orderBy === ManageKpiOrder.TARGET_DESC
            ? setOrderBy(ManageKpiOrder.TARGET_ASC)
            : setOrderBy(ManageKpiOrder.TARGET_DESC)
          break
        }
        case t(`${ManageKpiColumnTitle.ACTUAL}`): {
          orderBy === ManageKpiOrder.ACTUAL_DESC
            ? setOrderBy(ManageKpiOrder.ACTUAL_ASC)
            : setOrderBy(ManageKpiOrder.ACTUAL_DESC)
          break
        }
        case t(`${ManageKpiColumnTitle.COUNT}`): {
          orderBy === ManageKpiOrder.KPI_TRANSACTION_MAPPING_COUNT_DESC
            ? setOrderBy(ManageKpiOrder.KPI_TRANSACTION_MAPPING_COUNT_ASC)
            : setOrderBy(ManageKpiOrder.KPI_TRANSACTION_MAPPING_COUNT_DESC)
          break
        }
        default: {
          orderBy === ManageKpiOrder.NAME_DESC
            ? setOrderBy(ManageKpiOrder.NAME_ASC)
            : setOrderBy(ManageKpiOrder.NAME_DESC)
          break
        }
      }
    },
    [orderBy, setOrderBy, setPage, t],
  )

  const onChangePage = useCallback(
    (page: number) => {
      setPage(page)
    },
    [setPage],
  )
  const onChangeRowsPerPage = useCallback(
    (rowsPerPage: number) => {
      setPageSize(rowsPerPage)
      setPage(1)
    },
    [setPage, setPageSize],
  )

  const kpiTransactionDetailList = useMemo(() => {
    return KpiTransactionDetailData ? KpiTransactionDetailData.data : []
  }, [KpiTransactionDetailData])

  const kpiTransactionDetailPaging = useMemo(() => {
    return KpiTransactionDetailData ? KpiTransactionDetailData.paging : undefined
  }, [KpiTransactionDetailData])

  const kpiType = useCallback(
    (type: string) => {
      return type === KpiType.COMPANY
        ? t("องค์กร")
        : type === KpiType.OTHER
        ? t("อื่น ๆ")
        : t("หน่วยงาน​")
    },
    [t],
  )

  const onSearch = useCallback(
    (event: any) => {
      const value = event.target.value
      setSearchValue(value)
    },
    [setSearchValue],
  )

  return (
    <>
      <TableContainer>
        <TitleContainer>
          <LeftSideContainer>
            <Sarabun type="H4">{t(`${titleText}`)}</Sarabun>
            <Sarabun type="Body1">{t("แสดงข้อมูลเป้าหมายประจำไตรมาสที่คุณเป็นคนสร้าง")}</Sarabun>
          </LeftSideContainer>
          <RightSideContainer>
            <Sarabun type="Body1">{t("ค้นหาจากคีย์เวิร์ด")}</Sarabun>
            <Input
              placeholder="กรุณากรอกข้อมูล"
              style={{ minWidth: 250 }}
              startIcon={true}
              IconName={"searchGlass"}
              defaultValue={searchValue}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  onSearch(event)
                }
              }}
            />
          </RightSideContainer>
        </TitleContainer>
        <Box height={32} />

        <Table
          page={page}
          onChangeRowsPerPage={onChangeRowsPerPage}
          totalSize={kpiTransactionDetailPaging?.totalRecords}
          onChangePage={onChangePage}
          initRowsPerPage={pageSize}
          isLoading={isLoading}
        >
          <Table.Head>
            <Table.Row>
              <Table.Cell style={{ width: "5%", paddingLeft: "24px" }}>
                <Sarabun type="Subtitle1">{t("ลำดับ")}</Sarabun>
              </Table.Cell>
              <Table.Cell style={{ width: "10%" }}>
                <HeaderSortable
                  title={t(`${ManageKpiColumnTitle.KPI_TYPE}`)}
                  onSorting={onSorting}
                  sortingKey={sortingKey}
                />
              </Table.Cell>
              <Table.Cell style={{ width: "25%" }}>
                <HeaderSortable
                  title={t(`${ManageKpiColumnTitle.NAME}`)}
                  onSorting={onSorting}
                  sortingKey={sortingKey}
                />
              </Table.Cell>
              <Table.Cell style={{ width: "10%" }}>
                <HeaderSortable
                  title={t(`${ManageKpiColumnTitle.WEIGHT}`)}
                  onSorting={onSorting}
                  sortingKey={sortingKey}
                />
              </Table.Cell>
              <Table.Cell style={{ width: "10%" }}>
                <HeaderSortable
                  title={t(`${ManageKpiColumnTitle.TARGET}`)}
                  onSorting={onSorting}
                  sortingKey={sortingKey}
                />
              </Table.Cell>
              <Table.Cell style={{ width: "10%" }}>
                <HeaderSortable
                  title={t(`${ManageKpiColumnTitle.ACTUAL}`)}
                  onSorting={onSorting}
                  sortingKey={sortingKey}
                />
              </Table.Cell>
              <Table.Cell style={{ width: "15%" }}>
                <HeaderSortable
                  title={t(`${ManageKpiColumnTitle.COUNT}`)}
                  onSorting={onSorting}
                  sortingKey={sortingKey}
                />
              </Table.Cell>
              <Table.Cell style={{ width: "10%", paddingLeft: "0px" }}>{` `}</Table.Cell>
            </Table.Row>
          </Table.Head>

          {!isEmptyData ? (
            <Table.Body>
              {kpiTransactionDetailList.map((d, index) => {
                return (
                  <Table.Row key={d.id} style={{ cursor: "auto" }} hover>
                    <Table.Cell style={{ paddingLeft: "30px" }}>
                      <Sarabun>{index + 1 + (page - 1) * pageSize}</Sarabun>
                    </Table.Cell>
                    <Table.Cell>
                      <Sarabun>{kpiType(d.kpiType)}</Sarabun>
                    </Table.Cell>
                    <Table.Cell>
                      <NameCellContainer>
                        <Sarabun type="H6">{d.name}</Sarabun>
                        <Sarabun>{d.description}</Sarabun>
                      </NameCellContainer>
                    </Table.Cell>
                    <Table.Cell>
                      <Sarabun>{d.weight || 0}%</Sarabun>
                    </Table.Cell>
                    <Table.Cell>
                      <Sarabun>
                        {format2DecimalNumber(Number(d.target || 0), 2)} {t(d.customUnitType)}
                      </Sarabun>
                    </Table.Cell>
                    <Table.Cell>
                      <Sarabun>
                        {format2DecimalNumber(Number(d.actual || 0), 2)} {t(d.customUnitType)}
                      </Sarabun>
                    </Table.Cell>
                    <Table.Cell>
                      <Sarabun>{d.kpiTransactionCount || 0} คน</Sarabun>
                    </Table.Cell>
                    <Table.Cell style={{ paddingLeft: "0px" }}>
                      <div
                        style={{ textAlign: "center", cursor: "pointer" }}
                        onClick={onClickDetail.bind(null, d.id)}
                      >
                        <Icon iconName="eye" />
                        <Sarabun type="Subtitle2" color={PRIMARY_MAIN}>
                          {"ดูรายอะเอียด"}
                        </Sarabun>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          ) : (
            <Table.Body>
              <Table.Row>
                <Table.Cell align="center" colSpan={7}>
                  <Sarabun type="Subtitle1" color="#D7D9E0">
                    {t("role.noData")}
                  </Sarabun>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          )}
        </Table>
      </TableContainer>
    </>
  )
}

export default KpiTransactionDetailTable
