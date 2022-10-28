import "react-responsive-carousel/lib/styles/carousel.min.css"
import styled from "@emotion/styled"
import { ReactComponent as ProfileCircle } from "../assets/images/profile-circle.svg"
import { useMemo } from "react"
import { compact } from "lodash"
import { useTranslation } from "react-i18next"
import { mobile } from "../utils/responsive-helper"
import Collapse, { CollapseItemType } from "./common/Collapse"
import Sarabun from "./common/Sarabun"
import { GRAYSCALE_DARKGRAY_60 } from "../constants/colors"
import { useCurrentUser } from "../services/auth/auth-query"

const ProfileCardLayout = styled.div`
  display: flex;
  flex-flow: row;
  grid-column-gap: 24px;
  align-items: center;
`

const ProfileDetailLayout = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-areas:
    "position department approver"
    "position-label department-label approver-label";
  grid-column-gap: 33px;
  grid-row-gap: 12px;
  .position {
    grid-area: position;
  }
  .position-label {
    grid-area: position-label;
  }
  .department {
    grid-area: department;
  }
  .department-label {
    grid-area: department-label;
  }
  .approver {
    grid-area: approver;
  }
  .approver-label {
    grid-area: approver-label;
  }

  ${mobile} {
    grid-template-columns: auto;
    grid-template-areas:
      "position"
      "position-label"
      "department"
      "department-label"
      "approver"
      "approver-label";

    .position,
    .position-label,
    .department,
    .department-label,
    .approver,
    .approver-label {
    }
  }
`

const ProfileImageStyled = styled(ProfileCircle)`
  width: 64px;
  height: 64px;
`

const CollapseStyled = styled(Collapse)`
  #panel1a-header {
    .expand-icon {
      width: 40px;
      height: 40px;
    }
    > div {
      margin: unset;
    }
  }
  #panel1a-content {
    > div {
      padding-top: unset;
      padding-left: 112px;
      ${mobile} {
        padding-left: 1.3rem;
      }
    }
  }
`

const DashboardProfile = () => {
  const collapseItems: Array<CollapseItemType> = [
    {
      title: <ProfileCard />,
      content: <ProfileDetail />,
    },
  ]

  return <CollapseStyled items={collapseItems} defaultExpanded={false} />
}

const ProfileCard = () => {
  const { t } = useTranslation()
  const { data: currentUserData } = useCurrentUser()
  const { user } = currentUserData || {}

  const employeeName = useMemo(() => {
    if (user) {
      const { prefix, firstName, lastName } = user || {}
      return compact([prefix, firstName, lastName]).join(" ")
    } else {
      return "-"
    }
  }, [user])

  return (
    <ProfileCardLayout>
      <ProfileImageStyled />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Sarabun size={20} weight={800}>
          {employeeName}
        </Sarabun>
        <Sarabun size={16} weight={400}>
          {`${t("EID")}: ${user?.employeeId || "-"}`}
        </Sarabun>
      </div>
    </ProfileCardLayout>
  )
}

const ProfileDetail = () => {
  const { t } = useTranslation()
  const { data: dashboardData } = useCurrentUser()
  const { user } = dashboardData || {}
  const { position, store, defaultManager } = user || {}
  return (
    <ProfileDetailLayout>
      <Sarabun className="position" size={14} weight={500} color={GRAYSCALE_DARKGRAY_60}>
        {`${t("ตำแหน่ง")}:`}
      </Sarabun>
      <Sarabun className="department" size={14} weight={500} color={GRAYSCALE_DARKGRAY_60}>
        {`${t("หน่วยงาน")}:`}
      </Sarabun>
      <Sarabun className="approver" size={14} weight={500} color={GRAYSCALE_DARKGRAY_60}>
        {`${t("ผู้ประเมิน")}:`}
      </Sarabun>
      <Sarabun className="position-label" size={18} weight={700}>
        {position?.name || "-"}
      </Sarabun>
      <Sarabun className="department-label" size={18} weight={700}>
        {store?.name || "-"}
      </Sarabun>
      <Sarabun className="approver-label" size={18} weight={700}>
        {compact([
          defaultManager?.prefix,
          defaultManager?.firstName,
          defaultManager?.lastName,
        ]).join(" ") || "-"}
      </Sarabun>
    </ProfileDetailLayout>
  )
}

export default DashboardProfile
