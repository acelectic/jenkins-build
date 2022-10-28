import styled from "@emotion/styled"
import { Box } from "@mui/material"
import { useMemo } from "react"
import { useCallback, useState } from "react"
import { Form } from "react-final-form"
import { useTranslation } from "react-i18next"
import Authorize from "../../../components/Authorize"
import Button from "../../../components/common/Button"
import Card from "../../../components/common/Card"
import { Divider } from "../../../components/common/Divider"
import Icon from "../../../components/common/Icon"
import LoadingLayout from "../../../components/common/LoadingLayout"
import Sarabun from "../../../components/common/Sarabun"
import { SECONDARY_LIGHT, WHITE } from "../../../constants/colors"
import { PERMISSIONS } from "../../../services/enum-typed"
import { useGetUserPage, useUpdateUserDetail } from "../../../services/user/user-query"
import {
  IParamsUpdateUserDetail,
  ParamUserPage,
  ParamUserVisibilityUpdate,
} from "../../../services/user/user-type"
import { useRouter } from "../../../utils/helper"
import CompanyView from "../component/CompanyView"
import CrewTable from "../component/CrewTable"
import MgrTable from "../component/MgrTable"
import RoleTable from "../component/RoleTable"
import UserView from "../component/UserView"
import arrayMutators from "final-form-arrays"
import { map, set } from "lodash"
import { useCurrentUser } from "../../../services/auth/auth-query"
import Modal from "../../../components/common/Modal"
import SelectHierarchyGroupComponent from "../../../components/SelectHierarchyGroup/SelectHierarchyGroupComponent"
import {
  ISelectEmployeeFormSubmitValues,
  ISelectHierarchyGroupFormValues,
} from "../../../components/SelectHierarchyGroup/interface"
import { checkHierarchyParamsNotEmpty } from "../../../services/group-employee/group-employee-query"
import { useSetNormalizeHierarchyOption } from "../../../components/SelectHierarchyGroup/helper"
import InitialSelectHierarchyGroupOptions from "../../../components/SelectHierarchyGroup/InitialSelectHierarchyGroupOptions"

const EditDetailIconButton = styled(Button)<{ disabled?: boolean }>`
  min-width: 36px;
  max-height: 36px;

  background-color: ${({ isDisabledButton: disabled }) => {
    return disabled ? "#dddddd" : "#EBFAF1"
  }};
  &.MuiButton-contained:hover {
    background-color: #c5ffdc;
  }

  svg {
    color: ${({ isDisabledButton: disabled }) => {
      return disabled ? "#8C8D8D" : "#2ECC71"
    }};
  }
`
const EditIcon = styled(Icon)`
  max-width: 21px;
  max-height: 21px;
  color: #000000;
`
const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
`
const ButtonBack = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 8px;
`
const GridButtonLayout = styled.div`
  display: grid;
  grid-template-columns: 100px 100px;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 8px;
`

type IMyRole = {
  id: string
  name: string
  isActive: boolean
}

type IMyCrew = {
  id: string
  eId: string
  name: string
  positionName: string
  storeName: string
}

type IUserDetailFormValues = ISelectHierarchyGroupFormValues &
  ISelectEmployeeFormSubmitValues &
  ParamUserVisibilityUpdate & {
    searchCrew?: string
    mgr1?: string
    mgr2?: string
    myRoles?: IMyRole[]
    isEditRole: boolean
    newMyCrew?: IMyCrew[]
  }

const UserDetail = () => {
  const { query, goBack } = useRouter<{ userId: string }>()
  const { data: currentUser } = useCurrentUser()
  const userId: string = query.userId
  const { t } = useTranslation()
  const { getHierarchyOptionsSelected, getFilterOptionIds } = useSetNormalizeHierarchyOption()
  const [isEditMode, setIsEditMode] = useState(false)
  const [roleOrderBy, setRoleOrderBy] = useState("name_asc")
  const [isOpenConfirm, setIsOpenConfirm] = useState(false)

  const paramsUser: ParamUserPage = {
    users: { isSelected: false, limit: 1, page: 1 },
    userDetail: {
      isSelected: true,
      userId: userId,
    },
    myCrews: { isSelected: false },
    myRoles: {
      isSelected: true,
      userId: userId,
      limit: 1000,
      orderBy: roleOrderBy,
    },
  }
  const { data: userDetail, isLoading: isUserDetailLoading } = useGetUserPage(paramsUser)
  const { mutate: updateUserDetail /* isLoading */ } = useUpdateUserDetail(userId)

  const onClickBack = useCallback(() => {
    goBack()
  }, [goBack])

  const onClickEdit = useCallback(() => {
    setIsEditMode(true)
  }, [setIsEditMode])

  const onClickCancel = useCallback(() => {
    setIsEditMode(false)
  }, [])

  const initialVales = useMemo((): IUserDetailFormValues => {
    const initialRoles = map(
      userDetail?.myRoles?.myRoles || [],
      (role): IMyRole => {
        return {
          id: role.id,
          name: role.name,
          isActive: role.isActive,
        }
      },
    )
    return {
      newMyCrew: [],
      myRoles: initialRoles,
      isEditRole: false,
      mgr1: userDetail?.userDetail.userCareerHistory?.directManager1?.id,
      mgr2: userDetail?.userDetail.userCareerHistory?.directManager2?.id,
      companies: userDetail?.userDetail.userVisibility?.companies || [],
      jobLevelIds: userDetail?.userDetail.userVisibility?.jobLevelIds,
      jobCodeIds: userDetail?.userDetail.userVisibility?.jobCodeIds,
      salaryAdminPlanIds: userDetail?.userDetail.userVisibility?.salaryAdminPlanIds,
      employeeTypes: userDetail?.userDetail.userVisibility?.employeeTypes || [],
      employeeClassificationIds: userDetail?.userDetail.userVisibility?.employeeClassificationIds,
      positionLevelIds: userDetail?.userDetail.userVisibility?.positionLevelIds,
    }
  }, [
    userDetail?.myRoles.myRoles,
    userDetail?.userDetail.userCareerHistory?.directManager1?.id,
    userDetail?.userDetail.userCareerHistory?.directManager2?.id,
    userDetail?.userDetail.userVisibility?.companies,
    userDetail?.userDetail.userVisibility?.employeeClassificationIds,
    userDetail?.userDetail.userVisibility?.employeeTypes,
    userDetail?.userDetail.userVisibility?.jobCodeIds,
    userDetail?.userDetail.userVisibility?.jobLevelIds,
    userDetail?.userDetail.userVisibility?.positionLevelIds,
    userDetail?.userDetail.userVisibility?.salaryAdminPlanIds,
  ])

  const onSubmit = useCallback(
    (values: IUserDetailFormValues) => {
      let params: Partial<IParamsUpdateUserDetail> = {}
      if (!!values.mgr1 || !!values.mgr2) {
        const CurrentMgr1Id = userDetail?.userDetail.userCareerHistory?.directManager1Id || ""
        const CurrentMgr2Id = userDetail?.userDetail.userCareerHistory?.directManager2Id || ""
        params = {
          ...params,
          myMgr: {
            directManager1Id: values.mgr1 || CurrentMgr1Id,
            directManager2Id: values.mgr2 || CurrentMgr2Id,
          },
        }
      }
      if (values.newMyCrew?.length !== 0) {
        const userIds = values?.newMyCrew?.map((user) => {
          return user.id
        })
        params = {
          ...params,
          myCrew: {
            userIds: userIds || [],
          },
        }
      }
      if (values.isEditRole) {
        const roleIds = values?.myRoles?.map((role) => {
          return role.id
        })
        params = {
          ...params,
          myRole: {
            roleIds: roleIds || [],
          },
        }
      }
      const {
        companySelected,
        jobFunctionSelected,
        divisionSelected,
        subDivisionSelected,
        departmentSelected,
        storeSelected,
      } = getHierarchyOptionsSelected(values)
      const {
        employeeTypes,
        jobCodeIds,
        jobLevelIds,
        positionLevelIds,
        salaryAdminPlanIds,
        employeeClassificationIds,
      } = getFilterOptionIds(values)
      if (!!values?.myRoles?.length && checkHierarchyParamsNotEmpty(companySelected)) {
        params = {
          ...params,
          userVisibility: {
            companySelected,
            jobFunctionSelected,
            divisionSelected,
            subDivisionSelected,
            departmentSelected,
            storeSelected,
            employeeTypes,
            jobCodeIds,
            jobLevelIds,
            positionLevelIds,
            salaryAdminPlanIds,
            employeeClassificationIds,
          },
        }
      }
      updateUserDetail(params, {
        onSuccess: () => {
          setIsOpenConfirm(false)
          setIsEditMode(false)
        },
      })
    },
    [
      getFilterOptionIds,
      getHierarchyOptionsSelected,
      updateUserDetail,
      userDetail?.userDetail.userCareerHistory?.directManager1Id,
      userDetail?.userDetail.userCareerHistory?.directManager2Id,
    ],
  )

  const validate = useCallback((values: IUserDetailFormValues) => {
    const errors = {} as IFormValueErrors<IUserDetailFormValues>
    if (!values.mgr1) {
      set(errors, "mgr1", "Required")
    }
    if (!values.mgr2) {
      set(errors, "mgr2", "Required")
    }
    // if (!!values.myRoles?.length) {
    //   if (!values.companies?.length) {
    //     set(errors, "companies", "Required")
    //   }
    // }
    return errors
  }, [])

  const onOpenModalConfirm = useCallback(() => {
    setIsOpenConfirm(true)
  }, [])

  const onCloseModalConfirm = useCallback(() => {
    setIsOpenConfirm(false)
  }, [])

  return (
    <LoadingLayout isLoading={isUserDetailLoading}>
      <ButtonBack onClick={onClickBack}>
        <Icon iconName="caretLeftSecondaryRightBlue" width={16} height={16} />
        <Box width={8} />
        <Sarabun type="Subtitle2" color={SECONDARY_LIGHT}>
          {t("ย้อนกลับ")}
        </Sarabun>
      </ButtonBack>
      <Form<IUserDetailFormValues>
        onSubmit={onSubmit}
        initialValues={initialVales}
        mutators={{ ...arrayMutators }}
        validate={validate}
      >
        {({ values, handleSubmit, invalid }) => {
          return (
            <>
              <Card>
                <HeaderBox>
                  <Sarabun type="H2">{`${userDetail?.userDetail.firstName} ${userDetail?.userDetail.lastName}`}</Sarabun>
                  <>
                    {currentUser?.user.id !== userId && (
                      <Authorize permissions={[PERMISSIONS.MANAGE_USER_MANAGE_USER_UPDATE]}>
                        {!isEditMode && (
                          <EditDetailIconButton
                            onClick={onClickEdit}
                            startIcon={<EditIcon iconName="pencilWhite" width={24} height={24} />}
                            minWidth={100}
                            textColor={WHITE}
                          >
                            {t("แก้ไข")}
                          </EditDetailIconButton>
                        )}
                      </Authorize>
                    )}
                  </>
                </HeaderBox>

                <>
                  <Box height={44} />
                  <Sarabun type="H4">{t("userDetail.generalInformation")}</Sarabun>
                  <Box height={16} />
                  <UserView data={userDetail?.userDetail} />
                  <Box height={32} />
                  <Divider />
                  <Box height={32} />
                  <Sarabun type="H4">{t("หัวหน้า")}</Sarabun>
                  <Box height={16} />
                  <MgrTable
                    editMode={isEditMode}
                    mgr1={userDetail?.userDetail.userCareerHistory?.directManager1}
                    mgr2={userDetail?.userDetail.userCareerHistory?.directManager2}
                  />
                  <Box height={32} />
                  <Divider />
                  <Box height={32} />
                  <Sarabun type="H4">{t("ลูกทีม")}</Sarabun>
                  <Box height={16} />
                  <CrewTable editMode={isEditMode} userId={userId} />
                  <Box height={32} />
                  <Divider />
                  <Box height={32} />
                  <Sarabun type="H4">{t("บทบาท")}</Sarabun>
                  <Box height={16} />
                  <RoleTable
                    editMode={isEditMode}
                    roles={userDetail?.myRoles?.myRoles}
                    userId={userId}
                    orderState={[roleOrderBy, setRoleOrderBy]}
                  />
                  <Box height={32} />
                  {!!values.myRoles?.length && (
                    <>
                      <Divider />
                      <Box height={32} />
                      <Sarabun type="H4">{t("ระดับการมองเห็น")}</Sarabun>
                      <Box height={16} />
                      {!!isEditMode ? (
                        <>
                          <SelectHierarchyGroupComponent />
                          <InitialSelectHierarchyGroupOptions />
                        </>
                      ) : (
                        <CompanyView data={userDetail?.userDetail?.organizationDetails} />
                      )}
                    </>
                  )}
                </>
              </Card>
              {isEditMode && (
                <GridButtonLayout>
                  <Button
                    buttonType="text"
                    onClick={onClickCancel}
                    backgroundColor={`${WHITE}`}
                    width={100}
                  >
                    {t("role.edit.button.cancel")}
                  </Button>
                  <Button isDisabledButton={invalid} onClick={onOpenModalConfirm}>
                    {t("role.edit.button.save")}
                  </Button>
                </GridButtonLayout>
              )}
              <Modal
                visibleUseState={[isOpenConfirm, setIsOpenConfirm]}
                onOk={handleSubmit}
                onCancel={onCloseModalConfirm}
              >
                <Sarabun type="H4" style={{ marginBottom: "40px" }}>
                  คุณยืนยันที่จะแก้ไขข้อมูลพนักงานนี้หรือไม่?
                </Sarabun>
              </Modal>
            </>
          )
        }}
      </Form>
    </LoadingLayout>
  )
}

export default UserDetail
