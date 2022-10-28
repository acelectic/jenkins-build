import { Divider as MuiDivider, Box, Button } from "@mui/material"
import styled from "styled-components/macro"
import Card from "../../../components/common/Card"
import OldModal from "../../../components/common/OldModal"
import { spacing } from "@mui/system"
import { useState } from "react"
import Kanit from "../../../components/common/Kanit"
import { useTheme } from "@mui/material/styles"
import { mobile } from "../../../utils/responsive-helper"

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  margin-bottom: 10px;

  ${mobile} {
    grid-template-columns: auto;
  }
`
const BoxLayout = styled(Box)`
  margin-top: 50%;
`
const Divider = styled(MuiDivider)(spacing)
const ExampleModal = () => {
  const theme = useTheme()
  const [modalSm, setModalSm] = useState(false)
  const [modalMd, setModalMd] = useState(false)
  const [modalXs, setModalXs] = useState(false)
  const [modalXl, setModalXl] = useState(false)
  const [modalLg, setModalLg] = useState(false)
  const toggleModalSm = () => {
    setModalSm(!modalSm)
  }
  const toggleModalMd = () => {
    setModalMd(!modalMd)
  }
  const toggleModalXs = () => {
    setModalXs(!modalXs)
  }
  const toggleModalXl = () => {
    setModalXl(!modalXl)
  }
  const toggleModalLg = () => {
    setModalLg(!modalLg)
  }
  const [modalInfo, setModalInfo] = useState(false)
  const [modalSuccess, setModalSuccess] = useState(false)
  const [modalWarning, setModalWarning] = useState(false)
  const [modalError, setModelError] = useState(false)
  const [modalDanger, setModelDanger] = useState(false)
  const [modalDelete, setModelDelete] = useState(false)
  const toggleModalInfo = () => {
    setModalInfo(!modalInfo)
  }
  const toggleModalSuccess = () => {
    setModalSuccess(!modalSuccess)
  }
  const toggleModalWarning = () => {
    setModalWarning(!modalWarning)
  }
  const toggleModalError = () => {
    setModelError(!modalError)
  }
  const toggleModalDanger = () => {
    setModelDanger(!modalDanger)
  }
  const toggleModalDelete = () => {
    setModelDelete(!modalDelete)
  }
  return (
    <Card>
      <Kanit type="XsTitle">
        import Modal from "../../../components/common/Modal"
      </Kanit>
      <Divider my={2} />
      <Kanit type="MSubtitle">Modal SM</Kanit>
      <OldModal
        isOpen={modalSm}
        title="Size sm"
        maxWidth="sm"
        fullWidth={true}
        onCancel={toggleModalSm}
        onConfirm={toggleModalSm}
      >
        Modal ขนาด sm
      </OldModal>
      <GridLayout>
        <BoxLayout>
          <Button variant="contained" color="primary" onClick={toggleModalSm}>
            sm
          </Button>
        </BoxLayout>
        <pre>{`
       <Modal
        isOpen={modalSm}
        title="Size sm"
        maxWidth="sm"
         fullWidth={true}
        onCancel={toggleModalSm}
        onConfirm={toggleModalSm}>
      </Modal>`}</pre>
      </GridLayout>
      <Divider my={2} />
      <Kanit type="MSubtitle">Modal MD</Kanit>
      <OldModal
        isOpen={modalMd}
        title="Size md"
        maxWidth="md"
        fullWidth={true}
        onCancel={toggleModalMd}
        onConfirm={toggleModalMd}
      >
        Modal ขนาด md
      </OldModal>
      <GridLayout>
        <BoxLayout>
          <Button variant="contained" color="primary" onClick={toggleModalMd}>
            md
          </Button>
        </BoxLayout>
        <pre>{`
       <Modal
        isOpen={modalMd}
        title="Size md"
        maxWidth="md"
         fullWidth={true}
        onCancel={toggleModalMd}
        onConfirm={toggleModalMd}>
      </Modal>`}</pre>
      </GridLayout>
      <Divider my={2} />
      <Kanit type="MSubtitle">Modal XS</Kanit>
      <OldModal
        isOpen={modalXs}
        title="Size xs"
        maxWidth="xs"
        fullWidth={true}
        onCancel={toggleModalXs}
        onConfirm={toggleModalXs}
      >
        Modal ขนาด xs
      </OldModal>
      <GridLayout>
        <BoxLayout>
          <Button variant="contained" color="primary" onClick={toggleModalXs}>
            xs
          </Button>
        </BoxLayout>
        <pre>{`
       <Modal
        isOpen={modalXs}
        title="Size xs"
        maxWidth="xs"
         fullWidth={true}
        onCancel={toggleModalXs}
        onConfirm={toggleModalXs}>
      </Modal>`}</pre>
      </GridLayout>
      <Divider my={2} />
      <Kanit type="MSubtitle">Modal XL</Kanit>
      <OldModal
        isOpen={modalXl}
        title="Size xl"
        fullWidth={true}
        maxWidth="xl"
        onCancel={toggleModalXl}
        onConfirm={toggleModalXl}
      >
        Modal ขนาด xl
      </OldModal>
      <GridLayout>
        <BoxLayout>
          <Button variant="contained" color="primary" onClick={toggleModalXl}>
            xl
          </Button>
        </BoxLayout>
        <pre>{`
      <Modal
        isOpen={modalXl}
        title="Size xl"
        maxWidth="xl"
         fullWidth={true}
        onCancel={toggleModalXl}
        onConfirm={toggleModalXl}>
      </Modal>`}</pre>
      </GridLayout>
      <Divider my={2} />
      <Kanit type="MSubtitle">Modal LG</Kanit>
      <OldModal
        isOpen={modalLg}
        title="Size lg"
        fullWidth={true}
        maxWidth="lg"
        onCancel={toggleModalLg}
        onConfirm={toggleModalLg}
      >
        Modal ขนาด lg
      </OldModal>
      <GridLayout>
        <BoxLayout>
          <Button variant="contained" color="primary" onClick={toggleModalLg}>
            lg
          </Button>
        </BoxLayout>
        <pre>{`
      <Modal
        isOpen={modalLg}
        title="Size lg"
        maxWidth="lg"
         fullWidth={true}
        onCancel={toggleModalLg}
        onConfirm={toggleModalLg}>
      </Modal>`}</pre>
      </GridLayout>
      <Divider my={2} />

      <Kanit type="MSubtitle">Modal Type Info</Kanit>
      <OldModal
        isOpen={modalInfo}
        title="Type Info"
        fullWidth={true}
        maxWidth="sm"
        onCancel={toggleModalInfo}
        onConfirm={toggleModalInfo}
      >
        Modal Type Info
      </OldModal>
      <GridLayout>
        <BoxLayout>
          <Button variant="contained" color="primary" onClick={toggleModalInfo}>
            Info
          </Button>
        </BoxLayout>
        <pre>{`
      <Modal
        isOpen={modalInfo}
        title="Type Info"
        fullWidth={true}
        maxWidth="sm"
        onCancel={toggleModalInfo}
        onConfirm={toggleModalInfo}
      >
      </Modal>`}</pre>
      </GridLayout>
      <Divider my={2} />

      <Kanit type="MSubtitle">Modal Type Success</Kanit>
      <OldModal
        isOpen={modalSuccess}
        title="Type Success"
        fullWidth={true}
        maxWidth="sm"
        onCancel={toggleModalSuccess}
        onConfirm={toggleModalSuccess}
        type="success"
      >
        Modal Type Success
      </OldModal>
      <GridLayout>
        <BoxLayout>
          <Button
            variant="contained"
            color="primary"
            onClick={toggleModalSuccess}
            style={{ backgroundColor: theme.palette.success.main }}
          >
            Success
          </Button>
        </BoxLayout>
        <pre>{`
      <Modal
        isOpen={modalInfo}
        title="Type Success"
        fullWidth={true}
        maxWidth="sm"
        onCancel={toggleModalSuccess}
        onConfirm={toggleModalSuccess}
      >
      </Modal>`}</pre>
      </GridLayout>
      <Divider my={2} />

      <Kanit type="MSubtitle">Modal Type Warning</Kanit>
      <OldModal
        isOpen={modalWarning}
        title="Type Warning"
        fullWidth={true}
        maxWidth="sm"
        onCancel={toggleModalWarning}
        onConfirm={toggleModalWarning}
        type="warning"
      >
        Modal Type Warning
      </OldModal>
      <GridLayout>
        <BoxLayout>
          <Button
            variant="contained"
            color="primary"
            onClick={toggleModalWarning}
            style={{ backgroundColor: theme.palette.warning.main }}
          >
            Warning
          </Button>
        </BoxLayout>
        <pre>{`
      <Modal
        isOpen={modalWarning}
        title="Type Warning"
        fullWidth={true}
        maxWidth="sm"
        onCancel={toggleModalWarning}
        onConfirm={toggleModalWarning}
        type="warning"
      >
      </Modal>`}</pre>
      </GridLayout>
      <Divider my={2} />

      <Kanit type="MSubtitle">Modal Type Danger</Kanit>
      <OldModal
        isOpen={modalDanger}
        title="Type Danger"
        fullWidth={true}
        maxWidth="sm"
        onCancel={toggleModalDanger}
        onConfirm={toggleModalDanger}
        type="danger"
      >
        Modal Type Danger
      </OldModal>
      <GridLayout>
        <BoxLayout>
          <Button
            variant="contained"
            color="primary"
            onClick={toggleModalDanger}
            style={{ backgroundColor: theme.palette.secondary.main }}
          >
            Danger
          </Button>
        </BoxLayout>
        <pre>{`
      <Modal
        isOpen={modalDanger}
        title="Type Danger"
        fullWidth={true}
        maxWidth="sm"
        onCancel={toggleModalDanger}
        onConfirm={toggleModalDanger}
        type="danger"
      >
      </Modal>`}</pre>
      </GridLayout>
      <Divider my={2} />

      <Kanit type="MSubtitle">Modal Type Error</Kanit>
      <OldModal
        isOpen={modalError}
        title="Type Error"
        fullWidth={true}
        maxWidth="sm"
        onCancel={toggleModalError}
        type="error"
      >
        Modal Type Error
      </OldModal>
      <GridLayout>
        <BoxLayout>
          <Button
            variant="contained"
            color="primary"
            onClick={toggleModalError}
            style={{ backgroundColor: theme.palette.error.main }}
          >
            Error
          </Button>
        </BoxLayout>
        <pre>{`
      <Modal
        isOpen={modalError}
        title="Type Danger"
        fullWidth={true}
        maxWidth="sm"
        onCancel={toggleModalError}
        type="error"
      >
      </Modal>`}</pre>
      </GridLayout>
      <Divider my={2} />
      <Kanit type="MSubtitle">Modal Type Delete</Kanit>
      <OldModal
        isOpen={modalDelete}
        title="Type Delete"
        fullWidth={true}
        maxWidth="sm"
        onCancel={toggleModalDelete}
        onConfirm={toggleModalDelete}
        type="delete"
      >
        Modal Type Delete
      </OldModal>
      <GridLayout>
        <BoxLayout>
          <Button
            variant="contained"
            color="primary"
            onClick={toggleModalDelete}
            style={{ backgroundColor: theme.palette.error.main }}
          >
            Delete
          </Button>
        </BoxLayout>
        <pre>{`
      <Modal
        isOpen={modalDelete}
        title="Type Delete"
        fullWidth={true}
        maxWidth="sm"
        onCancel={toggleModalDelete}
        onConfirm={toggleModalDelete}
        type="delete"
      >
      </Modal>`}</pre>
      </GridLayout>
      <Divider my={2} />
    </Card>
  )
}

export default ExampleModal
