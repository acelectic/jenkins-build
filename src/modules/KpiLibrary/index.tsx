import { Box } from "@mui/material"
import { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import Authorize from "../../components/Authorize"
import Button from "../../components/common/Button"
import Icon from "../../components/common/Icon"
import Sarabun from "../../components/common/Sarabun"
import { PRIMARY_DARK, WHITE } from "../../constants/colors"
import { PERMISSIONS } from "../../services/enum-typed"
import CreateKpiLibrary from "./CreateKpiLibrary"

import TableKpiLibrary from "./TableKpiLibrary"

export type IGoalRowProps = {}

const KpiLibrary = () => {
  const { t } = useTranslation()
  const [isOpenCreateKpiLibrary, setIsOpenCreateKpiLibrary] = useState<boolean>(false)
  const onOpenCreateKpiLibrary = useCallback(() => {
    setIsOpenCreateKpiLibrary(true)
  }, [])

  return (
    <Authorize permissions={[PERMISSIONS.MANAGE_KPI_LIBRARY_MANAGE_KPI_LIBRARY_READ]}>
      <div style={{ backgroundColor: PRIMARY_DARK }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Sarabun type="H2" color={WHITE}>
            {t(`KPI Library`)}
          </Sarabun>
          <Authorize permissions={[PERMISSIONS.MANAGE_KPI_LIBRARY_MANAGE_KPI_LIBRARY_CREATE]}>
            <Button
              onClick={onOpenCreateKpiLibrary}
              textColor={WHITE}
              startIcon={<Icon iconName="add" height={14} width={14} />}
            >
              {t("สร้างเป้าหมายใหม่")}
            </Button>
          </Authorize>
        </div>
        <Box height={24} />
        <TableKpiLibrary />

        <CreateKpiLibrary
          openCreateKpiLibrary={isOpenCreateKpiLibrary}
          setOpenCreateKpiLibrary={setIsOpenCreateKpiLibrary}
          isCreate={true}
        />
      </div>
    </Authorize>
  )
}

export default KpiLibrary
