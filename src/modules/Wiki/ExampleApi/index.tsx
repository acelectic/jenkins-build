import Card from "../../../components/common/Card"
import Kanit from "../../../components/common/Kanit"
import { mobile } from "../../../utils/responsive-helper"
import styled from "@emotion/styled"
import OldButton from "../../../components/common/OldButton"
import { api } from "../../../utils/api"
import { useCallback, useState } from "react"
import { Divider as MuiDivider } from "@mui/material"
import { spacing } from "@mui/system"
import { useCurrentUser } from "../../../services/auth/auth-query"
import Loading from "../../../components/common/Loading"
import { useHistory } from "react-router-dom"
import paths from "../../../constants/paths"

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: 20px;
  margin-bottom: 10px;

  ${mobile} {
    grid-template-columns: auto;
  }
`
const Divider = styled(MuiDivider)(spacing)

const ExampleApi = () => {
  const { data: userData, isLoading: isCurrUserLoading } = useCurrentUser()
  const currentUser = userData?.user
  const [responstText, setResponseText] = useState("")

  const onFirstButtonClick = useCallback(async () => {
    const response: any = await api.cpallPmsBackOffice.get("auth/getme")
    console.debug("response", response)
    setResponseText(JSON.stringify(response))
  }, [setResponseText])

  const history = useHistory()

  return (
    <Card>
      <OldButton
        variant="outlined"
        color="primary"
        onClick={() => history.replace(paths.userNotFound())}
      >
        UserNotFound
      </OldButton>
      <Kanit>Without Using React Query</Kanit>
      <GridLayout>
        <OldButton variant="outlined" color="primary" onClick={onFirstButtonClick}>
          Call
        </OldButton>
        <pre>{responstText}</pre>
      </GridLayout>

      <Divider my={6} />
      <Loading isLoading={isCurrUserLoading}>
        <GridLayout>
          <Kanit>React Query (useQuery)</Kanit>
          <pre>{`
export const useCurrentUser = () => {
  const clientClient = useQueryClient()
  return useQuery<UserResponse | undefined>(
    [CURRENT_USER],
    async () => {
      const response = await api.cpallPmsCore.get<UserResponse>(CURRENT_USER)
      console.debug("currentUser", response.data)
      return response.data
    },
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      enabled: !!getToken(),
      onError: () => {
        removeToken()
        clientClient.setQueryData(CURRENT_USER, undefined)
      },
    }
  )
}

ตอนใช้งาน
const { data: currUser, isLoading: isCurrUserLoading } = useCurrentUser()

currUser คือ ข้อมูลที่ได้จากการยิง api, isCurrUserLoading คือสถานะการโหลดข้อมูล สามารถนำไปใช้ประกอบกับคอมโพเนนท์ <Loading> ได้
        `}</pre>
          <br />
          <Kanit>ผลลัพธ์จากการเก็ตข้อมูล</Kanit>

          <pre>{JSON.stringify(currentUser)}</pre>
        </GridLayout>
      </Loading>
    </Card>
  )
}

export default ExampleApi
