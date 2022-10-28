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
import { KpiTransactionQuarter } from "../../../../services/entity-typed"
import ExitModal from "../ExitModal"
import CustomAccordion, {
  CustomAccordionDetailItem,
  CustomAccordionItems,
} from "./components/CustomAccordion"

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
    marginTop: "1px",
  },
  target: {
    marginRight: "16px",
  },
}))

const CopyModal = styled(Modal)`
  width: "50%";
  max-width: "626px";
  max-height: "764px";
`

export type ICopyGoalProps = {
  isOpenCopyGoal: boolean
  unit: BaseOptionType[] | undefined
  kpiTransactionId: string
  categoryTypes: BaseOptionType[] | undefined
  items: KpiTransactionQuarter[] | undefined
  setOpenCopyGoal: React.Dispatch<React.SetStateAction<boolean>>
  closeCopyGoal: () => void
  onNext?: () => void
  maxKpiTransaction?: number
  currentKpiTransaction?: number
}

type IFormCopyGoal = {
  selectedId: string
}

const CopyGoalModal = (props: ICopyGoalProps) => {
  const { isOpenCopyGoal, closeCopyGoal, setOpenCopyGoal, items } = props
  const classes = useStyle()
  const [countItem, setCountItem] = useState(0)
  const [, /* disableButton */ setDisableButton] = useState(true)
  const [showExitModal, setShowExitModal] = useState<boolean>(false)
  const history = useHistory()
  const initialItems = useMemo(() => {
    const temps = items?.map(
      (item): CustomAccordionItems => {
        const customAccordionDetailItems = item?.kpiTransaction?.kpiTransactionDetails?.map(
          (kpiTransactionDetail): CustomAccordionDetailItem => {
            return {
              id: kpiTransactionDetail.id,
              header: kpiTransactionDetail.name,
              description: kpiTransactionDetail.description,
            }
          },
        )
        return {
          id: item.kpiTransaction.id,
          title: `${item.year}`,
          details: customAccordionDetailItems,
        }
      },
    )
    return temps
  }, [items])

  // ตรวจสอบว่าในหน้า Copy เป้าหมายถูกเลือไปแล้วกี่อัน
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
    closeCopyGoal()
    onCloseShowExitModal()
  }, [closeCopyGoal, onCloseShowExitModal])

  const onSubmit = useCallback(
    (values: IFormCopyGoal) => {
      history.push(
        paths.manageKpiCopyKpi({
          routeParam: {
            kpiTransactionDetailId: values.selectedId,
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
        visibleUseState={[isOpenCopyGoal, setOpenCopyGoal]}
        closeOnClickOutside={false}
        showCloseIcon
        showCancelButton={false}
        showOkButton={false}
        onCancel={closeCopyGoal}
        onClose={onShowExitModal}
      >
        <div className={classes.copyGoal}>
          <Sarabun size={28} weight={800}>
            {"คัดลอกเป้าหมายจากไตรมาสที่ผ่านมา"}
          </Sarabun>

          <Box height={24} />
          <Form<IFormCopyGoal> onSubmit={onSubmit}>
            {({ handleSubmit, invalid, initialValues, values }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <CustomAccordion
                    accordionItems={initialItems}
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
                      textSize={24}
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

export default CopyGoalModal
