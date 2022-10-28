import { Route, Switch } from "react-router-dom"
import WikiList from "./WikiList"

const Wiki = () => {
  return (
    <Switch>
      <Route path="/wiki" component={WikiList} />
    </Switch>
  )
}

export default Wiki
