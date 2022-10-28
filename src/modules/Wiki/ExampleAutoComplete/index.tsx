import Card from "../../../components/common/Card"
import { AutoCompleteField } from "../../../components/fields"
import { Divider as MuiDivider, Box } from "@mui/material"
import { spacing } from "@mui/system"
import styled from "styled-components/macro"
import { useCallback } from "react"
import { useGetAsyncOpitions } from "./data/data-query"
import Kanit from "../../../components/common/Kanit"
import { mobile } from "../../../utils/responsive-helper"
import { Form } from "react-final-form"

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 10px;

  ${mobile} {
    grid-template-columns: auto;
  }
`
const Divider = styled(MuiDivider)(spacing)

const ExampleAutoComplete = () => {
  const {
    data: option = [],
    mutateAsync: getAsyncOptions,
  } = useGetAsyncOpitions()

  const loadOptions = useCallback(
    (value: string) => {
      return getAsyncOptions({ q: value })
    },
    [getAsyncOptions]
  )

  return (
    <Form onSubmit={() => {}}>
      {({ handleSubmit }) => (
        <Card>
          <Kanit type="XsTitle">
            import AutoCompleteField from "../../../components/fields"
          </Kanit>
          <GridLayout>
            <Box>
              <AutoCompleteField
                loadOptions={loadOptions}
                options={option}
                name="color"
              />
            </Box>

            <pre>{`const {data: option = [],mutateAsync: getAsyncOptions,} = useGetAsyncOpitions()
const loadOptions = useCallback((value: string) => {return getAsyncOptions({ q: value })},[getAsyncOptions])
const [colorOption, setColorOption] = useState("")
const handleChange = useCallback((colorOption: string | number | null) => {
  colorOption && setColorOption(colorOption.toString())
}, [])
return(
  <AutoCompleteField loadOptions={loadOptions} options={option} name="color" />
)`}</pre>
          </GridLayout>
          <Divider my={6} />
        </Card>
      )}
    </Form>
  )
}

export default ExampleAutoComplete
