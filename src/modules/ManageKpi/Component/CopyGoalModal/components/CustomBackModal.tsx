import { makeStyles } from "@mui/styles"
import Modal from "../../../../../components/common/Modal"
import Sarabun from "../../../../../components/common/Sarabun"

const useStyle = makeStyles((theme) => ({
  areaText: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "434px",
    textAlign: "center",
    margin: "0 0 40px 0",
  },
  title: {
    margin: "0 0 16px 0",
    lineHeight: "40px",
  },
}))

type CustomModalBackProps = {
  openBackModal: boolean
  setOpenBackModal: React.Dispatch<React.SetStateAction<boolean>>
  onOk: () => void
  onClose: () => void
}

const CustomBackModal = (props: CustomModalBackProps) => {
  const { openBackModal, setOpenBackModal, onOk, onClose } = props

  const classes = useStyle()

  return (
    <Modal
      visibleUseState={[openBackModal, setOpenBackModal]}
      closeOnClickOutside={false}
      showCancelButton
      showCloseIcon
      showOkButton
      onCancel={onClose}
      onClose={onClose}
      onOk={onOk}
    >
      <div className={classes.areaText}>
        <Sarabun className={classes.title} size={24} weight={600}>
          {` คุณยืนยันจะย้อนกลับไปยังก่อนหน้า โดยที่ยังไม่ได้บันทึกหรือไม่ ?`}
        </Sarabun>
        <Sarabun
          style={{
            lineHeight: "24px",
          }}
          size={16}
          weight={400}
        >
          {` หากคุณยืนยันที่จะย้อนกลับก่อนที่จะบันทึก ข้อมูลเป้าหมายนี้ที่คุณเลือก หรือพิมพ์ไว้จะหายไปทั้งหมด`}
        </Sarabun>
      </div>
    </Modal>
  )
}

export default CustomBackModal
