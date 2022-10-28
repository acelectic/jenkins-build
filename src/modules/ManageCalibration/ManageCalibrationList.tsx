import styled from "@emotion/styled"
import { useCallback, useMemo, useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import Icon from "../../components/common/Icon"
import Sarabun from "../../components/common/Sarabun"
import { GRAYSCALE_DARKGRAY_40, WHITE } from "../../constants/colors"
import Button from "../../components/common/Button"
import Input from "../../components/common/Input"
import { SortingState } from "../../services/enum-typed"
import HeaderSortable from "../../components/common/HeaderSortable"
import { useCalibrateSession } from "../../services/manage-calibration/manage-calibration-query"
import {
  ICalibrateSession,
  ICalibrateSessionBodyParams,
} from "../../services/manage-calibration/manage-calibration-type"
import CalibrationCardRow from "./Component/CalibrationCardRow"
import { AssessmentTemplateOrder } from "../../services/set-form/set-form-type"
import InfiniteScroll from "react-infinite-scroller"
import Loader from "../../components/Loader"
import CreateOptionModal from "./Component/CreateOptionModal"
import { useHistory } from "react-router-dom"
import paths from "../../constants/paths"
import { last } from "lodash"
import LoadingLayout from "../../components/common/LoadingLayout"
import Authorize from "../../components/Authorize"
import { PERMISSIONS } from "../../services/enum-typed"

const Body = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  gap: 24px;
  min-width: 698px;
  overflow-x: auto;
`

const PageTitleText = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const TitleButtonZone = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  gap: 24px;
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

  padding: 8px 16px;
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
  gap: 32px;
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

const ManageCalibrationList = () => {
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
      isCompleteState: false,
    },
  )

  //ไว้คอย handle ค่าของ params ที่เปลี่ยนไป
  useEffect(() => {
    setCalibrateSessionParams({
      q: searchText,
      orderBy: orderBy,
      limit: 5,
      isCompleteState: false,
    })
  }, [orderBy, searchText])

  //fecthData
  const {
    data: calibrationData,
    hasNextPage: isHaveNextPage,
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

  const totalRecord: number = useMemo(
    () => last(calibrationData?.pages)?.paging?.totalRecords || 0,
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
          sortOrder === SortingState.DESCENDING
            ? setOrderBy(AssessmentTemplateOrder.START_DATE_ASC)
            : setOrderBy(AssessmentTemplateOrder.START_DATE_DESC)
          break
        }
        default: {
          sortOrder === SortingState.DESCENDING
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

  const goToHistory = useCallback(() => {
    history.push(paths.calibrationHistory())
  }, [history])

  const [isOpenCreateOptionModal, setIsOpenCreateOptionModal] = useState<boolean>(false)

  const onOpenCreateOptionModal = useCallback(() => {
    setIsOpenCreateOptionModal(true)
  }, [])

  const onCloseCreateOptionModal = useCallback(() => {
    setIsOpenCreateOptionModal(false)
  }, [])

  const isEmptyList = useMemo(
    () => totalRecord === 0 || !calibrationData || !calibrationData.pages,
    [calibrationData, totalRecord],
  )

  return (
    <LoadingLayout isLoading={isLoading}>
      <Body>
        <PageTitleText>
          <Sarabun type="H2" color={WHITE}>
            {t(`จัดการวงปรับเทียบผลงาน (Calibration)`)}
          </Sarabun>
          <TitleButtonZone>
            <Button
              buttonType="text"
              onClick={goToHistory}
              backgroundColor={`${WHITE}`}
              width={100}
            >
              {t(`ดูประวัติ`)}
            </Button>
            <Authorize permissions={[PERMISSIONS.MANAGE_CALIBRATION_MANAGE_CALIBRATION_CREATE]}>
              <Button
                onClick={onOpenCreateOptionModal}
                startIcon={<Icon iconName="add" width={16} height={16} />}
              >
                {t(`สร้างวงปรับเทียบผลงานใหม่`)}
              </Button>
            </Authorize>
            <CreateOptionModal
              showConfirmModal={isOpenCreateOptionModal}
              setShowConfirmModal={setIsOpenCreateOptionModal}
              onClose={onCloseCreateOptionModal}
            />
          </TitleButtonZone>
        </PageTitleText>
        <Card>
          <ContentHeader>
            <HeaderText>
              <Icon iconName="menu" width={24} height={24} />
              <Sarabun type="H4">
                {t(`วงปรับเทียบผลงานที่ดำเนินการอยู่ (${totalRecord} วง)`)}
              </Sarabun>
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
                    textType="Subtitle2"
                    sortOrder={sortOrder}
                  />
                </Column>
                <Column
                  style={{
                    width: "15%",
                  }}
                >
                  <Sarabun type="Subtitle2">{t(`รอบประเมิน`)}</Sarabun>
                </Column>
                <Column
                  style={{
                    width: "15%",
                  }}
                >
                  <HeaderSortable
                    title={t(EnumColumnSortableTitle.CALIBRATION_DATE)}
                    sortingKey={currentColumnName}
                    onSorting={onSorting}
                    textType="Subtitle2"
                    sortOrder={sortOrder}
                  />
                </Column>
                <Column
                  style={{
                    width: "25%",
                  }}
                >
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
                hasMore={isHaveNextPage}
                loader={<Loader key={0} />}
              >
                {/**ซ้อนกัน 2 ชั้นเพราะ ชั้นนอกสุดเป็นหัวตัว Final ตัวในเป็น Sub-calibration */}
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

export default ManageCalibrationList
