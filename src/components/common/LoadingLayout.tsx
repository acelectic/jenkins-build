import { ReactNode } from "react"
import { CircleLoader, MoonLoader } from "react-spinners"
import { GRAYSCALE_LIGHTGRAY_20, PRIMARY } from "../../constants/colors"

type ILoadingLayoutProps = {
  isLoading: boolean
  children: ReactNode
}

export const FallBackComponent = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        backgroundColor: GRAYSCALE_LIGHTGRAY_20,
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      {/* <HashLoader color={PRIMARY} loading={true} size={60} /> */}
      <CircleLoader color={PRIMARY} loading={true} size={60} />
    </div>
  )
}

const LoadingLayout = (props: ILoadingLayoutProps) => {
  const { isLoading, children } = props

  if (isLoading) {
    return (
      <div
        style={{
          width: "100%",
          height: "30vh",
          // height: '100%',
          flex: "1",
          backgroundColor: "transparent",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <CircleLoader color={SECONDARY} loading={true} size={60} /> */}
        {/* <FallBackComponent /> */}
        <MoonLoader color={PRIMARY} loading={true} size={60} />
      </div>
    )
  } else {
    return <>{children}</>
  }
}

export default LoadingLayout
