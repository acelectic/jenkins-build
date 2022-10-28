import { useCallback, useMemo, useState } from "react"
import Button from "../../../components/common/Button"
import Sarabun from "../../../components/common/Sarabun"
import Table from "../../../components/common/Table"
import Modal from "../../../components/common/Modal"
import DetailTemplate from "./DetailTemplateModal/DetailTemplate"
import Box from "@mui/material/Box"
import { useHistory } from "react-router-dom"
import paths from "../../../constants/paths"
import { makeStyles } from "@mui/styles"
import { useGetKpiTemplate } from "../../../services/kpi-template/kpi-template-query"
import Card from "../../../components/common/Card"
import {
  GRAYSCALE_DARKGRAY_40,
  GRAYSCALE_LIGHTGRAY_20,
  PRIMARY_MAIN,
  WHITE,
} from "../../../constants/colors"
import { useTranslation } from "react-i18next"
import Icon from "../../../components/common/Icon"
import dayjs from "dayjs"
import {
  TemplateDetailParams,
  TemplateOrder,
} from "../../../services/kpi-template/kpi-template-type"
import styled from "@emotion/styled"
import RemoveIcon from "@mui/icons-material/Remove"
import { EnumTemplateType } from "../CreateTemplate/SettingTemplateState"
import { ICreateTemplateFormType } from "../CreateTemplate"
import CopyTemplateModal from "./CopyTemplateModal"
import Authorize from "../../../components/Authorize"
import { PERMISSIONS } from "../../../services/enum-typed"

const RemoveIconStyled = styled(RemoveIcon)`
  width: 15px;
  height: 15px;
`

const useStyle = makeStyles((theme) => ({
  buttonCreateTemplate: {
    flex: 1,
    textAlign: "end",
  },
  allTemplateText: {
    display: "flex",
    marginLeft: 16,
  },
  tableRow: {
    backgroundColor: GRAYSCALE_LIGHTGRAY_20,
  },
  chooseTemplate: {
    display: "flex",
    flexDirection: "column",
  },
  createTemplate: {
    border: `1px solid ${GRAYSCALE_DARKGRAY_40}`,
    borderRadius: "8px",
    padding: "12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  copyCreateTemplate: {
    border: `1px solid ${GRAYSCALE_DARKGRAY_40}`,
    borderRadius: "8px",
    padding: "12px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  tableHeader: {
    display: "flex",
    alignItems: "center",
  },
}))

const ListDiv = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 100%;
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

enum EnumColumnName {
  TEMPLATE_NAME = "template_name",
  TEMPLATE_TYPE = "template_type",
  TEMPLATE_TOTAL = "template_total",
  TEMPLATE_CREATED_AT = "template_created_at",
}

const TemplateList = () => {
  const classes = useStyle()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const history = useHistory()

  const [orderName, setOrderName] = useState<EnumColumnName>()
  const [orderBy, setOrderBy] = useState<TemplateOrder>()

  const [templateDetail, setTemplateDetail] = useState<TemplateDetailParams>({
    templateId: "",
    templateType: EnumTemplateType.BEHAVIOR,
  })

  const { data: listKpiTemplate } = useGetKpiTemplate({
    limit: pageSize,
    page: page,
    orderBy: orderBy,
  })

  const [isOpenChooseCreateTemplate, setIsOpenChooseCreateTemplate] = useState(false)
  const { t } = useTranslation()

  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false)
  const [isOpenCopyTemplate, setIsOpenCopyTemplate] = useState(false)

  const onChangePage = useCallback((page: number) => {
    setPage(page)
  }, [])
  const onChangeRowsPerPage = useCallback((rowsPerPage: number) => {
    setPageSize(rowsPerPage)
    setPage(1)
  }, [])

  const onOpenCreateTemplate = useCallback(() => {
    setIsOpenChooseCreateTemplate(true)
  }, [])

  const onCloseCreateTemplate = useCallback(() => {
    setIsOpenChooseCreateTemplate(false)
  }, [])

  const onOpenDetailTemplate = useCallback((id: string, templateType: EnumTemplateType) => {
    setTemplateDetail({ templateType: templateType, templateId: id })
    setIsOpenDetailModal(true)
  }, [])

  const onCloseDetailTemplate = useCallback(() => {
    setIsOpenDetailModal(false)
  }, [])

  const onClickCreateTemplate = useCallback(() => {
    //setIsCreate(true)
    history.push(paths.templateCreate())
  }, [history])

  const onConfirmEditTemplate = useCallback(
    (templateItem: ICreateTemplateFormType) => {
      const { id, templateType } = templateItem

      setIsOpenDetailModal(false)
      history.push(
        paths.templateEdit({
          routeParam: {
            id: id!,
            templateType: templateType === EnumTemplateType.BEHAVIOR ? "behaviors" : "scales",
          },
        }),
      )
      //setIsCreate(true)
    },
    [history],
  )

  const onOpenCopyTemplate = useCallback(() => {
    setIsOpenCopyTemplate(true)
  }, [])

  const onClickColumnSort = useCallback(
    (columnName: EnumColumnName) => {
      setOrderName(columnName)
      setPage(1)
      switch (columnName) {
        case EnumColumnName.TEMPLATE_TYPE: {
          orderBy === TemplateOrder.TYPE_DESC
            ? setOrderBy(TemplateOrder.TYPE_ASC)
            : setOrderBy(TemplateOrder.TYPE_DESC)
          break
        }

        case EnumColumnName.TEMPLATE_TOTAL: {
          orderBy === TemplateOrder.TOPIC_AMOUNT_DESC
            ? setOrderBy(TemplateOrder.TOPIC_AMOUNT_ASC)
            : setOrderBy(TemplateOrder.TOPIC_AMOUNT_DESC)
          break
        }
        case EnumColumnName.TEMPLATE_CREATED_AT: {
          orderBy === TemplateOrder.CREATED_AT_DESC
            ? setOrderBy(TemplateOrder.CREATED_AT_ASC)
            : setOrderBy(TemplateOrder.CREATED_AT_DESC)
          break
        }
        default: {
          orderBy === TemplateOrder.NAME_DESC
            ? setOrderBy(TemplateOrder.NAME_ASC)
            : setOrderBy(TemplateOrder.NAME_DESC)
          break
        }
      }
    },
    [orderBy],
  )

  const isEmptyList = useMemo(() => !listKpiTemplate || !listKpiTemplate.data, [listKpiTemplate])

  return (
    <>
      <ListDiv>
        <div style={{ display: "flex" }}>
          <Sarabun type="H2" color={WHITE}>
            {t("จัดการเทมเพลตการประเมิน")}
          </Sarabun>
          <Authorize permissions={[PERMISSIONS.MANAGE_TEMPLATE_MANAGE_TEMPLATE_CREATE]}>
            <div className={classes.buttonCreateTemplate}>
              <Button onClick={onOpenCreateTemplate}>{t("+สร้างเทมเพลตใหม่")}</Button>
            </div>
          </Authorize>
        </div>
        <Box height={24} />
        <Card elevation={5} style={{ color: PRIMARY_MAIN }} color={PRIMARY_MAIN}>
          <Box height={28} />
          <div className={classes.allTemplateText}>
            <Icon iconName="hamburgerMenuList" />
            <Box width={8} />
            <Sarabun type="H4">{t("เทมเพลตทั้งหมด")}</Sarabun>
          </div>
          <Box height={28} />

          {isEmptyList ? (
            <EmptyListDiv>
              <Sarabun type="Body1">{t(`ไม่มีข้อมูล`)}</Sarabun>
            </EmptyListDiv>
          ) : (
            <Table
              page={page}
              onChangeRowsPerPage={onChangeRowsPerPage}
              totalSize={listKpiTemplate?.paging.totalRecords}
              onChangePage={onChangePage}
              initRowsPerPage={10}
            >
              <Table.Head>
                <Table.Row className={classes.tableRow}>
                  <Table.Cell>
                    <Sarabun type="Subtitle2">{t("ลำดับ")}</Sarabun>
                  </Table.Cell>
                  <Table.Cell>
                    <div
                      className={classes.tableHeader}
                      onClick={onClickColumnSort.bind(null, EnumColumnName.TEMPLATE_NAME)}
                    >
                      <Sarabun type="Subtitle2">{t("ชื่อเทมเพลต")}</Sarabun>
                      <Box width={8} />
                      {orderName === EnumColumnName.TEMPLATE_NAME ? (
                        <Icon
                          iconName={orderBy !== TemplateOrder.NAME_ASC ? "caretUp" : "caretDown"}
                          width={15}
                          height={15}
                        />
                      ) : (
                        <RemoveIconStyled />
                      )}
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div
                      className={classes.tableHeader}
                      onClick={onClickColumnSort.bind(null, EnumColumnName.TEMPLATE_TYPE)}
                    >
                      <Sarabun type="Subtitle2">{t("ประเภท")}</Sarabun>
                      <Box width={8} />
                      {orderName === EnumColumnName.TEMPLATE_TYPE ? (
                        <Icon
                          iconName={orderBy !== TemplateOrder.TYPE_ASC ? "caretUp" : "caretDown"}
                          width={15}
                          height={15}
                        />
                      ) : (
                        <RemoveIconStyled />
                      )}
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div
                      className={classes.tableHeader}
                      onClick={onClickColumnSort.bind(null, EnumColumnName.TEMPLATE_TOTAL)}
                    >
                      <Sarabun type="Subtitle2">{t("จำนวนหัวข้อ")}</Sarabun>
                      <Box width={8} />
                      {orderName === EnumColumnName.TEMPLATE_TOTAL ? (
                        <Icon
                          iconName={
                            orderBy !== TemplateOrder.TOPIC_AMOUNT_ASC ? "caretUp" : "caretDown"
                          }
                          width={15}
                          height={15}
                        />
                      ) : (
                        <RemoveIconStyled />
                      )}
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div
                      className={classes.tableHeader}
                      onClick={onClickColumnSort.bind(null, EnumColumnName.TEMPLATE_CREATED_AT)}
                    >
                      <Sarabun type="Subtitle2">{t("วันที่สร้าง")}</Sarabun>
                      <Box width={8} />
                      {orderName === EnumColumnName.TEMPLATE_CREATED_AT ? (
                        <Icon
                          iconName={
                            orderBy !== TemplateOrder.CREATED_AT_ASC ? "caretUp" : "caretDown"
                          }
                          width={15}
                          height={15}
                        />
                      ) : (
                        <RemoveIconStyled />
                      )}
                    </div>
                  </Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                {listKpiTemplate?.data.map((d, index) => {
                  const { name, createdAt, topicAmount, type, id } = d
                  return (
                    <Table.Row key={d.id}>
                      <Table.Cell>
                        <Sarabun>{index + 1 + (page - 1) * pageSize}</Sarabun>
                      </Table.Cell>
                      <Table.Cell>
                        <Sarabun type="Subtitle1">{name}</Sarabun>
                      </Table.Cell>
                      <Table.Cell>
                        <Sarabun type="Body2">
                          {type === EnumTemplateType.BEHAVIOR
                            ? "กำหนดหัวข้อให้แล้ว"
                            : "เทมเพลตเปล่า"}
                        </Sarabun>
                      </Table.Cell>
                      <Table.Cell>
                        <Sarabun type="Body2">{topicAmount ?? "-"}</Sarabun>
                      </Table.Cell>
                      <Table.Cell>
                        <Sarabun type="Body2">
                          {dayjs(createdAt).format("DD/MM/YYYY").toString()}
                        </Sarabun>
                      </Table.Cell>
                      <Table.Cell>
                        <div
                          style={{ textAlign: "center", cursor: "pointer" }}
                          onClick={onOpenDetailTemplate.bind(null, id, type)}
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
            </Table>
          )}
        </Card>
        <Modal
          visibleUseState={[isOpenChooseCreateTemplate, setIsOpenChooseCreateTemplate]}
          onCancel={onCloseCreateTemplate}
          showOkButton={false}
          showCancelButton={false}
        >
          <div className={classes.chooseTemplate}>
            <Sarabun type="H3">{t("เลือกวิธีสร้างเทมเพลต")}</Sarabun>
            <Box height={24} />
            <div className={classes.createTemplate} onClick={onClickCreateTemplate}>
              <Icon iconName="copy" width={64} height={64} />
              <Box width={16} />
              <div>
                <Sarabun type="H5">{t("สร้างเทมเพลตใหม่")}</Sarabun>
                <Sarabun type="Body2">{t("กรอกรายละเอียดเทมเพลตใหม่ด้วยตัวเอง")}</Sarabun>
              </div>
            </div>
            <Box height={18} />
            <div className={classes.copyCreateTemplate} onClick={onOpenCopyTemplate}>
              <Icon iconName="copy" width={64} height={64} />
              <Box width={16} />
              <div>
                <Sarabun type="H5">{t("คัดลอกจากเทมเพลตที่เคยสร้างแล้ว")}</Sarabun>
                <Sarabun type="Body2">
                  {t("สามารถสร้างเทมเพลตใหม่จากการคัดลอก และดัดแปลงเทมเพลตที่เคยสร้างไว้แล้วได้")}
                </Sarabun>
              </div>
            </div>
          </div>
        </Modal>
        <DetailTemplate
          isOpen={isOpenDetailModal}
          setIsOpen={setIsOpenDetailModal}
          onCancel={onCloseDetailTemplate}
          onConfirmDelete={onCloseDetailTemplate}
          onConfirmEdit={onConfirmEditTemplate}
          templateDetailParams={templateDetail}
        />
      </ListDiv>
      <CopyTemplateModal isOpen={isOpenCopyTemplate} setIsOpen={setIsOpenCopyTemplate} />
    </>
  )
}

export default TemplateList
