import React from "react"
import Store from "../redux/store"
import Items from "./Items"
import { useItems } from "../hooks"
import { Provider } from "react-redux"

export default props => {
  return (
    <Provider store={Store}>
      <Items />
    </Provider>
  )
}
