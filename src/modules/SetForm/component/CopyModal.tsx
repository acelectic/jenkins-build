import { Box } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import InfiniteScroll from "react-infinite-scroller"
import { useHistory } from "react-router-dom"
import Button from "../../../components/common/Button"
import { Divider } from "../../../components/common/Divider"
import Input from "../../../components/common/Input"
import Modal from "../../../components/common/Modal"
import Sarabun from "../../../components/common/Sarabun"
import Loader from "../../../components/Loader"
import { GRAYSCALE_DARKGRAY_40 } from "../../../constants/colors"
import paths from "../../../constants/paths"
import { useGetAssessmentTemplateListPage } from "../../../services/set-form/set-form-query"
import { AssessmentRow, AssessmentTemplateOrder } from "../../../services/set-form/set-form-type"
import { TemplateType } from "../../../services/enum-typed"

const useStyle = makeStyles((theme) => ({
  columnModal: {
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  },
  areaTemplateList: {
    border: `1px solid ${GRAYSCALE_DARKGRAY_40}`,
    borderRadius: 8,
    minWidth: 575,
  },
  templateDetail: {
    display: "flex",
    padding: 16,
  },
  buttonArea: {
    display: "flex",
    flex: 1,
    justifyContent: "end",
    alignItems: "center",
  },
}))

type ICopyModalProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  templateType: TemplateType
}

const CopyModal = (props: ICopyModalProps) => {
  const { isOpen, setIsOpen, templateType } = props

  const [searchTemplateName, setSearchTemplateName] = useState()

  const { t } = useTranslation()

  const classes = useStyle()

  const history = useHistory()

  const {
    data: listTemplate,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useGetAssessmentTemplateListPage({
    useInProgressList: {
      isSelected: true,
      params: {
        q: searchTemplateName,
        orderBy: AssessmentTemplateOrder.CREATED_AT_DESC,
        limit: 3,
      },
    },
    useFinishedList: {
      isSelected: false,
    },
    useFormDetail: { isSelected: false },
  })

  const fetchItems = useCallback(() => {
    if (!isFetching) {
      fetchNextPage()
    }
  }, [fetchNextPage, isFetching])

  const onSearch = useCallback(
    (event: any) => {
      const value = event.target.value
      setSearchTemplateName(value)
    },
    [setSearchTemplateName],
  )

  const onClickSelect = useCallback(
    (templateId: string, templateType: TemplateType) => {
      if (templateType === TemplateType.KPI) {
        history.push(
          paths.kpiFormCopy({
            routeParam: {
              assessmentTemplateId: templateId,
            },
          }),
        )
      } else {
        if (templateType === TemplateType.PROBATION) {
          history.push(
            paths.probationFormCopy({
              routeParam: {
                assessmentTemplateId: templateId,
              },
            }),
          )
        } else if (templateType === TemplateType.ONE_YEAR) {
          history.push(
            paths.oneYearFormCopy({
              routeParam: {
                assessmentTemplateId: templateId,
              },
            }),
          )
        }
      }
    },
    [history],
  )

  const filterList = useCallback((templateType: TemplateType, items: AssessmentRow[]) => {
    if (templateType === TemplateType.KPI) {
      return items.filter((e) => e.assessmentType === null)
    } else if (templateType === TemplateType.PROBATION) {
      return items.filter((e) => e.assessmentType === "probation")
    } else if (templateType === TemplateType.ONE_YEAR) {
      return items.filter((e) => e.assessmentType === "1year")
    }
  }, [])

  const titleText = useMemo(() => {
    if (templateType === TemplateType.KPI) {
      return "คัดลอกแบบฟอร์มประจำไตรมาส​"
    } else if (templateType === TemplateType.PROBATION) {
      return "คัดลอกแบบฟอร์มทดลองงาน​"
    } else if (templateType === TemplateType.ONE_YEAR) {
      return "คัดลอกแบบฟอร์มครบรอบ 1 ปี​"
    } else {
      return ""
    }
  }, [templateType])

  return (
    <Modal
      visibleUseState={[isOpen, setIsOpen]}
      showCancelButton={false}
      showOkButton={false}
      isLoading={isLoading}
    >
      <div className={classes.columnModal}>
        <Sarabun type="H3">{titleText}</Sarabun>
        <Sarabun type="Body2">{"เลือกเทมเพลตที่ต้องการคัดลอก"}</Sarabun>
        <Box height={24} />
        <Input
          placeholder={t("ค้นหา")}
          IconName="searchGlass"
          startIcon={true}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              onSearch(event)
            }
          }}
        />
        <Box height={24} />

        <InfiniteScroll
          loadMore={fetchItems}
          hasMore={hasNextPage}
          loader={<Loader />}
          useWindow={false}
        >
          <div className={classes.areaTemplateList}>
            {listTemplate?.pages.map((page) => {
              const { inProgressList } = page
              const listData = filterList(templateType, inProgressList.data)
              return listData?.map((template, index) => {
                const { name, id } = template
                return (
                  <>
                    <div className={classes.templateDetail}>
                      <div>
                        <Sarabun type="Subtitle1">{name}</Sarabun>
                      </div>
                      <div className={classes.buttonArea}>
                        <Button
                          minWidth={81}
                          size="small"
                          style={{ maxHeight: 36 }}
                          onClick={onClickSelect.bind(null, id, templateType)}
                        >
                          {"เลือก"}
                        </Button>
                      </div>
                    </div>
                    <Divider />
                  </>
                )
              })
            })}
          </div>
        </InfiniteScroll>
      </div>
    </Modal>
  )
}

export default CopyModal
