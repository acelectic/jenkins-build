import "react-app-polyfill/ie11"
import "react-app-polyfill/stable"
import "./index.css"

import ReactDOM from "react-dom"
import App from "./App"

import { Provider } from "react-redux"
import store from "./redux/store/index"

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
