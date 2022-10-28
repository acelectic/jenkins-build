import Modal from "../../../components/common/Modal"
import Sarabun from "../../../components/common/Sarabun"
import styled from "@emotion/styled"
import Table from "../../../components/common/Table"
import HeaderSortable from "../../../components/common/HeaderSortable"
// import { useTranslation } from "react-i18next"
import { useCallback, useEffect, useState } from "react"
import { SortingState } from "../../../services/enum-typed"
import { User } from "../../../services/entity-typed"
// import { useCurrentUser } from "../../../services/auth/auth-query"
import ProfileCell from "./ProfileCell"
import { useCalibration } from "../../../services/manage-calibration/manage-calibration-query"

const Body = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  /* gap: 24px; */
  box-sizing: border-box;
  padding: 8px;
  height: 100%;
`

type GradeByQuarter = {
  q1: string
  q2: string
  q3: string
  q4: string
}

export type MgrScoreWithComment = {
  score: string
  comment?: string
}

type CalibrationTableType = {
  user: User
  pc: string
  grade: GradeByQuarter
  kpiScore: string
  behaviorScore: string
  totalScore: string
  criterionScore: string
  mgrScore: MgrScoreWithComment
  finalScore: string
  kpiTransactionId: string
}

type CalibrationHistoryModalProps = {
  visibleUseState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  calibrateSessionsId: string
}

const CalibrationHistoryModal = (props: CalibrationHistoryModalProps) => {
  const { visibleUseState, calibrateSessionsId } = props

  // const { t } = useTranslation()
  const { data: calibration, isLoading } = useCalibration(calibrateSessionsId)

  const [tableData, setTableData] = useState<CalibrationTableType[] | undefined>([])

  const [sortingKey, setSortingKey] = useState("")
  const [sortOrder, setSortOrder] = useState<SortingState>(SortingState.UNSORTED)

  const onSorting = useCallback((title, ordering) => {
    setSortingKey(title)
    setSortOrder(ordering)
  }, [])

  // Todo: remove this, for demo only
  // const { data: currentUserData } = useCurrentUser()

  const handleSorting = useCallback(
    (a: CalibrationTableType, b: CalibrationTableType) => {
      let aValue
      let bValue
      if (sortingKey === "ชื่อ") {
        aValue = `${a.user.firstName} ${a.user.lastName}`
        bValue = `${b.user.firstName} ${b.user.lastName}`
      } else if (sortingKey === "PC") {
        aValue = a.pc
        bValue = b.pc
      } else if (sortingKey === "คะแนน KPI") {
        aValue = Number(a.kpiScore)
        bValue = Number(b.kpiScore)
      } else if (sortingKey === "คะแนนพฤติกรรม") {
        aValue = Number(a.behaviorScore)
        bValue = Number(b.behaviorScore)
      } else if (sortingKey === "คะแนนรวม") {
        aValue = Number(a.totalScore)
        bValue = Number(b.totalScore)
      } else if (sortingKey === "คะแนนตามเกณฑ์") {
        aValue = Number(a.criterionScore)
        bValue = Number(b.criterionScore)
      } else if (sortingKey === "คะแนนที่หัวหน้าให้") {
        aValue = Number(a.mgrScore.score)
        bValue = Number(b.mgrScore.score)
      } else if (sortingKey === "คะแนนสุดท้าย") {
        aValue = Number(a.finalScore)
        bValue = Number(b.finalScore)
      } else {
        aValue = ""
        bValue = ""
      }

      if (aValue > bValue) {
        return 1
      }
      if (aValue < bValue) {
        return -1
      }
      return 0
    },
    [sortingKey],
  )

  // useEffect(() => {
  //   let data: CalibrationTableType[] = []
  //   for (let index = 1; index <= 10; index++) {
  //     const element = {
  //       user: currentUserData?.user,
  //       pc: "4A",
  //       grade: {
  //         q1: `${index}`,
  //         q2: `${index}`,
  //         q3: `${index}`,
  //         q4: `${index}`,
  //       },
  //       kpiScore: `${index}`,
  //       behaviorScore: `${index}`,
  //       totalScore: `${index}`,
  //       criterionScore: `${index}`,
  //       mgrScore: {
  //         score: `${index}`,
  //         comment: `${index}`,
  //       },
  //       finalScore: `${index}`,
  //       kpiTransactionId: `${index}`,
  //     } as CalibrationTableType
  //     data?.push(element)
  //   }

  //   if (sortingKey !== "") {
  //     data = data?.sort(handleSorting)
  //     if (sortOrder === SortingState.DESCENDING) {
  //       data = data?.reverse()
  //     }
  //   }
  //   setTableData(data)
  // }, [currentUserData?.user, handleSorting, sortOrder, sortingKey])

  useEffect(() => {
    let tableData: CalibrationTableType[] | undefined
    tableData = calibration?.calibrateSession.calibratedUsers.map((calibratedUser) => {
      const scoreBySystem = calibratedUser?.currentKpiTransaction?.scoreBySystem
      const individualScore = scoreBySystem?.kpiIndividual ?? 0
      const behaviorScore = scoreBySystem?.behavior ?? 0
      const totalScore = individualScore + behaviorScore
      return {
        user: calibratedUser.user,
        pc: calibratedUser.user?.jobLevel ?? "-",
        grade: {
          q1: calibratedUser?.oldKpiTransactions?.[0]?.finalGrade ?? "-",
          q2: calibratedUser?.oldKpiTransactions?.[1]?.finalGrade ?? "-",
          q3: calibratedUser?.oldKpiTransactions?.[2]?.finalGrade ?? "-",
          q4: calibratedUser?.oldKpiTransactions?.[3]?.finalGrade ?? "-",
        },
        kpiScore: individualScore.toString() ?? "-",
        behaviorScore: behaviorScore.toString() ?? "-",
        totalScore: totalScore.toFixed(2) ?? "-",
        criterionScore: calibratedUser.currentKpiTransaction?.calGrade ?? "-",
        mgrScore: {
          score: calibratedUser.currentKpiTransaction?.mgrGrade ?? "-",
          comment: calibratedUser.currentKpiTransaction?.mgrComment ?? "-",
        },
        finalScore:
          (calibratedUser.currentKpiTransaction?.finalGrade ||
            calibratedUser.currentKpiTransaction?.mgrGrade) ??
          "-", // default value from mgr
        kpiTransactionId: calibratedUser.currentKpiTransaction?.id ?? "",
      } as CalibrationTableType
    })

    // tableData = handleFilter(tableData)
    if (sortingKey !== "") {
      tableData = tableData?.sort(handleSorting)
      if (sortOrder === SortingState.DESCENDING) {
        tableData = tableData?.reverse()
      }
    }
    setTableData(tableData)
  }, [calibration?.calibrateSession.calibratedUsers, handleSorting, sortOrder, sortingKey])
  return (
    <Modal
      visibleUseState={visibleUseState}
      closeOnClickOutside={false}
      showOkButton={false}
      showCancelButton={false}
      showCloseIcon={true}
      maxWidth={"1400px"}
      isLoading={isLoading}
    >
      <Body>
        <Table hidePaginate={true}>
          <Table.Head>
            <Table.Row>
              <Table.Cell>
                <HeaderSortable
                  title="ชื่อ"
                  onSorting={onSorting}
                  sortingKey={sortingKey}
                  textType="Caption"
                />
              </Table.Cell>
              <Table.Cell>
                <HeaderSortable
                  title="PC"
                  onSorting={onSorting}
                  sortingKey={sortingKey}
                  textType="Caption"
                />
              </Table.Cell>
              <Table.Cell>
                <Sarabun type="Caption">เกรดย้อนหลัง 4 รอบ</Sarabun>
              </Table.Cell>
              <Table.Cell>
                <Sarabun type="Caption">เกรดย้อนหลัง 3 รอบ</Sarabun>
              </Table.Cell>
              <Table.Cell>
                <Sarabun type="Caption">เกรดย้อนหลัง 2 รอบ</Sarabun>
              </Table.Cell>
              <Table.Cell>
                <Sarabun type="Caption">เกรดย้อนหลัง 1 รอบ</Sarabun>
              </Table.Cell>
              <Table.Cell>
                <HeaderSortable
                  title="คะแนน KPI"
                  onSorting={onSorting}
                  sortingKey={sortingKey}
                  textType="Caption"
                />
              </Table.Cell>
              <Table.Cell>
                <HeaderSortable
                  title="คะแนนพฤติกรรม"
                  onSorting={onSorting}
                  sortingKey={sortingKey}
                  textType="Caption"
                />
              </Table.Cell>
              <Table.Cell>
                <HeaderSortable
                  title="คะแนนรวม"
                  onSorting={onSorting}
                  sortingKey={sortingKey}
                  textType="Caption"
                />
              </Table.Cell>
              <Table.Cell>
                <HeaderSortable
                  title="คะแนนตามเกณฑ์"
                  onSorting={onSorting}
                  sortingKey={sortingKey}
                  textType="Caption"
                />
              </Table.Cell>
              <Table.Cell>
                <HeaderSortable
                  title="คะแนนที่หัวหน้าให้"
                  onSorting={onSorting}
                  sortingKey={sortingKey}
                  textType="Caption"
                />
              </Table.Cell>
              <Table.Cell>
                <HeaderSortable
                  title="คะแนนสุดท้าย"
                  onSorting={onSorting}
                  sortingKey={sortingKey}
                  textType="Caption"
                />
              </Table.Cell>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            {tableData &&
              tableData.map((d, index) => {
                return (
                  <Table.Row key={index} style={{ cursor: "auto" }} hover>
                    <Table.Cell style={{ minWidth: 220 }}>
                      <ProfileCell value={d.user} />
                    </Table.Cell>
                    <Table.Cell>
                      <Sarabun>{d.pc}</Sarabun>
                    </Table.Cell>
                    <Table.Cell>
                      <Sarabun>{d.grade.q1}</Sarabun>
                    </Table.Cell>
                    <Table.Cell>
                      <Sarabun>{d.grade.q2}</Sarabun>
                    </Table.Cell>
                    <Table.Cell>
                      <Sarabun>{d.grade.q3}</Sarabun>
                    </Table.Cell>
                    <Table.Cell>
                      <Sarabun>{d.grade.q4}</Sarabun>
                    </Table.Cell>
                    <Table.Cell>
                      <Sarabun>{d.kpiScore}</Sarabun>
                    </Table.Cell>
                    <Table.Cell>
                      <Sarabun>{d.behaviorScore}</Sarabun>
                    </Table.Cell>
                    <Table.Cell>
                      <Sarabun>{d.totalScore}</Sarabun>
                    </Table.Cell>
                    <Table.Cell>
                      <Sarabun>{d.criterionScore}</Sarabun>
                    </Table.Cell>
                    <Table.Cell>
                      <Sarabun>{d.mgrScore.score}</Sarabun>
                    </Table.Cell>
                    <Table.Cell>
                      <Sarabun>{d.finalScore}</Sarabun>
                    </Table.Cell>
                  </Table.Row>
                )
              })}
          </Table.Body>
        </Table>
      </Body>
    </Modal>
  )
}

export default CalibrationHistoryModal
