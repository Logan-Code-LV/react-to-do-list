// 1. imports
import axios from "axios"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

// 2. action definitions
const GET_ITEMS = "item/GET_ITEMS"

// 3. initial state
const initialState = {
  items: []
}

// 4. reducer (default export)
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return { ...state, items: action.payload }
    default:
      return state
  }
}

//5. action creators
function getItems() {
  return dispatch => {
    axios.get("/items").then(resp => {
      dispatch({
        type: GET_ITEMS,
        payload: resp.data
      })
    })
  }
}

function addItem(text) {
  return dispatch => {
    axios.post("/items", { text, status: "active" }).then(resp => {
      dispatch(getItems())
    })
  }
}

function deleteItem(id) {
  return dispatch => {
    axios.delete("/items/" + id).then(resp => {
      dispatch(getItems())
    })
  }
}

function toggleItem(id) {
  return dispatch => {
    axios.get("/items/" + id).then(resp => {
      const item = resp.data
      if (item.status === "completed") {
        axios.patch("/items/" + id, { status: "active" }).then(resp => {
          dispatch(getItems())
        })
      } else {
        axios.patch("/items/" + id, { status: "completed" }).then(resp => {
          dispatch(getItems())
        })
      }
    })
  }
}

// 6. custom hook (named export)

export function useItems() {
  const dispatch = useDispatch()
  const items = useSelector(appState => appState.itemState.items)
  const add = text => dispatch(addItem(text))
  const del = id => dispatch(deleteItem(id))
  const toggle = id => dispatch(toggleItem(id))

  useEffect(() => {
    dispatch(getItems())
  }, [])

  return { items, add, del, toggle }
}
