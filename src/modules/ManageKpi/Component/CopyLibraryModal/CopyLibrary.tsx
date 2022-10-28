import styled from "@emotion/styled"
import { Box } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useCallback, useMemo, useState } from "react"
import { Form } from "react-final-form"
import { useHistory } from "react-router-dom"
import Button from "../../../../components/common/Button"
import Icon from "../../../../components/common/Icon"
import Modal from "../../../../components/common/Modal"
import Sarabun from "../../../../components/common/Sarabun"
import paths from "../../../../constants/paths"
import {
  Scale,
  KpiTransactionDetail,
  KpiLibrary,
  KpiLibraryWithCategory,
} from "../../../../services/entity-typed"

import CustomAccordion, {
  CustomAccordionDetailItem,
  CustomAccordionItems,
} from "../CopyGoalModal/components/CustomAccordion"
import ExitModal from "../ExitModal"

const useStyle = makeStyles((theme) => ({
  copyGoal: {
    width: "100%",
  },
  selected: {
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
    textAlign: "center",
    justifyItems: "center",
    // border: '1px solid black',
  },
  numberSelected: {
    marginLeft: "8px",
    marginRight: "8px",
    marginTop: "1px",
  },
  selectedIcon: {
    marginLeft: "10.5px",
  },
  selectedBottom: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
  },
  numberSelectedBottom: {
    marginLeft: "8px",
    marginRight: "8px",
    // marginTop: '0px',
  },
  target: {
    marginRight: "16px",
  },
}))

const CopyModal = styled(Modal)`
  min-width: "624px";
  min-height: "593px";
  max-width: "576px";
  max-height: "764px";
`

type IFormCopyLibrary = {
  selectedId: string
}

export type ICopyLibraryProps = {
  isOpenCopyLibrary: boolean
  unit: BaseOptionType[] | undefined
  categoryTypes: BaseOptionType[] | undefined
  kpiLibraries: KpiLibrary[] | undefined
  kpiTransactionId: string
  jsonScale: Scale | undefined
  setOpenCopyLibrary: React.Dispatch<React.SetStateAction<boolean>>
  closeCopyLibrary: () => void
  onNext?: (items?: (KpiTransactionDetail | null)[] | undefined) => void
  maxKpiTransaction?: number
  currentKpiTransaction?: number
  newKpiLibraryList: KpiLibraryWithCategory[] | undefined
}

const CopyLibraryModal = (props: ICopyLibraryProps) => {
  const { isOpenCopyLibrary, closeCopyLibrary, setOpenCopyLibrary, newKpiLibraryList } = props

  const classes = useStyle()
  const history = useHistory()
  const [countItem, setCountItem] = useState(0)
  const [, /* disableButton */ setDisableButton] = useState(true)
  const [showExitModal, setShowExitModal] = useState<boolean>(false)
  // const [openCopyLibraryDetail, setOpenCopyLibraryDetail] = useState<boolean>(false)

  const newInitialItems = useMemo(() => {
    const temp = newKpiLibraryList?.map(
      (item): CustomAccordionItems => {
        const customAccordionDetailItem = item.kpiLibraries.map(
          (kpiLibrary): CustomAccordionDetailItem => {
            return {
              id: kpiLibrary.id,
              header: kpiLibrary.name,
              description: kpiLibrary.description,
            }
          },
        )
        return {
          id: item.category,
          title: item.category || "ไม่พบข้อมูลไลบารี",
          details: customAccordionDetailItem,
        }
      },
    )
    return temp
  }, [newKpiLibraryList])

  const handleCountItem = useCallback(
    (item: boolean) => {
      // const max = (maxKpiTransaction ?? 0) - (currentKpiTransaction ?? 0)
      if (item) {
        setCountItem(countItem + 1)
        setDisableButton(false)
      } else {
        setCountItem(countItem - 1)
        if (countItem - 1 === 0) {
          setDisableButton(true)
        }
      }
    },
    [countItem],
  )

  const onShowExitModal = useCallback(() => {
    setShowExitModal(true)
  }, [])

  const onCloseShowExitModal = useCallback(() => {
    setShowExitModal(false)
  }, [])

  const onConfirmExit = useCallback(() => {
    setCountItem(0)
    setDisableButton(true)
    closeCopyLibrary()
    onCloseShowExitModal()
  }, [closeCopyLibrary, onCloseShowExitModal])

  const onSubmit = useCallback(
    (values: IFormCopyLibrary) => {
      history.push(
        paths.manageKpiCopyKpiLibrary({
          routeParam: {
            kpiLibraryId: values.selectedId,
          },
        }),
      )
    },
    [history],
  )

  return (
    <>
      <CopyModal
        style={{ maxWidth: "576px", width: "100%" }}
        visibleUseState={[isOpenCopyLibrary, setOpenCopyLibrary]}
        closeOnClickOutside={false}
        showCloseIcon
        showCancelButton={false}
        showOkButton={false}
        onCancel={closeCopyLibrary}
        onClose={onShowExitModal}
      >
        <div style={{ width: "100%" }}>
          <Sarabun type="H3" weight={600}>
            {"เลือกเป้าหมายจาก Library"}
          </Sarabun>
          <Box height={24} />
          <Form<IFormCopyLibrary> onSubmit={onSubmit}>
            {({ handleSubmit, invalid, initialValues, values }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <CustomAccordion
                    accordionItems={newInitialItems}
                    onSelected={(value: boolean) => {
                      handleCountItem(value)
                    }}
                  />
                  <Box height={24} />
                  <div className={classes.selectedBottom}>
                    <Button
                      width={262}
                      height={46}
                      onClick={handleSubmit}
                      isDisabledButton={!!!values.selectedId}
                      endIcon={<Icon iconName="caretLeft" width={15} height={15} />}
                      // textSize={24}
                    >
                      {"ต่อไป"}
                    </Button>
                  </div>
                </form>
              )
            }}
          </Form>
        </div>
      </CopyModal>
      <ExitModal
        showExitModal={showExitModal}
        setShowExitModal={setShowExitModal}
        onOk={onConfirmExit}
        onClose={onCloseShowExitModal}
      />
    </>
  )
}

export default CopyLibraryModal
