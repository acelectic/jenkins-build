import styled from "@emotion/styled"
import { Box } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useCallback, useState } from "react"
import { Form } from "react-final-form"
import Button from "../common/Button"
import Icon from "../common/Icon"
import Modal from "../common/Modal"
import Sarabun from "../common/Sarabun"
import { PRIMARY_MAIN, SEMANTIC_ERROR_MAIN } from "../../constants/colors"
// import { KpiTransactionDetail } from "../../../../services/entity-typed"
// import { KpiTransactionQuarter } from "../../../../services/self-evaluation/self-evaluation-type"
import ExitModal from "./ExitModal"
// import CopyGoalDetail from "./CopyGoalDetail"
import { KpiTransactionDetail } from "../../services/entity-typed"

export type CopyGoalProps = {
  openCopyGoal: boolean
  unit: BaseOptionType[] | undefined
  kpiTransactionId: string
  // categoryTypes: BaseOptionType[] | undefined ไม่มี type BaseOptionType[]  ใน Project นี้ เลย comment ไว้ก่อน
  // items: KpiTransactionQuarter[] | undefined ไม่มี type KpiTransactionQuarter[]  ใน Project นี้ เลย comment ไว้ก่อน
  setOpenCopyGoal: React.Dispatch<React.SetStateAction<boolean>>
  closeCopyGoal: () => void
  onNext?: () => void
  maxKpiTransaction?: number
  currentKpiTransaction?: number
}

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

type FormCopyGoal = {
  [kpiTransactionId: string]: {
    checked?: string[]
    kpiTransactionDetails: KpiTransactionDetail[]
  }
}

const CopyGoalModal = (props: CopyGoalProps) => {
  const {
    openCopyGoal,
    closeCopyGoal,
    setOpenCopyGoal,
    // onNext,
    // items,
    // unit,
    // categoryTypes,
    // kpiTransactionId,
    maxKpiTransaction,
    currentKpiTransaction,
  } = props
  const classes = useStyle()
  const [countItem, setCountItem] = useState(0)
  const [disableButton, setDisableButton] = useState(true)
  const [showExitModal, setShowExitModal] = useState<boolean>(false)
  const [
    ,/* openCopyGoalDetail */
  /* setOpenCopyGoalDetail */
  ] = useState<boolean>(false)
  // const [selectedKpiDetail, setSelectedKpiDetail] = useState<
  //   KpiTransactionDetail[] | undefined
  //   >()

  /*Comment ไว้ก่อน เพราะไม่มีข้อมูลจริงๆ จาก API มา */

  // const initialItems = useMemo(() => {
  //   const temp = items?.map(
  //     (item): CustomAccordionItems => {
  //       const customAccordionDetailItem = item.kpiTransaction.kpiTransactionDetails.map(
  //         (kpiTransactionDetail): CustomAccordionDetailItem => {
  //           return {
  //             id: kpiTransactionDetail.id,
  //             header: kpiTransactionDetail.name,
  //             description: kpiTransactionDetail.description,
  //           }
  //         }
  //       )
  //       return {
  //         id: item.kpiTransaction.id,
  //         title: `${item.year}/${item.quarter}`,
  //         details: customAccordionDetailItem,
  //       }
  //     }
  //   )
  //   return temp
  // }, [items])

  // ตรวจสอบว่าในหน้า Copy เป้าหมายถูกเลือไปแล้วกี่อัน
  // const handleCountItem = useCallback(
  //   (item: boolean) => {
  //     const max = (maxKpiTransaction ?? 0) - (currentKpiTransaction ?? 0)
  //     if (item) {
  //       setCountItem(countItem + 1)
  //       setDisableButton(false)
  //     } else {
  //       setCountItem(countItem - 1)
  //       if (countItem - 1 === 0) {
  //         setDisableButton(true)
  //       }
  //     }
  //   },
  //   [countItem, currentKpiTransaction, maxKpiTransaction],
  // )

  const onShowExitModal = useCallback(() => {
    setShowExitModal(true)
  }, [])

  const onCloseShowExitModal = useCallback(() => {
    setShowExitModal(false)
  }, [])

  // const onOpenCopyGoalDetail = useCallback(() => {
  //   setOpenCopyGoalDetail(true)
  // }, [])

  // const closeCopyGoalDetail = useCallback(() => {
  //   setOpenCopyGoalDetail(false)
  // }, [])

  // const onOpenCopyGoal = useCallback(() => {
  //   setOpenCopyGoal(true)
  // }, [setOpenCopyGoal])

  const onConfirmExit = useCallback(() => {
    setCountItem(0)
    setDisableButton(true)
    closeCopyGoal()
    onCloseShowExitModal()
  }, [closeCopyGoal, onCloseShowExitModal])

  // const onSubmit = useCallback(
  //   (values: FormCopyGoal) => {
  //     const kpiTransactionDetails = Object.entries(values).reduce(
  //       (acc: KpiTransactionDetail[], item) => {
  //         const [key, value] = item

  //         const { kpiTransactionDetails, checked } = value
  //         value.kpiTransactionDetails.forEach((v) => {
  //           const kpiTransactionDetailId = `${v.id}`
  //           const indexOf = checked?.indexOf(kpiTransactionDetailId)
  //           if (checked?.length) {
  //           }

  //           if (checked?.includes(kpiTransactionDetailId)) {
  //             acc.push(v)
  //           }
  //         })
  //         return acc
  //       },
  //       []
  //     )
  //     setSelectedKpiDetail(kpiTransactionDetails || [])
  //     // setCountItem(currentKpiTransaction ?? 0)
  //     // setDisableButton(true)
  //     onOpenCopyGoalDetail()
  //     // onNext?.(kpiTransactionDetails || [])
  //   },
  //   [onOpenCopyGoalDetail]
  // )

  // const onSaveKpi = useCallback(() => {
  //   setCountItem(0)
  //   setDisableButton(true)
  //   onNext?.()
  // }, [onNext])

  //ไม่มี Item เพราะ comment ไว้เลย comment อันนี้ไปด้วยเลย

  // const initial = useMemo(() => {
  //   return items?.reduce((acc: FormCopyGoal, item) => {
  //     acc[item.kpiTransaction.id] = {
  //       checked: [],
  //       kpiTransactionDetails: item.kpiTransaction.kpiTransactionDetails,
  //     }
  //     return acc
  //   }, {})
  // }, [items])

  return (
    <>
      <CopyModal
        style={{ maxWidth: "576px", width: "100%" }}
        visibleUseState={[openCopyGoal, setOpenCopyGoal]}
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
          <div className={classes.selected}>
            <Sarabun size={14} weight={700}>
              {"เลือกแล้ว "}
            </Sarabun>
            <Sarabun
              size={18}
              weight={700}
              color={disableButton ? SEMANTIC_ERROR_MAIN : PRIMARY_MAIN}
              className={classes.numberSelected}
            >{` ${countItem} `}</Sarabun>
            <Sarabun size={14} weight={500}>{` เป้าหมาย (ไม่ควรเกิน ${
              (maxKpiTransaction ?? 0) - (currentKpiTransaction ?? 0)
            } เป้าหมาย) `}</Sarabun>
            {/*ยังไม่มี Icon นี้เลย comment ไว้ */}
            {/* <Icon
              iconName="info"
              width={15}
              height={15}
              className={classes.selectedIcon}
            /> */}
          </div>
          <Box height={24} />
          <Form<FormCopyGoal>
            onSubmit={
              // onSubmit
              () => {}
            }
            // initialValues={initial}
          >
            {({ handleSubmit, invalid, initialValues, values }) => {
              return (
                <form onSubmit={handleSubmit}>
                  {/* <CustomAccordion  Props ไม่ครบเลย comment ไว้
                    accordionItems={initialItems}
                    onSelected={(value: boolean) => {
                      handleCountItem(value)
                    }}
                  /> */}
                  <Box height={24} />
                  <div className={classes.selectedBottom}>
                    <Sarabun size={14} weight={500}>
                      {"เลือกแล้ว "}
                    </Sarabun>
                    <Sarabun
                      size={18}
                      weight={700}
                      color={disableButton ? SEMANTIC_ERROR_MAIN : PRIMARY_MAIN}
                      className={classes.numberSelectedBottom}
                    >{` ${countItem} `}</Sarabun>
                    <Sarabun
                      size={14}
                      weight={500}
                      className={classes.target}
                    >{`เป้าหมาย`}</Sarabun>
                    <Button
                      width={262}
                      height={46}
                      onClick={handleSubmit}
                      isDisabledButton={disableButton}
                      endIcon={<Icon iconName="caretRightWhite" width={24} height={24} />}
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

      {/**ถ้าจะใช้ก็มาเปิดเอานะครับ ไม่มี Props เลยปิดไว้ๆ */}
      {/* <CopyGoalDetail //ไม่ได้เอาตัวนี้มาจาก Front-end ด้วยนะครับ เพราะซับซ้อนมาก งง
        items={selectedKpiDetail || []}
        unit={unit}
        kpiTransactionId={kpiTransactionId}
        categoryTypes={categoryTypes}
        onOpenCopyGoal={onOpenCopyGoal}
        openCopyGoalDetail={openCopyGoalDetail}
        closeCopyGoalDetail={closeCopyGoalDetail}
        setOpenCopyGoalDetail={setOpenCopyGoalDetail}
        onSaveKpi={onSaveKpi}
      /> */}
    </>
  )
}

export default CopyGoalModal
