import React from "react"
import { Box } from "@mui/material"
import styled from "styled-components/macro"
import { useTranslation } from "react-i18next"
import Sarabun from "../../../components/common/Sarabun"
import { User } from "../../../services/entity-typed"
import { GRAYSCALE_DARKGRAY_60, SEMANTIC_SUCCESS_MAIN } from "../../../constants/colors"
import { normalizeDateTH } from "../../../utils/helper"

const GridLayoutDisplay = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 24px;
  height: auto;
`
const GridLayoutHalf = styled.div`
  display: flex;
  align-content: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  grid-row-gap: 24px;
`
const GridLayoutItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
`

const BoxDetail = styled(Box)`
  //width: 808px;
`
const RowGap = styled.div<{
  gap?: number
  padding?: number
}>`
  display: flex;
  flex-direction: row;
  gap: ${({ gap }) => `${gap}px`};
  padding: ${({ padding }) => `${padding}px`};
  width: 100%;
  align-items: center;
`

const GreenDot = styled.div`
  display: flex;
  border-radius: 50%;
  background-color: ${SEMANTIC_SUCCESS_MAIN};
  height: 8px;
  width: 8px;
  /* margin-left: 8px; */
`
const GrayDot = styled.div`
  display: flex;
  border-radius: 50%;
  background-color: ${GRAYSCALE_DARKGRAY_60};
  height: 8px;
  width: 8px;
  /* margin-left: 8px; */
`

interface UserViewProps {
  data?: User
}

const UserView = (props: UserViewProps) => {
  const { data } = props

  const { t } = useTranslation()

  return (
    <>
      <BoxDetail>
        <GridLayoutDisplay>
          <GridLayoutHalf>
            <GridLayoutItem>
              <Sarabun type="Body2">{t("table.employeeId")}</Sarabun>
              <Sarabun type="Subtitle1">{data?.employeeId}</Sarabun>
            </GridLayoutItem>
            <GridLayoutItem>
              <Sarabun type="Body2">{t("วันที่เริ่มงาน")}</Sarabun>
              <Sarabun type="Subtitle1">
                {!!data?.hireDate ? normalizeDateTH(data?.hireDate!) : "-"}
              </Sarabun>
            </GridLayoutItem>
            <GridLayoutItem>
              <Sarabun type="Body2">{t("วันที่เริ่มลาออก")}</Sarabun>
              <Sarabun type="Subtitle1">
                {!!data?.resignationDate ? normalizeDateTH(data?.resignationDate!) : "-"}
              </Sarabun>
            </GridLayoutItem>
            <GridLayoutItem>
              <Sarabun type="Body2">{t("คำนำหน้าชื่อ")}</Sarabun>
              <Sarabun type="Subtitle1">{data?.prefix}</Sarabun>
            </GridLayoutItem>
            <GridLayoutItem>
              <Sarabun type="Body2">{t("ชื่อ")}</Sarabun>
              <Sarabun type="Subtitle1">{data?.firstName}</Sarabun>
            </GridLayoutItem>
            <GridLayoutItem>
              <Sarabun type="Body2">{t("นามสกุล")}</Sarabun>
              <Sarabun type="Subtitle1">{data?.lastName}</Sarabun>
            </GridLayoutItem>
            <GridLayoutItem>
              <Sarabun type="Body2">{t("สถานะ")}</Sarabun>
              <Sarabun type="Subtitle1">
                {!!!data?.resignationDate ? (
                  <RowGap gap={8}>
                    <GreenDot />
                    <Sarabun color={SEMANTIC_SUCCESS_MAIN}>{t("ใช้งาน")}</Sarabun>
                  </RowGap>
                ) : (
                  <RowGap gap={8}>
                    <GrayDot />
                    <Sarabun color={GRAYSCALE_DARKGRAY_60}>{t("ลาออก")}</Sarabun>
                  </RowGap>
                )}
              </Sarabun>
            </GridLayoutItem>
          </GridLayoutHalf>
          <GridLayoutHalf>
            <GridLayoutItem>
              <Sarabun type="Body2">{t("บริษัท")}</Sarabun>
              <Sarabun type="Subtitle1">{data?.userCareerHistory?.company?.nameTh}</Sarabun>
            </GridLayoutItem>
            <GridLayoutItem>
              <Sarabun type="Body2">{t("สายงาน")}</Sarabun>
              <Sarabun type="Subtitle1">{data?.userCareerHistory?.jobFunction?.name}</Sarabun>
            </GridLayoutItem>
            <GridLayoutItem>
              <Sarabun type="Body2">{t("สำนักงาน")}</Sarabun>
              <Sarabun type="Subtitle1">{data?.userCareerHistory?.division?.name}</Sarabun>
            </GridLayoutItem>
            <GridLayoutItem>
              <Sarabun type="Body2">{t("ฝ่ายงาน")}</Sarabun>
              <Sarabun type="Subtitle1">{data?.userCareerHistory?.department?.name}</Sarabun>
            </GridLayoutItem>
            <GridLayoutItem>
              <Sarabun type="Body2">{t("หน่วยงาน")}</Sarabun>
              <Sarabun type="Subtitle1">{data?.userCareerHistory?.store?.name}</Sarabun>
            </GridLayoutItem>
            <GridLayoutItem>
              <Sarabun type="Body2">{t("PC Grade")}</Sarabun>
              <Sarabun type="Subtitle1">{data?.userCareerHistory?.jobLevel?.name}</Sarabun>
            </GridLayoutItem>
            <GridLayoutItem>
              <Sarabun type="Body2">{t("Job Code")}</Sarabun>
              <Sarabun type="Subtitle1">{data?.userCareerHistory?.jobCode?.description}</Sarabun>
            </GridLayoutItem>
            <GridLayoutItem>
              <Sarabun type="Body2">{t("Salary Plan")}</Sarabun>
              <Sarabun type="Subtitle1">
                {data?.userCareerHistory?.salaryAdminPlan?.description}
              </Sarabun>
            </GridLayoutItem>
            <GridLayoutItem>
              <Sarabun type="Body2">{t("ประเภทพนักงาน")}</Sarabun>
              <Sarabun type="Subtitle1">{t(`${data?.userCareerHistory?.employeeType}`)}</Sarabun>
            </GridLayoutItem>
            <GridLayoutItem>
              <Sarabun type="Body2">{t("Emp class")}</Sarabun>
              <Sarabun type="Subtitle1">
                {data?.userCareerHistory?.employeeClassification?.description}
              </Sarabun>
            </GridLayoutItem>
            <GridLayoutItem>
              <Sarabun type="Body2">{t("Supervisor Level")}</Sarabun>
              <Sarabun type="Subtitle1">
                {data?.userCareerHistory?.positionLevel?.description}
              </Sarabun>
            </GridLayoutItem>
            <GridLayoutItem>
              <></>
            </GridLayoutItem>
          </GridLayoutHalf>
        </GridLayoutDisplay>
      </BoxDetail>
    </>
  )
}

export default UserView
