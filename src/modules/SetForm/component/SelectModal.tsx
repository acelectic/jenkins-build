import styled from "@emotion/styled"
import { Box } from "@mui/material"
import { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useHistory } from "react-router-dom"
import Icon, { IconNameKeys } from "../../../components/common/Icon"
import Modal from "../../../components/common/Modal"
import Sarabun from "../../../components/common/Sarabun"
import { BLACK, GRAYSCALE_DARKGRAY_40 } from "../../../constants/colors"
import paths from "../../../constants/paths"
import { TemplateType } from "../../../services/enum-typed"
import CopyModal from "./CopyModal"

type SelectModalProps = {
  visibleUseState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  templateType: TemplateType
}

type CardCreateTemplateType = {
  iconName: IconNameKeys
  type: "new" | "copy"
  templateType: TemplateType
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  setOpenModalCopy: React.Dispatch<React.SetStateAction<boolean>>
}

const Card = styled.div`
  display: flex;
  height: 88px;
  width: 578px;
  border: 1px solid ${GRAYSCALE_DARKGRAY_40};
  border-radius: 12px;
  margin-top: 24px;
  padding: 12px;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;
`

const RowSelectItem = (props: CardCreateTemplateType) => {
  const { iconName, type, templateType, setOpenModal, setOpenModalCopy } = props
  const { t } = useTranslation()
  const history = useHistory()

  const onCreateFormClick = useCallback(() => {
    if (templateType === TemplateType.KPI) {
      history.push(paths.kpiFormCreate())
      setOpenModal(false)
    } else if (templateType === TemplateType.ONE_YEAR) {
      history.push(paths.oneYearFormCreate())
    } else if (templateType === TemplateType.PROBATION) {
      history.push(paths.probationFormCreate())
    }
  }, [history, setOpenModal, templateType])

  const onCopyFormClick = useCallback(() => {
    setOpenModalCopy(true)
    setOpenModal(false)
  }, [setOpenModal, setOpenModalCopy])

  const handleCardClick = useCallback(() => {
    if (type === "new") {
      onCreateFormClick()
    } else {
      onCopyFormClick()
    }
  }, [onCreateFormClick, onCopyFormClick, type])

  return (
    <Card onClick={handleCardClick}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <Icon iconName={iconName} width={64} height={64} style={{ marginTop: "8px" }} />
        <Box width={16} />
        {type === "new" ? (
          <div
            style={{
              flexDirection: "column",
              cursor: "pointer",
            }}
            onClick={onCreateFormClick}
          >
            <Sarabun type="H5">{t("สร้างแบบฟอร์มใหม่")}</Sarabun>
            <Sarabun type="Body2">
              {t("กรอกรายละเอียด ตั้งค่า และเลือกเทมเพลตที่จะใช้ในแบบฟอร์มใหม่ด้วยตัวเอง")}
            </Sarabun>
          </div>
        ) : (
          <div style={{ flexDirection: "column", cursor: "pointer" }} onClick={onCopyFormClick}>
            <Sarabun type="H5">{t("คัดลอกจากแบบฟอร์มที่เคยสร้างแล้ว")}</Sarabun>
            <Sarabun type="Body2">
              {t("สามารถสร้างแบบฟอร์มใหม่จากการคัดลอก และดัดแปลงแบบฟอร์มที่เคยสร้างไว้แล้วได้")}
            </Sarabun>
          </div>
        )}
      </div>
      <>
        <Box width={16} />
        <Icon iconName="vector" width={7.5} height={16} stroke={BLACK} />
      </>
    </Card>
  )
}
const SelectModal = (props: SelectModalProps) => {
  const { visibleUseState, templateType } = props
  const [isOpenModal, setIsOpenModal] = visibleUseState
  const [isOpenModalCopy, setIsOpenModalCopy] = useState<boolean>(false)

  return (
    <>
      <Modal
        visibleUseState={[isOpenModal, setIsOpenModal]}
        closeOnClickOutside={false}
        showOkButton={false}
        showCancelButton={false}
        showCloseIcon={true}
        maxWidth={"1100px"}
      >
        <div>
          <Sarabun type="H3">เลือกวิธีสร้างแบบฟอร์ม</Sarabun>
          <RowSelectItem
            iconName="cardHolder"
            type="new"
            templateType={templateType}
            setOpenModal={setIsOpenModal}
            setOpenModalCopy={setIsOpenModalCopy}
          />
          <RowSelectItem
            iconName="copy"
            type="copy"
            templateType={templateType}
            setOpenModal={setIsOpenModal}
            setOpenModalCopy={setIsOpenModalCopy}
          />
        </div>
      </Modal>
      {isOpenModalCopy && (
        <CopyModal
          isOpen={isOpenModalCopy}
          setIsOpen={setIsOpenModalCopy}
          templateType={templateType}
        />
      )}
    </>
  )
}

export default SelectModal
