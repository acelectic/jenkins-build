import { Box, Button, Divider as MuiDivider } from "@mui/material"
import { spacing } from "@mui/system"
import { Form } from "react-final-form"
import styled from "styled-components/macro"
import Card from "../../../components/common/Card"
import Kanit from "../../../components/common/Kanit"
import {
  CheckboxField,
  OldDatePickerField,
  InputBirthDateField,
  InputField,
  SelectField,
  SwitchButtonField,
  TimePickerField,
  ToggleButtonField,
} from "../../../components/fields"

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
`
const BoxLayout = styled(Box)`
  margin-top: 25%;
`
const Divider = styled(MuiDivider)(spacing)

const ExampleForm = () => {
  return (
    <Card>
      <Form
        onSubmit={(values) => {
          console.debug(values)
        }}
        initialValues={{
          inputField: "string",
          selectField: ["1"],
          switchButtonField: "ไม่ใช้งาน",
        }}
      >
        {({ handleSubmit, values }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Kanit type="XsTitle">
                {`import {
  AutoCompleteField,
  CheckboxField,
  DatePickerField,
  InputBirthDateField,
  InputField,
  SelectField,
  TimePickerField,
  ToggleButtonField,
} from "../../../components/fields"`}
              </Kanit>
              <br />
              <Kanit type="XsTitle">Input Field</Kanit>
              <br />
              <GridLayout>
                <BoxLayout>
                  <InputField name="inputField" />
                </BoxLayout>
              </GridLayout>
              <Divider my={2} />
              <Kanit type="XsTitle">Checkbox Field</Kanit>
              <br />
              <GridLayout>
                <BoxLayout>
                  <CheckboxField name={"checkboxField"} />
                </BoxLayout>
              </GridLayout>
              <Divider my={2} />
              <Kanit type="XsTitle">Date Picker Field</Kanit>
              <br />
              <GridLayout>
                <BoxLayout>
                  <OldDatePickerField name={"datePickerField"} />
                </BoxLayout>
              </GridLayout>
              <Divider my={2} />
              <Kanit type="XsTitle">Select Field</Kanit>
              <br />
              <GridLayout>
                <BoxLayout>
                  <SelectField name="selectField" options={[{ label: "1", value: "1" }]} />
                </BoxLayout>
              </GridLayout>
              <Divider my={2} />
              <Kanit type="XsTitle">Time Picker Field</Kanit>
              <br />
              <GridLayout>
                <BoxLayout>
                  <TimePickerField name={"timePickerField"} />
                </BoxLayout>
              </GridLayout>
              <Divider my={2} />
              <Kanit type="XsTitle">Input Birth Date Field</Kanit>
              <br />
              <GridLayout>
                <BoxLayout>
                  <InputBirthDateField name={"inputBirthDateField"}></InputBirthDateField>
                </BoxLayout>
              </GridLayout>
              <Divider my={2} />
              <Kanit type="XsTitle">Toggle Button Field</Kanit>
              <br />
              <GridLayout>
                <BoxLayout>
                  <ToggleButtonField name="toggleButtonField">กด</ToggleButtonField>
                </BoxLayout>
              </GridLayout>
              <Divider my={2} />
              <Kanit type="XsTitle">Switch Button Field</Kanit>
              <br />
              <GridLayout>
                <BoxLayout>
                  <SwitchButtonField name="switchButtonField" options={["ใช้งาน", "ไม่ใช้งาน"]} />
                </BoxLayout>
              </GridLayout>
              <Divider my={2} />
              <br />
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </form>
          )
        }}
      </Form>
    </Card>
  )
}

export default ExampleForm
