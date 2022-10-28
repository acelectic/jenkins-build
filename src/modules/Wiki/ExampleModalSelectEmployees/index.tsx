import { Box, Grid } from "@mui/material"
import { useCallback, useState } from "react"
import { Form } from "react-final-form"
import Button from "../../../components/common/Button"
import ModalSelectEmployees from "../../../components/ModalSelectEmployees"
import { useVisible } from "../../../utils/custom-hook"

const ExampleModalSelectEmployees = () => {
  const [values, setValues] = useState<any>({})
  const modalVisible = useVisible()

  const onConfirm = useCallback(
    (values) => {
      console.debug("modal values:", values)
      setValues(values)
      modalVisible.close()
    },
    [modalVisible],
  )

  return (
    <Form onSubmit={() => {}}>
      {() => {
        return (
          <Grid>
            <Button onClick={modalVisible.open}>Select Employees</Button>
            <ModalSelectEmployees
              title={"เลือกประธานวง (Owner)*"}
              description={"(เลือกได้ 1 คน)"}
              visible={modalVisible.visible}
              onClose={modalVisible.close}
              onConfirm={onConfirm}
            />
            <Box margin={4}>
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </Box>
          </Grid>
        )
      }}
    </Form>
  )
}

export default ExampleModalSelectEmployees
