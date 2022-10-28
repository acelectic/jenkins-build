import { useMemo } from "react"
import { useMediaQuery } from "react-responsive"

const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 960,
  ml: 1025,
  lg: 1280,
  xl: 1920,
}

export const breakpoints = {
  up: (size: keyof typeof BREAKPOINTS) => `@media(min-width: ${BREAKPOINTS[size]}px)`,
  down: (size: keyof typeof BREAKPOINTS) => `@media(max-width: ${BREAKPOINTS[size]}px)`,
}

export const mobile = "@media(max-width: 767px)"

export const iphoneXLandscape = "(max-width: 850px) and (orientation: landscape)"

export const tablet = "@media(max-width: 1024px)"

export const desktop = "@media(min-width: 1025px)"

export const ipadPro = `@media (min-width: 1024px) and (orientation: portrait)`

export const useScreen = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const isIphoneXLandscape = useMediaQuery({
    maxWidth: 812,
    orientation: "landscape",
  })
  const isTablet = useMediaQuery({ maxWidth: 1024 })
  const isDesktop = useMediaQuery({ minWidth: 1025 })
  const isIpadPro = useMediaQuery({ minWidth: 1024, orientation: "portrait" })
  const screen = useMemo(
    () => ({
      isMobile,
      isIphoneXLandscape,
      isTablet,
      isDesktop,
      isIpadPro,
    }),
    [isMobile, isIphoneXLandscape, isTablet, isDesktop, isIpadPro],
  )
  return screen
}

export const hideScrollStyle = `
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  `

enum EnumTest {
  ONE,
  TWO,
  THREE,
}

const data: EnumTest = EnumTest.ONE

switch (data) {
  case EnumTest.ONE:
    break
  default:
    break
}

const b = ("a" as unknown) as EnumTest

console.debug(b)
