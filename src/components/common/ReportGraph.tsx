import styled from "@emotion/styled"
import { useMemo } from "react"
import { Bar } from "react-chartjs-2"
import { format2DecimalNumber } from "../../utils/helper"
import Table from "./Table"

const Body = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
`
const GraphArea = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  padding-left: 100px;
`
const ColorBox = styled.div<{
  color: string
}>`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 15px;
  height: 15px;
  background-color: ${({ color }) => color};
  margin: 0px 5px;
`

const initialDatasets = [
  {
    label: "ไตรมาส 1",
    data: [0, 0, 0, 0, 0, 0],
    borderColor: "#cb2c2c",
    type: "line",
    order: 0,
    fill: false,
  },
  {
    label: "ไตรมาส 2",
    data: [0, 0, 0, 0, 0, 0],
    borderColor: "#2CCBA6",
    type: "line",
    order: 0,
    fill: false,
  },
  {
    label: "ไตรมาส 3",
    data: [0, 0, 0, 0, 0, 0],
    borderColor: "#cbb82c",
    type: "line",
    order: 0,
    fill: false,
  },
  {
    label: "ไตรมาส 4",
    data: [0, 0, 0, 0, 0, 0],
    borderColor: "#992ccb",
    type: "line",
    order: 0,
    fill: false,
  },
]

type IReportGraphData = {
  name?: string
  datasets?: number[]
  color?: string
}

type IReportGraphProps = {
  quarters?: IReportGraphData[]
}

const ReportGraph = (props: IReportGraphProps) => {
  const { quarters } = props
  const labels = useMemo(() => {
    return [
      "ระดับผลงาน 1",
      "ระดับผลงาน 2",
      "ระดับผลงาน 3",
      "ระดับผลงาน 4",
      "ระดับผลงาน 5",
      "ระดับผลงาน 6",
    ]
  }, [])

  const datasets = useMemo(() => {
    return (
      // ถ้า quarters มีจำนวนมากกว่า initialDatasets จะต้องใช้สีจากไหนครับ
      quarters?.map((quarter, index) => ({
        label: quarter.name || initialDatasets[index]?.label,
        data: quarter.datasets || initialDatasets[index]?.data,
        borderColor: quarter.color || initialDatasets[index]?.borderColor,
        type: "line",
        order: 0,
        fill: false,
      })) || []
    )
  }, [quarters])

  const data = useMemo(() => {
    return {
      labels: labels,
      datasets: datasets,
    }
  }, [datasets, labels])

  const options = useMemo(() => {
    return {
      responsive: true,
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: true,
        text: "กราฟแสดงผลการประเมินประจำไตรมาส",
      },
      scales: {
        // xAxes: [
        //   {
        //     ticks: {
        //       display: true,
        //       fontColor: "#992ccb",
        //     },
        //   },
        // ],
      },
    }
  }, [])

  return (
    <Body>
      <GraphArea>
        <Bar data={data} options={options} />
      </GraphArea>

      <Table
        // page={page}
        totalSize={60}
        // isLoading={isLoading}
        hidePaginate={true}
        isBordered
      >
        {/* <Table.Head>
        </Table.Head> */}
        <Table.Body>
          {datasets.map((dataset) => {
            return (
              <Table.Row
                key={dataset.label}
                hover
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <Table.Cell
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "121px",
                    minWidth: "121px",
                    padding: "10px",
                    boxSizing: "border-box",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {dataset.label}
                  <ColorBox color={dataset.borderColor} />
                </Table.Cell>
                {dataset.data.map((data) => (
                  <Table.Cell
                    key={`${data}`}
                    style={{
                      display: "flex",
                      borderLeft: "1px solid #c1c1c1",
                      flexDirection: "row",
                      // width: "250px",
                      width: "100%",
                      padding: "10px",
                      boxSizing: "border-box",
                      justifyContent: "center",
                    }}
                  >
                    {format2DecimalNumber(data)}
                  </Table.Cell>
                ))}
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </Body>
  )
}

export default ReportGraph
