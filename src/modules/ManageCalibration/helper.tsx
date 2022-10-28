import { forEach, map, uniq } from "lodash"
import {
  IParentFromValues,
  ISelectEmployeeFormSubmitValues,
  ISelectHierarchyGroupFormValues,
} from "../../components/SelectHierarchyGroup/interface"
import { IGetHierarchyOption } from "../../services/group-employee/group-employee-type"
import {
  IFinalCalibrateSession,
  ICalibrateSessionCopyAndEditResponse,
  ICalibrateCopyAndEditType,
  ICalibrateOwner,
} from "../../services/manage-calibration/manage-calibration-type"
import { ICompany } from "../../services/set-form/set-form-type"
import {
  ICalibrationSelectUserType,
  ICreateCalibrateFormValues,
  ISelectUserCalibration,
  IUserCalibrate,
} from "./CreateCalibration"

const getModalSelectEmployeeFormValues = (companies: ICompany[]) => {
  const companiesSelectedIds: string[] = []
  const jobFunctionsSelectedIds: string[] = []
  const divisionsSelectedIds: string[] = []
  const subDivisionsSelectedIds: string[] = []
  const departmentsSelectedIds: string[] = []
  const storesSelectedIds: string[] = []

  forEach(companies || [], (company) => {
    const {
      companyId,
      jobFunctionIds,
      divisionIds,
      subDivisionIds,
      departmentIds,
      storeIds,
    } = company
    companiesSelectedIds.push(companyId)
    jobFunctionsSelectedIds.push(...(jobFunctionIds || []))
    divisionsSelectedIds.push(...(divisionIds || []))
    subDivisionsSelectedIds.push(...(subDivisionIds || []))
    departmentsSelectedIds.push(...(departmentIds || []))
    storesSelectedIds.push(...(storeIds || []))
  })

  const companySelected: IGetHierarchyOption = {
    isCheckedAll: false,
    selectedIds: uniq(companiesSelectedIds),
    excludeIds: [],
  }
  const jobFunctionSelected: IGetHierarchyOption = {
    isCheckedAll: false,
    selectedIds: uniq(jobFunctionsSelectedIds),
    excludeIds: [],
  }
  const divisionSelected: IGetHierarchyOption = {
    isCheckedAll: false,
    selectedIds: uniq(divisionsSelectedIds),
    excludeIds: [],
  }
  const subDivisionSelected: IGetHierarchyOption = {
    isCheckedAll: false,
    selectedIds: uniq(subDivisionsSelectedIds),
    excludeIds: [],
  }
  const departmentSelected: IGetHierarchyOption = {
    isCheckedAll: false,
    selectedIds: uniq(departmentsSelectedIds),
    excludeIds: [],
  }
  const storeSelected: IGetHierarchyOption = {
    isCheckedAll: false,
    selectedIds: uniq(storesSelectedIds),
    excludeIds: [],
  }

  const result: Partial<
    IParentFromValues & ISelectHierarchyGroupFormValues & ISelectEmployeeFormSubmitValues
  > = {
    companySelected,
    jobFunctionSelected,
    divisionSelected,
    subDivisionSelected,
    departmentSelected,
    storeSelected,
  }
  return result
}

const getCalibratorFormValues = (data?: ICalibrateCopyAndEditType | ICalibrateOwner) => {
  const userCalibrates: IUserCalibrate[] = []
  if (data && "user" in data) {
    const user = data?.user || {}
    if (user) {
      userCalibrates.push({
        name: `${user.prefix}${user.firstName} ${user.lastName} (EID: ${user.employeeId})`,
        id: user.id!,
      })
    }
  } else if (data) {
    data?.users?.forEach((user) => {
      userCalibrates.push({
        name: `${user.prefix}${user.firstName} ${user.lastName} (EID: ${user.employeeId})`,
        id: user.id!,
      })
    })
  }

  const userSelected: IGetHierarchyOption = {
    isCheckedAll: false,
    selectedIds: uniq(map(userCalibrates, (e) => e.id)),
    excludeIds: [],
  }
  const {
    companySelected,
    jobFunctionSelected,
    divisionSelected,
    subDivisionSelected,
    departmentSelected,
    storeSelected,
  } = getModalSelectEmployeeFormValues(data?.companies || [])

  const result: DeepPartial<ICalibrationSelectUserType> = {
    ...data,
    userCalibrate: userCalibrates,
    companies: data?.companies,
    userSelected,
    companySelected,
    jobFunctionSelected,
    divisionSelected,
    subDivisionSelected,
    departmentSelected,
    storeSelected,
  }

  return result
}

const getCalibrateSessionFromValues = (calibrateSession?: IFinalCalibrateSession) => {
  const result: DeepPartial<ISelectUserCalibration> = {
    nameCalibration: calibrateSession?.name || "",
    detailCalibration: calibrateSession?.description || "",
    formType: calibrateSession?.formType,
    dateCalibration:
      calibrateSession?.sessionStartDate !== null ? calibrateSession?.sessionStartDate : undefined,
    quarter: calibrateSession?.quarter,
    year: calibrateSession?.year,
    startDate: calibrateSession?.quarterStartDate,
    endDate: calibrateSession?.quarterEndDate,
    calibrationState: calibrateSession?.calibrationState,
    id: calibrateSession?.id,
    owner: getCalibratorFormValues(calibrateSession?.owner),
    committees: getCalibratorFormValues(calibrateSession?.committee),
    hr: getCalibratorFormValues(calibrateSession?.hr),
    subjects: getCalibratorFormValues(calibrateSession?.subject),
  }

  return result
}

export const getCalibrateInitialFormValues = (
  calibrateResponse?: ICalibrateSessionCopyAndEditResponse,
) => {
  const { finalCalibrateSession, subCalibrateSessions } = calibrateResponse || {}

  const initialValues: DeepPartial<ICreateCalibrateFormValues> = {
    finalCalibrateSession: [getCalibrateSessionFromValues(finalCalibrateSession)],
    subCalibrateSessions: map(subCalibrateSessions || [], getCalibrateSessionFromValues),
  }

  return initialValues as ICreateCalibrateFormValues
}
