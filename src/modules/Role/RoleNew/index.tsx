import AddRoleLeftField from "../component/fields/add-fields/AddRoleLeftField"
import TitleLayout from "../../../components/common/TitleLayout"
import { Box } from "@mui/material"
import PageTitle from "../../../components/common/PageTitle"
import { useTranslation } from "react-i18next"

const RoleNew = () => {
  const { t } = useTranslation()

  return (
    <div>
      <TitleLayout display="flex">
        <Box flex="1">
          <PageTitle>{t("role.new.title")}</PageTitle>
        </Box>
      </TitleLayout>

      <AddRoleLeftField />
      {/* <AddRoleRightField /> */}
    </div>
  )
}

export default RoleNew
