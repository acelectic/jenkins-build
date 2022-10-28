import Sarabun from "../../../components/common/Sarabun"
import styled from "@emotion/styled"

const Layout = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;

  width: 100%;
  height: 100vh;
  grid-row-gap: 20px;
`

const UserNotFound = () => {
  return (
    <Layout>
      <Sarabun type="H1">ไม่พบผู้ใช้งาน</Sarabun>
      <Sarabun type="H4">กรุณาติดต่อผู้ดูแลระบบ</Sarabun>
    </Layout>
  )
}

export default UserNotFound
