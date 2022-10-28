import { useCallback, useMemo, useState } from "react"
import InfiniteScroll from "react-infinite-scroller"
import styled from "styled-components"
import { GRAYSCALE_DARKGRAY_40 } from "../constants/colors"

import Button from "./common/Button"
import { Divider } from "./common/Divider"
import Input from "./common/Input"
import Sarabun from "./common/Sarabun"
import Loader from "./Loader"

export const initLangKey = "blcp-lang"
const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  max-height: 500px;
  overflow: auto;
`

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const data = [
  {
    name: "แบบฟอร์มประจำไตรมาส 2022/q1 - สายงานปฏิบัติการที่ 4",
    description: "มีวงปรับเทียบผลงาน   |   6 ลำดับคะแนน",
    id: "1",
  },
  {
    name: "แบบฟอร์มประจำไตรมาส 2022/q1 - สายงานปฏิบัติการที่ 4",
    description: "มีวงปรับเทียบผลงาน   |   6 ลำดับคะแนน",
    id: "2",
  },
  {
    name: "แบบฟอร์มประจำไตรมาส 2022/q1 - สายงานปฏิบัติการที่ 4",
    description: "มีวงปรับเทียบผลงาน   |   6 ลำดับคะแนน",
    id: "3",
  },
  {
    name: "แบบฟอร์มประจำไตรมาส 2022/q1 - สายงานปฏิบัติการที่ 4",
    description: "มีวงปรับเทียบผลงาน   |   6 ลำดับคะแนน",
    id: "4",
  },
  {
    name: "แบบฟอร์มประจำไตรมาส 2022/q1 - สายงานปฏิบัติการที่ 4",
    description: "มีวงปรับเทียบผลงาน   |   6 ลำดับคะแนน",
    id: "5",
  },
]

export type ModalCopyFormType = {
  name: string
  description: string
  id: string
}

export enum StateModalCopyForm {
  KPI_PERIOD_TEMPLATE = "kpi periond template",
  KPI_TEMPLATE = "kpi template",
  ONE_YEAR_TEMPLATE = "one year template",
  PROBATION_TEMPLATE = "probation template",
  CALIBRATION = "calibration",
}
type ModalCopyFormProps = {
  stateModal: StateModalCopyForm
  fetchItems: () => void
  hasNextPage?: boolean
  dataCopyForm: ModalCopyFormType[]
  onSelectCopy?: (id: string) => void
  onSearchWord?: (keyWord: string) => void
  isLoading?: boolean
}

//form คัดลอกแบบฟอร์มประจำไตรมาส คัดลอกเทมเพลต คัดลอกฟอร์มครบรอบ 1 ปี คัดลอกฟอร์มทดลองงาน

const ModalCopyForm = (props: ModalCopyFormProps) => {
  const {
    stateModal,
    fetchItems,
    hasNextPage,
    dataCopyForm,
    onSelectCopy,
    onSearchWord,
    // isLoading = false,
  } = props

  // const [showModal, setShowModal] = useState<boolean>(false)
  // const [id, setId] = useState<String>("")

  const onSearch = useCallback(
    (event: any) => {
      const value = event.target.value
      onSearchWord?.(value)
    },
    [onSearchWord],
  )
  const onClickChoose = useCallback(
    (id: string) => {
      onSelectCopy?.(id)
    },
    [onSelectCopy],
  )
  const [name, setName] = useState<String>("")

  useMemo(() => {
    if (stateModal === StateModalCopyForm.KPI_PERIOD_TEMPLATE) {
      setName("แบบฟอร์มประจำไตรมาส")
    } else if (stateModal === StateModalCopyForm.KPI_TEMPLATE) {
      setName("เทมเพลต")
    } else if (stateModal === StateModalCopyForm.ONE_YEAR_TEMPLATE) {
      setName("ฟอร์มครบรอบ 1 ปี ")
    } else if (stateModal === StateModalCopyForm.CALIBRATION) {
      setName("วงเปรียบเทียบผลงาน")
    } else {
      setName("ฟอร์มทดลองงาน")
    }
  }, [stateModal])
  return (
    <InfiniteScroll
      loadMore={fetchItems}
      hasMore={hasNextPage}
      loader={<Loader />}
      useWindow={false}
    >
      <FlexCol>
        <Sarabun type="H4">{`คัดลอก${name}`}</Sarabun>
        <Sarabun type="Subtitle1" weight={400}>
          {`เลือก${name}ที่ต้องการคัดลอก`}
        </Sarabun>
        <Input
          startIcon={true}
          IconName={"searchGlass"}
          placeholder="ค้นหาชื่อบริษัท หรือ รหัสบริษัท"
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              onSearch(event)
            }
          }}
          style={{ marginBottom: "14px" }}
        />
        <div
          style={{
            border: `1px solid ${GRAYSCALE_DARKGRAY_40}`,
            borderRadius: 8,
            minWidth: 575,
          }}
        >
          {dataCopyForm.map((d, index) => {
            const isLast = data.length - 1 === index ? true : false
            return (
              <>
                <FlexRow style={{ padding: 16 }}>
                  <div>
                    <Sarabun type="H6">{d.name}</Sarabun>
                    <Sarabun type="Subtitle2" weight={400}>
                      {d.description}
                    </Sarabun>
                  </div>
                  <Button
                    buttonType="contained"
                    width={70}
                    onClick={() => {
                      onClickChoose(d.id)
                    }}
                  >
                    เลือก
                  </Button>
                </FlexRow>
                {!isLast && <Divider />}
              </>
            )
          })}
        </div>
      </FlexCol>
    </InfiniteScroll>
  )
}

export default ModalCopyForm
