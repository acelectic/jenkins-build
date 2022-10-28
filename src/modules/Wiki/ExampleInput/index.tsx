import { Box } from "@mui/material"
import { Form } from "react-final-form"
import { InputField } from "../../../components/fields"

const ExampleInput = () => {
  const initialValue = {
    input2: "ประยุทธ์ จันทร์โอชา",
  }
  const required = (value: any) => (value ? undefined : "Required")
  return (
    <>
      <Form onSubmit={() => {}} initialValues={initialValue}>
        {({ handleSubmit, invalid }) => {
          return (
            <form onSubmit={handleSubmit}>
              <InputField
                name="input1"
                label="ชื่อ-นามสกุล"
                subLabel="ชื่อ-นามสถุล"
                placeholder="กรุณากรอกข้อมูล"
                validate={required}
                isRequired={true}
                showDescription={true}
                descriptionText="กรุณากรอกข้อมูล"
              />
              <Box height={30} />
              <InputField
                name="input1"
                label="จำนวน"
                placeholder="กรุณากรอกข้อมูล"
                validate={required}
                isRequired={true}
                showDescription={true}
                endUnit={true}
                unitText="บาท"
                descriptionText="กรุณากรอกข้อมูล"
              />
              <Box height={30} />
              <InputField
                name="input1"
                label="จำนวน"
                placeholder="กรุณากรอกข้อมูล"
                validate={required}
                isRequired={true}
                showDescription={true}
                startUnit={true}
                unitText="บาท"
                descriptionText="กรุณากรอกข้อมูล"
              />
              <Box height={30} />
              <InputField
                name="input1"
                label="ตัวอย่างมีไอคอน"
                subLabel="รอเพิ่มไอคอน"
                placeholder="รอเพิ่มไอคอน"
                validate={required}
                isRequired={true}
                showDescription={true}
                endIcon={true}
                IconName={"copy"}
                descriptionText="กรุณากรอกข้อมูล"
              />
              <Box height={30} />
              <InputField
                name="input1"
                label="ตัวอย่างหลายบรรทัด"
                placeholder="กรุณากรอกข้อมูล"
                validate={required}
                isRequired={true}
                showDescription={true}
                multiline={true}
                rows={5}
                descriptionText="กรุณากรอกข้อมูล"
              />
              <Box height={30} />
              <InputField
                name="input2"
                label="ชื่อ-นามสกุล(view mode)"
                subLabel="ชื่อ-นามสถุล"
                viewMode={true}
              />
              <Box height={30} />
              {/* <Button type="submit">submit</Button> */}
            </form>
          )
        }}
      </Form>
    </>
  )
}

export default ExampleInput
