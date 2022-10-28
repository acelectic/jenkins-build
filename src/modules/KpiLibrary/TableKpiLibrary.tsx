import dayjs from "dayjs"
import { useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"
import Card from "../../components/common/Card"
import Icon from "../../components/common/Icon"
import Sarabun from "../../components/common/Sarabun"
import { GRAYSCALE_DARKGRAY_40, GRAYSCALE_LIGHTGRAY_20, PRIMARY } from "../../constants/colors"
import {
  useDeleteKpiLibrary,
  useGetKpiLibraryPage,
} from "../../services/kpi-library/kpi-library-query"
import {
  CreateKpiLibraryParams,
  KpiLibraryOrder,
} from "../../services/kpi-library/kpi-library-types"
import CreateKpiLibrary from "./CreateKpiLibrary"
import DeleteModal from "./DeleteModal"
import Authorize from "../../components/Authorize"
import { PERMISSIONS, SortingState } from "../../services/enum-typed"
import Table from "../../components/common/Table"
import HeaderSortable from "../../components/common/HeaderSortable"
import Loading from "../../components/common/Loading"

const Divider = styled.div`
  border-left: 2px solid ${GRAYSCALE_DARKGRAY_40};
  height: 30px;
`

const ActionButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  min-width: 64px;
`

const FlexAlignCenter = styled.div`
  display: flex;
  flex: 2;
  align-items: center;
`

const EmptyListDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200px;
  width: 100%;
  text-align: center;
  justify-content: center;
`

const ContentHeader = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0 24px 0;
`

const HeaderText = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`

export type IGoalRowProps = {}

enum EnumOrderName {
  NAME = "เป้าหมายของคุณ",
  CATEGORY = "หมวดหมู่",
  CREATED_AT = "วันที่สร้าง",
}

const TableKpiLibrary = () => {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [sortingKey, setSortingKey] = useState("")
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [deleteKpiLibraryId, setDeleteKpiLibraryId] = useState<string>("")
  const [, /* sortOrder */ setSortOrder] = useState<SortingState>(SortingState.UNSORTED)
  const [orderBy, setOrderBy] = useState<KpiLibraryOrder>(KpiLibraryOrder.NAME_ASC)

  const [isOpenCreateKpiLibrary, setIsOpenCreateKpiLibrary] = useState<boolean>(false)

  const onChangePage = useCallback((page: number) => {
    setPage(page)
  }, [])

  const onChangeRowsPerPage = useCallback((rowsPerPage: number) => {
    setPageSize(rowsPerPage)
    setPage(1)
  }, [])

  const { data: kpiLibraryList, isLoading: isKpiLibraryListLoading } = useGetKpiLibraryPage({
    meta: { perPage: pageSize, page: page, orderBy: orderBy },
  })
  const { mutate: deleteKpiLibrary } = useDeleteKpiLibrary()

  const [editDataKpiLibrary, setEditDataKpiLibrary] = useState<CreateKpiLibraryParams>()

  const onOkDeleteKpiLibrary = useCallback(
    (kpiLibraryId: string) => {
      deleteKpiLibrary(kpiLibraryId)
    },
    [deleteKpiLibrary],
  )

  const onSorting = useCallback(
    (title, ordering) => {
      setSortingKey(title)
      setSortOrder(ordering)
      setPage(1)
      switch (title) {
        case EnumOrderName.NAME: {
          orderBy === KpiLibraryOrder.NAME_DESC
            ? setOrderBy(KpiLibraryOrder.NAME_ASC)
            : setOrderBy(KpiLibraryOrder.NAME_DESC)
          break
        }
        case EnumOrderName.CATEGORY: {
          orderBy === KpiLibraryOrder.CATEGORY_DESC
            ? setOrderBy(KpiLibraryOrder.CATEGORY_ASC)
            : setOrderBy(KpiLibraryOrder.CATEGORY_DESC)
          break
        }
        case EnumOrderName.CREATED_AT: {
          orderBy === KpiLibraryOrder.CREATED_AT_DESC
            ? setOrderBy(KpiLibraryOrder.CREATED_AT_ASC)
            : setOrderBy(KpiLibraryOrder.CREATED_AT_DESC)
          break
        }
        default: {
          break
        }
      }
    },
    [orderBy],
  )
  const onDeleteClick = useCallback((kpiLibraryId: string) => {
    setDeleteKpiLibraryId(kpiLibraryId)
    setShowDeleteModal(true)
  }, [])
  const onOpenCreateKpiLibrary = useCallback(
    (values) => {
      setEditDataKpiLibrary(values)
      setIsOpenCreateKpiLibrary(true)
    },
    [setIsOpenCreateKpiLibrary],
  )

  const isEmptyList = useMemo(
    () =>
      !kpiLibraryList || !kpiLibraryList?.kpiLibraries || !kpiLibraryList.kpiLibraries.length
        ? true
        : false,
    [kpiLibraryList],
  )

  return (
    <Card style={{ padding: 16 }} styleCard={{ display: "block" }}>
      <ContentHeader>
        <HeaderText>
          <Icon iconName="menu" width={24} height={24} />
          <Sarabun type="H4">{t(`KPI Library ทั้งหมด`)}</Sarabun>
        </HeaderText>
      </ContentHeader>

      {isEmptyList ? (
        <EmptyListDiv>
          <Sarabun type="Body1">{t(`ไม่มีข้อมูล`)}</Sarabun>
        </EmptyListDiv>
      ) : (
        <Table
          page={page}
          onChangeRowsPerPage={onChangeRowsPerPage}
          totalSize={kpiLibraryList?.paging.totalRecords}
          onChangePage={onChangePage}
          initRowsPerPage={10}
        >
          <Table.Head style={{ backgroundColor: GRAYSCALE_LIGHTGRAY_20 }}>
            <Table.Row>
              <Table.Cell style={{ minWidth: 100 }}>
                <Sarabun type="Subtitle1">{t("ลำด้บ")}</Sarabun>
              </Table.Cell>
              <Table.Cell style={{ minWidth: 150 }}>
                <HeaderSortable
                  title={t(`${EnumOrderName.NAME}`)}
                  sortingKey={sortingKey}
                  onSorting={onSorting}
                />
              </Table.Cell>
              <Table.Cell style={{ minWidth: 150 }}>{}</Table.Cell>
              <Table.Cell style={{ minWidth: 120 }}>
                <HeaderSortable
                  title={t(`${EnumOrderName.CATEGORY}`)}
                  sortingKey={sortingKey}
                  onSorting={onSorting}
                />
              </Table.Cell>
              <Table.Cell style={{ minWidth: 120 }}>
                <HeaderSortable
                  title={t(`${EnumOrderName.CREATED_AT}`)}
                  sortingKey={sortingKey}
                  onSorting={onSorting}
                />
              </Table.Cell>
              <Table.Cell style={{ minWidth: 100 }}>{}</Table.Cell>
            </Table.Row>
          </Table.Head>

          <Loading isLoading={isKpiLibraryListLoading}>
            {!isEmptyList && (
              <Table.Body>
                {kpiLibraryList?.kpiLibraries.map((kpiLibrary, index) => {
                  const { name, description, category, createdAt, id } = kpiLibrary
                  return (
                    <Table.Row key={id} hover>
                      <Table.Cell>
                        <Sarabun type="Subtitle1">{index + 1 + (page - 1) * pageSize}</Sarabun>
                      </Table.Cell>
                      <Table.Cell>{`${name}`}</Table.Cell>
                      <Table.Cell>{`${description}`}</Table.Cell>
                      <Table.Cell>{`${category}`}</Table.Cell>
                      <Table.Cell>{`${dayjs(createdAt)
                        .format("DD/MM/YYYY  ")
                        .toString()}`}</Table.Cell>
                      <Table.Cell>
                        <FlexAlignCenter>
                          <Authorize
                            permissions={[PERMISSIONS.MANAGE_KPI_LIBRARY_MANAGE_KPI_LIBRARY_UPDATE]}
                          >
                            <Divider />
                            <ActionButton
                              onClick={onOpenCreateKpiLibrary.bind(null, {
                                id,
                                name,
                                description,
                                category,
                              })}
                            >
                              <Icon width={20} height={20} iconName="notePencil" />
                              <Sarabun size={10} weight={600} color={PRIMARY}>
                                แก้ไข
                              </Sarabun>
                            </ActionButton>
                          </Authorize>
                          <Authorize
                            permissions={[PERMISSIONS.MANAGE_KPI_LIBRARY_MANAGE_KPI_LIBRARY_DELETE]}
                          >
                            <Divider />
                            <ActionButton onClick={onDeleteClick.bind(null, id)}>
                              <Icon width={20} height={20} iconName="trash" />
                              <Sarabun size={10} weight={600} color={PRIMARY}>
                                ลบ
                              </Sarabun>
                            </ActionButton>
                          </Authorize>
                        </FlexAlignCenter>
                      </Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            )}
          </Loading>
        </Table>
      )}

      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        onOk={() => {
          onOkDeleteKpiLibrary(deleteKpiLibraryId)
          setShowDeleteModal(false)
        }}
        onClose={setShowDeleteModal.bind(null, false)}
      />
      <CreateKpiLibrary
        openCreateKpiLibrary={isOpenCreateKpiLibrary}
        setOpenCreateKpiLibrary={setIsOpenCreateKpiLibrary}
        dataKpiLibrary={editDataKpiLibrary}
        isCreate={false}
      />
    </Card>
  )
}

export default TableKpiLibrary
