import Sarabun, { SarabunTypes } from "../../components/common/Sarabun"
import styled from "@emotion/styled"
import { useCallback, useEffect, useMemo, useState } from "react"
import { SortingState } from "../../services/enum-typed"
import Icon from "./Icon"
import { CSSProperties } from "react"

const HeaderSortableContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  gap: 8px;
  box-sizing: border-box;
`

type HeaderSortableProps = {
  title: string
  onSorting: Function
  sortingKey: string
  style?: CSSProperties
  textType?: SarabunTypes
  sortOrder?: SortingState
}

const HeaderSortable = (props: HeaderSortableProps) => {
  const {
    title = "",
    onSorting,
    sortingKey,
    style,
    textType = "Subtitle1",
    sortOrder = SortingState.UNSORTED,
  } = props
  const [sortingState, setSortingState] = useState<SortingState>(sortOrder)

  const caretIcon = useMemo(() => {
    if (sortingState === SortingState.ASCENDING) {
      return "caretDown"
    } else if (sortingState === SortingState.DESCENDING) {
      return "caretUp"
    } else {
      return "dash"
    }
  }, [sortingState])

  const onCaretClick = useCallback(() => {
    let nextSortState: SortingState = SortingState.UNSORTED
    if (sortingState === SortingState.UNSORTED) {
      nextSortState = SortingState.ASCENDING
    } else if (sortingState === SortingState.ASCENDING) {
      nextSortState = SortingState.DESCENDING
    } else if (sortingState === SortingState.DESCENDING) {
      nextSortState = SortingState.ASCENDING
    }
    onSorting(title, nextSortState)
    setSortingState(nextSortState)
  }, [onSorting, sortingState, title])

  useEffect(() => {
    if (sortingKey !== title) {
      setSortingState(SortingState.UNSORTED)
    }
  }, [sortingKey, title])
  return (
    <HeaderSortableContainer style={style}>
      <Sarabun type={textType}>{title}</Sarabun>
      <Icon iconName={caretIcon} onClick={onCaretClick} width={10} height={10} />
    </HeaderSortableContainer>
  )
}

export default HeaderSortable
