// import { useCallback, useState } from "react"
// import { useTranslation } from "react-i18next"
// import styled from "styled-components"
// import { PageParams } from "../services/user/user-type"

import Sarabun from "./common/Sarabun"
import { PRIMARY_DARK } from "../constants/colors"

export const initLangKey = "blcp-lang"

// const FlexCol = styled.div`
//   display: flex;
//   flex-direction: column;
// `

const ListUser = () => {
  // const [modalInfo, setModalInfo] = useState(false)
  // const toggleModalInfo = () => {
  //   setModalInfo(!modalInfo)
  // }

  // const [page, setPage] = useState(1)
  // const [pageSize, setPageSize] = useState(20)
  // const { t } = useTranslation()
  // const [showModal, setShowModal] = useState<boolean>(false)

  // const onChangePage = useCallback((page: number) => {
  //   setPage(page)
  // }, [])
  // const onChangeRowsPerPage = useCallback((rowsPerPage: number) => {
  //   setPageSize(rowsPerPage)
  //   setPage(1)
  // }, [])

  // const paramsUser: PageParams = {
  //   limit: pageSize,
  //   page: page,
  // }

  // const { data: userList, isLoading: isUserListLoading } = useGetUserTest(
  //   paramsUser
  // )

  return (
    <>
      <Sarabun
        type="Subtitle2"
        color={PRIMARY_DARK}
        isLink
        // buttonType="text"
        // width={285}
        onClick={() => {
          // setShowModal(true)
        }}
      >
        ดูรายชื่อพนักงาน
      </Sarabun>
      {/* <Modal
        visibleUseState={[showModal, setShowModal]}
        style={{ width: "100%", maxWidth: "fit-content" }}
        showCancelButton={false}
        showOkButton={false}
      >
        <FlexCol>
          <Sarabun
            style={{
              lineHeight: "24px",
            }}
            type="H4"
          >
            รายชื่อพนักงาน
          </Sarabun>
          <LoadingLayout isLoading={isUserListLoading}>
            <Table
              page={page}
              onChangeRowsPerPage={onChangeRowsPerPage}
              totalSize={userList?.paging.totalRecords}
              onChangePage={onChangePage}
              initRowsPerPage={20}
            >
              <Table.Head>
                <Table.Row>
                  <Table.Cell>{t("table.index")}</Table.Cell>
                  <Table.Cell>{t("table.employeeId")}</Table.Cell>
                  <Table.Cell>{t("table.name")}</Table.Cell>
                  <Table.Cell>{t("table-store")}</Table.Cell>
                  <Table.Cell>{t("table.position")}</Table.Cell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                {userList?.data.map((d, index) => {
                  const {
                    employeeId,
                    firstName,
                    lastName,
                    status,
                    userCareerHistory,
                  } = d
                  const { position, store } = userCareerHistory || {}
                  return (
                    <Table.Row key={index} style={{ cursor: "pointer" }} hover>
                      <Table.Cell style={{ alignItems: "center" }}>
                        {index + 1 + (page - 1) * pageSize}
                      </Table.Cell>
                      <Table.Cell>{employeeId}</Table.Cell>
                      <Table.Cell>{`${firstName} ${lastName}`}</Table.Cell>
                      <Table.Cell>{`${store?.name || "-"}`}</Table.Cell>
                      <Table.Cell>{position?.name || "-"}</Table.Cell>
                      <Table.Cell>
                        <OldTag
                          text={
                            status
                              ? t("table.statusActive")
                              : t("table.statusNotActive")
                          }
                          type={
                            status ? OldTagsType.SUCCESS : OldTagsType.ERROR
                          }
                        />
                      </Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table>
          </LoadingLayout>
        </FlexCol>
      </Modal> */}
    </>
  )
}

export default ListUser
