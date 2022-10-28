import { useCallback, useMemo } from "react"
import { Form } from "react-final-form"
import ChooseSelectGroupComponent from "../../../components/fields/ChooseSelectGroupComponent"

interface ExampleSelectGroupEmpFormValues {
  employeesSelected: { id: string; name: string }[]
}

const ExampleSelectGroupEmp = () => {
  const onSubmit = useCallback((values: any) => {
    console.debug("Example Values: ", values)
  }, [])

  const initialValues = useMemo(() => {
    const _initialValues: ExampleSelectGroupEmpFormValues = {
      employeesSelected: [],
    }
    return _initialValues
  }, [])

  return (
    <>
      <Form<ExampleSelectGroupEmpFormValues> onSubmit={onSubmit} initialValues={initialValues}>
        {({ handleSubmit, values, form, invalid }) => {
          console.debug("values", values)
          return (
            <div>
              <ChooseSelectGroupComponent onNextClick={onSubmit} />
            </div>
          )
        }}
      </Form>
    </>
  )
}

export default ExampleSelectGroupEmp
