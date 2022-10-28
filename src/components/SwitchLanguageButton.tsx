import { useCallback, useMemo } from "react"
import ToggleButtonGroup from "@mui/lab/ToggleButtonGroup"
import ToggleButton from "@mui/lab/ToggleButton"
import Kanit from "./common/Kanit"
import { makeStyles } from "@mui/styles"
import { useTranslation } from "react-i18next"
import i18next from "i18next"

export const initLangKey = "blcp-lang"

const useStyles = makeStyles({
  buttonSize: {
    width: "max-content",
    height: "2rem",
  },
})

const SwitchLanguageButton = () => {
  const { i18n } = useTranslation()
  const classes = useStyles()

  const currentLang = useMemo(() => {
    return i18n.language
  }, [i18n.language])

  const handleChangeLang = useCallback(
    (event: React.MouseEvent<HTMLElement>, language: string | null) => {
      if (language !== null) {
        i18n.changeLanguage(language)
        i18next.reloadResources()
        localStorage.setItem(initLangKey, language)
      }
    },
    [i18n]
  )

  return (
    <ToggleButtonGroup
      value={currentLang}
      exclusive
      onChange={handleChangeLang}
      className={classes.buttonSize}
      style={{ backgroundColor: "#ffffff" }}
    >
      <ToggleButton
        value="en"
        style={{ background: currentLang === "en" ? "#004D99" : "" }}
      >
        <Kanit color={currentLang === "en" ? "#FFFFFF" : ""}>EN</Kanit>
      </ToggleButton>
      <ToggleButton
        value="th"
        style={{ background: currentLang === "th" ? "#004D99" : "" }}
      >
        <Kanit color={currentLang === "th" ? "#FFFFFF" : ""}>TH</Kanit>
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default SwitchLanguageButton
