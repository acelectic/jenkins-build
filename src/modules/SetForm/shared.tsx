import dayjs from "dayjs"
import { EnumSelectedEmployeeType } from "../../components/fields/ChooseSelectGroupComponent"
import { mapGetOptionIds } from "../../components/SelectHierarchyGroup/helper"
import {
  ISelectEmployeeFormSubmitValues,
  ISelectHierarchyGroupFormValues,
} from "../../components/SelectHierarchyGroup/interface"
import { StateKpiType } from "../../services/enum-typed"
import { ISubmitCreateKpiType } from "../../services/set-form/set-form-type"
import { IKpiPeriodTemplateForm } from "./CreateForm/KpiPeriodTemplate/KpiTemplateForm"

export const parseFormValue = (
  values: IKpiPeriodTemplateForm &
    Partial<ISelectEmployeeFormSubmitValues> &
    Partial<ISelectHierarchyGroupFormValues>,
): ISubmitCreateKpiType => {
  return {
    removeKpiPeriodTemplateUser: values.removeKpiPeriodTemplateUser,
    name: values.name,
    descriptionForUser: values.descriptionForUser,
    descriptionForMgr: values.descriptionForMgr,
    formType: values.formType,
    quarter: values.quarter,
    year: values.year,
    startDate: dayjs(values.startDate).format("YYYY-MM-DD").toString(),
    endDate: dayjs(values.endDate).format("YYYY-MM-DD").toString(),
    companies: values.companies || [],
    scaleForGrade: {
      name: `${values.name}_detail`,
      jsonScaleDetails: values.scaleForGrade?.jsonScaleDetails,
    },

    calKpi:
      values.jsonCalKpi !== undefined && values.jsonCalKpi !== undefined
        ? {
            scaleId: values.jsonCalKpi.scaleId,
            cal: Number(values.jsonCalKpi.cal),
          }
        : undefined,
    calKpiCompany:
      values.jsonCalKpiCompany !== undefined && values.jsonCalKpiCompany !== undefined
        ? {
            scaleId: values.jsonCalKpiCompany.scaleId,
            cal: Number(values.jsonCalKpiCompany.cal),
          }
        : undefined,
    calKpiOther:
      values.jsonCalKpiOther !== undefined && values.jsonCalKpiOther !== undefined
        ? {
            scaleId: values.jsonCalKpiOther.scaleId,
            cal: Number(values.jsonCalKpiOther.cal),
          }
        : undefined,
    calBehavior:
      values.jsonCalBehavior.behaviorTemplateId !== undefined &&
      values.jsonCalBehavior.cal !== undefined
        ? {
            behaviorTemplateId: values.jsonCalBehavior.behaviorTemplateId,
            cal: Number(values.jsonCalBehavior.cal),
          }
        : undefined,
    kpiTemplateTimelines: [
      {
        stateKpi: StateKpiType.SET_GOAL,
        startDate: dayjs(values.kpiTemplateTimelines[0].startDate).format("YYYY-MM-DD").toString(),
        endDate: dayjs(values.kpiTemplateTimelines[0].endDate).format("YYYY-MM-DD").toString(),
      },
      {
        stateKpi: StateKpiType.APPROVE_GOAL,
        startDate: dayjs(values.kpiTemplateTimelines[1].startDate).format("YYYY-MM-DD").toString(),
        endDate: dayjs(values.kpiTemplateTimelines[1].endDate).format("YYYY-MM-DD").toString(),
      },
      {
        stateKpi: StateKpiType.SELF_EVALUATION,
        startDate: dayjs(values.kpiTemplateTimelines[2].startDate).format("YYYY-MM-DD").toString(),
        endDate: dayjs(values.kpiTemplateTimelines[2].endDate).format("YYYY-MM-DD").toString(),
      },
      {
        stateKpi: StateKpiType.MANAGER_EVALUATION,
        startDate: dayjs(values.kpiTemplateTimelines[3].startDate).format("YYYY-MM-DD").toString(),
        endDate: dayjs(values.kpiTemplateTimelines[3].endDate).format("YYYY-MM-DD").toString(),
      },
      {
        stateKpi: StateKpiType.CALIBRATION,
        startDate: dayjs(values.kpiTemplateTimelines[4].startDate).format("YYYY-MM-DD").toString(),
        endDate: dayjs(values.kpiTemplateTimelines[4].endDate).format("YYYY-MM-DD").toString(),
      },
      {
        stateKpi: StateKpiType.MEETING,
        startDate: dayjs(values.kpiTemplateTimelines[5].startDate).format("YYYY-MM-DD").toString(),
        endDate: dayjs(values.kpiTemplateTimelines[5].endDate).format("YYYY-MM-DD").toString(),
      },
      {
        stateKpi: StateKpiType.ACCEPT_GRADE,
        startDate: dayjs(values.kpiTemplateTimelines[6].startDate).format("YYYY-MM-DD").toString(),
        endDate: dayjs(values.kpiTemplateTimelines[6].endDate).format("YYYY-MM-DD").toString(),
      },
    ],
    reqOneYear: values.reqOneYear === "true" ? true : false,
    isCalibrated: values.isCalibrated === "true" ? true : false,
    levelApprove: values.levelApprove || 1,
    defaultMgr: values.defaultMgr,

    employeeClassificationIds: mapGetOptionIds(values.employeeClassificationOptions?.totalOptions),
    employeeTypes: mapGetOptionIds(values.employeeTypeOptions?.totalOptions),
    jobCodeIds: mapGetOptionIds(values.jobCodeOptions?.totalOptions),
    jobLevelIds: mapGetOptionIds(values.jobLevelOptions?.totalOptions),
    positionLevelIds: mapGetOptionIds(values.positionLevelOptions?.totalOptions),
    salaryAdminPlanIds: mapGetOptionIds(values.salaryAdminPlanOptions?.totalOptions),

    companySelected: values.companySelected,
    jobFunctionSelected: values.jobFunctionSelected,
    divisionSelected: values.divisionSelected,
    subDivisionSelected: values.subDivisionSelected,
    departmentSelected: values.departmentSelected,
    storeSelected: values.storeSelected,
    userSelected:
      values.selectEmployeeType === EnumSelectedEmployeeType.HIERARCHY
        ? {
            excludeIds: [],
            isCheckedAll: false,
            selectedIds: [],
          }
        : values.userSelected,
    isOrganize: values.selectEmployeeType === EnumSelectedEmployeeType.HIERARCHY,
  }
}
