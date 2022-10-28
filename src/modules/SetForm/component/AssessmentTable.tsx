import { Form } from "react-final-form"
import { useTranslation } from "react-i18next"
import Sarabun from "../../../components/common/Sarabun"
import Table from "../../../components/common/Table"
import { DropdownField, InputField } from "../../../components/fields"
import {
  ERROR,
  GRAYSCALE_DARKGRAY_60,
  GRAYSCALE_LIGHTGRAY_20,
  PRIMARY_MAIN,
  SEMANTIC_SUCCESS_DARK,
  WARNING,
} from "../../../constants/colors"
import styled from "@emotion/styled"
import {
  AssessmentType,
  ColumnSetFormTable,
  EnumCreateJobStatus,
  PERMISSIONS,
  SortingState,
} from "../../../services/enum-typed"
import { Box } from "@mui/material"
import { useCallback, useMemo, useState } from "react"
import DetailModal from "./DetailModal"
import {
  AssessmentList,
  AssessmentTemplateOrder,
  AssessmentTypeKpiTemplateResponse,
  TemplateType,
} from "../../../services/set-form/set-form-type"
import { normalizeDate } from "../../../utils/helper"
import Icon from "../../../components/common/Icon"
import { OnChange } from "react-final-form-listeners"
import Authorize from "../../../components/Authorize"
import { useGetCurrentUserPermissions } from "../../../services/auth/auth-query"
import HeaderSortable from "../../../components/common/HeaderSortable"
import { isEmpty } from "lodash"

const ActiveBox = styled.div({
  display: "flex",
  alignItems: "center",
})

const ActiveCircleStatus = styled.div<{ isActive: boolean }>(({ isActive }) => ({
  width: 8,
  height: 8,
  backgroundColor: isActive ? SEMANTIC_SUCCESS_DARK : GRAYSCALE_DARKGRAY_60,
  borderRadius: "50%",
}))

export type IAssessmentMockData = {
  name: string
  type: AssessmentType
  startDate: string
  endDate: string
  createDate: string
  status: string
}

export enum EnumSetFormTemplateType {
  TOTAL = "total",
  KPI = "kpi",
  PROBATION = "probation",
  ONE_YEAR = "one_year",
}

type IAssessmentProps = {
  type?: "current" | "end"
  data?: AssessmentList
  orderUseStates: [
    AssessmentTemplateOrder,
    React.Dispatch<React.SetStateAction<AssessmentTemplateOrder>>,
  ]
  isLoading?: boolean
  pageStates: [number, React.Dispatch<React.SetStateAction<number>>]
  perPageStates: [number, React.Dispatch<React.SetStateAction<number>>]
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
  setFormType: React.Dispatch<React.SetStateAction<EnumSetFormTemplateType>>
}

const AssessmentTable = (props: IAssessmentProps) => {
  const {
    type = "current",
    data,
    orderUseStates,
    isLoading = false,
    pageStates,
    perPageStates,
    setSearchValue,
    setFormType,
  } = props
  const { t } = useTranslation()
  const [page, setPage] = pageStates
  const [pageSize, setPageSize] = perPageStates

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [templateType, setTemplateType] = useState<TemplateType>(TemplateType.ASSESSMENT)
  const [assessmentType, setAssessmentType] = useState<AssessmentTypeKpiTemplateResponse | null>()
  const [templateId, setTemplateId] = useState<string>("")
  const [, /* orderBy */ setOrderBy] = orderUseStates
  const [sortingKey, setSortingKey] = useState("")
  const [sortOrder, setSortOrder] = useState<SortingState>(SortingState.DESCENDING)

  const { data: permissions } = useGetCurrentUserPermissions()
  const onSearch = useCallback(
    (event: any) => {
      const value = event.target.value
      setSearchValue(value)
    },
    [setSearchValue],
  )

  const onSorting = useCallback(
    (title, ordering) => {
      setSortingKey(title)
      setSortOrder(ordering)
      setPage(1)
      switch (title) {
        case ColumnSetFormTable.TYPE: {
          sortOrder === SortingState.DESCENDING
            ? setOrderBy(AssessmentTemplateOrder.TYPE_ASC)
            : setOrderBy(AssessmentTemplateOrder.TYPE_DESC)
          break
        }
        case ColumnSetFormTable.START_DATE: {
          sortOrder === SortingState.DESCENDING
            ? setOrderBy(AssessmentTemplateOrder.START_DATE_ASC)
            : setOrderBy(AssessmentTemplateOrder.START_DATE_DESC)
          break
        }
        case ColumnSetFormTable.END_DATE: {
          sortOrder === SortingState.DESCENDING
            ? setOrderBy(AssessmentTemplateOrder.END_DATE_ASC)
            : setOrderBy(AssessmentTemplateOrder.END_DATE_DESC)
          break
        }
        case ColumnSetFormTable.CREATED_AT: {
          sortOrder === SortingState.DESCENDING
            ? setOrderBy(AssessmentTemplateOrder.CREATED_AT_ASC)
            : setOrderBy(AssessmentTemplateOrder.CREATED_AT_DESC)
          break
        }
        case ColumnSetFormTable.STATUS: {
          sortOrder === SortingState.DESCENDING
            ? setOrderBy(AssessmentTemplateOrder.ACTIVE_STATUS_ASC)
            : setOrderBy(AssessmentTemplateOrder.ACTIVE_STATUS_DESC)
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
    [setOrderBy, setPage, sortOrder],
  )
  const onClickOpenModal = useCallback(() => {
    setIsOpenModal(true)
  }, [])

  const optionFormTypes = useMemo(() => {
    const options: BaseOptionType[] = [
      {
        label: "ดูทั้งหมด",
        value: EnumSetFormTemplateType.TOTAL,
      },
    ]
    if (permissions?.includes(PERMISSIONS.MANAGE_FORMS_ONE_YEAR_READ)) {
      options.push({
        label: "ครบรอบ 1 ปี",
        value: EnumSetFormTemplateType.ONE_YEAR,
      })
    }
    if (permissions?.includes(PERMISSIONS.MANAGE_FORMS_PROBATION_READ)) {
      options.push({
        label: "ทดลองงาน",
        value: EnumSetFormTemplateType.PROBATION,
      })
    }
    if (permissions?.includes(PERMISSIONS.MANAGE_FORMS_KPI_READ)) {
      options.push({
        label: "การประเมินประจำไตรมาส	",
        value: EnumSetFormTemplateType.KPI,
      })
    }
    return options
  }, [permissions])

  const onChangeOptionFormType = useCallback(
    (formType: EnumSetFormTemplateType) => {
      setFormType(formType)
    },
    [setFormType],
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

  const templateList = useMemo(() => {
    return data?.data
  }, [data?.data])

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", padding: "10px", alignItems: "center" }}>
          <Icon iconName="hamburgerMenuList" />

          {type === "current" ? (
            <>
              <Sarabun type="H4">{`แบบฟอร์มที่ดำเนินการอยู่`}&nbsp;</Sarabun>
              {!isLoading && (
                <Sarabun type="H4">
                  {`(${data?.paging.totalRecords ? data?.paging.totalRecords : "0"} แบบฟอร์ม)`}
                </Sarabun>
              )}
            </>
          ) : (
            <>
              <Sarabun type="H4">{t("แบบฟอร์มที่สิ้นสุดการดำเนินการแล้ว")}</Sarabun>
            </>
          )}
        </div>
        <Form onSubmit={() => {}}>
          {({ handleSubmit, values }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div style={{ display: "flex" }}>
                  <InputField
                    name="searchName"
                    placeholder={t("ค้นหา")}
                    label="ค้นหาจากชื่อฟอร์ม"
                    IconName="searchGlass"
                    startIcon={true}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        onSearch(event)
                      }
                    }}
                  />
                  <Box width={16} />
                  <DropdownField
                    name="selectType"
                    label="ประเภทของแบบฟอร์ม"
                    options={optionFormTypes}
                    initialValue={EnumSetFormTemplateType.TOTAL}
                  />
                  <OnChange name="selectType">
                    {(value) => {
                      onChangeOptionFormType(value)
                    }}
                  </OnChange>
                </div>
              </form>
            )
          }}
        </Form>
      </div>
      <Box height={20} />

      <Table
        page={page}
        onChangeRowsPerPage={onChangeRowsPerPage}
        totalSize={data?.paging.totalRecords}
        onChangePage={onChangePage}
        initRowsPerPage={pageSize}
        isLoading={isLoading}
      >
        <Table.Head>
          <Table.Row style={{ backgroundColor: `${GRAYSCALE_LIGHTGRAY_20}` }}>
            <Table.Cell style={{ width: "8%", paddingLeft: "24px" }}>
              <Sarabun type="Subtitle1" style={{ minWidth: 40 }}>
                {t("ลำดับ")}
              </Sarabun>
            </Table.Cell>
            <Table.Cell style={{ width: "25%" }}>
              <HeaderSortable
                title={t(`${ColumnSetFormTable.NAME}`)}
                sortingKey={sortingKey}
                onSorting={onSorting}
              />
            </Table.Cell>
            <Table.Cell style={{ width: "13%" }}>
              <HeaderSortable
                title={t(`${ColumnSetFormTable.TYPE}`)}
                sortingKey={sortingKey}
                onSorting={onSorting}
              />
            </Table.Cell>
            <Table.Cell style={{ width: "13%" }}>
              <HeaderSortable
                title={t(`${ColumnSetFormTable.START_DATE}`)}
                sortingKey={sortingKey}
                onSorting={onSorting}
              />
            </Table.Cell>
            <Table.Cell style={{ width: "13%" }}>
              <HeaderSortable
                title={t(`${ColumnSetFormTable.END_DATE}`)}
                sortingKey={sortingKey}
                onSorting={onSorting}
              />
            </Table.Cell>
            <Table.Cell style={{ width: "10%" }}>
              <HeaderSortable
                title={t(`${ColumnSetFormTable.CREATED_AT}`)}
                sortingKey={sortingKey}
                onSorting={onSorting}
              />
            </Table.Cell>
            <Table.Cell style={{ width: "10%" }}>
              <HeaderSortable
                title={t(`${ColumnSetFormTable.STATUS}`)}
                sortingKey={sortingKey}
                onSorting={onSorting}
              />
            </Table.Cell>
            <Table.Cell style={{ width: "10%" }}>{t("")}</Table.Cell>
          </Table.Row>
        </Table.Head>

        {!isEmpty(templateList) ? (
          <Table.Body>
            {templateList?.map((d, index) => {
              return (
                <Table.Row key={d?.id || index}>
                  <Table.Cell style={{ paddingLeft: "30px" }}>
                    <Sarabun>{index + 1 + (page - 1) * pageSize}</Sarabun>
                  </Table.Cell>
                  <Table.Cell>{d.name}</Table.Cell>
                  <Table.Cell>
                    {d.type === TemplateType.KPI
                      ? t(`การประเมินประจำไตรมาส`)
                      : d.assessmentType === AssessmentTypeKpiTemplateResponse.PROBATION
                      ? t(`ทดลองงาน`)
                      : t(`ครบรอบ 1 ปี`)}
                  </Table.Cell>
                  <Table.Cell>{d.startDate !== null ? normalizeDate(d.startDate) : "-"}</Table.Cell>
                  <Table.Cell>{d.endDate !== null ? normalizeDate(d.endDate) : "-"}</Table.Cell>
                  <Table.Cell>{d.createdAt !== null ? normalizeDate(d.createdAt) : "-"}</Table.Cell>
                  <Table.Cell>
                    {type === "end" ? (
                      <ActiveBox>
                        <ActiveCircleStatus isActive={false} />
                        <Box width={8} />
                        {/* ถ้าเป็น kpi แสดงคำว่า สิ้นสุดการใช้งาน เท่านั้น */}
                        <Sarabun type="Body2" color={`${GRAYSCALE_DARKGRAY_60}`}>
                          {d.type === TemplateType.KPI ? t("สิ้นสุดการใช้งาน") : t("ไม่เปิดใช้งาน")}
                        </Sarabun>
                      </ActiveBox>
                    ) : (
                      <ActiveBox>
                        <ActiveCircleStatus
                          isActive={d.isActive}
                          style={{
                            backgroundColor:
                              d.createJobStatus === EnumCreateJobStatus.IN_PROGRESS
                                ? WARNING
                                : d.createJobStatus === EnumCreateJobStatus.ERROR
                                ? ERROR
                                : d.isActive
                                ? SEMANTIC_SUCCESS_DARK
                                : GRAYSCALE_DARKGRAY_60,
                          }}
                        />
                        <Box width={8} />
                        <Sarabun
                          type="Body2"
                          color={`${
                            d.createJobStatus === EnumCreateJobStatus.IN_PROGRESS
                              ? WARNING
                              : d.createJobStatus === EnumCreateJobStatus.ERROR
                              ? ERROR
                              : d.isActive
                              ? SEMANTIC_SUCCESS_DARK
                              : GRAYSCALE_DARKGRAY_60
                          }`}
                        >
                          {d.createJobStatus === EnumCreateJobStatus.IN_PROGRESS
                            ? t("กำลังประมวลผล")
                            : d.createJobStatus === EnumCreateJobStatus.ERROR
                            ? t("เกิดข้อผิดพลาด")
                            : d.isActive
                            ? t("กำลังใช้งาน")
                            : t("ยังไม่เริ่มใช้งาน")}
                        </Sarabun>
                      </ActiveBox>
                    )}
                  </Table.Cell>
                  <Authorize
                    permissions={[
                      PERMISSIONS.MANAGE_FORMS_ONE_YEAR_READ,
                      PERMISSIONS.MANAGE_FORMS_PROBATION_READ,
                      PERMISSIONS.MANAGE_FORMS_KPI_READ,
                    ]}
                  >
                    <Table.Cell>
                      <div
                        style={{ textAlign: "center", cursor: "pointer" }}
                        onClick={() => {
                          onClickOpenModal()
                          setTemplateType(d.type)
                          setTemplateId(d.id)
                          setAssessmentType(d.assessmentType)
                        }}
                      >
                        <Icon iconName="eye" />
                        <Sarabun type="Subtitle2" color={PRIMARY_MAIN}>
                          {"ดูรายอะเอียด"}
                        </Sarabun>
                      </div>
                    </Table.Cell>
                  </Authorize>
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

      <DetailModal
        visibleUseStates={[isOpenModal, setIsOpenModal]}
        type={templateType}
        templateId={templateId}
        assessmentType={assessmentType ?? AssessmentTypeKpiTemplateResponse.KPI}
      />
    </>
  )
}

export default AssessmentTable
