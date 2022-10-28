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

type CopyEmptyProps = {
  openEmptyModal: boolean
  setOpenEmptyModal: React.Dispatch<React.SetStateAction<boolean>>
  onOk: () => void
  onClose: () => void
}

const CopyEmpty = (props: CopyEmptyProps) => {
  const { openEmptyModal, setOpenEmptyModal, onClose } = props
  const classes = useStyle()

  return (
    <Modal
      visibleUseState={[openEmptyModal, setOpenEmptyModal]}
      closeOnClickOutside={false}
      showCancelButton={false}
      showCloseIcon
      showOkButton
      onCancel={onClose}
      onClose={onClose}
      onOk={onClose}
    >
      <div className={classes.areaText}>
        <Sarabun
          className={classes.title}
          /* size={24} weight={600} */ style={{
            lineHeight: "30px",
          }}
          type="H4"
        >
          {`ไม่สามารถเลือกเมนูนี้ได้`}
        </Sarabun>
        <Sarabun
          style={{
            lineHeight: "22px",
          }}
          /* size={16}
          weight={400} */
          type="Body1"
        >
          {`ไม่สามารถเลือกเมนูนี้ได้ เนื่องจากไมมีมีข้อมูลในรายการนี้อยู่กรุณาโปรดทำรายการจากตัวเลือกอื่น`}
        </Sarabun>
      </div>
    </Modal>
  )
}

export default CopyEmpty
