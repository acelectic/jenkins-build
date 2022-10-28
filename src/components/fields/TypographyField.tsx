import { Typography, TypographyProps } from "@mui/material"
import { Field, FieldProps, FieldRenderProps } from "react-final-form"

const Text = (props: FieldRenderProps<any> & TypographyProps) => {
  const { input, ...restProps } = props
  return <Typography {...restProps}>{input.value}</Typography>
}

const TypographyField = (
  props: FieldProps<string, FieldRenderProps<string>> & TypographyProps
) => {
  return <Field component={Text} {...props} />
}

export default TypographyField
