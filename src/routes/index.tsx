import async from "../components/Async"
import { RouteType } from "../types/routes"

import {
  // BookOpen,
  // Briefcase,
  // Calendar as CalendarIcon,
  // CheckSquare,
  // CreditCard,
  // Grid,
  // Heart,
  // Layout,
  // List,
  // Map,
  // Monitor,
  // ShoppingCart,
  // PieChart,
  Sliders,
  Users,
} from "react-feather"
import paths from "../constants/paths"
import Icon from "../components/common/Icon"
import { PERMISSIONS } from "../services/enum-typed"

const Wiki = async(() => import("../modules/Wiki"))
const User = async(() => import("../modules/User"))
const Role = async(() => import("../modules/Role"))
// const Profile = async(() => import("../modules/Profile"))

const Template = async(() => import("../modules/Template"))
const QuotaGrade = async(() => import("../modules/ManageGrade/QuotaGrade"))
const ManageCalibration = async(() => import("../modules/ManageCalibration"))
const TrackAssessment = async(() => import("../modules/TrackAssessment"))
const Dashboard = async(() => import("../modules/Dashboard"))
const Report = async(() => import("../modules/Report"))

const ManageKpi = async(() => import("../modules/ManageKpi"))
const ManageKpiHistory = async(() => import("../modules/ManageKpi/KpiHistory"))
const ManageKpiCreate = async(() => import("../modules/ManageKpi/CreateKpi"))
const ManageKpiCopyKpiLibrary = async(() => import("../modules/ManageKpi/CopyKpiLibrary"))
const ManageKpiCopyKpi = async(() => import("../modules/ManageKpi/CopyKpi"))
const ManageKpiEditKpi = async(() => import("../modules/ManageKpi/EditKpi"))

const SetForm = async(() => import("../modules/SetForm"))
const KpiLibrary = async(() => import("../modules/KpiLibrary"))

const KpiPeriodTemplate = async(() => import("../modules/KpiPeriodTemplate"))

const SignIn = async(() => import("../theme-pages/auth/SignIn"))
const UserNotFound = async(() => import("../modules/CPALL/UserNotFound"))

//TODO:ใส่header ชื่อเดียวกันเพื่อจัดกลุ่ม

const wikiRoutes = {
  id: "Wiki",
  path: paths.wiki(),
  icon: <Sliders />,
  component: Wiki,
  children: null,
  header: "การประเมิน",
}

const userNotFoundRoutes = {
  id: "Wiki",
  path: paths.userNotFound(),
  icon: <Sliders />,
  component: UserNotFound,
  children: null,
}

// const profileRoutes = {
//   id: "Profile",
//   path: paths.profile(),
//   icon: <Sliders />,
//   component: Profile,
//   children: null,
// }

const userRoutes: RouteType = {
  id: "ดูข้อมูลพนักงาน",
  path: paths.user(),
  icon: <Icon iconName={"userSquareSidebar"} />,
  component: User,
  children: null,
  permissions: [PERMISSIONS.MANAGE_USER_MANAGE_USER_READ],
  header: "การประเมิน",
}

const roleRoutes: RouteType = {
  id: "บทบาท",
  path: paths.role(),
  icon: <Sliders />,
  component: Role,
  children: null,
  permissions: [PERMISSIONS.MANAGE_ROLE_MANAGE_ROLE_READ],
}

const templateRoutes = {
  id: "การจัดการเทมเพลตการประเมิน",
  path: paths.template(),
  icon: <Icon iconName={"appWindowSidebar"} />,
  component: Template,
  children: null,
  permissions: [PERMISSIONS.MANAGE_TEMPLATE_MANAGE_TEMPLATE_READ],
  header: "การประเมิน",
}

const trackAssessmentRoutes = {
  id: "ติดตามการประเมินที่ดำเนินการอยู่",
  path: paths.trackAssessment(),
  icon: <Icon iconName={"magnifyingGlassSidebar"} />,
  component: TrackAssessment,
  permissions: [
    PERMISSIONS.TRACK_ASSESSMENT_KPI_READ,
    PERMISSIONS.TRACK_ASSESSMENT_ONE_YEAR_READ,
    PERMISSIONS.TRACK_ASSESSMENT_PROBATION_READ,
  ],
  children: null,
  header: "การประเมิน",
}

// const probationRoutes = {
//   id: "Probation",
//   path: paths.probation(),
//   icon: <Sliders />,
//   component: Probation,
//   children: null,
// }

const kpiLibraryRoutes = {
  id: "KPI Library",
  path: paths.kpiLibrary(),
  icon: <Icon iconName={"cardholderSidebar"} />,
  component: KpiLibrary,
  children: null,
  permissions: [PERMISSIONS.MANAGE_KPI_LIBRARY_MANAGE_KPI_LIBRARY_READ],
  header: "การประเมิน",
}

const setFormRoutes = {
  id: "การจัดการแบบฟอร์มการประเมิน",
  path: paths.setForm(),
  icon: <Icon iconName={"listPlusSidebar"} />,
  component: SetForm,
  children: null,
  permissions: [
    PERMISSIONS.MANAGE_FORMS_ONE_YEAR_READ,
    PERMISSIONS.MANAGE_FORMS_KPI_READ,
    PERMISSIONS.MANAGE_FORMS_PROBATION_READ,
  ],
  header: "การประเมิน",
}

const manageGradeRoutes = {
  id: "การจัดการโควต้าเกรด",
  path: paths.manageGrade(),
  icon: <Icon iconName={"starSidebar"} />,
  component: QuotaGrade,
  permissions: [PERMISSIONS.MANAGE_GRADE_MANAGE_GRADE_READ],
  children: null,
  header: "การประเมิน",
}

const manageCalibrationRoutes: RouteType = {
  id: "จัดการวงปรับเทียบผลงาน (Calibration)",
  path: paths.manageCalibration(),
  icon: <Icon iconName={"slidersSidebar"} />,
  component: ManageCalibration,
  permissions: [PERMISSIONS.MANAGE_CALIBRATION_MANAGE_CALIBRATION_READ],
  children: null,
  header: "การประเมิน",
}

const manageKpiRoutes = {
  id: "สร้างเป้าหมายให้พนักงาน",
  path: paths.manageKpi(),
  icon: <Icon iconName={"targetSidebar"} />,
  component: ManageKpi,
  permissions: [PERMISSIONS.MANAGE_KPI_ASSIGNMENT_MANAGE_KPI_ASSIGNMENT_READ],
  children: null,
  header: "การประเมิน",
}

const manageKpiHistoryRoutes = {
  id: "ManageKpiHistory",
  path: paths.manageKpiHistory(),
  icon: <Sliders />,
  component: ManageKpiHistory,
  children: null,
}

const manageKpiCreateRoutes = {
  id: "ManageKpiCreate",
  path: paths.manageKpiCreate(),
  icon: <Sliders />,
  component: ManageKpiCreate,
  permissions: [PERMISSIONS.MANAGE_KPI_ASSIGNMENT_MANAGE_KPI_ASSIGNMENT_CREATE],
  children: null,
}

const manageKpiCopyKpiLibraryRoutes = {
  id: "ManageKpiCopyKpiLibrary",
  path: paths.manageKpiCopyKpiLibrary(),
  icon: <Sliders />,
  component: ManageKpiCopyKpiLibrary,
  permissions: [PERMISSIONS.MANAGE_KPI_LIBRARY_MANAGE_KPI_LIBRARY_CREATE],
  children: null,
}
const manageKpiCopyKpiRoutes = {
  id: "ManageKpiCopyKpi",
  path: paths.manageKpiCopyKpi(),
  icon: <Sliders />,
  component: ManageKpiCopyKpi,
  permissions: [PERMISSIONS.MANAGE_KPI_ASSIGNMENT_MANAGE_KPI_ASSIGNMENT_CREATE],
  children: null,
}
const manageKpiEditKpiRoutes = {
  id: "ManageKpiEditKpi",
  path: paths.manageKpiEditKpi(),
  icon: <Sliders />,
  component: ManageKpiEditKpi,
  permissions: [PERMISSIONS.MANAGE_KPI_ASSIGNMENT_MANAGE_KPI_ASSIGNMENT_UPDATE],
  children: null,
}

const kpiPeriodTemplateCreate = {
  id: "KpiPeriodTemplate",
  path: paths.kpiPeriodTemplate(),
  icon: <Sliders />,
  component: KpiPeriodTemplate,
  children: null,
}

const reportRoutes = {
  id: "ดูรายงานผลการประเมิน",
  path: paths.report(),
  icon: <Icon iconName={"chartLineUpSidebar"} />,
  component: Report,
  permissions: [PERMISSIONS.REPORT_REPORT_READ],
  children: null,
  header: "การประเมิน",
}

const dashboardsRoutes: RouteType = {
  id: "แดชบอร์ดของฉัน",
  path: paths.dashboard(),
  icon: <Icon iconName={"dashboardSidebar"} />,
  component: Dashboard,
  children: null,
}

// const dashboardsRoutes = {
//   id: "Dashboard",
//   path: "/dashboard",
//   header: "Pages",
//   icon: <Sliders />,
//   containsHome: true,
//   children: [
//     {
//       path: "/dashboard/default",
//       name: "Default",
//       component: Default,
//     },
//     {
//       path: "/dashboard/analytics",
//       name: "Analytics",
//       component: Analytics,
//     },
//     {
//       path: "/dashboard/saas",
//       name: "SaaS",
//       component: SaaS,
//     },
//   ],
//   component: null,
// }

const authRoutes = {
  id: "Auth",
  path: paths.auth(),
  icon: <Users />,
  children: [
    {
      path: paths.signIn(),
      name: "Sign In",
      component: SignIn,
    },
  ],
  component: null,
}

// Routes using the Dashboard layout
export const dashboardLayoutRoutes = [
  wikiRoutes,
  reportRoutes,
  dashboardsRoutes,
  userRoutes,
  roleRoutes,
  // profileRoutes,
  //kpiTemplateRoutes,
  templateRoutes,
  setFormRoutes,
  kpiLibraryRoutes,
  kpiPeriodTemplateCreate,
  manageGradeRoutes,
  manageCalibrationRoutes,
  manageKpiCopyKpiLibraryRoutes,
  manageKpiCopyKpiRoutes,
  manageKpiEditKpiRoutes,
  manageKpiHistoryRoutes,
  manageKpiCreateRoutes,
  manageKpiRoutes,
  trackAssessmentRoutes,
  userNotFoundRoutes,
  // calibrationHistoryRoutes,
  // pagesRoutes,
  // projectsRoutes,
  // orderRoutes,
  // invoiceRoutes,
  // tasksRoutes,
  // calendarRoutes,
  // componentsRoutes,
  // chartRoutes,
  // formsRoutes,
  // tablesRoutes,
  // iconsRoutes,
  // mapsRoutes,
  // documentationRoutes,
  // changelogRoutes,
]

// Routes using the Auth layout
export const authLayoutRoutes = [authRoutes]

// Routes using the Presentation layout
export const presentationLayoutRoutes = [
  // landingRoutes
]

// Routes that are protected
export const protectedRoutes = [
  // protectedPageRoutes
]

// Routes visible in the sidebar
export const sidebarRoutes: RouteType[] = [
  dashboardsRoutes,
  reportRoutes,
  //roleRoutes,
  userRoutes,
  trackAssessmentRoutes,
  manageKpiRoutes,
  manageCalibrationRoutes,
  //templateRoutes,
  //setFormRoutes,
  //kpiLibraryRoutes,
  //manageGradeRoutes,
  // wikiRoutes,
  //kpiTemplateRoutes,
  //kpiPeriodTemplateCreate,
  // pagesRoutes,
  // projectsRoutes,
  // orderRoutes,
  // invoiceRoutes,
  // tasksRoutes,
  // calendarRoutes,
  // authRoutes,
  // componentsRoutes,
  // chartRoutes,
  // formsRoutes,
  // tablesRoutes,
  // iconsRoutes,
  // mapsRoutes,
  // documentationRoutes,
  // changelogRoutes,
]
