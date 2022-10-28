import styled from "@emotion/styled"
import { AccordionDetails, Box } from "@mui/material"
import { CSSProperties, ReactNode, useCallback, useMemo, useState } from "react"
import {
  BLACK,
  GRAYSCALE_DARKGRAY_40,
  GRAYSCALE_LIGHTGRAY_20,
  SEMANTIC_WARNING_MAIN,
  WHITE,
} from "../../constants/colors"
import Sarabun from "./Sarabun"
import { ReactComponent as ProfileCircle } from "../../assets/images/profile-circle.svg"
import { useTranslation } from "react-i18next"
import Icon from "./Icon"
import _ from "lodash"
import StateTag from "./StateTag"
import { Scale } from "../../services/entity-typed"
import GradeWithColors from "./GradeWithColors"

const StyledAccordionDetails = styled(AccordionDetails)`
  padding: 0;
`

const ItemRow = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 58px;
  width: 100%;
  min-width: 900px;
  box-sizing: border-box;
  border-bottom: 1px solid ${GRAYSCALE_DARKGRAY_40};
`

const UserDetailArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StatusNameArea = styled.div`
  display: flex;
  width: fit-content;
`

const ProfileImageStyled = styled(ProfileCircle)`
  min-width: 50px;
  min-height: 50px;
  max-width: 50px;
  max-height: 50px;
`
const NameArea = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
`
const ColumnHeaders = styled.div`
  display: flex;
  background-color: ${GRAYSCALE_LIGHTGRAY_20};
  min-height: 58px;
  width: 100%;
  min-width: 900px;
  box-sizing: border-box;
`

const NameColumn = styled.div`
  display: flex;
  cursor: pointer;
  box-sizing: border-box;
  width: 27%;
  padding: 16px 16px;
  min-width: 240px;
`
const DepartmentColumn = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 18%;
  padding: 16px 16px;
  min-width: 160px;
`
const ScoreColumn = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  width: 20%;
  padding: 16px 16px;
  min-width: 178px;
`
const PreviousStatusColumn = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 20%;
  padding: 16px 16px;
  min-width: 178px;
`
const StatusColumn = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 35%;
  padding: 16px 16px;
  min-width: 322px;
`
const Circle = styled.div`
  min-height: 8px;
  min-width: 8px;
  max-height: 8px;
  max-width: 8px;
  margin: 8px;
  border-radius: 50%;
  box-sizing: border-box;
`
const Body = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  box-sizing: border-box;
  border-radius: 0px 0px 8px 8px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #dbdbdb;
  background-color: ${WHITE};
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
`

export type MyTeamCardType = {
  user: {
    name?: string
    eId?: string
    role?: string
    picture?: ReactNode
    id?: string
    isApproveAble?: boolean
  }
  department?: { departmentName?: string }
  score?: { scoreNumber?: number; scoreDetail?: string }
  status: { statusName: string; statusButton?: ReactNode }
  jsonScale?: Scale
}

type ItemCardProps = {
  item: MyTeamCardType
  index: number
  onClickName?: (item: MyTeamCardType) => void
  isButtonCreateGoalTeam?: boolean
  jsonScale?: Scale
}

type MyTeamTableProps = {
  items?: Array<MyTeamCardType>
  itemStyle?: CSSProperties
  onClickName?: (item: MyTeamCardType) => void
  isShowHeader?: boolean
  currentQuarterTag?: string
}

const ItemCard = (props: ItemCardProps) => {
  const { item, onClickName, jsonScale } = props
  const { user, score, status, department } = item
  const { name, eId, role } = user
  const { scoreNumber, scoreDetail } = score || {}
  const { statusName, statusButton } = status
  const { departmentName } = department || {}

  const handleOnClickName = useCallback(
    (item: MyTeamCardType) => {
      onClickName?.(item)
    },
    [onClickName]
  )

  return (
    <ItemRow>
      <NameColumn onClick={handleOnClickName.bind(null, item)}>
        <ProfileImageStyled style={{ height: "100%" }} width={56} height={56} />
        <Box width={16} />
        <UserDetailArea>
          <NameArea onClick={handleOnClickName.bind(null, item)}>
            <Sarabun type="Subtitle1">{name}</Sarabun>
            <Box width={5} />
          </NameArea>
          <Sarabun type="Caption">{`EID: ${eId}`}</Sarabun>
          <Sarabun type="Body2">{role}</Sarabun>
        </UserDetailArea>
      </NameColumn>
      <DepartmentColumn style={{ alignItems: "center" }}>
        <Sarabun type="Body2">{departmentName}</Sarabun>
      </DepartmentColumn>

      {scoreNumber && jsonScale ? (
        <ScoreColumn style={{ alignItems: "center" }}>
          <GradeWithColors grade={scoreNumber} jsonScale={jsonScale} />
        </ScoreColumn>
      ) : (
        <ScoreColumn style={{ alignItems: "center", paddingLeft: "24px" }}>
          <Sarabun type="H5">{scoreDetail}</Sarabun>
        </ScoreColumn>
      )}

      {statusName || statusButton ? (
        <StatusColumn style={{ justifyContent: "center", paddingLeft: "0px" }}>
          <Row
            style={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <StatusNameArea
              style={{
                alignItems: "center",
                width: "50%",
                borderLeft: statusName
                  ? `1px solid ${GRAYSCALE_DARKGRAY_40}`
                  : "",
                height: "30px",
              }}
            >
              <Box width={16} />
              {statusName && (
                <>
                  <Circle style={{ backgroundColor: SEMANTIC_WARNING_MAIN }} />
                  <Sarabun type="Body2" color={`${SEMANTIC_WARNING_MAIN}`}>
                    {statusName}
                  </Sarabun>
                </>
              )}
            </StatusNameArea>
            <div
              style={{
                display: "flex",
                width: "50%",
                justifyContent: "center",
              }}
            >
              {statusButton ?? statusButton}
            </div>
          </Row>
        </StatusColumn>
      ) : (
        <></>
      )}
    </ItemRow>
  )
}

const MyTeamTable = (props: MyTeamTableProps) => {
  const {
    items,
    itemStyle,
    onClickName,
    isShowHeader = false,
    currentQuarterTag,
  } = props
  const { t } = useTranslation()

  //สำหรับ sort หัวตาราง
  const [orderBy, setOrderBy] = useState("asc")
  const [orderName, setOrderName] = useState("")

  const onClickHeadColumn = useCallback(
    (name: string) => {
      //เช็คว่าตอนนี้ชื่อหัวตารางที่กดมาตรงกับปัจจุบันหรือไม่ถ้าตรงเช็คว่าเรียงจากน้อยไปมากหรือไม่
      const isAsc = orderName === name && orderBy === "asc"
      const asc = isAsc ? "desc" : "asc"
      setOrderBy(asc)
      setOrderName(name)
    },
    [orderBy, orderName]
  )

  const itemSort = useMemo(() => {
    let name
    switch (orderName) {
      case "ชื่อ": {
        name = "user.name"
        break
      }
      case "หน่วยงาน": {
        name = "department.departmentName"
        break
      }
      case "ผลการประเมินรอบที่แล้ว": {
        name = "score.scoreNumber"
        break
      }
      default: {
        name = "status.statusName"
        break
      }
    }
    const itemListCopy = _.orderBy(
      items,
      name,
      orderBy === "asc" ? "asc" : "desc"
    )

    return itemListCopy
  }, [items, orderBy, orderName])

  return (
    <div style={{ border: "none" }}>
      <Body>
        {isShowHeader ? (
          <ColumnHeaders>
            <NameColumn onClick={onClickHeadColumn.bind(null, "ชื่อ")}>
              <Sarabun type="Subtitle2">{t(`ชื่อ`)}</Sarabun>
              <Box width={8} />
              <Icon
                iconName={
                  orderName === `ชื่อ` && orderBy !== "asc"
                    ? "caretUp"
                    : "caretDown"
                }
                width={16}
                height={16}
              />
            </NameColumn>
            <DepartmentColumn
              onClick={onClickHeadColumn.bind(null, "หน่วยงาน")}
            >
              <Sarabun type="Subtitle2">{t(`หน่วยงาน`)}</Sarabun>
              <Box width={8} />
              <Icon
                iconName={
                  orderName === `หน่วยงาน` && orderBy !== "asc"
                    ? "caretUp"
                    : "caretDown"
                }
                width={16}
                height={16}
              />
            </DepartmentColumn>
            <PreviousStatusColumn
              onClick={onClickHeadColumn.bind(null, "ผลการประเมินรอบที่แล้ว")}
            >
              <Row>
                <Sarabun type="Subtitle2">
                  {t(`ผลการประเมินรอบที่แล้ว`)}
                </Sarabun>
                <Box width={8} />
                <Icon
                  iconName={
                    orderName === `ผลการประเมินรอบที่แล้ว` && orderBy !== "asc"
                      ? "caretUp"
                      : "caretDown"
                  }
                  width={16}
                  height={16}
                />
              </Row>
            </PreviousStatusColumn>
            <StatusColumn
              onClick={onClickHeadColumn.bind(null, "สถานะการประเมินปัจจุบัน")}
            >
              <Row>
                <Sarabun type="Subtitle2">
                  {t(`สถานะการประเมินปัจจุบัน`)}
                </Sarabun>
                <Box width={8} />
                <Icon
                  iconName={
                    orderName === `สถานะการประเมินปัจจุบัน` && orderBy !== "asc"
                      ? "caretUp"
                      : "caretDown"
                  }
                  width={16}
                  height={16}
                />
              </Row>
              {currentQuarterTag && (
                <StateTag
                  text={currentQuarterTag}
                  fontColor={BLACK}
                  lineHeight={2}
                  style={{
                    width: "72px",
                    height: "22px",
                    backgroundColor: GRAYSCALE_DARKGRAY_40,
                  }}
                />
              )}
            </StatusColumn>
          </ColumnHeaders>
        ) : null}
        <StyledAccordionDetails style={itemStyle}>
          {itemSort?.map((item, i) => {
            const { user, jsonScale } = item
            const { id } = user
            return (
              <ItemCard
                item={item}
                key={id}
                onClickName={onClickName}
                index={i}
                jsonScale={jsonScale}
              />
            )
          })}
        </StyledAccordionDetails>
      </Body>
    </div>
  )
}

export default MyTeamTable
