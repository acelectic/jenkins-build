import styled from "@emotion/styled"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import assessmentFailSVG from "../../../assets/images/assessment-fail.svg"
import { useTranslation } from "react-i18next"
import Avatar from "../../../components/common/Avatar"
import Sarabun from "../../../components/common/Sarabun"
import ProbationManagerTab, {
  ProbationManagerTabItem,
} from "../../../components/ProbationManagerTab"
import {
  GRAYSCALE_DARKGRAY_40,
  GRAYSCALE_LIGHTGRAY_20,
  PRIMARY_DARK,
  PRIMARY_LIGHT,
  WHITE,
} from "../../../constants/colors"
import {
  useGetTrackAssessmentDetail,
  useSubmitAssessmentResults,
} from "../../../services/track-assessment/track-assessment-querry"
import { normalizeDateTH, useRouter } from "../../../utils/helper"
import TrackAssessmentTransaction from "./TrackAssessmentTransaction"
import { first, last } from "lodash"
import Icon from "../../../components/common/Icon"
import { useHistory } from "react-router"
import { Link } from "@mui/material"
import { Form } from "react-final-form"
import Button from "../../../components/common/Button"
import ConfirmSubmitModal from "./ConfirmSubmitModal"
import LoadingLayout from "../../../components/common/LoadingLayout"
import { AssessmentStatus } from "../../../services/enum-typed"
import { useReactToPrint } from "react-to-print"
import { makeStyles } from "@mui/styles"

const Body = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 24px;
  background-color: ${GRAYSCALE_LIGHTGRAY_20};
  box-sizing: border-box;
  padding: 24px 28px;
  height: 100%;
  border-radius: 8px;
`

const GoToPrevious = styled(Link)`
  display: flex;
  cursor: pointer;
  align-items: center;
`

const Profile = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px 24px;
  gap: 24px;
  border-radius: 8px;
  background-color: ${PRIMARY_LIGHT};
  height: 100px;
  align-items: center;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const FailDivNotice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 24px;
`

const ButtonZone = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0%;
  width: 100%;
  justify-content: flex-end;
  background-color: ${WHITE};
  padding: 12px 24px;
  z-index: 10;
  box-shadow: -4px -8px 20px rgba(0, 0, 0, 0.1);
`

const SignContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-left: 24px;
  margin-right: 24px;
`

const SignItem = styled.div`
  display: flex;
  flex-direction: column;
  border: 0px solid black;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`

const SignLine = styled.div`
  border-bottom: 1px solid ${GRAYSCALE_DARKGRAY_40};
  min-width: 150px;
  height: 50px;
  margin-bottom: 10px;
`

const PageTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin-bottom: 10px;
`

export type TrackFormType = {
  result: {
    isPassed: boolean | string
  }
}

const useStyle = makeStyles((theme) => ({
  showPrint: {
    display: "none",
    "@media print": {
      display: "flex",
    },
  },

  hidePrint: {
    // display: "inherit",
    "@media print": {
      display: "none",
    },
  },

  printPadding: {
    padding: "0px",
    margin: "0px",
    "@media print": {
      padding: "8px",
    },
  },
}))

const TrackAssessmentDetail = () => {
  const { t } = useTranslation()
  const { query } = useRouter()
  const history = useHistory()

  const goBack = useCallback(() => {
    history.goBack()
  }, [history])

  const { data, isLoading } = useGetTrackAssessmentDetail(query.userId)

  const haveAssessment100: boolean = useMemo(
    () => data?.oneHundredDay.assessmentTransactionOneHundredDay !== null,
    [data?.oneHundredDay],
  )

  const detailType: "60" | "100" = useMemo(() => (haveAssessment100 ? "100" : "60"), [
    haveAssessment100,
  ])

  const sixtyDayData = useMemo(() => data?.sixtyDay, [data?.sixtyDay])
  const oneHundredDayData = useMemo(() => data?.oneHundredDay, [data?.oneHundredDay])

  const [isAcceptGrade, setIsAcceptGrade] = useState<boolean>(false)

  useEffect(() => {
    setIsAcceptGrade(
      detailType === "60"
        ? data?.sixtyDay.assessmentTransactionSixtyDay?.assessmentStatus ===
            AssessmentStatus.ACCEPT_GRADE
        : data?.oneHundredDay.assessmentTransactionOneHundredDay?.assessmentStatus ===
            AssessmentStatus.ACCEPT_GRADE,
    )
  }, [
    data?.oneHundredDay.assessmentTransactionOneHundredDay?.assessmentStatus,
    data?.sixtyDay.assessmentTransactionSixtyDay?.assessmentStatus,
    detailType,
  ])

  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const firstEvaluator = useMemo(
    () =>
      detailType === "60"
        ? first(sixtyDayData?.assessmentTransactionSixtyDay?.assessmentTransactionEvaluators)
        : first(
            oneHundredDayData?.assessmentTransactionOneHundredDay?.assessmentTransactionEvaluators,
          ),
    [
      detailType,
      oneHundredDayData?.assessmentTransactionOneHundredDay?.assessmentTransactionEvaluators,
      sixtyDayData?.assessmentTransactionSixtyDay?.assessmentTransactionEvaluators,
    ],
  )
  const secondEvaluator = useMemo(
    () =>
      detailType === "60"
        ? last(sixtyDayData?.assessmentTransactionSixtyDay?.assessmentTransactionEvaluators)
        : last(
            oneHundredDayData?.assessmentTransactionOneHundredDay?.assessmentTransactionEvaluators,
          ),
    [
      detailType,
      oneHundredDayData?.assessmentTransactionOneHundredDay?.assessmentTransactionEvaluators,
      sixtyDayData?.assessmentTransactionSixtyDay?.assessmentTransactionEvaluators,
    ],
  )

  const assessmentTransactionEvaluators = useMemo(() => {
    return detailType === "60"
      ? sixtyDayData?.assessmentTransactionSixtyDay?.assessmentTransactionEvaluators
      : oneHundredDayData?.assessmentTransactionOneHundredDay?.assessmentTransactionEvaluators
  }, [
    detailType,
    oneHundredDayData?.assessmentTransactionOneHundredDay?.assessmentTransactionEvaluators,
    sixtyDayData?.assessmentTransactionSixtyDay?.assessmentTransactionEvaluators,
  ])

  const isSameEvaluator: boolean = useMemo(() => firstEvaluator?.id === secondEvaluator?.id, [
    firstEvaluator?.id,
    secondEvaluator?.id,
  ])

  const items: ProbationManagerTabItem[] = useMemo(() => {
    const tmpItems = []
    tmpItems.push({
      name: firstEvaluator?.fullName,
      role: "1",
      result: firstEvaluator?.jsonResult?.isPassed ? "ผ่าน" : "ไม่ผ่าน",
      date: normalizeDateTH(firstEvaluator?.updatedAt || ""),
      content: (
        <TrackAssessmentTransaction
          assessmentTransactionEvaluators={assessmentTransactionEvaluators}
          seq={1}
          targetScore={detailType === "60" ? sixtyDayData?.passValue : oneHundredDayData?.passValue}
          isSameEvaluator={isSameEvaluator}
          isSubmit={isSuccess || isAcceptGrade}
          descriptionForMgr={
            detailType === "60"
              ? sixtyDayData?.assessmentTransactionSixtyDay?.descriptionForMgr || "-"
              : oneHundredDayData?.assessmentTransactionOneHundredDay?.descriptionForMgr || "-"
          }
        />
      ),
    })
    !isSameEvaluator &&
      tmpItems.push({
        name: secondEvaluator?.fullName,
        role: "2",
        result: secondEvaluator?.jsonResult?.isPassed ? "ผ่าน" : "ไม่ผ่าน",
        date: normalizeDateTH(secondEvaluator?.updatedAt || ""),
        content: (
          <TrackAssessmentTransaction
            assessmentTransactionEvaluators={
              detailType === "60"
                ? sixtyDayData?.assessmentTransactionSixtyDay?.assessmentTransactionEvaluators
                : oneHundredDayData?.assessmentTransactionOneHundredDay
                    ?.assessmentTransactionEvaluators
            }
            seq={2}
            targetScore={
              detailType === "60" ? sixtyDayData?.passValue : oneHundredDayData?.passValue
            }
            isSubmit={isSuccess || isAcceptGrade}
          />
        ),
      })

    return tmpItems
  }, [
    assessmentTransactionEvaluators,
    detailType,
    firstEvaluator?.fullName,
    firstEvaluator?.jsonResult?.isPassed,
    firstEvaluator?.updatedAt,
    isAcceptGrade,
    isSameEvaluator,
    isSuccess,
    oneHundredDayData?.assessmentTransactionOneHundredDay?.assessmentTransactionEvaluators,
    oneHundredDayData?.assessmentTransactionOneHundredDay?.descriptionForMgr,
    oneHundredDayData?.passValue,
    secondEvaluator?.fullName,
    secondEvaluator?.jsonResult?.isPassed,
    secondEvaluator?.updatedAt,
    sixtyDayData?.assessmentTransactionSixtyDay?.assessmentTransactionEvaluators,
    sixtyDayData?.assessmentTransactionSixtyDay?.descriptionForMgr,
    sixtyDayData?.passValue,
  ])

  const assessmentId = useMemo(
    () =>
      detailType === "60"
        ? sixtyDayData?.assessmentTransactionSixtyDay?.id
        : oneHundredDayData?.assessmentTransactionOneHundredDay?.id,
    [
      detailType,
      oneHundredDayData?.assessmentTransactionOneHundredDay?.id,
      sixtyDayData?.assessmentTransactionSixtyDay?.id,
    ],
  )

  const isPassed = useMemo(
    () =>
      detailType === "60"
        ? sixtyDayData?.assessmentTransactionSixtyDay?.jsonResult.isPassed
        : oneHundredDayData?.assessmentTransactionOneHundredDay?.jsonResult.isPassed,
    [
      detailType,
      oneHundredDayData?.assessmentTransactionOneHundredDay?.jsonResult.isPassed,
      sixtyDayData?.assessmentTransactionSixtyDay?.jsonResult.isPassed,
    ],
  )

  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false)

  const onOpenConfirmModal = useCallback(() => {
    setOpenConfirmModal(true)
  }, [])

  const onCloseConfirmModal = useCallback(() => {
    setOpenConfirmModal(false)
  }, [])

  const { mutate: submitAssessmentResult } = useSubmitAssessmentResults(assessmentId || "")

  const onSubmit = useCallback(
    (values: TrackFormType) => {
      const params = {
        result: {
          isPassed: values.result.isPassed === "true" ? true : false,
        },
      }
      submitAssessmentResult(params, {
        onSuccess: () => {
          onCloseConfirmModal()
          setIsSuccess(true)
          // goBack()
        },
      })
    },
    [onCloseConfirmModal, submitAssessmentResult],
  )

  const initialValues: TrackFormType = useMemo(() => {
    return {
      result: {
        isPassed: isPassed ? "true" : "false" || "false",
      },
    }
  }, [isPassed])

  const componentRef = useRef<HTMLDivElement>(null)

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const classes = useStyle()

  return (
    <LoadingLayout isLoading={isLoading}>
      <Body>
        <GoToPrevious underline="none" onClick={goBack}>
          <Icon iconName="caretLeft" width={16} height={16} />
          <Sarabun
            type="Subtitle2"
            color={PRIMARY_DARK}
            style={{
              borderBottom: `1.2px solid ${PRIMARY_DARK}`,
              paddingBottom: "2px",
            }}
          >
            {t(`ย้อนกลับ Main menu`)}
          </Sarabun>
        </GoToPrevious>
        <div ref={componentRef} className={classes.printPadding}>
          <PageTitleContainer>
            <Sarabun type="H2">{t(`ประเมินผลการทดลองงาน`)}</Sarabun>
            <div className={classes.hidePrint}>
              <Button onClick={handlePrint} isDisabledButton={!isAcceptGrade}>
                {t(`ออกรายงาน`)}
              </Button>
            </div>
          </PageTitleContainer>
          <Profile>
            <Avatar height={64} width={64} src={data?.myUser.avatar} />
            <Column>
              <Sarabun color={`${WHITE}`} type="H5">
                {t(`${data?.myUser.firstName} ${data?.myUser.lastName}`)}
              </Sarabun>
              <Sarabun color={`${WHITE}`} type="Caption">
                {`${data?.myUser.userCareerHistory?.position?.name} / ${data?.myUser.userCareerHistory?.store?.name}`}
              </Sarabun>
            </Column>
          </Profile>
          <FailDivNotice>
            <img src={assessmentFailSVG} alt="title" width={320} height={240} />
            <Column>
              <Sarabun type="H3">{t(`คุณประเมินผลการทดลองงานครบ ${detailType} วัน ของ`)}</Sarabun>
              <Sarabun type="H2" color={PRIMARY_DARK}>
                {t(`${data?.myUser.firstName} ${data?.myUser.lastName}`)}
              </Sarabun>
              <Sarabun type="H3" color={"#D20F03"}>
                {t(`ไม่ผ่านเกณฑ์`)}
              </Sarabun>
            </Column>
            <Sarabun type="H6">
              {t(`กรุณาตรวจสอบ และแก้ไขผลการประเมินให้ถูกต้อง ก่อนกดส่งผลการประเมินให้พนักงาน`)}
            </Sarabun>
          </FailDivNotice>
          <Sarabun type="H5">{t(`ผู้ประเมิน`)}</Sarabun>

          <Form<TrackFormType> onSubmit={onSubmit} initialValues={initialValues}>
            {({ handleSubmit, values }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <div>
                    <ProbationManagerTab
                      defaultTab={isSameEvaluator ? 1 : 2}
                      items={items}
                      contentStyle={{ padding: "24px" }}
                      tabMode="Probation"
                    />
                    {isSuccess || isAcceptGrade ? null : (
                      <ButtonZone className={classes.hidePrint}>
                        <Button onClick={onOpenConfirmModal}>{t(`ยืนยันผลการประเมิน`)}</Button>
                      </ButtonZone>
                    )}
                    <ConfirmSubmitModal
                      onClose={onCloseConfirmModal}
                      onOk={handleSubmit}
                      showConfirmModal={openConfirmModal}
                      setShowConfirmModal={setOpenConfirmModal}
                      titleText={
                        values.result.isPassed === "true"
                          ? "คุณยืนยันที่จะส่งผลการประเมินหรือไม่ ?"
                          : `คุณยืนยันที่จะประเมินผลว่า “ไม่ผ่าน” หรือไม่ ?`
                      }
                    />
                  </div>
                </form>
              )
            }}
          </Form>
          <div className={classes.showPrint}>
            <SignContainer>
              <SignItem>
                <SignLine />
                <Sarabun type="Caption">{`(${data?.myUser.firstName} ${data?.myUser.lastName})`}</Sarabun>
              </SignItem>
              <SignItem>
                <SignLine />
                <Sarabun type="Caption">{`(${firstEvaluator?.fullName})`}</Sarabun>
              </SignItem>
              {assessmentTransactionEvaluators && assessmentTransactionEvaluators?.length > 1 && (
                <SignItem>
                  <SignLine />
                  <Sarabun type="Caption">{`(${secondEvaluator?.fullName})`}</Sarabun>
                </SignItem>
              )}
              <SignItem>
                <SignLine />
                <Sarabun type="Caption">{`(ผู้อนุมัติ)`}</Sarabun>
              </SignItem>
            </SignContainer>
          </div>
        </div>
        {/* <button onClick={handlePrint} style={{ marginLeft: 200 }}>
          Print this out!
        </button> */}
      </Body>
    </LoadingLayout>
  )
}

export default TrackAssessmentDetail
