import { ComponentType, useMemo } from "react"
import { FieldProps, FieldRenderProps } from "react-final-form"
import { Field } from "react-final-form"

import { makeStyles } from "@mui/styles"
import Sarabun from "../common/Sarabun"
import { ERROR, TEXT_LIGHT } from "../../constants/colors"
import { useTranslation } from "react-i18next"

const useModComponentStyle = makeStyles({
  root: {
    position: "relative",
  },
  errorText: {
    position: "absolute",
    top: "100%",
    padding: "0 10px",
  },
})

export const modifyComponent = (Component: ComponentType<any>) => (
  props: FieldRenderProps<any>
) => {
  const {
    input,
    meta,
    style,
    className,
    onChange,
    descriptionText,
    ...restProps
  } = props
  const { error, touched } = meta

  const isError = useMemo(() => {
    return error && touched
  }, [error, touched])
  const classes = useModComponentStyle()
  const { t } = useTranslation()

  return (
    <div className={`${classes.root} ${className}`} style={style}>
      <Component
        {...input}
        onChange={(v: any) => {
          input.onChange(v)
          onChange?.(v)
        }}
        {...restProps}
      />
      {isError ? (
        <Sarabun
          color={`${ERROR}`}
          type="Body1"
          size={10}
          className={[classes.errorText, "error-text"].join(" ")}
        >
          {t(meta.error)}
        </Sarabun>
      ) : (
        <Sarabun
          color={`${TEXT_LIGHT}`}
          type="Body1"
          size={10}
          className={[classes.errorText, "error-text"].join(" ")}
        >
          {descriptionText}
        </Sarabun>
      )}
    </div>
  )
}

export const makeField = <T extends any>(component: ComponentType<any>) => {
  const newComponent = modifyComponent(component)
  const returnField = (
    props: FieldProps<string, FieldRenderProps<string>> & T
  ) => <Field {...props} render={newComponent} />

  return returnField
}
