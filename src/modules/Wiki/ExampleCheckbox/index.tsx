import { makeStyles } from "@mui/styles"
import { Form } from "react-final-form"
import Button from "../../../components/common/Button"
import { CheckboxField } from "../../../components/fields"

const useStyle = makeStyles((theme) => ({
  fieldArea: {
    marginTop: "20px",
  },
  header: {
    width: "50%",
  },
}))

const ExampleCheckboxComponent = () => {
  const classes = useStyle()

  return (
    <div>
      <h2>Checkbox</h2>
      {/* <Checkbox
        label={<Sarabun size={16}>{'Checkbox'}</Sarabun>}
        value={isChecked}
        onChange={(checked: boolean) => {
          setIsChecked(checked)
          console.debug(isChecked)
        }}
      />
      <div style={{ height: '24px' }}></div>
      <Checkbox
        label={<Sarabun size={16}>{'Checkbox disable'}</Sarabun>}
        value={isChecked}
        disabled={true}
        onChange={(checked: boolean) => {
          setIsChecked(checked)
          console.debug(isChecked)
        }}
      />

      <div style={{ height: '24px' }}></div>
      <Checkbox
        label={<Sarabun size={16}>{'Checkbox indeterminate'}</Sarabun>}
        value={isChecked}
        indeterminate={true}
        onChange={(checked: boolean) => {
          setIsChecked(checked)
          console.debug(isChecked)
        }}
      /> */}
      <div className={classes.fieldArea}>
        <Form
          onSubmit={(value) => {
            console.debug(value)
          }}
          initialValues={{ checkbox: true }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <CheckboxField
                name={"checkbox"}
                type="checkbox"
                disabled={true}
                label={<div>{"CheckboxField"}</div>}
                onChange={() => handleSubmit()}
              />
              <Button onClick={handleSubmit} />
            </form>
          )}
        </Form>
      </div>
      {
        <pre>{` const [isChecked,setIsChecked] = useState(false)

           <Checkbox label={<Sarabun size={16}>{"Checkbox"}</Sarabun>} value={isChecked} onChange={(checked: boolean) => {
        setIsChecked(checked)
        console.debug(isChecked)
      }} />
      <div style={{ height: "24px" }}></div>
      <Checkbox label={<Sarabun size={16}>{"Checkbox disable"}</Sarabun>} value={isChecked} disabled={true} onChange={(checked: boolean) => {
        setIsChecked(checked)
        console.debug(isChecked)
      }} />

         <div style={{ height: "24px" }}></div>
      <Checkbox label={<Sarabun size={16}>{"Checkbox indeterminate"}</Sarabun>} value={isChecked} indeterminate={true} onChange={(checked: boolean) => {
        setIsChecked(checked)
        console.debug(isChecked)
      }} />
        <div className={classes.fieldArea}>
      <Form
          onSubmit={(value) => {
            console.debug(value)
          }
          
          }
          initialValues={ {checkbox : true} }
     
    >
      {({ handleSubmit, }) => (
        <form onSubmit={handleSubmit}>
              <CheckboxField name={"checkbox"} type="checkbox" label={<DBHelvethaicaX size={16}>{"CheckboxField"}</DBHelvethaicaX>} onChange={() => handleSubmit()} />
            
          </form>
      )}
        </Form>`}</pre>
      }
    </div>
  )
}

export default ExampleCheckboxComponent
