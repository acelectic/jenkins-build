import styled from "@emotion/styled"
import Box from "@mui/material/Box"
import { makeStyles } from "@mui/styles"
import { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useHistory } from "react-router-dom"
import Button from "../../../../components/common/Button"
import Input from "../../../../components/common/Input"
import LoadingLayout from "../../../../components/common/LoadingLayout"
import Modal from "../../../../components/common/Modal"
import Sarabun from "../../../../components/common/Sarabun"
import { GRAYSCALE_DARKGRAY_40 } from "../../../../constants/colors"
import paths from "../../../../constants/paths"
import { useGetKpiTemplate } from "../../../../services/kpi-template/kpi-template-query"
import { EnumTemplateType } from "../../CreateTemplate/SettingTemplateState"

type ICopyTemplateModalProp = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${GRAYSCALE_DARKGRAY_40};
`

const useStyle = makeStyles(() => ({
  columnModal: {
    flexDirection: "column",
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

const CopyTemplateModal = (props: ICopyTemplateModalProp) => {
  const { isOpen, setIsOpen } = props

  const classes = useStyle()

  const history = useHistory()

  const [pageSize] = useState(1000)
  const [page] = useState(1)
  const [searchTemplateName, setSearchTemplateName] = useState()

  const { t } = useTranslation()

  const { data: listKpiTemplate, isLoading: isLoadingGetListKpiTemplate } = useGetKpiTemplate({
    limit: pageSize,
    page: page,
    q: searchTemplateName,
  })

  const onSearch = useCallback(
    (event: any) => {
      const value = event.target.value
      setSearchTemplateName(value)
    },
    [setSearchTemplateName],
  )

  const onClickSelect = useCallback(
    (templateId: string, templateType: EnumTemplateType) => {
      history.push(
        paths.templateCopy({
          routeParam: {
            id: templateId,
            templateType: templateType === EnumTemplateType.BEHAVIOR ? "behaviors" : "scales",
          },
        }),
      )
    },
    [history],
  )
  return (
    <>
      <Modal
        visibleUseState={[isOpen, setIsOpen]}
        showCancelButton={false}
        showOkButton={false}
        style={{ minHeight: 500 }}
      >
        <div className={classes.columnModal}>
          <Sarabun type="H3">{"คัดลอกเทมเพลต"}</Sarabun>
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

          <LoadingLayout isLoading={isLoadingGetListKpiTemplate}>
            <div className={classes.areaTemplateList}>
              {listKpiTemplate?.data.map((d, index) => {
                const { name, topicAmount, scales, type, id } = d
                return (
                  <>
                    <div className={classes.templateDetail}>
                      <div>
                        <Sarabun type="Subtitle1">{name}</Sarabun>
                        <Sarabun type="Body2" style={{ maxWidth: 350 }}>
                          {type === EnumTemplateType.BEHAVIOR
                            ? `เทมเพลตแบบกำหนดหัวข้อให้ (${topicAmount} ข้อ)  |  ${scales} ระดับคะแนน`
                            : `เทมเพลตเปล่าที่ให้พนักงานสร้างหัวข้อเอง  |  ${scales} ระดับคะแนน`}
                        </Sarabun>
                      </div>
                      <div className={classes.buttonArea}>
                        <Button
                          minWidth={81}
                          size="small"
                          style={{ maxHeight: 36 }}
                          onClick={onClickSelect.bind(null, id, type)}
                        >
                          {"เลือก"}
                        </Button>
                      </div>
                    </div>
                    <Divider />
                  </>
                )
              })}
            </div>
          </LoadingLayout>
        </div>
      </Modal>
    </>
  )
}

export default CopyTemplateModal
