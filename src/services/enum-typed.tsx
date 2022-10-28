// shared enum typed

export enum KpiType {
  INDIVIDUAL = "individual",
  MGR_VIEW = "mgr_view",
  MGR_EDIT = "mgr_edit",
  COMPANY = "company",
  OTHER = "other",
}

export enum UnitType {
  PERCENT = "percent",
  CALL = "call",
  PPM = "ppm",
  SKU = "sku",
  PERSON = "person",
  TIME = "time",
  SCORE = "score",
  PROJECT = "project",
  BATH = "bath",
  SUBJECT = "subject",
  MILLION_BATH = "million_bath",
  DAY = "day",
  DATE = "date",
  BRANCH = "branch",
  OTHER = "other",
}

export enum ScoreType {
  POSITIVE = "positive",
  NEGATIVE = "negative",
}

export enum QuarterType {
  QUARTET_ONE = "Q1",
  QUARTET_TWO = "Q2",
  QUARTET_THREE = "Q3",
  QUARTET_FOUR = "Q4",
  FIRST_HALF = "first_half",
  SECOND_HALF = "second_half",
}

export enum StateKpiType {
  SET_GOAL = "set_goal",
  APPROVE_GOAL = "approve_goal",
  SELF_EVALUATION = "self_evaluation",
  MANAGER_EVALUATION = "manager_evaluation",
  CALIBRATION = "calibration",
  MEETING = "1-1_meeting",
  ACCEPT_GRADE = "accept_grade",
}

export const kpiStateSequence = [
  StateKpiType.SET_GOAL,
  StateKpiType.APPROVE_GOAL,
  StateKpiType.SELF_EVALUATION,
  StateKpiType.MANAGER_EVALUATION,
  StateKpiType.CALIBRATION,
  StateKpiType.MEETING,
  StateKpiType.ACCEPT_GRADE,
]

export enum AssessmentType {
  THREE_SIXTY_DEGREE = "360degree",
  PROBATION = "probation",
  ONE_YEAR = "1year",
  PROBATION_SIXTY_DAY = "probation_60_day",
  PROBATION_ONE_HUNDRED_DAY = "probation_100_day",
}

export enum TemplateType {
  KPI = "kpi",
  ONE_YEAR = "one_year",
  PROBATION = "probation",
}

export enum GoalCategoryType {
  FINANCIAL = "financial",
  CUSTOMER = "customer",
  INTERNAL_PROCESS = "internal process",
  LEARNING_AND_GROWTH = "learning & growth",
  SUSTAINABILITY = "sustainability",
  OTHER = "other",
}

export enum PositionTargetType {
  ONE = "1",
  TWO = "2",
  THREE = "3",
  FOUR = "4",
  FIVE = "5",
  SIX = "6",
  SEVEN = "7",
  EIGHT = "8",
  NINE = "9",
  TEN = "10",
}

export enum KpiStatus {
  NEW = "new",
  SENT = "sent",
  APPROVED = "approved",
  MGR_REVIEW = "mgr_review",
  CALIBRATION = "calibration",
  ONE_ONE_MEETING = "1_1meeting",
  ACCEPT_GRADES = "accept_grade",
}

export enum StateComponentType {
  SELF_EVALUATION = "self_evaluation",
  OTHER_SELF_EVALUATION = "other_self_evaluation",
  OTHER_EVALUATION = "other_evaluation",
  ONE_YEAR_FOR_THREE_MGR_EVALUATION = "one_year_for_three_mgr_evaluation",
  PROBATION_EVALUATION = "probation_evaluation",
  ONE_YEAR_FOR_FOUR_MGR_EVALUATION = "one_year_for_four__mgr_evaluation",
  SELF_PROBATION = "self_probation",
  MULTI_PROBATION = "multi_probation",
  ONE_YEAR_ACCEPT_GRADE_FOR_EMPLOYEE = "one_year_accept_grade_for_employee",
  ONE_YEAR_MULTIPLE_MGR_ONE_AND_TWO = "one_year_multiple_mgr_one_and_two",
  ONE_YEAR_MULTIPLE_MGR_THREE_AND_FOUR = "one_year_multiple_mgr_three_and_four",
  TEMPLATE = "template",
  TEMPLATE_CREATE = "template_create",
  MANAGE_CALIBRATION = "manage_calibration",
  CREATE_KPI = "create_kpi",
}

export enum OtherStateType {
  BEHAVIOR_SELECT = "behavior_select",
  BEHAVIOR_ASSESSMENT = "behavior_assessment",
  SENT_GRADE = "sent_grade",
  SENT_COMMENT = "sent_comment",
}

// ประเมินผลการทดลองงาน
export enum AssessmentProbationStates {
  SIXTY_MGR_REVIEW = "sixty_mgr_review",
  SIXTY_ONE_ONE_MEETING = "sixty_1-1meeting",
  SIXTY_ACCEPT_GRADE = "sixty_accept_grade",
  HUNDRED_MGR_REVIEW = "hundred_mgr_review",
  HUNDRED_ONE_ONE_MEETING = "hundred_1-1meeting",
  HUNDRED_ACCEPT_GRADE = "hundred_accept_grade",
}

// ประเมินผลงานครบรอบ 1 ปี
export enum OneYearForThreeMGRStates {
  FIRST_MGR_REVIEW = "first_mgr_review",
  SECOND_MGR_REVIEW = "second_mgr_review",
  THIRD_MGR_REVIEW = "third_mgr_review",
  FIRST_MGR_SEND_ASSESSMENT = "first_mgr_send_assessment",
  ACCEPT_RESULT_ASSESSMENT = "accept_result_assessment",
}

// ประเมินผลงานครบรอบ 1 ปี
export enum OneYearForFourMGRStates {
  FIRST_MGR_REVIEW = "first_mgr_review",
  SECOND_MGR_REVIEW = "second_mgr_review",
  THIRD_MGR_REVIEW = "third_mgr_review",
  FOURTH_MGR_REVIEW = "fourth_mgr_review",
  FIRST_MGR_SEND_ASSESSMENT = "first_mgr_send_assessment",
  ACCEPT_RESULT_ASSESSMENT = "accept_result_assessment",
}

export enum TemplateState {
  SETTING_TEMPLATE = "setting_template",
  CONFIRM_TEMPLATE = "confirm_template",
}

export enum TemplateCreateState {
  SETTING_TEMPLATE = "setting_template",
  SET_TARGET = "set_target",
  SELECT_EMPLOYEE = "select_employee",
  CONFIRM_TEMPLATE = "confirm_template",
}

export enum CalibrationSettingState {
  SETTING_FINAL_CALIBRATION = "setting_final_calibration",
  SETTING_SUB_CALIBRATION = "setting_sub_calibration",
}

export enum SelfProbationStates {
  SIXTY_ACCEPT_GRADE = "sixty_accept_grade",
  HUNDRED_ACCEPT_GRADE = "hundred_accept_grade",
}

export enum MultipleProbationState {
  ASSESSMENT = "first_mgr_review",
  COMMENT = "comment",
}

export enum OneYearMultipleMGROneAndTwo {
  BEHAVIOURAL_ASSESSMENT = "behavioral_assessment",
  GRADE = "grade",
  SUGGEST_AND_OUTSTANDING_WORK = "suggest_and_outstanding_work",
}

export enum OneYearMultipleMGRThreeAndFour {
  GRADE = "grade",
  SUGGEST_AND_OUTSTANDING_WORK = "suggest_and_outstanding_work",
}

export enum OneYearAcceptGradeForEmployee {
  ACCEPT_RESULT_ASSESSMENT = "accept_result_assessment",
}

export enum AssessmentStatus {
  MGR_REVIEW = "mgr_review",
  ONE_ONE_MEETING = "1-1meeting",
  ACCEPT_GRADE = "accept_grade",
}

export enum FormType {
  QUARTER = "quarter",
  YEAR = "year",
  HALF_YEAR = "half_year",
  OTHER = "other",
}

export enum GetAssessmentTransactionOrderBy {
  name = "name",
  gradeDesc = "gradeDesc",
  gradeAsc = "gradeAsc",
  endDate = "endDate",
  hireDate = "hireDate",
  storeName = "storeName",
}

export enum OrderOptionMultiple {
  ORDER_BY_NAME = "name",
  ORDER_BY_POSITION_NAME = "position_name",
  ORDER_BY_EXPIRED_DATE = "expired_date",
  ORDER_BY_CREATED_AT = "created_at",
}

export const kpiStatusSequence = [
  KpiStatus.NEW,
  KpiStatus.SENT,
  KpiStatus.APPROVED,
  KpiStatus.MGR_REVIEW,
  KpiStatus.CALIBRATION,
  KpiStatus.ONE_ONE_MEETING,
  KpiStatus.ACCEPT_GRADES,
]

export enum ResetState {
  NEW = "new",
  SENT = "sent",
  REJECT = "reject",
}

export enum PositionLevel {
  STAFF = "staff",
  SUP = "sup",
  MGR = "mgr",
  S_MGR = "s_mgr",
  FH = "fh",
  MD = "md",
}

export enum EmployeeType {
  FULL_TIME = "full time",
  PART_TIME = "part time",
}

export enum AssessmentTemplateTableHeader {
  NAME = "name",
  TYPE = "type",
  START_DATE = "start_date",
  END_DATE = "end_date",
  CREATED_AT = "created_at",
  STATUS = "status",
}

export const kpiStatePairKpiStatus = {
  ...kpiStatusSequence.reduce((acc: Partial<Record<KpiStatus, StateKpiType>>, cur, index) => {
    acc[cur] = kpiStateSequence[index]
    return acc
  }, {}),
  ...kpiStateSequence.reduce((acc: Partial<Record<StateKpiType, KpiStatus>>, cur, index) => {
    acc[cur] = kpiStatusSequence[index]
    return acc
  }, {}),
  toKpiStatus: function (state: StateKpiType) {
    return this[state]
  },
  toStateKpi: function (kpiStatus: KpiStatus) {
    return this[kpiStatus]
  },
}

export enum SortingState {
  ASCENDING = "ascending",
  DESCENDING = "descending",
  UNSORTED = "unsorted",
}

export enum CalibrateType {
  SUB_CALIBRATION = "sub_calibration",
  FINAL_CALIBRATION = "final_calibration",
}

export enum CalibratorType {
  COMMITTEE = "committee",
  OWNER = "owner",
  HR = "hr",
  SUBJECT = "subject",
}

export enum CalibrationState {
  PENDING = "pending",
  WAITING = "waiting",
  CALIBRATING = "calibrating",
  COMPLETE = "complete",
}

export enum CreateKpiState {
  FILL_DETAIL = "fill_detail",
  CHOOSE_EMPLOYEES = "choose_employee",
  EVALUATE_AND_CONFIRM = "evaluate_and_confirm",
}

export enum GetAllUserOrder {
  NAME_ASC = "name_asc",
  NAME_DESC = "name_desc",
  POSITION_NAME_ASC = "position_name_asc",
  POSITION_NAME_DESC = "position_name_desc",
  COMPANY_NAME_ASC = "company_name_asc",
  COMPANY_NAME_DESC = "company_name_desc",
  STORE_NAME_ASC = "store_name_asc",
  STORE_NAME_DESC = "store_name_desc",
}

export enum GetAllUserFilter {
  ALL = "all",
  STATUS_ACTIVE = "status_active",
  STATUS_INACTIVE = "status_inactive",
}

export enum EnumColumnUserTitle {
  NAME = "ชื่อ - นามสกุล",
  STORE = "หน่วยงาน",
  COMPANY = "บริษัท",
  STATUS = "สถานะ",
}

export enum RoleFilterByOptions {
  ALL = "all",
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export enum RoleOrderByOptions {
  NAME_ASC = "name_asc",
  NAME_DESC = "name_desc",
  STATUS_ASC = "status_asc",
  STATUS_DESC = "status_desc",
}

export enum PERMISSIONS {
  MANAGE_USER_MANAGE_USER_READ = "manage_user_manage_user_read",
  MANAGE_USER_MANAGE_USER_UPDATE = "manage_user_manage_user_update",
  MANAGE_USER_MANAGE_USER_NOTIFICATION_USER_DATA = "manage_user_manage_user_notification_user_data",
  MANAGE_ROLE_MANAGE_ROLE_CREATE = "manage_role_manage_role_create",
  MANAGE_ROLE_MANAGE_ROLE_READ = "manage_role_manage_role_read",
  MANAGE_ROLE_MANAGE_ROLE_DELETE = "manage_role_manage_role_delete",
  MANAGE_ROLE_MANAGE_ROLE_UPDATE = "manage_role_manage_role_update",
  MANAGE_FORMS_ONE_YEAR_READ = "manage_forms_one_year_read",
  MANAGE_FORMS_ONE_YEAR_CREATE = "manage_forms_one_year_create",
  MANAGE_FORMS_ONE_YEAR_UPDATE = "manage_forms_one_year_update",
  MANAGE_FORMS_ONE_YEAR_DELETE = "manage_forms_one_year_delete",
  MANAGE_FORMS_KPI_READ = "manage_forms_kpi_read",
  MANAGE_FORMS_KPI_CREATE = "manage_forms_kpi_create",
  MANAGE_FORMS_KPI_UPDATE = "manage_forms_kpi_update",
  MANAGE_FORMS_KPI_DELETE = "manage_forms_kpi_delete",
  MANAGE_FORMS_PROBATION_READ = "manage_forms_probation_read",
  MANAGE_FORMS_PROBATION_CREATE = "manage_forms_probation_create",
  MANAGE_FORMS_PROBATION_UPDATE = "manage_forms_probation_update",
  MANAGE_FORMS_PROBATION_DELETE = "manage_forms_probation_delete",
  MANAGE_TEMPLATE_MANAGE_TEMPLATE_CREATE = "manage_template_manage_template_create",
  MANAGE_TEMPLATE_MANAGE_TEMPLATE_READ = "manage_template_manage_template_read",
  MANAGE_TEMPLATE_MANAGE_TEMPLATE_DELETE = "manage_template_manage_template_delete",
  MANAGE_TEMPLATE_MANAGE_TEMPLATE_UPDATE = "manage_template_manage_template_update",
  MANAGE_KPI_LIBRARY_MANAGE_KPI_LIBRARY_CREATE = "manage_kpi_library_manage_kpi_library_create",
  MANAGE_KPI_LIBRARY_MANAGE_KPI_LIBRARY_READ = "manage_kpi_library_manage_kpi_library_read",
  MANAGE_KPI_LIBRARY_MANAGE_KPI_LIBRARY_DELETE = "manage_kpi_library_manage_kpi_library_delete",
  MANAGE_KPI_LIBRARY_MANAGE_KPI_LIBRARY_UPDATE = "manage_kpi_library_manage_kpi_library_update",
  MANAGE_GRADE_MANAGE_GRADE_READ = "manage_grade_manage_grade_read",
  MANAGE_GRADE_MANAGE_GRADE_UPDATE = "manage_grade_manage_grade_update",
  MANAGE_CALIBRATION_MANAGE_CALIBRATION_READ = "manage_calibration_manage_calibration_read",
  MANAGE_CALIBRATION_MANAGE_CALIBRATION_CREATE = "manage_calibration_manage_calibration_create",
  MANAGE_CALIBRATION_MANAGE_CALIBRATION_DELETE = "manage_calibration_manage_calibration_delete",
  MANAGE_CALIBRATION_MANAGE_CALIBRATION_UPDATE = "manage_calibration_manage_calibration_update",
  REPORT_REPORT_READ = "report_report_read",
  REPORT_REPORT_REPORT = "report_report_report",
  DASHBOARD_DASHBOARD_READ = "dashboard_dashboard_read",
  MANAGE_KPI_ASSIGNMENT_MANAGE_KPI_ASSIGNMENT_READ = "manage_kpi_assignment_manage_kpi_assignment_read",
  MANAGE_KPI_ASSIGNMENT_MANAGE_KPI_ASSIGNMENT_CREATE = "manage_kpi_assignment_manage_kpi_assignment_create",
  MANAGE_KPI_ASSIGNMENT_MANAGE_KPI_ASSIGNMENT_UPDATE = "manage_kpi_assignment_manage_kpi_assignment_update",
  MANAGE_KPI_ASSIGNMENT_MANAGE_KPI_ASSIGNMENT_DELETE = "manage_kpi_assignment_manage_kpi_assignment_delete",
  TRACK_ASSESSMENT_KPI_READ = "track_assessment_kpi_read",
  TRACK_ASSESSMENT_KPI_CALIBRATE = "track_assessment_kpi_calibrate",
  TRACK_ASSESSMENT_PROBATION_READ = "track_assessment_probation_read",
  TRACK_ASSESSMENT_PROBATION_UPDATE = "track_assessment_probation_update",
  TRACK_ASSESSMENT_ONE_YEAR_READ = "track_assessment_one_year_read",
}

export enum UserInRoleOrderByOptions {
  EMPLOYEE_ID_ASC = "employee_id_asc",
  EMPLOYEE_ID_DESC = "employee_id_desc",
  NAME_ASC = "name_asc",
  NAME_DESC = "name_desc",
  POSITION_ASC = "position_asc",
  POSITION_DESC = "position_desc",
}

export enum FormFilterOptions {
  PROBATION = "probation",
  ONE_YEAR = "one_year",
  KPI = "kpi",
}

export enum ColumnSetFormTable {
  NAME = "ชื่อฟอร์ม",
  TYPE = "ประเภท",
  START_DATE = "วันที่เริ่มการประเมิน",
  END_DATE = "วันที่จบการประเมิน",
  CREATED_AT = "วันที่สร้าง",
  STATUS = "สถานะ",
}

export enum ManageKpiColumnTitle {
  KPI_TYPE = "kpiTypeTitle",
  NAME = "nameTitle",
  WEIGHT = "weightTitle",
  ACTUAL = "actualTitle",
  TARGET = "targetTitle",
  COUNT = "countTitle",
}

export enum ManageKpiOrder {
  KPI_TYPE_ASC = "kpi_type_asc",
  KPI_TYPE_DESC = "kpi_type_desc",
  NAME_ASC = "name_asc",
  NAME_DESC = "name_desc",
  WEIGHT_ASC = "weight_asc",
  WEIGHT_DESC = "weight_desc",
  ACTUAL_ASC = "actual_asc",
  ACTUAL_DESC = "actual_desc",
  TARGET_ASC = "target_asc",
  TARGET_DESC = "target_desc",
  KPI_TRANSACTION_MAPPING_COUNT_ASC = "kpi_transaction_mapping_count_asc",
  KPI_TRANSACTION_MAPPING_COUNT_DESC = "kpi_transaction_mapping_count_desc",
}

export enum MyCrewOrder {
  EMP_ID_ASC = "emp_id_asc",
  EMP_ID_DESC = "emp_id_desc",
  NAME_ASC = "name_asc",
  NAME_DESC = "name_desc",
  POSITION_NAME_ASC = "position_name_asc",
  POSITION_NAME_DESC = "position_name_desc",
  STORE_NAME_ASC = "store_name_asc",
  STORE_NAME_DESC = "store_name_desc",
}

export enum EnumCreateJobStatus {
  IN_PROGRESS = "in-progress",
  ERROR = "error",
  COMPLETE = "complete",
}

export enum EnumKpiStatusTrackFilter {
  ALL = "all",
  NEW = "new",
  SENT = "sent",
  APPROVED = "approved",
  MGR_REVIEW = "mgr_review",
  CALIBRATION = "calibration",
  ONE_ONE_MEETING = "1_1meeting",
  ACCEPT_GRADE = "accept_grade",
}

export enum EnumOneYearStatusTrackFilter {
  ALL = "all",
  MGR1_REVIEW = "mgr1_review",
  MGR2_REVIEW = "mgr2_review",
  MGR3_REVIEW = "mgr3_review",
  MGR4_REVIEW = "mgr4_review",
  ONE_ONE_MEETING = "1-1meeting",
  ACCEPT_GRADE = "accept_grade",
}

export enum EnumProbationStatusTrackFilter {
  ALL = "all",
  MGR1_REVIEW = "mgr1_review",
  MGR2_REVIEW = "mgr2_review",
  ONE_ONE_MEETING = "1-1meeting",
  ACCEPT_GRADE = "accept_grade",
}

export enum EnumProbationResultTrackFilter {
  ALL = "all",
  SIXTY_DAY_PASSED = "60day_passed",
  HUNDRED_DAY_PASSED = "100day_passed",
  SIXTY_DAY_NOT_PASSED = "60day_not_passed",
  HUNDRED_DAY_NOT_PASSED = "100day_not_passed",
}
