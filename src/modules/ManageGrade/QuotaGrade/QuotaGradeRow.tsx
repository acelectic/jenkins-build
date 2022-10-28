import styled from "@emotion/styled"
import { useCallback, useState } from "react"
import { Field } from "react-final-form"
import { useTranslation } from "react-i18next"
import Authorize from "../../../components/Authorize"
import Icon from "../../../components/common/Icon"
import Sarabun from "../../../components/common/Sarabun"
import { GRAYSCALE_DARKGRAY_40, PRIMARY_MAIN } from "../../../constants/colors"
import { PERMISSIONS } from "../../../services/enum-typed"
import { IQuotaGradeType } from "../../../services/quota-grade/quota-grade-type"
import EditGradeDetailModal from "./EditGradeDetailModal"

const ListRow = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  padding: 10px 16px;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  border-bottom: 1px solid ${GRAYSCALE_DARKGRAY_40};
`

const PencilEdit = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 12px;
  cursor: pointer;
`

type HandleEditGradeModalProps = {
  onOk: () => void
  fieldName: string
  setCurrentEditedId: React.Dispatch<React.SetStateAction<string>>
  invalid: boolean
}

const QuotaGradeRow = (props: HandleEditGradeModalProps) => {
  const { onOk, fieldName, setCurrentEditedId, invalid } = props

  const [openEditDetailModal, setOpenEditDetailModal] = useState<boolean>(false)

  const onOpenModal = useCallback(() => {
    setOpenEditDetailModal(true)
  }, [])

  const onCloseModal = useCallback(() => {
    setOpenEditDetailModal(false)
  }, [])

  const { t } = useTranslation()

  return (
    <ListRow>
      <Field name={`${fieldName}`}>
        {({ input }) => {
          const quotaValue: IQuotaGradeType = input.value
          return (
            <>
              <Sarabun type="Subtitle1">{t(`${quotaValue.name}`)}</Sarabun>
              <Authorize permissions={[PERMISSIONS.MANAGE_GRADE_MANAGE_GRADE_UPDATE]}>
                <PencilEdit
                  onClick={() => {
                    onOpenModal()
                    setCurrentEditedId(quotaValue.id)
                  }}
                >
                  <Icon iconName="notePencil" width={24} height={24} />
                  <Sarabun type="Subtitle2" color={`${PRIMARY_MAIN}`}>
                    {t(`แก้ไข`)}
                  </Sarabun>
                </PencilEdit>
              </Authorize>
              <EditGradeDetailModal
                showModal={openEditDetailModal}
                setShowModal={setOpenEditDetailModal}
                onClose={onCloseModal}
                onOk={onOk}
                fieldName={fieldName}
                isCalibrated={quotaValue.isCalibrated}
                invalid={invalid}
              />
            </>
          )
        }}
      </Field>
    </ListRow>
  )
}

export default QuotaGradeRow
