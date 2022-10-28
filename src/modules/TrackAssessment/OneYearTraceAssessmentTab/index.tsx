import styled from "@emotion/styled"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import Icon from "../../../components/common/Icon"
import Sarabun from "../../../components/common/Sarabun"
import { GRAYSCALE_DARKGRAY_40, GRAYSCALE_LIGHTGRAY_20, WHITE } from "../../../constants/colors"

import Input from "../../../components/common/Input"
import { EnumOneYearStatusTrackFilter, SortingState } from "../../../services/enum-typed"
import HeaderSortable from "../../../components/common/HeaderSortable"
import {
  OneYearParams,
  IOneYearTrackAssessmentData,
  OneYearTrackOrderBy,
} from "../../../services/track-assessment/track-assessment-type"
import OneYearTrackAssessmentRow from "./OneYearTraceAssessmentRow"
import LoadingLayout from "../../../components/common/LoadingLayout"
import { useGetOneYearTrackAssessment } from "../../../services/track-assessment/track-assessment-querry"
import { Table } from "../../../components/common/Table"
import Dropdown from "../../../components/common/Dropdown"

const Card = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 16px;
  gap: 24px;
  background: ${WHITE};
  border-bottom: 0;
  height: 100%;
  min-height: 580px;
`

const ContentHeader = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const HeaderText = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`

const SearchDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const ContentZone = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

const TitleColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const TableHeader = styled(Table.Head)`
  border-radius: 8px 8px 0 0;
  border-bottom: 1px solid ${GRAYSCALE_DARKGRAY_40};
  background-color: ${GRAYSCALE_LIGHTGRAY_20};
`

const TableCell = styled(Table.Cell)`
  padding: 8px 16px;
`

const EmptyDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  height: 100%;
  align-items: center;
  min-height: 320px;
`

export enum EnumOneYearColumnSortableTitle {
  NAME = "ชื่อ",
  STORE = "หน่วยงาน",
  COMPANY = "บริษัท",
  DUE_DATE = "วันที่ครบกำหนดในการเปลี่ยนสถานะ",
  STATUS = "สถานะ",
}

type IOneYearTraceAssessmentTabProps = {
  setNoticeNumber: React.Dispatch<React.SetStateAction<number>>
}

const OneYearTrackAssessmentTab = (props: IOneYearTraceAssessmentTabProps) => {
  const { setNoticeNumber } = props
  const { t } = useTranslation()

  //ColumnName ปัจจุบัน
  const [currentColumnName, setCurrentColumnName] = useState<EnumOneYearColumnSortableTitle>(
    EnumOneYearColumnSortableTitle.NAME,
  )

  //state ของ order ที่ใช้กับ component HeaderSortable
  const [sortOrder, setSortOrder] = useState<SortingState>(SortingState.ASCENDING)

  //stateOrderby ไว้ใช้ยิง api
  const [orderBy, setOrderBy] = useState<OneYearTrackOrderBy>(OneYearTrackOrderBy.NAME_ASC)

  //Name ที่จะ search หา
  const [searchText, setSearchText] = useState<string>("")

  //เอา value ยัดใส่ searchText
  const onSearchKeyPress = useCallback((event: any) => {
    const value = event.target.value
    setSearchText(value)
  }, [])

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [filterByStatus, setFilterByStatus] = useState<EnumOneYearStatusTrackFilter>(
    EnumOneYearStatusTrackFilter.ALL,
  )

  const onChangePage = useCallback((page: number) => {
    setPage(page)
  }, [])
  const onChangeRowsPerPage = useCallback((rowsPerPage: number) => {
    setPageSize(rowsPerPage)
    setPage(1)
  }, [])

  const [oneYearTrackAssessmentParams, setOneYearTrackAssessmentParams] = useState<OneYearParams>({
    page: page,
    orderBy: orderBy,
    q: searchText,
    limit: pageSize,
    filterByStatus: filterByStatus,
  })

  const { data, isLoading, isFetching } = useGetOneYearTrackAssessment(oneYearTrackAssessmentParams)

  //ไว้คอย handle ค่าของ params ที่เปลี่ยนไป
  useEffect(() => {
    setOneYearTrackAssessmentParams({
      page: page,
      orderBy: orderBy,
      q: searchText,
      limit: pageSize,
      filterByStatus: filterByStatus,
    })
  }, [filterByStatus, orderBy, page, pageSize, searchText])

  const trackAssessmentDataList: IOneYearTrackAssessmentData[] = useMemo(
    () => data?.oneYearTransactions.data || [],
    [data?.oneYearTransactions.data],
  )

  const isEmptyData = useMemo(
    () =>
      trackAssessmentDataList.length === 0 ||
      !data ||
      !data.oneYearTransactions ||
      !data.oneYearTransactions.data
        ? true
        : false,
    [data, trackAssessmentDataList.length],
  )

  //อาไว้ Set ตัวค่าของ จำนวนการประเมินทดลองงาน ซึ่งจะ Realtime ทุกครั้งที่ fetch ใหม่
  useEffect(() => {
    setNoticeNumber(data?.probationNotificationAmount || 0)
  }, [data?.probationNotificationAmount, setNoticeNumber])

  //เช็คว่า column ตอนนี้คือไร แล้ว orderBy อะไรอยู่ จากนั้นก็ไป setState ของ orderBy เพื่อ ยิง api
  const onClickColumnSort = useCallback((currentColumnName, sortOrder) => {
    switch (currentColumnName) {
      case EnumOneYearColumnSortableTitle.DUE_DATE: {
        sortOrder === SortingState.ASCENDING
          ? setOrderBy(OneYearTrackOrderBy.END_DATE_ASC)
          : setOrderBy(OneYearTrackOrderBy.END_DATE_DESC)
        break
      }
      case EnumOneYearColumnSortableTitle.COMPANY: {
        sortOrder === SortingState.ASCENDING
          ? setOrderBy(OneYearTrackOrderBy.COMPANY_ASC)
          : setOrderBy(OneYearTrackOrderBy.COMPANY_DESC)
        break
      }
      case EnumOneYearColumnSortableTitle.STORE: {
        sortOrder === SortingState.ASCENDING
          ? setOrderBy(OneYearTrackOrderBy.STORE_ASC)
          : setOrderBy(OneYearTrackOrderBy.STORE_DESC)
        break
      }
      case EnumOneYearColumnSortableTitle.STATUS: {
        sortOrder === SortingState.ASCENDING
          ? setOrderBy(OneYearTrackOrderBy.STATUS_ASC)
          : setOrderBy(OneYearTrackOrderBy.STATUS_DESC)
        break
      }
      default: {
        sortOrder === SortingState.ASCENDING
          ? setOrderBy(OneYearTrackOrderBy.NAME_ASC)
          : setOrderBy(OneYearTrackOrderBy.NAME_DESC)
        break
      }
    }
  }, [])

  //HandleonClick เวลากดที่ หัว column ที่ซ้อดดั๊ยยยย
  const onSorting = useCallback(
    (title, ordering) => {
      setCurrentColumnName(title)
      setSortOrder(ordering)
      setPage(1)
      onClickColumnSort(title, ordering)
    },
    [onClickColumnSort],
  )

  const handleOnChange = useCallback((value) => {
    setFilterByStatus(value)
  }, [])

  return (
    <Card>
      <ContentHeader>
        <TitleColumn>
          <HeaderText>
            <Icon iconName="menu" width={24} height={24} />
            <Sarabun type="H5">{t(`การประเมิน 1 ปี ที่ดำเนินการอยู่`)}</Sarabun>
          </HeaderText>
          <Sarabun type="Caption" style={{ marginLeft: "32px" }}>
            {t(`แสดงข้อมูลการประเมินประจำไตรมาสของพนักงานที่คุณมีสิทธิดูได้`)}
          </Sarabun>
        </TitleColumn>
        <div style={{ display: "flex", columnGap: "12px" }}>
          <SearchDiv>
            <Sarabun type="Body2">{t(`สถานะ`)}</Sarabun>
            <Dropdown
              options={data?.oneYearOption.assessmentStatus}
              onChange={handleOnChange}
              defaultValue={EnumOneYearStatusTrackFilter.ALL}
            />
          </SearchDiv>
          <SearchDiv>
            <Sarabun type="Body2">{t(`ค้นหาจากคีย์เวิร์ด`)}</Sarabun>
            <Input
              startIcon={true}
              IconName={"searchGlass"}
              placeholder={t(`เช่น ชื่อ, EID, หน่วยงาน, สายงาน, บริษัท`)}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  onSearchKeyPress(event)
                }
              }}
              style={{ width: "320px", marginTop: "2px" }}
            />
          </SearchDiv>
        </div>
      </ContentHeader>
      <LoadingLayout isLoading={isLoading || isFetching}>
        <ContentZone>
          {isEmptyData ? (
            <EmptyDiv>
              <Sarabun type="Body1">{t(`ไม่มีข้อมูล`)}</Sarabun>
            </EmptyDiv>
          ) : (
            <Table
              page={page}
              onChangeRowsPerPage={onChangeRowsPerPage}
              totalSize={data?.oneYearTransactions.paging.totalRecords}
              onChangePage={onChangePage}
              initRowsPerPage={10}
            >
              <TableHeader>
                <Table.Row>
                  <Table.Cell style={{ minWidth: "80px" }}>
                    <Sarabun type="Subtitle2">{t("ลำดับ")}</Sarabun>
                  </Table.Cell>
                  <TableCell>
                    <HeaderSortable
                      title={t(EnumOneYearColumnSortableTitle.NAME)}
                      sortingKey={currentColumnName}
                      onSorting={onSorting}
                      sortOrder={sortOrder}
                      textType="Subtitle2"
                    />
                  </TableCell>
                  <TableCell>
                    <HeaderSortable
                      title={t(EnumOneYearColumnSortableTitle.STORE)}
                      sortingKey={currentColumnName}
                      onSorting={onSorting}
                      sortOrder={sortOrder}
                      textType="Subtitle2"
                    />
                  </TableCell>
                  <TableCell>
                    <HeaderSortable
                      title={t(EnumOneYearColumnSortableTitle.COMPANY)}
                      sortingKey={currentColumnName}
                      onSorting={onSorting}
                      sortOrder={sortOrder}
                      textType="Subtitle2"
                    />
                  </TableCell>
                  <TableCell>
                    <HeaderSortable
                      style={{ display: "flex", justifyContent: "center" }}
                      title={t(EnumOneYearColumnSortableTitle.DUE_DATE)}
                      sortingKey={currentColumnName}
                      onSorting={onSorting}
                      sortOrder={sortOrder}
                      textType="Subtitle2"
                    />
                  </TableCell>
                  <TableCell>
                    <HeaderSortable
                      style={{ display: "flex", justifyContent: "center" }}
                      title={t(EnumOneYearColumnSortableTitle.STATUS)}
                      sortingKey={currentColumnName}
                      sortOrder={sortOrder}
                      onSorting={onSorting}
                      textType="Subtitle2"
                    />
                  </TableCell>
                </Table.Row>
              </TableHeader>

              <LoadingLayout isLoading={isLoading}>
                <Table.Body>
                  {trackAssessmentDataList.map((trackData, index) => {
                    return (
                      <OneYearTrackAssessmentRow
                        trackData={trackData}
                        key={`${trackData.Id}`}
                        pageSize={pageSize}
                        indexTrackData={index}
                        currentPage={page}
                      />
                    )
                  })}
                </Table.Body>
              </LoadingLayout>
            </Table>
          )}
        </ContentZone>
      </LoadingLayout>
    </Card>
  )
}

export default OneYearTrackAssessmentTab
