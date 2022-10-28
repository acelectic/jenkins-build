import { IFinalCalibrateSession } from "../../../services/manage-calibration/manage-calibration-type"
import styled from "@emotion/styled"
import { CSSProperties, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import Button from "../../../components/common/Button"
import Icon from "../../../components/common/Icon"
import Sarabun from "../../../components/common/Sarabun"
import {
  GRAYSCALE_DARKGRAY_40,
  GRAYSCALE_DARKGRAY_60,
  GRAYSCALE_LIGHTGRAY_20,
  PRIMARY_DARK,
  SEMANTIC_SUCCESS_DARK,
} from "../../../constants/colors"
import { CalibrationState } from "../../../services/enum-typed"
import {
  getCalibrationStateTitle,
  getTitleFormat,
  normalizeDate,
  // useRouter,
} from "../../../utils/helper"
import CalibrationDetailModal from "../CalibrationDetailModal"
// import paths from "../../../constants/paths"
import CalibrationHistoryModal from "../CalibrationHistoryModal"

const CalibrationRow = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  padding: 8px 16px;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid ${GRAYSCALE_DARKGRAY_40};
  gap: 16px;
`

const RenderColumn = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  min-width: fit-content;
  :hover {
    cursor: pointer;
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`

const RowBetween = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  align-items: center;
  gap: 4px;
  justify-content: space-between;
  width: 100%;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  align-items: baseline;
  gap: 8px;
  width: 100%;
`

const Dot = styled.div`
  display: flex;
  min-width: 8px;
  min-height: 8px;
  border-radius: 50%;
  background-color: ${GRAYSCALE_DARKGRAY_60};
`

type ICalibrationRowProps = {
  calibrateSession: IFinalCalibrateSession
  rowType?: "Final" | "Sub"
  style?: CSSProperties
}

const CalibrationCardRow = (props: ICalibrationRowProps) => {
  const { calibrateSession, rowType = "Final", style } = props
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false)
  const [isOpenHistoryModal, setIsOpenHistoryModal] = useState(false)
  // const { push } = useRouter()

  const { t } = useTranslation()

  // const onClickInspect = useCallback(
  //   (calibrateId: string) => {
  //     push(
  //       paths.manageCalibrationEdit({
  //         routeParam: { calibrationId: calibrateId },
  //       }),
  //     )
  //   },
  //   [push],
  // )

  const renderDetailButton = useCallback(
    (props: { calibrationState: CalibrationState }) => {
      const { calibrationState } = props
      return (
        <>
          {rowType !== "Sub" && calibrationState !== CalibrationState.COMPLETE ? (
            <>
              <RenderColumn
                onClick={() => {
                  setIsOpenDetailModal(true)
                }}
              >
                <Icon iconName="eye" width={24} height={24} />
                <Sarabun type="Subtitle2" color={`${PRIMARY_DARK}`}>
                  {t(`ดูรายละเอียด`)}
                </Sarabun>
              </RenderColumn>
            </>
          ) : calibrationState === CalibrationState.COMPLETE ? (
            <RenderColumn>
              <Button
                buttonType="outlined"
                onClick={setIsOpenHistoryModal.bind(null, !isOpenHistoryModal)}
                style={{ minWidth: "0px" }}
              >
                {t("ดูผลคะแนน")}
              </Button>
            </RenderColumn>
          ) : (
            <></>
          )}
        </>
      )
    },
    [isOpenHistoryModal, rowType, t],
  )

  return (
    <CalibrationRow
      style={{
        borderBottom: rowType === "Final" ? 0 : "",
        backgroundColor: rowType === "Final" ? `${GRAYSCALE_LIGHTGRAY_20}` : "",
        ...style,
      }}
    >
      <Column
        style={{
          width: "30%",
          paddingLeft: rowType === "Sub" ? "36px" : "",
        }}
      >
        <Sarabun type="Subtitle1">{calibrateSession.name}</Sarabun>
      </Column>
      <Column
        style={{
          width: "15%",
        }}
      >
        <Sarabun type="Body2">
          {getTitleFormat({
            year: calibrateSession.year,
            quarter: calibrateSession.quarter,
            formType: calibrateSession.formType,
          })}
        </Sarabun>
      </Column>
      <Column
        style={{
          width: "15%",
        }}
      >
        <Sarabun type="Body2">
          {calibrateSession.sessionStartDate
            ? normalizeDate(calibrateSession.sessionStartDate)
            : "ยังไม่นัดปรับเทียบผลงาน"}
        </Sarabun>
      </Column>
      <Column
        style={{
          width: "40%",
        }}
      >
        <RowBetween>
          <Row>
            <Dot
              style={{
                backgroundColor:
                  calibrateSession.calibrationState === CalibrationState.CALIBRATING
                    ? `${SEMANTIC_SUCCESS_DARK}`
                    : "",
              }}
            />
            <Sarabun
              type="Body2"
              color={
                calibrateSession.calibrationState === CalibrationState.CALIBRATING
                  ? `${SEMANTIC_SUCCESS_DARK}`
                  : `${GRAYSCALE_DARKGRAY_60}`
              }
            >
              {t(`${getCalibrationStateTitle(calibrateSession.calibrationState)}`)}
            </Sarabun>
          </Row>
          {renderDetailButton({
            calibrationState: calibrateSession.calibrationState,
          })}
        </RowBetween>
        {isOpenDetailModal && (
          <CalibrationDetailModal
            isOpen={isOpenDetailModal}
            setIsOpen={setIsOpenDetailModal}
            id={calibrateSession.id}
          />
        )}
      </Column>
      {isOpenHistoryModal && (
        <CalibrationHistoryModal
          visibleUseState={[isOpenHistoryModal, setIsOpenHistoryModal]}
          calibrateSessionsId={calibrateSession.id}
        />
      )}
    </CalibrationRow>
  )
}

export default CalibrationCardRow
