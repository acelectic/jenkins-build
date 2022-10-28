import styled from "@emotion/styled"
import Card from "./common/Card"
import Sarabun from "./common/Sarabun"

import { useEffect, useMemo, useRef, useState } from "react"
import { compact } from "lodash"
import AvatarImage from "../assets/images/profile-circle.svg"

const ProfileSectionContainer = styled.div`
  position: sticky;
  top: 0;
  height: 80px;
  /* background-color: red; */
  z-index: 1001;
`

const ProfileCard = styled(Card)`
  /* width: 100%; */
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: rows;
  /* padding-left: 16px; */
`

const AvatarImg = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 16px;
`

type ProfileSectionProps = {
  firstName?: string
  lastName?: string
  titleText: string
  suffix?: string
  name?: string
}

// ได้มาจากที่นี่ https://codepen.io/smarzism/pen/yLzrPQy
const ProfileSection = (props: ProfileSectionProps) => {
  const {
    name = "มีหลายชื่อจังคิดไม่ออกแล้วนะ",
    firstName = "มอค",
    lastName = "เดต้า",
    suffix = "นาย นาง นางสาว",
    titleText,
  } = props
  const ref = useRef<HTMLDivElement>(null)
  const [isSticky, setIsSticky] = useState(false)

  const employeeName = useMemo(() => {
    // if (user) {
    //   const { suffix, firstName, lastName } = user || {}
    //   return compact([suffix, firstName, lastName]).join(" ")
    // } else {
    //   return "-"
    // }
    return "CEO พันล้าน"
  }, [])

  // useEffect(() => {
  //   const cachedRef = ref.current
  //   const observer = new IntersectionObserver(([e]) => setIsSticky(e.intersectionRatio < 1), {
  //     rootMargin: '-1px 0px 0px 0px',
  //     threshold: [1],
  //   })
  //   observer.observe(cachedRef!)
  //   return function () {
  //     cachedRef && observer.unobserve(cachedRef)
  //   }
  // }, [])

  // ได้มาจากที่นี้ https://stackoverflow.com/questions/29725828/update-style-of-a-component-onscroll-in-react-js
  useEffect(() => {
    const onScroll = () => setIsSticky(window.pageYOffset > 139)
    window.removeEventListener("scroll", onScroll)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <ProfileSectionContainer
      ref={ref}
      style={{
        backgroundColor: isSticky ? "red" : "transparent",
        marginLeft: isSticky ? -28 : 0,
        marginRight: isSticky ? -28 : 0,
      }}
      // onScroll={onScroll}
    >
      <ProfileCard
        elevation={1}
        style={{
          borderRadius: isSticky ? 0 : 8,
          paddingLeft: isSticky ? 44 : 16,
        }}
      >
        {/* <ProfileImageStyled /> */}
        <div style={{ display: "flex" }}>
          <AvatarImg src={AvatarImage} alt="avatar" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {isSticky && <Sarabun>{titleText}</Sarabun>}
            <Sarabun>{name}</Sarabun>
            {!isSticky && (
              <Sarabun style={{ marginTop: 8 }}>
                {/* {compact([
                user?.position?.name,
                "| ผู้ประเมิน:",
                user?.defaultManager?.suffix,
                user?.defaultManager?.firstName,
                user?.defaultManager?.lastName,
              ]).join(" ") || "-"} */}
                {compact([employeeName, "| ผู้ประเมิน:", suffix, firstName, lastName]).join(" ") ||
                  "-"}
              </Sarabun>
            )}
          </div>
        </div>
      </ProfileCard>
    </ProfileSectionContainer>
  )
}

export default ProfileSection
