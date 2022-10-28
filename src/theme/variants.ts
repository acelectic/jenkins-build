import merge from "deepmerge"
import { green, grey, indigo, red } from "@mui/material/colors"
import { THEMES } from "../constants"
import { SECONDARY_MAIN } from "../constants/colors"

const customBlue = {
  50: "#e9f0fb",
  100: "#c8daf4",
  200: "#a3c1ed",
  300: "#7ea8e5",
  400: "#6395e0",
  500: "#4782da",
  600: "#407ad6",
  700: "#376fd0",
  800: "#2f65cb",
  900: "#2052c2 ",
}

export const defaultVariant = {
  name: THEMES.DEFAULT,
  palette: {
    type: "light",
    primary: {
      // main: customBlue[700],
      main: "#2c3d92",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#F2591D",
      contrastText: "#FFF",
    },
    tertiary: {
      main: "#FBAA19",
      contrastText: "#FFF",
    },
    success: {
      main: "#2ECC71",
      contrastText: "#FFF",
    },
    warning: {
      main: "#FFBA00",
      contrastText: "#FFF",
    },
    error: {
      main: "#E0255F",
      contrastText: "#FFF",
    },
    black: {
      main: "#1B1C1D",
      contrastText: "#FFF",
    },
    darkGray: {
      main: "#8C8D8D",
      contrastText: "#FFF",
    },
    gray: {
      main: "#DCDEE5",
      contrastText: "#1B1C1D",
    },
    disable: {
      main: "#F4F5F4",
      contrastText: "#1B1C1D",
    },
    lightGray: {
      main: "#FAFAFA",
      contrastText: "#1B1C1D",
    },
    white: {
      main: "#FFF",
      contrastText: "#1B1C1D",
    },
    background: {
      default: "#F7F9FC",
      paper: "#FFF",
    },
  },
  header: {
    color: grey[500],
    background: "#FFF",
    search: {
      color: grey[800],
    },
    indicator: {
      background: customBlue[600],
    },
  },
  footer: {
    color: grey[500],
    background: "#FFF",
  },
  sidebar: {
    // color: grey[200],
    color: "rgba(0, 0, 0, 0.54)",
    // background: "#233044",
    // background: "#eaebf4",
    background: `${SECONDARY_MAIN}`,
    header: {
      color: grey[200],
      // background: "#233044",
      // background: "#eaebf4",
      background: `${SECONDARY_MAIN}`,
      brand: {
        color: customBlue[500],
      },
    },
    footer: {
      color: grey[200],
      background: "#1E2A38",
      online: {
        background: green[500],
      },
    },
    badge: {
      color: "#FFF",
      background: customBlue[500],
    },
  },
}

export type ThemeColors = Exclude<
  keyof typeof defaultVariant["palette"],
  "type"
>

const darkVariant = merge(defaultVariant, {
  name: THEMES.DARK,
  palette: {
    type: "dark",
    primary: {
      main: customBlue[600],
      contrastText: "#FFF",
    },
    background: {
      default: "#1B2635",
      paper: "#233044",
    },
    text: {
      primary: "rgba(255, 255, 255, 0.95)",
      secondary: "rgba(255, 255, 255, 0.5)",
    },
  },
  header: {
    color: grey[300],
    background: "#1B2635",
    search: {
      color: grey[200],
    },
  },
  footer: {
    color: grey[300],
    background: "#233044",
  },
})

const lightVariant = merge(defaultVariant, {
  name: THEMES.LIGHT,
  palette: {
    type: "light",
  },
  header: {
    color: grey[200],
    background: customBlue[800],
    search: {
      color: grey[100],
    },
    indicator: {
      background: red[700],
    },
  },
  sidebar: {
    color: grey[900],
    background: "#FFF",
    header: {
      color: "#FFF",
      background: customBlue[800],
      brand: {
        color: "#FFFFFF",
      },
    },
    footer: {
      color: grey[800],
      background: "#F7F7F7",
      online: {
        background: green[500],
      },
    },
  },
})

const blueVariant = merge(defaultVariant, {
  name: THEMES.BLUE,
  palette: {
    type: "light",
  },
  sidebar: {
    color: "#FFF",
    background: customBlue[700],
    header: {
      color: "#FFF",
      background: customBlue[800],
      brand: {
        color: "#FFFFFF",
      },
    },
    footer: {
      color: "#FFF",
      background: customBlue[800],
      online: {
        background: "#FFF",
      },
    },
    badge: {
      color: "#000",
      background: "#FFF",
    },
  },
})

const greenVariant = merge(defaultVariant, {
  name: THEMES.GREEN,
  palette: {
    primary: {
      main: green[800],
      contrastText: "#FFF",
    },
    secondary: {
      main: green[500],
      contrastText: "#FFF",
    },
  },
  header: {
    indicator: {
      background: green[600],
    },
  },
  sidebar: {
    color: "#FFF",
    background: green[700],
    header: {
      color: "#FFF",
      background: green[800],
      brand: {
        color: "#FFFFFF",
      },
    },
    footer: {
      color: "#FFF",
      background: green[800],
      online: {
        background: "#FFF",
      },
    },
    badge: {
      color: "#000",
      background: "#FFF",
    },
  },
})

const indigoVariant = merge(defaultVariant, {
  name: THEMES.INDIGO,
  palette: {
    primary: {
      main: indigo[600],
      contrastText: "#FFF",
    },
    secondary: {
      main: indigo[400],
      contrastText: "#FFF",
    },
  },
  header: {
    indicator: {
      background: indigo[600],
    },
  },
  sidebar: {
    color: "#FFF",
    background: indigo[700],
    header: {
      color: "#FFF",
      background: indigo[800],
      brand: {
        color: "#FFFFFF",
      },
    },
    footer: {
      color: "#FFF",
      background: indigo[800],
      online: {
        background: "#FFF",
      },
    },
    badge: {
      color: "#000",
      background: "#FFF",
    },
  },
})

const variants: Array<VariantType> = [
  defaultVariant,
  darkVariant,
  lightVariant,
  blueVariant,
  greenVariant,
  indigoVariant,
]

export default variants

export type VariantType = {
  name: string
  palette: {
    primary: MainContrastTextType
    secondary: MainContrastTextType
  }
  header: ColorBgType & {
    search: {
      color: string
    }
    indicator: {
      background: string
    }
  }
  footer: ColorBgType
  sidebar: ColorBgType & {
    header: ColorBgType & {
      brand: {
        color: string
      }
    }
    footer: ColorBgType & {
      online: {
        background: string
      }
    }
    badge: ColorBgType
  }
}

type MainContrastTextType = {
  main: string
  contrastText: string
}
type ColorBgType = {
  color: string
  background: string
}
