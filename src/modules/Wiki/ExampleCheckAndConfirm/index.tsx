import { makeStyles } from "@mui/styles"
import { useCallback, useState } from "react"
import { Form } from "react-final-form"
import Dropdown from "../../../components/common/Dropdown"
import { DropdownField } from "../../../components/fields"

const useStyle = makeStyles((theme) => ({
  fieldArea: {
    marginTop: "20px",
  },
  header: {
    width: "50%",
  },
  test: {
    width: "287px",
  },
}))

export const optionsDropdown = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
]

const ExampleDropdownComponent = () => {
  const classes = useStyle()
  const [age, setAge] = useState("")

  const onClickForm = useCallback((value) => {
    // console.debug(value.dropdown)
  }, [])

  const handdleOnChange = useCallback((value) => {
    setAge(`${value}`)
    // console.debug(age)
  }, [])

  return (
    <div className={classes.header}>
      <h2>Dropdown</h2>
      <Dropdown
        options={optionsDropdown}
        label="Dropdown normal"
        value={age}
        onChange={handdleOnChange}
      />
      <div style={{ height: "24px" }}></div>
      <Dropdown
        options={optionsDropdown}
        label="Dropdown Error"
        value={age}
        isError={true}
        onChange={handdleOnChange}
      />
      <div style={{ height: "24px" }}></div>
      <Dropdown
        options={optionsDropdown}
        label="Dropdown disable"
        placeHolder="Label"
        value={age}
        disabled={true}
        onChange={handdleOnChange}
      />
      <div style={{ height: "24px" }}></div>

      <Dropdown
        options={optionsDropdown}
        label="Dropdown required"
        subLabel="Sublabel and placeHolder"
        placeHolder="Label"
        value={age}
        isRequired={true}
        onChange={handdleOnChange}
      />
      <div className={classes.fieldArea}>
        <Form onSubmit={onClickForm} initialValues={{ dropdown: 1, dropdownView: 1 }}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <DropdownField
                testText="Oishi"
                name={"dropdown"}
                className={classes.test}
                style={{ width: "250px" }}
                options={optionsDropdown}
                label="Dropdown field"
                onChange={() => handleSubmit()}
              />
              <div style={{ height: "24px" }}></div>
              <DropdownField
                name={"dropdownView"}
                options={optionsDropdown}
                label="Dropdown View Mode"
                subLabel="Sublabel and placeHolder"
                viewMode={true}
                onChange={() => handleSubmit()}
              />
            </form>
          )}
        </Form>
      </div>
      {
        <pre>{` 
  const [age, setAge] = useState("");
  const optionsDropdown = [{ label: "one", value: 1 }, { label: "two", value: 2 }]
  
  const onClickForm = useCallback((value) => {
    console.debug(value.dropdown)
   },[])
     const handdleOnChange = useCallback((value) => {
    setAge(value)
  },[])
        
 return (
    <div className={classes.header}>
      <h2>Dropdown</h2>
     <Dropdown options={optionsDropdown} label="Dropdown normal" value={age} onChange={handdleOnChange} />
      <div style={{ height: "24px" }}></div>
      <Dropdown options={optionsDropdown} label="Dropdown Error" value={age} isError={true} onChange={handdleOnChange} />
      <div style={{ height: "24px" }}></div>
      <Dropdown options={optionsDropdown} label="Dropdown disable" placeHolder="Label" value={age} disabled={true} onChange={handdleOnChange} />
      <div style={{ height: "24px" }}></div>
       
      <Dropdown options={optionsDropdown} label="Dropdown required" subLabel="Sublabel and placeHolder" placeHolder="Label" value={age} isRequired={true} onChange={handdleOnChange} />
      <div className={classes.fieldArea}>
      <Form
          onSubmit={onClickForm}
          initialValues={
            {dropdown : 2,dropdownView : 1}
          }
     
    >
      {({ handleSubmit, }) => (
        <form onSubmit={handleSubmit}>
            <DropdownField name={"dropdown"} options={optionsDropdown} label="Dropdown field" onChange={() => handleSubmit()} />
              <div style={{ height: "24px" }}></div>
              <DropdownField name={"dropdownView"} options={optionsDropdown} label="Dropdown View Mode"  viewMode={true} onChange={() => handleSubmit()} />
          </form>
      )}
        </Form>
      </div>`}</pre>
      }
    </div>
  )
}

export default ExampleDropdownComponent
