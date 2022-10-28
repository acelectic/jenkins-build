import styled from "@emotion/styled"
import { useTranslation } from "react-i18next"
import {
  GRAYSCALE_DARKGRAY_100,
  GRAYSCALE_DARKGRAY_40,
  GRAYSCALE_LIGHTGRAY_10,
} from "../constants/colors"
import { EmployeeType } from "../services/enum-typed"
import Sarabun from "./common/Sarabun"

const SelectedContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: ${GRAYSCALE_LIGHTGRAY_10};
  /* border: 1px solid ${GRAYSCALE_DARKGRAY_40}; */
  border-radius: 8px;
  width: 100%;
`

const GroupColumnOuter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const GroupColumnInner = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  gap: 4px;
  margin-top: 10px;
`

const ListRow = styled.div`
  display: flex;
  border-radius: 24px;
  padding: 4px 12px;
  height: 30px;
  background-color: ${GRAYSCALE_DARKGRAY_40};
`

export type IHierarchyItems = {
  companies: string[]
  jobFunctions: string[]
  divisions: string[]
  subDivisions: string[]
  departments: string[]
  stores: string[]

  jobLevels: string[]
  jobCodes: string[]
  salaryAdminPlans: string[]
  employeeTypes: EmployeeType[] | string[]
  employeeClassifications: string[]
  positionLevels: string[]
}

export type IHierarchyViewProps = {
  items: Partial<IHierarchyItems>
}

const HierarchyView = (props: IHierarchyViewProps) => {
  const { items } = props
  const { t } = useTranslation()

  return (
    <SelectedContainer>
      <GroupColumnOuter>
        {!!items?.companies?.length && (
          <>
            <Sarabun type="Caption">{t(`บริษัท`)}</Sarabun>
            {items.companies.map((company) => {
              return (
                <ListRow>
                  <Sarabun type="Body1">{company}</Sarabun>
                </ListRow>
              )
            })}
          </>
        )}

        <GroupColumnInner>
          {!!items?.jobFunctions?.length && (
            <>
              <Sarabun type="Caption">{t(`สายงาน`)}</Sarabun>{" "}
              {items.jobFunctions.map((jobFunction) => {
                return (
                  <ListRow>
                    <Sarabun type="Body1" color={`${GRAYSCALE_DARKGRAY_100}`}>
                      {jobFunction}
                    </Sarabun>
                  </ListRow>
                )
              })}
            </>
          )}

          <GroupColumnInner>
            {!!items?.divisions?.length && (
              <>
                <Sarabun type="Caption" color={`${GRAYSCALE_DARKGRAY_100}`}>
                  {t(`สำนักงาน`)}
                </Sarabun>
                {items.divisions.map((division) => {
                  return (
                    <ListRow>
                      <Sarabun type="Body1" color={`${GRAYSCALE_DARKGRAY_100}`}>
                        {division}
                      </Sarabun>
                    </ListRow>
                  )
                })}
              </>
            )}
            <GroupColumnInner>
              {!!items?.subDivisions?.length && (
                <>
                  <Sarabun type="Caption" color={`${GRAYSCALE_DARKGRAY_100}`}>
                    {t(`ระดับด้าน`)}
                  </Sarabun>
                  {items.subDivisions.map((subDivision) => {
                    return (
                      <ListRow>
                        <Sarabun type="Body1" color={`${GRAYSCALE_DARKGRAY_100}`}>
                          {subDivision}
                        </Sarabun>
                      </ListRow>
                    )
                  })}
                </>
              )}
              <GroupColumnInner>
                {!!items?.departments?.length && (
                  <>
                    <Sarabun type="Caption" color={`${GRAYSCALE_DARKGRAY_100}`}>
                      {t(`ฝ่ายงาน`)}
                    </Sarabun>
                    {items.departments.map((department) => {
                      return (
                        <ListRow>
                          <Sarabun type="Body1" color={`${GRAYSCALE_DARKGRAY_100}`}>
                            {department}
                          </Sarabun>
                        </ListRow>
                      )
                    })}
                  </>
                )}

                <GroupColumnInner>
                  {!!items?.stores?.length && (
                    <>
                      <Sarabun type="Caption" color={`${GRAYSCALE_DARKGRAY_100}`}>
                        {t(`หน่วยงาน`)}
                      </Sarabun>
                      {items.stores.map((store) => {
                        return (
                          <ListRow>
                            <Sarabun type="Body1" color={`${GRAYSCALE_DARKGRAY_100}`}>
                              {store}
                            </Sarabun>
                          </ListRow>
                        )
                      })}
                    </>
                  )}
                </GroupColumnInner>
              </GroupColumnInner>
            </GroupColumnInner>
          </GroupColumnInner>
        </GroupColumnInner>
      </GroupColumnOuter>
      <GroupColumnOuter>
        {!!items?.jobLevels?.length && (
          <>
            <Sarabun type="Caption">{t(`PC GRADE`)}</Sarabun>
            {items.jobLevels.map((jobLevel) => {
              return (
                <ListRow>
                  <Sarabun type="Body1">{jobLevel}</Sarabun>
                </ListRow>
              )
            })}
          </>
        )}
      </GroupColumnOuter>

      <GroupColumnOuter>
        {!!items?.jobCodes?.length && (
          <>
            <Sarabun type="Caption">{t(`JOB CODE`)}</Sarabun>
            {items.jobCodes.map((jobCode) => {
              return (
                <ListRow>
                  <Sarabun type="Body1">{jobCode}</Sarabun>
                </ListRow>
              )
            })}
          </>
        )}
      </GroupColumnOuter>

      <GroupColumnOuter>
        {!!items?.salaryAdminPlans?.length && (
          <>
            <Sarabun type="Caption">{t(`SALARY PLAN`)}</Sarabun>
            {items.salaryAdminPlans.map((salaryAdminPlan) => {
              return (
                <ListRow>
                  <Sarabun type="Body1">{salaryAdminPlan}</Sarabun>
                </ListRow>
              )
            })}
          </>
        )}
      </GroupColumnOuter>

      <GroupColumnOuter>
        {!!items?.employeeTypes?.length && (
          <>
            <Sarabun type="Caption">{t(`ประเภทพนักงาน`)}</Sarabun>
            {items.employeeTypes.map((employeeType) => {
              return (
                <ListRow>
                  <Sarabun type="Body1">{t(employeeType)}</Sarabun>
                </ListRow>
              )
            })}
          </>
        )}
      </GroupColumnOuter>

      <GroupColumnOuter>
        {!!items?.employeeClassifications?.length && (
          <>
            <Sarabun type="Caption">{t(`EMP CLASS`)}</Sarabun>
            {items.employeeClassifications.map((employeeClassifications) => {
              return (
                <ListRow>
                  <Sarabun type="Body1">{employeeClassifications}</Sarabun>
                </ListRow>
              )
            })}
          </>
        )}
      </GroupColumnOuter>

      <GroupColumnOuter>
        {!!items?.positionLevels?.length && (
          <>
            <Sarabun type="Caption">{t(`SUPERVISOR LEVEL`)}</Sarabun>
            {items.positionLevels.map((positionLevel) => {
              return (
                <ListRow>
                  <Sarabun type="Body1">{positionLevel}</Sarabun>
                </ListRow>
              )
            })}
          </>
        )}
      </GroupColumnOuter>
    </SelectedContainer>
  )
}

export default HierarchyView
