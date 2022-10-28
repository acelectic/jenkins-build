import { useCallback, useEffect, useState } from "react"
import { IKpiTransactionDetailUserResponse } from "../services/manage-kpi/mange-kpi-type"
import ModalViewUserManageKpiBase from "./ModalViewUserManageKpiBase"

type IModalViewUserManageKpiProps = {
  visibleUseState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  usersData: IKpiTransactionDetailUserResponse[]
}

const ModalViewUserManageKpi = (props: IModalViewUserManageKpiProps) => {
  const { visibleUseState, usersData } = props
  const [isOpenModal, setIsOpenModal] = visibleUseState

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const [count, setCount] = useState(0)
  const [renderUsers, setRenderUsers] = useState<IKpiTransactionDetailUserResponse[]>([])
  const [maxLength /* setMaxLength */] = useState(usersData.length)

  const onChangePage = useCallback(
    (page: number) => {
      setPage(page)
      setCount(count + pageSize)
    },
    [count, pageSize],
  )
  const onChangeRowsPerPage = useCallback((rowsPerPage: number) => {
    setPageSize(rowsPerPage)
    setPage(1)
  }, [])

  useEffect(() => {
    //slice(เริ่มที่,ถึงก่อนตัวที่)
    const items = usersData.slice((page - 1) * pageSize, pageSize * page)
    setRenderUsers(items || [])
  }, [page, pageSize, usersData])

  return (
    <ModalViewUserManageKpiBase
      visibleUseState={[isOpenModal, setIsOpenModal]}
      data={renderUsers}
      page={page}
      pageSize={pageSize}
      totalSize={maxLength}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
    />
  )
}

export default ModalViewUserManageKpi
