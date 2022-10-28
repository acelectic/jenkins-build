import styled from "@emotion/styled"
import { Link } from "@mui/material"
import { useCallback, useMemo, useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import Icon from "../../../components/common/Icon"
import Sarabun from "../../../components/common/Sarabun"
import { GRAYSCALE_DARKGRAY_40, SECONDARY_LIGHT, WHITE } from "../../../constants/colors"

import Input from "../../../components/common/Input"
import { SortingState } from "../../../services/enum-typed"
import HeaderSortable from "../../../components/common/HeaderSortable"
import { useCalibrateSession } from "../../../services/manage-calibration/manage-calibration-query"
import {
  ICalibrateSession,
  ICalibrateSessionBodyParams,
} from "../../../services/manage-calibration/manage-calibration-type"
import CalibrationCardRow from "../Component/CalibrationCardRow"
import { AssessmentTemplateOrder } from "../../../services/set-form/set-form-type"
import InfiniteScroll from "react-infinite-scroller"
import Loader from "../../../components/Loader"
import paths from "../../../constants/paths"
import { useHistory } from "react-router-dom"
import { last } from "lodash"
import LoadingLayout from "../../../components/common/LoadingLayout"

const Body = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  gap: 24px;
  overflow: auto;
`

const GoToPrevious = styled(Link)`
  display: flex;
  cursor: pointer;
  align-items: center;
`

const PageTitleText = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Card = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 32px 24px;
  gap: 32px;
  background: ${WHITE};
  border: 1px solid ${GRAYSCALE_DARKGRAY_40};
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
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
  width: 100%;
`

const HeaderSortZone = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  flex-direction: row;
  padding: 10px 16px;
  gap: 16px;
  align-items: center;
`

const CalibrationCard = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid ${GRAYSCALE_DARKGRAY_40};
  border-radius: 8px;
  flex-direction: column;
  overflow: hidden;
`

const ListCardZone = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`

const EmptyListDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200px;
  width: 100%;
  margin-bottom: 100px;
  text-align: center;
  justify-content: center;
`

export enum EnumColumnSortableTitle {
  NAME = "ชื่อวงปรับเทียบผลงาน",
  CALIBRATION_DATE = "วันที่ปรับเทียบผลงาน",
}

const CalibrationHistory = () => {
  const { t } = useTranslation()
  const [lastPage, setLastPage] = useState<number>()

  //ColumnName ปัจจุบัน
  const [currentColumnName, setCurrentColumnName] = useState<EnumColumnSortableTitle>(
    EnumColumnSortableTitle.NAME,
  )

  //state ของ order ที่ใช้กับ component HeaderSortable
  const [sortOrder, setSortOrder] = useState<SortingState>(SortingState.ASCENDING)

  //stateOrderby ไว้ใช้ยิง api
  const [orderBy, setOrderBy] = useState<AssessmentTemplateOrder>(AssessmentTemplateOrder.NAME_ASC)

  //Name ที่จะ search หา
  const [searchText, setSearchText] = useState<string>("")

  //เอา value ยัดใส่ searchText
  const onSearchKeyPress = useCallback((event: any) => {
    const value = event.target.value
    setSearchText(value)
  }, [])

  //Params
  const [calibrateSessionParams, setCalibrateSessionParams] = useState<ICalibrateSessionBodyParams>(
    {
      q: searchText,
      orderBy: orderBy,
      limit: 5,
      isCompleteState: true,
    },
  )

  //ไว้คอย handle ค่าของ params ที่เปลี่ยนไป
  useEffect(() => {
    setCalibrateSessionParams({
      q: searchText,
      orderBy: orderBy,
      limit: 5,
      isCompleteState: true,
    })
  }, [orderBy, searchText])

  //fecthData
  const {
    data: calibrationData,
    hasNextPage,
    isFetching,
    isLoading,
    fetchNextPage,
  } = useCalibrateSession(calibrateSessionParams, lastPage)

  const fetchItems = useCallback(() => {
    if (!isFetching) {
      fetchNextPage()
    }
  }, [fetchNextPage, isFetching])

  const calibrateSessions: ICalibrateSession[] = useMemo(
    () =>
      calibrationData?.pages.reduce((acc: ICalibrateSession[], page) => {
        acc.push(...page.calibrateSessions)
        return acc
      }, []) || [],
    [calibrationData?.pages],
  )

  //เช็คว่า column ตอนนี้คือไร แล้ว orderBy อะไรอยู่ จากนั้นก็ไป setState ของ orderBy เพื่อ ยิง api
  const onClickColumnSort = useCallback(
    (currentColumnName, sortOrder) => {
      const currentPage = last(calibrationData?.pageParams) as number
      if (currentPage) {
        setLastPage(currentPage)
      }
      switch (currentColumnName) {
        case EnumColumnSortableTitle.CALIBRATION_DATE: {
          sortOrder === SortingState.ASCENDING
            ? setOrderBy(AssessmentTemplateOrder.START_DATE_ASC)
            : setOrderBy(AssessmentTemplateOrder.START_DATE_DESC)
          break
        }
        default: {
          sortOrder === SortingState.ASCENDING
            ? setOrderBy(AssessmentTemplateOrder.NAME_ASC)
            : setOrderBy(AssessmentTemplateOrder.NAME_DESC)
          break
        }
      }
    },
    [calibrationData?.pageParams],
  )

  //HandleonClick เวลากดที่ หัว column ที่ซ้อดดั๊ยยยย
  const onSorting = useCallback(
    (title, ordering) => {
      setCurrentColumnName(title)
      setSortOrder(ordering)
      onClickColumnSort(title, ordering)
    },
    [onClickColumnSort],
  )

  const history = useHistory()

  const gotoMainMenu = useCallback(() => {
    history.push(paths.manageCalibration())
  }, [history])

  const isEmptyList = useMemo(
    () =>
      last(calibrationData?.pages)?.paging?.totalRecords === 0 ||
      !calibrationData ||
      !calibrationData.pages,
    [calibrationData],
  )

  return (
    <LoadingLayout isLoading={isLoading}>
      <Body>
        <GoToPrevious underline="none" onClick={gotoMainMenu}>
          <Icon iconName="caretLeftLightBlue" width={16} height={16} />
          <Sarabun
            type="Subtitle2"
            color={SECONDARY_LIGHT}
            style={{
              borderBottom: `1.2px solid ${SECONDARY_LIGHT}`,
              paddingBottom: "2px",
            }}
          >
            {t(`ย้อนกลับ Main menu`)}
          </Sarabun>
        </GoToPrevious>
        <PageTitleText>
          <Sarabun type="H2" color={WHITE}>
            {t(`ประวัติวงปรับเทียบผลงานที่เสร็จสิ้นแล้ว`)}
          </Sarabun>
        </PageTitleText>
        <Card>
          <ContentHeader>
            <HeaderText>
              <Icon iconName="menu" width={24} height={24} />
              <Sarabun type="H4">{t(`วงปรับเทียบผลงานที่ดำเนินการเสร็จสิ้นแล้ว`)}</Sarabun>
            </HeaderText>
            <SearchDiv>
              <Sarabun type="Body2">{t(`ค้นหาจากชื่อวงปรับเทียบผลงาน`)}</Sarabun>
              <Input
                startIcon={true}
                IconName={"searchGlass"}
                placeholder={t(`ค้นหา`)}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    onSearchKeyPress(event)
                  }
                }}
                style={{ width: "320px" }}
              />
            </SearchDiv>
          </ContentHeader>

          {isEmptyList ? (
            <EmptyListDiv>
              <Sarabun type="Body1">{t(`ไม่มีข้อมูล`)}</Sarabun>
            </EmptyListDiv>
          ) : (
            <ContentZone>
              <HeaderSortZone>
                <Column
                  style={{
                    width: "30%",
                  }}
                >
                  <HeaderSortable
                    title={t(EnumColumnSortableTitle.NAME)}
                    sortingKey={currentColumnName}
                    onSorting={onSorting}
                    sortOrder={sortOrder}
                    textType="Subtitle2"
                  />
                </Column>

                <Column style={{ width: "15%" }}>
                  <Sarabun type="Subtitle2">{t(`รอบประเมิน`)}</Sarabun>
                </Column>
                <Column style={{ width: "15%" }}>
                  <HeaderSortable
                    title={t(EnumColumnSortableTitle.CALIBRATION_DATE)}
                    sortingKey={currentColumnName}
                    sortOrder={sortOrder}
                    onSorting={onSorting}
                    textType="Subtitle2"
                  />
                </Column>
                <Column style={{ width: "25%" }}>
                  <Sarabun type="Subtitle2">{t(`สถานะ`)}</Sarabun>
                </Column>
                <Column
                  style={{
                    width: "15%",
                  }}
                />
              </HeaderSortZone>

              <InfiniteScroll
                pageStart={lastPage}
                loadMore={fetchItems}
                hasMore={hasNextPage}
                loader={<Loader key={0} />}
              >
                <ListCardZone>
                  {calibrateSessions.map((calibrateSession) => {
                    return (
                      <CalibrationCard key={calibrateSession.id}>
                        <CalibrationCardRow
                          calibrateSession={calibrateSession.finalCalibrateSession}
                        />
                        {calibrateSession.subCalibrateSessions.map((subCalibrateSession) => {
                          return (
                            <CalibrationCardRow
                              calibrateSession={subCalibrateSession}
                              key={subCalibrateSession.id}
                              rowType="Sub"
                            />
                          )
                        })}
                      </CalibrationCard>
                    )
                  })}
                </ListCardZone>
              </InfiniteScroll>
            </ContentZone>
          )}
        </Card>
      </Body>
    </LoadingLayout>
  )
}

export default CalibrationHistory
