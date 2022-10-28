import styled from "@emotion/styled"
import { range, sample } from "lodash"
import { useCallback, useState } from "react"
import { useQuery } from "react-query"
import Card from "../../../components/common/Card"
import Table from "../../../components/common/Table"
import { sleep } from "../../../utils/helper"

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: 20px;
  margin-bottom: 10px;
`

const mockData = (page: number, pageSize: number) => {
  return range(pageSize).map((i) => {
    const randomStatus: String = sample(["ใช้งาน", "ไม่ใช้งาน"]) || "ใช้งาน"
    return {
      employeeId: `employeeId-${pageSize * (Number(page) - 1) + i + 1}`,
      name: `name-${pageSize * (Number(page) - 1) + i + 1}`,
      department: `department-${pageSize * (Number(page) - 1) + i + 1}`,
      field: `field-${pageSize * (Number(page) - 1) + i + 1}`,
      position: `position-${pageSize * (Number(page) - 1) + i + 1}`,
      status: randomStatus,
      onClick: () => {
        console.debug("Llick !!!")
      },
    }
  })
}

export const ExampleTable = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const { data = [], isLoading } = useQuery(["example-table", { page, pageSize }], async () => {
    await sleep(2000)
    return mockData(page, pageSize)
  })

  const onChangePage = useCallback((page: number) => {
    setPage(page)
  }, [])
  const onChangeRowsPerPage = useCallback((rowsPerPage: number) => {
    setPageSize(rowsPerPage)
  }, [])

  return (
    <Card>
      <GridLayout>
        <pre>{`
<Table
  page={page}
  onChangeRowsPerPage={onChangeRowsPerPage}
  totalSize={60}
  onChangePage={onChangePage}
  isLoading={isLoading}
  bordered
>
  <Table.Head>
    <Table.Row>
      <Table.Cell>ลำดับ</Table.Cell>
      <Table.Cell>รหัสพนักงาน</Table.Cell>
      <Table.Cell>ชื่อ</Table.Cell>
      <Table.Cell>ฝ่ายงาน</Table.Cell>
      <Table.Cell>สายงาน</Table.Cell>
      <Table.Cell>ตำแหน่งงาน</Table.Cell>
      <Table.Cell>สถานะ</Table.Cell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    {data.map((d, index) => {
      const {
        employeeId,
        name,
        department,
        field,
        position,
        status,
        onClick,
      } = d;
      return (
        <Table.Row onClick={onClick} style={{ cursor: "pointer" }} hover>
          <Table.Cell>{index + 1}</Table.Cell>
          <Table.Cell>{employeeId}</Table.Cell>
          <Table.Cell>{name}</Table.Cell>
          <Table.Cell>{department}</Table.Cell>
          <Table.Cell>{field}</Table.Cell>
          <Table.Cell>{position}</Table.Cell>
          <Table.Cell>{status}</Table.Cell>
        </Table.Row>
      );
    })}
  </Table.Body>
</Table>
`}</pre>
        <Table
          page={page}
          onChangeRowsPerPage={onChangeRowsPerPage}
          totalSize={60}
          onChangePage={onChangePage}
          isLoading={isLoading}
          isBordered
        >
          <Table.Head>
            <Table.Row>
              <Table.Cell>ลำดับ</Table.Cell>
              <Table.Cell>รหัสพนักงาน</Table.Cell>
              <Table.Cell>ชื่อ</Table.Cell>
              <Table.Cell>ฝ่ายงาน</Table.Cell>
              <Table.Cell>สายงาน</Table.Cell>
              <Table.Cell>ตำแหน่งงาน</Table.Cell>
              <Table.Cell>สถานะ</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {data.map((d, index) => {
              const { employeeId, name, department, field, position, status, onClick } = d
              return (
                <Table.Row key={index} onClick={onClick} style={{ cursor: "pointer" }} hover>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{employeeId}</Table.Cell>
                  <Table.Cell>{name}</Table.Cell>
                  <Table.Cell>{department}</Table.Cell>
                  <Table.Cell>{field}</Table.Cell>
                  <Table.Cell>{position}</Table.Cell>
                  <Table.Cell>{status}</Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </GridLayout>
    </Card>
  )
}

export default ExampleTable
